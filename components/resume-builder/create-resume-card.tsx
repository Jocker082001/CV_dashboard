"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface CreateResumeCardProps {
  onClick?: () => void
}

export default function CreateResumeCard({ onClick }: CreateResumeCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push("/build-resume")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group relative aspect-[210/297] rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col items-center justify-center gap-2 hover:border-purple-600 dark:hover:border-purple-400 transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900 transition-colors">
        <Plus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Build a new resume</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">We'll guide you through each section</p>
    </button>
  )
}

