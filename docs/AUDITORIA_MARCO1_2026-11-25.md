# Marco 1 — auditoria de integração

Base: `2d4057e`, após o PR #21. O manifesto do pacote foi conferido por SHA-256. A aprovação editorial foi recebida para 31 obras e volumes, 19 percursos de área e 74 intervenções. Os totais intermediários registram o primeiro recorte aprovado.

| Indicador da aplicação | Antes | Primeiro recorte |
|---|---:|---:|
| Áreas | 19 | 19 |
| Temas | 308 | 308 |
| Temas com livro indicado | 222 | 230 |
| Temas sem livro indicado | 86 | 78 |
| Obras cadastradas | 271 | 273 |
| Edições cadastradas | 288 | 290 |
| Vínculos tema–obra | 395 | 405 |
| Vínculos com localização | 393 | 403 |
| Temas com aviso de revisão | 74 | 73 |
| Fontes na lista de explicações | 331 | 328 |
| Vínculos de leituras gratuitas | 311 | 311 |
| Artigos nos lotes | 33 | 33 |
| Erros estruturais | 0 | 0 |

A correção da Lei 9.784/1999 faz a deduplicação reconhecer a fonte oficial já exibida em Legislação. Os quatro vínculos continuam disponíveis nessa seção. [Texto atualizado da Câmara](https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html).

## Evidências aceitas

