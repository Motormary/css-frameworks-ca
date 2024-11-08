export default function Pill({ children }: { children: React.ReactNode }) {
  if (!children) return null
  return (
    <div className="inline-flex select-none items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      {children}
    </div>
  )
}
