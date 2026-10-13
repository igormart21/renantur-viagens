import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { age } from "@/lib/age";
import type { Passenger } from "@/components/admin/contract-form";
import { BRAND, clean, cpf } from "./brand";

const s = StyleSheet.create({
  page: { fontFamily: BRAND.font, fontSize: 9, color: BRAND.text, paddingBottom: 90 },
  band: { backgroundColor: BRAND.navy, paddingHorizontal: 36, paddingTop: 30, paddingBottom: 26, flexDirection: "row", alignItems: "center", gap: 22 },
  logoCard: { backgroundColor: "#fff", borderRadius: 12, padding: 10, width: 150 },
  logo: { width: 130 },
  kicker: { color: BRAND.orange, fontSize: 8.5, fontWeight: 600, letterSpacing: 2 },
  destination: { color: "#fff", fontSize: 21, fontWeight: 700, lineHeight: 1.2, marginTop: 4 },
  saleNo: { color: "#c9d5e6", fontSize: 9, marginTop: 6 },
  stripe: { height: 5, backgroundColor: BRAND.orange },
  body: { paddingHorizontal: 36, paddingTop: 20 },
  tiles: { flexDirection: "row", gap: 10 },
  tile: { flex: 1, backgroundColor: BRAND.navySoft, borderRadius: 10, padding: 10 },
  tileLabel: { fontSize: 7, fontWeight: 600, color: BRAND.muted, letterSpacing: 1 },
  tileValue: { fontSize: 10.5, fontWeight: 600, color: BRAND.navy, marginTop: 3 },
  h2: { fontSize: 12, fontWeight: 700, color: BRAND.navy, marginTop: 22, marginBottom: 8, flexDirection: "row", alignItems: "center" },
  bar: { width: 4, height: 14, backgroundColor: BRAND.orange, borderRadius: 2, marginRight: 8 },
  table: { borderRadius: 10, borderWidth: 1, borderColor: BRAND.line, overflow: "hidden" },
  th: { flexDirection: "row", backgroundColor: BRAND.navy, color: "#fff", fontSize: 7.5, fontWeight: 600, letterSpacing: 0.8, paddingVertical: 7 },
  tr: { flexDirection: "row", alignItems: "center", paddingVertical: 7, borderTopWidth: 1, borderTopColor: BRAND.line },
  zebra: { backgroundColor: "#f7f9fc" },
  cell: { paddingHorizontal: 8 },
  seat: { backgroundColor: BRAND.orange, color: "#fff", fontWeight: 700, borderRadius: 8, textAlign: "center", paddingVertical: 2, width: 34 },
  name: { fontWeight: 600, color: BRAND.navy, fontSize: 9.5 },
  includes: { flexDirection: "row", flexWrap: "wrap", backgroundColor: BRAND.orangeSoft, borderRadius: 10, padding: 12, rowGap: 6 },
  include: { width: "50%", flexDirection: "row", alignItems: "center", paddingRight: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: BRAND.orange, marginRight: 7 },
  note: { marginTop: 18, borderLeftWidth: 3, borderLeftColor: BRAND.navy, paddingLeft: 10, color: BRAND.muted, fontSize: 8.5, lineHeight: 1.5 },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: BRAND.navy, color: "#dbe4f0", paddingHorizontal: 36, paddingVertical: 14, fontSize: 8 },
  footerName: { color: "#fff", fontWeight: 700, fontSize: 9.5 },
  printed: { position: "absolute", bottom: 76, left: 36, right: 36, textAlign: "right", fontSize: 7, color: BRAND.muted },
});

export interface VoucherData {
  logoUrl: string;
  company: { name: string; address: string; phone: string; whatsapp: string; website: string; cnpj: string };
  saleId: number | string;
  responsible: string;
  destination: string;
  duration: string;
  departure: string | null;
  passengers: Passenger[];
  includes: string[];
}

const date = (d: string | null) => (d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "—");

