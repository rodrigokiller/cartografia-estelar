/* Teste de integridade dos dados da Cartografia Estelar.
   Uso: node tools/verifica.js
   Extrai os blocos <script> do index.html, executa os dados e confere as
   armadilhas que já nos morderam antes. Sai com código 1 se achar problema. */
const fs = require('fs'), path = require('path'), vm = require('vm');

const RAIZ = path.join(__dirname, '..');
const html = fs.readFileSync(process.env.VERIFICA_INDEX || path.join(RAIZ, 'index.html'), 'utf8');   /* VERIFICA_INDEX: outro index (r311: provar que o gate pega um bug velho) */

const blocos = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if(!blocos.length){ console.error('nenhum bloco <script> encontrado'); process.exit(1); }
const todo = blocos.join('\n');

/* 0. r299 · A SINTAXE DE TUDO. Até aqui o gate só COMPILAVA a fatia de dados
      entre "const SUN" e "const UNIVERSE_CARD", ou seja 22 por cento do JS:
      um erro de sintaxe no motor, na UI ou no boot passava batido e o gate
      imprimia "Tudo íntegro" com código 0, enquanto a Vercel publicava uma
      tela de loading congelada (provado por experimento na auditoria do r298).
      vm.Script COMPILA sem executar, que é exatamente o que se quer aqui.
      NÃO pega TDZ nem colisão de nome entre blocos (r232, r291): isso continua
      sendo trabalho de sonda. O texturas.js fica de fora de propósito: são
      1,9 MB de base64 e nenhuma lógica. */
const fontes = blocos.map((b, i) => ['index.html · bloco ' + (i + 1), b]);
for(const f of ['en.js', 'dados_en.js', 'ceu6.js', 'tle_snapshot.js', 'exo.js']){
  const p = path.join(RAIZ, f);
  if(fs.existsSync(p)) fontes.push([f, fs.readFileSync(p, 'utf8')]);
}
let sintaxe = 0;
for(const [nome, src] of fontes){
  try{ new vm.Script(src, {filename: nome}); }
  catch(e){
    sintaxe++;
    const ln = (e.stack || '').match(/:(\d+)\n/);
    console.error('x SINTAXE em ' + nome + (ln ? ' (linha ' + ln[1] + ' do bloco)' : '') + ': ' + e.message);
  }
}
if(sintaxe){ console.error('\n' + sintaxe + ' bloco(s) que nem compilam: o app não abriria.'); process.exit(1); }

const ini = todo.indexOf('const SUN = {');
const fim = todo.indexOf('const UNIVERSE_CARD');
if(ini < 0 || fim < 0){ console.error('nao achei o bloco de dados'); process.exit(1); }

const erros = [], avisos = [];
let D;
try {
  D = new Function("const coordOf = () => '';\n" + todo.slice(ini, fim) +
    '\nreturn {ALLBODIES, SYS, STARSYS, GALAXIES};')();
} catch(e){
  console.error('os dados nem executam: ' + e.message); process.exit(1);
}
const {ALLBODIES, SYS, STARSYS, GALAXIES} = D;

/* 1. todo corpo citado num sistema precisa estar registrado com reg() */
for(const [sid, S] of Object.entries(SYS)){
  const cita = [S.star, ...(S.bodies||[]), ...(S.belt||[])].filter(Boolean);
  for(const b of cita){
    if(!ALLBODIES[b.id]) erros.push(`corpo "${b.id}" (${b.name}) está em SYS.${sid} mas faltou o reg()`);
    else if(ALLBODIES[b.id] !== b) erros.push(`corpo "${b.id}" está duplicado: o objeto de SYS.${sid} não é o mesmo registrado`);
  }
  if(S.beltId && !ALLBODIES[S.beltId]) erros.push(`SYS.${sid}.beltId aponta para "${S.beltId}", que não existe`);
  if(S.beltId && (S.bodies||[]).some(b => b.id === S.beltId))
    erros.push(`"${S.beltId}" está em SYS.${sid}.bodies E como beltId: vira objeto duplicado (bug do r28)`);
  if(!S.card) erros.push(`SYS.${sid} sem card`);
  if(!S.hint) avisos.push(`SYS.${sid} sem hint`);
}

