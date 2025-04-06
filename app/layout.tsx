import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CyberStateProvider } from "@/context/cyber-state-context"
import { CTFProvider } from "@/context/ctf-context"
import { KothProvider } from "@/context/koth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cyber Academy",
  description: "Learn cybersecurity through interactive simulations",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CyberStateProvider>
          <CTFProvider>
            <KothProvider>{children}</KothProvider>
          </CTFProvider>
        </CyberStateProvider>
      </body>
    </html>
  )
}

