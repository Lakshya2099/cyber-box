"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, type LucideIcon, Play, LockIcon } from "lucide-react"

interface ModuleCardProps {
  module: {
    id: number
    title: string
    description: string
    progress: number
    completed: boolean
    icon: LucideIcon
    locked?: boolean
    color: string
    moduleId: string
  }
}

export function ModuleCard({ module }: ModuleCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Card
      className={`bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:shadow-${module.color.split("-")[0]}-900/20 ${module.locked ? "opacity-70" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${module.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      {/* Animated border effect */}
      <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-r ${module.color} animate-border-flow`}></div>
      </div>

      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${module.color.split("-")[0]}-500/10 border border-${module.color.split("-")[0]}-500/30 relative group-hover:scale-105 transition-transform duration-300`}
          >
            <module.icon className={`h-6 w-6 text-${module.color.split("-")[0]}-500`} />
            <div
              className={`absolute inset-0 bg-${module.color.split("-")[0]}-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
          </div>
          {module.completed && (
            <div className="flex items-center text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Completed</span>
            </div>
          )}
          {module.locked && (
            <div className="flex items-center text-gray-400 bg-gray-500/10 px-2 py-1 rounded-md border border-gray-500/20">
              <LockIcon className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Locked</span>
            </div>
          )}
        </div>
        <CardTitle className="text-gray-200 mt-3 group-hover:text-white transition-colors duration-300">
          {module.title}
        </CardTitle>
        <CardDescription className="text-gray-400">{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Progress</span>
            <span className={`font-medium text-${module.color.split("-")[0]}-400`}>{module.progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${module.color} transition-all duration-500 ease-out rounded-full relative`}
              style={{ width: `${module.progress}%` }}
            >
              {isHovering && module.progress > 0 && module.progress < 100 && (
                <div className="absolute top-0 right-0 h-full w-2 bg-white/50 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={module.locked ? "#" : `/modules/${module.moduleId}`} className="w-full">
          <Button
            className={`w-full relative overflow-hidden group/btn ${
              module.locked
                ? "bg-gray-800/50 text-gray-400 cursor-not-allowed"
                : module.completed
                  ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500"
                  : `bg-gradient-to-r ${module.color} hover:brightness-110`
            }`}
            disabled={module.locked}
          >
            {!module.locked && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000"></div>
            )}

            {module.locked ? (
              <>
                <LockIcon className="mr-2 h-4 w-4" />
                <span>Locked</span>
              </>
            ) : module.completed ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Review</span>
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {module.progress > 0 ? "Continue" : "Start"}
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

