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

export default function SortPosts({
  value,
  setValue,
}: {
  value: string | undefined
  setValue: (value: string | undefined) => void
}) {
  return (
    <>
      <Select value={value} onValueChange={setValue} name="sort">
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        {value ? (
          <Button
            onClick={(e) => {
              e.preventDefault()
              setValue("")
            }}>
            <X />
          </Button>
        ) : null}
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
