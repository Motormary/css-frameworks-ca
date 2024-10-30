"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon, X } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Form from "next/form"

export default function SearchPosts() {
  const params = useSearchParams()
  const searchParams = params.get("query") ?? ""
  const [search, setSearch] = useState<string | undefined>(searchParams)

  return (
    <Form
      action="/feed"
      className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-full max-w-[770px] flex items-center gap-4 rounded-md border border-input h-8 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Input
        className="border-none h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
        name="query"
      />
      {search ? (
        <Button
          size="icon"
          variant="outline"
          className="rounded-full h-3 w-3"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setSearch("")
          }}>
          <X />
        </Button>
      ) : null}
      <Button variant="ghost" size="icon" type="submit" className="h-7 w-8">
        <SearchIcon />
      </Button>
    </Form>
  )
}
