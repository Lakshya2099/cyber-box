"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Shield, Lock, Code } from "lucide-react"
import { ModuleCard } from "@/components/module-card"
import { useCyberState } from "@/context/cyber-state-context"
import { MainLayout } from "@/components/main-layout"

export function ModulesPage() {
  // Get our global state
  const { modules } = useCyberState()

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

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Learning Modules
          </h1>
          <p className="text-gray-400 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Select a module to begin your cybersecurity training
          </p>
        </div>

        <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-emerald-900/5 to-gray-900/20"></div>
          <CardHeader className="relative">
            <CardTitle className="text-gray-200 flex items-center">
              <div className="h-5 w-1 bg-emerald-500 mr-2"></div>
              Module Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              Each module contains multiple tasks that will test your cybersecurity knowledge and skills
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-medium text-emerald-400">Beginner difficulty:</span> Guided exercises with
                detailed instructions and hints
              </p>
              <p>
                <span className="font-medium text-amber-400">Intermediate difficulty:</span> Limited guidance with more
                complex scenarios
              </p>
              <p>
                <span className="font-medium text-red-400">Advanced difficulty:</span> Real-world complexity with
                minimal assistance
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modulesList.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

