"use client"

import { FileText, Mail, LogOut, BriefcaseIcon, Zap, Contact2, FileEdit } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Resumes",
      icon: FileText,
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      title: "Resumeup GPT",
      icon: Zap,
      href: "/gpt",
      badge: "BETA",
      isActive: pathname === "/gpt",
    },
    {
      title: "Cover Letters",
      icon: Mail,
      href: "/cover-letters",
      isActive: pathname === "/cover-letters",
    },
    {
      title: "Resignation Letters",
      icon: FileEdit,
      href: "/resignation-letters",
      isActive: pathname === "/resignation-letters",
    },
    {
      title: "Job Tracker",
      icon: BriefcaseIcon,
      href: "/job-tracker",
      isActive: pathname === "/job-tracker",
    },
    {
      title: "Contacts",
      icon: Contact2,
      href: "/contacts",
      isActive: pathname === "/contacts",
    },
  ]

  return (
    <div className="w-[280px] border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">resumeup.ai</span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              item.isActive
                ? "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="ml-auto text-[10px] font-semibold bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 mt-auto">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg" asChild>
          <Link href="/upgrade">
            <Zap className="w-4 h-4 mr-2" />
            Upgrade
          </Link>
        </Button>
      </div>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">Marcio Jocker</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">marcio@example.com</p>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

