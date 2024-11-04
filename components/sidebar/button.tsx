"use client"

import { useSidebar } from "../ui/sidebar"

export default function MobileTrigger({
    children
}: {
    children: React.ReactNode
}) {
    const { toggleSidebar, isMobile } = useSidebar()
    return (
      <span onClick={() => {
        if (isMobile) toggleSidebar()
      }}>{children}</span>
      
    )
  }