// Deterministische jargon-filter: vervangt vakwoorden en Engelse termen door
// gewone taal. Vangnet naast de AI-herschrijving, die niet altijd betrouwbaar
// is. Volgorde telt: langere/samengestelde termen eerst.
const REPLACEMENTS: [RegExp, string][] = [
  [/\bcall[-\s]?to[-\s]?actions?\b/gi, "actieknop"],
  [/\bCTA['’]?s\b/gi, "actieknoppen"],
  [/\bCTA\b/gi, "actieknop"],
  [/\bbounce[-\s]?rate\b/gi, "wegklikpercentage"],
  [/\bbounces\b/gi, "wegklikken"],
  [/\bbounce\b/gi, "wegklikken"],
  [/\bconversieratio\b/gi, "hoeveel bezoekers klant worden"],
  [/\bconversies\b/gi, "aanvragen of aankopen"],
  [/\bconversie\b/gi, "aanvragen of aankopen"],
  [/\bconverteren\b/gi, "klant worden"],
  [/\bboven de vouw\b/gi, "bovenaan het scherm"],
  [/\babove[-\s]the[-\s]fold\b/gi, "bovenaan het scherm"],
  [/\bengagement\b/gi, "betrokkenheid"],
  [/\bviewport\b/gi, "scherm"],
  [/\busability\b/gi, "gebruiksgemak"],
]

/** Vervangt bekend jargon door gewone taal. Veilig op lege/undefined invoer. */
export function deJargon(text?: string | null): string {
  if (!text) return ""
  let t = text
  for (const [re, rep] of REPLACEMENTS) t = t.replace(re, rep)
  return t
}
