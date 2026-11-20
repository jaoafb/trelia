import { books, topics, catalog, courses, findEntries, bibliography } from "./data.mjs";

const root = document.querySelector("main");
const feedback = document.querySelector("#feedback");
const icon = path => `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">${path}</svg>`;
const arrow = icon('<path d="M5 12h14m-6-6 6 6-6 6"/>');
const back = icon('<path d="M19 12H5m6 6-6-6 6-6"/>');
const searchIcon = icon('<circle cx="10.75" cy="10.75" r="5.75"/><path d="m15 15 4 4"/>');
const bookIcon = icon('<path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v13H8.5A2.5 2.5 0 0 1 6 17.5v-13Zm0 13A2.5 2.5 0 0 1 8.5 15H18M9.5 8h5"/>');
const externalIcon = icon('<path d="M9 5h10v10M19 5l-9 9M16 13v6H5V8h6"/>');
const chevron = icon('<path d="m6 9 6 6 6-6"/>');

function h(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function external(url, label) {
  return `<a class="external-link" href="${h(url)}" target="_blank" rel="noopener noreferrer"><span class="external-label">${h(label)}</span> ${externalIcon}</a>`;
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

function courseGrid(items, inProgress = false) {
  return `<ul class="topic-grid">${items.map(course => `<li><a class="topic-card" href="${courseRoute(course.id)}">
    <span class="topic-number">${bookIcon}</span><span>${h(course.title)}${inProgress ? '<small class="course-status">em construção</small>' : ""}</span><span class="topic-arrow">${arrow}</span>
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
    <p class="eyebrow"><span></span> Leituras por assunto</p>
    <h1>Encontre o trecho certo.<br><em>Comece a estudar.</em></h1>
    <p class="hero-copy">Descubra quais livros consultar e onde começar a leitura, sem perder tempo procurando.</p>
    ${search("", false)}
    <div class="search-examples"><span>Experimente:</span>
      <a href="#livros/dolo-eventual">Dolo eventual</a><a href="#livros/omissao-impropria">Omissão imprópria</a>
    </div>
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

function editionReference(topic, book, edition) {
  const ref = topic.refs[edition.id];
  const coverage = topic.recommendations[book.id].coverage;
  const source = ref ?? coverage;
  return `<strong>${h(ref?.where ?? "Localização a conferir")}</strong>
    ${ref ? `<p>${h(ref.precision)} · ISBN ${h(edition.isbn)}</p>` : ""}
    ${external(source.url, ref ? "Ver fonte" : "Ver fonte da indicação")}`;
}

function readingCard(topic, book) {
  const edition = book.editions.findLast(item => topic.refs[item.id]?.where.startsWith("Página"))
    ?? book.editions.find(item => topic.refs[item.id]) ?? book.editions[0];
  return `<article class="book-card">
    <div class="book-cover" aria-hidden="true">
      <span>${h(book.author)}</span><div class="cover-rule"></div><strong>${h(book.title)}</strong>
      <div class="cover-publisher">Trelia<span>.</span></div>
    </div>
    <div class="book-details">
      <h2><a href="#livro/${book.id}">${h(book.title)}</a></h2><p class="author">${h(book.author)}</p>
      <p class="reading-reason">${h(topic.recommendations[book.id].reason)}</p>
      <div class="reading-reference">
        <div class="reference-icon">${bookIcon}</div>
        <div class="inline-reference">
          <span>Onde começar a ler</span>
          ${book.editions.length > 1 ? `<label for="edicao-${book.id}">Edição</label>
          <select id="edicao-${book.id}" data-reading-book="${book.id}">
            ${book.editions.map(item => `<option value="${item.id}"${item === edition ? " selected" : ""}>${h(editionLabel(item))} · ${h(item.format)}</option>`).join("")}
          </select>` : `<p>${h(editionLabel(edition))} · ${h(edition.format)}</p>`}
          <div id="referencia-${book.id}" class="inline-reference-result" aria-live="polite">${editionReference(topic, book, edition)}</div>
        </div>
      </div>
    </div>
  </article>`;
}

function topicBooks(topic, query, preferredBook) {
  const matches = books.filter(book => topic.recommendations[book.id]);
  if (preferredBook) matches.sort((a, b) => Number(b.id === preferredBook) - Number(a.id === preferredBook));
  const term = query || topic.readingTitle;
  const question = /^(?:o que|qual|quais|como|quando|por que)\b/i.test(term);
  const explanation = topic.answer ? `<section class="topic-explanation" id="topic-explanation" tabindex="-1" aria-labelledby="explanation-title">
    <h2 id="explanation-title">${question ? "Resposta breve" : "Entender o tema"}</h2>
    <p>${h(topic.answer)}</p>
    <ul>${topic.sources.map(source => `<li>${external(source.url, source.title)}</li>`).join("")}</ul>
  </section>` : "";
  return `<div class="results-page shell">
    ${crumbs("Resultados")}${search(term)}
    <section class="results-heading"><p class="section-kicker"><a href="${courseRoute(topic.area)}">${h(courseTitle(topic.area))}</a></p>
      <h1>Resultados para “${h(term)}”</h1>
      <p><strong>${matches.length} ${matches.length === 1 ? "obra" : "obras"}</strong> com indicação de leitura para este assunto.</p>
    </section>
    ${topic.answer ? `<div class="topic-shortcuts" aria-label="Nesta página">
      ${preferredBook ? '<button class="text-link" data-topic-section="topic-explanation">Entender o tema</button>' : '<button class="text-link" data-topic-section="topic-books-title">Ver livros</button>'}
    </div>` : ""}
    ${preferredBook ? "" : explanation}
    <section aria-label="Livros indicados" tabindex="-1" id="topic-books-title">
      ${matches.map(book => readingCard(topic, book)).join("")}
    </section>
    ${preferredBook ? explanation : ""}
  </div>`;
}

function locationCard(edition, ref, recommendation) {
  return `<div class="location-card">
    <div class="location-top"><span>${h(editionLabel(edition))} · ${h(edition.format)} · ISBN ${h(edition.isbn)}</span>
      <span class="${ref ? "confirmed" : "unconfirmed"}">${ref ? "Localização confirmada" : "Sem confirmação"}</span>
    </div>
    ${ref ? `<div class="location-value"><div><span>Onde ler</span><strong>${h(ref.where)}</strong></div>
      <div><span>${h(ref.precision)}</span><strong class="detail-text">${h(ref.detail)}</strong></div></div>
      ${external(ref.url, ref.action)}` : `<p class="warning-message">Localização a conferir para esta edição.</p>
      ${external(recommendation.coverage.url, "Ver fonte sobre a cobertura")}`}
  </div>`;
}

function topicGuide(topic, book, edition) {
  return `<div class="guide-page shell">
    ${crumbs("Guia de leitura", topic)}
    <a class="back-link" href="#livros/${topic.id}">${back} Voltar aos resultados</a>
    <div class="guide-layout">
      <section class="guide-main">
        <p class="section-kicker">Guia de leitura · ${h(courseTitle(topic.area))}</p><h1>${h(topic.title)}</h1>
        <p class="guide-intro">Abra sua edição e use esta referência para chegar ao trecho indicado.</p>
        <div class="edition-control"><label for="edition">Qual edição você tem?</label>
          <div class="select-wrap"><select id="edition">${book.editions.map(item => `<option value="${item.id}"${item === edition ? " selected" : ""}>${h(editionLabel(item))} · ${h(item.format)} · ${h(item.isbn)}</option>`).join("")}</select>${chevron}</div>
        </div>
        <div id="edition-result" aria-live="polite">${locationCard(edition, topic.refs[edition.id], topic.recommendations[book.id])}</div>
        ${topic.answer ? `<div class="reading-tips"><h2 class="section-kicker">Ao ler, preste atenção</h2>
          <ol><li><span aria-hidden="true">1</span><p>${h(topic.answer)}</p></li>${topic.focus ? `<li><span aria-hidden="true">2</span><p>${h(topic.focus)}</p></li>` : ""}</ol>
        </div>` : ""}
        ${topic.sources.length ? `<section class="guide-sources" aria-labelledby="sources-title"><div class="section-heading"><h2 id="sources-title">Fontes abertas</h2></div>
          <ul>${topic.sources.map(source => `<li class="bibliography-card"><div><span class="book-type">${h(source.type)}</span>
            <h3>${h(source.title)}</h3><p>${h(source.by)} · ${h(source.note)}</p>${external(source.url, "Abrir fonte")}</div></li>`).join("")}</ul>
        </section>` : ""}
      </section>
      <aside class="guide-book"><div class="mini-cover" aria-hidden="true">${bookIcon}</div>
        <div><span>Obra</span><h2>${h(book.title)}</h2><p>${h(book.author)}</p></div>
        <a href="#livro/${book.id}">Ver edições e acesso ${arrow}</a>
      </aside>
    </div>
  </div>`;
}

function coursePage(area) {
  return `<div class="bibliography-page shell">${crumbs(area.course.title)}
    <section class="page-heading"><p class="section-kicker">Bibliografia guiada</p><h1>${h(area.course.title)}</h1><p>Escolha uma obra de acordo com o que você quer estudar.</p></section>
    ${area.books.map(book => `<article class="bibliography-card"><span class="bibliography-monogram" aria-hidden="true">${bookIcon}</span>
      <div><span class="book-type">${h(book.label)}</span><h2><a href="#livro/${book.id}">${h(book.title)}</a></h2><p class="author">${h(book.author)}</p>
        <p class="bibliography-desc">${h(book.reason ?? [...new Set(book.editions.map(edition => edition.access))].join(" · "))}</p></div>
      <a class="primary-button" href="#livro/${book.id}">Ver edições ${arrow}</a></article>`).join("")}
    <section class="bibliography-topics"><div class="section-heading"><h2>Temas cobertos</h2></div>${topicGrid("livros", area.topics)}</section>
  </div>`;
}

function topicList() {
  return `<div class="bibliography-page shell">${crumbs("Guias")}<section class="page-heading">
    <h1>Guias de dúvidas</h1><p>Consulte as referências de leitura por disciplina.</p></section>
    ${catalog.map(area => `<section class="catalog-course"><div class="catalog-course-heading"><h2>${h(area.course.title)}</h2><a class="text-link" href="${courseRoute(area.course.id)}">Ver bibliografia ${arrow}</a></div>
      ${topicGrid("livros", area.topics)}</section>`).join("")}
  </div>`;
}

function bookPage(book, searchedIsbn) {
  const references = topics.filter(topic => topic.recommendations[book.id]);
  const editions = [...book.editions];
  if (searchedIsbn) {
    const matches = edition => (edition.isbns ?? [edition.isbn]).includes(searchedIsbn);
    editions.sort((first, second) => Number(matches(second)) - Number(matches(first)));
  }
  return `<div class="bibliography-page shell">${crumbs(book.title)}
    <section class="page-heading"><p class="section-kicker">${h(book.label)}</p><h1>${h(book.title)}</h1>
      <p>${h(book.author)}</p><p>${h(book.provenance ?? book.reason ?? courseTitle(book.area))}</p></section>
    <section aria-labelledby="editions-title"><div class="section-heading"><h2 id="editions-title">Edições e acesso</h2></div>
      ${editions.map(edition => `<article class="bibliography-card"><span class="bibliography-monogram" aria-hidden="true">${bookIcon}</span>
        <div><span class="book-type">${h(edition.format ?? "Formato a conferir")}</span><h2>${h(editionLabel(edition))}</h2>
          ${edition.provenance && edition.provenance !== book.provenance ? `<p class="bibliography-desc">${h(edition.provenance)}</p>` : ""}
          ${edition.isbn ? `<p class="author">ISBN ${h(edition.isbn)}</p>` : edition.isbns?.length ? `<p class="author">ISBNs do registro · ${h(edition.isbns.join(" · "))}</p>` : ""}
          ${edition.access ? `<p class="bibliography-desc">${h(edition.access)}${edition.bookAccess ? " · " + h(edition.bookAccess) : ""}</p>
            ${references.some(topic => topic.refs[edition.id]) ? "" : '<p class="bibliography-desc">Localização a conferir.</p>'}` : ""}</div>
        <div class="edition-access">${external(edition.source, edition.sourceLabel)}
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
  const card = item => `<article class="bibliography-card"><span class="bibliography-monogram" aria-hidden="true">${searchIcon}</span>
    <div><span class="book-type">${h(item.type)}${courseTitle(item.area) ? " · " + h(courseTitle(item.area)) : ""}</span><h2><a href="#${item.route}">${h(item.title)}</a></h2><p class="author">${h(item.note)}</p></div>
    <a class="primary-button" href="#${item.route}">Abrir ${arrow}</a></article>`;
  return `<div class="results-page shell">${crumbs("Resultados")}${search(query)}
    ${limited ? '<p role="status" class="search-status">O catálogo bibliográfico está temporariamente indisponível.</p>' : ""}
    ${results.length ? `<section class="results-heading"><h1>Resultados para “${h(query)}”</h1></section>
      ${results.slice(0, 12).map(card).join("")}
      ${results.length > 12 ? `<details class="more-courses"><summary>Ver mais resultados (${results.length - 12})</summary>${results.slice(12).map(card).join("")}</details>` : ""}` :
      `<section class="empty-state"><div class="empty-symbol">${searchIcon}</div><p class="section-kicker">Nenhuma indicação encontrada</p>
        <h1>Ainda não temos uma referência para “${h(query)}”.</h1>
        <p>Tente outro termo ou explore os assuntos disponíveis no acervo.</p>
        <a class="primary-button" href="#duvidas">Ver temas disponíveis ${arrow}</a>
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
  let title = "";
  if (area) {
    root.innerHTML = coursePage(area);
    title = area.course.title;
  } else if (route === "duvidas") {
    root.innerHTML = topicList();
    title = "Guias de dúvidas";
  } else if (kind === "duvida" && topic) {
    const related = books.filter(item => topic.recommendations[item.id]);
    const selectedBook = related.find(item => item.id === params.get("obra")) ?? related[0];
    const selectedEdition = selectedBook.editions.find(item => item.id === params.get("edicao"))
      ?? selectedBook.editions.find(item => topic.refs[item.id]) ?? selectedBook.editions[0];
    root.innerHTML = topicGuide(topic, selectedBook, selectedEdition);
    title = topic.title;
    root.querySelector("#edition").addEventListener("change", event => {
      const edition = selectedBook.editions.find(item => item.id === event.target.value);
      root.querySelector("#edition-result").innerHTML = locationCard(edition, topic.refs[edition.id], topic.recommendations[selectedBook.id]);
      history.replaceState(null, "", guideLink(topic, selectedBook, edition));
    });
  } else if (kind === "livros" && topic) {
    root.innerHTML = topicBooks(topic, params.get("q"), params.get("obra"));
    title = "Livros sobre " + topic.readingTitle;
    root.querySelectorAll("[data-topic-section]").forEach(button => button.addEventListener("click", () => {
      const section = document.getElementById(button.dataset.topicSection);
      section.focus({ preventScroll: true });
      section.scrollIntoView();
    }));
    root.querySelectorAll("[data-reading-book]").forEach(select => select.addEventListener("change", () => {
      const book = books.find(item => item.id === select.dataset.readingBook);
      const edition = book.editions.find(item => item.id === select.value);
      document.getElementById("referencia-" + book.id).innerHTML = editionReference(topic, book, edition);
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
  const guidesLink = document.querySelector(".nav-link");
  if (route === "duvidas") guidesLink.setAttribute("aria-current", "page");
  else guidesLink.removeAttribute("aria-current");

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
    if (results.length === 1) {
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
