import { books as penalBooks, topics as penalTopics, course } from "./catalogo/penal-i.mjs";
import constitucional from "./catalogo/constitucional.mjs";
import civil from "./catalogo/civil.mjs";
import processoCivil from "./catalogo/processo-civil.mjs";
import administrativo from "./catalogo/administrativo.mjs";
import trabalho from "./catalogo/trabalho.mjs";
import tributario from "./catalogo/tributario.mjs";
import { createSearch } from "./catalogo/busca.mjs";
import importedBooks from "./catalogo/rvbi/index.mjs";
import { additionalBooks, enrichTopics } from "./catalogo/editorial.mjs";
import expandedCourses from "./catalogo/ampliado/curadoria/index.mjs";
import { createBibliography } from "./catalogo/ampliado/carregar.mjs";

export const catalog = [
  {
    course,
    books: penalBooks.map(book => ({ ...book, area: course.id })),
    topics: penalTopics.map(topic => ({ ...topic, area: course.id })),
  },
  constitucional, civil, processoCivil, administrativo, trabalho, tributario, ...expandedCourses,
];

export const courses = catalog.map(area => area.course);
const selectedBooks = [...catalog.flatMap(area => area.books), ...additionalBooks];
const selectedIsbns = new Set(selectedBooks.flatMap(book => book.editions.map(edition => edition.isbn)));
export const books = [...selectedBooks, ...importedBooks.filter(book =>
  !book.editions.some(edition => edition.isbns.some(isbn => selectedIsbns.has(isbn))))];
export const topics = enrichTopics(catalog.flatMap(area => area.topics), books);
export const findEntries = createSearch(courses, topics, books);
export const bibliography = createBibliography(courses, topics, books, findEntries);
export { course };
export { normalize } from "./catalogo/busca.mjs";
