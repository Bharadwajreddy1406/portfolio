import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bharadwaj Reddy | Software Engineer',
  description: 'Portfolio of Bharadwaj Reddy, a backend engineer building data-intensive systems and production AI products.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
