/* AUDITORIA DAS MISSOES no mapa 1:1 (r217).
   Uso: node tools/missoes.js [id]     (sem id: roda a lista padrao)

   Para cada missao ela abre o app em headless, inicia a linha do tempo e mede:
   - DIF3D: distancia 3D entre o ponto de partida e a TERRA da epoca (a solda
     do r213; sondas devem dar ~0; a oumuamua vem DE FORA, e esperada grande)
   - FIM: onde a rota termina, contra a tabela ESCALA_REAL_SONDA
   - NAV: o raio do modelo da nave em raios da Terra (deve ser < 1,2)
   - CAM: a distancia da camera depois da chegada (deve fechar em ~0.125)

   CUIDADO (3 SET 2026): o Chrome atualizado PENDURA com virtual-time-budget
   longo (26000+ = dump de 0 bytes); 14000 funciona. Em tempo real o dump sai
   no load, antes da sonda: ficar no tempo virtual CURTO.
   O rAF do headless morre de fome no tempo virtual, entao a pagina ganha um
   shim que guarda o callback do laco e a sonda dirige os quadros na mao
   (a mesma tecnica do mkshot v3; licao do r194).                            */
const fs = require('fs'), path = require('path'), cp = require('child_process');

const RAIZ = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

const LISTA = ['apollo11', 'voyager1', 'voyager2', 'pioneer10', 'newhorizons',
  'pathfinder', 'viking1', 'cassini', 'oumuamua'];
const DEFORA = {oumuamua: 1};   /* visitante interestelar: nao nasce na Terra */

const PROBE = `
    if(typeof ACT === 'undefined' || !ACT || ACT.kind !== 'system') return;
    if(window.__fase === undefined){ window.__fase = 0; window.__tq = 0; }
    window.__tq++;
    if(window.__fase === 0){
      if(window.__tq < 3) return;
      TUT.v.add('linhadotempo');
      const boot = document.getElementById('boot'); if(boot) boot.style.display = 'none';
      window.__fase = 1;
      return;
    }
    if(window.__fase === 1){
      const id = new URLSearchParams(location.search).get('aud') || 'voyager2';
      ST.mapCard = {type:'body', id, act:'focus', t:0};
      try{ trajStart(id); }catch(err){ window.__res = 'AUD ' + id + ' QUEBROU=' + err.message.slice(0, 40); return; }
      if(!TRAJ || TRAJ.id !== id){ window.__res = 'AUD ' + id + ' NAOINICIOU=1'; return; }
      const v0 = new THREE.Vector3(), v1 = new THREE.Vector3();
      trajPonto(0, v0); trajPonto(1, v1);
      const pkT = ACT.pickables.find(x=>x.userData && x.userData.id === 'terra');
      const vT = new THREE.Vector3(); if(pkT) pkT.getWorldPosition(vT);
      const dif3d = v0.distanceTo(vT)/15;
      /* distância 3D, nunca hypot(x,z): em órbita inclinada (a oumuamua tem
         122 graus) a projeção mentia 20 por cento (lição do Halley, r136) */
      const r1 = v1.length()/15;
      let nav = -1;
      if(TRAJ.corpoTemp){
        let rMax = 0;
        TRAJ.corpoTemp.traverse(o=>{ if(o.isMesh && o.geometry){ if(!o.geometry.boundingSphere) o.geometry.computeBoundingSphere(); if(o.geometry.boundingSphere) rMax = Math.max(rMax, o.geometry.boundingSphere.radius*o.scale.x); } });
        nav = (rMax*TRAJ.corpoTemp.scale.x)/0.00064;
      }
      const alvoUA = (typeof ESCALA_REAL_SONDA !== 'undefined' && ESCALA_REAL_SONDA[id]) ? ESCALA_REAL_SONDA[id] : -1;
      window.__med = {id, dif3d, r1, alvoUA, nav, luaD:(TRAJ.dias ? (TRAJ.luaD || -1) : -1), dias:(TRAJ.dias ? 1 : 0)};
      window.__fr = 0;
      window.__fase = 2;
      return;
    }
    if(window.__fase === 2){
      if(window.__rafCb && window.__fr < 12){ window.__fr++; try{ window.__rafCb(performance.now()); }catch(err){} return; }
      const t = window.__med;
      window.__res = 'AUD ' + t.id + ' DIF3D=' + t.dif3d.toFixed(3) + ' FIM=' + t.r1.toFixed(2)
        + ' ALVO=' + t.alvoUA + ' NAV=' + t.nav.toFixed(2) + ' LUAD=' + t.luaD.toFixed(4) + ' DIAS=' + t.dias + ' CAM=' + CAM.dist.toFixed(4);
    }
    if(window.__res) document.title = window.__res;
`;

