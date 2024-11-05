import { Skeleton } from "@/components/ui/skeleton"
import { User } from "lucide-react"

export default function Loading() {
  return (
    <div className="container grid h-fit grid-cols-1 gap-4 p-4 md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:grid-cols-2">
      <li className="relative m-auto flex w-full min-w-[12rem] gap-4 rounded-md border p-4 hover:bg-muted/60 max-xs:flex-col max-xs:items-center">
        {/* Mobile Name Skeleton */}
        <Skeleton className="relative z-50 h-7 w-full max-w-48 xs:hidden" />

        {/* Avatar and Stats Box */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-24 overflow-hidden rounded-full border border-border">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className="size-20 text-muted-foreground/30" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="col-span-full flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-14 rounded-full" />
          </div>
        </div>

        {/* Content Box */}
        <div className="flex w-full flex-col justify-between gap-4 overflow-hidden max-xs:text-center">
          {/* Desktop Name Skeleton */}
          <Skeleton className="relative z-50 h-7 w-full max-w-48 max-xs:hidden" />

          {/* Button Skeleton */}
          <div className="relative z-50 flex">
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </div>
      </li>
      <li className="relative m-auto flex w-full min-w-[12rem] gap-4 rounded-md border p-4 hover:bg-muted/60 max-xs:flex-col max-xs:items-center">
        {/* Mobile Name Skeleton */}
        <Skeleton className="relative z-50 h-7 w-full max-w-48 xs:hidden" />

        {/* Avatar and Stats Box */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-24 overflow-hidden rounded-full border border-border">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className="size-20 text-muted-foreground/30" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="col-span-full flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-14 rounded-full" />
          </div>
        </div>

        {/* Content Box */}
        <div className="flex w-full flex-col justify-between gap-4 overflow-hidden max-xs:text-center">
          {/* Desktop Name Skeleton */}
          <Skeleton className="relative z-50 h-7 w-full max-w-48 max-xs:hidden" />

          {/* Button Skeleton */}
          <div className="relative z-50 flex">
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </div>
      </li>
      <li className="relative m-auto flex w-full min-w-[12rem] gap-4 rounded-md border p-4 hover:bg-muted/60 max-xs:flex-col max-xs:items-center">
        {/* Mobile Name Skeleton */}
        <Skeleton className="relative z-50 h-7 w-full max-w-48 xs:hidden" />

        {/* Avatar and Stats Box */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-24 overflow-hidden rounded-full border border-border">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className="size-20 text-muted-foreground/30" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="col-span-full flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-14 rounded-full" />
          </div>
        </div>

        {/* Content Box */}
        <div className="flex w-full flex-col justify-between gap-4 overflow-hidden max-xs:text-center">
          {/* Desktop Name Skeleton */}
          <Skeleton className="relative z-50 h-7 w-full max-w-48 max-xs:hidden" />

          {/* Button Skeleton */}
          <div className="relative z-50 flex">
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </div>
      </li>
      <li className="relative m-auto flex w-full min-w-[12rem] gap-4 rounded-md border p-4 hover:bg-muted/60 max-xs:flex-col max-xs:items-center">
        {/* Mobile Name Skeleton */}
        <Skeleton className="relative z-50 h-7 w-full max-w-48 xs:hidden" />

        {/* Avatar and Stats Box */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative size-24 overflow-hidden rounded-full border border-border">
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className="size-20 text-muted-foreground/30" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="col-span-full flex gap-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-14 rounded-full" />
          </div>
        </div>

        {/* Content Box */}
        <div className="flex w-full flex-col justify-between gap-4 overflow-hidden max-xs:text-center">
          {/* Desktop Name Skeleton */}
          <Skeleton className="relative z-50 h-7 w-full max-w-48 max-xs:hidden" />

          {/* Button Skeleton */}
          <div className="relative z-50 flex">
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </div>
      </li>
    </div>
  )
}
