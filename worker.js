// ═══════════════════════════════════════════════════════════
// BOLD700 UX Review - Cloudflare Worker
// ═══════════════════════════════════════════════════════════
// 1. POST /            → AI API proxy (AI Actieplan / Auto-Review)
// 2. GET  /fetch?url=  → Page fetcher (Auto-Scan)
// 3. POST /lead        → Mailt Kenny direct bij een nieuwe aanmelding
// 4. scheduled (cron)  → 23u-vertraagde scan-mail + failsafe-alert
//
// Secrets (wrangler secret put NAAM):
//   OPENAI_API_KEY, RESEND_API_KEY, MAIL_FROM, KENNY_EMAIL,
//   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, BOOK_URL
// wrangler.toml:  [triggers]  crons = ["0 * * * *"]
// ═══════════════════════════════════════════════════════════

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // ── POST /scan → headless multi-agent scan (overleeft dichte browser) ──
    if (request.method === 'POST' && url.pathname === '/scan') {
      return handleScan(request, env, ctx, corsHeaders);
    }

    // ── GET /debug → diagnose van elke laag (token/firestore/crawl/psi/ai) ──
    if (request.method === 'GET' && url.pathname === '/debug') {
      return handleDebug(request, env, ctx, corsHeaders);
    }

    // ── POST /lead → notificatie naar Kenny ──
    if (request.method === 'POST' && url.pathname === '/lead') {
      return handleLead(request, env, corsHeaders);
    }

    // ── POST /dev-event → developer stelt vraag / notitie / alles verwerkt ──
    if (request.method === 'POST' && url.pathname === '/dev-event') {
      return handleDevEvent(request, env, corsHeaders);
    }

    // ── POST /send-result → handmatig de resultaten-mail sturen ──
    if (request.method === 'POST' && url.pathname === '/send-result') {
      return handleSendResult(request, env, corsHeaders);
    }

    // ── GET /fetch?url=... → Page fetcher voor Auto-Scan ──
    if (request.method === 'GET' && url.pathname === '/fetch') {
      const targetUrl = url.searchParams.get('url');
      if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      try {
        const pageResp = await fetch(targetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'no-cache',
          },
          redirect: 'follow',
        });
        const html = await pageResp.text();
        return new Response(html, {
          status: pageResp.status,
          headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // ── POST / → AI API proxy (OpenAI) ──
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    try {
      const body = await request.json();
      // De app stuurt Anthropic-stijl: { model, max_tokens, system, messages:[{role, content:[blocks]}] }
      const messages = [];
      if (body.system) messages.push({ role: 'system', content: String(body.system) });
      for (const m of body.messages || []) {
        if (typeof m.content === 'string') {
          messages.push({ role: m.role, content: m.content });
          continue;
        }
        const parts = [];
        for (const b of m.content || []) {
          if (b.type === 'text') parts.push({ type: 'text', text: b.text });
          else if (b.type === 'image') {
            const src = b.source || {};
            const url = src.type === 'base64'
              ? `data:${src.media_type};base64,${src.data}`
              : src.url;
            if (url) parts.push({ type: 'image_url', image_url: { url } });
          }
        }
        messages.push({ role: m.role, content: parts });
      }

      const oaResp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: body.model || 'gpt-4o-mini',
          max_tokens: body.max_tokens || 2000,
          ...(typeof body.temperature === 'number'
            ? { temperature: body.temperature }
            : {}),
          messages,
        }),
      });
      const oa = await oaResp.json();
      if (!oaResp.ok) {
        return new Response(JSON.stringify({ error: oa?.error?.message || 'OpenAI error' }), {
          status: oaResp.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      // Terug naar Anthropic-stijl zodat de app het onveranderd leest.
      const text = oa?.choices?.[0]?.message?.content || '';
      return new Response(JSON.stringify({ content: [{ type: 'text', text }] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },

  // ── Cron: scan-stappen aftrappen + 23u-levering + failsafe ──
  async scheduled(event, env, ctx) {
    // Advance lopende scans één stap (gratis-plan-vriendelijk: korte aanroep).
    ctx.waitUntil(advanceScans(env));
    // 23u-levering; opschonen alleen op het hele uur (niet elke minuut).
    let onHour = true;
    try {
      onHour = new Date(event.scheduledTime).getMinutes() === 0;
    } catch {}
    ctx.waitUntil(deliverDueLeads(env, onHour));
  },
};

// ═══════════════════════════════════════════════════════════
// Headless scan-pijplijn (POST /scan) — DAG 1: verzamelen + meten
// ═══════════════════════════════════════════════════════════
// Draait in de Worker via ctx.waitUntil, zodat de scan de dichte browser
// overleeft. Tekst-only opzet (geen Browser Rendering/screenshots): de
// vision-stappen worden overgeslagen. De volledige 400-checklist zit niet in
// de Worker; deze pijplijn is finding-centric en levert pages + lichte
// measurements + teamLog (Dag 2 voegt de agent-findings + score toe).

const SCAN_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function jsonResp(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

async function handleScan(request, env, ctx, cors) {
  try {
    const { leadId, url } = await request.json();
    if (!leadId || !url) return jsonResp({ error: 'leadId en url vereist' }, 400, cors);
    const projectId = `proj_${Date.now()}_${randId()}`;
    // Zet de scan klaar en trap stap 1 af; de cron doet de rest (één stap per
    // minuut). Fire-and-forget zodat het de dichte browser overleeft.
    ctx.waitUntil(
      setupScan(env, leadId, url, projectId).catch((e) =>
        console.error('setupScan (top-level)', e),
      ),
    );
    return jsonResp({ ok: true, projectId }, 200, cors);
  } catch (e) {
    return jsonResp({ error: String(e) }, 500, cors);
  }
}

// Diagnose: test elke laag los en geef het resultaat als JSON terug.
async function handleDebug(request, env, ctx, cors) {
  const u = new URL(request.url);
  const testUrl = normalizeScanUrl(u.searchParams.get('url') || 'https://example.com');
  const out = { time: new Date().toISOString(), ver: 'keyfix-4' };
  out.clientEmail = String(env.FIREBASE_CLIENT_EMAIL || '(leeg)');
  out.projectIdEnv = String(env.FIREBASE_PROJECT_ID || '(leeg)');

  // Veilige key-diagnose (alleen lengtes/vorm, NOOIT de key-inhoud zelf).
  try {
    const raw = String(env.FIREBASE_PRIVATE_KEY || '');
    const filtered = pemToBase64(raw);
    out.keyInfo = {
      present: raw.length > 0,
      rawLen: raw.length,
      filteredLen: filtered.length,
      mod4: filtered.length % 4,
    };
  } catch {}

  // Manueel één cron-tick draaien (simuleer de stap-machine).
  if (u.searchParams.get('advance') === '1') {
    try {
      await advanceScans(env);
      out.advance = 'ok (zie logs / project-doc)';
    } catch (e) {
      out.advance = 'fout: ' + String((e && e.message) || e);
    }
    return jsonResp(out, 200, cors);
  }

  // 1) Firestore-token
  let token = null;
  try {
    token = await getAccessToken(env);
    out.token = { ok: !!token, len: token ? String(token).length : 0 };
  } catch (e) {
    out.token = { ok: false, error: String((e && e.message) || e) };
  }

  // 2) Firestore schrijven + lezen
  if (token) {
    try {
      const id = `debug-${randId()}`;
      const wrote = await fsPatchProject(env, token, id, {
        id,
        debug: true,
        arr: ['a', 'b'],
        map: { x: 1 },
        at: new Date().toISOString(),
      });
      const chk = await fetch(
        `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/projects/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      out.firestore = { write: wrote, readStatus: chk.status };
      await firestoreDelete(env, token, `projects/${id}`).catch(() => {});
    } catch (e) {
      out.firestore = { ok: false, error: String((e && e.message) || e) };
    }

    // Project opvragen (?project=<id>)
    const pid = u.searchParams.get('project');
    if (pid) {
      try {
        const r = await fetch(
          `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/projects/${pid}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (r.ok) {
          const j = await r.json();
          const p = fsDecodeFields(j.fields || {});
          out.project = {
            scanStep: p.scanStep,
            scanActive: p.scanActive,
            scanTries: p.scanTries,
            pages: (p.pages || []).length,
            measurements: (p.measurements || []).length,
            ruwFindings: (p.ruwFindings || []).length,
            findings: (p.findings || []).length,
            score: p.score,
            teamLog: (p.teamLog || []).map((t) => `${t.stap}:${t.status}`),
          };
        } else {
          out.project = { error: 'niet gevonden', status: r.status };
        }
      } catch (e) {
        out.project = { error: String((e && e.message) || e) };
      }
    }
  }

  // 3) Crawl
  try {
    const pages = await crawlPages(testUrl);
    out.crawl = { ok: pages.length > 0, count: pages.length, urls: pages.map((p) => p.url) };
  } catch (e) {
    out.crawl = { ok: false, error: String((e && e.message) || e) };
  }

  // 4) PageSpeed
  try {
    const psi = await psiFetch(env, testUrl);
    out.psi = psi ? { ok: true, score: psi.score, lcp: psi.lcp } : { ok: false, note: 'geen data/te traag' };
  } catch (e) {
    out.psi = { ok: false, error: String((e && e.message) || e) };
  }

  // 5) OpenAI
  try {
    const r = await callOpenAI(env, {
      model: 'gpt-4o-mini',
      system: 'Antwoord uitsluitend met JSON.',
      user: 'Geef {"ok":true}',
      max_tokens: 20,
    });
    out.ai = { ok: true, sample: String(r.text || '').slice(0, 60) };
  } catch (e) {
    out.ai = { ok: false, error: String((e && e.message) || e) };
  }

  return jsonResp(out, 200, cors);
}

// Verouderd: de monolithische pijplijn (liep vast op gratis-plan-limieten).
// Vervangen door de stap-voor-stap state-machine hieronder. Niet meer gebruikt.
async function runScanPipeline_deprecated(env, leadId, rawUrl) {
  let token;
  try {
    token = await getAccessToken(env);
  } catch (e) {
    console.error('scan: geen Firestore-token', e);
    return;
  }
  if (!token) return;

  const url = normalizeScanUrl(rawUrl);
  const now = Date.now();
  const projectId = `proj_${now}_${randId()}`;
  const lead = await fsGetLead(env, token, leadId).catch(() => null);

  const teamLog = [];
  const pushLog = async (stap, status, samenvatting, ms) => {
    const entry = { stap, status };
    if (samenvatting) entry.samenvatting = samenvatting;
    if (ms != null) entry.ms = ms;
    teamLog.push(entry);
    await fsPatchProject(env, token, projectId, { teamLog }, ['teamLog']).catch(() => {});
  };

  // Project-skelet (rapport/scorecard lezen deze velden).
  await fsPatchProject(env, token, projectId, {
    id: projectId,
    name: cleanUrl(url),
    url,
    urls: [url],
    client: '',
    mode: 'self-service',
    sourceType: 'url',
    userId: lead?.userId ?? null,
    leadEmail: lead?.email ?? '',
    createdAt: new Date(now).toISOString(),
    public: true,
    sharedAt: new Date(now).toISOString(),
    shareExpiresAtMs: now + 60 * 24 * 60 * 60 * 1000,
    scanVersion: 2,
    leadId,
    pages: [],
    measurements: [],
    findings: [],
    teamLog: [],
  }).catch((e) => console.error('scan: skelet', e));
  await patchLead(env, token, leadId, { scanStatus: 'scanning', projectId }).catch(() => {});

  try {
    // ── Daan: kernpagina's ──
    let t0 = Date.now();
    const pages = await crawlPages(url);
    await fsPatchProject(env, token, projectId, { pages: pages.map((p) => p.url) }, ['pages']);
    await pushLog('Site-analyse', pages.length ? 'klaar' : 'fout', `${pages.length} pagina('s) gevonden`, Date.now() - t0);
    if (!pages.length) throw new Error('Geen pagina op te halen');

    // Screenshots: tekst-only opzet → overgeslagen.
    await pushLog('Screenshots', 'overgeslagen', 'tekst-only opzet, geen visuele analyse');

    // ── Teun: metingen (licht DOM + PageSpeed) ──
    t0 = Date.now();
    const measurements = [];
    for (const p of pages) measurements.push(...measureHtml(p.html, p.url));
    const psi = await psiFetch(env, url).catch(() => null);
    if (psi) measurements.push(...psiMeasurements(psi));
    await fsPatchProject(env, token, projectId, { measurements }, ['measurements']);
    await pushLog(
      'Metingen',
      'klaar',
      `${measurements.length} metingen${psi ? ' (incl. PageSpeed)' : ' (PageSpeed niet beschikbaar)'}`,
      Date.now() - t0,
    );

    // ── Het team (Dag 2) ──
    const dossier = {
      url,
      pages: pages.map((p) => ({ url: p.url, text: p.text })),
      measurements,
    };
    const budget = {
      tokens: 0,
      max: Number(env.SCAN_MAX_TOKENS || 150000),
      t0: Date.now(),
      maxMs: Number(env.SCAN_MAX_MS || 240000),
    };
    const overBudget = () => budget.tokens >= budget.max || Date.now() - budget.t0 >= budget.maxMs;

    // Intake (Bram+Jules)
    let briefing = null;
    try {
      t0 = Date.now();
      const r = await runAgent(env, 'intake', dossier, budget);
      briefing = r.data && typeof r.data === 'object' && !Array.isArray(r.data) ? r.data : null;
      if (briefing) briefing.bron = 'aanname';
      await fsPatchProject(env, token, projectId, { briefing: briefing || {} }, ['briefing']);
      await pushLog('Bedrijfsprofiel', briefing ? 'klaar' : 'fout', briefing ? `${briefing.branche || '?'} · doel: ${briefing.doel || '?'}` : '', Date.now() - t0);
    } catch (e) {
      await pushLog('Bedrijfsprofiel', 'fout', String((e && e.message) || e));
    }
    dossier.briefing = briefing;

    // Fleur (eerste indruk) vereist screenshots → overgeslagen in tekst-only opzet.
    await pushLog('Eerste indruk', 'overgeslagen', 'geen screenshots in tekst-only opzet');

    // Specialisten (parallel)
    const specialisten = ['sofie', 'ruben', 'nora', 'timo', 'ans'];
    let ruw = [];
    t0 = Date.now();
    if (!overBudget()) {
      const settled = await Promise.allSettled(
        specialisten.map((r) => runAgent(env, r, dossier, budget)),
      );
      settled.forEach((s, i) => {
        if (s.status === 'fulfilled' && Array.isArray(s.value.data)) {
          for (const f of s.value.data) ruw.push({ ...f, agent: specialisten[i], page: url });
        }
      });
    }
    await pushLog('Specialisten', 'klaar', `${ruw.length} ruwe aandachtspunten`, Date.now() - t0);

    // Vera (kwaliteitscontrole)
    let geschrapt = 0;
    t0 = Date.now();
    if (ruw.length && !overBudget()) {
      try {
        const v = await runAgent(env, 'vera', { ruw, dossier }, budget);
        const verdicts = Array.isArray(v.data) ? v.data : [];
        const byIdx = new Map(verdicts.map((x) => [Number(x.i), x]));
        const kept = [];
        ruw.forEach((f, i) => {
          const vd = byIdx.get(i);
          if (vd && vd.verdict === 'verworpen') {
            geschrapt++;
            return;
          }
          if (vd && vd.verdict === 'onzeker') f.confidence = 'low';
          kept.push(f);
        });
        ruw = kept;
        await pushLog('Kwaliteitscontrole', 'klaar', `${geschrapt} geschrapt, ${ruw.length} bevestigd`, Date.now() - t0);
      } catch (e) {
        ruw = ruw.map((f) => ({ ...f, confidence: 'low', nietGevalideerd: true }));
        await pushLog('Kwaliteitscontrole', 'fout', 'niet gevalideerd; alles gemarkeerd als onzeker');
      }
    }
    await fsPatchProject(env, token, projectId, { geschrapt }, ['geschrapt']);

    // Stef (prioritering + ICE)
    let top = ruw.slice(0, 10);
    t0 = Date.now();
    if (ruw.length && !overBudget()) {
      try {
        const s = await runAgent(env, 'stef', { gecheckt: ruw, briefing }, budget);
        if (Array.isArray(s.data) && s.data.length) top = s.data.slice(0, 10);
      } catch (e) {
        top = [...ruw].sort((a, b) => (Number(b.severity) || 0) - (Number(a.severity) || 0)).slice(0, 10);
      }
    }
    await pushLog('Prioritering', 'klaar', `top ${top.length}`, Date.now() - t0);

    // Lot (klantentaal)
    let findings = top;
    t0 = Date.now();
    if (top.length && !overBudget()) {
      try {
        const l = await runAgent(env, 'lot', { top }, budget);
        if (Array.isArray(l.data)) findings = top.map((f, i) => ({ ...f, ...(l.data[i] || {}) }));
      } catch (e) {
        // val terug op de onvertaalde top
      }
    }
    findings = findings.map((f) => ({ ...f, source: 'ai' }));
    await fsPatchProject(env, token, projectId, { findings }, ['findings']);
    await pushLog('Rapport-tekst', 'klaar', `${findings.length} punten in klantentaal`, Date.now() - t0);

    // Score uit metingen + findings; lead + report bijwerken.
    const score = scoreFromScan(measurements, findings);
    const reportUrl = `${scanOrigin(env)}/report?id=${projectId}`;
    await fsPatchProject(env, token, projectId, { score }, ['score']);
    await patchLead(env, token, leadId, {
      scanStatus: 'done',
      score: score != null ? score : 0,
      projectId,
      reportUrl,
    }).catch(() => {});
    const eur = (budget.tokens / 1000000) * 0.6;
    await pushLog('Klaar', 'klaar', `Score ${score != null ? score.toFixed(1) : '?'}/10 · ~${budget.tokens} tokens · ~€${eur.toFixed(2)}`, Date.now() - budget.t0);
  } catch (e) {
    console.error('scan pipeline', e);
    await patchLead(env, token, leadId, { scanStatus: 'failed' }).catch(() => {});
    await pushLog('Scan', 'fout', String((e && e.message) || e));
  }
}

// ═══════════════════════════════════════════════════════════
// Stap-voor-stap scan-machine (gratis-plan-vriendelijk)
// ═══════════════════════════════════════════════════════════
// Elke stap = één korte Worker-aanroep (één rol/taak). /scan zet de scan klaar
// en doet stap 1; de cron trapt elke minuut de volgende stap af. De voortgang
// staat in het project-document (scanStep/scanActive + tussenresultaten), zodat
// niets in één lange aanroep hoeft — dat omzeilt de tijd-/subrequest-limieten.

const STEP_ORDER = [
  'crawl',
  'psi',
  'intake',
  'sofie',
  'ruben',
  'nora',
  'timo',
  'ans',
  'vera',
  'stef',
  'lot',
  'finalize',
];
function nextStep(s) {
  const i = STEP_ORDER.indexOf(s);
  return i >= 0 && i < STEP_ORDER.length - 1 ? STEP_ORDER[i + 1] : 'done';
}

// Zet een nieuwe scan klaar en doe meteen stap 1 (crawl) voor een snelle start.
async function setupScan(env, leadId, rawUrl, projectId) {
  let token;
  try {
    token = await getAccessToken(env);
  } catch (e) {
    console.error('setupScan: geen token', e);
    return;
  }
  if (!token) return;
  const url = normalizeScanUrl(rawUrl);
  const now = Date.now();
  if (!projectId) projectId = `proj_${now}_${randId()}`;
  const lead = await fsGetLead(env, token, leadId).catch(() => null);

  const skeleton = {
    id: projectId,
    name: cleanUrl(url),
    url,
    urls: [url],
    client: '',
    mode: 'self-service',
    sourceType: 'url',
    userId: lead?.userId ?? null,
    leadEmail: lead?.email ?? '',
    createdAt: new Date(now).toISOString(),
    public: true,
    sharedAt: new Date(now).toISOString(),
    shareExpiresAtMs: now + 60 * 24 * 60 * 60 * 1000,
    scanVersion: 2,
    leadId,
    pages: [],
    pageText: [],
    measurements: [],
    ruwFindings: [],
    topFindings: [],
    findings: [],
    teamLog: [
      { stap: 'Aangemaakt', status: 'klaar', samenvatting: 'scan staat klaar' },
    ],
    scanActive: true,
    scanStep: 'crawl',
    scanTries: 0,
  };
  await fsPatchProject(env, token, projectId, skeleton).catch((e) =>
    console.error('setupScan: skelet', e),
  );
  await patchLead(env, token, leadId, { scanStatus: 'scanning', projectId }).catch(() => {});
  // Stap 1 meteen doen zodat er direct voortgang is (cron doet de rest).
  await runScanStep(env, token, skeleton).catch((e) =>
    console.error('setupScan: stap 1', e),
  );
}

// Cron: trap lopende scans elk één stap verder.
async function advanceScans(env) {
  let token;
  try {
    token = await getAccessToken(env);
  } catch (e) {
    console.error('advanceScans: geen token', e);
    return;
  }
  if (!token) return;
  let scans = [];
  try {
    scans = await queryActiveScans(env, token, 5);
  } catch (e) {
    console.error('advanceScans: query', e);
    return;
  }
  for (const p of scans) {
    await runScanStep(env, token, p).catch((e) =>
      console.error('runScanStep', p.id, e),
    );
  }
}

// Voert één stap uit voor één project en zet scanStep op de volgende.
async function runScanStep(env, token, p) {
  const step = p.scanStep || 'crawl';
  const teamLog = Array.isArray(p.teamLog) ? p.teamLog.slice() : [];
  const log = (stap, status, samenvatting) => ({
    stap,
    status,
    ...(samenvatting ? { samenvatting } : {}),
  });

  // Backstop: nooit eindeloos opnieuw proberen.
  if ((p.scanTries || 0) > 40) {
    teamLog.push(log('Scan', 'fout', 'te veel pogingen, gestopt'));
    await fsPatchProject(env, token, p.id, {
      scanActive: false,
      scanStep: 'failed',
      teamLog,
    });
    await patchLead(env, token, p.leadId, { scanStatus: 'failed' }).catch(() => {});
    return;
  }

  const patch = {};
  let entry = null;
  let next = nextStep(step);

  try {
    if (step === 'crawl') {
      const pages = await crawlPages(p.url);
      if (!pages.length) throw new Error('Geen pagina op te halen');
      const measurements = [];
      for (const pg of pages) measurements.push(...measureHtml(pg.html, pg.url));
      patch.pages = pages.map((x) => x.url);
      patch.pageText = pages.map((x) => ({ url: x.url, text: (x.text || '').slice(0, 5000) }));
      patch.measurements = measurements;
      entry = log('Site-analyse', 'klaar', `${pages.length} pagina('s), ${measurements.length} metingen`);
    } else if (step === 'psi') {
      const psi = await psiFetch(env, p.url).catch(() => null);
      const meas = Array.isArray(p.measurements) ? p.measurements.slice() : [];
      if (psi) meas.push(...psiMeasurements(psi));
      patch.measurements = meas;
      entry = log('Snelheidsmeting', 'klaar', psi ? 'PageSpeed opgehaald' : 'PageSpeed niet beschikbaar');
    } else if (step === 'intake') {
      const dossier = { pages: p.pageText || [], measurements: p.measurements || [] };
      const r = await runAgent(env, 'intake', dossier);
      const briefing =
        r.data && typeof r.data === 'object' && !Array.isArray(r.data)
          ? { ...r.data, bron: 'aanname' }
          : {};
      patch.briefing = briefing;
      entry = log('Bedrijfsprofiel', 'klaar', `${briefing.branche || '?'} · doel: ${briefing.doel || '?'}`);
    } else if (['sofie', 'ruben', 'nora', 'timo', 'ans'].includes(step)) {
      const dossier = {
        pages: p.pageText || [],
        measurements: p.measurements || [],
        briefing: p.briefing,
      };
      const r = await runAgent(env, step, dossier);
      const add = Array.isArray(r.data)
        ? r.data.map((f) => ({ ...f, agent: step, page: p.url }))
        : [];
      patch.ruwFindings = [...(p.ruwFindings || []), ...add];
      entry = log(AGENTS[step].label, 'klaar', `${add.length} aandachtspunten`);
    } else if (step === 'vera') {
      const ruw = p.ruwFindings || [];
      if (!ruw.length) {
        patch.geschrapt = 0;
        entry = log('Kwaliteitscontrole', 'overgeslagen', 'geen bevindingen');
      } else {
        const r = await runAgent(env, 'vera', { ruw, dossier: { pages: p.pageText || [] } });
        const verdicts = Array.isArray(r.data) ? r.data : [];
        const byIdx = new Map(verdicts.map((x) => [Number(x.i), x]));
        let geschrapt = 0;
        const kept = [];
        ruw.forEach((f, i) => {
          const vd = byIdx.get(i);
          if (vd && vd.verdict === 'verworpen') {
            geschrapt++;
            return;
          }
          if (vd && vd.verdict === 'onzeker') f.confidence = 'low';
          kept.push(f);
        });
        patch.ruwFindings = kept;
        patch.geschrapt = geschrapt;
        entry = log('Kwaliteitscontrole', 'klaar', `${geschrapt} geschrapt, ${kept.length} bevestigd`);
      }
    } else if (step === 'stef') {
      const ruw = p.ruwFindings || [];
      let top = ruw.slice(0, 10);
      if (ruw.length) {
        const r = await runAgent(env, 'stef', { gecheckt: ruw, briefing: p.briefing });
        if (Array.isArray(r.data) && r.data.length) top = r.data.slice(0, 10);
      }
      patch.topFindings = top;
      entry = log('Prioritering', 'klaar', `top ${top.length}`);
    } else if (step === 'lot') {
      const top = p.topFindings || [];
      let findings = top;
      if (top.length) {
        const r = await runAgent(env, 'lot', { top });
        if (Array.isArray(r.data)) findings = top.map((f, i) => ({ ...f, ...(r.data[i] || {}) }));
      }
      patch.findings = findings.map((f) => ({ ...f, source: 'ai' }));
      entry = log('Rapport-tekst', 'klaar', `${patch.findings.length} punten in klantentaal`);
    } else if (step === 'finalize') {
      const score = scoreFromScan(p.measurements || [], p.findings || []);
      const reportUrl = `${scanOrigin(env)}/report?id=${p.id}`;
      patch.score = score;
      patch.scanActive = false;
      await patchLead(env, token, p.leadId, {
        scanStatus: 'done',
        score: score != null ? score : 0,
        projectId: p.id,
        reportUrl,
      }).catch(() => {});
      entry = log('Klaar', 'klaar', `Score ${score != null ? score.toFixed(1) : '?'}/10`);
      next = 'done';
    } else {
      next = 'done';
      patch.scanActive = false;
    }
    patch.scanTries = 0;
  } catch (e) {
    // Crawl zonder pagina's = fataal; andere stappen: markeren en doorgaan.
    if (step === 'crawl') {
      teamLog.push(log('Site-analyse', 'fout', String((e && e.message) || e)));
      await fsPatchProject(env, token, p.id, {
        scanActive: false,
        scanStep: 'failed',
        teamLog,
      });
      await patchLead(env, token, p.leadId, { scanStatus: 'failed' }).catch(() => {});
      return;
    }
    entry = log(AGENTS[step] ? AGENTS[step].label : step, 'fout', String((e && e.message) || e));
    patch.scanTries = 0;
  }

  if (entry) teamLog.push(entry);
  patch.teamLog = teamLog;
  patch.scanStep = next;
  await fsPatchProject(env, token, p.id, patch, Object.keys(patch)).catch((e) =>
    console.error('runScanStep: patch', e),
  );
}

async function queryActiveScans(env, token, limit) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'projects' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'scanActive' },
            op: 'EQUAL',
            value: { booleanValue: true },
          },
        },
        limit,
      },
    }),
  });
  const rows = await res.json();
  return (rows || [])
    .filter((r) => r.document)
    .map((r) => ({ id: r.document.name.split('/').pop(), ...fsDecodeFields(r.document.fields) }));
}

