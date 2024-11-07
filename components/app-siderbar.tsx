import {
  Activity,
  ChevronRight, Users
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import SidebarProfile from "./sidebar/user-menu"
import { ModeToggle } from "./mode-toggler"
import MobileTrigger from "./sidebar/button"
import getCurrentUser from "./auth/get-current-user"
import { getProfile } from "@/src/actions/profile/get-profile"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { Profile } from "@/src/actions/profile/types"
import { UserData } from "@/src/actions/auth/types"
import { Fragment } from "react"

const items = [
  {
    title: "Feed",
    url: "/feed",
    icon: Activity,
    collapsible: false,
  },
  {
    title: "People",
    url: "/profile",
    icon: Users,
    items: [
      {
        title: "All",
        url: "/profile",
        add: false,
      },
      {
        title: "Following",
        url: "/profile/",
        add: true,
      },
      {
        title: "Followers",
        url: "/profile/",
        add: true,
      },
    ],
    collapsible: true,
  },
]

export async function AppSidebar() {
  const user = await getCurrentUser()
  const profile = await getProfile(user.name)
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.collapsible)
                  return (
                    <CollapsibleMenu
                      key={item.title}
                      item={item}
                      user={user}
                      profile={profile}
                    />
                  )
                else
                  return (
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
                  )
              })}
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

function CollapsibleMenu({
  item,
  profile,
  user,
}: {
  item: any
  profile: Profile
  user: UserData
}) {
  const url = (sub: { url: string; title: string; add: boolean }) => {
    if (sub.add) return sub.url + user.name + `?tab=${sub.title.toLowerCase()}`
    else return sub.url
  }
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon ? <item.icon /> : null}
            <span>{item.title}</span>
          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub: any) => {
              return (
                <Fragment key={sub.title}>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link className="flex justify-between" href={url(sub)}>
                        {sub.title}
                        <span className="text-xs text-muted-foreground">
                          {sub.title === "Following"
                            ? profile._count.following
                            : sub.title === "Followers"
                              ? profile._count.followers
                              : ""}
                        </span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuBadge></SidebarMenuBadge>
                </Fragment>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
