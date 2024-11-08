"use client"

import fallback from "assets/images/logo.png"
import { AspectRatio } from "../ui/aspect-ratio"
import Link from "next/link"

export default function Img({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const img = src ? src : fallback.src

  if (!img) return null

  return (
    <AspectRatio className="relative" ratio={16 / 9}>
      <img
        className={className}
        src={img}
        alt={alt}
        onError={(e) => (e.currentTarget.src = fallback.src)}
      />
    </AspectRatio>
  )
}
