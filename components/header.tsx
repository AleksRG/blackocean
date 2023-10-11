import * as React from 'react'
import { IconVercel } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { LoginButton } from '@/components/login-button'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center w-full mx-auto max-w-7xl justify-between space-x-2">
        <IconVercel />
        <LoginButton />
        <ThemeToggle />
      </div>
    </header>
  )
}
