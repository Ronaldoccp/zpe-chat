'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { ReactNode } from 'react'

interface ClientLanguageProviderProps {
  children: ReactNode
}

const ClientLanguageProvider = ({ children }: ClientLanguageProviderProps) => {
  return <LanguageProvider>{children}</LanguageProvider>
}

export default ClientLanguageProvider 