"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getEntity, type EntityConfig } from "./entities";

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
      case "array": {
        const text = (raw as string) ?? "";
        row[field.key] = text
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      }
      case "json": {
        const text = ((raw as string) ?? "").trim();
        try {
          row[field.key] = text ? JSON.parse(text) : [];
        } catch {
          // JSON inválido: mantém como lista vazia para não quebrar o salvamento
          row[field.key] = [];
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

  const supabase = await createClient();
  const id = formData.get("id");
  const row = buildRow(entity, formData);

  if (id) {
    const { error } = await supabase
      .from(entity.table)
      .update(row)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from(entity.table).insert(row);
    if (error) throw new Error(error.message);
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

const CONTRACT_FIELDS = [
  "client_id",
  "package_id",
  "title",
  "total_value",
  "entry_value",
  "installments",
  "status",
  "travel_date",
  "signed_at",
  "notes",
];

export async function saveContract(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id");
  const row: Record<string, unknown> = {};
  for (const key of CONTRACT_FIELDS) {
    const raw = formData.get(key);
    if (key === "client_id" || key === "package_id" || key === "installments") {
      row[key] = raw && raw !== "" ? Number(raw) : null;
    } else if (key === "total_value" || key === "entry_value") {
      row[key] = raw && raw !== "" ? Number(raw) : 0;
    } else if (key === "travel_date" || key === "signed_at") {
      row[key] = raw && raw !== "" ? raw : null;
    } else {
      row[key] = String(raw ?? "");
    }
  }

  if (id) {
    const { error } = await supabase.from("contracts").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("contracts").insert(row);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/contratos");
  redirect("/admin/contratos");
}

export async function deleteContract(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("contracts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contratos");
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
