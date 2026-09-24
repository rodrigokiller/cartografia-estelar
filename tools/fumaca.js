/* SONDA DE FUMACA (r302): abre os 15 fluxos principais do app e conta erros
   de console. Nasceu da auditoria do r298, que achou o buraco: nada de
   automatico executava os blocos 4 e 5 do JS, 12 mil das 16 mil linhas.
   Uso: node tools/sonda.js "sistema=sol" tools/fumaca.js pt-BR 120
        node tools/sonda.js "sistema=sol&escala=real" tools/fumaca.js en-US 120
        node tools/sonda.js "corpo=terra" tools/fumaca.js pt-BR 120          (r311: o boot por LINK DE CORPO, o caminho que ficou 4 builds quebrado)
   Sai TUDO OK, ou ATENCAO com o fluxo que quebrou e o primeiro erro.
   REGRA: rodar antes de todo push que toque em UI, navegacao ou estado.
   CUIDADO ao acrescentar fluxo: use os seletores REAIS (o card escreve no
   #headmini, nao no #panel; os eventos abrem pelo #dp_eventos, nao por uma
   funcao). Assercao errada aqui parece bug do app e custa meia hora. */
/* fumaca r302: os fluxos principais depois de quatro builds */
window.__fase = window.__fase || 0; window.__d = window.__d || {}; var D = window.__d;
var P = [
  ['card de um planeta', function(){ ACTION('focus','saturno'); var e = document.querySelector('#headmini .eyebrow'); return !!e && /SATURN/i.test(document.getElementById('panel').textContent)   /* SATURN casa SATURNO e SATURN: a fumaca roda em en-US tambem */; }],
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
  ['linha do tempo da Apollo (a rota integrada desce sob demanda)', function(){ TUT.v.add('linhadotempo'); if(!(ACT && ACT.kind === 'system')) return true; /* numa cena de foco a missão sobe para o mapa antes (assíncrono): as rodadas de sistema cobrem */ ACTION('focus','apollo11'); trajStart('apollo11'); var ok = !!(TRAJ && TRAJ.geo) || !!EFEM_T.apollo11; if(TRAJ) trajLimpar(); ST.mapCard = null; return ok; }],
  ['linha do tempo pela rota do JPL (Voyager 2)', function(){ if(!(ACT && ACT.kind === 'system')) return true; ACTION('focus','voyager2'); trajStart('voyager2'); var ok = !!(TRAJ && TRAJ.efem) || !!EFEM_T.voyager2; if(TRAJ) trajLimpar(); ST.mapCard = null; return ok && !!window.EFEM_RESUMO; }],
  ['filtros numa lista so (LINHA e OBJETO)', function(){ document.getElementById('btnfilt').click(); var n = document.querySelectorAll('#filtpop .ftrow .ftg').length; document.getElementById('filtpop').classList.remove('on'); return n >= 19; }],
  ['planetario', function(){ TUT.v.add('ceulocal'); localAbre(-23.55,-46.63); var ok = LOCAL.on && !!LOCAL.r; localFecha(); return ok && !LOCAL.on; }],
  ['ficha de estrela do ceu', function(){ var f = fichaEstrela('sirius'); return !!(f && f.quick && f.quick.length); }],
  ['hashchange #corpo=marte (irAoCorpo + markVisited)', function(){ /* r311/r312 · o caminho que o cadCinco apagado derrubava, agora pelo handler de hashchange (colar um link numa aba aberta), que nenhuma sonda disparava; no cenico o markVisited so roda DEPOIS do mergulho: conferido na fase 1 */ location.hash = '#corpo=marte' + (ESCR.on ? '&escala=real' : ''); return typeof cadCinco === 'function' && typeof markVisited === 'function'; }]
];
if(window.__fase === 0){
  if(typeof ACT === 'undefined' || !ACT || !ACT.scene || typeof NOVIDADES === 'undefined') return;
  TUT.v.add('boasvindas');
  D.res = []; D.falhas = 0;
  /* r312 · o boot foi honrado? A fumaca dizia TUDO OK com o link caindo em casa pelo try/catch do r311 (achado da varredura) */
  D.hash0 = location.hash; var mB = D.hash0.match(/^#corpo=([a-z0-9_]+)/i);
  if(window.__bootErro){ D.falhas++; D.res.push('boot sem erro = FALHOU (' + window.__bootErro.message + ')'); } else D.res.push('boot sem erro = ok');
  if(mB){ var idB = mB[1]; var okB = VIS.has(idB) && (ST.body === idB || (ST.mapCard && ST.mapCard.id === idB)); if(!okB) D.falhas++; D.res.push('link #corpo=' + idB + ' honrado = ' + (okB ? 'ok' : 'FALHOU')); }
  for(var i = 0; i < P.length; i++){
    var r; try{ r = P[i][1]() ? 'ok' : 'FALHOU'; }catch(e){ r = 'ERRO: ' + e.message; }
    if(r !== 'ok') D.falhas++;
    D.res.push(P[i][0] + ' = ' + r);
  }
  window.__fase = 1; D.t = performance.now();
} else if(window.__fase === 1){
  if(performance.now() - D.t < 6000) return;   /* r311/r312: 6 s, o mergulho cenico do ENTRAR leva ~2,6 s e o loading fecha em ~5 s */
  { var ok = VIS.has('marte') && cadCinco() >= 1 && (ST.body === 'marte' || (ST.mapCard && ST.mapCard.id === 'marte')); if(!ok) D.falhas++; D.res.push('chegou em Marte pelo hashchange (markVisited) = ' + (ok ? 'ok' : 'FALHOU')); }   /* r311/r312 */
  { var okL = document.getElementById('boot').classList.contains('off'); if(!okL) D.falhas++; D.res.push('loading terminou = ' + (okL ? 'ok' : 'FALHOU')); }   /* r312 */
  D.erros = (window.__err||[]).length; D.primeiroErro = (window.__err||[])[0] || '';
  window.__res = (D.falhas || D.erros ? 'ATENCAO' : 'TUDO OK') + ' · ' + D.res.join(' | ') + ' · erros de console: ' + D.erros + (D.primeiroErro ? ' (' + D.primeiroErro + ')' : '');
}
