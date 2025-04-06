"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Clock, Shield, Terminal } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { useKoth } from "@/context/koth-context"
import { formatDuration } from "@/lib/utils"
import { InstanceCard } from "@/components/instance-card"

export function KothPage() {
  const { instances, userTotalUptime, userCaptures, userRank } = useKoth()
  const [activeTab, setActiveTab] = useState("active")

  // Get active and past instances
  const activeInstances = Object.values(instances).filter((instance) => instance.active)
  const pastInstances = Object.values(instances).filter((instance) => !instance.active)

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              King of the Hill
            </h1>
            <p className="text-gray-400 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
              Capture, defend, and maintain control of vulnerable systems
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Uptime</p>
                  <p className="text-xl font-bold text-white">{formatDuration(userTotalUptime)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <Crown className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Captures</p>
                  <p className="text-xl font-bold text-white">{userCaptures}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-gray-900/10"></div>
          <CardHeader className="relative">
            <CardTitle className="text-gray-200 flex items-center">
              <div className="h-5 w-1 bg-purple-500 mr-2"></div>
              About King of the Hill
            </CardTitle>
            <CardDescription className="text-gray-400">
              Compete to maintain control of vulnerable systems
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4 text-gray-300">
              <p>
                King of the Hill (KotH) is a cybersecurity competition where participants compete to gain and maintain
                control of vulnerable systems. The longer you maintain control, the more points you earn.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                    <Crown className="h-4 w-4" /> How It Works
                  </h3>
                  <p className="text-sm text-gray-300">
                    Gain access to the system, find and submit the flag to become king. Defend your position against
                    other players to maintain control and earn points.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Defense
                  </h3>
                  <p className="text-sm text-gray-300">
                    Once you're king, you'll need to defend your position by patching vulnerabilities and monitoring for
                    intrusion attempts from other players.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                    <Terminal className="h-4 w-4" /> Sandbox Environment
                  </h3>
                  <p className="text-sm text-gray-300">
                    Each challenge runs in an isolated environment with unique credentials. Use the provided access
                    details to connect and start hacking.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900/60 text-gray-400 p-1 backdrop-blur-sm border border-gray-800/50">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-900/60 data-[state=active]:to-blue-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-purple-500 px-6"
            >
              Active Instances
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-900/60 data-[state=active]:to-gray-800/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-gray-500 px-6"
            >
              Past Instances
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {activeInstances.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeInstances.map((instance) => (
                  <InstanceCard key={instance.id} instanceId={instance} />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No active instances at the moment. Check back soon!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastInstances.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastInstances.map((instance) => (
                  <InstanceCard key={instance.id} instanceId={instance} isPast />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No past instances available.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

