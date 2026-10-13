import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { age } from "@/lib/age";
import type { Occupant, TripRoom } from "@/lib/admin/trip";

const NAVY = "#17354d";
const styles = StyleSheet.create({
  page: { padding: 28, paddingBottom: 40, fontSize: 9, fontFamily: "Helvetica", color: "#1f2933" },
  header: { flexDirection: "row", alignItems: "center", gap: 14, borderBottom: `2 solid ${NAVY}`, paddingBottom: 8, marginBottom: 10 },
  logo: { width: 80 },
  title: { fontSize: 15, fontFamily: "Helvetica-Bold", color: NAVY },
  sub: { fontSize: 9.5, marginTop: 2 },
  muted: { color: "#5b6770" },
  h2: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: NAVY, marginTop: 12, marginBottom: 4 },
  th: { flexDirection: "row", backgroundColor: "#e7eef3", paddingVertical: 4, fontFamily: "Helvetica-Bold" },
  tr: { flexDirection: "row", borderBottom: "0.5 solid #c5ced5", paddingVertical: 3.5 },
  roomStart: { borderTop: `1 solid ${NAVY}` },
  cell: { paddingHorizontal: 3 },
  footer: { position: "absolute", bottom: 16, left: 28, right: 28, fontSize: 7.5, color: "#7b8790", flexDirection: "row", justifyContent: "space-between" },
  stop: { backgroundColor: "#eef3f6", borderRadius: 6, padding: 10, marginTop: 10 },
  stopTitle: { fontFamily: "Helvetica-Bold", color: NAVY, fontSize: 10.5, marginBottom: 6 },
  guest: { flexDirection: "row", gap: 8, marginTop: 6 },
  box: { width: 11, height: 11, border: `1 solid ${NAVY}`, marginTop: 1 },
  guestName: { fontFamily: "Helvetica-Bold", fontSize: 10.5, color: NAVY },
});

export interface TripPdfData {
  logoUrl: string;
  company: string;
  pkgName: string;
  departure: string | null;
}

const date = (d: string | null | undefined) => (d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "—");
const generatedAt = () =>
  new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
const w = (width?: number) => [styles.cell, width ? { width } : { flex: 1 }];

/** Cabeçalho e rodapé repetidos em todas as páginas, com data/hora de geração. */
function Frame({ data, title, extra, children }: { data: TripPdfData; title: string; extra: string; children: React.ReactNode }) {
  const at = generatedAt();
  return (
    <>
      <View style={styles.header} fixed>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={data.logoUrl} style={styles.logo} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{data.pkgName} | Saída: {date(data.departure)}</Text>
          <Text style={[styles.sub, styles.muted]}>{extra} | Gerada em: {at}</Text>
        </View>
      </View>
      {children}
      <View style={styles.footer} fixed>
        <Text>{data.company}</Text>
        <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
      </View>
    </>
  );
}

export function RoomingPdf({ rooms, unassigned, ...data }: TripPdfData & { rooms: TripRoom[]; unassigned: Occupant[] }) {
  const filled = rooms.filter((r) => r.guests.length > 0);
  const guests = filled.reduce((n, r) => n + r.guests.length, 0);
  const byType = Object.entries(filled.reduce<Record<string, number>>((a, r) => ({ ...a, [r.type]: (a[r.type] ?? 0) + 1 }), {}));
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <Document title={`Rooming list - ${data.pkgName}`}>
      <Page size="A4" style={styles.page}>
        <Frame data={data} title="ROOMING LIST" extra={`${filled.length} apartamentos · ${guests} hóspedes`}>
          <View style={styles.th} fixed>
            <Text style={w(42)}>Quarto</Text>
            <Text style={w(40)}>Apto</Text>
            <Text style={w(135)}>Configuração</Text>
            <Text style={w()}>Hóspede</Text>
            <Text style={w(58)}>Nascimento</Text>
            <Text style={w(30)}>Idade</Text>
          </View>
          {filled.map((r) => (
            <View key={r.id} wrap={false} style={styles.roomStart}>
              {r.guests.map((g, i) => (
                <View key={i} style={styles.tr}>
                  <Text style={w(42)}>{i === 0 ? pad(r.number) : ""}</Text>
                  <Text style={w(40)}>{i === 0 ? r.apto || "—" : ""}</Text>
                  <Text style={w(135)}>{i === 0 ? `${r.type}\n${r.beds}` : ""}</Text>
                  <Text style={w()}>{g.name.toUpperCase()}{g.lap ? " (CRIANÇA DE COLO)" : ""}</Text>
                  <Text style={w(58)}>{date(g.birthdate)}</Text>
                  <Text style={w(30)}>{age(g.birthdate)}</Text>
                </View>
              ))}
              {r.notes ? <Text style={[styles.cell, styles.muted, { paddingVertical: 2 }]}>Obs.: {r.notes}</Text> : null}
            </View>
          ))}
          <Text style={[styles.sub, { marginTop: 8 }]}>Resumo: {byType.map(([t, n]) => `${n} ${t}`).join(" · ") || "—"}</Text>
          {unassigned.length > 0 && (
            <View wrap={false}>
              <Text style={styles.h2}>Pendentes — sem quarto definido ({unassigned.length})</Text>
              {unassigned.map((g, i) => (
                <View key={i} style={styles.tr}>
                  <Text style={w()}>{g.name.toUpperCase()}{g.lap ? " (CRIANÇA DE COLO)" : ""}</Text>
                  <Text style={w(90)}>Venda nº {g.saleId}</Text>
                </View>
              ))}
            </View>
          )}
        </Frame>
      </Page>
    </Document>
  );
}

