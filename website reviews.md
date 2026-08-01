# AI-gedreven Website Review & Audit — Uitbreiding op het 7-fasen / 9-dimensies raamwerk

## TL;DR
- **AI verschuift de website-audit van "expert doet alles handmatig" naar "AI doet de sjouw, mens beslist"**: technische lagen (Lighthouse, axe-core, CrUX, crawl) zijn nu vrijwel volledig automatiseerbaar en betrouwbaar; heuristische/UX- en CRO-oordelen zijn deels automatiseerbaar maar hebben een gedocumenteerde nauwkeurigheid van slechts 50–75% bij generieke LLM-prompts — te laag om blind op commerciële sites toe te passen.
- **De winnende architectuur is een hybride pijplijn**: URL → crawl + screenshots per breakpoint → deterministische scans (Lighthouse/axe/SEO-crawl) → multimodale LLM-evaluatie per pagina/dimensie met vaste rubrics → synthese-agent die scoort en prioriteert (ICE) → rapport. LLM's leveren snelheid en dekking; mensen leveren validatie en de eindbeslissing (human-in-the-loop is geen ceremonie maar accountability).
- **Voor een solo-consultant is een AI-versnelde review van 30–60 min nu realistisch** met gratis tools (PageSpeed Insights, Lighthouse, axe DevTools, screenshots + Claude/GPT), mits je rubrics, structured output en lage temperatuur gebruikt, minstens één menselijke validatieronde inbouwt, en elke aanbeveling labelt als "AI-hypothese" tot ze getest is.

---

## Key Findings

1. **De technische dimensies zijn het rijpst voor automatisering.** Performance (Core Web Vitals), toegankelijkheid (het machinaal-testbare deel van WCAG) en technische SEO kunnen volledig gescript worden met Lighthouse CI, axe-core, CrUX/PageSpeed API en crawlers zoals Screaming Frog. LLM's voegen hier vooral waarde toe in *synthese en prioritering* van de output, niet in het meten zelf.

2. **Heuristische/UX-evaluatie door LLM's is veelbelovend maar riskant.** Twee academische studies uit 2025 geven een schijnbaar tegenstrijdig beeld: een geëngineerde multi-step pijplijn (Zhong et al.) vond 73–77% van usability-issues en versloeg menselijke evaluatoren, terwijl een enkele prompt (Guerino et al.) slechts 21,2% van expert-issues terugvond. Het verschil zit in de methode, niet in "kan AI het wel of niet". Commerciële tests bevestigen het risico: twee Microsoft UX-researchers vonden in maart 2025 nauwkeurigheden van "just 50%, 62%, 67%, and 75%", waarbij de 75% alleen haalbaar was door de tool zó te beperken dat hij "13 of 16 (i.e., 81%) UX opportunities that the human expert identified" miste.

3. **Het gevaar is niet dat AI issues mist, maar dat het plausibel-klinkende fóute adviezen geeft.** Baymard's kernargument: van 10 AI-suggesties zijn er 5–7 goed en 3–5 schadelijk voor conversie, en je kunt ze niet uit elkaar houden zonder een expert — waardoor de tijdwinst verdampt. Eén verkeerde UX-wijziging kan miljoenen kosten (Baymard-cases: een verkeerde galerij-indicator kostte een grote retailer 1% conversie; een verkeerd geplaatste "Place Order"-knop scheelde een sportretailer $10M jaaromzet).

4. **Vision-modellen hebben structurele beperkingen bij UI-begrip.** Benchmarks (UXBench, VisualWebBench, MUIAnno) tonen dat multimodale LLM's worstelen met fijnmazige spatiale relaties, kleine iconen, low-resolution input en interactie-afhankelijke oordelen. Ze zijn sterk op *visuele* dimensies (esthetiek, layout, hiërarchie) en zwak op *functionele/interactie*-heuristieken (flexibiliteit, controle, consistentie over schermen heen).

