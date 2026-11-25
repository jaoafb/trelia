import marco1 from "../catalogo/ampliado/novembro/marco-1.mjs";
import { h } from "./html.mjs";

const byArea = new Map(marco1.orientacoes.map(item => [item.area, item]));

export function starterReading(area, books, external) {
  const item = byArea.get(area);
  if (!item) return "";
  const book = books.find(book => book.id === item.bookId);
  const edition = book?.editions.find(edition => edition.isbn === item.isbn);
  if (!edition) return "";
  const route = "#livro/" + book.id + "?isbn=" + edition.isbn;
  return `<section class="discipline-section" aria-labelledby="starter-reading">
    <div class="section-heading"><h2 id="starter-reading">Por onde começar?</h2></div>
    <div class="topic-explanation">
      <h3><a href="${h(route)}">${h(book.title)}</a></h3>
      <p>${h(book.author)} · ${h(edition.name)} · ${h(edition.year)} · ${h(edition.format)} · ISBN ${h(edition.isbn)}</p>
      <p>${h(item.why)}</p>
      <p><strong>Para quem</strong> ${h(item.profile)} ${h(item.prerequisites)}</p>
      <p><strong>Onde começar</strong> ${h(item.start)}</p>
      ${external(item.source, "Consultar sumário")}
      ${external(edition.source, "Ver ficha editorial")}
    </div>
  </section>`;
}
