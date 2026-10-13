import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { contractBlocks } from "@/lib/contract-terms";
import { BRAND, clean, cpf } from "./brand";

const s = StyleSheet.create({
  page: { fontFamily: BRAND.font, fontSize: 8.8, color: BRAND.text, paddingTop: 36, paddingHorizontal: 40, paddingBottom: 80, lineHeight: 1.5 },
  band: { backgroundColor: BRAND.navy, marginTop: -36, marginHorizontal: -40, paddingHorizontal: 40, paddingTop: 28, paddingBottom: 24, flexDirection: "row", alignItems: "center", gap: 20 },
  logoCard: { backgroundColor: "#fff", borderRadius: 12, padding: 9, width: 130 },
  logo: { width: 112 },
  kicker: { color: BRAND.orange, fontSize: 8, fontWeight: 600, letterSpacing: 1.6 },
  title: { color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginTop: 4 },
  meta: { color: "#c9d5e6", fontSize: 8.5, marginTop: 5 },
  stripe: { height: 4, backgroundColor: BRAND.orange, marginHorizontal: -40, marginBottom: 18 },
  cards: { flexDirection: "row", gap: 12 },
  card: { flex: 1, borderWidth: 1, borderColor: BRAND.line, borderRadius: 10, padding: 12 },
  cardTitle: { fontSize: 7.5, fontWeight: 600, letterSpacing: 1.2, color: BRAND.orange, marginBottom: 6 },
  field: { flexDirection: "row", marginBottom: 2 },
  label: { width: 62, color: BRAND.muted },
  value: { flex: 1, fontWeight: 500, color: BRAND.navy },
  tiles: { flexDirection: "row", gap: 10, marginTop: 12 },
  tile: { flex: 1, backgroundColor: BRAND.navySoft, borderRadius: 10, paddingVertical: 9, paddingHorizontal: 12 },
  tileLabel: { fontSize: 7, fontWeight: 600, letterSpacing: 1, color: BRAND.muted },
  tileValue: { fontSize: 13, fontWeight: 700, color: BRAND.navy, marginTop: 1 },
  h2: { flexDirection: "row", alignItems: "center", marginTop: 22, marginBottom: 6 },
  bar: { width: 4, height: 14, backgroundColor: BRAND.orange, borderRadius: 2, marginRight: 8 },
  h2Text: { fontSize: 12, fontWeight: 700, color: BRAND.navy },
  clause: { fontSize: 9.5, fontWeight: 700, color: BRAND.navy, marginTop: 10, marginBottom: 3 },
  paragraph: { marginBottom: 5, textAlign: "justify" },
  tr: { flexDirection: "row", paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: BRAND.line },
  th: { flexDirection: "row", paddingVertical: 5, backgroundColor: BRAND.navy, color: "#fff", fontWeight: 600, fontSize: 8, marginTop: 4 },
  notes: { backgroundColor: BRAND.orangeSoft, borderRadius: 8, padding: 10, marginTop: 10 },
  signArea: { marginTop: 26 },
  signRow: { flexDirection: "row", gap: 30, marginTop: 44 },
  sign: { flex: 1, borderTopWidth: 1, borderTopColor: BRAND.navy, paddingTop: 5, alignItems: "center", fontSize: 8.5 },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: BRAND.navy, color: "#dbe4f0", paddingHorizontal: 40, paddingVertical: 12, fontSize: 7.5 },
});

export interface ContractPdfData {
  contract: {
    id: number;
    title: string;
    total_value: number;
    entry_value: number;
    installments: number;
    status: string;
    travel_date: string | null;
    signed_at: string | null;
    notes: string;
  };
  client: { name: string; email: string; phone: string; doc: string; address: string } | null;
  pkg: { name: string; location: string; duration: string; includes: string } | null;
  settings: {
    brand_name: string;
    brand_tagline: string;
    email: string;
    phone: string;
    location: string;
    contract_terms?: string;
    address?: string;
    cnpj?: string;
    website?: string;
  };
  logoUrl: string;
}

const STATUS: Record<string, string> = { rascunho: "Reserva", emitido: "Emitido", pago: "Pago", cancelado: "Cancelado" };
const brl = (v: number) => (Number(v) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const date = (d: string | null) => (d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "—");

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.value}>{value || "—"}</Text>
    </View>
  );
}

