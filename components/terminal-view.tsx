"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Send, TerminalIcon } from "lucide-react"
import { useKoth } from "@/context/koth-context"

interface TerminalViewProps {
  instanceId: string
}

export function TerminalView({ instanceId }: TerminalViewProps) {
  const { instances } = useKoth()
  const [command, setCommand] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const instance = instances[instanceId]

  // Initialize terminal with welcome message
  useEffect(() => {
    if (instance) {
      setTerminalOutput([
        `Connected to ${instance.name} (${instance.accessCredentials.host})`,
        "Type 'help' for available commands.",
        "",
      ])
    }
  }, [instance])

  // Auto-scroll terminal to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  const handleCommand = () => {
    if (!command.trim()) return

    // Add command to terminal output
    setTerminalOutput((prev) => [...prev, `$ ${command}`])

    // Process command
    setIsLoading(true)
    setTimeout(() => {
      let response: string[] = []

      switch (command.toLowerCase()) {
        case "help":
          response = [
            "Available commands:",
            "  help     - Show this help message",
            "  clear    - Clear the terminal",
            "  ls       - List files in current directory",
            "  cat      - View file contents (usage: cat filename)",
            "  whoami   - Show current user",
            "  ps       - List running processes",
            "  netstat  - Show network connections",
            "  reset    - Reset the terminal session",
            "",
          ]
          break

        case "clear":
          setTerminalOutput([])
          setIsLoading(false)
          setCommand("")
          return

        case "ls":
          response = [
            "total 32",
            "drwxr-xr-x 2 root root 4096 Apr 15 10:23 .",
            "drwxr-xr-x 6 root root 4096 Apr 15 10:23 ..",
            "-rw-r--r-- 1 root root  220 Apr 15 10:23 .bash_logout",
            "-rw-r--r-- 1 root root 3771 Apr 15 10:23 .bashrc",
            "-rw-r--r-- 1 root root  807 Apr 15 10:23 .profile",
            "-rwxr-xr-x 1 root root  512 Apr 15 10:23 flag.txt",
            "-rwxr-xr-x 1 root root 1024 Apr 15 10:23 vulnerable_service",
            "",
          ]
          break

        case "cat flag.txt":
          response = ["Permission denied: You need to exploit the vulnerable service to read this file.", ""]
          break

        case "whoami":
          response = [instance?.accessCredentials.username || "user", ""]
          break

        case "ps":
          response = [
            "  PID TTY          TIME CMD",
            "    1 ?        00:00:01 systemd",
            "   10 ?        00:00:00 sshd",
            "   15 ?        00:00:02 vulnerable_service",
            "   22 pts/0    00:00:00 bash",
            "   29 pts/0    00:00:00 ps",
            "",
          ]
          break

        case "netstat":
          response = [
            "Active Internet connections (servers and established)",
            "Proto Recv-Q Send-Q Local Address           Foreign Address         State",
            "tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN",
            "tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN",
            "tcp        0      0 0.0.0.0:4444            0.0.0.0:*               LISTEN",
            "tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN",
            "",
          ]
          break

        case "reset":
          response = [
            "Resetting terminal session...",
            `Connected to ${instance?.name} (${instance?.accessCredentials.host})`,
            "Type 'help' for available commands.",
            "",
          ]
          break

        default:
          if (command.toLowerCase().startsWith("cat ")) {
            response = [`File not found: ${command.slice(4)}`, ""]
          } else {
            response = [`Command not found: ${command}`, "Type 'help' for available commands.", ""]
          }
      }

      setTerminalOutput((prev) => [...prev, ...response])
      setIsLoading(false)
      setCommand("")
    }, 500) // Simulate network delay
  }

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTerminalOutput([
        "Terminal reset.",
        `Connected to ${instance?.name} (${instance?.accessCredentials.host})`,
        "Type 'help' for available commands.",
        "",
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 opacity-50"></div>
      <CardHeader className="relative border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-gray-200">Terminal</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 border-gray-700 text-gray-400"
            onClick={handleReset}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        <CardDescription className="text-gray-400">Interactive terminal for the challenge environment</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div
          ref={terminalRef}
          className="bg-black/70 font-mono text-sm text-green-400 p-4 h-[400px] overflow-y-auto custom-scrollbar"
        >
          {terminalOutput.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap mb-1">
              {line}
            </div>
          ))}
          {isLoading && <div className="animate-pulse">_</div>}
        </div>
        <div className="p-2 border-t border-gray-800 bg-gray-900/80">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleCommand()
                }
              }}
              placeholder="Enter command..."
              className="bg-black/50 border-gray-700 text-white font-mono"
              disabled={isLoading}
            />
            <Button
              onClick={handleCommand}
              disabled={isLoading || !command.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

