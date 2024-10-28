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
import { cn } from "@/lib/utils"

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()
  const filteredSegments = segments.filter(segment => !/\(.*\)/.test(segment));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filteredSegments.map((segment, index) => {
          const href = `/${filteredSegments.slice(0, index + 1).join("/")}`
          const isLast = index === filteredSegments.length - 1
          const name = segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <BreadcrumbItem key={segment}>
              {isLast ? (
                <BreadcrumbPage>{name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink className="z-0" href={href}>
                    {name}
                  </BreadcrumbLink>
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
