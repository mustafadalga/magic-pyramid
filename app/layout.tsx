import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Magic Pyramid Puzzle: Challenge Your Mind!',
  description: 'Dive into the Magic Pyramid game and test your strategic skills. Can you solve the puzzle and conquer the pyramid? Join now and challenge yourself!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen w-full bg-indigo-100 text-indigo-600`}>{children}</body>
    </html>
  )
}


