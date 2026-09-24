/* AS TRAJETÓRIAS REAIS (r315): baixa do JPL Horizons os vetores de cada sonda e visitante
   e grava efem/<id>.js (carregado sob demanda pela linha do tempo) e efem/resumo.js (a
   linha do mapa, carregada no boot). O Horizons não manda CORS: é fonte de BUILD, como o
   exo.js e o tle_snapshot.js. Rodar de novo quando uma missão ativa avançar.
   Uso: node tools/efem.js [id ...]      (sem id: todos)

   O que vai em cada arquivo (window.EFEM[id]):
     jd0          o JD (UTC) do instante zero
     h            [t, x, y, z, ...] heliocêntrico, eclíptica J2000, UA, t em dias desde jd0
     enc[k]       {c: corpo do app, dout: raio da zona em UA, p: [t, x, y, z, ...] em km, relativo ao corpo}
     fim          dia (desde jd0) em que a missão acaba de verdade (pouso, mergulho)
   A interpolação no app é LINEAR no tempo; por isso a decimação mede o erro contra a
   interpolação linear no tempo (não contra a linha geométrica): o que sobra reproduz a
   posição E a velocidade dentro da tolerância.
   Perto de um planeta a posição sai do vetor RELATIVO ao planeta: o Kepler aproximado do
   app erra o planeta em até milhões de km (Saturno em 1981: 12,8 milhões, medido), e sem
   isso a sonda passaria longe do planeta desenhado.
   Viking 1 não tem trajetória no Horizons e a Pathfinder só tem a partir de 4 FEV 1997:
   o trecho que falta é a solução de LAMBERT entre a Terra do lançamento e o ponto de
   chegada (dois corpos, o Sol no foco), que é a transferência que a nave fez. */
