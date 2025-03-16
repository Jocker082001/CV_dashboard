"use client"

import { FileText, User, Briefcase, GraduationCap, Award, Star, Settings, HelpCircle, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type React from "react"
import { ThemeToggle } from "../theme-toggle"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] hover:shadow-sm"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <span className="transition-all duration-200 group-hover:translate-x-1">{children}</span>
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23] transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg flex items-center justify-center font-bold text-lg transition-transform duration-200 hover:scale-110">
                CV
              </div>
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400">
                CV Builder
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  CV Sections
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={User}>
                    Personal Details
                  </NavItem>
                  <NavItem href="#" icon={FileText}>
                    Summary
                  </NavItem>
                  <NavItem href="#" icon={Briefcase}>
                    Experience
                  </NavItem>
                  <NavItem href="#" icon={GraduationCap}>
                    Education
                  </NavItem>
                  <NavItem href="#" icon={Star}>
                    Skills
                  </NavItem>
                  <NavItem href="#" icon={Award}>
                    Certifications
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
                <ThemeToggle />
              </div>
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

