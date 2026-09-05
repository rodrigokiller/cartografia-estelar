/* AUDITORIA DAS MISSOES: mapa 1:1 (r217) e mapa CENICO (r231).
   Uso: node tools/missoes.js [id]     (sem id: roda as duas listas padrao)
        node tools/missoes.js cen:apollo11   (so a passada cenica de uma)

   Para cada missao ela abre o app em headless, inicia a linha do tempo e mede:
   - DIF3D: distancia 3D entre o ponto de partida e a TERRA da epoca (a solda
     do r213; sondas devem dar ~0; a oumuamua vem DE FORA, e esperada grande)
   - FIM: onde a rota termina, contra a tabela ESCALA_REAL_SONDA
   - NAV: o raio do modelo da nave em raios da Terra (deve ser < 1,2)
   - CAM: a distancia da camera depois da chegada (deve fechar em ~0.125)

   CUIDADO (3 SET 2026): o Chrome atualizado PENDURA com virtual-time-budget
   longo (26000+ = dump de 0 bytes); 14000 funciona. Em tempo real o dump sai
   no load, antes da sonda: ficar no tempo virtual CURTO.
   r231: GPU REAL (sem --disable-gpu e sem swiftshader): e o que abre a cena
   CENICA no headless (swiftshader pendurava desde sempre), entao a passada
   cenica virou possivel: Florida sob o lancamento (r227), rota na escala do
   r140 (D = 2,6 un), splashdown NA superficie (r226), Lua da missao com luz
   registrada e viva (uL unitario, sem NaN) e nave presente com MeshBasic
   (o 'Lua e nave PRETAS' que ele reportou uma vez: a auditoria vigia).
   O rAF do headless morre de fome no tempo virtual, entao a pagina ganha um
   shim que guarda o callback do laco e a sonda dirige os quadros na mao
   (a mesma tecnica do mkshot v3; licao do r194).                            */
const fs = require('fs'), path = require('path'), cp = require('child_process');

const RAIZ = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

const LISTA = ['apollo11', 'voyager1', 'voyager2', 'pioneer10', 'newhorizons',
  'pathfinder', 'viking1', 'cassini', 'oumuamua'];
const DEFORA = {oumuamua: 1};   /* visitante interestelar: nao nasce na Terra */
const LISTA_CEN = ['apollo11', 'artemis1'];   /* tripuladas: a Terra gira ancorada */

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