function fsDecodeValue(v) {
  if (!v || typeof v !== 'object') return v;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('timestampValue' in v) return v.timestampValue;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(fsDecodeValue);
  if ('mapValue' in v) return fsDecodeFields(v.mapValue.fields || {});
  return null;
}
function fsDecodeFields(fields) {
  const o = {};
  for (const [k, val] of Object.entries(fields || {})) o[k] = fsDecodeValue(val);
  return o;
}

// ── Crawl (Daan) ──
async function crawlPages(homeUrl) {
  const out = [];
  const home = await fetchPageText(homeUrl).catch(() => null);
  if (!home) return out;
  out.push(home);
  let host;
  try {
    host = new URL(home.url).host;
  } catch {
    host = '';
  }
  const links = extractLinks(home.html, home.url).filter((l) => sameHost(l, host));
  const service = pickLink(links, [/dienst/i, /product/i, /aanbod/i, /oplossing/i, /service/i, /\bwerk\b/i, /cases?/i, /portfolio/i]);
  const contact = pickLink(links, [/contact/i, /afspraak/i, /offerte/i, /boek/i, /quote/i, /checkout/i, /winkelwagen/i, /cart/i, /aanvraag/i]);
  for (const l of [service, contact]) {
    if (!l || out.some((p) => p.url === l)) continue;
    const pg = await fetchPageText(l).catch(() => null);
    if (pg) out.push(pg);
    if (out.length >= 3) break;
  }
  return out.slice(0, 3);
}

