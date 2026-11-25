import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { books, topics, catalog } from "../dist/data.mjs";
import { verificationSection } from "../dist/ui/verificacao.mjs";
import reviews from "../dist/catalogo/ampliado/novembro/revisao-juridica.mjs";
const raw = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-revisao-juridica-2026-11-24.json", import.meta.url)));
const baseline = JSON.parse(readFileSync(new URL("../data/catalogo/auditoria-snapshot-2026-11-24.json", import.meta.url)));
assert.deepEqual(reviews, raw, "Módulo gerado não corresponde à fonte");
assert.equal(topics.length, 308);
assert.equal(catalog.length, 19);
assert.equal(reviews.registros.length, 74);
assert.equal(new Set(reviews.registros.map(row => row.tema_id)).size, 74);
assert.deepEqual(
  new Set(reviews.registros.map(row => row.tema_id)),
  new Set(baseline.fila_revisao_editorial_substantiva.map(row => row.id)),
  "Mudança não documentada na fila original de 74 temas"
);
const byId = new Map(topics.map(item => [item.id, item]));
const counts = { pendente_revisao_juridica: 0, revisao_parcial: 0, revisao_concluida_no_escopo: 0 };
const official = (url) => /^https:\/\/(www\.)?(gov\.br|planalto\.gov\.br|tse\.jus\.br|portal\.stf\.jus\.br)/.test(url);
for (const row of reviews.registros) {
  const topic = byId.get(row.tema_id);
  assert.ok(topic, "Tema ausente: " + row.tema_id);
  assert.ok(Object.hasOwn(counts,row.status), "Status incorreto: " + row.tema_id);
  counts[row.status]++;
  assert.equal(topic.verification?.status,row.status,row.tema_id);
  assert.equal(topic.editorialPending,row.status !== "revisao_concluida_no_escopo",row.tema_id);
  assert.deepEqual(topic.verification.historico,row.historico,row.tema_id);
  const html = verificationSection(topic,(url,label)=>`<a href="${url}">${label}</a>`);
  assert.match(html,/Histórico de verificação/);
  if(row.status === "pendente_revisao_juridica") {
    assert.equal(row.historico.length,0);
    assert.match(html,/sem registro de conferência substantiva concluída/);
  } else {
    assert.ok(row.historico.length > 0);
    for (const event of row.historico) {
      assert.match(event.data,/^20\d{2}-\d{2}-\d{2}$/);
      assert.ok(event.escopo?.length > 15);
      assert.ok(event.resultado?.length > 20);
      assert.ok(event.fontes?.length > 0);
      assert.ok(event.fontes.every(source=>official(source.url)),row.tema_id);
      assert.ok(html.includes(event.fontes[0].url),row.tema_id);
    }
    assert.ok(topic.answer?.length>60);
  }
}
assert.deepEqual(counts, {pendente_revisao_juridica:63,revisao_parcial:8,revisao_concluida_no_escopo:3});
assert.equal(topics.filter(item=>item.editorialPending).length,71);
assert.equal(books.length,269);
assert.equal(verificationSection({},""),"");
console.log("Revisão jurídica: 74 temas, 3 sínteses conferidas, 8 conferências parciais, 63 pendentes; 71 alertas remanescentes.");
