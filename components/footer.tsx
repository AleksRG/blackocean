import React from 'react'
import { ExternalLink } from '@/components/external-link'

function FooterText() {
  return (
    <div className="px-2 text-center text-xs leading-normal text-muted-foreground hidden sm:block">
      Black Ocean AI Checker from{' '}
      <ExternalLink href="https://twitter.com/AlekssRG">AlexRG</ExternalLink>
    </div>
  )
}

export default FooterText
