import { lexaArticle } from "../dist/ui/legislacao.mjs";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bibliography, books, topics } from "../dist/data.mjs";
import { addFreeMaterials, addFreeReadings } from "../dist/catalogo/leituras-gratuitas.mjs";
import { editionAccess, bookAccess } from "../dist/ui/acesso.mjs";

const lot = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-leituras-gratuitas-2026-11-20.json", import.meta.url)));
const links = topics.flatMap(topic => topic.freeReadings.map(reading => [topic.id, reading.material.id]));
assert.equal(new Set(links.map(pair => pair.join("/"))).size, 311);
assert.equal(new Set(links.map(pair => pair[1])).size, 122);
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

const mergers = topics.find(topic => topic.id === "atos-concentracao");
assert.equal(mergers.freeReadings.length, 5);
assert.ok(!mergers.freeReadings.some(item => item.material.id === "cade-perguntas-concentracao"));
assert.equal(mergers.sources.filter(source => source.url.includes("perguntas-sobre-atos-de-concentracao-economica")).length, 1);

const guide = await bibliography.book("cade-guia-h");
assert.equal(guide.editions[0].id, "cade-guia-h-2016-pdf");
assert.equal(bookAccess(guide).label, "Publicação institucional");
const cadeFiles = lot.materiais.filter(material => new URL(material.link_leitura).hostname === "cdn.cade.gov.br");
assert.equal(cadeFiles.length, 6);
for (const material of cadeFiles) {
  const access = editionAccess({ readingMaterial: material });
  assert.equal(access.unavailableUrl, material.link_leitura);
  assert.equal(new URL(access.url).hostname, "www.gov.br");
  assert.notEqual(access.action, "Ler gratuitamente");
  assert.equal(access.label, "Publicação institucional");
  assert.equal(access.free, false);
}
const correctedPdfs = lot.materiais.filter(material => material.pdf_entrega);
assert.equal(correctedPdfs.length, 8);
for (const material of correctedPdfs) {
  const access = editionAccess({ readingMaterial: material });
  assert.equal(access.url, material.link_leitura);
  assert.equal(access.action, "Ler gratuitamente");
  assert.equal(access.downloadsPdf, material.pdf_entrega === "anexo");
}
const anpd = await bibliography.book("anpd-guia-legitimo-interesse");
const anpdEdition = anpd.editions.find(edition => edition.id === "anpd-guia-legitimo-interesse-2024-pdf");
assert.equal(anpdEdition.source, editionAccess(anpdEdition).url);
const cnj = await bibliography.book("cnj-manual-reconhecimento");
assert.match(cnj.editions[0].name, /v9/);
const chapter = await bibliography.book("senado-intervencao-economia-mattos");
assert.equal(bookAccess(chapter).label, "Gratuito · capítulo integral");
const fixture = { source: "https://example.org/material" };
assert.equal(editionAccess({ ...fixture, access: "Prévia" }).action, "Ver prévia");
assert.equal(editionAccess({ ...fixture, access: "Acesso institucional" }).action, "Consultar acesso institucional");
assert.equal(editionAccess({ ...fixture, access: "Registro institucional" }), undefined);
assert.equal(editionAccess({ ...fixture, access: "Sumário aberto" }), undefined);
assert.equal(bookAccess({ editions: [{ ...fixture, access: "Texto integral aberto" }, fixture] }).label, "Tem edição gratuita");
console.log("Leituras gratuitas: vínculos, reimportação, buscas, edições e tipos de acesso passaram.");

const findLaw = (topicId, materialId) => topics.find(topic => topic.id === topicId).freeReadings.find(reading => reading.material.id === materialId);
const omission = findLaw("omissao-impropria", "br-codigo-penal");
assert.equal(lexaArticle(omission.material, omission.onde_comecar).url, "https://jaoafb.github.io/lexa./#/penal/13");
const economy = findLaw("ordem-economica", "br-constituicao-federal");
assert.equal(lexaArticle(economy.material, economy.onde_comecar).url, "https://jaoafb.github.io/lexa./#/cf/170");
assert.equal(lexaArticle({ id: "br-lgpd" }, { rotulo: "Art. 7º" }), undefined);

const lei9784 = lot.materiais.find(material => material.id === "br-lei-processo-administrativo");
assert.match(lei9784.link_leitura, /lei-9784-29-janeiro-1999-322239-normaatualizada-pl\.html$/);
const administrativo = topics.flatMap(topic => topic.freeReadings.filter(reading => reading.material.id === lei9784.id));
assert.equal(administrativo.length, 4);
assert.ok(administrativo.every(reading => reading.material.link_leitura === lei9784.link_leitura));
