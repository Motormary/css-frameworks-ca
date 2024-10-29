"use client"

import Form from "next/form"
import { useState } from "react"
import SearchPosts from "./search"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import SortPosts from "./sort"

type props = {
  defaultSort?: string
  defaultSearch?: string
}

export default function PostToolbar(props: props) {
  const [sort, setSort] = useState<string | undefined>(props.defaultSort)
  const [search, setSearch] = useState<string | undefined>(props.defaultSearch)
  const router = useRouter()

  function resetFilters() {
    setSort("")
    setSearch("")
    router.push("/feed")
  }

  return (
    <Form action="/feed">
      <SearchPosts value={search} setValue={setSearch} />
      <SortPosts value={sort} setValue={setSort} />
      <Button type="submit">
        <SearchIcon />
      </Button>
      {sort || search ? (
        <Button type="reset" onClick={resetFilters}>
          Reset filters
        </Button>
      ) : null}
    </Form>
  )
}
