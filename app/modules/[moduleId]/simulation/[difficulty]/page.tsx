"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { SimulationPage } from "@/components/simulation-page"

export default function ModuleSimulation() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const difficulty = params.difficulty as string

  // Validate parameters
  useEffect(() => {
    const validModules = ["phishing", "network", "crypto", "coding"]
    const validDifficulties = ["beginner", "intermediate", "advanced"]

    if (!validModules.includes(moduleId) || !validDifficulties.includes(difficulty)) {
      window.location.href = "/modules"
    }
  }, [moduleId, difficulty])

  return <SimulationPage moduleId={moduleId} difficultyLevel={difficulty} />
}

