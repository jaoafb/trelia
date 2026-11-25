# Lote piloto do catálogo jurídico

O [modelo de capas](capas/modelo-capa-trelia.html) e o [manifesto da pesquisa](capas/capas-catalogo.json) registram a origem do design e as imagens candidatas. O site compõe a capa em `dist/ui/capa.mjs` e `dist/ui/capa.css`, a partir da obra. O manifesto fica fora do site publicado.

Este lote testa a expansão para Constitucional, Civil, Processo Civil, Administrativo, Trabalho e Tributário. Os registros vieram da Rede Virtual de Bibliotecas do Senado, com enriquecimento por ISBN da BrasilAPI quando havia um identificador inequívoco. O recorte é uma amostra bibliográfica sobre as áreas, com obras recentes, antigas e especializadas. A seleção para graduação ainda depende da verificação da edição e da finalidade de cada obra.

## Arquivos

- [lote-piloto.json](piloto-rvbi/lote-piloto.json) guarda a procedência de cada candidato, os critérios da classificação sugerida, os links do registro e o resultado das consultas à BrasilAPI.
- [lote-piloto.csv](piloto-rvbi/lote-piloto.csv) é a fila de revisão. A triagem inicial usa o título, os assuntos e a data do registro. Preencha os campos de acesso e fonte de verificação ao conferir o material.

O JSON preserva o estado produzido pelo importador. As decisões editoriais ficam no CSV. Ambos estão fora de `dist/`, a pasta servida pelo site.

Para gerar as fichas bibliográficas pesquisáveis do piloto, execute `python scripts/gerar_fichas_rvbi.py` na raiz. O gerador organiza os registros por área, publica o link MARC de origem e preserva os ISBNs declarados. Registros com mais de um ISBN mantêm a lista da ficha até a confirmação do formato de cada um. A importação bibliográfica não cria recomendações temáticas.

Os textos de orientação e as recomendações complementares ficam em `dist/catalogo/editorial.mjs`. Uma recomendação liga tema e obra, guarda o motivo editorial e aponta para a evidência da cobertura. A localização, quando confirmada, fica na referência da edição correspondente. Os guias citam suas fontes separadamente.

## Gerar outro lote

Use Python 3 na raiz do repositório. O importador usa a biblioteca padrão.

```bash
python3 scripts/importar_catalogo.py \
  --pages 30 --per-area 10 --enrich \
  --out /tmp/caderno-novo-lote
```

O importador registra o total recebido e a seleção por área. O parâmetro `--pages` limita as páginas consultadas e o resultado pode ficar abaixo da meta por área. Use um novo destino para preservar o lote revisado. O parâmetro `--xml` aceita respostas OAI-PMH já baixadas para repetir a seleção sobre os mesmos registros. A BrasilAPI é consultada apenas com `--enrich`.

## Revisar uma ficha

Para selecionar leituras que ajudem o estudante a iniciar uma área, siga a [política de curadoria para iniciantes](../../docs/CURADORIA_PARA_INICIANTES.md).

1. Confira se a área sugerida é a principal para o uso na Trelia. Adicione áreas secundárias se houver uma relação pertinente.
2. Confira título, autoria, edição, ano e volume. Use o ISBN da edição e do formato adequados. Quando houver vários ISBNs no registro, confira cada formato pela ficha editorial antes de escolher um.
3. Abra os links e identifique o que o leitor pode acessar. Uma nota de conteúdo pode indicar capítulos. Um link associado ao registro pode levar a um sumário, a uma norma citada ou a outro recurso relacionado. Marque acesso aberto somente após conferir a disponibilidade do texto.
4. Informe a decisão editorial e cite a fonte que sustenta a indicação. Um livro antigo pode servir a uma pesquisa histórica. Para recomendá-lo como apoio à disciplina atual, confira a edição e as mudanças legislativas relevantes à indicação.

## Referências recentes para conferir em paralelo

São exemplos com ISBN e edição nas páginas das editoras. Podem orientar a curadoria inicial quando a RVBI trouxer edições antigas ou obras muito especializadas. A lista tem finalidade de comparação e permite conferir a pertinência com uma bibliografia da disciplina.

