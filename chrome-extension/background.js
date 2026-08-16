// Achtergrondscript: het enige wat hier gebeurt is een schermopname maken.
// Een content script mag chrome.tabs.captureVisibleTab niet aanroepen, dus
// pin.js vraagt het via een bericht aan deze service worker.
//
// De opname is de ZICHTBARE viewport van het actieve tabblad. Bijsnijden rond
// de pin doet pin.js zelf, want die weet waar geklikt is.

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== "uxpin:capture") return

  const windowId = sender.tab ? sender.tab.windowId : chrome.windows.WINDOW_ID_CURRENT
  chrome.tabs.captureVisibleTab(windowId, { format: "jpeg", quality: 80 }, (dataUrl) => {
    // Mislukken mag: dan gaat de pin gewoon zonder plaatje mee.
    const err = chrome.runtime.lastError
    sendResponse({ dataUrl: err ? null : dataUrl, error: err ? err.message : null })
  })

  return true // antwoord komt asynchroon
})
