/* SONDA DO FUNDO DOS MODAIS (r317): fechar pelo fundo só quando o botão DESCE e SOBE no próprio fundo.
   O click nasce no ancestral comum de onde o botão desceu e de onde subiu, então selecionar o texto de um campo com
   arraste e soltar no fundo gera um click COM target no fundo. Aqui os eventos saem na ordem do navegador
   (pointerdown no ponto de partida, pointerup no de chegada, click no ancestral comum) em cada modal que fecha pelo
   fundo, com um elemento de dentro no papel do campo.
   Uso: node tools/sonda.js "sistema=sol" tools/sonda_fundo.js pt-BR 90
        SONDA_HTML=<outro index> para rodar contra um index antigo (os casos que NÃO fecham têm que falhar lá) */
if(typeof ACT === 'undefined' || !ACT || !ACT.scene) return;
try{ ['boasvindas', 'registro', 'busca', 'cmp', 'comparar'].forEach(k=>TUT.v.add(k)); }catch(e){}
const MODAIS = [
  {id:'help',    campo:'#helpcard p',  abre:()=>$('#help').classList.add('on')},
  {id:'cmp',     campo:'#cmpcard',     abre:()=>openCompare(ALLBODIES.terra, ALLBODIES.lua)},
  {id:'mission', campo:'#missq',       abre:()=>missOpen()},
  {id:'finder',  campo:'#findin',      abre:()=>findOpen()}
];
const evento = (el, tipo)=>el.dispatchEvent(tipo === 'click'
  ? new MouseEvent('click', {bubbles:true, cancelable:true, button:0})
  : new PointerEvent(tipo, {bubbles:true, cancelable:true, pointerId:1, pointerType:'mouse', isPrimary:true, button:0}));
/* desce em A, sobe em B, click em C (o ancestral comum que o navegador escolheria) */
const gesto = (A, B, C)=>{ evento(A, 'pointerdown'); evento(B, 'pointerup'); evento(C, 'click'); };
const res = {}; let falhas = 0;
for(const m of MODAIS){
  const fundo = document.getElementById(m.id), r = {};
  const aberto = ()=>fundo.classList.contains('on');
  const prepara = ()=>{ m.abre(); if(!aberto()) throw new Error(m.id + ' não abriu'); return document.querySelector(m.campo); };
  const confere = (nome, esperaAberto)=>{ const ok = aberto() === esperaAberto; r[nome] = (ok ? 'ok' : 'FALHOU') + ' (' + (aberto() ? 'aberto' : 'fechado') + ')'; if(!ok) falhas++; };
  let campo = prepara(); gesto(campo, fundo, fundo); confere('1_desce_no_campo_sobe_no_fundo', true);
  campo = prepara(); gesto(fundo, campo, fundo); confere('2_desce_no_fundo_sobe_no_campo', true);
  /* 3: desce e sobe no fundo fecha, e uma vez só (a transição de aberto para fechado) */
  campo = prepara(); let trans = 0;
  const ob = new MutationObserver(ms=>ms.forEach(x=>{ if(/\bon\b/.test(x.oldValue || '') && !aberto()) trans++; }));
  ob.observe(fundo, {attributes:true, attributeFilter:['class'], attributeOldValue:true});
  gesto(fundo, fundo, fundo); ob.takeRecords().forEach(x=>{ if(/\bon\b/.test(x.oldValue || '')) trans++; }); ob.disconnect();
  confere('3_desce_e_sobe_no_fundo', false); r.transicoes = trans; if(trans !== 1){ falhas++; r.transicoes += ' FALHOU'; }
  /* 4: depois de um arraste que não fechou, um clique normal dentro do campo continua sem fechar */
  campo = prepara(); gesto(campo, fundo, fundo); gesto(campo, campo, campo); confere('4_clique_no_campo_depois_do_arraste', true);
  if(aberto()) fundo.classList.remove('on');
  res[m.id] = r;
}
closeCmp(); missClose(); findClose(); $('#help').classList.remove('on');
window.__res = (falhas ? 'FALHOU ' + falhas : 'OK') + ' · ' + JSON.stringify(res) + ' · erros ' + (window.__err || []).length + ((window.__err || []).length ? ' · ' + window.__err[0] : '');
