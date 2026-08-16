# Firestore-regels

Beheren in de Firebase console:
**https://console.firebase.google.com/project/bold700-ux-reviews/firestore/rules**
→ tab **Rules** → alles vervangen door onderstaande → **Publiceren**.

Dit blok dekt **alle negen collecties** die in gebruik zijn. Laat er één weg en
het bijbehorende scherm valt om met "Missing or insufficient permissions".

| Collectie | Waarvoor | Wie mag wat |
|---|---|---|
| `users` | rollen | jezelf lezen/schrijven, admin alles |
| `projects` | reviews | eigenaar/toegewezene, publiek gedeeld rapport leesbaar |
| `leads` | landingspagina-aanmeldingen | anoniem aanmelden, admin alles |
| `bold700Leads` | advies-tool op bold700.com | **iedereen aanmelden**, admin alles |
| `siteFeedback` | feedback-pins | **iedereen een pin plaatsen**, admin alles |
| `auditor_applications` | aanmeldingen auditors | jezelf, admin alles |
| `site_benchmarks` | v1-restant | alleen admin |
| `benchmarks` | cijfers in rapport/landing | publiek leesbaar, admin schrijft |
| `config` | instellingen + insights | met echt account leesbaar, admin schrijft |

Twee dingen om te weten voordat je iets aanscherpt:

**bold700.com heeft geen login.** De qualifier-tool en de feedback-pins schrijven
daar zonder enige authenticatie. Vandaar `allow create: if true` op
`bold700Leads` en `siteFeedback`, met een groottecontrole zodat het geen
open opslag wordt. Lezen mag daar juist niemand, alleen beheer.

**De landingspagina van de review-tool logt anoniem in.** Iedereen voldoet dus aan
`request.auth != null`. Gebruik die voorwaarde nooit als enige bescherming; voor
echte accounts staat er een check op `sign_in_provider`.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ── Gebruikers ──
    match /users/{userId} {
      allow create, read, update: if request.auth != null && request.auth.uid == userId;
      allow read, write: if isAdmin();
    }

    // ── Reviews ──
    match /projects/{projectId} {
      allow create: if request.auth != null;

      // Publiek gedeeld rapport: alleen als gedeeld én de link nog niet verlopen is.
      allow read: if resource.data.public == true
        && (!('shareExpiresAtMs' in resource.data) || request.time.toMillis() < resource.data.shareExpiresAtMs);

      // Developer-handoff: afvinken zonder login op een gedeeld rapport.
      // Uitsluitend het veld devStatus mag wijzigen.
      allow update: if resource.data.public == true
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['devStatus'])
        && (!('shareExpiresAtMs' in resource.data) || request.time.toMillis() < resource.data.shareExpiresAtMs);

      allow read, update: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        resource.data.assignedTo == request.auth.uid
      );
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
      allow read, write: if isAdmin();
    }

    // ── Aanmeldingen landingspagina (anoniem ingelogd) ──
    match /leads/{id} {
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null
        && resource.data.userId == request.auth.uid;
      allow read, write: if isAdmin();
    }

    // ── Website-leads uit de advies-tool op bold700.com (geen login daar) ──
    match /bold700Leads/{id} {
      allow create: if request.resource.data.email is string
        && request.resource.data.email.size() < 200
        && request.resource.data.name is string
        && request.resource.data.name.size() < 200;
      allow read, write: if isAdmin();
    }

    // ── Feedback-pins: van bold700.com (geen login) en van klantsites (via
    //    de Worker, die met een service-account schrijft en dus langs deze
    //    regels gaat). Lezen doet alleen beheer. ──
    match /siteFeedback/{id} {
      allow create: if request.resource.data.text is string
        && request.resource.data.text.size() > 0
        && request.resource.data.text.size() < 2000;
      allow read, write: if isAdmin();
    }

    // ── Aanmeldingen auditors ──
    match /auditor_applications/{userId} {
      allow create, read, update: if request.auth != null && request.auth.uid == userId;
      allow read, write: if isAdmin();
    }

    // ── Site-benchmarks (v1-restant, app gebruikt dit niet meer) ──
    match /site_benchmarks/{siteId} {
      allow read, write: if isAdmin();
    }

    // ── Benchmarks: publiek leesbaar voor de vergelijking in rapport en landing ──
    match /benchmarks/{id} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // ── Config: lezen alleen met een echt account, niet anoniem ──
    match /config/{configId} {
      allow read: if request.auth != null
        && request.auth.token.firebase.sign_in_provider != 'anonymous';
      allow write: if isAdmin();
    }
  }
}
```

## Wat er veranderd is (2026-08-16)

- **`siteFeedback` en `bold700Leads` toegevoegd.** Die ontbraken, waardoor
  Site-feedback en Website-leads na publiceren omvielen.
- **`site_benchmarks` was `if request.auth != null`**, en omdat de landingspagina
  anoniem inlogt kon elke bezoeker die data lezen **en overschrijven**. Nu alleen
  beheer.
- **`config` was leesbaar voor anonieme bezoekers.** Nu alleen met een echt account.
- `isAdmin()` als functie, in plaats van dezelfde drie regels acht keer.

## Na het publiceren controleren

1. `/site-feedback` en `/website-leads` laden weer
2. De landingspagina laadt (die leest `benchmarks/global`)
3. Een pin plaatsen op bold700.com werkt nog
4. `/insights` toont zijn samenvatting

## Later, bij "eigen pins zien"

Elke pin draagt `authorId` (stabiel per browser/extensie) en `userId`. Zodra
accounts hun eigen pins mogen zien komt hierbij:

```
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
```

Koppelen van bestaande pins aan een nieuw account gaat via `authorId`: bij het
aanmelden zijn `authorId` op de gebruiker schrijven en `userId` op de bijbehorende
pins zetten, het beste vanuit de Worker.

Voor de betaalde stap "alle pins van jouw website" draagt elke pin ook `site`
(het domein). Dat mag pas nadat bewezen is dat het domein van die gebruiker is,
bijvoorbeeld met een DNS-TXT-record. Leg dat vast in `siteOwners/{domein}`:

```
      allow read: if request.auth != null
        && exists(/databases/$(database)/documents/siteOwners/$(resource.data.site))
        && get(/databases/$(database)/documents/siteOwners/$(resource.data.site)).data.userId == request.auth.uid;
```

Zonder die verificatie claimt de eerste de beste een willekeurig domein en leest
hij mee.
