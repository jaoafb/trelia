import { bindSavedReadings, readingSaver, savedReadingsPage } from "./ui/minhas-leituras.mjs?v=ux-review";
import { researchSection } from "./ui/pesquisas.mjs?v=consolidacao-completa";
import { legislationSection } from "./ui/legislacao.mjs?v=card-alignment";
import { editionAccess, bookAccess, accessBadge, accessLink, freeReadingSection } from "./ui/acesso.mjs?v=card-alignment";
import { books, topics, catalog, courses, findEntries, bibliography } from "./data.mjs?v=ciclo1-bibliografia";
import { h } from "./ui/html.mjs";
import { bookCover } from "./ui/capa.mjs";
import { orderedReadings, readingEvidence, defaultReadingEdition } from "./catalogo/leituras.mjs";

const root = document.querySelector("main");
const feedback = document.querySelector("#feedback");
const updateSavedList = bindSavedReadings(root, document.querySelector("#reading-save-status"), external);
const icon = path => `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">${path}</svg>`;
const arrow = icon('<path d="M5 12h14m-6-6 6 6-6 6"/>');
const back = icon('<path d="M19 12H5m6 6-6-6 6-6"/>');
const searchIcon = icon('<circle cx="10.75" cy="10.75" r="5.75"/><path d="m15 15 4 4"/>');
const bookIcon = icon('<path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v13H8.5A2.5 2.5 0 0 1 6 17.5v-13Zm0 13A2.5 2.5 0 0 1 8.5 15H18M9.5 8h5"/>');
const externalIcon = icon('<path d="M9 5h10v10M19 5l-9 9M16 13v6H5V8h6"/>');
const chevron = icon('<path d="m6 9 6 6 6-6"/>');

function external(url, label) {
  return `<a class="external-link" href="${h(url)}" target="_blank" rel="noopener noreferrer"><span class="external-label">${h(label)}</span> ${externalIcon}</a>`;
}

function officialAlternative(source) {
  return source.alternateUrl ? external(source.alternateUrl, "Ver guias no site do Cade") : "";
}

function search(value = "", compact = true) {
  return `<form id="search-form" class="search-box${compact ? " search-compact" : ""}" role="search">
    ${searchIcon}
    <label class="sr-only" for="search-input">Buscar assunto, disciplina ou livro</label>
    <input id="search-input" name="query" type="search" value="${h(value)}" placeholder="Buscar assunto, disciplina ou livro" required maxlength="160" autocomplete="off">
    <button type="submit" aria-label="Buscar"><span>Buscar</span> ${arrow}</button>
  </form>`;
}

function crumbs(current, topic) {
  return `<nav class="breadcrumbs" aria-label="Nesta página"><a href="#inicio">Início</a>
    ${topic ? `<span>/ <a href="#livros/${topic.id}">${h(topic.title)}</a></span>` : ""}
    <span>/ <b aria-current="page">${h(current)}</b></span>
  </nav>`;
}

const courseRoute = id => id === "penal-i" ? "#penal-i" : "#disciplina/" + id;
const courseTitle = id => courses.find(course => course.id === id)?.title ?? "";
const cover = book => bookCover(book, courseTitle(book.area));

function courseGrid(items, inProgress = false) {
  return `<ul class="topic-grid">${items.map(course => `<li><a class="topic-card" href="${courseRoute(course.id)}">
    <span>${h(course.title)}${inProgress ? '<small class="course-status">em construção</small>' : ""}</span><span class="topic-arrow">${arrow}</span>
  </a></li>`).join("")}</ul>`;
}

function topicGrid(destination, items) {
  return `<ul class="topic-grid">${items.map(topic => `<li>
    <a class="topic-card" href="#${destination}/${topic.id}">
      <span class="topic-number">${bookIcon}</span><span>${h(topic.title)}</span><span class="topic-arrow">${arrow}</span>
    </a>
  </li>`).join("")}</ul>`;
}

