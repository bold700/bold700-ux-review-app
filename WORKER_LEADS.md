# Cloudflare Worker — lead-mails (Resend)

Dit breidt jullie bestaande Worker (de AI-proxy + `/fetch`) uit met:

1. **`POST /lead`** — mailt Kenny direct bij een nieuwe aanmelding.
2. **`scheduled` (cron, elk uur)** — stuurt **23 uur na aanvraag** de scan-mail naar
   de aanvrager (met de persoonlijke noot + expert-review-CTA). **Failsafe:** is de
   scan gefaald, dan gaat er géén mail naar de aanvrager maar een alert naar Kenny.

De front-end roept `POST {AI_PROXY}/lead` al aan bij elke aanmelding, en zet
`deliverAtMs`, `scanStatus`, `score` en `reportUrl` op de lead in Firestore. De
Worker leest die via de Firestore REST-API (service-account).

---

## 1. Eenmalige setup

**a. Anonymous auth aan** (Firebase console → Authentication → Sign-in method →
Anonymous → inschakelen). Zonder dit kan de landingspagina geen lead aanmaken.

**b. Firestore-regels** publiceren (zie `FIRESTORE_RULES.md`, bevat nu ook de
`leads`-collectie).

**c. Resend-account** (gratis): https://resend.com → verifieer een afzenderdomein
(bijv. `bold700.com`) → maak een API-key.

**d. Service-account voor Firestore** (Firebase console → Project settings →
Service accounts → "Generate new private key"). Je hebt hieruit nodig:
`client_email` en `private_key`.

**e. Worker-secrets** (via `wrangler secret put NAAM` of het Cloudflare-dashboard):

```
RESEND_API_KEY        = re_...
MAIL_FROM             = BOLD700 <reviews@bold700.com>   (geverifieerd in Resend)
KENNY_EMAIL           = kenny@bold700.com
FIREBASE_PROJECT_ID   = bold700-ux-reviews
FIREBASE_CLIENT_EMAIL = ...@bold700-ux-reviews.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY  = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
BOOK_URL              = https://cal.com/kenny/ux   (of je reply-/boeklink)
```

**f. Cron** — voeg toe aan `wrangler.toml`:

```toml
[triggers]
crons = ["0 * * * *"]   # elk uur
```

---

## 2. Code — voeg toe aan je bestaande Worker

Zet dit in je Worker-bestand. Sluit de `POST /lead`-route aan in je bestaande
`fetch()`-router, en exporteer een `scheduled()`-handler.

