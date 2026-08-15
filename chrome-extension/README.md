# Chrome-extensie — feedback-pins

Zet de feedback-pins aan op **elke** website, ook op sites met een strikte
Content-Security-Policy waar de bookmarklet niets doet. Een content script van
een extensie draait in een eigen wereld en valt niet onder de CSP van de pagina.

## Installeren (eenmalig)

1. Open `chrome://extensions`
2. Zet rechtsboven **Ontwikkelaarsmodus** aan
3. Klik **Uitgepakte extensie laden** en kies deze map
4. Zet hem vast in de werkbalk (het puzzelstukje → speld)

Chrome vraagt niet om toestemming per site: de extensie gebruikt `activeTab`,
dus hij krijgt alleen toegang tot het tabblad waarop jij hem aanklikt.

## Gebruiken

1. Open de site die je reviewt
2. Klik op het extensie-icoon
3. Vul eenmalig de **sleutel** in (dezelfde waarde als `PIN_KEY` in de
   Worker-variabelen). Hij blijft in deze browser staan.
4. Klik **Pins aanzetten**
5. Klik met de rechtermuisknop op de pagina en typ je opmerking

Het veld **Review** mag leeg blijven: de pins komen dan in het project van dat
domein, dat bij de eerste pin vanzelf wordt aangemaakt. Vul je wel een review-id
of review-URL in (`https://uxreviews.bold700.com/review/abc123`), dan gaan ze
naar die bestaande review.

De sleutel is nodig omdat een projectnaam per domein te raden is. Zonder sleutel
kan niemand anders de pins van jouw klanten opvragen.

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
