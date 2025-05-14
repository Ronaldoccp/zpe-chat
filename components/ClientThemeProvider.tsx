'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'

interface ClientThemeProviderProps {
  children: ReactNode
}

const ClientThemeProvider = ({ children }: ClientThemeProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default ClientThemeProvider 