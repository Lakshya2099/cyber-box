"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Crown, Search, User } from "lucide-react"
import { useKoth } from "@/context/koth-context"
import { formatDuration } from "@/lib/utils"

interface LeaderboardProps {
  instanceId: string
}

export function Leaderboard({ instanceId }: LeaderboardProps) {
  const { leaderboards } = useKoth()
  const [searchQuery, setSearchQuery] = useState("")

  const leaderboard = leaderboards[instanceId] || []

  // Filter participants based on search query
  let filteredParticipants = searchQuery || []

  // Filter participants based on search query
  filteredParticipants = searchQuery
    ? leaderboard.filter((p) => p.username.toLowerCase().includes(searchQuery.toLowerCase()))
    : leaderboard

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-50"></div>
        <CardHeader className="relative">
          <CardTitle className="text-gray-200">Challenge Leaderboard</CardTitle>
          <CardDescription className="text-gray-400">Top performers in this King of the Hill challenge</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search participants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/40 border-gray-800/50"
            />
          </div>

          {filteredParticipants.length > 0 ? (
            <div className="space-y-4">
              {/* Top 3 podium for larger screens */}
              {!searchQuery && (
                <div className="hidden md:flex justify-center items-end gap-4 mb-8 h-48">
                  {/* 2nd Place */}
                  {filteredParticipants.length > 1 && (
                    <div className="flex flex-col items-center">
                      <div className="mb-2">
                        <div className="h-16 w-16 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                          <Crown className="h-8 w-8 text-gray-300" />
                        </div>
                        <div className="text-center">
                          <Badge className="bg-gray-700 text-gray-300 border-gray-600">2nd Place</Badge>
                        </div>
                      </div>
                      <div className="h-28 w-24 bg-gray-800/80 rounded-t-lg flex items-center justify-center border-t-2 border-x-2 border-gray-700">
                        <div className="text-center">
                          <div className="font-medium text-white">{filteredParticipants[1].username}</div>
                          <div className="text-sm text-purple-400">
                            {formatDuration(filteredParticipants[1].totalUptime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1st Place */}
                  {filteredParticipants.length > 0 && (
                    <div className="flex flex-col items-center">
                      <div className="mb-2">
                        <div className="h-20 w-20 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                          <Crown className="h-10 w-10 text-purple-500" />
                        </div>
                        <div className="text-center">
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">1st Place</Badge>
                        </div>
                      </div>
                      <div className="h-36 w-28 bg-purple-900/20 rounded-t-lg flex items-center justify-center border-t-2 border-x-2 border-purple-500/30">
                        <div className="text-center">
                          <div className="font-medium text-white">{filteredParticipants[0].username}</div>
                          <div className="text-sm text-purple-400">
                            {formatDuration(filteredParticipants[0].totalUptime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {filteredParticipants.length > 2 && (
                    <div className="flex flex-col items-center">
                      <div className="mb-2">
                        <div className="h-14 w-14 rounded-full bg-blue-900/30 border-2 border-blue-700/50 flex items-center justify-center">
                          <Crown className="h-7 w-7 text-blue-700" />
                        </div>
                        <div className="text-center">
                          <Badge className="bg-blue-900/30 text-blue-700 border-blue-700/50">3rd Place</Badge>
                        </div>
                      </div>
                      <div className="h-24 w-20 bg-blue-900/10 rounded-t-lg flex items-center justify-center border-t-2 border-x-2 border-blue-700/30">
                        <div className="text-center">
                          <div className="font-medium text-white">{filteredParticipants[2].username}</div>
                          <div className="text-sm text-purple-400">
                            {formatDuration(filteredParticipants[2].totalUptime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Leaderboard table */}
              <div className="overflow-hidden rounded-md border border-gray-800">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900/60">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Participant</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Captures</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Total Uptime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant, index) => (
                      <tr
                        key={participant.id}
                        className={`border-t border-gray-800 ${
                          participant.id === "current-user"
                            ? "bg-purple-900/20"
                            : index % 2 === 0
                              ? "bg-gray-900/40"
                              : "bg-gray-900/20"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm">
                          {participant.rank <= 3 ? (
                            <div className="flex items-center">
                              {participant.rank === 1 && <Crown className="h-4 w-4 text-purple-500 mr-1" />}
                              {participant.rank === 2 && <Crown className="h-4 w-4 text-gray-300 mr-1" />}
                              {participant.rank === 3 && <Crown className="h-4 w-4 text-blue-700 mr-1" />}
                              <span className="font-medium text-white">#{participant.rank}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">#{participant.rank}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                              <User className="h-3 w-3 text-gray-400" />
                            </div>
                            <span
                              className={participant.id === "current-user" ? "font-medium text-white" : "text-gray-300"}
                            >
                              {participant.username}
                              {participant.id === "current-user" && " (You)"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-400">{participant.captures}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-purple-400">
                          {formatDuration(participant.totalUptime)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No participants match your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

