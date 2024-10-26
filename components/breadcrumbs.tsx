"use client"

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

import { ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          if (segment === "(pages)") return
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1
          const name = segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <BreadcrumbItem key={segment}>
              {isLast ? (
                <BreadcrumbPage>{name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
