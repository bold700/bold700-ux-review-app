# BUILD_PLAN — Multi-agent reviewpijplijn (3 dagen)

> **Voor Claude Code:** dit is het bouwplan. Lees vóór je begint ook:
> `website reviews.md` (het researchdocument — de onderbouwing van elke keuze hier),
> `lib/scan.ts`, `lib/ai-review.ts`, `lib/auto-scan.ts`, `lib/pagespeed.ts`,
> `lib/page-fetch.ts`, `lib/leads.ts`, `lib/types.ts`, `lib/modules/index.ts`,
> `worker.js`, `WORKER_LEADS.md` en `app/report/page.tsx`.
> Werk per dag, in de volgorde van dit document. Rond elke stap af met
> `pnpm lint && pnpm build` (en voor de Worker: `wrangler deploy --dry-run`).
> Vraag bij twijfel; verzin geen scope die hier niet staat.

---

## 1. Doel & context

BOLD700 (Kenny) biedt een gratis AI-website-review als leadmagnet. Flow:
aanvraag → automatische scan → na 23 uur mail met scorecard + rapport +
persoonlijke noot → CTA voor expertgesprek. De funnel (leads, 23u-cron,
Resend-mails, failsafe) **bestaat en blijft ongewijzigd**.

Wat we bouwen: de scan groeit van "één pagina + één generieke AI-reviewer"
naar een **gesimuleerd auditteam**: meerdere pagina's, screenshots, parallelle
specialist-agents, een checker die hallucinaties schrapt, en een synthese die
prioriteert op het doel van de klant. Kernprincipes uit `website reviews.md`:

1. **Deterministische tools meten, de LLM synthetiseert.** De AI verzint geen
   cijfers; hij interpreteert wat scanners leveren.
2. **Elk AI-oordeel is een gelabelde hypothese** (measured vs ai vs aanname),
   nooit een gepresenteerd feit.
3. **Maker-checker:** een tweede, sterker model valideert vóór de klant iets ziet.
4. **Human-in-the-loop:** Kenny controleert in het 23u-venster. De pijplijn
   vervangt hem niet; ze bereidt zijn werk voor.

## 2. Huidige staat (al gebouwd — niet opnieuw doen)

- `lib/auto-scan.ts` — deterministische DOM-regels (alt, headings, meta, https, …).
- `lib/pagespeed.ts` + integratie in `lib/scan.ts` — echte PSI-metingen,
  `source: "measured"`, AI slaat gemeten checks over.
- `lib/ai-review.ts` — AI-review met grounding-instructies, confidence-veld.
- `worker.js` — AI-proxy (OpenAI), `/fetch` (HTML-proxy), `/lead` (mail naar
  Kenny), `scheduled` cron voor de 23u-mail met failsafe.
- Leads-dashboard, rapport, scorecard, insights (Next.js + Firestore,
  anonymous auth).

## 3. Doelarchitectuur

```
FRONT-END (Next.js)                      WORKER (Cloudflare)
─────────────────────                    ──────────────────────────────
lead aanmaken (Firestore)  ──POST /scan──▶  runPipeline(leadId, url)
                                             │  ctx.waitUntil → overleeft wegklikken
scan-voortgang live tonen  ◀──Firestore──   │  schrijft progress per stap
(onSnapshot op project)                      │
                                             ▼
                              [VERZAMELEN]  Daan: crawl (max 3 pagina's)
                                            + screenshots (mobiel/desktop)
                              [METEN]       Teun: auto-scan + PSI per pagina
                              [INTAKE]      Bram+Jules: 1 call → briefing
                              [SPECIALISTEN] 6 parallelle calls (gpt-4o-mini)
                              [CHECKER]     Vera (gpt-4o): valideert, schrapt
                              [SYNTHESE]    Stef (gpt-4o): dedupe + ICE → top-10
                              [VERTALER]    Lot (gpt-4o-mini): klantentaal
                                             │
                                             ▼
                              Firestore: answers (checklist, compat) +
                              findings (top-10) + briefing + teamLog
                                             │
                              (bestaand) 23u-cron → mail naar klant
```

