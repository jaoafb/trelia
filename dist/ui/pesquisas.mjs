import { expansionIIIArticles, novemberArticles, novemberTopicId } from "../catalogo/ampliado/curadoria-novembro.mjs?v=ciclo1-bibliografia";
import pilot from "../catalogo/piloto-artigos.mjs";
import policies from "../catalogo/ampliado/novembro/politicas-periodicos.mjs";
const peerPolicyByJournal = new Map(policies.periodicos.map(row => [row.periodico, row]));
import { h } from "./html.mjs";

const pilotArticles = pilot.artigos
  .filter(article => article.publicacao_url && article.revisao_por_pares?.politica_url)
  .sort((a, b) => a.ordem - b.ordem)
  .slice(0, pilot.secao.limite)
  .map(article => ({
    ...article, tema_id: pilot.tema.id, doi: article.doi_informado,
    url_publicacao: article.publicacao_url,
    url_texto_integral: article.acesso.login === false && article.acesso.pdf_http === 200
      ? article.acesso.pdf_url : undefined,
    pergunta_investigada: article.pergunta, metodo: article.como_investigou,
  }));

// O periódico do Cade retornou 503 na conferência de integração.
const unavailablePublications = new Set(["econ-exclusividade"]);
// Destinos conferidos na integração. Três periódicos entregam primeiro a ficha.
const publicationOnly = new Set([
  "exp3-art-iniciativa-popular-projeto-lei",
  "exp3-art-refugio-protecao-internacional",
  "exp3-art-omissao-impropria",
]);
const fullTextOverrides = {
  "exp3-art-pagamento-servicos-ambientais": "https://www.scielo.br/j/asoc/a/H8Zbzh4WHCL6vMbZZX7KRXP/?lang=pt",
  "exp3-art-zeis-zonas-especiais-interesse-social": "https://www.scielo.br/j/neco/a/ZMhq4TmFWGZGMR48YQDfMkk/?lang=en",
  "exp3-art-imposto-bens-servicos-cbs-ibs": "https://www.scielo.br/j/rec/a/FLJSXZmKvBpB5DSj7DhHMcH/?lang=pt",
  "exp3-art-negociacao-coletiva-limites": "https://www.scielo.br/j/dados/a/tMQnSt55txr8LK65vKkFSMD/?lang=pt",
};
const stableSciElo = url => url?.replace("https://new.scielo.br/", "https://www.scielo.br/");
const thirdArticles = expansionIIIArticles.filter(article => article.status_editorial === "aprovado_para_integracao")
  .map(article => ({
    ...article,
    revisao_por_pares: peerPolicyByJournal.has(article.periodico)
      ? { ...article.revisao_por_pares,
          status: "politica_publica_do_periodico_localizada",
          url_politica: peerPolicyByJournal.get(article.periodico).url_politica }
      : article.revisao_por_pares,
    url_publicacao: stableSciElo(article.url_publicacao),
    url_texto_integral: publicationOnly.has(article.id) ? undefined
      : fullTextOverrides[article.id] ?? stableSciElo(article.url_texto_integral),
  }));

const seen = new Set();
const articles = [...pilotArticles, ...novemberArticles.filter(article =>
  !unavailablePublications.has(article.id)
    && ["validado_para_integracao", "confirmado_no_periodico"].includes(article.status_editorial)
), ...thirdArticles].filter(article => {
  const key = novemberTopicId(article.tema_id) + "/" + (article.doi?.toLowerCase() ?? article.titulo);
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

export function researchSection(topicId, external, save) {
  const matches = articles.filter(article => novemberTopicId(article.tema_id) === topicId);
  if (!matches.length) return "";
  return `<details class="research-panel more-courses">
    <summary id="research-title">Pesquisas sobre o tema</summary>
    <ul>${matches.map(article => researchCard(article, external, save)).join("")}</ul>
  </details>`;
}

function researchCard(article, external, save) {
  const publication = article.id === "eleit-federacoes"
    ? article.url.replace("https://new.scielo.br/", "https://www.scielo.br/")
    : article.url_publicacao ?? article.url;
  const open = article.url_texto_integral;
  const fields = [
    ["O que investigou", article.pergunta_investigada],
    ["Como investigou", article.metodo],
    ["Por que ler?", article.por_que_ler],
    ["Onde começar", article.onde_comecar],
  ];
  const review = article.revisao_por_pares;
  return `<li class="research-card">
    <div class="reading-title-row"><h3>${h(article.titulo)}</h3>
          ${save({
        materialId: article.doi?.toLowerCase() ?? article.id ?? publication,
        title: article.titulo, author: article.autores.join(", "),
        edition: [article.periodico, article.ano].filter(Boolean).join(" · "),
        location: article.onde_comecar, url: open ?? publication,
      })}</div>
    <p class="author">${h(article.autores.join(", "))}</p>
    <p class="research-journal">${h(article.periodico)} · ${h(article.ano)}</p>
    <dl class="research-description">${fields.filter(([, value]) => value)
      .map(([label, value]) => `<dt>${label}</dt><dd>${h(value)}</dd>`).join("")}</dl>
    ${article.nota_temporal ? `<p>${h(article.nota_temporal)}</p>` : ""}
    <div class="research-links">
      ${open ? external(open, "Ler gratuitamente") : ""}
      ${publication && publication !== open ? external(publication, "Ver publicação no periódico") : ""}
    </div>
    ${article.doi || review || article.qualis_periodico ? `<details class="research-metadata more-courses">
      <summary>Detalhes do artigo</summary>
      ${article.doi ? `<p>DOI ${h(article.doi)}</p>` : ""}
      ${article.qualis_periodico ? `<p>Qualis ${h(article.qualis_periodico.estrato)} · ${h(article.qualis_periodico.area_consultada)} · ${h(article.qualis_periodico.ciclo)}</p>` : ""}
      ${(review?.url_politica ?? review?.normas_url ?? review?.politica_url)
        ? external(review.url_politica ?? review.normas_url ?? review.politica_url, "Política de revisão por pares") : ""}
    </details>` : ""}
  </li>`;
}
