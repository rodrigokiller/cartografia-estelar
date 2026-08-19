/* Teste de integridade dos dados da Cartografia Estelar.
   Uso: node tools/verifica.js
   Extrai os blocos <script> do index.html, executa os dados e confere as
   armadilhas que já nos morderam antes. Sai com código 1 se achar problema. */
const fs = require('fs'), path = require('path');

const RAIZ = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

const blocos = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if(!blocos.length){ console.error('nenhum bloco <script> encontrado'); process.exit(1); }
const todo = blocos.join('\n');

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

const n = Object.keys(ALLBODIES).length;
console.log(`${n} corpos · ${Object.keys(SYS).length} sistemas · ${STARSYS.length} marcadores · ${GALAXIES.length} galáxias`);
if(avisos.length){ console.log('\nAVISOS'); for(const a of avisos) console.log('  ~ ' + a); }
if(erros.length){ console.log('\nERROS'); for(const e of erros) console.log('  x ' + e); console.log(`\n${erros.length} problema(s).`); process.exit(1); }
console.log('\nTudo íntegro.');
