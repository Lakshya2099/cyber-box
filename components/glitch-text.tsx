"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Randomly trigger glitch effect
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.9
      if (shouldGlitch) {
        glitchEffect()
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [text])

  const glitchEffect = () => {
    if (isGlitching) return

    setIsGlitching(true)

    let iterations = 0
    const maxIterations = 3
    const glitchDuration = 100

    const glitchTimer = setInterval(() => {
      if (iterations >= maxIterations) {
        clearInterval(glitchTimer)
        setDisplayText(text)
        setIsGlitching(false)
        return
      }

      // Create glitched text
      const glitchedText = text
        .split("")
        .map((char, index) => {
          // 30% chance to replace character
          if (Math.random() < 0.3) {
            const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\`~01"
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join("")

      setDisplayText(glitchedText)
      iterations++
    }, glitchDuration)
  }

  return (
    <span
      className={`relative inline-block ${className} ${isGlitching ? 'after:content-[""] after:absolute after:inset-0 after:bg-white/20 after:animate-glitch-flash' : ""}`}
      onMouseEnter={glitchEffect}
    >
      {displayText}
    </span>
  )
}

