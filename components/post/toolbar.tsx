"use client"

import Form from "next/form"
import { useState } from "react"
import SearchPosts from "./search"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PostToolbar({ defaultSort }: { defaultSort: string }) {
  const [sort, setSort] = useState<string | undefined>("")
  const [search, setSearch] = useState<string | undefined>("")
  const router = useRouter()

  function resetFilters() {
    setSort("")
    setSearch("")
    router.push("/feed")
  }

  return (
    <Form action="/feed">
      <SearchPosts value={search} setValue={setSearch} />
      <Select defaultValue={defaultSort} onValueChange={setSort} name="sort">
        <SelectTrigger type="submit">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">
        <SearchIcon />
      </Button>
      <Button type="reset" onClick={resetFilters}>
        Reset filters
      </Button>
    </Form>
  )
}
