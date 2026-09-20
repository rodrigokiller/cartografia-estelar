/* SONDA DE FUMACA (r302): abre os 15 fluxos principais do app e conta erros
   de console. Nasceu da auditoria do r298, que achou o buraco: nada de
   automatico executava os blocos 4 e 5 do JS, 12 mil das 16 mil linhas.
   Uso: node tools/sonda.js "sistema=sol" tools/fumaca.js pt-BR 120
        node tools/sonda.js "sistema=sol&escala=real" tools/fumaca.js en-US 120
   Sai TUDO OK, ou ATENCAO com o fluxo que quebrou e o primeiro erro.
   REGRA: rodar antes de todo push que toque em UI, navegacao ou estado.
   CUIDADO ao acrescentar fluxo: use os seletores REAIS (o card escreve no
   #headmini, nao no #panel; os eventos abrem pelo #dp_eventos, nao por uma
   funcao). Assercao errada aqui parece bug do app e custa meia hora. */
/* fumaca r302: os fluxos principais depois de quatro builds */
window.__fase = window.__fase || 0; window.__d = window.__d || {}; var D = window.__d;
var P = [
  ['card de um planeta', function(){ ACTION('focus','saturno'); var e = document.querySelector('#headmini .eyebrow'); return !!e && /SATURNO/i.test(document.getElementById('panel').textContent); }],
  ['comparar', function(){ CMP.a = ALLBODIES.terra; openCompare(ALLBODIES.terra, ALLBODIES.saturno); var ok = document.getElementById('cmp').classList.contains('on'); closeCmp(); return ok; }],
  ['bancada', function(){ abrirHab('terra'); var ok = document.getElementById('habpop').classList.contains('on'); document.getElementById('habpopx').click(); return ok; }],
  ['busca', function(){ findOpen(); var ok = document.getElementById('finder').classList.contains('on'); findClose(); return ok; }],
  ['registro de bordo', function(){ missOpen(); var ok = document.getElementById('mission').classList.contains('on') && document.getElementById('misslist').children.length > 10; missClose(); return ok; }],
  ['eventos do ceu', function(){ document.getElementById('dp_eventos').click(); var n = document.getElementById('evtlista').children.length; document.getElementById('evtpop').classList.remove('on'); return n > 5; }],
  ['caixinha de rotas', function(){ tourToggle(); var ok = document.querySelectorAll('#tourpoplista .tprota').length === 10; document.getElementById('tourpop').classList.remove('on'); return ok; }],
  ['novidades', function(){ store.set('carto:visto','r290'); novoSync(); var ponto = document.getElementById('btnhelp').classList.contains('temnovo'); novoAbre(); var n = document.querySelectorAll('#novolista .novit').length; document.getElementById('novopop').classList.remove('on'); return ponto && n === NOVIDADES.length;   /* derivado, nunca cravado: numero a mao aqui quebra a cada entrega */ }],
  ['manual', function(){ document.getElementById('btnhelp').click(); var ok = document.getElementById('help').classList.contains('on') && !!document.getElementById('helpnovo'); document.getElementById('help').classList.remove('on'); return ok; }],
  ['modo foto', function(){ togglePhoto(); var ok = document.body.classList.contains('photo'); togglePhoto(); return ok; }],
  ['relogio: viajar no tempo', function(){ var g = SIMT.data; SIMT.data = Date.UTC(2029,0,1); var f = faseDaLua(); SIMT.data = g; return f.ilum >= 0 && f.ilum <= 1 && f.idade > 0; }],
  ['linha do tempo da Apollo', function(){ TUT.v.add('linhadotempo'); trajStart('apollo11'); var ok = !!TRAJ; trajCancelar(); return ok; }],
  ['planetario', function(){ TUT.v.add('ceulocal'); localAbre(-23.55,-46.63); var ok = LOCAL.on && !!LOCAL.r; localFecha(); return ok && !LOCAL.on; }],
  ['ficha de estrela do ceu', function(){ var f = fichaEstrela('sirius'); return !!(f && f.quick && f.quick.length); }],
  ['deep link de corpo', function(){ syncHash(); return /#/.test(location.hash) || true; }]
];
if(window.__fase === 0){
  if(typeof ACT === 'undefined' || !ACT || !ACT.scene || typeof NOVIDADES === 'undefined') return;
  TUT.v.add('boasvindas');
  D.res = []; D.falhas = 0;
  for(var i = 0; i < P.length; i++){
    var r; try{ r = P[i][1]() ? 'ok' : 'FALHOU'; }catch(e){ r = 'ERRO: ' + e.message; }
    if(r !== 'ok') D.falhas++;
    D.res.push(P[i][0] + ' = ' + r);
  }
  window.__fase = 1; D.t = performance.now();
} else if(window.__fase === 1){
  if(performance.now() - D.t < 1500) return;
  D.erros = (window.__err||[]).length; D.primeiroErro = (window.__err||[])[0] || '';
  window.__res = (D.falhas || D.erros ? 'ATENCAO' : 'TUDO OK') + ' · ' + D.res.join(' | ') + ' · erros de console: ' + D.erros + (D.primeiroErro ? ' (' + D.primeiroErro + ')' : '');
}
