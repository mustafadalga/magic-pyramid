import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: [ 'latin' ] })

export const metadata: Metadata = {
    title: 'Magic Pyramid Puzzle: Challenge Your Mind!',
    description: 'Dive into the Magic Pyramid game and test your strategic skills. Can you solve the puzzle and conquer the pyramid? Join now and challenge yourself!',
    keywords: [
        'Magic Pyramid',
        'Logic Puzzle Game',
        'Pyramid Puzzle',
        'Brain Teaser',
        'Number Puzzle',
        'Strategy Game',
        'Mind Challenge',
        'Number Logic Game',
        'Fun with Numbers',
        'Pyramid Path Game',
        'Mathematical Puzzle',
        'Logical Thinking',
        'Puzzle Solving',
        'Educational Game',
        'Mental Exercise',
        'Number Strategy',
        'Number Sequence',
        'IQ Game',
        'Brain Training',
        'Entertainment Game'
    ],
    authors: [ { name: "Mustafa Dalga", "url": "https://github.com/mustafadalga/magic-pyramid" } ],
    icons: [
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon-32x32.png"
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/apple-touch-icon.png"
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/favicon-16x16.png"
        }, {
            rel: "mask-icon",
            url: "/safari-pinned-tab.svg",
            color: "#a855f7"
        }
    ],
    themeColor: "#ffffff",
    applicationName: "Magic Pyramid Puzzle",
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