5. **Agentic browserautomatisering is bruikbaar voor het verzamelen, wankel voor het uitvoeren van flows.** Playwright/Puppeteer + LLM (via MCP of computer-use) kan betrouwbaar crawlen, screenshots per breakpoint maken en DOM/accessibility-trees uitlezen. Maar computer-use agents die zelfstandig checkout/formulier-flows doorlopen falen nog vaak (zie OSWorld-cijfers in Deel C).

6. **Synthetische gebruikers zijn goed voor hypothesen, gevaarlijk als bewijs.** NN/g concludeerde na het testen tegen drie eigen studies met echte deelnemers: "Synthetic user responses for many research activities are too shallow to be useful. Real people care about some things more than others. Synthetic users seem to care about everything. This is not helpful for feature prioritization or persona creation." Bruikbaar voor deskresearch en het voorbereiden van echt onderzoek; niet als vervanging.

7. **Er bestaat een volwassen markt van AI-audit-tools**, van gratis first-pass CRO-audits tot Baymard's UX-Ray (95% gedocumenteerde nauwkeurigheid via een niet-generatieve aanpak) en predictive-attention tools (Attention Insight, Brainsight) die de 5-seconden-test simuleren.

---

## Details

### Deel A — Wat AI vandaag betrouwbaar automatiseert, en wat niet

**Betrouwbaar automatiseerbaar (deterministisch, hoge validiteit):**
- **Performance-meting**: Lighthouse/Lighthouse CI meet LCP, CLS, TBT (proxy voor INP); PageSpeed Insights combineert lab- + velddata; CrUX API levert real-user-data. Deze zijn reproduceerbaar en scoren 0–100 per categorie.
- **Toegankelijkheid — het machinaal-testbare deel**: axe-core, Lighthouse (subset van axe-regels), Pa11y. De brede industrie-consensus is dat geautomatiseerde tools ~30–40% van WCAG-succescriteria dekken. Deque nuanceert dit met eigen data: in een studie over "over 2,000 audits... spanning over 13,000 pages... covering nearly 300,000 issues" vond Deque dat gemiddeld "57 percent of accessibility issues were completely covered by this automated testing" — hoger dan "the widely-accepted belief that automated accessibility testing only provides 20-30 percent of coverage." De axe-core-documentatie stelt eveneens: "With axe-core, you can find on average 57% of WCAG issues automatically." De resterende ~43–70% (betekenisvolle alt-tekst, logische leesvolgorde, toetsenbordnavigatie-logica) vereist menselijk oordeel.
- **Technische SEO**: crawlers (Screaming Frog, Sitebulb) vinden broken links, redirect chains, ontbrekende meta's, duplicate content, hreflang-fouten, indexatie-problemen.

**Deels automatiseerbaar (LLM helpt, mens valideert):**
- Heuristische UX-evaluatie, copy/waardepropositie-kritiek, CRO-hypothesegeneratie, contentanalyse. Hier ligt de nauwkeurigheid van generieke LLM-aanpakken op 50–75%.

**Niet betrouwbaar automatiseerbaar (mens blijft nodig):**
- Interactie-afhankelijke usability-oordelen uit statische screenshots. In een studie naar mobiele UI-evaluatie haalde GPT-5 κ>0.60 op visuele dimensies maar Gemini 2.5 Pro <0.42 op functionele dimensies; de auteurs concluderen dat MLLM's "can approximate expert ratings on visual dimensions, but remain unreliable for interaction-dependent usability judgments from static screenshots."
- Echte gebruikersbehoeften en "unknown unknowns" (synthetische gebruikers falen hier).
- Strategisch oordeel, JTBD-context, merk/trust-nuance, de eindbeslissing over wat te bouwen.

**Hallucinatie- en biasrisico's die je moet inbouwen:**
- LLM-judges zijn systematisch *milder* dan menselijke experts (in één industrie-studie scoorden LLM-judges gemiddeld 0.46 punt hoger dan de consensus van 26 domeinexperts) en overmoedig.
- False positives: Guerino et al. rapporteerden 24,3% hallucinaties/verzonnen issues; Zhong et al. zagen dat GPT-4 40+ severity-0 "non-issues" per app flagde, ~40% daarvan door verkeerde componentherkenning en ~40% door onbegrip van designconventies.
- "Bias laundering": LLM's versterken dominante trainingsdistributies (Engelstalig, welvarend, tech-geletterd) verpakt in empathische taal (ACM Interactions, Papangelis).

