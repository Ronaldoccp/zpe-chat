'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<string>('light')

  // Função para alternar entre temas
  const toggleTheme = () => {
    setThemeState(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  // Função para definir o tema
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
      
      // Aplicar classe ao documento
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Efeito para definir o tema inicial
  useEffect(() => {
    setMounted(true)
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme')
    
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Definir tema com base nas preferências
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  // Evitar inconsistências de renderização
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

// Hook personalizado para usar o contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
} 