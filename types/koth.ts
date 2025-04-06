export type KothInstance = {
  id: string
  name: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  currentKing: KothKing | null
  startTime: string
  endTime: string
  active: boolean
  participants: number
  maxParticipants: number
  accessCredentials: {
    host: string
    port: number
    username: string
    password: string
  }
  events: KothEvent[]
  registered: boolean
}

export type KothKing = {
  id: string
  username: string
  captureTime: string
  team?: string
}

export type KothEvent = {
  id: string
  type: "capture" | "defense" | "attack" | "system"
  timestamp: string
  message: string
  userId: string
  username: string
}

export type KothLeaderboardEntry = {
  id: string
  username: string
  team?: string
  totalUptime: number // in seconds
  captures: number
  lastActivity: string
  rank: number
}

export type KothState = {
  instances: Record<string, KothInstance>
  leaderboards: Record<string, KothLeaderboardEntry[]>
  userTotalUptime: number
  userCaptures: number
  userRank: number
  registerForInstance: (instanceId: string) => void
  captureInstance: (instanceId: string, flag: string) => boolean
  getUserEvents: (instanceId: string) => KothEvent[]
  getActiveInstances: () => KothInstance[]
  getPastInstances: () => KothInstance[]
}