```js
// ─── Router: voeg deze case toe in je bestaande fetch() ───
// if (url.pathname === "/lead" && request.method === "POST") return handleLead(request, env)

async function handleLead(request, env) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  try {
    const { name, email, url, time } = await request.json()
    await sendEmail(env, {
      to: env.KENNY_EMAIL,
      subject: `Nieuwe UX-review aanvraag: ${url}`,
      html: `<h2>Nieuwe lead</h2>
        <p><b>Naam:</b> ${esc(name)}<br>
        <b>E-mail:</b> ${esc(email)}<br>
        <b>Website:</b> <a href="${esc(url)}">${esc(url)}</a><br>
        <b>Aangevraagd:</b> ${esc(time)}</p>
        <p>De automatische scan draait. De aanvrager krijgt over ~23 uur de
        scorecard. Je hebt dus tijd om de site zelf te bekijken. Zet een
        persoonlijke noot in het leads-dashboard om die mee te sturen.</p>`,
    })
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json", ...cors },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...cors },
    })
  }
}

// ─── Cron: 23u-levering + failsafe ───
export default {
  // Behoud je bestaande fetch:
  // async fetch(request, env, ctx) { ... },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(deliverDueLeads(env))
  },
}

async function deliverDueLeads(env) {
  const token = await getAccessToken(env)
  const now = Date.now()
  const leads = await queryDueLeads(env, token, now)

  for (const lead of leads) {
    if (lead.emailedAtMs) continue
    if (lead.scanStatus === "done") {
      await sendEmail(env, {
        to: lead.email,
        subject: `Je UX-review van ${cleanUrl(lead.url)} is klaar`,
        html: applicantHtml(env, lead),
      })
      await patchLead(env, token, lead.id, {
        emailedAtMs: now,
        scanStatus: "sent",
      })
    } else if (lead.scanStatus === "failed") {
      // Failsafe: geen mail naar aanvrager, wel alert naar Kenny.
      await sendEmail(env, {
        to: env.KENNY_EMAIL,
        subject: `⚠️ Scan gefaald — handmatig oppakken: ${lead.url}`,
        html: `<p>De automatische scan voor <b>${esc(lead.name)}</b>
          (${esc(lead.email)}) op <a href="${esc(lead.url)}">${esc(lead.url)}</a>
          is mislukt. Er is <b>geen</b> mail naar de aanvrager gestuurd. Pak de
          review handmatig op.</p>`,
      })
      await patchLead(env, token, lead.id, { emailedAtMs: now })
    }
    // queued/scanning: nog niet klaar → volgende keer opnieuw proberen.
  }
}

function applicantHtml(env, lead) {
  const persoonlijk = lead.note
    ? `<p>${esc(lead.note)}</p>`
    : `<p>Hoi ${esc(lead.name)}, we hebben je website bekeken.</p>`
  return `${persoonlijk}
    <p>Je UX-score voor <b>${cleanUrl(lead.url)}</b> is
    <b style="font-size:20px">${lead.score != null ? lead.score.toFixed(1) : "—"}/10</b>.</p>
    <p><a href="${esc(lead.reportUrl)}"
      style="display:inline-block;background:#ff5003;color:#fff;padding:10px 18px;
      border-radius:8px;text-decoration:none">Bekijk je rapport</a></p>
    <p>Dit is een snelle scan. Een specialist met enterprise-ervaring kan het
    rapport met je doornemen, interpretaties corrigeren en context geven —
    zodat je weet wat écht prioriteit heeft.</p>
    <p><a href="${esc(env.BOOK_URL)}">Plan een gesprek met de specialist</a>
    of beantwoord deze mail.</p>
    <p>— BOLD700</p>`
}

// ─── Firestore REST via service-account ───
async function getAccessToken(env) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const iat = Math.floor(Date.now() / 1000)
  const claim = b64url(
    JSON.stringify({
      iss: env.FIREBASE_CLIENT_EMAIL,
      scope: "https://www.googleapis.com/auth/datastore",
      aud: "https://oauth2.googleapis.com/token",
      iat,
      exp: iat + 3600,
    }),
  )
  const key = await importKey(env.FIREBASE_PRIVATE_KEY)
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${header}.${claim}`),
  )
  const jwt = `${header}.${claim}.${b64url(sig)}`
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  })
  return (await res.json()).access_token
}

async function queryDueLeads(env, token, now) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`
  const body = {
    structuredQuery: {
      from: [{ collectionId: "leads" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "deliverAtMs" },
          op: "LESS_THAN_OR_EQUAL",
          value: { integerValue: String(now) },
        },
      },
      limit: 50,
    },
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const rows = await res.json()
  return (rows || [])
    .filter((r) => r.document)
    .map((r) => ({ id: r.document.name.split("/").pop(), ...decode(r.document.fields) }))
}

async function patchLead(env, token, id, fields) {
  const mask = Object.keys(fields)
    .map((k) => `updateMask.fieldPaths=${k}`)
    .join("&")
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/leads/${id}?${mask}`
  await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: encode(fields) }),
  })
}

// ─── Resend ───
async function sendEmail(env, { to, subject, html }) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: env.MAIL_FROM, to, subject, html }),
  })
}

// ─── Helpers ───
function decode(fields) {
  const o = {}
  for (const [k, v] of Object.entries(fields || {})) {
    if ("stringValue" in v) o[k] = v.stringValue
    else if ("integerValue" in v) o[k] = Number(v.integerValue)
    else if ("doubleValue" in v) o[k] = v.doubleValue
    else if ("booleanValue" in v) o[k] = v.booleanValue
    else if ("nullValue" in v) o[k] = null
  }
  return o
}
function encode(obj) {
  const f = {}
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "number") f[k] = { integerValue: String(v) }
    else if (typeof v === "boolean") f[k] = { booleanValue: v }
    else f[k] = { stringValue: String(v) }
  }
  return f
}
function b64url(input) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input)
  let bin = ""
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}
async function importKey(pem) {
  const body = pem.replace(/\\n/g, "\n").replace(/-----[^-]+-----/g, "").replace(/\s/g, "")
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0))
  return crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  )
}
function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  )
}
function cleanUrl(u) {
  return String(u ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "")
}
```

---

## 3. Testen

1. Publiceer de rules, zet anonymous auth aan, deploy de Worker met de secrets +
   cron.
2. Meld op de landingspagina een testsite aan → Kenny krijgt direct de
   lead-mail; de lead verschijnt in het dashboard met scan-status.
3. Voor de 23u-mail: zet tijdelijk `deliverAtMs` van de test-lead in Firestore op
   een tijd in het verleden, wacht op de volgende cron (of trigger 'm handmatig
   via `wrangler dev --test-scheduled`). De aanvrager-mail moet dan komen.
