# Trelia — Ciclo 1: qualidade bibliográfica (25 temas)

**Data do piloto:** 25/11/2026  
**Branch:** `curadoria/ciclo1-qualidade-bibliografica`  
**PR:** [#21 — piloto bibliográfico](https://github.com/jaoafb/trelia/pull/21) — rascunho, sem merge.

## Propósito

Verificar **o valor bibliográfico das recomendações**: um estudante deve localizar uma obra de edição identificada, entender por que foi indicada e encontrar o capítulo, seção ou página que a fonte editorial efetivamente comprova. A Trelia não presta um serviço de revisão jurídica contínua de normas; as fontes legais, quando exibidas, são complementares ao objetivo bibliográfico.

## Metodologia e limites

- Amostra intencional de **25 temas que representam as 19 áreas** do catálogo. **20** tinham indicação específica na auditoria anterior, e **5** estavam sem livro.
- Confronto das indicações com fichas oficiais do Grupo GEN, sumários oficiais do Juspodivm e referência anterior em fonte institucional. **19** indicações preexistentes receberam confirmação de seção ou página por edição; uma manteve a pendência de revalidação de acesso.
- O livro histórico de Denis Borges Barbosa, vinculado a `direitos-autorais-ideia-expressao`, apresenta **timeout** na reabertura do PDF institucional durante esta rodada. Isso não é prova de indisponibilidade definitiva nem autoriza corrigir a localização sem nova consulta. Mantivemos o vínculo histórico e registramos a pendência.
- A política editorial exige **ISBN, edição, pertinência específica e localização** na fonte. As três novas indicações apontam para capítulos **sem números de páginas inventados**.
- O conjunto de consultas de linguagem natural representa **25 casos de teste definidos editorialmente**, não uma medição de uso real por estudantes. Não se coletou navegação de usuários.
- Ter encontrado o título do capítulo no sumário **não significa ter examinado todas as páginas da obra**, nem atribuído automaticamente o papel de 'primeira leitura'. O texto da indicação explica sua utilidade e seus limites.

## Indicadores de cobertura na amostra

| Indicador | Antes | Após a PR #21 |
|---|---:|---:|
| Temas com ao menos uma indicação específica | 20/25 (80%) | 23/25 (92%) |
| Temas sem indicação de livro | 5/25 | 2/25 |
| Temas cobrindo as áreas do catálogo | 19/19 | 19/19 |
| Novos vínculos tema–obra | — | +3 |
| Obras novas no acervo | — | +2 (uma obra foi reutilizada) |
| Novas páginas atribuídas sem prova | — | 0 |
| Consultas editoriais de teste | — | 25 |

Para o catálogo inteiro, a projeção após a PR é **308 temas, 271 obras, 395 vínculos tema–obra e 86 temas sem indicação**. Esses números devem ser confrontados com a auditoria executada na CI; não são estatísticas observadas de produção.

## Novas recomendações

| Tema | Obra/edição | Onde começar | Fonte específica |
|---|---|---|---|
| Comissões parlamentares de inquérito | Gilmar Mendes e João Trindade Cavalcante Filho, *Manual Didático de Direito Constitucional*, 11ª ed., impresso, ISBN `9786551772153` | Capítulo 16 | [Editora SaraivaJur — Grupo GEN](https://www.grupogen.com.br/livro-manual-didatico-de-direito-constitucional-11-edicao-2026-gilmar-mendes-e-joao-trindade-cavalcante-filho-saraiva-jur-9786551772153) |
| Crime preterdoloso | Cleber Masson, *Direito Penal — Parte Geral*, vol. 1, 21ª ed., impresso, ISBN `9786528500222` | Capítulo 14 | [Editora Método — Grupo GEN](https://www.grupogen.com.br/livro-direito-penal-parte-geral-arts-1-a-120-vol-1-21-edicao-2026-cleber-masson-editora-metodo-9786528500222) |
| Assistente de acusação | Aury Lopes Junior, *Direito Processual Penal*, 23ª ed., impresso, ISBN `9786551771668` | Capítulo X | [SaraivaJur — Grupo GEN](https://www.grupogen.com.br/livro-direito-processual-penal-23-edicao-2026-aury-lopes-junior-saraiva-jur-9786551771668) |

**Atenção ao acesso:** a editora mostra o exemplar impresso de Aury Lopes Junior como temporariamente sem estoque na consulta. O cartão abre a ficha da obra, não promete estoque imediato.

## Conferência de todos os 25 temas

| Área | Tema | Situação no Ciclo 1 | Localização | Evidência |
|---|---|---|---|
| administrativo | `regime-juridico-bens-publicos` — Bens públicos e suas espécies | Recorte conferido no sumário da edição | Cap. 22, Bens Públicos | [Fonte](https://www.grupogen.com.br/livro-curso-de-direito-administrativo-14-edicao-2026-rafael-oliveira-editora-metodo-9788530999025) |
| administrativo | `desapropriacao-utilidade-publica` — Desapropriação por utilidade pública | Recorte conferido no sumário da edição | Cap. 21, Desapropriação | [Fonte](https://www.grupogen.com.br/livro-curso-de-direito-administrativo-14-edicao-2026-rafael-oliveira-editora-metodo-9788530999025) |
| ambiental | `app-reserva-legal` — Área de Preservação Permanente e Reserva Legal | Recorte conferido no sumário da edição | p. 268 (Cap. 6, item 3, Área de Preservação Permanente, e item 4, Área de Reserva Legal) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5204-Sumario.pdf) |
| civil | `eviccao-contratos` — Evicção nos contratos onerosos | Recorte conferido no sumário da edição | Cap. XIX, Evicção | [Fonte](https://www.grupogen.com.br/livro-manual-de-direito-civil-10-edicao-2026-pablo-stolze-gagliano-rodolfo-pamplona-filho-saraiva-jur-9786551771255) |
| civil | `guarda-compartilhada-convivencia` — Guarda compartilhada e convivência familiar | Recorte conferido no sumário da edição | Cap. LXXXII, Poder Familiar e Guarda de Filhos | [Fonte](https://www.grupogen.com.br/livro-manual-de-direito-civil-10-edicao-2026-pablo-stolze-gagliano-rodolfo-pamplona-filho-saraiva-jur-9786551771255) |
| consumidor | `praticas-abusivas-art39` — Práticas abusivas nas relações de consumo | Recorte conferido no sumário da edição | Parte 1, cap. 7, O abuso de direito consumerista e as práticas abusivas | [Fonte](https://www.grupogen.com.br/livro-manual-de-direito-do-consumidor-vol-unico-15-edicao-2026-flavio-tartuce-daniel-neves-editora-metodo-9788530999087) |
| consumidor | `contratos-adesao-consumo` — Contratos de adesão no consumo | Recorte conferido no sumário da edição | Parte 1, cap. 5, Proteção contratual pelo CDC | [Fonte](https://www.grupogen.com.br/livro-manual-de-direito-do-consumidor-vol-unico-15-edicao-2026-flavio-tartuce-daniel-neves-editora-metodo-9788530999087) |
| digital | `transferencia-internacional-dados-lgpd` — Transferência internacional de dados pessoais | Recorte conferido no sumário da edição | Capítulo V — Da Transferência Internacional de Dados | [Fonte](https://www.grupogen.com.br/e-book-lei-geral-de-protecao-de-dados-pessoais-comentada-1-edicao-2026-laura-schertel-mendes-isabela-maria-rosal-e-elora-fernandes-editora-forense-9788530997809) |
| eleitoral | `cotas-genero-candidaturas` — Cotas de gênero e candidaturas proporcionais | Recorte conferido no sumário da edição | p. 439 (Cap. 20, item 2, Número de vagas e reserva por gênero) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5443-Sumario.pdf) |
| empresarial | `desconsideracao-personalidade-juridica` — Desconsideração da personalidade jurídica | Recorte conferido no sumário da edição | Cap. 15, Desconsideração da personalidade jurídica | [Fonte](https://www.grupogen.com.br/livro-manual-de-direito-empresarial-20-edicao-2026-gladston-mamede-e-roberta-cotta-mamede-editora-atlas-9786559778126) |
| empresarial | `decretacao-falencia` — Hipóteses de decretação da falência | Recorte conferido no sumário da edição | Cap. 18, Decretação judicial da falência | [Fonte](https://www.grupogen.com.br/livro-curso-de-direito-comercial-falencia-e-recuperacao-de-empresa-16-edicao-2026-sergio-campinho-saraiva-jur-9786584004641) |
| financeiro | `receita-corrente-liquida` — Receita corrente líquida como indicador fiscal | Recorte conferido no sumário da edição | p. 343 (Receita Corrente Líquida — seção 7.1) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5103-Sumario.pdf) |
| financeiro | `limites-despesa-pessoal-lrf` — Limites de despesa com pessoal na LRF | Recorte conferido no sumário da edição | p. 567 (Despesas com pessoal — seção 11.6) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5103-Sumario.pdf) |
| internacional | `interpretacao-tratados` — Interpretação de tratados | Recorte conferido no sumário da edição | p. 122 (Interpretação dos tratados) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS5111-Sumario.pdf) |
| previdenciario | `segurado-especial-rural` — Segurado especial rural | Recorte conferido no sumário da edição | p. 213 (Cap. 4, item 4.3.5, Segurado especial) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JUS4950-Sumario.pdf) |
| processo-civil | `acao-monitoria` — Ação monitória | Recorte conferido no sumário da edição | Cap. 39, Ação Monitória | [Fonte](https://www.grupogen.com.br/livro-pratica-no-processo-civil-28-edicao-2026-gediel-claudino-de-araujo-junior-editora-atlas-9786559778065) |
| processo-civil | `producao-antecipada-prova-cpc` — Produção antecipada de prova | Recorte conferido no sumário da edição | Cap. 45, Ação de Produção Antecipada de Prova | [Fonte](https://www.grupogen.com.br/livro-pratica-no-processo-civil-28-edicao-2026-gediel-claudino-de-araujo-junior-editora-atlas-9786559778065) |
| propriedade-intelectual | `direitos-autorais-ideia-expressao` — Ideias e obras protegidas por direitos autorais | Acesso à fonte precisa de rechecagem | p. 305 (Criações abstratas — Então, como se protegem as ideias abstratas?) | [Fonte](https://www2.ifam.edu.br/diretorias-sistemicas/institucional/uma-introducao-a-propriedade-intelectual.pdf) |
| tributario | `contribuicao-melhoria-tributo` — Contribuição de melhoria | Recorte conferido no sumário da edição | Cap. 17, Contribuição de Melhoria | [Fonte](https://www.grupogen.com.br/livro-manual-de-direito-tributario-18-edicao-2026-eduardo-sabbag-saraiva-jur-9786551771842) |
| urbanistico | `outorga-onerosa-direito-construir` — Outorga onerosa do direito de construir | Recorte conferido no sumário da edição | p. 234 (O Estatuto da Cidade e a outorga onerosa do direito de construir) | [Fonte](https://juspodivmdigital.com.br/cdn/pdf/JMA0080-Sumario.pdf) |
| constitucional | `comissao-parlamentar-inquerito` — Comissões parlamentares de inquérito | Capítulo novo confirmado | Capítulo 16 — Comissões Parlamentares de Inquérito | [Fonte](https://www.grupogen.com.br/livro-manual-didatico-de-direito-constitucional-11-edicao-2026-gilmar-mendes-e-joao-trindade-cavalcante-filho-saraiva-jur-9786551772153) |
| economico | `restricoes-verticais-distribuicao` — Acordos verticais e distribuição exclusiva | Sem indicação bibliográfica confirmada | — | A conferir |
| penal-i | `crime-preterdoloso` — Crime preterdoloso e agravação pelo resultado | Capítulo novo confirmado | Capítulo 14 — Crime preterdoloso | [Fonte](https://www.grupogen.com.br/livro-direito-penal-parte-geral-arts-1-a-120-vol-1-21-edicao-2026-cleber-masson-editora-metodo-9786528500222) |
| processo-penal | `assistente-acusacao` — Assistente de acusação no processo penal | Capítulo novo confirmado | Capítulo X — Sujeitos e partes do processo; do assistente da acusação | [Fonte](https://www.grupogen.com.br/livro-direito-processual-penal-23-edicao-2026-aury-lopes-junior-saraiva-jur-9786551771668) |
| trabalho | `estabilidade-gestante-emprego` — Proteção da gestante contra dispensa arbitrária | Sem indicação bibliográfica confirmada | — | A conferir |

## O que ainda precisa ser resolvido

- **Restrições verticais e distribuição exclusiva:** ainda não encontramos uma edição com seção específica suficiente para aprovar uma recomendação. Textos de revista e artigos sobre o tema podem ajudar a pesquisar, mas não substituem o registro de edição do livro.
- **Estabilidade da gestante no emprego:** não foi encontrada nesta rodada uma combinação de edição, ISBN e capítulo com evidência editorial suficientemente precisa; a lacuna permanece.
- **Direitos autorais: proteção de ideias e expressão:** reabrir o PDF institucional da obra histórica de Barbosa e revisar a disponibilidade atual, sem apagar a localização anteriormente documentada apenas por timeout.
- **Amostragem não equivale ao catálogo todo:** ficam de fora as demais indicações e lacunas; ampliar somente após verificar pertinência e benefício real ao estudante.

## Critérios de aceite e execução

Os testes do ciclo exigem a existência dos 25 temas, os 19 setores, uma indicação e edição corretas onde aprovadas, a localização exata segundo a evidência, três novos vínculos sem página atribuída, o reaproveitamento da edição de Mendes/Cavalcante sem duplicação e **25 consultas** que encontram sua ficha correta.

```bash
python scripts/gerar_curadoria_novembro.py
node scripts/check-ciclo1-bibliografia.mjs
node scripts/auditar-catalogo.mjs --strict
```

**Próximo passo proposto:** depois de revisar esta PR, fazer outro lote pequeno concentrado em temas sem livro e testar a facilidade de achar o botão 'Onde começar' no percurso de busca, sem criar interfaces que desviem do livro.
