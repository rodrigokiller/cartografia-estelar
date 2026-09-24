/* r316 · a sonda das missões lunares (usada por tools/missoes.js): a base debaixo da decolagem, o pouso no lugar da Lua desenhada, a amerissagem, o eixo da Terra */
window.__fase = window.__fase || 0; window.__d = window.__d || {}; var D = window.__d;
var IDS = (window.__ids = window.__ids || ['apollo11', 'apollo8', 'apollo13', 'apollo17', 'luna9', 'luna16', 'change4', 'artemis1', 'artemis2', 'slim']);
var BASE = {apollo8:[28.608, -80.604], apollo11:[28.608, -80.604], apollo13:[28.608, -80.604], apollo17:[28.608, -80.604], luna9:[45.996, 63.564], luna16:[46.059, 62.983], change4:[28.246, 102.027], artemis1:[28.627, -80.621], artemis2:[28.627, -80.621], slim:[30.401, 130.978]};
var MAR = {apollo8:[8.10, -165.00], apollo11:[13.30, -169.15], apollo13:[-21.63, -165.37], apollo17:[-17.88, -166.11], luna16:[47.4, 68.6], artemis1:[27.34852, -118.10181], artemis2:[32.34, -117.76]};
function terraMesh(){ const oo = ACT.objs.find(x=>x.id === 'terra'); const lv = ACT.liveGiro.find(x=>x.grupo === oo.corpo); return lv; }
function giraTerra(){ const lv = terraMesh(); if(lv && lv.grupo.userData.eqJ2000){ lv.mesh.rotation.set(0, localGMST(SIMT.data + (TRAJ ? TRAJ.spinMs || 0 : 0))*Math.PI/180, 0); lv.mesh.updateMatrixWorld(true); } return lv; }
function pontoTerra(lat, lon){ const lv = giraTerra(); const r = lv.mesh.geometry.parameters.radius, la = lat*Math.PI/180, lo = lon*Math.PI/180;
  return lv.mesh.localToWorld(new THREE.Vector3(Math.cos(la)*Math.cos(lo)*r, Math.sin(la)*r, -Math.cos(la)*Math.sin(lo)*r)); }
function pontoLua(lat, lon){ const m = TRAJ.luaViz; m.updateMatrixWorld(true); const r = m.geometry.parameters.radius, la = lat*Math.PI/180, lo = lon*Math.PI/180;
  return m.localToWorld(new THREE.Vector3(Math.cos(la)*Math.cos(lo)*r, Math.sin(la)*r, -Math.cos(la)*Math.sin(lo)*r)); }
