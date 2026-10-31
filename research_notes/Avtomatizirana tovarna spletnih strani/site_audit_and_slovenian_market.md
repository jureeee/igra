# Sites+ (sites.jurelabs.si) audit and the Slovenian small-business website market (state as of 31 Oct 2026)

Method note: Part A is based on the publicly served HTML, the HTTP response headers and the public JS bundle of https://sites.jurelabs.si, fetched on 31 Oct 2026 at about 21:45 UTC. Nothing was probed, scanned or submitted. The JS bundle filename is content-hashed (`/assets/main-lF9510r9.js`) and will change on the next deploy. All prices are in EUR unless noted. "Accessed 31.10.2026" means the page itself shows no price date. Anything dated before 2025 is flagged as possibly outdated.

---

## (A) What sites.jurelabs.si offers today and how a visitor experiences it

### Takeaway
Sites+ is a single-page, Slovenian-only, pre-launch landing page (`noindex, nofollow`, footer says "Stran je v pripravi."). It sells subscription websites for lokali, saloni and obrtniki in three tiers: **Basic 49 €/mes. + 249 € postavitev**, **Plus 89 €/mes. + 449 €** and **Pro 149 €/mes. + 690 €**, all "brez DDV". The setup fee is waived with a 12- or 24-month vezava, and 12 months is the default. A strong interactive configurator leads into a detailed two-step brief.

The page is technically clean and well secured. It has no real trust layer: no portfolio, references, reviews, guarantee, company data, legal pages or visible contact. Its own pitch ("AI/Google-readable data") is not applied to itself: there is no JSON-LD, no Open Graph tags, and packages and prices are only rendered by JavaScript.

### Cited Findings

