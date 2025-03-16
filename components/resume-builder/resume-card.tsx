"use client"

import { MoreVertical, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface ResumeCardProps {
  title: string
  updatedAt: string
  previewUrl: string
  onCheck?: () => void
}

export default function ResumeCard({ title, updatedAt, previewUrl, onCheck }: ResumeCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="relative aspect-[210/297] bg-zinc-50 dark:bg-zinc-900">
        <Image src={previewUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Updated {updatedAt}</p>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => (window.location.href = `/resume-score/${title.replace(/\s+/g, "-").toLowerCase()}`)}
        >
          Check Resume Score
        </Button>
      </div>
    </div>
  )
}

