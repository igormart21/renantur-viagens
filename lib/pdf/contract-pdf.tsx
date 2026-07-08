import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 11, fontFamily: "Helvetica", color: "#2B2B2B", lineHeight: 1.5 },
  header: { borderBottom: "2 solid #0a2d57", paddingBottom: 12, marginBottom: 20 },
  brand: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#0a2d57" },
  tagline: { fontSize: 9, color: "#666" },
  title: { fontSize: 15, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  sub: { fontSize: 9, color: "#888", marginBottom: 16 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#0a2d57", marginBottom: 6, textTransform: "uppercase" },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 130, color: "#666" },
  value: { flex: 1, fontFamily: "Helvetica-Bold" },
  paragraph: { marginBottom: 8, textAlign: "justify" },
  footer: { position: "absolute", bottom: 36, left: 48, right: 48, fontSize: 8, color: "#999", borderTop: "1 solid #ddd", paddingTop: 8 },
  signRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 48 },
  signBox: { width: "45%", borderTop: "1 solid #333", paddingTop: 4, fontSize: 9, textAlign: "center" },
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
  };
}

function brl(v: number) {
  return (Number(v) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function date(d: string | null) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR");
}

export function ContractPdf({ contract, client, pkg, settings }: ContractPdfData) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>{settings.brand_name || "Renantur"}</Text>
          <Text style={styles.tagline}>
            {settings.brand_tagline} · {settings.email} · {settings.phone} · {settings.location}
          </Text>
        </View>

        <Text style={styles.title}>Contrato de Prestação de Serviços de Viagem</Text>
        <Text style={styles.sub}>Nº {contract.id} · {contract.title} · Status: {contract.status}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contratante</Text>
          <View style={styles.row}><Text style={styles.label}>Nome</Text><Text style={styles.value}>{client?.name ?? "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>CPF/CNPJ</Text><Text style={styles.value}>{client?.doc || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>E-mail</Text><Text style={styles.value}>{client?.email || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Telefone</Text><Text style={styles.value}>{client?.phone || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Endereço</Text><Text style={styles.value}>{client?.address || "—"}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pacote / Roteiro</Text>
          <View style={styles.row}><Text style={styles.label}>Pacote</Text><Text style={styles.value}>{pkg?.name ?? "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Destino</Text><Text style={styles.value}>{pkg?.location || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Duração</Text><Text style={styles.value}>{pkg?.duration || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Inclui</Text><Text style={styles.value}>{pkg?.includes || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Data da viagem</Text><Text style={styles.value}>{date(contract.travel_date)}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condições financeiras</Text>
          <View style={styles.row}><Text style={styles.label}>Valor total</Text><Text style={styles.value}>{brl(contract.total_value)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Entrada</Text><Text style={styles.value}>{brl(contract.entry_value)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Parcelamento</Text><Text style={styles.value}>{contract.installments}x</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cláusulas</Text>
          <Text style={styles.paragraph}>
            1. A CONTRATADA compromete-se a prestar os serviços de turismo descritos neste
            instrumento, conforme o pacote e roteiro acima, observadas as condições comerciais
            pactuadas.
          </Text>
          <Text style={styles.paragraph}>
            2. O CONTRATANTE declara estar ciente das condições de pagamento, prazos e políticas
            de cancelamento e remarcação informadas pela CONTRATADA.
          </Text>
          {contract.notes ? (
            <Text style={styles.paragraph}>3. Observações: {contract.notes}</Text>
          ) : null}
        </View>

        <View style={styles.signRow}>
          <Text style={styles.signBox}>{settings.brand_name || "Renantur"} (Contratada)</Text>
          <Text style={styles.signBox}>{client?.name ?? "Contratante"}</Text>
        </View>

        <Text style={styles.footer}>
          {settings.brand_name || "Renantur"} — documento gerado pelo sistema em {new Date().toLocaleString("pt-BR")}.
        </Text>
      </Page>
    </Document>
  );
}