async function fetchWithTimeout(u, ms, opts = {}) {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), ms);
  try {
    return await fetch(u, {
      ...opts,
      signal: c.signal,
      redirect: 'follow',
      headers: { 'User-Agent': SCAN_UA, Accept: 'text/html,*/*', ...(opts.headers || {}) },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchPageText(u) {
  const r = await fetchWithTimeout(u, 10000);
  if (!r || !r.ok) return null;
  const html = await r.text();
  if (!html || html.length < 200) return null;
  return { url: r.url || u, html, text: htmlToText(html) };
}

function extractLinks(html, base) {
  const out = [];
  const re = /<a\s[^>]*href=["']([^"'#]+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(new URL(m[1], base).toString());
    } catch {
      // ongeldige URL overslaan
    }
  }
  return [...new Set(out)];
}

function sameHost(u, host) {
  try {
    return new URL(u).host === host;
  } catch {
    return false;
  }
}

function pickLink(links, patterns) {
  for (const pat of patterns) {
    const hit = links.find((l) => {
      try {
        return pat.test(new URL(l).pathname);
      } catch {
        return false;
      }
    });
    if (hit) return hit;
  }
  return null;
}

function htmlToText(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Lichte meting (Teun) ──
function mk(id, label, score, note, page) {
  return { id, label, score, note, source: 'measured', page };
}

function measureHtml(html, pageUrl) {
  const out = [];
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]
    ? (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1].replace(/\s+/g, ' ').trim()
    : '';
  out.push(
    !title
      ? mk('title', 'Paginatitel', 'bad', 'Geen paginatitel gevonden.', pageUrl)
      : title.length >= 30 && title.length <= 60
        ? mk('title', 'Paginatitel', 'good', `Titel: "${title.slice(0, 60)}" (${title.length} tekens).`, pageUrl)
        : mk('title', 'Paginatitel', 'ok', `Titel is ${title.length} tekens (ideaal 30-60).`, pageUrl),
  );

  const desc = (html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] || '';
  out.push(
    !desc
      ? mk('meta-desc', 'Meta-omschrijving', 'bad', 'Geen meta-omschrijving.', pageUrl)
      : desc.length >= 50 && desc.length <= 160
        ? mk('meta-desc', 'Meta-omschrijving', 'good', `Meta-omschrijving is ${desc.length} tekens.`, pageUrl)
        : mk('meta-desc', 'Meta-omschrijving', 'ok', `Meta-omschrijving is ${desc.length} tekens (ideaal 50-160).`, pageUrl),
  );

  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  out.push(
    h1 === 1
      ? mk('h1', 'Hoofdkop (H1)', 'good', 'Precies één H1 op de pagina.', pageUrl)
      : h1 === 0
        ? mk('h1', 'Hoofdkop (H1)', 'bad', 'Geen H1-hoofdkop.', pageUrl)
        : mk('h1', 'Hoofdkop (H1)', 'ok', `${h1} H1-koppen (idealiter één).`, pageUrl),
  );

  const lang = (html.match(/<html[^>]*\blang=["']([^"']+)["']/i) || [])[1] || '';
  out.push(
    lang
      ? mk('lang', 'Taal ingesteld', 'good', `Taal: "${lang}".`, pageUrl)
      : mk('lang', 'Taal ingesteld', 'bad', 'De pagina mist een taal-attribuut (lang).', pageUrl),
  );

  const imgs = (html.match(/<img\b[^>]*>/gi) || []);
  if (imgs.length) {
    const noAlt = imgs.filter((t) => !/\balt=/i.test(t)).length;
    out.push(
      noAlt === 0
        ? mk('img-alt', 'Alt-teksten afbeeldingen', 'good', `Alle ${imgs.length} afbeeldingen hebben een alt-tekst.`, pageUrl)
        : mk('img-alt', 'Alt-teksten afbeeldingen', 'bad', `${noAlt} van ${imgs.length} afbeeldingen missen een alt-tekst.`, pageUrl),
    );
  }

  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  out.push(
    viewport
      ? mk('viewport', 'Mobiel geschikt (viewport)', 'good', 'Viewport-tag aanwezig (mobiel geschikt).', pageUrl)
      : mk('viewport', 'Mobiel geschikt (viewport)', 'bad', 'Geen viewport-tag (slecht voor mobiel).', pageUrl),
  );

  out.push(
    /^https:\/\//i.test(pageUrl)
      ? mk('https', 'Beveiligde verbinding (HTTPS)', 'good', 'Pagina draait op HTTPS.', pageUrl)
      : mk('https', 'Beveiligde verbinding (HTTPS)', 'bad', 'Pagina draait niet op HTTPS.', pageUrl),
  );

  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  out.push(
    canonical
      ? mk('canonical', 'Canonical-tag', 'good', 'Canonical-tag aanwezig.', pageUrl)
      : mk('canonical', 'Canonical-tag', 'ok', 'Geen canonical-tag gevonden.', pageUrl),
  );

  const ogTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const ogImage = /<meta[^>]+property=["']og:image["']/i.test(html);
  out.push(
    ogTitle && ogImage
      ? mk('social', 'Deel-voorvertoning (Open Graph)', 'good', 'Open Graph-titel en -afbeelding aanwezig.', pageUrl)
      : mk('social', 'Deel-voorvertoning (Open Graph)', 'ok', 'Open Graph-tags ontbreken deels (minder mooie deel-preview).', pageUrl),
  );

  return out;
}

// ── PageSpeed (Teun) ──
async function psiFetch(env, url) {
  const params = new URLSearchParams({ url, strategy: 'mobile', category: 'performance' });
  if (env.PSI_API_KEY) params.set('key', env.PSI_API_KEY);
  const r = await fetchWithTimeout(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`,
    30000,
  );
  if (!r || !r.ok) return null;
  const j = await r.json();
  const lh = j.lighthouseResult || {};
  const a = lh.audits || {};
  const num = (k) => (a[k] ? a[k].numericValue : undefined);
  const met = j.loadingExperience && j.loadingExperience.metrics;
  const clsPerc = met && met.CUMULATIVE_LAYOUT_SHIFT_SCORE ? met.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile : undefined;
  return {
    score:
      lh.categories && lh.categories.performance && typeof lh.categories.performance.score === 'number'
        ? Math.round(lh.categories.performance.score * 100)
        : null,
    lcp: (met && met.LARGEST_CONTENTFUL_PAINT_MS && met.LARGEST_CONTENTFUL_PAINT_MS.percentile) ?? num('largest-contentful-paint'),
    cls: clsPerc != null ? clsPerc / 100 : num('cumulative-layout-shift'),
    inp: met && met.INTERACTION_TO_NEXT_PAINT ? met.INTERACTION_TO_NEXT_PAINT.percentile : undefined,
    field: !!met,
  };
}

function secStr(ms) {
  return ms == null ? '?' : (ms / 1000).toFixed(1).replace('.', ',') + ' s';
}

function psiMeasurements(psi) {
  const out = [];
  if (psi.score != null) {
    out.push(mk('perf-score', 'Snelheidsscore', psi.score >= 90 ? 'good' : psi.score >= 50 ? 'ok' : 'bad', `PageSpeed-score ${psi.score}/100 (mobiel).`));
  }
  if (psi.lcp != null) {
    const s = psi.lcp < 2500 ? 'good' : psi.lcp < 4000 ? 'ok' : 'bad';
    out.push(mk('lcp', 'Laadtijd (LCP)', s, `LCP ${secStr(psi.lcp)} — streef < 2,5 s ${psi.field ? '(echte gebruikersdata)' : '(labmeting)'}.`));
  }
  if (psi.cls != null) {
    const s = psi.cls < 0.1 ? 'good' : psi.cls < 0.25 ? 'ok' : 'bad';
    out.push(mk('cls', 'Stabiliteit (CLS)', s, `CLS ${psi.cls.toFixed(2).replace('.', ',')} — streef < 0,1.`));
  }
  if (psi.inp != null) {
    const s = psi.inp < 200 ? 'good' : psi.inp < 500 ? 'ok' : 'bad';
    out.push(mk('inp', 'Reactiesnelheid (INP)', s, `INP ${Math.round(psi.inp)} ms — streef < 200 ms.`));
  }
  return out;
}

function scoreFromMeasurements(ms) {
  if (!ms || !ms.length) return null;
  const rank = { good: 10, ok: 6, bad: 3 };
  const vals = ms.map((m) => rank[m.score]).filter((v) => v != null);
  if (!vals.length) return null;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}

// ── Firestore-helpers voor het project-document (rijke encoder) ──
function fsValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'string') return { stringValue: v };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsValue) } };
  if (typeof v === 'object') return { mapValue: { fields: fsFields(v) } };
  return { stringValue: String(v) };
}
function fsFields(obj) {
  const f = {};
  for (const [k, val] of Object.entries(obj || {})) {
    if (val === undefined) continue;
    f[k] = fsValue(val);
  }
  return f;
}

async function fsGetLead(env, token, id) {
  const r = await fetch(
    `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/leads/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!r.ok) return null;
  const j = await r.json();
  return j.fields ? decode(j.fields) : null;
}

async function fsPatchProject(env, token, id, fields, maskKeys) {
  const mask =
    maskKeys && maskKeys.length
      ? '?' + maskKeys.map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join('&')
      : '';
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/projects/${id}${mask}`;
  const r = await fetch(url, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: fsFields(fields) }),
  });
  if (!r.ok) console.error('fsPatchProject', r.status, await r.text().catch(() => ''));
  return r.ok;
}

function normalizeScanUrl(u) {
  let s = String(u || '').trim();
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  return s;
}
function randId() {
  return Math.random().toString(36).slice(2, 8);
}
function scanOrigin(env) {
  return String(env.SITE_ORIGIN || 'https://uxreviews.bold700.com').replace(/\/$/, '');
}

// ═══════════════════════════════════════════════════════════
// Het team (DAG 2) — intake → specialisten → checker → synthese → vertaler
// ═══════════════════════════════════════════════════════════
// Interne rolnamen; in de UI heten het rollen, nooit personen. Elk oordeel is
// een gelabelde hypothese (source "ai"); metingen (source "measured") winnen.

const GROUND =
  'Baseer je UITSLUITEND op de aangeleverde inhoud. Verzin NOOIT knoppen, teksten, secties of elementen die er niet in staan. Citeer letterlijk of schrijf "niet zichtbaar in de inhoud". Twijfel je? Gebruik confidence "low" of laat het punt weg. Antwoord UITSLUITEND met geldige JSON, geen tekst eromheen.';

const SPEC_CONTRACT =
  'Formaat: [{"issue":"1-2 zinnen NL","bewijs":"letterlijk citaat uit de inhoud of \\"niet zichtbaar\\"","severity":0,"confidence":"high|medium|low","aanbeveling":"concreet, NL"}]. Severity 0=triviaal t/m 4=kritiek. Maximaal 6 punten; alleen de belangrijkste.';

function pagesBlock(d) {
  return (d.pages || [])
    .map((p) => `PAGINA ${p.url}:\n"""${String(p.text || '').slice(0, 4000)}"""`)
    .join('\n\n');
}
function measBlock(d) {
  return (d.measurements || []).map((m) => `- ${m.label}: ${m.score} (${m.note})`).join('\n');
}
function briefingBlock(b) {
  if (!b) return '(geen briefing beschikbaar)';
  return `Branche: ${b.branche || '?'}; Aanbod: ${b.aanbod || '?'}; Doelgroep: ${b.doelgroep || '?'}; Conversiedoel: ${b.doel || '?'}.`;
}
function specBuild(focus, sys) {
  return (d) => ({
    system: `${sys} ${GROUND}`,
    user: `Bedrijfscontext (aanname): ${briefingBlock(d.briefing)}\n\nMETINGEN (feiten):\n${measBlock(d)}\n\nINHOUD:\n${pagesBlock(d)}\n\nOPDRACHT: ${focus}\n${SPEC_CONTRACT}`,
  });
}

const AGENTS = {
  intake: {
    label: 'Bedrijfsprofiel',
    model: 'gpt-4o-mini',
    max_tokens: 400,
    build: (d) => ({
      system: `Je leidt uit website-inhoud het bedrijfsprofiel af voor een reviewteam. ${GROUND}`,
      user: `INHOUD:\n${pagesBlock(d)}\n\nGeef JSON: {"branche":"","aanbod":"wat verkopen ze","doelgroep":"wie is de klant","doel":"belangrijkste conversiedoel (bv. offerte/afspraak/aankoop/aanmelding)","belangrijkstePagina":"url","bron":"aanname"}. Alles is een aanname op basis van de tekst.`,
    }),
  },
  sofie: {
    label: 'UX-analyse',
    model: 'gpt-4o-mini',
    max_tokens: 1500,
    build: specBuild(
      'Beoordeel gebruiksgemak: navigatie, duidelijkheid, visuele hiërarchie in de tekststructuur, mobiele indruk (Nielsen-heuristieken).',
      'Je bent UX-specialist.',
    ),
  },
  ruben: {
    label: 'SEO & content',
    model: 'gpt-4o-mini',
    max_tokens: 1500,
    build: specBuild(
      'Beoordeel vindbaarheid en content: koppenstructuur, helderheid van de teksten, sterkte van de waardepropositie, jargon.',
      'Je bent SEO- en contentspecialist.',
    ),
  },
  nora: {
    label: 'Conversie',
    model: 'gpt-4o-mini',
    max_tokens: 1500,
    build: specBuild(
      "Beoordeel conversie: duidelijke actieknoppen, vertrouwenssignalen (reviews, logo's, contactgegevens), formulierfrictie (LIFT-model).",
      'Je bent conversiespecialist.',
    ),
  },
  timo: {
    label: 'Toegankelijkheid',
    model: 'gpt-4o-mini',
    max_tokens: 1200,
    build: specBuild(
      'Beoordeel toegankelijkheid: interpreteer de metingen en wat regels missen (zinvolle alt-teksten, leesvolgorde, labels bij formuliervelden).',
      'Je bent toegankelijkheidsspecialist.',
    ),
  },
  ans: {
    label: 'Doelgroep-blik',
    model: 'gpt-4o-mini',
    max_tokens: 1200,
    build: (d) => ({
      system: `Je bekijkt de site als de doelgroep uit de briefing, niet als expert. ${GROUND}`,
      user: `Jij bent deze bezoeker: ${briefingBlock(d.briefing)}\n\nINHOUD:\n${pagesBlock(d)}\n\nOPDRACHT: als deze bezoeker — snap ik binnen 5 seconden wat ze doen? Vertrouw ik het? Wat weerhoudt me om contact op te nemen of te kopen?\n${SPEC_CONTRACT}`,
    }),
  },
  vera: {
    label: 'Kwaliteitscontrole',
    model: 'gpt-4o',
    max_tokens: 2000,
    build: (d) => ({
      system: `Je bent de kwaliteitscontrole. Voor elke bevinding: staat het genoemde/bekritiseerde element ÉCHT in de aangeleverde inhoud? Verzonnen → verworpen. Twijfel → onzeker. Klopt en aangetoond → bevestigd. ${GROUND}`,
      user: `INHOUD:\n${pagesBlock(d.dossier)}\n\nBEVINDINGEN:\n${(d.ruw || []).map((f, i) => `[${i}] ${f.issue} | bewijs: ${f.bewijs}`).join('\n')}\n\nGeef JSON: [{"i":0,"verdict":"bevestigd|verworpen|onzeker","reden":"kort"}]`,
    }),
  },
  stef: {
    label: 'Prioritering',
    model: 'gpt-4o',
    max_tokens: 2500,
    build: (d) => ({
      system: `Je prioriteert bevindingen voor de klant. Dedupliceer (ook overlap tussen pagina's). Los tegenspraak expliciet op, vat niet zomaar samen. Score met ICE (impact/confidence/effort elk 1-10; score=impact*confidence/effort) t.o.v. het conversiedoel. ${GROUND}`,
      user: `CONVERSIEDOEL: ${briefingBlock(d.briefing)}\n\nBEVINDINGEN:\n${(d.gecheckt || []).map((f, i) => `[${i}] (sev ${f.severity}, conf ${f.confidence}) ${f.issue} → ${f.aanbeveling} | bewijs: ${f.bewijs}`).join('\n')}\n\nGeef de TOP (max 10), gesorteerd op ICE-score aflopend. JSON: [{"issue":"","bewijs":"","severity":0,"confidence":"high|medium|low","aanbeveling":"","ice":{"impact":1,"confidence":1,"effort":1,"score":1}}]`,
    }),
  },
  lot: {
    label: 'Rapport-tekst',
    model: 'gpt-4o-mini',
    max_tokens: 2500,
    build: (d) => ({
      system: `Je herschrijft verbeterpunten naar heldere klantentaal voor een ondernemer zonder technische kennis. Geen jargon of Engelse termen (geen CTA, conversie, bounce, above the fold). ${GROUND}`,
      user: `PUNTEN:\n${(d.top || []).map((f, i) => `[${i}] ${f.issue} | aanbeveling: ${f.aanbeveling}`).join('\n')}\n\nGeef per punt in dezelfde volgorde JSON: [{"titel":"korte titel","watWeZagen":"wat er aan de hand is, gewone taal","waaromKost":"waarom dit klanten kost","watJeDoet":"concreet advies"}]`,
    }),
  },
};

async function callOpenAI(env, { model, system, user, temperature = 0, max_tokens = 2000 }) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model,
      temperature,
      max_tokens,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  const j = await resp.json();
  if (!resp.ok) throw new Error((j && j.error && j.error.message) || `OpenAI ${resp.status}`);
  return { text: (j.choices && j.choices[0] && j.choices[0].message.content) || '', usage: j.usage || {} };
}

