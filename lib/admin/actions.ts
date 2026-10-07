"use server";

import { validatePackage } from "./package-validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getEntity, type EntityConfig } from "./entities";
import { syncSeatsUsed, validateSeats } from "./sales";
import type { Passenger } from "@/components/admin/contract-form";

/** Converte os valores do FormData conforme o tipo de cada campo. */
function buildRow(entity: EntityConfig, formData: FormData) {
  const row: Record<string, unknown> = {};
  for (const field of entity.fields) {
    const raw = formData.get(field.key);
    switch (field.type) {
      case "boolean":
        row[field.key] = formData.get(field.key) === "on" || raw === "true";
        break;
      case "number": {
        const n = raw === null || raw === "" ? null : Number(raw);
        row[field.key] = Number.isNaN(n as number) ? null : n;
        break;
      }
      case "gallery":
      case "array": {
        const text = (raw as string) ?? "";
        row[field.key] = text
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      }
      case "structured":
      case "dependents":
      case "json": {
        const text = ((raw as string) ?? "").trim();
        try {
          row[field.key] = text ? JSON.parse(text) : [];
        } catch {
          throw new Error(`Preencha corretamente o campo ${field.label}.`);
        }
        break;
      }
      case "date":
        row[field.key] = raw && raw !== "" ? raw : null;
        break;
      default:
        row[field.key] = (raw as string) ?? "";
    }
  }
  return row;
}

export async function saveEntityRow(entityKey: string, formData: FormData) {
  const entity = getEntity(entityKey);
  if (!entity) throw new Error("Entidade desconhecida");

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Sua sessão expirou. Entre novamente para salvar." };
    const id = formData.get("id");
    const row = buildRow(entity, formData);
    if (entityKey === "pacotes") validatePackage(row);
    const { error } = id
      ? await supabase.from(entity.table).update(row).eq("id", id)
      : await supabase.from(entity.table).insert(row);
    if (error) {
      if (entityKey === "pacotes" && ["PGRST204", "42703"].includes(error.code)) return { error: "O cadastro precisa ser atualizado pela equipe técnica antes de salvar as novas informações do pacote." };
      return { error: entityKey === "pacotes" && error.code === "23505" ? "Essa URL já está em uso. Escolha outra URL para o pacote." : error.message };
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar. Tente novamente." };
  }

  revalidatePath(`/admin/${entityKey}`);
  revalidatePath("/", "layout"); // reflete no site público
  redirect(`/admin/${entityKey}`);
}