function home() {
  const themeCounts = new Map(catalog.map(({ course, topics }) => [course.id, topics.length]));
  const ordered = [...courses].sort((a, b) => themeCounts.get(b.id) - themeCounts.get(a.id));
  const featured = ordered.filter(course => themeCounts.get(course.id) >= 5);
  const inProgress = ordered.filter(course => themeCounts.get(course.id) < 5);
  return `<section class="hero shell">
    <div class="hero-main">
      <p class="eyebrow"><span></span> Leituras por assunto</p>
      <h1>Encontre o trecho certo.<br><em>Comece a estudar.</em></h1>
      <p class="hero-copy">Descubra quais livros consultar e onde começar a leitura, sem perder tempo procurando.</p>
      ${search("", false)}
      <div class="search-examples"><span>Experimente:</span>
        <a href="#livros/dolo-eventual">Dolo eventual</a><a href="#livros/omissao-impropria">Omissão imprópria</a>
      </div>
    </div>
    <div class="hero-artwork" aria-hidden="true"><span></span></div>
  </section>
  <section class="catalog-section shell" aria-labelledby="topics-title">
    <div class="section-heading"><h2 id="topics-title">Explore o acervo</h2></div>
    ${courseGrid(featured)}
    ${inProgress.length ? `<details class="more-courses"><summary>Mais disciplinas</summary>${courseGrid(inProgress, true)}</details>` : ""}
  </section>
  <section class="promise-section shell" aria-labelledby="promise-title">
    <div class="promise-mark" aria-hidden="true">${bookIcon}</div>
    <div><p class="section-kicker">Como a Trelia ajuda</p><h2 id="promise-title">Menos tempo buscando.<br>Mais tempo entendendo.</h2></div>
    <p>Cada indicação combina tema, edição e o trecho localizado na obra para orientar a leitura.</p>
  </section>`;
}

function editionLabel(edition) {
  return edition.year && !edition.name.includes(String(edition.year)) ? edition.name + " · " + edition.year : edition.name;
}

function guideLink(topic, book, edition) {
  const params = new URLSearchParams({ obra: book.id, edicao: edition.id });
  return `#duvida/${topic.id}?${params}`;
}

function evidenceLink({ ref, source }, edition) {
  const access = editionAccess(edition);
  if (access?.unavailableUrl && source.url.split("#")[0] === access.unavailableUrl) {
    return accessLink(access, external);
  }
  const number = edition.name.match(/^\d+ª edição\b/u)?.[0];
  const action = ref?.action ?? "Ver evidência da indicação";
  const label = ref && number && /^(?:Ver|Abrir) sumário/u.test(action)
    ? "Ver sumário da " + number : action;
  return external(source.url, label) + officialAlternative(source);
}

function saveBookReading(topic, book, edition, save) {
  const { ref, source } = readingEvidence(topic, book, edition);
  const access = editionAccess(edition);
  const linked = topic.freeReadings.find(item => item.material === edition.readingMaterial);
  const start = linked?.onde_comecar;
  const unavailable = access?.unavailableUrl;
  const url = (unavailable ? undefined : start?.url_especifica)
    ?? (source?.url?.split("#")[0] === unavailable ? access?.url : source?.url)
    ?? access?.url ?? edition.source;
  return save({
    materialId: book.id, editionId: edition.id, title: book.title, author: book.author,
    edition: [editionLabel(edition), edition.format, edition.isbn && "ISBN " + edition.isbn].filter(Boolean).join(" · "),
    location: start?.rotulo ?? [ref?.where, ref?.section].filter(Boolean).join(" · "),
    url, guide: true,
  });
}