function parseJson(text) {
  if (!text) return null;
  const t = String(text).trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  try {
    return JSON.parse(t);
  } catch {}
  const arr = t.match(/\[[\s\S]*\]/);
  if (arr) {
    try {
      return JSON.parse(arr[0]);
    } catch {}
  }
  const obj = t.match(/\{[\s\S]*\}/);
  if (obj) {
    try {
      return JSON.parse(obj[0]);
    } catch {}
  }
  return null;
}

async function runAgent(env, role, dossier, budget) {
  const A = AGENTS[role];
  if (!A) throw new Error('onbekende rol ' + role);
  const { system, user } = A.build(dossier);
  let out = null;
  let usage = {};
  for (let attempt = 0; attempt < 2; attempt++) {
    const r = await callOpenAI(env, {
      model: A.model,
      system,
      user: attempt ? user + '\n\nLET OP: geef UITSLUITEND geldige JSON.' : user,
      max_tokens: A.max_tokens || 2000,
    });
    usage = r.usage;
    if (budget) budget.tokens += usage.total_tokens || 0;
    out = parseJson(r.text);
    if (out) break;
  }
  return { data: out, usage };
}

function scoreFromScan(measurements, findings) {
  const mScore = scoreFromMeasurements(measurements);
  const sevs = (findings || []).map((f) => Number(f.severity) || 0);
  const fScore = sevs.length
    ? Math.max(0, 10 - (sevs.reduce((a, b) => a + b, 0) / sevs.length) * 1.6)
    : null;
  if (mScore != null && fScore != null) return Math.round((mScore * 0.4 + fScore * 0.6) * 10) / 10;
  if (fScore != null) return Math.round(fScore * 10) / 10;
  if (mScore != null) return mScore;
  return 5;
}

