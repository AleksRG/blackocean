import React from 'react'
import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Black Ocean AI Checker from{' '}
      <ExternalLink href="https://nextjs.org">AlexRG</ExternalLink>
    </div>
  )
}