/** Lista para a transportadora: uma linha por passageiro, em paisagem. */
export function TransportPdf({ passengers, ...data }: TripPdfData & { passengers: Occupant[] }) {
  const list = [...passengers].sort((a, b) => (a.seat ?? 999) - (b.seat ?? 999));
  return (
    <Document title={`Lista de passageiros - ${data.pkgName}`}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Frame data={data} title="RENANTUR | LISTA DE PASSAGEIROS" extra={`Total: ${list.length} passageiros`}>
          <View style={styles.th} fixed>
            <Text style={w(28)}>Nº</Text>
            <Text style={w()}>Nome completo</Text>
            <Text style={w(95)}>CPF</Text>
            <Text style={w(90)}>RG</Text>
            <Text style={w(85)}>Órgão/UF</Text>
            <Text style={w(65)}>Nascimento</Text>
            <Text style={w(50)}>Poltrona</Text>
          </View>
          {list.map((p, i) => (
            <View key={i} style={styles.tr} wrap={false}>
              <Text style={w(28)}>{i + 1}</Text>
              <Text style={w()}>{p.name.toUpperCase()}</Text>
              <Text style={w(95)}>{p.doc || "—"}</Text>
              <Text style={w(90)}>{p.rg || "—"}</Text>
              <Text style={w(85)}>{p.rg_issuer || "—"}</Text>
              <Text style={w(65)}>{date(p.birthdate)}</Text>
              <Text style={w(50)}>{p.lap ? "Colo" : (p.seat ?? "—")}</Text>
            </View>
          ))}
        </Frame>
      </Page>
    </Document>
  );
}

/** Lista de embarque do guia: por ponto de embarque, com quadrado para marcar presença. */
export function GuidePdf({ groups, ...data }: TripPdfData & { groups: [string, Occupant[]][] }) {
  const total = groups.reduce((n, [, list]) => n + list.length, 0);
  return (
    <Document title={`Lista de embarque - ${data.pkgName}`}>
      <Page size="A4" style={styles.page}>
        <Frame data={data} title="LISTA DE EMBARQUE" extra={`Total: ${total} passageiros`}>
          {groups.map(([place, list]) => (
            <View key={place} style={styles.stop}>
              <Text style={styles.stopTitle}>{place} ({list.length})</Text>
              {list.map((p, i) => (
                <View key={i} style={styles.guest} wrap={false}>
                  <View style={styles.box} />
                  <View>
                    <Text style={styles.guestName}>
                      {p.name} | {p.lap ? "Criança de colo" : `Poltrona ${p.seat ? String(p.seat).padStart(2, "0") : "—"}`}
                    </Text>
                    <Text style={{ marginTop: 2 }}>{p.phone || "Sem telefone"}</Text>
                    <Text style={[styles.muted, { marginTop: 1 }]}>
                      {p.contact ? `Responsável pelo contato: ${p.contact}` : "Contato próprio"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Frame>
      </Page>
    </Document>
  );
}
