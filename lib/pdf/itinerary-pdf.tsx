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
  title: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0a2d57", marginBottom: 4 },
  sub: { fontSize: 10, color: "#888", marginBottom: 18 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#0a2d57", marginBottom: 8, textTransform: "uppercase" },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 110, color: "#666" },
  value: { flex: 1, fontFamily: "Helvetica-Bold" },
  includeChip: { fontSize: 9.5, marginBottom: 3 },
  day: { marginBottom: 12, paddingLeft: 12, borderLeft: "2 solid #FF6B57" },
  dayLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#FF6B57", textTransform: "uppercase", marginBottom: 2 },
  dayTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: "#0a2d57", marginBottom: 2 },
  dayPlace: { fontSize: 9.5, color: "#888", marginBottom: 3 },
  dayDesc: { fontSize: 10, textAlign: "justify" },
  footer: { position: "absolute", bottom: 36, left: 48, right: 48, fontSize: 8, color: "#999", borderTop: "1 solid #ddd", paddingTop: 8 },
});

export interface ItineraryPdfDay {
  day?: string;
  title?: string;
  place?: string;
  description?: string;
}

export interface ItineraryPdfData {
  pkg: {
    name: string;
    location: string;
    duration: string;
    includes: string;
    entry: string;
    installments: string;
    monthly: string;
    total: string;
  };
  itinerary: ItineraryPdfDay[];
  settings: {
    brand_name: string;
    brand_tagline: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
}

export function ItineraryPdf({ pkg, itinerary, settings }: ItineraryPdfData) {
  const includesList = pkg.includes
    .split(/\s*\+\s*/)
    .map((x) => x.trim())
    .filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>{settings.brand_name || "Renantur"}</Text>
          <Text style={styles.tagline}>
            {settings.brand_tagline} · {settings.email} · {settings.phone} · {settings.location}
          </Text>
        </View>

        <Text style={styles.title}>Roteiro — {pkg.name}</Text>
        <Text style={styles.sub}>
          {pkg.duration ? `${pkg.duration} · ` : ""}{pkg.location || pkg.name}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do pacote</Text>
          <View style={styles.row}><Text style={styles.label}>Destino</Text><Text style={styles.value}>{pkg.location || "—"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Duração</Text><Text style={styles.value}>{pkg.duration || "—"}</Text></View>
          {pkg.entry ? (
            <View style={styles.row}><Text style={styles.label}>Entrada</Text><Text style={styles.value}>R$ {pkg.entry}</Text></View>
          ) : null}
          {pkg.monthly ? (
            <View style={styles.row}><Text style={styles.label}>Parcelas</Text><Text style={styles.value}>{pkg.installments}x de R$ {pkg.monthly}</Text></View>
          ) : null}
          {pkg.total ? (
            <View style={styles.row}><Text style={styles.label}>Total à vista</Text><Text style={styles.value}>R$ {pkg.total}</Text></View>
          ) : null}
        </View>

        {includesList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>O que está incluso</Text>
            {includesList.map((item, i) => (
              <Text key={i} style={styles.includeChip}>• {item}</Text>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dia a dia</Text>
          {itinerary.map((d, i) => (
            <View key={i} style={styles.day}>
              {d.day ? <Text style={styles.dayLabel}>{d.day}</Text> : null}
              {d.title ? <Text style={styles.dayTitle}>{d.title}</Text> : null}
              {d.place ? <Text style={styles.dayPlace}>{d.place}</Text> : null}
              {d.description ? <Text style={styles.dayDesc}>{d.description}</Text> : null}
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          {settings.brand_name || "Renantur"} · {settings.whatsapp ? settings.whatsapp.replace("https://wa.me/", "") : ""} — roteiro gerado em {new Date().toLocaleDateString("pt-BR")}. Valores e condições sujeitos a confirmação.
        </Text>
      </Page>
    </Document>
  );
}