### Deel B — AI-gedreven heuristische/UX-evaluatie: de bewijsbasis

Dit is de belangrijkste en meest genuanceerde bevinding. Twee peer-reviewed studies uit 2025:

**Zhong, McDonald & Hsieh (arXiv:2507.02306) — "Synthetic Heuristic Evaluation":**
- **Resultaat**: synthetische evaluatie vond **73%** (97/133) resp. **77%** (87/113) van usability-issues in twee apps, tegen **57%/63%** voor 5 geaggregeerde menselijke UX-experts en slechts ~17–18% voor een gemiddelde individuele expert (p<0.001).
- **Model**: GPT-4 (multimodaal, beeld); Gemini-1.5-pro en Claude 3.5 Sonnet presteerden minder.
- **De pijplijn die dit mogelijk maakte** (géén enkele prompt): (1) scenario/taakcontext vooraf per screenshot-set; (2) chain-of-thought met per issue een rationale + severity 0–4 + reden voor severity + "wees zo specifiek mogelijk"; (3) instructie "vind minstens 2 problemen per heuristiek" om recall op te voeren; (4) expliciete across-screen-instructie ("consider the interaction across the screens"); (5) de 10 Nielsen-heuristieken opgesplitst in twee calls (5+5) om token-cutoff te vermijden.
- **Waar het faalde**: componentherkenning (iOS-statusbalk aangezien voor app-UI; pop-up voor knop); designconventies (verkeerd bekritiseerde bewust-gekleurde toggle-knop); across-screen aggregatie — vond maar 43%/50% van across-screen-violations tegen 86%/83% voor experts, en produceerde 8–9 duplicaten (experts: 0).

**Guerino et al. (arXiv:2506.16345, INTERACT 2025):**
- **Resultaat**: GPT-4o vond slechts **21,2%** van de door experts geïdentificeerde issues terug (wel 27 nieuwe), met **24,3% false positives** "due to hallucinations and attempts to predict issues that do not exist."
- **Methode**: één literatuur-gegronde prompt op screenshots van een complex web-systeem.

**Waarom het schijnbaar tegenstrijdig is (en niet echt):** het verschil zit in (a) geëngineerde multi-step CoT-pijplijn vs enkele prompt; (b) de meetmethode — Zhong meet dekking van een master-set die *deels uit GPT-4's eigen output* is opgebouwd, Guerino meet strikte overlap met onafhankelijke experts; (c) modelversie (GPT-4 vs GPT-4o); (d) mobiele apps vs complex web-systeem. **Beide studies zijn het kwalitatief eens**: LLM's zijn sterk op esthetiek/layout/minimalisme, zwak op consistentie/flexibiliteit/controle en interactie, en produceren substantiële false positives.

**Commerciële validatie:**
- **Microsoft UX-researchers (maart 2025)**: geteste AI-tools haalden "just 50%, 62%, 67%, and 75%" nauwkeurigheid; de 75% was alleen haalbaar door de tool zoveel te beperken dat hij "13 of 16 (i.e., 81%) UX opportunities that the human expert identified" miste. Advies: behandel AI-evaluatie als "an additional reviewer" wiens bevindingen je controleert.
- **Baymard UX-Ray**: "UX-Ray can perform an automated heuristic evaluation using 346 UX heuristics with a 95% Accuracy Rate or higher"; deze score is berekend door "performing a human-conducted UX heuristic evaluation across 79 different websites, where UX-Ray and Baymard's UX auditors assessed the same websites, using the exact same set of screenshots" — een test-opzet die "costs beyond $100,000" (mei 2026, UX-Ray v2.0). Cruciaal: UX-Ray gebruikt **geen** generatieve AI voor de UX-*analyse of het oordeel*. Een cascade van 15+ systemen doet het werk; de LLM classificeert alleen wélk UI-patroon aanwezig is (2–10 vaste antwoordopties). Het oordeel "goed/slecht" en de verbeter-suggestie komen uit 200.000+ uur onderzoek, niet uit de LLM. Hierdoor "faalt het veilig": een fout is een zichtbaar verkeerde patroondetectie, geen plausibel-klinkend fout advies.

