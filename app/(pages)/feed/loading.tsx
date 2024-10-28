import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full space-y-4 max-h-[90svh] overflow-hidden">
      <div className="h-80 m-auto w-full md:w-2/4 border rounded-lg"></div>
      <div className="h-80 m-auto w-full md:w-2/4 border rounded-lg"></div>
      <div className="h-80 m-auto w-full md:w-2/4 border rounded-lg"></div>
      <div className="h-80 m-auto w-full md:w-2/4 border rounded-lg"></div>
    </div>
  )
}
