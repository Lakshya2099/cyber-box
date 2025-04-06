"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, Trophy, Users, Calendar, ArrowLeft, Clock, CheckCircle } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { useCTF } from "@/context/ctf-context"
import { formatDate } from "@/lib/utils"
import { ChallengesList } from "@/components/ctf/challenges-list"
import { Leaderboard } from "@/components/ctf/leaderboard"

interface CompetitionDetailsProps {
  competitionId: string
}

export function CompetitionDetails({ competitionId }: CompetitionDetailsProps) {
  const { competitions, registerForCompetition } = useCTF()
  const [activeTab, setActiveTab] = useState("overview")

  const competition = competitions[competitionId]

  if (!competition) {
    return (
      <MainLayout>
        <div className="container px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-2">Competition Not Found</h2>
            <p className="text-gray-400 mb-6">The competition you're looking for doesn't exist or has been removed.</p>
            <Link href="/ctf">
              <Button>Return to CTF Page</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  const totalChallenges = competition.challenges.length
  const easyCount = competition.challenges.filter((c) => c.difficulty === "easy").length
  const mediumCount = competition.challenges.filter((c) => c.difficulty === "medium").length
  const hardCount = competition.challenges.filter((c) => c.difficulty === "hard").length

  const handleRegister = () => {
    registerForCompetition(competitionId)
  }

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/ctf" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to CTF</span>
        </Link>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 relative">
                <Flag className="h-8 w-8 text-amber-500" />
                <div className="absolute inset-0 bg-amber-500/20 blur-md opacity-50"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  {competition.title}
                </h1>
                <p className="text-gray-400">{competition.description}</p>
              </div>
            </div>

            {competition.active && !competition.registered && (
              <Button
                onClick={handleRegister}
                className="relative overflow-hidden group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                Register for Competition
              </Button>
            )}

            {competition.active && competition.registered && (
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                Registered
              </Badge>
            )}

            {!competition.active && (
              <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/30 px-3 py-1">
                Competition Ended
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/30 px-3 py-1 rounded-md">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/30 px-3 py-1 rounded-md">
              <Users className="h-4 w-4" />
              <span>{competition.participants} Participants</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/30 px-3 py-1 rounded-md">
              <Flag className="h-4 w-4" />
              <span>{totalChallenges} Challenges</span>
            </div>

            {competition.active && (
              <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                <Clock className="h-4 w-4" />
                <span>Active</span>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900/60 text-gray-400 p-1 backdrop-blur-sm border border-gray-800/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-900/60 data-[state=active]:to-orange-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-amber-500 px-6"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="challenges"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-900/60 data-[state=active]:to-orange-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-amber-500 px-6"
            >
              Challenges
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-900/60 data-[state=active]:to-orange-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-amber-500 px-6"
            >
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-orange-900/10 opacity-50"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-gray-200">Competition Details</CardTitle>
                  <CardDescription className="text-gray-400">Information about this CTF competition</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <p className="text-gray-300">{competition.description}</p>

                  <div className="space-y-2">
                    <h3 className="font-medium text-white">Challenge Breakdown:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-gray-300">Easy Challenges</span>
                        </div>
                        <span className="text-gray-400">{easyCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <span className="text-gray-300">Medium Challenges</span>
                        </div>
                        <span className="text-gray-400">{mediumCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-gray-300">Hard Challenges</span>
                        </div>
                        <span className="text-gray-400">{hardCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-white">Rules:</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Solve challenges to earn points</li>
                      <li>Higher difficulty challenges award more points</li>
                      <li>Submit flags in the correct format to receive credit</li>
                      <li>Do not share flags or solutions with other participants</li>
                      <li>Top performers will receive special badges</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-orange-900/10 opacity-50"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-gray-200">Rewards</CardTitle>
                  <CardDescription className="text-gray-400">Earn badges and recognition</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 relative">
                        <Trophy className="h-8 w-8 text-amber-500" />
                        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md opacity-50"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">First Place Badge</h3>
                        <p className="text-gray-400">Awarded to the top performer in the competition</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-700/20 bg-gray-800/30">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700/20 border border-gray-700/30 relative">
                        <Trophy className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Top 10 Badge</h3>
                        <p className="text-gray-400">Awarded to participants who finish in the top 10</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 relative">
                        <Flag className="h-8 w-8 text-purple-500" />
                        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md opacity-50"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Challenge Master Badge</h3>
                        <p className="text-gray-400">Complete all challenges in the competition</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <ChallengesList competitionId={competitionId} />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard competitionId={competitionId} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

