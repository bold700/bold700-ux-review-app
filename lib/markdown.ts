// Compacte Markdown -> HTML voor het AI-actieplan.
export function markdownToHtml(md: string): string {
  let h = (md || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>")
  h = h
    .replace(/(<li>[\s\S]*?<\/li>)/g, (m) => "<ul>" + m + "</ul>")
    .replace(/<\/ul>\s*<ul>/g, "")
  h = h
    .split(/\n{2,}/)
    .map((b) =>
      /^\s*<(h2|h3|ul|li)/.test(b.trim())
        ? b
        : b.trim()
          ? "<p>" + b.trim().replace(/\n/g, "<br>") + "</p>"
          : "",
    )
    .join("\n")
  return h
}
