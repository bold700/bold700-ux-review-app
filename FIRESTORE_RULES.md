# Firestore-regel voor developer-handoff (afvinken via deel-link)

Zodat een developer via de **openbare deel-link** (zonder login) verbeterpunten
kan afvinken, mag hij op een gedeeld project **alleen** het veld `devStatus`
bijwerken. Voeg deze `allow update`-clausule toe binnen
`match /databases/{db}/documents/projects/{id} { ... }`.

Firestore combineert meerdere `allow`-regels met OR, dus je bestaande
owner/admin-regels blijven gewoon werken.

```
match /databases/{database}/documents {
  match /projects/{id} {

    // ... je bestaande read / create / update / delete regels ...

    // Developer-handoff: afvinken zonder login op een gedeeld, niet-verlopen
    // rapport. Alleen het devStatus-veld mag wijzigen.
    allow update: if resource.data.public == true
      && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['devStatus'])
      && (
        !('shareExpiresAtMs' in resource.data)
        || request.time.toMillis() < resource.data.shareExpiresAtMs
      );
  }
}
```

Plakken in de Firebase console onder **Firestore Database → Rules → Publiceren**.