**Belangrijke compatibiliteitseis:** rapport/scorecard werken nu op
`answers: Record<string, Answer>`. De pijplijn blijft die vullen (checklist),
en voegt **daarnaast** nieuwe velden toe (zie §5). Niets van het bestaande
rapport mag breken voordat dag 3 het vernieuwt.

## 4. Het team — rollen, modellen, contracten

Interne namen (alleen in code/comments; in de UI heten ze **rollen**, nooit
personen — zie §8 Eerlijkheid):

| # | Naam (intern) | UI-label | Model | Taak |
|---|---|---|---|---|
| 0 | Daan | Site-analyse | geen (code) | Kernpagina's vinden (home + 1 dienst/product + 1 contact/conversie) via menu-heuristiek; HTML + screenshots per breakpoint ophalen |
| 0 | Teun | Metingen | geen (code) | `runAutoScan` + PSI + (roadmap: axe) per pagina |
| 1 | Bram+Jules | Bedrijfsprofiel | gpt-4o-mini | Eén call: leid af {branche, aanbod, doelgroep, primaire conversiedoel, belangrijkste pagina} → briefing. Alles gelabeld als aanname |
| 2 | Sofie | UX-analyse | gpt-4o-mini | Nielsen-heuristieken, navigatie, hiërarchie, mobiel — op screenshots + tekst |
| 3 | Ruben | SEO & content | gpt-4o-mini | Vindbaarheid, structuur, copy-helderheid |
| 4 | Nora | Conversie-analyse | gpt-4o-mini | Trust-signalen, CTA's, formulierfrictie (LIFT) |
| 5 | Timo | Toegankelijkheid | gpt-4o-mini | Interpreteert meetdata + wat regels missen (zinvolle alt-teksten, leesvolgorde) |
| 6 | Fleur | Eerste indruk | gpt-4o-mini | 5-secondentest op screenshot: wat verkoopt deze site, waar klik je, wat mis je? Als bezoeker, niet als expert |
| 7 | Ans | Doelgroep-blik | gpt-4o-mini | Bekijkt de site als de persona uit de briefing: snap ik het, vertrouw ik het, wat weerhoudt me? |
| 8 | Vera | Kwaliteitscontrole | gpt-4o | Valideert elke bevinding tegen het bewijs (staat het genoemde element écht in de inhoud?). Verdict per bevinding: bevestigd / verworpen / onzeker. Verworpen → weg; onzeker → confidence "low" |
| 9 | Stef | Prioritering | gpt-4o | Dedupliceert (ook across-page!), lost tegenspraak expliciet op, ICE-score t.o.v. het conversiedoel → top-10 |
| 10 | Lot | Rapport-tekst | gpt-4o-mini | Herschrijft top-10 naar klantentaal (hergebruik patronen uit `lib/plain-language.ts` / `lib/de-jargon.ts`) |

**Promptregels voor álle agents** (uit het researchdocument, §Deel H):
temperature 0; structured JSON only; per bevinding rationale + bewijs
(letterlijk citaat of screenshot-verwijzing); "cannot determine" expliciet
toegestaan i.p.v. gokken; de grounding-instructie uit `lib/ai-review.ts`
(NOOIT elementen verzinnen) overal hergebruiken; briefing (doel/doelgroep)
in elke specialist-prompt meegeven.

**Uitvoering:** één generieke `runAgent(role, dossier)`-functie + een
`AGENTS`-object met per rol {naam, model, systemprompt, welke input}.
Geen 10 losse implementaties.

## 5. Datacontracten

### Finding (output specialisten → Vera → Stef)

```ts
interface Finding {
  agent: string          // "sofie" | "ruben" | ...
  page: string           // URL van de beoordeelde pagina
  checkId?: string       // koppeling met checklist-id als van toepassing
  issue: string          // wat is er aan de hand (1-2 zinnen, NL)
  bewijs: string         // letterlijk citaat uit de inhoud of "screenshot: <wat>"
  severity: 0 | 1 | 2 | 3 | 4
  confidence: "high" | "medium" | "low"
  aanbeveling: string
  verdict?: "bevestigd" | "verworpen" | "onzeker"   // gezet door Vera
  ice?: { impact: number; confidence: number; effort: number; score: number } // Stef
}
```

