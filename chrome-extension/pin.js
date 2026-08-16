/* ═══════════════════════════════════════════════════════════
   BOLD700 UX Review — feedback-pins op een externe site
   ═══════════════════════════════════════════════════════════
   Zelfstandig script (geen build, geen dependencies) dat op ELKE website
   geladen kan worden. Rechtermuisknop (desktop) of lang indrukken (mobiel)
   plaatst een pin met een opmerking. De pin gaat via de Worker naar Firestore
   en verschijnt live in de review-app.

   Laden kan op vier manieren:
   1. Chrome-extensie (zie chrome-extension/) — werkt ook bij een strikte CSP.
   2. Script-tag (klant plakt hem in zijn site):
        <script src="https://uxreviews.bold700.com/pin.js?p=PROJECTID" defer></script>
   3. Bookmarklet (jij, zonder medewerking van de klant) — zie de review-app.
   4. Console: window.__UXPIN__={project:"..."} en dan dit bestand plakken.

   De pins die al op deze pagina staan worden altijd opgehaald en getekend, ook
   die van anderen. Met #uxpins in de URL (of view:true in de config) sta je in
   bekijkmodus: lijst meteen open, en je plaatst niets nieuws.

   De UI staat in een shadow root, zodat de CSS van de klantsite er niet bij kan
   (en andersom).
   ═══════════════════════════════════════════════════════════ */
