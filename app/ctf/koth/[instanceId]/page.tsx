"use client"

import { useParams } from "next/navigation"
import { InstanceCard } from "@/components/instance-card"

export default function InstancePage() {
  const params = useParams()
  const instanceId = params?.instanceId ?? ""

  if (!instanceId) {
    return <p>Instance ID not found.</p>
  }

  return <InstanceCard instanceId={instanceId} />
}