De les voor het raamwerk: **gebruik de LLM voor waarneming/classificatie/synthese, niet voor het finale UX-oordeel — tenzij een mens valideert.**

### Deel C — Agentic browserautomatisering

- **Playwright/Puppeteer + LLM**: de standaard voor het *verzamelen* — crawlen, screenshots per breakpoint (mobiel/tablet/desktop), DOM- en accessibility-tree-extractie. Playwright MCP laat een LLM werken op gestructureerde accessibility-snapshots i.p.v. screenshots (deterministische element-refs, veiliger/observeerbaarder). Kostenwaarschuwing: een Playwright MCP-sessie kan ~114.000 tokens verbruiken tegen ~27.000 via de CLI.
- **Computer-use agents** (OpenAI CUA/Operator, Claude Computer Use, Gemini Computer Use): kunnen flows nalopen als een mens (zien, klikken, typen), maar zijn nog onbetrouwbaar voor autonome multi-step flows. OSWorld-benchmark (het publieke, verifieerbare referentiepunt): OpenAI CUA/Operator scoorde 38,1% bij lancering (jan 2025); Claude Sonnet 4.5 haalde ~61% (sep 2025); latere modellen tikken ~72–75% aan op OSWorld-Verified. De menselijke baseline ligt rond 72–74%. *Let op de versieverwarring in secundaire bronnen — schrijf hoge scores niet toe aan het verkeerde model.*
- **Toepassing voor audits**: automatiseer de *cognitive walkthrough* semi-automatisch — agent legt elke stap van een flow vast (screenshot + DOM), LLM evalueert per stap tegen walkthrough-vragen ("weet de gebruiker wat te doen? is de voortgang zichtbaar? is feedback duidelijk?"). Voor formulier-/checkout-frictiedetectie: combineer DOM-analyse (verplichte velden, foutafhandeling) met vision (visuele hiërarchie van de CTA). Let op: agents zijn kwetsbaar voor dark patterns.

### Deel D — Automatische technische lagen naar LLM-synthese

Praktijkpatroon (bewezen, o.a. de DEV-case "AI Agent That Runs Accessibility Audits on Every Deploy"): draai axe-core + Lighthouse + Playwright-screenshots, en voed **alle drie de outputs** (axe JSON + DOM-snapshot + screenshots) aan een LLM met een gestructureerde prompt die als "toegankelijkheidsspecialist" optreedt. Resultaat volgens de auteur: dekking stijgt van ~30% (puur axe) naar ~55–60%; de agent vangt contextuele/visuele/structurele problemen die regels missen, en spreekt axe soms tegen op severity (meestal terecht). Kost ~10 min extra review per PR.

- **SEO**: Screaming Frog v22 heeft ingebouwde AI-integratie (OpenAI, Gemini, Claude, Ollama) met custom prompts tijdens de crawl — alt-teksten, intent-classificatie, semantische similarity via embeddings (score 0–1; >0,95 = kannibalisatie-risico). Of exporteer crawl + GSC + GA4 naar een LLM voor prioritering ("pagina's met hoge impressies, lage CTR").
- **Analytics**: Google's open-source LLM-connector vertaalt natuurlijke taal naar GA4 API-queries; Gemini genereert Python (pandas) voor betrouwbaardere berekeningen. Waarschuwing: cross-check kritieke inzichten, AI maakt fouten.

Kernprincipe: **laat deterministische tools meten, laat de LLM synthetiseren en prioriteren.** De LLM verzint geen cijfers; hij interpreteert cijfers die de scanners leveren.

### Deel E — Copy/content & synthetische gebruikers

