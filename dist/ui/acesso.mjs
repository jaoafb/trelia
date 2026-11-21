import { h } from "./html.mjs";
import { materialType } from "../catalogo/leituras-gratuitas.mjs";

const filesInMaintenance = new Set(["cade-guia-h", "cade-guia-v-mais"]);

export function editionAccess(edition) {
  const material = edition?.readingMaterial;
  if (material) {
    const maintenance = filesInMaintenance.has(material.id);
    return {
      label: material.tipo_acesso === "capitulo_integral_aberto" ? "Gratuito · capítulo integral" : "Gratuito · texto integral",
      action: maintenance ? "Ver publicação no Cade" : "Ler gratuitamente",
      url: maintenance ? material.link_origem : material.link_leitura,
      unavailableUrl: maintenance ? material.link_leitura : undefined,
      free: true,
    };
  }
  if (!edition?.source) return;
  if (edition.access === "Texto integral aberto") return {
    label: "Gratuito · texto integral", action: "Ler gratuitamente", url: edition.source, free: true,
  };
  const text = [edition.access, edition.sourceLabel].join(" ");
  if (/\bprévia\b/i.test(text)) return { label: "Prévia", action: "Ver prévia", url: edition.source };
  if (/\bacesso institucional\b/i.test(text)) return {
    label: "Acesso institucional", action: "Consultar acesso institucional", url: edition.source,
  };
}

export function bookAccess(book) {
  const editions = book?.editions ?? [];
  const accesses = editions.map(editionAccess);
  const open = accesses.find(access => access?.free);
  if (open && !accesses.every(access => access?.label === open.label)) {
    return { ...open, label: "Tem edição gratuita" };
  }
  if (open) return open;
  return accesses.every(item => item?.label === accesses[0]?.label) ? accesses[0] : undefined;
}

export const accessBadge = access => access ? `<span class="access-badge">${h(access.label)}</span>
  ${access.unavailableUrl ? '<p class="author">PDF temporariamente indisponível no Cade.</p>' : ""}` : "";

const roleLabels = {
  primeira_leitura: "Primeira leitura", aprofundamento: "Aprofundamento", consulta_oficial: "Consulta oficial",
  jurisprudencia: "Jurisprudência", contexto_historico: "Contexto histórico",
};

export function freeReadingSection(readings, external) {
  if (!readings.length) return "";
  return `<section class="free-readings" aria-labelledby="free-reading-title">
    <div class="section-heading"><h2 id="free-reading-title">Leituras gratuitas</h2></div>
    <ul>${readings.map(({ material, bookId, papel_editorial, por_que_ler, onde_comecar }) => {
      const access = editionAccess({ readingMaterial: material });
      return `<li class="bibliography-card free-reading">
        <div><p class="book-type">${h(roleLabels[papel_editorial])} · ${h(materialType(material))}</p>
          <h3><a href="#livro/${h(bookId)}">${h(material.titulo)}</a></h3>
          ${accessBadge(access)}<p class="author">${h(material.autoria_ou_instituicao)}</p>
          <p><strong>Por que ler?</strong> ${h(por_que_ler)}</p>
          ${onde_comecar ? `<p><strong>Onde começar</strong> ${onde_comecar.url_especifica && !access.unavailableUrl
            ? external(onde_comecar.url_especifica, onde_comecar.rotulo) : h(onde_comecar.rotulo)}</p>`
            : '<p class="author">Localização a conferir</p>'}
        </div>
        <div class="free-reading-actions">${external(access.url, access.action)}
          ${material.link_origem !== access.url ? external(material.link_origem, "Ver publicação de origem") : ""}</div>
      </li>`;
    }).join("")}</ul>
  </section>`;
}