const fs = require('fs'), path = require('path');
const BASE = 'https://ssd.jpl.nasa.gov/api/horizons.api';
const AU = 149597870.7, MU_SOL = 2.9591220828559115e-4;   /* UA^3/dia^2 (GM do Sol, k^2) */
let ultimo = 0;
async function espera(){ const d = Date.now() - ultimo; if(d < 700) await new Promise(r=>setTimeout(r, 700 - d)); ultimo = Date.now(); }
async function horizons(par){
  const p = new URLSearchParams(); p.set('format', 'text');
  for(const [k, v] of Object.entries(par)) p.set(k, "'" + v + "'");
  for(let i = 0; i < 4; i++){
    await espera();
    try{
      const r = await fetch(BASE + '?' + p.toString());
      const t = await r.text();
      if(r.status === 503 || r.status === 429){ await new Promise(r=>setTimeout(r, 4000)); continue; }
      return t;
    }catch(e){ await new Promise(r=>setTimeout(r, 3000)); }
  }
  throw new Error('Horizons não respondeu');
}
function lerVetores(t){
  const a = t.indexOf('$$SOE'), b = t.indexOf('$$EOE');
  if(a < 0 || b < 0) throw new Error('sem vetores: ' + t.slice(0, 400));
  return t.slice(a + 5, b).trim().split(/\r?\n/).filter(Boolean).map(l=>{
    const c = l.split(',').map(s=>s.trim());
    return {jd:+c[0], x:+c[2], y:+c[3], z:+c[4]};
  });
}
async function vetores(cmd, ini, fim, passo, centro, km){
  const t = await horizons({COMMAND:cmd, OBJ_DATA:'NO', MAKE_EPHEM:'YES', EPHEM_TYPE:'VECTORS', CENTER:centro || '500@10',
    REF_PLANE:'ECLIPTIC', REF_SYSTEM:'J2000', OUT_UNITS:km ? 'KM-S' : 'AU-D', VEC_TABLE:'1', TIME_TYPE:'UT',
    START_TIME:ini, STOP_TIME:fim, STEP_SIZE:passo, CSV_FORMAT:'YES'});
  return lerVetores(t);
}
/* datas: Horizons fala 'YYYY-MM-DD HH:MM'; aqui tudo vira JD (UTC) */
const jdDe = s => Date.parse(s.replace(' ', 'T') + (s.length <= 10 ? 'T00:00' : '') + ':00Z')/86400000 + 2440587.5;
const txtDe = jd => new Date((jd - 2440587.5)*86400000).toISOString().slice(0, 16).replace('T', ' ');
/* série relativa a um corpo: o centro direto, ou (asteroide) a diferença de duas heliocêntricas no mesmo instante */
async function serieRel(cmd, jdA, jdB, passoDias, centro){
  if(!/^SB:/.test(centro)) return serie(cmd, jdA, jdB, passoDias, centro, true);
  const a = await serie(cmd, jdA, jdB, passoDias), b = await serie(centro.slice(3), jdA, jdB, passoDias);   /* o número com ponto e vírgula: DES= casava designações provisórias */
  const out = [];
  for(let i = 0, j = 0; i < a.length && j < b.length;){
    if(Math.abs(a[i].jd - b[j].jd) < 1e-6){ out.push({jd:a[i].jd, x:(a[i].x - b[j].x)*AU, y:(a[i].y - b[j].y)*AU, z:(a[i].z - b[j].z)*AU}); i++; j++; }
    else if(a[i].jd < b[j].jd) i++; else j++;
  }
  return out;
}
/* busca longa em pedaços (o Horizons limita a saída) */
async function serie(cmd, jdA, jdB, passoDias, centro, km){
  const out = [], maxN = 20000;
  let a = jdA;
  while(a < jdB - 1e-9){
    const b = Math.min(jdB, a + passoDias*maxN);
    const passo = passoDias >= 1 ? Math.round(passoDias) + ' d' : Math.round(passoDias*1440) + ' m';
    const v = await vetores(cmd, txtDe(a), txtDe(b), passo, centro, km);
    for(const s of v) if(!out.length || s.jd > out[out.length - 1].jd + 1e-9) out.push(s);
    a = b;
  }
  return out;
}
/* ---------- decimação contra a interpolação LINEAR NO TEMPO ---------- */
function decima(pts, tol){
  const n = pts.length; if(n <= 2) return pts.slice();
  const guarda = new Uint8Array(n); guarda[0] = guarda[n - 1] = 1;
  const pilha = [[0, n - 1]];
  while(pilha.length){
    const [i, j] = pilha.pop(); if(j - i < 2) continue;
    const A = pts[i], B = pts[j], dt = B.jd - A.jd;
    let pior = -1, pk = -1;
    for(let k = i + 1; k < j; k++){
      const P = pts[k], u = (P.jd - A.jd)/dt;
      const ex = A.x + (B.x - A.x)*u - P.x, ey = A.y + (B.y - A.y)*u - P.y, ez = A.z + (B.z - A.z)*u - P.z;
      const e = Math.hypot(ex, ey, ez)/tol(P);
      if(e > pior){ pior = e; pk = k; }
    }
    if(pior > 1){ guarda[pk] = 1; pilha.push([i, pk], [pk, j]); }
  }
  return pts.filter((_, k)=>guarda[k]);
}
const tolH = P => 1.5e-5*Math.hypot(P.x, P.y, P.z) + 2e-6;        /* UA: 3 mil km a 1 UA, 0,2 raio de Júpiter a 5 UA */
const tolP = P => 8e-4*Math.hypot(P.x, P.y, P.z) + 4;             /* km, perto do planeta: 12 km a 10 mil km, 280 km a 350 mil */
const tolR = P => 6e-4*Math.hypot(P.x, P.y, P.z) + 2e-4;          /* UA, a linha do MAPA (resumo) */
let TOLTOUR = 2.5e-3;
const tolTour = P => TOLTOUR*Math.hypot(P.x, P.y, P.z) + 30;       /* km, a ÓRBITA em volta do planeta (a Cassini em Saturno: 13 anos) */
/* ---------- Lambert (variáveis universais, Bate-Mueller-White), o Sol no foco ---------- */
function stumpff(z){
  if(z > 1e-6){ const s = Math.sqrt(z); return {C:(1 - Math.cos(s))/z, S:(s - Math.sin(s))/(s*s*s)}; }
  if(z < -1e-6){ const s = Math.sqrt(-z); return {C:(Math.cosh(s) - 1)/(-z), S:(Math.sinh(s) - s)/(s*s*s)}; }
  return {C:1/2, S:1/6};
}
function lambert(r1, r2, tof, mu){
  const R1 = Math.hypot(...r1), R2 = Math.hypot(...r2);
  const cz = r1[0]*r2[1] - r1[1]*r2[0];
  let dth = Math.acos(Math.max(-1, Math.min(1, (r1[0]*r2[0] + r1[1]*r2[1] + r1[2]*r2[2])/(R1*R2))));
  if(cz < 0) dth = 2*Math.PI - dth;   /* prógrado visto do norte da eclíptica */
  const A = Math.sin(dth)*Math.sqrt(R1*R2/(1 - Math.cos(dth)));
  const y = z=>{ const s = stumpff(z); return R1 + R2 + A*(z*s.S - 1)/Math.sqrt(s.C); };
  const F = z=>{ const s = stumpff(z), yy = y(z); return Math.pow(yy/s.C, 1.5)*s.S + A*Math.sqrt(yy) - Math.sqrt(mu)*tof; };
  let lo = -4*Math.PI*Math.PI, hi = 4*Math.PI*Math.PI;
  while(y(lo) < 0) lo += 0.1;
  for(let k = 0; k < 200; k++){ const m = (lo + hi)/2; if(F(m) > 0) hi = m; else lo = m; }
  const z = (lo + hi)/2, yy = y(z);
  const f = 1 - yy/R1, g = A*Math.sqrt(yy/mu);
  return r1.map((c, i)=>(r2[i] - f*c)/g);   /* velocidade na partida */
}
/* propaga dois corpos (Kepler universal) a partir de r0, v0 por dt dias */
function propaga(r0, v0, dt, mu){
  const R0 = Math.hypot(...r0), V0 = Math.hypot(...v0), vr0 = (r0[0]*v0[0] + r0[1]*v0[1] + r0[2]*v0[2])/R0;
  const alfa = 2/R0 - V0*V0/mu;
  let x = Math.sqrt(mu)*Math.abs(alfa)*dt;
  for(let k = 0; k < 100; k++){
    const z = alfa*x*x, s = stumpff(z);
    const Fx = R0*vr0/Math.sqrt(mu)*x*x*s.C + (1 - alfa*R0)*x*x*x*s.S + R0*x - Math.sqrt(mu)*dt;
    const dF = R0*vr0/Math.sqrt(mu)*x*(1 - alfa*x*x*s.S) + (1 - alfa*R0)*x*x*s.C + R0;
    const d = Fx/dF; x -= d; if(Math.abs(d) < 1e-12) break;
  }
  const z = alfa*x*x, s = stumpff(z);
  const f = 1 - x*x/R0*s.C, g = dt - x*x*x/Math.sqrt(mu)*s.S;
  return r0.map((c, i)=>f*c + g*v0[i]);
}
/* ---------- quem é quem ---------- */
const CENTROS = {terra:'500@399', venus:'500@299', marte:'500@499', jupiter:'500@599', saturno:'500@699', urano:'500@799', netuno:'500@899', plutao:'500@999',
  dinkinesh:'SB:152830;', eurybates:'SB:3548;', patroclus:'SB:617;'};   /* o Horizons não aceita asteroide como centro: a série relativa sai da diferença das duas heliocêntricas */
