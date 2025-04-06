"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define types for our state
type ModuleProgress = {
  id: string
  title: string
  progress: number
  completedTasks: number[]
  totalTasks: number
  completed: boolean
}

type Badge = {
  id: number
  title: string
  description: string
  earned: boolean
  date?: string
  category?: "module" | "ctf" | "achievement"
  icon?: string
  color?: string
}

type CyberState = {
  modules: Record<string, ModuleProgress>
  badges: Record<number, Badge>
  learningProgress: number
  updateModuleProgress: (moduleId: string, taskId: number, moduleTitle: string, totalTasks: number) => void
  completeModule: (moduleId: string) => void
  awardBadge: (badgeId: number) => void
}

const CyberStateContext = createContext<CyberState | undefined>(undefined)

export function CyberStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    modules: Record<string, ModuleProgress>
    badges: Record<number, Badge>
    learningProgress: number
  }>({
    modules: {},
    badges: {
      1: {
        id: 1,
        title: "Phishing Guardian",
        description: "Successfully completed the Phishing Awareness module",
        earned: false,
        category: "module",
        icon: "shield",
        color: "from-amber-500 to-yellow-500",
      },
      2: {
        id: 2,
        title: "Network Defender",
        description: "Completed 50% of Network Security module",
        earned: false,
        category: "module",
        icon: "terminal",
        color: "from-blue-500 to-indigo-500",
      },
      3: {
        id: 3,
        title: "Crypto Master",
        description: "Complete all cryptography challenges",
        earned: false,
        category: "module",
        icon: "lock",
        color: "from-purple-500 to-violet-500",
      },
      4: {
        id: 4,
        title: "CTF Champion",
        description: "Placed 1st in a CTF competition",
        earned: false,
        category: "ctf",
        icon: "trophy",
        color: "from-amber-500 to-orange-500",
      },
      5: {
        id: 5,
        title: "Flag Hunter",
        description: "Solved 10 CTF challenges",
        earned: false,
        category: "ctf",
        icon: "flag",
        color: "from-red-500 to-pink-500",
      },
      6: {
        id: 6,
        title: "Web Warrior",
        description: "Completed the Web Warriors CTF competition",
        earned: false,
        category: "ctf",
        icon: "globe",
        color: "from-emerald-500 to-teal-500",
      },
    },
    learningProgress: 0,
  })

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("cyberState")
    if (savedState) {
      setState(JSON.parse(savedState))
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cyberState", JSON.stringify(state))
  }, [state])

  // Calculate overall learning progress
  const calculateLearningProgress = (modules: Record<string, ModuleProgress>): number => {
    const moduleIds = Object.keys(modules)
    if (moduleIds.length === 0) return 0

    // Only consider the main modules (phishing, network, crypto) for progress calculation
    const validModules = moduleIds.filter((id) => ["phishing", "network", "crypto"].includes(id))
    if (validModules.length === 0) return 0

    const totalProgress = validModules.reduce((sum, id) => {
      return sum + (modules[id].progress || 0)
    }, 0)

    // Calculate average progress across all valid modules
    return Math.round(totalProgress / validModules.length)
  }

  // Update module progress when a task is completed
  const updateModuleProgress = (moduleId: string, taskId: number, moduleTitle: string, totalTasks: number) => {
    setState((prevState) => {
      // Get current module or create a new one
      const currentModule = prevState.modules[moduleId] || {
        id: moduleId,
        title: moduleTitle,
        progress: 0,
        completedTasks: [],
        totalTasks,
        completed: false,
      }

      // Check if task is already completed
      if (currentModule.completedTasks.includes(taskId)) {
        return prevState
      }

      // Add task to completed tasks
      const updatedCompletedTasks = [...currentModule.completedTasks, taskId]

      // Calculate new progress
      const newProgress = Math.round((updatedCompletedTasks.length / totalTasks) * 100)

      // Check if module is now completed
      const isModuleCompleted = updatedCompletedTasks.length === totalTasks

      // Update module
      const updatedModule = {
        ...currentModule,
        completedTasks: updatedCompletedTasks,
        progress: newProgress,
        completed: isModuleCompleted,
      }

      // Update modules
      const updatedModules = {
        ...prevState.modules,
        [moduleId]: updatedModule,
      }

      // Update badges based on progress
      const updatedBadges = { ...prevState.badges }

      // Award badges based on module progress
      if (moduleId === "phishing" && isModuleCompleted && !prevState.badges[1].earned) {
        updatedBadges[1] = {
          ...updatedBadges[1],
          earned: true,
          date: new Date().toISOString().split("T")[0],
        }
      }

      if (moduleId === "network" && newProgress >= 50 && !prevState.badges[2].earned) {
        updatedBadges[2] = {
          ...updatedBadges[2],
          earned: true,
          date: new Date().toISOString().split("T")[0],
        }
      }

      if (moduleId === "crypto" && isModuleCompleted && !prevState.badges[3].earned) {
        updatedBadges[3] = {
          ...updatedBadges[3],
          earned: true,
          date: new Date().toISOString().split("T")[0],
        }
      }

      // Calculate new overall learning progress
      const newLearningProgress = calculateLearningProgress(updatedModules)

      return {
        modules: updatedModules,
        badges: updatedBadges,
        learningProgress: newLearningProgress,
      }
    })
  }

  // Mark a module as completed
  const completeModule = (moduleId: string) => {
    setState((prevState) => {
      if (!prevState.modules[moduleId]) return prevState

      const updatedModules = {
        ...prevState.modules,
        [moduleId]: {
          ...prevState.modules[moduleId],
          completed: true,
          progress: 100,
        },
      }

      return {
        ...prevState,
        modules: updatedModules,
        learningProgress: calculateLearningProgress(updatedModules),
      }
    })
  }

  // Award a badge
  const awardBadge = (badgeId: number) => {
    setState((prevState) => {
      if (!prevState.badges[badgeId] || prevState.badges[badgeId].earned) {
        return prevState
      }

      const updatedBadges = {
        ...prevState.badges,
        [badgeId]: {
          ...prevState.badges[badgeId],
          earned: true,
          date: new Date().toISOString().split("T")[0],
        },
      }

      return {
        ...prevState,
        badges: updatedBadges,
      }
    })
  }

  const value = {
    ...state,
    updateModuleProgress,
    completeModule,
    awardBadge,
  }

  return <CyberStateContext.Provider value={value}>{children}</CyberStateContext.Provider>
}

export function useCyberState() {
  const context = useContext(CyberStateContext)
  if (context === undefined) {
    throw new Error("useCyberState must be used within a CyberStateProvider")
  }
  return context
}

