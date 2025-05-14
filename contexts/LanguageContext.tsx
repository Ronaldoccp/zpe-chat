'use client'

import i18next from 'i18next'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { initReactI18next, useTranslation } from 'react-i18next'

// Lista de idiomas suportados (RF01.1)
export const SUPPORTED_LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
]

// Recursos de tradução iniciais (serão carregados dinamicamente)
const resources = {
  pt: {
    translation: {
      welcome: 'Bem-vindo ao Sistema de Atendimento Inteligente Multilíngue da ZPE',
      selectLanguage: 'Selecione seu idioma',
      chatPlaceholder: 'Digite sua mensagem...',
      send: 'Enviar',
      loading: 'Carregando...',
      welcomeMessage: 'Olá! Sou o assistente virtual da ZPE. Como posso ajudar você hoje?',
      systemTitle: 'Sistema de Atendimento Inteligente Multilíngue',
      documents: 'Documentos',
      knowledgeBase: 'Base de Conhecimento',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Escuro',
      virtualAssistant: 'Assistente Virtual',
    }
  },
  en: {
    translation: {
      welcome: 'Welcome to the ZPE Multilingual Intelligent Service System',
      selectLanguage: 'Select your language',
      chatPlaceholder: 'Type your message...',
      send: 'Send',
      loading: 'Loading...',
      welcomeMessage: 'Hello! I am the ZPE virtual assistant. How can I help you today?',
      systemTitle: 'Multilingual Intelligent Service System',
      documents: 'Documents',
      knowledgeBase: 'Knowledge Base',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      virtualAssistant: 'Virtual Assistant',
    }
  }
}

// Inicialização do i18next
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

// Tipo do contexto
type LanguageContextType = {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  detectLanguage: (text: string) => Promise<string>
  getGlossaryTerm: (term: string) => Promise<string>
  formatWithCulturalContext: (text: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt')
  const { t } = useTranslation()

  // Alterar o idioma ativo
  const setLanguage = (lang: string) => {
    i18next.changeLanguage(lang)
    setCurrentLanguage(lang)
    // Salvar preferência do usuário
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang)
    }
  }

  // Detecção automática de idioma (RF01.2)
  const detectLanguage = async (text: string): Promise<string> => {
    try {
      // Simulação - em produção, usaria uma API como Google Cloud Language
      const detectedLang = 'pt' // valor padrão
      return detectedLang
    } catch (error) {
      console.error('Erro ao detectar idioma:', error)
      return 'pt' // Idioma padrão em caso de erro
    }
  }

  // Glossário técnico especializado (RF01.3)
  const getGlossaryTerm = async (term: string): Promise<string> => {
    // Simulação - em produção, consultaria uma base de dados de termos técnicos
    const glossary = {
      'ZPE': {
        pt: 'Zona de Processamento de Exportação',
        en: 'Export Processing Zone',
      },
      'drawback': {
        pt: 'Regime aduaneiro que permite a importação de insumos desonerados para utilização na produção de bens para exportação',
        en: 'Customs regime that allows the import of tax-free inputs for use in the production of goods for export',
      }
    }
    
    // @ts-ignore
    return glossary[term]?.[currentLanguage] || term
  }

  // Adequação cultural (RF01.4)
  const formatWithCulturalContext = (text: string): string => {
    // Aplicaria adaptações culturais conforme o idioma
    return text
  }

  // Carregar idioma preferido ao iniciar
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Detectar idioma do navegador
      const browserLang = navigator.language.split('-')[0]
      const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang)
      setLanguage(isSupported ? browserLang : 'pt')
    }
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        detectLanguage,
        getGlossaryTerm,
        formatWithCulturalContext
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// Hook personalizado para usar o contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider')
  }
  return context
} 