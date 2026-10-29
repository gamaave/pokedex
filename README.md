# Pokedex by:Gamaave

Pokédex responsiva em português com 1.025 espécies, 18 tipos, busca por nome/número, filtros por geração e tipo, ordenação, favoritos locais e fichas com fraquezas, resistências, imunidades e atributos base.

## Lendários e evoluções

A aba **Míticos e lendários** lista 94 espécies: 71 lendários e 23 míticos, conforme os campos `is_legendary` e `is_mythical` da PokéAPI. Busca, filtros e ordenação também funcionam nessa aba.

Cada ficha mostra a cadeia completa de evoluções da espécie, com estágios, ramificações, pré-evoluções e links para abrir as outras fichas. Espécies sem evolução recebem uma indicação explícita. Os dados são locais e incluem relações entre espécies, condições e variantes de método.

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

Base incluída em data.js, obtida dos CSVs públicos oficiais de https://github.com/PokeAPI/pokeapi em 29/10/2026. Contém todas as 1.025 espécies disponíveis nessa base, cada uma na forma padrão; formas regionais aparecem no seletor da ficha, enquanto outras formas alternativas e Mega Evoluções não são entradas separadas. As gerações seguem a espécie, incluindo Hisui na geração VIII.

Os multiplicadores defensivos usam a tabela atual dos 18 tipos dos jogos principais e multiplicam as relações dos dois tipos. Não simulam habilidades, itens, clima, efeitos de golpes ou Terastalização. O tipo Stellar não é um tipo padrão de espécie e não entra nesse cálculo.

Imagens oficiais são carregadas do repositório PokeAPI/sprites, com fallback para sprites. Fontes são carregadas do Google Fonts, com fontes locais alternativas. A busca e os dados funcionam sem API em tempo real; o primeiro carregamento de imagens e fontes precisa de internet.

Favoritos ficam no localStorage deste navegador. Não há conta ou coleta de dados pelo projeto.

## Créditos

Dados: https://pokeapi.co/ e https://github.com/PokeAPI/pokeapi
Imagens: https://github.com/PokeAPI/sprites
Pokémon e seus personagens pertencem à Nintendo, Creatures Inc. e GAME FREAK. Projeto de fãs, sem afiliação oficial.

## Formas, shiny e condições de evolução

O seletor da ficha reúne 60 formas regionais de Alola, Galar, Hisui e Paldea, incluindo as três raças de Tauros. Tipos, multiplicadores defensivos, altura, peso e atributos mudam com a forma. A alternância shiny também funciona nas formas regionais. A imagem tenta usar artwork oficial e depois o sprite shiny correspondente; quando ambos faltam, informa a indisponibilidade.

As condições em extras.js são obtidas de pokemon_evolution.csv e tabelas auxiliares da PokéAPI: nível, itens, troca, amizade, horário, golpes, localização, forma exigida e outros requisitos disponíveis. Mostra métodos principais e variantes, identificando a referência do jogo registrada na base. Essa referência não é uma lista completa de jogos compatíveis e as condições podem variar entre versões.

## PWA instalável e acesso offline

O manifesto permite instalar o site no Android (Chrome), iPhone (Safari) e navegadores compatíveis no computador. Use o botão **Instalar app**: ele abre a instalação nativa quando disponível ou apresenta instruções por plataforma. O aplicativo abre em modo standalone e permanece hospedado no GitHub Pages.

O primeiro acesso precisa de internet. Aguarde **Dados prontos para uso offline**. O service worker salva todos os arquivos e dados essenciais de uma mesma versão; busca, filtros, favoritos, evoluções, formas regionais e guia de tipos funcionam sem conexão depois disso. As imagens são salvas conforme carregadas, com limite de 120; imagens ainda não salvas mostram uma indicação quando offline. Fontes externas não são requisito para o modo offline. O navegador pode remover dados para liberar espaço.

Uma nova versão é preparada separadamente. Quando estiver pronta, o aviso **Atualizar agora** permite ativá-la e recarregar a página. Favoritos e tema ficam no localStorage e são preservados.

Depois de editar HTML, CSS, JavaScript, dados ou manifesto, execute `node scripts/build-pwa.cjs` antes de publicar. Isso atualiza as URLs de arquivos e a versão do service worker. Publique também o index.html e sw.js gerados. Para testar o modo offline, sirva por localhost ou HTTPS; a abertura direta como arquivo não permite service worker.

Os ícones de instalação usam um monograma G desenhado para o projeto, sem personagens Pokémon. A instalação como PWA não altera os direitos sobre o conteúdo da franquia.
