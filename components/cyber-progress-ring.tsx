"use client"

import { useEffect, useState } from "react"

interface CyberProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
}

export function CyberProgressRing({ value, size = 120, strokeWidth = 8 }: CyberProgressRingProps) {
  const [progress, setProgress] = useState(0)

  // Animated progress
  useEffect(() => {
    // Reset progress to 0 when value changes significantly
    if (Math.abs(progress - value) > 20) {
      setProgress(0)
    }

    // Animate to the new value
    const timer = setTimeout(() => {
      setProgress(value)
    }, 500)

    return () => clearTimeout(timer)
  }, [value])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-30"></div>

      {/* Outer decorative ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin-slow"></div>

      {/* SVG Progress Ring */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress track with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Digital counter */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          {progress}%
        </span>

        {/* Small decorative elements */}
        <div className="flex space-x-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-1 rounded-full ${i < Math.floor(progress / 20) ? "bg-emerald-500" : "bg-gray-700"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

