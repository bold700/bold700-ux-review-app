# Firestore-regels (volledig)

De rules beheer je in de Firebase console:
**https://console.firebase.google.com/project/bold700-ux-reviews/firestore/rules**
→ tab **Rules** → plak onderstaande → **Publiceren**.

De enige toevoeging t.o.v. de v1-rules is één `allow update`-blok in de
**projects**-sectie (developer-handoff): op een gedeeld (public), niet-verlopen
rapport mag iedereen — ook zonder login — **uitsluitend** het veld `devStatus`
wijzigen (afvinken + notities). Al het andere blijft vergrendeld.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // ── Users collection ──
    match /users/{userId} {
      allow create: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow read, write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Projects collection ──
    match /projects/{projectId} {
      allow create: if request.auth != null;
      // Publiek gedeelde rapporten: alleen als gedeeld én link nog niet verlopen (7 dagen)
      allow read: if resource.data.public == true
        && (!('shareExpiresAtMs' in resource.data) || request.time.toMillis() < resource.data.shareExpiresAtMs);

      // Developer-handoff: afvinken/notities zonder login op een gedeeld, niet-verlopen
      // rapport. Alleen het devStatus-veld mag wijzigen — al het andere blijft vergrendeld.
      allow update: if resource.data.public == true
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['devStatus'])
        && (!('shareExpiresAtMs' in resource.data) || request.time.toMillis() < resource.data.shareExpiresAtMs);

      allow read: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        resource.data.assignedTo == request.auth.uid
      );
      allow update: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        resource.data.assignedTo == request.auth.uid
      );
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
      allow read, write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Leads collection (landingspagina-aanmeldingen) ──
    match /leads/{id} {
      // Aanmelden vanaf de publieke landingspagina (anoniem ingelogd).
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
      // De aanvrager mag zijn eigen lead bijwerken (scanstatus/score tijdens scan).
      allow update: if request.auth != null
        && resource.data.userId == request.auth.uid;
      // Beheerder (Kenny): volledige toegang.
      allow read, write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Auditor Applications collection ──
    match /auditor_applications/{userId} {
      allow create, read, update: if request.auth != null && request.auth.uid == userId;
      allow read, write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Site Benchmarks collection ──
    match /site_benchmarks/{siteId} {
      allow read, write: if request.auth != null;
    }

    // ── Benchmarks (publiek leesbaar, voor de per-site vergelijking in rapporten) ──
    match /benchmarks/{id} {
      allow read: if true;
      allow write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Config collection ──
    match /config/{configId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## NOG TE PUBLICEREN: twee gaten (gemeten 2026-08-15)

De landingspagina logt bezoekers **anoniem** in. Daarmee voldoen zij aan
`request.auth != null`, en dat is in twee collecties de enige eis. Getest vanaf
buiten met een verse anonieme login:

| Collectie | Anonieme bezoeker kan | Gemeten |
|---|---|---|
| `site_benchmarks` | lezen **en schrijven** | HTTP 200 op beide |
| `config` | lezen | HTTP 200 |

Schrijfrechten voor willekeurige bezoekers op je benchmarkdata betekent dat
iemand die kan wissen of vervalsen. Vervang die twee blokken door:

```
    // ── Site Benchmarks (v1-restant, alleen beheer) ──
    match /site_benchmarks/{siteId} {
      allow read, write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Config: lezen alleen met een echt account, schrijven alleen beheer ──
    match /config/{configId} {
      allow read: if request.auth != null
        && request.auth.token.firebase.sign_in_provider != 'anonymous';
      allow write: if request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
```

Dit breekt niets: `site_benchmarks` wordt nergens meer in de app gebruikt en
`config` alleen op de insights-pagina, die al achter beheer zit. De
landingspagina leest `benchmarks/global`, en dat blok blijft publiek.

Controleer na het publiceren dat de landingspagina nog laadt en dat de
insights-pagina zijn samenvatting nog toont.

---

## Let op: dit bestand loopt achter

De collecties `siteFeedback` en `websiteLeads` staan hier niet in, terwijl de
bijbehorende dashboards wél werken. De console heeft dus nieuwere regels dan dit
document. **Kopieer altijd eerst wat er in de console staat** voordat je hier iets
uit plakt, anders draai je die regels terug.

## Feedback-pins (`siteFeedback`)

Schrijven gaat via de Cloudflare Worker met een service-account, dus dat valt
buiten de regels. Regels gelden alleen voor lezen en bijwerken vanuit de app.

Vandaag: alleen admins lezen alle pins.

```
match /siteFeedback/{id} {
  allow read, write: if request.auth != null
    && exists(/databases/$(database)/documents/users/$(request.auth.uid))
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

### Fase "eigen pins zien"

Elke pin krijgt sinds augustus 2026 een `authorId` (stabiel per browser of
extensie) en een `userId` (gevuld zodra de plaatser een account heeft). Zodra
accounts hun eigen pins mogen zien, komt hier dit blok bij:

```
  allow read: if request.auth != null && resource.data.userId == request.auth.uid;
```

Koppelen van bestaande pins aan een nieuw account gaat via `authorId`: bij het
aanmelden schrijf je zijn `authorId` op de gebruiker en zet je `userId` op de
pins die daarbij horen. Dat is een eenmalige actie, het beste vanuit de Worker.

### Fase "alle pins van jouw website" (betaald)

Elke pin heeft ook een `site` (het domein zonder `www.`). Die query wordt dan
`where site == <domein>`. Dat mag pas nadat is bewezen dat het domein van die
gebruiker is, bijvoorbeeld met een DNS-TXT-record of een bestand op de site. Leg
dat vast in een aparte collectie (`siteOwners/{domein}`) en verwijs daarnaar:

```
  allow read: if request.auth != null
    && exists(/databases/$(database)/documents/siteOwners/$(resource.data.site))
    && get(/databases/$(database)/documents/siteOwners/$(resource.data.site)).data.userId == request.auth.uid;
```

Zonder die verificatie kan iedereen een willekeurig domein claimen en meelezen.
