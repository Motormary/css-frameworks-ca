"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SearchPosts({
  value,
  setValue,
}: {
  value: string | undefined
  setValue: (value: string | undefined) => void
}) {
  return (
    <>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="query"
      />
      <Button onClick={() => setValue("")}>
        <X />
      </Button>
    </>
  )
}
