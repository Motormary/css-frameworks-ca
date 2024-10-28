import Form from "next/form"
import { logout } from "@/src/actions/auth/logout"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"

export default async function LogoutBtn() {
  return (
    <Form
      action={logout}
      className="w-full h-min">
      <Button
        variant="ghost"
        type="submit"
        className="h-min py-1.5 px-0 w-full justify-start space-x-4 cursor-default">
        <LogOut />
        Logout
      </Button>
    </Form>
  )
}
