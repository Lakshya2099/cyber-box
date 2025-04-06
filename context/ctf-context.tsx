"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useCyberState } from "@/context/cyber-state-context"

// Define types for our CTF state
export type Challenge = {
  id: string
  title: string
  description: string
  category: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  solved: boolean
  hint?: string
}

export type Competition = {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  active: boolean
  challenges: Challenge[]
  participants: number
  registered: boolean
}

export type Participant = {
  id: string
  username: string
  points: number
  solvedChallenges: number
  rank: number
}

type CTFState = {
  competitions: Record<string, Competition>
  leaderboards: Record<string, Participant[]>
  userPoints: number
  userRank: number
  registerForCompetition: (competitionId: string) => void
  solveChallenge: (competitionId: string, challengeId: string) => void
  getUserSolvedChallenges: (competitionId: string) => string[]
}

const CTFContext = createContext<CTFState | undefined>(undefined)

export function CTFProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    competitions: Record<string, Competition>
    leaderboards: Record<string, Participant[]>
    userSolvedChallenges: Record<string, string[]>
    userPoints: number
    userRank: number
  }>({
    competitions: {},
    leaderboards: {},
    userSolvedChallenges: {},
    userPoints: 0,
    userRank: 0,
  })

  const { awardBadge } = useCyberState()

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("ctfState")
    if (savedState) {
      setState(JSON.parse(savedState))
    } else {
      // Initialize with mock data if no saved state
      initializeMockData()
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ctfState", JSON.stringify(state))
  }, [state])

  // Initialize with mock data for demonstration
  const initializeMockData = () => {
    const mockCompetitions: Record<string, Competition> = {
      "web-warriors": {
        id: "web-warriors",
        title: "Web Warriors Challenge",
        description:
          "Test your web security skills in this competition focused on web vulnerabilities, XSS, CSRF, and SQL injection attacks.",
        startDate: "2023-06-01",
        endDate: "2023-06-30",
        active: true,
        challenges: [
          {
            id: "web-1",
            title: "Cookie Monster",
            description: "Find and exploit the cookie vulnerability to gain admin access.",
            category: "Web",
            points: 100,
            difficulty: "easy",
            solved: false,
            hint: "Check how cookies are being validated on the server.",
          },
          {
            id: "web-2",
            title: "SQL Sleuth",
            description: "Identify and exploit the SQL injection vulnerability to extract user data.",
            category: "Web",
            points: 200,
            difficulty: "medium",
            solved: false,
          },
          {
            id: "web-3",
            title: "XSS Master",
            description: "Execute a cross-site scripting attack that steals admin cookies.",
            category: "Web",
            points: 300,
            difficulty: "hard",
            solved: false,
          },
        ],
        participants: 128,
        registered: false,
      },
      "crypto-conquest": {
        id: "crypto-conquest",
        title: "Crypto Conquest",
        description:
          "Crack codes, break ciphers, and solve cryptographic puzzles in this encryption-focused competition.",
        startDate: "2023-07-15",
        endDate: "2023-08-15",
        active: true,
        challenges: [
          {
            id: "crypto-1",
            title: "Caesar's Secret",
            description: "Decrypt the message encoded with a Caesar cipher.",
            category: "Cryptography",
            points: 100,
            difficulty: "easy",
            solved: false,
            hint: "The key is related to the date of the Roman Empire's founding.",
          },
          {
            id: "crypto-2",
            title: "RSA Rookie",
            description: "Break the weak RSA implementation to recover the private key.",
            category: "Cryptography",
            points: 250,
            difficulty: "medium",
            solved: false,
          },
          {
            id: "crypto-3",
            title: "Blockchain Breaker",
            description: "Find the vulnerability in the blockchain implementation.",
            category: "Cryptography",
            points: 400,
            difficulty: "hard",
            solved: false,
          },
        ],
        participants: 95,
        registered: false,
      },
      "network-ninjas": {
        id: "network-ninjas",
        title: "Network Ninjas",
        description: "Navigate through network security challenges, packet analysis, and firewall evasion techniques.",
        startDate: "2023-05-01",
        endDate: "2023-05-31",
        active: false,
        challenges: [
          {
            id: "network-1",
            title: "Packet Detective",
            description: "Analyze the packet capture to find the hidden message.",
            category: "Network",
            points: 150,
            difficulty: "easy",
            solved: false,
          },
          {
            id: "network-2",
            title: "Firewall Bypass",
            description: "Find a way to bypass the firewall restrictions.",
            category: "Network",
            points: 250,
            difficulty: "medium",
            solved: false,
          },
          {
            id: "network-3",
            title: "DNS Tunneling",
            description: "Implement a DNS tunneling technique to exfiltrate data.",
            category: "Network",
            points: 350,
            difficulty: "hard",
            solved: false,
          },
        ],
        participants: 76,
        registered: false,
      },
    }

    // Generate mock leaderboards
    const mockLeaderboards: Record<string, Participant[]> = {}

    Object.keys(mockCompetitions).forEach((compId) => {
      const participants: Participant[] = []

      // Generate 20 random participants
      for (let i = 0; i < 20; i++) {
        const solvedChallenges = Math.floor(Math.random() * 4) // 0-3 solved challenges
        const points = solvedChallenges * Math.floor(Math.random() * 200 + 100) // Random points based on solved challenges

        participants.push({
          id: `user-${i}`,
          username: `CyberAgent${i + 1}`,
          points,
          solvedChallenges,
          rank: 0, // Will be calculated below
        })
      }

      // Sort by points and assign ranks
      participants.sort((a, b) => b.points - a.points)
      participants.forEach((participant, index) => {
        participant.rank = index + 1
      })

      mockLeaderboards[compId] = participants
    })

    setState({
      competitions: mockCompetitions,
      leaderboards: mockLeaderboards,
      userSolvedChallenges: {},
      userPoints: 0,
      userRank: 0,
    })
  }

  // Register for a competition
  const registerForCompetition = (competitionId: string) => {
    setState((prevState) => {
      const updatedCompetitions = { ...prevState.competitions }

      if (updatedCompetitions[competitionId]) {
        updatedCompetitions[competitionId] = {
          ...updatedCompetitions[competitionId],
          registered: true,
          participants: updatedCompetitions[competitionId].participants + 1,
        }
      }

      return {
        ...prevState,
        competitions: updatedCompetitions,
      }
    })
  }

  // Solve a challenge
  const solveChallenge = (competitionId: string, challengeId: string) => {
    setState((prevState) => {
      // Update the challenge to solved
      const updatedCompetitions = { ...prevState.competitions }

      if (updatedCompetitions[competitionId]) {
        const competition = updatedCompetitions[competitionId]
        const challengeIndex = competition.challenges.findIndex((c) => c.id === challengeId)

        if (challengeIndex !== -1 && !competition.challenges[challengeIndex].solved) {
          // Mark challenge as solved
          competition.challenges[challengeIndex].solved = true

          // Add to user's solved challenges
          const userSolvedChallenges = { ...prevState.userSolvedChallenges }
          if (!userSolvedChallenges[competitionId]) {
            userSolvedChallenges[competitionId] = []
          }
          userSolvedChallenges[competitionId].push(challengeId)

          // Calculate new user points
          const challengePoints = competition.challenges[challengeIndex].points
          const newUserPoints = prevState.userPoints + challengePoints

          // Update user's position in leaderboard
          const updatedLeaderboards = { ...prevState.leaderboards }
          const leaderboard = [...(updatedLeaderboards[competitionId] || [])]

          // Find or create user in leaderboard
          const userIndex = leaderboard.findIndex((p) => p.id === "current-user")

          if (userIndex === -1) {
            // Add user to leaderboard
            leaderboard.push({
              id: "current-user",
              username: "You",
              points: challengePoints,
              solvedChallenges: 1,
              rank: 0,
            })
          } else {
            // Update user in leaderboard
            leaderboard[userIndex] = {
              ...leaderboard[userIndex],
              points: leaderboard[userIndex].points + challengePoints,
              solvedChallenges: leaderboard[userIndex].solvedChallenges + 1,
            }
          }

          // Sort and update ranks
          leaderboard.sort((a, b) => b.points - a.points)
          leaderboard.forEach((participant, index) => {
            participant.rank = index + 1
          })

          updatedLeaderboards[competitionId] = leaderboard

          // Find user's new rank
          const userRank = leaderboard.find((p) => p.id === "current-user")?.rank || 0

          const solvedCount = userSolvedChallenges[competitionId]?.length || 0

          // Award Flag Hunter badge after solving 10 challenges
          if (solvedCount + 1 >= 10) {
            awardBadge(5)
          }

          // Award CTF Champion badge if user is ranked #1
          if (userRank === 1) {
            awardBadge(4)
          }

          // Award Web Warrior badge if all challenges in web-warriors competition are solved
          if (competitionId === "web-warriors" && solvedCount + 1 === competition.challenges.length) {
            awardBadge(6)
          }

          return {
            ...prevState,
            competitions: updatedCompetitions,
            userSolvedChallenges,
            leaderboards: updatedLeaderboards,
            userPoints: newUserPoints,
            userRank,
          }
        }
      }

      return prevState
    })
  }

  // Get user's solved challenges for a competition
  const getUserSolvedChallenges = (competitionId: string): string[] => {
    return state.userSolvedChallenges[competitionId] || []
  }

  const value = {
    competitions: state.competitions,
    leaderboards: state.leaderboards,
    userPoints: state.userPoints,
    userRank: state.userRank,
    registerForCompetition,
    solveChallenge,
    getUserSolvedChallenges,
  }

  return <CTFContext.Provider value={value}>{children}</CTFContext.Provider>
}

export function useCTF() {
  const context = useContext(CTFContext)
  if (context === undefined) {
    throw new Error("useCTF must be used within a CTFProvider")
  }
  return context
}

