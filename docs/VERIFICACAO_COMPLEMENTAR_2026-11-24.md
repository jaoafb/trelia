# Trelia — verificação externa de bibliografia, normas e revisão editorial

**Data-base:** 24/11/2026  
**Base:** [PR #19](https://github.com/jaoafb/trelia/pull/19), ainda sem merge.  
**Execução automatizada:** [GitHub Actions #45531711925](https://github.com/jaoafb/trelia/actions/runs/45531711925).  


## Resultado com limites claros

- **33/33 fontes oficiais** antes marcadas para reabrir foram consultadas: 32 endereços originais apresentaram a publicação oficial e 1 (**Lei nº 11.101/2005**) exigiu substituição por seu endereço compilado oficial, preservando o lote histórico.
- **4 novas indicações bibliográficas** foram aprovadas mediante sumário da edição ou ficha editorial com capítulo específico, aproveitando 1 obra já presente e incluindo 2 novas obras. Não foi atribuída página quando a fonte não a ofereceu.
- **74 temas continuam sinalizados para revisão.** A disponibilidade do texto oficial e a coerência inicial de fontes foram verificadas; isso **não encerra** uma revisão jurídica individualizada de legislação, jurisprudência e interpretações doutrinárias.
- **89 temas permanecem sem livro específico** no catálogo carregado. A lista integral está na auditoria e abaixo; materiais gratuitos e normas associados não são contados como indicação de livro.
- **Zero inconsistências estruturais** identificadas pelos testes automatizados: este resultado não equivale a homologação jurídica.

## 1. Conferência de acesso das 33 fontes oficiais

A coluna *status* indica somente o resultado da consulta ao endereço e da identificação do documento institucional. **Não** significa que todos os dispositivos citados em cada tema tenham sido revisados quanto à vigência, à redação consolidada ou aos efeitos temporais.

| Fonte | Resultado | Referência oficial consultada |
|---|---|---|
| `MCI` — Marco Civil da Internet, Lei nº 12.965/2014 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm) |
| `LAI` — Lei de Acesso à Informação, Lei nº 12.527/2011 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm) |
| `LC140` — Lei Complementar nº 140/2011 — Cooperação federativa ambiental | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm) |
| `CRIMESAMB` — Lei de Crimes Ambientais, Lei nº 9.605/1998 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l9605.htm) |
| `PNMA` — Política Nacional do Meio Ambiente, Lei nº 6.938/1981 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l6938.htm) |
| `ELEICOES` — Lei das Eleições, Lei nº 9.504/1997 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l9504.htm) |
| `INELEG` — Lei Complementar nº 64/1990 — Inelegibilidades | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp64.htm) |
| `SA` — Lei das Sociedades por Ações, Lei nº 6.404/1976 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l6404consol.htm) |
| `FALENCIA` — Lei de Recuperação e Falências, Lei nº 11.101/2005 | Original não respondeu; compilado oficial conferido | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11101compilado.htm) |
| `DUPLICATA` — Lei nº 5.474/1968 — Duplicatas | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l5474.htm) |
| `LRF` — Lei de Responsabilidade Fiscal, LC nº 101/2000 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm) |
| `L4320` — Lei nº 4.320/1964 — Direito financeiro | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l4320.htm) |
| `MIGRACAO` — Lei de Migração, Lei nº 13.445/2017 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm) |
| `VIENA61` — Convenção de Viena sobre Relações Diplomáticas, Decreto nº 56.435/1965 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/decreto/antigos/d56435.htm) |
| `ONU` — Carta das Nações Unidas, Decreto nº 19.841/1945 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/decreto/1930-1949/d19841.htm) |
| `CPC` — Código de Processo Civil, Lei nº 13.105/2015 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm) |
| `CP` — Código Penal, Decreto-Lei nº 2.848/1940 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm) |
| `CPP` — Código de Processo Penal, Decreto-Lei nº 3.689/1941 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm) |
| `INTERCEPT` — Lei nº 9.296/1996 — Interceptação de comunicações | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l9296.htm) |
| `ORGCRIM` — Lei nº 12.850/2013 — Organizações criminosas | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm) |
| `PREVID` — Lei nº 8.213/1991 — Planos de Benefícios da Previdência Social | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm) |
| `CUSTEIO` — Lei nº 8.212/1991 — Seguridade social e custeio | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l8212cons.htm) |
| `LDA` — Lei de Direitos Autorais, Lei nº 9.610/1998 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l9610.htm) |
| `LPI` — Lei da Propriedade Industrial, Lei nº 9.279/1996 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l9279.htm) |
| `SOFTWARE` — Lei do Software, Lei nº 9.609/1998 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l9609.htm) |
| `CLT` — Consolidação das Leis do Trabalho | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) |
| `LC227` — Lei Complementar nº 227/2026 — CGIBS e regulamentação tributária | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm) |
| `CTN` — Código Tributário Nacional, Lei nº 5.172/1966 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm) |
| `ANTITRUSTE` — Lei de Defesa da Concorrência, Lei nº 12.529/2011 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12529.htm) |
| `CIDADE` — Estatuto da Cidade, Lei nº 10.257/2001 | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10257.htm) |
| `REURB` — Lei nº 13.465/2017 — Regularização fundiária | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13465.htm) |
| `ADCT` — ADCT — Ato das Disposições Constitucionais Transitórias | Página oficial aberta e identificada | [Abrir](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#adct) |
| `CADE_GUIDE` — Guias do Cade — publicações institucionais | Página oficial aberta e identificada | [Abrir](https://www.gov.br/cade/pt-br/centrais-de-conteudo/publicacoes-institucionais/guias-do-cade) |

**Exceção:** o endereço original usado para `FALENCIA` terminou em erro de consulta; foi localizada e aberta a [Lei nº 11.101/2005 compilada no Planalto](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11101compilado.htm). A aplicação passa a apontar para esse endereço. Para `ADCT`, foi possível abrir a Constituição; a rolagem para a âncora `#adct` pode variar conforme navegador e requer teste visual.

## 2. Pontos de vigência e atualização normativa

As notas abaixo foram fundamentadas em fontes oficiais e têm **alcance pontual**. Não são parecer definitivo sobre todos os efeitos ou a jurisprudência aplicável.

- **Lei nº 15.479/2026** — tema `execucao-alimentos-prisao-civil`: Publicada em julho de 2026, com entrada em vigor um ano após a publicação oficial. O novo art. 529-A do CPC não deve ser descrito como vigente em novembro de 2026. [Fonte](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15479.htm).
- **Lei nº 15.371/2026** — tema `salario-maternidade-rgps`: Regula licença-paternidade e salário-paternidade, com entrada em vigor em 1º de janeiro de 2027; não aplicar como direito vigente em novembro de 2026. [Fonte](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15371.htm).
- **Lei nº 15.432/2026** — tema `zeis-zonas-especiais-interesse-social`: Altera o Estatuto da Cidade, mas só entra em vigor um ano após sua publicação oficial em junho de 2026. [Fonte](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15432-13-junho-2026-799355-publicacaooriginal-179916-pl.html).
- **LC nº 219/2025** — tema `abuso-poder-economico-eleitoral`: A LC nº 64/1990 contém alterações de 2025 em hipóteses e contagem de inelegibilidade; revisar redação aplicável à matéria e eventuais efeitos judiciais antes de remover avisos. [Fonte](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp64.htm).
- **LC nº 227/2026** — tema `imposto-bens-servicos-cbs-ibs`: Norma de 2026 efetivamente publicada e confirmada, vinculada à reforma tributária; examinar regras transitórias e produção de efeitos por dispositivo. [Fonte](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm).

Especial cuidado com leis **publicadas em 2026 cuja vigência só se inicia em 2027**: a data de publicação não deve ser apresentada como início automático da eficácia. O registro foi feito **sem remover os avisos de revisão** dos temas; para cada tema ainda é necessário confrontar o texto efetivamente publicado na Trelia, a redação aplicável e as fontes citadas.

## 3. Indicações de livro aprovadas mediante edição

| Tema | Obra e edição | Seção/página confirmada | Evidência |
|---|---|---|---|
| `receita-corrente-liquida` | Manual de Direito Financeiro — ISBN `9788544270752` | Receita Corrente Líquida — seção 7.1 · p. 343 | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5103-Sumario.pdf) |
| `limites-despesa-pessoal-lrf` | Manual de Direito Financeiro — ISBN `9788544270752` | Despesas com pessoal — seção 11.6 · p. 567 | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5103-Sumario.pdf) |
| `transferencia-internacional-dados-lgpd` | Lei Geral de Proteção de Dados Pessoais Comentada — ISBN `9788530997809` | Capítulo V — Da Transferência Internacional de Dados | [Fonte](https://www.grupogen.com.br/e-book-lei-geral-de-protecao-de-dados-pessoais-comentada-1-edicao-2026-laura-schertel-mendes-isabela-maria-rosal-e-elora-fernandes-editora-forense-9788530997809) |
| `relatorio-impacto-protecao-dados` | Relatório de Impacto à Proteção de Dados Pessoais — ISBN `9786551772740` | Seção 2.1 — O desenho do Relatório de Impacto na LGPD e na ANPD | [Fonte](https://www.grupogen.com.br/e-book-relatorio-de-impacto-a-protecao-de-dados-pessoais-1-edicao-2027-maria-cecilia-oliveira-gomes-saraiva-jur-9786551772740) |

O *Manual de Direito Financeiro* de Harrison Leite (ISBN 9788544270752) é a edição impressa 2026 já existente na Trelia. As referências às pp. **343** (receita corrente líquida) e **567** (despesas com pessoal) foram conferidas no sumário da própria edição. A obra **Lei Geral de Proteção de Dados Pessoais Comentada** (ISBN 9788530997809, edição 2026) tem capítulo V específico de transferência internacional de dados. *Relatório de Impacto à Proteção de Dados Pessoais* (ISBN 9786551772740, edição comercial 2027 com catálogo publicado em 2026) tem a seção 2.1 explicitamente intitulada sobre o RIPD na LGPD e na ANPD. Não presumimos página inicial onde o sumário online não fornece.

## 4. Fila nominal de revisão jurídica substantiva (74 temas)

O fato de um tema estar nesta tabela significa **aviso editorial mantido**. A próxima revisão deve conferir, ao menos, (a) conteúdo da explicação, (b) artigo normativo indicado, (c) vigência e jurisprudência relevantes e (d) documentação da decisão. A tabela aponta a fonte da aplicação; ela não certifica a correção do texto.

| Área | Tema | Fonte(s) cadastrada(s) | Prioridade adicional |
|---|---|---|---|
| Direito Administrativo | `regime-juridico-bens-publicos` — Bens públicos e suas espécies | [Código Civil, Lei nº 10.](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) | Revisão substantiva pendente |
| Direito Administrativo | `concessao-permissao` — Concessão e permissão | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei de Concessões e Perm](https://www.planalto.gov.br/ccivil_03/leis/l8987cons.htm) | Revisão substantiva pendente |
| Direito Administrativo | `controle-externo-tribunais-contas` — Controle externo e tribunais de contas | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Administrativo | `desapropriacao-utilidade-publica` — Desapropriação por utilidade pública | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Decreto-Lei nº 3.365/194](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3365.htm) | Revisão substantiva pendente |
| Direito Ambiental | `competencia-ambiental-lc140` — Competências ambientais entre União, estados e municípios | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei Complementar nº 140/](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm) | Revisão substantiva pendente |
| Direito Ambiental | `pagamento-servicos-ambientais` — Pagamento por serviços ambientais | [Lei nº 14.119/2021 — Pol](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14119.htm) | Revisão substantiva pendente |
| Direito Ambiental | `principios-prevencao-precaucao-ambiental` — Prevenção e precaução no Direito Ambiental | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Política Nacional do Mei](https://www.planalto.gov.br/ccivil_03/leis/l6938.htm) | Revisão substantiva pendente |
| Direito Ambiental | `responsabilidade-penal-pessoa-juridica-ambiental` — Responsabilidade penal da pessoa jurídica por crime ambiental | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei de Crimes Ambientais](https://www.planalto.gov.br/ccivil_03/leis/l9605.htm); [Política Nacional do Mei](https://www.planalto.gov.br/ccivil_03/leis/l6938.htm) | Revisão substantiva pendente |
| Direito Civil | `eviccao-contratos` — Evicção nos contratos onerosos | [Código Civil, Lei nº 10.](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) | Revisão substantiva pendente |
| Direito Civil | `guarda-compartilhada-convivencia` — Guarda compartilhada e convivência familiar | [Código Civil, Lei nº 10.](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Civil | `regimes-bens-casamento` — Regimes de bens no casamento | [Código Civil, Lei nº 10.](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) | Revisão substantiva pendente |
| Direito Civil | `uniao-estavel-efeitos-patrimoniais` — União estável e efeitos patrimoniais | [Código Civil, Lei nº 10.](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Constitucional | `comissao-parlamentar-inquerito` — Comissões parlamentares de inquérito | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Constitucional | `direito-fundamental-educacao` — Direito à educação e dever do Estado | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Constitucional | `iniciativa-popular-projeto-lei` — Iniciativa popular de projetos de lei | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Constitucional | `intervencao-federal` — Intervenção federal nos estados | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Consumidor | `cobranca-indebita-consumo` — Cobrança indevida e repetição do indébito | [Código de Defesa do Cons](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) | Revisão substantiva pendente |
| Direito Consumidor | `contratos-adesao-consumo` — Contratos de adesão no consumo | [Código de Defesa do Cons](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) | Revisão substantiva pendente |
| Direito Consumidor | `praticas-abusivas-art39` — Práticas abusivas nas relações de consumo | [Código de Defesa do Cons](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) | Revisão substantiva pendente |
| Direito Consumidor | `recall-produtos-seguranca` — Recall e dever de segurança do fornecedor | [Código de Defesa do Cons](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) | Revisão substantiva pendente |
| Direito Digital | `relatorio-impacto-protecao-dados` — Relatório de impacto à proteção de dados (RIPD) | [Lei Geral de Proteção de](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) | Revisão substantiva pendente |
| Direito Digital | `revisao-decisoes-automatizadas-lgpd` — Revisão de decisões automatizadas na LGPD | [Lei Geral de Proteção de](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) | Revisão substantiva pendente |
| Direito Digital | `seguranca-desde-concepcao-lgpd` — Segurança desde a concepção no tratamento de dados | [Lei Geral de Proteção de](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) | Revisão substantiva pendente |
| Direito Digital | `transferencia-internacional-dados-lgpd` — Transferência internacional de dados pessoais | [Lei Geral de Proteção de](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) | Revisão substantiva pendente |
| Direito Econômico | `restricoes-verticais-distribuicao` — Acordos verticais e distribuição exclusiva | [Lei de Defesa da Concorr](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12529.htm) | Revisão substantiva pendente |
| Direito Econômico | `precos-predatorios-concorrencia` — Preços predatórios e abuso de posição dominante | [Lei de Defesa da Concorr](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12529.htm) | Revisão substantiva pendente |
| Direito Econômico | `proposta-remedios-antitruste` — Remédios antitruste no controle de fusões | [Lei de Defesa da Concorr](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12529.htm) | Revisão substantiva pendente |
| Direito Econômico | `troca-informacoes-sensiveis-concorrentes` — Troca de informações sensíveis entre concorrentes | [Lei de Defesa da Concorr](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12529.htm); [Guias do Cade — publicaç](https://www.gov.br/cade/pt-br/centrais-de-conteudo/publicacoes-institucionais/guias-do-cade) | Revisão substantiva pendente |
| Direito Eleitoral | `abuso-poder-economico-eleitoral` — Abuso de poder econômico nas eleições | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei Complementar nº 64/1](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp64.htm) | LC nº 219/2025 (alta) |
| Direito Eleitoral | `condutas-vedadas-agentes-publicos` — Condutas vedadas a agentes públicos em campanha | [Lei das Eleições, Lei nº](https://www.planalto.gov.br/ccivil_03/leis/l9504.htm) | Revisão substantiva pendente |
| Direito Eleitoral | `cotas-genero-candidaturas` — Cotas de gênero e candidaturas proporcionais | [Lei das Eleições, Lei nº](https://www.planalto.gov.br/ccivil_03/leis/l9504.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Eleitoral | `doacoes-financiamento-campanha` — Doações e financiamento das campanhas | [Lei das Eleições, Lei nº](https://www.planalto.gov.br/ccivil_03/leis/l9504.htm) | Revisão substantiva pendente |
| Direito Empresarial | `direitos-acionistas-sociedade-anonima` — Direitos essenciais dos acionistas | [Lei das Sociedades por A](https://www.planalto.gov.br/ccivil_03/leis/l6404consol.htm) | Revisão substantiva pendente |
| Direito Empresarial | `duplicata-mercantil` — Duplicata mercantil e sua circulação | [Lei nº 5.474/1968 — Dupl](https://www.planalto.gov.br/ccivil_03/leis/l5474.htm) | Revisão substantiva pendente |
| Direito Empresarial | `nome-empresarial-protecao` — Nome empresarial e sua proteção | [Código Civil, Lei nº 10.](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm); [Lei da Propriedade Indus](https://www.planalto.gov.br/ccivil_03/leis/l9279.htm) | Revisão substantiva pendente |
| Direito Empresarial | `recuperacao-extrajudicial-empresa` — Recuperação extrajudicial de empresas | [Lei de Recuperação e Fal](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11101compilado.htm) | Revisão substantiva pendente |
| Direito Financeiro | `divida-publica-operacoes-credito` — Dívida pública e operações de crédito | [Lei de Responsabilidade ](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm) | Revisão substantiva pendente |
| Direito Financeiro | `limites-despesa-pessoal-lrf` — Limites de despesa com pessoal na LRF | [Lei de Responsabilidade ](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm) | Revisão substantiva pendente |
| Direito Financeiro | `receita-corrente-liquida` — Receita corrente líquida como indicador fiscal | [Lei de Responsabilidade ](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm) | Revisão substantiva pendente |
| Direito Financeiro | `regra-ouro-orcamento` — Regra de ouro das finanças públicas | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Internacional | `cooperacao-juridica-internacional-cpc` — Cooperação jurídica internacional no processo civil | [Código de Processo Civil](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm) | Revisão substantiva pendente |
| Direito Internacional | `extradicao-lei-migracao` — Extradição no Direito brasileiro | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei de Migração, Lei nº ](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm) | Revisão substantiva pendente |
| Direito Internacional | `imunidades-diplomaticas` — Imunidades diplomáticas e limites | [Convenção de Viena sobre](https://www.planalto.gov.br/ccivil_03/decreto/antigos/d56435.htm) | Revisão substantiva pendente |
| Direito Internacional | `solucao-pacifica-controversias` — Solução pacífica de controvérsias internacionais | [Carta das Nações Unidas,](https://www.planalto.gov.br/ccivil_03/decreto/1930-1949/d19841.htm) | Revisão substantiva pendente |
| Direito Penal | `crime-preterdoloso` — Crime preterdoloso e agravação pelo resultado | [Código Penal, Decreto-Le](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm) | Revisão substantiva pendente |
| Direito Penal | `legitima-defesa-putativa` — Legítima defesa putativa e erro sobre situação justificante | [Código Penal, Decreto-Le](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm) | Revisão substantiva pendente |
| Direito Previdenciário | `auxilio-acidente-sequela` — Auxílio-acidente e sequelas consolidadas | [Lei nº 8.213/1991 — Plan](https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm) | Revisão substantiva pendente |
| Direito Previdenciário | `recurso-administrativo-inss` — Recursos administrativos contra decisões do INSS | [Lei nº 8.213/1991 — Plan](https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Previdenciário | `salario-maternidade-rgps` — Salário-maternidade no RGPS | [Lei nº 8.213/1991 — Plan](https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm); [Consolidação das Leis do](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) | Lei nº 15.371/2026 (media) |
| Direito Previdenciário | `segurado-especial-rural` — Segurado especial rural | [Lei nº 8.213/1991 — Plan](https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm); [Lei nº 8.212/1991 — Segu](https://www.planalto.gov.br/ccivil_03/leis/l8212cons.htm) | Revisão substantiva pendente |
| Processo Civil | `acao-monitoria` — Ação monitória | [Código de Processo Civil](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm) | Revisão substantiva pendente |
| Processo Civil | `execucao-alimentos-prisao-civil` — Cumprimento de sentença de alimentos e prisão civil | [Código de Processo Civil](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Lei nº 15.479/2026 (alta) |
| Processo Civil | `irdr-demandas-repetitivas` — Incidente de Resolução de Demandas Repetitivas (IRDR) | [Código de Processo Civil](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm) | Revisão substantiva pendente |
| Processo Civil | `producao-antecipada-prova-cpc` — Produção antecipada de prova | [Código de Processo Civil](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm) | Revisão substantiva pendente |
| Processo Penal | `assistente-acusacao` — Assistente de acusação no processo penal | [Código de Processo Penal](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm) | Revisão substantiva pendente |
| Processo Penal | `colaboracao-premiada` — Colaboração premiada e corroboração | [Lei nº 12.850/2013 — Org](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm) | Revisão substantiva pendente |
| Processo Penal | `interceptacao-telefonica-prova` — Interceptação telefônica e reserva de jurisdição | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei nº 9.296/1996 — Inte](https://www.planalto.gov.br/ccivil_03/leis/l9296.htm) | Revisão substantiva pendente |
| Processo Penal | `tribunal-juri-quesitacao` — Quesitação no Tribunal do Júri | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Código de Processo Penal](https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm) | Revisão substantiva pendente |
| Propriedade Intelectual | `coautoria-obras-intelectuais` — Coautoria de obras intelectuais | [Lei de Direitos Autorais](https://www.planalto.gov.br/ccivil_03/leis/l9610.htm) | Revisão substantiva pendente |
| Propriedade Intelectual | `dominio-publico-direitos-autorais` — Domínio público e fim da proteção patrimonial | [Lei de Direitos Autorais](https://www.planalto.gov.br/ccivil_03/leis/l9610.htm) | Revisão substantiva pendente |
| Propriedade Intelectual | `licenciamento-programas-computador` — Licenciamento de programas de computador | [Lei do Software, Lei nº ](https://www.planalto.gov.br/ccivil_03/leis/l9609.htm) | Revisão substantiva pendente |
| Propriedade Intelectual | `nulidade-registro-marca` — Nulidade de registro de marca | [Lei da Propriedade Indus](https://www.planalto.gov.br/ccivil_03/leis/l9279.htm) | Revisão substantiva pendente |
| Direito do Trabalho | `trabalho-intermitente-clt` — Contrato de trabalho intermitente | [Consolidação das Leis do](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) | Revisão substantiva pendente |
| Direito do Trabalho | `equiparacao-salarial-clt` — Equiparação salarial e trabalho de igual valor | [Consolidação das Leis do](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito do Trabalho | `negociacao-coletiva-limites` — Negociação coletiva e limites legais | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Consolidação das Leis do](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) | Revisão substantiva pendente |
| Direito do Trabalho | `estabilidade-gestante-emprego` — Proteção da gestante contra dispensa arbitrária | [ADCT — Ato das Disposiçõ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#adct); [Consolidação das Leis do](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) | Revisão substantiva pendente |
| Direito Tributário | `contribuicao-melhoria-tributo` — Contribuição de melhoria | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Código Tributário Nacion](https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm) | Revisão substantiva pendente |
| Direito Tributário | `imposto-bens-servicos-cbs-ibs` — IBS e CBS na reforma da tributação do consumo | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei Complementar nº 214/](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm); [Lei Complementar nº 227/](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm) | LC nº 227/2026 (alta) |
| Direito Tributário | `imposto-seletivo-reforma` — Imposto Seletivo e finalidade extrafiscal | [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [Lei Complementar nº 214/](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm) | Revisão substantiva pendente |
| Direito Tributário | `responsabilidade-tributaria-administradores` — Responsabilidade tributária de administradores | [Código Tributário Nacion](https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm) | Revisão substantiva pendente |
| Direito Urbanístico | `consorcio-imobiliario-estatuto-cidade` — Consórcio imobiliário como instrumento urbanístico | [Estatuto da Cidade, Lei ](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10257.htm) | Revisão substantiva pendente |
| Direito Urbanístico | `transferencia-direito-construir` — Transferência do direito de construir | [Estatuto da Cidade, Lei ](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10257.htm) | Revisão substantiva pendente |
| Direito Urbanístico | `usucapiao-especial-urbana` — Usucapião especial urbana individual | [Estatuto da Cidade, Lei ](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10257.htm); [Constituição Federal de ](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) | Revisão substantiva pendente |
| Direito Urbanístico | `zeis-zonas-especiais-interesse-social` — Zonas Especiais de Interesse Social (ZEIS) | [Estatuto da Cidade, Lei ](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10257.htm); [Lei nº 13.465/2017 — Reg](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13465.htm) | Lei nº 15.432/2026 (media) |

## 5. Fila nominal sem indicação específica de livro (89 temas)

O rótulo não significa que faltem norma, explicação ou materiais gratuitos. Uma indicação de livro exige obra, edição, razão da escolha e **localização verificável na edição**. Candidatos bibliográficos genéricos permanecem candidatos.

| Área | Tema | Fontes na ficha | Materiais gratuitos | Em revisão? |
|---|---|---:|---:|---|
| Direito Administrativo | `acesso-informacao-lai` — Pedidos de acesso à informação pública | 1 | 0 | Não |
| Direito Administrativo | `sancoes-licitacoes-contratos` — Sanções nas licitações e contratos públicos | 1 | 0 | Não |
| Direito Ambiental | `logistica-reversa-pnrs` — Logística reversa e responsabilidade pós-consumo | 1 | 0 | Não |
| Direito Ambiental | `educacao-ambiental-politica-nacional` — Política Nacional de Educação Ambiental | 1 | 0 | Não |
| Direito Ambiental | `principios-prevencao-precaucao-ambiental` — Prevenção e precaução no Direito Ambiental | 2 | 0 | Sim |
| Direito Ambiental | `responsabilidade-penal-pessoa-juridica-ambiental` — Responsabilidade penal da pessoa jurídica por crime ambiental | 3 | 0 | Sim |
| Direito Civil | `herdeiros-necessarios-legitima` — Herdeiros necessários e legítima | 1 | 0 | Não |
| Direito Civil | `sucessao-legitima-testamentaria` — Sucessão legítima e sucessão testamentária | 1 | 0 | Não |
| Direito Constitucional | `comissao-parlamentar-inquerito` — Comissões parlamentares de inquérito | 1 | 0 | Sim |
| Direito Constitucional | `direito-fundamental-educacao` — Direito à educação e dever do Estado | 1 | 0 | Sim |
| Direito Constitucional | `direito-reuniao-manifestacao` — Direito de reunião e manifestação | 1 | 0 | Não |
| Direito Constitucional | `estado-defesa-estado-sitio` — Estado de defesa e estado de sítio | 1 | 0 | Não |
| Direito Constitucional | `iniciativa-popular-projeto-lei` — Iniciativa popular de projetos de lei | 1 | 0 | Sim |
| Direito Constitucional | `intervencao-federal` — Intervenção federal nos estados | 1 | 0 | Sim |
| Direito Consumidor | `cobranca-indebita-consumo` — Cobrança indevida e repetição do indébito | 1 | 0 | Sim |
| Direito Consumidor | `superendividamento-consumidor` — Prevenção e tratamento do superendividamento | 1 | 0 | Não |
| Direito Consumidor | `publicidade-enganosa-abusiva` — Publicidade enganosa e abusiva | 1 | 0 | Não |
| Direito Consumidor | `recall-produtos-seguranca` — Recall e dever de segurança do fornecedor | 1 | 0 | Sim |
| Direito Digital | `comunicacao-incidente-dados` — Comunicação de incidentes com dados pessoais | 2 | 0 | Não |
| Direito Digital | `proposta-agentes-tratamento-lgpd` — Controlador, operador e encarregado na LGPD | 1 | 2 | Não |
| Direito Digital | `revisao-decisoes-automatizadas-lgpd` — Revisão de decisões automatizadas na LGPD | 1 | 0 | Sim |
| Direito Digital | `seguranca-desde-concepcao-lgpd` — Segurança desde a concepção no tratamento de dados | 1 | 0 | Sim |
| Direito Digital | `proposta-dados-criancas-lgpd` — Tratamento de dados de crianças e adolescentes na LGPD | 0 | 3 | Não |
| Direito Econômico | `restricoes-verticais-distribuicao` — Acordos verticais e distribuição exclusiva | 1 | 0 | Sim |
| Direito Econômico | `exclusividade-plataformas-digitais` — Cláusulas de exclusividade em plataformas digitais | 1 | 0 | Não |
| Direito Econômico | `precos-predatorios-concorrencia` — Preços predatórios e abuso de posição dominante | 1 | 0 | Sim |
| Direito Econômico | `compliance-concorrencial` — Programas de compliance concorrencial | 1 | 0 | Não |
| Direito Econômico | `proposta-remedios-antitruste` — Remédios antitruste no controle de fusões | 1 | 1 | Sim |
| Direito Econômico | `troca-informacoes-sensiveis-concorrentes` — Troca de informações sensíveis entre concorrentes | 2 | 0 | Sim |
| Direito Eleitoral | `abuso-poder-economico-eleitoral` — Abuso de poder econômico nas eleições | 2 | 0 | Sim |
| Direito Eleitoral | `condutas-vedadas-agentes-publicos` — Condutas vedadas a agentes públicos em campanha | 1 | 0 | Sim |
| Direito Eleitoral | `doacoes-financiamento-campanha` — Doações e financiamento das campanhas | 1 | 0 | Sim |
| Direito Eleitoral | `federacoes-partidarias` — Federações partidárias | 2 | 0 | Não |
| Direito Eleitoral | `sistema-eleitoral-proporcional` — Sistema eleitoral proporcional | 3 | 0 | Não |
| Direito Empresarial | `direitos-acionistas-sociedade-anonima` — Direitos essenciais dos acionistas | 1 | 0 | Sim |
| Direito Empresarial | `duplicata-mercantil` — Duplicata mercantil e sua circulação | 1 | 0 | Sim |
| Direito Empresarial | `estabelecimento-empresarial` — Estabelecimento empresarial | 1 | 0 | Não |
| Direito Empresarial | `proposta-mediacao-empresarial` — Mediação na recuperação empresarial | 0 | 2 | Não |
| Direito Empresarial | `nome-empresarial-protecao` — Nome empresarial e sua proteção | 2 | 0 | Sim |
| Direito Empresarial | `recuperacao-extrajudicial-empresa` — Recuperação extrajudicial de empresas | 1 | 0 | Sim |
| Direito Empresarial | `titulos-credito-requisitos` — Títulos de crédito e seus requisitos | 1 | 0 | Não |
| Direito Financeiro | `divida-publica-operacoes-credito` — Dívida pública e operações de crédito | 1 | 0 | Sim |
| Direito Financeiro | `ppa-ldo-loa` — PPA, LDO e LOA | 2 | 0 | Não |
| Direito Financeiro | `regra-ouro-orcamento` — Regra de ouro das finanças públicas | 1 | 0 | Sim |
| Direito Financeiro | `restos-a-pagar` — Restos a pagar | 2 | 0 | Não |
| Direito Internacional | `cooperacao-juridica-internacional-cpc` — Cooperação jurídica internacional no processo civil | 1 | 0 | Sim |
| Direito Internacional | `extradicao-lei-migracao` — Extradição no Direito brasileiro | 2 | 0 | Sim |
| Direito Internacional | `imunidades-diplomaticas` — Imunidades diplomáticas e limites | 1 | 0 | Sim |
| Direito Internacional | `refugio-protecao-internacional` — Refúgio e reconhecimento da condição de refugiado | 1 | 0 | Não |
| Direito Internacional | `solucao-pacifica-controversias` — Solução pacífica de controvérsias internacionais | 1 | 0 | Sim |
| Direito Internacional | `tratados-direitos-humanos-hierarquia` — Tratados de direitos humanos e hierarquia normativa | 1 | 0 | Não |
| Direito Penal | `crime-preterdoloso` — Crime preterdoloso e agravação pelo resultado | 1 | 0 | Sim |
| Direito Penal | `legitima-defesa-putativa` — Legítima defesa putativa e erro sobre situação justificante | 1 | 0 | Sim |
| Direito Previdenciário | `aposentadoria-especial-agentes-nocivos` — Aposentadoria especial | 2 | 0 | Não |
| Direito Previdenciário | `bpc-loas-assistencia` — Benefício de Prestação Continuada (BPC/LOAS) | 1 | 0 | Não |
| Direito Previdenciário | `recurso-administrativo-inss` — Recursos administrativos contra decisões do INSS | 2 | 0 | Sim |
| Processo Civil | `execucao-alimentos-prisao-civil` — Cumprimento de sentença de alimentos e prisão civil | 2 | 0 | Sim |
| Processo Civil | `irdr-demandas-repetitivas` — Incidente de Resolução de Demandas Repetitivas (IRDR) | 1 | 0 | Sim |
| Processo Civil | `negocio-juridico-processual` — Negócios jurídicos processuais | 1 | 0 | Não |
| Processo Civil | `sistema-precedentes-cpc` — Sistema de precedentes no CPC | 1 | 0 | Não |
| Processo Penal | `assistente-acusacao` — Assistente de acusação no processo penal | 1 | 0 | Sim |
| Processo Penal | `busca-pessoal-fundadas-razoes` — Busca pessoal no processo penal | 1 | 0 | Não |
| Processo Penal | `colaboracao-premiada` — Colaboração premiada e corroboração | 1 | 0 | Sim |
| Processo Penal | `direito-silencio-interrogatorio` — Direito ao silêncio no interrogatório | 2 | 0 | Não |
| Processo Penal | `interceptacao-telefonica-prova` — Interceptação telefônica e reserva de jurisdição | 2 | 0 | Sim |
| Processo Penal | `tribunal-juri-quesitacao` — Quesitação no Tribunal do Júri | 2 | 0 | Sim |
| Propriedade Intelectual | `coautoria-obras-intelectuais` — Coautoria de obras intelectuais | 1 | 0 | Sim |
| Propriedade Intelectual | `dominio-publico-direitos-autorais` — Domínio público e fim da proteção patrimonial | 1 | 0 | Sim |
| Propriedade Intelectual | `licenciamento-programas-computador` — Licenciamento de programas de computador | 1 | 0 | Sim |
| Propriedade Intelectual | `nulidade-registro-marca` — Nulidade de registro de marca | 1 | 0 | Sim |
| Propriedade Intelectual | `registro-desenho-industrial` — Registro de desenho industrial | 1 | 0 | Não |
| Propriedade Intelectual | `segredo-industrial-concorrencia-desleal` — Segredo industrial e concorrência desleal | 1 | 0 | Não |
| Direito do Trabalho | `proposta-negociacao-coletiva` — Acordo e convenção coletiva de trabalho | 0 | 2 | Não |
| Direito do Trabalho | `trabalho-intermitente-clt` — Contrato de trabalho intermitente | 1 | 0 | Sim |
| Direito do Trabalho | `discriminacao-acesso-trabalho` — Discriminação no acesso e manutenção do trabalho | 2 | 0 | Não |
| Direito do Trabalho | `equiparacao-salarial-clt` — Equiparação salarial e trabalho de igual valor | 2 | 0 | Sim |
| Direito do Trabalho | `negociacao-coletiva-limites` — Negociação coletiva e limites legais | 2 | 0 | Sim |
| Direito do Trabalho | `estabilidade-gestante-emprego` — Proteção da gestante contra dispensa arbitrária | 2 | 0 | Sim |
| Direito do Trabalho | `teletrabalho-clt` — Teletrabalho e trabalho remoto | 1 | 0 | Não |
| Direito Tributário | `imposto-bens-servicos-cbs-ibs` — IBS e CBS na reforma da tributação do consumo | 3 | 0 | Sim |
| Direito Tributário | `imposto-seletivo-reforma` — Imposto Seletivo e finalidade extrafiscal | 2 | 0 | Sim |
| Direito Tributário | `sucessao-responsabilidade-tributaria` — Responsabilidade tributária por sucessão | 1 | 0 | Não |
| Direito Tributário | `repeticao-indebito-tributario` — Restituição de tributo pago indevidamente | 1 | 0 | Não |
| Direito Urbanístico | `consorcio-imobiliario-estatuto-cidade` — Consórcio imobiliário como instrumento urbanístico | 1 | 0 | Sim |
| Direito Urbanístico | `direito-preempcao-urbano` — Direito de preempção urbanística | 1 | 0 | Não |
| Direito Urbanístico | `operacoes-urbanas-consorciadas` — Operações urbanas consorciadas | 1 | 0 | Não |
| Direito Urbanístico | `transferencia-direito-construir` — Transferência do direito de construir | 1 | 0 | Sim |
| Direito Urbanístico | `usucapiao-especial-urbana` — Usucapião especial urbana individual | 2 | 0 | Sim |
| Direito Urbanístico | `zeis-zonas-especiais-interesse-social` — Zonas Especiais de Interesse Social (ZEIS) | 2 | 0 | Sim |

## 6. Critérios objetivos para encerrar cada pendência

- **Fonte normativa:** o link existe, a norma é identificada, o recorte exato é localizado e a redação aplicável à data do material é conferida (inclusive revogações, redações anteriores e entrada em vigor). Somente então registrar a revisão normativa do recorte.
- **Tema em revisão:** comparar explicação, legislação e orientação doutrinária ou jurisprudencial pertinente, corrigir se necessário e registrar o fundamento e a data. Somente retirar `editorialPending` após a verificação substantiva individual.
- **Tema sem livro:** vincular obra/edição com evidência específica de capítulo, seção ou página; capítulo geral só é suficiente se efetivamente cobrir o assunto, sem extrapolação. Indicar função e limitações da leitura.
- **Integridade técnica:** executar o gerador dos módulos, todos os testes, e conferir manualmente os cartões afetados em desktop e celular.

## Limitações remanescentes

As 74 revisões jurídicas substantivas **não foram fechadas** nesta rodada. As páginas oficiais foram localizadas, mas a análise detalhada de cada um dos 74 recortes e de atualizações jurisprudenciais continua em andamento editorial. Os livros de 89 temas não podem ser sugeridos sem evidência suficiente. Links podem voltar a falhar; o resultado é uma fotografia do acesso nesta consulta.

---
_Nenhum arquivo protegido foi republicado. Os catálogos editoriais e a curadoria mantêm as condições de licenciamento da Trelia._
