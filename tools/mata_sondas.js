/* mata só os Chromes headless abertos pelas sondas (user-data-dir universatlas-sonda-*) */
const cp = require('child_process');
function lista(){
  try{
    const s = cp.execSync('wmic process where "CommandLine like \'%universatlas-sonda%\'" get ProcessId', {encoding:'utf8', stdio:['ignore', 'pipe', 'ignore']});
    return s.split(/\r?\n/).map(x=>x.trim()).filter(x=>/^\d+$/.test(x));
  }catch(e){ return []; }
}
const antes = lista(); let mortos = 0; const falhas = [];
for(const p of antes){ try{ cp.execSync('taskkill /F /PID ' + p, {stdio:'ignore'}); mortos++; }catch(e){ falhas.push(p); } }
setTimeout(()=>{ process.stdout.write('antes=' + antes.length + ' mortos=' + mortos + ' falhas=' + falhas.join(',') + ' depois=' + lista().length + '\n'); }, 1500);
