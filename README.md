# 🌊 Neuroevolucija — podvodni ekosistem

Simulacija umetnega življenja v pravem 3D. Bitja imajo evolvirajoče **nevronske možgane**
*in* **telesne gene**. Nihče jih ne uči in nihče jim ne dodeli vloge — vse se začne z
rastlinojedci, potem pa evolucija sama iznajde plenilce, oklepnike in avtotrofe. Vsaka
vloga izgleda drugače in ima svojo nalogo v prehranski verigi. Sledi **Kroniki razvoja**,
prožiš **katastrofe** in klikaš bitja, da vidiš, kdo so in kako se odločajo.

Odpri `index.html` v brskalniku (celozaslonski prikaz). Brez namestitve; Three.js je priložen (`three.min.js`).

## Vloge (emergentne, ne programirane)

Telesni geni (dedni, mutirajo) določijo, kaj bitje je in kako izgleda:

- 🌿 **Rastlinojedec** (okrogel) — učinkovito jé lebdečo rastlinsko hrano.
- 🦷 **Plenilec** (sulica) — lovi manjša bitja; brez plena strada, zato niha z njim (boom-bust).
- 🛡️ **Oklepnik** (kristal) — obramba proti plenilcem; težji in počasnejši. Evolvira, ko so plenilci pogosti.
- 🌱 **Avtotrof** (list) — fotosintetizira; hrano dobi iz svetlobe pri gladini, zato gnezdi ob površju.
- 🦴 Mrhovina: mrtva bitja pustijo trupla, ki jih plenilci/mrhovinarji pojedo.

Geni: `size`, `diet` (rastlinojed↔plenilec), `defense` (oklep), `photo` (fotosinteza), `hue` (linija).
Ravnovesje je nastavljeno tako, da nobena vloga trajno ne prevlada — nastanejo cikli in
oborožitvene tekme.

## Možgani

Nevronska mreža 15 → 12 → 3.
- **Vhodi (15):** hrana / sosed / relativna velikost soseda / signal — vse po 3 smereh (L/S/D),
  plus lastna energija, prehrana in notranji ritem.
- **Izhodi (3):** `zavij`, `pospeši`, `oddaj signal` (svetlobni utrip).

Selekcija je prostorska in vgrajena (ni funkcije cilja, ni generacij).

## Kaj se dogaja (razvoj + drama)

- **Kronika razvoja** beleži emergentne mejnike: prvi plenilec, prvi oklepnik, prvi avtotrof,
  velikan, množično izumrtje, prevladujoča linija.
- **Katastrofe** (gumb ali občasno naključno): ☄️ meteor (pobije bitja v območju), ❄️ lakota
  (hrane nenadoma malo), 🌸 cvetenje (obilje) — sprožijo izumrtja in novo radiacijo.
- **Instrumenti**: graf populacije/raznolikosti, Mullerjev graf linij, nišni prostor
  (prehrana × velikost, obarvano po vlogi), štetje po vlogah.

## Vmesnik

Celozaslonski 3D prikaz. Meni je skrit za gumbom ☰ zgoraj desno — klik odpre stekleni
drawer (glassmorphism, Apple slog) z razširljivimi (dropdown) sekcijami. Vleci za kamero,
kolešček za zoom, **klik na bitje** odpre lebdečo kartico nad njim: vloga, telesni geni,
kaj v živo čuti in kako se odloči.

## Arhitektura

- **Engine** (`<script id="engine">`) — čista logika, brez DOM in Three.js. Izpostavlja
  `Sim.createWorld`, `world.step`, `world.inspect`, `world.strike`, `world.roleCounts`, `Sim.roleOf`.
- **Prikaz + UI** (drugi `<script>`) — 3D prizor (Three.js), 4 instancirane oblike po vlogi,
  bioluminescenca, trupla, morski sneg, kronika, katastrofe, lebdeči vpogled.

Test brez brskalnika:

```bash
node test.js   # stabilnost/NaN/inspect v več scenarijih
```

## Smeri za nadgradnjo

- **Prava 3D simulacija** (gibanje/čutila po treh oseh, ne le vizualna globina).
- **Filogenetsko drevo** — `parentId`, `born` sta že shranjena.
- **Prava MAP-Elites** kot selekcija (arhiv obnašanj namesto energije).
- **Signalni jezik** — nagradi koordinacijo prek signalov (opozorila, jate).
- **3D rekviziti (Tripo.ai)** — statični modeli okolja (korala, razbitina). Za sam roj so
  proceduralna bitja hitrejša in se spreminjajo z evolucijo.

---

Three.js (`three.min.js`, r149) je vključen pod licenco MIT (© three.js authors).
