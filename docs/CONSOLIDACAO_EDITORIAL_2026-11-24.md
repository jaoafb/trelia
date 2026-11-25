# Trelia — consolidação editorial e auditoria do catálogo
**Data-base:** 24/11/2026 (horário de Brasília)  
**Situação:** levantamento realizado na branch `curadoria/consolidacao-bibliografica-01` ([PR #19](https://github.com/jaoafb/trelia/pull/19)), ainda não mesclado à `main`.  
**Evidência técnica:** [GitHub Actions — auditoria executada com sucesso](https://github.com/jaoafb/trelia/actions/runs/45530510390).

## 1. Escopo, metodologia e limites

A auditoria foi executada sobre os **objetos realmente carregados pelo código da aplicação** (`dist/data.mjs`): temas, áreas, obras, edições, vínculos de indicação, fontes, leituras gratuitas, artigos e conexões entre temas. O comando `node scripts/auditar-catalogo.mjs --strict` faz verificações automáticas de integridade, presença, IDs, URLs HTTP(S), referências a edições, vínculos de artigos e navegação por título. Os módulos editoriais são regenerados a partir das fontes, e há testes específicos para as indicações, políticas de periódicos e relações novas.

**Limites:** um teste de URL HTTP(S) verifica a formação do endereço, **não** que ele esteja acessível hoje. ISBN, localização e pertinência jurídica demandam verificação externa por edição. A execução automatizada **não substitui** revisão integral de vigência legislativa, jurisprudência, nem comprovação individual de revisão por pares de cada artigo. Os avisos editoriais da interface foram preservados. Os números são um retrato desta PR, não certificação definitiva.

## 2. Resultado da auditoria na PR

| Indicador | Resultado |
|---|---:|
| Áreas / temas | 19 / 308 |
| Obras / edições carregadas | 267 / 284 |
| Indicações de obra por tema | 388 |
| Referências de edição com localização | 386 |
| Leituras gratuitas vinculadas | 311 |
| Fontes vinculadas às fichas de tema | 331 |
| Temas sem livro específico recomendado | **93** |
| Temas explicitamente em revisão | **74** |
| Temas sem fontes em `topic.sources` | **78** |
| Temas sem relacionados cadastrados | **133** |
| Artigos nos lotes analisados | 33 |
| Artigos sem DOI identificado nos metadados | 2 |
| Artigos da Expansão III com política de periódico indicada | 19/19 |
| Erros estruturais detectados | **0** |

A ausência de `topic.sources` não é sinônimo de ausência de `freeReadings` ou de outras referências na ficha. O indicador de “livro ausente” é específico para `topic.recommendations`, não para todas as formas de material de estudo.

### Comparação com a situação anterior às mudanças

| Indicador | Antes da consolidação | Nesta PR |
|---|---:|---:|
| Temas | 308 | 308 |
| Temas sem livro recomendado | 94 | 93 |
| Vínculos tema → obra | 387 | 388 |
| Temas sem assuntos relacionados | 177 | 133 |
| Artigos da Expansão III com política editorial conectada | 0 | 19 |

## 3. Cobertura por área

| Área | Temas | Sem livro indicado | Em revisão | Sem relacionados | Vínculos com obras |
|---|---:|---:|---:|---:|---:|
| Direito Digital (`digital`) | 11 | 7 | 4 | 2 | 8 |
| Direito Empresarial (`empresarial`) | 12 | 7 | 4 | 6 | 6 |
| Direito do Trabalho (`trabalho`) | 19 | 7 | 4 | 14 | 26 |
| Direito Constitucional (`constitucional`) | 24 | 6 | 4 | 14 | 40 |
| Direito Econômico (`economico`) | 19 | 6 | 4 | 9 | 29 |
| Direito Financeiro (`financeiro`) | 11 | 6 | 4 | 3 | 5 |
| Direito Internacional (`internacional`) | 11 | 6 | 4 | 7 | 5 |
| Processo Penal (`processo-penal`) | 19 | 6 | 4 | 5 | 27 |
| Propriedade Intelectual (`propriedade-intelectual`) | 13 | 6 | 4 | 6 | 11 |
| Direito Urbanístico (`urbanistico`) | 13 | 6 | 4 | 5 | 10 |
| Direito Eleitoral (`eleitoral`) | 11 | 5 | 4 | 4 | 6 |
| Direito Ambiental (`ambiental`) | 11 | 4 | 4 | 2 | 7 |
| Direito Consumidor (`consumidor`) | 11 | 4 | 4 | 4 | 11 |
| Processo Civil (`processo-civil`) | 24 | 4 | 4 | 11 | 37 |
| Direito Tributário (`tributario`) | 18 | 4 | 4 | 8 | 28 |
| Direito Previdenciário (`previdenciario`) | 12 | 3 | 4 | 7 | 9 |
| Direito Administrativo (`administrativo`) | 23 | 2 | 4 | 12 | 43 |
| Direito Civil (`civil`) | 26 | 2 | 4 | 12 | 43 |
| Direito Penal (`penal-i`) | 20 | 2 | 2 | 2 | 37 |

## 4. Melhorias entregues nesta PR

**Leituras históricas específicas.** Três temas de Propriedade Intelectual passaram a apontar para trechos localizados na **2ª edição digital** de *Uma introdução à propriedade intelectual*, de Denis Borges Barbosa, já cadastrada: (i) ideias e expressão, p. 305; (ii) direitos morais e patrimoniais, p. 124; (iii) regime constitucional dos programas de computador, p. 121. Livro integral hospedado pelo [IFAM](https://www2.ifam.edu.br/diretorias-sistemicas/institucional/uma-introducao-a-propriedade-intelectual.pdf). As indicações caracterizam a obra como **doutrina histórica**; a Lei de Direitos Autorais, a Lei do Software e a orientação atual do INPI não são substituídas pela obra.

**Transparência dos artigos.** Foram cadastradas páginas institucionais das políticas editoriais de **14 periódicos**, alcançando os **19 artigos da Expansão III**. A interface liga cada artigo à política do respectivo periódico. **Isso não prova que cada artigo passou por determinado processo de revisão**, nem que a política atual era a vigente na época da publicação. Não usar esse vínculo como certificação individual.

**Assuntos relacionados.** Foram selecionados **31 pares temáticos bidirecionais**, com justificativa de pertinência pedagógica, checagem de existência e teste de reciprocidade. As conexões ajudam a comparar institutos sem apresentá-los como equivalentes.

**Busca em linguagem natural.** Foram acrescentadas **152 expressões alternativas**, duas para cada um dos **76 temas da Expansão III**, distribuídos pelas **19 áreas**. São consultas que estudantes podem digitar sem conhecer o título exato, preservando os temas já cadastrados. As expressões são documentadas em `data/catalogo/trelia-termos-busca-consolidacao-2026-11-24.json`, carregadas pelos módulos gerados e testadas contra as rotas corretas. Não representam a validação jurídica automática das explicações.

**Testes e rastreabilidade.** A PR traz scripts de verificação dos três blocos acima, auditoria do catálogo completo e módulos gerados reproduzíveis. Os JSONs de lotes históricos anteriores foram preservados.

## 5. Lacunas e pendências que permanecem

- **93 temas sem indicação específica de livro.** A fila nominal abaixo orienta a curadoria por evidência verificável de obra/edição e capítulo/página, sem recomendações presumidas.
- **74 temas marcados em revisão.** Revisar as afirmações e âncoras normativas uma a uma, com atualização da vigência na data da publicação; não retirar o aviso automaticamente.
- **133 temas ainda sem conexões editoriais.** Adicionar somente pares com pertinência substantiva, preferencialmente com justificativa e reciprocidade.
- **33 fontes da Expansão III marcadas para revalidação externa.** O status indica necessidade de conferir o endereço e, principalmente, texto vigente e recorte normativo; não se deve trocar o status automaticamente só porque um endereço parece válido.
- **Disponibilidade de links:** a referência original ao Guia de Compliance do Cade permanece sinalizada como indisponível após falha anterior (HTTP 503). A página institucional dos [Guias do Cade](https://www.gov.br/cade/pt-br/centrais-de-conteudo/publicacoes-institucionais/guias-do-cade) é ponto de partida para nova conferência, não prova de que o PDF antigo voltou a responder.
- **DOI não confirmado:** o artigo da Revista do IBRAC sobre remédios concorrenciais continua sem DOI documentado; não fabricar um identificador. O total de dois artigos sem DOI refere-se a lotes distintos e não equivale a falha do catálogo.
- **Direito de software:** a obra de Barbosa cobre um recorte histórico do regime de proteção, mas continua faltando leitura bibliográfica especializada e atual sobre registro e procedimentos do INPI.

### Fontes normativas ainda marcadas para revalidação na Expansão III

- `MCI` — Marco Civil da Internet, Lei nº 12.965/2014: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm
- `LAI` — Lei de Acesso à Informação, Lei nº 12.527/2011: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm
- `LC140` — Lei Complementar nº 140/2011 — Cooperação federativa ambiental: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm
- `CRIMESAMB` — Lei de Crimes Ambientais, Lei nº 9.605/1998: https://www.planalto.gov.br/ccivil_03/leis/l9605.htm
- `PNMA` — Política Nacional do Meio Ambiente, Lei nº 6.938/1981: https://www.planalto.gov.br/ccivil_03/leis/l6938.htm
- `ELEICOES` — Lei das Eleições, Lei nº 9.504/1997: https://www.planalto.gov.br/ccivil_03/leis/l9504.htm
- `INELEG` — Lei Complementar nº 64/1990 — Inelegibilidades: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp64.htm
- `SA` — Lei das Sociedades por Ações, Lei nº 6.404/1976: https://www.planalto.gov.br/ccivil_03/leis/l6404consol.htm
- `FALENCIA` — Lei de Recuperação e Falências, Lei nº 11.101/2005: https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11101.htm
- `DUPLICATA` — Lei nº 5.474/1968 — Duplicatas: https://www.planalto.gov.br/ccivil_03/leis/l5474.htm
- `LRF` — Lei de Responsabilidade Fiscal, LC nº 101/2000: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm
- `L4320` — Lei nº 4.320/1964 — Direito financeiro: https://www.planalto.gov.br/ccivil_03/leis/l4320.htm
- `MIGRACAO` — Lei de Migração, Lei nº 13.445/2017: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm
- `VIENA61` — Convenção de Viena sobre Relações Diplomáticas, Decreto nº 56.435/1965: https://www.planalto.gov.br/ccivil_03/decreto/antigos/d56435.htm
- `ONU` — Carta das Nações Unidas, Decreto nº 19.841/1945: https://www.planalto.gov.br/ccivil_03/decreto/1930-1949/d19841.htm
- `CPC` — Código de Processo Civil, Lei nº 13.105/2015: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm
- `CP` — Código Penal, Decreto-Lei nº 2.848/1940: https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm
- `CPP` — Código de Processo Penal, Decreto-Lei nº 3.689/1941: https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm
- `INTERCEPT` — Lei nº 9.296/1996 — Interceptação de comunicações: https://www.planalto.gov.br/ccivil_03/leis/l9296.htm
- `ORGCRIM` — Lei nº 12.850/2013 — Organizações criminosas: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm
- `PREVID` — Lei nº 8.213/1991 — Planos de Benefícios da Previdência Social: https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm
- `CUSTEIO` — Lei nº 8.212/1991 — Seguridade social e custeio: https://www.planalto.gov.br/ccivil_03/leis/l8212cons.htm
- `LDA` — Lei de Direitos Autorais, Lei nº 9.610/1998: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm
- `LPI` — Lei da Propriedade Industrial, Lei nº 9.279/1996: https://www.planalto.gov.br/ccivil_03/leis/l9279.htm
- `SOFTWARE` — Lei do Software, Lei nº 9.609/1998: https://www.planalto.gov.br/ccivil_03/leis/l9609.htm
- `CLT` — Consolidação das Leis do Trabalho: https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm
- `LC227` — Lei Complementar nº 227/2026 — CGIBS e regulamentação tributária: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm
- `CTN` — Código Tributário Nacional, Lei nº 5.172/1966: https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm
- `ANTITRUSTE` — Lei de Defesa da Concorrência, Lei nº 12.529/2011: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12529.htm
- `CIDADE` — Estatuto da Cidade, Lei nº 10.257/2001: https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10257.htm
- `REURB` — Lei nº 13.465/2017 — Regularização fundiária: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13465.htm
- `ADCT` — ADCT — Ato das Disposições Constitucionais Transitórias: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#adct
- `CADE_GUIDE` — Guias do Cade — publicações institucionais: https://www.gov.br/cade/pt-br/centrais-de-conteudo/publicacoes-institucionais/guias-do-cade

## 6. Fila integral de temas sem livro específico (93)

Esta fila identifica lacunas em `topic.recommendations`, não ausência de material gratuito ou de explicações. Indica também fontes na ficha, materiais gratuitos vinculados e revisão editorial ainda pendente. A ordem por área e título é reproduzível pelo script.

### Direito Administrativo — 2 temas
- **Pedidos de acesso à informação pública** (`acesso-informacao-lai`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Sanções nas licitações e contratos públicos** (`sancoes-licitacoes-contratos`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Ambiental — 4 temas
- **Logística reversa e responsabilidade pós-consumo** (`logistica-reversa-pnrs`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Política Nacional de Educação Ambiental** (`educacao-ambiental-politica-nacional`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Prevenção e precaução no Direito Ambiental** (`principios-prevencao-precaucao-ambiental`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Responsabilidade penal da pessoa jurídica por crime ambiental** (`responsabilidade-penal-pessoa-juridica-ambiental`) — 3 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Direito Civil — 2 temas
- **Herdeiros necessários e legítima** (`herdeiros-necessarios-legitima`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Sucessão legítima e sucessão testamentária** (`sucessao-legitima-testamentaria`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Constitucional — 6 temas
- **Comissões parlamentares de inquérito** (`comissao-parlamentar-inquerito`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Direito à educação e dever do Estado** (`direito-fundamental-educacao`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Direito de reunião e manifestação** (`direito-reuniao-manifestacao`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Estado de defesa e estado de sítio** (`estado-defesa-estado-sitio`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Iniciativa popular de projetos de lei** (`iniciativa-popular-projeto-lei`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Intervenção federal nos estados** (`intervencao-federal`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Direito Consumidor — 4 temas
- **Cobrança indevida e repetição do indébito** (`cobranca-indebita-consumo`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Prevenção e tratamento do superendividamento** (`superendividamento-consumidor`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Publicidade enganosa e abusiva** (`publicidade-enganosa-abusiva`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Recall e dever de segurança do fornecedor** (`recall-produtos-seguranca`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Direito Digital — 7 temas
- **Comunicação de incidentes com dados pessoais** (`comunicacao-incidente-dados`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Controlador, operador e encarregado na LGPD** (`proposta-agentes-tratamento-lgpd`) — 1 fonte(s) vinculada(s); 2 material(is) gratuito(s); revisão editorial: **não**
- **Relatório de impacto à proteção de dados (RIPD)** (`relatorio-impacto-protecao-dados`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Revisão de decisões automatizadas na LGPD** (`revisao-decisoes-automatizadas-lgpd`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Segurança desde a concepção no tratamento de dados** (`seguranca-desde-concepcao-lgpd`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Transferência internacional de dados pessoais** (`transferencia-internacional-dados-lgpd`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Tratamento de dados de crianças e adolescentes na LGPD** (`proposta-dados-criancas-lgpd`) — 0 fonte(s) vinculada(s); 3 material(is) gratuito(s); revisão editorial: **não**

### Direito Econômico — 6 temas
- **Acordos verticais e distribuição exclusiva** (`restricoes-verticais-distribuicao`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Cláusulas de exclusividade em plataformas digitais** (`exclusividade-plataformas-digitais`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Preços predatórios e abuso de posição dominante** (`precos-predatorios-concorrencia`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Programas de compliance concorrencial** (`compliance-concorrencial`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Remédios antitruste no controle de fusões** (`proposta-remedios-antitruste`) — 1 fonte(s) vinculada(s); 1 material(is) gratuito(s); revisão editorial: **sim**
- **Troca de informações sensíveis entre concorrentes** (`troca-informacoes-sensiveis-concorrentes`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Direito Eleitoral — 5 temas
- **Abuso de poder econômico nas eleições** (`abuso-poder-economico-eleitoral`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Condutas vedadas a agentes públicos em campanha** (`condutas-vedadas-agentes-publicos`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Doações e financiamento das campanhas** (`doacoes-financiamento-campanha`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Federações partidárias** (`federacoes-partidarias`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Sistema eleitoral proporcional** (`sistema-eleitoral-proporcional`) — 3 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Empresarial — 7 temas
- **Direitos essenciais dos acionistas** (`direitos-acionistas-sociedade-anonima`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Duplicata mercantil e sua circulação** (`duplicata-mercantil`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Estabelecimento empresarial** (`estabelecimento-empresarial`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Mediação na recuperação empresarial** (`proposta-mediacao-empresarial`) — 0 fonte(s) vinculada(s); 2 material(is) gratuito(s); revisão editorial: **não**
- **Nome empresarial e sua proteção** (`nome-empresarial-protecao`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Recuperação extrajudicial de empresas** (`recuperacao-extrajudicial-empresa`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Títulos de crédito e seus requisitos** (`titulos-credito-requisitos`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Financeiro — 6 temas
- **Dívida pública e operações de crédito** (`divida-publica-operacoes-credito`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Limites de despesa com pessoal na LRF** (`limites-despesa-pessoal-lrf`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **PPA, LDO e LOA** (`ppa-ldo-loa`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Receita corrente líquida como indicador fiscal** (`receita-corrente-liquida`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Regra de ouro das finanças públicas** (`regra-ouro-orcamento`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Restos a pagar** (`restos-a-pagar`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Internacional — 6 temas
- **Cooperação jurídica internacional no processo civil** (`cooperacao-juridica-internacional-cpc`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Extradição no Direito brasileiro** (`extradicao-lei-migracao`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Imunidades diplomáticas e limites** (`imunidades-diplomaticas`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Refúgio e reconhecimento da condição de refugiado** (`refugio-protecao-internacional`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Solução pacífica de controvérsias internacionais** (`solucao-pacifica-controversias`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Tratados de direitos humanos e hierarquia normativa** (`tratados-direitos-humanos-hierarquia`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Penal — 2 temas
- **Crime preterdoloso e agravação pelo resultado** (`crime-preterdoloso`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Legítima defesa putativa e erro sobre situação justificante** (`legitima-defesa-putativa`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Direito Previdenciário — 3 temas
- **Aposentadoria especial** (`aposentadoria-especial-agentes-nocivos`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Benefício de Prestação Continuada (BPC/LOAS)** (`bpc-loas-assistencia`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Recursos administrativos contra decisões do INSS** (`recurso-administrativo-inss`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Processo Civil — 4 temas
- **Cumprimento de sentença de alimentos e prisão civil** (`execucao-alimentos-prisao-civil`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Incidente de Resolução de Demandas Repetitivas (IRDR)** (`irdr-demandas-repetitivas`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Negócios jurídicos processuais** (`negocio-juridico-processual`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Sistema de precedentes no CPC** (`sistema-precedentes-cpc`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Processo Penal — 6 temas
- **Assistente de acusação no processo penal** (`assistente-acusacao`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Busca pessoal no processo penal** (`busca-pessoal-fundadas-razoes`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Colaboração premiada e corroboração** (`colaboracao-premiada`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Direito ao silêncio no interrogatório** (`direito-silencio-interrogatorio`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Interceptação telefônica e reserva de jurisdição** (`interceptacao-telefonica-prova`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Quesitação no Tribunal do Júri** (`tribunal-juri-quesitacao`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

### Propriedade Intelectual — 6 temas
- **Coautoria de obras intelectuais** (`coautoria-obras-intelectuais`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Domínio público e fim da proteção patrimonial** (`dominio-publico-direitos-autorais`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Licenciamento de programas de computador** (`licenciamento-programas-computador`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Nulidade de registro de marca** (`nulidade-registro-marca`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Registro de desenho industrial** (`registro-desenho-industrial`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Segredo industrial e concorrência desleal** (`segredo-industrial-concorrencia-desleal`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito do Trabalho — 7 temas
- **Acordo e convenção coletiva de trabalho** (`proposta-negociacao-coletiva`) — 0 fonte(s) vinculada(s); 2 material(is) gratuito(s); revisão editorial: **não**
- **Contrato de trabalho intermitente** (`trabalho-intermitente-clt`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Discriminação no acesso e manutenção do trabalho** (`discriminacao-acesso-trabalho`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Equiparação salarial e trabalho de igual valor** (`equiparacao-salarial-clt`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Negociação coletiva e limites legais** (`negociacao-coletiva-limites`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Proteção da gestante contra dispensa arbitrária** (`estabilidade-gestante-emprego`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Teletrabalho e trabalho remoto** (`teletrabalho-clt`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Tributário — 4 temas
- **IBS e CBS na reforma da tributação do consumo** (`imposto-bens-servicos-cbs-ibs`) — 3 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Imposto Seletivo e finalidade extrafiscal** (`imposto-seletivo-reforma`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Responsabilidade tributária por sucessão** (`sucessao-responsabilidade-tributaria`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Restituição de tributo pago indevidamente** (`repeticao-indebito-tributario`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**

### Direito Urbanístico — 6 temas
- **Consórcio imobiliário como instrumento urbanístico** (`consorcio-imobiliario-estatuto-cidade`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Direito de preempção urbanística** (`direito-preempcao-urbano`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Operações urbanas consorciadas** (`operacoes-urbanas-consorciadas`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **não**
- **Transferência do direito de construir** (`transferencia-direito-construir`) — 1 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Usucapião especial urbana individual** (`usucapiao-especial-urbana`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**
- **Zonas Especiais de Interesse Social (ZEIS)** (`zeis-zonas-especiais-interesse-social`) — 2 fonte(s) vinculada(s); 0 material(is) gratuito(s); revisão editorial: **sim**

## 7. Reexecução e próximos critérios de aceite

```bash
python scripts/gerar_curadoria_novembro.py
node scripts/check-consolidacao-bibliografica-i.mjs
node scripts/check-politicas-periodicos.mjs
node scripts/check-relacoes-editoriais.mjs
node scripts/check-termos-busca.mjs
node scripts/auditar-catalogo.mjs --strict
```

O pipeline `.github/workflows/check.yml` também executa as verificações anteriores de busca, bibliografia, novembro e Expansão III. A execução da CI prova a consistência automatizada, não a veracidade substantiva de toda referência externa.

**Próximo ciclo sugerido:** priorizar as áreas com sete ou seis temas sem livro específico (Digital, Empresarial, Trabalho, Constitucional, Econômico, Financeiro, Internacional, Processo Penal, Propriedade Intelectual e Urbanístico); confirmar bibliografia por edição e fazer revisão jurídica individual de leis recentes e temas já sinalizados. Essas pendências não estão concluídas nesta PR.

---
_Relatório gerado a partir dos dados de execução e dos arquivos de curadoria rastreados na PR #19. Não representa parecer jurídico nem auditoria de disponibilidade externa de todos os links._
