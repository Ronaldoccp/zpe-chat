'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'

interface ClientProvidersProps {
  children: ReactNode
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default ClientProviders 