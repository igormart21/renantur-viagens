import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/admin/sales.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const exports = {};
runInNewContext(outputText, { exports });
const { validateSeats, packagePrice } = exports;
const p = (seat, lap = false) => ({ name: "Ana", doc: "", birthdate: "", seat, lap, boarding: "", price: 100 });

test("assentos: válidos, ocupados, repetidos e fora do ônibus", () => {
  assert.equal(validateSeats([p(1), p(2)], 4, [[p(3)]], true), null);
  assert.match(validateSeats([p(3)], 4, [[p(3)]], true), /já foi vendido/);
  assert.match(validateSeats([p(1), p(1)], 4, [], true), /repetido/);
  assert.match(validateSeats([p(5)], 4, [], true), /não existe/);
});

test("vagas: colo não conta; venda cancelada não bloqueia", () => {
  assert.equal(validateSeats([p(null), p(null, true)], 2, [[p(null)]], true), null);
  assert.match(validateSeats([p(null), p(null)], 2, [[p(null)]], true), /restam 1 de 2/);
  assert.equal(validateSeats([p(null), p(null)], 2, [[p(null)]], false), null);
});

test("preço por passageiro: à vista ou entrada + parcelas", () => {
  assert.equal(packagePrice({ total: "1.880,00" }), 1880);
  assert.equal(packagePrice({ total: "", entry: "100,00", installments: 10, monthly: "150,00" }), 1600);
});
