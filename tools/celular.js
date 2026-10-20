/* PRINTS DO CELULAR (r320): abre o app num Chrome sem tela com a EMULACAO de celular do CDP
   (viewport 390x844, DPR 2, toque ligado: o body.touch do app liga sozinho) e tira um print de
   cada estado para olhar o layout de verdade, sem o iframe de 380 px. Nasceu do pedido dele:
   'alguns botoes nao aparecem corretamente no celular'.
   Uso: node tools/celular.js <pasta-de-saida> [hash] [lang]
   Estados: casa, o menu ⋯ aberto, o card da Terra, o player, o filtro, o manual, o planetario,
   o 1:1 e a linha do tempo. Cada print e <pasta>/<estado>.png.                                   */
const fs = require('fs'), path = require('path'), cp = require('child_process'), http = require('http');
const RAIZ = path.join(__dirname, '..');
const SAIDA = process.argv[2] || path.join(RAIZ, 'tools', 'telas', 'celular');
const HASH = process.argv[3] || 'sistema=sol', LANG = process.argv[4] || 'pt-BR';
const W = +(process.env.CEL_W || 390), H = +(process.env.CEL_H || 844);
fs.mkdirSync(SAIDA, {recursive:true});
const CHROMES = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'];
const chrome = CHROMES.find(p=>fs.existsSync(p));
if(!chrome){ console.error('nao achei o Chrome'); process.exit(1); }
const PORTA = 9700 + Math.floor(Math.random()*100);
const perfil = path.join(require('os').tmpdir(), 'universatlas-sonda-cel-' + process.pid);
const dorme = ms=>new Promise(ok=>setTimeout(ok, ms));
function esperaJson(tent){ return new Promise((ok, erro)=>{ const tenta = ()=>{ http.get('http://127.0.0.1:' + PORTA + '/json', res=>{ let s = ''; res.on('data', d=>s += d); res.on('end', ()=>{ try{ const pg = JSON.parse(s).find(x=>x.type === 'page'); if(pg) return ok(pg); }catch(e){} if(tent-- > 0) setTimeout(tenta, 300); else erro(new Error('sem pagina')); }); }).on('error', ()=>{ if(tent-- > 0) setTimeout(tenta, 300); else erro(new Error('CDP nao respondeu')); }); }; tenta(); }); }
class CDP { constructor(url){ this.ws = new WebSocket(url); this.id = 0; this.pend = new Map(); this.pronto = new Promise(ok=>{ this.ws.addEventListener('open', ok); }); this.ws.addEventListener('message', ev=>{ const m = JSON.parse(ev.data); if(m.id && this.pend.has(m.id)){ const {ok, erro} = this.pend.get(m.id); this.pend.delete(m.id); m.error ? erro(new Error(m.error.message)) : ok(m.result); } }); }
  send(method, params){ const id = ++this.id; return new Promise((ok, erro)=>{ this.pend.set(id, {ok, erro}); this.ws.send(JSON.stringify({id, method, params:params || {}})); }); }
  async eval(expr){ const r = await this.send('Runtime.evaluate', {expression:expr, returnByValue:true, awaitPromise:true}); if(r.exceptionDetails) throw new Error('JS: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text)); return r.result.value; }
  fecha(){ try{ this.ws.close(); }catch(e){} } }
(async ()=>{
  const proc = cp.spawn(chrome, ['--headless=new', '--no-sandbox', '--lang=' + LANG, '--hide-scrollbars', '--remote-debugging-port=' + PORTA, '--user-data-dir=' + perfil, '--window-size=' + W + ',' + H, 'about:blank'], {stdio:'ignore'});
  let cdp = null; const feitos = [];
  try{
    const pg = await esperaJson(60);
    cdp = new CDP(pg.webSocketDebuggerUrl); await cdp.pronto;
    await cdp.send('Runtime.enable'); await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {width:W, height:H, deviceScaleFactor:2, mobile:true, screenWidth:W, screenHeight:H});
    await cdp.send('Emulation.setTouchEmulationEnabled', {enabled:true, maxTouchPoints:5});
    await cdp.send('Emulation.setUserAgentOverride', {userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Mobile Safari/537.36'});
    await cdp.send('Page.navigate', {url:'file:///' + path.join(RAIZ, 'index.html').replace(/\\/g, '/') + '#' + HASH});
    const t0 = Date.now(); let pronto = false;
    while(Date.now() - t0 < 180000){ pronto = await cdp.eval(`(function(){ try{ return typeof ACT !== 'undefined' && !!ACT && !!ACT.scene && document.getElementById('boot').classList.contains('off'); }catch(e){ return false; } })()`).catch(()=>false); if(pronto) break; await dorme(400); }
    if(!pronto) throw new Error('o boot nao fechou');
    await cdp.eval(`(function(){ ['boasvindas','cmpcard','ceulocal','registro','linhadotempo','satvivo','ceuhoje','subsis','sensores','isspass','ladrilhos'].forEach(k=>TUT.v.add(k)); if(typeof tutFecha === 'function') try{ tutFecha(); }catch(e){} return document.body.className; })()`).then(c=>console.log('body: ' + c));
    async function print(nome, prep){
      try{ if(prep) await cdp.eval('(function(){ try{ ' + prep + ' }catch(e){ return "erro: " + e.message; } return "ok"; })()').then(r=>{ if(r !== 'ok') console.log(nome + ': ' + r); }); }catch(e){ console.log(nome + ': ' + e.message); }
      await dorme(1400);
      const sh = await cdp.send('Page.captureScreenshot', {format:'png'});
      fs.writeFileSync(path.join(SAIDA, nome + '.png'), Buffer.from(sh.data, 'base64'));
      feitos.push(nome);
    }
    await print('1-casa', '');
    await print('2-menu', "document.getElementById('btnmore').click();");
    await print('3-card-terra', "if(typeof moreClose === 'function') moreClose(); ACTION('focus','terra');");
    await print('4-player', "document.getElementById('btnsnd').click();");
    await print('5-filtro', "document.getElementById('btnsnd').click(); document.getElementById('btnfilt').click();");
    await print('6-config', "document.getElementById('filtpop').classList.remove('on'); document.getElementById('btncfg').click();");
    await print('7-manual', "document.getElementById('cfgpop').classList.remove('on'); document.getElementById('btnhelp').click();");
    await print('8-registro', "document.getElementById('help').classList.remove('on'); missOpen();");
    await print('9-planetario', "missClose(); fecharFicha(); localAbre(-23.55,-46.63);");
    await print('10-busca', "localFecha(); findOpen();");
    await print('11-data', "findClose(); document.getElementById('btndata').click();");
    await print('12-eventos', "document.getElementById('dp_eventos').click();");
    await print('13-linha-do-tempo', "document.getElementById('evtpop').classList.remove('on'); document.getElementById('datepop').classList.remove('on'); ACTION('focus','voyager2'); trajStart('voyager2');");
    await dorme(2500); await print('13b-linha-do-tempo', '');
    await print('14-1para1', "trajLimpar(); fecharFicha(); trocaEscala();");
    await dorme(2500); await print('14b-1para1', '');
    await print('15-sol', "trocaEscala(); setTimeout(()=>ACTION('focus','sol'), 1200);");
    await dorme(6000); await print('15b-sol', '');
    const erros = await cdp.eval('JSON.stringify((window.__err || []).slice(0, 5))').catch(()=>'?');
    console.log('prints: ' + feitos.join(', ') + '\nerros: ' + erros + '\npasta: ' + SAIDA);
  }catch(e){ console.log('FALHA: ' + e.message); }
  if(cdp) cdp.fecha(); proc.kill();
  await dorme(800);
  try{ fs.rmSync(perfil, {recursive:true, force:true}); }catch(e){}
})();
