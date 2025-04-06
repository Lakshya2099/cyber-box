"use client"

import { useEffect, useState } from "react"
import { X, AlertCircle } from "lucide-react"

interface CyberNotificationProps {
  show: boolean
  message: string
  onClose: () => void
}

export function CyberNotification({ show, message, onClose }: CyberNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 500) // Wait for exit animation
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show && !isVisible) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-500 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-gray-900/80 backdrop-blur-md border border-emerald-500/30 rounded-lg shadow-lg shadow-emerald-500/10 overflow-hidden">
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center relative">
              <AlertCircle className="h-5 w-5 text-emerald-500" />
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 pt-0.5">
            <p className="text-sm text-white font-medium">{message}</p>
            <div className="mt-1 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-shrink"></div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 500)
            }}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

