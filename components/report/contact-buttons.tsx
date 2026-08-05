import { Mail, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

// Contactgegevens voor "laat een specialist meekijken".
export const CONTACT_TEL = "+31614802802"
export const CONTACT_EMAIL = "support@bold700.com"
const WA_NUMBER = "31614802802"
const WA_TEXT = encodeURIComponent(
  "Hoi! Ik heb een UX-review laten doen en wil deze graag met een specialist doornemen.",
)
export const WHATSAPP_URL = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

// Compacte rij met de drie contactkanalen (WhatsApp primair).
export function ContactButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button asChild size="lg">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={`tel:${CONTACT_TEL}`}>
          <Phone className="h-4 w-4" /> Bellen
        </a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={`mailto:${CONTACT_EMAIL}`}>
          <Mail className="h-4 w-4" /> Mailen
        </a>
      </Button>
    </div>
  )
}
