"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Award, BookOpen, Code, Lock, Play, Shield, Terminal } from "lucide-react"
import { ModuleCard } from "@/components/module-card"
import { BadgeCard } from "@/components/badge-card"
import { StartSimulationModal } from "@/components/start-simulation-modal"
import { CyberProgressRing } from "@/components/cyber-progress-ring"
import { CyberNotification } from "@/components/cyber-notification"
import { useCyberState } from "@/context/cyber-state-context"
import { MainLayout } from "@/components/main-layout"

export function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  // Get our global state
  const { modules, badges, learningProgress } = useCyberState()

  useEffect(() => {
    // Show welcome notification after a delay
    const timer = setTimeout(() => {
      setNotificationMessage("Welcome back, agent. New security threats detected.")
      setShowNotification(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Map our modules from state to the format expected by ModuleCard
  const modulesList = [
    {
      id: 1,
      title: "Phishing Awareness",
      description: "Learn to identify and avoid phishing attempts",
      progress: modules.phishing?.progress || 0,
      completed: modules.phishing?.completed || false,
      icon: AlertCircle,
      color: "from-red-500 to-orange-500",
      moduleId: "phishing",
    },
    {
      id: 2,
      title: "Network Security",
      description: "Understand network vulnerabilities and protections",
      progress: modules.network?.progress || 0,
      completed: modules.network?.completed || false,
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      moduleId: "network",
    },
    {
      id: 3,
      title: "Cryptography Basics",
      description: "Introduction to encryption and secure communications",
      progress: modules.crypto?.progress || 0,
      completed: modules.crypto?.completed || false,
      icon: Lock,
      color: "from-purple-500 to-pink-500",
      moduleId: "crypto",
    },
    {
      id: 4,
      title: "Secure Coding",
      description: "Learn to write code without security vulnerabilities",
      progress: 0,
      completed: false,
      icon: Code,
      locked: true,
      color: "from-emerald-500 to-teal-500",
      moduleId: "coding",
    },
  ]

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

  const handleStartSimulation = () => {
    setIsModalOpen(true)
    setNotificationMessage("Simulation environment ready for deployment.")
    setShowNotification(true)
  }

  // Calculate the number of modules in progress
  const modulesInProgress = Object.values(modules).filter(
    (module) => module.progress > 0 && module.progress < 100,
  ).length

  // Find the next module to work on
  const nextModule = modulesList.find((module) => !module.completed && !module.locked && module.progress < 100)

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Security Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Active monitoring and training in progress
            </p>
          </div>
          <Button
            size="lg"
            className="relative overflow-hidden group bg-gradient-to-r from-emerald-600 to-cyan-600 border-0 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-900/30"
            onClick={handleStartSimulation}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            <Play className="mr-2 h-4 w-4" />
            Start Simulation
          </Button>
        </div>

        {/* Progress overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group hover:bg-gray-900/60 transition-all duration-300 hover:border-emerald-900/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle className="text-gray-200 flex items-center">
                <div className="h-5 w-1 bg-emerald-500 mr-2"></div>
                Learning Progress
              </CardTitle>
              <CardDescription className="text-gray-400">Overall completion</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex flex-col items-center gap-2">
                <CyberProgressRing value={learningProgress} />
                <span className="text-sm text-gray-400 flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                  {modulesInProgress} of {modulesList.length - 1} modules in progress
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group hover:bg-gray-900/60 transition-all duration-300 hover:border-blue-900/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle className="text-gray-200 flex items-center">
                <div className="h-5 w-1 bg-blue-500 mr-2"></div>
                Modules
              </CardTitle>
              <CardDescription className="text-gray-400">Available learning paths</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 relative group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  <div className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    4
                  </div>
                  <div className="text-sm text-gray-400">Total modules</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group hover:bg-gray-900/60 transition-all duration-300 hover:border-amber-900/50">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle className="text-gray-200 flex items-center">
                <div className="h-5 w-1 bg-amber-500 mr-2"></div>
                Badges
              </CardTitle>
              <CardDescription className="text-gray-400">Your achievements</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 relative group-hover:scale-105 transition-transform duration-300">
                  <Award className="h-6 w-6 text-amber-500" />
                  <div className="absolute inset-0 bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {Object.values(badges).filter((badge) => badge.earned).length}
                  </div>
                  <div className="text-sm text-gray-400">Earned badges</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group hover:bg-gray-900/60 transition-all duration-300 hover:border-purple-900/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle className="text-gray-200 flex items-center">
                <div className="h-5 w-1 bg-purple-500 mr-2"></div>
                Next Challenge
              </CardTitle>
              <CardDescription className="text-gray-400">Continue learning</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 relative group-hover:scale-105 transition-transform duration-300">
                  <Terminal className="h-6 w-6 text-purple-500" />
                  <div className="absolute inset-0 bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-200">
                    {nextModule ? nextModule.title : "All modules completed!"}
                  </div>
                  {nextModule && (
                    <div className="text-xs text-gray-400 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></span>
                      {100 - nextModule.progress}% remaining
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for modules and badges */}
        <Tabs defaultValue="modules" className="mb-8">
          <TabsList className="bg-gray-900/60 text-gray-400 p-1 backdrop-blur-sm border border-gray-800/50">
            <TabsTrigger
              value="modules"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-900/60 data-[state=active]:to-cyan-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-emerald-500 px-6"
            >
              Available Modules
            </TabsTrigger>
            <TabsTrigger
              value="badges"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-900/60 data-[state=active]:to-orange-900/60 data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-amber-500 px-6"
            >
              Earned Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {modulesList.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {badgesList.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent activity */}
        <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-emerald-900/5 to-gray-900/20"></div>
          <CardHeader className="relative">
            <CardTitle className="text-gray-200 flex items-center">
              <div className="h-5 w-1 bg-emerald-500 mr-2"></div>
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4">
              {/* Generate dynamic activities based on state */}
              {[
                ...(modules.network?.progress > 0
                  ? [
                      {
                        date: "Today",
                        time: "10:30 AM",
                        action: `${modules.network.progress === 100 ? "Completed" : "Made progress on"} Network Security module`,
                        icon: Shield,
                        color: "blue",
                      },
                    ]
                  : []),
                ...(modules.crypto?.progress > 0
                  ? [
                      {
                        date: "Yesterday",
                        time: "3:45 PM",
                        action: `${modules.crypto.progress === 100 ? "Completed" : "Started"} Cryptography Basics module`,
                        icon: Lock,
                        color: "purple",
                      },
                    ]
                  : []),
                ...(badges[2]?.earned
                  ? [
                      {
                        date: badges[2].date || "Mar 18",
                        time: "2:15 PM",
                        action: "Earned Network Defender badge",
                        icon: Award,
                        color: "amber",
                      },
                    ]
                  : []),
                ...(modules.phishing?.progress > 0
                  ? [
                      {
                        date: "Last week",
                        time: "11:20 AM",
                        action: `${modules.phishing.progress === 100 ? "Completed" : "Made progress on"} Phishing Awareness module`,
                        icon: AlertCircle,
                        color: "red",
                      },
                    ]
                  : []),
              ]
                .slice(0, 3)
                .map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-lg border border-gray-800/50 bg-gray-900/30 p-3 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300 group"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${activity.color}-500/10 border border-${activity.color}-500/30 relative group-hover:scale-105 transition-transform duration-300`}
                    >
                      <activity.icon className={`h-5 w-5 text-${activity.color}-400`} />
                      <div
                        className={`absolute inset-0 bg-${activity.color}-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-200">{activity.action}</p>
                      <p className="text-xs text-gray-400 flex items-center">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}

              {/* Show a message if no activities */}
              {Object.keys(modules).length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <p>No activities yet. Start a simulation to begin your training!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification */}
      <CyberNotification
        show={showNotification}
        message={notificationMessage}
        onClose={() => setShowNotification(false)}
      />

      {/* Simulation Modal */}
      <StartSimulationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MainLayout>
  )
}

