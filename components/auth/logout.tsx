import Form from "next/form"
import { logout } from "@/src/actions/auth/logout"
import { Button } from "../ui/button"

export default async function LogoutBtn() {

  return (
    <Form action={logout} className="flex gap-1 items-center">
      <Button variant="ghost" type="submit" className="p-0 h-fit">
        Logout
      </Button>
    </Form>
  )
}