/* a zona de cada corpo em UA: dentro dela a posição sai do vetor relativo; o tamanho vem do mapa CÊNICO
   (3 raios desenhados divididos pela escala do lugar, senão a rota atravessaria o planeta desenhado) */
const RAIO = {terra:6371, venus:6052, marte:3390, jupiter:71492, saturno:60268, urano:25559, netuno:24764, plutao:1188, dinkinesh:0.4, eurybates:32, patroclus:57};
const DOUT = {terra:0.18, venus:0.154, marte:0.173, jupiter:1.45, saturno:1.81, urano:2.09, netuno:2.8, plutao:0.97, dinkinesh:0.06, eurybates:0.06, patroclus:0.06};
const ALVOS = [
  {id:'voyager1', cmd:'-31', ini:'1977-09-05 14:00', fim:'2031-01-01', passo:1, enc:[['terra','1977-09-05 14:00'],['jupiter','1979-03-05 12:05'],['saturno','1980-11-12 23:46']]},
  {id:'voyager2', cmd:'-32', ini:'1977-08-20 15:40', fim:'2031-01-01', passo:1, enc:[['terra','1977-08-20 15:40'],['jupiter','1979-07-09 22:29'],['saturno','1981-08-26 03:24'],['urano','1986-01-24 18:00'],['netuno','1989-08-25 03:57']]},
  {id:'pioneer10', cmd:'-23', ini:'1972-03-03 02:10', fim:'2031-01-01', passo:1, enc:[['terra','1972-03-03 02:10'],['jupiter','1973-12-04 02:26']]},
  {id:'newhorizons', cmd:'-98', ini:'2006-01-19 20:00', fim:'2031-01-01', passo:1, enc:[['terra','2006-01-19 20:00'],['jupiter','2007-02-28 05:43'],['plutao','2015-07-14 11:50']]},
  {id:'cassini', cmd:'-82', ini:'1997-10-15 09:30', fim:'2017-09-15 10:31', passo:0.5, fim_real:'2017-09-15 10:31', enc:[['terra','1997-10-15 09:30'],['venus','1998-04-26 13:44'],['venus','1999-06-24 20:30'],['terra','1999-08-18 03:28'],['jupiter','2000-12-30 10:05'],['saturno','2004-07-01 02:48','fim']], tolTour:7e-3},
  {id:'pathfinder', cmd:'-530', ini:'1997-02-04 02:40', fim:'1997-10-15 00:00', passo:0.5, lanc:'1996-12-04 06:58', enc:[['terra','1996-12-04 06:58'],['marte','1997-07-04 16:52','fim']]},
  {id:'viking1', lambert:true, lanc:'1975-08-20 21:22', chega:'1976-06-19 12:00', fim:'1976-10-20 00:00', enc:[['terra','1975-08-20 21:22'],['marte','1976-06-19 12:00','fim']]},
  {id:'juice', cmd:'-28', ini:'2023-04-14 12:50', fim:'2031-07-21 06:00', passo:0.5, enc:[['terra','2023-04-14 12:50'],['terra','2024-08-20 21:56'],['venus','2025-08-31 05:28'],['terra','2026-09-28 11:45'],['terra','2029-01-18 00:00'],['jupiter','2031-07-21 06:00']]},
  {id:'clipper', cmd:'-159', ini:'2024-10-14 16:20', fim:'2030-04-11 00:00', passo:0.5, enc:[['terra','2024-10-14 16:20'],['marte','2025-03-01 17:57'],['terra','2026-12-03 20:14'],['jupiter','2030-04-11 00:00']]},
  {id:'lucy', cmd:'-49', ini:'2021-10-16 10:40', fim:'2033-04-02 17:00', passo:0.5, enc:[['terra','2021-10-16 10:40'],['terra','2022-10-16 11:04'],['dinkinesh','2023-11-01 16:54'],['terra','2024-12-13 04:17'],['eurybates','2027-08-12 00:00'],['patroclus','2033-03-02 00:00']]},
  {id:'parker', cmd:'-96', ini:'2018-08-12 08:20', fim:'2027-01-01', passo:0.125, tolK:4, enc:[['terra','2018-08-12 08:20'],['venus','2018-10-03 08:44'],['venus','2019-12-26 18:14'],['venus','2020-07-11 03:22'],['venus','2021-02-20 20:05'],['venus','2021-10-16 19:16'],['venus','2023-08-21 12:00'],['venus','2024-11-06 06:00']]},
  /* os visitantes: a trajetória integrada do Horizons (com as perturbações), na janela da linha do tempo */
  {id:'oumuamua', cmd:'DES=1I;', ini:'2016-01-01', fim:'2031-01-01', passo:1, enc:[]},
  {id:'atlas3i', cmd:'DES=C/2025 N1;', ini:'2025-01-01', fim:'2031-01-01', passo:0.5, enc:[]},
  {id:'tsuchinshan', cmd:'DES=C/2023 A3;', ini:'2022-06-01', fim:'2031-01-01', passo:0.5, enc:[]},
  {id:'atlasg3', cmd:'DES=C/2024 G3;', ini:'2024-01-01', fim:'2031-01-01', passo:0.25, enc:[]},
  {id:'hyakutake', cmd:'DES=C/1996 B2;', ini:'1995-06-01', fim:'2031-01-01', passo:0.5, enc:[['terra','1996-03-25 06:00']]},
  {id:'mcnaught', cmd:'DES=C/2006 P1;', ini:'2006-01-01', fim:'2031-01-01', passo:0.5, enc:[]},
  /* os periódicos: a trajetória integrada (com Júpiter e companhia puxando), nas voltas de cada linha do tempo */
  {id:'halley', cmd:'DES=1P;CAP;', ini:'1680-01-01', fim:'2062-12-31', passo:2, enc:[]},
  {id:'p67', cmd:'DES=67P;CAP;', ini:'2014-06-01', fim:'2029-01-01', passo:1, enc:[]},
  {id:'swift', cmd:'DES=109P;CAP;', ini:'1991-06-01', fim:'2127-01-01', passo:2, enc:[]},
  {id:'encke', cmd:'DES=2P;CAP;', ini:'2023-06-01', fim:'2027-06-01', passo:0.5, enc:[]},
  {id:'tempeltuttle', cmd:'DES=55P;CAP;', ini:'1997-06-01', fim:'2032-01-01', passo:1, enc:[]},
  {id:'wirtanen', cmd:'DES=46P;CAP;', ini:'2018-06-01', fim:'2030-06-01', passo:1, enc:[]},
  {id:'giacobini', cmd:'DES=21P;CAP;', ini:'2018-03-01', fim:'2032-06-01', passo:1, enc:[]},
  {id:'tuttle', cmd:'DES=8P;CAP;', ini:'2007-06-01', fim:'2036-01-01', passo:1, enc:[]},
  {id:'ponsbrooks', cmd:'DES=12P;CAP;', ini:'1953-06-01', fim:'2096-06-01', passo:2, enc:[]},
  {id:'thatcher', cmd:'DES=C/1861 G1;', ini:'1860-06-01', fim:'2277-01-01', passo:5, enc:[]}
];
/* ---------- uma sonda ---------- */
async function assa(A){
  console.log('\n' + A.id + ' ...');
  TOLTOUR = A.tolTour || 2.5e-3;
  let h = [], jH0 = 0;
  if(A.lambert){
    /* Viking 1: Lambert Terra (lançamento) -> Marte (chegada), depois presa a Marte */
    const j1 = jdDe(A.lanc), j2 = jdDe(A.chega), j3 = jdDe(A.fim);
    const T = (await vetores('399', txtDe(j1), txtDe(j1 + 0.01), '1 m'))[0], M = (await vetores('499', txtDe(j2), txtDe(j2 + 0.01), '1 m'))[0];
    /* a mira é o ponto de chegada, 300 km acima de Marte do lado do Sol (não o centro do planeta) */
    const rM = Math.hypot(M.x, M.y, M.z), kM = 1 - (3390 + 300)/AU/rM;
    const r1 = [T.x, T.y, T.z], r2 = [M.x*kM, M.y*kM, M.z*kM];
    const v1 = lambert(r1, r2, j2 - j1, MU_SOL);
    for(let d = 0; d < j2 - j1 - 1e-6; d += 0.5){ const r = propaga(r1, v1, d, MU_SOL); h.push({jd:j1 + d, x:r[0], y:r[1], z:r[2]}); }
    { const r = propaga(r1, v1, j2 - j1, MU_SOL); h.push({jd:j2, x:r[0], y:r[1], z:r[2]}); }
    const chegou = h[h.length - 1];
    console.log('  lambert: erro na chegada ' + (Math.hypot(chegou.x - r2[0], chegou.y - r2[1], chegou.z - r2[2])*AU).toFixed(0) + ' km');
    /* depois da chegada a nave fica em Marte (o orbitador e o módulo de pouso): no lado do Sol, a 300 km de altitude */
    const marte = await serie('499', j2 + 1, j3, 2);
    for(const q of marte){ const r = Math.hypot(q.x, q.y, q.z), k = 1 - (3390 + 300)/AU/r; q.x *= k; q.y *= k; q.z *= k; }
    h = h.concat(marte);
    jH0 = h[0].jd;
  } else {
    const jA = jdDe(A.ini), jB = jdDe(A.fim);
    h = await serie(A.cmd, jA, jB, A.passo);
    /* os PERIÉLIOS: o Halley passa por ele em semanas e a Parker em horas; cada mínimo perto do Sol é refeito com passo fino */
    { const rr = h.map(q=>Math.hypot(q.x, q.y, q.z)); let extra = [], nP = 0;
      for(let i = 1; i < h.length - 1; i++){
        if(!(rr[i] < rr[i - 1] && rr[i] <= rr[i + 1] && rr[i] < 1.6)) continue;
        const q = rr[i], W = Math.max(3, Math.min(40, q*40)), st = Math.max(0.01, Math.min(0.25, q*0.5));
        if(W/st > 8000) continue;
        extra = extra.concat(await serie(A.cmd, Math.max(jA, h[i].jd - W), Math.min(jB, h[i].jd + W), st)); nP++;
      }
      if(nP){ h = h.concat(extra).sort((a, b)=>a.jd - b.jd).filter((q, k, v)=>k === 0 || q.jd > v[k - 1].jd + 1e-7); console.log('  ' + nP + ' periélio(s) refinado(s)'); } }
    jH0 = h[0].jd;
    if(A.lanc){
      /* Pathfinder: o trecho sem dados entre o lançamento e o primeiro vetor, por Lambert */
      const j1 = jdDe(A.lanc), p0 = h[0];
      const T = (await vetores('399', txtDe(j1), txtDe(j1 + 0.01), '1 m'))[0];
      const r1 = [T.x, T.y, T.z], r2 = [p0.x, p0.y, p0.z];
      const v1 = lambert(r1, r2, p0.jd - j1, MU_SOL);
      const pre = [];
      for(let d = 0; d < p0.jd - j1 - 0.25; d += 0.5){ const r = propaga(r1, v1, d, MU_SOL); pre.push({jd:j1 + d, x:r[0], y:r[1], z:r[2]}); }
      console.log('  lambert do lançamento: ' + pre.length + ' pontos');
      h = pre.concat(h);
    }
  }
  const jd0 = h[0].jd;
  const hD = decima(h, P=>tolH(P)*(A.tolK || 1));   /* r316 · tolK: a Parker (24 periélios) com a régua 4 vezes mais grossa */
  console.log('  heliocêntrico: ' + h.length + ' -> ' + hD.length + ' pontos');
  /* os encontros: a zona de cada corpo, em vetores relativos, com o miolo refinado ao minuto */
  const enc = [];
  for(const [c, quando, ate] of (A.enc || [])){
    const centro = CENTROS[c], dout = DOUT[c];
    const jc = jdDe(quando);
    let rel;
    if(A.lambert || (A.lanc && jc < h[0].jd + 0.5 && c === 'terra')){
      /* sem vetor relativo no Horizons: a diferença das posições heliocêntricas (sonda do Lambert - corpo do Horizons) */
      const cod = {terra:'399', marte:'499'}[c];
      const lo = Math.max(jd0, jc - 400), hi = ate === 'fim' ? h[h.length - 1].jd : Math.min(h[h.length - 1].jd, jc + 400);
      const corpo = await serie(cod, lo, hi, 0.5);
      rel = [];
      /* o instante do lançamento entra de propósito: a nave sai do centro da Terra (senão a zona só começava 12 h depois) */
      if(c === 'terra' && Math.abs(h[0].jd - jc) < 0.01) rel.push({jd:h[0].jd, x:0, y:0, z:0});
      for(const s of corpo){
        if(rel.length && s.jd <= rel[rel.length - 1].jd + 1e-7) continue;
        const p = interp(h, s.jd); if(!p) continue;
        rel.push({jd:s.jd, x:(p.x - s.x)*AU, y:(p.y - s.y)*AU, z:(p.z - s.z)*AU});
      }
    } else {
      /* grosso (meio dia) em +-400 dias para achar a zona; cada PERIAPSE perto do corpo é refinada
         (20 min em +-1 dia, 2 min em +-2 h quando passa rasante): a Cassini tem 294 delas em Saturno */
      const lo = Math.max(jH0, jc - 400), hi = ate === 'fim' ? h[h.length - 1].jd : Math.min(h[h.length - 1].jd, jc + 400);
      const grosso = await serieRel(A.cmd, lo, hi, 0.5, centro);
      const R = RAIO[c] || 1, lim = Math.max(60*R, 2e6);
      const dd = grosso.map(s=>Math.hypot(s.x, s.y, s.z));
      const mins = [];
      for(let i = 0; i < grosso.length; i++){
        const ehMin = (i === 0 || dd[i] < dd[i - 1]) && (i === grosso.length - 1 || dd[i] <= dd[i + 1]);
        if(ehMin && dd[i] < lim) mins.push(i);
      }
      let extra = [];
      for(const i of mins){
        const jm = grosso[i].jd;
        const med = await serieRel(A.cmd, Math.max(lo, jm - 1), Math.min(hi, jm + 1), 20/1440, centro);
        extra = extra.concat(med);
        let km = 0; for(let k = 1; k < med.length; k++) if(Math.hypot(med[k].x, med[k].y, med[k].z) < Math.hypot(med[km].x, med[km].y, med[km].z)) km = k;
        const ehAst = /^SB:/.test(centro);   /* asteroide: o rasante dura minutos (Dinkinesh a 425 km, 4,5 km/s): passo de 1 min */
        if(ehAst || Math.hypot(med[km].x, med[km].y, med[km].z) < 12*R){
          const jf = med[km].jd;
          extra = extra.concat(await serieRel(A.cmd, Math.max(lo, jf - (ehAst ? 1/24 : 1/12)), Math.min(hi, jf + (ehAst ? 1/24 : 1/12)), (ehAst ? 1 : 2)/1440, centro));
        }
      }
      rel = grosso.concat(extra).sort((a, b)=>a.jd - b.jd).filter((s, k, v)=>k === 0 || s.jd > v[k - 1].jd + 1e-7);
      if(mins.length) console.log('  ' + c + ': ' + mins.length + ' periapse(s) refinada(s)');
    }
    /* a zona é o trecho CONTÍNUO dentro de dout em volta do encontro (a mesma Terra pode ser visitada duas vezes) */
    let kc = 0; for(let k = 1; k < rel.length; k++) if(Math.abs(rel[k].jd - jc) < Math.abs(rel[kc].jd - jc)) kc = k;
    const dentroK = k=>Math.hypot(rel[k].x, rel[k].y, rel[k].z) < dout*AU;
    if(!dentroK(kc)){ console.log('  ' + c + ': fora da zona de ' + dout + ' UA na data do encontro'); continue; }
    let ka = kc, kb = kc;
    while(ka > 0 && dentroK(ka - 1)) ka--;
    while(kb < rel.length - 1 && dentroK(kb + 1)) kb++;
    const j0 = rel[ka].jd, j1 = rel[kb].jd;
    const zona = rel.slice(Math.max(0, ka - 1), Math.min(rel.length, kb + 2));
    const zD = decima(zona, ate === 'fim' ? tolTour : tolP);
    let dmin = 1e99, tmin = 0; for(const s of zona){ const d = Math.hypot(s.x, s.y, s.z); if(d < dmin){ dmin = d; tmin = s.jd; } }
    console.log('  ' + c + ': zona ' + txtDe(j0) + ' a ' + txtDe(j1) + ' · ' + zona.length + ' -> ' + zD.length + ' pontos · mínimo ' + dmin.toFixed(0) + ' km em ' + txtDe(tmin));
    enc.push({c, dout, zD, dmin, tmin, zona});
  }
  /* o heliocêntrico dentro do MIOLO de uma zona (peso 1, d < 0,33 dout) nunca é lido: sai do arquivo, menos as bordas */
  const miolos = enc.map(e=>{ const dentro = e.zona.filter(q=>Math.hypot(q.x, q.y, q.z) < 0.33*e.dout*AU); return dentro.length ? [dentro[0].jd, dentro[dentro.length - 1].jd] : null; }).filter(Boolean);
  const noMiolo = q=>miolos.some(m=>q.jd > m[0] && q.jd < m[1]);
  const hD2 = hD.filter((q, k)=>!noMiolo(q) || (k > 0 && !noMiolo(hD[k - 1])) || (k < hD.length - 1 && !noMiolo(hD[k + 1])));
  if(hD2.length < hD.length) console.log('  heliocêntrico sem os miolos: ' + hD.length + ' -> ' + hD2.length);
  /* grava */
  const f7 = x=>+x.toPrecision(8), f5 = x=>+x.toFixed(5);
  const H = []; for(const s of hD2) H.push(f5(s.jd - jd0), f7(s.x), f7(s.y), f7(s.z));
  const E = enc.map(e=>{ const P = []; for(const s of e.zD) P.push(f5(s.jd - jd0), Math.round(s.x), Math.round(s.y), Math.round(s.z)); return {c:e.c, dout:e.dout, dmin:Math.round(e.dmin), tmin:f5(e.tmin - jd0), p:P}; });
  const obj = {jd0:+jd0.toFixed(6), h:H, enc:E};
  if(A.fim_real) obj.fim = f5(jdDe(A.fim_real) - jd0);
  const dia = new Date().toISOString().slice(0, 10);
  const js = '/* trajetória real de ' + A.id + ' · JPL Horizons ' + (A.cmd || 'Lambert Terra-Marte (sem trajetória no Horizons)') + ' · gerado por tools/efem.js em ' + dia + ' · não editar a mão */\n'
    + '(window.EFEM = window.EFEM || {})[' + JSON.stringify(A.id) + '] = ' + JSON.stringify(obj) + ';\n';
  fs.mkdirSync(path.join(__dirname, '..', 'efem'), {recursive:true});
  fs.writeFileSync(path.join(__dirname, '..', 'efem', A.id + '.js'), js);
  console.log('  efem/' + A.id + '.js · ' + (js.length/1024).toFixed(1) + ' KB');
  /* a linha do mapa (resumo): bem mais grossa */
  const hR = decima(h, tolR);
  return {id:A.id, jd0:+jd0.toFixed(6), fim:obj.fim, p:[].concat(...hR.map(s=>[f5(s.jd - jd0), +s.x.toPrecision(6), +s.y.toPrecision(6), +s.z.toPrecision(6)]))};
}
/* O RESUMO (carregado no boot): a linha do mapa só existe para quem vai embora (sondas e visitantes); os cometas
   periódicos e a Parker desenham a órbita pelos elementos, então levam só a marca de que têm rota real (o arquivo
   completo desce quando a linha do tempo abre). Perto de HOJE (60 dias para cada lado) a linha fica fina: é onde o
   corpo do mapa está agora, e a JUICE passa pela Terra no fim de setembro de 2026 */
