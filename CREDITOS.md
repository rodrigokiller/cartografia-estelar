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