export async function deleteEntityRow(entityKey: string, id: number) {
  const entity = getEntity(entityKey);
  if (!entity) throw new Error("Entidade desconhecida");

  const supabase = await createClient();
  const { error } = await supabase.from(entity.table).delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/${entityKey}`);
  revalidatePath("/", "layout");
}

const SETTINGS_FIELDS = [
  "brand_name",
  "brand_tagline",
  "whatsapp",
  "phone",
  "email",
  "location",
  "instagram",
  "facebook",
  "google_reviews_url",
  "about_title",
  "about_text",
  "cnpj",
  "address",
  "website",
  "logo_url",
  "contract_terms",
];

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();
  const row: Record<string, unknown> = { id: 1 };
  for (const key of SETTINGS_FIELDS) {
    row[key] = String(formData.get(key) ?? "");
  }
  const { error } = await supabase
    .from("site_settings")
    .upsert(row, { onConflict: "id" });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/configuracoes");
  revalidatePath("/", "layout");
  redirect("/admin/configuracoes");
}

export async function saveContract(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Sua sessão expirou. Entre novamente para salvar." };
    const id = formData.get("id") ? String(formData.get("id")) : null;
    const num = (key: string) => {
      const raw = formData.get(key);
      return raw && raw !== "" ? Number(raw) : null;
    };
    const clientId = num("client_id");
    const packageId = num("package_id");
    if (!clientId) return { error: "Selecione o responsável financeiro." };
    if (!packageId) return { error: "Selecione o pacote." };
    const status = String(formData.get("status") || "rascunho");
    const passengers: Passenger[] = (JSON.parse(String(formData.get("passengers") || "[]")) as Passenger[]).map((p) => ({
      name: String(p.name ?? "").trim(),
      doc: String(p.doc ?? ""),
      birthdate: String(p.birthdate ?? ""),
      seat: p.lap || !p.seat ? null : Number(p.seat),
      lap: Boolean(p.lap),
      boarding: String(p.boarding ?? ""),
      price: Number(p.price) || 0,
    }));

    let othersQuery = supabase.from("contracts").select("passengers").eq("package_id", packageId).neq("status", "cancelado");
    if (id) othersQuery = othersQuery.neq("id", id);
    const [{ data: pkg }, { data: client }, { data: others }, { data: previous }] = await Promise.all([
      supabase.from("packages").select("name, seats").eq("id", packageId).single(),
      supabase.from("clients").select("name").eq("id", clientId).single(),
      othersQuery,
      id ? supabase.from("contracts").select("package_id").eq("id", id).single() : Promise.resolve({ data: null }),
    ]);
    if (!pkg || !client) return { error: "Pacote ou cliente não encontrado." };

    // ponytail: validação sem lock — duas vendas simultâneas podem disputar o mesmo assento; trocar por constraint/RPC se o volume crescer.
    const seatError = validateSeats(
      passengers,
      Number(pkg.seats ?? 64),
      (others ?? []).map((o) => (Array.isArray(o.passengers) ? o.passengers : [])),
      status !== "cancelado",
    );
    if (seatError) return { error: seatError };

    const row = {
      client_id: clientId,
      package_id: packageId,
      title: `${pkg.name} — ${client.name}`,
      passengers,
      total_value: passengers.reduce((sum, p) => sum + p.price, 0),
      entry_value: num("entry_value") ?? 0,
      installments: num("installments") ?? 1,
      status,
      travel_date: formData.get("travel_date") || null,
      signed_at: formData.get("signed_at") || null,
      how_heard: String(formData.get("how_heard") ?? ""),
      payment_method: String(formData.get("payment_method") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };
    const { error } = id
      ? await supabase.from("contracts").update(row).eq("id", id)
      : await supabase.from("contracts").insert(row);
    if (error) return { error: error.message };
    await syncSeatsUsed(supabase, [packageId, previous?.package_id]);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Não foi possível salvar. Tente novamente." };
  }

  revalidatePath("/admin/contratos");
  revalidatePath("/", "layout"); // vagas no site
  redirect("/admin/contratos");
}

export async function deleteContract(id: number) {
  const supabase = await createClient();
  const { data } = await supabase.from("contracts").select("package_id").eq("id", id).single();
  const { error } = await supabase.from("contracts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await syncSeatsUsed(supabase, [data?.package_id]);
  revalidatePath("/admin/contratos");
  revalidatePath("/", "layout");
}

export async function deleteQuote(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("quotes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/cotacoes");
}

export async function setQuoteStatus(id: number, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("quotes").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/cotacoes");
}

// ───── Conta / Perfil ─────
export async function updateProfile(
  _prev: { error?: string; ok?: boolean } | null,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  const payload: { email?: string; password?: string } = {};
  if (email) payload.email = email;
  if (password) payload.password = password;
  if (!payload.email && !payload.password) {
    return { error: "Informe um novo e-mail ou senha." };
  }
  if (payload.password && payload.password.length < 6) {
    return { error: "A senha deve ter ao menos 6 caracteres." };
  }

  const { error } = await supabase.auth.updateUser(payload);
  if (error) return { error: error.message };

  revalidatePath("/admin/perfil");
  return { ok: true };
}

// ───── Equipe (requer service role key) ─────
function hasServiceKey() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function addAgent(
  _prev: { error?: string; ok?: boolean } | null,
  formData: FormData,
) {
  if (!hasServiceKey()) return { error: "service-role-missing" };
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || password.length < 6) {
    return { error: "Informe e-mail e senha (mín. 6 caracteres)." };
  }

  const supabase = await createServiceClient();
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/equipe");
  return { ok: true };
}

export async function deleteAgent(userId: string) {
  if (!hasServiceKey()) throw new Error("service-role-missing");
  const supabase = await createServiceClient();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/equipe");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }
  redirect(redirectTo || "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
