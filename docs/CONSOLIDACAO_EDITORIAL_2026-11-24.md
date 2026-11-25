# Trelia — consolidação editorial e auditoria do catálogo

**Data-base:** 24/11/2026  
**Base:** [PR #19](https://github.com/jaoafb/trelia/pull/19), ainda sem merge.  
**Execução automatizada:** [GitHub Actions #45531711925](https://github.com/jaoafb/trelia/actions/runs/45531711925).  


## 1. Panorama estrutural conferido na PR

| Indicador | Resultado |
|---|---:|
| Áreas jurídicas | 19 |
| Temas cadastrados | 308 |
| Obras / edições | 269 / 286 |
| Indicações de livro por tema | 392 |
| Localizações comprovadas por edição | 390 |
| Temas sem livro específico | **89** |
| Temas em revisão editorial | **74** |
| Temas sem relacionados cadastrados | 133 |
| Temas sem fontes na lista `topic.sources` | 78 |
| Materiais gratuitos vinculados | 311 |
| Políticas de periódicos associadas aos artigos da Expansão III | 19/19 |
| Inconsistências estruturais detectadas | 0 |

## 2. Resultados concretos de consolidação

Neste ciclo, a Trelia acrescentou 31 pares de temas correlatos, 152 expressões de busca para os 76 temas da Expansão III, políticas editoriais de 14 periódicos para seus 19 artigos, três indicações históricas específicas no livro de Denis Borges Barbosa e **mais quatro indicações bibliográficas confirmadas em edições de outras áreas**, com base em fontes editoriais de editoras.

As **33 fontes normativas** que aguardavam reabertura foram consultadas externamente. A Lei nº 11.101/2005 teve o link da interface substituído pela versão compilada oficial acessível. Todas essas fontes permanecem sujeitas à **revisão dos artigos e efeitos jurídicos específicos**, e os 74 avisos editoriais continuam ativos.

**[Abrir verificação complementar detalhada — 33 fontes, 74 temas e 89 lacunas de livros](VERIFICACAO_COMPLEMENTAR_2026-11-24.md).**

## 3. Comparação com a base antes do início da consolidação

| Métrica | Antes | Agora (PR #19) |
|---|---:|---:|
| Temas | 308 | 308 |
| Temas sem livro específico | 94 | 89 |
| Vínculos tema–obra | 387 | 392 |
| Temas sem outros temas relacionados | 177 | 133 |
| Políticas de periódicos da Expansão III com links na interface | 0 | 19 |
| Expressões novas de busca nesta consolidação | 0 | 152 |

## 4. Distribuição dos temas que ainda precisam de livros

| Área | Temas | Sem livro | Em revisão | Sem relacionados | Indicações de livro |
|---|---:|---:|---:|---:|---:|
| Direito Empresarial | 12 | 7 | 4 | 6 | 6 |
| Direito do Trabalho | 19 | 7 | 4 | 14 | 26 |
| Direito Constitucional | 24 | 6 | 4 | 14 | 40 |
| Direito Econômico | 19 | 6 | 4 | 9 | 29 |
| Direito Internacional | 11 | 6 | 4 | 7 | 5 |
| Processo Penal | 19 | 6 | 4 | 5 | 27 |
| Propriedade Intelectual | 13 | 6 | 4 | 6 | 11 |
| Direito Urbanístico | 13 | 6 | 4 | 5 | 10 |
| Direito Digital | 11 | 5 | 4 | 2 | 10 |
| Direito Eleitoral | 11 | 5 | 4 | 4 | 6 |
| Direito Ambiental | 11 | 4 | 4 | 2 | 7 |
| Direito Consumidor | 11 | 4 | 4 | 4 | 11 |
| Direito Financeiro | 11 | 4 | 4 | 3 | 7 |
| Processo Civil | 24 | 4 | 4 | 11 | 37 |
| Direito Tributário | 18 | 4 | 4 | 8 | 28 |
| Direito Previdenciário | 12 | 3 | 4 | 7 | 9 |
| Direito Administrativo | 23 | 2 | 4 | 12 | 43 |
| Direito Civil | 26 | 2 | 4 | 12 | 43 |
| Direito Penal | 20 | 2 | 2 | 2 | 37 |

## 5. Fila nominal sem livro — situação atual

Há **89 temas** sem indicação de livro específica. Os dados e a fila são reproduzíveis executando `node scripts/auditar-catalogo.mjs --strict` na PR. A lista nominal completa está também no [relatório de verificação complementar](VERIFICACAO_COMPLEMENTAR_2026-11-24.md).

- **Pedidos de acesso à informação pública** (`acesso-informacao-lai`, Direito Administrativo); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Sanções nas licitações e contratos públicos** (`sancoes-licitacoes-contratos`, Direito Administrativo); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Logística reversa e responsabilidade pós-consumo** (`logistica-reversa-pnrs`, Direito Ambiental); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Política Nacional de Educação Ambiental** (`educacao-ambiental-politica-nacional`, Direito Ambiental); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Prevenção e precaução no Direito Ambiental** (`principios-prevencao-precaucao-ambiental`, Direito Ambiental); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Responsabilidade penal da pessoa jurídica por crime ambiental** (`responsabilidade-penal-pessoa-juridica-ambiental`, Direito Ambiental); 3 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Herdeiros necessários e legítima** (`herdeiros-necessarios-legitima`, Direito Civil); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Sucessão legítima e sucessão testamentária** (`sucessao-legitima-testamentaria`, Direito Civil); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Comissões parlamentares de inquérito** (`comissao-parlamentar-inquerito`, Direito Constitucional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Direito à educação e dever do Estado** (`direito-fundamental-educacao`, Direito Constitucional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Direito de reunião e manifestação** (`direito-reuniao-manifestacao`, Direito Constitucional); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Estado de defesa e estado de sítio** (`estado-defesa-estado-sitio`, Direito Constitucional); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Iniciativa popular de projetos de lei** (`iniciativa-popular-projeto-lei`, Direito Constitucional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Intervenção federal nos estados** (`intervencao-federal`, Direito Constitucional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Cobrança indevida e repetição do indébito** (`cobranca-indebita-consumo`, Direito Consumidor); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Prevenção e tratamento do superendividamento** (`superendividamento-consumidor`, Direito Consumidor); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Publicidade enganosa e abusiva** (`publicidade-enganosa-abusiva`, Direito Consumidor); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Recall e dever de segurança do fornecedor** (`recall-produtos-seguranca`, Direito Consumidor); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Comunicação de incidentes com dados pessoais** (`comunicacao-incidente-dados`, Direito Digital); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Controlador, operador e encarregado na LGPD** (`proposta-agentes-tratamento-lgpd`, Direito Digital); 1 fontes, 2 materiais gratuitos; revisão editorial não marcada.
- **Revisão de decisões automatizadas na LGPD** (`revisao-decisoes-automatizadas-lgpd`, Direito Digital); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Segurança desde a concepção no tratamento de dados** (`seguranca-desde-concepcao-lgpd`, Direito Digital); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Tratamento de dados de crianças e adolescentes na LGPD** (`proposta-dados-criancas-lgpd`, Direito Digital); 0 fontes, 3 materiais gratuitos; revisão editorial não marcada.
- **Acordos verticais e distribuição exclusiva** (`restricoes-verticais-distribuicao`, Direito Econômico); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Cláusulas de exclusividade em plataformas digitais** (`exclusividade-plataformas-digitais`, Direito Econômico); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Preços predatórios e abuso de posição dominante** (`precos-predatorios-concorrencia`, Direito Econômico); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Programas de compliance concorrencial** (`compliance-concorrencial`, Direito Econômico); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Remédios antitruste no controle de fusões** (`proposta-remedios-antitruste`, Direito Econômico); 1 fontes, 1 materiais gratuitos; revisão editorial pendente.
- **Troca de informações sensíveis entre concorrentes** (`troca-informacoes-sensiveis-concorrentes`, Direito Econômico); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Abuso de poder econômico nas eleições** (`abuso-poder-economico-eleitoral`, Direito Eleitoral); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Condutas vedadas a agentes públicos em campanha** (`condutas-vedadas-agentes-publicos`, Direito Eleitoral); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Doações e financiamento das campanhas** (`doacoes-financiamento-campanha`, Direito Eleitoral); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Federações partidárias** (`federacoes-partidarias`, Direito Eleitoral); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Sistema eleitoral proporcional** (`sistema-eleitoral-proporcional`, Direito Eleitoral); 3 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Direitos essenciais dos acionistas** (`direitos-acionistas-sociedade-anonima`, Direito Empresarial); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Duplicata mercantil e sua circulação** (`duplicata-mercantil`, Direito Empresarial); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Estabelecimento empresarial** (`estabelecimento-empresarial`, Direito Empresarial); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Mediação na recuperação empresarial** (`proposta-mediacao-empresarial`, Direito Empresarial); 0 fontes, 2 materiais gratuitos; revisão editorial não marcada.
- **Nome empresarial e sua proteção** (`nome-empresarial-protecao`, Direito Empresarial); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Recuperação extrajudicial de empresas** (`recuperacao-extrajudicial-empresa`, Direito Empresarial); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Títulos de crédito e seus requisitos** (`titulos-credito-requisitos`, Direito Empresarial); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Dívida pública e operações de crédito** (`divida-publica-operacoes-credito`, Direito Financeiro); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **PPA, LDO e LOA** (`ppa-ldo-loa`, Direito Financeiro); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Regra de ouro das finanças públicas** (`regra-ouro-orcamento`, Direito Financeiro); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Restos a pagar** (`restos-a-pagar`, Direito Financeiro); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Cooperação jurídica internacional no processo civil** (`cooperacao-juridica-internacional-cpc`, Direito Internacional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Extradição no Direito brasileiro** (`extradicao-lei-migracao`, Direito Internacional); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Imunidades diplomáticas e limites** (`imunidades-diplomaticas`, Direito Internacional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Refúgio e reconhecimento da condição de refugiado** (`refugio-protecao-internacional`, Direito Internacional); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Solução pacífica de controvérsias internacionais** (`solucao-pacifica-controversias`, Direito Internacional); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Tratados de direitos humanos e hierarquia normativa** (`tratados-direitos-humanos-hierarquia`, Direito Internacional); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Crime preterdoloso e agravação pelo resultado** (`crime-preterdoloso`, Direito Penal); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Legítima defesa putativa e erro sobre situação justificante** (`legitima-defesa-putativa`, Direito Penal); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Aposentadoria especial** (`aposentadoria-especial-agentes-nocivos`, Direito Previdenciário); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Benefício de Prestação Continuada (BPC/LOAS)** (`bpc-loas-assistencia`, Direito Previdenciário); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Recursos administrativos contra decisões do INSS** (`recurso-administrativo-inss`, Direito Previdenciário); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Cumprimento de sentença de alimentos e prisão civil** (`execucao-alimentos-prisao-civil`, Processo Civil); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Incidente de Resolução de Demandas Repetitivas (IRDR)** (`irdr-demandas-repetitivas`, Processo Civil); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Negócios jurídicos processuais** (`negocio-juridico-processual`, Processo Civil); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Sistema de precedentes no CPC** (`sistema-precedentes-cpc`, Processo Civil); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Assistente de acusação no processo penal** (`assistente-acusacao`, Processo Penal); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Busca pessoal no processo penal** (`busca-pessoal-fundadas-razoes`, Processo Penal); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Colaboração premiada e corroboração** (`colaboracao-premiada`, Processo Penal); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Direito ao silêncio no interrogatório** (`direito-silencio-interrogatorio`, Processo Penal); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Interceptação telefônica e reserva de jurisdição** (`interceptacao-telefonica-prova`, Processo Penal); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Quesitação no Tribunal do Júri** (`tribunal-juri-quesitacao`, Processo Penal); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Coautoria de obras intelectuais** (`coautoria-obras-intelectuais`, Propriedade Intelectual); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Domínio público e fim da proteção patrimonial** (`dominio-publico-direitos-autorais`, Propriedade Intelectual); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Licenciamento de programas de computador** (`licenciamento-programas-computador`, Propriedade Intelectual); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Nulidade de registro de marca** (`nulidade-registro-marca`, Propriedade Intelectual); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Registro de desenho industrial** (`registro-desenho-industrial`, Propriedade Intelectual); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Segredo industrial e concorrência desleal** (`segredo-industrial-concorrencia-desleal`, Propriedade Intelectual); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Acordo e convenção coletiva de trabalho** (`proposta-negociacao-coletiva`, Direito do Trabalho); 0 fontes, 2 materiais gratuitos; revisão editorial não marcada.
- **Contrato de trabalho intermitente** (`trabalho-intermitente-clt`, Direito do Trabalho); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Discriminação no acesso e manutenção do trabalho** (`discriminacao-acesso-trabalho`, Direito do Trabalho); 2 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Equiparação salarial e trabalho de igual valor** (`equiparacao-salarial-clt`, Direito do Trabalho); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Negociação coletiva e limites legais** (`negociacao-coletiva-limites`, Direito do Trabalho); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Proteção da gestante contra dispensa arbitrária** (`estabilidade-gestante-emprego`, Direito do Trabalho); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Teletrabalho e trabalho remoto** (`teletrabalho-clt`, Direito do Trabalho); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **IBS e CBS na reforma da tributação do consumo** (`imposto-bens-servicos-cbs-ibs`, Direito Tributário); 3 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Imposto Seletivo e finalidade extrafiscal** (`imposto-seletivo-reforma`, Direito Tributário); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Responsabilidade tributária por sucessão** (`sucessao-responsabilidade-tributaria`, Direito Tributário); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Restituição de tributo pago indevidamente** (`repeticao-indebito-tributario`, Direito Tributário); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Consórcio imobiliário como instrumento urbanístico** (`consorcio-imobiliario-estatuto-cidade`, Direito Urbanístico); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Direito de preempção urbanística** (`direito-preempcao-urbano`, Direito Urbanístico); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Operações urbanas consorciadas** (`operacoes-urbanas-consorciadas`, Direito Urbanístico); 1 fontes, 0 materiais gratuitos; revisão editorial não marcada.
- **Transferência do direito de construir** (`transferencia-direito-construir`, Direito Urbanístico); 1 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Usucapião especial urbana individual** (`usucapiao-especial-urbana`, Direito Urbanístico); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.
- **Zonas Especiais de Interesse Social (ZEIS)** (`zeis-zonas-especiais-interesse-social`, Direito Urbanístico); 2 fontes, 0 materiais gratuitos; revisão editorial pendente.

## 6. Limitações editoriais e próximas prioridades

- **89 lacunas bibliográficas:** não preencher a partir de palavras semelhantes ou de livros gerais sem comprovação da seção.
- **74 temas em revisão:** verificar individualmente interpretação, redação dos artigos legais, alterações relevantes e jurisprudência; não retirar avisos apenas porque a URL está disponível.
- **33 fontes oficiais:** foram reabertas ou substituídas por alternativa compilada, mas sua vigência jurídica por dispositivo não foi certificada integralmente.
- **31 pares temáticos:** facilitam a navegação, mas não equiparam os institutos jurídicos.
- **Leituras da 2ª edição de Barbosa:** fontes históricas, sem substituir a legislação atual.
- **Artigos científicos:** política editorial de periódico não prova arbitragem individual de cada artigo; o artigo sobre remédios antitruste continua sem DOI identificado.
- **Links de terceiros:** acesso verificado em uma data não garante disponibilidade permanente. O Guia de Compliance do Cade continua sinalizado por falha anterior.

## 7. Reproduzir a auditoria

```bash
python scripts/gerar_curadoria_novembro.py
node scripts/check-curadoria-novembro.mjs
node scripts/check-expansao-iii.mjs
node scripts/check-consolidacao-bibliografica-i.mjs
node scripts/check-politicas-periodicos.mjs
node scripts/check-relacoes-editoriais.mjs
node scripts/check-termos-busca.mjs
node scripts/check-verificacao-complementar.mjs
node scripts/auditar-catalogo.mjs --strict
```

A CI integra as verificações anteriores com as de consolidação. Resultado da execução do catálogo carregado é estrutural; a revisão jurídica e bibliográfica externa permanece uma disciplina editorial separada.

---
_Status: PR em rascunho, sem merge nem deploy para a produção. Não é parecer jurídico._
