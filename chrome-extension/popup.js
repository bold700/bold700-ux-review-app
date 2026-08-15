// Popup van de extensie: kies het review-project en injecteer pin.js in het
// actieve tabblad. Het script draait als content script, dus in een eigen
// wereld: de Content-Security-Policy van de site blokkeert het niet.

const API = "https://bold700uxreview.nova-bold700-6fa.workers.dev"

const $project = document.getElementById("project")
const $key = document.getElementById("key")
const $start = document.getElementById("start")
const $view = document.getElementById("view")
const $status = document.getElementById("status")
const $recent = document.getElementById("recent")

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

async function load() {
  const {
    lastProject = "",
    recent = [],
    key = "",
  } = await chrome.storage.local.get(["lastProject", "recent", "key"])
  $project.value = lastProject
  $key.value = key
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

// Vast auteur-id voor deze installatie: hetzelfde op elke site, zodat later
// te zien is welke pins van jou zijn.
async function authorId() {
  const { author } = await chrome.storage.local.get("author")
  if (author) return author
  const fresh = crypto.randomUUID()
  await chrome.storage.local.set({ author: fresh })
  return fresh
}

async function remember(id) {
  const { recent = [] } = await chrome.storage.local.get("recent")
  const next = [id, ...recent.filter((r) => r !== id)].slice(0, 5)
  await chrome.storage.local.set({ lastProject: id, recent: next })
}

async function inject(view) {
  // Leeg mag: dan hangt de Worker de pins aan het project van dit domein en
  // maakt hij dat aan als het nog niet bestaat. Daarvoor is wel de sleutel
  // nodig, want zo'n project-id is uit het domein af te leiden.
  const project = idFrom($project.value)
  const key = $key.value.trim()
  if (!project && !key) {
    say("Vul de sleutel in, of een review-id.", "err")
    $key.focus()
    return
  }

  $start.disabled = true
  $view.disabled = true
  say("Bezig…")

  try {
    // Sleutel eerst toetsen bij de Worker. Anders merk je een typefout pas
    // nadat je je opmerking hebt getypt, en ben je hem kwijt.
    if (!project) {
      // Faalt de controle zelf (geen netwerk), dan gaan we gewoon door: liever
      // een pin proberen dan blokkeren op een toets die niet lukte.
      let bad = null
      try {
        const r = await fetch(
          `${API}/pins?site=example.com&k=${encodeURIComponent(key)}`,
        )
        if (r.status === 403) {
          const j = await r.json().catch(() => ({}))
          bad = j.error || "sleutel klopt niet"
        }
      } catch {
        bad = null
      }
      if (bad) throw new Error(bad)
    }

    const author = await authorId()
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab || !tab.id) throw new Error("geen tabblad")
    if (/^(chrome|edge|about|chrome-extension|devtools):/.test(tab.url || "")) {
      throw new Error("Op een pagina van de browser zelf kan dit niet.")
    }

    // Eerst de configuratie in dezelfde (geïsoleerde) wereld zetten, dan het
    // script. pin.js valt terug op window.__UXPIN__ als er geen script-tag is.
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (cfg) => {
        window.__UXPIN__ = cfg
        // Opnieuw injecteren mag: de vorige instantie wordt losgelaten.
        window.__UXPIN_ACTIVE__ = false
      },
      args: [
        { project: project || null, key, author, api: API, view: !!view },
      ],
    })
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["pin.js"],
    })

    await chrome.storage.local.set({ key })
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
for (const el of [$project, $key]) {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") inject(false)
  })
}

load()