**Status, meta and technical delivery**
- The page is `<html lang="sl">` with `<meta name="robots" content="noindex, nofollow">`. An HTML comment reads: "Na preizkusu: ni v meniju in ne v iskalnikih, dosegljiva le s povezavo." The title is "Sites+ · Jure Labs" and the favicon is empty (`href="data:,"`) — [sites.jurelabs.si HTML](https://sites.jurelabs.si/)
- Meta description: "Spletne strani za lokale, salone in obrtnike na mesečno naročnino: postavitev, gostovanje, vzdrževanje in vidnost v Googlu in ChatGPT." — [sites.jurelabs.si HTML](https://sites.jurelabs.si/)
- It is a static Vite build served by Vercel (`server: Vercel`). The page loads one ~199 KB module bundle plus Lenis smooth scrolling, a lazy-loaded preview chunk (`ogled-*.js`) and heavy SVG "liquid glass"/displacement-filter effects ("Defracted Glass"). — [HTML](https://sites.jurelabs.si/), [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- Security headers on the HTML response:
  - Strict CSP: `default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com; connect-src 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests`
  - `strict-transport-security: max-age=63072000` (no `includeSubDomains`/`preload`), `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`
  - `permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()`, `cross-origin-opener-policy: same-origin`
  - Source: [response headers of https://sites.jurelabs.si/](https://sites.jurelabs.si/)
- No analytics or tracking scripts are referenced (no gtag, Plausible, PostHog, Vercel Insights, Clarity, Hotjar, fbq), and the app code never writes `document.cookie`. A draft of the brief is kept in `sessionStorage`, and `localStorage` is also referenced. — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- There is no JSON-LD/schema.org markup in the HTML or the bundle and no Open Graph tags in the HTML. Package names and prices are not in the static HTML; they are rendered by JavaScript from a config object. — [HTML](https://sites.jurelabs.si/), [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)

**Page structure and copy (in visit order)**
1. **Header:** brand "Jure Labs / Sites+" (links to https://www.jurelabs.si) and a button "Sestavi stran" (#sestavi). — [HTML](https://sites.jurelabs.si/)
2. **Hero:**
   - Eyebrow: "Spletne strani na naročnino"
   - H1: "Spletna stran za vaš lokal. Brez skrbi."
   - Body: "Postavim, gostim in vzdržujem spletno stran za bare, restavracije, salone in obrtnike. Vi plačujete mesečno naročnino, jaz skrbim, da stran deluje, je hitra in jo najdeta Google in ChatGPT."
   - CTAs "Sestavi svojo stran" and "Kako poteka", plus "Že od 49 € na mesec"
   - Source: [HTML](https://sites.jurelabs.si/)
3. **"Kako poteka" (4 steps):**
   - "Sestavite paket – Izberete osnovo, funkcije in efekte. Cena se sproti izračuna."
   - "Pošljete podatke – Logo, slike, meni ali cenik, delovni čas. Vse ostalo uredim jaz."
   - "Stran je na spletu – V nekaj dneh na vaši domeni, z varno povezavo in prilagojena telefonom."
   - "Spremembe po mailu – Pišete mi, kaj želite spremeniti. Meni in cene lahko urejate tudi sami."
   - Source: [HTML](https://sites.jurelabs.si/)
4. **GEO/AI section "Vidnost v ChatGPT in Googlu":**
   - H2 "Stranke ne iščejo več le na Googlu.", with three points: "Podatki, ki jih AI prebere.", "Isti podatki povsod." and "Hitra, jasna stran."
   - An interactive mock chat with a toggle between "Danes" and "S Sites+", captioned "Ponazoritev, podjetja so izmišljena."
   - CTA "Želim stran za ChatGPT", which preselects Plus.
   - Disclaimer: "Vključeno v paketih Plus in Pro. Mesta v odgovorih ne more zagotoviti nihče – lahko pa poskrbimo, da vas AI razume in najde."
   - Source: [HTML](https://sites.jurelabs.si/)
5. **Self-check "Kako se odreže vaša spletna stran?":**
   - Eight toggles: "Spletne strani nimam ali je starejša od štirih let.", "Na telefonu se prikazuje slabo.", "Stran se nalaga počasi.", "Profil v Googlu ni urejen ali nima novih ocen.", "Ko v Google vpišem svojo storitev in kraj, me ni na prvi strani.", "ChatGPT mojega podjetja ne pozna ali ga ne priporoča.", "Menija, cen ali novic ne morem spremeniti sam." and "Stranke me ne morejo naročiti ali rezervirati na spletu."
   - A live phone mock-up of a fictional café "Zrno" degrades with each ticked problem.
   - An iPhone "Dynamic Island"-style counter ("X težav od 8") recommends a package and links to "Izberite paket".
   - Source: [HTML](https://sites.jurelabs.si/)
6. **"Vedno vključeno":** "Hitro gostovanje in varna povezava (SSL)", "Prilagojeno telefonom in tablicam", "Domena registrirana na vaše ime", "Osnovna optimizacija za Google", "Pripravljeno za iskanje v ChatGPT" and "Posodobitve in varnostne kopije". — [HTML](https://sites.jurelabs.si/)
7. **Configurator "Sestavite svojo stran"** (two steps: "1 Paket in funkcije", "2 Podatki za stran"). Details are below. — [HTML](https://sites.jurelabs.si/)
8. **FAQ "Pogosta vprašanja" (verbatim):**
   - "Čigava je domena?" → "Vaša. Registrirana je na vaše ime, jaz jo samo upravljam, da stran deluje."
   - "Kako naročim spremembo?" → "Pošljete mail z željo. Manjši popravki so vključeni v paket, večje spremembe se dogovoriva posebej."
   - "Kaj pomeni »pripravljeno za ChatGPT«?" → "Stran ima podatke o vašem podjetju (naslov, delovni čas, ponudbo) zapisane tako, da jih iskalniki in AI asistenti pravilno preberejo. Mesta v rezultatih ne more zagotoviti nihče."
   - "Lahko funkcije dodam kasneje?" → "Seveda. Začnete z osnovo, rezervacije, trgovino ali efekte pa dodate, ko jih potrebujete."
   - Source: [HTML](https://sites.jurelabs.si/)
9. **Footer (complete):** "Sites+ je storitev Jure Labs." and "Cene so informativne in brez DDV. Stran je v pripravi." — [HTML](https://sites.jurelabs.si/)

**The three packages (verbatim from the bundle's config object `Y.paketi`; all prices "brez DDV")** — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)

| | **Basic** (id `osnova`) | **Plus** (id `plus`, flagged `priljubljen`) | **Pro** (id `pro`) |
|---|---|---|---|
| Monthly | 49 € | 89 € | 149 € |
| Postavitev (one-off) | 249 € | 449 € | 690 € |
| Tagline | "Lepa predstavitvena stran – da vas najdejo." | "Stran, ki vam pomaga pri prodaji." | "Vsak mesec skrbimo, da vam stran prinaša stranke." |
| Feature list | "Do 3 podstrani"; "Galerija, kontakt in zemljevid"; "Osnovna optimizacija za Google"; "Mirne animacije ob drsenju"; "1 manjši popravek na mesec" | "Do 6 podstrani"; "Optimizacija za ChatGPT in Google"; "Meni ali cenik urejate sami"; "Dogodki in mesečno poročilo"; "Premium efekti za vašo panogo"; "3 manjši popravki na mesec" | "Vse iz paketa Plus, do 12 podstrani"; "Rezervacije miz ali terminov"; "Skrb za Google profil"; "Vsak mesec pregled in 1 izboljšava"; "Efekti po vaši izbiri (1 vključen)"; "6 popravkov in prednostna podpora" |
| Included functions | galerija | meni, galerija, dogodki, poročilo | meni, galerija, dogodki, poročilo, rezervacije, Google profil |
| Support SLA | "Odgovor v 2 delovnih dneh" | "Odgovor v 1 delovnem dnevu" | "Prednostna podpora" ("Vaša sporočila so prva na vrsti – spremembe uredim pred drugimi.") |
| Effects | chosen by Jure (scroll animations) | chosen by Jure (drsenje, paralaksa, steklo) | client picks; 1 included |

- **Delivery time:** no package-specific delivery time is given. The only promise is "V nekaj dneh na vaši domeni…" — [HTML](https://sites.jurelabs.si/)
- **Comparison modal:** the package comparison text says: "V vseh paketih: galerija, kontakt in zemljevid, hitro gostovanje in varna povezava, domena na vaše ime, prilagojeno telefonom, posodobitve in varnostne kopije ter osnovna optimizacija za Google. Dodaten jezik in spletno trgovino lahko dodate v vsakem paketu. Z vezavo 12 ali 24 mesecev je postavitev brezplačna." — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **Pro description:** "Vsak mesec poročilo o obiskih s priporočili – in ena izboljšava strani, ki jo naredim jaz (nov odsek, boljši poziv k rezervaciji …)." — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)

**Add-on functions, effects, domain and commitment (recurring fees)** — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **Functions:**
  - "Meni ali cenik, ki ga urejate sami" (from Plus)
  - "Galerija slik"
  - "Dogodki in novice" (from Plus)
  - "Rezervacije miz ali terminov": +29 €/mes. + 49 € postavitev (from Plus; included in Pro)
  - "Dodaten jezik": +19 €/mes. + 49 € (any package)
  - "Skrb za Google profil": +29 €/mes. (from Plus; included in Pro)
  - "Mesečno poročilo o obiskih" (from Plus)
  - "Spletna trgovina": +49 €/mes. + 290 € (any package)
- **Effects (one-off, choosable in Pro only):**
  - Animacije ob drsenju 20 €
  - Odziv na miško 30 €
  - Globina 25 €
  - Stekleni videz 40 €
  - Živo ozadje 35 €
  - Fizika in gravitacija 45 €
  - 3D element 50 €
  - Poseben kurzor 20 €
  - Magnetni gumbi 25 €
  - Copy: "V paketih Basic in Plus efekte izberemo mi … V paketu Pro si jih izberete sami."
- **Domena:**
  - "Uredim jo jaz – Poiščem prosto ime in ga registriram na vaše podjetje." 25 €/leto
  - "Že imam domeno – Samo jo povežem s stranjo." Brez doplačila
- **Vezava** (default = 12 months):
  - "Brez vezave": "Odpoveste kadarkoli, postavitev plačate enkrat."
  - "12 mesecev": "Brez stroška postavitve."
  - "24 mesecev": "Brez stroška postavitve in 10 % ceneje naročnina." That makes Basic 44,10 €, Plus 80,10 € and Pro 134,10 €.
  - The code multiplies **all** one-off items (package setup, add-on setups and effects) by (1 − 1) = 0 when a commitment is chosen.

**Configurator, step 1 "Paket in funkcije"** — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **"Kakšno je vaše podjetje?"** chips preselect a package and the recommended features. The table also gives the default "povprečen račun" used in the payback line:

  | Business type | Package | Preselected features | Default povprečen račun |
  |---|---|---|---|
  | Bar ali kavarna | Plus | meni, dogodki, rezervacije, galerija | 12 € |
  | Restavracija | Plus | meni, rezervacije, galerija | 35 € |
  | Frizer ali salon | Plus | rezervacije, galerija, Google profil | 40 € |
  | Avtoservis | Plus | rezervacije, Google profil | 150 € |
  | Obrtnik ali storitve | Basic | galerija, Google profil | 300 € |
  | Trgovina | Plus | trgovina, galerija | 35 € |

  There is no chip for apartmaji/turistične nastanitve, zdravstvo/wellness, fitnes, društva or professional services.
- **Paket block:**
  - Anchor copy: "Klasična spletna stran pri agenciji stane 600–1.800 € samo za izdelavo. Sites+ od 49 € na mesec – izdelava, gostovanje, varnost in popravki so vključeni."
  - Each card shows "X € / mesec", "≈ X € na dan" and "+ Y € postavitev" or "brez postavitve", plus a "Priporočamo" badge.
- **Live summary ("Vaša stran – Cena se izračuna sproti"):**
  - Shows "Mesečno … vse vključeno", "brez DDV, brez skritih stroškov", "Z vezavo 12 mesecev prihranite X €." and "Skupaj v prvem letu X €".
  - Upsell nudges: "Le X € več na mesec za [višji paket] – dobite še …" and "Bolj se vam splača [paket]".
  - Payback line: "Povrne se že pri N novih gostih/strankah na mesec." The average bill is adjustable.
- **Phone preview:** from 1300 px width, a phone mock-up builds "vaša stran" live. A bubble "Tako bi lahko izgledala vaša stran." with a "Poglej" button opens an example site per segment, with sample price lists such as "Moško striženje · 30 min 18 €" and "Menjava olja in filtrov od 60 €".
- **Hidden agency comparison:** the price engine also computes a 3-year "agencija vs. Sites+" comparison from hard-coded assumptions:
  - Packages: agency Basic 1.200 € + 40 €/mes., Plus 1.800 € + 60 €/mes., Pro 3.500 € + 80 €/mes.
  - Add-ons: rezervacije 800 € + 20 €/mes., jezik 400 € + 10 €/mes., Google profil 50 €/mes., poročilo 10 €/mes., trgovina 1.600 € + 30 €/mes., 250 € per effect
  - I found no template that renders this agency figure. The visible copy only renders the 12/24-month "prihranek" and the first-year total.
- **CTA:** "Naprej: podatki za stran" with the reassurance "Danes vam ni treba pripraviti ničesar."

**Configurator, step 2 "Podatki za stran" (the inquiry form/brief)** — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **"Vaše podjetje"** ("Kar vpišete, bo na strani. Vse lahko kasneje popravite."):
  - Ime podjetja* and Kratek opis ("V enem ali dveh stavkih: kaj ponujate in kaj vas loči.")
  - Ulica in hišna številka* and Poštna številka in kraj* (optional for some types)
  - Telefon* and E-pošta za stranke
  - Instagram, Facebook and Obstoječa spletna stran
- **"Delovni čas"** (for obrtnik: "Kdaj ste dosegljivi"): a weekly grid with a "Vse kot ponedeljek" shortcut and an Opomba field. Hint: "Pokaže se na strani in v Googlu."
- **Offer/menu text:** can be marked as "kasneje" (later).
- **Segment-specific extras:**
  - "Naročilo za s seboj (Wolt, Glovo …)"
  - "Imamo dogodke (koncerti, kvizi, degustacije …)"
  - "Ponujamo malice ali kosila dneva"
  - "Ekipa", "Znamke vozil", "Kje delate", "Sprejemamo nujne klice" and "Zakaj vam stranke zaupajo"
  - How reservations are taken, including "Povezava do vašega sistema za rezervacije" with the placeholder "https://… (npr. Fresha, Lime Booking)"
  - For shops: "Fizična trgovina" / "Tudi spletna prodaja" with the note "Zaenkrat izdelamo predstavitveno stran izdelkov; spletno prodajo dodamo, ko bo na voljo."
- **"Logotip in barve"** ("Videz strani pripravim jaz – povejte le, kaj že imate."): "Imam logotip" / "Nimam ga (ali ga želim osvežiti)", and "Imamo barve znamke" with two colour pickers.
- **"Fotografije":**
  - Options: "Imam profesionalne fotografije" / "Imam nekaj svojih" / "Potrebujem fotografiranje"
  - Note: "Fotografije pošljete kasneje prek zasebne povezave, ki jo dobite od mene - ne prek tega obrazca."
- **"Strani, ki so vam všeč":** up to 3 URLs. "Le za občutek – tujih strani ne kopiramo. Ni obvezno."
- **"Vaši podatki"** ("Kam vam pošljem predlog strani in ponudbo."):
  - Ime in priimek* and E-pošta*
  - Telefon and Sporočilo ("Karkoli še želite povedati")
  - Required consent: "Strinjam se, da podatke iz obrazca uporabite za pripravo ponudbe in strani. Z nikomer jih ne delite."
- **Required fields:** only podjetje.ime, podjetje.telefon (plus the address unless it is optional for the type), naročnik.ime, naročnik.e-pošta and consent.
- **Live preview:** a "Tukaj se bo pokazalo, kako sem razumel vašo ponudbo." panel previews the parsed brief.

**Submission**
- **Bot check:** Cloudflare Turnstile in "interaction-only" mode, shown as "Še hitra potrditev – Da vemo, da povpraševanje pošilja človek." and then "Preverjeno, hvala." — [HTML](https://sites.jurelabs.si/), [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **Request:** a POST to `/api/povprasevanje` with the package selection and the brief. — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **Success message:** "Prejeto, hvala! Oglasim se v dveh delovnih dneh na {email}." plus "Številka povpraševanja: {št.}". — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **Rate-limit message:** "Iz tega omrežja je bilo v zadnji uri poslanih že več povpraševanj…" — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **API-failure fallback:** a `mailto:` opens with the subject "Sites+ povpraševanje: {podjetje}", addressed to the owner's **personal @gmail.com address**. — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)
- **JSON export:** a function also exports the brief as `brief-{podjetje}.json`. — [JS bundle](https://sites.jurelabs.si/assets/main-lF9510r9.js)

**Trust elements, legal pages, languages and company data**
- **No real trust elements.** There is no portfolio, client references, testimonials, review widget, guarantee (money-back or uptime), named or photographed person, or numbers about clients. All examples ("Zrno", "Salon Lana", "Vaš salon") are explicitly fictional ("Ponazoritev, podjetja so izmišljena."). — [HTML](https://sites.jurelabs.si/)
- **No legal pages linked:** no politika zasebnosti, pogoji poslovanja or cookie notice. There is no company data of the s.p. (full name, address, matična/davčna številka, TRR) and no visible e-mail or phone. The only outbound link is https://www.jurelabs.si. — [HTML](https://sites.jurelabs.si/)
- **Language:** Slovenian only, with no language switcher. — [HTML](https://sites.jurelabs.si/)
- **Parent site:** www.jurelabs.si is titled "Jure Blatnik". It is a JS-rendered personal galaxy/"glass" showcase whose served HTML links to no subpages (no legal pages, no link to Sites+). — [www.jurelabs.si](https://www.jurelabs.si/)

### Inferences

**Cost of each package, computed from the bundle constants (excl. DDV)**

| | 1st year (12-month vezava, domain via Jure) | 3 years | No commitment, 1st year |
|---|---|---|---|
| Basic | 0 + 12×49 + 25 = **613 €** | 1.764 € + 75 € domain | 249 + 588 + 25 = **862 €** |
| Plus | **1.093 €** | 3.204 € + 75 € | — |
| Pro | **1.813 €** | 5.364 € + 75 € | — |

The "≈ € na dan" figures are 1,6 € (Basic), 3,0 € (Plus) and 5,0 € (Pro).

**Conversion and UX weaknesses**
- **Trust gap.** A 12-month lock-in is sold by an unnamed one-person s.p. with no company data, no legal pages, no references and only fictional demos. For the target clients (gostinci, saloni, obrtniki) this is probably the biggest conversion blocker.
- **Pitch not applied to the page itself.** Sites+ sells "data AI can read" but has no JSON-LD, no OG tags, and packages and prices exist only in client-side JS. A non-JS crawler or LLM fetch sees "Že od 49 €" but not the three packages. Shared links on WhatsApp, Facebook or Viber show no preview card.
- **Pricing clarity.** The hero shows only "Že od 49 € na mesec"; setup fees (249/449/690 €) appear only inside the configurator. The default 12-month vezava hides the setup fee but also hides the commitment until the visitor scrolls to "Vezava".
- **Unexplained cancellation terms.** The page does not say what happens on cancellation: whether the site and content can be exported, bought out or transferred, or are deleted. Only domain ownership is addressed.
- **"Brez DDV" wording.** If the popoldanski s.p. is not in the VAT system, "brez DDV" is confusing; the price would effectively be final. If it is in the VAT system, B2C-like clients (small s.p.-ji not in VAT) pay 22% more than they see. The s.p.'s VAT status was not verifiable from the site.
- **E-shop inconsistency.** "Spletna trgovina" is priced as an add-on (49 €/mes. + 290 €), but the shop brief says online selling is not yet available ("spletno prodajo dodamo, ko bo na voljo"). This could read as bait-and-switch.
- **No low-friction contact.** There is no e-mail, phone, WhatsApp or "pokličite me" option for people who will not fill a long two-step brief. Only four fields are mandatory, but the form looks long.
- **Professionalism.** The fallback contact is a personal Gmail address; a domain address on jurelabs.si would look more professional.
- **Possible performance cost.** Heavy visual effects (SVG displacement filters, smooth-scroll library, ~199 KB JS) may hurt performance on low-end phones, while the product promise is "hitra stran". This is not measured; it needs a Lighthouse or field check.
- **Missing segments.** No apartmaji/tourism chip and no English version. Tourism is a segment where multilingual sites and direct booking matter (see the (C) statistics).
- **GDPR wording.** The consent text says "Z nikomer jih ne delite", yet the form is processed through Cloudflare (Turnstile), Vercel and Supabase. A privacy policy listing processors is likely needed under GDPR art. 13. Legal requirements were not researched here; flag for legal review.

**Strengths to keep**
- Strict security headers, no tracking and Turnstile with server-side rate limiting.
- An engaging self-diagnosis section and live price calculation.
- Segment-aware briefs that capture almost everything needed to auto-generate a site: hours grid, menu text, booking URL and brand colours. This is a good basis for the "tovarna" automation.
- Honest AI-visibility disclaimers.

### Gaps
- Not checked: the server-side `/api/povprasevanje` behaviour (e.g. confirmation e-mail, Supabase storage) and any authenticated client portal. Probing was out of scope.
- Real page speed (Lighthouse/CrUX) and accessibility were not measured.
- The example-site chunk (`ogled-*.js`) was not opened in detail beyond the sample price-list strings visible in the main bundle.
- The VAT status and registration data of the s.p. are not published on the site, so they could not be checked.

---

## (B) Slovenian agency and freelancer prices (2025–2026) and productized/subscription ("website as a service") sellers

### Takeaway
- **One-off builds in 2026:**
  - Spletna vizitka/landing (1–3 pages): about **500–800 €** (average about 690 €).
  - 5–10 page company site: about **600–1.500 €** at template-based studios, up to 1.300–2.200 € (primerjam average 1.400 €).
  - Small e-shop: **1.500–5.000 €** (freelance/WordPress), with full-service agencies starting at **6.000 €**.
  - Maintenance: **10–80 €/mes.** for simple sites (primerjam average **63 €/mes.**). Hosting is about 10–38 €/mes. or 60–200 €/leto.
- **Local subscription offers:** REB d.o.o. (od 25 € z DDV/mes., brez vezave), Spletna soseska (29,20 € + DDV/mes., 18-month lock-in, site deleted on exit) and web123 (0 € izdelava + 30–40 €/mes.).
- **Positioning:** Sites+ Basic (49 €) is priced above these low-end subscriptions. Plus and Pro (89/149 €) are well above every local subscription found and must be justified by the bundled services: changes, booking, Google-profile care, reports and fast delivery.

### Cited Findings

**Aggregator and price-guide data**
- **Primerjam.si ("cene 2026"; no update date; accessed 31.10.2026):**
  - Spletna vizitka 500–810 € (average 690 €)
  - Website up to 10 subpages 1.300–2.200 € (average 1.400 €); up to 20 subpages 1.500–3.100 €; up to 50 subpages 2.500–5.000 €
  - Vzdrževanje 25–250 €/mes. (average 63 €/mes.); gostovanje 11–38 €/mes.
  - DDV status and sample size are not stated.
  - Source: [Primerjam.si – cena izdelave spletne strani](https://www.primerjam.si/cene/izdelava-spletnih-strani/cena-izdelave-spletne-strani)
- **Primerjam.si e-shop page (search snippet only, page not opened):** e-shop "od 2.500 €", average 2.900 €. — [Primerjam.si – spletna trgovina](https://www.primerjam.si/cene/izdelava-spletnih-strani/cena-izdelave-spletne-trgovine)
- **Splet99 (published 13.4.2026; all excl. DDV; "DDV (22%)" added by VAT-registered providers):**
  - Vizitka (1–3 pages) 500–800 €, delivery 1–2 weeks
  - 3–10 pages 800–1.500 €, delivery 2–4 weeks; 10–20 pages 1.500–6.000 €
  - E-shop up to 30 products 1.500–2.500 €, delivery 4–8 weeks; 30–300 products 2.500–4.500 €; larger 4.500–15.000 €+
  - Splet99's own maintenance "od 14,99 € mesečno"; typical WordPress maintenance 150–600 €/leto; shared hosting 80–200 €/leto; domain 10–30 €/leto
  - Source: [Splet99 cenik 2026](https://www.splet99.net/koliko-stane-izdelava-spletnih-strani/)
- **SiWeb / Studio Mazzini d.o.o. (29.6.2026):**
  - "Quick-build" sites from some providers 90–250 €
  - "Osnovna digitalna vizitka" 100–1.000 € (1–5 subpages)
  - "Standardna poslovna spletna stran" 1.000–3.100 € (6–20 subpages)
  - "Spletna trgovina" 1.800–5.000 € (up to ~200 products)
  - Advanced e-commerce/B2B 5.000–25.000 €+
  - Simple hosting + maintenance from about 100 €/leto; active maintenance up to ~1.000 €/leto
  - DDV not stated
  - Source: [SiWeb 2026](https://siweb.si/en/cena-izdelave-spletne-strani-v-letu-2026-komu-placati-250-eur-in-kdaj-je-vredno-placai-vec-kot-3000-eur)
- **Kreativna tovarna (6.3.2026):**
  - Basic presentation site "okoli 1500 €"
  - Maintenance "from about 10 €/month", rising to several hundred for demanding sites
  - Shared hosting ~60 €/leto; domain 10–25 €/leto
  - Source: [Kreativna tovarna cenik 2026](https://kreativnatovarna.si/izdelava-spletnih-strani-cenik-2026/)
- **spletnimojster.si (13.10.2026), monthly maintenance ranges:**
  - Predstavitvena stran 20–80 € (some providers from 60 €)
  - Entry e-shop 30–70 €; professional e-shop 70–200 €; advanced e-shop 200 €+
  - Maintenance typically excludes new subpages, copywriting, SEO and ads
  - Source: [spletnimojster.si – vzdrževanje cena](https://spletnimojster.si/blog/vzdrzevanje-spletne-strani-cena/)

**Concrete agency and freelancer offers**
- **Multimedija.net (updated 2.10.2026; "DDV ni obračunan"):**
  - **Predstavitvena 790 €:** up to 5 subpages, delivery ≤21 days, template adapted to the brand
  - **Poslovna 1.390 €:** up to 10 subpages, ≤30 days, schema.org, Google Business Profile setup, Analytics conversions
  - **Po meri od 2.490 €:** 20+ subpages, multilingual, integrations
  - All include Search Console/Analytics, GDPR cookie notice, SSL, editing training and full ownership/access on handover
  - Hosting from 10 €/mes.; optional maintenance from 40 €/mes.; .si domain ~20 €/leto; copywriting 40 €/subpage
  - Source: [Multimedija.net](https://www.multimedija.net/spletne-strani/cena-izdelave-spletne-strani/)
- **Data.si (no date; accessed 31.10.2026):**
  - "Izdelava spletne strani – osnovni paket", "Redna cena paketa: od 599 €*", excl. DDV
  - Up to 10 subpages, 1 year domain + hosting, e-mail, WordPress theme from 87 options, cookie plugin, GA, one revision round
  - Renewal and maintenance prices not shown
  - Source: [Data.si paketi](https://data.si/izdelava-spletnih-strani-paketi/)
- **Spletnik.si e-shops (updated 28.9.2026; excl. DDV):**
  - "Manjša trgovina" from 6.000 € (≤100 products, 4–6 weeks)
  - "Srednja" from 12.000 € (≤1.000 products)
  - "Večja s povezavami" from 18.000 €
  - "B2B/po meri" 25.000–35.000 €+
  - Hosting/maintenance/support from 79,95 €/mes.
  - Source: [Spletnik.si cenik](https://spletnik.si/izdelava-spletne-trgovine/cenik/)
- **Older context:** a 24ur article on SEO pricing said most SI SEO projects cost 500–2.000 €/mes. This is a 2022 SEO-agency marketing piece and is **pre-2025, possibly outdated**. — [24ur (2022)](https://www.24ur.com/novice/slovenija/cena-optimizacije-spletne-strani-v-letosnjem-letu.html)

**Productized/subscription sellers in Slovenia**
- **REB d.o.o. – "Najem spletnih strani z vzdrževanjem" (no date; © 2026):**
  - "od 25 € z DDV na mesec", "brez vezave"
  - Unlimited subpages, 3 GB, domain arranged, unlimited e-mail addresses, maintenance during the contract, on-site SEO, forms/blog/maps/stats/multilingual
  - Setup in 5–35 working days; option of "kasnejšega odkupa" (buy-out)
  - Targets early-stage entrepreneurs
  - Source: [REB](https://reb.si/najem-spletnih-strani/)
- **Spletna soseska – "Spletna parcela" one-pager (no date; © 2022–2026):**
  - 29,20 € + DDV/mes., no setup fee, **18-month vezava**
  - Early exit penalty = remaining instalments up to 18 months
  - **Site deleted at termination**; domain not included
  - Post-launch content changes billed extra; delivery 7 working days
  - Includes hosting, SSL, contact form, privacy policy and cookie notice, basic SEO, up to 10 images, up to 6 services, 4 testimonials, annual maintenance
  - Other templates: "Spletna hiška", "Spletni hotel", "Spletna skupnost", "Spletni butik"
  - Targets s.p.-ji, obrtniki, small businesses
  - Source: [Spletna soseska](https://spletna-soseska.si/tipske-spletne-strani/poceni-spletna-stran/)
- **web123.si – "Spletna stran za 0 €" (no date; © 2026):**
  - Free build "za prvih 10 projektov" (simple WordPress presentation site)
  - Then 30 €/mes. for hosting + basic maintenance; elsewhere on the page 40 € + DDV (10 € hosting + 30 € maintenance). The page is inconsistent.
  - Excludes e-shops, complex booking, custom code and long-term SEO; commitment and ownership not stated
  - Source: [web123](https://web123.si/spletna-stran-0-eur/)
- **Free build with 24-month vezava (unverified):** a search snippet said another Slovenian provider builds the site free with a 24-month vezava. I could not identify or open it; possibly faroweb.si. — [faroweb.si naročilo (search result)](https://faroweb.si/narocilo)
- **Hosting companies' own builders:**
  - Domenca: a third-party listing shows a "STANDARD Website Package" on its builder at 7,98 €/mes., marked **discontinued on 26 Jan 2026**. — [whtop listing](https://www.whtop.com/plans/domenca.com/50361)
  - NEOSERV: promotes a free "NEOSERV Studio" site-building tool alongside hosting (search-snippet level). — [24ur/NEOSERV promo](https://www.24ur.com/novice/slovenija/crni-petek-pri-neoserv-gostovanje-in-domene-do-90-ceneje.html)

### Inferences

**3-year total cost of ownership (excl. DDV)**

| Offer | 3-year cost |
|---|---|
| REB | ≈ 738 € (900 € incl. DDV) |
| Spletna soseska | ≈ 1.051 € + domain |
| web123 | ≈ 1.080–1.440 € |
| Multimedija Predstavitvena + hosting 10 €/mes. + maintenance 40 €/mes. | ≈ 2.650 € |
| Multimedija Poslovna + same | ≈ 3.250 € |
| **Sites+ Basic** | ≈ 1.839 € |
| **Sites+ Plus** | ≈ 3.279 € |
| **Sites+ Pro** | ≈ 5.439 € |

- **Basic** is ~30–150% pricier than local low-end subscriptions (+28–70% vs. web123, +75% vs. Spletna soseska, +149% vs. REB) but ~30% cheaper than a typical agency build plus maintenance.
- **Plus** costs about the same as Multimedija Poslovna plus maintenance over 3 years.
- **Pro** is premium. It is only justifiable through the recurring services (6 changes/month, Google-profile care, monthly improvement, booking) and measurable results.

**Positioning against the market**
- The site's anchor claim "Klasična spletna stran pri agenciji stane 600–1.800 € samo za izdelavo" matches 2026 market data: Splet99 800–1.500 € for 3–10 pages, Multimedija 790/1.390 €, Primerjam average 1.400 € for ≤10 pages and 690 € for vizitka. It is defensible.
- The hidden "agency" assumptions in the bundle are roughly in line with market averages: monthly 40/60/80 € against Primerjam's 63 € average maintenance; Basic agency build 1.200 €.
- **Where Sites+ can beat local subscriptions:**
  - No setup fee with only 12 months (Spletna soseska requires 18)
  - Domain in the client's name (Spletna soseska deletes the site)
  - Monthly changes included (Spletna soseska bills changes)
  - Self-editable menu/prices
  - Booking and Google-profile care
  - Delivery "v nekaj dneh" (REB 5–35 working days; Multimedija ≤21–30 days)
  - Explicit AI/GEO readiness
- **Where it is weaker:** price at the low end and no buy-out/export promise. REB offers buy-out; Multimedija hands over full ownership.
- **What competitors include that Sites+ could make explicit:** privacy policy and cookie notice for the client's site (Spletna soseska, Multimedija), Search Console/Analytics setup, editing training and handover of access.

### Gaps
- Only a few providers publish prices for a 1-page landing page specifically. Most bundle it into "vizitka".
- No verified Slovenian price list for Google Business Profile management as a standalone monthly service was found. Sites+ charges 29 €/mes.; its internal assumption is 50 €/mes. for an agency.
- The provider offering a free build with a 24-month vezava could not be identified or verified.
- Telecom bundles (e.g. Telekom Slovenije IT services price list) were not checked.
- No Croatian/Austrian/Italian subscription-site price data was found; a Croatian-language search returned only Hostinger and generic guides. Regional comparison remains open.
- VAT status is inconsistent across sources ("brez DDV", "DDV ni obračunan", "z DDV"). Comparisons above treat each figure as published.

---

## (B) DIY/AI website builders in 2026: pricing and threat vs. complement for a done-for-you offer in Slovenia

### Takeaway
Mainstream builder software costs roughly **$10–40 per month** for a small-business site in 2026:
- Framer Basic $10
- Webflow Basic ~$15
- Wix Light ~$18 (yearly)
- Squarespace Basic $19–25
- Durable Launch $22–25
- Shopify Basic $29–39
- Hostinger's builder is $2,49/mo intro on a 48-month prepay, renewing at $10,99

Builders are now bundling AI generation and even "AI visibility/GEO" features (Squarespace "AI Visibility", English-only; Durable "advanced SEO & GEO"). The ChatGPT angle alone is therefore not a moat. The defensible difference is done-for-you work in Slovenian (content, Google profile, changes, bookings), which addresses the skills gap that SURS documents.

### Cited Findings
Prices below were fetched on 31.10.2026 through a US-located connection. They are shown in USD and may differ in EUR for Slovenia, where 22% DDV is added for non-business buyers.

- **Wix (no price date; © 2006–2026):**
  - Free $0, Light $17,77/mo, Core $29,77/mo (basic eCommerce), Business $39,77/mo, Business Elite $159,77/mo, billed yearly
  - The page says "USD prices displayed for reference only" and "Prices and currency vary by location". A strikethrough "Save 50%" suggests a promotion.
  - AI creation tools on all plans; free domain for 1 year on paid plans
  - Source: [Wix plans](https://www.wix.com/plans)
- **Squarespace (no price date; © 2003–2026):**
  - Basic $19/mo annual or $25 monthly; Core $29/$39; Plus $49/$65; Advanced $99/$139
  - Online-store fee 2% on Basic, 0% above
  - Free domain for the first year on annual plans
  - AI credits 10 (one-time) up to 120/mo; "AI Visibility prompt runs" (English-language accounts only)
  - Source: [Squarespace pricing](https://www.squarespace.com/pricing)
- **Framer (page published 30.10.2026):**
  - Free $0 (no custom domain); Basic $10/mo (30 pages, 2 CMS collections, 50 GB); Pro $30/mo (150 pages); Enterprise custom
  - Localization add-on up to 20 locales at $20 each; AI agent credits included
  - Source: [Framer pricing](https://www.framer.com/pricing)
- **Shopify (US page; rates "accurate as of October 29, 2026"):**
  - Basic $29/mo yearly or $39 monthly; Grow $79/$105; Advanced $299/$399; Plus from $2.300/mo
  - "3 days free, then $1/month for 3 months"
  - US online card rate 2,9% + 30¢; 2% third-party transaction fee on Basic
  - Source: [Shopify pricing](https://www.shopify.com/pricing)
- **Hostinger Website Builder:**
  - Premium $2,49/mo intro ($119,52 upfront for 48 months), renews at $10,99/mo
  - Unlimited $3,49 → $16,99; Cloud Startup $7,99 → $25,99
  - Free domain and mailboxes for 1 year; AI tools and AI credits
  - Structured data shows offers valid until 2027-10-30
  - Source: [Hostinger website builder](https://www.hostinger.com/website-builder)
- **Durable (no date):**
  - Free (preview only, not live); **Launch $25/mo** ($22/mo in the comparison table, likely annual)
  - Launch includes hosting, forms, analytics, "advanced SEO & GEO", built-in CRM, unlimited booking, domain, 1.000 AI credits and AI agents that publish blogs
  - **Grow $49/mo** ($41): multilingual site translation, 1:1 onboarding
  - Source: [Durable pricing](https://durable.com/pricing)
- **Webflow:** the official page could not be fetched (HTTP header overflow). Third-party sources conflict:
  - Older structure: Basic $14, CMS $23, Business $39/mo annual
  - Restructure reportedly on 13 May 2026: Basic $15, merged "Premium" $25 and Team $2.500/mo
  - Unverified against Webflow. — [nocode.tech](https://www.nocode.tech/article/webflow-just-overhauled-its-pricing-what-agencies-and-freelancers-need-to-know); [CostBench](https://costbench.com/changelog/webflow-price-increase-2026-02/)
- **Lovable:**
  - The official page lists Free (5 daily build credits, max 30/month), Pro, Business and Enterprise with credit mechanics. No prices were visible in the fetched content. — [Lovable pricing](https://lovable.dev/pricing)
  - Third-party 2026 guides mostly agree on **Pro $25/mo for 100 credits**; top-up prices conflict. — [eesel.ai](https://eesel.ai/blog/lovable-pricing); [CostBench](https://www.costbench.com/software/ai-coding-assistants/lovable/)
- **Skills and attitudes of Slovenian firms (SURS):**
  - 56% of enterprises with 10+ employees cite a lack of suitable staff or knowledge as the main digitalisation problem; 41% cite a lack of finance.
  - 53% (57% of small firms) say digital transformation "ni bistvena za njihovo uspešno poslovanje".
  - Release dated 4.12.2025. — [SURS, Digitalno podjetništvo, podrobni podatki, 2025](https://www.stat.si/StatWeb/News/Index/14010)

### Inferences

**Threat from DIY builders**
- Builders anchor the "software cost" at €10–40/month. A buyer comparing Sites+ Basic (49 € excl. DDV) with Wix or Squarespace will see roughly 2× the price. Sites+ has to sell time saved, local language and service: changes by e-mail, menu updates, Google-profile care, bookings and accountability.
- AI one-prompt builders (Durable, Hostinger AI, Wix AI, Lovable/v0-type tools) remove the "I can't build it" barrier for tech-comfortable owners and younger s.p.-ji. They are a real threat at the Basic tier.
- Durable's bundle (site + CRM + booking + GEO for ~$25) is the closest functional competitor to Sites+ Plus at a fraction of the price, but it is English-centric and DIY.

**Why done-for-you still has room**
- The least-digital Slovenian segment (lack of knowledge 56%; 57% of small firms see digitalisation as non-essential) is unlikely to adopt DIY. Done-for-you with no setup fee fits that segment better.
- Builders' "AI visibility" features are English-first (Squarespace's is English-only). Slovenian-language structured content and local directories are a remaining differentiator.

**How builders can complement Sites+**
- Sites+ can integrate rather than rebuild: booking via Fresha or Lime Booking is already in the brief, and an e-shop could be linked via Shopify Starter/Basic.
- Sites+ could also offer an "izvoz/odkup" (export or buy-out) clause to neutralize lock-in fears relative to self-owned builder sites.

### Gaps
- Euro (EU/SI) prices of Wix, Squarespace, Webflow and Shopify were not captured; all figures are USD from a US fetch.
- Webflow's and Lovable's current official prices could not be verified directly.
- v0 (Vercel), Google/Gemini site tools, GoDaddy Airo, Jimdo, Strikingly and Zyro were not researched.
- No Slovenian data on how many small firms actually use DIY builders vs. agencies was found.

---

## (C) Which Slovenian segments most need websites, and statistics on website adoption and digital intensity

### Takeaway
- **Larger firms are mostly online.** Website adoption among Slovenian enterprises with ≥10 employees is high and above the EU average: **83,9% in 2025** vs. EU 79,0%. Slovenia is still below the EU on basic digital intensity (66,6% vs. 72,1%), and a third of firms have "very low" intensity.
- **Accommodation is the most commercially proven segment.** In 2024, 23,2% of revenue (~180 mio. €) of accommodation firms (I55, 10+ employees) came from online sales, but **14,5% came via booking platforms vs. only 8,7% via own websites**. 83% of their sites are multilingual. That is a direct-booking and multilingual opportunity which the Sites+ configurator does not target today.
- **No official data covers micro firms.** No official data was found on website adoption among micro firms and s.p.-ji (<10 employees), the actual Sites+ target, or among bars, salons or obrtniki specifically.

### Cited Findings
- **Eurostat isoc_ciweb** (enterprises ≥10 employees, all activities excl. financial; dataset updated 27.2.2026): enterprises with a website — **SI 83,9% (2025)**, up from 77,1% (2023); EU27 79,0% (2025). — [Eurostat API isoc_ciweb](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ciweb?format=JSON&lang=EN&geo=SI&geo=EU27_2020&sinceTimePeriod=2023)
- **Eurostat isoc_e_dii** (DII v3, enterprises ≥10 employees):
  - At least basic digital intensity: **SI 66,6% (2025)** vs. EU 72,1%
  - Very low DII: SI 33,4% vs. EU 27,9%
  - High DII: SI 23,4% vs. EU 27,5%
  - Source: [Eurostat API isoc_e_dii](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_e_dii?format=JSON&lang=EN&geo=SI&geo=EU27_2020&sinceTimePeriod=2023)
- **SURS release of 4.12.2025:**
  - 76% of enterprises with 10+ employees faced problems with digital transformation (60% in 2021). The main problem is "pomanjkanje ustreznega kadra ali znanja" (56%), followed by a lack of finance (41%).
  - 67% reach at least basic digital maturity (66% of SMEs); the 2030 target is 90%.
  - 22% generated ≥1% of revenue from online sales in 2024; 12% had web B2C sales >10% of web sales.
  - Source: [SURS, Digitalno podjetništvo, podrobni podatki, 2025](https://www.stat.si/StatWeb/News/Index/14010)
- **SURS release of 28.1.2026 (gostinske nastanitvene dejavnosti I55, 10+ employees):**
  - "Tudi s spletno stranjo so bila na internetu navzoča vsa podjetja (v EU: 96 %)."
  - "83 % jih je imelo spletno stran, ki je bila večjezična (v EU: 72 %), 80 % pa jih je omogočalo oddajo rezervacije prek spletne strani (v EU: 81 %)."
  - In 2024, 89% earned revenue from online sales: 80% via their own website and 71% via booking platforms.
  - Online sales were ~23,2% of revenue (~180 mio. € excl. DDV): **8,7% via own websites, 14,5% via online booking platforms**.
  - Source: [SURS, Digitalizacija gostinskih nastanitvenih dejavnosti, 2025](https://www.stat.si/StatWeb/News/Index/14142)
- **AI use in Slovenian enterprises** rose from 22% to 38% in one year, per an October 2026 news report on SURS data (search-snippet level; not opened). — [ljnovice.si, 11.10.2026](https://ljnovice.si/2026/10/11/uporaba-tehnologij-umetne-inteligence-v-slovenskih-podjetjih-v-enem-letu-precej-narasla/)
- **Number of samostojni podjetniki (s.p.):** AJPES recorded **51.636 s.p.-jev** submitting annual reports for 2025 (+884 or 2%; 50.752 previously). This counts only s.p.-ji filing annual reports with AJPES, not all registered s.p.-ji (search-snippet level). — [AJPES, Informacija LP SP 2025](https://www.ajpes.si/Doc/LP/Informacije/Informacija_LP_SP_2025.pdf)
- **SPS digital marketing voucher eligibility (2019 FAQ):** društva could **not** apply ("Društvo se na javne pozive za pridobitev vavčerjev ne more prijaviti."). Firms whose main activity is primary agricultural production were excluded; the FAQ example was a turistična kmetija with main activity 56.102. **Pre-2025, possibly outdated.** — [SPS FAQ VAV-8 Digitalni marketing 2019](https://www.podjetniskisklad.si/wp-content/uploads/2024/03/VAV-8-najpogostejsa-vprasanja-DIGITALNI-MARKETING_2019-1.pdf)

### Inferences
- **Turistične nastanitve/apartmaji** are likely the highest-value segment for a subscription site:
  - Platforms earn more of the revenue than own sites (14,5% vs. 8,7% among larger I55 firms), so a direct-booking site has a clear euro argument: commission saved.
  - Multilingual sites are standard (83%).
  - Sites+ currently has no accommodation chip and charges +19 €/mes. per extra language. A dedicated "Apartma/sobe" package with SL/EN/DE included and a booking-engine link would fit the data. The I55 statistics cover larger firms, so this is an extrapolation to small sobodajalci.
- **Saloni, frizerji, wellness and zdravstvene storitve** and **avtoservisi** are booking-driven. The Sites+ ROI math (average bill 40 € and 150 €) makes payback after 1–4 new clients a month plausible. They fit Plus/Pro well. This is not backed by Slovenian conversion data.
- **Bari/kavarne** have low average bills (12 € default), so payback needs ~4–8 new guests/month at Basic/Plus (49 € ÷ 12 € ≈ 4; 89 € ÷ 12 € ≈ 7–8; simple fee ÷ bill, ignoring margins; the site's exact formula was not reverse-engineered). They likely convert best at Basic or with menu-editing as the hook rather than a feature-heavy Plus.
- **Obrtniki** have high ticket sizes (300 € default). Even Basic pays back with one job a month. Lead-capture (quote form, "pokličite me") and the Google profile matter more than visual effects.
- **Pitch message.** The skills gap (56%) and the perception that digitalisation is non-essential (57% of small firms) imply the pitch should be "nič vam ni treba znati / urediti" plus concrete revenue math, not technology.
- **Društva** are a weak paying segment: excluded from SPS vouchers and typically low-budget. They could be served by a cheaper no-frills tier or as portfolio/reference projects.

### Gaps
- No SURS or Eurostat data was found for micro enterprises (0–9 employees) or s.p.-ji on website ownership. The ICT survey covers firms with 10+ employees (and self-employed in those units).
- No Slovenian statistics were found on website adoption by specific segments: bars/restaurants (I56), frizerji (S96.02), obrtniki, avtoservisi, health/wellness.
- No counts were gathered of registered sobodajalci/apartmaji, gostinski obrati or frizerski saloni (AJPES/SURS business registers were not queried).
- No conversion-rate or willingness-to-pay data for Slovenian small businesses buying websites was found.
- The number of popoldanski s.p.-ji for 2025 was not found.

---

## (C) Subsidies Slovenian clients could use to pay for a website or digital marketing (2025–2026), provider requirements, and the popoldanski s.p. question

### Takeaway
As of October 2026, **no open national subsidy was found that a small Slovenian business can use to pay for a website**:
- The SPS **"Vavčer za digitalni marketing"** (up to 60%, new websites, e-shops, booking platforms and apps) last ran in 2022 (REVAV-8) and 2022–2023 (REVAV-16 for social enterprises). SPS's current voucher list contains no digital-marketing voucher.
- **P4D 2025** (50%, up to 100.000 €) required ≥5 employees and closed on 7.5.2025, with no 2026 round confirmed.
- **ZRSZ's self-employment subsidy** has no funds in the APZ plan for 2026–2027.

Historically the voucher required the client to have ≥1 employee and the provider to be listed in the **DIH Slovenija "katalog strokovnjakov"**. Only *new* sites were eligible, and the client paid first and was reimbursed. Whether a popoldanski s.p. can be listed as a provider was not found in any source.

### Cited Findings

**SPS Vavčer za digitalni marketing (historical; all pre-2025 unless stated)**
- **2022 re-publication:** the public call was republished on 13.5.2022 with 1,6 mio. € available. Per search-result summaries, the voucher co-financed up to 60% of the costs of new websites, new mobile apps, own e-shops or own booking platforms (2022 call: "od 500 EUR do 2.500 EUR za posamezno aktivnost"). **Pre-2025, possibly outdated.** — [gov.si, 13.5.2022](https://www.gov.si/novice/2022-05-13-ponovna-objava-javnega-poziva-vavcer-za-digitalni-marketing/); [Podjetnik.net](https://podjetnik.media.si/vavcerji-za-digitalni-marketing-ponovno-odprti/)
- **REVAV-16 (social enterprises only):**
  - Programme 1.4.2022–31.3.2023, budget 200.000 €
  - "Slovenski podjetniški sklad krije do 60 % upravičenih stroškov"
  - Applicants need ≥1 employee
  - Source: [mladipodjetnik.si (page dated 4.10.2026)](https://mladipodjetnik.si/razpis/revav-16-vavcer-za-digitalni-marketing-za-socialna-podjetja)
- **Current SPS voucher list:** the same 4.10.2026 page lists "Drugi razpisi Slovenski podjetniški sklad" as ESG, certificates, LCA, EIC and Horizon Europe vouchers. There is no digital-marketing voucher. A separate search also found no 2026 digital-marketing voucher. — [mladipodjetnik.si](https://mladipodjetnik.si/razpis/revav-16-vavcer-za-digitalni-marketing-za-socialna-podjetja)
- **2019 SPS FAQ for the digital-marketing voucher (verbatim; pre-2025, possibly outdated):** — [SPS FAQ VAV-8, 2019](https://www.podjetniskisklad.si/wp-content/uploads/2024/03/VAV-8-najpogostejsa-vprasanja-DIGITALNI-MARKETING_2019-1.pdf)
  - *Provider must be in the catalogue:* "Ali res lahko za izdelavo nove spletne strani uporabimo zgolj osebe iz kataloga zavoda DIH…? – Da, tako je. V kolikor izvajalec iz kataloga strokovnjakov ne more zagotavljati storitve…, lahko prijavitelj poišče drugega izvajalca, ki pa se mora predhodno vpisati v katalog strokovnjakov, pri čemer mora izpolnjevati pogoje za vpis. Katalog strokovnjakov se bo mesečno dopolnjeval."
  - "Da, izvajalci morajo biti vpisani v katalog DIH, ki pa je vseskozi odprt in se dopolnjuje."
  - DIH Slovenija "je … zadolžen za presojo pri ustreznosti zunanjega izvajalca", so no extra competing offers were needed.
  - *Cap per expert:* "Če ima zunanji izvajalec potrjenih več strokovnjakov, za vsakega od teh velja omejitev 100 izvedenih projektov na leto."
  - *Only new builds:* "Upravičen strošek je le nova spletna stran, nadgradnja/posodobitev obstoječe ni upravičen strošek." The same applies to e-shops.
  - *Client needs an employee:* the applicant must have ≥1 employee on the application date (part-time allowed: "lahko je tudi manj kot 8 ur"). "Podjetja s popoldanskim s.p.-jem se lahko prijavijo na javni poziv, v kolikor imajo vsaj 1 zaposlenega." Note this concerns popoldanski s.p. as **applicant**, not as provider.
  - *Caps:* max 8.500 € per company for the whole period to 2023; max 30.000 € per year across all vouchers; max three vouchers in progress at once.
  - *Reimbursement after payment:* the applicant must attach already-paid invoices to the payment claim.
  - *Publicity obligation:* the funded site must display "Naložbo … sofinancirata Republika Slovenija in Evropska unija iz Evropskega sklada za regionalni razvoj" with the ERDF, SPS and ministry logos.
- **General SPS voucher rules (2025, EIC voucher; search-summary level):** the SME must choose the provider "gospodarno … po tržni ceni"; "Izbrani zunanji izvajalec ne more biti prijavitelj po tem javnem pozivu"; "DDV ni upravičen strošek". — [SPS JP Vavčer EIC (2025)](https://www.podjetniskisklad.si/wp-content/uploads/2025/07/JP-Vavcer-EIC-002.pdf)

**P4D 2025 – Spodbude za digitalno transformacijo MSP (SPS + MGTŠ, ERDF)**
- Published 11.4.2025; deadline 7.5.2025; the gov.si page now says "Rok za prijavo je potekel". — [Uradni list](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2025002500008/javni-razpis-spodbude-za-digitalno-transformacijo-msp-p4d-2025-ob-173525); [gov.si](https://www.gov.si/zbirke/javne-objave/javni-razpis-spodbude-za-digitalno-transformacijo-msp/)
- Summaries report 17,8 mio. €, 50% co-financing, up to 100.000 €, at least 5 employees and a mandatory digital-transformation action plan. One summary says website/e-shop costs were capped at 5.000 € excl. DDV. A 2026 analysis says P4D-type calls require a minimum operation cost of 200.000 €. The figures conflict and were not verified in the official documentation. — [unija.com](https://unija.com/sl/razpis-p4d-2025-100-000-eur-nepovratnih-sredstev/); [razpis.eu](https://razpis.eu/razpisi/javni-poziv-digitalna-transformacija-p4d-2025/); [ZUPO 2026](https://www.zupo.si/wp-content/uploads/2026/02/ZUPO.SI_Digital_Transformation_Strategy-4.pdf)
- A PRC/SPOT Goriška paper (April 2026) says P4D-type calls "may be available" in 2026. This is an outlook, not a confirmed call. — [PRC 2026–2030](https://www.prc.si/upload/content/4668/digitalna-tranzicija-slovenskih-podjetij-20262030.pdf)

**Tourism calls 2026**
- **STO:** "Javni razpis za sofinanciranje aktivnosti promocije in digitalizacije turistične ponudbe vodilnih turističnih destinacij v Sloveniji v letu 2026", with deadlines 19.5.2026 and 19.6.2026. It targets **destinations**, not individual accommodation providers. — [slovenia.info](https://www.slovenia.info/sl/novinarsko-sredisce/novice/37693-javni-razpis-za-sofinanciranje-aktivnosti-promocije-in-digitalizacije-turisticne-ponudbe-vodilnih-turisticnih-destinacij-v-sloveniji-v-letu-2026)
- **MGTŠ 2026:** co-finances environmental/sustainability labels for gostinstvo and tourism providers (deadline 15.6.2026). It does not cover websites. — [gov.si, 2.3.2026](https://www.gov.si/novice/2026-03-02-objavljen-razpis-za-uvajanje-okoljskih-in-trajnostih-znakov-za-ponudnike-v-gostinstvu-in-turizmu/)

**Municipal programmes (examples; vary by občina)**
- **Občina Sežana 2026 self-employment co-financing:**
  - Up to 4.000 € lump sum; budget 40.000 €; applications by 31.3.2026
  - Eligible costs are listed as "stroški obveznih prispevkov za socialno varnost, opredmetenih in neopredmetenih osnovnih sredstev… računovodskih storitev, najemnin poslovnih prostorov ter stroški nabave pisarniške in računalniške opreme"
  - Websites and marketing are not named. A website might arguably count as an "neopredmeteno osnovno sredstvo" only under capitalisation rules; this is unconfirmed.
  - De minimis.
  - Source: [Uradni list, Sežana 2026](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2026001600014/javni-razpis-za-sofinanciranje-stroskov-samozaposlitve-v-obcini-sezana-za-leto-2026-st-430-62026-1-ob-137926)
- **Other 2025 municipal small-business calls:** Ajdovščina (30.000 € for support programmes), Cerkvenjak (9.000 €, deadline 30.9.2025), Murska Sobota (s.p.-ji explicitly eligible) and Nova Gorica (export promotion 40.000 €, closed 9.5.2025). Website eligibility was not confirmed for any of them. — [Ajdovščina](https://www.ajdovscina.si/javna_narocila_in_razpisi/javni_razpisi/2025072112545100/); [Cerkvenjak](https://cerkvenjak.si/razpis/1141158); [Murska Sobota](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2025003900011/javni-razpis-za-dodelitev-pomoci-za-razvoj-podjetnistva-in-malega-gospodarstva-v-mestni-obcini-murska-sobota-v-letu-2025-st--430-00452025-4-171-ob-199025); [Nova Gorica](https://www.podjetniski-portal.si/razpisi/javni-razpis-za-sofinanciranje-projektov-podpornih-institucij-na-podrocju-razvoja-podjetnistva-in-visoko-tehnoloskega-gospodarstva-v-mestni-obcini-nova-gorica-v-letu-2025-2025-05-09)
- **Lead:** a 2025 Uradni list notice titled "Javni razpis za sofinanciranje promocijskih aktivnosti podjetij v letu 2025" exists. The municipality and eligible costs were not checked. — [Uradni list 2025](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2025001600021/javni-razpis-za-sofinanciranje-promocijskih-aktivnosti-podjetij-v-letu-2025-st--305-00012025-ob-154725)

**ZRSZ self-employment subsidy and related relief**
- Article dated 8.10.2026: the APZ plan for 2026 and 2027 allocates no funds to "Spodbujanje samozaposlovanja". "Odprtega javnega razpisa za subvencijo za samozaposlitev zato trenutno ni."
- The article's intro contradictorily mentions active 5.000 € subsidies for women and for people up to 28. The body says no call is open.
- As an alternative it lists contribution relief for new s.p.-ji: 50% of pension and disability contributions for the first 12 months and 30% for the next 12 (ZPIZ-2, čl. 145).
- Source: [mladipodjetnik.si (8.10.2026)](https://mladipodjetnik.si/podjetniski-koticek/pridobivanje-sredstev/subvencija-za-samozaposlitev)
- Historically the ZRSZ subsidy was a one-off 4.500 €; more than 19.000 were awarded over five years. **Pre-2025, possibly outdated.** — [Žurnal24](https://www.zurnal24.si/slovenija/pet-let-jih-prezivi-le-pol-186047); [24ur (2012)](https://www.24ur.com/novice/slovenija/na-voljo-1100-subvencij-za-samozaposlitev.html)

**DIH Slovenija**
- DIH Slovenija ran the "katalog strokovnjakov" for SPS digital vouchers, published at dihslovenia.si/katalogi. — [SPS FAQ 2019](https://www.podjetniskisklad.si/wp-content/uploads/2024/03/VAV-8-najpogostejsa-vprasanja-DIGITALNI-MARKETING_2019-1.pdf)
- The catalogue's entry conditions were not found in any accessible source. — [search: DIH katalog](https://www.gzs.si/Novice/ArticleId/78898/poziv-strokovnjakom-za-podporo-pri-oblikovanju-nacrtov-usposabljanj-in-mentoriranjesvetovanje-pri-razvoju-izvajanju-in-prenovi-digitalnih-poslovnih-modelov)

### Inferences
- **Subsidies are not a sales lever today.** For 2026 sales, Sites+ cannot rely on a "subsidised website" pitch. The realistic levers are:
  - no setup fee
  - a low monthly price
  - municipal calls in the client's občina, checked case by case
  - for brand-new s.p. clients, the ZPIZ-2 contribution relief that frees cash in the first two years
- **Readiness if the voucher returns.** If an SPS digital-marketing voucher returns in a similar form:
  - Sites+ would need a one-off "izdelava nove spletne strani" invoice, because only new builds were eligible and the client is reimbursed against paid invoices. A waived setup fee plus a monthly subscription would likely earn the client nothing.
  - Jure would have to be listed in the DIH catalogue.
  - Most target clients (solo s.p.-ji, small bars and salons without employees) would be **ineligible** because of the ≥1-employee rule.
  - The required EU publicity notice on the client's site is easy to automate as a template block.
- **P4D-type calls** (≥5 employees, large projects) are irrelevant for Sites+ core clients.
- **Can a popoldanski s.p. be the provider?** No source excludes s.p.-ji as providers: SPS texts speak of "zunanji izvajalec" chosen "po tržni ceni" who cannot also be an applicant. The deciding factor historically was DIH catalogue registration, whose conditions are unknown. Check with SPS (vavcer@podjetniskisklad.si, tel. 02/234-12-60, per the search summary) or DIH Slovenija before promising subsidy eligibility.

### Gaps
- DIH Slovenija catalogue entry conditions (minimum years registered, references, activity codes, whether a popoldanski s.p. qualifies as a provider) were not found. dihslovenia.si was not reached in this research.
- No official confirmation was found of any 2026 SPS voucher or P4D call. The SPS website and Uradni list were not exhaustively scanned for November–December 2026 announcements.
- EDIH services that are free for SMEs (e.g. digital maturity assessment) were not researched.
- Municipal or regional (RRA) calls that explicitly fund websites for s.p.-ji were not found. Each občina publishes its own annual call, so this needs a per-municipality check.
- eugo.gov.si was not consulted for provider-side obligations (e.g. registration of activity codes for web development under a popoldanski s.p.).
- Exact P4D 2025 eligible-cost limits for websites and e-shops (5.000 € cap? minimum operation size?) conflict across secondary sources and were not verified in the official razpisna dokumentacija.
