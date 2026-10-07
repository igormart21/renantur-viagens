import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { age } from "@/lib/age";
import type { Passenger } from "@/components/admin/contract-form";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#222" },
  printed: { textAlign: "right", fontSize: 8, color: "#555", marginBottom: 6 },
  box: { borderTop: "2 solid #000", paddingVertical: 10 },
  header: { flexDirection: "row", alignItems: "center", gap: 16 },
  logo: { width: 170 },
  company: { flex: 1, gap: 3, fontFamily: "Helvetica-Bold", fontSize: 10 },
  title: { fontSize: 18, fontFamily: "Helvetica-Bold", textAlign: "center", marginBottom: 6 },
  h2: { fontSize: 14, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  line: { marginBottom: 3 },
  th: { flexDirection: "row", borderBottom: "1 solid #000", paddingBottom: 3, fontFamily: "Helvetica-Bold" },
  tr: { flexDirection: "row", borderBottom: "0.5 solid #bbb", paddingVertical: 4, fontSize: 9 },
  seat: { width: 55 },
  name: { flex: 1 },
  doc: { width: 130 },
  boarding: { width: 140 },
  age: { width: 35, textAlign: "right" },
});

export interface VoucherData {
  logoUrl: string;
  company: { name: string; address: string; phone: string; whatsapp: string; website: string; cnpj: string };
  responsible: string;
  destination: string;
  departure: string | null;
  passengers: Passenger[];
  includes: string;
}

const date = (d: string | null) => (d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "—");

export function VoucherPdf({ logoUrl, company, responsible, destination, departure, passengers, includes }: VoucherData) {
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "long", timeStyle: "medium" });
  const boardings = [...new Set(passengers.map((p) => p.boarding).filter(Boolean))];
  return (
    <Document title={`Voucher - ${destination}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.printed}>Impresso em {now}</Text>
        <View style={[styles.box, styles.header]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={logoUrl} style={styles.logo} />
          <View style={styles.company}>
            <Text style={styles.title}>Voucher da Viagem</Text>
            <Text>{company.name}</Text>
            {company.address ? <Text>{company.address}</Text> : null}
            <Text>{[company.phone, company.whatsapp && `${company.whatsapp} WhatsApp`].filter(Boolean).join("  ")}</Text>
            {company.website ? <Text>{company.website}</Text> : null}
            {company.cnpj ? <Text>CNPJ: {company.cnpj}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Dados da Viagem</Text>
          <Text style={styles.line}>Responsável: {responsible}</Text>
          <Text style={styles.line}>Destino: {destination}</Text>
          <Text style={styles.line}>Data do embarque: {date(departure)}</Text>
          <Text style={styles.line}>Local do embarque: {boardings.join(" / ") || "—"}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.h2}>Passageiros</Text>
          <View style={styles.th}>
            <Text style={styles.seat}>Poltrona</Text>
            <Text style={styles.name}>Passageiro</Text>
            <Text style={styles.doc}>Documento</Text>
            {boardings.length > 1 && <Text style={styles.boarding}>Embarque</Text>}
            <Text style={styles.age}>Idade</Text>
          </View>
          {passengers.map((p, i) => (
            <View key={i} style={styles.tr}>
              <Text style={styles.seat}>{p.lap ? "Colo" : (p.seat ?? "—")}</Text>
              <Text style={styles.name}>{p.name.toUpperCase()}</Text>
              <Text style={styles.doc}>{p.doc ? `CPF: ${p.doc}` : "—"}</Text>
              {boardings.length > 1 && <Text style={styles.boarding}>{p.boarding}</Text>}
              <Text style={styles.age}>{age(p.birthdate)}</Text>
            </View>
          ))}
        </View>

        {includes ? (
          <View style={styles.box}>
            <Text style={styles.h2}>Incluso no Pacote</Text>
            <Text>{includes.toUpperCase()}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
