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
