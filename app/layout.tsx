import ClientLanguageProvider from '@/components/ClientLanguageProvider'
import ClientThemeProvider from '@/components/ClientThemeProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AIMI-ZPE | Sistema de Atendimento Inteligente Multilíngue',
  description: 'Plataforma de atendimento inteligente para a ZPE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ClientThemeProvider>
          <ClientLanguageProvider>
            {children}
          </ClientLanguageProvider>
        </ClientThemeProvider>
      </body>
    </html>
  )
} 