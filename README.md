# 🧬 Neuroevolucija — digitalna petrijevka

Simulacija umetnega življenja, kjer imajo bitja **evolvirajoče nevronske možgane**.
Nihče jih ne uči: kdor najde hrano in preživi, se razmnoži z mutacijo genoma.
Barva se deduje, zato v živo vidiš **nastajanje vrst**, oborožitvene tekme in
prehranske verige — pojave, ki niso programirani, ampak emergentni.

Odpri `index.html` v brskalniku. Brez namestitve, brez knjižnic — vse je v eni datoteki.

## Kako deluje

Vsako bitje ima:

- **Možgane** — nevronska mreža 12 → 10 → 2 (naprej usmerjena). Uteži so genom.
  - **Vhodi (12):** bližina hrane v 3 sektorjih (levo/sredina/desno), bližina
    drugih bitij v 3 sektorjih, relativna velikost soseda (plenilec ali plen?),
    lastna energija, lastna velikost, notranji oscilator.
  - **Izhoda (2):** `zavij` in `pospeši`.
- **Telo** — velikost je dedna lastnost, ki mutira. Večji vidi dlje in lahko poje
  manjše, a je počasnejši in porabi več energije. Iz te napetosti nastajajo niše.
- **Metabolizem** — energija ves čas pada; hrana in plen jo dodata. Ob 0 bitje umre.
- **Razmnoževanje** — pri dovolj energije se razdeli; otrok podeduje genom (z
  mutacijami), velikost in barvo (z majhnim odmikom, da se linije razhajajo).

Selekcija je **prostorska in vgrajena** (ni funkcije cilja, ni generacij) — bolj
podobno naravi kot klasičnemu genetskemu algoritmu. To je namerno: tak sistem je
boljši substrat za odprto evolucijo (open-ended evolution).

## Arhitektura

Namerno ločena, da je enostavno nadgrajevati:

- **Engine** (`<script id="engine">` v `index.html`) — čista logika, brez DOM.
  Izpostavlja `Sim.createWorld(opts)`, `world.step(dt)`, `world.inspect(agent)`.
  Enak kod teče v brskalniku in v node testu.
- **Prikaz + UI** (drugi `<script>`) — risanje na canvas, kontrole, graf, vpogled
  v možgane izbranega bitja.

Testiranje brez brskalnika:

```bash
node test.js   # zažene 5 scenarijev × ~100 s, preveri NaN/mejne vrednosti in inspect()
```

## Že opažen emergentni pojav

Ob prvem zagonu: **s predacijo** povprečna velikost naraste in barvna raznolikost
pade na nekaj linij (tekma proti večjim). **Brez predacije** ostanejo bitja majhna
in učinkovita, preživi pa vseh 12 barvnih linij. Predacija torej poganja rast
telesa *in* zmanjšuje raznolikost — netrivialen, merljiv rezultat.

## Smeri za nadgradnjo (in za "research")

Lahke:
- **Signaliziranje** — dodaj izhod "oddaj barvo/zvok" in vhod "zaznaj signal soseda".
  Opazuj, ali se razvije komunikacija (opozorila, vabe).
- **Spolno razmnoževanje** — križanje genomov dveh staršev; primerjaj hitrost evolucije.
- **Ovire in strupi** — spremeni okolje in glej, kako se prilagodijo.
- **Sezone** — nihaj `foodSpawnPerSec`; išči cikle populacij.

Raziskovalne (odprta vprašanja umetnega življenja):
- **Filogenetsko drevo** — beleži starše in izriši rodovnik; meri "prave" speciacijske dogodke.
- **Novelty search / MAP-Elites** — nagrajuj *raznolikost obnašanja* namesto energije
  in preveri protiintuitivni rezultat, da opustitev cilja pogosto zmaga.
- **Meritve kompleksnosti** — spremljaj, ali sistem *neprekinjeno* proizvaja novost
  (osrednji nerešen izziv odprte evolucije), ali stagnira.
- **Večceličnost / major transitions** — dovoli bitjem, da se lepijo v skupke;
  glej, ali nastanejo koordinirani "organizmi".

## Nadzor

Pavza · Ponastavi · hitrost 1–8× · drsnika za mutacijo in obilje hrane ·
preklopa predacija/obnavljanje · klik na bitje = vpogled v njegove možgane.
