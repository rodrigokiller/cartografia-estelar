/* O VIDEO DE APRESENTACAO gerado pelo proprio app (r247, roteiro v2 no r250).
   Uso: node tools/video.js [largura] [altura] [saida.mp4]
        node tools/video.js 1280 720 midia/universatlas-20s.mp4
        node tools/video.js 720 1280 midia/universatlas-20s-vertical.mp4
   Opcional: VIDEO_AMOSTRAS=<pasta> guarda alguns quadros de cada clipe em PNG
   (para conferir o enquadramento sem abrir o mp4).

   Como funciona: abre o app num Chrome headless (GPU real) com a porta de
   depuracao, fala com ele pelo protocolo do Chrome (CDP) usando o WebSocket
   nativo do Node 22, e renderiza QUADRO A QUADRO: para cada quadro a camera
   e posta na mao, o laco de render e chamado uma vez (o shim do rAF do
   mkshot) e Page.captureScreenshot salva um PNG. No fim o ffmpeg costura.
   Nada de gravar tela: cada quadro e exato e o resultado e deterministico.

   Roteiro v2 (20 s a 30 fps):
     clipe A (5 s)  · o mapa CENICO visto de cima, girando devagar
     clipe B (10 s) · a ESCALA 1:1: a Terra GRANDE e parada por 1,5 s, depois
                      um zoom so ate a Via Lactea vista DE CIMA
     clipe C (5 s)  · a APOLLO 11 saindo da Florida na linha do tempo cenica
                      (o relogio da missao e dirigido quadro a quadro), com o
                      wordmark UNIVERS|ATLAS entrando nos ultimos 2,5 s
   Regras da casa: sem emoji, sem travessao; o Chrome precisa de GPU real
   (sem --disable-gpu) e o idioma vai fixo em pt-BR.                         */
const fs = require('fs'), path = require('path'), cp = require('child_process'), http = require('http');

const W = +(process.argv[2] || 1280), H = +(process.argv[3] || 720);
const SAIDA = process.argv[4] || path.join('midia', 'universatlas-20s' + (H > W ? '-vertical' : '') + '.mp4');
const FPS = 30, PORTA = 9333 + Math.floor(Math.random()*100);
const RAIZ = path.join(__dirname, '..');
const TMP = path.join(require('os').tmpdir(), 'universatlas-video-' + process.pid);
const AMOSTRAS = process.env.VIDEO_AMOSTRAS || '';
fs.mkdirSync(TMP, {recursive:true});
if(AMOSTRAS) fs.mkdirSync(AMOSTRAS, {recursive:true});

const CHROMES = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'];
const chrome = CHROMES.find(p => fs.existsSync(p));
if(!chrome){ console.error('nao achei o Chrome'); process.exit(1); }

/* a pagina: o index.html com o shim do rAF no topo (o laco fica na mao) */
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const topo = `<script>
window.__err = [];
window.addEventListener('error', function(e){ window.__err.push(e.message); });
(function(){ var r0 = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function(cb){ window.__rafCb = cb; return r0(cb); }; })();
<\/script>\n`;
const iS = html.indexOf('<script');
const pagina = path.join(RAIZ, '_video.html');
fs.writeFileSync(pagina, html.slice(0, iS) + topo + html.slice(iS));

