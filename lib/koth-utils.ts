import type { KothEvent, KothInstance, KothLeaderboardEntry } from "@/types/koth"

// Generate a future date (days from now)
export const getFutureDate = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

// Generate mock events for testing
export function generateMockEvents(count: number): KothEvent[] {
  const events: KothEvent[] = []
  const now = new Date()
  const eventTypes: ("capture" | "defense" | "attack" | "system")[] = ["capture", "defense", "attack", "system"]
  const usernames = ["HackerElite", "RootMaster", "ByteWizard", "CipherQueen", "KernelPanic", "NullPointer"]

  for (let i = 0; i < count; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const username = usernames[Math.floor(Math.random() * usernames.length)]
    const minutesAgo = Math.floor(Math.random() * 120) // Random time up to 2 hours ago

    let message = ""
    switch (type) {
      case "capture":
        message = `${username} has captured the instance and is now the king!`
        break
      case "defense":
        message = `${username} successfully defended against an attack attempt.`
        break
      case "attack":
        message = `${username} attempted to capture the instance but failed.`
        break
      case "system":
        message = "System reset performed. The instance is now available for capture."
        break
    }

    events.push({
      id: `event-${i}`,
      type,
      timestamp: new Date(now.getTime() - minutesAgo * 60000).toISOString(),
      message,
      userId: `user-${Math.floor(Math.random() * 20)}`,
      username,
    })
  }

  // Sort events by timestamp (newest first)
  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Generate mock data for KotH instances
export function generateMockInstances(): Record<string, KothInstance> {
  // Get current date in ISO format
  const now = new Date()
  const currentDate = now.toISOString()

  return {
    "web-server-takeover": {
      id: "web-server-takeover",
      name: "Web Server Takeover",
      description:
        "Gain and maintain control of a vulnerable web server. Defend against other attackers while maintaining your access.",
      difficulty: "medium",
      currentKing: {
        id: "user-5",
        username: "HackerElite",
        captureTime: new Date(now.getTime() - 15 * 60000).toISOString(), // 15 minutes ago
      },
      startTime: new Date(now.getTime() - 24 * 60 * 60000).toISOString(), // Started 1 day ago
      endTime: getFutureDate(2), // Ends in 2 days
      active: true,
      participants: 18,
      maxParticipants: 25,
      accessCredentials: {
        host: "koth-web-server.cyberacademy.local",
        port: 22,
        username: "challenger",
        password: "start-challenge-123",
      },
      events: generateMockEvents(20),
      registered: false,
    },
    "linux-privilege-escalation": {
      id: "linux-privilege-escalation",
      name: "Linux Privilege Escalation",
      description:
        "Exploit vulnerabilities to gain root access on a Linux server and maintain your control against other players.",
      difficulty: "hard",
      currentKing: {
        id: "user-12",
        username: "RootMaster",
        captureTime: new Date(now.getTime() - 45 * 60000).toISOString(), // 45 minutes ago
      },
      startTime: currentDate,
      endTime: getFutureDate(5), // Ends in 5 days
      active: true,
      participants: 12,
      maxParticipants: 20,
      accessCredentials: {
        host: "koth-linux-server.cyberacademy.local",
        port: 22,
        username: "user",
        password: "challenge-access-456",
      },
      events: generateMockEvents(15),
      registered: false,
    },
    "windows-domain-control": {
      id: "windows-domain-control",
      name: "Windows Domain Control",
      description: "Take over a Windows domain controller and defend your position as the domain admin.",
      difficulty: "hard",
      currentKing: null,
      startTime: getFutureDate(1), // Starts in 1 day
      endTime: getFutureDate(6), // Ends in 6 days
      active: false,
      participants: 0,
      maxParticipants: 15,
      accessCredentials: {
        host: "koth-windows-dc.cyberacademy.local",
        port: 3389,
        username: "guest",
        password: "windows-challenge-789",
      },
      events: [],
      registered: false,
    },
    "iot-device-hijack": {
      id: "iot-device-hijack",
      name: "IoT Device Hijack",
      description: "Capture and maintain control of a network of vulnerable IoT devices.",
      difficulty: "easy",
      currentKing: null,
      startTime: getFutureDate(-10), // Started 10 days ago
      endTime: getFutureDate(-2), // Ended 2 days ago
      active: false,
      participants: 22,
      maxParticipants: 30,
      accessCredentials: {
        host: "koth-iot-network.cyberacademy.local",
        port: 8080,
        username: "admin",
        password: "iot-challenge-321",
      },
      events: generateMockEvents(25),
      registered: false,
    },
  }
}

// Generate mock leaderboards
export function generateMockLeaderboards(
  instances: Record<string, KothInstance>,
): Record<string, KothLeaderboardEntry[]> {
  const mockLeaderboards: Record<string, KothLeaderboardEntry[]> = {}
  const now = new Date()

  Object.keys(instances).forEach((instanceId) => {
    const leaderboard: KothLeaderboardEntry[] = []

    // Generate 10-15 random participants
    const participantCount = Math.floor(Math.random() * 6) + 10
    for (let i = 0; i < participantCount; i++) {
      const captures = Math.floor(Math.random() * 5) + 1
      const totalUptime = Math.floor(Math.random() * 3600) + 60 // 1-60 minutes in seconds

      leaderboard.push({
        id: `user-${i}`,
        username: `CyberKing${i + 1}`,
        totalUptime,
        captures,
        lastActivity: new Date(now.getTime() - Math.floor(Math.random() * 24 * 60 * 60000)).toISOString(),
        rank: 0,
      })
    }

    // Sort by uptime and assign ranks
    leaderboard.sort((a, b) => b.totalUptime - a.totalUptime)
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1
    })

    mockLeaderboards[instanceId] = leaderboard
  })

  return mockLeaderboards
}

