/* A FOTOGRAFIA DOS TLE (r261): baixa os grupos do CelesTrak que a camada
   SATELITES AO VIVO usa e grava tle_snapshot.js na raiz, para o app ter os
   satelites mesmo sem rede (file:// ou CelesTrak fora do ar). Os TLE valem
   bem por uns dias e razoavelmente por semanas: rodar de vez em quando.
   Uso: node tools/tle.js                                                   */
const fs = require('fs'), path = require('path');
const GRUPOS = ['stations', 'visual', 'gps-ops', 'galileo', 'glo-ops', 'science'];
(async ()=>{
  const grupos = {};
  let total = 0;
  for(const g of GRUPOS){
    const r = await fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=' + g + '&FORMAT=tle');
    if(!r.ok) throw new Error(g + ': HTTP ' + r.status);
    const txt = (await r.text()).replace(/\r/g, '');
    const n = txt.split('\n').filter(l=>l[0] === '1').length;
    grupos[g] = txt; total += n;
    console.log(g.padEnd(9) + n + ' satelites · ' + txt.length + ' bytes');
  }
  const dia = new Date().toISOString().slice(0, 10);
  const js = '/* fotografia dos TLE do CelesTrak (r261) · gerada por tools/tle.js em ' + dia + ' · nao editar a mao */\n'
    + 'window.TLE_SNAPSHOT = ' + JSON.stringify({dia, grupos}) + ';\n';
  fs.writeFileSync(path.join(__dirname, '..', 'tle_snapshot.js'), js);
  console.log('tle_snapshot.js · ' + total + ' satelites · ' + (js.length/1024).toFixed(0) + ' KB · ' + dia);
})().catch(e=>{ console.error('FALHA: ' + e.message); process.exit(1); });
