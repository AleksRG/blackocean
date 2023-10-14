'use client'
import { LockClosedIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from 'next/dynamic'
import { IconUser } from '@/components/ui/icons'
import { Button, type ButtonProps } from '@/components/ui/button'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)
export function LoginButton({
  text = 'Login with Wallet',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const { publicKey, disconnect, connecting } = useWallet()

  return (
    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground w-9 h-8">
      {!publicKey && !connecting ? (
        <>
          <LockClosedIcon className="transition-all absolute" />
          <WalletMultiButtonDynamic
            style={{
              background: 'transparent'
            }}
          >
            {' '}
          </WalletMultiButtonDynamic>
        </>
      ) : (
        <IconUser className="transition-all absolute" onClick={disconnect} />
      )}
    </div>
  )
}
