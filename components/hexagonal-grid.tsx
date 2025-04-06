"use client"

import { useEffect, useRef } from "react"

export function HexagonalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawHexGrid()
    }

    window.addEventListener("resize", resize)
    resize()

    // Draw hexagonal grid
    function drawHexGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const hexSize = 30
      const hexHeight = hexSize * Math.sqrt(3)
      const hexWidth = hexSize * 2
      const hexVerticalSpacing = hexHeight
      const hexHorizontalSpacing = hexWidth * 0.75

      // Calculate number of hexagons needed
      const columns = Math.ceil(canvas.width / hexHorizontalSpacing) + 1
      const rows = Math.ceil(canvas.height / hexVerticalSpacing) + 1

      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)"
      ctx.lineWidth = 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2)
          const y = row * hexVerticalSpacing

          drawHexagon(x, y, hexSize)
        }
      }
    }

    function drawHexagon(x: number, y: number, size: number) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPoint = x + size * Math.cos(angle)
        const yPoint = y + size * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(xPoint, yPoint)
        } else {
          ctx.lineTo(xPoint, yPoint)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    return () => window.removeEventListener("resize", resize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

