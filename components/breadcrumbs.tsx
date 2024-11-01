"use client"

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments()
  const filteredSegments = segments.filter((segment) => !/\(.*\)/.test(segment))

  return (
    <Breadcrumb className=" max-xl:hidden shrink-0">
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
                  <Link href={href}>{name}</Link>
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
