'use client'

import Header from '@/components/Header'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Sidebar from '@/components/Sidebar'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

// Componentes de seção
import AnalyticsSection from '@/components/AnalyticsSection'
import ChatInterface from '@/components/ChatInterface'
import DocumentUpload from '@/components/DocumentUpload'
import KnowledgeBase from '@/components/KnowledgeBase'
import ProfileSection from '@/components/ProfileSection'
import ServicesSection from '@/components/ServicesSection'
import WorkflowsSection from '@/components/WorkflowsSection'

export default function Home() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>('chat')

  // Renderizar a seção ativa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return (
          <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold mb-6">{t('welcome')}</h1>
            <ChatInterface />
          </div>
        )
      case 'documents':
        return <DocumentUpload />
      case 'knowledge':
        return <KnowledgeBase />
      case 'services':
        return <ServicesSection />
      case 'workflows':
        return <WorkflowsSection />
      case 'analytics':
        return <AnalyticsSection />
      case 'profile':
        return <ProfileSection />
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold">Seção em desenvolvimento</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Esta funcionalidade estará disponível em breve.
            </p>
          </div>
        )
    }
  }

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
          {renderActiveSection()}
        </main>
      </div>
    </div>
  )
} 