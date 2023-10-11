'use client'

import * as React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from 'next/dynamic'
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
  { ssr: false }
)

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowElbow, IconSpinner } from '@/components/ui/icons'
import { useTheme } from 'next-themes'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButton({
  text = 'Login with Wallet',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const { publicKey } = useWallet()

  return (
    <Button className={cn(className)} {...props} variant="secondary">
      {!publicKey ? (
        <WalletMultiButtonDynamic
          style={{
            fontSize: 15,
            fontWeight: 'normal',
            background: 'transparent',
            height: 0
          }}
        >
          <span className="px-2 text-center text-xs leading-normal text-muted-foreground ">
            Connect
          </span>
        </WalletMultiButtonDynamic>
      ) : (
        <WalletDisconnectButtonDynamic
          style={{
            fontSize: 15,
            fontWeight: 'normal',
            background: 'transparent'
          }}
        >
          {' '}
          <span className="px-2 text-center text-xs leading-normal text-muted-foreground ">
            Disconnect
          </span>
        </WalletDisconnectButtonDynamic>
      )}{' '}
    </Button>
  )
}
