"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type LucideIcon, Award } from "lucide-react"

interface BadgeCardProps {
  badge: {
    id: number
    title: string
    description: string
    icon: LucideIcon
    earned: boolean
    date?: string
    color: string
  }
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Card
      className={`bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:shadow-${badge.color.split("-")[0]}-900/20 ${!badge.earned ? "opacity-60" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${badge.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      {/* Animated border effect for earned badges */}
      {badge.earned && (
        <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} animate-border-flow`}></div>
        </div>
      )}

      <CardHeader className="pb-2 text-center relative">
        <div className="relative mx-auto">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-${badge.color.split("-")[0]}-500/10 border border-${badge.color.split("-")[0]}-500/30 mx-auto mb-3 relative group-hover:scale-105 transition-transform duration-300`}
          >
            {badge.earned && (
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${badge.color} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}
              ></div>
            )}

            <badge.icon
              className={`h-12 w-12 text-${badge.color.split("-")[0]}-500 ${isHovering && badge.earned ? "animate-pulse" : ""}`}
            />

            {/* Rotating outer ring for earned badges */}
            {badge.earned && (
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-opacity-50 border-amber-500/30 animate-spin-slow"></div>
            )}

            {/* Badge indicator */}
            {badge.earned && (
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full p-1 shadow-lg">
                <Award className="h-4 w-4 text-black" />
              </div>
            )}
          </div>
        </div>

        <CardTitle className="text-gray-200 group-hover:text-white transition-colors duration-300">
          {badge.title}
        </CardTitle>
        <CardDescription className="text-gray-400">{badge.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {badge.earned ? (
          <div
            className={`text-${badge.color.split("-")[0]}-400 text-sm font-medium bg-${badge.color.split("-")[0]}-500/10 rounded-md py-1 px-2 border border-${badge.color.split("-")[0]}-500/20`}
          >
            Earned on {new Date(badge.date!).toLocaleDateString()}
          </div>
        ) : (
          <div className="text-gray-500 text-sm bg-gray-800/30 rounded-md py-1 px-2 border border-gray-700/30">
            Complete challenges to earn
          </div>
        )}
      </CardContent>
    </Card>
  )
}

