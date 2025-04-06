"use client"

import { useParams } from "next/navigation"
import { CompetitionDetails } from "@/components/ctf/competition-details"

export default function CompetitionPage() {
  const params = useParams()
  const competitionId = params.competitionId as string

  return <CompetitionDetails competitionId={competitionId} />
}

