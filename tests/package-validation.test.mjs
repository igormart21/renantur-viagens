import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Usa o TypeScript já instalado no projeto, sem depender de outro test runner.
const source = readFileSync(new URL("../lib/admin/package-validation.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const exports = {};
runInNewContext(outputText, { exports });
const { validatePackage, moneyValue } = exports;
const base = () => ({ name: "São Luís", slug: "", total: "2.500,00", monthly: "", entry: "", installments: 0, itinerary: [], faq: [], highlights: ["Hotel", "City tour"] });

test("cadastro à vista gera URL e resumo, sem parcelas vazias", () => {
  const row = validatePackage(base());
  assert.equal(row.slug, "sao-luis");
  assert.equal(row.total, "2.500,00");
  assert.equal(row.installments, 0);
  assert.equal(row.includes, "Hotel + City tour");
});
test("parcelamento com entrada preserva valor à vista independente", () => {
  const row = validatePackage({ ...base(), entry: "500", monthly: "188", installments: 12 });
  assert.equal(row.entry, "500,00");
  assert.equal(row.monthly, "188,00");
  assert.equal(row.total, "2.500,00");
  assert.equal(row.installments, 12);
});
test("parcelamento sem entrada e sem oferta à vista", () => {
  const row = validatePackage({ ...base(), total: "", monthly: "188,50", installments: 12, entry: "0" });
  assert.equal(row.entry, "");
  assert.equal(row.total, "");
  assert.equal(row.monthly, "188,50");
});
test("recusa preços malformados e parcelas fracionadas", () => {
  for (const price of ["R$ 500", "abc", "-5", "1,999", "1.23"]) assert.throws(() => moneyValue(price), /valores em reais/);
  assert.throws(() => validatePackage({ ...base(), monthly: "200", installments: 1.5 }), /quantidade de parcelas/);
  assert.throws(() => validatePackage({ ...base(), total: "" }), /valor à vista ou o parcelamento/);
  assert.throws(() => validatePackage({ ...base(), entry: "500" }), /parcelamento/);
});
test("mantém roteiro e URL existentes e recusa estrutura inválida", () => {
  const itinerary = [{ day: "1º DIA", title: "City tour", place: "Parte sul", description: "Visita.\nRetorno ao hotel." }];
  const row = validatePackage({ ...base(), slug: "circuito-antigo", itinerary });
  assert.equal(row.slug, "circuito-antigo");
  assert.deepEqual(row.itinerary, itinerary);
  assert.throws(() => validatePackage({ ...base(), itinerary: [null] }), /roteiro/);
  assert.throws(() => validatePackage({ ...base(), faq: "invalid" }), /dúvidas/);
});