// ─────────────────────────────────────────────────────────
// Lead-notificatie (direct)
// ─────────────────────────────────────────────────────────
async function handleLead(request, env, cors) {
  try {
    const { name, email, url, time } = await request.json();

    // 1) Notificatie naar Kenny
    await sendEmail(env, {
      to: env.KENNY_EMAIL,
      subject: `Nieuwe UX-review aanvraag: ${url}`,
      html: `<h2>Nieuwe lead</h2>
        <p><b>Naam:</b> ${esc(name)}<br>
        <b>E-mail:</b> ${esc(email)}<br>
        <b>Website:</b> <a href="${esc(url)}">${esc(url)}</a><br>
        <b>Aangevraagd:</b> ${esc(time)}</p>
        <p>De automatische scan draait. De aanvrager krijgt de scorecard binnen
        een werkdag, dus je hebt tijd om de site zelf te bekijken. Zet eventueel
        een persoonlijke noot in het leads-dashboard om die mee te sturen.</p>`,
    });

    // 2) Ontvangstbevestiging naar de aanvrager
    await sendEmail(env, {
      to: email,
      subject: `We hebben je aanvraag ontvangen`,
      html: `<p>Hoi ${esc(name)},</p>
        <p>Bedankt voor je aanvraag voor een UX-review van
        <b>${cleanUrl(url)}</b>. We hebben je aanvraag ontvangen en gaan er snel
        mee aan de slag.</p>
        <p>Je UX-score en het rapport ontvang je zo snel mogelijk, meestal nog
        binnen een werkdag, in deze inbox.</p>
        <p>Tot snel,<br>BOLD700</p>
        ${optOut()}`,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }
}

// ─────────────────────────────────────────────────────────
// Developer-event (vraag / notitie / alles verwerkt)
// ─────────────────────────────────────────────────────────
async function handleDevEvent(request, env, cors) {
  try {
    const { type, projectName, url, reportUrl, findingTitle, text } =
      await request.json();
    const site = esc(projectName || url || '');
    let subject = '';
    let intro = '';
    if (type === 'question') {
      subject = `Developer heeft een vraag: ${site}`;
      intro = `De developer snapt een punt niet bij <b>${site}</b>:`;
    } else if (type === 'note') {
      subject = `Developer-notitie: ${site}`;
      intro = `De developer liet een notitie achter bij <b>${site}</b>:`;
    } else {
      subject = `Developer heeft alles verwerkt: ${site}`;
      intro = `De developer heeft <b>alle</b> punten van <b>${site}</b> verwerkt.`;
    }
    const detail =
      type === 'all-done'
        ? ''
        : `<p><b>Punt:</b> ${esc(findingTitle || '')}</p>${
            text ? `<p><b>Opmerking:</b> ${esc(text)}</p>` : ''
          }`;
    await sendEmail(env, {
      to: env.KENNY_EMAIL,
      subject,
      html: `<p>${intro}</p>${detail}
        <p><a href="${esc(reportUrl)}">Bekijk het rapport</a></p>`,
    });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }
}

// ─────────────────────────────────────────────────────────
// Handmatig: resultaten-mail sturen (vanuit het leads-dashboard)
// ─────────────────────────────────────────────────────────
async function handleSendResult(request, env, cors) {
  try {
    const lead = await request.json(); // {email,name,url,score,reportUrl,note}
    await sendEmail(env, {
      to: lead.email,
      subject: `Je UX-review van ${cleanUrl(lead.url)} is klaar`,
      html: applicantHtml(env, lead),
    });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...cors },
    });
  }
}

