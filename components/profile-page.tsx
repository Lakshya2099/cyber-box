"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { User, Shield, Award, Zap, AlertCircle, Lock } from "lucide-react"
import { CyberProgressRing } from "@/components/cyber-progress-ring"
import { useCyberState } from "@/context/cyber-state-context"
import { MainLayout } from "@/components/main-layout"

export function ProfilePage() {
  const { modules, badges, learningProgress } = useCyberState()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState("Agent007")
  const [email, setEmail] = useState("agent007@cyber.academy")

  // Calculate stats
  const completedModules = Object.values(modules).filter((module) => module.completed).length
  const totalModules = 3 // phishing, network, crypto
  const earnedBadges = Object.values(badges).filter((badge) => badge.earned).length
  const totalBadges = Object.values(badges).length

  // Recent activities
  const activities = [
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
  ].slice(0, 5)

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Agent Profile
          </h1>
          <p className="text-gray-400 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            View and manage your cybersecurity training profile
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 opacity-50"></div>
              <CardHeader className="relative pb-0">
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 ring-4 ring-emerald-500/20">
                    <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      <User className="h-12 w-12 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative text-center pt-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block text-left mb-1">Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block text-left mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white"
                        onClick={() => setIsEditing(false)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-white">{username}</h2>
                    <p className="text-gray-400 text-sm">{email}</p>
                    <div className="mt-2 flex justify-center">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-medium flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5" />
                        Level {Math.max(1, Math.floor(learningProgress / 25) + 1)} Agent
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 opacity-50"></div>
              <CardHeader className="relative">
                <CardTitle className="text-gray-200 flex items-center">
                  <div className="h-5 w-1 bg-emerald-500 mr-2"></div>
                  Training Progress
                </CardTitle>
                <CardDescription className="text-gray-400">Your cybersecurity learning journey</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-col items-center gap-2">
                  <CyberProgressRing value={learningProgress} />
                  <div className="w-full space-y-3 mt-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Modules Completed</span>
                        <span className="text-emerald-400">
                          {completedModules}/{totalModules}
                        </span>
                      </div>
                      <Progress
                        value={(completedModules / totalModules) * 100}
                        className="h-2 bg-gray-800"
                        indicatorClassName="bg-gradient-to-r from-emerald-500 to-cyan-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Badges Earned</span>
                        <span className="text-amber-400">
                          {earnedBadges}/{totalBadges}
                        </span>
                      </div>
                      <Progress
                        value={(earnedBadges / totalBadges) * 100}
                        className="h-2 bg-gray-800"
                        indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
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
                  {activities.length > 0 ? (
                    activities.map((activity, i) => (
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
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <p>No activities yet. Start a simulation to begin your training!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-emerald-900/5 to-gray-900/20"></div>
              <CardHeader className="relative">
                <CardTitle className="text-gray-200 flex items-center">
                  <div className="h-5 w-1 bg-emerald-500 mr-2"></div>
                  Account Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-black/30">
                    <div>
                      <h3 className="font-medium text-white">Email Notifications</h3>
                      <p className="text-sm text-gray-400">Receive updates about new modules and challenges</p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-emerald-900/30 p-1 cursor-pointer">
                      <div className="h-4 w-4 rounded-full bg-emerald-500 transform translate-x-5"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-black/30">
                    <div>
                      <h3 className="font-medium text-white">Dark Mode</h3>
                      <p className="text-sm text-gray-400">Use dark theme for the application</p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-emerald-900/30 p-1 cursor-pointer">
                      <div className="h-4 w-4 rounded-full bg-emerald-500 transform translate-x-5"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-black/30">
                    <div>
                      <h3 className="font-medium text-white">Reset Progress</h3>
                      <p className="text-sm text-gray-400">Clear all your learning progress and start over</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