/* ---- CDP minimo em cima do WebSocket nativo ---- */
function esperaJson(tent){
  return new Promise((ok, erro)=>{
    const tenta = ()=>{
      http.get('http://127.0.0.1:' + PORTA + '/json', res=>{
        let s = ''; res.on('data', d=>s += d); res.on('end', ()=>{
          try{ const lst = JSON.parse(s); const pg = lst.find(x=>x.type === 'page'); if(pg) return ok(pg); }catch(e){}
          if(tent-- > 0) setTimeout(tenta, 400); else erro(new Error('sem pagina no CDP'));
        });
      }).on('error', ()=>{ if(tent-- > 0) setTimeout(tenta, 400); else erro(new Error('CDP nao respondeu')); });
    };
    tenta();
  });
}
class CDP {
  constructor(url){ this.ws = new WebSocket(url); this.id = 0; this.pend = new Map();
    this.pronto = new Promise(ok=>{ this.ws.addEventListener('open', ok); });
    this.ws.addEventListener('message', ev=>{ const m = JSON.parse(ev.data); if(m.id && this.pend.has(m.id)){ const {ok, erro} = this.pend.get(m.id); this.pend.delete(m.id); m.error ? erro(new Error(m.error.message)) : ok(m.result); } }); }
  send(method, params){ const id = ++this.id; return new Promise((ok, erro)=>{ this.pend.set(id, {ok, erro}); this.ws.send(JSON.stringify({id, method, params:params || {}})); }); }
  async eval(expr){ const r = await this.send('Runtime.evaluate', {expression:expr, returnByValue:true, awaitPromise:true}); if(r.exceptionDetails) throw new Error('JS: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text)); return r.result.value; }
  fecha(){ try{ this.ws.close(); }catch(e){} }
}
const dorme = ms => new Promise(ok=>setTimeout(ok, ms));

/* esconde o HUD, deixa os rotulos; o mesmo visual do og do r230 */
const CSS_LIMPO = '#topbar,#topright,#navpod,#simclock,#panel,#hint,.chev,#zoomui,#reguabar,#tut,#tutcaixa,#boot,#trajclock,#nowplay,#player,#diagchip,#solflare,.corner,#mission,#scalebadge,#fovline,#photoexit,#tourbar,#trajbar,#trajwrap,#trajui,#mtoast,#phototoast,#tip{display:none !important}'
  + '#ogwrap{position:fixed;left:0;right:0;bottom:8%;z-index:99;text-align:center;font-family:Consolas,monospace;opacity:0;transition:none}'
  + '#ogmark{font-size:' + Math.round(Math.min(W, H)*0.06) + 'px;letter-spacing:10px;color:#6fb7ff;font-weight:300}'
  + '#ogmark b{color:#fff;font-weight:700;text-shadow:0 0 18px rgba(111,183,255,.9),0 0 42px rgba(111,183,255,.5)}'
  + '#ogtag{margin-top:10px;font-size:' + Math.round(Math.min(W, H)*0.018) + 'px;letter-spacing:5px;color:#9fc0e8}'
  + '#ogbar{margin:14px auto 0;width:280px;height:2px;background:linear-gradient(90deg,transparent,#6fb7ff,transparent)}';

async function abre(hash, nome){
  const perfil = path.join(TMP, 'perfil-' + nome);
  const proc = cp.spawn(chrome, ['--headless=new', '--no-sandbox', '--lang=pt-BR', '--hide-scrollbars',
    '--remote-debugging-port=' + PORTA, '--user-data-dir=' + perfil, '--window-size=' + W + ',' + H,
    'file:///' + pagina.replace(/\\/g, '/') + '#' + hash], {stdio:'ignore'});
  const pg = await esperaJson(50);
  const cdp = new CDP(pg.webSocketDebuggerUrl);
  await cdp.pronto;
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
  /* espera o boot: a cena montada e sem mergulho em andamento */
  for(let i = 0; i < 80; i++){
    const ok = await cdp.eval("(typeof ACT !== 'undefined' && ACT && ACT.kind === 'system' && typeof DIVE !== 'undefined' && !DIVE && window.__rafCb) ? 1 : 0").catch(()=>0);
    if(ok) break;
    await dorme(250);
  }
  await cdp.eval(`(function(){
    TUT.v.add('boasvindas'); TUT.v.add('linhadotempo');
    const st = document.createElement('style'); st.textContent = ${JSON.stringify(CSS_LIMPO)}; document.head.appendChild(st);
    const w = document.createElement('div'); w.id = 'ogwrap';
    w.innerHTML = '<div id="ogmark">UNIVERS<b>ATLAS</b></div><div id="ogtag">MAPA 3D INTERATIVO DO UNIVERSO</div><div id="ogbar"></div>';
    document.body.appendChild(w);
    window.__t0 = performance.now();
    return 1; })()`);
  return {proc, cdp};
}
async function quadro(cdp, arq, clipe, i, n){
  const r = await cdp.send('Page.captureScreenshot', {format:'png'});
  const buf = Buffer.from(r.data, 'base64');
  fs.writeFileSync(arq, buf);
  /* amostras: 5 quadros por clipe (comeco, 1/4, meio, 3/4, fim) */
  if(AMOSTRAS && [0, Math.round(n/4), Math.round(n/2), Math.round(3*n/4), n - 1].includes(i))
    fs.writeFileSync(path.join(AMOSTRAS, clipe + '_' + pad(i) + '.png'), buf);
}
function pad(n){ return String(n).padStart(4, '0'); }
const suave = s => s*s*(3 - 2*s);

/* ---- clipe A: o mapa cenico visto de cima, girando devagar ---- */
async function clipeA(pasta){
  const {proc, cdp} = await abre('sistema=sol', 'a');
  const N = 5*FPS;
  await cdp.eval("CAMTW = null; ZOOM = null; ST.mapCard = null; uiSync(); 1");
  for(let i = 0; i < N; i++){
    const k = i/(N - 1);
    await cdp.eval(`(function(){ CAM.yaw = ${3.05} + ${0.5}*${k}; CAM.pitch = ${1.08} - ${0.10}*${k}; CAM.dist = ${98} - ${26}*${k};
      applyCam(); window.__rafCb(window.__t0 + ${i}*${1000/FPS}); return 1; })()`);
    await quadro(cdp, path.join(pasta, 'f' + pad(i) + '.png'), 'A', i, N);
    if(i % 30 === 0) process.stdout.write('A' + i + ' ');
  }
  cdp.fecha(); proc.kill();
  return N;
}
/* ---- clipe B: da Terra a Via Lactea num zoom so (escala 1:1) ---- */
async function clipeB(pasta){
  const {proc, cdp} = await abre('sistema=sol&escala=real', 'b');
  const N = 10*FPS;
  /* a Terra fica travada na ficha (o pivo segue ela) e a camera parte colada */
  await cdp.eval(`(function(){
    CAMTW = null; ZOOM = null;
    ST.mapCard = {type:'body', id:'terra', act:'focus', t:0}; uiSync();
    const pk = ACT.pickables.find(x=>x.userData && x.userData.id === 'terra');
    const v = new THREE.Vector3(); pk.getWorldPosition(v); CAM.pivot.copy(v);
    window.__terraPick = pk; return 1; })()`);
  /* r250: a Terra GRANDE (2,8 raios) pelo LADO DO DIA e parada por 1,5 s; o fim e a
     Via Lactea DE CIMA de verdade (a camera ao longo do polo galactico, pivo no centro) */
  const ang = JSON.parse(await cdp.eval(`(function(){
    const v = new THREE.Vector3(); window.__terraPick.getWorldPosition(v);
    const yawSol = Math.atan2(-v.x, -v.z);                 /* camera entre a Terra e o Sol */
    const d = ACT.galPolo.clone().normalize(); if(d.y < 0) d.negate();
    const pitchPolo = Math.asin(d.y), yawPolo = Math.atan2(d.x, d.z);
    return JSON.stringify({yawSol, yawPolo, pitchPolo, gc:[ACT.galCentro.x, ACT.galCentro.y, ACT.galCentro.z]}); })()`));
  let yawFim = ang.yawPolo; while(yawFim - ang.yawSol > Math.PI) yawFim -= 2*Math.PI; while(yawFim - ang.yawSol < -Math.PI) yawFim += 2*Math.PI;
  process.stdout.write('[B yawSol=' + ang.yawSol.toFixed(2) + ' polo yaw=' + yawFim.toFixed(2) + ' pitch=' + ang.pitchPolo.toFixed(2) + '] ');
  const d0 = 0.0018, d1 = 1.5e11;   /* de ~2,8 raios da Terra ate ~160 mil anos-luz */
  const HOLD = 0.15, p0 = 0.22;
  for(let i = 0; i < N; i++){
    const k = i/(N - 1);
    const s = k < HOLD ? 0 : (k - HOLD)/(1 - HOLD);
    const e = suave(s);
    const dist = Math.exp(Math.log(d0) + (Math.log(d1) - Math.log(d0))*e);
    const pitch = p0 + (ang.pitchPolo - p0)*e, yaw = ang.yawSol + (yawFim - ang.yawSol)*e;
    const g = e < 0.72 ? 0 : suave((e - 0.72)/0.28);            /* o pivo desliza para o centro da galaxia no fim */
    await cdp.eval(`(function(){ CAM.dist = ${dist}; CAM.yaw = ${yaw}; CAM.pitch = ${pitch};
      const v = new THREE.Vector3(); window.__terraPick.getWorldPosition(v);
      CAM.pivot.copy(v).lerp(new THREE.Vector3(${ang.gc[0]}, ${ang.gc[1]}, ${ang.gc[2]}), ${g});
      applyCam(); window.__rafCb(window.__t0 + ${i}*${1000/FPS}); return 1; })()`);
    await quadro(cdp, path.join(pasta, 'f' + pad(i) + '.png'), 'B', i, N);
    if(i % 30 === 0) process.stdout.write('B' + i + ' ');
  }
  cdp.fecha(); proc.kill();
  return N;
}
/* ---- clipe C: a Apollo 11 saindo da Florida (linha do tempo cenica, r250) ---- */
async function clipeC(pasta){
  const {proc, cdp} = await abre('sistema=sol', 'c');
  const N = 5*FPS;
  /* inicia a missao e poe o relogio dela no relogio falso do video */
  const ini = await cdp.eval(`(function(){
    CAMTW = null; ZOOM = null;
    ST.mapCard = {type:'body', id:'apollo11', act:'focus', t:0};
    trajStart('apollo11');
    if(!TRAJ || TRAJ.id !== 'apollo11') return 'nao iniciou';
    TRAJ.t0 = window.__t0; TRAJ.ln = window.__t0;
    return 'ok fase=' + TRAJ.fase; })()`);
  if(!/^ok/.test(ini)) throw new Error('clipe C: ' + ini);
  /* a chegada da camera (1300 ms de relogio) roda fora do video, em passos de 50 ms */
  for(let j = 1; j <= 40; j++) await cdp.eval(`window.__rafCb(window.__t0 + ${j*50}); 1`);
  const fase = await cdp.eval("TRAJ.pausado = true; TRAJ.fase + ' cam=' + CAM.dist.toFixed(2)");
  process.stdout.write('[C ' + fase + '] ');
  const base = 40*50;
  /* prog 0 a 0,30 do tempo da missao: o estacionamento (1,5 voltas) e a saida para a Lua */
  for(let i = 0; i < N; i++){
    const k = i/(N - 1);
    const prog = 0.30*suave(k);
    const dist = 4.4 - 1.4*suave(k), yaw = 0.62 + 0.30*k, pitch = 0.62 - 0.12*k;   /* colado na Terra: a Apollo saindo */
    const op = k > 0.50 ? Math.min(1, (k - 0.50)/0.14) : 0;         /* wordmark nos ultimos 2,5 s */
    await cdp.eval(`(function(){ TRAJ.prog = ${prog}; CAM.dist = ${dist}; CAM.yaw = ${yaw}; CAM.pitch = ${pitch};
      applyCam(); window.__rafCb(window.__t0 + ${base} + ${i}*${1000/FPS});
      document.getElementById('ogwrap').style.opacity = ${op}; return 1; })()`);
    await quadro(cdp, path.join(pasta, 'f' + pad(i) + '.png'), 'C', i, N);
    if(i % 30 === 0) process.stdout.write('C' + i + ' ');
  }
  cdp.fecha(); proc.kill();
  return N;
}

(async ()=>{
  const pastas = {a:path.join(TMP, 'a'), b:path.join(TMP, 'b'), c:path.join(TMP, 'c')};
  for(const p of Object.values(pastas)) fs.mkdirSync(p);
  console.log('VIDEO ' + W + 'x' + H + ' · ' + SAIDA);
  const nA = await clipeA(pastas.a);
  const nB = await clipeB(pastas.b);
  const nC = await clipeC(pastas.c);
  console.log('\nquadros: A=' + nA + ' B=' + nB + ' C=' + nC + ' · costurando');
  fs.mkdirSync(path.dirname(path.join(RAIZ, SAIDA)), {recursive:true});
  const lista = path.join(TMP, 'lista.txt');
  const linhas = [];
  for(const [p, n] of [[pastas.a, nA], [pastas.b, nB], [pastas.c, nC]])
    for(let i = 0; i < n; i++) linhas.push("file '" + path.join(p, 'f' + pad(i) + '.png').replace(/\\/g, '/') + "'");
  fs.writeFileSync(lista, linhas.map(l=>l + '\nduration ' + (1/FPS)).join('\n') + '\n');
  cp.execSync('ffmpeg -y -v error -f concat -safe 0 -i "' + lista + '" -vf "fps=' + FPS + ',scale=' + W + ':' + H + ':flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 20 -movflags +faststart "' + path.join(RAIZ, SAIDA) + '"', {stdio:'inherit'});
  const st = fs.statSync(path.join(RAIZ, SAIDA));
  console.log('pronto: ' + SAIDA + ' · ' + (st.size/1048576).toFixed(1) + ' MB');
  try{ fs.unlinkSync(pagina); }catch(e){}
  try{ fs.rmSync(TMP, {recursive:true, force:true}); }catch(e){}
})().catch(e=>{ console.error('FALHA: ' + e.message); try{ fs.unlinkSync(pagina); }catch(_){} process.exit(1); });
