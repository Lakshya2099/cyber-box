"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, Trophy, Users, Calendar, ArrowRight, Clock, Crown } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { useCTF } from "@/context/ctf-context"
import { formatDate } from "@/lib/utils"

export function CTFPage() {
  const { competitions, userPoints, userRank } = useCTF()
  const [activeTab, setActiveTab] = useState("active")

  // Filter competitions based on active status
  const activeCompetitions = Object.values(competitions).filter((comp) => comp.active)
  const pastCompetitions = Object.values(competitions).filter((comp) => !comp.active)

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Capture The Flag
            </h1>
            <p className="text-gray-400 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
              Compete in cybersecurity challenges and win badges
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Points</p>
                  <p className="text-xl font-bold text-white">{userPoints}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Rank</p>
                  <p className="text-xl font-bold text-white">{userRank > 0 ? `#${userRank}` : "Not Ranked"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-orange-900/5 to-gray-900/10"></div>
          <CardHeader className="relative">
            <CardTitle className="text-gray-200 flex items-center">
              <div className="h-5 w-1 bg-amber-500 mr-2"></div>
              About Capture The Flag
            </CardTitle>
            <CardDescription className="text-gray-400">
              Test your cybersecurity skills in competitive challenges
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4 text-gray-300">
              <p>
                Capture The Flag (CTF) competitions are cybersecurity challenges where participants solve security
                puzzles to find hidden "flags" - secret strings that prove you've solved the challenge.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                    <Flag className="h-4 w-4" /> How It Works
                  </h3>
                  <p className="text-sm text-gray-300">
                    Register for competitions, solve challenges, and submit flags to earn points. The more challenges
                    you solve, the higher your rank.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4" /> Rewards
                  </h3>
                  <p className="text-sm text-gray-300">
                    Top performers earn exclusive badges and recognition. Complete all challenges in a competition to
                    earn special achievement badges.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Community
                  </h3>
                  <p className="text-sm text-gray-300">
                    Compete against other cybersecurity enthusiasts, view the leaderboard, and improve your skills
                    through friendly competition.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <Crown className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium text-white">King of the Hill</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Try our new King of the Hill challenges where you compete to capture and maintain control of
                  vulnerable systems.
                </p>
                <Link href="/ctf/koth">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                    Go to King of the Hill
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900/60 text-gray-400 p-1 backdrop-blur-sm border border-gray-800/50">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-900/60 data-[state=active]:to-orange-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-amber-500 px-6"
            >
              Active Competitions
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-900/60 data-[state=active]:to-gray-800/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-gray-500 px-6"
            >
              Past Competitions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {activeCompetitions.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No active competitions at the moment. Check back soon!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastCompetitions.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} competition={competition} isPast />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No past competitions available.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

interface CompetitionCardProps {
  competition: any
  isPast?: boolean
}

function CompetitionCard({ competition, isPast = false }: CompetitionCardProps) {
  const totalChallenges = competition.challenges.length
  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-amber-500",
    hard: "bg-red-500",
  }

  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Animated border effect */}
      <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 animate-border-flow"></div>
      </div>

      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 relative group-hover:scale-105 transition-transform duration-300">
            <Flag className="h-6 w-6 text-amber-500" />
            <div className="absolute inset-0 bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
            {totalChallenges} Challenges
          </Badge>
        </div>
        <CardTitle className="text-gray-200 mt-3 group-hover:text-white transition-colors duration-300">
          {competition.title}
        </CardTitle>
        <CardDescription className="text-gray-400">{competition.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="h-4 w-4" />
              <span>{competition.participants} Participants</span>
            </div>

            {!isPast && (
              <div className="flex items-center gap-2 text-amber-400">
                <Clock className="h-4 w-4" />
                <span>Active</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {competition.challenges.slice(0, 3).map((challenge: any) => (
            <div key={challenge.id} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${difficultyColor[challenge.difficulty]}`}></div>
              <span className="text-xs text-gray-400">{challenge.category}</span>
            </div>
          ))}
          {competition.challenges.length > 3 && (
            <span className="text-xs text-gray-500">+{competition.challenges.length - 3} more</span>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/ctf/${competition.id}`} className="w-full">
          <Button className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000"></div>

            {isPast ? <>View Results</> : competition.registered ? <>Continue Competition</> : <>View Competition</>}

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

