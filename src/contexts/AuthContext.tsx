'use client'
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

type AuthContextProps = {
  children: ReactNode;
}

export function AuthContext({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}