// ─────────────────────────────────────────────────────────
// Cron: due leads afhandelen
// ─────────────────────────────────────────────────────────
async function deliverDueLeads(env, doCleanup = true) {
  let token;
  try {
    token = await getAccessToken(env);
  } catch (e) {
    console.error('CRON: kon geen Firestore-token krijgen (check FIREBASE_* secrets):', e);
    return;
  }
  if (!token) {
    console.error('CRON: geen access token (leeg). Check FIREBASE_CLIENT_EMAIL/PRIVATE_KEY.');
    return;
  }
  const now = Date.now();

  // Bewaartermijn afdwingen: leads ouder dan 12 maanden opschonen (AVG).
  // Alleen op het hele uur, zodat dit niet elke minuut draait.
  if (doCleanup) {
    await cleanupOldLeads(env, token, now).catch((e) =>
      console.error('cleanup fout', e),
    );
  }

  const leads = await queryDueLeads(env, token, now);
  console.log(`CRON: ${leads.length} lead(s) met deliverAtMs <= nu gevonden.`);

  for (const lead of leads) {
    if (lead.emailedAtMs) continue;
    if (lead.scanStatus === 'done') {
      console.log(`CRON: resultaten-mail naar ${lead.email} (${lead.url})`);
      await sendEmail(env, {
        to: lead.email,
        subject: `Je UX-review van ${cleanUrl(lead.url)} is klaar`,
        html: applicantHtml(env, lead),
      });
      await patchLead(env, token, lead.id, { emailedAtMs: now, scanStatus: 'sent' });
    } else if (lead.scanStatus === 'failed') {
      await sendEmail(env, {
        to: env.KENNY_EMAIL,
        subject: `⚠️ Scan gefaald, handmatig oppakken: ${lead.url}`,
        html: `<p>De automatische scan voor <b>${esc(lead.name)}</b>
          (${esc(lead.email)}) op <a href="${esc(lead.url)}">${esc(lead.url)}</a>
          is mislukt. Er is <b>geen</b> mail naar de aanvrager gestuurd. Pak de
          review handmatig op.</p>`,
      });
      await patchLead(env, token, lead.id, { emailedAtMs: now });
    }
    // queued/scanning: nog niet klaar → volgende cron opnieuw.
  }
}

