"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface CyberTerminalProps {
  history: string[]
  onCommand: (command: string) => void
  prompt?: string
}

export function CyberTerminal({ history, onCommand, prompt = "user@cybersec:~$" }: CyberTerminalProps) {
  const [command, setCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      onCommand(command)
      setCommandHistory((prev) => [...prev, command])
      setCommand("")
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand("")
      }
    }
  }

  return (
    <div
      ref={terminalRef}
      className="flex-1 flex flex-col bg-black font-mono text-sm overflow-auto p-4 cursor-text"
      onClick={focusInput}
    >
      {/* Terminal output */}
      <div className="flex-1">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">
            {line.startsWith("$") ? (
              <div>
                <span className="text-green-500">{prompt}</span> <span className="text-white">{line.substring(2)}</span>
              </div>
            ) : line.startsWith("✅") ? (
              <div className="text-emerald-400">{line}</div>
            ) : (
              <div className="text-gray-300">{line}</div>
            )}
          </div>
        ))}
      </div>

      {/* Command input */}
      <form onSubmit={handleSubmit} className="flex items-center mt-2">
        <span className="text-green-500 mr-2">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none border-none"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>

      {/* Blinking cursor */}
      {command.length === 0 && <span className="absolute h-4 w-2 bg-white opacity-70 animate-blink"></span>}
    </div>
  )
}

