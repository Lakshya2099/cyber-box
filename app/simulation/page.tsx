"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { TerminalIcon, ArrowLeft, Shield, AlertCircle, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CyberTerminal } from "@/components/cyber-terminal"
import { GlitchText } from "@/components/glitch-text"
import { MatrixBackground } from "@/components/matrix-background"
import { useCyberState } from "@/context/cyber-state-context"
import Link from "next/link"

export default function SimulationPage() {
  const searchParams = useSearchParams()
  const moduleId = searchParams.get("module") || "network"
  const difficultyLevel = searchParams.get("difficulty") || "beginner"

  const [currentTask, setCurrentTask] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [moduleData, setModuleData] = useState<any>(null)

  // Get our global state
  const { updateModuleProgress } = useCyberState()

  // Load module data based on the selected module
  useEffect(() => {
    // In a real app, this would fetch from an API
    const modules = {
      phishing: {
        title: "Phishing Awareness",
        description: "Learn to identify and defend against phishing attacks",
        icon: AlertCircle,
        color: "from-red-500 to-orange-500",
        tasks: [
          {
            id: 1,
            title: "Identify Phishing Email",
            description: "Analyze the provided email and identify phishing indicators",
            difficulty: {
              beginner: {
                instructions:
                  "Run 'analyze-email' to view the suspicious email, then use 'identify-indicators' to list the phishing signs you found.",
                hints: [
                  "Check the sender's email address",
                  "Look for urgency in the message",
                  "Examine the URL in the email",
                ],
                solution: "identify-indicators sender-address url-mismatch urgency spelling-errors",
              },
              intermediate: {
                instructions:
                  "Run 'analyze-email' to view the suspicious email, then use 'identify-indicators' to list all phishing signs.",
                hints: ["Check for technical inconsistencies"],
                solution: "identify-indicators sender-address url-mismatch urgency spelling-errors request-credentials",
              },
              advanced: {
                instructions:
                  "Run 'analyze-email' to view the suspicious email, then use 'identify-indicators' with all phishing signs without hints.",
                hints: [],
                solution:
                  "identify-indicators sender-address url-mismatch urgency spelling-errors request-credentials spoofed-domain",
              },
            },
          },
          {
            id: 2,
            title: "Email Header Analysis",
            description: "Examine email headers to trace the origin of a phishing attempt",
            difficulty: {
              beginner: {
                instructions:
                  "Run 'show-headers' to view the email headers, then use 'trace-origin' to identify the true source.",
                hints: ["Look at the 'Received:' fields", "Check for IP addresses that don't match the claimed sender"],
                solution: "trace-origin 192.168.1.100",
              },
              intermediate: {
                instructions:
                  "Run 'show-headers' to view the email headers, then use 'trace-origin' with the source IP and country code.",
                hints: ["Use 'geolocate' to find the country code"],
                solution: "trace-origin 192.168.1.100 RU",
              },
              advanced: {
                instructions:
                  "Analyze the headers with 'show-headers' and use 'full-trace' to map the complete path of the email.",
                hints: [],
                solution: "full-trace 192.168.1.100 RU 103.45.67.89 CN",
              },
            },
          },
          {
            id: 3,
            title: "Secure Response",
            description: "Practice the proper response to a suspected phishing attempt",
            difficulty: {
              beginner: {
                instructions: "Use 'respond-to-phishing' with the appropriate actions to take.",
                hints: ["Don't click links", "Report to IT security", "Don't reply to the sender"],
                solution: "respond-to-phishing report-to-security do-not-click do-not-reply",
              },
              intermediate: {
                instructions: "Create a complete security response plan using 'create-response-plan'.",
                hints: ["Include user education"],
                solution:
                  "create-response-plan report-to-security do-not-click do-not-reply isolate-system update-filters",
              },
              advanced: {
                instructions: "Implement a full organizational response with 'org-response'.",
                hints: [],
                solution:
                  "org-response report-to-security do-not-click do-not-reply isolate-system update-filters company-alert forensic-analysis",
              },
            },
          },
        ],
      },
      network: {
        title: "Network Security",
        description: "Understand network vulnerabilities and implement protections",
        icon: Shield,
        color: "from-blue-500 to-cyan-500",
        tasks: [
          {
            id: 1,
            title: "Network Scanning",
            description: "Scan a network to identify active hosts and open ports",
            difficulty: {
              beginner: {
                instructions: "Use 'scan-network' to identify active hosts on the subnet.",
                hints: ["Try the 192.168.1.0/24 subnet", "Look for hosts with port 22 open"],
                solution: "scan-network 192.168.1.0/24",
              },
              intermediate: {
                instructions: "Perform a comprehensive port scan on the target host.",
                hints: ["Use scan-ports with the target IP"],
                solution: "scan-ports 192.168.1.10 --all",
              },
              advanced: {
                instructions: "Conduct a stealth scan and identify service versions.",
                hints: [],
                solution: "stealth-scan 192.168.1.10 --service-detection",
              },
            },
          },
          {
            id: 2,
            title: "Firewall Configuration",
            description: "Configure a firewall to protect against unauthorized access",
            difficulty: {
              beginner: {
                instructions: "Use 'configure-firewall' to block incoming connections to port 23 (telnet).",
                hints: ["Block incoming traffic", "Specify port 23"],
                solution: "configure-firewall --block incoming --port 23",
              },
              intermediate: {
                instructions: "Create a firewall rule to allow only specific IPs to access SSH.",
                hints: ["Allow only from trusted networks"],
                solution: "configure-firewall --allow incoming --port 22 --source 10.0.0.0/8",
              },
              advanced: {
                instructions: "Implement a complete firewall ruleset for a web server.",
                hints: [],
                solution:
                  "configure-firewall --ruleset webserver --allow incoming --port 80,443 --rate-limit 100/min --block incoming --port 0-79,81-442,444-65535",
              },
            },
          },
          {
            id: 3,
            title: "Intrusion Detection",
            description: "Set up and test an intrusion detection system",
            difficulty: {
              beginner: {
                instructions: "Use 'setup-ids' to configure basic intrusion detection.",
                hints: ["Enable signature-based detection", "Monitor port 80"],
                solution: "setup-ids --mode signature --monitor-port 80",
              },
              intermediate: {
                instructions: "Configure IDS with custom rules and test with simulated attack.",
                hints: ["Add rules for SQL injection detection"],
                solution: "setup-ids --mode hybrid --add-rule sql-injection --test-detection",
              },
              advanced: {
                instructions: "Implement a comprehensive IDS/IPS system with automated responses.",
                hints: [],
                solution:
                  "setup-ids --mode advanced --behavior-analysis --auto-response --add-rule sql-injection,xss,csrf --log-level verbose",
              },
            },
          },
        ],
      },
      crypto: {
        title: "Cryptography Basics",
        description: "Learn encryption fundamentals and secure communications",
        icon: Lock,
        color: "from-purple-500 to-pink-500",
        tasks: [
          {
            id: 1,
            title: "Encryption Basics",
            description: "Practice basic encryption and decryption techniques",
            difficulty: {
              beginner: {
                instructions: "Use 'encrypt' to encrypt the message 'secret' with the key 'key123'.",
                hints: ["Specify the algorithm as AES", "Format: encrypt <message> <key> <algorithm>"],
                solution: "encrypt secret key123 aes",
              },
              intermediate: {
                instructions: "Encrypt a message with AES-256 and then decrypt it.",
                hints: ["Use decrypt after encryption"],
                solution:
                  "encrypt 'confidential data' strong-key-123 aes-256 && decrypt <encrypted-output> strong-key-123 aes-256",
              },
              advanced: {
                instructions: "Implement asymmetric encryption with RSA key generation and message exchange.",
                hints: [],
                solution:
                  "generate-keypair rsa 2048 && encrypt-asymmetric 'top secret' public.key && decrypt-asymmetric <encrypted-output> private.key",
              },
            },
          },
          {
            id: 2,
            title: "Hash Functions",
            description: "Understand and use cryptographic hash functions",
            difficulty: {
              beginner: {
                instructions: "Generate an MD5 hash of the string 'password'.",
                hints: ["Use the hash command", "Specify MD5 as the algorithm"],
                solution: "hash password md5",
              },
              intermediate: {
                instructions: "Compare the security of different hash algorithms by generating multiple hashes.",
                hints: ["Try SHA-256 and SHA-512"],
                solution: "hash password md5 && hash password sha256 && hash password sha512 && compare-hashes",
              },
              advanced: {
                instructions: "Demonstrate a hash collision in MD5 and explain why it's insecure.",
                hints: [],
                solution: "find-collision md5 && explain-vulnerability md5-collision",
              },
            },
          },
          {
            id: 3,
            title: "Secure Communication",
            description: "Set up a secure communication channel",
            difficulty: {
              beginner: {
                instructions: "Establish a secure connection using 'secure-connect' with TLS.",
                hints: ["Specify the protocol as TLS", "Use port 443"],
                solution: "secure-connect --protocol tls --port 443",
              },
              intermediate: {
                instructions: "Configure perfect forward secrecy in your TLS connection.",
                hints: ["Add the PFS option"],
                solution: "secure-connect --protocol tls --port 443 --cipher ECDHE-RSA-AES256-GCM-SHA384 --pfs",
              },
              advanced: {
                instructions: "Implement a complete secure messaging system with end-to-end encryption.",
                hints: [],
                solution:
                  "setup-e2ee --protocol signal --generate-keys --authenticate-recipient --establish-session --send-message 'This is secure' --verify-delivery",
              },
            },
          },
        ],
      },
    }

    setModuleData(modules[moduleId as keyof typeof modules])
  }, [moduleId])

  // Initialize completed tasks from global state
  useEffect(() => {
    if (moduleData) {
      // Update the local state with completed tasks
      const localCompletedTasks = completedTasks.slice()
      setCompletedTasks(localCompletedTasks)
    }
  }, [moduleData])

  if (!moduleData) {
    return <div>Loading...</div>
  }

  const currentTaskData = moduleData.tasks[currentTask]
  const taskDifficulty = currentTaskData.difficulty[difficultyLevel]

  const handleCommandSubmit = (command: string) => {
    // Add the command to the terminal history
    const newHistory = [...terminalHistory, `$ ${command}`]

    // Process the command
    if (command.trim().toLowerCase() === taskDifficulty.solution.toLowerCase()) {
      newHistory.push(`✅ Task completed successfully!`)

      if (!completedTasks.includes(currentTaskData.id)) {
        // Update local state
        const updatedCompletedTasks = [...completedTasks, currentTaskData.id]
        setCompletedTasks(updatedCompletedTasks)

        // Update global state
        updateModuleProgress(moduleId, currentTaskData.id, moduleData.title, moduleData.tasks.length)
      }
    } else if (command.trim().toLowerCase() === "help") {
      newHistory.push(`Available commands:
- help: Show this help message
- hint: Get a hint for the current task
- task: Show current task details
- clear: Clear the terminal
- exit: Return to dashboard`)
    } else if (command.trim().toLowerCase() === "hint") {
      if (taskDifficulty.hints && taskDifficulty.hints.length > 0) {
        newHistory.push(`Hint: ${taskDifficulty.hints[0]}`)
      } else {
        newHistory.push(`No hints available for advanced difficulty.`)
      }
    } else if (command.trim().toLowerCase() === "task") {
      newHistory.push(`Current Task: ${currentTaskData.title}
${currentTaskData.description}

Instructions: ${taskDifficulty.instructions}`)
    } else if (command.trim().toLowerCase() === "clear") {
      setTerminalHistory([])
      return
    } else if (command.trim().toLowerCase() === "exit") {
      window.location.href = "/"
      return
    } else if (command.trim().toLowerCase().startsWith("analyze-email")) {
      newHistory.push(`
From: security@bankofamerica-secure.com
To: user@example.com
Subject: URGENT: Your Account Has Been Compromised

Dear Valued Customer,

We have detected suspicious activity on your account. Your account may have been compromised.

Please click the link below to verify your identity and secure your account immediately:
https://bankofamerica-secure.verify-now.com/login

This is urgent and requires your immediate attention to prevent unauthorized transactions.

Bank of America Security Team
`)
    } else if (command.trim().toLowerCase().startsWith("show-headers")) {
      newHistory.push(`
Received: from mail.secure-server.com (unknown [192.168.1.100])
    by mail.example.com (Postfix) with ESMTP id 123ABC
    for <user@example.com>; Mon, 15 Mar 2023 10:22:33 -0700 (PDT)
From: "Bank of America Security" <security@bankofamerica-secure.com>
Reply-To: security@bankofamerica-secure.com
To: user@example.com
Message-ID: <fake-id-12345@phishing-server.com>
Subject: URGENT: Your Account Has Been Compromised
Date: Mon, 15 Mar 2023 10:22:30 -0700
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
X-Mailer: PHPMailer 6.0.2 (https://github.com/PHPMailer/PHPMailer)
X-Spam-Status: Yes, score=8.5
`)
    } else if (command.trim().toLowerCase().startsWith("scan-network")) {
      newHistory.push(`
Scanning network 192.168.1.0/24...
Found 8 active hosts:

192.168.1.1 - Router [Ports: 80(http), 443(https), 22(ssh)]
192.168.1.10 - Server [Ports: 22(ssh), 80(http), 443(https), 3306(mysql)]
192.168.1.20 - Workstation [Ports: 445(smb)]
192.168.1.30 - Workstation [Ports: 445(smb)]
192.168.1.50 - Printer [Ports: 9100(printer), 80(http)]
192.168.1.100 - Unknown [Ports: 22(ssh), 21(ftp), 25(smtp)]
192.168.1.150 - Workstation [Ports: 445(smb)]
192.168.1.200 - Server [Ports: 22(ssh), 80(http), 443(https)]

Scan complete.
`)
    } else if (command.trim().toLowerCase().startsWith("hash")) {
      const parts = command.split(" ")
      if (parts.length >= 3 && parts[1] === "password") {
        if (parts[2] === "md5") {
          newHistory.push(`MD5 hash of 'password': 5f4dcc3b5aa765d61d8327deb882cf99`)
        } else if (parts[2] === "sha256") {
          newHistory.push(
            `SHA-256 hash of 'password': 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8`,
          )
        } else if (parts[2] === "sha512") {
          newHistory.push(
            `SHA-512 hash of 'password': b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86`,
          )
        }
      } else {
        newHistory.push(`Usage: hash <string> <algorithm>`)
      }
    } else {
      // Simulate command processing
      newHistory.push(`Executing: ${command}`)
      newHistory.push(`Command not recognized or incomplete. Type 'help' for available commands.`)
    }

    setTerminalHistory(newHistory)
  }

  const handleNextTask = () => {
    if (currentTask < moduleData.tasks.length - 1) {
      setCurrentTask(currentTask + 1)
      setTerminalHistory([])
    }
  }

  const handlePreviousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1)
      setTerminalHistory([])
    }
  }

  const progress = (completedTasks.length / moduleData.tasks.length) * 100

  const ModuleIcon = moduleData.icon

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Matrix-like background */}
      <MatrixBackground />

      {/* Content container with glass effect */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-20">
          <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="ml-auto flex items-center gap-4">
              <div
                className={`px-3 py-1 rounded-full bg-gradient-to-r ${moduleData.color} text-white text-sm font-medium`}
              >
                {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container px-4 py-6 sm:px-6 lg:px-8 flex-1 flex flex-col">
          {/* Simulation header */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${moduleData.color.split("-")[0]}-500/20 border border-${moduleData.color.split("-")[0]}-500/30`}
              >
                <ModuleIcon className={`h-5 w-5 text-${moduleData.color.split("-")[0]}-500`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${moduleData.color} bg-clip-text text-transparent`}>
                  {moduleData.title} Simulation
                </h1>
                <p className="text-gray-400">{moduleData.description}</p>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Simulation Progress</span>
                <span className="text-gray-300 font-medium">
                  {completedTasks.length} of {moduleData.tasks.length} tasks
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-gray-800"
                indicatorClassName={`bg-gradient-to-r ${moduleData.color}`}
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-5 flex-1">
            {/* Task panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${moduleData.color}/5 opacity-50`}></div>
                <CardHeader className="relative">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-gray-200">
                      Task {currentTask + 1}: {currentTaskData.title}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {moduleData.tasks.map((task: any, index: number) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentTask
                              ? `bg-${moduleData.color.split("-")[0]}-500`
                              : completedTasks.includes(task.id)
                                ? "bg-emerald-500"
                                : "bg-gray-700"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">{currentTaskData.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div className="rounded-md border border-gray-800 bg-black/50 p-3 text-sm">
                    <p className="font-medium text-gray-300 mb-2">Instructions:</p>
                    <p className="text-gray-400">{taskDifficulty.instructions}</p>
                  </div>

                  {taskDifficulty.hints && taskDifficulty.hints.length > 0 && difficultyLevel !== "advanced" && (
                    <div className="rounded-md border border-amber-900/30 bg-amber-500/5 p-3 text-sm">
                      <p className="font-medium text-amber-400 mb-1">Hints:</p>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {taskDifficulty.hints.map((hint: string, index: number) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePreviousTask}
                      disabled={currentTask === 0}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Previous Task
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleNextTask}
                      disabled={currentTask === moduleData.tasks.length - 1}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Next Task
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${moduleData.color}/5 opacity-50`}></div>
                <CardHeader className="relative">
                  <CardTitle className="text-gray-200">Task Status</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    {moduleData.tasks.map((task: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md border border-gray-800 bg-black/30"
                      >
                        <div className="flex items-center gap-2">
                          {completedTasks.includes(task.id) ? (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <div
                              className={`h-5 w-5 rounded-full border ${
                                index === currentTask
                                  ? `border-${moduleData.color.split("-")[0]}-500`
                                  : "border-gray-700"
                              }`}
                            ></div>
                          )}
                          <span
                            className={`text-sm ${
                              completedTasks.includes(task.id)
                                ? "text-gray-300 line-through"
                                : index === currentTask
                                  ? "text-white font-medium"
                                  : "text-gray-400"
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                        {completedTasks.includes(task.id) && (
                          <span className="text-xs text-emerald-500">Completed</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Terminal panel */}
            <div className="lg:col-span-3 flex flex-col">
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm overflow-hidden relative flex-1 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/50"></div>
                <CardHeader className="relative border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-200 flex items-center gap-2">
                      <TerminalIcon className="h-5 w-5 text-gray-400" />
                      <GlitchText text="Cyber Terminal" />
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative p-0 flex-1 flex flex-col">
                  <CyberTerminal
                    history={terminalHistory}
                    onCommand={handleCommandSubmit}
                    prompt={`${moduleId}@${difficultyLevel}:~$`}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

