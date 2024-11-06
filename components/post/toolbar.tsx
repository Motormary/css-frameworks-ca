"use client"

import { useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { PostDialog } from "./create-post-dialog"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"

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
    <div className="flex items-center justify-between gap-4">
      <div className="space-x-4">
        <Link
          className={cn(sortedBy === "newest" && "underline", "text-sm underline-offset-2")}
          href={pathname + "?" + createQueryString("sortOrder", "desc")}>
          Newest
        </Link>
        <Link
          className={cn(sortedBy === "oldest" && "underline", "text-sm underline-offset-2")}
          href={pathname + "?" + createQueryString("sortOrder", "asc")}>
          Oldest
        </Link>
      </div>
      <PostDialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create post</Button>
        </DialogTrigger>
      </PostDialog>
    </div>
  )
}
