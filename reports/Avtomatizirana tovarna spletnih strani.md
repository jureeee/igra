# Zgradite tovarno, ki ji stranke zaupajo

Sites+ ima pravilne tehnične temelje. Stran je statična na Vercelu, ima strog CSP, v brskalniku ni nobenega ključa, povpraševanja pa gredo prek strežniške funkcije s Cloudflare Turnstile. Prodajno in pravno pa je danes anonimna: 12-mesečno vezavo prodaja neimenovan s.p. brez podatkov o podjetju, brez politike zasebnosti, pogojev poslovanja in referenc, s samimi izmišljenimi primeri ([sites.jurelabs.si](https://sites.jurelabs.si/)). Največji vzvod zato ni nova funkcija, ampak zaupanje. Pomagajo štiri stvari: samodejni »predogled vaše strani, preden plačate«, garancije, ki so v celoti pod vašim nadzorom (stran v 7 dneh po prejemu vsebin, Lighthouse ≥ 90), jasen izhod z domeno in vsebinami v lasti stranke ter program prvih desetih strank v zameno za mnenja. Tehnično naj vse paketne strani teče iz ene multi-tenant Next.js aplikacije na Vercel Pro (20 $) in enega Supabase Pro projekta v Frankfurtu (25 $). To je okoli 45 $ fiksnih stroškov na mesec ali 1,3–3,3 $ na stran pri 20–100 strankah, AI-osnutek cele strani pa stane manj kot 10 $. Pravi strošek je vaš čas za podporo, zato morajo biti popravki omejeni in obdelani po vrsti, eden za drugim. »Popolne varnosti« ni, glavne poti v bazo pa realno zaprete v 4–7 urah. Potrebujete MFA na vseh računih, najmanjše pravice na tabelah, prehod s starih Supabase ključev pred njihovo ukinitvijo konec 2026 in šifrirane kopije zunaj Supabase. Kot popoldanski normiranec plačate **113,01 € prispevkov na mesec** in 20 % dokončnega davka od osnove; pri 25.000 € prihodkov je to skupaj okoli 3.350 € ([Data d.o.o.](https://data.si/blog/novi-prispevki-za-popoldanski-s-p/)). Pred prvo pogodbo pa morate urediti še pet stvari: podatke po ZEPT, ID za DDV zaradi storitev Vercela in Supabase, pogodbo z DPA, morebitno pisno soglasje delodajalca in plan Vercel Pro, ker je Hobby za komercialno rabo prepovedan ([Vercel](https://vercel.com/docs/limits/fair-use-guidelines)).

## Sites+ je dražji od lokalnih naročnin, a cenejši od agencij

Sites+ danes prodaja tri pakete: **Basic 49 €/mes. + 249 € postavitve, Plus 89 €/mes. + 449 € in Pro 149 €/mes. + 690 €**, vse »brez DDV«. Postavitev odpade ob 12- ali 24-mesečni vezavi, 24 mesecev pa prinese še 10 % nižjo naročnino ([JS paket strani](https://sites.jurelabs.si/assets/main-lF9510r9.js)). Konfigurator je močan. Izbira panoge (bar, restavracija, salon, avtoservis, obrtnik, trgovina) vnaprej izbere paket in funkcije, cena se računa sproti, vrstica »Povrne se že pri N novih strankah« pa naročnino prevede v prihodek. Drugi korak je podroben brief: delovni čas, meni, povezava do sistema za rezervacije in barve znamke. To je skoraj vse, kar tovarna potrebuje za samodejno izdelavo strani. Iz konstant v kodi sledi, da prvo leto z vezavo in domeno stane **613 € (Basic), 1.093 € (Plus) in 1.813 € (Pro)**.

Primerjava s trgom pokaže, kje je ponudba ranljiva. Spletna vizitka pri izvajalcu stane v povprečju 690 €, stran do 10 podstrani 1.400 €, vzdrževanje pa 63 € na mesec ([Primerjam.si](https://www.primerjam.si/cene/izdelava-spletnih-strani/cena-izdelave-spletne-strani)). Multimedija.net prodaja predstavitveno stran za 790 € in poslovno za 1.390 € ([Multimedija.net](https://www.multimedija.net/spletne-strani/cena-izdelave-spletne-strani/)), zato je trditev na strani, da agencija samo za izdelavo zaračuna 600–1.800 €, upravičena. Lokalne naročnine so precej cenejše. REB ponuja najem od 25 € z DDV na mesec, brez vezave in z možnostjo odkupa ([REB](https://reb.si/najem-spletnih-strani/)). Spletna soseska zaračuna 29,20 € + DDV z 18-mesečno vezavo, ob odpovedi pa **stran izbriše** ([Spletna soseska](https://spletna-soseska.si/tipske-spletne-strani/poceni-spletna-stran/)). web123 izdela stran za 0 €, nato pa zaračunava 30–40 € na mesec ([web123](https://web123.si/spletna-stran-0-eur/)).

| Ponudba (brez DDV) | Strošek v treh letih |
|---|---|
| REB | ≈ 738 € |
| Spletna soseska | ≈ 1.051 € + domena |
| web123 | ≈ 1.080–1.440 € |
| **Sites+ Basic** | **≈ 1.839 €** |
| Multimedija Predstavitvena + gostovanje + vzdrževanje | ≈ 2.650 € |
| Multimedija Poslovna + gostovanje + vzdrževanje | ≈ 3.250 € |
| **Sites+ Plus** | **≈ 3.279 €** |
| **Sites+ Pro** | **≈ 5.439 €** |

V treh letih je Basic za 28–149 % dražji od poceni lokalnih naročnin in okoli 30 % cenejši od agencijske izdelave z vzdrževanjem. Plus stane približno toliko kot agencijska poslovna stran z vzdrževanjem. Pro je premium paket, ki ga upravičijo le storitve (šest popravkov, skrb za Google profil, mesečna izboljšava, rezervacije) in merljivi rezultati.

Od spodaj pritiskajo še DIY gradniki: Wix Light stane 17,77 $, Framer Basic 10 $, Squarespace Basic 19–25 $ na mesec ([Wix](https://www.wix.com/plans); [Framer](https://www.framer.com/pricing); [Squarespace](https://www.squarespace.com/pricing)). Durable za 25 $ ponuja stran s CRM, rezervacijami in »SEO & GEO« ([Durable](https://durable.com/pricing)). Obljuba »vidni v ChatGPT« sama zato ni več prednost, ki je drugi ne morejo posnemati. Squarespace-ova »AI Visibility« pa deluje le v angleških računih, kar pušča prostor slovenski storitvi, pri kateri delo opravite namesto stranke. Ta prostor je velik. 56 % slovenskih podjetij kot glavno oviro digitalizacije navaja pomanjkanje kadra ali znanja, 57 % malih podjetij pa meni, da digitalna preobrazba za njihovo poslovanje ni bistvena ([SURS](https://www.stat.si/StatWeb/News/Index/14010)). Takšni kupci ne kupujejo tehnologije. Kupujejo obljubo »nič vam ni treba znati« in izračun, koliko novih gostov pokrije naročnino.

### Stran obljublja zaupanje, ki ga sama ne izkazuje

Najšibkejši člen je zaupanje. Stran nima portfelja, referenc, mnenj, garancij, imena ali fotografije osebe, podatkov o s.p., politike zasebnosti, pogojev poslovanja ali vidnega kontakta. Vsi primeri so označeni kot izmišljeni, noga pa pravi »Stran je v pripravi« ([sites.jurelabs.si](https://sites.jurelabs.si/)). Za gostinca ali frizerko, ki naj podpiše 12-mesečno vezavo, je to verjetno največja ovira za nakup.

Druga ironija je, da Sites+ prodaja »podatke, ki jih AI prebere«, sama pa jih nima. Na strani ni JSON-LD ne Open Graph oznak, paketi in cene pa obstajajo le v JavaScriptu. Robot brez JS zato vidi samo »Že od 49 €«, deljena povezava v Viberju ali WhatsAppu pa nima predogleda.

Kredibilnost načenjajo še tri manjše nedoslednosti. Konfigurator spletno trgovino zaračuna kot dodatek (49 €/mes. + 290 €), brief za trgovine pa pravi, da spletno prodajo »dodamo, ko bo na voljo«. Obrazec obljublja »z nikomer jih ne delite«, čeprav podatke obdelujejo Cloudflare, Vercel in Supabase. Ob napaki API-ja pa se odpre mailto na osebni Gmail naslov. Strani torej ne manjka tehnike, manjkata ji obraz in pravna podlaga.

### Turizem prinaša najmočnejši argument, konfigurator pa ga ne pozna

Najmočnejši denarni argument imajo turistične nastanitve. Večja slovenska nastanitvena podjetja so **14,5 % prihodkov ustvarila prek rezervacijskih platform in le 8,7 % prek lastnih strani**, 83 % pa jih ima večjezično stran ([SURS](https://www.stat.si/StatWeb/News/Index/14142)). Paket »Apartma« s slovensko, angleško in nemško različico ter povezavo na neposredne rezervacije bi prodajal prihranjeno provizijo. Konfigurator pa nima niti gumba za apartmaje, dodaten jezik pa stane 19 € na mesec. Podatki SURS veljajo za podjetja z vsaj 10 zaposlenimi, zato je prenos na male sobodajalce sklep, ne dejstvo.

Ostale panoge potrebujejo različne vabe. Obrtnik s privzetim povprečnim računom 300 € povrne Basic že z enim poslom na mesec, potrebuje pa predvsem obrazec za povpraševanje in urejen Google profil. Bar z računom 12 € potrebuje za povračilo 4–8 novih gostov, zato je zanj boljša vaba samostojno urejanje menija kot bogat paket Plus.

Na subvencije pri prodaji ne računajte. SPS-ov vavčer za digitalni marketing je nazadnje tekel leta 2022, ZRSZ pa za samozaposlitev v letih 2026–2027 nima sredstev ([gov.si](https://www.gov.si/novice/2022-05-13-ponovna-objava-javnega-poziva-vavcer-za-digitalni-marketing/); [mladipodjetnik.si](https://mladipodjetnik.si/podjetniski-koticek/pridobivanje-sredstev/subvencija-za-samozaposlitev)). Tudi če se vavčer vrne, bo pomagal malokomu. Upravičena je bila le nova izdelava z enkratnim računom, prijavitelj je moral imeti vsaj enega zaposlenega, izvajalec pa vpis v katalog DIH ([SPS FAQ 2019](https://www.podjetniskisklad.si/wp-content/uploads/2024/03/VAV-8-najpogostejsa-vprasanja-DIGITALNI-MARKETING_2019-1.pdf)). Večina samostojnih frizerjev in barov bi izpadla.

## Predogled pred plačilom je najmočnejši prodajni vzvod

Hormozijeva enačba vrednosti pravi, da je vrednost ponudbe enaka *sanjskemu izidu × zaznani verjetnosti uspeha*, deljeno s *čakanjem × trudom kupca* ([povzetek EcomCrew](https://www.ecomcrew.com/100m-offers-book-summary/)). Avtomatizacija je vaš največji vzvod, ker zmanjša oba imenovalca. Predogled je pripravljen v urah in stran v dneh. Stranka pa le odgovori na deset vprašanj in pošlje pet fotografij, besedila napišete vi. Šibka točka nove znamke je *zaznana verjetnost*, saj kupec ne verjame, da bo stran res dobra.

Zato naj tovarna iz briefa samodejno sestavi predogled na `ime.sites.jurelabs.si`. Uporabi nišno predlogo, barve stranke in AI-osnutek besedil, označen kot »osnutek«. Pod predogled postavite gumb »Rezerviraj termin«. Da ga ne zlorabljajo boti ali radovedneži, ga omejite na prepoznavna podjetja (ime, telefon ali povezava na Google profil) in na en predogled na podjetje. Uporabite le podatke, ki jih je poslal kupec.

Predogled podprite s 6–10 nišnimi demo stranmi. Vsaka naj bo jasno označena kot demo in naj ima živo oceno PageSpeed. Pomagata še obraz ustanovitelja (fotografija, kratka zgodba »stran izdelam zvečer ob službi, zato sem avtomatiziral vse, kar ne potrebuje mene«, podatki s.p., telefon) in lastni Google profil z mnenji. Lokalni kupci se na mnenja zanašajo vse bolj: 97 % jih bere mnenja o lokalnih podjetjih, 68 % izbere le podjetja z oceno vsaj 4, 45 % pa za lokalna priporočila že uporablja generativno AI, leto prej le 6 % ([BrightLocal 2026 prek PinMeTo](https://www.pinmeto.com/news/brightlocal-local-consumer-review-survey-2026/)). To so ameriški podatki, slovenskih ni.

Prazen portfelj najhitreje zapolni program **ustanovnih strank**. Prvih deset dobi popust v zameno za pisno mnenje, Google oceno in dovoljenje za študijo primera »pred/po«. Ta program ustvari tudi pošteno nujnost.

### Garantirajte le tisto, kar je v vaših rokah

Designjoy, najbolj znan samostojni produktiziran servis, v prvem tednu vrne 75 % plačila brez vprašanj. Pozneje vračil ni, opravljenega dela pa nikoli ne vrača, »neomejene« popravke pa omejuje vrsta, v kateri je vedno le ena zahteva naenkrat ([Designjoy](https://www.designjoy.co/)). Metaanaliza o pogojih vračil v trgovini kaže, da prijazni denarni in postopkovni pogoji povečajo nakupe bolj kot vračila. Širjenje *obsega* tega, kar je mogoče vrniti, pa vračila poveča ([UT Dallas](https://news.utdallas.edu/?p=11491)). Za samostojnega izvajalca so zato varne le pogojne garancije za stvari, ki jih nadzorujete sami, poplačane v poceni valuti, kot so brezplačni meseci vzdrževanja.

| Garancija (predlog besedila) | Vaše tveganje | Pogoj, ki jo omeji |
|---|---|---|
| »Vidite svojo stran, preden plačate« | nizko, če je predogled samodejen | le prepoznavna podjetja, en predogled na podjetje |
| »Na spletu v 7 dneh po prejemu vseh vsebin – ali 3 mesece vzdrževanja zastonj« | nizko, saj je izplačilo le gostovanje | rok začne teči šele s popolnimi vsebinami |
| »Lighthouse mobile ≥ 90 in zelene Core Web Vitals ob predaji – ali popravimo zastonj« | zelo nizko na statičnem skladu | izključeni so pripomočki tretjih, ki jih zahteva stranka |
| »Vam smer oblikovanja ni všeč? Vrnemo avans« | omejeno | le pred začetkom gradnje |
| »Po 12 mesecih brez vezave; domena in vsebine so vaše, izvoz na zahtevo« | malo dela | jasna cena odkupa med vezavo |

Hitrostna garancija ima za stranko realno vrednost. Stran, ki se naloži v 1 sekundi, ima okoli trikrat višjo konverzijo kot stran s 5 sekundami ([Portent](https://www.portent.com/blog/analytics/research-site-speed-hurting-everyone.htm)).

Izogibajte se garancijam »več strank ali denar nazaj« in »prvo mesto na Googlu«, neomejenim popravkom brez časovne meje ter vračilom po predaji. Izid teh obljub je odvisen od trga, stranke in Googla, ne od vas.

Garancije ostanejo obvladljive s petimi pogodbenimi pravili. Stranka odda vsebine v 10 dneh, sicer gre stran na splet z AI-besedili, ki jih lahko kasneje popravi. Vsak paket vključuje dva kroga *združenih* pripomb. Objavljen cenik sprememb določa ceno dodatne strani, jezika in integracije, paket »Po meri« pa sprejme vse, česar v ceniku ni. Odzivni čas mora ustrezati službi, na primer »osebni odgovor isti dan do 21. ure«.

### Tri prave izbire, plačilo naenkrat ali mesečno

Strokovnjaki za cene priporočajo tri možnosti z visokim sidrom ([Blair Enns prek Davida Aireyja](https://archive.davidairey.com/dealing-with-designers/pricing-creativity-blair-enns/)). Učinek vabe (decoy), torej dodane slabše možnosti, ki naj bi kupca potisnila k dražji, pa je v realnih nakupih šibek ali se ne ponovi ([Devine idr. 2025](https://otto.lab.mcgill.ca/papers/devine_et_al_2025a.pdf)). Vsak paket mora zato pokrivati pravi segment. Dober nabor je vizitka za obrtnike, stran z rezervacijami za salone in večjezična stran za apartmaje, dodate pa še kartico »Po meri, od X €«. Ta deluje kot sidro in hkrati vljudno zavrača delo, ki ga ne želite.

Vsak paket ponudite na dva načina. Prvi je enkratna cena z neobveznim vzdrževanjem. Drugi je 0 € postavitve, mesečna naročnina in 12-mesečna vezava, nato mesečno brez vezave z jasno ceno odkupa. Mesečna pot naj v 24 mesecih stane več kot enkratna, ker gre v bistvu za financiranje. En ponudnik na primer zaračuna 99 $ na mesec 12 mesecev, po odplačilu pa 39 $ ([We.Inc](https://we.inc/blog/website-as-a-service-subscription-websites)). Isti vir izračuna, da se izdelava, vredna 5 ur, povrne v četrtem mesecu, izdelava, vredna 40 ur, pa šele v 31. mesecu. Ničelno postavitev zato ponujajte samo za predloge, ki jih tovarna sestavi v nekaj urah.

Pazite, da ne prodajate prepoceni. V raziskavi The Admin Bar 2026 (622 izvajalcev) je med tistimi s projekti pod 1.000 $ kar 37,5 % redko ali nikoli dobičkonosnih. Tistih brez ponavljajočih se prihodkov je takih 58,3 %, tistih s 25–49 % ponavljajočih se prihodkov pa le 9,7 % ([The Admin Bar](https://theadminbar.com/2026-survey/)). Gre za korelacije, a smer je jasna: nizka vstopna cena je smiselna le, če jo spremljata skoraj nič ročnih ur in naročnina.

V obstoječem konfiguratorju zato pokažite ceno postavitve in vezavo že na prvi kartici in napišite, kaj se zgodi ob odpovedi (izvoz, odkup, prenos). »Brez DDV« zamenjajte z jasnim zapisom davčnega statusa (glejte poglavje o davkih), spletno trgovino pa odstranite ali dokončajte.

### Odgovor v minuti, človeški stik isti večer

Raziskave kupcev podpirajo samopostrežni nakup in takojšen odziv. 67 % poslovnih kupcev raje kupuje brez prodajalca ([Gartner 2026](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience)). 71 % jih pravi, da jih javna cena prepriča k nakupu ([TrustRadius](https://solutions.trustradius.com/vendor-blog/tech-buyers-demand-honest-and-up-front-pricing-info/)). Podjetja, ki se odzovejo v eni uri, imajo okoli sedemkrat večjo verjetnost, da kontakt kvalificirajo, kot tista, ki čakajo uro dlje ([HBR](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)). To so ameriški in pretežno B2B podatki.

Za izvajalca s službo je praktičen odgovor samodejen prvi stik. Minuto po oddaji naj tovarna pošlje unikatno ponudbo z izbranim paketom, ceno, rokom, garancijami in izključitvami. Ponudba naj ima dva gumba: »Rezerviraj termin s 30 % avansa« in »15-minutni klic« ob večernih terminih. Isti večer sledi kratko osebno sporočilo ali minutni video ogled predogleda. Nadaljnja sporočila naj sledijo dnevom 1, 3, 7 in 14, z nišnim primerom, odgovori na ugovore in poštenim »zaprem zadevo?«. Ustavijo se ob odgovoru ali plačilu.

Pri pridobivanju strank imajo prednost kanali, ki ne jemljejo dnevnega časa. Priporočila nagradite s storitvijo, na primer z 2–3 meseci vzdrževanja, ne z denarjem. Priporočene stranke so v študiji bančnih strank imele okoli 16 % višjo življenjsko vrednost in so odhajale okoli 18 % počasneje ([Schmitt idr.](https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf)). Partnerji, kot so računovodski servisi, točke SPOT, tiskarne in fotografi, srečajo nova podjetja ravno takrat, ko potrebujejo stran. Nišne pristajalne strani in lasten Google profil pa delujejo brez vaših večerov.

Aktivni kanali (SEO, partnerstva, skupnost) so v The Admin Bar povezani s 50,3 % deležem izvajalcev nad 100.000 $ prihodkov. Pri tistih, ki čakajo na priporočila od ust do ust, je ta delež 31,8 % ([The Admin Bar](https://theadminbar.com/2026-survey/)). Hladno e-pošto zaradi ZEKom-2 in ZVOP-2 obravnava pravno poglavje.

## Šestnajst modulov, zgrajenih enkrat in vklopljenih s stikalom

»Čim več funkcij« ima v tovarni smisel le pod enim pogojem: vsak modul zgradite enkrat v predlogi in ga za posamezno stranko vklopite s stikalom v `modules` jsonb. Stranka nato ureja strukturirane podatke prek obrazcev, ne postavitve. Takšen modul ima skoraj ničelne mejne stroške. Nasprotno pa spletna trgovina, članska območja in AI klepetalniki nosijo največ podpore, davčnih obveznosti in odgovornosti, zato sodijo med drage dodatke ([We.Inc](https://we.inc/blog/website-as-a-service-subscription-websites); [gov.si](https://www.gov.si/teme/davcni-postopek-in-davcno-potrjevanje-racunov/)).

| Modul | Vrednost za stranko | Breme podpore | Kam sodi |
|---|---|---|---|
| SEO: metapodatki, `sitemap`, hreflang, JSON-LD (`LocalBusiness`, `Restaurant`, `FAQPage`), OG slike | visoka | ~0 | vsi paketi |
| Obrazec, zaščita pred boti, nabiralnik v portalu, e-obvestilo | visoka | nizko | vsi paketi |
| Delovni čas (tudi oznaka »odprto zdaj«), zemljevid na klik, klic in WhatsApp | visoka | ~0 | vsi paketi |
| Analitika brez piškotkov in samodejno mesečno poročilo | visoka (zaznana) | ~0 | vsi paketi in vzdrževanje |
| WCAG 2.2 AA, izjava o dostopnosti, pravni blok ZEPT, politika zasebnosti | srednja–visoka | nizko | vsi paketi |
| Google mnenja (značka ali pripomoček) | visoka (zaupanje) | nizko | Plus ali dodatek |
| Meni, cenik, storitve z alergeni in `Menu` shemo | visoka za gostinstvo in salone | nizko | Plus |
| Galerija, novice in dogodki z izvozom `.ics` | srednja–visoka | nizko | Plus |
| Večjezičnost (AI-prevod, stranka ga potrdi) | visoka za turizem | srednje | dodatek, privzeto v paketu Apartma |
| Rezervacije prek Cal.com | visoka za termine | srednje | Plus in Pro |
| E-novice (prijava z dvojno potrditvijo) | srednja | nizko–srednje | dodatek |
| »Lahka« trgovina: boni, avansi, mali katalog | visoka za nekatere | **visoko** (davčno potrjevanje, DDV, vračila) | drag dodatek |
| AI klepetalnik samo na vsebinah stranke | nedokazana | srednje–visoko | drag dodatek z omejenim obsegom |
| Članski del | nišna | srednje | Po meri |
| PWA | nizka | nizko | brezplačno v predlogi |
| Učinki (paralaksa, steklo, 3D) | čustvena | nizko, a **ogroža hitrost** | le znotraj proračuna zmogljivosti |

### Kaj vgraditi v vse pakete

Prvih pet vrstic naj bo »kakovost po privzetem« v vseh paketih. Stanejo enkratno delo in so hkrati prodajni argument proti WordPress konkurenci.

Mesečno poročilo je najcenejše orodje za zadrževanje strank. Cron prvi dan v mesecu prebere obiske posamezne domene iz Vercel Web Analytics ali Plausible. Claude Haiku 5.5 nato napiše pet stavkov s priporočili v slovenščini, Resend pa poročilo pošlje. Vercel Web Analytics stane na Pro 0,03 $ na 1.000 dogodkov ([Vercel](https://vercel.com/docs/analytics/limits-and-pricing)), Haiku pa 0,10/0,50 $ na milijon žetonov ([Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)), zato je poročilo praktično zastonj.

Analitika brez piškotkov, lastno gostovane pisave in zemljevidi, ki se naložijo šele na klik, odpravijo pasico za piškotke. To je argument, ki ga razume vsak lastnik lokala.

### Dodatki, ki jih prodajate posebej

Pri dodatkih so izračuni preprosti. Google mnenja se zaračunajo po 25 $ na 1.000 klicev po 1.000 brezplačnih na mesec ([Google Maps Platform](https://developers.google.com/maps/billing-and-pricing/pricing?hl=de)). Dnevno osveževanje tako pokrije okoli 33 strank brezplačno, tedensko pa okoli 230.

Cal.com je za enega uporabnika brezplačen in sprejema plačila prek Stripe in PayPala ([Cal.com](https://cal.com/pricing)). Rezervacije zato *vgradite*, ne programirajte. Okoli dve tretjini potrošnikov raje rezervira termin na spletu ([SimplyBook.me, prodajalčev vir](https://simplybook.me/blog/online-booking-statistics)).

Za večjezičnost govori raziskava CSA: 76 % spletnih kupcev raje kupuje v svojem jeziku, 40 % pa v tujem sploh ne kupi ([CSA Research](https://csa-research.com/blogs-events/csa-in-the-media/press-releases/consumers-prefer-their-own-language)). Podatki so iz leta 2020, a za apartmaje to ostaja glavni argument.

AI klepetalnik s Haikujem stane okoli 0,80 $ na 1.000 pogovorov. Od 2. avgusta 2026 pa mora jasno povedati, da je AI ([Travers Smith](https://www.traverssmith.com/knowledge/knowledge-container/is-it-a-bot-eu-ai-act-transparency-rules-take-effect-2-august-2026/)). Brez strogega obsega (le pogosta vprašanja in predaja na obrazec) prinese več tveganja kot prodaje.

Pravo trgovino prepustite Shopify z aplikacijo e-računi, ki izdaja davčno potrjene račune ([Shopify App Store](https://apps.shopify.com/e-racuni-slovenia)).

Pri učinkih velja opozorilo. Lighthouse ocena zmogljivosti 30 % teže namenja času blokiranja glavne niti (TBT) ([Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)). Težki SVG filtri in knjižnice za gladko drsenje lahko torej spodkopljejo garancijo hitrosti. Učinek naj gre v stran le, če prestane avtomatski proračun zmogljivosti.

### Kako stranka ureja vsebino

Najmanj podpore zahteva **portal na Supabase s strukturiranimi obrazci** za delovni čas, cenike, menije, galerije in novice. Stranka ne more pokvariti oblikovanja, polja pa se neposredno preslikajo v schema.org. Strankam, ki želijo več svobode, lahko dodate vizualni urejevalnik **Puck** (MIT licenca, JSON v vaši bazi), omejen na komponente tovarne ([Puck](https://github.com/puckeditor/puck)).

Payload 3 ima uradni multi-tenant vtičnik, a je to cel CMS, ki ga je treba razlagati, nadgrajevati in varovati ([Payload](https://payloadcms.com/docs/plugins/multi-tenant)). SaaS urejevalniki se zaračunavajo na projekt: pri TinaCloud Team bi 30 strank stalo okoli 720 $ na mesec ([Tina](https://tina.io/pricing)).

Za najcenejši paket je najboljša rešitev gumb »Zahtevaj spremembo«. Zahtevo spremeni AI-agent, vi pa jo z enim klikom potrdite. Samostojno urejanje tako postane razlog za nadgradnjo.

## Infrastruktura stane 45 dolarjev na mesec, vaš čas veliko več

### En multi-tenant projekt namesto sto strani

Za graditelje spletnih strani, kjer se »vsebina in znamka razlikujeta, funkcionalnost pa je ista«, Vercel priporoča vzorec multi-tenant. Vse stranke streže ena koda z eno namestitvijo, stranko (tenant) pa `proxy.ts` prepozna po imenu gostitelja ([Vercel for Platforms](https://vercel.com/docs/platforms); [Multi-tenant concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts)). Vzorec je preizkušen. Super iz enega projekta streže več kot 15.000 lastnih domen ([Vercel](https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel)), Pro pa dovoljuje neomejeno domen na projekt z mehko mejo 100.000 ([Vercel Limits](https://vercel.com/docs/limits)).

Za Sites+ to pomeni, da obstoječa Vite predstavitvena stran ostane, kot je. Vse paketne strani pa izrisuje ena Next.js aplikacija. Vsaka stranka je vrstica v tabeli `tenants` s slugom, domeno, statusom (osnutek, pregled, objavljeno), paketom, jeziki, poljem `modules` z vklopljenimi funkcijami, poljem `theme` z barvami in pisavami ter poljem `seo`. Strani so sestavljene iz `sections` s tipom in `props` jsonb, register komponent pa jih preslika v React. Sprememba vsebine sproži revalidacijo po oznaki predpomnilnika, ne nove gradnje. Posodobitev odvisnosti tako z enim popravkom zajame vse stranke. Za redko stranko s kodo po meri ostane izhod: isti paket komponent v ločenem projektu, ustvarjenem prek Vercel SDK.

Štiri pasti je dobro poznati vnaprej. Predogledne namestitve za posamezno stranko so le v paketu Enterprise ([Vercel](https://vercel.com/docs/platforms/multi-tenant-platforms/limits)), zato osnutke strezite iz produkcije na poddomeni, zaščiteni s podpisanim žetonom ali načinom osnutka (draft mode). Wildcard certifikat za `*.sites.jurelabs.si` zahteva Vercel DNS ali delegirano preverjanje `_acme-challenge`. Vercel funkcije privzeto tečejo v Washingtonu (iad1), zato v predlogi nastavite `fra1`, ob Supabase v Frankfurtu ([Vercel regions](https://vercel.com/docs/functions/configuring-functions/region)). Supabase projekt pa ustvarite izrecno v `eu-central-1`, ker splošna izbira »Europe« lahko pristane v Londonu ali Zürichu ([Supabase Regions](https://supabase.com/docs/guides/platform/regions)).

En Supabase Pro projekt z `tenant_id` in RLS stane 25 $ ne glede na število strank. Vsak dodaten projekt prinese vsaj okoli 10 $ računske moči, ki je omejitev porabe ne zajame ([Supabase billing](https://supabase.com/docs/guides/platform/billing-on-supabase)). Brezplačni Supabase se po tednu neaktivnosti ustavi in nima varnostnih kopij ([Supabase Pricing](https://supabase.com/pricing)). Pri obrazcu za povpraševanja to pomeni izgubljen posel.

| Strank | Vercel | Supabase | Nadzor, e-pošta | Skupaj na mesec | Na stran |
|---|---|---|---|---|---|
| 5 | 20 $ | 25 $ | 0 $ | ≈ 45 $ | ≈ 9 $ |
| 20 | 20–40 $ | 25 $ | 0 $ | ≈ 45–65 $ | ≈ 2,3–3,3 $ |
| 50 | ≈ 40 $ | 25 $ | 0–20 $ | ≈ 65–85 $ | ≈ 1,3–1,7 $ |
| 100 | ≈ 58–138 $ | 25 $ | ≈ 53–82 $ | ≈ 136–245 $ | ≈ 1,4–2,5 $ |

Izračun predpostavlja statične strani s 6.000 ogledi na mesec in ga je treba preveriti na prvih strankah. Vercel Pro vključuje 1 milijon zahtev CDN in 1 TB prenosa. Naslednja stopnja Flat Rate CDN stane 20 $ za 10 milijonov zahtev, enodnevni skok obiska pa vas ne prestavi v višjo stopnjo ([Vercel Flat Rate CDN](https://vercel.com/docs/pricing/flat-rate-cdn)). Povzetek cenika sicer navaja 10 milijonov vključenih zahtev, zato podatek preverite na nadzorni plošči. Domena .si doda 10–20 € na leto; pristojbina registra je 10 € ([Register.si](https://register.si/en/?p=4482)).

Pri omejevanju porabe ne vklopite možnosti »Pause Production Deployments«. Ob preseženem proračunu ustavi **vse** projekte v ekipi, znova pa jih zaganjate enega po enega ([Vercel Spend Management](https://vercel.com/docs/spend-management)). Namesto tega nastavite opozorila in webhook. Na vse zneske v dolarjih računajte še 22 % DDV, ki ga obračunate sami (davčno poglavje).

### Od povpraševanja do objave brez ročnega dela

Celoten tok je stanje v `projects.status`, ki ga poganja en Vercel Workflow na projekt. Ta lahko čaka na stranko neomejeno dolgo in stane 0,02 $ na 1.000 dogodkov ([Vercel Workflows](https://vercel.com/docs/workflows/pricing)). Alternativa sta pg_cron in Supabase Queues. Povpraševanje zapiše kontakt in iz tabele cen sestavi ponudbo, ki gre stranki kot spletna stran s čarobno povezavo v portal. Stranka jo sprejme s klikom, sistem pa zabeleži revizijsko sled (čas, IP, brskalnik, SHA-256 ponudbe). To je preprost elektronski podpis, ki mu po eIDAS čl. 25(1) dokazne vrednosti ni mogoče odreči samo zato, ker je elektronski ([eIDAS](https://eur-lex.europa.eu/eli/reg/2014/910/oj)); za večje posle DocuSeal API stane 0,20 $ na dokument ([DocuSeal](https://www.docuseal.com/pricing)). Avans gre na predračun z UPN QR (knjižnica `upnqr`) ali prek Stripe, kjer evropske kartice stanejo 1,5 % + 0,25 € ([Stripe SI](https://stripe.com/en-si/pricing)). Stripe webhook nato prek API-ja izda račun v Minimaxu, ki za zunanje sisteme opravi tudi davčno potrjevanje; paket »Izdani računi« stane 13 € na mesec ([Minimax](https://www.minimax.si/cenik); [Minimax API](https://si-minimax.knowledgeowl.com/help/pdfexport/id/5cb5e0a3ec161c9e1c0b0bc9)).

Čarovnik v portalu nato zbere besedila in datoteke v Supabase Storage in stranko sam opominja, dokler seznam ni popoln. AI napiše osnutek v strogo JSON shemo predloge, ki ga preveri Zod. V multi-tenant modelu ni gradnje, zato je stran takoj na poddomeni, posnetek Playwright in tek Lighthouse pa se priložita e-pošti za pregled. Po končnem plačilu API doda domeno, cron počaka na SSL certifikat, status se preklopi v »objavljeno« in oznaka `noindex` izgine.

Pri AI-osnutku veljajo trije varovalni ukrepi. Model nikoli ne piše HTML. Kjer dejstva manjkajo, vrne `[[MANJKA: …]]` namesto izmišljenih letnic in certifikatov. Drugi prehod pa kot »slovenski lektor« uskladi vikanje, dvojino in izraze. Z modelom Sonnet 5.5 (2/10 $ na milijon žetonov) stane osnutek s prevodoma v angleščino in nemščino okoli 0,65 $, z Opus 5.5 okoli 1,30 $. Osem slik stane 0,27–1,07 $ ([Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing); [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing)). Sodobne primerjave kakovosti slovenščine med modeli ni ([arXiv GaMS3](https://arxiv.org/html/2603.01691v1)). Naredite majhen slepi test, zadnja lektorica pa naj bo stranka v predogledu. Anthropicov neposredni API ne ponuja obdelave izključno v EU; regionalne končne točke prek Bedrock ali Vertex so dražje za okoli 10 %. Pri fotografijah imajo prednost strankine, nato licencirane zaloge. AI naj riše le dekoracijo, nikoli fotorealističnih »prostorov« ali »ekipe«.

Vzdrževanje postane naloga platforme, ne posamezne stranke. Renovate združuje posodobitve in popravke sprejme samodejno, ko uspe CI: preverjanje tipov, vizualni posnetki po ena stranka na predlogo, Lighthouse CI in tedenski pregled povezav. Za nadzor dosegljivosti UptimeRobot Free pokrije 50 monitorjev, a si njegovi pogoji glede komercialne rabe nasprotujejo ([UptimeRobot](https://uptimerobot.com/pricing/)). Resend Free pošlje 3.000 sporočil na mesec, a največ 100 na dan ([Resend](https://resend.com/pricing)).

### Hitrost prodajajte kot izmerljivo obljubo, ne kot 100/100

Le 48 % mobilnih spletnih mest prestane vse tri Core Web Vitals ([Web Almanac 2025](https://almanac.httparchive.org/en/2025/performance)), zato je »hitro« resnična prednost. Pragovi so LCP ≤ 2,5 s, INP ≤ 200 ms in CLS ≤ 0,1 pri 75. percentilu ([web.dev](https://web.dev/articles/vitals)). Next.js 16.4 za marketinške strani priporoča Cache Components in `ensureStatic = 'navigation'`, ki prekine gradnjo, če bi stran postala dinamična ([Next.js 16.4](https://nextjs.org/blog/next-16-4)). `next/font` gosti pisave lokalno, brez zamika postavitve in brez zahtev k Googlu ([Next.js Fonts](https://nextjs.org/docs/app/getting-started/fonts)). Slike dobijo dimenzije, `priority` le slika LCP, formata pa sta AVIF ali WebP. JavaScript ostane v majhnih otokih, zemljevid, video in klepet pa se naložijo šele na klik.

Ne obljubljajte 100/100. Google sam piše, da popolna ocena »ni pričakovana« in da ocene nihajo ([Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)). Male strani poleg tega praviloma nimajo terenskih podatkov CrUX, ker ne dosežejo praga obiska, ki ga Google ne razkrije ([CrUX](https://developer.chrome.com/docs/crux/methodology)). V pogodbo zato zapišite obljubo, ki jo Lighthouse CI preveri samodejno: »Lighthouse mobile ≥ 90 (mediana petih tekov), LCP < 2,5 s in CLS < 0,1 ob predaji in ob vsaki objavi.«

Gradite prenosljivo, brez API-jev, vezanih na Vercel. Statični izvoz Next.js zna streči vsak strežnik ([Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)). Statična sredstva so na Cloudflare Workers brezplačna in neomejena ([Cloudflare](https://developers.cloudflare.com/workers/platform/pricing/)). Selitev pride v poštev, če bi račun pri Vercelu trajno presegel 150–300 $ na mesec.

Ozko grlo je na koncu čas. Vir iz panoge opozarja, da prve popustijo »ure podpore, ne stroški platforme«, in svetuje omejitev popravkov, preden število strank doseže okoli 25 ([We.Inc](https://we.inc/blog/website-as-a-service-subscription-websites)). Najbližji primerljiv primer, FLX Websites, poroča o okoli 12.000 $ mesečnih ponavljajočih se prihodkov pri približno 15 urah dela na teden ([Indie Hackers](https://www.indiehackers.com/post/how-i-built-and-scaled-a-profitable-web-design-business-selling-to-local-regional-smbs-av2hYobWuXHlvqQyUM0v)). Zahteve sprejemajte prek obrazca, ne prek WhatsAppa, eno naenkrat in z rokom treh delovnih dni. Delo pa združite v stalne večerne termine.

## Baza je zaprta, odprti ostajajo računi, ključi in kopije

»Da nihče ne pride v bazo in nič ne uniči« ni mogoče zagotoviti. Doseči pa je mogoče tri stvari. Edina pot do baze je ena majhna, preverjena strežniška funkcija. Računi, ki nadzorujejo vse (e-pošta, GitHub, Vercel, Supabase, registrar), so zaščiteni z MFA. Podatke je mogoče obnoviti iz kopij, ki jih napadalec z istimi gesli ne more izbrisati.

Pasivni pregled sites.jurelabs.si v HTML in JavaScriptu ni našel nobenega ključa, Supabase naslova ali skrivnosti. CSP (`connect-src 'self'`) brskalniku sploh ne dovoli povezave na Supabase, povpraševanja pa gredo na `/api/povprasevanje` ([sites.jurelabs.si](https://sites.jurelabs.si/)). Tveganje je torej za to funkcijo (preverjanje vnosa, vrsta ključa, pravice na tabelah) ter v računih in kopijah. Od zunaj tega ni mogoče videti.

Resnični incidenti kažejo, kje se zalomi. Pri CVE-2025-48757 je imelo 303 končnih točk v 170 projektih, narejenih z Lovable, pomanjkljiv RLS. Javni ključ je bil v brskalniku, zato je lahko vsak neposredno bral in celo pisal, na primer `"payment_status": "paid"` ([Matt Palmer](https://mattpalmer.io/posts/statement-on-CVE-2025-48757/)). Moltbook je zaradi ključa v JavaScriptu in baze brez RLS razkril okoli 1,5 milijona API ključev ([Wiz](https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys)). Sites+ danes ne dela nobene od teh napak. Tveganje se vrne, ko boste gradili portal za stranke, zlasti z AI orodji.

Trije roki zahtevajo ukrepanje zdaj. Od 30. 10. 2026 Supabase novih tabel ne izpostavi več samodejno, stare pa obdržijo obstoječe pravice ([Supabase changelog](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)). Stara ključa `anon` in `service_role` Supabase ukinja do konca 2026, aplikacije, ki ju še uporabljajo, pa se bodo zlomile ([Supabase API keys](https://supabase.com/docs/guides/api/api-keys); [GitHub #29260](https://github.com/orgs/supabase/discussions/29260)). Plan Hobby pri Vercelu pa za komercialno rabo ni dovoljen.

### Šest ukrepov za ta teden

| Ukrep | Čas | Kaj prepreči |
|---|---|---|
| MFA ali passkeys na e-pošti, GitHubu, Vercelu, Supabase, registrarju in Cloudflaru; obvezna 2FA v ekipi Vercel; »Require MFA« v organizaciji Supabase | 30–60 min | prevzem računa, ki obide RLS, požarni zid in kopije hkrati |
| Security Advisor (napake `0013`, `0023`, `0010`, `0002`, `0015`), RLS na vseh tabelah, `revoke all` za `anon`/`authenticated` na tabeli povpraševanj, `service_role` le `insert` in `select` | 30–90 min | branje ali brisanje povpraševanj prek API |
| Nov ključ `sb_secret_…` samo za to funkcijo, shranjen kot Vercel *Secret* le za produkcijo; nato izklop starih ključev | 30 min | zlom ob ukinitvi in en ključ za vse |
| Turnstile siteverify (`success`, `hostname`, `action`), Zod in omejitev velikosti, past za bote (honeypot) z minimalnim časom izpolnjevanja, pravilo WAF 5 zahtev v 60 s na IP | 1–2 h | spam, poplava obrazcev, e-poštno bombardiranje |
| Nočni `supabase db dump`, šifriran in naložen v shrambo z verzijami in zaklepom objektov (object lock), s ključem, ki ne more brisati; ločena kopija datotek; poskusna obnova | 1–2 h | trajna izguba podatkov |
| Vercel Pro | 15 min | kršitev pogojev; WAF zraste s 3 na 40 pravil |

Viri za tabelo: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase Data API](https://supabase.com/docs/guides/database/hardening-data-api), [Supabase advisors](https://supabase.com/docs/guides/database/database-advisors), [Vercel 2FA](https://vercel.com/docs/two-factor-enforcement), [Vercel Secret env](https://vercel.com/docs/environment-variables/sensitive-environment-variables), [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), [Supabase backups](https://supabase.com/docs/guides/platform/backups).

Pri tabeli so pomembne štiri podrobnosti. Cloudflare izrecno piše, da gradnik Turnstile v brskalniku sam obrazca ne varuje; žetoni veljajo 300 sekund in jih je mogoče preveriti le enkrat ([Cloudflare](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)). Ključ `service_role` obide vsak RLS, a pravice na tabelah veljajo tudi zanj: če ima le `insert` in `select`, ukradeni ključ tabele ne more izprazniti, Data API pa, če ga ne uporabljate, izklopite, da se ne odzove nobena REST točka. Dnevne kopije na Pro se hranijo 7 dni, ne vsebujejo datotek iz Storage in jih ni mogoče prenesti, zato je neodvisen šifriran dump zunaj Supabase in GitHuba glavni ukrep proti »uničenju«; PITR za okoli 100 $ na mesec dodajte, ko izguba enega dneva podatkov ne bo več sprejemljiva. Potrdil na naslove, ki jih vpiše uporabnik, pa ne pošiljajte samodejno, ker bi obrazec postal orodje za e-poštno bombardiranje.

### Ta mesec: ločena okolja in dobavna veriga

Ločite produkcijsko in razvojno Supabase bazo ter vklopite Vercel Standard Protection za predoglede. Koda na vseh imenih razen produkcijskega uporablja Cloudflarov testni ključ, ki vedno uspe. Javni predogled s produkcijskimi gesli bi zato obšel zaščito pred boti. Vklopite tudi pravilo »Require Separate Values«, da produkcijske skrivnosti nikoli ne pridejo v predogled.

Dobavna veriga npm je v letih 2025–2026 postala realna grožnja. Črv CHAINDROP je avgusta 2026 okužil več kot 400 paketov z več kot 1,3 milijarde mesečnih prenosov. Kradel je žetone in v projekte podtaknil kavlje Claude Code `SessionStart` in VS Code ([Elastic](https://www.elastic.co/security-labs/shai-hulud-chaindrop-npm-supply-chain)). Proti temu pomagajo pnpm 11 z `minimumReleaseAge` (privzeto en dan) ali npm `min-release-age`, blokirani namestitveni skripti razen dovoljenih ([pnpm](https://pnpm.io/supply-chain-security)), zaklenjena datoteka odvisnosti z `--frozen-lockfile`, skeniranje skrivnosti in zaščita veje na GitHubu, prenosnik brez dolgoživih žetonov ter pregled vsake spremembe v `.claude/` in `.vscode/`.

Next.js ima od julija 2026 mesečne varnostne izdaje, naslednjo 3. 11. 2026 ([Next.js blog](https://nextjs.org/blog)). 14. 10. 2026 je izredno popravil celo RCE brez avtentikacije v funkcijah `use cache` ([Next.js](https://nextjs.org/blog/nextjs-security-update-october-14-2026)). Ravno zato je en multi-tenant projekt varnostna prednost, saj en popravek zaščiti vse stranke.

### Kar velja, ko boste odprli portal za stranke

Ko boste strankam omogočili prijavo, nalaganje datotek ali plačila, morajo pravila RLS temeljiti na lastniku z `(select auth.uid())`, `to authenticated`, indeksom na stolpcu in `with check` pri vnosu ([Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)), samodejni test pa mora dokazati, da stranka A ne vidi podatkov stranke B. Avtorizacija nikoli ne sme temeljiti na `user_metadata`, datoteke sodijo v zasebna vedra s pravili po mapah ([Supabase Storage](https://supabase.com/docs/guides/storage/security/access-control)), funkcije SECURITY DEFINER pa v neizpostavljeno shemo s `search_path = ''`. V Next.js potrebujete sloj za dostop do podatkov s `server-only` ter preverjanje identitete in pravic v *vsaki* Server Action in Route Handler, ker je Server Action dosegljiva z neposrednim POST ([Next.js data security](https://nextjs.org/docs/app/guides/data-security)). Avtorizacija le v middleware je že padla pri CVE-2025-29927 z oceno 9,1 ([GitHub Advisory](https://github.com/advisories/GHSA-f82v-jwr5-mffw)).

Napišite si tudi enostranski načrt za incident. Najprej zajezite škodo: zamenjajte ključ, blokirajte napadalca v WAF, odvzemite pravice na tabelah ali izklopite Data API. Nato izvozite dnevnike, preden potečejo (Supabase jih na Pro hrani 7 dni), podatke pa najprej obnovite v ločen projekt. Če je kršitev ogrozila posameznike, Informacijskega pooblaščenca obvestite v 72 urah, vsako kršitev pa dokumentirajte ([GDPR čl. 33](https://gdpr-info.eu/art-33-gdpr/)).

## Popoldanski normiranec odda 13–18 % prihodkov

### Pred registracijo: polni delovni čas, soglasje delodajalca, K62.100

Popoldanski s.p. lahko odpre le, kdor je zaposlen za polni delovni čas, praviloma 40 ur. Ali zadošča tudi 36-urni polni delovni čas, viri ne povedo enotno, zato to preverite pri ZZZS ali SPOT ([data.si](https://data.si/blog/odprtje-popoldanskega-s-p-3/); [data.si](https://data.si/blog/popoldanski-sp-polni-delovni-cas/)). Registracija je brezplačna, prek portala SPOT s kvalificiranim potrdilom ali na točki SPOT. Prijava pri FURS in v zavarovanje sledi iz iste vloge ([SPOT](https://spot.gov.si/sl/teme/ustanovitev-s-p/)). Glavna dejavnost naj bo **K62.100 Računalniško programiranje**, ki po SKD 2025 izrecno zajema spletne strani in nima posebnih pogojev za opravljanje ([SPOT](https://spot.gov.si/sl/dejavnosti-in-poklici/dejavnosti/racunalnisko-programiranje-62-100)).

Ključna past je 39. člen ZDR-1. Brez **pisnega soglasja** delodajalca ne smete opravljati del, ki sodijo v dejavnost, ki jo delodajalec *dejansko* opravlja, in bi zanj lahko pomenila konkurenco. Delodajalec lahko odškodnino zahteva v treh mesecih od tega, ko izve za posel, oziroma v treh letih od posla ([ZDR-1, 39. člen](https://www.racunovodstvo.net/zakonodaja/zdr/39-clen)). Če delate v spletni agenciji ali softverski hiši, soglasje pridobite pred prvo stranko. V banki ali proizvodnem podjetju je tveganje manjše, pisno soglasje pa ga odpravi v celoti. V pogodbi o zaposlitvi preverite še konkurenčno klavzulo in določila o intelektualni lastnini. Za s.p. nikoli ne uporabljajte delodajalčeve opreme ali delovnega časa.

Popoldanski s.p. sme zaposliti delavca ([data.si](https://data.si/blog/zaposlitev-delavca-v-popoldansekem-s-p/)). Podizvajalci morajo avtorske pravice na vas prenesti pisno.

### Normiranci 2026: 80 % priznanih stroškov do 12.500 €, 20 % dokončnega davka

Prispevki so pavšalni: 110,11 € na mesec od januarja do marca 2026 in **113,01 € od aprila** (PIZ 52,05 + ZZ 54,53 + DO 6,43), skupaj okoli 1.347 € v letu, plačljivi do 20. v mesecu skupaj z akontacijo ([OOZ Cerknica](https://www.oozc.si/obvestila/prispevki-za-polni-s-p-popoldanski-s-p-2026-in-placevanje-prispevkov/); [Data d.o.o.](https://data.si/blog/novi-prispevki-za-popoldanski-s-p/)). Pokojninski del krije le invalidnost, telesno okvaro in smrt, zato najverjetneje ne gradi pokojninske dobe; preverite pri ZPIZ.

Po ZPZR in ZPZR-A ostane popoldanski s.p. normiranec, dokler povprečje prihodkov zadnjih dveh let ne preseže **50.000 €**. Priznani normirani odhodki so 80 % do 12.500 €, 40 % od 12.500 do 30.000 € in 0 % nad tem (največ 17.000 €), davek pa je dokončen: 20 % od osnove do 33.000 €, nad tem 6.600 € + 35 % ([FURS](https://www.gov.si/novice/2025-11-24-novosti-pri-ugotavljanju-davcne-osnove-z-upostevanjem-normiranih-odhodkov-v-letu-2026/); [FURS, ZPZR-A](https://www.gov.si/novice/2026-03-12-omilitev-pogojev-za-vstop-v-sistem-normiranih-odhodkov/); [ZDoh-2, 59. člen](https://www.racunovodstvo.net/zakonodaja/zdoh/59-clen)).

| Letni prihodek | Normirani odhodki | Osnova | Davek | Davek + prispevki | Delež prihodka |
|---|---|---|---|---|---|
| 10.000 € | 8.000 € | 2.000 € | 400 € | 1.747 € | 17,5 % |
| 25.000 € | 15.000 € | 10.000 € | 2.000 € | 3.347 € | 13,4 % |
| 50.000 € | 17.000 € | 33.000 € | 6.600 € | 7.947 € | 15,9 % |

Pri dejanskih stroških bi se dobiček prištel plači in bil obdavčen po vaši mejni stopnji 26–39 % ([lestvica 2026](https://data.si/blog/dohodninska-lestvica-2026-prinasa-spremembe-glede-na-leto-2025/)). Pri 25.000 € prihodkov to pomeni okoli 5.600–7.150 € davka namesto 2.000 €. Vaši realni stroški so majhni (infrastruktura je okoli 45 $ na mesec), zato je normiranje jasna izbira.

Upoštevajte tri opozorila. Obrazec SPOT akontacijo računa z 80 % odhodkov in 20 % stopnjo, zato bo nad 12.500 € prihodkov prenizka in z letno napovedjo sledi doplačilo ([SPOT/FURS](https://spot.gov.si/sl/portal-in-tocke-spot/novice/2025-12-22-102600-furs-obvesca-nove-stopnje-dohodnine-od-dohodka-iz-dejavnosti-ki-se-ne-vsteva-v-letno-davcno-osnovo-normiranci)). 6. decembra 2026 je referendum o ZIURS: če zakon obstane, bi za leto 2026 veljala meja 70.000 € in 80 % normiranih odhodkov do 50.000 €, prispevek za DO pa bi odpadel; če pade, velja ZPZR ([FURS](https://www.gov.si/novice/2026-10-16-ugotavljanje-davcne-osnove-z-normiranimi-odhodki-v-letu-2026-v-povezavi-z-interventnim-zakonom-ziurs/); [spnomad.si](https://www.spnomad.si/objave/interventni-zakon-2026-spremembe-za-sp)). Pred napovedjo za leto 2026 se zato posvetujte z računovodjo. Meja 50.000 € pa v praksi pomeni okoli 47 letnih naročnin Plus, 85 Basic ali 28 Pro, pri čemer decembrski računi štejejo v tekoče leto.

### DDV: niste zavezanec, identifikacijsko številko pa potrebujete takoj

Dokler slovenski promet ne preseže **60.000 €** (v tekočem letu z blažilnikom do 66.000 €), ste oproščeni DDV. Na računih ga ne smete izkazati in nimate pravice do odbitka ([ZDDV-1, 94. člen](https://www.racunovodstvo.net/zakonodaja/zddv/94-clen)). Na račun zapišite »DDV ni obračunan na podlagi 1. odstavka 94. člena ZDDV-1«. Na strani pa »brez DDV« zamenjajte z »Cene so končne, nisem zavezanec za DDV«, ker ZEPT zahteva jasnost, ali so davki vključeni ([ZEPT, 5. člen](https://www.racunovodstvo.net/zakonodaja/zept/5-clen)).

Pogosto spregledana je druga obveznost. Kdor prejema storitve tujih dobaviteljev, za katere mora sam obračunati DDV, mora pridobiti **identifikacijsko številko za DDV** ([ZDDV-1, 79. člen](https://www.racunovodstvo.net/zakonodaja/zddv/79-clen)). Vercel Inc. je ameriško, Supabase Pte. Ltd. pa singapursko podjetje ([Vercel DPA](https://vercel.com/legal/dpa); [Supabase DPA](https://supabase.com/legal/dpa)). Od njunih računov, pa tudi od AI API-jev in tujih oglasov, sami obračunate 22 % DDV brez pravice do odbitka. Orodja se tako podražijo za 22 %.

Za stranke zunaj Slovenije veljata še dve pravili. Podjetjem v EU izdate račun brez DDV z obrnjeno davčno obveznostjo, prej pa njihovo številko DDV preverite v VIES. Samodejno gostovanje za potrošnike v drugih državah EU pa je elektronska storitev: ko takšna prodaja v EU preseže 10.000 € letno, velja DDV države potrošnika, ki ga plačate prek OSS ([FURS OSS](https://www.fu.gov.si/fileadmin/Internet/Drugo/Posebna_podrocja/E_trgovanje/Posebne_ureditve_VEM-OSS.docx)).

Ko preskočite 60.000 €, se cene za večino mikro strank, ki niso zavezanke za DDV, dejansko dvignejo za 22 %.

### Nakazila brez davčne blagajne, e-računi obvezni od 2028

Računi, plačani z nakazilom na TRR, ne potrebujejo davčnega potrjevanja. Plačilo s plačilno ali kreditno kartico pa se po ZDavPR šteje za gotovino, zato mora takšen račun pred izdajo potrditi FURS ([gov.si](https://www.gov.si/teme/davcni-postopek-in-davcno-potrjevanje-racunov/)). Za Stripe vprašanje ni razrešeno. FURS-ovo vprašanje Q220 sprašuje prav, ali so Stripe, Klarna in Sofort gotovinska plačila ([FURS Q&A](https://www.racunovodstvo.net/pojasnila/10356/davcno-potrjevanje-racunov)), PayPal pa je FURS obravnaval kot negotovinskega ([data.si](https://data.si/blog/davcne-blagajne-enako-kot-paypal-se-bo-obravnavala-tudi-moneta/)). Najmanj zapletov prineseta UPN QR in trajnik na vaš TRR. Če sprejemate kartice, račune davčno potrdite prek Minimax API ali pridobite pisno stališče FURS.

Od **1. januarja 2028** so e-računi med podjetji obvezni tudi za s.p.: račun mora biti strukturiran XML (eSLOG ali PEPPOL), PDF ni e-račun, pošiljanje po e-pošti pa ni dovoljeno, razen do potrošnikov; za majhen obseg obstaja brezplačna aplikacija miniBlagajna ([gov.si](https://www.gov.si/novice/2025-10-23-drzavni-zbor-sprejel-zakon-o-izmenjavi-elektronskih-racunov-in-drugih-elektronskih-dokumentov/)). Že zdaj izberite program, ki to zna.

Plačilni rok med podjetji je največ 60 dni, zamudnik pa dolguje 40 € nadomestila za izterjavo ([ZPreZP-1](https://www.uradni-list.si/_pdf/2012/Ur/u2012057.pdf)). Vodite tudi knjigo izdanih računov.

## Pogodba, DPA in pravne strani so del izdelka

### Pogodba mora našteti prenesene pravice in pot izhoda

Po ZASP avtor obdrži vse pravice, ki jih izrecno ne prenese. Prenos lastništva primerka ne prenese avtorskih pravic, pravici do primernega plačila pa se avtor ne more odpovedati ([ZASP](https://www.racunovodstvo.net/zakonodaja/zasp); [ZASP, 81. člen](https://www.racunovodstvo.net/zakonodaja/zasp/81-clen)). Pogodba o izdelavi spletne strani mora zato našteti prenesene materialne pravice (reproduciranje, dajanje na voljo javnosti, predelava in nadaljnji prenos), njihovo izključnost, ozemlje in trajanje ter trenutek prenosa, ki naj bo **plačilo v celoti**. Tovarniška koda, predloge in komponente ostanejo vaše, stranki pa jih licencirate neizključno in trajno. Odprtokodne komponente ter kupljene pisave in fotografije sledijo svojim licencam.

Pogodba naj izpis konfiguratorja določi kot zavezujočo ponudbo z naštetimi izključitvami ter uredi dva kroga pripomb in rok za oddajo vsebin. Pri podjetjih naj molk po X dneh pomeni prevzem, odgovornost pa naj bo omejena na plačila zadnjih 12 mesecev, brez posredne škode. Naročnina potrebuje odpovedni rok, indeksacijo cene in pravico do ustavitve ob neplačilu, SLA pa mora biti realen glede na odvisnost od Vercela in Supabase, z dobropisi namesto odškodnin. Domena naj bo registrirana na ime stranke, izhodna klavzula pa naj zagotovi izvoz vsebin, dump baze in prenos DNS. Ta klavzula je hkrati najmočnejši argument zaupanja proti Spletni soseski, ki stran ob odpovedi izbriše.

Če naroča potrošnik, velja ZVPot-1. V konfigurator zato dodajte vprašanje »naročate kot podjetje ali kot zasebnik?«. Potrošnik ima 14-dnevni odstopni rok, dobiti mora vzorčni obrazec, z ločenim neodkljukanim poljem pa izrecno soglaša z začetkom dela pred iztekom roka. Brez tega soglasja in poučitve ob odstopu ne dolguje ničesar, plačila pa morate vrniti v 14 dneh ([ZVPot-1, 141. člen](https://www.racunovodstvo.net/zakonodaja/zvpot/141-clen); [ZVPot-1, 143. člen](https://www.racunovodstvo.net/zakonodaja/zvpot/143-clen)). Naročnina se nikoli ne opravi v celoti, zato odstop pri njej pomeni sorazmerno vračilo.

Ena točka ostaja odprta. Splošni pogoji Vercela prepovedujejo preprodajo storitev in njihovo dajanje na voljo tretjim. Smernice pa med komercialno rabo, ki zahteva Pro, izrecno naštevajo »plačilo za gostovanje strani« ([Vercel Fair Use](https://vercel.com/docs/limits/fair-use-guidelines)). Gostovanje strank v vaši ekipi je zato verjetno predviden vzorec. Strankam vseeno ne dajajte pravice do namestitev, Vercel pa vprašajte za pisno potrditev.

### GDPR, piškotki in hladna e-pošta

Za povpraševanja na sites.jurelabs.si ste **upravljavec** podatkov. Potrebujete politiko zasebnosti po 13. členu GDPR, evidenco dejavnosti obdelave (izjema za manjše organizacije ne velja, ker obdelava ni občasna), rok hrambe, na primer izbris neuspelih povpraševanj po 6–12 mesecih, in postopek za kršitve ([GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj); [EDPB](https://edpb.europa.eu/sme-data-protection-guide/data-breaches_sl)). Stavek »z nikomer jih ne delite« zamenjajte s seznamom obdelovalcev: Cloudflare, Vercel, Supabase, ponudnik e-pošte, računovodski program in AI ponudnik.

Za strani strank ste **obdelovalec**. Z vsako stranko podpišite pogodbo po 28. členu GDPR s prilogami: vrste podatkov, tehnični in organizacijski ukrepi, seznam podobdelovalcev in obvestilo o kršitvi v 24–48 urah. Vercelov DPA velja le za Pro in Enterprise, temelji na standardnih pogodbenih klavzulah in navaja primarno obdelavo v ZDA ([Vercel DPA](https://vercel.com/legal/dpa)). Supabase podatke hrani v izbrani regiji in o incidentih obvešča praviloma v 48 urah ([Supabase DPA](https://supabase.com/legal/dpa)). ZVOP-2 za kršitve dolžnosti upravljavca in obdelovalca predvideva globe za odgovorno osebo od 100 do 5.000 € ([ZVOP-2](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2022-01-4187/zakon-o-varstvu-osebnih-podatkov-zvop-2)).

Piškotki po 225. členu ZEKom-2 zahtevajo predhodno privolitev, razen če so nujni za storitev, ki jo je uporabnik zahteval ([ZEKom-2, 225. člen](https://www.racunovodstvo.net/zakonodaja/zekom/225-clen)). Analitika brez piškotkov, lokalne pisave in vsebine, ki se naložijo šele na klik, zato odpravijo pasico. GDPR za IP naslove pa velja še naprej.

Največja pravna past pri pridobivanju strank je hladna e-pošta. Neposredno trženje po e-pošti fizičnim osebam zahteva predhodno privolitev. Pri pravnih osebah zadoščata identifikacija pošiljatelja in delujoča odjava ([ZEKom-2, 226. člen](https://www.racunovodstvo.net/zakonodaja/zekom/226-clen)). S.p. je fizična oseba ([ZGD-1](http://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291)), 93. člen ZVOP-2 pa prepoveduje uporabo kontaktov iz javnih virov za neposredno trženje. Množično pisanje frizerjem in barom, ki so večinoma s.p., je zato tvegano. Varnejši so osebni obiski, pošta, partnerji in splošni naslovi družb d.o.o. Prvo sporočilo mora vsebovati informacije po 14. členu GDPR, odjave pa vodite na trajnem seznamu.

### Dostopnost, AI Act in zavarovanje

ZEPT zahteva, da je na glavni strani lahko in stalno dostopno naslednje: firma, sedež, e-naslov, matična in davčna številka ([ZEPT, 5. člen](https://www.racunovodstvo.net/zakonodaja/zept/5-clen)). Samodejno generiran pravni blok za vsako stranko je zato tržna funkcija.

ZDPSI, slovenska izvedba evropskega akta o dostopnosti (EAA), velja od 28. junija 2025 za storitve, kot je e-trgovina. Mikro podjetja, ki opravljajo storitve (manj kot 10 oseb in do 2 milijona € prometa), so izvzeta ([gov.si](https://www.gov.si/novice/2023-01-27-z-novim-zakonom-do-vec-dostopnosti-proizvodov-in-storitev-za-invalide/); [Direktiva 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj)). Predstavitvena stran frizerja tako ni zajeta, spletna trgovina večje stranke pa je. Prodajajte »zasnovano in preverjeno po WCAG 2.2 AA«, nikoli »zagotovljena skladnost«.

Člen 50 Akta o umetni inteligenci (AI Act) velja od 2. avgusta 2026. Omnibus ga ni odložil, le za strojno označevanje sintetičnih vsebin velja prehodno obdobje do 2. decembra 2026 ([FPF](https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus/)). Klepetalnik mora zato povedati, da je AI; vi ste njegov ponudnik, stranka pa uvajalec. AI-besedila malih podjetij oznake praviloma ne potrebujejo, ponarejene (deepfake) fotografije pa jo potrebujejo vedno ([AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)).

Odgovornost iz pogodb zavarujte z zavarovanjem poklicne odgovornosti za čiste premoženjske škode (npr. pogoji Generali OPO) in s kibernetskim zavarovanjem. Zavarovalna vsota naj ustreza omejitvi odgovornosti v splošnih pogojih. Cen raziskava ni našla ([Generali](https://www.generali.si/documents/d/generali-public-web/01-opo-01_20_splosni-pogoji-za-zavarovanje-poklicne-odgovornosti-za-ciste-premozenjske-skode.pdf)).

## Zaključek

Analiza obrne običajno logiko »več funkcij za nižjo ceno«. Infrastruktura je pri 45 $ na mesec praktično zastonj, normiranje pa prihodke do 25.000–30.000 € obremeni z okoli 13 % davka in prispevkov, zato ozko grlo Sites+ niso stroški, ampak vaše večerne ure in zaupanje kupcev. Za popoldanski s.p. je zato bolje imeti 30–45 zvestih naročnin z višjo povprečno ceno (Plus, Pro, vzdrževanje, paket Apartma) kot 80 poceni strank. Višja cena na stranko zmanjša podporo na evro prihodka, meja 50.000 € za normiranje in 60.000 € za DDV pa število strank tako ali tako omeji, preden se splača prestop v polni s.p. ali d.o.o. Pravna skladnost pri tem ni strošek, ampak del izdelka: pravni blok ZEPT, politika zasebnosti, DPA, stran brez piškotkov, izjava o dostopnosti in razkritje AI se v multi-tenant predlogi naredijo enkrat za vse stranke, nobena poceni lokalna naročnina pa jih ne ponuja v celoti.

Vrstni red narekujejo roki, ki se stekajo ob koncu leta. Ta teden pridejo na vrsto Vercel Pro, MFA, pravice na tabelah, nov Supabase ključ, kopije zunaj Supabase in, če je potrebno, pisno soglasje delodajalca. Pred prvo pogodbo uredite ID za DDV, splošne pogoje z DPA in izhodno klavzulo, podatke po ZEPT in politiko zasebnosti, do konca leta izklopite stare ključe in se odločite po referendumu 6. decembra, v prvem četrtletju pa zgradite predogled pred plačilom, paket Apartma, program ustanovnih strank in multi-tenant izrisovalnik. Dve vprašanji raziskava ni mogla zapreti: ali FURS plačila prek Stripe šteje za gotovinska in ali Vercelova prepoved preprodaje omejuje gostovanje strank. Obe razrešite pisno, preden na njiju zgradite avtomatizacijo.