### Firestore — nieuwe velden op het project-document

```ts
{
  briefing: { branche, aanbod, doelgroep, doel, belangrijkstePagina,
              bron: "aanname" },          // Bram+Jules
  pages: string[],                        // gescande URL's (Daan)
  findings: Finding[],                    // gevalideerde top-10 (na Stef+Lot)
  geschrapt: number,                      // aantal door Vera verworpen (voor UI)
  teamLog: Array<{ stap: string; status: "bezig"|"klaar"|"overgeslagen"|"fout";
                   samenvatting?: string; ms?: number; kosten?: number }>,
  scanVersion: 2,
  // bestaand en ongewijzigd: answers, scanStatus, score, deliverAtMs, ...
}
```

`teamLog` wordt per stap live geüpdatet — dit voedt het voortgangsscherm én
is het kosten/duur-logboek.

### Screenshots

Opslaan als JPEG (kwaliteit ~70, max ~1200px breed), base64 naar de
vision-calls. Opslag: Firebase Storage via bestaand patroon in
`lib/storage.ts`; sla per pagina mobiel + desktop op en bewaar de download-
URL's op het project (rapport toont ze).

## 6. Dagplan

### DAG 1 — Verzamelen, meten, verhuizen

**1.1 Worker-refactor.** Splits `worker.js` naar een `worker/`-map met
wrangler-modules: `index.js` (router + scheduled, bestaand gedrag), `scan.js`
(nieuwe pijplijn), `agents.js` (AGENTS-object + runAgent), `firestore.js`
(bestaande REST-helpers eruit getild). Gedrag van `/fetch`, `/lead`, proxy en
cron blijft byte-voor-byte gelijk.

**1.2 `POST /scan` endpoint.** Body `{ leadId, url }`. Start
`ctx.waitUntil(runPipeline(...))`, antwoordt direct `{ ok: true }`.
Zet `scanStatus: "scanning"`; bij onherstelbare fout `scanStatus: "failed"`
(de bestaande cron-failsafe pakt dat op — niet aanpassen).

**1.3 Daan (crawl).** In de Worker: haal de homepage, parse links
(HTMLRewriter of regex — er is geen DOMParser in Workers; kies HTMLRewriter),
kies max 3 pagina's: home + beste match op dienst/product/aanbod + beste
match op contact/afspraak/offerte/checkout. Zelfde host only, dedupe,
timeout per fetch 10s.

**1.4 Screenshots.** Cloudflare Browser Rendering (`@cloudflare/puppeteer`,
binding in `wrangler.toml`) voor mobiel (390px) + desktop (1440px) per
pagina. **Vereist Workers Paid** — check of de binding werkt; zo niet:
schrijf de code zó dat screenshots optioneel zijn en de pijplijn zonder
verder gaat (specialisten krijgen dan alleen tekst; Fleur wordt overgeslagen
en teamLog meldt "overgeslagen"). Geen harde afhankelijkheid.

**1.5 Teun in de Worker.** `runAutoScan` verwacht een `Document`; in de
Worker is die er niet. Oplossing: porteer de benodigde extractie naar een
DOM-loze variant (bijv. met `linkedom` als die in de Worker past, anders de
regels herschrijven op HTMLRewriter/regex-basis) — of pragmatischer:
laat de bestaande browser-`scanToAnswers` intact voor herscans, en geef de
Worker-pijplijn zijn eigen lichte meting (title/meta/alt/lang/headings via
HTMLRewriter) + PSI-call (hergebruik logica uit `lib/pagespeed.ts`,
gekopieerd naar `worker/`). Kies de pragmatische route; documenteer de keuze.