function editionReference(topic, book, edition) {
  const evidence = readingEvidence(topic, book, edition);
  const { ref, source } = evidence;
  const access = editionAccess(edition);
  const linked = topic.freeReadings.find(item => item.material === edition.readingMaterial);
  const start = linked?.onde_comecar;
  const details = [ref?.section ?? ref?.precision, edition.isbn && "ISBN " + edition.isbn].filter(Boolean);
  return `<strong>${h(start?.rotulo ?? ref?.where ?? "Localização a conferir")}</strong>
    ${start?.url_especifica ? external(start.url_especifica, "Abrir no trecho indicado") : ""}
    ${details.length ? `<p>${h(details.join(" · "))}</p>` : ""}
    ${accessLink(access, external)}
    ${source.url !== access?.url && source.url.split("#")[0] !== access?.unavailableUrl ? evidenceLink(evidence, edition) : ""}`;
}

function readingCard(topic, book, first, save) {
  const recommendation = topic.recommendations[book.id];
  const edition = defaultReadingEdition(topic, book);
  const role = first ? "Comece por aqui" : { aprofundamento: "Aprofundamento", contexto: "Contexto" }[recommendation.role];
  return `<article class="book-card">
    ${cover(book)}
    <div class="book-details">
      <div class="book-intro">
        <div class="book-identity">
          ${role ? `<p class="book-type reading-role">${role}</p>` : ""}
          <div class="reading-title-row"><h2><a href="#livro/${book.id}">${h(book.title)}</a></h2>
            <div id="salvar-${book.id}">${saveBookReading(topic, book, edition, save)}</div></div><div id="acesso-${book.id}">${accessBadge(editionAccess(edition))}</div><p class="author">${h(book.author ?? "")}</p>
        </div>
        <p class="reading-reason">${edition.readingMaterial ? "<strong>Por que ler?</strong> " : ""}${h(topic.freeReadings.find(item => item.material === edition.readingMaterial)?.por_que_ler ?? recommendation.reason)}</p>
      </div>
      <div class="reading-reference">
        <div class="inline-reference">
          <span>Onde começar</span>
          ${book.editions.length > 1 ? `<label for="edicao-${book.id}">Edição</label>
          <select id="edicao-${book.id}" data-reading-book="${book.id}">
            ${book.editions.map(item => `<option value="${item.id}"${item === edition ? " selected" : ""}>${h([editionLabel(item), item.format].filter(Boolean).join(" · "))}</option>`).join("")}
          </select>` : `<p>${h(editionLabel(edition))} · ${h(edition.format)}</p>`}
          <div id="referencia-${book.id}" class="inline-reference-result" aria-live="polite">${editionReference(topic, book, edition)}</div>
        </div>
      </div>
    </div>
  </article>`;
}