export function VoucherPdf({ logoUrl, company, saleId, responsible, destination, duration, departure, passengers, includes }: VoucherData) {
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
  const boardings = [...new Set(passengers.map((p) => p.boarding).filter(Boolean))];
  const many = boardings.length > 1;
  const tiles = [
    ["EMBARQUE", date(departure)],
    ["LOCAL DE EMBARQUE", many ? "Ver por passageiro" : boardings[0] || "A confirmar"],
    ["RESPONSÁVEL", clean(responsible) || "—"],
    ["PASSAGEIROS", String(passengers.length)],
  ];
  return (
    <Document title={`Voucher - ${clean(destination)}`}>
      <Page size="A4" style={s.page}>
        <View style={s.band}>
          <View style={s.logoCard}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={logoUrl} style={s.logo} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.kicker}>VOUCHER DE VIAGEM</Text>
            <Text style={s.destination}>{clean(destination)}</Text>
            <Text style={s.saleNo}>
              Venda nº {String(saleId).padStart(4, "0")}{duration ? `  ·  ${clean(duration)}` : ""}
            </Text>
          </View>
        </View>
        <View style={s.stripe} />

        <View style={s.body}>
          <View style={s.tiles}>
            {tiles.map(([label, value]) => (
              <View key={label} style={s.tile}>
                <Text style={s.tileLabel}>{label}</Text>
                <Text style={s.tileValue}>{value}</Text>
              </View>
            ))}
          </View>

          <View style={s.h2}><View style={s.bar} /><Text>Passageiros</Text></View>
          <View style={s.table}>
            <View style={s.th}>
              <Text style={[s.cell, { width: 60 }]}>POLTRONA</Text>
              <Text style={[s.cell, { flex: 1 }]}>PASSAGEIRO</Text>
              <Text style={[s.cell, { width: 110 }]}>DOCUMENTO</Text>
              {many && <Text style={[s.cell, { width: 120 }]}>EMBARQUE</Text>}
              <Text style={[s.cell, { width: 45, textAlign: "right" }]}>IDADE</Text>
            </View>
            {passengers.map((p, i) => (
              <View key={i} style={i % 2 ? [s.tr, s.zebra] : s.tr} wrap={false}>
                <View style={[s.cell, { width: 60 }]}>
                  <Text style={s.seat}>{p.lap ? "Colo" : p.seat ? String(p.seat).padStart(2, "0") : "—"}</Text>
                </View>
                <Text style={[s.cell, s.name, { flex: 1 }]}>{clean(p.name).toUpperCase()}</Text>
                <Text style={[s.cell, { width: 110 }]}>{p.doc ? `CPF ${cpf(p.doc)}` : p.rg ? `RG ${p.rg}` : "—"}</Text>
                {many && <Text style={[s.cell, { width: 120, fontSize: 8 }]}>{p.boarding || "—"}</Text>}
                <Text style={[s.cell, { width: 45, textAlign: "right" }]}>{age(p.birthdate)}</Text>
              </View>
            ))}
          </View>

          {includes.length > 0 && (
            <View wrap={false}>
              <View style={s.h2}><View style={s.bar} /><Text>Incluso no pacote</Text></View>
              <View style={s.includes}>
                {includes.map((item) => (
                  <View key={item} style={s.include}>
                    <View style={s.dot} />
                    <Text style={{ flex: 1 }}>{clean(item)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <Text style={s.note}>
            Apresente este voucher e um documento oficial com foto no embarque. Chegue com antecedência ao local
            combinado — o ônibus não aguarda além do horário programado. Boa viagem!
          </Text>
        </View>

        <Text style={s.printed} fixed>Emitido em {now}</Text>
        <View style={s.footer} fixed>
          <Text style={s.footerName}>{company.name}</Text>
          <Text style={{ marginTop: 3 }}>
            {[company.address, company.phone && `Tel. ${company.phone}`, company.whatsapp && `WhatsApp ${company.whatsapp}`]
              .filter(Boolean)
              .join("  ·  ")}
          </Text>
          <Text style={{ marginTop: 2 }}>{[company.website, company.cnpj && `CNPJ ${company.cnpj}`].filter(Boolean).join("  ·  ")}</Text>
        </View>
      </Page>
    </Document>
  );
}
