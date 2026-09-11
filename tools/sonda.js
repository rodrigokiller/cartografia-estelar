/* SONDA EM TEMPO REAL (r261): abre o app num Chrome headless com GPU real e a porta
   de depuracao (o mesmo CDP do tools/video.js) e avalia um trecho de JS de sonda a
   cada 250 ms ate ele escrever window.__res (ou estourar o tempo). Diferente do
   mkshot + --virtual-time-budget, aqui o relogio e o de verdade: o laco de render
   roda sozinho, fetch e scripts injetados funcionam e nada pendura o orcamento.
   Uso: node tools/sonda.js "<hash>" <arquivo-da-sonda.js> [lang] [timeoutSeg]
        node tools/sonda.js "sistema=sol&escala=real" ../sonda.js pt-BR 90
   O trecho de sonda e o MESMO molde do mkshot (roda dentro de um try, com
   window.__err, window.__rafCb e window.__res).                              */
const fs = require('fs'), path = require('path'), cp = require('child_process'), http = require('http');
const HASH = process.argv[2] || 'sistema=sol', SONDA = process.argv[3], LANG = process.argv[4] || 'pt-BR', TMAX = +(process.argv[5] || 90);
if(!SONDA){ console.error('uso: node tools/sonda.js "<hash>" <sonda.js> [lang] [timeoutSeg]'); process.exit(2); }
const RAIZ = path.join(__dirname, '..');
const PORTA = 9433 + Math.floor(Math.random()*100);
const CHROMES = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'];
const chrome = CHROMES.find(p=>fs.existsSync(p));
if(!chrome){ console.error('nao achei o Chrome'); process.exit(1); }
const corpo = fs.readFileSync(SONDA, 'utf8');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const topo = `<script>
window.__err = [];
window.addEventListener('error', function(e){ window.__err.push(e.message + ' @linha ' + e.lineno); });
(function(){ var r0 = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function(cb){ window.__rafCb = cb; return r0(cb); }; })();
<\/script>\n`;
const iS = html.indexOf('<script');
const pagina = path.join(RAIZ, '_sonda.html');
fs.writeFileSync(pagina, html.slice(0, iS) + topo + html.slice(iS) + '\n<script>window.__sonda = function(){\n' + corpo + '\n};<\/script>');
function esperaJson(tent){
  return new Promise((ok, erro)=>{
    const tenta = ()=>{
      http.get('http://127.0.0.1:' + PORTA + '/json', res=>{
        let s = ''; res.on('data', d=>s += d); res.on('end', ()=>{
          try{ const lst = JSON.parse(s); const pg = lst.find(x=>x.type === 'page'); if(pg) return ok(pg); }catch(e){}
          if(tent-- > 0) setTimeout(tenta, 400); else erro(new Error('sem pagina no CDP'));
        });
      }).on('error', ()=>{ if(tent-- > 0) setTimeout(tenta, 400); else erro(new Error('CDP nao respondeu')); });
    };
    tenta();
  });
}
class CDP {
  constructor(url){ this.ws = new WebSocket(url); this.id = 0; this.pend = new Map();
    this.pronto = new Promise(ok=>{ this.ws.addEventListener('open', ok); });
    this.ws.addEventListener('message', ev=>{ const m = JSON.parse(ev.data); if(m.id && this.pend.has(m.id)){ const {ok, erro} = this.pend.get(m.id); this.pend.delete(m.id); m.error ? erro(new Error(m.error.message)) : ok(m.result); } }); }
  send(method, params){ const id = ++this.id; return new Promise((ok, erro)=>{ this.pend.set(id, {ok, erro}); this.ws.send(JSON.stringify({id, method, params:params || {}})); }); }
  async eval(expr){ const r = await this.send('Runtime.evaluate', {expression:expr, returnByValue:true, awaitPromise:true}); if(r.exceptionDetails) throw new Error('JS: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text)); return r.result.value; }
  fecha(){ try{ this.ws.close(); }catch(e){} }
}
const dorme = ms=>new Promise(ok=>setTimeout(ok, ms));
(async ()=>{
  const perfil = path.join(require('os').tmpdir(), 'universatlas-sonda-' + process.pid);
  const proc = cp.spawn(chrome, ['--headless=new', '--no-sandbox', '--lang=' + LANG, '--hide-scrollbars', '--remote-debugging-port=' + PORTA,
    '--user-data-dir=' + perfil, '--window-size=1000,760', 'file:///' + pagina.replace(/\\/g, '/') + '#' + HASH], {stdio:'ignore'});
  const t0 = Date.now();
  let cdp = null, saida = 'TIMEOUT';
  try{
    const pg = await esperaJson(50);
    cdp = new CDP(pg.webSocketDebuggerUrl); await cdp.pronto;
    await cdp.send('Runtime.enable');
    while(Date.now() - t0 < TMAX*1000){
      const r = await cdp.eval(`(function(){ try{ if(typeof window.__sonda !== 'function') return ''; if(window.__err && window.__err.length) return 'ERRO DE BOOT: ' + window.__err.slice(0, 3).join(' || '); window.__sonda(); return window.__res || ''; }catch(err){ return 'ERRO-SONDA: ' + err.message + ' ' + String(err.stack || '').replace(/\\s+/g, ' ').slice(0, 300); } })()`).catch(e=>'');
      if(r){ saida = r; break; }
      await dorme(250);
    }
  }catch(e){ saida = 'FALHA: ' + e.message; }
  console.log(saida + ' · ' + ((Date.now() - t0)/1000).toFixed(1) + 's');
  if(cdp) cdp.fecha(); proc.kill();
  try{ fs.unlinkSync(pagina); }catch(e){}
  try{ fs.rmSync(perfil, {recursive:true, force:true}); }catch(e){}
  process.exit(saida === 'TIMEOUT' || /^ERRO|^FALHA/.test(saida) ? 1 : 0);
})();