function topicBooks(topic, query, preferredBook, save) {
  const supplements = new Set(topic.freeReadings.filter(item => item.material.tipo !== "livro")
    .map(item => item.bookId));
  const matches = orderedReadings(topic, books, preferredBook).filter(book => !supplements.has(book.id));
  const recommended = new Set(matches.map(book => book.id));
  const free = topic.freeReadings.filter(item => item.material.tipo !== "legislacao" && !recommended.has(item.bookId));
  const legislation = topic.freeReadings.filter(item => item.material.tipo === "legislacao");
  const term = query || topic.readingTitle;
  const question = /^(?:o que|qual|quais|como|quando|por que)\b/i.test(term);
  const explanation = topic.answer ? `<section class="topic-explanation" id="topic-explanation" tabindex="-1" aria-labelledby="explanation-title">
    <h2 id="explanation-title" tabindex="-1">${question ? "Resposta breve" : "Entender o tema"}</h2>
    ${topic.editorialPending ? '<p class="author">Explicação em revisão editorial.</p>' : ""}
    <p>${h(topic.answer)}</p>
    ${topic.studyOrientation ? `<p><strong>Como estudar</strong><br>${h(topic.studyOrientation)}</p>` : ""}
    ${topic.sources.length ? `<details class="explanation-sources"><summary>Fontes da explicação</summary>
      <ul>${topic.sources.map(source => `<li>${source.unavailable ? `<span>${h(source.title)} · PDF indisponível no Cade</span>` : external(source.url, source.title)}${source.note ? ` <span>${h(source.note)}</span>` : ""}${source.note && source.type ? ` <span>· ${h(source.type)}</span>` : ""}${officialAlternative(source)}</li>`).join("")}</ul>
    </details>` : ""}
  </section>` : "";
  const research = researchSection(topic.id, external, save);
  const extras = [
    free.length && ["free-reading-title", "Leituras gratuitas"],
    legislation.length && ["legislation-title", "Legislação"],
    research && ["research-title", "Pesquisas sobre o tema"],
  ].filter(Boolean);
  const related = (topic.relatedTopics ?? []).map(id => topics.find(item => item.id === id));
  return `<div class="results-page topic-results shell">
    ${crumbs("Resultados")}${search(term)}
    <section class="results-heading"><p class="section-kicker"><a href="${courseRoute(topic.area)}">${h(courseTitle(topic.area))}</a></p>
      <h1>${h(question ? term : topic.title)}</h1>
      <div class="topic-result-meta">
        ${matches.length ? `<p>${matches.length} ${matches.length === 1 ? "obra recomendada" : "obras recomendadas"}</p>` : ""}
        <div class="topic-shortcuts">
        ${preferredBook && topic.answer ? '<button class="text-link" data-page-section="explanation-title">Entender o tema</button>' : ""}
        ${matches.length ? '<button class="text-link" data-page-section="recommended-books">Ir às leituras</button>' : ""}
        ${extras.length === 1 ? `<button class="text-link" data-page-section="${extras[0][0]}">${extras[0][1]}</button>` : ""}
        ${extras.length > 1 ? `<details class="topic-extra-links"><summary class="text-link">Mais materiais ${chevron}</summary>
          <ul>${extras.map(([id, label]) => `<li><button class="text-link" data-page-section="${id}">${label}</button></li>`).join("")}</ul>
        </details>` : ""}
        </div>
      </div>
    </section>
    ${preferredBook ? "" : explanation}
    ${matches.length ? `<section aria-labelledby="recommended-books" id="topic-books-title">
      <div class="section-heading"><h2 id="recommended-books" tabindex="-1">Livros recomendados</h2></div>
      ${matches.map((book, i) => readingCard(topic, book, i === 0, save)).join("")}
    </section>` : ""}
    ${preferredBook ? explanation : ""}
    ${topic.editorialPending && !matches.length ? '<p class="author">Indicações de livros em curadoria.</p>' : ""}
    ${freeReadingSection(free, external, save)}
    ${legislationSection(legislation, external, save)}
    ${research}
    ${related.length ? `<section class="bibliography-topics"><div class="section-heading"><h2>Temas relacionados</h2></div>
      ${topicGrid("livros", related)}</section>` : ""}
  </div>`;
}

function locationCard(topic, book, edition) {
  const evidence = readingEvidence(topic, book, edition);
  const { ref } = evidence;
  return `<div class="location-card">
    <div class="location-top"><span>${h(editionLabel(edition))} · ${h(edition.format)}${edition.isbn ? " · ISBN " + h(edition.isbn) : ""}</span>
      <span class="${ref ? "confirmed" : "unconfirmed"}">${ref ? "Localização confirmada" : "Sem confirmação"}</span>
    </div>
    ${ref ? `<div class="location-value"><div><span>Onde ler</span><strong>${h(ref.where)}</strong>${ref.section ? `<p>${h(ref.section)}</p>` : ""}</div>
      <div><span>${h(ref.precision)}</span><strong class="detail-text">${h(ref.detail)}</strong></div></div>
      ` : `<p class="warning-message">Localização a conferir para esta edição.</p>`}
    ${evidenceLink(evidence, edition)}
  </div>`;
}

