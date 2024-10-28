import Form from "next/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"

export default async function SearchPosts() {

  return (
    <Form action="/feed">
      <Input name="query" />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Form>
  )
}
