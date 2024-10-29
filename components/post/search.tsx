"use client"
import Form from "next/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SearchPosts() {
  const [value, setValue] = useState("")
  return (
    <Form action="/feed">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="query"
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
      <Button onClick={() => setValue("")} type="reset" asChild>
        <Link href="/feed">
          <X />
        </Link>
      </Button>
    </Form>
  )
}
