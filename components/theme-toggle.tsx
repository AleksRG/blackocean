'use client'
import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        })
      }}
    >
      {!mounted ? (
        ''
      ) : !theme ? null : theme === 'dark' ? (
        <MoonIcon className="transition-all" />
      ) : (
        <SunIcon className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
