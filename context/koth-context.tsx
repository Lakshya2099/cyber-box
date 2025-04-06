"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useCyberState } from "@/context/cyber-state-context"
import type { KothEvent, KothInstance, KothLeaderboardEntry, KothState } from "@/types/koth"
import { generateMockInstances, generateMockLeaderboards } from "@/lib/koth-utils"

const KothContext = createContext<KothState | undefined>(undefined)

export function KothProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    instances: Record<string, KothInstance>
    leaderboards: Record<string, KothLeaderboardEntry[]>
    userEvents: Record<string, string[]>
    userTotalUptime: number
    userCaptures: number
    userRank: number
  }>({
    instances: {},
    leaderboards: {},
    userEvents: {},
    userTotalUptime: 0,
    userCaptures: 0,
    userRank: 0,
  })

  const { awardBadge } = useCyberState()

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("kothState")
    if (savedState) {
      setState(JSON.parse(savedState))
    } else {
      // Initialize with mock data if no saved state
      initializeMockData()
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kothState", JSON.stringify(state))
  }, [state])

  // Update king uptime and check for challenge end
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const currentDate = now.toISOString()

      setState((prevState) => {
        const updatedInstances = { ...prevState.instances }
        let hasChanges = false

        // Update active status and king uptime for each instance
        Object.keys(updatedInstances).forEach((id) => {
          const instance = updatedInstances[id]

          // Check if instance should be active
          const shouldBeActive = instance.startTime <= currentDate && instance.endTime >= currentDate

          if (instance.active !== shouldBeActive) {
            updatedInstances[id] = {
              ...instance,
              active: shouldBeActive,
            }
            hasChanges = true
          }

          // If instance is active and has a king, update leaderboard
          if (instance.active && instance.currentKing) {
            const leaderboard = [...(prevState.leaderboards[id] || [])]
            const kingIndex = leaderboard.findIndex((entry) => entry.id === instance.currentKing?.id)

            if (kingIndex !== -1) {
              // Update king's uptime (add 1 second)
              leaderboard[kingIndex] = {
                ...leaderboard[kingIndex],
                totalUptime: leaderboard[kingIndex].totalUptime + 1,
                lastActivity: currentDate,
              }

              // Sort and update ranks
              leaderboard.sort((a, b) => b.totalUptime - a.totalUptime)
              leaderboard.forEach((entry, index) => {
                entry.rank = index + 1
              })

              // Update leaderboard
              const updatedLeaderboards = { ...prevState.leaderboards }
              updatedLeaderboards[id] = leaderboard

              // Update user stats if current user is king
              if (instance.currentKing.id === "current-user") {
                return {
                  ...prevState,
                  instances: updatedInstances,
                  leaderboards: updatedLeaderboards,
                  userTotalUptime: prevState.userTotalUptime + 1,
                  userRank: leaderboard.find((entry) => entry.id === "current-user")?.rank || 0,
                }
              }

              return {
                ...prevState,
                instances: updatedInstances,
                leaderboards: updatedLeaderboards,
              }
            }
          }
        })

        return hasChanges ? { ...prevState, instances: updatedInstances } : prevState
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  // Initialize with mock data for demonstration
  const initializeMockData = () => {
    const mockInstances = generateMockInstances()
    const mockLeaderboards = generateMockLeaderboards(mockInstances)

    setState({
      instances: mockInstances,
      leaderboards: mockLeaderboards,
      userEvents: {},
      userTotalUptime: 0,
      userCaptures: 0,
      userRank: 0,
    })
  }

  // Register for an instance
  const registerForInstance = (instanceId: string) => {
    setState((prevState) => {
      const updatedInstances = { ...prevState.instances }

      if (updatedInstances[instanceId]) {
        updatedInstances[instanceId] = {
          ...updatedInstances[instanceId],
          registered: true,
          participants: updatedInstances[instanceId].participants + 1,
        }
      }

      return {
        ...prevState,
        instances: updatedInstances,
      }
    })
  }

  // Capture an instance (submit flag)
  const captureInstance = (instanceId: string, flag: string): boolean => {
    // In a real app, you would validate the flag against the server
    // For this demo, we'll accept any non-empty flag
    if (!flag.trim()) {
      return false
    }

    setState((prevState) => {
      const updatedInstances = { ...prevState.instances }

      if (updatedInstances[instanceId] && updatedInstances[instanceId].active) {
        const instance = updatedInstances[instanceId]
        const now = new Date()
        const captureTime = now.toISOString()

        // Create capture event
        const captureEvent: KothEvent = {
          id: `event-${Date.now()}`,
          type: "capture",
          timestamp: captureTime,
          message: "You have captured the instance and are now the king!",
          userId: "current-user",
          username: "You",
        }

        // Update instance with new king and add event
        updatedInstances[instanceId] = {
          ...instance,
          currentKing: {
            id: "current-user",
            username: "You",
            captureTime,
          },
          events: [captureEvent, ...instance.events],
        }

        // Update leaderboard
        const updatedLeaderboards = { ...prevState.leaderboards }
        const leaderboard = [...(updatedLeaderboards[instanceId] || [])]

        // Find or create user in leaderboard
        const userIndex = leaderboard.findIndex((entry) => entry.id === "current-user")

        if (userIndex === -1) {
          // Add user to leaderboard
          leaderboard.push({
            id: "current-user",
            username: "You",
            totalUptime: 0,
            captures: 1,
            lastActivity: captureTime,
            rank: 0,
          })
        } else {
          // Update user in leaderboard
          leaderboard[userIndex] = {
            ...leaderboard[userIndex],
            captures: leaderboard[userIndex].captures + 1,
            lastActivity: captureTime,
          }
        }

        // Sort and update ranks
        leaderboard.sort((a, b) => b.totalUptime - a.totalUptime)
        leaderboard.forEach((entry, index) => {
          entry.rank = index + 1
        })

        updatedLeaderboards[instanceId] = leaderboard

        // Update user events
        const userEvents = { ...prevState.userEvents }
        if (!userEvents[instanceId]) {
          userEvents[instanceId] = []
        }
        userEvents[instanceId].push(captureEvent.id)

        // Award King of the Hill badge after 3 captures
        if (prevState.userCaptures + 1 >= 3) {
          awardBadge(7) // Assuming 7 is the ID for the King of the Hill badge
        }

        return {
          ...prevState,
          instances: updatedInstances,
          leaderboards: updatedLeaderboards,
          userEvents,
          userCaptures: prevState.userCaptures + 1,
        }
      }

      return prevState
    })

    return true
  }

  // Get user events for an instance
  const getUserEvents = (instanceId: string): KothEvent[] => {
    const instance = state.instances[instanceId]
    const userEventIds = state.userEvents[instanceId] || []

    if (!instance) {
      return []
    }

    return instance.events.filter((event) => userEventIds.includes(event.id) || event.userId === "current-user")
  }

  // Get active instances
  const getActiveInstances = (): KothInstance[] => {
    return Object.values(state.instances).filter((instance) => instance.active)
  }

  // Get past instances
  const getPastInstances = (): KothInstance[] => {
    return Object.values(state.instances).filter((instance) => !instance.active)
  }

  const value = {
    instances: state.instances,
    leaderboards: state.leaderboards,
    userTotalUptime: state.userTotalUptime,
    userCaptures: state.userCaptures,
    userRank: state.userRank,
    registerForInstance,
    captureInstance,
    getUserEvents,
    getActiveInstances,
    getPastInstances,
  }

  return <KothContext.Provider value={value}>{children}</KothContext.Provider>
}

export function useKoth() {
  const context = useContext(KothContext)
  if (context === undefined) {
    throw new Error("useKoth must be used within a KothProvider")
  }
  return context
}

