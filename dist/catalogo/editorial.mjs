const dpu = "https://alexandria.dpu.def.br/pesquisa/titulo.jsf?codigo=3074";
const stj = "https://bdjur.stj.jus.br/jspui/bitstream/2011/71226/manual_direito_penal_zaffaroni_11.ed.pdf";
const constituicao = "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art60";
const codigoPenal = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm";

export const additionalBooks = [
  {
    id: "telles-junior", area: "constitucional", title: "A Constituição, a Assembleia Constituinte e o Congresso Nacional",
    author: "Goffredo Telles Junior", label: "Aprofundamento histórico", provenance: "Biblioteca Benedito Gomes Ferreira · DPU",
    editions: [{ id: "9788502208902", isbn: "9788502208902", year: 2014, name: "2ª edição", format: "Impresso",
      source: dpu, sourceLabel: "Consultar catálogo da DPU", access: "Registro institucional",
      bookAccess: "Consulte as condições de acesso no catálogo da biblioteca" }],
  },
  {
    id: "zaffaroni-pierangeli", area: "penal-i", title: "Manual de Direito Penal Brasileiro: Parte Geral",
    author: "Eugênio Raúl Zaffaroni e José Henrique Pierangeli", aliases: ["Zaffaroni", "Pierangeli"],
    label: "Aprofundamento doutrinário", provenance: "Biblioteca Digital Jurídica do STJ",
    editions: [{ id: "9788520359976", isbn: "9788520359976", year: 2015, name: "11ª edição", format: "Impresso",
      source: stj, sourceLabel: "Ver ficha e sumário no STJ", access: "Ficha e sumário públicos" }],
  },
];

export const editorial = {
  "poder-constituinte": {
    summary: "Poder constituinte é o poder de criar uma Constituição ou de modificá-la pelas formas que ela própria prevê.",
    answer: "O poder constituinte originário estabelece uma nova Constituição. O poder derivado atua dentro do quadro que ela criou. No Brasil, o poder de reforma por emendas é um exemplo de poder derivado e obedece aos procedimentos e limites do art. 60 da Constituição.",
    sources: [
      { title: "Constituição Federal · art. 60", by: "Presidência da República", type: "Texto oficial", note: "Procedimento e limites das emendas constitucionais.", url: constituicao },
      { title: "O poder constituinte originário e o poder constituinte reformador", by: "Biblioteca Digital do Senado Federal", type: "Doutrina", note: "Distinção entre criação e reforma da Constituição.", url: "https://www2.senado.leg.br/bdsf/item/id/854" },
    ],
    recommendations: {
      lenza: { reason: "Use para uma primeira leitura organizada das modalidades de poder constituinte." },
      novelino: { reason: "Use para detalhar a titularidade, as características e os limites do poder constituinte." },
      "telles-junior": {
        reason: "Use para relacionar o conceito à história da Assembleia Constituinte brasileira.",
        coverage: { url: dpu, action: "Ver assunto no catálogo da DPU" },
      },
    },
  },
  "omissao-impropria": {
    answer: "Na omissão própria, o tipo penal descreve a própria falta de ação, como deixar de prestar socorro nas condições do art. 135. Na omissão imprópria, a pessoa pode responder pelo resultado que deixou de impedir, desde que tivesse o dever jurídico de evitá-lo e pudesse agir, conforme o art. 13, § 2º.",
    aliases: ["Qual a diferença entre omissão própria e imprópria?", "diferença entre omissão própria e imprópria", "crime omissivo"],
    sources: [{ title: "Código Penal · arts. 13 e 135", by: "Presidência da República", type: "Texto oficial", note: "Compare o dever de impedir o resultado com o tipo de omissão de socorro.", url: codigoPenal }],
    refs: {
      "9788520359976": {
        where: "Cap. XXIII · p. 485", precision: "Página inicial da seção",
        detail: "O item 297 do sumário trata da omissão imprópria. O item 298 apresenta as fontes da posição de garantidor.",
        url: stj, action: "Ver sumário no STJ",
      },
    },
    recommendations: {
      "zaffaroni-pierangeli": { reason: "Use para aprofundar a estrutura dos tipos omissivos e a posição de garantidor." },
    },
  },
};

export function enrichTopics(topics, books) {
  const bookIds = new Set(books.map(book => book.id));
  return topics.map(topic => {
    const extra = editorial[topic.id] ?? {};
    const refs = { ...topic.refs, ...extra.refs };
    const recommendations = Object.fromEntries(books.flatMap(book => {
      const added = extra.recommendations?.[book.id];
      const firstRef = book.editions.map(edition => refs[edition.id]).find(Boolean);
      const coverage = added?.coverage ?? firstRef;
      if (!coverage) return [];
      const reason = added?.reason ?? book.reason ?? `${book.label} para estudar ${topic.readingTitle}.`;
      return [[book.id, { reason, coverage: { url: coverage.url, action: coverage.action } }]];
    }));
    for (const id of Object.keys(extra.recommendations ?? {})) {
      if (!bookIds.has(id)) throw new Error("Recomendação sem obra no catálogo: " + id);
    }
    return { ...topic, ...extra, refs, recommendations,
      aliases: [...topic.aliases, ...(extra.aliases ?? [])],
      sources: [...(extra.sources ?? []), ...topic.sources],
    };
  });
}
