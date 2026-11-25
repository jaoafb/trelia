import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { books, topics, catalog, findEntries } from "../dist/data.mjs";
import { readingEvidence } from "../dist/catalogo/leituras.mjs";
import { novemberTopicId } from "../dist/catalogo/ampliado/curadoria-novembro.mjs";
import cycle from "../dist/catalogo/ampliado/novembro/ciclo-1.mjs";
import marco1 from "../dist/catalogo/ampliado/novembro/marco-1.mjs";
const original = JSON.parse(readFileSync(new URL("../data/catalogo/trelia-ciclo1-qualidade-bibliografica-2026-11-25.json", import.meta.url)));
const snapshot = JSON.parse(readFileSync(new URL("../data/catalogo/auditoria-snapshot-2026-11-24.json", import.meta.url)));
assert.deepEqual(cycle, {amostra:original.amostra,obras_novas:original.obras_novas,indicacoes_novas:original.indicacoes_novas},"Módulo gerado deve seguir a fonte editorial");
assert.equal(cycle.amostra.length,25);
assert.equal(new Set(cycle.amostra.map(x=>x.tema_id)).size,25);
assert.equal(new Set(cycle.amostra.map(x=>x.area_id)).size,19);
assert.equal(topics.length,308,"Ciclo 1 não cria novos temas");
assert.equal(catalog.length,19);
// Reconstitui o recorte histórico antes das novas indicações do Marco 1.
const laterBooks = new Set(marco1.obras_novas.map(book => book.id));
const laterPairs = new Set([...marco1.indicacoes_novas, ...marco1.indicacoes_adicionais].map(item => novemberTopicId(item.tema_id) + "/" + item.obra_id));
const hadBookInCycle = topic => Object.keys(topic.recommendations ?? {}).some(id => !laterPairs.has(topic.id + "/" + id));
assert.equal(books.filter(book => !laterBooks.has(book.id)).length,snapshot.resumo.obras+2);
assert.equal(cycle.indicacoes_novas.length,3);
assert.equal(cycle.obras_novas.length,2);
const byId=new Map(topics.map(t=>[t.id,t]));
const bookById=new Map(books.map(b=>[b.id,b]));
const baselineMissing=new Set(snapshot.fila_sem_indicacao_bibliografica_especifica.map(t=>t.id));
const newIds=new Set(cycle.indicacoes_novas.map(i=>i.tema_id));
const statuses={sumario_editorial_confirmado_na_amostra:0,pendente_revalidacao_da_fonte:0,lacuna_preenchida_com_capitulo:0,permanece_sem_capitulo_confirmado:0};
for(const item of cycle.amostra) {
  const id=novemberTopicId(item.tema_id);
  const topic=byId.get(id);
  assert.ok(topic,"Tema inexistente: "+id);
  assert.equal(topic.area,item.area_id,item.tema_id);
  assert.ok(Object.hasOwn(statuses,item.resultado_ciclo1),"Status inválido: "+item.resultado_ciclo1);
  statuses[item.resultado_ciclo1]++;
  assert.ok(findEntries(item.consulta).some(hit=>hit.route==="livros/"+id),"Busca natural não encontrou "+id+" para '"+item.consulta+"'");
  assert.ok(findEntries(topic.title).some(hit=>hit.route==="livros/"+id),"Busca por título não encontrou "+id);
  const isNew=newIds.has(item.tema_id);
  const hasBook=hadBookInCycle(topic);
  if(item.situacao_inicial==="sem_indicacao_especifica") {
    assert.ok(baselineMissing.has(id),"O tema deveria constar como lacuna inicial: "+id);
    assert.equal(hasBook,isNew,"Nova cobertura incompatível com status: "+id);
  } else {
    assert.ok(!baselineMissing.has(id),"Indicação prévia contradiz snapshot: "+id);
    assert.ok(hasBook,id);
  }
  if(item.obra_id) {
    const book=bookById.get(item.obra_id);
    const edition=book?.editions.find(e=>e.id===item.edicao_id);
    assert.ok(book && edition,"Faltam obra ou edição: "+id+"/"+item.edicao_id);
    const evidence=readingEvidence(topic,book,edition);
    assert.equal(evidence.ref?.url,item.evidencia_url,"Link da evidência errado: "+id);
    assert.equal(evidence.ref?.where,item.localizacao.pagina?"Página "+item.localizacao.pagina:item.localizacao.secao,"Localização da edição divergente: "+id);
  }
}
for(const indication of cycle.indicacoes_novas) {
  assert.equal(indication.localizacao.pagina,null,"Não inventar página: "+indication.tema_id);
  assert.ok(indication.evidencia.url.startsWith("https://www.grupogen.com.br/"));
}
assert.equal(books.filter(b=>b.editions.some(e=>e.isbn==="9786551772153")).length,1,"Evitar duplicar a edição preexistente de Mendes/Cavalcante");
assert.deepEqual(statuses,{sumario_editorial_confirmado_na_amostra:19,pendente_revalidacao_da_fonte:1,lacuna_preenchida_com_capitulo:3,permanece_sem_capitulo_confirmado:2});
assert.equal(topics.filter(t=>!hadBookInCycle(t)).length,snapshot.resumo.temas_sem_livro_indicado-3);
console.log("Ciclo 1: 25 temas/19 áreas, 20 registros prévios, 3 capítulos novos, 2 lacunas mantidas, 25 consultas naturais funcionais.");