- **Message clarity / waardepropositie**: LLM's zijn bruikbaar voor het scoren van kopregel-helderheid, jargon-detectie en het bekritiseren van de waardepropositie tegen een rubric.
- **Gesimuleerde 5-seconden-test**: twee sporen. (1) LLM-persona die na "5 seconden kijken" reproduceert wat de boodschap/CTA was. (2) Predictive-attention tools — Attention Insight is getraind op "approximately 5.5+ million fixations and 550+ million gaze points"; MIT-wetenschappers concludeerden dat de heatmaps "match actual eye tracking heatmaps with 92.5% accuracy for general images", oplopend tot "up to 96%" over alle designtypes (gemeten via AUC/ROC op de MIT saliency benchmark — dus een statistische correlatie, geen 96% per individuele voorspelling). Voorspelt de eerste 4–5 seconden aandacht; Brainsight biedt vergelijkbare predictive heatmaps + "GenAI Audit" voor visuele hiërarchie. Beperking: alleen eerste 4–5 sec, geen multi-step journeys, aggregaat-patronen (individueel gedrag varieert).
- **Synthetische gebruikers — kritiek**: NN/g testte Synthetic Users tegen 3 echte studies en concludeerde dat antwoorden "too shallow to be useful" zijn, eendimensionaal en sycofantisch. IxDF-case: synthetische gebruikers claimden "ik voltooide alle cursussen"; echte gebruikers "3 van 7". Voorspelden forumdeelname die echte gebruikers vermeden ("contrived"). ACM Interactions waarschuwt voor "bias laundering" en "capability erosion". **Regel**: label elk AI-inzicht als synthetisch vs geobserveerd; als je niet kunt labelen, ship je het niet.

### Deel F — AI-geassisteerde CRO en de tool-markt

