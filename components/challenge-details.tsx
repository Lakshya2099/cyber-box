import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { KothInstance } from "@/types/koth"
import { CredentialsPanel } from "@/components/koth/credentials-panel"

interface ChallengeDetailsProps {
  instance: KothInstance
}

export function ChallengeDetails({ instance }: ChallengeDetailsProps) {
  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-50"></div>
      <CardHeader className="relative">
        <CardTitle className="text-gray-200">Challenge Details</CardTitle>
        <CardDescription className="text-gray-400">Information about this King of the Hill challenge</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <p className="text-gray-300">{instance.description}</p>

        <div className="space-y-2">
          <h3 className="font-medium text-white">Challenge Rules:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Find and submit the flag to become king</li>
            <li>Defend your position against other players</li>
            <li>Earn points based on your uptime as king</li>
            <li>The player with the most uptime wins</li>
            <li>Do not attack other players outside the challenge environment</li>
          </ul>
        </div>

        {instance.registered && <CredentialsPanel instance={instance} />}
      </CardContent>
    </Card>
  )
}

