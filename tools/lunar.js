/* AS MISSÕES LUNARES DE VERDADE (r315): cada missão é resolvida pela física, com os horários oficiais.
   Uso: node tools/lunar.js [id ...]      (sem id: todas)
   Grava efem/<id>.js no mesmo formato das sondas, mas GEOCÊNTRICO:
     jd0        o JD (UTC) do lançamento
     g          [t, x, y, z, ...] a nave em km, eclíptica J2000, a Terra na origem (t em dias desde jd0)
     m          [t, x, y, z, ...] a Lua em km (a mesma série do JPL que a integração usou)
     lm         [t, x, y, z, ...] o módulo lunar quando existe (descida, solo e subida), km geocêntricos
     ev         {nome: dia} os instantes-chave (injeção, chegada, pouso, decolagem, volta, reentrada)
   Artemis I, Artemis II e SLIM têm a trajetória real no JPL Horizons (-1023, -1024, -240): entram direto.
   As outras (Apollo 8, 11, 13, 17, Luna 9, 16 e Chang'e 4) não têm trajetória pública em forma de vetores:
   a rota é INTEGRADA (Terra, Lua e Sol como massas pontuais, a Lua e o Sol nas posições do JPL) e as
   manobras são resolvidas para cumprir os horários e lugares oficiais:
     · estacionamento: órbita circular no plano do lançamento (latitude da base e azimute do voo)
     · injeção translunar: impulso resolvido por Newton para chegar ao ponto de captura na hora da chegada
     · órbita lunar: circular, RETRÓGRADA (as Apollo davam a volta de leste para oeste sobre o lado visível),
       no plano que passa pelo local de pouso, e na fase que põe a nave sobre ele no instante do pouso
     · volta: impulso resolvido para chegar à reentrada, sobre o ponto da amerissagem, na hora oficial */
