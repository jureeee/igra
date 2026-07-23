# 🌊 Neuroevolucija — podvodna petrijevka

Simulacija umetnega življenja, kjer imajo bioluminescentna bitja **evolvirajoče
nevronske možgane**. Nihče jih ne uči: kdor najde hrano in preživi, se razmnoži z
mutacijo genoma. Bitja lahko tudi **oddajajo svetlobne signale** in se nanje odzivajo.
Barva se deduje, zato v živo vidiš **nastajanje vrst**, oborožitvene tekme in
prehranske verige — pojave, ki niso programirani, ampak emergentni.

Prizor je v pravem **3D** (Three.js/WebGL): bitja lebdijo v vodnem stolpcu s svetlobnimi
žarki, morskim snegom in globinsko meglo. Vleci za obračanje kamere, kolešček za zoom,
klikni bitje za vpogled v njegove možgane.

Odpri `index.html` v brskalniku. Brez namestitve; Three.js je priložen lokalno (`three.min.js`).

## Kako deluje

Vsako bitje ima:

- **Možgane** — nevronska mreža 15 → 12 → 3 (naprej usmerjena). Uteži so genom.
  - **Vhodi (15):** bližina hrane v 3 sektorjih (L/S/D), bližina sosedov v 3 sektorjih,
    relativna velikost soseda (plenilec ali plen?), **jakost signala** sosedov v 3 sektorjih,
    lastna energija, lastna velikost, notranji oscilator.
  - **Izhodi (3):** `zavij`, `pospeši`, `oddaj signal` (svetlobni utrip; oddajanje stane energijo).
- **Telo** — velikost je dedna lastnost, ki mutira. Večji vidi dlje in poje manjše, a je
  počasnejši in porabi več energije. Iz te napetosti nastajajo niše.
- **Metabolizem** — energija ves čas pada; hrana in plen jo dodata. Ob 0 bitje umre.
- **Razmnoževanje** — pri dovolj energije se razdeli; otrok podeduje genom (z mutacijami),
  velikost in barvo (z majhnim odmikom, da se linije razhajajo).

Selekcija je **prostorska in vgrajena** (ni funkcije cilja, ni generacij) — bolj podobno
naravi kot klasičnemu genetskemu algoritmu, in boljši substrat za odprto evolucijo.

## Raziskovalni instrumenti (v plošči desno)

- **Graf** — populacija, genetska raznolikost in hrana skozi čas.
- **Mullerjev graf** — vsaka barva je rodovna linija; debelina pasu = delež populacije.
  Klasična evolucijska vizualizacija: vidiš vzpone linij, izumrtja in speciacije.
- **Nišna karta** — mreža velikost × barvna linija; svetlejše = več bitij v tej niši.
- **Meritve** — *genetska raznolikost* (razpršenost genomov okoli povprečja) in
  *jakost možganov* (povprečna absolutna utež) kot preprosta pokazatelja kompleksnosti.
- **Vpogled v možgane** — klikni bitje: mreža z utežmi (teal = pozitivna, rožnata =
  negativna) in aktivacijami čutil v realnem času.

## Arhitektura

Namerno ločena, da je enostavno nadgrajevati:

- **Engine** (`<script id="engine">` v `index.html`) — čista logika, brez DOM in brez Three.js.
  Izpostavlja `Sim.createWorld(opts)`, `world.step(dt)`, `world.inspect(agent)`.
  Enak kod teče v brskalniku in v node testu.
- **Prikaz + UI** (drugi `<script>`) — 3D prizor s Three.js, kamera, instrumenti.
  Engine je 2D; renderer ga preslika v 3D vodni volumen (globina in utripanje sta vizualna).

Test brez brskalnika:

```bash
node test.js   # 5 scenarijev × ~100 s: preveri NaN/mejne vrednosti, stabilnost, inspect()
```

## Že opažen emergentni pojav

**S predacijo** povprečna velikost naraste (~2.2) in barvna raznolikost pade na nekaj
linij (tekma proti večjim). **Brez predacije** ostanejo bitja majhna in učinkovita,
preživi pa vseh 12 barvnih linij. Predacija torej poganja rast telesa *in* zmanjšuje
raznolikost — netrivialen, merljiv rezultat. Zdaj lahko z Mullerjevim grafom in nišno
karto natančno spremljaš, *kdaj* se to zgodi.

## Smeri za nadgradnjo

- **Prava MAP-Elites / novelty search** — namesto energije nagrajuj *raznolikost obnašanja*
  in polni arhiv niš; preveri protiintuitivni rezultat, da opustitev cilja pogosto zmaga.
- **Filogenetsko drevo** — beleži starše (že shranjeno: `parentId`, `born`) in izriši dendrogram.
- **Spolno razmnoževanje** — križanje genomov; primerjaj hitrost evolucije.
- **3D rekviziti (Tripo.ai)** — nekaj statičnih modelov (korala, razbitina, velik plenilec)
  za okolje. Za sam roj so proceduralna bitja hitrejša in se lahko spreminjajo z evolucijo.
- **Prava 3D simulacija** — razširi engine na 3 osi (gibanje in čutila v prostoru).

## Nadzor

Pavza · Ponastavi · hitrost 1–8× · drsnika mutacija/hrana · preklopa predacija/obnavljanje ·
vleci za kamero · kolešček za zoom · klik na bitje = vpogled v možgane.

---

Three.js (`three.min.js`, r149) je vključen pod licenco MIT (© three.js authors).
