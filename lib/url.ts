export function normalizeUrl(url: string): string {
  if (!url) return ""
  try {
    const u = url.trim().toLowerCase()
    const withProto = /^https?:\/\//.test(u) ? u : "https://" + u
    return new URL(withProto).hostname.replace(/^www\./, "")
  } catch {
    return url
      .trim()
      .toLowerCase()
      .replace(/^(https?:\/\/)?(www\.)?/, "")
      .split("/")[0]
  }
}

export function ensureProtocol(url: string): string {
  const u = url.trim()
  if (!u) return ""
  return /^https?:\/\//.test(u) ? u : "https://" + u
}

// Autonaam op basis van domein, bv. "personalwealth.nl" -> "Personalwealth.nl"
export function projectNameFromUrl(url: string): string {
  const domain = normalizeUrl(url)
  if (!domain) return ""
  return domain.charAt(0).toUpperCase() + domain.slice(1)
}