const fs = require('fs'), path = require('path');
const BASE = 'https://ssd.jpl.nasa.gov/api/horizons.api';
const MU_T = 398600.4418, MU_L = 4902.800066, MU_S = 1.32712440018e11;   /* km^3/s^2 */
const R_T = 6378.137, R_L = 1737.4, EPS = 23.4392911*Math.PI/180, D2R = Math.PI/180, DIA = 86400;
let ultimo = 0;
async function espera(){ const d = Date.now() - ultimo; if(d < 700) await new Promise(r=>setTimeout(r, 700 - d)); ultimo = Date.now(); }
async function horizons(par){
  const p = new URLSearchParams(); p.set('format', 'text');
  for(const [k, v] of Object.entries(par)) p.set(k, "'" + v + "'");
  for(let i = 0; i < 4; i++){
    await espera();
    try{ const r = await fetch(BASE + '?' + p.toString()); const t = await r.text(); if(r.status === 503 || r.status === 429){ await new Promise(r=>setTimeout(r, 4000)); continue; } return t; }
    catch(e){ await new Promise(r=>setTimeout(r, 3000)); }
  }
  throw new Error('Horizons não respondeu');
}
const jdDe = s => Date.parse(s.replace(' ', 'T') + (s.length <= 10 ? 'T00:00' : '') + (s.length > 16 ? 'Z' : ':00Z'))/86400000 + 2440587.5;
const txtDe = jd => new Date((jd - 2440587.5)*86400000).toISOString().slice(0, 19).replace('T', ' ');
/* vetores geocêntricos com velocidade (km, km/s), eclíptica J2000 */
async function geo(cmd, jdA, jdB, passoMin){
  const out = [];
  let a = jdA;
  while(a < jdB - 1e-9){
    const b = Math.min(jdB, a + passoMin*18000/1440);
    const t = await horizons({COMMAND:cmd, OBJ_DATA:'NO', MAKE_EPHEM:'YES', EPHEM_TYPE:'VECTORS', CENTER:'500@399', REF_PLANE:'ECLIPTIC',
      REF_SYSTEM:'J2000', OUT_UNITS:'KM-S', VEC_TABLE:'2', TIME_TYPE:'UT', START_TIME:txtDe(a).slice(0, 16), STOP_TIME:txtDe(b).slice(0, 16), STEP_SIZE:passoMin + ' m', CSV_FORMAT:'YES'});
    const i = t.indexOf('$$SOE'), j = t.indexOf('$$EOE');
    if(i < 0 || j < 0) throw new Error('sem vetores ' + cmd + ': ' + t.slice(0, 300));
    for(const l of t.slice(i + 5, j).trim().split(/\r?\n/).filter(Boolean)){
      const c = l.split(',').map(s=>s.trim());
      const s = {jd:+c[0], x:+c[2], y:+c[3], z:+c[4], vx:+c[5], vy:+c[6], vz:+c[7]};
      if(!out.length || s.jd > out[out.length - 1].jd + 1e-9) out.push(s);
    }
    a = b;
  }
  return out;
}
/* Hermite cúbico com as velocidades: a Lua anda 1 km/s, e o erro em 20 min fica em metros */
function hermite(S, jd){
  let lo = 0, hi = S.length - 1;
  if(jd <= S[0].jd) hi = 1; else if(jd >= S[hi].jd) lo = hi - 1;
  else while(hi - lo > 1){ const m = (lo + hi) >> 1; if(S[m].jd <= jd) lo = m; else hi = m; }
  const A = S[lo], B = S[hi], h = (B.jd - A.jd)*DIA, u = (jd - A.jd)*DIA/h;
  const h00 = 2*u*u*u - 3*u*u + 1, h10 = u*u*u - 2*u*u + u, h01 = -2*u*u*u + 3*u*u, h11 = u*u*u - u*u;
  return [h00*A.x + h10*h*A.vx + h01*B.x + h11*h*B.vx, h00*A.y + h10*h*A.vy + h01*B.y + h11*h*B.vy, h00*A.z + h10*h*A.vz + h01*B.z + h11*h*B.vz];
}
function velH(S, jd){ const e = 1/86400; const a = hermite(S, jd - e), b = hermite(S, jd + e); return [(b[0] - a[0])/2, (b[1] - a[1])/2, (b[2] - a[2])/2]; }
const add = (a, b)=>[a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub = (a, b)=>[a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, k)=>[a[0]*k, a[1]*k, a[2]*k], dot = (a, b)=>a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
const crs = (a, b)=>[a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
const nrm = a=>Math.hypot(a[0], a[1], a[2]), uni = a=>mul(a, 1/nrm(a));
function rotEixo(v, k, ang){ const c = Math.cos(ang), s = Math.sin(ang); return add(add(mul(v, c), mul(crs(k, v), s)), mul(k, dot(k, v)*(1 - c))); }
/* a Terra girando: ECEF -> equatorial (GMST, IAU 1982; precessão e nutação de fora: décimos de grau) -> eclíptica J2000 */
function gmst(jd){ const T = (jd - 2451545)/36525; return ((280.46061837 + 360.98564736629*(jd - 2451545) + 0.000387933*T*T - T*T*T/38710000) % 360 + 360) % 360*D2R; }
const eqParaEcl = v=>[v[0], v[1]*Math.cos(EPS) + v[2]*Math.sin(EPS), -v[1]*Math.sin(EPS) + v[2]*Math.cos(EPS)];
function sitioTerra(lat, lon, jd, alt){
  const r = R_T + (alt || 0), th = gmst(jd) + lon*D2R;
  return eqParaEcl([r*Math.cos(lat*D2R)*Math.cos(th), r*Math.cos(lat*D2R)*Math.sin(th), r*Math.sin(lat*D2R)]);
}
/* a Lua girando (IAU, os termos lineares, como o planetário do app): selenográfico -> eclíptica J2000 */
function sitioLua(lat, lon, jd, alt){
  const d = jd - 2451545, a0 = 269.9949*D2R, d0 = 66.5392*D2R, W = (38.3213 + 13.17635815*d)*D2R;
  const r = R_L + (alt || 0), la = lat*D2R, lo = lon*D2R + W;
  const b = [Math.cos(la)*Math.cos(lo), Math.cos(la)*Math.sin(lo), Math.sin(la)];
  /* o corpo -> ICRF: Rz(a0 + 90) Rx(90 - d0) */
  const ca = Math.cos(a0 + Math.PI/2), sa = Math.sin(a0 + Math.PI/2), cd = Math.cos(Math.PI/2 - d0), sd = Math.sin(Math.PI/2 - d0);
  const x1 = b[0], y1 = b[1]*cd - b[2]*sd, z1 = b[1]*sd + b[2]*cd;
  return mul(eqParaEcl([x1*ca - y1*sa, x1*sa + y1*ca, z1]), r);
}
/* ---------- a física: Terra, Lua e Sol ---------- */
let LUA = null, SOL = null, LAMB = 1;   /* LAMB: a fração da massa da Lua ligada (a continuação do Newton) */
function acel(r, jd){
  const m = hermite(LUA, jd), s = hermite(SOL, jd);
  const rr = nrm(r), d = sub(m, r), dd = nrm(d), dm = nrm(m), q = sub(s, r), dq = nrm(q), ds = nrm(s);
  const a = mul(r, -MU_T/(rr*rr*rr));
  const b = sub(mul(d, LAMB*MU_L/(dd*dd*dd)), mul(m, LAMB*MU_L/(dm*dm*dm)));
  const c = sub(mul(q, MU_S/(dq*dq*dq)), mul(s, MU_S/(ds*ds*ds)));
  return add(add(a, b), c);
}
/* RK4 com passo pelo corpo mais perto (1/400 do período local): perto da Lua o passo encolhe sozinho */
function integra(r0, v0, jdA, jdB, amostra){
  let r = r0.slice(), v = v0.slice(), jd = jdA;
  const dir = jdB >= jdA ? 1 : -1;
  const pts = [];
  if(amostra) pts.push([jd, r[0], r[1], r[2]]);
  let prox = amostra ? jd + dir*amostra : null;
  while(dir*(jdB - jd) > 1e-12){
    const m = hermite(LUA, jd);
    const dT = nrm(r), dL = nrm(sub(r, m));
    const pT = Math.sqrt(dT*dT*dT/MU_T), pL = Math.sqrt(dL*dL*dL/MU_L);
    let h = (LAMB > 0 ? Math.min(pT, pL) : pT)/400;
    h = Math.max(1, Math.min(h, 1800));
    h = Math.min(h, dir*(jdB - jd)*DIA)*dir;
    const hd = h/DIA;
    const k1v = acel(r, jd), k1r = v;
    const r2 = add(r, mul(k1r, h/2)), v2 = add(v, mul(k1v, h/2)), k2v = acel(r2, jd + hd/2), k2r = v2;
    const r3 = add(r, mul(k2r, h/2)), v3 = add(v, mul(k2v, h/2)), k3v = acel(r3, jd + hd/2), k3r = v3;
    const r4 = add(r, mul(k3r, h)), v4 = add(v, mul(k3v, h)), k4v = acel(r4, jd + hd), k4r = v4;
    r = add(r, mul(add(add(k1r, mul(k2r, 2)), add(mul(k3r, 2), k4r)), h/6));
    v = add(v, mul(add(add(k1v, mul(k2v, 2)), add(mul(k3v, 2), k4v)), h/6));
    jd += hd;
    if(amostra && dir*(jd - prox) >= 0){ pts.push([jd, r[0], r[1], r[2]]); prox += dir*amostra; }
  }
  if(amostra && pts[pts.length - 1][0] !== jd) pts.push([jd, r[0], r[1], r[2]]);
  return {r, v, pts};
}
/* Newton com jacobiano numérico: acha o impulso que leva de (r0, v0 + dv) em jdA ao alvo em jdB */
function mira(r0, v0, dv0, jdA, jdB, alvo, tol, rotulo){
  let dv = dv0.slice();
  for(let it = 0; it < 40; it++){
    const f0 = sub(integra(r0, add(v0, dv), jdA, jdB).r, alvo(jdB));
    const err = nrm(f0);
    if(err < tol){ console.log('  ' + rotulo + ': ' + it + ' iterações, erro ' + err.toFixed(2) + ' km, impulso ' + (nrm(dv)*1000).toFixed(1) + ' m/s'); return dv; }
    const J = [], e = 1e-4;
    for(let k = 0; k < 3; k++){ const d2 = dv.slice(); d2[k] += e; J.push(mul(sub(sub(integra(r0, add(v0, d2), jdA, jdB).r, alvo(jdB)), f0), 1/e)); }
    /* resolve J * x = -f0 (J em colunas) */
    const M = [[J[0][0], J[1][0], J[2][0]], [J[0][1], J[1][1], J[2][1]], [J[0][2], J[1][2], J[2][2]]];
    const det = M[0][0]*(M[1][1]*M[2][2] - M[1][2]*M[2][1]) - M[0][1]*(M[1][0]*M[2][2] - M[1][2]*M[2][0]) + M[0][2]*(M[1][0]*M[2][1] - M[1][1]*M[2][0]);
    const inv = [[(M[1][1]*M[2][2] - M[1][2]*M[2][1])/det, (M[0][2]*M[2][1] - M[0][1]*M[2][2])/det, (M[0][1]*M[1][2] - M[0][2]*M[1][1])/det],
                 [(M[1][2]*M[2][0] - M[1][0]*M[2][2])/det, (M[0][0]*M[2][2] - M[0][2]*M[2][0])/det, (M[0][2]*M[1][0] - M[0][0]*M[1][2])/det],
                 [(M[1][0]*M[2][1] - M[1][1]*M[2][0])/det, (M[0][1]*M[2][0] - M[0][0]*M[2][1])/det, (M[0][0]*M[1][1] - M[0][1]*M[1][0])/det]];
    let x = [-(inv[0][0]*f0[0] + inv[0][1]*f0[1] + inv[0][2]*f0[2]), -(inv[1][0]*f0[0] + inv[1][1]*f0[1] + inv[1][2]*f0[2]), -(inv[2][0]*f0[0] + inv[2][1]*f0[1] + inv[2][2]*f0[2])];
    /* passo amortecido: nunca mais que 300 m/s de uma vez */
    const nx = nrm(x); if(nx > 0.3) x = mul(x, 0.3/nx);
    dv = add(dv, x);
  }
  throw new Error(rotulo + ': Newton não convergiu');
}
/* a trajetória com os ESTADOS (posição e velocidade) a cada amostra */
function trajetoria(r0, v0, jdA, jdB, amostra){
  const out = [{jd:jdA, r:r0.slice(), v:v0.slice()}];
  let r = r0, v = v0, jd = jdA;
  while(jd < jdB - 1e-12){
    const jn = Math.min(jdB, jd + amostra);
    const p = integra(r, v, jd, jn);
    r = p.r; v = p.v; jd = jn;
    out.push({jd, r:r.slice(), v:v.slice()});
  }
  return out;
}
/* a maior aproximação de um corpo (série do JPL, ou null = a Terra) entre jdA e jdB: amostra de 10 min, parábola, e o estado exato */
function maisPerto(r0, v0, jdA, jdB, corpo){
  const T = trajetoria(r0, v0, jdA, jdB, 10/1440);
  const dist = e=>nrm(sub(e.r, corpo ? hermite(corpo, e.jd) : [0, 0, 0]));
  let k = 0; for(let i = 1; i < T.length; i++) if(dist(T[i]) < dist(T[k])) k = i;
  let jc = T[k].jd;
  if(k > 0 && k < T.length - 1){
    const a = dist(T[k - 1]), b = dist(T[k]), c = dist(T[k + 1]), den = a - 2*b + c;
    if(den > 0) jc = T[k].jd + 0.5*(a - c)/den*(10/1440);
  }
  const base = T[k - 1 >= 0 ? k - 1 : k];
  const st = integra(base.r, base.v, base.jd, jc);
  const rc = corpo ? hermite(corpo, jc) : [0, 0, 0], vc = corpo ? velH(corpo, jc) : [0, 0, 0];
  return {jd:jc, r:st.r, v:st.v, rr:sub(st.r, rc), vr:sub(st.v, vc)};
}
/* Newton em N dimensões: x (N) -> resíduo (N) */
function newtonN(fun, x0, rotulo, opt){
  opt = opt || {};
  let x = x0.slice(); const N = x.length;
  const tol = opt.tol || 1e-6, eps = opt.eps || 1e-4, pmax = opt.passoMax || 0.2;
  const norma = v=>Math.sqrt(v.reduce((a, c)=>a + c*c, 0));
  for(let it = 0; it < (opt.maxIt || 60); it++){
    const f0 = fun(x), err = norma(f0);
    if(err < tol){ console.log('  ' + rotulo + ': ' + it + ' iterações, resíduo ' + err.toExponential(2)); return x; }
    const A = [];
    for(let i = 0; i < N; i++) A.push(new Array(N + 1).fill(0));
    for(let k = 0; k < N; k++){ const x2 = x.slice(); x2[k] += eps; const f2 = fun(x2); for(let i = 0; i < N; i++) A[i][k] = (f2[i] - f0[i])/eps; }
    for(let i = 0; i < N; i++) A[i][N] = -f0[i];
    for(let c = 0; c < N; c++){
      let p = c; for(let r = c + 1; r < N; r++) if(Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      [A[c], A[p]] = [A[p], A[c]];
      if(Math.abs(A[c][c]) < 1e-30) throw new Error(rotulo + ': jacobiano singular');
      for(let r = 0; r < N; r++){ if(r === c) continue; const k = A[r][c]/A[c][c]; for(let q = c; q <= N; q++) A[r][q] -= k*A[c][q]; }
    }
    let d = A.map((row, i)=>row[N]/row[i]);
    const nd = norma(d); if(nd > pmax) d = d.map(v=>v*pmax/nd);
    let a = 1, melhor = null;
    for(let t = 0; t < 6; t++){ const xt = x.map((v, i)=>v + d[i]*a), et = norma(fun(xt)); if(et < err){ melhor = xt; break; } a *= 0.5; }
    x = melhor || x.map((v, i)=>v + d[i]*a);
  }
  throw new Error(rotulo + ': Newton não convergiu');
}
/* Levenberg-Marquardt: x (N) -> resíduo (M), mínimos quadrados amortecidos; devolve {x, err} (não lança) */
function levmar(fun, x0, opt){
  opt = opt || {};
  const eps = opt.eps || 2e-5, tol = opt.tol || 1e-6, pmax = opt.passoMax || 0.1;
  let x = x0.slice(), f = fun(x), err = Math.sqrt(f.reduce((a, c)=>a + c*c, 0)), lam = 1e-3;
  const N = x.length, M = f.length;
  for(let it = 0; it < (opt.maxIt || 80) && err > tol; it++){
    const J = [];
    for(let k = 0; k < N; k++){ const x2 = x.slice(); x2[k] += eps; const f2 = fun(x2); J.push(f2.map((v, i)=>(v - f[i])/eps)); }
    const A = [], g = [];
    for(let a = 0; a < N; a++){ A.push([]); for(let b = 0; b < N; b++){ let sm = 0; for(let i = 0; i < M; i++) sm += J[a][i]*J[b][i]; A[a].push(sm); } let sg = 0; for(let i = 0; i < M; i++) sg += J[a][i]*f[i]; g.push(-sg); }
    let melhorou = false;
    for(let tent = 0; tent < 12; tent++){
      const B = A.map((row, a)=>row.map((v, b)=>a === b ? v*(1 + lam) + 1e-12 : v));
      const d = resolveLin(B, g); if(!d){ lam *= 10; continue; }
      let nd = Math.sqrt(d.reduce((a2, c)=>a2 + c*c, 0)), dd = d; if(nd > pmax) dd = d.map(v=>v*pmax/nd);
      const xt = x.map((v, i)=>v + dd[i]), ft = fun(xt), et = Math.sqrt(ft.reduce((a2, c)=>a2 + c*c, 0));
      if(et < err){ x = xt; f = ft; err = et; lam = Math.max(1e-9, lam*0.3); melhorou = true; break; }
      lam *= 8;
    }
    if(!melhorou) break;
  }
  return {x, err};
}
function resolveLin(A, b){
  const N = b.length, M = A.map((row, i)=>row.concat([b[i]]));
  for(let c = 0; c < N; c++){
    let p = c; for(let r = c + 1; r < N; r++) if(Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    if(Math.abs(M[c][c]) < 1e-300) return null;
    for(let r = 0; r < N; r++){ if(r === c) continue; const k = M[r][c]/M[c][c]; for(let q = c; q <= N; q++) M[r][q] -= k*M[c][q]; }
  }
  return M.map((row, i)=>row[N]/row[i]);
}
/* Newton genérico: x (3) -> resíduo (3), jacobiano por diferenças, passo amortecido */
function newton(fun, x0, rotulo, opt){
  opt = opt || {};
  let x = x0.slice();
  const tol = opt.tol || 1e-6, eps = opt.eps || 1e-4, pmax = opt.passoMax || 0.2;
  for(let it = 0; it < (opt.maxIt || 60); it++){
    const f0 = fun(x);
    const err = Math.hypot(f0[0], f0[1], f0[2]);
    if(err < tol){ console.log('  ' + rotulo + ': ' + it + ' iterações, resíduo ' + err.toExponential(2)); return x; }
    const J = [];
    for(let k = 0; k < 3; k++){ const x2 = x.slice(); x2[k] += eps; const f2 = fun(x2); J.push([(f2[0] - f0[0])/eps, (f2[1] - f0[1])/eps, (f2[2] - f0[2])/eps]); }
    const M = [[J[0][0], J[1][0], J[2][0]], [J[0][1], J[1][1], J[2][1]], [J[0][2], J[1][2], J[2][2]]];
    const det = M[0][0]*(M[1][1]*M[2][2] - M[1][2]*M[2][1]) - M[0][1]*(M[1][0]*M[2][2] - M[1][2]*M[2][0]) + M[0][2]*(M[1][0]*M[2][1] - M[1][1]*M[2][0]);
    if(!isFinite(det) || Math.abs(det) < 1e-30) throw new Error(rotulo + ': jacobiano singular');
    const inv = [[(M[1][1]*M[2][2] - M[1][2]*M[2][1])/det, (M[0][2]*M[2][1] - M[0][1]*M[2][2])/det, (M[0][1]*M[1][2] - M[0][2]*M[1][1])/det],
                 [(M[1][2]*M[2][0] - M[1][0]*M[2][2])/det, (M[0][0]*M[2][2] - M[0][2]*M[2][0])/det, (M[0][2]*M[1][0] - M[0][0]*M[1][2])/det],
                 [(M[1][0]*M[2][1] - M[1][1]*M[2][0])/det, (M[0][1]*M[2][0] - M[0][0]*M[2][1])/det, (M[0][0]*M[1][1] - M[0][1]*M[1][0])/det]];
    let d = [-(inv[0][0]*f0[0] + inv[0][1]*f0[1] + inv[0][2]*f0[2]), -(inv[1][0]*f0[0] + inv[1][1]*f0[1] + inv[1][2]*f0[2]), -(inv[2][0]*f0[0] + inv[2][1]*f0[1] + inv[2][2]*f0[2])];
    const nd = nrm(d); if(nd > pmax) d = mul(d, pmax/nd);
    /* busca na linha: se piorar, encolhe o passo */
    let a = 1, melhor = null;
    for(let t = 0; t < 6; t++){
      const xt = add(x, mul(d, a)), ft = fun(xt), et = Math.hypot(ft[0], ft[1], ft[2]);
      if(et < err){ melhor = xt; break; }
      a *= 0.5;
    }
    x = melhor || add(x, mul(d, a));
  }
  throw new Error(rotulo + ': Newton não convergiu');
}
/* a CONTINUAÇÃO: resolve sem a Lua e vai ligando a massa dela aos poucos (o rasante a 110 km deixa o Newton direto perdido) */
function miraCont(r0, v0, dv0, jdA, jdB, alvo, tol, rotulo, passos){
  let dv = dv0.slice();
  for(const lb of (passos || [0, 0.03, 0.12, 0.3, 0.6, 1])){ LAMB = lb; dv = mira(r0, v0, dv, jdA, jdB, alvo, lb < 1 ? tol*20 : tol, rotulo + " (Lua " + Math.round(lb*100) + "%)"); }
  LAMB = 1;
  return dv;
}
/* o refino da volta: a nave passa pela REENTRADA oficial (a tabela do relatório de missão: latitude, longitude e
   121,9 km de altitude, na hora exata). Parte da solução dos alvos suaves e ajusta o plano da volta */
function refinaReentrada(id, r0, vVolta, jdA, jEI, latEI, lonEI){
  const f = x=>{
    const p = integra(r0, add(vVolta, x), jdA, jEI);
    const ll = latLonTerra(p.r, jEI);
    let dl = ll[1] - lonEI; dl = ((dl + 540) % 360) - 180;
    return [(ll[0] - latEI)/5, dl/5, (nrm(p.r) - (R_T + 121.9))/300];
  };
  const x = newton(f, [0, 0, 0], id + ' · reentrada oficial', {tol:2e-4, eps:1e-5, passoMax:0.05});
  return add(vVolta, x);
}
/* ================= o construtor de missão =================
   A missão (spec) traz os instantes e lugares oficiais; o construtor resolve as manobras.
   Incógnitas FÍSICAS na ida: a fase do estacionamento (onde a inserção aconteceu), o impulso tangencial
   da injeção e a componente fora do plano. Alvos SUAVES: a altitude do perilúnio, o plano da órbita
   lunar passando pelo local de pouso (ou pelo alvo, no sobrevoo) e a hora da chegada. Mirar um ponto
   exato atrás da Lua a 178 graus da injeção é o caso singular (o plano fica indefinido): foi o tombo do
   primeiro teste, e é por isso que a NASA também mirava por esses parâmetros */
const POLO_T = [0, Math.sin(EPS), Math.cos(EPS)];
function estacionamento(spec, jdL){
  const sUp = uni(sitioTerra(spec.base[0], spec.base[1], jdL, 0));
  const E = uni(crs(POLO_T, sUp)), N = uni(crs(sUp, E)), az = spec.azim*D2R;
  let h = uni(crs(sUp, add(mul(E, Math.sin(az)), mul(N, Math.cos(az)))));
  if(spec.incl){
    /* h perpendicular à base e com h.polo = cos(i): duas soluções, fica a mais perto do azimute do voo */
    const Pp = sub(POLO_T, mul(sUp, dot(POLO_T, sUp))), e1 = uni(Pp), e2 = crs(sUp, e1);
    const cb = Math.min(1, Math.cos(spec.incl*D2R)/nrm(Pp)), sb = Math.sqrt(1 - cb*cb);
    const cand = [add(mul(e1, cb), mul(e2, sb)), add(mul(e1, cb), mul(e2, -sb))];
    h = cand.sort((a, b)=>dot(b, h) - dot(a, h))[0];
  }
  const rP = R_T + (spec.hPark || 185), n = Math.sqrt(MU_T/(rP*rP*rP));
  return {sUp, h, rP, n};
}
function estadoPark(P, jdIns, fase, jd){
  const r = mul(rotEixo(P.sUp, P.h, fase + P.n*(jd - jdIns)*DIA), P.rP);
  return {r, v:mul(uni(crs(P.h, r)), Math.sqrt(MU_T/P.rP))};
}
/* a ida: x = [impulso tangencial km/s, fora do plano km/s, fase rad] */
function resolveIda(spec, P, jdIns, jdTLI, jdCheg, rp, alvoPlano, x0){
  const f = x=>{
    const e = estadoPark(P, jdIns, x[2], jdTLI);
    const dv = add(mul(uni(e.v), x[0]), mul(P.h, x[1]));
    const ca = maisPerto(e.r, add(e.v, dv), jdTLI, jdCheg + 1.5, LUA);
    const nn = uni(crs(ca.rr, ca.vr));
    return [(nrm(ca.rr) - rp)/2000, alvoPlano ? alvoPlano(nn, ca) : 0, (ca.jd - jdCheg)*4];
  };
  /* varredura grossa da fase e do impulso até achar a família RETRÓGRADA perto da Lua */
  let melhor = x0 ? {c:0, x:x0} : null;
  if(!x0) for(let fg = -10; fg <= 90; fg += 5) for(let mg = 3.00; mg <= 3.30; mg += 0.01){
    const e = estadoPark(P, jdIns, fg*D2R, jdTLI);
    const ca = maisPerto(e.r, add(e.v, mul(uni(e.v), mg)), jdTLI, jdCheg + 1.5, LUA);
    const nn = uni(crs(ca.rr, ca.vr)), d = nrm(ca.rr);
    if(nn[2] >= 0) continue;
    const custo = Math.abs(d - rp)/2000 + Math.abs(ca.jd - jdCheg)*4;
    if(!melhor || custo < melhor.c) melhor = {c:custo, x:[mg, 0, fg*D2R]};
  }
  if(!melhor) throw new Error(spec.id + ': nenhuma chegada retrógrada na varredura');
  let x;
  if(alvoPlano){ x = newton(f, melhor.x, spec.id + ' · ida', {tol:1e-6, eps:2e-5}); }
  else {
    /* a injeção SÓ NO PLANO (como foi): o ajuste do plano lunar fica para a captura, onde custa pouco */
    const f2 = y=>{ const r = f([y[0], 0, y[1]]); return [r[0], r[2]]; };
    const y = newtonN(f2, [melhor.x[0], melhor.x[2]], spec.id + ' · ida no plano', {tol:1e-6, eps:2e-5});
    x = [y[0], 0, y[1]];
  }
  const e = estadoPark(P, jdIns, x[2], jdTLI);
  return {x, r0:e.r, v0:add(e.v, add(mul(uni(e.v), x[0]), mul(P.h, x[1])))};
}
/* a ida pelo NÓ: o plano do estacionamento gira em volta do eixo da Terra (a inclinação oficial fica), e esse giro
   faz o acerto fino que na missão real vinha da hora e do azimute exatos do lançamento. x = [impulso tangencial,
   giro do nó em rad, fase]; alvos: altitude do perilúnio, plano lunar passando pelo alvo, hora da chegada */
function giraNo(P, dO){ return Object.assign({}, P, {sUp:rotEixo(P.sUp, POLO_T, dO), h:rotEixo(P.h, POLO_T, dO)}); }
function resolveIdaNo(spec, P, jdIns, jdTLI, jdCheg, rp, alvoPlano, qualquerSentido){
  const est = x=>{ const Q = giraNo(P, x[1]), e = estadoPark(Q, jdIns, x[2], jdTLI); return {r:e.r, v:add(e.v, mul(uni(e.v), x[0]))}; };
  const f = x=>{
    const e = est(x);
    const ca = maisPerto(e.r, e.v, jdTLI, jdCheg + 1.5, LUA);
    const nn = uni(crs(ca.rr, ca.vr));
    return [(nrm(ca.rr) - rp)/2000, alvoPlano(nn, ca), (ca.jd - jdCheg)*4];
  };
  const cands = [];
  for(const dOg of [-6, -3, 0, 3, 6]) for(let fg = -10; fg <= 90; fg += 5) for(let mg = 3.00; mg <= 3.30; mg += 0.01){
    const e = est([mg, dOg*D2R, fg*D2R]);
    const ca = maisPerto(e.r, e.v, jdTLI, jdCheg + 1.5, LUA);
    const nn = uni(crs(ca.rr, ca.vr)), d = nrm(ca.rr);
    if((nn[2] >= 0 && !qualquerSentido) || d < 600) continue;
    const custo = Math.abs(d - rp)/2000 + Math.abs(ca.jd - jdCheg)*4 + Math.abs(alvoPlano(nn, ca))*3;
    cands.push({c:custo, x:[mg, dOg*D2R, fg*D2R]});
  }
  if(!cands.length) throw new Error(spec.id + ': nenhuma chegada retrógrada na varredura');
  cands.sort((a, b)=>a.c - b.c);
  /* os 8 melhores, sem repetir vizinho: cada um vai ao Levenberg-Marquardt */
  const tops = [];
  for(const c of cands){ if(tops.length >= 8) break; if(tops.some(t=>Math.abs(t.x[1] - c.x[1]) < 2*D2R && Math.abs(t.x[2] - c.x[2]) < 6*D2R && Math.abs(t.x[0] - c.x[0]) < 0.015)) continue; tops.push(c); }
  let x = null;
  for(const c of tops){
    const r = levmar(f, c.x, {tol:1e-6, eps:2e-5, passoMax:0.05, maxIt:120});
    const e2 = est(r.x), ca2 = maisPerto(e2.r, e2.v, jdTLI, jdCheg + 1.5, LUA), nn2 = uni(crs(ca2.rr, ca2.vr));
    const ok = r.err < 1e-5 && (qualquerSentido || nn2[2] < 0) && Math.abs(r.x[1]) < 25*D2R;
    console.log('  ' + spec.id + ' · ida pelo nó: candidato (' + c.x[0].toFixed(3) + ', ' + (c.x[1]/D2R).toFixed(1) + ', ' + (c.x[2]/D2R).toFixed(1) + ') resíduo ' + r.err.toExponential(2) + (ok ? ' · FECHOU' : ''));
    if(ok){ x = r.x; break; }
  }
  if(!x) throw new Error(spec.id + ': ida pelo nó não fechou em nenhum candidato');
  const e = est(x);
  return {x:[x[0], 0, x[2]], no:x[1], P:giraNo(P, x[1]), r0:e.r, v0:e.v};
}
/* a volta: do estado (r, v) em jdA, impulso para cair na Terra: perigeu a 50 km, na hora e na latitude da reentrada */
function resolveVolta(id, r0, v0, jdA, jdPeri, latAlvo, chute){
  const f = x=>{
    const ca = maisPerto(r0, add(v0, x), jdA, jdPeri + 1.5, null);
    const lat = Math.asin(dot(uni(ca.r), POLO_T))/D2R;
    return [(nrm(ca.r) - (R_T + 50))/2000, (ca.jd - jdPeri)*4, (lat - latAlvo)/20];
  };
  /* varredura: impulso relativo à LUA (a nave em órbita lunar), só vale quem passa perto da Terra perto da hora */
  let melhor = null;
  const rl = sub(r0, hermite(LUA, jdA)), vl = sub(v0, velH(LUA, jdA));
  let vu = uni(vl), ru = uni(rl), hc = crs(rl, vl);
  if(nrm(hc) < 1e-6*nrm(rl)*nrm(vl)){ hc = crs(rl, POLO_T); ru = uni(crs(hc, vu)); }
  const hu = uni(hc);
  for(const mg of chute.mags) for(const rr of chute.radiais) for(const nn of (chute.normais || [-0.4, -0.2, 0, 0.2, 0.4])){
    const x = add(add(mul(vu, mg), mul(ru, rr)), mul(hu, nn));
    try{
      const ca = maisPerto(r0, add(v0, x), jdA, jdPeri + 1.5, null);
      if(nrm(ca.r) > 60000 || Math.abs(ca.jd - jdPeri) > 1.2) continue;
      const r = f(x); const c = Math.abs(r[0]) + Math.abs(r[1]) + Math.abs(r[2]);
      if(!melhor || c < melhor.c) melhor = {c, x};
    }catch(e){}
  }
  if(!melhor) throw new Error(id + ': nenhum impulso de volta cai perto da Terra na hora');
  let x;
  try{ x = newton(f, melhor.x, id + ' · volta', {tol:1e-6, eps:1e-4}); }
  catch(e){
    const r = levmar(f, melhor.x, {tol:1e-6, eps:1e-4, passoMax:0.05, maxIt:200});
    console.log('  ' + id + ' · volta pelo Levenberg-Marquardt: resíduo ' + r.err.toExponential(2));
    if(r.err > 1e-4) throw new Error(id + ': a volta não fechou');
    x = r.x;
  }
  return add(v0, x);
}
/* o ângulo de a até b girando em volta de n (0 a 2 pi, no sentido do movimento) */
function anguloEm(a, b, n){
  const pa = uni(sub(a, mul(n, dot(a, n)))), pb = uni(sub(b, mul(n, dot(b, n))));
  let t = Math.atan2(dot(crs(pa, pb), n), dot(pa, pb));
  return t < 0 ? t + 2*Math.PI : t;
}
const suave = u=>{ u = Math.min(1, Math.max(0, u)); return u*u*(3 - 2*u); };
/* a missão de pouso (Apollo 11 e 17): tudo em km geocêntricos, eclíptica J2000 */
async function missaoPouso(spec){
  const jL = jdDe(spec.lanc), jIns = jdDe(spec.ins), jTLI = jdDe(spec.tli), jCheg = jdDe(spec.loi);
  const jPouso = jdDe(spec.pouso.t), jDeco = jdDe(spec.deco), jAcop = jdDe(spec.acop), jTEI = jdDe(spec.tei), jEI = jdDe(spec.ei.t), jSpl = jdDe(spec.splash.t);
  LUA = await geo('301', jL - 0.5, jSpl + 0.5, 20); SOL = await geo('10', jL - 0.5, jSpl + 0.5, 240);
  const P0 = estacionamento(spec, jL);
  const sPouso = ()=>uni(sitioLua(spec.pouso.lat, spec.pouso.lon, jPouso, 0));
  const alvoPlano = nn=>dot(nn, sPouso());
  /* a ida: perilúnio na altitude da captura, plano pelo local de pouso, na hora da LOI */
  const ida = resolveIdaNo(spec, P0, jIns, jTLI, jCheg, R_L + spec.hLua, alvoPlano);
  const P = ida.P;
  console.log('  o nó do estacionamento girou ' + (ida.no/D2R).toFixed(2) + ' graus em volta do eixo da Terra');
  const ca = maisPerto(ida.r0, ida.v0, jTLI, jCheg + 1.5, LUA);
  const nChega = uni(crs(ca.rr, ca.vr)), u0 = uni(ca.rr), rp = nrm(ca.rr);
  /* a captura gira o plano em volta do próprio ponto (a componente fora do plano da queima de LOI) até ele passar
     pelo local de pouso na hora do pouso; fica o menor giro que mantém a órbita retrógrada */
  const sP = sPouso(), un = crs(u0, nChega);
  let psi = Math.atan2(-dot(nChega, sP), dot(un, sP));
  if(Math.abs(psi) > Math.PI/2) psi = psi > 0 ? psi - Math.PI : psi + Math.PI;
  const n = uni(add(mul(nChega, Math.cos(psi)), mul(un, Math.sin(psi))));
  console.log('  plano lunar: a captura gira o plano da chegada ' + (psi/D2R).toFixed(1) + ' graus (' + (2*Math.sqrt(MU_L/rp)*Math.sin(Math.abs(psi)/2)*1000).toFixed(0) + ' m/s de componente fora do plano)');
  /* a órbita lunar em DUAS FASES, como foi: a elipse da captura (LOI-1) até a circularização (LOI-2), depois o
     círculo no PERÍODO REAL (o da ficha de voo). A fase de chegada ao local de pouso sai do período da elipse,
     que é a única incógnita aqui (a missão real acertava a fase do mesmo jeito, pelas duas queimas) */
  const jLOI2 = jdDe(spec.loi2), wC = 2*Math.PI/(spec.periodoMin*60), rC = Math.cbrt(MU_L/(wC*wC));
  const alfa = anguloEm(u0, sPouso(), n);
  const kep = (P1, t)=>{   /* ângulo verdadeiro na elipse de perilúnio rp e período P1 (s), t segundos depois do perilúnio */
    const a = Math.cbrt(MU_L*P1*P1/(4*Math.PI*Math.PI)), e = 1 - rp/a;
    let M = 2*Math.PI*t/P1, E = M; for(let i = 0; i < 40; i++) E -= (E - e*Math.sin(E) - M)/(1 - e*Math.cos(E));
    return {nu:2*Math.atan2(Math.sqrt(1 + e)*Math.sin(E/2), Math.sqrt(1 - e)*Math.cos(E/2)), r:a*(1 - e*Math.cos(E)), a, e};
  };
  const t12 = (jLOI2 - ca.jd)*DIA, t2p = (jPouso - jLOI2)*DIA;
  const faseNoPouso = P1=>{ const k = kep(P1, t12); return ((k.nu + wC*t2p) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI); };
  const erroFase = P1=>{ let d = faseNoPouso(P1) - alfa; d = ((d + Math.PI) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI) - Math.PI; return d; };
  let P1 = null, melhorE = 1e9;
  const faixa = spec.periodoLOI1Min;
  for(let pm = faixa[0] - 8; pm <= faixa[1] + 8; pm += 0.02){
    const e = Math.abs(erroFase(pm*60)) + (pm < faixa[0] ? (faixa[0] - pm)*0.004 : pm > faixa[1] ? (pm - faixa[1])*0.004 : 0);
    if(e < melhorE){ melhorE = e; P1 = pm*60; }
  }
  /* o ajuste fino por bissecção em volta do melhor */
  { let a = P1 - 12, b = P1 + 12, fa = erroFase(a), fb = erroFase(b);
    if(fa*fb < 0) for(let i = 0; i < 60; i++){ const m = (a + b)/2, fm = erroFase(m); if(fa*fm <= 0){ b = m; fb = fm; } else { a = m; fa = fm; } }
    if(Math.abs(erroFase((a + b)/2)) < Math.abs(erroFase(P1))) P1 = (a + b)/2;
    melhorE = Math.abs(erroFase(P1)); }
  const k12 = kep(P1, t12);
  console.log('  órbita lunar: LOI-1 ' + (rp - R_L).toFixed(0) + ' x ' + (2*k12.a - rp - R_L).toFixed(0) + ' km (' + (P1/60).toFixed(1) + ' min), depois ' + (rC - R_L).toFixed(0) + ' km em círculo; retrógrada: ' + (n[2] < 0 ? 'sim' : 'NÃO') + '; erro de fase no pouso ' + (melhorE/D2R).toFixed(2) + ' graus; perilúnio ' + (Math.acos(dot(u0, uni(hermite(LUA, ca.jd))))/D2R).toFixed(0) + ' graus da linha Terra-Lua');
  const orb = {jd:ca.jd, n, u0, r:rC, w:wC, voltasAtePouso:Math.floor((t12/P1) + wC*t2p/(2*Math.PI))};
  console.log('  injeção: ' + (ida.x[0]*1000).toFixed(0) + ' m/s tangencial, ' + (ida.x[1]*1000).toFixed(0) + ' m/s fora do plano; inserção a ' + (ida.x[2]/D2R).toFixed(1) + ' graus da base; ' + orb.voltasAtePouso + ' voltas até o pouso');
  const nu2 = k12.nu;
  /* r316 · depois da acoplagem o comando anda com o período levemente ajustado (dPhi espalhado até a TEI): as queimas de
     ajuste e a troca de plano da missão real. Assim a injeção de volta acontece no ponto do relatório, no lado oculto */
  let dPhi = 0;
  const thAcop = nu2 + wC*(jAcop - jLOI2)*DIA, dTA = (jTEI - jAcop)*DIA;
  const w3 = ()=>wC + dPhi/dTA;
  const relLua = jd=>{
    const t = (jd - ca.jd)*DIA;
    if(jd <= jLOI2){ const k = kep(P1, t); return mul(rotEixo(u0, n, k.nu), k.r); }
    if(jd <= jAcop) return mul(rotEixo(u0, n, nu2 + wC*(jd - jLOI2)*DIA), rC);
    return mul(rotEixo(u0, n, thAcop + w3()*(jd - jAcop)*DIA), rC);
  };
  const naLua = jd=>add(hermite(LUA, jd), relLua(jd));
  const velLua = jd=>{ const rr = relLua(jd); return add(velH(LUA, jd), mul(crs(n, rr), jd > jAcop ? w3() : wC)); };
  const faseParaLon = lonAlvo=>{
    let melhor = 0, me = 1e9;
    for(let k = -1800; k < 1800; k++){ dPhi = k*0.1*D2R; const l = selenografico(relLua(jTEI), jTEI)[1]; const e = Math.abs(((l - lonAlvo + 540) % 360) - 180); if(e < me){ me = e; melhor = dPhi; } }
    dPhi = melhor; return me;
  };
  /* a volta */
  const latSpl = spec.splash.lat;
  const chuteV = {mags:[0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3], radiais:[-0.6, -0.3, 0, 0.3, 0.6]};
  let vVolta, r0v, v0v;
  if(spec.teiLon !== undefined){
    faseParaLon(spec.teiLon);
    r0v = naLua(jTEI); v0v = velLua(jTEI);
    vVolta = resolveVolta(spec.id, r0v, v0v, jTEI, jEI + 150/DIA, latSpl, chuteV);
  } else {
    /* sem o ponto no relatório: a longitude da TEI que dá o impulso oficial (varrimento no lado oculto) */
    let melhor = null;
    for(const lon of [150, 160, 165, 170, 175, 180, -175, -170, -165, -160, -150]){
      faseParaLon(lon);
      const r0 = naLua(jTEI), v0 = velLua(jTEI);
      try{
        let vv = resolveVolta(spec.id, r0, v0, jTEI, jEI + 150/DIA, latSpl, chuteV);
        vv = refinaReentrada(spec.id, r0, vv, jTEI, jEI, spec.ei.lat, spec.ei.lon);
        const dv = nrm(sub(vv, v0));
        console.log('  ' + spec.id + ' · TEI na longitude ' + lon + ': impulso ' + (dv*1000).toFixed(0) + ' m/s');
        if(!melhor || Math.abs(dv - spec.teiDv) < Math.abs(melhor.dv - spec.teiDv)) melhor = {lon, dv, vv, dPhi};
      }catch(e){ console.log('  ' + spec.id + ' · TEI na longitude ' + lon + ': sem volta'); }
    }
    if(!melhor) throw new Error(spec.id + ': nenhuma longitude de TEI deu volta');
    dPhi = melhor.dPhi; vVolta = melhor.vv; r0v = naLua(jTEI); v0v = velLua(jTEI);
    console.log('  ' + spec.id + ' · TEI escolhida na longitude ' + melhor.lon + ' (impulso ' + (melhor.dv*1000).toFixed(0) + ' m/s; oficial ' + (spec.teiDv*1000).toFixed(0) + ')');
  }
  if(spec.teiLon !== undefined) vVolta = refinaReentrada(spec.id, r0v, vVolta, jTEI, jEI, spec.ei.lat, spec.ei.lon);
  { const ll = selenografico(sub(r0v, hermite(LUA, jTEI)), jTEI);
    console.log('  TEI: ' + ll[0].toFixed(2) + ' / ' + ll[1].toFixed(2) + ' (selenográfico), impulso ' + (nrm(sub(vVolta, v0v))*1000).toFixed(0) + ' m/s; o período depois da acoplagem mudou ' + (100*(w3() - wC)/wC).toFixed(3) + ' por cento'); }
  /* ---------- a montagem, amostra por amostra ---------- */
  const g = [], lm = [];
  const pus = (arr, jd, r)=>arr.push([jd, r[0], r[1], r[2]]);
  /* a subida: da base até a inserção, subindo pelo arco */
  const e0 = estadoPark(P, jIns, ida.x[2], jIns);
  const base0 = sitioTerra(spec.base[0], spec.base[1], jL, 0);
  for(let i = 0; i <= 24; i++){
    const u = i/24, jd = jL + (jIns - jL)*u;
    const dir = uni(add(mul(uni(base0), 1 - u), mul(uni(e0.r), u)));
    pus(g, jd, mul(dir, R_T + (P.rP - R_T)*suave(Math.pow(u, 0.7))));
  }
  for(let jd = jIns + 2/1440; jd < jTLI; jd += 2/1440) pus(g, jd, estadoPark(P, jIns, ida.x[2], jd).r);
  /* a ida integrada, com passo fino perto da Terra e da Lua */
  { let r = ida.r0, v = ida.v0, jd = jTLI; pus(g, jd, r);
    while(jd < orb.jd - 1e-9){
      const dT = nrm(r), dL = nrm(sub(r, hermite(LUA, jd)));
      const passo = Math.min(orb.jd - jd, (Math.min(dT, dL) < 30000 ? 2 : 15)/1440);
      const p = integra(r, v, jd, jd + passo); r = p.r; v = p.v; jd += passo; pus(g, jd, r);
    } }
  /* as voltas na Lua */
  for(let jd = orb.jd + 2/1440; jd < jTEI; jd += 2/1440) pus(g, jd, naLua(jd));
  /* a volta integrada, até a reentrada */
  { let r = r0v, v = vVolta, jd = jTEI; pus(g, jd, r);
    while(jd < jEI - 1e-9){
      const dT = nrm(r), dL = nrm(sub(r, hermite(LUA, jd)));
      const passo = Math.min(jEI - jd, (Math.min(dT, dL) < 30000 ? 2 : 15)/1440);
      const p = integra(r, v, jd, jd + passo); r = p.r; v = p.v; jd += passo; pus(g, jd, r);
    }
    /* da reentrada ao mar: o arco de 15 minutos até o ponto oficial da amerissagem */
    const eiR = r, eiLonLat = latLonTerra(eiR, jEI), splR = sitioTerra(latSpl, spec.splash.lon, jSpl, 0);
    { const up = uni(r), vh = sub(v, mul(up, dot(v, up))), fpa = Math.asin(dot(uni(v), up))/D2R;
      const leste = uni(crs(POLO_T, up)), norte = crs(up, leste), rumo = (Math.atan2(dot(vh, leste), dot(vh, norte))/D2R + 360) % 360;
      let dMax = 0; for(const p of g) dMax = Math.max(dMax, Math.hypot(p[1], p[2], p[3]));
      console.log('  reentrada: ' + (nrm(v)*3280.84).toFixed(0) + ' ft/s, ângulo ' + fpa.toFixed(2) + ' graus, rumo ' + rumo.toFixed(1) + ' graus; distância máxima da Terra ' + Math.round(dMax).toLocaleString('pt-BR') + ' km'); }
    console.log('  reentrada: lat ' + eiLonLat[0].toFixed(1) + ' lon ' + eiLonLat[1].toFixed(1) + ' (amerissagem oficial ' + latSpl + ' / ' + spec.splash.lon + ')');
    for(let i = 1; i <= 30; i++){
      const u = i/30, jd = jEI + (jSpl - jEI)*u;
      const alvo = sitioTerra(latSpl, spec.splash.lon, jd, 0);
      const dir = uni(add(mul(uni(eiR), 1 - suave(u)), mul(uni(alvo), suave(u))));
      pus(g, jd, mul(dir, nrm(eiR) + (R_T - nrm(eiR))*suave(Math.pow(u, 0.6))));
    } }
  /* o módulo lunar: desce da órbita na última meia volta e meia antes do pouso, fica no chão, sobe e alcança o comando */
  const jDesce = jPouso - 1.5*(2*Math.PI/orb.w)/DIA;
  for(let jd = jDesce; jd <= jPouso + 1e-9; jd += 1/1440){
    const u = (jd - jDesce)/(jPouso - jDesce);
    const dir = uni(relLua(jd));
    pus(lm, jd, add(hermite(LUA, jd), mul(dir, R_L + (orb.r - R_L)*(1 - suave(Math.pow(u, 1.6))))));
  }
  /* o ponto EXATO do pouso (o passo de 1 min parava segundos antes, dezenas de km antes do local) */
  if(lm[lm.length - 1][0] < jPouso - 1e-9) pus(lm, jPouso, add(hermite(LUA, jPouso), sitioLua(spec.pouso.lat, spec.pouso.lon, jPouso, 0)));
  for(let jd = jPouso + 10/1440; jd < jDeco; jd += 20/1440) pus(lm, jd, add(hermite(LUA, jd), sitioLua(spec.pouso.lat, spec.pouso.lon, jd, 0)));
  { const sit0 = uni(sitioLua(spec.pouso.lat, spec.pouso.lon, jDeco, 0)), n = orb.n;
    const th0 = 0, thA = anguloEm(sit0, sub(naLua(jAcop), hermite(LUA, jAcop)), n);
    const voltas = Math.max(0, Math.round((orb.w*(jAcop - jDeco)*DIA - thA)/(2*Math.PI)));
    const thTot = thA + 2*Math.PI*voltas;
    const fora = dot(sit0, n);   /* o local já saiu do plano (a Lua girou): a subida corrige */
    for(let jd = jDeco; jd <= jAcop + 1e-9; jd += 2/1440){
      const u = (jd - jDeco)/(jAcop - jDeco);
      let dir = rotEixo(uni(sub(sit0, mul(n, fora))), n, th0 + thTot*u);
      dir = uni(add(dir, mul(n, fora*(1 - suave(u*3)))));
      const alt = (orb.r - R_L)*suave(Math.min(1, u*6)) + 0;
      pus(lm, jd, add(hermite(LUA, jd), mul(dir, R_L + alt)));
    } }
  const ev = {tli:jTLI, loi:orb.jd, pouso:jPouso, deco:jDeco, acop:jAcop, tei:jTEI, ei:jEI, splash:jSpl};
  const seg = [{a:jLOI2, b:jAcop, u:rotEixo(u0, n, nu2), n, r:rC, w:wC*DIA}, {a:jAcop, b:jTEI, u:rotEixo(u0, n, thAcop), n, r:rC, w:w3()*DIA}];
  return {jL, g, lm, ev, seg, pouso:{lat:spec.pouso.lat, lon:spec.pouso.lon}, lmNome:spec.lmNome};
}
/* o polo da Lua (IAU) na eclíptica: para mirar a INCLINAÇÃO da órbita lunar */
function poloLua(){
  const a0 = 269.9949*D2R, d0 = 66.5392*D2R;
  return uni(eqParaEcl([Math.cos(d0)*Math.cos(a0), Math.cos(d0)*Math.sin(a0), Math.sin(d0)]));
}
/* peças comuns: a subida da base, o estacionamento, um trecho integrado e o arco da reentrada até o mar */
function subida(g, spec, P, jL, jIns, fase){
  const e0 = estadoPark(P, jIns, fase, jIns), base0 = sitioTerra(spec.base[0], spec.base[1], jL, 0);
  for(let i = 0; i <= 24; i++){
    const u = i/24, jd = jL + (jIns - jL)*u;
    const dir = uni(add(mul(uni(base0), 1 - u), mul(uni(e0.r), u)));
    g.push([jd].concat(mul(dir, R_T + (P.rP - R_T)*suave(Math.pow(u, 0.7)))));
  }
}
function trecho(g, r0, v0, jdA, jdB){
  let r = r0, v = v0, jd = jdA; g.push([jd, r[0], r[1], r[2]]);
  while(jd < jdB - 1e-9){
    const dT = nrm(r), dL = nrm(sub(r, hermite(LUA, jd)));
    const passo = Math.min(jdB - jd, (Math.min(dT, dL) < 30000 ? 2 : 15)/1440);
    const p = integra(r, v, jd, jd + passo); r = p.r; v = p.v; jd += passo; g.push([jd, r[0], r[1], r[2]]);
  }
  return {r, v};
}
function arcoMar(g, eiR, jEI, jSpl, lat, lon){
  for(let i = 1; i <= 30; i++){
    const u = i/30, jd = jEI + (jSpl - jEI)*u, alvo = sitioTerra(lat, lon, jd, 0);
    const dir = uni(add(mul(uni(eiR), 1 - suave(u)), mul(uni(alvo), suave(u))));
    g.push([jd].concat(mul(dir, nrm(eiR) + (R_T - nrm(eiR))*suave(Math.pow(u, 0.6)))));
  }
}
function volta(spec, r0, v0, jA, jEI){
  let vv = resolveVolta(spec.id, r0, v0, jA, jEI + 150/DIA, spec.splash.lat, {mags:[0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4], radiais:[-0.6, -0.3, 0, 0.3, 0.6]});
  if(spec.ei.lat !== undefined) vv = refinaReentrada(spec.id, r0, vv, jA, jEI, spec.ei.lat, spec.ei.lon);
  return vv;
}
/* APOLLO 8: dez voltas, sem pouso; o plano pela inclinação oficial (retrógrada) */
async function missaoOrbita(spec){
  const jL = jdDe(spec.lanc), jIns = jdDe(spec.ins), jTLI = jdDe(spec.tli), jCheg = jdDe(spec.loi), jLOI2 = jdDe(spec.loi2);
  const jTEI = jdDe(spec.tei), jEI = jdDe(spec.ei.t), jSpl = jdDe(spec.splash.t);
  LUA = await geo('301', jL - 0.5, jSpl + 0.5, 20); SOL = await geo('10', jL - 0.5, jSpl + 0.5, 240);
  const PL = poloLua(), sLOI = uni(sitioLua(spec.loiPonto.lat, spec.loiPonto.lon, jCheg, 0));
  const ida = resolveIdaNo(spec, estacionamento(spec, jL), jIns, jTLI, jCheg, R_L + spec.hLua, nn=>dot(nn, sLOI));
  const P = ida.P;
  const ca = maisPerto(ida.r0, ida.v0, jTLI, jCheg + 1.5, LUA);
  const n = uni(crs(ca.rr, ca.vr)), u0 = uni(ca.rr), rp = nrm(ca.rr);
  const P1 = spec.periodoLOI1Min*60, wC = 2*Math.PI/(spec.periodoMin*60), rC = Math.cbrt(MU_L/(wC*wC));
  const a1 = Math.cbrt(MU_L*P1*P1/(4*Math.PI*Math.PI)), e1 = 1 - rp/a1;
  const kep = t=>{ let M = 2*Math.PI*t/P1, E = M; for(let i = 0; i < 40; i++) E -= (E - e1*Math.sin(E) - M)/(1 - e1*Math.cos(E)); return {nu:2*Math.atan2(Math.sqrt(1 + e1)*Math.sin(E/2), Math.sqrt(1 - e1)*Math.cos(E/2)), r:a1*(1 - e1*Math.cos(E))}; };
  const nu2 = kep((jLOI2 - ca.jd)*DIA).nu;
  let dPhi = 0; const dT2 = (jTEI - jLOI2)*DIA, w2 = ()=>wC + dPhi/dT2;
  const rel = jd=>jd <= jLOI2 ? (k=>mul(rotEixo(u0, n, k.nu), k.r))(kep((jd - ca.jd)*DIA)) : mul(rotEixo(u0, n, nu2 + w2()*(jd - jLOI2)*DIA), rC);
  if(spec.teiLon !== undefined){
    let melhor = 0, me = 1e9;
    for(let k = -1800; k < 1800; k++){ dPhi = k*0.1*D2R; const l = selenografico(rel(jTEI), jTEI)[1]; const e = Math.abs(((l - spec.teiLon + 540) % 360) - 180); if(e < me){ me = e; melhor = dPhi; } }
    dPhi = melhor;
    const ll = selenografico(rel(jTEI), jTEI);
    console.log('  TEI: ' + ll[0].toFixed(2) + ' / ' + ll[1].toFixed(2) + ' (relatório ' + (spec.teiLat !== undefined ? spec.teiLat : '?') + ' / ' + spec.teiLon + '); o período mudou ' + (100*(w2() - wC)/wC).toFixed(3) + ' por cento');
  }
  console.log('  ' + spec.id + ': nó ' + (ida.no/D2R).toFixed(2) + ' graus; injeção ' + (ida.x[0]*1000).toFixed(0) + ' m/s (inserção a ' + (ida.x[2]/D2R).toFixed(0) + ' graus da base); órbita ' + (rp - R_L).toFixed(0) + ' x ' + (2*a1 - rp - R_L).toFixed(0) + ' km, depois ' + (rC - R_L).toFixed(0) + ' km; inclinação ' + (180 - Math.acos(dot(n, PL))/D2R).toFixed(1) + ' graus (retrógrada ' + (n[2] < 0 ? 'sim' : 'NÃO') + '); ' + Math.floor((jTEI - ca.jd)*DIA/(spec.periodoMin*60) + 0.5) + ' voltas; perilúnio a ' + (Math.acos(dot(u0, sLOI))/D2R).toFixed(1) + ' graus do ponto da inserção');
  const r0v = add(hermite(LUA, jTEI), rel(jTEI)), v0v = add(velH(LUA, jTEI), mul(crs(n, rel(jTEI)), jTEI <= jLOI2 ? 2*Math.PI/P1 : w2()));
  const vv = volta(spec, r0v, v0v, jTEI, jEI);
  const g = [];
  subida(g, spec, P, jL, jIns, ida.x[2]);
  for(let jd = jIns + 2/1440; jd < jTLI; jd += 2/1440) g.push([jd].concat(estadoPark(P, jIns, ida.x[2], jd).r));
  trecho(g, ida.r0, ida.v0, jTLI, ca.jd);
  for(let jd = ca.jd + 2/1440; jd < jTEI; jd += 2/1440) g.push([jd].concat(add(hermite(LUA, jd), rel(jd))));
  const fim = trecho(g, r0v, vv, jTEI, jEI);
  arcoMar(g, fim.r, jEI, jSpl, spec.splash.lat, spec.splash.lon);
  return {jL, g, lm:[], ev:{tli:jTLI, loi:ca.jd, tei:jTEI, ei:jEI, splash:jSpl}, seg:[{a:jLOI2, b:jTEI, u:rotEixo(u0, n, nu2), n, r:rC, w:w2()*DIA}]};
}
/* APOLLO 13: a volta livre por trás da Lua, e a queima PC+2 que apressou a volta */
async function missaoSobrevoo(spec){
  const jL = jdDe(spec.lanc), jIns = jdDe(spec.ins), jTLI = jdDe(spec.tli), jPeri = jdDe(spec.peri.t), jPC2 = jdDe(spec.pc2);
  const jEI = jdDe(spec.ei.t), jSpl = jdDe(spec.splash.t);
  LUA = await geo('301', jL - 0.5, jSpl + 0.5, 20); SOL = await geo('10', jL - 0.5, jSpl + 0.5, 240);
  const sPeri = uni(sitioLua(spec.peri.lat, spec.peri.lon, jPeri, 0));
  const ida = resolveIdaNo(spec, estacionamento(spec, jL), jIns, jTLI, jPeri, R_L + spec.peri.alt, nn=>dot(nn, sPeri));
  const P = ida.P;
  const ca = maisPerto(ida.r0, ida.v0, jTLI, jPeri + 1.5, LUA);
  console.log('  ' + spec.id + ': nó ' + (ida.no/D2R).toFixed(2) + ' graus; injeção ' + (ida.x[0]*1000).toFixed(0) + ' m/s (inserção a ' + (ida.x[2]/D2R).toFixed(0) + ' graus da base); perilúnio ' + (nrm(ca.rr) - R_L).toFixed(0) + ' km, a ' + (Math.acos(dot(uni(ca.rr), sPeri))/D2R).toFixed(1) + ' graus do ponto oficial; retrógrado: ' + (uni(crs(ca.rr, ca.vr))[2] < 0 ? 'sim' : 'NÃO'));
  const g = [];
  subida(g, spec, P, jL, jIns, ida.x[2]);
  for(let jd = jIns + 2/1440; jd < jTLI; jd += 2/1440) g.push([jd].concat(estadoPark(P, jIns, ida.x[2], jd).r));
  const ate = trecho(g, ida.r0, ida.v0, jTLI, jPC2);
  const vv = volta(spec, ate.r, ate.v, jPC2, jEI);
  const fim = trecho(g, ate.r, vv, jPC2, jEI);
  g.pop();
  arcoMar(g, fim.r, jEI, jSpl, spec.splash.lat, spec.splash.lon);
  let dMax = 0; for(const p of g) dMax = Math.max(dMax, Math.hypot(p[1], p[2], p[3]));
  console.log('  distância máxima da Terra: ' + Math.round(dMax).toLocaleString('pt-BR') + ' km (do centro)');
  return {jL, g, lm:[], ev:{tli:jTLI, peri:jPeri, pc2:jPC2, ei:jEI, splash:jSpl, explosao:jdDe(spec.explosao)}};
}
/* LUNA 9: a descida DIRETA, sem órbita: a nave cai no local de pouso na hora do pouso */
function impacto(r0, v0, jdA, jdB){
  let A = {jd:jdA, r:r0, v:v0};
  while(A.jd < jdB - 1e-9){
    const jn = Math.min(jdB, A.jd + 3/1440), p = integra(A.r, A.v, A.jd, jn), B = {jd:jn, r:p.r, v:p.v};
    const dL = nrm(sub(B.r, hermite(LUA, jn)));
    if(dL > R_L){ A = B; continue; }
    {
      let a = A, b = B;
      for(let k = 0; k < 30; k++){
        const jm = (a.jd + b.jd)/2, pm = integra(a.r, a.v, a.jd, jm);
        if(nrm(sub(pm.r, hermite(LUA, jm))) > R_L) a = {jd:jm, r:pm.r, v:pm.v}; else b = {jd:jm, r:pm.r, v:pm.v};
      }
      return {jd:b.jd, r:b.r};
    }
  }
  return null;
}
function selenografico(rRel, jd){
  /* o inverso de sitioLua: eclíptica -> equatorial -> corpo (IAU) */
  const d = jd - 2451545, a0 = 269.9949*D2R, d0 = 66.5392*D2R, W = (38.3213 + 13.17635815*d)*D2R;
  const q = [rRel[0], rRel[1]*Math.cos(EPS) - rRel[2]*Math.sin(EPS), rRel[1]*Math.sin(EPS) + rRel[2]*Math.cos(EPS)];
  const ca = Math.cos(a0 + Math.PI/2), sa = Math.sin(a0 + Math.PI/2), cd = Math.cos(Math.PI/2 - d0), sd = Math.sin(Math.PI/2 - d0);
  const x1 = q[0]*ca + q[1]*sa, y1 = -q[0]*sa + q[1]*ca, z1 = q[2];
  const b = [x1, y1*cd + z1*sd, -y1*sd + z1*cd];
  const lat = Math.asin(b[2]/nrm(b))/D2R; let lon = (Math.atan2(b[1], b[0]) - W)/D2R;
  lon = ((lon % 360) + 540) % 360 - 180;
  return [lat, lon];
}
async function missaoDireta(spec){
  const jL = jdDe(spec.lanc), jIns = jdDe(spec.ins), jTLI = jdDe(spec.tli), jPouso = jdDe(spec.pouso.t);
  LUA = await geo('301', jL - 0.5, jPouso + 1, 20); SOL = await geo('10', jL - 0.5, jPouso + 1, 240);
  const P0 = estacionamento(spec, jL);
  const est = x=>{ const Q = giraNo(P0, x[1]), e = estadoPark(Q, jIns, x[2], jTLI); return {r:e.r, v:add(e.v, mul(uni(e.v), x[0]))}; };
  const f = x=>{
    const e = est(x), im = impacto(e.r, e.v, jTLI, jPouso + 1);
    if(!im){ const ca = maisPerto(e.r, e.v, jTLI, jPouso + 1, LUA); return [(nrm(ca.rr) - R_L)/500, 0, (ca.jd - jPouso)*4]; }
    const ll = selenografico(sub(im.r, hermite(LUA, im.jd)), im.jd);
    let dl = ll[1] - spec.pouso.lon; dl = ((dl + 540) % 360) - 180;
    return [(ll[0] - spec.pouso.lat)/20, dl/20, (im.jd - jPouso)*4];
  };
  let melhor = null;
  for(const dOg of [-6, -3, 0, 3, 6]) for(let fg = -20; fg <= 120; fg += 5) for(let mg = 3.00; mg <= 3.30; mg += 0.01){
    const e = est([mg, dOg*D2R, fg*D2R]), ca = maisPerto(e.r, e.v, jTLI, jPouso + 1, LUA);
    const c = Math.max(0, nrm(ca.rr) - R_L)/2000 + Math.abs(ca.jd - jPouso)*4;
    if(!melhor || c < melhor.c) melhor = {c, x:[mg, dOg*D2R, fg*D2R]};
  }
  const x = newton(f, melhor.x, spec.id + ' · descida direta', {tol:2e-5, eps:2e-5, passoMax:0.05});
  const e = est(x), P = giraNo(P0, x[1]), im = impacto(e.r, e.v, jTLI, jPouso + 1);
  console.log('  ' + spec.id + ': nó ' + (x[1]/D2R).toFixed(2) + ' graus; injeção ' + (x[0]*1000).toFixed(0) + ' m/s (inserção a ' + (x[2]/D2R).toFixed(0) + ' graus da base); pouso a ' + ((im.jd - jPouso)*1440).toFixed(1) + ' min da hora oficial');
  const g = [];
  subida(g, spec, P, jL, jIns, x[2]);
  for(let jd = jIns + 2/1440; jd < jTLI; jd += 2/1440) g.push([jd].concat(estadoPark(P, jIns, x[2], jd).r));
  trecho(g, e.r, e.v, jTLI, im.jd);
  /* depois do pouso: parada no chão, girando com a Lua, até o fim da linha do tempo */
  for(let jd = im.jd + 1/24; jd <= im.jd + (spec.depois || 1); jd += 1/144) g.push([jd].concat(add(hermite(LUA, jd), sitioLua(spec.pouso.lat, spec.pouso.lon, jd, 0))));
  return {jL, g, lm:[], ev:{tli:jTLI, pouso:im.jd}, pouso:{lat:spec.pouso.lat, lon:spec.pouso.lon}};
}
/* LUNA 16 e CHANG'E 4: órbita lunar, pouso; a Luna 16 decola direto de volta para a Terra (sem órbita) */
async function missaoRobo(spec){
  const jL = jdDe(spec.lanc), jIns = jdDe(spec.ins), jTLI = jdDe(spec.tli), jCheg = jdDe(spec.loi), jPouso = jdDe(spec.pouso.t);
  const jFim = spec.splash ? jdDe(spec.splash.t) : jPouso + (spec.depois || 1);
  LUA = await geo('301', jL - 0.5, jFim + 0.5, 20); SOL = await geo('10', jL - 0.5, jFim + 0.5, 240);
  const sPouso = uni(sitioLua(spec.pouso.lat, spec.pouso.lon, jPouso, 0));
  const ida = resolveIdaNo(spec, estacionamento(spec, jL), jIns, jTLI, jCheg, R_L + spec.hLua, nn=>dot(nn, sPouso), spec.qualquerSentido);
  const P = ida.P;
  const ca = maisPerto(ida.r0, ida.v0, jTLI, jCheg + 1.5, LUA);
  const n = uni(crs(ca.rr, ca.vr)), u0 = uni(ca.rr), rp = nrm(ca.rr);
  /* a órbita em duas fases (a de espera e a de descida), com a fase do pouso acertada pelo período da primeira */
  const jFase2 = jdDe(spec.fase2), wC = 2*Math.PI/(spec.periodo2Min*60), rC = Math.cbrt(MU_L/(wC*wC));
  const alfa = anguloEm(u0, sPouso, n), t12 = (jFase2 - ca.jd)*DIA, t2p = (jPouso - jFase2)*DIA;
  const erro = w1=>{ let d = ((w1*t12 + wC*t2p) % (2*Math.PI)) - alfa; d = ((d + Math.PI) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI) - Math.PI; return d; };
  const w0 = 2*Math.PI/(spec.periodo1Min*60);
  let w1 = w0, me = 1e9;
  { const cands = []; for(let k = -1600; k <= 1600; k++){ const w = w0*(1 + k*0.00005), e = Math.abs(erro(w)); cands.push({k, w, e}); }
    const bons = cands.filter(c=>c.e < 0.004).sort((a, b)=>Math.abs(a.k) - Math.abs(b.k));
    const esc = bons.length ? bons[0] : cands.sort((a, b)=>a.e - b.e)[0];
    w1 = esc.w; me = esc.e;
    /* bissecção fina em volta */
    let a = w1*(1 - 0.00005), b = w1*(1 + 0.00005), fa = erro(a), fb = erro(b);
    if(fa*fb < 0){ for(let i = 0; i < 50; i++){ const m = (a + b)/2, fm = erro(m); if(fa*fm <= 0){ b = m; fb = fm; } else { a = m; fa = fm; } } w1 = (a + b)/2; me = Math.abs(erro(w1)); } }
  const r1 = Math.cbrt(MU_L/(w1*w1));
  console.log('  ' + spec.id + ': nó ' + (ida.no/D2R).toFixed(2) + ' graus; injeção ' + (ida.x[0]*1000).toFixed(0) + ' m/s (inserção a ' + (ida.x[2]/D2R).toFixed(0) + ' graus da base); órbita ' + (r1 - R_L).toFixed(0) + ' km, depois ' + (rC - R_L).toFixed(0) + ' km; inclinação ' + (Math.acos(-dot(n, poloLua()))/D2R).toFixed(0) + ' graus (retrógrada ' + (n[2] < 0 ? 'sim' : 'não') + '); fase no pouso ' + (me/D2R).toFixed(2) + ' graus');
  const rel = jd=>jd <= jFase2 ? mul(rotEixo(u0, n, w1*(jd - ca.jd)*DIA), r1) : mul(rotEixo(u0, n, w1*t12 + wC*(jd - jFase2)*DIA), rC);
  const g = [];
  subida(g, spec, P, jL, jIns, ida.x[2]);
  for(let jd = jIns + 2/1440; jd < jTLI; jd += 2/1440) g.push([jd].concat(estadoPark(P, jIns, ida.x[2], jd).r));
  trecho(g, ida.r0, ida.v0, jTLI, ca.jd);
  const jDesce = jPouso - 0.5*(2*Math.PI/wC)/DIA;
  for(let jd = ca.jd + 2/1440; jd < jDesce; jd += 2/1440) g.push([jd].concat(add(hermite(LUA, jd), rel(jd))));
  for(let jd = jDesce; jd <= jPouso + 1e-9; jd += 1/1440){
    const u = (jd - jDesce)/(jPouso - jDesce), dir = uni(rel(jd));
    g.push([jd].concat(add(hermite(LUA, jd), mul(dir, R_L + (rC - R_L)*(1 - suave(Math.pow(u, 1.4)))))));
  }
  if(g[g.length - 1][0] < jPouso - 1e-9) g.push([jPouso].concat(add(hermite(LUA, jPouso), sitioLua(spec.pouso.lat, spec.pouso.lon, jPouso, 0))));
  const ev = {tli:jTLI, loi:ca.jd, pouso:jPouso};
  const pousoR = {lat:spec.pouso.lat, lon:spec.pouso.lon};
  const segR = [{a:ca.jd, b:jFase2, u:u0, n, r:r1, w:w1*DIA}, {a:jFase2, b:jDesce, u:rotEixo(u0, n, w1*t12), n, r:rC, w:wC*DIA}];
  if(spec.deco){
    /* a volta direta da Luna 16: o estágio de subida sai do local e cai no Cazaquistão */
    const jDeco = jdDe(spec.deco), jEI = jdDe(spec.ei.t);
    for(let jd = jPouso + 1/144; jd < jDeco; jd += 1/144) g.push([jd].concat(add(hermite(LUA, jd), sitioLua(spec.pouso.lat, spec.pouso.lon, jd, 0))));
    const r0 = add(hermite(LUA, jDeco), sitioLua(spec.pouso.lat, spec.pouso.lon, jDeco, 0.1));
    const up = uni(sitioLua(spec.pouso.lat, spec.pouso.lon, jDeco, 0));
    const v0 = add(velH(LUA, jDeco), mul(up, 2.6));
    const alvoEI = sitioTerra(spec.splash.lat, spec.splash.lon, jEI, 121.9);
    const fEI = x=>{ const p = integra(r0, add(v0, x), jDeco, jEI); return mul(sub(p.r, alvoEI), 1/2000); };
    let melhorEI = null;
    const leste = uni(crs([0, 0, 1], up)), norte = crs(up, leste);
    for(let a = -0.3; a <= 0.3001; a += 0.05) for(let b = -0.3; b <= 0.3001; b += 0.05) for(let c = -0.1; c <= 0.3001; c += 0.05){
      const x = add(add(mul(up, c), mul(leste, a)), mul(norte, b)), r = fEI(x), e = nrm(r);
      if(!melhorEI || e < melhorEI.e) melhorEI = {e, x};
    }
    const solEI = levmar(fEI, melhorEI.x, {tol:1e-6, eps:1e-5, passoMax:0.05, maxIt:300});
    console.log('  ' + spec.id + ' · volta direta mirando a reentrada: resíduo ' + (solEI.err*2000).toFixed(1) + ' km; subida a ' + (Math.acos(dot(uni(add(mul(up, 2.6), solEI.x)), up))/D2R).toFixed(1) + ' graus da vertical, ' + (nrm(add(mul(up, 2.6), solEI.x))*1000).toFixed(0) + ' m/s');
    if(solEI.err*2000 > 20) throw new Error(spec.id + ': a volta direta não fechou');
    const vv = add(v0, solEI.x);
    const fim = trecho(g, r0, vv, jDeco, jEI);
    arcoMar(g, fim.r, jEI, jdDe(spec.splash.t), spec.splash.lat, spec.splash.lon);
    ev.deco = jDeco; ev.ei = jEI; ev.splash = jdDe(spec.splash.t);
  } else {
    for(let jd = jPouso + 1/144; jd <= jFim; jd += 1/144) g.push([jd].concat(add(hermite(LUA, jd), sitioLua(spec.pouso.lat, spec.pouso.lon, jd, 0))));
  }
  return {jL, g, lm:[], ev, pouso:pousoR, seg:segR};
}
/* ARTEMIS I, ARTEMIS II e SLIM: os vetores REAIS do JPL; antes deles, a subida e o estacionamento pela conta de
   dois corpos a partir do primeiro vetor (propagado para trás até a queima); depois, o arco até o mar */
async function missaoJPL(spec){
  const jL = jdDe(spec.lanc), jA = jdDe(spec.jplDe), jB = jdDe(spec.jplAte);
  const jFim = spec.splash ? jdDe(spec.splash.t) : jB;
  LUA = await geo('301', jL - 0.5, jFim + 0.5, 20); SOL = await geo('10', jL - 0.5, jFim + 0.5, 240);
  let nave = await geo(spec.cmd, jA, jB, 10);
  nave = limpaJPL(spec, nave);
  const g = [];
  /* a subida e a órbita antes do primeiro vetor: dois corpos (só a Terra) para trás, do primeiro vetor até a queima */
  const n0 = nave[0], r0 = [n0.x, n0.y, n0.z], v0 = [n0.vx, n0.vy, n0.vz];
  const jQ = jdDe(spec.queima);
  const pre = [];
  { let r = r0, v = v0, jd = jA; const passo = -2/1440;
    const l = LAMB; LAMB = 0;
    while(jd > jQ + 1e-9){ const p = integra(r, v, jd, Math.max(jQ, jd + passo)); r = p.r; v = p.v; jd = Math.max(jQ, jd + passo); pre.unshift([jd, r[0], r[1], r[2]]); }
    LAMB = l;
    /* antes da queima: a órbita baixa no mesmo plano, com o raio da queima, de trás para a frente até a inserção */
    const rq = r, hq = uni(crs(r, v)), rr = nrm(rq), w = Math.sqrt(MU_T/(rr*rr*rr));
    const jIns = jdDe(spec.ins);
    const baixa = [];
    for(let jd2 = jQ - 2/1440; jd2 > jIns; jd2 -= 2/1440) baixa.unshift([jd2].concat(rotEixo(rq, hq, -w*(jQ - jd2)*DIA)));
    const ins = rotEixo(rq, hq, -w*(jQ - jIns)*DIA);
    const base0 = sitioTerra(spec.base[0], spec.base[1], jL, 0);
    for(let i = 0; i <= 24; i++){ const u = i/24, jd3 = jL + (jIns - jL)*u, dir = uni(add(mul(uni(base0), 1 - u), mul(uni(ins), u))); g.push([jd3].concat(mul(dir, R_T + (rr - R_T)*suave(Math.pow(u, 0.7))))); }
    for(const p of baixa) g.push(p);
    for(const p of pre) g.push(p); }
  for(const p of densifica(nave)) if(p[0] > g[g.length - 1][0] + 1e-7) g.push(p);
  if(spec.pouso){
    /* a descida final até o local exato (o arquivo do JPL para antes, ou segue numa previsão): Hermite em volta da Lua,
       do último estado até o chão, e o módulo fica lá até o fim da linha do tempo */
    const u = nave[nave.length - 1], jP = jdDe(spec.pouso.t);
    const m0 = hermite(LUA, u.jd), vm0 = velH(LUA, u.jd);
    const q0 = [u.x - m0[0], u.y - m0[1], u.z - m0[2]], w0 = [u.vx - vm0[0], u.vy - vm0[1], u.vz - vm0[2]];
    const alvo = sitioLua(spec.pouso.lat, spec.pouso.lon, jP, spec.pouso.alt || 0), h = (jP - u.jd)*DIA;
    for(let i = 1; i <= 40; i++){
      const t = i/40, jd = u.jd + (jP - u.jd)*t;
      const h00 = 2*t*t*t - 3*t*t + 1, h10 = t*t*t - 2*t*t + t, h01 = -2*t*t*t + 3*t*t;
      let q = [h00*q0[0] + h10*h*w0[0] + h01*alvo[0], h00*q0[1] + h10*h*w0[1] + h01*alvo[1], h00*q0[2] + h10*h*w0[2] + h01*alvo[2]];
      /* a Lua girou nesse meio tempo: o alvo acompanha, e o raio nunca fura o chão */
      const alvoT = sitioLua(spec.pouso.lat, spec.pouso.lon, jd, spec.pouso.alt || 0);
      q = add(q, mul(sub(alvoT, alvo), h01));
      const rq = nrm(q), piso = R_L + (spec.pouso.alt || 0);
      if(rq < piso) q = mul(q, piso/rq);
      g.push([jd].concat(add(hermite(LUA, jd), q)));
    }
    for(let jd = jP + 1/144; jd <= jP + (spec.depois || 0.5) + 1e-9; jd += 1/144) g.push([jd].concat(add(hermite(LUA, jd), sitioLua(spec.pouso.lat, spec.pouso.lon, jd, spec.pouso.alt || 0))));
  }
  if(spec.splash){ const u = g[g.length - 1]; arcoMar(g, [u[1], u[2], u[3]], u[0], jdDe(spec.splash.t), spec.splash.lat, spec.splash.lon); }
  let dMax = 0, tMax = 0; for(const p of g){ const d = Math.hypot(p[1], p[2], p[3]); if(d > dMax){ dMax = d; tMax = p[0]; } }
  console.log('  ' + spec.id + ': ' + nave.length + ' vetores do JPL; distância máxima ' + Math.round(dMax).toLocaleString('pt-BR') + ' km do centro em ' + txtDe(tMax));
  const ev = {}; for(const k in (spec.ev || {})) ev[k] = jdDe(spec.ev[k]);
  if(spec.pouso) ev.pouso = jdDe(spec.pouso.t);
  if(spec.splash) ev.splash = jdDe(spec.splash.t);
  return {jL, g, lm:[], ev, pouso:spec.pouso ? {lat:spec.pouso.lat, lon:spec.pouso.lon} : null, tolK:spec.tolK};
}
/* as amostras do JPL vêm a cada 10 min: perto da Terra ou da Lua a curva fecha e a reta entre elas cortaria caminho.
   Com as velocidades do próprio arquivo, o Hermite cúbico preenche de minuto em minuto (erro de metros) */
function densifica(S){
  const out = [];
  for(let i = 0; i < S.length; i++){
    const A = S[i]; out.push([A.jd, A.x, A.y, A.z]);
    if(i === S.length - 1) break;
    const B = S[i + 1], m = hermite(LUA, A.jd);
    const perto = Math.hypot(A.x, A.y, A.z) < 90000 || Math.hypot(A.x - m[0], A.y - m[1], A.z - m[2]) < 25000;
    if(!perto) continue;
    const n = Math.max(1, Math.round((B.jd - A.jd)*1440)), h = (B.jd - A.jd)*DIA;
    for(let k = 1; k < n; k++){
      const u = k/n, h00 = 2*u*u*u - 3*u*u + 1, h10 = u*u*u - 2*u*u + u, h01 = -2*u*u*u + 3*u*u, h11 = u*u*u - u*u;
      out.push([A.jd + (B.jd - A.jd)*u, h00*A.x + h10*h*A.vx + h01*B.x + h11*h*B.vx, h00*A.y + h10*h*A.vy + h01*B.y + h11*h*B.vy, h00*A.z + h10*h*A.vz + h01*B.z + h11*h*B.vz]);
    }
  }
  return out;
}
/* as FALHAS do arquivo (o próprio JPL avisa no cabeçalho: janelas com vetores quebrados) viram física: o último estado
   bom é integrado para a frente, o primeiro bom depois da falha para trás, e os dois se encontram no fim da janela
   (em volta da Lua, direção e raio interpolados em separado, para a costura não cortar por dentro da Lua).
   As COSTURAS entre arquivos (a posição salta algumas centenas de km com a velocidade igual) são alisadas nas 3 h de antes */
function limpaJPL(spec, S){
  for(const [a, b] of (spec.defeitos || [])){
    const ja = jdDe(a), jb = jdDe(b);
    const i0 = S.findIndex(p=>p.jd >= ja) - 1, i1 = S.findIndex(p=>p.jd > jb);
    if(i0 < 0 || i1 < 0) continue;
    const A = S[i0], B = S[i1], meio = [];
    for(let k = i0 + 1; k < i1; k++) meio.push(S[k].jd);
    const ida = [], volta = [];
    { let r = [A.x, A.y, A.z], v = [A.vx, A.vy, A.vz], jd = A.jd;
      for(const t of meio){ const p = integra(r, v, jd, t); r = p.r; v = p.v; jd = t; ida.push({r, v}); } }
    { let r = [B.x, B.y, B.z], v = [B.vx, B.vy, B.vz], jd = B.jd;
      for(let k = meio.length - 1; k >= 0; k--){ const p = integra(r, v, jd, meio[k]); r = p.r; v = p.v; jd = meio[k]; volta[k] = {r, v}; } }
    const tJ = Math.max(meio[0], meio[meio.length - 1] - 0.5);   /* a emenda: as 12 h finais da janela */
    for(let k = 0; k < meio.length; k++){
      const t = meio[k], w = t <= tJ ? 0 : suave((t - tJ)/Math.max(1e-6, meio[meio.length - 1] - tJ));
      const m = hermite(LUA, t), vm = velH(LUA, t);
      const qa = sub(ida[k].r, m), qb = sub(volta[k].r, m), ra = nrm(qa), rb = nrm(qb);
      let r;
      if(Math.max(ra, rb) < 60000){
        /* direção pelo arco maior-círculo e raio linear */
        const ua = uni(qa), ub = uni(qb), c = Math.max(-1, Math.min(1, dot(ua, ub))), om = Math.acos(c);
        const dir = om < 1e-6 ? ua : add(mul(ua, Math.sin((1 - w)*om)/Math.sin(om)), mul(ub, Math.sin(w*om)/Math.sin(om)));
        r = add(m, mul(uni(dir), ra + (rb - ra)*w));
      } else r = add(mul(ida[k].r, 1 - w), mul(volta[k].r, w));
      const v = add(mul(ida[k].v, 1 - w), mul(volta[k].v, w));
      S[i0 + 1 + k] = {jd:t, x:r[0], y:r[1], z:r[2], vx:v[0], vy:v[1], vz:v[2]};
    }
    console.log('  ' + spec.id + ': falha do arquivo ' + a + ' a ' + b + ' remendada pela física (' + meio.length + ' amostras)');
  }
  /* as COSTURAS: onde uma solução de órbita termina e a outra começa, a posição salta (centenas de km, às vezes com outra
     órbita inteira em volta da Lua). A velha é integrada para a frente, a nova para trás, e as duas se misturam numa
     janela (1,5 h de cada lado perto da Lua, 3 h longe), com direção e raio separados em volta da Lua */
  let costuras = 0;
  if(spec.costuras) for(let i = 0; i < S.length - 1; i++){
    const A = S[i], B = S[i + 1], p = integra([A.x, A.y, A.z], [A.vx, A.vy, A.vz], A.jd, B.jd);
    const J = [B.x - p.r[0], B.y - p.r[1], B.z - p.r[2]];
    if(nrm(J) < 40) continue;
    const mB = hermite(LUA, B.jd), perto = Math.hypot(B.x - mB[0], B.y - mB[1], B.z - mB[2]) < 40000;
    const h = perto ? 1.5/24 : 3/24, ta = B.jd - h, tb = B.jd + h;
    let i0 = i; while(i0 > 0 && S[i0 - 1].jd >= ta) i0--;
    let i1 = i + 1; while(i1 < S.length - 1 && S[i1 + 1].jd <= tb) i1++;
    /* a solução velha levada para a frente, a nova para trás */
    const velha = {}, nova = {};
    { let r = [A.x, A.y, A.z], v = [A.vx, A.vy, A.vz], jd = A.jd; for(let k = i + 1; k <= i1; k++){ const q = integra(r, v, jd, S[k].jd); r = q.r; v = q.v; jd = S[k].jd; velha[k] = {r, v}; } }
    { let r = [B.x, B.y, B.z], v = [B.vx, B.vy, B.vz], jd = B.jd; for(let k = i; k >= i0; k--){ const q = integra(r, v, jd, S[k].jd); r = q.r; v = q.v; jd = S[k].jd; nova[k] = {r, v}; } }
    for(let k = i0; k <= i1; k++){
      const P = S[k], w = suave((P.jd - ta)/(tb - ta));
      const ra = k <= i ? [P.x, P.y, P.z] : velha[k].r, va = k <= i ? [P.vx, P.vy, P.vz] : velha[k].v;
      const rb = k <= i ? nova[k].r : [P.x, P.y, P.z], vb = k <= i ? nova[k].v : [P.vx, P.vy, P.vz];
      const m = hermite(LUA, P.jd), qa = sub(ra, m), qb = sub(rb, m), da = nrm(qa), db = nrm(qb);
      let r;
      if(perto){
        const ua = uni(qa), ub = uni(qb), c = Math.max(-1, Math.min(1, dot(ua, ub))), om = Math.acos(c);
        const dir = om < 1e-6 ? ua : add(mul(ua, Math.sin((1 - w)*om)/Math.sin(om)), mul(ub, Math.sin(w*om)/Math.sin(om)));
        r = add(m, mul(uni(dir), da + (db - da)*w));
      } else r = add(mul(ra, 1 - w), mul(rb, w));
      const v = add(mul(va, 1 - w), mul(vb, w));
      S[k] = {jd:P.jd, x:r[0], y:r[1], z:r[2], vx:v[0], vy:v[1], vz:v[2]};
    }
    i = i1;
    costuras++;
  }
  if(costuras) console.log('  ' + spec.id + ': ' + costuras + ' costura(s) entre arquivos alisada(s)');
  return S;
}
/* latitude e longitude de um ponto (km, eclíptica) na Terra girando */
function latLonTerra(r, jd){
  const E = EPS, q = [r[0], r[1]*Math.cos(E) - r[2]*Math.sin(E), r[1]*Math.sin(E) + r[2]*Math.cos(E)];   /* eclíptica -> equatorial */
  const lat = Math.asin(q[2]/nrm(q))/D2R;
  let lon = (Math.atan2(q[1], q[0]) - gmst(jd))/D2R;
  lon = ((lon + 540) % 360) - 180;
  return [lat, lon];
}
/* decima [jd, x, y, z] contra a interpolação linear no tempo (km); perto de um corpo a tolerância aperta */
function decimaKm(arr, tolDe){
  const n = arr.length; if(n <= 2) return arr.slice();
  const g = new Uint8Array(n); g[0] = g[n - 1] = 1;
  const pilha = [[0, n - 1]];
  while(pilha.length){
    const [i, j] = pilha.pop(); if(j - i < 2) continue;
    const A = arr[i], B = arr[j]; let pior = -1, pk = -1;
    for(let k = i + 1; k < j; k++){
      const P = arr[k], u = (P[0] - A[0])/(B[0] - A[0]);
      const e = Math.hypot(A[1] + (B[1] - A[1])*u - P[1], A[2] + (B[2] - A[2])*u - P[2], A[3] + (B[3] - A[3])*u - P[3])/tolDe(P);
      if(e > pior){ pior = e; pk = k; }
    }
    if(pior > 1){ g[pk] = 1; pilha.push([i, pk], [pk, j]); }
  }
  return arr.filter((_, k)=>g[k]);
}
function grava(id, M, fonte){
  const jd0 = M.jL;
  const longa = (M.g[M.g.length - 1][0] - M.g[0][0]) > 12;
  if(M.seg && M.seg.length){
    const posSeg = (sg, jd)=>add(hermite(LUA, jd), mul(rotEixo(sg.u, sg.n, sg.w*(jd - sg.a)), sg.r));
    const dentro = jd=>M.seg.some(sg=>jd > sg.a + 1e-9 && jd < sg.b - 1e-9);
    const g2 = M.g.filter(p=>!dentro(p[0]));
    for(const sg of M.seg) for(const jd of [sg.a, sg.b]) if(!g2.some(p=>Math.abs(p[0] - jd) < 1e-9)) g2.push([jd].concat(posSeg(sg, jd)));
    g2.sort((p, q)=>p[0] - q[0]);
    M.g = g2;
  }
  const tol = P=>{ const dT = Math.hypot(P[1], P[2], P[3]), m = hermite(LUA, P[0]), dL = Math.hypot(P[1] - m[0], P[2] - m[1], P[3] - m[2]);
    const base = (longa ? 4 + 2.5e-3*Math.min(dT, dL) : 0.5 + 2e-4*Math.min(dT, dL))*(M.tolK || 1);
    return Math.min(base, 0.2 + 0.05*Math.max(0, Math.min(dT - R_T, dL - R_L))); };
  const gD = decimaKm(M.g, tol), lmD = M.lm && M.lm.length ? decimaKm(M.lm, tol) : [];
  const jA = M.g[0][0] - 0.25, jB = M.g[M.g.length - 1][0] + 0.25, passoM = (jB - jA) > 30 ? 0.25 : 0.125;
  const mD = []; for(let jd = jA; jd <= jB + passoM; jd += passoM){ const m = hermite(LUA, jd); mD.push([jd, m[0], m[1], m[2]]); }
  const flat = a=>{ const o = []; for(const p of a) o.push(+(p[0] - jd0).toFixed(6), Math.round(p[1]*10)/10, Math.round(p[2]*10)/10, Math.round(p[3]*10)/10); return o; };
  const ev = {}; for(const k in M.ev) ev[k] = +(M.ev[k] - jd0).toFixed(6);
  const obj = {jd0:+jd0.toFixed(6), geo:1, g:flat(gD), m:flat(mD), mdt:passoM, ev};
  if(M.pouso) obj.pouso = M.pouso;
  if(M.seg && M.seg.length) obj.seg = M.seg.map(sg=>({a:+(sg.a - jd0).toFixed(7), b:+(sg.b - jd0).toFixed(7), u:sg.u.map(v=>+v.toFixed(8)), n:sg.n.map(v=>+v.toFixed(8)), r:+sg.r.toFixed(2), w:sg.w}));
  if(M.lmNome) obj.lmNome = M.lmNome;
  if(lmD.length) obj.lm = flat(lmD);
  const dia = new Date().toISOString().slice(0, 10);
  const js = '/* trajetória de ' + id + ' · ' + fonte + ' · a Lua e o Sol do JPL Horizons · gerado por tools/lunar.js em ' + dia + ' · não editar a mão */\n'
    + '(window.EFEM = window.EFEM || {})[' + JSON.stringify(id) + '] = ' + JSON.stringify(obj) + ';\n';
  fs.mkdirSync(path.join(__dirname, '..', 'efem'), {recursive:true});
  fs.writeFileSync(path.join(__dirname, '..', 'efem', id + '.js'), js);
  console.log('  efem/' + id + '.js · ' + (js.length/1024).toFixed(1) + ' KB · ' + gD.length + ' pontos da nave' + (lmD.length ? ', ' + lmD.length + ' do módulo' : '') + ', ' + mD.length + ' da Lua');
}
function integraSemLua(r0, v0, jdA, jdB){ const l = LAMB; LAMB = 0; const o = integra(r0, v0, jdA, jdB); LAMB = l; return o; }
const MISSOES = [
  {id:'apollo8', tipo:'orbita', fonte:'integrada com os horários do relatório de missão (NASA MSC-PA-R-69-1)', lanc:'1968-12-21 12:51:00', base:[28.608422, -80.604133], azim:72.124, incl:32.509, hPark:184.8,
    ins:'1968-12-21 13:02:25', tli:'1968-12-21 15:44:17', loi:'1968-12-24 09:59:20', hLua:111, inclLua:12, loiPonto:{lat:-7.46, lon:-163.98}, loi2:'1968-12-24 14:26:07', periodoLOI1Min:128.7, periodoMin:118.9,
    tei:'1968-12-25 06:10:17', teiLat:-9.27, teiLon:174.78, ei:{t:'1968-12-27 15:37:13', lat:20.83, lon:-179.89}, splash:{t:'1968-12-27 15:51:42', lat:8.10, lon:-165.00}},
  {id:'apollo11', tipo:'pouso', fonte:'integrada com os horários do relatório de missão (NASA MSC-00171)', lanc:'1969-07-16 13:32:00', base:[28.608422, -80.604133], azim:72.058, incl:32.521, hPark:184.5,
    ins:'1969-07-16 13:43:49', tli:'1969-07-16 16:19:10', loi:'1969-07-19 17:21:50', hLua:111, loi2:'1969-07-19 21:43:37', periodoMin:118.25, periodoLOI1Min:[124, 134],
    pouso:{t:'1969-07-20 20:17:40', lat:0.67408, lon:23.47297}, deco:'1969-07-21 17:54:01', acop:'1969-07-21 21:35:00', lmNome:'EAGLE',
    tei:'1969-07-22 04:55:42', teiLat:-0.16, teiLon:164.02, ei:{t:'1969-07-24 16:35:05.7', lat:-3.19, lon:171.96}, splash:{t:'1969-07-24 16:50:35', lat:13.30, lon:-169.15}},
  {id:'apollo13', tipo:'sobrevoo', fonte:'integrada com os horários do relatório de missão (NASA MSC-02680)', lanc:'1970-04-11 19:13:00', base:[28.608422, -80.604133], azim:72.043, incl:32.547, hPark:184.8,
    ins:'1970-04-11 19:25:40', tli:'1970-04-11 21:51:41', peri:{t:'1970-04-15 00:33:57', lat:3.02, lon:-179.29, alt:254}, explosao:'1970-04-14 03:07:53.6', pc2:'1970-04-15 02:42:51',
    ei:{t:'1970-04-17 17:53:47', lat:-28.22, lon:173.49}, splash:{t:'1970-04-17 18:07:41', lat:-21.63, lon:-165.37}},
  {id:'apollo17', tipo:'pouso', fonte:'integrada com os horários do relatório de missão (NASA JSC-07904)', lanc:'1972-12-07 05:33:00', base:[28.608422, -80.604133], azim:91.504, incl:28.526, hPark:167,
    ins:'1972-12-07 05:44:53', tli:'1972-12-07 08:48:32', loi:'1972-12-10 19:47:23', hLua:97.4, loi2:'1972-12-11 00:04:37', periodoMin:114.7, periodoLOI1Min:[124, 134],
    pouso:{t:'1972-12-11 19:54:58', lat:20.19080, lon:30.77168}, deco:'1972-12-14 22:54:37', acop:'1972-12-15 01:10:15', lmNome:'CHALLENGER',
    tei:'1972-12-16 23:35:09', teiDv:0.9284, ei:{t:'1972-12-19 19:11:38', lat:0.71, lon:-173.36}, splash:{t:'1972-12-19 19:24:59', lat:-17.88, lon:-166.11}},
  {id:'luna9', tipo:'direta', fonte:'integrada com os horários de Siddiqi (NASA SP-2018-4041) e do NSSDCA', lanc:'1966-01-31 11:41:37', base:[45.996, 63.564], azim:62.8, incl:51.85, hPark:193,
    ins:'1966-01-31 11:50:30', tli:'1966-01-31 12:48:00', pouso:{t:'1966-02-03 18:45:30', lat:7.08, lon:-64.37}, depois:3.2},
  {id:'luna16', tipo:'robo', fonte:'integrada com os horários de Siddiqi e da Academia de Ciências da URSS (1970)', lanc:'1970-09-12 13:25:52', base:[46.059, 62.983], azim:62.8, incl:51.6, hPark:190,
    ins:'1970-09-12 13:35:00', tli:'1970-09-12 14:36:00', loi:'1970-09-16 23:38:14', hLua:110, qualquerSentido:true, fase2:'1970-09-18 12:00:00', periodo1Min:119, periodo2Min:114,
    pouso:{t:'1970-09-20 05:18:00', lat:-0.5137, lon:56.3638}, deco:'1970-09-21 07:43:21',
    ei:{t:'1970-09-24 05:10:00'}, splash:{t:'1970-09-24 05:26:00', lat:47.4, lon:68.6}},
  {id:'change4', tipo:'robo', fonte:'integrada com os horários da CNSA e de Sun et al. (2019)', lanc:'2018-12-07 18:23:34', base:[28.246, 102.027], azim:97, incl:28.5, hPark:205,
    ins:'2018-12-07 18:37:00', tli:'2018-12-07 18:41:00', loi:'2018-12-12 08:45:00', hLua:100, qualquerSentido:true, fase2:'2018-12-30 00:55:00', periodo1Min:118, periodo2Min:112,
    pouso:{t:'2019-01-03 02:26:00', lat:-45.4446, lon:177.5991}, depois:0.8},
  {id:'artemis1', tipo:'jpl', cmd:'-1023', fonte:'vetores reais do JPL Horizons (-1023, a trajetória medida da Orion)', lanc:'2022-11-16 06:47:44', base:[28.6272, -80.6208],
    ins:'2022-11-16 06:56:00', queima:'2022-11-16 08:26:00', jplDe:'2022-11-16 08:47:00', jplAte:'2022-12-11 17:19:00', splash:{t:'2022-12-11 17:40:13', lat:27.34852, lon:-118.10181}, tolK:0.25},
  {id:'artemis2', tipo:'jpl', cmd:'-1024', fonte:'vetores reais do JPL Horizons (-1024, a trajetória medida da Orion Integrity)', lanc:'2026-04-01 22:35:12', base:[28.6272, -80.6208],
    ins:'2026-04-01 22:44:00', queima:'2026-04-02 00:23:00', jplDe:'2026-04-02 01:59:00', jplAte:'2026-04-10 23:50:00', splash:{t:'2026-04-11 00:07:00', lat:32.34, lon:-117.76}},
  {id:'slim', tipo:'jpl', cmd:'-240', fonte:'vetores reais do JPL Horizons (-240)', lanc:'2023-09-06 23:42:11', base:[30.401, 130.978],
    ins:'2023-09-06 23:55:00', queima:'2023-09-07 00:29:44', jplDe:'2023-09-07 00:33:00', jplAte:'2024-01-19 15:00:00',
    defeitos:[['2023-09-11 02:35', '2023-09-11 03:05'], ['2023-12-25 23:45', '2024-01-09 00:05']],
    pouso:{t:'2024-01-19 15:19:57', lat:-13.295493, lon:25.224867, alt:-0.79}, depois:0.5, tolK:3, costuras:true}
];
async function principal(){
  const pedidos = process.argv.slice(2);
  for(const spec of MISSOES.filter(m=>!pedidos.length || pedidos.includes(m.id))){
    console.log('\n' + spec.id + ' ...');
    const M = spec.tipo === 'pouso' ? await missaoPouso(spec) : spec.tipo === 'orbita' ? await missaoOrbita(spec) : spec.tipo === 'sobrevoo' ? await missaoSobrevoo(spec)
      : spec.tipo === 'direta' ? await missaoDireta(spec) : spec.tipo === 'robo' ? await missaoRobo(spec) : await missaoJPL(spec);
    grava(spec.id, M, spec.fonte);
  }
}
if(require.main === module) principal().catch(e=>{ console.error('FALHA: ' + (e && e.stack || e)); process.exit(1); });
module.exports = {MISSOES, missaoOrbita, missaoSobrevoo, missaoDireta, missaoRobo, missaoJPL, resolveIdaNo, giraNo, poloLua, impacto, selenografico, missaoPouso, grava, latLonTerra, decimaKm, estacionamento, estadoPark, resolveIda, resolveVolta, POLO_T, integraSemLua, miraCont, trajetoria, maisPerto, newton, geo, hermite, velH, integra, mira, sitioTerra, sitioLua, gmst, add, sub, mul, dot, crs, nrm, uni, rotEixo, jdDe, txtDe, MU_T, MU_L, R_T, R_L, DIA, D2R,
  set LUA(v){ LUA = v; }, set SOL(v){ SOL = v; }, horizons};
