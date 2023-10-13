import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Drop token address for check',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Sign a transaction',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Enjoying the report',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Black Ocean AI Checker
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open-source app for checking the legitimacy of{' '}
          <ExternalLink href="https://solana.com/">Solana</ExternalLink> SPL
          tokens. Determine if a token is a scam, rug pull, or a good
          investment.{' '}
        </p>
        <p className="leading-normal text-muted-foreground">
          You need a Solana wallet to use this tool.
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <span key={index} className="flex items-center">
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
