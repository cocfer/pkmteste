# Documentação técnica (para o responsável pelo projeto)

## Arquitetura
- `engine.js` — dados e **motor de batalha único** (sem DOM). Emite eventos (mensagem, golpe, dano, transformação) e um estado público. Roda no navegador (modo solo) e no servidor (online).
- `server.js` — HTTP + WebSocket nativo (sem dependências): salas por código, sessões por token, validação de turno/ação/troca/ordem/dificuldade, IA de Red/Blue/Eternatus, reconexão (90 s), abandono. **O servidor é a autoridade** do estado online.
- `index.html` — interface (arena, sprites, animações, menus, lobby). Só envia ações e reproduz eventos.
- `tests/` — `unit.js` (motor), `server.js` (dois jogadores reais por WebSocket), `client.js` (interface em DOM simulado + ponta a ponta).

## Rodar localmente
Node 18+ (testes precisam do Node 22+). `node server.js` e abra `http://localhost:3000`. Variáveis: `PORT`, `GRACE_MS` (tolerância de reconexão), `PK_TEST_BOSSHP` (somente testes: fração inicial de HP do chefe).

## Publicar para jogar pela internet (uma vez, feito por você)
Ainda **não está publicado** e nenhum URL foi configurado.
1. Crie um repositório no GitHub com todos os arquivos desta pasta (incluindo `render.yaml`). *Ação sua: conta no GitHub.*
2. No Render (render.com), **New > Blueprint**, escolha o repositório e confirme. *Ação sua: conta no Render.*
3. Copie a URL `https://….onrender.com` que o Render mostrar e passe aos jogadores. Eles só abrem o link.
- Planos gratuitos dormem após inatividade (primeira conexão pode levar ~1 min).

## Dados e regras
- Motor: Geração VI+ (18 tipos, crítico ×1,5, paralisia ×0,25 Vel, queimadura 1/8). Naturezas aleatórias nunca neutras, escolhidas por função; HP não sofre efeito de natureza.
- Equipes dos jogadores: PokéAPI ao vivo com cache; só entram golpes do aprendizado da espécie/forma no jogo mais recente em que ela aparece (nível ≤ nível do Pokémon, TM/TR, tutor, ovo). Sem rede: 23 espécies locais.
- Red (HGSS): níveis, golpes, habilidades e item conforme a referência do projeto; granizo constante no 1x1. Blue: **FireRed/LeafGreen, batalha de Campeão no Indigo Plateau, variante Bulbasaur→Venusaur** (Dittobase para equipe e golpes, Serebii para níveis, Deltias para Keen Eye). Habilidades não confirmadas ficam vazias. Red e Blue vêm de versões diferentes; isso é intencional e documentado. IV 31, EV 0 e natureza neutra de Red/Blue nas dificuldades Fácil/Médio/Difícil são suposições.
- Dificuldades (só adversários): Fácil ≤ nv 50, Médio ≤ nv 70, Difícil ≤ nv 100 (nível original limitado ao teto); Ultra: nv 100, IV 31, EVs/natureza/itens/golpes competitivos legais e IA mais agressiva.
- Boss Fight (regras do simulador, não oficiais): Eternatus nv 150 ou 200, IV 31, Timid, EV 252 AtqE/252 Vel/4 DefE, Pressure, **sem item** (nunca recebe item), **Speed fixa em 150** (valor do atributo e Speed efetiva; imune a estágios, paralisia e Sticky Web; mantida após o Eternamax), golpes da 1ª fase: Dynamax Cannon, Sludge Bomb, Flamethrower, Toxic Spikes. Abaixo de 50% de HP (uma vez): Eternamax com base 255/115/250/125/250/130, golpes Eternabeam (recarga), Dynamax Cannon, Sludge Bomb, Flamethrower, sem item; HP mantido proporcionalmente; estágios e status preservados. Capturar/adicionar Eternatus é rejeitado pelo motor e pelo servidor.

## Não implementado
Clima dinâmico (sol/chuva/areia), multi-hit, confusão, golpes de dois turnos com invulnerabilidade, Fake Out, Trick Room, Future Sight, Sand Attack (precisão), Thrash (travamento) e itens de cura de Red/Blue. Golpes da PokéAPI são filtrados por heurística (metadados e descrição); um golpe raro pode escapar.

## Interface (ajustes finais)
- Sprites: escala inteira por imagem (pixel art nítida) com compressão suave por tamanho nativo; imagens muito pequenas ou muito esticadas são descartadas automaticamente e o próximo candidato é usado (animado Black/White, Showdown, estático, arte oficial). Pokémon de gerações 6+ usam sprites estilo 3D do Showdown e podem destoar da pixel art.
- Camadas (z-index): treinadores 2 < Pokémon 4 < neve 6 < perigos 7 < barras de HP 8 < partículas 9. O treinador sai de cena quando a bola é lançada.
- Neve do Monte Silver: canvas com 22 a 46 flocos pequenos e translúcidos (uma instância, parada ao sair/reiniciar).
- Animações: `typeFx` (18 tipos × físico/especial), `statusFx`, `NAMED` (Flamethrower, Surf, Thunderbolt) e `CIN` (Blizzard etc.); novos efeitos entram nesses registros sem mexer no motor.

## Recursos gráficos externos e créditos
- Sprites de Pokémon: repositório PokeAPI/sprites (GitHub). Animados de Black/White para as espécies 1–649, Showdown para as demais; Eternamax: `play.pokemonshowdown.com/sprites/ani/eternatus-eternamax.gif` e arte oficial.
- Efeitos de golpes: sprites `fx/` do Pokémon Showdown (`play.pokemonshowdown.com/fx/`): lightning, electroball, fireball, flareball, waterwisp, leaf1/leaf2, icicle, iceball, poisonwisp, mudwisp, rock1/rock2, rocks, shadowball, mistball, energyball, fist, foot, leftclaw/rightclaw, topbite (confirmados na listagem do repositório); bottombite, protect, caltrop, web e poisoncaltrop são tentados em tempo de execução. Qualquer imagem que não carregar aciona o efeito anterior (partículas), nunca uma imagem quebrada.
- Treinadores: sprites oficiais do Showdown (`sprites/trainers/…`: red, blue, ethan, lyra); sem eles, desenho de fallback.
- Neve: floco de neve Twemoji ❄ (Twitter/jdecked, CC-BY 4.0) via jsDelivr, com OpenMoji (CC BY-SA 4.0) como reserva e floco vetorial se nada carregar.
- Pokémon e seus assets pertencem a Nintendo/Game Freak/Creatures; uso educacional.
