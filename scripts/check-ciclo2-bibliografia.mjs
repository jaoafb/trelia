import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { books, topics, catalog, findEntries } from "../dist/data.mjs";
import { readingEvidence } from "../dist/catalogo/leituras.mjs";
import cycle from "../dist/catalogo/ampliado/novembro/ciclo-2.mjs";
const original=JSON.parse(readFileSync(new URL("../data/catalogo/trelia-ciclo2-bibliografia-2026-11-25.json",import.meta.url)));
const snapshot=JSON.parse(readFileSync(new URL("../data/catalogo/auditoria-snapshot-2026-11-24.json",import.meta.url)));
const first=JSON.parse(readFileSync(new URL("../data/catalogo/trelia-ciclo1-qualidade-bibliografica-2026-11-25.json",import.meta.url)));
assert.deepEqual(cycle,{amostra:original.amostra,obras_novas:original.obras_novas,indicacoes_novas:original.indicacoes_novas},"O gerado deve refletir a fonte");
assert.equal(cycle.amostra.length,25);assert.equal(new Set(cycle.amostra.map(x=>x.tema_id)).size,25);
assert.equal(cycle.indicacoes_novas.length,17);assert.equal(cycle.obras_novas.length,2);
assert.equal(topics.length,308);assert.equal(catalog.length,19);
assert.equal(books.length,snapshot.resumo.obras+first.obras_novas.length+cycle.obras_novas.length);
assert.equal(topics.filter(t=>Object.keys(t.recommendations??{}).length===0).length,snapshot.resumo.temas_sem_livro_indicado-first.indicacoes_novas.length-cycle.indicacoes_novas.length);
const byId=new Map(topics.map(t=>[t.id,t])),byBook=new Map(books.map(b=>[b.id,b]));
const missing=new Set(snapshot.fila_sem_indicacao_bibliografica_especifica.map(x=>x.id));
const firstNew=new Set(first.indicacoes_novas.map(x=>x.tema_id));
const approvedIds=new Set(cycle.indicacoes_novas.map(x=>x.tema_id));
let approved=0,pending=0;
for(const row of cycle.amostra){
 const topic=byId.get(row.tema_id);
 assert.ok(topic,"Tema ausente "+row.tema_id);
 assert.equal(topic.area,row.area_id);
 assert.ok(missing.has(topic.id)&&!firstNew.has(topic.id),"Amostra não é lacuna "+topic.id);
 assert.ok(findEntries(topic.title).some(hit=>hit.route==="livros/"+topic.id),"Falha na busca de "+topic.id);
 const linked=Object.keys(topic.recommendations??{}).length>0;
 if(row.estado==="aprovado_para_integracao"){
   approved++;assert.ok(approvedIds.has(topic.id));assert.equal(linked,true);
   const book=byBook.get(row.obra_id);
   const edition=book?.editions.find(e=>e.id===row.edicao_id&&e.isbn===row.edicao_id);
   assert.ok(book&&edition,"Falta ISBN/edição "+topic.id);
   const {ref}=readingEvidence(topic,book,edition);
   assert.equal(ref?.where,"Página "+row.localizacao.pagina);
   assert.equal(ref?.section,row.localizacao.secao);
   assert.equal(ref?.url,row.evidencia_url);
   assert.ok(topic.recommendations[book.id]?.reason?.length>50);
 }else if(row.estado==="pendente_sem_evidencia_especifica"){
   pending++;assert.equal(linked,false,"Ligação sem prova "+topic.id);assert.ok(row.motivo_pendencia?.length>30);
 }else throw Error("Status inválido "+row.estado);
}
assert.equal(approved,17);assert.equal(pending,8);
for(const isbn of ["9788544273753","9788544271858","9788544275641"]){
 assert.equal(books.filter(b=>b.editions.some(e=>e.isbn===isbn)).length,1,"Duplicação: "+isbn);
}
assert.equal(byBook.get("renzetti").author,"Renato Saraiva; Rogério Renzetti");
for(const item of cycle.indicacoes_novas){
 assert.equal(item.evidencia.tipo,"sumario_da_edicao");
 assert.ok(Number.isInteger(item.localizacao.pagina));
 assert.match(item.evidencia.url,/^https:\/\/juspodivmdigital\.com\.br\/cdn\/pdf\/JUS\d+-Sumario\.pdf$/);
}
console.log("Ciclo 2: 25 temas, 17 vínculos comprovados, 8 pendências; 2 novas obras e 3 reutilizadas.");