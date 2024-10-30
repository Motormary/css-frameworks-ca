import { Dot, Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex w-full h-screen">
      <div className="m-auto flex gap-2 ">
        <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground duration-1500 animate-ping delay-100"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground duration-1500 animate-ping delay-300"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground duration-1500 animate-ping delay-500"></div>
      </div>
    </div>
  )
}