- Mauro Schiavi, ISBN 9788544265819. Seis indicações conferidas no [sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS4869-Sumario.pdf) e na [ficha da editora](https://www.editorajuspodivm.com.br/curso-de-direito-do-trabalho-2026-schiavi).
- Bensoussan, Gouvêa e Luz, ISBN 9788544271858. Duas indicações na edição já existente, mais um percurso introdutório de Direito Econômico com os fundamentos do capítulo 1. [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5561-Sumario.pdf) e [ficha da editora](https://www.editorajuspodivm.com.br/manual-de-direito-economico-2026-bensoussan-gouvea-luz).
- Pereira Neto e Casagrande, ISBN 9788502620056. Duas indicações por seção, com a página em aberto. A ficha comprova autoria, edição e conteúdo do sumário. [Registro MARC do Cade](https://biblioteca.cade.gov.br/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=1876).
- Bens públicos. Revisão individual do recorte dos arts. 98 a 103, com classificação, alienação e usucapião. O texto compilado consultado em 25/11/2026 sustenta a explicação. O recorte é legal e não depende de precedente ou modulação. [Código Civil compilado](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm).

## Continuidade do PR #23

| Indicador | Base | Primeiro recorte | Continuidade |
|---|---:|---:|---:|
| Temas e áreas | 308 / 19 | 308 / 19 | 308 / 19 |
| Obras | 271 | 273 | 276 |
| Edições | 288 | 290 | 294 |
| Temas com livro indicado | 222 | 230 | 238 |
| Vínculos tema–obra | 395 | 405 | 414 |
| Vínculos com localização | 393 | 403 | 412 |
| Percursos de área | 0 | 1 | 19 |
| Avisos de revisão jurídica | 74 | 73 | 68 |
| Vínculos de leituras gratuitas | 311 | 311 | 311 |
| Erros estruturais | 0 | 0 | 0 |

### Bibliografia e orientação pedagógica

- Renato Brasileiro de Lima, ISBN 9788544270905. A edição de 2026 foi associada ao ID existente. Cinco pontos de início foram conferidos no sumário, incluindo busca pessoal na p. 814. [Editora](https://www.editorajuspodivm.com.br/manual-de-processo-penal-volume-unico-2026-renato-brasileiro) · [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5090-Sumario.pdf).
- Didier, Braga e Oliveira, vol. 2, ISBN 9788544270493. Ficha reaproveitada e p. 667 vinculada ao sistema de precedentes. [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5126-Sumario.pdf).
- Cavalcanti, ISBN 9788530999933. Os capítulos 6 e 10 foram confirmados para a edição Bookshelf. As páginas e a conferência normativa da reforma seguem em aberto. [Editora](https://www.grupogen.com.br/e-book-tributacao-sobre-o-consumo-cbs-ibs-e-imposto-seletivo-2-edicao-2026-eduardo-muniz-machado-cavalcanti-editora-forense-9788530999933).
- Tauk e Santos, ISBN 9788544273371. A p. 416 foi conferida para o aprofundamento em registro de marca. [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5419-Sumario.pdf).
- Francisco e Goldfinger, ISBN 9788544271698. Ficha bibliográfica integrada. O sumário não abriu na conferência do recorte temático. [Editora](https://www.editorajuspodivm.com.br/sinopses-para-concursos-v44-direito-urbanistico-2026-francisco-goldfinger).
- Os 18 percursos adicionais usam as fichas e edições identificadas na curadoria. Digital cobre proteção de dados. Internacional identifica o percurso de Direito Internacional Público. Urbanístico explicita a localização de leitura em aberto. Propriedade Intelectual distingue o guia introdutório da OMPI da leitura histórica de Barbosa. A paginação de Eleitoral ficou em aberto.
- A [planilha de obras](auditoria-marco1/obras.tsv) cobre os 31 registros do staging. Há 22 fichas que ainda precisam de confirmação bibliográfica e de cobertura. A ficha já existente de Burnier e a nova ficha de Francisco e Goldfinger têm recortes temáticos pendentes.

### Revisão jurídica

Além de bens públicos, foram concluídos cinco recortes. Concessão e permissão foram confrontadas com a Constituição e a Lei nº 8.987/1995. Iniciativa popular federal e direito à educação foram confrontados com a Constituição. Evicção e guarda compartilhada foram confrontadas com o Código Civil compilado. As [74 intervenções](auditoria-marco1/intervencoes.tsv) estão discriminadas por tema. Permanecem 68 avisos para os recortes ainda sem validação individual suficiente. [Constituição](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) · [Lei nº 8.987/1995](https://www.planalto.gov.br/ccivil_03/leis/l8987compilada.htm) · [Código Civil](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm).

### Materiais gratuitos e artigos

- A [checagem dos 123 materiais](auditoria-marco1/materiais.tsv) registra requisições sem conta em 25/11/2026, antes das correções, com leitura de até 64 KiB e inspeção de cabeçalhos e assinatura de PDF. Houve 86 respostas HTTP 200/206, 13 erros HTTP, 23 erros de conexão e uma URL malformada. As respostas medem disponibilidade técnica. A identidade, integralidade, pertinência e licença exigem conferência própria.
- Foram substituídos destinos da Constituição, de dois materiais do Senado e do Informativo 791 do STJ. O Guia do Programa de Leniência e o registro da Revista da Ejuse são apresentados como publicações institucionais. O acesso ao PDF da Ejuse continua em aberto. O Manual de Marcas passou a informar a versão de 24/11/2026. O DOI de Fernando Schnell foi registrado conforme a revista. Os seis links do CDN do Cade responderam 503 e mantêm o tratamento de indisponibilidade. [Cade](https://www.gov.br/cade/pt-br/assuntos/programa-de-leniencia/guia-do-programa-de-leniencia-1) · [INPI](https://manualdemarcas.inpi.gov.br/) · [Ejuse](https://revistaejuse.tjse.jus.br/revistaejuse/index.php/revista_da_ejuse/article/view/447) · [TRT4](https://periodicos.trt4.jus.br/revista-eletronica/article/view/435).
- A [planilha dos 39 candidatos a artigo](auditoria-marco1/artigos.tsv) inclui os seis artigos do acervo gratuito, também contabilizados entre os 123 materiais. Para os 33 candidatos dos lotes, houve 30 respostas HTTP 200, duas falhas de conexão e um 503. A avaliação individual de autoria, método, política do periódico e acesso integral do conjunto continua pendente. Os registros de pesquisa e seus avisos foram preservados.

### Verificação

Checks JavaScript, smoke de busca, verificações editoriais existentes e auditoria estrutural em modo estrito. Na prévia local em Chrome, foram conferidas as 19 páginas de disciplina em 1366 px e 390 px, sem rolagem horizontal, a seleção do Nucci 2022 em omissão com p. 156 e a p. 814 na edição de Renato Brasileiro.
