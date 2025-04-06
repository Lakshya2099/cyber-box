"use client"

import { useParams } from "next/navigation"
import { ChallengesList } from "@/components/ctf/challenges-list"

export default function ChallengesPage() {
  const params = useParams()
  const competitionId = params.competitionId as string

  return <ChallengesList competitionId={competitionId} />
}

