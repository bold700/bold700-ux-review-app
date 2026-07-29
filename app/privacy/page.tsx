import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"

export const metadata = {
  title: "Privacyverklaring — BOLD700 UX Review",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BrandLogo className="h-6 w-auto" /> BOLD700
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-20">
        <h1 className="text-2xl font-semibold">Privacyverklaring</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Laatst bijgewerkt: 29 juli 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">
              Wie zijn wij
            </h2>
            <p className="mt-1">
              BOLD700 voert gratis UX-reviews uit voor websites via
              uxreviews.bold700.com. Voor vragen over je gegevens of dit beleid
              kun je mailen naar{" "}
              <a href="mailto:support@bold700.com" className="underline">
                support@bold700.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              Welke gegevens we verzamelen
            </h2>
            <p className="mt-1">
              Als je een review aanvraagt, verzamelen we alleen wat je zelf
              invult: je <strong>naam</strong>, je{" "}
              <strong>e-mailadres</strong> en de <strong>website-URL</strong> die
              je wilt laten beoordelen. Daarnaast analyseren we de opgegeven
              webpagina technisch voor de review. We verzamelen niet meer dan
              dat.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              Waarvoor we ze gebruiken
            </h2>
            <p className="mt-1">
              Om de gevraagde UX-review uit te voeren, je de resultaten (score en
              rapport) te sturen, en contact met je op te nemen over een
              eventuele uitgebreide review door een specialist. We verkopen je
              gegevens niet en gebruiken ze niet voor andere doeleinden.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              Grondslag
            </h2>
            <p className="mt-1">
              We verwerken je gegevens omdat je zelf een review aanvraagt
              (uitvoering van je verzoek) en op basis van ons gerechtvaardigd
              belang om je over de uitkomst te informeren.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              Hoe lang we ze bewaren
            </h2>
            <p className="mt-1">
              We bewaren je aanvraag maximaal 12 maanden na het laatste contact,
              tenzij er een klantrelatie ontstaat. Daarna verwijderen we je
              gegevens. Je kunt op elk moment vragen om eerdere verwijdering.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              Met wie we ze delen (verwerkers)
            </h2>
            <p className="mt-1">
              We gebruiken een aantal dienstverleners die namens ons gegevens
              verwerken:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Google Firebase — opslag van de aanvraag en beveiliging.</li>
              <li>Cloudflare — verwerking van de aanvraag en verzending.</li>
              <li>Resend — versturen van de e-mails.</li>
              <li>
                OpenAI — analyse van de opgegeven webpagina voor de review.
              </li>
            </ul>
            <p className="mt-2">
              Sommige van deze partijen verwerken gegevens (deels) buiten de EU;
              daarvoor gelden passende waarborgen. We delen je gegevens verder
              met niemand.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              Je rechten
            </h2>
            <p className="mt-1">
              Je hebt recht op inzage, correctie en verwijdering van je gegevens.
              Stuur daarvoor een mail naar{" "}
              <a href="mailto:support@bold700.com" className="underline">
                support@bold700.com
              </a>
              . Ben je het oneens met hoe we met je gegevens omgaan, dan kun je
              een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Terug naar de site
          </Link>
        </div>
      </main>
    </div>
  )
}
