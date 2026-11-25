# Trelia — Ciclo 2: redução das lacunas bibliográficas

**Data-base:** 25/11/2026  
**Branch:** `curadoria/ciclo2-lacunas-bibliograficas` · PR em rascunho  
**Objetivo:** levar estudantes ao livro certo e à localização comprovada na **edição**, sem criar novas funcionalidades e sem substituir bibliografia por guia jurídico.

## Resumo dos resultados

| Indicador | Antes (main, Ciclo 1) | Após Ciclo 2, se integrado |
|---|---:|---:|
| Temas totais | 308 | 308 |
| Temas com ao menos um livro | 222 | 239 |
| Temas sem livro | 86 | 69 |
| Obras | 271 | 273 |
| Vínculos tema–obra | 395 | 412 |
| Temas da amostra com recomendação | 0/25 | 17/25 |
| Temas da amostra ainda sem recomendação | 25/25 | 8/25 |

Esses indicadores de após o Ciclo 2 são metas condicionadas à integração e à confirmação pelo teste automatizado, não uma declaração de publicação em produção.

## Método e critérios

- Partimos da fila de 86 temas sem livro após o Ciclo 1, excluindo os três já atendidos naquele ciclo.
- Selecionamos 25 temas de cinco áreas: Empresarial (6), Trabalho (7), Econômico (6), Constitucional (4) e Ambiental (2).
- Consultamos **cinco fichas editoriais de 2026** e seus sumários oficiais correspondentes. Dois registros de livro são novos; os demais reaproveitam três edições já existentes no catálogo.
- A localização é a **página impressa inicial da seção** indicada no sumário. O número de página do PDF de sumário é diferente; nenhuma página de edição foi presumida.
- A aprovação exige recorte **específico** do assunto. Tópicos genéricos como 'exclusividade' não bastam para certificar temas restritos a plataformas digitais.
- Foi mantido o texto 'Por que ler?' já existente na experiência da Trelia, com justificativas adaptadas ao assunto. Não atribuímos automaticamente papel de leitura introdutória nem presumimos o conteúdo integral da obra.

## Resultado por área

| Área | Temas selecionados | Aprovados | Pendentes |
|---|---:|---:|---:|
| ambiental | 2 | 2 | 0 |
| constitucional | 4 | 4 | 0 |
| economico | 6 | 1 | 5 |
| empresarial | 6 | 5 | 1 |
| trabalho | 7 | 5 | 2 |

## Tabela de decisões por tema

