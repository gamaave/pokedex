# Pokedex by:Gamaave

Pokédex responsiva em português com 1.025 espécies, 18 tipos, busca por nome/número, filtros por geração e tipo, ordenação, favoritos locais e fichas com fraquezas, resistências, imunidades e atributos base.

## Recursos adicionais

A aba **Guia de tipos** mostra, para cada tipo, suas vantagens no ataque (2×), fraquezas na defesa (2×) e imunidades (0×). O filtro permite destacar um tipo.

O botão de tema alterna entre claro e escuro. A escolha fica salva no navegador; na primeira visita, o site acompanha a preferência do sistema.

## Publicar no GitHub Pages

1. Envie todos os arquivos desta pasta para a raiz de um repositório público no GitHub.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, branch **main**, pasta **/ (root)** e **Save**.
4. O endereço aparecerá nessa mesma tela depois da publicação.

Guia oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

O site usa somente HTML, CSS e JavaScript e funciona em subpastas do GitHub Pages. Não há instalação, compilação ou chave de API.

## Rodar localmente

Abra index.html no navegador, ou use um servidor estático. Com Node instalado, execute `node preview.cjs` e abra http://localhost:4173.

## Dados e regras

Base incluída em data.js, obtida dos CSVs públicos oficiais de https://github.com/PokeAPI/pokeapi em 29/10/2026. Contém todas as 1.025 espécies disponíveis nessa base, cada uma na forma padrão; formas alternativas, regionais e Mega Evoluções não são entradas separadas. As gerações seguem a espécie, incluindo Hisui na geração VIII.

Os multiplicadores defensivos usam a tabela atual dos 18 tipos dos jogos principais e multiplicam as relações dos dois tipos. Não simulam habilidades, itens, clima, efeitos de golpes ou Terastalização. O tipo Stellar não é um tipo padrão de espécie e não entra nesse cálculo.

Imagens oficiais são carregadas do repositório PokeAPI/sprites, com fallback para sprites. Fontes são carregadas do Google Fonts, com fontes locais alternativas. A busca e os dados funcionam sem API em tempo real; o primeiro carregamento de imagens e fontes precisa de internet.

Favoritos ficam no localStorage deste navegador. Não há conta ou coleta de dados pelo projeto.

## Créditos

Dados: https://pokeapi.co/ e https://github.com/PokeAPI/pokeapi
Imagens: https://github.com/PokeAPI/sprites
Pokémon e seus personagens pertencem à Nintendo, Creatures Inc. e GAME FREAK. Projeto de fãs, sem afiliação oficial.
