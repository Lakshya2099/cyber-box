"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ArrowLeft, Clock, Server, Users, Crown, CheckCircle } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { useKoth } from "@/context/koth-context"
import { formatDate } from "@/lib/utils"
import { Leaderboard } from "@/components/koth/leaderboard"
import { EventLog } from "@/components/koth/event-log"
import { TerminalView } from "@/components/koth/terminal-view"
import { ChallengeDetails } from "@/components/koth/challenge-details"
import { RewardsPanel } from "@/components/koth/rewards-panel"
import { KingBanner } from "@/components/koth/king-banner"
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from "@/constants/koth"

interface InstanceDetailsProps {
  instanceId: string
}

export function InstanceDetails({ instanceId }: InstanceDetailsProps) {
  const { instances, registerForInstance, captureInstance } = useKoth()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeLeft, setTimeLeft] = useState("")
  const [kingUptime, setKingUptime] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const instance = instances[instanceId]

  useEffect(() => {
    // Update time left and king uptime every second
    if (instance && instance.active) {
      const updateTimes = () => {
        // Calculate time left
        const endTime = new Date(instance.endTime).getTime()
        const now = new Date().getTime()
        const timeLeftMs = endTime - now

        if (timeLeftMs > 0) {
          const days = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24))
          const hours = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000)

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        } else {
          setTimeLeft("Ended")
        }

        // Calculate king uptime if there is a king
        if (instance.currentKing) {
          const captureTime = new Date(instance.currentKing.captureTime).getTime()
          const uptimeMs = now - captureTime

          const hours = Math.floor(uptimeMs / (1000 * 60 * 60))
          const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((uptimeMs % (1000 * 60)) / 1000)

          setKingUptime(`${hours}h ${minutes}m ${seconds}s`)
        }
      }

      // Initial update
      updateTimes()

      // Set up interval
      timerRef.current = setInterval(updateTimes, 1000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [instance])

  if (!instance) {
    return (
      <MainLayout>
        <div className="container px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-2">Instance Not Found</h2>
            <p className="text-gray-400 mb-6">The instance you're looking for doesn't exist or has been removed.</p>
            <Link href="/ctf/koth">
              <Button>Return to King of the Hill</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  const handleRegister = () => {
    registerForInstance(instanceId)
  }

  const handleFlagSubmit = (flag: string) => {
    return captureInstance(instanceId, flag)
  }

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/ctf/koth"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to King of the Hill</span>
        </Link>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30 relative">
                <Crown className="h-8 w-8 text-purple-500" />
                <div className="absolute inset-0 bg-purple-500/20 blur-md opacity-50"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {instance.name}
                  </h1>
                  <Badge className={DIFFICULTY_COLORS[instance.difficulty]}>
                    {DIFFICULTY_LABELS[instance.difficulty]}
                  </Badge>
                </div>
                <p className="text-gray-400">{instance.description}</p>
              </div>
            </div>

            {instance.active && !instance.registered && (
              <Button
                onClick={handleRegister}
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                Register for Challenge
              </Button>
            )}

            {instance.active && instance.registered && (
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                Registered
              </Badge>
            )}

            {!instance.active && (
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 px-3 py-1">Challenge Ended</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/30 px-3 py-1 rounded-md">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(instance.startTime)} - {formatDate(instance.endTime)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/30 px-3 py-1 rounded-md">
              <Users className="h-4 w-4" />
              <span>
                {instance.participants}/{instance.maxParticipants} Participants
              </span>
            </div>

            {instance.active && (
              <div className="flex items-center gap-2 text-purple-400 bg-purple-500/10 px-3 py-1 rounded-md border border-purple-500/20">
                <Clock className="h-4 w-4" />
                <span>Time Left: {timeLeft}</span>
              </div>
            )}
          </div>
        </div>

        {/* King Banner */}
        {instance.currentKing && (
          <KingBanner instance={instance} kingUptime={kingUptime} onFlagSubmit={handleFlagSubmit} />
        )}

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900/60 text-gray-400 p-1 backdrop-blur-sm border border-gray-800/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-900/60 data-[state=active]:to-blue-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-purple-500 px-6"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="terminal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-900/60 data-[state=active]:to-blue-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-purple-500 px-6"
            >
              Terminal
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-900/60 data-[state=active]:to-blue-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-purple-500 px-6"
            >
              Event Log
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-900/60 data-[state=active]:to-blue-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-purple-500 px-6"
            >
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ChallengeDetails instance={instance} />
              <RewardsPanel />
            </div>
          </TabsContent>

          <TabsContent value="terminal" className="mt-6">
            {instance.registered ? (
              <TerminalView instanceId={instanceId} />
            ) : (
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <CardContent className="p-8 text-center">
                  <Server className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">You need to register for this challenge to access the terminal.</p>
                  <Button
                    onClick={handleRegister}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <EventLog instanceId={instanceId} />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard instanceId={instanceId} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

