import { deepStrictEqual } from "node:assert/strict";
import { findEntries } from "../dist/data.mjs";

const cases = [
  ["penal i", ["penal-i"]],
  ["dolo eventual", ["livros/dolo-eventual"]],
  ["posição de garantidor", ["livros/omissao-impropria"]],
  ["poder constituinte", ["livros/poder-constituinte"]],
  ["astrofísica quântica", []],
];

for (const [query, expected] of cases) {
  const routes = findEntries(query).map(result => result.route);
  deepStrictEqual(routes, expected, `Rotas inesperadas para “${query}”.`);
}

console.log(`Smoke: ${cases.length} buscas passaram.`);
