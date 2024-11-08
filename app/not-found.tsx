import { Separator } from "@/components/ui/separator"

export default function NotFound() {
  return (
    <div className="flex items-center gap-6">
      <h2 className="text-2xl">404</h2>
      <Separator decorative orientation="vertical" className="h-16" />
      <p>This page could not be found</p>
    </div>
  )
}
