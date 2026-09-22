/* A MATRIZ DE FUMACAS (r312): roda a sonda de fumaca (tools/fumaca.js) nas quatro
   combinacoes que importam, em sequencia (um Chrome por vez: a maquina carregada
   faz o boot do headless passar de 3 s para 60 s, r291), e resume. Nasceu do
   achado da varredura do r311: a matriz pt/en x cenico/1:1 x sistema/corpo vivia
   na memoria, nao num script, e o boot por LINK DE CORPO ficou quatro builds
   quebrado sem ninguem abrir o app nele.
   Uso: node tools/fumacas.js            (sai 1 se alguma rodada nao der TUDO OK)
        node tools/fumacas.js rapido     (so as duas rodadas de sistema=sol)     */
const { spawnSync } = require('child_process'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const TODAS = [
  ['sistema=sol', 'pt-BR'],
  ['sistema=sol&escala=real', 'en-US'],
  ['corpo=terra', 'pt-BR'],
  ['corpo=terra&escala=real', 'en-US'],
];
const rodadas = process.argv[2] === 'rapido' ? TODAS.slice(0, 2) : TODAS;
let falhas = 0;
for(const [hash, lang] of rodadas){
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [path.join(__dirname, 'sonda.js'), hash, path.join(__dirname, 'fumaca.js'), lang, '240'], {cwd: RAIZ, encoding: 'utf8', timeout: 300000});
  const saida = ((r.stdout || '') + (r.stderr || '')).trim().split('\n').filter(l => l.trim()).pop() || '(sem saida)';
  const ok = /TUDO OK/.test(saida);
  if(!ok) falhas++;
  console.log((ok ? 'ok    ' : 'FALHOU') + ' · ' + hash + ' · ' + lang + ' · ' + Math.round((Date.now() - t0)/1000) + 's');
  if(!ok) console.log('       ' + saida.slice(0, 600));
}
console.log(falhas ? '\n' + falhas + ' rodada(s) com problema.' : '\nMatriz inteira verde (' + rodadas.length + ' rodadas).');
process.exit(falhas ? 1 : 0);
