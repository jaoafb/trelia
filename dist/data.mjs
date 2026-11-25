import { addFreeMaterials, addFreeReadings } from "./catalogo/leituras-gratuitas.mjs";
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
import { applyCuratedBooks, applyCuratedTopics, curatedCatalog, promotedIds } from "./catalogo/ampliado/curadoria-lote.mjs";
import { addNovemberBooks, addNovemberTopics } from "./catalogo/ampliado/curadoria-novembro.mjs?v=expansao-iii";
import economicRecords from "./catalogo/ampliado/bibliografia/economico.mjs";
import urbanRecords from "./catalogo/ampliado/bibliografia/urbanistico.mjs";

const base = [
  {
    course,
    books: penalBooks.map(book => ({ ...book, area: course.id })),
    topics: penalTopics.map(topic => ({ ...topic, area: course.id })),
  },
  constitucional, civil, processoCivil, administrativo, trabalho, tributario, ...expandedCourses,
];

const records = new Map([...economicRecords, ...urbanRecords]
  .filter(book => promotedIds.has(book.id)).map(book => [book.id, book]));
const selectedBooks = addNovemberBooks(applyCuratedBooks([...base.flatMap(area => area.books), ...additionalBooks], records));
const selectedIsbns = new Set(selectedBooks.flatMap(book => book.editions.map(edition => edition.isbn)));
export const books = addFreeMaterials([...selectedBooks, ...importedBooks.filter(book =>
  !book.editions.some(edition => edition.isbns.some(isbn => selectedIsbns.has(isbn))))]);
const curatedTopics = applyCuratedTopics(enrichTopics(base.flatMap(area => area.topics), books), books);
export const topics = addNovemberTopics(addFreeReadings(curatedTopics), books);
export const catalog = curatedCatalog(base, topics, books);
export const courses = catalog.map(area => area.course);
export const findEntries = createSearch(courses, topics, books);
export const bibliography = createBibliography(courses, topics, books, findEntries);
export { course };
export { normalize } from "./catalogo/busca.mjs";