function km(d){ return TRAJ.geoPal.lin ? Math.round(d/TRAJ.geoPal.lin) + ' km' : (d/TRAJ.geoPal.Rd).toFixed(3) + ' Rd'; }
if(window.__fase === 0){
  if(typeof ACT === 'undefined' || !ACT || !ACT.scene || !ACT.pickables || !ACT.liveGiro) return;
  try{ TUT.v.add('boasvindas'); TUT.v.add('linhadotempo'); }catch(e){}
  D.modo = ACT.escr ? '1:1' : 'cenico'; D.out = {}; window.__k = 0;
  /* o eixo da Terra: o Y do grupo no mundo contra o polo celeste da eclíptica J2000 na cena */
  { const lv = terraMesh(), y = new THREE.Vector3(0, 1, 0); lv.grupo.updateMatrixWorld(true); y.transformDirection(lv.grupo.matrixWorld);
    const e = 23.4392911*Math.PI/180; D.eixo = (Math.acos(Math.min(1, y.dot(new THREE.Vector3(0, Math.cos(e), -Math.sin(e)))))*180/Math.PI).toFixed(3) + ' graus do polo';
    /* o ponto subsolar: a longitude de Greenwich ao meio-dia UTC tem que olhar para o Sol */
    const ms = Date.UTC(2026, 8, 24, 12, 0, 0); const sp = SIMT.data; SIMT.data = ms; ACT.tempoViagem(0);
    lv.mesh.rotation.set(0, localGMST(ms)*Math.PI/180, 0); lv.mesh.updateMatrixWorld(true);
    const c = new THREE.Vector3(); lv.grupo.getWorldPosition(c); const sol = c.clone().negate().normalize();
    const g0 = lv.mesh.localToWorld(new THREE.Vector3(lv.mesh.geometry.parameters.radius, 0, 0)).sub(c).normalize();
    /* ao meio-dia UTC, Greenwich fica a menos de 4 graus (a equação do tempo) do meridiano do Sol */
    const polo = new THREE.Vector3(0, 1, 0).transformDirection(lv.grupo.matrixWorld);
    const gP = g0.clone().sub(polo.clone().multiplyScalar(g0.dot(polo))).normalize(), sP = sol.clone().sub(polo.clone().multiplyScalar(sol.dot(polo))).normalize();
    D.meioDia = (Math.acos(Math.min(1, gP.dot(sP)))*180/Math.PI).toFixed(2) + ' graus entre Greenwich e o Sol (equinócio)';
    D.latSol = (Math.asin(sol.dot(polo))*180/Math.PI).toFixed(2) + ' graus (latitude do Sol em 24 SET)';
    SIMT.data = sp; ACT.tempoLivre(); }
  window.__fase = 1; D.t = performance.now();
} else if(window.__fase === 1){
  if(performance.now() - D.t < 800) return;
  const id = IDS[window.__k];
  if(!id){ D.erros = (window.__err||[]).length; D.primeiroErro = (window.__err||[])[0] || ''; window.__res = 'OK · ' + JSON.stringify(D); return; }
  if(!(TRAJ && TRAJ.id === id && TRAJ.geo)){
    if(!D['pedi_' + id]){ D['pedi_' + id] = 1; if(TRAJ) trajLimpar(); ACTION('focus', id); trajStart(id); D.t = performance.now(); }
    else if(performance.now() - D.t > 30000){ D.out[id] = 'NAO INICIOU ' + (TRAJ ? 'traj sem geo' : 'sem traj'); window.__k++; D.t = performance.now(); }
    return;
  }
  const G = TRAJ.geo, v = new THREE.Vector3(), r = {pts:G.g.length/4, seg:(G.seg || []).length};
  /* a decolagem: a nave no instante zero contra a base na Terra girada para a mesma hora */
  geoPasso(0); trajPonto(0, v); const b = BASE[id]; r.base = km(v.distanceTo(pontoTerra(b[0], b[1])));
  /* o pouso (robôs: a própria nave; Apollo: o módulo) */
  if(G.ev && G.ev.pouso !== undefined && G.pouso){
    const msP = (G.jd0 + G.ev.pouso - 2440587.5)*86400000 + 60000, pr = trajProgDeMs(msP);
    geoPasso(pr); let alvo;
    if(TRAJ.lmSpr && TRAJ.lmSpr.visible){ TRAJ.lmSpr.getWorldPosition(v); alvo = 'modulo'; } else { trajPonto(pr, v); alvo = 'nave'; }
    r.pouso = alvo + ' a ' + km(v.distanceTo(pontoLua(G.pouso.lat, G.pouso.lon))) + ' do local na Lua desenhada';
  }
  /* a amerissagem */
  if(MAR[id]){ geoPasso(1); trajPonto(1, v); const m = MAR[id]; r.mar = km(v.distanceTo(pontoTerra(m[0], m[1]))); }
  /* no cênico: a nave nunca entra na Lua desenhada; no 1:1, nunca abaixo do chão (tirando o pouso) */
  { let pior = 1e9, tPior = 0; const c = new THREE.Vector3();
    for(let i = 0; i <= 3000; i++){ const pr = i/3000; geoPasso(pr); trajPonto(pr, v); TRAJ.luaViz.getWorldPosition(c);
      const dd = v.distanceTo(c)/TRAJ.luaViz.geometry.parameters.radius; if(dd < pior){ pior = dd; tPior = pr; } }
    r.menorDistLua = pior.toFixed(3) + ' raios da Lua desenhada (prog ' + tPior.toFixed(3) + ')'; }
  r.marcos = (TRAJ._mk || []).length;
  D.out[id] = r;
  trajLimpar();
  window.__k++; D.t = performance.now();
}
