'use client'

import Header from '@/components/Header'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Sidebar from '@/components/Sidebar'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

// Componentes de seção
import AIAssistant from '@/components/AIAssistant'
import AnalyticsSection from '@/components/AnalyticsSection'
import ChatInterface from '@/components/ChatInterface'
import DocumentUpload from '@/components/DocumentUpload'
import KnowledgeBase from '@/components/KnowledgeBase'
import ProfileSection from '@/components/ProfileSection'
import ServicesSection from '@/components/ServicesSection'
import WorkflowsSection from '@/components/WorkflowsSection'

export default function Home() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>('dashboard')
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Gerar sugestões de IA relevantes para cada seção
      generateAISuggestions(activeSection)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [activeSection])

  // Gerar sugestões de IA baseadas na seção atual
  const generateAISuggestions = (section: string) => {
    const suggestions: {[key: string]: string[]} = {
      dashboard: [
        'Detectamos um aumento de 15% em exportações tecnológicas este mês',
        'Há 3 processos aduaneiros que podem ser otimizados com base em IA',
        'Recomendamos revisão de documentação para o processo #2023-08'
      ],
      chat: [
        'Posso ajudar com dúvidas sobre o processo de exportação',
        'Quer que eu analise seus últimos documentos enviados?',
        'Posso explicar as mudanças recentes na legislação aduaneira'
      ],
      documents: [
        'Nossa IA pode extrair automaticamente dados de faturas e BLs',
        'Detectamos inconsistências em 2 documentos recentes',
        'Recomendamos atualizar certificados de origem para o próximo trimestre'
      ],
      services: [
        'Baseado no seu histórico, recomendamos o serviço de Consultoria Aduaneira',
        'O tempo médio de desembaraço foi reduzido em 20% este mês',
        'Há 5 oportunidades de otimização para seus processos atuais'
      ],
      workflows: [
        'A IA prevê que seu processo atual será concluído 2 dias antes do previsto',
        'Detectamos um possível gargalo no passo 3 do seu fluxo atual',
        'Há oportunidade de paralelização em 2 de seus processos ativos'
      ],
      analytics: [
        'Nossa IA identificou 3 tendências relevantes nos dados deste mês',
        'O modelo preditivo sugere aumento de 22% em importações no próximo trimestre',
        'Análise comparativa mostra oportunidade de redução de 15% em custos operacionais'
      ]
    }
    
    setAiSuggestions(suggestions[section] || [
      'Como posso ajudar com seu processo atual?',
      'Precisa de análise de dados ou documentos?',
      'Posso recomendar otimizações para seus fluxos de trabalho'
    ])
  }

  // Componente de Dashboard com IA integrada
  const DashboardSection = () => {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-6">{t('dashboard')}</h1>
        
        {/* Cartões de boas-vindas e resumo com insights de IA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Bem-vindo(a), João Silva</h2>
            <p className="opacity-90 mb-4">Seu assistente de IA identificou 5 itens prioritários para hoje</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveSection('workflows')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm backdrop-blur-sm transition"
              >
                Ver fluxos pendentes
              </button>
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm backdrop-blur-sm transition"
              >
                Consultar IA
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-secondary-700">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-bold">Insights da IA</h2>
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs rounded-full">
                Atualizado agora
              </span>
            </div>
            <ul className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary-500 dark:text-primary-400 mt-0.5">✦</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Widgets de métricas e processos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-secondary-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-secondary-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Processos Ativos</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">65% dentro do prazo</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-secondary-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Documentos Pendentes</p>
                <p className="text-2xl font-bold mt-1">8</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">3 requerem atenção imediata</p>
              <button 
                onClick={() => setActiveSection('documents')}
                className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
              >
                Revisar documentos
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-secondary-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Eficiência Operacional</p>
                <p className="text-2xl font-bold mt-1">87%</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <p className="text-xs text-green-500 dark:text-green-400 mt-1">↑ 12% comparado ao último mês</p>
            </div>
          </div>
        </div>

        {/* Seções de atividade recente e próximas etapas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-secondary-700">
            <h2 className="text-lg font-bold mb-4">Atividade Recente</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Processo #2023-08 aprovado pela Alfândega</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Há 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Novos documentos enviados para análise</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ontem às 15:30</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Relatório de análise gerado pela IA</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ontem às 09:45</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setActiveSection('workflows')}
              className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Ver todas as atividades
            </button>
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-secondary-700">
            <h2 className="text-lg font-bold mb-4">Próximas Etapas</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-secondary-700 rounded-lg border border-gray-200 dark:border-secondary-600">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Revisão Documental</p>
                  <span className="px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded">
                    Hoje
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Processo #2023-05
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-secondary-700 rounded-lg border border-gray-200 dark:border-secondary-600">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Pagamento de Impostos</p>
                  <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs rounded">
                    Amanhã
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Processo #2023-05
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-secondary-700 rounded-lg border border-gray-200 dark:border-secondary-600">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Reunião Aduaneira</p>
                  <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded">
                    3 dias
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Pauta: Novos procedimentos
                </p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition">
              Agendar Nova Atividade
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar a seção ativa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />
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

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-secondary-900 dark:to-secondary-800">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-primary-200 dark:border-primary-900/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
          Carregando AIMI-ZPE
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Inicializando assistente de IA e processamento multilíngue...
        </p>
      </div>
    )
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
            <button 
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800/30 transition"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Assistente IA
            </button>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </Header>

        {/* Conteúdo dinâmico baseado na seção ativa */}
        <main className="flex-1 overflow-auto p-4">
          {renderActiveSection()}
        </main>
        
        {/* Assistente de IA flutuante */}
        {showAIAssistant && (
          <AIAssistant 
            onClose={() => setShowAIAssistant(false)} 
            suggestions={aiSuggestions} 
          />
        )}
      </div>
    </div>
  )
} 