function topicGuide(topic, book, edition, save) {
  return `<div class="guide-page shell">
    ${crumbs("Guia de leitura", topic)}
    <a class="back-link" href="#livros/${topic.id}">${back} Voltar aos resultados</a>
    <div class="guide-layout">
      <section class="guide-main">
        <p class="section-kicker">Guia de leitura · ${h(courseTitle(topic.area))}</p><h1>${h(topic.title)}</h1>
        <p class="guide-intro">Abra sua edição e use esta referência para chegar ao trecho indicado.</p>
        <div class="edition-control"><label for="edition">Qual edição você tem?</label>
          <div class="select-wrap"><select id="edition">${book.editions.map(item => `<option value="${item.id}"${item === edition ? " selected" : ""}>${h(editionLabel(item))} · ${h(item.format)}${item.isbn ? " · " + h(item.isbn) : ""}</option>`).join("")}</select>${chevron}</div>
        </div>
        <div id="edition-result" aria-live="polite">${locationCard(topic, book, edition)}</div>
        ${topic.answer ? `<div class="reading-tips"><h2 class="section-kicker">Ao ler, preste atenção</h2>
          <ol><li><span aria-hidden="true">1</span><p>${h(topic.answer)}</p></li>${topic.focus ? `<li><span aria-hidden="true">2</span><p>${h(topic.focus)}</p></li>` : ""}</ol>
        </div>` : ""}
        ${topic.sources.length ? `<section class="guide-sources" aria-labelledby="sources-title"><div class="section-heading"><h2 id="sources-title">Fontes abertas</h2></div>
          <ul>${topic.sources.map(source => `<li class="bibliography-card"><div><span class="book-type">${h(source.type)}</span>
            <h3>${h(source.title)}</h3><p>${h(source.by)} · ${h(source.note)}</p>${source.unavailable ? "<p>PDF indisponível no Cade.</p>" : external(source.url, "Abrir fonte")}${officialAlternative(source)}</div></li>`).join("")}</ul>
        </section>` : ""}
      </section>
      <aside class="guide-book">${cover(book)}
        <div><span>Obra</span><div class="reading-title-row"><h2>${h(book.title)}</h2>
          <div id="guide-save-reading">${saveBookReading(topic, book, edition, save)}</div></div><p>${h(book.author)}</p></div>
        <a href="#livro/${book.id}">Ver edições e acesso ${arrow}</a>
      </aside>
    </div>
  </div>`;
}

function coursePage(area) {
  return `<div class="bibliography-page discipline-page shell">${crumbs(area.course.title)}
    <section class="page-heading"><h1>${h(area.course.title)}</h1><p>Explore os temas da disciplina ou escolha uma obra para consultar.</p>
      ${area.books.length ? '<button class="text-link discipline-shortcut" data-page-section="discipline-books">Ir à bibliografia</button>' : ""}
    </section>
    <section class="discipline-section" aria-labelledby="discipline-topics">
      <div class="section-heading"><h2 id="discipline-topics">Temas cobertos</h2></div>
      ${topicGrid("livros", area.topics)}
    </section>
    ${area.books.length ? `<section class="discipline-section" aria-labelledby="discipline-books">
      <div class="section-heading"><h2 id="discipline-books" tabindex="-1">Bibliografia guiada</h2></div>
      ${area.books.map(book => `<article class="bibliography-card">${cover(book)}
        <div><span class="book-type">${h(book.label)}</span><h3><a href="#livro/${book.id}">${h(book.title)}</a></h3><p class="author">${h(book.author)}</p>
          <p class="bibliography-desc">${h(book.reason ?? [...new Set(book.editions.map(edition => edition.access))].join(" · "))}</p></div>
        <a class="primary-button" href="#livro/${book.id}">Ver edições ${arrow}</a></article>`).join("")}
    </section>` : ""}
  </div>`;
}

