"use client"

import { BadgeCard } from "@/components/badge-card"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Terminal, Lock } from "lucide-react"
import { useCyberState } from "@/context/cyber-state-context"
import { MainLayout } from "@/components/main-layout"

export function BadgesPage() {
  // Get our global state
  const { badges } = useCyberState()

  // Map our badges from state to the format expected by BadgeCard
  const badgesList = [
    {
      id: 1,
      title: "Phishing Guardian",
      description: "Successfully completed the Phishing Awareness module",
      icon: Shield,
      earned: badges[1]?.earned || false,
      date: badges[1]?.date,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: 2,
      title: "Network Defender",
      description: "Completed 50% of Network Security module",
      icon: Terminal,
      earned: badges[2]?.earned || false,
      date: badges[2]?.date,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Crypto Master",
      description: "Complete all cryptography challenges",
      icon: Lock,
      earned: badges[3]?.earned || false,
      date: badges[3]?.date,
      color: "from-purple-500 to-violet-500",
    },
  ]

  const earnedBadges = badgesList.filter((badge) => badge.earned)
  const unearnedBadges = badgesList.filter((badge) => !badge.earned)

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Achievement Badges
          </h1>
          <p className="text-gray-400 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
            Complete modules and challenges to earn badges
          </p>
        </div>

        {earnedBadges.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Earned Badges</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl font-bold text-white mb-4">Available Badges</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {unearnedBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        {earnedBadges.length === 0 && unearnedBadges.length === 0 && (
          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">No badges available. Complete modules to earn badges.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}

