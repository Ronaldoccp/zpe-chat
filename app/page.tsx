'use client'

import ChatInterface from '@/components/ChatInterface'
import DocumentUpload from '@/components/DocumentUpload'
import Header from '@/components/Header'
import KnowledgeBase from '@/components/KnowledgeBase'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Sidebar from '@/components/Sidebar'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

export default function Home() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>('chat')

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-secondary-900">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </Header>

        {/* Conteúdo dinâmico baseado na seção ativa */}
        <main className="flex-1 overflow-auto p-4">
          {activeSection === 'chat' && (
            <div className="h-full flex flex-col">
              <h1 className="text-2xl font-bold mb-6">{t('welcome')}</h1>
              <ChatInterface />
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="h-full flex flex-col">
              <h1 className="text-2xl font-bold mb-6">{t('documents')}</h1>
              <DocumentUpload />
            </div>
          )}

          {activeSection === 'knowledge' && (
            <div className="h-full flex flex-col">
              <h1 className="text-2xl font-bold mb-6">{t('knowledgeBase')}</h1>
              <KnowledgeBase />
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 