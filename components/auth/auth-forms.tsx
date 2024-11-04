"use client"

import { useState } from "react"
import LoginCard from "./login-card"
import RegisterCard from "./register-card"
import { cn } from "@/lib/utils"

export default function AuthForms() {
  const [slideAnimation, setSlideAnimation] = useState("translate-x-1/4")
  const [loginAnimation, setLoginAnimation] = useState("")
  const [regAnimation, setRegAnimation] = useState("opacity-0")

  function handleState(state: boolean) {
    if (state) {
      setLoginAnimation("animate-fadeIn")
      setRegAnimation("animate-fadeOut")
      setSlideAnimation("translate-x-1/4")
    }
    if (!state) {
      setRegAnimation("animate-fadeIn")
      setLoginAnimation("animate-fadeOut")
      setSlideAnimation("-translate-x-1/4")
    }
  }

  return (
    <div className="max-w-screen">
      <div
        className={cn(
          slideAnimation,
          "flex items-start duration-500 ease-linear transition-transform"
        )}>
        <LoginCard state={loginAnimation} setState={handleState} />
        <RegisterCard state={regAnimation} setState={handleState} />
      </div>
    </div>
  )
}
