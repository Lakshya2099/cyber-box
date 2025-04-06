"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Play, ArrowLeft, AlertTriangle, Shield, Lock, Code } from "lucide-react"
import { MainLayout } from "@/components/main-layout"

interface ModuleDetailsProps {
  moduleId: string
  moduleData: any
  progress: number
  completed: boolean
}

export function ModuleDetails({ moduleId, moduleData, progress, completed }: ModuleDetailsProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner")

  // Map module IDs to icons
  const moduleIcons: Record<string, any> = {
    phishing: AlertTriangle,
    network: Shield,
    crypto: Lock,
    coding: Code,
  }

  const ModuleIcon = moduleIcons[moduleId] || Shield

  const difficulties = [
    { id: "beginner", name: "Beginner", description: "Guided exercises with hints" },
    { id: "intermediate", name: "Intermediate", description: "Limited guidance, more complex scenarios" },
    { id: "advanced", name: "Advanced", description: "Real-world complexity, minimal assistance" },
  ]

  return (
    <MainLayout>
      <div className="container px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/modules"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Modules</span>
          </Link>

          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${moduleData.color.split("-")[0]}-500/20 border border-${moduleData.color.split("-")[0]}-500/30`}
            >
              <ModuleIcon className={`h-6 w-6 text-${moduleData.color.split("-")[0]}-500`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r ${moduleData.color} bg-clip-text text-transparent`}>
                {moduleData.title}
              </h1>
              <p className="text-gray-400">{moduleData.description}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Module Progress</span>
              <span className={`font-medium text-${moduleData.color.split("-")[0]}-400`}>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-gray-800"
              indicatorClassName={`bg-gradient-to-r ${moduleData.color}`}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${moduleData.color}/5 opacity-50`}></div>
            <CardHeader className="relative">
              <CardTitle className="text-gray-200">Module Overview</CardTitle>
              <CardDescription className="text-gray-400">What you'll learn in this module</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <p className="text-gray-300">
                  {moduleData.overview ||
                    `This module will teach you essential skills in ${moduleData.title.toLowerCase()}.`}
                </p>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Learning Objectives:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {moduleData.objectives?.map((objective: string, index: number) => (
                      <li key={index}>{objective}</li>
                    )) || (
                      <>
                        <li>Understand core concepts of {moduleData.title.toLowerCase()}</li>
                        <li>Learn to identify and mitigate security threats</li>
                        <li>Practice hands-on security techniques</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Tasks:</h3>
                  <div className="space-y-2">
                    {moduleData.tasks?.map((task: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-md border border-gray-800 bg-black/30"
                      >
                        <div className="h-5 w-5 rounded-full border border-gray-700 flex items-center justify-center">
                          <span className="text-xs text-gray-400">{index + 1}</span>
                        </div>
                        <span className="text-sm text-gray-300">{task.title}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-center gap-2 p-2 rounded-md border border-gray-800 bg-black/30">
                          <div className="h-5 w-5 rounded-full border border-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-400">1</span>
                          </div>
                          <span className="text-sm text-gray-300">Introduction to {moduleData.title}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md border border-gray-800 bg-black/30">
                          <div className="h-5 w-5 rounded-full border border-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-400">2</span>
                          </div>
                          <span className="text-sm text-gray-300">Practical Exercises</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md border border-gray-800 bg-black/30">
                          <div className="h-5 w-5 rounded-full border border-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-400">3</span>
                          </div>
                          <span className="text-sm text-gray-300">Advanced Techniques</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${moduleData.color}/5 opacity-50`}></div>
            <CardHeader className="relative">
              <CardTitle className="text-gray-200">Start Simulation</CardTitle>
              <CardDescription className="text-gray-400">Choose a difficulty level to begin</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <div className="space-y-3">
                  {difficulties.map((difficulty) => (
                    <div
                      key={difficulty.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedDifficulty === difficulty.id
                          ? `border-${moduleData.color.split("-")[0]}-500/50 bg-${moduleData.color.split("-")[0]}-500/10`
                          : "border-gray-800 bg-black/30 hover:bg-gray-900/50"
                      }`}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-white">{difficulty.name}</div>
                        {selectedDifficulty === difficulty.id && (
                          <div
                            className={`h-4 w-4 rounded-full bg-${moduleData.color.split("-")[0]}-500/30 flex items-center justify-center`}
                          >
                            <div className={`h-2 w-2 rounded-full bg-${moduleData.color.split("-")[0]}-500`}></div>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{difficulty.description}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-400">
                  <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Simulation Environment Notice</p>
                    <p className="text-xs">
                      All simulations run in an isolated sandbox environment. Actions performed here will not affect
                      real systems or networks.
                    </p>
                  </div>
                </div>

                <Link href={`/modules/${moduleId}/simulation/${selectedDifficulty}`}>
                  <Button
                    className={`w-full relative overflow-hidden group bg-gradient-to-r ${moduleData.color} hover:brightness-110`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    {completed ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Review Module</span>
                      </>
                    ) : progress > 0 ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Continue Module</span>
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Start Module</span>
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

