import marco1 from "../catalogo/ampliado/novembro/marco-1.mjs";
import { h } from "./html.mjs";

const byArea = new Map(marco1.orientacoes.map(item => [item.area, item]));

export function starterReading(area, books, external) {
  const item = byArea.get(area);
  if (!item) return "";
  const book = books.find(book => book.id === item.bookId);
  const edition = book?.editions.find(edition => item.isbn ? edition.isbn === item.isbn : edition.id === item.editionId);
  if (!edition) return "";
  const route = "#livro/" + book.id + (edition.isbn ? "?isbn=" + edition.isbn : "");
  const details = [book.author, edition.name, edition.year, edition.format, edition.isbn && "ISBN " + edition.isbn].filter(Boolean);
  return `<section class="discipline-section" aria-labelledby="starter-reading">
    <div class="section-heading"><h2 id="starter-reading">${h(item.heading ?? "Por onde começar?")}</h2></div>
    <div class="topic-explanation">
      <h3><a href="${h(route)}">${h(book.title)}</a></h3>
      <p>${h(details.join(" · "))}</p>
      <p>${h(item.why)}</p>
      <p><strong>Para quem</strong> ${h(item.profile)} ${h(item.prerequisites)}</p>
      <p><strong>Onde começar</strong> ${h(item.start)}</p>
      ${item.source && item.source !== edition.source ? external(item.source, item.sourceLabel ?? "Consultar sumário") : ""}
      ${external(edition.source, edition.sourceLabel ?? "Ver ficha da edição")}
    </div>
  </section>`;
}
