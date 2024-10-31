"use client"

import { useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { PostDialog } from "./create-post-dialog"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PostToolbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortedBy = searchParams.get("sort") ?? "newest"

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="space-x-4">
        <Link
          className={cn(sortedBy === "newest" && "underline", "text-sm underline-offset-2")}
          href={pathname + "?" + createQueryString("sort", "newest")}>
          Newest
        </Link>
        <Link
          className={cn(sortedBy === "oldest" && "underline", "text-sm underline-offset-2")}
          href={pathname + "?" + createQueryString("sort", "oldest")}>
          Oldest
        </Link>
      </div>
      <PostDialog />
    </div>
  )
}
