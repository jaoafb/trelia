# Contribuindo com a Trelia

A Trelia ajuda estudantes a localizar leituras **verificáveis**, não apenas a reunir nomes de livros. Contribuições devem preservar essa distinção.

## Antes de propor uma alteração

1. Leia [AGENTS.md](AGENTS.md), [FLUXO.md](FLUXO.md) e a [política de curadoria](docs/CURADORIA_PARA_INICIANTES.md).
2. Confira se existe uma issue ou PR sobre a mesma necessidade.
3. Descreva a dificuldade do estudante, o resultado esperado e como verificá-lo.
4. Use uma branch e abra um pull request; não publique diretamente na `main`.

## Correções e novas leituras

Inclua, sempre que aplicável: tema e área; obra e autoria; edição, ano, formato e ISBN; capítulo/seção/página **da edição específica**; link da evidência (sumário da editora, catálogo confiável, texto oficial ou artigo); data da conferência; tipo de acesso e pendências.

Não invente dados bibliográficos, não assuma que uma prévia equivale ao livro integral e não reproduza textos protegidos de terceiros. Para artigos, confira autores, periódico, DOI e acesso real. Para temas jurídicos, revise a vigência das normas e sinalize interpretações que exigem atualização.

## Código, interface e dados

- Reaproveite IDs, módulos e rotas; preserve os links já compartilhados.
- Mantenha acessibilidade, navegação por teclado e experiência em celular.
- **Minhas leituras** funciona localmente. Não introduza contas, sincronização ou coleta de dados sem uma decisão explícita de produto.
- Edite fontes editoriais e regenere módulos derivados; não altere manualmente arquivos gerados.
- Não envie segredos, tokens, credenciais, arquivos `.env` ou dados pessoais.

## Verificação

```bash
node --check dist/app.mjs
node --check dist/data.mjs
node scripts/smoke.mjs
node scripts/check-curadoria-ampliada.mjs
node scripts/check-leituras-gratuitas.mjs
node scripts/check-curadoria-novembro.mjs
node scripts/check-expansao-iii.mjs
git diff --check
```

Registre na PR o que passou, o que foi inspecionado manualmente e o que ainda está pendente. Veja o [modelo de pull request](.github/PULL_REQUEST_TEMPLATE.md).

## Direitos

O **código-fonte original** da Trelia é disponibilizado sob a [licença MIT](LICENSE.md). O [escopo de licenciamento](LICENSING.md) exclui textos e dados editoriais, imagens, marca e conteúdos de terceiros dessa autorização. Envie somente materiais de sua autoria ou para os quais tenha direitos e permissões suficientes. Ao propor código para incorporação, confirme na PR que ele pode ser distribuído sob MIT; propostas de novos textos e dados editoriais dependem de autorização própria. O envio de uma contribuição não transfere automaticamente seus direitos autorais.
