/* r316 · a sonda das rotas do JPL (usada por tools/missoes.js): em cada marco de sobrevoo, a sonda está no planeta desenhado? */
window.__fase = window.__fase || 0; window.__d = window.__d || {}; var D = window.__d;
var IDS = (window.__ids = window.__ids || ['voyager1', 'voyager2', 'pioneer10', 'newhorizons', 'cassini', 'pathfinder', 'viking1', 'juice', 'clipper', 'lucy', 'parker', 'halley', 'p67', 'oumuamua', 'atlas3i', 'tsuchinshan']);
if(window.__fase === 0){
  if(typeof ACT === 'undefined' || !ACT || !ACT.scene || !ACT.pickables) return;
  try{ TUT.v.add('boasvindas'); TUT.v.add('linhadotempo'); }catch(e){}
  D.modo = ACT.escr ? '1:1' : 'cenico'; D.out = {}; window.__k = 0;
  window.__fase = 1; D.t = performance.now();
} else if(window.__fase === 1){
  if(performance.now() - D.t < 1200) return;
  const id = IDS[window.__k];
  if(!id){ D.erros = (window.__err||[]).length; D.primeiroErro = (window.__err||[])[0] || ''; window.__res = 'OK · ' + JSON.stringify(D); return; }
  if(!(TRAJ && TRAJ.id === id)){
    if(!D['pedi_' + id]){ D['pedi_' + id] = 1; if(TRAJ) trajLimpar(); ACTION('focus', id); trajStart(id); D.t = performance.now(); }
    else if(performance.now() - D.t > 25000){ D.out[id] = 'NAO INICIOU'; window.__k++; }
    return;
  }
  if(!TRAJ.efem){ D.out[id] = 'sem efem (caminho antigo)'; trajLimpar(); window.__k++; return; }
  const U = ACT.escr ? 15 : 1, v = new THREE.Vector3(), w = new THREE.Vector3();
  const ALVO = {'JÚPITER':'jupiter','SATURNO':'saturno','URANO':'urano','NETUNO':'netuno','PLUTÃO':'plutao','SOBREVOO DE JÚPITER':'jupiter','CHEGADA A SATURNO':'saturno','VÊNUS':'venus','VÊNUS DE NOVO':'venus','A TERRA':'terra','A TERRA DE NOVO':'terra','ÓRBITA DE MARTE':'marte','POUSO NOS AIRBAGS':'marte','POUSO · CHRYSE PLANITIA':'marte','MARTE':'marte','LANÇAMENTO':'terra','LANÇAMENTO · TITAN-CENTAUR':'terra','DINKINESH':'dinkinesh','VÊNUS 1':'venus','VÊNUS 7':'venus','A TERCEIRA TERRA':'terra','EURÍBATES':'eurybates','PÁTROCLO E MENÉCIO':'patroclus','A DUPLA CATAPULTA':'lua'};
  function posCorpo(c){ const pk = ACT.pickables.find(x=>x.userData && x.userData.id === c && x.userData.act === 'focus'); if(!pk) return null; pk.getWorldPosition(w); return w.clone(); }
  const r = {efemPts:TRAJ.efem.h.length/4, zonas:(TRAJ.efem.enc||[]).map(e=>e.c + ' ' + e.dmin + 'km').join(', '), trilha:TRAJ.trilhaP ? TRAJ.trilhaP.length : 0, marcos:[]};
  for(const m of (TRAJ.marcos || [])){
    const ms = marcoMs(m); if(ms < TRAJ.ms0 || ms > TRAJ.ms1) continue;
    const pr = trajProgDeMs(ms);
    ACT.tempoViagem((trajMs(pr) - SIMT.data)/MS_ANO);
    trajPonto(pr, v);
    const c = ALVO[m[1]];
    const pp = c ? posCorpo(c) : null;
    let dtxt = '';
    if(pp){ const d = v.distanceTo(pp); dtxt = ' · ao ' + c + ' ' + (ACT.escr ? Math.round(d/U*AU_KM).toLocaleString('pt-BR') + ' km' : d.toFixed(2) + ' un (raio ' + ((ALLBODIES[c] && ALLBODIES[c].sys) ? ALLBODIES[c].sys.size : '?') + ')'); }
    r.marcos.push(m[0] + ' ' + m[1] + dtxt);
  }
  trajPonto(1, v); r.fim = (+((Math.atan2(-v.z, v.x)*180/Math.PI + 360) % 360).toFixed(2)) + '/' + (Math.asin(v.y/v.length())*180/Math.PI).toFixed(2) + ' r ' + (v.length()/U).toFixed(2);
  r.progDoMarco = (TRAJ._mk || []).map(x=>x.toFixed(3)).join(' ');
  D.out[id] = r;
  trajLimpar();
  window.__k++; D.t = performance.now();
}
