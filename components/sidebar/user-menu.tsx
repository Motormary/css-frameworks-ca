import Link from "next/link"
import { Avatar, AvatarImage } from "../ui/avatar"
import { cookies } from "next/headers"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import {
  ChevronsUpDown, User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import Logout from "../auth/logout"
import MobileTrigger from "./button"

export default async function SidebarProfile() {
  const cookie = await cookies()
  const hasProfile = cookie.has("profile")
  let profile

  if (!hasProfile) {
    profile = null
  } else if (hasProfile) {
    profile = JSON.parse(cookie.get("profile")?.value as string)
  }

  if (!profile) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2 py-1.5 text-left text-sm">
                <Avatar className="size-8">
                  <AvatarImage
                    src={
                      profile
                        ? profile?.avatar
                        : "https://github.com/shadcn.png"
                    }
                    alt="Avatar"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {profile ? profile?.name : "Username"}
                  </span>
                  <span className="truncate text-xs">
                    {profile ? profile?.email : "Email"}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <MobileTrigger>
                <DropdownMenuItem asChild>
                  <Link href={profile ? `/profile/${profile?.name}` : "/"}>
                    <User />
                    My page
                  </Link>
                </DropdownMenuItem>
              </MobileTrigger>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-0">
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
