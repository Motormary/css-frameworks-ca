import { Activity, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupContent, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import Link from "next/link"
import SidebarProfile from "./sidebar/user-menu"
import { ModeToggle } from "./mode-toggler"
import SearchPosts from "./post/search"

const items = [
  {
    title: "Feed",
    url: "/feed",
    icon: Activity,
  },
  {
    title: "People",
    url: "/profile",
    icon: Users,
  },
]

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="py-5 px-0 md:hidden">
          <SidebarGroupContent>
            <SearchPosts className="md:hidden w-4/5 [&>*]:bg-sidebar" />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="md:hidden w-full" />
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
