# Créditos das imagens

As texturas de superfície dos corpos vivem em `texturas.js`, embutidas em base64
e geradas por `node tools/fototex.js` a partir da pasta `_tex/` (que fica fora do
git). Elas são o mapa que aparece no app; quando alguma falta, o app volta para
o mapa desenhado à mão em canvas, que continua no código.

O motivo de estarem embutidas e não numa pasta `img/`: em `file://` o Chrome
trata cada arquivo como uma origem diferente, e mandar uma imagem dessas para o
WebGL estoura SecurityError. Como o app precisa rodar da pasta ao vivo, um
`data:` URI é a única forma que funciona nos dois lugares.

## Fontes

Todas de domínio público (produção de servidor civil do governo dos Estados
Unidos). Baixadas do espelho FTP público do NOAA Science On a Sphere,
`https://sos.noaa.gov/ftp_mirror/astronomy/`, que guarda o material já em
projeção cilíndrica 2:1.

| Mapa | Missão / autor | Caminho de origem |
|---|---|---|
| `terra` | NASA Earth Observatory · Blue Marble | `eoimages.gsfc.nasa.gov/.../land_shallow_topo_2048.jpg` |
| `terranuvens` | NASA Earth Observatory · Blue Marble | `eoimages.gsfc.nasa.gov/.../cloud_combined_2048.jpg` |
| `terraluzes` | NASA Earth Observatory · Black Marble 2016 | `eoimages.gsfc.nasa.gov/.../BlackMarble_2016_01deg.jpg` |
| `lua` | NASA GSFC · LRO / LROC WAC mosaic | `sos.noaa.gov/.../moon/lroc/LROCwacmosaic.jpg` |
| `marte` | NASA · Viking / Mars Global Surveyor | `sos.noaa.gov/.../mars/original/4096.jpg` |
| `mercurio` | NASA · MESSENGER MDIS (mosaico global, out 2011) | `sos.noaa.gov/.../mercury/oct2011/4096.jpg` |
| `venus` | NASA/JPL · Magellan (radar colorizado) | `sos.noaa.gov/.../venus/original/4096.jpg` |
| `jupiter` | NASA/JPL · Cassini | `sos.noaa.gov/.../jupiter/still/4096.jpg` |
| `saturno` | NASA GSFC | `sos.noaa.gov/.../saturn/color_enhanced/2048.jpg` |
| `netuno` | NASA · Voyager 2 | `sos.noaa.gov/.../neptune/2048.jpg` |

## Ficaram de fora, de propósito

- **Urano**: o único mapa cilíndrico que circula é de terceiro (James
  Hastings-Trew), sem licença clara. Como o planeta é praticamente liso, ele
  segue com o shader procedural, que dá conta.
- **Saturno de Bjorn Jonsson**: é o mais bonito que existe (processamento
  próprio sobre dados Cassini), mas não é domínio público. Usamos o da NASA
  GSFC no lugar.
- **Anéis de Saturno em faixa com transparência**: não há versão de licença
  clara. Os anéis continuam sendo desenhados pelo `RING_FRAG`.

## Duas coisas que morderam

1. **A longitude não é a mesma em todos.** Marte, Lua (LROC) e Mercúrio vêm em
   0..360 °E com o meridiano zero na BORDA ESQUERDA, ou seja centrados em
   180 °E; Vênus e a Terra vêm centrados em 0. Os três primeiros são girados
   meia volta na hora de empacotar (o `hstack` das duas metades trocadas), senão
   o Syrtis Major aparece no lugar errado e a âncora do ponto subsolar de Marte
   sai torta.
2. **O mapa de Júpiter só cobre até uns ±60° de latitude**: acima e abaixo disso
   a imagem é preenchimento chapado, então as calotas dele ficam lisas.

**Regra:** nada de imagem entra sem URL e licença anotadas aqui ANTES do commit.


## Satélites ao vivo (r261)

A camada SATÉLITES AO VIVO NA TERRA usa dois terceiros, os dois sem chave:

| O quê | Fonte | Licença |
| --- | --- | --- |
| Elementos orbitais (TLE) dos grupos stations, visual, gps-ops, galileo, glo-ops e science | CelesTrak, `https://celestrak.org/NORAD/elements/gp.php` (Dr. T.S. Kelso) | dados públicos; a fotografia `tle_snapshot.js` é gerada por `node tools/tle.js` |
| Propagador SGP4 (`satellite.js` 5.0.0) | `https://github.com/shashwatak/satellite-js`, carregada do cdnjs só quando a camada liga | MIT |

## Terremotos (r262)

| O quê | Fonte | Licença |
| --- | --- | --- |
| Tremores de magnitude 2,5 ou mais nas últimas 24 horas (GeoJSON) | USGS Earthquake Hazards Program, `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson` | domínio público (governo dos Estados Unidos) |

## O céu de um lugar (r289)

| O quê | Fonte | Licença |
| --- | --- | --- |
| As 5.044 estrelas até magnitude 6 do céu local (`ceu6.js`: RA, DEC, magnitude, B-V e o número HR) | Yale Bright Star Catalogue (BSC5), no recorte `stars.6.json` do d3-celestial de Olaf Frohn, `https://github.com/ofrohn/d3-celestial` | BSD-3-Clause (d3-celestial); o catálogo de Yale é de domínio público |
| Sol e Lua no céu local (fórmulas) | Jean Meeus, Astronomical Algorithms, caps. 25 e 47 (termos principais) | algoritmos publicados |

## Terra em ladrilhos (r295)

Com a opção TERRA EM LADRILHOS ligada, o mapa 1:1 busca, perto da Terra, os
ladrilhos do serviço WMTS do NASA GIBS (Global Imagery Browse Services), parte
do ESDIS: a camada `VIIRS_SNPP_CorrectedReflectance_TrueColor` (a foto do dia,
250 m por pixel, desde 24 NOV 2015) e, quando ela não existe para a data, a
`BlueMarble_NextGeneration` (500 m). Imagens de domínio público da NASA; o
serviço pede reconhecimento: "We acknowledge the use of imagery provided by
services from NASA's Global Imagery Browse Services (GIBS), part of NASA's Earth
Science Data and Information System (ESDIS)". Endereço base:
https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/ (CORS aberto, sem chave).
Nada é copiado para o repositório: os ladrilhos são carregados na hora e ficam
só na memória do navegador.

## Lua e Marte em ladrilhos (r301)

A mesma opção, agora com a Lua e Marte, usa os mosaicos globais do **NASA Trek**
(https://trek.nasa.gov/tiles/, WMTS equirretangular, CORS aberto, sem chave):

| Corpo | Camada | Resolução no nível máximo |
|---|---|---|
| Lua | `Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02` · mosaico global da Wide Angle Camera do Lunar Reconnaissance Orbiter (NASA/GSFC/Arizona State University) | 83 m por pixel (nível 8) |
| Marte | `Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m` · Mars Digital Image Model 2.1, mosaico colorido das Viking (NASA/JPL/USGS Astrogeology) | 325 m por pixel (nível 7) |

Imagens de domínio público da NASA. Como no GIBS, nada é copiado para o
repositório: os ladrilhos são buscados na hora e ficam só na memória do
navegador, e o app mostra o crédito da fonte na primeira carga de cada corpo.
