import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Users, Calendar, ArrowRight } from "lucide-react"
import type { KothInstance } from "@/types/koth"
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from "@/constants/koth"
import { formatDate } from "@/lib/utils"
import { InstanceDetails } from "./instance-details"

interface InstanceCardProps {
  instanceId: KothInstance
  isPast?: boolean
}

export function InstanceCard({ instanceId, isPast = false }: InstanceCardProps) {
  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Animated border effect */}
      <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-border-flow"></div>
      </div>

      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30 relative group-hover:scale-105 transition-transform duration-300">
            <Crown className="h-6 w-6 text-purple-500" />
            <div className="absolute inset-0 bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <Badge className={DIFFICULTY_COLORS[instanceId.difficulty]}>{DIFFICULTY_LABELS[instanceId.difficulty]}</Badge>
        </div>
        <CardTitle className="text-gray-200 mt-3 group-hover:text-white transition-colors duration-300">
          {instanceId.name}
        </CardTitle>
        <CardDescription className="text-gray-400">{instanceId.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(instanceId.startTime)} - {formatDate(instanceId.endTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="h-4 w-4" />
              <span>
                {instanceId.participants}/{instanceId.maxParticipants} Participants
              </span>
            </div>

            {!isPast && instanceId.currentKing && (
              <div className="flex items-center gap-2 text-purple-400">
                <Crown className="h-4 w-4" />
                <span>King: {instanceId.currentKing.username}</span>
              </div>
            )}
          </div>
        </div>

        {instanceId.currentKing && (
          <div className="bg-gray-800/50 rounded-md p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Current King</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">{instanceId.currentKing.username}</span>
              <span className="text-xs text-gray-400">
                Since {new Date(instanceId.currentKing.captureTime).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/ctf/koth/${instanceId.id}`} className="w-full">
          <Button className="w-full relative overflow-hidden group/btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000"></div>

            {isPast ? <>View Results</> : instanceId.registered ? <>Continue Challenge</> : <>View Challenge</>}

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
