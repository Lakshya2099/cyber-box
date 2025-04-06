"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, User, Award, BookOpen, Home, Zap, Menu, X, Flag } from "lucide-react"
import { HexagonalGrid } from "@/components/hexagonal-grid"
import { MatrixBackground } from "@/components/matrix-background"
import { GlitchText } from "@/components/glitch-text"
import { CyberNotification } from "@/components/cyber-notification"
import { useCyberState } from "@/context/cyber-state-context"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const { learningProgress } = useCyberState()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Modules", href: "/modules", icon: BookOpen },
    { name: "CTF", href: "/ctf", icon: Flag },
    { name: "Badges", href: "/badges", icon: Award },
    { name: "Profile", href: "/profile", icon: User },
  ]

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Matrix-like background */}
      <MatrixBackground />

      {/* Hexagonal grid overlay */}
      <div className="fixed inset-0 z-0 opacity-20">
        <HexagonalGrid />
      </div>

      {/* Content container with glass effect */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-emerald-900/50 bg-black/80 backdrop-blur-md sticky top-0 z-20">
          <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="relative">
                <Shield className="h-7 w-7 text-emerald-500 animate-pulse" />
                <div className="absolute inset-0 h-7 w-7 bg-emerald-500 blur-md opacity-50 animate-pulse"></div>
              </div>
              <GlitchText text="Cyber" className="text-emerald-500" />
              <GlitchText text="Academy" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-8 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-emerald-900/20 text-emerald-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-4">
              <Badge
                variant="outline"
                className="hidden sm:flex bg-black/50 text-emerald-400 border-emerald-500/50 px-3 py-1 backdrop-blur-sm"
              >
                <Zap className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Level {Math.max(1, Math.floor(learningProgress / 25) + 1)} Agent
              </Badge>
              <Link href="/profile">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 ring-2 ring-emerald-500/20 hover:ring-emerald-500/50 transition-all duration-300 cursor-pointer group">
                  <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    <User className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800">
            <nav className="container py-3 px-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-emerald-900/20 text-emerald-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/80 backdrop-blur-md py-6">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-400">Cyber Academy © {new Date().getFullYear()}</span>
              </div>
              <div className="flex gap-4 text-gray-400 text-sm">
                <Link href="#" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Notification */}
      <CyberNotification
        show={showNotification}
        message={notificationMessage}
        onClose={() => setShowNotification(false)}
      />
    </div>
  )
}

