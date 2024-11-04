import { Activity, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import SidebarProfile from "./sidebar/user-menu"
import { ModeToggle } from "./mode-toggler"
import MobileTrigger from "./sidebar/button"

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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <MobileTrigger>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </MobileTrigger>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="w-full md:hidden" />
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