| Área | Obra |
|---|---|
| Constitucional | [Pedro Lenza, Direito Constitucional Esquematizado, 30ª ed., 2026](https://www.grupogen.com.br/livro-direito-constitucional-colecao-esquematizado-30-edicao-2026-pedro-lenza-saraiva-jur-9786551771866) |
| Civil | [Farias, Netto e Rosenvald, Manual de Direito Civil, 2026](https://www.editorajuspodivm.com.br/manual-de-direito-civil-volume-unico-2026-farias-netto-rosenvald) |
| Processo Civil | [Fredie Didier Jr., Curso de Direito Processual Civil, v. 1, 2026](https://www.editorajuspodivm.com.br/curso-de-direito-processual-civil-v1-2026-didier-jr) |
| Administrativo | [Maria Sylvia Zanella Di Pietro, Direito Administrativo, 39ª ed., 2026](https://www.grupogen.com.br/livro-direito-administrativo-39-edicao-2026-maria-sylvia-zanella-di-pietro-editora-forense-9788530998653) |
| Trabalho | [Rogério Renzetti, Livro Aula de Direito do Trabalho, 2026](https://www.editorajuspodivm.com.br/livro-aula-direito-do-trabalho-2026-rogerio-renzetti) |
| Tributário | [Mateus Pontalti, Manual de Direito Tributário, 2026](https://www.editorajuspodivm.com.br/manual-de-direito-tributario-2026-pontalti) |

Fontes técnicas

- [Senado Federal, intercâmbio de dados bibliográficos da RVBI](https://www12.senado.leg.br/institucional/biblioteca/rvbi/vocabulario-controlado-basico-e-classificacao-decimal-de-direito)
- [BrasilAPI, documentação](https://brasilapi.com.br/docs#tag/ISBN)

### Lote ampliado de curadoria

O arquivo `trelia-curadoria-ampliada-2026-11-20.json` consolida o lote editorial de 18 temas e sua expansão. O catálogo já publicado continua como base. Para regenerar os módulos estáticos por disciplina, rode `python scripts/gerar_curadoria_ampliada.py` na raiz. Para conferir consultas, ISBNs, ordem de leitura e evidência por edição, rode `node scripts/check-curadoria-ampliada.mjs`.

### Lote de leituras gratuitas

O arquivo `trelia-leituras-gratuitas-2026-11-20.json` guarda o lote original, incluindo as pendências editoriais. Rode `node scripts/gerar_leituras_gratuitas.mjs` para gerar os módulos estáticos e `node scripts/check-leituras-gratuitas.mjs` para verificar os vínculos, a reimportação, os tipos de acesso e as buscas. Os PDFs são ligados na origem.

### Lotes editoriais de 22 e 24 de novembro

Os JSONs originais e seus handoffs ficam nesta pasta. Rode `python scripts/gerar_curadoria_novembro.py` para atualizar os módulos estáticos. As pré-seleções bibliográficas do lote de 24/11 continuam nas fontes editoriais e não geram recomendações.

Rode `node scripts/check-curadoria-novembro.mjs` para verificar as buscas e as evidências específicas por edição.

Dos 70 temas propostos, 67 ganharam páginas. Os outros três foram incorporados às rotas existentes de dolo eventual, omissão imprópria e agentes de tratamento na LGPD. Os handoffs e os JSONs originais preservam os vínculos candidatos e as pendências.

Na conferência de links, o artigo sobre exclusividade em plataformas digitais e o PDF do guia de compliance do Cade retornaram HTTP 503. O artigo permanece no JSON editorial, fora da seção de pesquisas, e a fonte do guia aparece com aviso de indisponibilidade. O artigo sobre federações aponta para o endereço HTTPS da SciELO com o mesmo título. Parte dos links do Planalto e de editoras não respondeu à verificação automatizada e ainda precisa ser reaberta.

### Expansão Editorial III

A entrada é `trelia-expansao-editorial-iii-2026-11-24-revisado.json`, com o handoff revisado ao lado. Rode `python scripts/gerar_curadoria_novembro.py` e `node scripts/check-expansao-iii.mjs`.

- Tentativa e desistência voluntária compartilham a rota existente; concessão e permissão e remédios antitruste também reaproveitam suas rotas anteriores. Outorga onerosa e transferência do direito de construir têm fichas próprias.
- A edição de 2026 de Tartuce e Neves fica na ficha de consumidor existente. Os demais ISBNs já cadastrados foram reutilizados.
- Os endereços de resumos da SciELO foram substituídos por links de texto integral na apresentação. Nos três casos com destino na página do periódico, o botão descreve essa página. O endereço alternativo da SciELO para cotas de gênero conserva a mesma publicação.
- As explicações novas ficam identificadas como em revisão editorial. Permanecem por revisar a vigência e as âncoras restantes, os acessos das seis fichas editoriais que responderam 405 na checagem automatizada e as políticas de revisão por pares sem URL comprovada. Os JSONs originais preservam as pendências bibliográficas e de Qualis.


### Ciclo de consolidação bibliográfica I (24/11/2026)

O arquivo `trelia-consolidacao-bibliografica-01-2026-11-24.json` acrescenta **três indicações de leitura** para temas de Propriedade Intelectual, reutilizando uma obra e uma edição já existentes: *Uma introdução à propriedade intelectual*, 2ª edição digital, de Denis Borges Barbosa. A fonte integral foi consultada na instituição hospedeira, com referências às páginas impressas **305** (ideia versus expressão), **124** (direitos morais versus patrimoniais) e **121** (tratamento constitucional do software). A obra possui valor doutrinário/histórico; os temas continuam acompanhados de legislação atual para conferência.

Não confundir esta atualização pontual com revisão integral da obra ou da legislação. O tema `protecao-software-direito-autoral` recebe leitura **histórica de apoio**; a pendência de indicação especializada **atual** sobre registro de software no INPI permanece. O PDF está disponível na instituição de origem sob CC BY-NC-ND 2.0; o projeto não redistribui cópias nem modifica seu conteúdo. Os lotes históricos de 22 e 24/11 foram preservados intactos.

Para regenerar os módulos estáticos e verificar os dois vínculos: `python scripts/gerar_curadoria_novembro.py` e `node scripts/check-consolidacao-bibliografica-i.mjs`.


### Políticas editoriais dos periódicos (24/11/2026)

O arquivo `trelia-politicas-periodicos-2026-11-24.json` registra **14 páginas de políticas de periódicos**, provenientes dos próprios editores ou do SciELO. Elas abrangem os 19 artigos da Expansão Editorial III. O módulo `dist/catalogo/ampliado/novembro/politicas-periodicos.mjs` é gerado por `python scripts/gerar_curadoria_novembro.py`.

A interface mostra um link para a **política do periódico** nos detalhes de cada pesquisa, mas não afirma que o fluxo específico de cada artigo foi confirmado. Algumas políticas foram atualizadas depois do ano do artigo; o caso da Revista do IBRAC admite exceções para artigos convidados. Verifique o histórico individual antes de declarar arbitragem específica do texto. Execute `node scripts/check-politicas-periodicos.mjs` para conferir os 19 vínculos e a presença dos links no HTML renderizado.


### Relações editoriais de navegação (24/11/2026)

O arquivo `trelia-relacoes-editoriais-2026-11-24.json` registra **31 pares** de assuntos relacionados, selecionados por pertinência pedagógica. São vínculos para navegar e comparar institutos, **não** declarações de equivalência jurídica nem recomendações de livro. O gerador `python scripts/gerar_curadoria_novembro.py` publica `relacoes-editoriais.mjs`; o teste `node scripts/check-relacoes-editoriais.mjs` exige existência de todos os temas, ausência de duplicações e reciprocidade.


### Relatório integral de consolidação (24/11/2026)

A auditoria executada sobre as 19 áreas e os 308 temas, com indicadores por área, lacunas editoriais, normas para revalidação e fila nominal de 93 temas sem livro específico, está em [docs/CONSOLIDACAO_EDITORIAL_2026-11-24.md](../../docs/CONSOLIDACAO_EDITORIAL_2026-11-24.md). O retrato estruturado fica em `auditoria-snapshot-2026-11-24.json`. Reexecute `node scripts/auditar-catalogo.mjs --strict` após alterações; os dados do snapshot não se atualizam automaticamente.


### Expressões adicionais de busca (24/11/2026)

O arquivo `trelia-termos-busca-consolidacao-2026-11-24.json` registra **152 expressões de busca adicionais para os 76 temas da Expansão III**, contemplando as 19 áreas. São variantes linguísticas de descoberta, e não novas fichas ou afirmações jurídicas. O gerador produz `novembro/termos-busca.mjs`, a aplicação agrega os termos aos aliases existentes e `node scripts/check-termos-busca.mjs` verifica vínculos, buscas e colisões de expressões.


### Verificação externa suplementar de fontes e bibliografia (24/11/2026)

O arquivo `trelia-verificacao-complementar-2026-11-24.json` registra as **33 fontes oficiais** da Expansão III antes marcadas para reabrir, com status de acesso e distinção expressa entre **fonte localizada** e **revisão normativa substantiva pendente**. Para o tema `recuperacao-extrajudicial-empresa`, o endereço anterior da Lei nº 11.101/2005 não respondeu na consulta externa; a aplicação passa a usar o endereço oficial compilado acessível, sem sobrescrever o lote histórico.

O mesmo arquivo inclui **quatro indicações bibliográficas confirmadas**, de duas edições digitais novas e uma edição impressa já existente: *Manual de Direito Financeiro* (Harrison Leite, 15ª ed. 2026, pp. 343 e 567), *Lei Geral de Proteção de Dados Pessoais Comentada* (Mendes, Rosal e Fernandes, 1ª ed. 2026, cap. V) e *Relatório de Impacto à Proteção de Dados Pessoais* (Maria Cecília Oliveira Gomes, 1ª ed. 2027, seção 2.1). A edição 2027 foi anunciada e publicada no catálogo em 2026. Os livros ficam vinculados às suas fichas de editoras ou sumários, sem reproduzir o conteúdo protegido.

Também foram apontadas cinco normas de atenção especial à **produção de efeitos e vigência**, inclusive regras publicadas em 2026 com entrada em vigor futura. A revalidação de links não elimina o aviso de revisão dos 74 temas. Regenerar com `python scripts/gerar_curadoria_novembro.py` e testar com `node scripts/check-verificacao-complementar.mjs`.