function topicList() {
  return `<div class="bibliography-page topic-index shell">${crumbs("Temas")}
    <section class="page-heading">
      <h1>Temas por disciplina</h1>
      <p>Abra uma disciplina para encontrar os assuntos com indicações de leitura.</p>
    </section>
    ${catalog.filter(area => area.topics.length).map(area => `<details class="topic-index-course more-courses">
      <summary><span>${h(area.course.title)}</span><small>${area.topics.length} ${area.topics.length === 1 ? "tema" : "temas"}</small></summary>
      ${topicGrid("livros", area.topics)}
    </details>`).join("")}
  </div>`;
}

function bookPage(book, searchedIsbn) {
  const references = topics.filter(topic => topic.recommendations[book.id]);
  const editions = [...book.editions];
  const access = bookAccess(book);
  if (searchedIsbn) {
    const matches = edition => (edition.isbns ?? [edition.isbn]).includes(searchedIsbn);
    editions.sort((first, second) => Number(matches(second)) - Number(matches(first)));
  }
  return `<div class="bibliography-page shell">${crumbs(book.title)}
    <section class="page-heading book-profile">${cover(book)}
      <div><p class="section-kicker">${h(book.label)}</p><h1>${h(book.title)}</h1>
        ${accessBadge(access)}${access?.label === "Tem edição gratuita" ? accessLink(access, external) : ""}<p class="author">${h(book.author ?? "")}</p><p>${h(book.provenance ?? book.reason ?? courseTitle(book.area))}</p>
        ${book.collectionId ? `<a class="text-link" href="#livro/${h(book.collectionId)}">Ver obra da mesma coleção ${arrow}</a>` : ""}</div></section>
    <section aria-labelledby="editions-title"><div class="section-heading"><h2 id="editions-title">Edições e acesso</h2></div>
      ${editions.map(edition => `<article class="bibliography-card book-edition-card">
        <div><span class="book-type">${h(edition.format ?? "Formato a conferir")}</span><h2>${h(editionLabel(edition))}</h2>${accessBadge(editionAccess(edition))}
          ${edition.provenance && edition.provenance !== book.provenance ? `<p class="bibliography-desc">${h(edition.provenance)}</p>` : ""}
          ${edition.isbn ? `<p class="author">ISBN ${h(edition.isbn)}</p>` : edition.isbns?.length ? `<p class="author">ISBNs do registro · ${h(edition.isbns.join(" · "))}</p>` : ""}
          ${edition.access ? `<p class="bibliography-desc">${h(edition.access)}${edition.bookAccess ? " · " + h(edition.bookAccess) : ""}</p>
            ${references.some(topic => topic.refs[edition.id]) ? "" : '<p class="bibliography-desc">Localização a conferir.</p>'}` : ""}</div>
        <div class="edition-access">${accessLink(editionAccess(edition), external)}
          ${edition.source !== editionAccess(edition)?.url && edition.source !== editionAccess(edition)?.unavailableUrl ? external(edition.source, edition.sourceLabel) : ""}${officialAlternative(edition)}
          ${edition.isbn && !book.imported && !book.provenance ? external("https://www.amazon.com.br/s?k=" + edition.isbn, "Buscar na Amazon") : ""}</div></article>`).join("")}
    </section>
    ${references.length ? `<section class="bibliography-topics"><div class="section-heading"><h2>Guias que usam esta obra</h2></div>
      <ul class="topic-grid">${references.map(topic => {
        const edition = book.editions.find(item => topic.refs[item.id]) ?? book.editions[0];
        return `<li><a class="topic-card" href="${guideLink(topic, book, edition)}"><span class="topic-number">${bookIcon}</span><span>${h(topic.title)}</span><span class="topic-arrow">${arrow}</span></a></li>`;
      }).join("")}</ul></section>` : ""}
  </div>`;
}