**1.6 Front-end aansluiten.** Bij lead-aanmaak: naast het bestaande gedrag
`POST {PROXY}/scan` aanroepen. De browser-scan blijft bestaan als fallback
wanneer de Worker-scan faalt én voor de bestaande herscan-flow.

**Acceptatie dag 1:** een lead aanmaken leidt headless (browser dicht) tot
een project met `pages` (≤3), meetdata in `answers`, screenshots (of nette
"overgeslagen"-log), gevulde `teamLog` met duur per stap. Bestaande
mails/failsafe onveranderd. `wrangler deploy` succesvol.

### DAG 2 — Het team

**2.1 `agents.js`.** AGENTS-object + `runAgent(role, dossier)` met: OpenAI-
call (hergebruik proxy-logica die al in de Worker zit), temperature 0,
JSON-parsing met de robuuste fallbacks uit `lib/ai-review.ts`
(gekopieerd), retry 1× bij ongeldige JSON, per call teamLog-entry met
tokens/kosten/duur.

**2.2 Pipeline-volgorde in `scan.js`:**

```js
const briefing = await runAgent("intake", dossier)            // Bram+Jules
const specialisten = ["sofie","ruben","nora","timo","fleur","ans"]
const ruw = (await Promise.allSettled(specialisten.map(r =>
  runAgent(r, { ...dossier, briefing })))).flatMap(ok)        // parallel, elk mag falen
const gecheckt = await runAgent("vera", { ruw, dossier })     // valideert
const top = await runAgent("stef", { gecheckt, briefing })    // dedupe + ICE → max 10
const findings = await runAgent("lot", { top })               // klantentaal
```

**2.3 Checklist-compatibiliteit.** Map bevindingen met `checkId` terug naar
`answers` (score good/ok/bad + note + source "ai" + confidence), zodat
scorecard en score blijven werken. Checks die gemeten zijn (source
"measured") worden door geen enkele agent overschreven.

**2.4 Vera's contract.** Input: alle ruwe findings + de pagina-inhoud.
Output: per finding een verdict + reden. Verworpen findings verdwijnen uit
`findings` maar tel ze in `geschrapt`. Faalt Vera zelf → alle findings
confidence "low", rapport toont "niet gevalideerd"; pijplijn breekt nooit.

**2.5 Budget-guard.** Hard plafond per scan (env `SCAN_MAX_TOKENS`, default
~150k tokens totaal; env `SCAN_MAX_MS`, default 4 min). Overschrijding →
stoppen met wat er is, teamLog-melding, scan alsnog "done" als er minimaal
meetdata + één specialist is.

**Acceptatie dag 2:** URL erin → `findings` (≤10, gevalideerd, klantentaal,
met bewijs + confidence + ICE) + gevulde `answers` + `geschrapt`-teller.
Kosten per scan zichtbaar in teamLog en < €0,50. Eén specialist bewust laten
falen (test) → scan komt toch af.

### DAG 3 — Rapport, voortgang, test

