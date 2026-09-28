/* SONDA DA CONTAGEM DE VISITAS (r318): serve a pasta em http://127.0.0.1, abre o app num
   Chrome sem tela CHEGANDO com referrer e utm falsos e em modo ?analise=log, e confere:
   1) em localhost NADA é pedido ao Umami (a rede inteira é vigiada pelo CDP) e ANL.on é falso;
   2) os envios são montados certos (a primeira página leva o referrer e os utm_* da chegada, as
      páginas virtuais são legíveis e não repetem quando o lugar não muda, os eventos têm os nomes
      e as propriedades combinadas), lendo ANL.hist e um stub de window.umami;
   3) ?nao-contar=1 grava carto:naocontar e desliga.
   Uso: node tools/sonda_analise.js [timeoutSeg]      (sai 1 se algo falhar)             */
const fs = require('fs'), path = require('path'), cp = require('child_process'), http = require('http');
const RAIZ = path.join(__dirname, '..');
const TMAX = +(process.argv[2] || 120);
const CHROMES = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'];
const chrome = CHROMES.find(p=>fs.existsSync(p));
if(!chrome){ console.error('nao achei o Chrome'); process.exit(1); }
const PORTA = 9533 + Math.floor(Math.random()*100), HPORTA = 8700 + Math.floor(Math.random()*100);
const MIME = {'.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css', '.json':'application/json', '.jpg':'image/jpeg', '.png':'image/png', '.mp3':'audio/mpeg', '.svg':'image/svg+xml', '.txt':'text/plain', '.xml':'text/xml', '.md':'text/plain'};
const servidor = http.createServer((req, res)=>{
  const u = decodeURIComponent(req.url.split('?')[0]); const f = path.join(RAIZ, u === '/' ? 'index.html' : u);
  if(!f.startsWith(RAIZ) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ res.writeHead(404); return res.end(); }
  res.writeHead(200, {'Content-Type': MIME[path.extname(f)] || 'application/octet-stream'}); fs.createReadStream(f).pipe(res);
}).listen(HPORTA, '127.0.0.1');
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
  constructor(url){ this.ws = new WebSocket(url); this.id = 0; this.pend = new Map(); this.ouv = {};
    this.pronto = new Promise(ok=>{ this.ws.addEventListener('open', ok); });
    this.ws.addEventListener('message', ev=>{ const m = JSON.parse(ev.data);
      if(m.id && this.pend.has(m.id)){ const {ok, erro} = this.pend.get(m.id); this.pend.delete(m.id); m.error ? erro(new Error(m.error.message)) : ok(m.result); }
      else if(m.method && this.ouv[m.method]) this.ouv[m.method](m.params); }); }
  on(m, cb){ this.ouv[m] = cb; }
  send(method, params){ const id = ++this.id; return new Promise((ok, erro)=>{ this.pend.set(id, {ok, erro}); this.ws.send(JSON.stringify({id, method, params:params || {}})); }); }
  async eval(expr){ const r = await this.send('Runtime.evaluate', {expression:expr, returnByValue:true, awaitPromise:true}); if(r.exceptionDetails) throw new Error('JS: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text)); return r.result.value; }
  fecha(){ try{ this.ws.close(); }catch(e){} }
}
const dorme = ms=>new Promise(ok=>setTimeout(ok, ms));
const URL0 = 'http://127.0.0.1:' + HPORTA + '/index.html?analise=log&utm_source=instagram&utm_medium=cpc&utm_campaign=teste&lang=pt#sistema=sol';
(async ()=>{
  const perfil = path.join(require('os').tmpdir(), 'universatlas-sonda-anl-' + process.pid);
  const proc = cp.spawn(chrome, ['--headless=new', '--no-sandbox', '--lang=pt-BR', '--hide-scrollbars', '--remote-debugging-port=' + PORTA, '--user-data-dir=' + perfil, '--window-size=1000,760', 'about:blank'], {stdio:'ignore'});
  const t0 = Date.now(); let cdp = null; const falhas = [], hosts = new Set(); let saida = '';
  const ok = (cond, msg)=>{ if(!cond) falhas.push(msg); return cond; };
  try{
    const pg = await esperaJson(50);
    cdp = new CDP(pg.webSocketDebuggerUrl); await cdp.pronto;
    await cdp.send('Runtime.enable'); await cdp.send('Page.enable'); await cdp.send('Network.enable');
    cdp.on('Network.requestWillBeSent', p=>{ try{ hosts.add(new URL(p.request.url).hostname); }catch(e){} });
    await cdp.send('Page.navigate', {url:URL0, referrer:'http://l.instagram.com/'});
    /* espera o boot fechar */
    let pronto = false;
    while(Date.now() - t0 < TMAX*1000){
      pronto = await cdp.eval(`(function(){ try{ return typeof ACT !== 'undefined' && !!ACT && !!ACT.scene && typeof ANL !== 'undefined' && document.getElementById('boot').classList.contains('off'); }catch(e){ return false; } })()`).catch(()=>false);
      if(pronto) break; await dorme(400);
    }
    if(!ok(pronto, 'o boot nao fechou em ' + TMAX + ' s')) throw new Error('boot');
    await dorme(600);
    const R = await cdp.eval(`(function(){
      const R = {};
      try{
        ['boasvindas','cmpcard','ceulocal','registro','linhadotempo','satvivo'].forEach(k=>TUT.v.add(k));
        R.on0 = ANL.on; R.log = ANL.log; R.webdriver = !!navigator.webdriver; R.ref = document.referrer;
        R.hist0 = JSON.parse(JSON.stringify(ANL.hist));
        R.scripts = [...document.scripts].map(s=>s.src).filter(s=>/umami/i.test(s));
        /* o stub: a partir daqui os envios seriam feitos de verdade */
        window.__cap = [];
        window.umami = {track:(a, b)=>{ let p; if(typeof a === 'function') p = a({hostname:location.hostname, language:navigator.language, referrer:document.referrer, screen:'1x1', title:document.title, url:location.pathname + location.search, website:ANL.ID}); else p = {name:a, data:b}; window.__cap.push(p); }};
        ANL.on = true; ANL.pronto = true;
        ACTION('focus', 'marte'); syncHash(); syncHash();                       /* 1 pagina /corpo/marte, sem repetir */
        openCompare(ALLBODIES.terra, ALLBODIES.saturno); closeCmp();            /* comparar + conquista comparar */
        abrirHab('terra'); document.getElementById('habshare').click(); document.getElementById('habpopx').click();   /* /bancada, compartilhar bancada, volta */
        findOpen(); document.getElementById('findin').value = 'zzzzqqq'; findRender('zzzzqqq'); findClose();          /* busca nao */
        findOpen(); findRender('marte'); findGo();                                /* busca sim */
        missOpen(); missClose();                                                  /* registro */
        localAbre(-23.55, -46.63); document.getElementById('localvista').click(); localFecha();   /* /planetario/terra, compartilhar planetario, abriu */
        { const cv = document.getElementById('cardvista'); if(cv) cv.click(); }  /* compartilhar vista */
        { const a = document.createElement('a'); a.href = 'https://exemplo.org/pagina'; a.textContent = 'x'; a.addEventListener('click', e=>e.preventDefault()); document.body.appendChild(a); a.click(); a.remove(); }   /* saida */
        R.linkBase = anlLinkBase();                                               /* o link copiado sai sem os utm_* */
        gotoSystem('sol');                                                        /* /sistema/sol (a troca é animada: o resultado é lido depois) */
      }catch(e){ R.excecao = e.message + ' ' + String(e.stack || '').slice(0, 300); }
      return R;
    })()`);
    await dorme(3500);   /* o gotoSystem troca de cena com animação: o syncHash dele vem depois */
    Object.assign(R, await cdp.eval(`(function(){ return {cap:window.__cap, hist:JSON.parse(JSON.stringify(ANL.hist)), n:ANL.n, erros:(window.__err || []).slice(0, 5)}; })()`));
    /* 1) localhost: desligado e sem rede para o Umami */
    ok(R.on0 === false, 'ANL.on deveria ser falso em localhost (deu ' + R.on0 + ')');
    ok(R.log === true, 'ANL.log deveria estar ligado pelo ?analise=log');
    /* navigator.webdriver so vem true com --enable-automation: a trava das sondas e o HOSTNAME (file:// e localhost ficam fora); o webdriver e so mais um cinto */
    ok(R.scripts.length === 0, 'o script do Umami foi inserido em localhost: ' + R.scripts.join(','));
    ok(!R.excecao, 'excecao nos fluxos: ' + R.excecao);
    /* 2) a primeira pagina: referrer e utm */
    const p0 = (R.hist0 || []).find(h=>h.tipo === 'pagina');
    ok(!!p0, 'nenhuma pagina foi montada no boot');
    if(p0){
      ok(p0.dados.url === '/sistema/sol?utm_source=instagram&utm_medium=cpc&utm_campaign=teste', 'url da primeira pagina: ' + p0.dados.url + ' (esperava /sistema/sol com so os utm_*)');
      ok(String(p0.dados.referrer).indexOf('http://l.instagram.com/') === 0, 'referrer da primeira pagina: "' + p0.dados.referrer + '" (o headless corta o referrer https para http: a sonda manda http)');
      ok(p0.dados.data && p0.dados.data.idioma === 'pt' && p0.dados.data.escala === 'cenico' && p0.dados.data.aula === 'nao' && /^r\d+$/.test(p0.dados.data.build), 'data da pagina: ' + JSON.stringify(p0.dados.data));
    }
    /* 3) os envios pelo stub */
    const cap = R.cap || [];
    const pags = cap.filter(c=>c.url && !c.name).map(c=>c.url.split('?')[0]);
    const evs = cap.filter(c=>c.name);
    const tem = (nome, f)=>evs.some(e=>e.name === nome && (!f || f(e.data || {})));
    ok(JSON.stringify(pags) === JSON.stringify(['/corpo/marte', '/bancada', '/corpo/marte', '/planetario/terra', '/corpo/marte', '/sistema/sol']), 'paginas virtuais: ' + JSON.stringify(pags));
    ok(cap.filter(c=>c.url && !c.name).every(c=>c.referrer === ''), 'as paginas seguintes deviam ir sem referrer');
    ok(cap.filter(c=>c.url && !c.name).every(c=>/\?utm_source=instagram&utm_medium=cpc&utm_campaign=teste$/.test(c.url)), 'as paginas seguintes deviam manter os utm_*');
    ok(tem('comparar', d=>d.a === 'terra' && d.b === 'saturno'), 'evento comparar {a,b}');
    ok(tem('conquista', d=>d.chave === 'comparar'), 'evento conquista {chave:comparar}');
    ok(tem('compartilhar', d=>d.tipo === 'bancada' && d.n === '1' || d.tipo === 'bancada'), 'evento compartilhar bancada');
    ok(tem('busca', d=>d.achou === 'nao'), 'evento busca achou=nao');
    ok(tem('busca', d=>d.achou === 'sim'), 'evento busca achou=sim');
    ok(tem('registro'), 'evento registro');
    ok(tem('planetario', d=>d.acao === 'abriu' && d.mundo === 'terra'), 'evento planetario abriu');
    ok(tem('compartilhar', d=>d.tipo === 'planetario' && d.mundo === 'terra'), 'evento compartilhar planetario');
    ok(tem('compartilhar', d=>d.tipo === 'vista' && d.corpo === 'marte'), 'evento compartilhar vista {corpo:marte}');
    ok(tem('saida', d=>d.url === 'exemplo.org/pagina'), 'evento saida {url}');
    ok(!evs.some(e=>JSON.stringify(e.data || {}).indexOf('zzzzqqq') >= 0), 'o texto digitado na busca vazou para um evento');
    ok(!R.erros || R.erros.length === 0, 'erros de console: ' + JSON.stringify(R.erros));
    ok(R.linkBase && R.linkBase.indexOf('utm_') < 0 && R.linkBase.indexOf('analise') < 0 && R.linkBase.indexOf('lang=pt') > 0, 'o link copiado deveria sair sem utm e sem ?analise, mantendo o ?lang: ' + R.linkBase);
    /* 4) ?nao-contar=1 */
    await cdp.send('Page.navigate', {url:'http://127.0.0.1:' + HPORTA + '/index.html?nao-contar=1#sistema=sol'});
    let R2 = null;
    for(let i = 0; i < 100; i++){ R2 = await cdp.eval(`(function(){ try{ if(typeof ANL === 'undefined') return null; return {nc:localStorage.getItem('carto:naocontar'), on:ANL.on}; }catch(e){ return null; } })()`).catch(()=>null); if(R2) break; await dorme(300); }
    ok(R2 && R2.nc === '1' && R2.on === false, '?nao-contar=1 deveria gravar carto:naocontar=1 e desligar: ' + JSON.stringify(R2));
    await dorme(500);
    const externos = [...hosts].filter(h=>h && h !== '127.0.0.1' && h !== 'localhost');
    ok(!externos.some(h=>/umami/i.test(h)), 'a rede pediu algo ao Umami em localhost: ' + externos.join(','));
    saida = (falhas.length ? 'ATENCAO · ' + falhas.length + ' falha(s):\n  ' + falhas.join('\n  ') : 'TUDO OK · ' + cap.length + ' envios conferidos pelo stub, ' + pags.length + ' paginas, ' + evs.length + ' eventos')
      + '\n  hosts tocados pela rede: ' + externos.join(', ');
  }catch(e){ saida = 'FALHA: ' + e.message + (falhas.length ? '\n  ' + falhas.join('\n  ') : ''); }
  console.log(saida + ' · ' + ((Date.now() - t0)/1000).toFixed(1) + 's');
  if(cdp) cdp.fecha(); proc.kill(); servidor.close();
  try{ fs.rmSync(perfil, {recursive:true, force:true}); }catch(e){}
  process.exit(/^TUDO OK/.test(saida) ? 0 : 1);
})();