function resultsPage(query, results, limited = false) {
  const card = item => `<article class="bibliography-card">${item.editions ? cover(item) : `<span class="bibliography-monogram" aria-hidden="true">${searchIcon}</span>`}
    <div><span class="book-type">${h(item.type)}${courseTitle(item.area) ? " · " + h(courseTitle(item.area)) : ""}</span><h2><a href="#${item.route}">${h(item.title)}</a></h2>${accessBadge(bookAccess(item))}<p class="author">${h(item.note)}</p></div>
    ${bookAccess(item) ? accessLink(bookAccess(item), external) : `<a class="primary-button" href="#${item.route}">Abrir ${arrow}</a>`}</article>`;
  return `<div class="results-page shell">${crumbs("Resultados")}${search(query)}
    ${limited ? '<p role="status" class="search-status">O catálogo bibliográfico está temporariamente indisponível.</p>' : ""}
    ${results.length ? `<section class="results-heading"><h1>Resultados para “${h(query)}”</h1></section>
      ${results.slice(0, 12).map(card).join("")}
      ${results.length > 12 ? `<details class="more-courses"><summary>Ver mais resultados (${results.length - 12})</summary>${results.slice(12).map(card).join("")}</details>` : ""}` :
      `<section class="empty-state"><div class="empty-symbol">${searchIcon}</div><p class="section-kicker">Nenhuma indicação encontrada</p>
        <h1>Ainda não temos uma referência para “${h(query)}”.</h1>
        <p>Tente outro termo ou experimente um destes temas do acervo.</p>
        <div class="search-examples empty-suggestions" aria-label="Exemplos de busca">
          <a href="#livros/dolo-eventual">Dolo eventual</a>
          <a href="#livros/poder-constituinte">Poder constituinte</a>
          <a href="#livros/mercado-relevante">Mercado relevante</a>
        </div>
        <a class="text-link" href="#duvidas">Ver todos os temas ${arrow}</a>
      </section>`}
  </div>`;
}