/* 2. todo sistema precisa de um marcador, e todo marcador de um sistema */
const marc = new Set(STARSYS.map(m => m.id));
for(const sid of Object.keys(SYS)) if(!marc.has(sid)) erros.push(`SYS.${sid} não tem marcador em STARSYS: fica inalcançável pelo mapa`);
for(const m of STARSYS){
  if(m.nav && !SYS[m.id]) erros.push(`marcador "${m.id}" é navegável mas não existe em SYS`);
  const g = m.gal || 'vialactea';
  if(!GALAXIES.find(x => x.id === g)) erros.push(`marcador "${m.id}" aponta para a galáxia "${g}", que não existe`);
}

/* 3. cada corpo registrado precisa de um sistema válido e de ficha decente */
for(const [id, b] of Object.entries(ALLBODIES)){
  if(!SYS[b._sys]) erros.push(`corpo "${id}" tem _sys "${b._sys}", que não existe`);
  if(b._parent && !ALLBODIES[b._parent]) erros.push(`corpo "${id}" tem _parent "${b._parent}", que não existe`);
  if(!b.name) erros.push(`corpo "${id}" sem nome`);
  if(!b.quick || !b.quick.length) erros.push(`corpo "${id}" sem quick facts`);
  if(!b.facts || !b.facts.length) avisos.push(`corpo "${id}" sem curiosidades`);
  if(b.region && !b.field) erros.push(`região "${id}" sem field: a cena de foco não sabe desenhar o campo`);
  if(b.visual && b.visual.mode === 'star' && !b.region && !(b.quick||[]).some(q => /^RAIO/i.test(q[0])))
    avisos.push(`estrela "${id}" sem RAIO no quick: a comparação de tamanho não acha o diâmetro`);
}

/* 4. as convenções de texto do Rodrigo */
const proibido = /[—]|[\u{1F300}-\u{1FAFF}☀-➿]/u;
for(const [id, b] of Object.entries(ALLBODIES)){
  const textos = [];
  for(const f of (b.facts||[])) textos.push(['facts', f]);
  if(b.fict) textos.push(['fict', b.fict]);
  for(const [onde, t] of textos){
    if(proibido.test(t)) erros.push(`"${id}" tem travessão ou emoji em ${onde}`);
    if(/toque|clique|navega[çc][ãa]o liberada|use o bot[ãa]o/i.test(t))
      erros.push(`"${id}" fala do app em ${onde}: curiosidade é sobre o objeto real`);
  }
}

/* 5. todo id que o código procura precisa existir no HTML (erro silencioso
      clássico: $('#algo') devolve null e a função morre sem avisar) */
