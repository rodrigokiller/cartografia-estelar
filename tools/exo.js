/* O CENSO DOS EXOPLANETAS (r310): baixa a tabela pscomppars do NASA Exoplanet
   Archive (uma linha por planeta confirmado, parametros compostos) e grava
   exo.js na raiz, compacto, para a camada EXOPLANETAS do mapa 1:1. O TAP do
   arquivo responde 200 SEM cabecalho CORS, entao o navegador nao pode buscar
   direto: e fonte de BUILD, como o tle_snapshot.js. Rodar de vez em quando.
   Uso: node tools/exo.js
   Formato gravado (window.EXO):
     dia            a data da geracao
     met[k]         os nomes dos metodos de descoberta
     h[i]  = [nome, RA em horas, Dec em graus, distancia em anos-luz, n planetas, temperado 0/1, tipo espectral, Teff K, raio Sois, massa Sois]  (r313: os tres ultimos podem ser null)
     p[j]  = [i da estrela, nome, raio em Terras, massa em Terras, periodo em dias, Teq em K, ano, k do metodo]
   Temperado = tem ao menos um planeta com raio < 1,8 Terras e Teq entre 180 e 320 K
   (a faixa em que agua liquida e concebivel; e um filtro, nao uma promessa).   */
const fs = require('fs'), path = require('path');
const COLS = 'hostname,ra,dec,sy_dist,pl_name,pl_rade,pl_bmasse,pl_orbper,pl_eqt,disc_year,discoverymethod,st_spectype,st_teff,st_rad,st_mass';   /* r313: a estrela medida (temperatura, raio, massa) para o sistema gerado */
const URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+' + COLS + '+from+pscomppars&format=csv';
function csv(txt){
  /* o CSV do arquivo poe aspas so nos campos com virgula ou espaco: parser simples com aspas */
  const linhas = txt.replace(/\r/g, '').split('\n').filter(l => l.length);
  const out = [];
  for(const l of linhas){
    const campos = []; let cur = '', q = false;
    for(let i = 0; i < l.length; i++){
      const c = l[i];
      if(c === '"'){ q = !q; continue; }
      if(c === ',' && !q){ campos.push(cur); cur = ''; continue; }
      cur += c;
    }
    campos.push(cur); out.push(campos);
  }
  return out;
}
const num = (s, d) => { const n = parseFloat(s); return isFinite(n) ? +n.toFixed(d) : null; };
(async ()=>{
  const r = await fetch(URL);
  if(!r.ok) throw new Error('HTTP ' + r.status);
  const rows = csv(await r.text()); rows.shift();
  const hosts = new Map(), met = [], p = [];
  for(const c of rows){
    const [host, ra, dec, dist, pl, rade, masse, per, teq, ano, metodo, spec, teff, srad, smass] = c;
    const dpc = parseFloat(dist); if(!isFinite(dpc) || dpc <= 0) continue;
    if(!hosts.has(host)) hosts.set(host, {i:hosts.size, nome:host, ra:num(+ra/15, 3), dec:num(dec, 2), ly:num(dpc*3.26156, 1), n:0, temp:0, spec:(spec || '').trim(), teff:num(teff, 0), srad:num(srad, 2), smass:num(smass, 2)});
    const H = hosts.get(host); H.n++;
    let k = met.indexOf(metodo); if(k < 0){ met.push(metodo); k = met.length - 1; }
    const R = num(rade, 2), T = num(teq, 0);
    if(R !== null && R < 1.8 && T !== null && T >= 180 && T <= 320) H.temp = 1;
    p.push([H.i, pl, R, num(masse, 1), num(per, 2), T, parseInt(ano) || null, k]);
  }
  const h = [...hosts.values()].map(H => [H.nome, H.ra, H.dec, H.ly, H.n, H.temp, H.spec, H.teff, H.srad, H.smass]);
  const dia = new Date().toISOString().slice(0, 10);
  const js = '/* o censo dos exoplanetas confirmados (r310) · NASA Exoplanet Archive, tabela pscomppars · gerado por tools/exo.js em ' + dia + ' · nao editar a mao */\n'
    + 'window.EXO = ' + JSON.stringify({dia, met, h, p}) + ';\n';
  fs.writeFileSync(path.join(__dirname, '..', 'exo.js'), js);
  const temp = h.filter(x => x[5]).length;
  console.log('exo.js · ' + p.length + ' planetas · ' + h.length + ' estrelas (' + temp + ' com mundo temperado) · ' + met.length + ' metodos · ' + (js.length/1024).toFixed(0) + ' KB · ' + dia);
})().catch(e=>{ console.error('FALHA: ' + e.message); process.exit(1); });
