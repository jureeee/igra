// Test engine-a brez brskalnika: izvleče ENGINE iz index.html in ga zažene
// za več tisoč korakov v več scenarijih. Preveri, da ni sesutij, NaN vrednosti
// ali bitij izven meja, in da inspect() deluje.
//
//   node test.js
//
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const m = html.match(/\/\*ENGINE-START\*\/([\s\S]*?)\/\*ENGINE-END\*\//);
if (!m) { console.error('ENGINE bloka v index.html ni'); process.exit(1); }
(0, eval)(m[1]);                 // zažene IIFE -> globalThis.Sim
const Sim = globalThis.Sim;
if (!Sim || !Sim.createWorld) { console.error('Sim ni nastavljen'); process.exit(1); }

const isNum = x => typeof x === 'number' && Number.isFinite(x);

const scenarios = [
  { name: 'privzeto',         opts: { seed: 1 } },
  { name: 'brez predacije',   opts: { seed: 2, predation: false } },
  { name: 'brez obnavljanja', opts: { seed: 3, replenish: false } },
  { name: 'visoka mutacija',  opts: { seed: 4, mutRate: 0.5, mutSize: 0.7 } },
  { name: 'malo hrane',       opts: { seed: 5, foodSpawnPerSec: 10, replenish: false } },
];

let allOk = true;
for (const sc of scenarios) {
  const w = Sim.createWorld(sc.opts);
  let minPop = Infinity, maxPop = 0, bad = 0;
  const STEPS = 6000; // ~100 s simuliranega časa
  for (let t = 0; t < STEPS; t++) {
    w.step(1 / 60);
    minPop = Math.min(minPop, w.agents.length);
    maxPop = Math.max(maxPop, w.agents.length);
    if ((t % 500) === 0) {
      for (const a of w.agents) {
        if (!isNum(a.x) || !isNum(a.y) || !isNum(a.energy) || !isNum(a.size) || !isNum(a.heading)) bad++;
        if (a.x < -1 || a.x > w.cfg.width + 1 || a.y < -1 || a.y > w.cfg.height + 1) bad++;
      }
    }
  }
  let inspOk = true;
  if (w.agents.length) {
    try {
      const d = w.inspect(w.agents[0]);
      inspOk = d.inp.length === Sim.NN.N_IN && d.out.every(isNum) && d.hid.every(isNum);
    } catch (e) { inspOk = false; }
  }
  const ok = bad === 0 && inspOk && w.agents.length <= w.cfg.popCap;
  allOk = allOk && ok;
  console.log(
    `${ok ? 'OK ' : 'X  '} ${sc.name.padEnd(18)} | končna pop=${String(w.agents.length).padStart(3)} ` +
    `| min=${minPop} max=${maxPop} | hrana=${w.foods.length} | maxRod=${w.maxGen} ` +
    `| povpr.vel=${w.avgSize().toFixed(2)} | vrst=${w.speciesCount()} | slabih=${bad}`);
}
console.log(allOk ? '\n=> VSE OK' : '\n=> NAPAKE!');
process.exit(allOk ? 0 : 1);