const corpoHtml = html.slice(html.indexOf('<body'), html.indexOf('</body>'));
const idsHtml = new Set([...corpoHtml.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const criados = new Set([...todo.matchAll(/id\s*=\s*['"]([\w-]+)['"]/g)].map(m => m[1]));
const usados = new Map();
for(const m of todo.matchAll(/\$\('#([\w-]+)'\)|getElementById\('([\w-]+)'\)/g)){
  const id = m[1] || m[2];
  usados.set(id, (usados.get(id) || 0) + 1);
}
for(const [id] of usados)
  if(!idsHtml.has(id) && !criados.has(id))
    erros.push(`o código procura #${id}, que não existe no HTML`);

/* 6. seletores de id no CSS que não casam com nada (typo silencioso) */
const css = html.slice(html.indexOf('<style'), html.indexOf('</style>'));
const idsCss = new Set([...css.matchAll(/#([\w-]+)/g)].map(m => m[1]));
for(const id of idsCss)
  if(!idsHtml.has(id) && !criados.has(id) && !/^[0-9a-fA-F]{3,8}$/.test(id))
    avisos.push(`o CSS estiliza #${id}, que não existe no HTML`);

/* 7. r299 · OBJETO CADASTRADO DUAS VEZES. A auditoria do r298 achou a galáxia
      SOMBRERO em GALAXIES duas vezes (dois marcadores no universo, dois
      resultados na busca, fichas conflitantes) e a NEBULOSA DA FORMIGA em
      STARSYS e na chave de SYS, o que deixou um corpo REGISTRADO e sem lugar
      nenhum no mapa. É a mesma classe do bug do r28, e o gate não via. */
for(const [nome, lista] of [['GALAXIES', GALAXIES], ['STARSYS', STARSYS]]){
  const vis = new Map();
  for(const o of lista){
    if(vis.has(o.id)) erros.push(`"${o.id}" aparece DUAS vezes em ${nome}: vira dois objetos com a mesma ficha (bug do r28)`);
    vis.set(o.id, 1);
  }
}
/* corpo registrado que nenhum sistema cita: sobra de duplicata, conta no total,
   entra na busca e não existe em mapa nenhum */
const alcancavel = new Set();
for(const S of Object.values(SYS)){
  for(const b of [S.star, ...(S.bodies||[]), ...(S.belt||[])].filter(Boolean)) alcancavel.add(b.id);
  if(S.beltId) alcancavel.add(S.beltId);
}
/* os HUBS de região (cinturão, Kuiper, Oort e as nebulosas) não são citados em
   SYS.bodies de propósito: o motor os desenha a partir dos parâmetros do
   próprio sistema (beltR, kuiperR) ou do beltId. Contam como alcançáveis, e os
   filhos deles entram pela propagação de moons logo abaixo. */
for(const [id, b] of Object.entries(ALLBODIES)) if(b.region) alcancavel.add(id);
for(let mudou = true; mudou; ){
  mudou = false;
  for(const id of [...alcancavel]){
    const b = ALLBODIES[id]; if(!b) continue;
    for(const m of (b.moons||[])) if(m && m.id && !alcancavel.has(m.id)){ alcancavel.add(m.id); mudou = true; }
  }
}
for(const [id, b] of Object.entries(ALLBODIES))
  if(!alcancavel.has(id)) erros.push(`corpo "${id}" (${b.name}) está registrado mas nenhum sistema o cita: inalcançável no mapa`);

/* 8. r311 · CHAMADA SEM DECLARACAO. O recorte por intervalo do r307 apagou o cadCinco (uma
      linha entre duas funcoes reescritas) e a chamada dentro do markVisited ficou: todo link de
      corpo estourava ReferenceError no boot e o loading ficava preso para sempre, por quatro
      builds, porque nenhuma sonda abria o app num #corpo=. O vm.Script do lint 0 compila isso
      sem reclamar (referencia livre e JS valido). Aqui: todo nome chamado como funcao (nome(
      sem ponto antes) precisa de uma declaracao em algum lugar do JS: function, const/let/var
      (declaradores multiplos inclusive), parametro, arrow, atribuicao ou metodo de objeto.
      Strings, templates e comentarios saem antes; o que sobra de regex com parenteses e
      getters vive na lista RESIDUO. Nome novo aqui = olhar antes de acrescentar. */
{
  const limpo = todo
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:\\])\/\/[^\n]*/g, '$1')
    .replace(/`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`/g, '``')
    .replace(/'(?:\\.|[^'\\\n])*'/g, "''")
    .replace(/"(?:\\.|[^"\\\n])*"/g, '""');
  const decl = new Set();
  for(const m of limpo.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)/g)) decl.add(m[1]);
  for(const m of limpo.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g)) decl.add(m[1]);
  for(const m of limpo.matchAll(/\b([A-Za-z_$][\w$]*)\s*=[^=>]/g)) decl.add(m[1]);             /* atribuicao e declaradores multiplos (let a = 1, b = 2) */
  for(const m of limpo.matchAll(/\b(?:const|let|var)\s*[{\[]([^}\]]*)[}\]]/g)) for(const n of m[1].split(',')){ const k = n.split(':').pop().trim().split('=')[0].trim(); if(/^[A-Za-z_$][\w$]*$/.test(k)) decl.add(k); }
  for(const m of limpo.matchAll(/\bfunction\b[^(]*\(([^)]*)\)/g)) for(const n of m[1].split(',')){ const k = n.trim().split('=')[0].trim().replace(/^\.\.\./, ''); if(/^[A-Za-z_$][\w$]*$/.test(k)) decl.add(k); }
  for(const m of limpo.matchAll(/\(([^()]*)\)\s*=>/g)) for(const n of m[1].split(',')){ const k = n.trim().split('=')[0].trim().replace(/^\.\.\./, ''); if(/^[A-Za-z_$][\w$]*$/.test(k)) decl.add(k); }
  for(const m of limpo.matchAll(/\b([A-Za-z_$][\w$]*)\s*=>/g)) decl.add(m[1]);
  for(const m of limpo.matchAll(/^\s*(?:async\s+)?(?:get\s+|set\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/gm)) decl.add(m[1]);   /* metodo de objeto */
  const GLOBAIS = new Set(('parseFloat parseInt isFinite isNaN Number String Boolean Array Object Math Date JSON Promise Set Map WeakMap WeakSet Float32Array Float64Array Uint8Array Uint16Array Uint32Array Int32Array Int16Array Int8Array Uint8ClampedArray ArrayBuffer DataView RegExp Error TypeError RangeError Symbol Proxy Reflect Intl BigInt Function eval requestAnimationFrame cancelAnimationFrame setTimeout clearTimeout setInterval clearInterval fetch alert confirm prompt encodeURIComponent decodeURIComponent encodeURI decodeURI escape unescape atob btoa structuredClone queueMicrotask matchMedia getComputedStyle Image Audio AudioContext webkitAudioContext OfflineAudioContext Blob File FileReader URL URLSearchParams AbortController TextEncoder TextDecoder ResizeObserver IntersectionObserver MutationObserver PointerEvent MouseEvent KeyboardEvent TouchEvent CustomEvent Event DOMParser XMLSerializer Worker WebSocket Notification performance THREE satellite localStorage sessionStorage navigator document window location history screen console crypto createImageBitmap OffscreenCanvas ImageData Path2D DeviceOrientationEvent DeviceMotionEvent getSelection open close focus blur print scroll scrollTo scrollBy postMessage').split(' '));
  const RESIDUO = new Set(['RA', 'playing', 'innerHTML', 'set']);   /* regex /^RA(IO|DIUS)/, o evento 'playing' atras de uma regex com aspas, o setter innerHTML, o store.set */
  const PALAVRA = /^(if|for|while|switch|catch|return|function|typeof|new|else|do|await|async|yield|delete|void|throw|in|of|instanceof|class|super|this)$/;
  const semDecl = new Map();
  for(const m of limpo.matchAll(/(^|[^.\w$])([A-Za-z_$][\w$]*)\s*\(/g)){
    const nm = m[2];
    if(PALAVRA.test(nm) || decl.has(nm) || GLOBAIS.has(nm) || RESIDUO.has(nm)) continue;
    semDecl.set(nm, (semDecl.get(nm) || 0) + 1);
  }
  for(const [nm, c] of semDecl) erros.push(`${nm}() e chamado ${c}x mas nao tem declaracao em lugar nenhum do JS: ReferenceError garantido quando rodar (o cadCinco do r307)`);
}

const n = Object.keys(ALLBODIES).length;
console.log(`${n} corpos · ${Object.keys(SYS).length} sistemas · ${STARSYS.length} marcadores · ${GALAXIES.length} galáxias`);
if(avisos.length){ console.log('\nAVISOS'); for(const a of avisos) console.log('  ~ ' + a); }
if(erros.length){ console.log('\nERROS'); for(const e of erros) console.log('  x ' + e); console.log(`\n${erros.length} problema(s).`); process.exit(1); }
console.log('\nTudo íntegro.');
