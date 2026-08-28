/* Empacota as FOTOS dos corpos num só arquivo texturas.js (r167).
   Uso: node tools/fototex.js

   Entrada:  _tex/<nome>.jpg (as imagens baixadas, fora do git)
   Saída:    texturas.js  ->  window.TEXFOTO = {terra:'data:image/jpeg;base64,...'}

   POR QUE DATA URI E NÃO UMA PASTA img/ COM <img src>: em file:// o Chrome
   trata cada arquivo como uma origem diferente, e mandar uma imagem dessas
   para o WebGL estoura SecurityError (canvas tainted). O Rodrigo testa da
   pasta ao vivo, então imagem solta funcionaria só no site publicado. Um
   data: URI é mesma origem em qualquer lugar, e ainda vem num arquivo só,
   que o navegador guarda em cache.

   Cada entrada diz o tamanho e a qualidade: mapa de cor grande ganha mais
   pixel, máscara (nuvem, luzes) ganha menos, porque ninguém repara. */
const fs = require('fs'), path = require('path'), cp = require('child_process');

const RAIZ = path.join(__dirname, '..');
const ENTRADA = path.join(RAIZ, '_tex');
const SAIDA = path.join(RAIZ, 'texturas.js');

/* nome no app : [arquivo de origem, largura, qualidade jpeg (2 melhor, 9 pior)] */
const LISTA = {
  terra:        ['terra_dia.jpg',    2048, 4],
  terranuvens:  ['terra_nuvens.jpg', 1024, 5],
  terraluzes:   ['terra_luzes.jpg',  1024, 6],
  lua:          ['lua.jpg',          2048, 4],
  marte:        ['marte.jpg',        2048, 4],
  mercurio:     ['mercurio.jpg',     1024, 5],
  venus:        ['venus.jpg',        1024, 5],
  jupiter:      ['jupiter.jpg',      1600, 4],
  saturno:      ['saturno.jpg',      1600, 4],
  netuno:       ['netuno.jpg',       1024, 5]
  /* Urano ficou de fora de proposito: o unico mapa cilindrico que existe por
     ai e de terceiro (James Hastings-Trew), e o planeta e praticamente liso.
     Sem foto, ele volta para o shader procedural, que da conta */
};

const FF = ['ffmpeg', 'C:/Users/rodri/AppData/Local/yt-dlp/ffmpeg.exe',
            '/c/Users/rodri/AppData/Local/yt-dlp/ffmpeg'];
function ffmpeg(args){
  for(const f of FF){
    const r = cp.spawnSync(f, args, {stdio:'ignore'});
    if(!r.error) return true;
  }
  return false;
}

if(!fs.existsSync(ENTRADA)){
  console.error('sem a pasta _tex: nada a empacotar');
  process.exit(1);
}

const tmp = path.join(ENTRADA, '_saida.jpg');
const partes = [];
let total = 0;
for(const [nome, cfg] of Object.entries(LISTA)){
  const orig = path.join(ENTRADA, cfg[0]);
  if(!fs.existsSync(orig)){ console.log('  falta   ' + cfg[0]); continue; }
  const larg = cfg[1], q = cfg[2];
  try { fs.unlinkSync(tmp); } catch(e){}
  const ok = ffmpeg(['-v', 'error', '-i', orig, '-vf', 'scale=' + larg + ':' + (larg >> 1),
                     '-q:v', String(q), '-y', tmp]);
  if(!ok || !fs.existsSync(tmp)){ console.log('  ERRO    ' + cfg[0] + ' (ffmpeg)'); continue; }
  const b64 = fs.readFileSync(tmp).toString('base64');
  total += b64.length;
  partes.push('  ' + nome + ":'data:image/jpeg;base64," + b64 + "'");
  console.log('  ok      ' + nome.padEnd(13) + larg + 'px  ' + Math.round(b64.length/1024) + ' KB');
}
try { fs.unlinkSync(tmp); } catch(e){}

if(!partes.length){ console.error('nenhuma textura empacotada'); process.exit(1); }

fs.writeFileSync(SAIDA,
'/* GERADO por tools/fototex.js · NÃO editar à mão.\n' +
'   As fotos dos corpos, embutidas em base64 para funcionar também em file://\n' +
'   (imagem solta vira origem diferente no Chrome e o WebGL recusa).\n' +
'   Fontes e licenças em CREDITOS.md. */\n' +
'window.TEXFOTO = {\n' + partes.join(',\n') + '\n};\n' +
"try{ window.dispatchEvent(new Event('texfoto')); }catch(e){}\n", 'utf8');

console.log('texturas.js: ' + Math.round(fs.statSync(SAIDA).size/1024) + ' KB, ' + partes.length + ' mapas');
