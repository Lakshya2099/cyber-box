"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Terminal, Shield, Lock, Code } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"

interface StartSimulationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StartSimulationModal({ isOpen, onClose }: StartSimulationModalProps) {
  const router = useRouter()
  const [selectedModule, setSelectedModule] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleStartSimulation = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      // Navigate to the simulation page with proper routing
      router.push(`/modules/${selectedModule}/simulation/${selectedDifficulty}`)
    }, 1500)
  }

  const modules = [
    { value: "phishing", label: "Phishing Awareness", icon: AlertTriangle, color: "text-red-500" },
    { value: "network", label: "Network Security", icon: Shield, color: "text-blue-500" },
    { value: "crypto", label: "Cryptography Basics", icon: Lock, color: "text-purple-500" },
    { value: "coding", label: "Secure Coding", icon: Code, color: "text-emerald-500", disabled: true },
  ]

  const difficulties = [
    { value: "beginner", label: "Beginner", description: "Guided exercises with hints" },
    { value: "intermediate", label: "Intermediate", description: "Limited guidance, more complex scenarios" },
    { value: "advanced", label: "Advanced", description: "Real-world complexity, minimal assistance" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900/95 text-white border-gray-800/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-cyan-900/5 to-gray-900/10 rounded-lg"></div>

        <DialogHeader className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-2 relative">
            <Terminal className="h-8 w-8 text-emerald-500" />
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-pulse"></div>
          </div>
          <DialogTitle className="text-center text-xl">
            <GlitchText text="Launch Simulation Environment" />
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400 max-w-sm mx-auto">
            Configure your training environment to practice cybersecurity skills in a controlled sandbox.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 relative">
          <div className="grid gap-3">
            <label htmlFor="module" className="text-sm font-medium text-gray-300 flex items-center">
              <div className="h-1 w-3 bg-emerald-500 mr-2"></div>
              Select Module
            </label>
            <Select onValueChange={setSelectedModule}>
              <SelectTrigger id="module" className="bg-gray-800/70 border-gray-700/50 h-12">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {modules.map((module) => (
                  <SelectItem
                    key={module.value}
                    value={module.value}
                    disabled={module.disabled}
                    className="focus:bg-gray-700 focus:text-white"
                  >
                    <div className="flex items-center">
                      <module.icon className={`h-4 w-4 mr-2 ${module.color}`} />
                      <span>{module.label}</span>
                      {module.disabled && <span className="ml-2 text-xs text-gray-500">(Locked)</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <label htmlFor="difficulty" className="text-sm font-medium text-gray-300 flex items-center">
              <div className="h-1 w-3 bg-emerald-500 mr-2"></div>
              Difficulty Level
            </label>
            <Select onValueChange={setSelectedDifficulty}>
              <SelectTrigger id="difficulty" className="bg-gray-800/70 border-gray-700/50 h-12">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {difficulties.map((difficulty) => (
                  <SelectItem
                    key={difficulty.value}
                    value={difficulty.value}
                    className="focus:bg-gray-700 focus:text-white"
                  >
                    <div>
                      <div className="font-medium">{difficulty.label}</div>
                      <div className="text-xs text-gray-400">{difficulty.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-3 rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-400">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Simulation Environment Notice</p>
              <p className="text-xs">
                All simulations run in an isolated sandbox environment. Actions performed here will not affect real
                systems or networks. This is a safe space to practice and learn cybersecurity skills.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="relative">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartSimulation}
            className="relative overflow-hidden group bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white min-w-[140px]"
            disabled={!selectedModule || !selectedDifficulty || isLoading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Initializing...
              </div>
            ) : (
              <>Launch Simulation</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