**3.1 Rapport (`app/report/page.tsx`).** Nieuwe opbouw, alles NL:
1. Krantenkop: score + één zin ("Je loopt waarschijnlijk [doel] mis door 3
   dingen") — afgeleid uit briefing + top-3.
2. "Wat we over je bedrijf zagen" — briefing als kaartje, expliciet gelabeld
   **aanname**, met zin "Klopt dit niet? Zeg het in het gesprek — dan wordt
   de review scherper."
3. Top-3 uitgeklapt: per item *Wat we zagen* (bewijs/screenshot) → *Waarom
   dit klanten kost* → *Wat je eraan doet* + label (✓ Gemeten / ~ AI-analyse
   / ? Te valideren bij low confidence).
4. Overige punten inklapbaar; technische checklist (bestaande scorecard) als
   "Bijlage voor je websitebouwer".
5. "Hoe deze review is gemaakt": metingen + 6 gespecialiseerde AI-analyses +
   kwaliteitscontrole (toon `geschrapt`: "N bevindingen doorstonden onze
   controle niet en zijn geschrapt") + "gecontroleerd door een specialist
   van BOLD700".
6. Disclaimerzin + expertgesprek-CTA gekoppeld aan de "? Te valideren"-punten.

**3.2 Voortgangsscherm.** Waar nu de scan-progress staat: lees `teamLog`
live (onSnapshot) en toon per stap rol-label + status + mini-samenvatting
("12 metingen, 3 aandachtspunten"). Geen animatie-franje; een nette lijst
met vinkjes volstaat.

**3.3 Leads-dashboard.** Toon per lead: briefing-samenvatting, top-3,
`geschrapt`, kosten/duur. Kenny's bestaande noot-veld blijft.

**3.4 Testprotocol (middag).**
1. Draai 5 bekende sites (waarvan 1 kapotte URL en 1 trage site).
2. Per rapport turven: verzonnen elementen (doel: 0), onterechte
   aanbevelingen (doel: ≤2 per rapport), klopt de briefing-aanname, klopt de
   top-3 met wat jij zelf zou zeggen.
3. Failsafe-test: kapotte URL → `scanStatus: "failed"` → alert-mail naar
   Kenny, géén klantmail.
4. Kosten/duur-check: alle 5 scans < €0,50 en < 5 min.
5. De 2 grootste prompt-problemen fixen; opnieuw draaien.

**Acceptatie dag 3:** een buitenstaander die het rapport leest kan zonder
uitleg zeggen wat de top-3 acties zijn; alle labels kloppen; bestaande
funnel (lead-mail, 23u-mail, failsafe) ongewijzigd; `pnpm build` groen.

## 7. Wat we bewust NIET bouwen (roadmap — niet aan beginnen)

- Max (agentic walkthrough van formulieren/checkout) — techniek nog wankel.
- Iris (concurrentievergelijking) — premium-feature later.
- Esmee (verdiepingsvragen naar de klant) — later.
- Bevestigingsstap van de briefing door de klant — nu: aanname tonen in rapport.
- axe-core in de Worker — vergt rendering; roadmap na Browser Rendering-ervaring.
- Multi-agent "discussie"/debat — agents communiceren alléén via het dossier.

## 8. Guardrails (gelden voor elke wijziging)

1. **Funnel is heilig.** `/lead`, de 23u-cron, Resend-mails, failsafe en de
   Firestore-leadvelden (`deliverAtMs`, `scanStatus`, `emailedAtMs`)
   veranderen niet van gedrag.
2. **Eerlijkheid.** Agent-namen nooit in klant-UI; daar heten ze rollen
   ("UX-analyse"). Nergens suggereren dat meerdere ménsen keken. De enige
   mens-claim is Kenny, en die klopt. Elke AI-bevinding gelabeld; elke
   briefing-waarde gelabeld als aanname.
3. **Nooit hard falen.** Elke stap heeft een catch; het rapport komt er
   altijd, desnoods kleiner. Alleen "geen HTML op te halen" is fataal
   (→ bestaande failsafe).
4. **Meetdata wint altijd** van AI-oordeel bij dezelfde check.
5. **Alles NL**, bestaande toon (zie `lib/plain-language.ts`).
6. **Kosten zichtbaar** per scan in teamLog; plafonds via env.
7. **Secrets** alleen via Worker-secrets/env; nooit in client-code of repo.
8. Na elke fase: `pnpm lint && pnpm build`; Worker: `wrangler deploy --dry-run`.

## 9. Definitieve check (na dag 3)

- [ ] Lead → headless scan → rapport, zonder open browser
- [ ] 3 pagina's, screenshots (of nette degradatie zonder)
- [ ] Performance/meetchecks uit PSI/regels, nooit uit AI
- [ ] ≤10 findings, elk met bewijs, label en confidence
- [ ] Vera schrapt aantoonbaar (geschrapt-teller > 0 op minstens 1 testsite)
- [ ] Prioritering verandert mee met het doel in de briefing
- [ ] Voortgangsscherm toont het team live
- [ ] Kosten < €0,50 en duur < 5 min per scan
- [ ] Failsafe-mail bij kapotte site, geen klantmail
- [ ] Bestaande scorecard/score/herscan werken nog