/* a passada CENICA (r231): mesma pagina, ?cen=<id> e sem &escala=real */
const PROBE_CEN = `
    if(typeof ACT === 'undefined' || !ACT || ACT.kind !== 'system') return;
    if(window.__fase === undefined){ window.__fase = 0; window.__tq = 0; }
    window.__tq++;
    if(window.__fase === 0){
      if(window.__tq < 3) return;
      TUT.v.add('linhadotempo'); TUT.v.add('boasvindas');
      const boot = document.getElementById('boot'); if(boot) boot.style.display = 'none';
      const tut = document.getElementById('tut'); if(tut) tut.style.display = 'none';
      window.__fase = 1;
      return;
    }
    if(window.__fase === 1){
      const id = new URLSearchParams(location.search).get('cen') || 'apollo11';
      ST.mapCard = {type:'body', id, act:'focus', t:0};
      try{ trajStart(id); }catch(err){ window.__res = 'CEN ' + id + ' QUEBROU=' + err.message.slice(0, 40); return; }
      if(!TRAJ || TRAJ.id !== id){ window.__res = 'CEN ' + id + ' NAOINICIOU=1'; return; }
      window.__id = id; window.__fr = 0; window.__fase = 2;
      return;
    }
    if(window.__fase === 2){
      if(window.__rafCb && window.__fr < 8){ window.__fr++; try{ window.__rafCb(performance.now()); }catch(err){} return; }
      const id = window.__id;
      const pkT = ACT.pickables.find(x=>x.userData && x.userData.id === 'terra');
      const vT = new THREE.Vector3(); if(pkT) pkT.getWorldPosition(vT);
      const rT = pkT ? pkT.userData.r : -1;
      const v1 = new THREE.Vector3(); trajPonto(1, v1);
      const fim = v1.distanceTo(vT);
      /* a Florida: qual longitude da textura aponta para o azimute do lancamento */
      let lon = 999, esp = 999;
      if(TRAJ.terraGiro && TRAJ.lancAz !== undefined){
        const mesh = TRAJ.terraGiro.mesh; mesh.updateWorldMatrix(true, false);
        const inv = new THREE.Matrix4().copy(mesh.matrixWorld).invert();
        const vAz = new THREE.Vector3(Math.cos(TRAJ.lancAz), 0, Math.sin(TRAJ.lancAz)).transformDirection(inv);
        lon = Math.atan2(-vAz.z, vAz.x)*180/Math.PI;
        esp = -80.6 - 360*(TRAJ.ano1 - TRAJ.ano0)*TRAJ.prog;
      }
      let dlon = ((lon - esp) % 360 + 540) % 360 - 180;
      const lm = TRAJ.luaViz ? TRAJ.luaViz.material : null;
      const ul = (lm && lm.uniforms && lm.uniforms.uL) ? lm.uniforms.uL.value.length() : -1;
      const reg = (TRAJ.luaViz && ACT.solLuz) ? (ACT.solLuz.some(x=>x.mesh === TRAJ.luaViz) ? 1 : 0) : 0;
      const mats = []; let nave = 0;
      if(TRAJ.corpoTemp){ nave = TRAJ.corpoTemp.visible ? 1 : 0; TRAJ.corpoTemp.traverse(o=>{ if(o.isMesh && o.material && !mats.includes(o.material.type)) mats.push(o.material.type); }); }
      window.__res = 'CEN ' + id + ' DLON=' + (lon === 999 ? 'x' : dlon.toFixed(1)) + ' D=' + (TRAJ.luaD || -1).toFixed(3) + ' RT=' + rT.toFixed(3)
        + ' FIM=' + fim.toFixed(3) + ' UL=' + ul.toFixed(3) + ' REG=' + reg + ' NAVE=' + nave + ' MATS=' + (mats.join('+') || 'x') + ' CAM=' + CAM.dist.toFixed(2);
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
    if(new URLSearchParams(location.search).get('cen')){
` + PROBE_CEN + `
    } else {
` + PROBE + `
    }
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
const soCen = alvo && alvo.startsWith('cen:');
const fila = alvo ? (soCen ? [] : [alvo]) : LISTA;
const filaCen = alvo ? (soCen ? [alvo.slice(4)] : []) : LISTA_CEN;
const perfil = path.join(require('os').tmpdir(), 'universatlas-missoes');
let falhas = 0;

/* uma instancia de Chrome por missao, GPU REAL, escadinha de tempo virtual */
function roda(query, hash, marca, perfilId){
  let titulo = '';
  const ORCS = [14000, 16000, 15000, 17000];
  for(let tent = 0; tent < 4 && !titulo.includes(marca); tent++){
    let saida = '';
    try{
      saida = cp.execSync('"' + chrome + '" --headless=new --no-sandbox'
        + ' --user-data-dir="' + perfil + perfilId + tent + '" --window-size=900,700 --virtual-time-budget=' + ORCS[tent]
        + ' --dump-dom "file:///' + pagina.replace(/\\/g, '/') + '?' + query + '#' + hash + '"',
        {timeout: 160000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
    }catch(e){ saida = e.stdout || ''; }
    const m = String(saida).match(new RegExp('<title>(' + marca + '[^<]*)<\\/title>'));
    if(m) titulo = m[1];
  }
  return titulo;
}

if(fila.length) console.log('AUDITORIA DAS MISSOES (1:1) · ' + fila.length + ' missoes\n');
for(const id of fila){
  const titulo = roda('aud=' + id, 'sistema=sol&escala=real', 'AUD', id);
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

/* ---- a passada CENICA (r231) ---- */
if(filaCen.length) console.log('\nAUDITORIA DAS MISSOES (CENICO) · ' + filaCen.length + ' missoes\n');
for(const id of filaCen){
  const titulo = roda('cen=' + id, 'sistema=sol', 'CEN', 'c' + id);
  if(!titulo){ console.log('  FALHA ' + id + ': sem resposta do headless (cena cenica: precisa de GPU real)'); falhas++; continue; }
  const g = k => { const m = titulo.match(new RegExp(k + '=([-0-9.a-zA-Z+]+)')); return m ? m[1] : null; };
  if(g('QUEBROU') || g('NAOINICIOU') || g('ERRO')){ console.log('  FALHA ' + id + ': ' + titulo); falhas++; continue; }
  const dlon = g('DLON'), D = parseFloat(g('D')), rT = parseFloat(g('RT')), fim = parseFloat(g('FIM'));
  const ul = parseFloat(g('UL')), reg = g('REG') === '1', nave = g('NAVE') === '1', mats = g('MATS'), cam = parseFloat(g('CAM'));
  const probs = [];
  if(dlon === 'x') probs.push('sem a ancora da Florida'); else if(Math.abs(parseFloat(dlon)) > 6) probs.push('lancamento fora do Cabo (dlon ' + dlon + ')');
  if(!(Math.abs(D - 2.6) < 0.05)) probs.push('rota fora da escala cenica (D=' + D + ', esperado 2.6)');
  if(!(fim >= rT*0.98 && fim <= rT*1.35)) probs.push('splashdown fora da superficie (fim ' + fim + ', raio ' + rT + ')');
  if(!(Math.abs(ul - 1) < 0.02)) probs.push('luz da Lua da missao morta (|uL|=' + ul + ')');
  if(!reg) probs.push('Lua da missao fora da varredura de luz');
  if(!nave) probs.push('nave ausente');
  if(mats !== 'MeshBasicMaterial') probs.push('nave com material que precisa de luz (' + mats + ')');
  if(!(cam <= 9.5)) probs.push('camera longe (' + cam + ')');
  const ok = probs.length === 0;
  if(!ok) falhas++;
  console.log('  ' + (ok ? 'ok    ' : 'FALHA ') + id.padEnd(12) + ' dlon=' + String(dlon).padEnd(5) + ' D=' + D + ' fim=' + fim + '/' + rT
    + ' uL=' + ul + ' reg=' + (reg ? 1 : 0) + ' nave=' + (nave ? 1 : 0) + ' cam=' + cam + (probs.length ? ('  << ' + probs.join(' · ')) : ''));
}

try{ fs.unlinkSync(pagina); }catch(e){}
console.log('\n' + (falhas ? ('FALHAS: ' + falhas) : 'Missoes integras.'));
process.exit(falhas ? 1 : 0);
