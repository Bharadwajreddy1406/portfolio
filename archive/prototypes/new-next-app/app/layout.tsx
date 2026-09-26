import type { Metadata } from 'next'
import { DM_Mono, DM_Sans, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Bharadwaj Reddy - Portfolio 2026',
  description: 'Warm editorial portfolio for Bharadwaj Reddy, full-stack developer and AI builder.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