const topo = `<script>
window.__err = [];
window.addEventListener('error', function(e){ window.__err.push(e.message); });
(function(){ var r0 = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function(cb){ window.__rafCb = cb; return r0(cb); }; })();
<\/script>\n`;

const extra = `\n<script>
setTimeout(function(){ setInterval(function(){
  if(window.__err.length){ document.title = 'AUD ERRO=' + window.__err.join('|').slice(0, 80); return; }
  try{
` + PROBE + `
  }catch(err){ document.title = 'AUD ERRO=' + err.message.slice(0, 80); }
}, 200); }, 900);
<\/script>`;

let corpo = html;
const iS = corpo.indexOf('<script');
corpo = corpo.slice(0, iS) + topo + corpo.slice(iS) + extra;
const pagina = path.join(RAIZ, '_aud.html');
fs.writeFileSync(pagina, corpo);

const CHROMES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium'
];
const chrome = CHROMES.find(p2 => fs.existsSync(p2));
if(!chrome){ console.error('nao achei o Chrome'); process.exit(1); }

const alvo = process.argv[2];
const fila = alvo ? [alvo] : LISTA;
const perfil = path.join(require('os').tmpdir(), 'universatlas-missoes');
let falhas = 0;

console.log('AUDITORIA DAS MISSOES (1:1) · ' + fila.length + ' missoes\n');
for(const id of fila){
  let titulo = '';
  const ORCS = [14000, 16000, 15000, 17000];
  for(let tent = 0; tent < 4 && !titulo.includes('AUD'); tent++){
    let saida = '';
    try{
      saida = cp.execSync('"' + chrome + '" --headless=new --disable-gpu --enable-unsafe-swiftshader --no-sandbox'
        + ' --user-data-dir="' + perfil + id + tent + '" --window-size=900,700 --virtual-time-budget=' + ORCS[tent]
        + ' --dump-dom "file:///' + pagina.replace(/\\/g, '/') + '?aud=' + id + '#sistema=sol&escala=real"',
        {timeout: 160000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
    }catch(e){ saida = e.stdout || ''; }
    const m = String(saida).match(/<title>(AUD[^<]*)<\/title>/);
    if(m) titulo = m[1];
  }
  if(!titulo){ console.log('  FALHA ' + id + ': sem resposta do headless'); falhas++; continue; }
  const g = k => { const m = titulo.match(new RegExp(k + '=([-0-9.a-zA-Z]+)')); return m ? m[1] : null; };
  if(g('QUEBROU') || g('NAOINICIOU') || g('ERRO')){ console.log('  FALHA ' + id + ': ' + titulo); falhas++; continue; }
  const dif = parseFloat(g('DIF3D')), fim = parseFloat(g('FIM'));
  const alvoUA = parseFloat(g('ALVO')), nav = parseFloat(g('NAV')), cam = parseFloat(g('CAM'));
  const probs = [];
  if(!DEFORA[id] && !(dif <= 0.02)) probs.push('lancamento a ' + dif + ' UA da Terra');
  if(alvoUA > 0 && Math.abs(fim - alvoUA)/alvoUA > 0.02) probs.push('fim em ' + fim + ' (alvo ' + alvoUA + ')');
  if(nav > 1.2) probs.push('nave com ' + nav + 'x o raio da Terra');
  const luaD = parseFloat(g('LUAD')), dias = g('DIAS') === '1';
  /* missao de dias no 1:1: a rota tem que ser a REAL (Lua a 0.0385 un) e a
     camera chega ACOMPANHANDO a nave, colada na Terra (r218) */
  if(dias && !(Math.abs(luaD - 0.0385) < 0.004)) probs.push('rota fora da escala real (luaD=' + luaD + ')');
  if(dias ? !(cam <= 0.03) : !(cam <= 0.5)) probs.push('camera longe (' + cam + ')');
  const ok = probs.length === 0;
  if(!ok) falhas++;
  console.log('  ' + (ok ? 'ok    ' : 'FALHA ') + id.padEnd(12)
    + ' dif3d=' + String(dif).padEnd(6) + ' fim=' + String(fim).padEnd(7)
    + (alvoUA > 0 ? ('/' + alvoUA + 'UA ') : ' ') + 'nav=' + nav + 'xT cam=' + cam
    + (probs.length ? ('  << ' + probs.join(' · ')) : ''));
}
try{ fs.unlinkSync(pagina); }catch(e){}
console.log('\n' + (falhas ? ('FALHAS: ' + falhas) : 'Missoes integras.'));
process.exit(falhas ? 1 : 0);
