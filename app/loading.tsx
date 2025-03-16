import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <h3 className="text-lg font-medium">Loading...</h3>
      </div>
    </div>
  )
}

