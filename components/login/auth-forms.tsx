"use client"

import { useState } from "react"
import LoginCard from "./login-card"
import RegisterCard from "./register-card"

export default function AuthForms() {
  const [login, setLogin] = useState(true)

  if (login) return <LoginCard setState={setLogin} />
  else return <RegisterCard setState={setLogin} />
}
