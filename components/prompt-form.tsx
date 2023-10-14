import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { prompt } from '@/lib/prompt'
import { Button } from '@/components/ui/button'
import { IconArrowElbow } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { publicKey, sendTransaction } = useWallet()
  const toPublicKey = new PublicKey(
    '8gW5oJqmrDk7Ja8kpTcwba3tDFx4PuexgYg9QdCCZDiM'
  )

  // const apiKey = process.env.CG_API_KEY

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!input?.trim()) {
      return
    }
    setInput('')
    const devnet = process.env.NEXT_PUBLIC_API_KEY //--> for test
    const mainnet = process.env.NEXT_PUBLIC_API_KEY_HELIUS
    try {
      const solanaConnection = new Connection(mainnet!)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${input}/contract/${input}`
      )
      if (response.ok) {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey!,
            toPubkey: toPublicKey,
            lamports: 5_000_000
          })
        )
        await sendTransaction(transaction, solanaConnection)

        const data = await response.json()
        data && (await onSubmit(await prompt(data)))
      } else {
        console.log('bad response')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Drop token address here."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === '' || !publicKey}
              >
                <IconArrowElbow />
                <span className="sr-only">Drop token address here.</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Drop token address here.</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
