import { books as penalBooks, topics as penalTopics, course } from "./catalogo/penal-i.mjs";
import constitucional from "./catalogo/constitucional.mjs";
import civil from "./catalogo/civil.mjs";
import processoCivil from "./catalogo/processo-civil.mjs";
import administrativo from "./catalogo/administrativo.mjs";
import trabalho from "./catalogo/trabalho.mjs";
import tributario from "./catalogo/tributario.mjs";
import { createSearch } from "./catalogo/busca.mjs";

export const catalog = [
  {
    course,
    books: penalBooks.map(book => ({ ...book, area: course.id })),
    topics: penalTopics.map(topic => ({ ...topic, area: course.id })),
  },
  constitucional, civil, processoCivil, administrativo, trabalho, tributario,
];

export const courses = catalog.map(area => area.course);
export const books = catalog.flatMap(area => area.books);
export const topics = catalog.flatMap(area => area.topics);
export const findEntries = createSearch(courses, topics, books);
export { course };
export { normalize } from "./catalogo/busca.mjs";
