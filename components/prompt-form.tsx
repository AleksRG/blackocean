import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

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
  Keypair,
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
  const apiKey = process.env.CG_API_KEY
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
    const mainnet =
      'https://solana-mainnet.g.alchemy.com/v2/A08zenkPgbiswU2TshBqCl8KSfAmw1bj'
    const devnet =
      'https://billowing-ancient-glitter.solana-devnet.discover.quiknode.pro/d52677252e70e895b574ad1109039aba6f0e73d3/'
    {
      /* So11111111111111111111111111111111111111112 */
    }
    try {
      const solanaConnection = new Connection(mainnet)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${input}/contract/${input}`
      )
      if (response.ok) {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey!,
            toPubkey: toPublicKey,
            lamports: 50_000_000
          })
        )
        await sendTransaction(transaction, solanaConnection)
        // await connection.confirmTransaction(signature, 'processed')
        const data = await response.json()
        data &&
          (await onSubmit(`Please provide an analysis of the cryptocurrency token based on the following information:
           ${data.name} - ${data.symbol}  
           Asset platform id : ${data.asset_platform_id}  
           Coingeco rank: ${data.coingecko_rank}  
           Coingeco score: ${data.coingecko_score}  
           Community score: ${data.community_score}  
           Liquidit score: ${data.liquidity_score}  
           Market data ATH USD: ${data.market_data.ath.usd}  
           Market data ATH change percentage USD: ${data.market_data.ath_change_percentage.usd}  
           Market data ATH date USD: ${data.market_data.ath_date.usd}  
           Market data ATL USD: ${data.market_data.atl.usd}  
           Market data current price USD: ${data.market_data.current_price.usd}  
           Market data ATL date USD: ${data.market_data.atl_date.usd}  
           Market data fully diluted valuation USD: ${data.market_data.fully_diluted_valuation.usd}  
           Market data high 24h USD: ${data.market_data.high_24h.usd}  
           Market data low 24h USD: ${data.market_data.low_24h.usd}  
           Market data price change 24h in USD: ${data.market_data.price_change_24h_in_currency.usd}  
           Market data price change percentage 1h in USD: ${data.market_data.price_change_percentage_1h_in_currency.usd}  
           Market data price change percentage 1y: ${data.market_data.price_change_percentage_1y}  
           Market data price change percentage 1y in USD: ${data.market_data.price_change_percentage_1y_in_currency.usd}  
           Market data price change percentage 7d: ${data.market_data.price_change_percentage_7d}  
           Market data price change percentage 7d in USD: ${data.market_data.price_change_percentage_7d_in_currency.usd}  
           Market data price change percentage 14d: ${data.market_data.price_change_percentage_14d}
           Watchlist portfolio users: ${data.watchlist_portfolio_users}  
           Project is on these categories: ${data.categories}  
Based on this analysis, what insights can you provide regarding the token's performance and potential`))
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