const SEM_LINHA = new Set(['parker', 'halley', 'p67', 'swift', 'encke', 'tempeltuttle', 'wirtanen', 'giacobini', 'tuttle', 'ponsbrooks', 'thatcher']);
function refazResumo(){
  const dir = path.join(__dirname, '..', 'efem'), resumo = {}, hoje = Date.now()/86400000 + 2440587.5;
  global.window = global.window || {};
  for(const A of ALVOS){
    const arq = path.join(dir, A.id + '.js'); if(!fs.existsSync(arq)) continue;
    delete (window.EFEM || {})[A.id];
    new Function('window', fs.readFileSync(arq, 'utf8'))(window);
    const E = window.EFEM[A.id];
    if(SEM_LINHA.has(A.id)){ resumo[A.id] = {jd0:E.jd0, fim:E.fim, sem:1}; continue; }
    const pts = []; for(let k = 0; k < E.h.length; k += 4) pts.push({jd:E.jd0 + E.h[k], x:E.h[k + 1], y:E.h[k + 2], z:E.h[k + 3]});
    const perto = P=>Math.abs(P.jd - hoje) < 60;
    const hR = decima(pts, P=>perto(P) ? tolH(P) : tolR(P));
    const f5 = x=>+x.toFixed(5);
    resumo[A.id] = {jd0:E.jd0, fim:E.fim, p:[].concat(...hR.map(q=>[f5(q.jd - E.jd0), +q.x.toPrecision(6), +q.y.toPrecision(6), +q.z.toPrecision(6)]))};
  }
  const dia = new Date().toISOString().slice(0, 10);
  const js = '/* as linhas das sondas e dos visitantes no mapa (a versão grossa do efem/<id>.js; os cometas periódicos e a Parker só com a marca) · JPL Horizons · gerado por tools/efem.js em ' + dia + ' · não editar a mão */\n'
    + 'window.EFEM_RESUMO = ' + JSON.stringify(resumo) + ';\n';
  fs.writeFileSync(path.join(dir, 'resumo.js'), js);
  console.log('\nefem/resumo.js · ' + (js.length/1024).toFixed(1) + ' KB · ' + Object.keys(resumo).length + ' trajetórias');
}
function interp(h, jd){
  if(jd < h[0].jd || jd > h[h.length - 1].jd) return null;
  let lo = 0, hi = h.length - 1;
  while(hi - lo > 1){ const m = (lo + hi) >> 1; if(h[m].jd <= jd) lo = m; else hi = m; }
  const A = h[lo], B = h[hi], u = (jd - A.jd)/Math.max(1e-12, B.jd - A.jd);
  return {x:A.x + (B.x - A.x)*u, y:A.y + (B.y - A.y)*u, z:A.z + (B.z - A.z)*u};
}
(async()=>{
  /* r316 · --resumo refaz o resumo a partir dos efem/<id>.js já assados, sem ir ao Horizons */
  if(process.argv[2] === '--resumo'){ refazResumo(); return; }
  const pedidos = process.argv.slice(2);
  const lista = pedidos.length ? ALVOS.filter(a=>pedidos.includes(a.id)) : ALVOS;
  const arqR = path.join(__dirname, '..', 'efem', 'resumo.js');
  let resumo = {};
  if(pedidos.length && fs.existsSync(arqR)){ const s = fs.readFileSync(arqR, 'utf8'); resumo = JSON.parse(s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1)); }
  const grava = ()=>{
  const dia = new Date().toISOString().slice(0, 10);
  const js = '/* as linhas das sondas e dos visitantes no mapa (a versão grossa do efem/<id>.js) · JPL Horizons · gerado por tools/efem.js em ' + dia + ' · não editar a mão */\n'
    + 'window.EFEM_RESUMO = ' + JSON.stringify(resumo) + ';\n';
  fs.writeFileSync(arqR, js);
  return js.length;
  };
  /* o resumo é gravado a cada objeto: uma falha no meio não perde o que já foi feito */
  for(const A of lista){ await assa(A); }
  refazResumo();
})().catch(e=>{ console.error('FALHA: ' + e.message); process.exit(1); });
