// Popup: kies eventueel een review en zet de pins aan op het actieve tabblad.
// Het script draait als content script, dus in een eigen wereld: de
// Content-Security-Policy van de site blokkeert het niet.
//
// Wie je bent komt uit je BOLD700-account, niet uit een sleutel. Koppelen doe
// je één keer per browser via de app, waar je toch al ingelogd bent.

const API = "https://bold700uxreview.nova-bold700-6fa.workers.dev"
const APP = "https://uxreviews.bold700.com"

const $project = document.getElementById("project")
const $start = document.getElementById("start")
const $view = document.getElementById("view")
const $status = document.getElementById("status")
const $recent = document.getElementById("recent")
const $account = document.getElementById("account")
const $link = document.getElementById("link")

// Zowel een kaal id als een volledige review-URL mag erin.
function idFrom(value) {
  const s = String(value || "").trim()
  if (!s) return ""
  const m = /\/review\/([^/?#]+)/.exec(s)
  return (m ? m[1] : s).trim()
}

function say(text, kind) {
  $status.textContent = text
  if (kind) $status.setAttribute("data-kind", kind)
  else $status.removeAttribute("data-kind")
}

function ask(type) {
  return new Promise((resolve) => chrome.runtime.sendMessage({ type }, resolve))
}

async function paint() {
  const acc = await ask("uxpin:account")
  if (acc && acc.email) {
    $account.innerHTML = ""
    const who = document.createElement("span")
    who.className = "who"
    who.textContent = acc.email
    const out = document.createElement("button")
    out.className = "linkbtn"
    out.type = "button"
    out.textContent = "ontkoppelen"
    out.addEventListener("click", async () => {
      await ask("uxpin:unlink")
      paint()
    })
    $account.append(who, out)
    $link.hidden = true
    $start.disabled = false
    $view.disabled = false
  } else {
    $account.textContent = "Nog niet gekoppeld aan je account."
    $link.hidden = false
    $start.disabled = true
    $view.disabled = true
  }

  const { lastProject = "", recent = [] } = await chrome.storage.local.get([
    "lastProject",
    "recent",
  ])
  $project.value = lastProject
  $recent.innerHTML = ""
  for (const id of recent.filter((r) => r !== lastProject).slice(0, 4)) {
    const li = document.createElement("li")
    const b = document.createElement("button")
    b.type = "button"
    b.textContent = id
    b.addEventListener("click", () => {
      $project.value = id
      $project.focus()
    })
    li.appendChild(b)
    $recent.appendChild(li)
  }
}

async function remember(id) {
  const { recent = [] } = await chrome.storage.local.get("recent")
  const next = [id, ...recent.filter((r) => r !== id)].slice(0, 5)
  await chrome.storage.local.set({ lastProject: id, recent: next })
}

async function inject(view) {
  // Leeg mag: dan hangt de Worker de pins aan het project van dit domein en
  // maakt hij dat aan als het nog niet bestaat.
  const project = idFrom($project.value)

  $start.disabled = true
  $view.disabled = true
  say("Bezig…")

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab || !tab.id) throw new Error("geen tabblad")
    if (/^(chrome|edge|about|chrome-extension|devtools):/.test(tab.url || "")) {
      throw new Error("Op een pagina van de browser zelf kan dit niet.")
    }

    // Eerst de configuratie in dezelfde (geïsoleerde) wereld zetten, dan het
    // script. pin.js valt terug op window.__UXPIN__ als er geen script-tag is.
    // Het token haalt pin.js zelf op, vlak voor het versturen: dan is het vers.
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (cfg) => {
        window.__UXPIN__ = cfg
        window.__UXPIN_ACTIVE__ = false
      },
      args: [{ project: project || null, api: API, view: !!view }],
    })
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["pin.js"],
    })

    if (project) await remember(project)
    say(view ? "Pins geladen." : "Klaar. Rechtermuisknop op de pagina.", "ok")
    setTimeout(() => window.close(), 900)
  } catch (e) {
    say(String(e && e.message ? e.message : e), "err")
    $start.disabled = false
    $view.disabled = false
  }
}

$start.addEventListener("click", () => inject(false))
$view.addEventListener("click", () => inject(true))
$project.addEventListener("keydown", (e) => {
  if (e.key === "Enter") inject(false)
})
$link.addEventListener("click", () => {
  chrome.tabs.create({ url: `${APP}/extensie` })
  window.close()
})

paint()
