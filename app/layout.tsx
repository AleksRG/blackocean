import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'

const title = 'Black Ocean AI Checker'
const description = 'An AI-powered chatbot for crypto tokens.'
export const metadata: Metadata = {
  title,
  description,

  openGraph: {
    title,
    description
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@AlexRG'
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon-16x16.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  metadataBase: new URL('https://blackocean-aleksrg.vercel.app/')
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        {' '}
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen background">
            {/* @ts-ignore */}
            <Header />
            <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
