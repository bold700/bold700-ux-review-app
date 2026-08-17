# Chrome-extensie — feedback-pins

Zet de feedback-pins aan op **elke** website, ook op sites met een strikte
Content-Security-Policy waar de bookmarklet niets doet. Een content script van
een extensie draait in een eigen wereld en valt niet onder de CSP van de pagina.

## Op een andere computer

Chrome synchroniseert uitgepakte extensies **niet**, dus dit doe je per machine.
Twee manieren:

- **Met de repo:** `git pull` en de map hieronder laden. Bij elke update daarna
  alleen `git pull` plus het herlaad-icoontje in `chrome://extensions`.
- **Zonder de repo:** download
  https://uxreviews.bold700.com/uxpins-extensie.zip, pak hem uit en laad die
  map. Dat zipje wordt bij elke deploy opnieuw gemaakt, dus hij loopt nooit
  achter. Je sleutel vul je op elke machine één keer in.

## Installeren (eenmalig)

1. Open `chrome://extensions`
2. Zet rechtsboven **Ontwikkelaarsmodus** aan
3. Klik **Uitgepakte extensie laden** en kies deze map
4. Zet hem vast in de werkbalk (het puzzelstukje → speld)
5. Ga naar https://uxreviews.bold700.com/extensie en klik **Koppel de
   extensie**. Daarmee weet hij wie je bent.

Chrome vraagt niet om toestemming per site: de extensie gebruikt `activeTab`,
dus hij krijgt alleen toegang tot het tabblad waarop jij hem aanklikt.

## Gebruiken

1. Open de site die je reviewt
2. Klik op het extensie-icoon
3. Klik **Pins aanzetten**
4. Klik met de rechtermuisknop op de pagina en typ je opmerking

Het veld **Review** mag leeg blijven: de pins komen dan in het project van dat
domein, dat bij de eerste pin vanzelf wordt aangemaakt. Vul je wel een review-id
of review-URL in (`https://uxreviews.bold700.com/review/abc123`), dan gaan ze
naar die bestaande review.

Je account is het bewijs dat je bij die projecten mag. Dat is nodig omdat een
projectnaam per domein te raden is. Het token dat de extensie bewaart wordt elk
uur ververst en is per account in te trekken.

**Meerdere computers:** koppel op elke machine opnieuw. De pins komen bij
dezelfde gebruiker terecht, want ze dragen je account-id, niet je apparaat.

De pins verschijnen live in de review, onder de knop **Pins**.

De pins die al op die pagina staan worden altijd geladen, ook die van iemand
anders. Ze staan onder de knop **Alle opmerkingen** rechtsonder. Afgevinkte pins
worden niet meer getekend.

**Alleen lezen** doet hetzelfde, maar dan kun je niets nieuws plaatsen. Handig
als je het scherm deelt met de klant.

Alt + rechtermuisknop laat het echte browsermenu door, zodat je nog bij
"inspecteren" kunt.

## Werkt niet op

Pagina's van de browser zelf (`chrome://`, de Web Store, andere extensies). Dat
is een beperking van Chrome, niet van dit script.

## Onderhoud

`pin.js` is een kopie van `public/pin.js` — dat bestand is de bron. Na een
wijziging:

```bash
pnpm sync:extension
```

En daarna in `chrome://extensions` op het herlaad-icoon van de extensie klikken.
Verhoog `version` in `manifest.json` als je hem uitdeelt.
