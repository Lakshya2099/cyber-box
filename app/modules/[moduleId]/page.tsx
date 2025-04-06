"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import { ModuleDetails } from "@/components/module-details"
import { useCyberState } from "@/context/cyber-state-context"
import { getModuleData } from "@/lib/module-data"

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const { modules } = useCyberState()
  const [moduleData, setModuleData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get module data
    const data = getModuleData(moduleId)
    if (!data) {
      notFound()
    }

    setModuleData(data)
    setLoading(false)
  }, [moduleId])

  if (loading) {
    return <div>Loading...</div>
  }

  // Get progress from global state
  const progress = modules[moduleId]?.progress || 0
  const completed = modules[moduleId]?.completed || false

  return <ModuleDetails moduleId={moduleId} moduleData={moduleData} progress={progress} completed={completed} />
}

