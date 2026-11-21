import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bibliography, books, topics } from "../dist/data.mjs";
import { addFreeMaterials, addFreeReadings } from "../dist/catalogo/leituras-gratuitas.mjs";
import { editionAccess, bookAccess } from "../dist/ui/acesso.mjs";

const lot = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-leituras-gratuitas-2026-11-20.json", import.meta.url)));
const links = topics.flatMap(topic => topic.freeReadings.map(reading => [topic.id, reading.material.id]));
assert.equal(new Set(links.map(pair => pair.join("/"))).size, 312);
assert.equal(new Set(links.map(pair => pair[1])).size, 123);
assert.deepEqual(addFreeMaterials(books), books);
assert.deepEqual(addFreeReadings(topics), topics);
for (const item of lot.temas_existentes) assert.ok(topics.find(topic => topic.id === item.id).freeReadings.length);

for (const [query, route] of [
  ["controle de fusões", "livros/atos-concentracao"],
  ["furto com câmera é crime impossível?", "livros/crime-impossivel"],
  ["art 170 da Constituição", "livros/ordem-economica"],
  ["qual base legal usar para tratar dados de menores?", "livros/proposta-dados-criancas-lgpd"],
  ["Guia H do Cade", "livro/cade-guia-h"],
  ["9786555181333", "livro/rvbi-c594d1bd1a33ee406034?isbn=9786555181333"],
]) assert.equal((await bibliography.search(query))[0]?.route, route, query);

const guide = await bibliography.book("cade-guia-h");
assert.equal(guide.editions[0].id, "cade-guia-h-2016-pdf");
assert.equal(bookAccess(guide).label, "Gratuito · texto integral");
const chapter = await bibliography.book("senado-intervencao-economia-mattos");
assert.equal(bookAccess(chapter).label, "Gratuito · capítulo integral");
const fixture = { source: "https://example.org/material" };
assert.equal(editionAccess({ ...fixture, access: "Prévia" }).action, "Ver prévia");
assert.equal(editionAccess({ ...fixture, access: "Acesso institucional" }).action, "Consultar acesso institucional");
assert.equal(editionAccess({ ...fixture, access: "Registro institucional" }), undefined);
assert.equal(editionAccess({ ...fixture, access: "Sumário aberto" }), undefined);
assert.equal(bookAccess({ editions: [...guide.editions, fixture] }).label, "Tem edição gratuita");
console.log("Leituras gratuitas: vínculos, reimportação, buscas, edições e tipos de acesso passaram.");