| Área | Tema | Decisão | Livro/edição e localização |
|---|---|---|---|
| empresarial | `direitos-acionistas-sociedade-anonima` — Direitos essenciais dos acionistas | Pendente | O sumário encontrado indica 'o acionista' (p. 217), mas não comprova seção especificamente dedicada aos direitos essenciais dos acionistas; não presumir equivalência. |
| empresarial | `duplicata-mercantil` — Duplicata mercantil e sua circulação | **Aprovado** | `bensoussan-boiteux-empresarial-2026`, ISBN `9788544276334`; p. **357**; Capítulo 3, V — Duplicata |
| empresarial | `estabelecimento-empresarial` — Estabelecimento empresarial | **Aprovado** | `bensoussan-boiteux-empresarial-2026`, ISBN `9788544276334`; p. **98**; Capítulo 1, VII — Estabelecimento e seu regime jurídico |
| empresarial | `nome-empresarial-protecao` — Nome empresarial e sua proteção | **Aprovado** | `bensoussan-boiteux-empresarial-2026`, ISBN `9788544276334`; p. **85**; Capítulo 1, VI — Nome empresarial |
| empresarial | `recuperacao-extrajudicial-empresa` — Recuperação extrajudicial de empresas | **Aprovado** | `bensoussan-boiteux-empresarial-2026`, ISBN `9788544276334`; p. **816**; Capítulo sobre falência e recuperação, V — Recuperação extrajudicial |
| empresarial | `titulos-credito-requisitos` — Títulos de crédito e seus requisitos | **Aprovado** | `bensoussan-boiteux-empresarial-2026`, ISBN `9788544276334`; p. **323**; Capítulo 3, I — Conceito e princípios dos títulos de crédito |
| trabalho | `trabalho-intermitente-clt` — Contrato de trabalho intermitente | **Aprovado** | `renzetti`, ISBN `9788544273753`; p. **104**; Capítulo 2, item 2.6.7 — Contrato intermitente |
| trabalho | `equiparacao-salarial-clt` — Equiparação salarial e trabalho de igual valor | **Aprovado** | `renzetti`, ISBN `9788544273753`; p. **183**; Capítulo 5, item 5.4 — Equiparação salarial |
| trabalho | `negociacao-coletiva-limites` — Negociação coletiva e limites legais | Pendente | A seção sobre validade e formalidades de acordo coletivo (p. 352) não demonstra cobertura precisa dos limites materiais legais à negociação; a hipótese permanece candidata. |
| trabalho | `estabilidade-gestante-emprego` — Proteção da gestante contra dispensa arbitrária | **Aprovado** | `renzetti`, ISBN `9788544273753`; p. **280**; Capítulo 8, item 8.3.3.3 — Gestante |
| trabalho | `teletrabalho-clt` — Teletrabalho e trabalho remoto | **Aprovado** | `renzetti`, ISBN `9788544273753`; p. **69**; Capítulo 2, item 2.3.1.3 — Trabalho em domicílio e teletrabalho |
| trabalho | `proposta-negociacao-coletiva` — Acordo e convenção coletiva de trabalho | **Aprovado** | `renzetti`, ISBN `9788544273753`; p. **348**; Capítulo 11, item 11.3 — Convenção e acordo coletivo de trabalho |
| trabalho | `discriminacao-acesso-trabalho` — Discriminação no acesso e manutenção do trabalho | Pendente | Ainda sem trecho de edição identificado com recorte de discriminação no ingresso e manutenção da relação de trabalho. |
| economico | `restricoes-verticais-distribuicao` — Acordos verticais e distribuição exclusiva | **Aprovado** | `bensoussan-gouvea-luz`, ISBN `9788544271858`; p. **798**; Capítulo 12, item 2.4 — Acordos verticais |
| economico | `exclusividade-plataformas-digitais` — Cláusulas de exclusividade em plataformas digitais | Pendente | A seção 'Exclusividade' (p. 817) aborda a prática concorrencial em geral, não comprova capítulo sobre cláusulas de exclusividade de plataformas digitais. |
| economico | `precos-predatorios-concorrencia` — Preços predatórios e abuso de posição dominante | Pendente | O sumário usa 'Práticas predatórias' (p. 806), sem confirmar especificamente preços predatórios e abuso de posição dominante. |
| economico | `compliance-concorrencial` — Programas de compliance concorrencial | Pendente | A obra trata de direito antitruste, mas o sumário não demonstra seção sobre programas de compliance concorrencial. |
| economico | `proposta-remedios-antitruste` — Remédios antitruste no controle de fusões | Pendente | O sumário lista aprovação condicionada de concentrações (p. 780), porém não descreve remédios antitruste com precisão suficiente para o tema. |
| economico | `troca-informacoes-sensiveis-concorrentes` — Troca de informações sensíveis entre concorrentes | Pendente | A seção de acordos entre empresas não comprova discussão específica sobre intercâmbio de informações sensíveis entre concorrentes. |
| constitucional | `direito-reuniao-manifestacao` — Direito de reunião e manifestação | **Aprovado** | `nathalia-masson-constitucional-2026`, ISBN `9788544269848`; p. **226**; Capítulo 5, item 5.7 — Liberdade de reunião |
| constitucional | `estado-defesa-estado-sitio` — Estado de defesa e estado de sítio | **Aprovado** | `nathalia-masson-constitucional-2026`, ISBN `9788544269848`; p. **1079**; Capítulo 19, itens 3 e 4 — Estado de Defesa e Estado de Sítio |
| constitucional | `iniciativa-popular-projeto-lei` — Iniciativa popular de projetos de lei | **Aprovado** | `nathalia-masson-constitucional-2026`, ISBN `9788544269848`; p. **343**; Capítulo sobre Direitos Políticos, item 4.1.4 — Iniciativa popular de leis |
| constitucional | `intervencao-federal` — Intervenção federal nos estados | **Aprovado** | `nathalia-masson-constitucional-2026`, ISBN `9788544269848`; p. **545**; Capítulo 11, item 4.1 — Intervenção federal |
| ambiental | `principios-prevencao-precaucao-ambiental` — Prevenção e precaução no Direito Ambiental | **Aprovado** | `thome-manual-ambiental-2026`, ISBN `9788544275641`; p. **63**; Capítulo 2, item 4 — Princípios da prevenção e da precaução |
| ambiental | `responsabilidade-penal-pessoa-juridica-ambiental` — Responsabilidade penal da pessoa jurídica por crime ambiental | **Aprovado** | `thome-manual-ambiental-2026`, ISBN `9788544275641`; p. **627**; Capítulo 12, item 2 — Responsabilidade penal ambiental |

