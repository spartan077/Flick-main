import './globals.css'

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FLICK',
  description: 'Video messaging platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}