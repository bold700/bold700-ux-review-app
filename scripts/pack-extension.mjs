// Zet de Chrome-extensie in een zip die de app zelf serveert, zodat je hem op
// elke machine kunt binnenhalen via https://uxreviews.bold700.com/uxpins-extensie.zip
//
// Draait automatisch vóór `pnpm build` (prebuild). Faalt dit script, dan gaat
// de build gewoon door: een ontbrekend zipje mag nooit een deploy blokkeren.

import { execFileSync } from "node:child_process"
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const SRC = "chrome-extension"
const OUT = "public/uxpins-extensie.zip"
const FILES = ["manifest.json", "background.js", "popup.html", "popup.js", "pin.js", "README.md"]

try {
  // pin.js is een kopie van public/pin.js; hier borgen we dat hij actueel is.
  copyFileSync("public/pin.js", join(SRC, "pin.js"))

  const dir = mkdtempSync(join(tmpdir(), "uxpins-"))
  const stage = join(dir, "uxpins-extensie")
  execFileSync("mkdir", ["-p", stage])
  for (const f of FILES) copyFileSync(join(SRC, f), join(stage, f))

  rmSync(OUT, { force: true })
  execFileSync("zip", ["-q", "-r", join(process.cwd(), OUT), "uxpins-extensie"], { cwd: dir })
  rmSync(dir, { recursive: true, force: true })

  const v = JSON.parse(readFileSync(join(SRC, "manifest.json"), "utf8")).version
  writeFileSync("public/uxpins-extensie.txt", `${v}\n`)
  console.log(`[pack-extension] ${OUT} klaar (versie ${v})`)
} catch (e) {
  console.warn("[pack-extension] overgeslagen:", e.message)
}
