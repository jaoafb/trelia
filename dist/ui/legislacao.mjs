import { h } from "./html.mjs";
import { accessBadge, editionAccess } from "./acesso.mjs?v=card-alignment";

const lexa = "https://jaoafb.github.io/lexa./#/";
const collections = new Map([
  ["br-constituicao-federal", "cf"],
  ["br-codigo-civil", "civil"],
  ["br-codigo-processo-civil", "cpc"],
  ["br-codigo-processo-penal", "cpp"],
  ["br-codigo-penal", "penal"],
  ["br-clt", "clt"],
  ["br-codigo-defesa-consumidor", "cdc"],
  ["br-ctn", "ctn"],
  ["br-lei-improbidade", "improbidade"],
  ["br-lei-licitacoes-14133", "licitacoes"],
]);

export function lexaArticle(material, location) {
  const collection = collections.get(material.id);
  const article = location?.rotulo.match(/\barts?\.\s*(\d+(?:\.\d{3})*(?:-[a-z])?)/iu)?.[1];
  if (!collection || !article) return;
  const id = article.replaceAll(".", "").toLowerCase();
  return { url: lexa + collection + "/" + id, label: "Ler art. " + article + " no Lexa" };
}

export function legislationSection(readings, external, save) {
  if (!readings.length) return "";
  return `<section class="free-readings legislation" aria-labelledby="legislation-title">
    <div class="section-heading"><h2 id="legislation-title" tabindex="-1">Legislação</h2></div>
    <ul>${readings.map(({ material, por_que_ler, onde_comecar }) => {
      const reader = lexaArticle(material, onde_comecar);
      const official = onde_comecar?.url_especifica ?? material.link_leitura;
      return `<li class="bibliography-card free-reading">
        <div class="reading-card-title"><div class="reading-title-row"><h3>${h(material.titulo)}</h3>
          ${save({
            materialId: material.id, title: material.titulo, author: material.autoria_ou_instituicao,
            edition: material.ano_ou_versao, location: onde_comecar?.rotulo, url: official,
          })}</div></div>
        <div>
          ${accessBadge(editionAccess({ readingMaterial: material }))}
          <p><strong>Por que ler?</strong> ${h(por_que_ler)}</p>
          ${onde_comecar ? `<p><strong>Onde começar</strong> ${h(onde_comecar.rotulo)}</p>` : ""}
        </div>
        <div class="free-reading-actions">${reader ? external(reader.url, reader.label) : ""}
          ${external(official, "Ver texto oficial")}
        </div>
      </li>`;
    }).join("")}</ul>
  </section>`;
}
