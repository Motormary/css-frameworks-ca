import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { Fragment } from "react"

export default function SortPosts({
  value,
  setValue,
}: {
  value: string | undefined
  setValue: (value: string | undefined) => void
}) {
  return (
    <div className="flex rounded-lg border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Select value={value} onValueChange={setValue} name="sort">
        <SelectTrigger className="relative border-none focus-visible:ring-0 focus-visible:ring-offset-0">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
