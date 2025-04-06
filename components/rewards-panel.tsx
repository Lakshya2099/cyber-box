import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Shield, Trophy } from "lucide-react"

export function RewardsPanel() {
  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-50"></div>
      <CardHeader className="relative">
        <CardTitle className="text-gray-200">Rewards</CardTitle>
        <CardDescription className="text-gray-400">Earn badges and recognition</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 relative">
              <Crown className="h-8 w-8 text-purple-500" />
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md opacity-50"></div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">King of the Hill Badge</h3>
              <p className="text-gray-400">Awarded for capturing the throne 3 times</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/30 relative">
              <Shield className="h-8 w-8 text-blue-500" />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-50"></div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Defender Badge</h3>
              <p className="text-gray-400">Maintain control for over 30 minutes total</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-700/20 bg-gray-800/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700/20 border border-gray-700/30 relative">
              <Trophy className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Top 3 Ranking</h3>
              <p className="text-gray-400">Special recognition on the leaderboard</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