function applicantHtml(env, lead) {
  const persoonlijk = lead.note
    ? `<p>${esc(lead.note)}</p>`
    : `<p>Hoi ${esc(lead.name)}, we hebben je website bekeken.</p>`;
  return `${persoonlijk}
    <p>Je UX-score voor <b>${cleanUrl(lead.url)}</b> is
    <b style="font-size:20px">${lead.score != null ? Number(lead.score).toFixed(1) : 'n.v.t.'}/10</b>.</p>
    <p><a href="${esc(lead.reportUrl)}"
      style="display:inline-block;background:#ff5003;color:#fff;padding:10px 18px;
      border-radius:8px;text-decoration:none">Bekijk je rapport</a></p>
    <p>Dit is een snelle scan. Een specialist met enterprise-ervaring kan het
    rapport met je doornemen, interpretaties corrigeren en context geven, zodat
    je precies weet wat prioriteit heeft.</p>
    <p><a href="${esc(env.BOOK_URL)}">Plan een gesprek met de specialist</a>
    of beantwoord deze mail.</p>
    <p>Groet,<br>BOLD700</p>
    ${optOut()}`;
}

function optOut() {
  return `<p style="font-size:12px;color:#999;margin-top:16px">Je ontvangt deze mail omdat je een UX-review hebt aangevraagd op uxreviews.bold700.com. Wil je geen mails meer van ons? Beantwoord deze mail met "afmelden".</p>`;
}

