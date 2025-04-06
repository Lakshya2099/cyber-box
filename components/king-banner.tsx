"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crown } from "lucide-react"
import type { KothInstance } from "@/types/koth"

interface KingBannerProps {
  instance: KothInstance
  kingUptime: string
  onFlagSubmit: (flag: string) => void
}

export function KingBanner({ instance, kingUptime, onFlagSubmit }: KingBannerProps) {
  const [flagInput, setFlagInput] = useState("")
  const [flagError, setFlagError] = useState(false)
  const [flagSuccess, setFlagSuccess] = useState(false)

  if (!instance.currentKing) return null

  const handleFlagSubmit = () => {
    if (flagInput.trim() === "") {
      setFlagError(true)
      return
    }

    const success = onFlagSubmit(flagInput)
    if (success) {
      setFlagSuccess(true)
      setFlagError(false)
      setFlagInput("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setFlagSuccess(false)
      }, 3000)
    } else {
      setFlagError(true)
      setFlagSuccess(false)
    }
  }

  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-70"></div>
      <CardContent className="p-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/40 relative">
              <Crown className="h-7 w-7 text-purple-400" />
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md opacity-50"></div>
            </div>
            <div>
              <div className="text-sm text-purple-400 font-medium">Current King</div>
              <div className="text-xl font-bold text-white">{instance.currentKing.username}</div>
              <div className="text-sm text-gray-400">Reigning for {kingUptime}</div>
            </div>
          </div>

          {instance.active && instance.registered && instance.currentKing.username !== "You" && (
            <div className="mt-4 md:mt-0">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Enter flag to claim the throne..."
                  value={flagInput}
                  onChange={(e) => {
                    setFlagInput(e.target.value)
                    setFlagError(false)
                  }}
                  className={`bg-gray-800/70 border-gray-700/50 ${flagError ? "border-red-500" : ""}`}
                />
                <Button
                  onClick={handleFlagSubmit}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Claim Throne
                </Button>
                {flagError && <p className="text-sm text-red-400">Invalid flag. Try again.</p>}
                {flagSuccess && <p className="text-sm text-green-400">Success! You are now the king!</p>}
              </div>
            </div>
          )}

          {instance.active && instance.registered && instance.currentKing.username === "You" && (
            <div className="mt-4 md:mt-0">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1 text-base">
                <Crown className="h-4 w-4 mr-1" />
                You are the King!
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

