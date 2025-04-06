"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy, AlertTriangle } from "lucide-react"
import type { KothInstance } from "@/types/koth"

interface CredentialsPanelProps {
  instance: KothInstance
}

export function CredentialsPanel({ instance }: CredentialsPanelProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(null)
    }, 2000)
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-white">Access Credentials</h3>
      <div className="bg-gray-800/50 rounded-md p-3 border border-gray-700/50 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Host:</span>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900/50 px-2 py-1 rounded text-purple-300 text-sm">
              {instance.accessCredentials.host}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(instance.accessCredentials.host, "host")}
            >
              {copied === "host" ? <CheckCircle className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Port:</span>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900/50 px-2 py-1 rounded text-purple-300 text-sm">
              {instance.accessCredentials.port}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(instance.accessCredentials.port.toString(), "port")}
            >
              {copied === "port" ? <CheckCircle className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Username:</span>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900/50 px-2 py-1 rounded text-purple-300 text-sm">
              {instance.accessCredentials.username}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(instance.accessCredentials.username, "username")}
            >
              {copied === "username" ? (
                <CheckCircle className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Password:</span>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900/50 px-2 py-1 rounded text-purple-300 text-sm">
              {instance.accessCredentials.password}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copyToClipboard(instance.accessCredentials.password, "password")}
            >
              {copied === "password" ? (
                <CheckCircle className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2 p-3 rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-400 mt-2">
        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium mb-1">Important</p>
          <p className="text-sm">
            These credentials are for accessing the challenge environment only. Do not use them for any other purpose.
          </p>
        </div>
      </div>
    </div>
  )
}

