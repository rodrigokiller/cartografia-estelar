/* Sonda de TELA das texturas desenhadas à mão (r164).
   Uso: node tools/telas.js [nome]

   Por que ela existe: as texturas da Terra, da Lua, de Marte e das nuvens são
   desenhadas em canvas 2D no próprio app, e olhar para elas foi o que achou
   dois artefatos que ninguém veria lendo código: as cordilheiras viravam
   ARRANHÃO e todo degradê claro ganhava um ANEL ESCURO em volta (o canvas
   interpola cor não premultiplicada, então desbotar para 'rgba(0,0,0,0)'
   passa por cinza escuro no meio do caminho).

   O truque: a página que ela monta NÃO usa WebGL. Ela recorta do index.html só
   o bloco de desenho e dá um THREE de mentirinha, então roda em headless mesmo
   quando a cena 3D pendura, que é o que acontece em máquina carregada.

   Saída: tools/telas/<nome>.png                                             */
const fs = require('fs'), path = require('path'), cp = require('child_process');

const RAIZ = path.join(__dirname, '..');
const SAIDA = path.join(__dirname, 'telas');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const blocos = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');

const de = 'const CONTINENTES', ate = 'function texturaPreta(){';
if(blocos.indexOf(de) < 0 || blocos.indexOf(ate) < 0){
  console.error('nao achei o bloco de desenho no index.html (mudou de nome?)');
  process.exit(1);
}
const desenho = blocos.slice(blocos.indexOf(de), blocos.indexOf(ate));

/* cada tela: nome, altura da janela e o que desenhar */
const TELAS = {
  terra:   {h: 610,  js: "por(texturaTerra())"},
  marte:   {h: 610,  js: "por(texturaMarte())"},
  lua:     {h: 610,  js: "por(texturaLua())"},
  nuvens:  {h: 610,  js: "fundo('#1a2430'); por(texturaNuvens())"},
  /* a Terra com as nuvens por cima, que é como ela aparece no app */
  mundo:   {h: 610,  js: "por(texturaTerra()); por(texturaNuvens())"}
};

const alvo = process.argv[2];
const lista = alvo ? (TELAS[alvo] ? [alvo] : null) : Object.keys(TELAS);
if(!lista){
  console.error('tela desconhecida: ' + alvo + '. Tem: ' + Object.keys(TELAS).join(', '));
  process.exit(1);
}

const CHROMES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium'
];
const chrome = CHROMES.find(p => fs.existsSync(p));
if(!chrome){ console.error('nao achei o Chrome'); process.exit(1); }

if(!fs.existsSync(SAIDA)) fs.mkdirSync(SAIDA, {recursive:true});
const pagina = path.join(RAIZ, '_telas.html');
const perfil = path.join(require('os').tmpdir(), 'universatlas-telas');

let falhou = 0;
for(const nome of lista){
  const t = TELAS[nome];
  fs.writeFileSync(pagina,
`<!doctype html><meta charset=utf-8>
<style>html,body{margin:0;background:#0b0f16}
.folha{position:relative;width:1200px;height:600px}
.folha img,.folha canvas{position:absolute;left:0;top:0;width:1200px;height:600px}</style>
<div class=folha id=f></div>
<script>
const QLOW = false;
const THREE = {CanvasTexture:function(c){ this.image = c; this.anisotropy = 1; }, RepeatWrapping:1};
${desenho}
const alvoEl = document.getElementById('f');
let pendentes = 0;
function fundo(cor){ alvoEl.style.background = cor; }
function por(tex){
  pendentes++;
  const im = new Image();
  im.onload = ()=>{ if(--pendentes === 0) document.title = 'PRONTO'; };
  im.src = tex.image.toDataURL('image/png');
  alvoEl.appendChild(im);
}
try { ${t.js}; } catch(e){ document.title = 'ERRO: ' + e.message; }
</script>`, 'utf8');

  const png = path.join(SAIDA, nome + '.png');
  const r = cp.spawnSync(chrome, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--user-data-dir=' + perfil,
    '--window-size=1200,' + t.h,
    '--virtual-time-budget=25000',
    '--screenshot=' + png,
    'file:///' + pagina.replace(/\\/g, '/')
  ], {timeout: 120000, stdio:'ignore'});

  const ok = fs.existsSync(png) && fs.statSync(png).size > 2000;
  console.log((ok ? '  ok  ' : ' FALHA') + '  ' + nome + (ok ? '  ' + Math.round(fs.statSync(png).size/1024) + ' KB' : ''));
  if(!ok) falhou++;
  if(r.error) console.log('        (' + r.error.message + ')');
}
try { fs.unlinkSync(pagina); } catch(e){}
console.log(falhou ? falhou + ' tela(s) sem sair. Em maquina carregada o headless pendura: tente de novo.'
                   : 'telas em tools/telas/');
