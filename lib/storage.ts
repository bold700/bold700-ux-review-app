import { getDownloadURL, ref, uploadString } from "firebase/storage"

import { getFirebaseStorage } from "@/lib/firebase"

// Lees een afbeelding-File en verklein 'm naar max `maxDim` px (JPEG) —
// houdt Storage klein en uploads snel.
export function fileToDataUrl(
  file: File,
  maxDim = 1600,
  quality = 0.85,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        const longest = Math.max(width, height)
        if (longest > maxDim) {
          const scale = maxDim / longest
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Geen canvas-context"))
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL("image/jpeg", quality))
      }
      img.onerror = () => reject(new Error("Kon afbeelding niet laden"))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error("Kon bestand niet lezen"))
    reader.readAsDataURL(file)
  })
}

// Upload een data-URL naar Firebase Storage en geef de download-URL terug.
export async function uploadScreenshot(
  projectId: string,
  key: string,
  dataUrl: string,
): Promise<string | null> {
  try {
    const r = ref(getFirebaseStorage(), `screenshots/${projectId}/${key}.jpg`)
    await uploadString(r, dataUrl, "data_url")
    return await getDownloadURL(r)
  } catch (e) {
    console.error("[uploadScreenshot]", e)
    return null
  }
}
