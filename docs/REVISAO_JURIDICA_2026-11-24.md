# Trelia — primeiro ciclo de revisão jurídica rastreável

**Data-base: 24 de novembro de 2026**  
**Branch:** `curadoria/revisao-juridica-rastreavel-i` · [PR #20](https://github.com/jaoafb/trelia/pull/20) · ainda não publicada na `main`.

## Método e diferença entre os status

Este ciclo partiu dos **74 temas marcados como pendentes** na auditoria da PR #19. Uma verificação de disponibilidade de URL não é uma revisão jurídica. A fonte da verdade para status, escopo, evidências e histórico é `data/catalogo/trelia-revisao-juridica-2026-11-24.json`. O módulo da interface é **gerado**, não editado manualmente.

- **Revisão concluída no escopo:** a síntese introdutória do tema foi confrontada com fontes normativas/institucionais pertinentes ao recorte declarado. Não é certificação de toda a matéria nem garantia de permanência da jurisprudência.
- **Revisão parcial:** houve análise real, mas faltam questões de vigência, interpretação específica, regulamentação ou jurisprudência. O aviso editorial continua visível.
- **Pendente:** nenhuma revisão jurídica substantiva foi realizada neste ciclo; não se deve atribuir a esta data uma revisão que não ocorreu.

## Resultado quantificado

| Etapa | Temas | Aviso editorial ativo |
|---|---:|---|
| Concluída no escopo introdutório | 3 | Não, dentro do recorte |
| Revisão parcial | 8 | Sim |
| Ainda sem revisão substantiva neste ciclo | 63 | Sim |
| **Total da fila inicial** | **74** | **71 restantes** |

## Temas efetivamente examinados

| Tema | Área | Situação | Fonte e questão central |
|---|---|---|---|
| `relatorio-impacto-protecao-dados` — Relatório de impacto à proteção de dados (RIPD) | digital | Concluída no escopo | Comparados arts. 5º, XVII, 10, §3º, 32 e 38 da LGPD com as perguntas e respostas institucionais da ANPD. |
| `revisao-decisoes-automatizadas-lgpd` — Revisão de decisões automatizadas na LGPD | digital | Concluída no escopo | Confrontados o texto compilado da LGPD e a orientação pública da ANPD aos titulares. |
| `seguranca-desde-concepcao-lgpd` — Segurança desde a concepção no tratamento de dados | digital | Parcial | As âncoras dos arts. 6º, 46 e 50 foram verificadas no texto compilado; aprofundar regulamentações técnicas aplicáveis. |
| `transferencia-internacional-dados-lgpd` — Transferência internacional de dados pessoais | digital | Concluída no escopo | A LGPD arts. 33–36, a Resolução ANPD 19/2024 e a decisão de adequação 32/2026 foram confrontadas com as orientações oficiais. |
| `abuso-poder-economico-eleitoral` — Abuso de poder econômico nas eleições | eleitoral | Parcial | Lei Complementar 219/2025 alterou regras de duração e marcos de inelegibilidade na LC 64/1990; não equivale a validar qualquer prazo em concreto. |
| `condutas-vedadas-agentes-publicos` — Condutas vedadas a agentes públicos em campanha | eleitoral | Parcial | Consulta à Lei das Eleições e à Resolução TSE 23.735/2024 com alterações de 2026; condutas e períodos de incidência variam por inciso. |
| `cotas-genero-candidaturas` — Cotas de gênero e candidaturas proporcionais | eleitoral | Parcial | A Súmula 73 publicada na página do TSE contém consequências anteriores; notícia oficial de 5/11/2026 relata entendimento que preserva DRAP e votos de candidatas não participantes. Há divergência temporal entre as fontes públicas; não generalizar sem ler o acórdão. |
| `salario-maternidade-rgps` — Salário-maternidade no RGPS | previdenciario | Parcial | INSS confirma critérios de salário-maternidade e Lei 15.415/2026 alterou prazos de concessão; Lei 15.371/2026 disciplina salário-paternidade a partir de 2027. |
| `negociacao-coletiva-limites` — Negociação coletiva e limites legais | trabalho | Parcial | O STF admite acordos e convenções que limitem ou afastem direitos em adequação setorial negociada, preservados direitos absolutamente indisponíveis; cotejar com CLT 611-A/B. |
| `imposto-bens-servicos-cbs-ibs` — IBS e CBS na reforma da tributação do consumo | tributario | Parcial | Receita Federal confirma 2026 como ano de teste, com alíquotas de referência e regras condicionadas para recolhimento; LC 227/2026 consta da relação oficial. |
| `imposto-seletivo-reforma` — Imposto Seletivo e finalidade extrafiscal | tributario | Parcial | Fonte da Receita Federal indica instituição do Imposto Seletivo no cronograma de 2027. |

## Histórico, evidências e pendências específicas

### Relatório de impacto à proteção de dados (RIPD) (`relatorio-impacto-protecao-dados`)

**Status:** Síntese introdutória conferida no escopo · **Conferência:** 2026-11-24.

**Escopo:** Definição, responsável pela elaboração, situações de recomendação e hipóteses de requisição do RIPD.

**Resultado:** Comparados arts. 5º, XVII, 10, §3º, 32 e 38 da LGPD com as perguntas e respostas institucionais da ANPD.

**Limites e próximos passos:** Rever se forem editadas normas específicas adicionais para alto risco e elaboração de RIPD.

Fontes institucionais consultadas:
- [LGPD compilada](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) — arts. 5º, XVII, 10 §3º, 32 e 38
- [ANPD — Perguntas e respostas sobre RIPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd) — Definição, controlador, recomendação e requisição

### Revisão de decisões automatizadas na LGPD (`revisao-decisoes-automatizadas-lgpd`)

**Status:** Síntese introdutória conferida no escopo · **Conferência:** 2026-11-24.

**Escopo:** Direito à revisão de decisões unicamente automatizadas e dever de informar critérios, conforme art. 20 da LGPD.

**Resultado:** Confrontados o texto compilado da LGPD e a orientação pública da ANPD aos titulares.

**Limites e próximos passos:** Casos concretos de discriminação algorítmica e eventuais normas setoriais exigem análise própria.

Fontes institucionais consultadas:
- [LGPD compilada](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) — art. 20, caput e §§
- [ANPD — Direito dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares) — Revisão e solicitação de explicações

### Segurança desde a concepção no tratamento de dados (`seguranca-desde-concepcao-lgpd`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Princípios da segurança e prevenção e medidas previstas na LGPD.

**Resultado:** As âncoras dos arts. 6º, 46 e 50 foram verificadas no texto compilado; aprofundar regulamentações técnicas aplicáveis.

**Limites e próximos passos:** Conferir guias setoriais atualizados, padrões técnicos mínimos e alcance de obrigações por agente.

Fontes institucionais consultadas:
- [LGPD compilada](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) — arts. 6º VII–VIII, 46 e 50

### Transferência internacional de dados pessoais (`transferencia-internacional-dados-lgpd`)

**Status:** Síntese introdutória conferida no escopo · **Conferência:** 2026-11-24.

**Escopo:** Síntese introdutória das hipóteses legais e mecanismos de transferência internacional, normas e adequação até 24/11/2026.

**Resultado:** A LGPD arts. 33–36, a Resolução ANPD 19/2024 e a decisão de adequação 32/2026 foram confrontadas com as orientações oficiais.

**Limites e próximos passos:** Acompanhar novas decisões da ANPD; não inferir que decisões estrangeiras de adequação se aplicam automaticamente no Brasil.

Fontes institucionais consultadas:
- [LGPD compilada](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) — arts. 3º e 33 a 36
- [ANPD — Transferência internacional](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados) — Mecanismos, cláusulas e decisão UE de 2026
- [Resolução ANPD 19/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024) — Regulamento de transferência internacional
- [Resolução ANPD 32/2026 — registro oficial](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/) — Reconhecimento de adequação da União Europeia

### Abuso de poder econômico nas eleições (`abuso-poder-economico-eleitoral`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Base constitucional do abuso de poder e alteração do regime de inelegibilidades em 2025.

**Resultado:** Lei Complementar 219/2025 alterou regras de duração e marcos de inelegibilidade na LC 64/1990; não equivale a validar qualquer prazo em concreto.

**Limites e próximos passos:** Revisar art. 22 da LC 64/1990, tipificação eleitoral e precedentes atuais por hipótese antes de liberar aviso.

Fontes institucionais consultadas:
- [TSE — LC 219/2025](https://www.tse.jus.br/legislacao/compilada/lei/complementar/lei-complementar-no-219-de-29-de-setembro-de-2025?texto=compilado) — Modificações dos prazos e termos de inelegibilidade
- [TSE — Lei das Eleições](https://www.tse.jus.br/legislacao/codigo-eleitoral/lei-das-eleicoes/lei-das-eleicoes-lei-nb0-9.504-de-30-de-setembro-de-1997) — Regras gerais do pleito

### Condutas vedadas a agentes públicos em campanha (`condutas-vedadas-agentes-publicos`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Identificação das proibições legais e regulamento para o pleito de 2026.

**Resultado:** Consulta à Lei das Eleições e à Resolução TSE 23.735/2024 com alterações de 2026; condutas e períodos de incidência variam por inciso.

**Limites e próximos passos:** Revisão individual da tipicidade, prazos e sanções dos arts. 73 a 78 por conduta ainda pendente.

Fontes institucionais consultadas:
- [Lei das Eleições — TSE](https://www.tse.jus.br/legislacao/codigo-eleitoral/lei-das-eleicoes/lei-das-eleicoes-lei-nb0-9.504-de-30-de-setembro-de-1997) — arts. 73 a 78
- [Resolução TSE 23.735 consolidada](https://www.tse.jus.br/legislacao/compilada/res/2024/resolucao-no-23-735-de-27-de-fevereiro-de-2024?texto=compilado) — Condutas vedadas em campanha

### Cotas de gênero e candidaturas proporcionais (`cotas-genero-candidaturas`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Regra de candidaturas, resolução do TSE e mudança jurisprudencial divulgada em novembro de 2026.

**Resultado:** A Súmula 73 publicada na página do TSE contém consequências anteriores; notícia oficial de 5/11/2026 relata entendimento que preserva DRAP e votos de candidatas não participantes. Há divergência temporal entre as fontes públicas; não generalizar sem ler o acórdão.

**Limites e próximos passos:** Conferir publicação do acórdão e eventuais ajustes da Súmula 73/Resolução 23.735 antes de homologar consequências jurídicas.

Fontes institucionais consultadas:
- [Lei das Eleições — TSE](https://www.tse.jus.br/legislacao/codigo-eleitoral/lei-das-eleicoes/lei-das-eleicoes-lei-nb0-9.504-de-30-de-setembro-de-1997) — art. 10, § 3º
- [Resolução TSE 23.735/2024 consolidada](https://www.tse.jus.br/legislacao/compilada/res/2024/resolucao-no-23-735-de-27-de-fevereiro-de-2024?texto=compilado) — Fraude às cotas e sanções
- [Súmula TSE 73](https://www.tse.jus.br/legislacao/codigo-eleitoral/sumulas/sumulas-do-tse/sumula-tse-n-73) — Redação publicada na página institucional
- [TSE — julgamento 5/11/2026](https://www.tse.jus.br/comunicacao/noticias/2026/Novembro/fraude-a-cota-de-genero-candidatas-que-nao-participaram-do-ilicito-terao-mandatos-preservados) — Preservação das candidaturas femininas não envolvidas

### Salário-maternidade no RGPS (`salario-maternidade-rgps`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Benefício e atualização legislativa de 2026, separada da licença-paternidade futura.

**Resultado:** INSS confirma critérios de salário-maternidade e Lei 15.415/2026 alterou prazos de concessão; Lei 15.371/2026 disciplina salário-paternidade a partir de 2027.

**Limites e próximos passos:** Conferir carência por categoria e todos os efeitos da Lei 15.415/2026; não confundir com salário-paternidade ainda futuro em 2026.

Fontes institucionais consultadas:
- [INSS — salário-maternidade](https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade/salario-maternidade) — Requisitos e hipóteses
- [INSS — atualização de agosto/2026](https://www.gov.br/inss/pt-br/assuntos/noticias/salario-maternidade-protecao-previdenciaria-no-momento-da-chegada-de-mais-uma-vida) — Benefício vigente e paternidade em 2027
- [Lei 15.415/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15415.htm) — Atualização do benefício
- [Lei 15.371/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15371.htm) — Salário-paternidade: vigência futura

### Negociação coletiva e limites legais (`negociacao-coletiva-limites`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Base constitucional da negociação coletiva e tese de repercussão geral 1046.

**Resultado:** O STF admite acordos e convenções que limitem ou afastem direitos em adequação setorial negociada, preservados direitos absolutamente indisponíveis; cotejar com CLT 611-A/B.

**Limites e próximos passos:** Verificar jurisprudência posterior e a natureza do direito específico em cada cláusula antes de concluir.

Fontes institucionais consultadas:
- [STF — Tema 1046 da repercussão geral](https://portal.stf.jus.br/jurisprudenciarepercussao/tema.asp?num=1046) — Tese de adequação setorial negociada
- [CLT](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) — arts. 611-A e 611-B

### IBS e CBS na reforma da tributação do consumo (`imposto-bens-servicos-cbs-ibs`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Modelo dual e cronograma de transição em 2026, sem conferir toda a LC 214/2025 artigo a artigo.

**Resultado:** Receita Federal confirma 2026 como ano de teste, com alíquotas de referência e regras condicionadas para recolhimento; LC 227/2026 consta da relação oficial.

**Limites e próximos passos:** Analisar efeitos por dispositivo, obrigações acessórias atuais e legislação infralegal posterior.

Fontes institucionais consultadas:
- [Receita Federal — legislação da reforma](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria-do-consumo/legislacao/) — LC 214/2025 e LC 227/2026
- [Receita Federal — fases de transição](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria-do-consumo/entenda/) — 2026 como fase de testes

### Imposto Seletivo e finalidade extrafiscal (`imposto-seletivo-reforma`)

**Status:** Parcial; aviso mantido · **Conferência:** 2026-11-24.

**Escopo:** Previsão constitucional do Imposto Seletivo e marco de transição.

**Resultado:** Fonte da Receita Federal indica instituição do Imposto Seletivo no cronograma de 2027.

**Limites e próximos passos:** Revisar todas as hipóteses de incidência, exceções, alíquotas e datas de produção de efeitos antes de concluir.

Fontes institucionais consultadas:
- [Receita Federal — cronograma da reforma](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria-do-consumo/entenda/) — Transição 2027 e 2028
- [Receita Federal — legislação](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria-do-consumo/legislacao/) — LC 214/2025 e alterações

## Fila dos 63 temas não examinados juridicamente neste ciclo

A ausência de evento histórico significa **não verificado neste ciclo**, mesmo que a fonte tenha sido consultada em outra rotina de verificação de links. A lista é ordenada por área e título.

| Área | Tema | Estado |
|---|---|---|
| administrativo | `regime-juridico-bens-publicos` — Bens públicos e suas espécies | Pendente |
| administrativo | `concessao-permissao` — Concessão e permissão | Pendente |
| administrativo | `controle-externo-tribunais-contas` — Controle externo e tribunais de contas | Pendente |
| administrativo | `desapropriacao-utilidade-publica` — Desapropriação por utilidade pública | Pendente |
| ambiental | `competencia-ambiental-lc140` — Competências ambientais entre União, estados e municípios | Pendente |
| ambiental | `pagamento-servicos-ambientais` — Pagamento por serviços ambientais | Pendente |
| ambiental | `principios-prevencao-precaucao-ambiental` — Prevenção e precaução no Direito Ambiental | Pendente |
| ambiental | `responsabilidade-penal-pessoa-juridica-ambiental` — Responsabilidade penal da pessoa jurídica por crime ambiental | Pendente |
| civil | `eviccao-contratos` — Evicção nos contratos onerosos | Pendente |
| civil | `guarda-compartilhada-convivencia` — Guarda compartilhada e convivência familiar | Pendente |
| civil | `regimes-bens-casamento` — Regimes de bens no casamento | Pendente |
| civil | `uniao-estavel-efeitos-patrimoniais` — União estável e efeitos patrimoniais | Pendente |
| constitucional | `comissao-parlamentar-inquerito` — Comissões parlamentares de inquérito | Pendente |
| constitucional | `direito-fundamental-educacao` — Direito à educação e dever do Estado | Pendente |
| constitucional | `iniciativa-popular-projeto-lei` — Iniciativa popular de projetos de lei | Pendente |
| constitucional | `intervencao-federal` — Intervenção federal nos estados | Pendente |
| consumidor | `cobranca-indebita-consumo` — Cobrança indevida e repetição do indébito | Pendente |
| consumidor | `contratos-adesao-consumo` — Contratos de adesão no consumo | Pendente |
| consumidor | `praticas-abusivas-art39` — Práticas abusivas nas relações de consumo | Pendente |
| consumidor | `recall-produtos-seguranca` — Recall e dever de segurança do fornecedor | Pendente |
| economico | `restricoes-verticais-distribuicao` — Acordos verticais e distribuição exclusiva | Pendente |
| economico | `precos-predatorios-concorrencia` — Preços predatórios e abuso de posição dominante | Pendente |
| economico | `proposta-remedios-antitruste` — Remédios antitruste no controle de fusões | Pendente |
| economico | `troca-informacoes-sensiveis-concorrentes` — Troca de informações sensíveis entre concorrentes | Pendente |
| eleitoral | `doacoes-financiamento-campanha` — Doações e financiamento das campanhas | Pendente |
| empresarial | `direitos-acionistas-sociedade-anonima` — Direitos essenciais dos acionistas | Pendente |
| empresarial | `duplicata-mercantil` — Duplicata mercantil e sua circulação | Pendente |
| empresarial | `nome-empresarial-protecao` — Nome empresarial e sua proteção | Pendente |
| empresarial | `recuperacao-extrajudicial-empresa` — Recuperação extrajudicial de empresas | Pendente |
| financeiro | `divida-publica-operacoes-credito` — Dívida pública e operações de crédito | Pendente |
| financeiro | `limites-despesa-pessoal-lrf` — Limites de despesa com pessoal na LRF | Pendente |
| financeiro | `receita-corrente-liquida` — Receita corrente líquida como indicador fiscal | Pendente |
| financeiro | `regra-ouro-orcamento` — Regra de ouro das finanças públicas | Pendente |
| internacional | `cooperacao-juridica-internacional-cpc` — Cooperação jurídica internacional no processo civil | Pendente |
| internacional | `extradicao-lei-migracao` — Extradição no Direito brasileiro | Pendente |
| internacional | `imunidades-diplomaticas` — Imunidades diplomáticas e limites | Pendente |
| internacional | `solucao-pacifica-controversias` — Solução pacífica de controvérsias internacionais | Pendente |
| penal-i | `crime-preterdoloso` — Crime preterdoloso e agravação pelo resultado | Pendente |
| penal-i | `legitima-defesa-putativa` — Legítima defesa putativa e erro sobre situação justificante | Pendente |
| previdenciario | `auxilio-acidente-sequela` — Auxílio-acidente e sequelas consolidadas | Pendente |
| previdenciario | `recurso-administrativo-inss` — Recursos administrativos contra decisões do INSS | Pendente |
| previdenciario | `segurado-especial-rural` — Segurado especial rural | Pendente |
| processo-civil | `acao-monitoria` — Ação monitória | Pendente |
| processo-civil | `execucao-alimentos-prisao-civil` — Cumprimento de sentença de alimentos e prisão civil | Pendente |
| processo-civil | `irdr-demandas-repetitivas` — Incidente de Resolução de Demandas Repetitivas (IRDR) | Pendente |
| processo-civil | `producao-antecipada-prova-cpc` — Produção antecipada de prova | Pendente |
| processo-penal | `assistente-acusacao` — Assistente de acusação no processo penal | Pendente |
| processo-penal | `colaboracao-premiada` — Colaboração premiada e corroboração | Pendente |
| processo-penal | `interceptacao-telefonica-prova` — Interceptação telefônica e reserva de jurisdição | Pendente |
| processo-penal | `tribunal-juri-quesitacao` — Quesitação no Tribunal do Júri | Pendente |
| propriedade-intelectual | `coautoria-obras-intelectuais` — Coautoria de obras intelectuais | Pendente |
| propriedade-intelectual | `dominio-publico-direitos-autorais` — Domínio público e fim da proteção patrimonial | Pendente |
| propriedade-intelectual | `licenciamento-programas-computador` — Licenciamento de programas de computador | Pendente |
| propriedade-intelectual | `nulidade-registro-marca` — Nulidade de registro de marca | Pendente |
| trabalho | `trabalho-intermitente-clt` — Contrato de trabalho intermitente | Pendente |
| trabalho | `equiparacao-salarial-clt` — Equiparação salarial e trabalho de igual valor | Pendente |
| trabalho | `estabilidade-gestante-emprego` — Proteção da gestante contra dispensa arbitrária | Pendente |
| tributario | `contribuicao-melhoria-tributo` — Contribuição de melhoria | Pendente |
| tributario | `responsabilidade-tributaria-administradores` — Responsabilidade tributária de administradores | Pendente |
| urbanistico | `consorcio-imobiliario-estatuto-cidade` — Consórcio imobiliário como instrumento urbanístico | Pendente |
| urbanistico | `transferencia-direito-construir` — Transferência do direito de construir | Pendente |
| urbanistico | `usucapiao-especial-urbana` — Usucapião especial urbana individual | Pendente |
| urbanistico | `zeis-zonas-especiais-interesse-social` — Zonas Especiais de Interesse Social (ZEIS) | Pendente |

## Atenção a mudanças recentes

**Fraude à cota de gênero:** em 5/11/2026, o TSE divulgou decisão de proteção a mulheres eleitas legitimamente que não participaram do ilícito, enquanto a redação publicada da Súmula 73 e a Resolução 23.735/2024 ainda apresentam regras anteriores de consequências. A existência de fontes com formulações diferentes impede encerrar essa revisão apenas com notícia: conferir o acórdão, a atualização formal dos dispositivos e sua aplicabilidade a cada eleição.

**Proteção de dados:** a adequação da União Europeia reconhecida pela ANPD em 2026, os mecanismos da Resolução 19/2024 e as orientações do RIPD já estão incorporados no escopo das três revisões concluídas. Novos atos futuros exigem novo evento de revisão.

**Reforma tributária:** a etapa de testes de 2026 não equivale ao regime integral; verificar o efeito temporal de cada dispositivo da LC 214/2025 e LC 227/2026 antes de marcar conteúdo como concluído.

**Trabalho e Previdenciário:** a tese vinculante do STF no Tema 1046 é relevante para negociação coletiva, mas sua aplicação a uma cláusula concreta demanda análise do direito afetado. A lei sobre salário-paternidade prevê vigência futura em 2027, e não se confunde com o salário-maternidade em 2026.

## Reprodução e critérios para avançar

```bash
python scripts/gerar_curadoria_novembro.py
node scripts/check-expansao-iii.mjs
node scripts/check-revisao-juridica.mjs
node scripts/auditar-catalogo.mjs --strict
```

Para concluir novo tema: comparar o texto da resposta com o dispositivo pertinente, regulamentação e decisões vinculantes ou consolidadas relevantes, revisar a resposta, anexar fontes institucionais específicas e registrar **novo evento**, sem apagar o histórico antigo. O status do tema só muda para concluído no escopo quando todos os elementos necessários à **síntese introdutória** estiverem verificados. Se ainda houver dúvida material, preservar a revisão parcial.

**Limitações:** a revisão de 11 temas neste ciclo não implica análise aprofundada de todos os 74 nem certifica todos os links ou livros; o teste automatizado valida integridade, rastreabilidade e ligação ao produto, não a verdade jurídica por si só.

---
**Situação editorial:** PR #20 em rascunho; nenhuma mudança desta rodada foi publicada na produção.