## Obras e fontes verificadas

| Obra | ISBN da edição impressa de 2026 | Fonte editorial | Sumário oficial |
|---|---|---|---|
| `bensoussan-boiteux-empresarial-2026` | `9788544276334` | [Ficha da editora](https://www.editorajuspodivm.com.br/manual-de-direito-empresarial-2026-bensoussan-boiteux) | [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5143-Sumario.pdf) |
| `renzetti` | `9788544273753` | [Ficha da editora](https://www.editorajuspodivm.com.br/livro-aula-direito-do-trabalho-2026-rogerio-renzetti) | [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5381-Sumario.pdf) |
| `bensoussan-gouvea-luz` | `9788544271858` | [Ficha da editora](https://www.editorajuspodivm.com.br/manual-de-direito-economico-2026-bensoussan-gouvea-luz) | [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5561-Sumario.pdf) |
| `nathalia-masson-constitucional-2026` | `9788544269848` | [Ficha da editora](https://www.editorajuspodivm.com.br/manual-de-direito-constitucional-2026-curso-de-atualizacao-masson) | [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5006-Sumario.pdf) |
| `thome-manual-ambiental-2026` | `9788544275641` | [Ficha da editora](https://www.editorajuspodivm.com.br/manual-de-direito-ambiental-2026-thome) | [Sumário](https://juspodivmdigital.com.br/cdn/pdf/JUS5204-Sumario.pdf) |

**Correção bibliográfica:** o registro já existente da edição de Renato Saraiva e Rogério Renzetti estava identificado apenas com Renzetti. A autoria foi ajustada para os dois autores, conforme a ficha editorial e o cabeçalho do sumário.

## Pendências preservadas

- **`direitos-acionistas-sociedade-anonima`:** O sumário encontrado indica 'o acionista' (p. 217), mas não comprova seção especificamente dedicada aos direitos essenciais dos acionistas; não presumir equivalência.
- **`negociacao-coletiva-limites`:** A seção sobre validade e formalidades de acordo coletivo (p. 352) não demonstra cobertura precisa dos limites materiais legais à negociação; a hipótese permanece candidata.
- **`discriminacao-acesso-trabalho`:** Ainda sem trecho de edição identificado com recorte de discriminação no ingresso e manutenção da relação de trabalho.
- **`exclusividade-plataformas-digitais`:** A seção 'Exclusividade' (p. 817) aborda a prática concorrencial em geral, não comprova capítulo sobre cláusulas de exclusividade de plataformas digitais.
- **`precos-predatorios-concorrencia`:** O sumário usa 'Práticas predatórias' (p. 806), sem confirmar especificamente preços predatórios e abuso de posição dominante.
- **`compliance-concorrencial`:** A obra trata de direito antitruste, mas o sumário não demonstra seção sobre programas de compliance concorrencial.
- **`proposta-remedios-antitruste`:** O sumário lista aprovação condicionada de concentrações (p. 780), porém não descreve remédios antitruste com precisão suficiente para o tema.
- **`troca-informacoes-sensiveis-concorrentes`:** A seção de acordos entre empresas não comprova discussão específica sobre intercâmbio de informações sensíveis entre concorrentes.

## Testes e reprodução

```sh
python scripts/gerar_curadoria_novembro.py
node scripts/check-ciclo1-bibliografia.mjs
node scripts/check-ciclo2-bibliografia.mjs
node scripts/auditar-catalogo.mjs --strict
```

O teste do Ciclo 2 verifica a integridade do arquivo gerado, contagem de 25 temas, 17 recomendações e 8 pendências, busca por título, ISBN/edição, vínculos tema–obra e links de sumários, evitando duplicações dos livros reaproveitados. Os testes do Ciclo 1 foram ajustados para aceitar a ampliação acumulada sem relaxar a checagem dos temas daquele ciclo.

**Limitação:** sumários comprovam o assunto anunciado e a localização. Eles não certificam a qualidade de toda a argumentação doutrinária, a aplicação jurídica do capítulo em cada caso, o estoque de lojas ou a adequação pedagógica em todos os perfis. O aprofundamento editorial deve ocorrer por consulta das obras e bibliografias universitárias quando disponíveis.
