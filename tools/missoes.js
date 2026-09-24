/* AUDITORIA DAS MISSÕES (r316: refeita sobre a sonda em tempo real, tools/sonda.js).
   Uso: node tools/missoes.js            (as duas sondas nos dois modos)
        node tools/missoes.js lua        (só as missões lunares)
        node tools/missoes.js jpl        (só as sondas, visitantes e cometas do JPL)

   LUA (tools/sonda_missoes_lua.js), para cada uma das dez missões lunares:
   - BASE: a nave no instante zero contra a base de lançamento na Terra desenhada, girada para a mesma hora
     (1:1 até 20 km; cênico até 0,01 raio da Terra desenhada)
   - POUSO: o módulo (Apollo) ou a própria nave contra o local na Lua desenhada, orientada pela rotação IAU
   - MAR: a amerissagem contra o ponto oficial
   - LUA: a menor distância ao centro da Lua desenhada, em raios dela (nunca abaixo de 0,998: ninguém fura a Lua)
   - e o EIXO da Terra (0 grau do polo celeste) e zero erros
   JPL (tools/sonda_missoes_jpl.js), para cada sonda e cometa: em cada marco de sobrevoo, a distância ao planeta
   desenhado; no 1:1 nunca mais perto que o rasante do JPL e no máximo algumas vezes a distância dele, no cênico ficar a poucos raios dele.
   Sai com código 1 se algo falhar. A versão antiga (tempo virtual, rota por perfil) morreu com as rotas reais. */
const cp = require('child_process'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const quais = process.argv[2] || 'tudo';
let falhas = 0;
function roda(hash, sonda, lang){
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, 'sonda.js'), hash, path.join(__dirname, sonda), lang, '600'], {cwd:RAIZ, encoding:'utf8', timeout:700000});
  const saida = (r.stdout || '') + (r.stderr || ''), i = saida.indexOf('OK · {');
  if(i < 0){ console.log('  SONDA NÃO FECHOU: ' + saida.slice(-300)); falhas++; return null; }
  const j = saida.lastIndexOf('} · ');
  try{ return JSON.parse(saida.slice(i + 5, j + 1)); }catch(e){ console.log('  JSON ilegível'); falhas++; return null; }
}
const num = s=>parseFloat(String(s).replace(/\./g, '').replace(',', '.'));
function checaLua(D){
  const real = D.modo === '1:1';
  if(D.erros){ console.log('  ERROS: ' + D.erros + ' · ' + D.primeiroErro); falhas++; }
  if(!/^0\.000/.test(D.eixo)){ console.log('  EIXO DA TERRA: ' + D.eixo); falhas++; }
  for(const id in D.out){
    const r = D.out[id], ruim = [];
    if(typeof r === 'string'){ console.log('  ' + id.padEnd(10) + ' FALHOU · ' + r); falhas++; continue; }
    const lim = (txt, kmMax, rdMax)=>{ if(!txt) return true; const v = parseFloat(txt); return real ? v <= kmMax : v <= rdMax; };
    if(!lim(r.base, 20, 0.01)) ruim.push('base ' + r.base);
    if(r.pouso && !lim(r.pouso.replace(/^\D+/, ''), 5, 0.01)) ruim.push('pouso ' + r.pouso);
    if(!lim(r.mar, 20, 0.01)) ruim.push('mar ' + r.mar);
    if(parseFloat(r.menorDistLua) < 0.998) ruim.push('fura a Lua ' + r.menorDistLua);
    console.log('  ' + id.padEnd(10) + (ruim.length ? ' FALHOU · ' + ruim.join(' · ') : ' ok · base ' + r.base + (r.pouso ? ' · pouso ' + r.pouso.split(' do ')[0] : '') + (r.mar ? ' · mar ' + r.mar : '') + ' · Lua ' + r.menorDistLua.split(' ')[0]));
    if(ruim.length) falhas++;
  }
}
function checaJpl(D){
  const real = D.modo === '1:1';
  if(D.erros){ console.log('  ERROS: ' + D.erros + ' · ' + D.primeiroErro); falhas++; }
  for(const id in D.out){
    const r = D.out[id], ruim = [];
    if(typeof r === 'string'){ console.log('  ' + id.padEnd(12) + ' FALHOU · ' + r); falhas++; continue; }
    const zonas = (r.zonas || '').split(', ').filter(Boolean).map(z=>{ const m = z.match(/^(\S+) (\d+)km$/); return m ? {c:m[1], d:+m[2]} : null; }).filter(Boolean);
    let n = 0;
    for(const mk of (r.marcos || [])){
      const m = mk.match(/· ao (\S+) (.+)$/); if(!m) continue; n++;
      if(real){
        const d = num(m[2]), zs = zonas.filter(z=>z.c === m[1]);
        if(!zs.length) continue;
        const dz = zs.reduce((a, z)=>Math.abs(z.d - d) < Math.abs(a - d) ? z.d : a, zs[0].d);
        /* o marco pode não ser o instante do rasante (a chegada da Cassini, a órbita da Viking): nunca mais perto que o
           rasante do JPL, e no máximo algumas vezes a distância dele */
        if(d < 0.9*dz - 500 || d > Math.max(5*dz, dz + 3000)) ruim.push(mk + ' (JPL ' + dz + ' km)');
      } else {
        const mm = m[2].match(/([\d.]+) un \(raio ([\d.]+)/);
        if(mm && +mm[1] > 4*(+mm[2]) + 0.3) ruim.push(mk);
      }
    }
    console.log('  ' + id.padEnd(12) + (ruim.length ? ' FALHOU · ' + ruim.join(' | ') : ' ok · ' + n + ' sobrevoo(s) no planeta desenhado'));
    if(ruim.length) falhas++;
  }
}
for(const [hash, lang] of [['sistema=sol&escala=real', 'pt-BR'], ['sistema=sol', 'pt-BR']]){
  const modo = /escala=real/.test(hash) ? 'ESCALA 1:1' : 'MAPA CÊNICO';
  if(quais !== 'jpl'){ console.log('\nMISSÕES LUNARES · ' + modo); const D = roda(hash, 'sonda_missoes_lua.js', lang); if(D) checaLua(D); }
  if(quais !== 'lua'){ console.log('\nROTAS DO JPL · ' + modo); const D = roda(hash, 'sonda_missoes_jpl.js', lang); if(D) checaJpl(D); }
}
console.log(falhas ? '\n' + falhas + ' problema(s).' : '\nAuditoria inteira verde.');
process.exit(falhas ? 1 : 0);
