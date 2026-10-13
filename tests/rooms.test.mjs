import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/rooms.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const exports = {};
runInNewContext(outputText, { exports, crypto });
const { suggestRoomTypes, overCapacity } = exports;

test("sugestão: sozinho vai para twin; família cabe nos quartos", () => {
  assert.equal(JSON.stringify(suggestRoomTypes(1)), JSON.stringify(["Twin / duplo solteiro"]));
  assert.equal(JSON.stringify(suggestRoomTypes(2)), JSON.stringify(["Casal"]));
  assert.equal(JSON.stringify(suggestRoomTypes(6)), JSON.stringify(["Quádruplo casal + 2 solteiro", "Casal"]));
  assert.equal(JSON.stringify(suggestRoomTypes(0)), JSON.stringify([]));
});

test("capacidade: bloqueia excesso, colo não ocupa cama, vale entre vendas", () => {
  const twin = { id: "a", type: "Twin / duplo solteiro" };
  const carlos = { room: "a" }, diego = { room: "a" }, bebe = { room: "a", lap: true }, eva = { room: "a" };
  assert.equal(overCapacity([twin], [carlos, diego, bebe]), null);
  assert.equal(overCapacity([twin], [carlos, diego, eva]), twin);
});
