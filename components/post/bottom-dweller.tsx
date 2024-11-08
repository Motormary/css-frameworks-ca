/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { metaType } from "@/src/actions/types"
import { LoaderIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

const useInfiniteScroll = (targetRef: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        rootMargin: "200px",
        threshold: 1.0,
      },
    )

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [targetRef])

  return isIntersecting
}
export default function BottomDweller({
  pagination,
}: {
  pagination: metaType
}) {
  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement>(null)
  const isBottom = useInfiniteScroll(bottomRef)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [limit, setLimit] = useState<number>(
    searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  // todo: pagination, reset limit push to page=nextPage.
  useEffect(() => {
    if (limit === 100) return
    if (isBottom && pagination.nextPage) {
      setLimit(limit + 10)
      router.push(
        pathname + "?" + createQueryString("limit", (limit + 10) as any),
        {
          scroll: false,
        },
      )
    }
  }, [isBottom])

  return (
    <div ref={bottomRef} className="w-full">
      {limit < 100 ? (
        <LoaderIcon className="m-auto animate-spin duration-2000" />
      ) : (
        <p className="animate-pulse text-center text-xl font-bold">
          You have scrolled enough for today, go touch some grass 🟩
        </p>
      )}
    </div>
  )
}