- **Hypothesegeneratie uit data**: het bewezen patroon (Perez et al., NAACL 2025, "An LLM-Based Approach for Insight Generation") is een 3-staps architectuur — high-level vragen genereren → opsplitsen in subvragen → beantwoorden/valideren met SQL → aggregeren tot inzicht met iteratieve hallucinatie-verwijdering. Toegepast op CRO: GA4 toont patroon (bv. 70% mobiele afhakers op betaalscherm) → LLM genereert hypothese → ontwerp test → meet.
- **Tool-landschap (categorieën):**
  - *Gratis first-pass CRO-audits*: Fibr.ai, OptimizeMyWebsite.ai, Optimise Digital — URL + doel → conversiescore + geprioriteerde aanbevelingen over hiërarchie, CTA, trust, formulierfrictie, snelheid. OptimizeMyWebsite.ai positioneert zich expliciet: "It works best as a first-pass diagnostic layer... spot obvious and medium-confidence issues quickly, then validate and prioritize them with deeper research or testing."
  - *Gedrag + AI*: Landingi Solis (+ EventTracker), Plerdy, Hotjar — heatmaps, session recordings, funnels + AI-suggesties.
  - *Onderzoeksgebaseerd, niet-generatief*: Baymard UX-Ray (95% nauwkeurigheid, 346 heuristieken, ecommerce).
  - *SEO-audit*: WooRank (~$80–500/mnd, ~70 factoren), Screaming Frog (gratis tot 500 URL's, £199/jr onbeperkt), Sitebulb (desktop vanaf ~$18/mnd, cloud vanaf ~$245/mnd).
  - *Predictive attention*: Attention Insight (gratis tier, betaald vanaf ~$29/mnd), Brainsight.
  - *Synthetische user-testing*: Synthetic Users, Uxia — bruikbaar als eerste stap, missen gedragsnuance.

### Deel G — Architectuur-blueprint

```
[1] INPUT: URL(s) + doel/KPI + persona/JTBD-context (mens levert dit)
        │
[2] COLLECT (agentic, deterministisch):
     • Crawler (Screaming Frog/Playwright) → paginalijst, meta, structuur
     • Screenshots per breakpoint (mobiel/tablet/desktop) via Playwright
     • DOM + accessibility-tree per key-pagina
        │
[3] TECHNICAL SCANS (deterministisch, parallel):
     • Lighthouse CI → performance/CWV, SEO, best practices
     • PageSpeed + CrUX API → veld- + labdata
     • axe-core → WCAG (machinaal-testbaar deel)
        │
[4] LLM-EVALUATIE per pagina × dimensie (multimodaal, rubric-gestuurd, temp≈0):
     • één gespecialiseerde "agent"/prompt per dimensie
     • input = screenshot + DOM + scan-JSON + rubric + few-shot voorbeelden
     • output = strikte JSON: {issue, dimensie, heuristiek, severity 0–4,
       bewijs/locatie, confidence, aanbeveling}
     • self-consistency: 3 runs, aggregeer
        │
[5] SYNTHESE-AGENT:
     • dedupliceert (let op across-screen duplicaten!)
     • lost conflicten expliciet op (niet "vat samen")
     • scoort met ICE/PIE/PXL → geprioriteerde backlog
        │
[6] OUTPUT: rapport met concrete aanbevelingen + confidence-labels
        │
[7] HUMAN-IN-THE-LOOP: expert valideert vóór implementatie;
     elke aanbeveling = hypothese tot A/B-getest
```

**Orchestratie-keuzes:**
- **Single prompt** voor een snelle solo-review; **multi-agent** (per dimensie een gespecialiseerde agent + synthese-orchestrator) voor de geautomatiseerde versie. Waarschuwing uit productie-literatuur: orchestrator-kosten schalen niet-lineair (een workflow van $0,50 in test kan $50.000/mnd worden bij 100K runs); begrens token/step-budgetten, gebruik goedkopere modellen voor "workers" en een sterk model voor de synthese/checker.
- **Maker-checker / debat-patroon** vermindert hallucinaties: één agent genereert issues, een tweede (sterker model) valideert tegen bewijs. Onderzoek toont dat debat hallucinaties reduceert doordat agents elkaars fouten vangen.
- **Structured output verplicht** (JSON-schema, bv. via Pydantic met validatie + retries) zodat downstream-code op vaste velden kan rekenen.
- **Conflictresolutie expliciet**: LLM-synthese kan "consensus hallucineren" die niet in de onderliggende resultaten zit — bouw een expliciete conflictstrategie, geen "summarize the results".

### Deel H — Prompt- & rubricontwerp voor consistentie

Op basis van de LLM-as-judge-literatuur:
- **Temperatuur laag (≈0)**: lage temp geeft near-perfecte consistentie; hoge temp laat consistentie kelderen en error rates stijgen. Same-verdict rate is >95% bij temp=0 en zakt tot ~70% bij temp=1 (Stureborg et al.; Haldar & Hockenmaier).
- **Rubric met concrete niveaus**: beschrijf wat een score 5 vs 3 vs 1 betekent per criterium — dit geeft het model een stabiel raamwerk.
- **Few-shot voorbeelden**: voeg voorbeeld-issues mét scores toe (few-shot learning verhoogt betrouwbaarheid en alignment aantoonbaar).
- **Verplicht een rationale/uitleg** naast het oordeel: prompts die uitleg genereren halen consistent hogere consistentie (Kappa) dan alleen een score.
- **Structured JSON output** + validatie.
- **Self-consistency**: draai dezelfde evaluatie meerdere keren (verschillende seeds) en aggregeer; of een multi-judge ensemble.
- **"Cannot determine" toestaan**: laat het model expliciet zeggen dat het niet genoeg info heeft i.p.v. te gokken — dit onderdrukt hallucinaties.
- **Scheid holistisch van component**: coarse 0–5 per criterium + apart 0–10 overall werkt in de praktijk goed.
- **Randomiseer volgorde / maskeer identiteit** bij vergelijkingen om positiebias te verminderen.
- **Domeincontext inbrengen**: geef de LLM de JTBD, persona en het conversiedoel; Zhong toonde dat scenario-context de recall dramatisch verhoogde.

### Deel I — Mapping op de bestaande 7 fasen

| Fase (handmatig) | AI-uitvoering |
|---|---|
| 1. Doelen/KPI's | Mens definieert; LLM helpt KPI-boom en meetplan opstellen |
| 2. Baseline | Volledig automatiseerbaar: Lighthouse/CrUX/axe/crawl + GA4-export → LLM vat samen |
| 3. Research/triangulatie | LLM synthetiseert scans + heatmaps + analytics; **echt gebruikersonderzoek blijft mensenwerk**; synthetische users alleen voor hypothesen |
| 4. Prioritering (ICE/PIE/PXL) | Synthese-agent scoort met rubric; mens keurt goed |
| 5. Build/test | Mens/dev; LLM genereert varianten + testhypothesen |
| 6. Measure | GA4 + A/B via LLM-analyse (SQL-generatie, anomaliedetectie) |
| 7. Iterate | Pijplijn herhaalbaar draaien; vergelijk runs over tijd |

### Mapping op de 9 dimensies

| Dimensie | Automatiseringsgraad | AI-aanpak & caveat |
|---|---|---|
| Strategie/JTBD | Laag | Mens leidt; LLM als sparringpartner/deskresearch |
| UX/Nielsen + cognitive walkthrough | Middel | Multimodale LLM met CoT-pijplijn + rubric; sterk op layout, zwak op interactie/across-screen; **valideer** |
| CRO/LIFT + ResearchXL | Middel | LLM scoort LIFT-factoren op screenshots; hypothesegeneratie uit GA4; 50–75% nauwkeurig → hypothese, geen waarheid |
| Content/5-sec-test | Middel-hoog | LLM-persona 5-sec-test + predictive attention (Attention Insight 92,5–96% correlatie/Brainsight) |
| Visueel/trust | Middel | Sterk punt van vision-LLM's (esthetiek, hiërarchie); trust-signalen detecteerbaar |
| Performance/CWV | Hoog | Volledig: Lighthouse CI + CrUX; LLM synthetiseert |
| Toegankelijkheid/WCAG 2.2 AA | Middel-hoog voor detectie | axe-core (30–57% WCAG) + LLM-laag (→55–60%); rest mensenwerk |
| SEO | Hoog | Screaming Frog + AI-prompts/embeddings; LLM prioriteert |
| Analytics/GA4 + Clarity/Hotjar | Hoog voor analyse | LLM-connector, natuurlijke-taal-queries; cross-check verplicht |

### Deel J — Praktische playbooks

**Playbook 1 — Solo-consultant, 30–60 min, gratis tools:**
1. (5 min) Definieer doel/KPI en primaire persona/JTBD — schrijf dit op, geef het straks aan de LLM.
2. (10 min) Draai **PageSpeed Insights** (mobiel + desktop) en **axe DevTools** op 3–5 kernpagina's (home, categorie/dienst, product/detail, checkout/contact). Noteer scores.
3. (5 min) Maak **screenshots** per breakpoint (browser dev tools, mobiel + desktop) van dezelfde pagina's.
4. (20 min) Voer per pagina een **multimodale prompt** uit in Claude/GPT: plak screenshot + geef de persona/JTBD + een **rubric** (Nielsen 10 + LIFT), vraag om JSON met {issue, dimensie, severity 0–4, bewijs, aanbeveling, confidence}, temperatuur laag, en instrueer "minstens 2 issues per heuristiek, markeer onzekerheid als cannot-determine". Draai 2–3× voor consistentie.
5. (10 min) Laat de LLM alles **dedupliceren en prioriteren met ICE**; plak de PageSpeed/axe-bevindingen erbij zodat technische en UX-issues samen geprioriteerd worden.
6. (10 min) **Menselijke validatie**: loop de top-10 door, schrap plausibel-klinkende onzin (component-misherkenning, conventie-fouten), en label elke overgebleven aanbeveling als hypothese-te-testen.

**Playbook 2 — Geautomatiseerde pijplijn (gescript):**
- Node/Python-script: Playwright crawlt + maakt screenshots per breakpoint; `@lhci/cli` draait Lighthouse; `@axe-core/playwright` draait axe; Screaming Frog CLI voor SEO + AI-prompts.
- Alle JSON + screenshots → per dimensie een LLM-call met vaste rubric + few-shot, structured output (Pydantic-validatie), self-consistency 3 runs.
- Synthese-agent (sterker model) dedupliceert, lost conflicten op, scoort ICE, genereert rapport (Markdown/HTML).
- CI-integratie: draai bij elke deploy, vergelijk runs over tijd, faal de build bij regressies (Lighthouse assertions `minScore`, axe violation-drempels).
- Human-in-the-loop review vóór aanbevelingen naar de klant/backlog gaan.

---

## Recommendations

**Fase 1 — Nu starten (week 1):** Bouw Playbook 1 in als standaard eerste-pass. Gebruik AI om de *sjouw* (meten, samenvatten, eerste issue-lijst) te versnellen, nooit als eindoordeel. Drempel die dit verandert: zodra je >2 audits/week doet, ga naar Fase 2.

**Fase 2 — Semi-automatiseren (maand 1–2):** Script de technische lagen (Lighthouse CI + axe + crawl) en de screenshot-collectie. Voeg de LLM-syntheselaag toe met een vaste rubric per dimensie, low-temp, structured JSON, self-consistency. Drempel: als de LLM-output betrouwbaar >70% nuttige, niet-hallucinerende issues geeft over 10+ sites, breid uit naar meer dimensies.

**Fase 3 — Multi-agent pijplijn (kwartaal):** Alleen als volume het rechtvaardigt (kostenexplosie-risico). Maker-checker-patroon, per-agent kostenmonitoring, begrensde budgetten. Meet je eigen nauwkeurigheid tegen een golden set van mens-geauditeerde sites — publiceer die intern zoals Baymard dat extern doet.

**Altijd:**
- **Human-in-the-loop is niet onderhandelbaar** voor commerciële sites. Baymard's rekensom: de kosten van één verkeerd geïmplementeerd advies overtreffen de besparing van het overslaan van validatie ruimschoots.
- **Label alles**: AI-hypothese vs geobserveerd feit vs getest resultaat.
- **Gebruik AI voor waarneming/classificatie/synthese, niet voor het finale "goed/slecht"-oordeel** tenzij gevalideerd — de UX-Ray-les.
- **Eis nauwkeurigheidsdocumentatie** van elke commerciële AI-UX-tool die je inkoopt; onder 95% of ongedocumenteerd = niet veilig voor productie.

---

## Caveats

- **De markt beweegt snel.** UX-Ray ging in ~8 maanden van 39 naar 154 heuristieken op 95% nauwkeurigheid (Nielsen-analyse: een verbetering van ~3,95× — grofweg verdubbeling elke 4 maanden); Jakob Nielsen speculeert dat algemene heuristische evaluatie mogelijk pas eind 2028 "gekraakt" is. Behandel alle nauwkeurigheidscijfers als momentopnames.
- **Vendor-claims zijn deels marketing.** De "tot 96%" van Attention Insight en de "95%" van Baymard komen van de leveranciers zelf; Baymard publiceert wel ruwe testdata (79 sites, line-by-line), Attention Insight's cijfer is een statistische correlatie op de MIT saliency benchmark (92,5% general images), geen perfecte voorspelling per gebruiker. Sommige computer-use-benchmarkclaims (bv. "Coasty 82%") komen van commerciële blogs met een belang — behandel met scepsis; de OSWorld-cijfers van OpenAI/Anthropic zijn de betrouwbaarder referentie.
- **De twee kernstudies zijn preprints.** Guerino et al. is peer-reviewed (INTERACT 2025, Springer LNCS 16110); Zhong et al. is een v1-preprint met nog ACM-placeholder-boilerplate — de data zijn compleet en intern consistent, maar het is vroeg werk.
- **De 73–77% van Zhong is geen "AI verslaat mensen"-vrijbrief.** Die score is dekking van een master-set die deels uit de AI-output is opgebouwd, met een sterk geëngineerde pijplijn en op mobiele apps — niet direct generaliseerbaar naar een enkele prompt op een complexe website.
- **WCAG-automatiseringsplafond is structureel.** Geen enkel model tilt axe-core's 30–57% naar 100%; het restant vereist menselijk oordeel en echte assistive-tech-tests. De European Accessibility Act (handhaving sinds juni 2025) maakt dit een juridisch, niet alleen technisch, punt.
- **Kosten schalen niet-lineair** in multi-agent pijplijnen; test op kleine schaal en begrens budgetten voordat je opschaalt.