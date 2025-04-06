"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Shield, AlertTriangle, Terminal } from "lucide-react"
import { useKoth } from "@/context/koth-context"
import { EVENT_TYPE_BADGE } from "@/constants/koth"

interface EventLogProps {
  instanceId: string
}

export function EventLog({ instanceId }: EventLogProps) {
  const { instances } = useKoth()
  const instance = instances[instanceId]

  if (!instance) {
    return (
      <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
        <CardContent className="p-8 text-center">
          <p className="text-gray-400">Instance not found.</p>
        </CardContent>
      </Card>
    )
  }

  const events = instance.events

  const eventTypeIcon = {
    capture: <Crown className="h-4 w-4 text-purple-400" />,
    defense: <Shield className="h-4 w-4 text-blue-400" />,
    attack: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    system: <Terminal className="h-4 w-4 text-gray-400" />,
  }

  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-50"></div>
      <CardHeader className="relative">
        <CardTitle className="text-gray-200">Event Log</CardTitle>
        <CardDescription className="text-gray-400">Real-time activity log for this challenge</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        {events.length > 0 ? (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Capture</Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Defense</Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Attack</Badge>
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">System</Badge>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-md bg-gray-900/40 border border-gray-800/70"
                >
                  <div className="mt-1">{eventTypeIcon[event.type]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <Badge className={EVENT_TYPE_BADGE[event.type]}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-gray-300">{event.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No events recorded yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