export function ContractPdf({ contract, client, pkg, settings, logoUrl }: ContractPdfData) {
  const brand = settings.brand_name || "Renantur";
  const company = `${brand} ${settings.brand_tagline || "Viagens e Turismo"}`;
  const today = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const installments = Number(contract.installments) || 1;
  const rest = Math.max(contract.total_value - contract.entry_value, 0);

  return (
    <Document title={`Contrato ${contract.id} - ${clean(pkg?.name)}`}>
      <Page size="A4" style={s.page}>
        <View style={s.band}>
          <View style={s.logoCard}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={logoUrl} style={s.logo} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.kicker}>CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE VIAGEM</Text>
            <Text style={s.title}>{clean(pkg?.name) || clean(contract.title)}</Text>
            <Text style={s.meta}>
              Contrato nº {String(contract.id).padStart(4, "0")}  ·  {STATUS[contract.status] ?? contract.status}  ·  Data da venda{" "}
              {contract.signed_at ? date(contract.signed_at) : today}
            </Text>
          </View>
        </View>
        <View style={s.stripe} />

        <View style={s.cards}>
          <View style={s.card}>
            <Text style={s.cardTitle}>CONTRATANTE</Text>
            <Field label="Nome" value={clean(client?.name)} />
            <Field label="CPF/CNPJ" value={cpf(client?.doc)} />
            <Field label="E-mail" value={client?.email ?? ""} />
            <Field label="Telefone" value={client?.phone ?? ""} />
            <Field label="Endereço" value={clean(client?.address)} />
          </View>
          <View style={s.card}>
            <Text style={s.cardTitle}>VIAGEM</Text>
            <Field label="Pacote" value={clean(pkg?.name)} />
            <Field label="Destino" value={clean(pkg?.location)} />
            <Field label="Duração" value={clean(pkg?.duration)} />
            <Field label="Saída" value={date(contract.travel_date)} />
            <Field label="Inclui" value={clean(pkg?.includes)} />
          </View>
        </View>

        <View style={s.tiles}>
          {[
            ["VALOR TOTAL", brl(contract.total_value)],
            ["ENTRADA", brl(contract.entry_value)],
            ["PARCELAMENTO", installments > 1 ? `${installments}x de ${brl(rest / installments)}` : "À vista"],
          ].map(([label, value]) => (
            <View key={label} style={s.tile}>
              <Text style={s.tileLabel}>{label}</Text>
              <Text style={s.tileValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={s.h2} minPresenceAhead={60}>
          <View style={s.bar} />
          <Text style={s.h2Text}>Condições gerais</Text>
        </View>
        {contractBlocks(settings.contract_terms).map((b, i) =>
          b.kind === "row" ? (
            <View key={i} style={b.header ? s.th : s.tr} wrap={false}>
              {b.cells.map((c, j) => (
                <Text key={j} style={{ flex: j === 0 ? 2 : 1, paddingHorizontal: 8 }}>{c}</Text>
              ))}
            </View>
          ) : (
            <Text key={i} style={b.kind === "heading" ? s.clause : s.paragraph} minPresenceAhead={b.kind === "heading" ? 40 : 0}>
              {b.text}
            </Text>
          ),
        )}

        {contract.notes ? (
          <View style={s.notes} wrap={false}>
            <Text style={{ fontWeight: 700, color: BRAND.navy }}>Observações desta venda</Text>
            <Text>{contract.notes}</Text>
          </View>
        ) : null}

        <View style={s.signArea} wrap={false}>
          <Text>LOCAL E DATA: ____________________________________________</Text>
          <View style={s.signRow}>
            <View style={s.sign}>
              <Text style={{ fontWeight: 600, color: BRAND.navy }}>{clean(client?.name) || "CONTRATANTE / PASSAGEIRO"}</Text>
              <Text>CPF: {cpf(client?.doc) || "______________________"}</Text>
            </View>
            <View style={s.sign}>
              <Text style={{ fontWeight: 600, color: BRAND.navy }}>{brand.toUpperCase()} VIAGENS</Text>
              <Text>Responsável</Text>
            </View>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={{ color: "#fff", fontWeight: 700, fontSize: 8.5 }}>{company}</Text>
          <Text>
            {[settings.address || settings.location, settings.phone && `Tel. ${settings.phone}`, settings.website, settings.cnpj && `CNPJ ${settings.cnpj}`]
              .filter(Boolean)
              .join("  ·  ")}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