;(function () {
  "use strict"

  // Opnieuw geladen (bijvoorbeeld vanuit de Chrome-extensie): eerst de vorige
  // instantie opruimen, anders staan er dubbele luisteraars en twee overlays.
  if (window.__UXPIN_TEARDOWN__) {
    try {
      window.__UXPIN_TEARDOWN__()
    } catch {
      /* de oude instantie mag de nieuwe niet tegenhouden */
    }
  }
  if (window.__UXPIN_ACTIVE__) return
  window.__UXPIN_ACTIVE__ = true

  // Alles wat we aan de pagina toevoegen, zodat we het weer weg kunnen halen.
  var bound = []
  function on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts)
    bound.push([target, type, fn, opts])
  }

  // ── Configuratie ────────────────────────────────────────────
  var DEFAULT_API = "https://bold700uxreview.nova-bold700-6fa.workers.dev"
  var BRAND = "#ff5003"
  var INK = "#14100c"

  function readConfig() {
    var cfg = window.__UXPIN__ || {}
    var src = ""
    try {
      src =
        (document.currentScript && document.currentScript.src) ||
        (function () {
          var all = document.getElementsByTagName("script")
          for (var i = all.length - 1; i >= 0; i--) {
            if (all[i].src && all[i].src.indexOf("pin.js") !== -1)
              return all[i].src
          }
          return ""
        })()
    } catch {
      src = ""
    }
    if (src) {
      try {
        var q = new URL(src, location.href).searchParams
        if (!cfg.project && q.get("p")) cfg.project = q.get("p")
        if (!cfg.api && q.get("api")) cfg.api = q.get("api")
        if (!cfg.label && q.get("l")) cfg.label = q.get("l")
      } catch {
        /* oudere browser: val terug op window.__UXPIN__ */
      }
    }
    // Hash wint, zodat je een bestaande snippet tijdelijk kunt omleiden.
    var m = /[#&]uxpin=([^&]+)/.exec(location.hash)
    if (m) cfg.project = decodeURIComponent(m[1])
    cfg.api = (cfg.api || DEFAULT_API).replace(/\/+$/, "")
    return cfg
  }

  var CFG = readConfig()

  // Zonder project-id draaien we op het domein: de Worker maakt (of hergebruikt)
  // een project voor deze site en geeft het id terug bij de eerste pin.
  var PROJECT = CFG.project || null

  // Bekijkmodus: via de hash (deel-link) of via de config (Chrome-extensie).
  var VIEW_ONLY = /[#&]uxpins\b/.test(location.hash) || CFG.view === true

  // Wie de pin plaatst. De extensie geeft een vast id mee dat over alle sites
  // hetzelfde blijft; een bezoeker via de script-tag krijgt er één per site.
  // Zonder dit kun je later niet zeggen "dit zijn jouw pins".
  var AUTHOR = CFG.author || localAuthor()
  function localAuthor() {
    try {
      var k = "uxpin.author"
      var v = localStorage.getItem(k)
      if (!v) {
        v =
          "a" +
          Date.now().toString(36) +
          Math.random().toString(36).slice(2, 10)
        localStorage.setItem(k, v)
      }
      return v
    } catch {
      return "" // privémodus of localStorage geblokkeerd: dan maar anoniem
    }
  }

  // ── Hulpfuncties ────────────────────────────────────────────

  // Korte, herbruikbare CSS-selector voor het element onder de cursor. Hiermee
  // kan een pin later teruggevonden worden ook als de pagina van hoogte
  // verandert (pixelpositie alleen is te fragiel).
  function selectorFor(el) {
    if (!el || el === document.documentElement) return "html"
    var parts = []
    var node = el
    var depth = 0
    while (node && node.nodeType === 1 && depth < 6) {
      if (node === document.body) {
        parts.unshift("body")
        break
      }
      var part = node.tagName.toLowerCase()
      if (node.id && /^[A-Za-z][\w-]*$/.test(node.id)) {
        parts.unshift("#" + node.id)
        break
      }
      var parent = node.parentNode
      if (parent && parent.nodeType === 1) {
        var same = []
        for (var i = 0; i < parent.children.length; i++) {
          if (parent.children[i].tagName === node.tagName)
            same.push(parent.children[i])
        }
        if (same.length > 1) part += ":nth-of-type(" + (same.indexOf(node) + 1) + ")"
      }
      parts.unshift(part)
      node = parent
      depth++
    }
    return parts.join(" > ")
  }

  function textOf(el) {
    if (!el) return ""
    var t = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim()
    return t.slice(0, 120)
  }

  function docWidth() {
    return Math.max(
      document.documentElement.scrollWidth,
      document.body ? document.body.scrollWidth : 0,
      1,
    )
  }
  function docHeight() {
    return Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0,
      1,
    )
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    })
  }

  // ── Shadow root met alle UI ─────────────────────────────────
  var host = document.createElement("div")
  host.setAttribute("data-uxpin", "")
  host.style.cssText = "all:initial;position:absolute;top:0;left:0;z-index:2147483000"
  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host

  var style = document.createElement("style")
  style.textContent = [
    ":host,*{box-sizing:border-box}",
    ".layer{position:absolute;inset:0;pointer-events:none;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}",
    ".pin{position:absolute;transform:translate(-50%,-100%);pointer-events:auto;cursor:pointer}",
    ".dot{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:999px;border-bottom-left-radius:2px;background:" +
      BRAND +
      ";color:#fff;font:700 12px/1 ui-sans-serif,system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.28);border:2px solid #fff}",
    ".pin[data-focus='1'] .dot{outline:2px solid " + BRAND + ";outline-offset:2px}",
    ".ping{position:absolute;left:50%;bottom:0;width:26px;height:26px;margin-left:-13px;border-radius:999px;background:" +
      BRAND +
      "80;animation:uxping 1.4s cubic-bezier(0,0,.2,1) infinite}",
    "@keyframes uxping{75%,100%{transform:scale(2.2);opacity:0}}",
    ".bub{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:6px;display:none;width:max-content;max-width:240px;background:" +
      INK +
      ";color:#fff;font:400 12px/1.45 ui-sans-serif,system-ui,sans-serif;padding:7px 10px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.3)}",
    ".pin:hover .bub,.pin[data-focus='1'] .bub{display:block}",
    ".chip{position:fixed;right:16px;bottom:16px;pointer-events:auto;display:flex;align-items:center;gap:8px;min-height:44px;padding:10px 14px;border-radius:999px;border:1px solid rgba(0,0,0,.1);background:#fff;color:" +
      INK +
      ";font:500 12px/1 ui-sans-serif,system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.18);cursor:pointer;transition:background .15s ease,color .15s ease}",
    ".chip:hover{background:#f4f4f5}",
    ".chip:focus-visible{outline:2px solid " + BRAND + ";outline-offset:2px}",
    ".chip[data-on='1']{background:" + BRAND + ";border-color:" + BRAND + ";color:#fff}",
    ".chip .badge{display:flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:" +
      BRAND +
      ";color:#fff;font:700 10px/1 ui-sans-serif,system-ui,sans-serif}",
    ".chip[data-on='1'] .badge{background:#fff;color:" + BRAND + "}",
    ".sheet{position:fixed;width:300px;max-width:calc(100vw - 24px);pointer-events:auto;background:#fff;color:" +
      INK +
      ";border:1px solid rgba(0,0,0,.1);border-radius:14px;box-shadow:0 20px 50px rgba(0,0,0,.28);padding:12px;font:400 14px/1.4 ui-sans-serif,system-ui,sans-serif}",
    ".sheet h3{margin:0;font:600 14px/1.2 ui-sans-serif,system-ui,sans-serif;display:flex;align-items:center;gap:6px}",
    ".sheet .head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}",
    ".x{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:0;background:transparent;border-radius:8px;color:rgba(0,0,0,.5);cursor:pointer;font-size:16px}",
    ".x:hover{background:rgba(0,0,0,.06)}",
    ".x:focus-visible{outline:2px solid " + BRAND + ";outline-offset:2px}",
    "textarea,input{width:100%;font:400 14px/1.45 ui-sans-serif,system-ui,sans-serif;color:" +
      INK +
      ";background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:10px;padding:9px 10px;outline:none}",
    "textarea{resize:none}",
    "textarea:focus,input:focus{border-color:" + BRAND + ";box-shadow:0 0 0 3px " + BRAND + "33}",
    ".send{width:100%;min-height:44px;margin-top:8px;border:0;border-radius:10px;background:" +
      BRAND +
      ";color:#fff;font:600 14px/1 ui-sans-serif,system-ui,sans-serif;cursor:pointer;transition:opacity .15s ease}",
    ".send:hover{opacity:.9}",
    ".send:active{transform:scale(.98)}",
    ".send:disabled{opacity:.5;cursor:not-allowed}",
    ".send:focus-visible{outline:2px solid " + INK + ";outline-offset:2px}",
    ".hint{margin:8px 0 0;font:400 11px/1.4 ui-sans-serif,system-ui,sans-serif;color:rgba(0,0,0,.5)}",
    ".panel{position:fixed;left:16px;top:80px;width:290px;max-width:calc(100vw - 32px);max-height:70vh;display:flex;flex-direction:column;pointer-events:auto;background:#fff;color:" +
      INK +
      ";border:1px solid rgba(0,0,0,.1);border-radius:14px;box-shadow:0 20px 50px rgba(0,0,0,.25);overflow:hidden}",
    ".panel .head{padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.08);margin:0}",
    ".panel ul{margin:0;padding:0;list-style:none;overflow-y:auto}",
    ".panel li+li{border-top:1px solid rgba(0,0,0,.06)}",
    ".panel button.item{display:flex;gap:10px;width:100%;padding:10px 12px;border:0;background:transparent;text-align:left;font:400 13px/1.45 ui-sans-serif,system-ui,sans-serif;color:" +
      INK +
      ";cursor:pointer}",
    ".panel button.item:hover{background:rgba(0,0,0,.03)}",
    ".panel button.item[data-focus='1']{background:" + BRAND + "12}",
    ".panel .n{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:1px;border-radius:999px;background:" +
      BRAND +
      ";color:#fff;font:700 10px/1 ui-sans-serif,system-ui,sans-serif}",
    ".place{position:fixed;inset:0;pointer-events:auto;cursor:crosshair;background:rgba(20,16,12,.04)}",
    ".place span{position:fixed;left:50%;top:76px;transform:translateX(-50%);background:" +
      INK +
      ";color:#fff;font:500 13px/1 ui-sans-serif,system-ui,sans-serif;padding:10px 16px;border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.3)}",
    ".toast{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);pointer-events:auto;background:" +
      INK +
      ";color:#fff;font:500 13px/1.4 ui-sans-serif,system-ui,sans-serif;padding:10px 16px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.3)}",
    "@media (prefers-reduced-motion:reduce){.ping{animation:none}*{transition:none!important}}",
  ].join("")
  root.appendChild(style)

  var layer = document.createElement("div")
  layer.className = "layer"
  root.appendChild(layer)

  function mount() {
    ;(document.body || document.documentElement).appendChild(host)
  }
  if (document.body) mount()
  else on(document, "DOMContentLoaded", mount)

  // ── Toestand ────────────────────────────────────────────────
  var pins = [] // { xPct, yPx, text, id }
  var draft = null // { clientX, clientY, pageX, pageY, selector, elText }
  var focus = null
  var placeMode = false
  // In bekijkmodus staat de lijst meteen open; tijdens het reviewen niet, dan
  // wil je de pagina zien en niet een paneel eroverheen.
  var panelOpen = VIEW_ONLY
  var busy = false

  function toast(msg) {
    var el = document.createElement("div")
    el.className = "toast"
    el.textContent = msg
    el.setAttribute("role", "status")
    layer.appendChild(el)
    setTimeout(function () {
      el.remove()
    }, 3000)
  }

  // ── Renderen ────────────────────────────────────────────────
  function render() {
    // Alles behalve de <style> opnieuw opbouwen; de layer is klein genoeg.
    layer.innerHTML = ""

    var w = docWidth()

    pins.forEach(function (p, i) {
      var el = document.createElement("div")
      el.className = "pin"
      el.style.left = (p.xPct / 100) * w + "px"
      el.style.top = p.yPx + "px"
      if (focus === i) el.setAttribute("data-focus", "1")
      el.innerHTML =
        (focus === i ? '<span class="ping"></span>' : "") +
        '<span class="dot">' +
        (i + 1) +
        "</span>" +
        '<span class="bub">' +
        esc(p.text) +
        "</span>"
      el.addEventListener("click", function (e) {
        e.stopPropagation()
        focus = focus === i ? null : i
        render()
      })
      layer.appendChild(el)
    })

    if (draft) renderDraft()
    if (pins.length) renderPanel()
    if (placeMode && !draft) renderPlace()
    if (!VIEW_ONLY && !draft) renderChip()
  }

  function renderChip() {
    var b = document.createElement("button")
    b.className = "chip"
    b.type = "button"
    if (placeMode) b.setAttribute("data-on", "1")
    var isTouch =
      window.matchMedia &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    b.innerHTML =
      '<span aria-hidden="true">✎</span><span>' +
      (placeMode
        ? "Klik op de pagina · annuleer"
        : isTouch
          ? "Feedback geven"
          : "Rechtermuisknop = feedback") +
      "</span>" +
      (pins.length ? '<span class="badge">' + pins.length + "</span>" : "")
    b.addEventListener("click", function () {
      placeMode = !placeMode
      render()
    })
    layer.appendChild(b)
  }

  function renderPlace() {
    var o = document.createElement("div")
    o.className = "place"
    o.innerHTML = "<span>Klik waar je feedback wilt geven</span>"
    o.addEventListener("click", function (e) {
      // Even verbergen zodat we het echte element eronder kunnen bepalen.
      host.style.display = "none"
      var target = document.elementFromPoint(e.clientX, e.clientY)
      host.style.display = ""
      openDraft(e.clientX, e.clientY, e.pageX, e.pageY, target)
    })
    layer.appendChild(o)
  }

  function renderDraft() {
    var s = document.createElement("div")
    s.className = "sheet"
    s.style.left = Math.max(12, Math.min(draft.clientX, window.innerWidth - 312)) + "px"
    s.style.top = Math.max(12, Math.min(draft.clientY, window.innerHeight - 240)) + "px"
    s.innerHTML =
      '<div class="head"><h3><span aria-hidden="true" style="color:' +
      BRAND +
      '">✎</span> Feedback hier</h3>' +
      '<button class="x" type="button" aria-label="Sluiten">✕</button></div>' +
      '<textarea rows="3" placeholder="Wat valt je op hier?" aria-label="Je feedback"></textarea>' +
      '<input type="text" placeholder="Je naam (optioneel)" aria-label="Je naam" style="margin-top:8px">' +
      '<button class="send" type="button" disabled>Verstuur feedback</button>' +
      '<p class="hint">' +
      (draft.elText ? esc(draft.elText.slice(0, 60)) + " · " : "") +
      "⌘/Ctrl + Enter verstuurt</p>"

    var ta = s.querySelector("textarea")
    var name = s.querySelector("input")
    var send = s.querySelector(".send")

    function sync() {
      send.disabled = busy || !ta.value.trim()
      send.textContent = busy ? "Versturen…" : "Verstuur feedback"
    }
    ta.addEventListener("input", sync)
    ta.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault()
        submit(ta.value, name.value, sync)
      }
      e.stopPropagation()
    })
    name.addEventListener("keydown", function (e) {
      e.stopPropagation()
    })
    send.addEventListener("click", function () {
      submit(ta.value, name.value, sync)
    })
    s.querySelector(".x").addEventListener("click", close)

    layer.appendChild(s)
    setTimeout(function () {
      ta.focus()
    }, 20)
  }

  function renderPanel() {
    if (!panelOpen) {
      var b = document.createElement("button")
      b.className = "chip"
      b.type = "button"
      // Tijdens het reviewen staat de plaats-chip al rechtsonder, dus schuift
      // deze knop een rij omhoog.
      if (!VIEW_ONLY) b.style.bottom = "72px"
      b.innerHTML =
        '<span aria-hidden="true">☰</span><span>Alle opmerkingen</span><span class="badge">' +
        pins.length +
        "</span>"
      b.addEventListener("click", function () {
        panelOpen = true
        render()
      })
      layer.appendChild(b)
      return
    }
    var p = document.createElement("div")
    p.className = "panel"
    var items = pins
      .map(function (x, i) {
        return (
          '<li><button class="item" type="button" data-i="' +
          i +
          '"' +
          (focus === i ? ' data-focus="1"' : "") +
          '><span class="n">' +
          (i + 1) +
          "</span><span>" +
          esc(x.text) +
          "</span></button></li>"
        )
      })
      .join("")
    p.innerHTML =
      '<div class="head" style="display:flex;align-items:center;justify-content:space-between">' +
      "<h3>Feedback op deze pagina (" +
      pins.length +
      ")</h3>" +
      '<button class="x" type="button" aria-label="Paneel inklappen">✕</button></div>' +
      "<ul>" +
      items +
      "</ul>"
    p.querySelector(".x").addEventListener("click", function () {
      panelOpen = false
      render()
    })
    p.querySelectorAll("button.item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = Number(btn.getAttribute("data-i"))
        focus = i
        window.scrollTo({
          top: Math.max(0, pins[i].yPx - window.innerHeight / 2),
          behavior: "smooth",
        })
        render()
      })
    })
    layer.appendChild(p)
  }

  // ── Interactie ──────────────────────────────────────────────
  function openDraft(clientX, clientY, pageX, pageY, target) {
    placeMode = false
    draft = {
      clientX: clientX,
      clientY: clientY,
      pageX: pageX,
      pageY: pageY,
      selector: selectorFor(target),
      elText: textOf(target),
    }
    render()
  }

  function close() {
    draft = null
    placeMode = false
    render()
  }

  // ── Schermopname bij de pin ─────────────────────────────────
  // Draait dit script als content script van de extensie, dan kan de
  // achtergrondpagina het zichtbare tabblad vastleggen. We snijden een stuk
  // rond de klik uit en tekenen er een markering op, zodat de ontvanger ziet
  // waar het over gaat. Lukt het niet, dan gaat de pin zonder plaatje mee.
  function captureShot(clientX, clientY, cb) {
    var api = typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage
    if (!api) return cb(null)

    // Onze eigen overlay hoort niet op de foto.
    host.style.display = "none"
    var done = false
    var finish = function (v) {
      if (done) return
      done = true
      host.style.display = ""
      cb(v)
    }
    // Blijft het antwoord uit, dan niet eindeloos wachten.
    var bail = setTimeout(function () {
      finish(null)
    }, 4000)

    try {
      chrome.runtime.sendMessage({ type: "uxpin:capture" }, function (res) {
        clearTimeout(bail)
        if (!res || !res.dataUrl) return finish(null)
        cropShot(res.dataUrl, clientX, clientY, function (out) {
          finish(out)
        })
      })
    } catch {
      clearTimeout(bail)
      finish(null)
    }
  }

  // Uitsnede rond het punt, met een oranje markering erop.
  function cropShot(dataUrl, clientX, clientY, cb) {
    var img = new Image()
    img.onload = function () {
      try {
        // De opname is op schermresolutie, de coördinaten in CSS-pixels.
        var scale = img.width / window.innerWidth
        var cx = clientX * scale
        var cy = clientY * scale
        var w = Math.min(img.width, 900 * scale)
        var h = Math.min(img.height, 560 * scale)
        var sx = Math.max(0, Math.min(img.width - w, cx - w / 2))
        var sy = Math.max(0, Math.min(img.height - h, cy - h / 2))

        // Uitvoer op maximaal 900px breed: leesbaar en klein genoeg.
        var outW = Math.min(900, Math.round(w))
        var outH = Math.round((h / w) * outW)
        var c = document.createElement("canvas")
        c.width = outW
        c.height = outH
        var g = c.getContext("2d")
        g.drawImage(img, sx, sy, w, h, 0, 0, outW, outH)

        // Markering op de plek van de pin, in de uitsnede.
        var mx = ((cx - sx) / w) * outW
        var my = ((cy - sy) / h) * outH
        g.strokeStyle = BRAND
        g.lineWidth = 3
        g.beginPath()
        g.arc(mx, my, 16, 0, Math.PI * 2)
        g.stroke()
        g.fillStyle = BRAND + "33"
        g.fill()

        cb(c.toDataURL("image/jpeg", 0.62))
      } catch {
        cb(null)
      }
    }
    img.onerror = function () {
      cb(null)
    }
    img.src = dataUrl
  }

  function submit(text, name, sync) {
    text = (text || "").trim()
    if (!draft || !text || busy) return
    busy = true
    if (sync) sync()
    captureShot(draft.clientX, draft.clientY, function (shot) {
      send(text, name, sync, shot)
    })
  }

  function send(text, name, sync, shot) {
    var dw = docWidth()
    var body = {
      projectId: PROJECT,
      key: CFG.key || undefined,
      authorId: AUTHOR,
      userId: CFG.user || undefined,
      url: location.href.split("#")[0],
      origin: location.origin,
      path: location.pathname || "/",
      title: document.title || "",
      xPct: (draft.pageX / dw) * 100,
      yPx: Math.round(draft.pageY),
      docWidth: dw,
      docHeight: docHeight(),
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
      selector: draft.selector,
      elementText: draft.elText,
      text: text,
      name: (name || "").trim(),
      shot: shot || undefined,
      userAgent: navigator.userAgent.slice(0, 200),
    }
    var saved = { xPct: body.xPct, yPx: body.yPx, text: text }
    fetch(CFG.api + "/pin", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(body),
    })
      .then(function (r) {
        // Bij een fout de reden van de server meenemen: "ongeldige sleutel"
        // helpt, "kon niet opslaan" niet.
        if (!r.ok) {
          return r
            .json()
            .catch(function () {
              return {}
            })
            .then(function (j) {
              throw new Error(j.error || "fout " + r.status)
            })
        }
        return r.json()
      })
      .then(function (j) {
        // Zonder vast project geeft de Worker het site-project terug; vanaf nu
        // sturen we dat id mee, zodat alles bij elkaar blijft.
        if (!PROJECT && j && j.projectId) PROJECT = j.projectId
        pins.push(saved)
        draft = null
        busy = false
        render()
        toast("Bedankt! Je feedback is doorgestuurd.")
      })
      .catch(function (e) {
        busy = false
        if (sync) sync()
        toast("Niet opgeslagen: " + (e && e.message ? e.message : "onbekende fout"))
      })
  }

  // Rechtermuisknop. Alt ingedrukt = het echte menu van de browser, zodat je
  // altijd nog bij "inspecteren" kunt.
  on(
    document,
    "contextmenu",
    function (e) {
      if (VIEW_ONLY || e.altKey) return
      if (e.composedPath && e.composedPath().indexOf(host) !== -1) return
      e.preventDefault()
      host.style.display = "none"
      var target = document.elementFromPoint(e.clientX, e.clientY)
      host.style.display = ""
      openDraft(e.clientX, e.clientY, e.pageX, e.pageY, target)
    },
    true,
  )

  // Lang indrukken op touch (~450ms zonder bewegen).
  var press = null
  function clearPress() {
    if (press) {
      clearTimeout(press.timer)
      press = null
    }
  }
  on(
    document,
    "touchstart",
    function (e) {
      if (VIEW_ONLY || draft || e.touches.length !== 1) return
      var t = e.touches[0]
      var cx = t.clientX,
        cy = t.clientY,
        px = t.pageX,
        py = t.pageY
      var target = e.target
      press = {
        x: cx,
        y: cy,
        timer: setTimeout(function () {
          press = null
          openDraft(cx, cy, px, py, target)
        }, 450),
      }
    },
    { passive: true },
  )
  on(
    document,
    "touchmove",
    function (e) {
      if (!press) return
      var t = e.touches[0]
      if (Math.abs(t.clientX - press.x) > 10 || Math.abs(t.clientY - press.y) > 10)
        clearPress()
    },
    { passive: true },
  )
  on(document, "touchend", clearPress)
  on(document, "touchcancel", clearPress)

  on(document, "keydown", function (e) {
    if (e.key === "Escape" && (draft || placeMode)) close()
  })

  // Pins staan op documentcoördinaten; bij resize verschuift de breedte.
  var rt = null
  on(window, "resize", function () {
    clearTimeout(rt)
    rt = setTimeout(render, 150)
  })

  // Pins horen bij één pagina. Klik je binnen de site door (ook zonder herladen,
  // zoals in een single-page app), dan moeten de pins van de vorige pagina weg.
  // Peilen is hier betrouwbaarder dan popstate: frameworks vervangen history.
  var lastPath = location.pathname
  var pathTimer = setInterval(function () {
    if (location.pathname === lastPath) return
    lastPath = location.pathname
    pins = []
    focus = null
    draft = null
    render()
    loadPins()
  }, 400)

  // ── Bestaande pins van deze pagina ophalen ──────────────────
  // Gebeurt in beide standen: ook tijdens het reviewen wil je zien wat er al
  // ligt, van jezelf én van anderen. Afgevinkte pins tekenen we niet.
  function loadPins() {
    // De sleutel gaat altijd mee als we er een hebben: een site-project heeft
    // een id dat uit het domein volgt, dus de Worker vraagt er ook naar als we
    // dat id al kennen.
    var u =
      CFG.api +
      "/pins?" +
      (PROJECT
        ? "p=" + encodeURIComponent(PROJECT)
        : // De volledige URL, want bij een gedeelde host (github.io) bepaalt
          // ook de eerste map bij welke site je zit.
          "site=" + encodeURIComponent(location.origin + location.pathname)) +
      (CFG.key ? "&k=" + encodeURIComponent(CFG.key) : "") +
      "&path=" +
      encodeURIComponent(location.pathname || "/")
    fetch(u)
      .then(function (r) {
        return r.json()
      })
      .then(function (j) {
        if (!j || !j.pins || !j.pins.length) return
        var loaded = j.pins
          .filter(function (p) {
            return p.status !== "done"
          })
          .map(function (p) {
            return { xPct: p.xPct, yPx: p.yPx, text: p.text, id: p.id }
          })
        if (!loaded.length) return
        // Wat je in deze sessie al plaatste staat er nog niet bij (de lijst is
        // van vóór je bezoek), dus voegen we die erachter.
        var mine = pins.filter(function (p) {
          return !p.id
        })
        pins = loaded.concat(mine)
        render()
        // Alleen in bekijkmodus naar de eerste pin springen. Tijdens het
        // reviewen is het vervelend als de pagina onder je vandaan scrolt.
        if (!VIEW_ONLY) return
        focus = 0
        render()
        setTimeout(function () {
          window.scrollTo({
            top: Math.max(0, pins[0].yPx - window.innerHeight / 2),
            behavior: "smooth",
          })
        }, 300)
      })
      .catch(function () {
        /* stil falen: de site zelf mag er niet onder lijden */
      })
  }

  // ── Opruimen ────────────────────────────────────────────────
  // Alles wat we aan de pagina hebben gehangen weer weghalen, zodat een tweede
  // injectie schoon begint en de site achterblijft zoals we hem aantroffen.
  window.__UXPIN_TEARDOWN__ = function () {
    bound.forEach(function (b) {
      b[0].removeEventListener(b[1], b[2], b[3])
    })
    bound = []
    clearPress()
    clearTimeout(rt)
    clearInterval(pathTimer)
    if (host.parentNode) host.parentNode.removeChild(host)
    window.__UXPIN_ACTIVE__ = false
    window.__UXPIN_TEARDOWN__ = null
  }

  render()
  loadPins()
})()
