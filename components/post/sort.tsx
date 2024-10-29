"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SortPosts(defaultValue: string) {
  return (
    <Select defaultValue={defaultValue} name="sort">
      <SelectTrigger type="submit">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Newest">Newest</SelectItem>
          <SelectItem value="Oldest">Oldest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
