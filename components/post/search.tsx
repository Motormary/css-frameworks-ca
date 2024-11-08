"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon, X } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Form from "next/form"
import { cn } from "@/lib/utils"

export default function SearchPosts({
  className,
}: {
  className?: string | undefined
}) {
  const params = useSearchParams()
  const searchParams = params.get("query") ?? ""
  const [search, setSearch] = useState<string | undefined>(searchParams)

  return (
    <Form
      action="/feed"
      className={cn(
        className,
        "xl:w-fit flex items-center gap-4 rounded-md border border-input h-8 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      )}>
      <Input
        className="h-6 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
        name="query"
      />
      <Button
        size="icon"
        variant="outline"
        className={cn(
          search ? "" : "text-transparent border-none",
          "rounded-full h-3 w-3"
        )}
        disabled={!search ? true : false}
        type="button"
        onClick={(e) => {
          e.preventDefault()
          setSearch("")
        }}>
        <X />
      </Button>
      <Button variant="ghost" size="icon" type="submit" className="h-7 w-8">
        <SearchIcon />
      </Button>
    </Form>
  )
}
