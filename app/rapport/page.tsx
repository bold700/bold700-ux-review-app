import type { Metadata } from "next"

import { StateReportView } from "@/components/state-report-view"

export const metadata: Metadata = {
  title: "Hoe goed zijn websites van Nederlandse ondernemers? | BOLD700",
  description:
    "Onderzoek onder Nederlandse MKB-websites: het gemiddelde rapportcijfer, wat er het vaakst misgaat en welke sectoren het goed doen.",
}

export default function RapportPage() {
  return <StateReportView />
}
