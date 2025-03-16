"use client"

import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <main className="flex-1 bg-zinc-50 dark:bg-zinc-900">{children}</main>
    </div>
  )
}

