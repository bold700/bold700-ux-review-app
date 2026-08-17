// Achtergrondscript. Twee taken:
//   1. Een schermopname maken (een content script mag captureVisibleTab niet).
//   2. Je account bijhouden: de app geeft eenmalig een vernieuwingstoken door,
//      en hier wisselen we dat in voor een vers token wanneer dat nodig is.
//
// Zo hoef je nergens een sleutel over te typen en tellen al je computers als
// dezelfde gebruiker: de pin draagt je account-id, niet het apparaat.

const FIREBASE_API_KEY = "AIzaSyDPQdEZk574PO7ft7aHTSPjzxwgSXFtf-o" // publiek, hoort zo
const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`

// ── Account ────────────────────────────────────────────────

async function getAccount() {
  const { account } = await chrome.storage.local.get("account")
  return account || null
}

async function setAccount(account) {
  await chrome.storage.local.set({ account })
}

/** Geldig id-token, ververst als het bijna verlopen is. Null = niet gekoppeld. */
async function getIdToken() {
  const acc = await getAccount()
  if (!acc || !acc.refreshToken) return null

  // Een minuut marge, zodat een token niet onderweg verloopt.
  if (acc.idToken && acc.expiresAtMs > Date.now() + 60000) return acc.idToken

  const res = await fetch(REFRESH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(acc.refreshToken)}`,
  })
  if (!res.ok) {
    // Ingetrokken of verlopen: koppeling weggooien, dan vraagt de popup opnieuw.
    await chrome.storage.local.remove("account")
    return null
  }
  const j = await res.json()
  await setAccount({
    ...acc,
    refreshToken: j.refresh_token || acc.refreshToken,
    idToken: j.id_token,
    expiresAtMs: Date.now() + Number(j.expires_in || 3600) * 1000,
  })
  return j.id_token
}

// ── Koppelen vanuit de app ─────────────────────────────────
// De app-pagina stuurt het vernieuwingstoken van je ingelogde sessie. Dat mag
// alleen vanaf de origins in "externally_connectable" in het manifest.

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== "uxpins:link") return

  const acc = {
    refreshToken: msg.refreshToken,
    email: msg.email || "",
    uid: msg.uid || "",
    idToken: msg.idToken || "",
    expiresAtMs: msg.idToken ? Date.now() + 3000000 : 0,
    linkedAtMs: Date.now(),
  }
  if (!acc.refreshToken) {
    sendResponse({ ok: false, error: "geen token meegekomen" })
    return
  }
  setAccount(acc).then(() => sendResponse({ ok: true, email: acc.email }))
  return true
})

// ── Berichten uit de popup en uit pin.js ───────────────────

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg) return

  if (msg.type === "uxpin:capture") {
    const windowId = sender.tab ? sender.tab.windowId : chrome.windows.WINDOW_ID_CURRENT
    chrome.tabs.captureVisibleTab(windowId, { format: "jpeg", quality: 80 }, (dataUrl) => {
      const err = chrome.runtime.lastError
      sendResponse({ dataUrl: err ? null : dataUrl, error: err ? err.message : null })
    })
    return true
  }

  // pin.js vraagt hier een vers token op, vlak voor het versturen.
  if (msg.type === "uxpin:token") {
    getIdToken().then((token) => sendResponse({ token }))
    return true
  }

  if (msg.type === "uxpin:account") {
    getAccount().then((acc) =>
      sendResponse(acc ? { email: acc.email, uid: acc.uid } : null),
    )
    return true
  }

  if (msg.type === "uxpin:unlink") {
    chrome.storage.local.remove("account").then(() => sendResponse({ ok: true }))
    return true
  }
})