async function render(moveFocus = true) {
  const hash = location.hash;
  const [route, rawParams] = hash.slice(1).split("?", 2);
  const params = new URLSearchParams(rawParams);
  const [kind, id] = route.split("/");
  const topic = topics.find(item => item.id === id);
  const area = catalog.find(item => item.course.id === (kind === "disciplina" ? id : route));
  const save = topic && readingSaver(topic, courseTitle(topic.area));
  let title = "";
  if (area) {
    root.innerHTML = coursePage(area);
    title = area.course.title;
  } else if (route === "minhas-leituras") {
    root.innerHTML = savedReadingsPage();
    updateSavedList();
    title = "Minhas leituras";
  } else if (route === "duvidas") {
    root.innerHTML = topicList();
    title = "Temas por disciplina";
  } else if (kind === "duvida" && topic && Object.keys(topic.recommendations).length) {
    const related = orderedReadings(topic, books);
    const selectedBook = related.find(item => item.id === params.get("obra")) ?? related[0];
    const selectedEdition = selectedBook.editions.find(item => item.id === params.get("edicao"))
      ?? defaultReadingEdition(topic, selectedBook);
    root.innerHTML = topicGuide(topic, selectedBook, selectedEdition, save);
    title = topic.title;
    root.querySelector("#edition").addEventListener("change", event => {
      const edition = selectedBook.editions.find(item => item.id === event.target.value);
      root.querySelector("#edition-result").innerHTML = locationCard(topic, selectedBook, edition);
      root.querySelector("#guide-save-reading").innerHTML = saveBookReading(topic, selectedBook, edition, readingSaver(topic, courseTitle(topic.area)));
      history.replaceState(null, "", guideLink(topic, selectedBook, edition));
    });
  } else if ((kind === "livros" || kind === "duvida") && topic) {
    root.innerHTML = topicBooks(topic, params.get("q"), params.get("obra"), save);
    title = (Object.keys(topic.recommendations).length ? "Livros sobre " : "Leituras sobre ") + topic.readingTitle;
    root.querySelectorAll("[data-reading-book]").forEach(select => select.addEventListener("change", () => {
      const book = books.find(item => item.id === select.dataset.readingBook);
      const edition = book.editions.find(item => item.id === select.value);
      document.getElementById("acesso-" + book.id).innerHTML = accessBadge(editionAccess(edition));
      document.getElementById("referencia-" + book.id).innerHTML = editionReference(topic, book, edition);
      document.getElementById("salvar-" + book.id).innerHTML = saveBookReading(topic, book, edition, readingSaver(topic, courseTitle(topic.area)));
    }));
  } else if (kind === "livro") {
    let failed = false;
    const book = await bibliography.book(id).catch(() => {
      failed = true;
      return books.find(item => item.id === id);
    });
    if (location.hash !== hash) return;
    title = book?.title ?? (failed ? "Catálogo indisponível" : "Obra não encontrada");
    root.innerHTML = book ? bookPage(book, params.get("isbn")) : `<section class="empty-state shell"><h1>${h(title)}</h1>
      <a class="text-link" href="#inicio">Voltar à busca</a></section>`;
  } else if (route === "busca") {
    const query = params.get("q") ?? "";
    let limited = false;
    const results = await bibliography.search(query).catch(() => {
      limited = true;
      return findEntries(query);
    });
    if (location.hash !== hash) return;
    root.innerHTML = resultsPage(query, results, limited);
    title = "Busca";
  } else {
    root.innerHTML = home();
  }
  document.title = title ? title + " · Trelia." : "Trelia.";
  for (const link of document.querySelectorAll(".nav-link")) {
    if (link.hash === "#" + route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }

  root.querySelectorAll("[data-page-section]").forEach(button => button.addEventListener("click", () => {
    const section = document.getElementById(button.dataset.pageSection);
    if (section.matches("summary")) section.parentElement.open = true;
    button.closest(".topic-extra-links")?.removeAttribute("open");
    section.focus({ preventScroll: true });
    section.scrollIntoView({ block: "start" });
  }));

  root.querySelector("#search-form")?.addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const initialHash = location.hash;
    const query = new FormData(form).get("query").trim();
    if (!query) return;
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    const results = await bibliography.search(query).catch(() => findEntries(query));
    if (!form.isConnected || location.hash !== initialHash) return;
    submit.disabled = false;
    const queryParams = "q=" + encodeURIComponent(query);
    let target = "busca?" + queryParams;
    if ((results.length === 1 && (!bookAccess(results[0]) || results[0].route.includes("?isbn="))) || results[0]?.route.includes("?obra=")) {
      target = results[0].route;
      if (target.startsWith("livros/")) target += (target.includes("?") ? "&" : "?") + queryParams;
    }
    if (location.hash === "#" + target) render();
    else location.hash = target;
  });
  if (moveFocus) {
    window.scrollTo(0, 0);
    const heading = root.querySelector("h1");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

document.querySelector(".skip").addEventListener("click", event => {
  event.preventDefault();
  root.focus();
  root.scrollIntoView();
});

document.querySelectorAll(".feedback-trigger").forEach(button => {
  button.addEventListener("click", () => feedback.showModal());
});

document.querySelector("#feedback-form").addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const note = form.get("note").trim();
  const report = `Teste da Trelia\nO que fui fazer: ${form.get("task")}\nEncontrei o que precisava? ${form.get("result")}${note ? "\nBusca ou comentário: " + note : ""}`;
  const status = document.querySelector("#feedback-status");
  const copy = document.querySelector("#feedback-copy");
  try {
    await navigator.clipboard.writeText(report);
    status.textContent = "Feedback copiado. Agora você pode enviar a mensagem.";
    copy.hidden = true;
  } catch {
    status.textContent = "Selecione e copie o feedback abaixo.";
    copy.hidden = false;
    copy.value = report;
    copy.focus();
    copy.select();
  }
});

window.addEventListener("hashchange", () => render());
render(false);
