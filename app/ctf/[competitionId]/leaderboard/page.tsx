"use client"

import { useParams } from "next/navigation"
import { Leaderboard } from "@/components/ctf/leaderboard"

export default function LeaderboardPage() {
  const params = useParams()
  const competitionId = params.competitionId as string

  return <Leaderboard competitionId={competitionId} />
}

