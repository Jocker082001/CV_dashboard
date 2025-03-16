import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-10 text-center">
        <Skeleton className="h-10 w-[250px] mx-auto" />
        <Skeleton className="h-5 w-[350px] mx-auto mt-2" />
      </div>

      <div className="flex justify-center mb-8">
        <Skeleton className="h-10 w-[250px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[450px] w-full rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-[100px] w-full mt-16 rounded-lg" />
    </div>
  )
}

