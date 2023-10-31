import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

import "fork-awesome/css/fork-awesome.min.css"

const inter = Inter({ subsets: ["cyrillic"] })

export const metadata: Metadata = {
  title: "CucumberKB",
  description: "База знаний, основанная на огуречной суперсиле 💪",
  applicationName: "CucumberKB",
  authors: {"name": "GENTLEMEMES", "url": "https://git.frogling.com/gentlememes"}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