// ─────────────────────────────────────────────────────────
// Firestore REST via service-account
// ─────────────────────────────────────────────────────────
async function getAccessToken(env) {
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const iat = Math.floor(Date.now() / 1000);
  const claim = b64url(JSON.stringify({
    iss: env.FIREBASE_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat,
    exp: iat + 3600,
  }));
  const key = await importKey(env.FIREBASE_PRIVATE_KEY);
  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(`${header}.${claim}`),
  );
  const jwt = `${header}.${claim}.${b64url(sig)}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const j = await res.json();
  if (!j.access_token) {
    // Surface de exacte OAuth-fout (bijv. "invalid_grant: Invalid JWT Signature").
    throw new Error(`OAuth ${res.status}: ${JSON.stringify(j).slice(0, 300)}`);
  }
  return j.access_token;
}

// Verwijdert leads ouder dan 12 maanden (behalve klanten) + hun scan-project.
async function cleanupOldLeads(env, token, now) {
  const cutoff = now - 365 * 24 * 60 * 60 * 1000; // ~12 maanden
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'leads' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'createdAtMs' },
            op: 'LESS_THAN',
            value: { integerValue: String(cutoff) },
          },
        },
        limit: 100,
      },
    }),
  });
  const rows = await res.json();
  const olds = (rows || [])
    .filter((r) => r.document)
    .map((r) => ({ id: r.document.name.split('/').pop(), ...decode(r.document.fields) }));

  for (const lead of olds) {
    if (lead.status === 'klant') continue; // klanten bewaren
    await firestoreDelete(env, token, `leads/${lead.id}`);
    if (lead.projectId) await firestoreDelete(env, token, `projects/${lead.projectId}`);
  }
  if (olds.length) console.log(`cleanup: ${olds.length} oude lead(s) beoordeeld`);
}

async function firestoreDelete(env, token, path) {
  await fetch(
    `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } },
  );
}

async function queryDueLeads(env, token, now) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
  const body = {
    structuredQuery: {
      from: [{ collectionId: 'leads' }],
      where: {
        fieldFilter: {
          field: { fieldPath: 'deliverAtMs' },
          op: 'LESS_THAN_OR_EQUAL',
          value: { integerValue: String(now) },
        },
      },
      limit: 50,
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const rows = await res.json();
  return (rows || [])
    .filter((r) => r.document)
    .map((r) => ({ id: r.document.name.split('/').pop(), ...decode(r.document.fields) }));
}

async function patchLead(env, token, id, fields) {
  const mask = Object.keys(fields).map((k) => `updateMask.fieldPaths=${k}`).join('&');
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/leads/${id}?${mask}`;
  await fetch(url, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: encode(fields) }),
  });
}

// ─────────────────────────────────────────────────────────
// Resend + helpers
// ─────────────────────────────────────────────────────────
async function sendEmail(env, { to, subject, html }) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.MAIL_FROM, to, subject, html }),
  });
  if (!r.ok) {
    const t = await r.text();
    console.error(`Resend fout (${r.status}) bij mail naar ${to}: ${t}`);
  }
  return r.ok;
}

function decode(fields) {
  const o = {};
  for (const [k, v] of Object.entries(fields || {})) {
    if ('stringValue' in v) o[k] = v.stringValue;
    else if ('integerValue' in v) o[k] = Number(v.integerValue);
    else if ('doubleValue' in v) o[k] = v.doubleValue;
    else if ('booleanValue' in v) o[k] = v.booleanValue;
    else if ('nullValue' in v) o[k] = null;
  }
  return o;
}
function encode(obj) {
  const f = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'number')
      f[k] = Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    else if (typeof v === 'boolean') f[k] = { booleanValue: v };
    else f[k] = { stringValue: String(v) };
  }
  return f;
}
function b64url(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
// Haalt de pure base64-body uit een PEM. Robuust: converteert letterlijke \n
// naar regeleindes, gooit ELKE regel met '-----' weg (BEGIN/END of verminkte
// varianten daarvan), en houdt alleen geldige base64-tekens over. Werkt dus
// ook als de header per ongeluk is ingekort tot alleen '-----'.
function pemToBase64(pem) {
  return String(pem || '')
    .replace(/\\n/g, '\n')
    .split(/\r?\n/)
    .filter((l) => l && !l.includes('-----'))
    .join('')
    .replace(/[^A-Za-z0-9+/=]/g, '');
}
async function importKey(pem) {
  const body = pemToBase64(pem);
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'pkcs8',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}
function cleanUrl(u) {
  return String(u ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');
}
