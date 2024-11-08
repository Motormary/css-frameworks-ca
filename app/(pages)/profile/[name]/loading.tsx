import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto mt-[7rem] flex w-full gap-4 px-4 max-lg:flex-col">
      <div className="flex h-fit flex-col items-center rounded-lg border border-none bg-card text-card-foreground shadow-sm max-sm:shadow-none lg:w-fit">
        <div className="flex flex-col space-y-1.5 p-6">
          <div>
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="relative h-[80vw] w-[80vw] overflow-hidden rounded-full sm:h-52 sm:w-52">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className="h-full w-full text-muted-foreground/30" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 p-6 pt-0">
          <div className="flex justify-center gap-2 text-nowrap max-md:flex-wrap">
            <Skeleton className="h-6 w-[90px] rounded-full" />
            <Skeleton className="h-6 w-[76px] rounded-full" />
            <Skeleton className="h-6 w-[80px] rounded-full" />
          </div>
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>

      <Separator orientation="vertical" className="max-lg:hidden" />

      <div className="flex h-fit w-full flex-col gap-4">
        <div className="flex w-fit gap-2 rounded-md border p-1.5">
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-7 w-14" />
        </div>
        <Skeleton className="ml-3 h-8 w-24" />
        <div className="m-4 mt-10 flex flex-wrap">
          {[...Array(3)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function LoadingProfileCard() {
  return (
    <div className="flex h-fit flex-col items-center rounded-lg border border-none bg-card text-card-foreground shadow-sm max-sm:shadow-none lg:w-fit">
      <div className="flex flex-col space-y-1.5 p-6">
        <div>
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <div className="relative h-[80vw] w-[80vw] overflow-hidden rounded-full sm:h-52 sm:w-52">
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <User className="h-full w-full text-muted-foreground/30" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 p-6 pt-0">
        <div className="flex justify-center gap-2 text-nowrap max-md:flex-wrap">
          <Skeleton className="h-6 w-[90px] rounded-full" />
          <Skeleton className="h-6 w-[76px] rounded-full" />
          <Skeleton className="h-6 w-[80px] rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  )
}

export function PostSkeleton() {
  return (
    <div className="relative items-center gap-4 rounded-lg border border-none bg-card pt-2 text-card-foreground shadow-sm max-md:w-full">
      <div className="flex gap-4 p-4 pt-0">
        <div className="aspect-square h-28 w-full min-w-48 lg:max-w-48">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex flex-col space-y-1.5 p-0">
            <div className="relative h-32">
              <Skeleton className="h-full w-full" />
              <Skeleton className="absolute bottom-0 left-4 h-20 w-20 translate-y-1/2 transform rounded-full border-4 border-background" />
            </div>
          </div>
          <div className="p-6 pb-4 pt-12">
            <div className="flex items-start justify-between">
              <div className="w-full space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 pt-0">
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </div>
      ))}
    </>
  )
}
