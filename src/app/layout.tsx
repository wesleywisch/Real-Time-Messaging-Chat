import { Inter } from 'next/font/google'

import { ToasterContext } from '../contexts/ToasterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat de mensagem | Home',
  description: 'Chat de mensagem | Home',
}

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  )
}
