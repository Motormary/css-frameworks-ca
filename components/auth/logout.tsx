import Form from "next/form"
import { logout } from "@/src/actions/auth/logout"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"

export default async function LogoutBtn() {
  return (
    <Form
      action={logout}
      className="h-min w-full">
      <Button
        variant="ghost"
        type="submit"
        className="h-min w-full cursor-default justify-start space-x-4 px-0 py-1.5">
        <LogOut />
        Logout
      </Button>
    </Form>
  )
}
