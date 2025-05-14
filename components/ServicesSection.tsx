'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

interface Service {
  id: string
  name: string
  icon: string
  description: string
  status: 'available' | 'unavailable' | 'maintenance'
  category: 'infrastructure' | 'customs' | 'logistics' | 'consulting'
  aiScore?: number // Pontuação de relevância calculada pela IA
}

const ServicesSection = () => {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string | null>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAIRecommendations, setShowAIRecommendations] = useState(false)
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false)

  const mockServices: Service[] = [
    {
      id: 'service-1',
      name: 'Desembaraço Aduaneiro',
      icon: '📦',
      description: 'Serviço de desembaraço aduaneiro para importação e exportação de mercadorias.',
      status: 'available',
      category: 'customs',
      aiScore: 95
    },
    {
      id: 'service-2',
      name: 'Transporte Interno',
      icon: '🚚',
      description: 'Serviço de transporte interno das mercadorias dentro da ZPE.',
      status: 'available',
      category: 'logistics',
      aiScore: 72
    },
    {
      id: 'service-3',
      name: 'Consultoria em Comércio Exterior',
      icon: '📊',
      description: 'Serviço de consultoria em operações de comércio exterior e regimes aduaneiros especiais.',
      status: 'available',
      category: 'consulting',
      aiScore: 88
    },
    {
      id: 'service-4',
      name: 'Armazenagem',
      icon: '🏭',
      description: 'Serviço de armazenagem de mercadorias em regime de entreposto aduaneiro.',
      status: 'maintenance',
      category: 'infrastructure',
      aiScore: 65
    },
    {
      id: 'service-5',
      name: 'Certificação de Origem',
      icon: '📜',
      description: 'Emissão de certificados de origem para mercadorias exportadas.',
      status: 'available',
      category: 'customs',
      aiScore: 90
    },
    {
      id: 'service-6',
      name: 'Agendamento de Inspeções',
      icon: '🔍',
      description: 'Agendamento de inspeções aduaneiras e fitossanitárias.',
      status: 'unavailable',
      category: 'customs',
      aiScore: 45
    }
  ]

  // Simular análise de IA
  useEffect(() => {
    if (showAIRecommendations) {
      setIsAIAnalyzing(true)
      const timer = setTimeout(() => {
        setIsAIAnalyzing(false)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [showAIRecommendations])

  // Filtrar serviços por categoria e busca
  const filteredServices = mockServices.filter(service => {
    // Filtro por categoria
    if (activeCategory !== 'all' && service.category !== activeCategory) {
      return false
    }
    
    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        service.name.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query)
      )
    }
    
    return true
  }).sort((a, b) => {
    // Ordenar por pontuação de IA se as recomendações estiverem ativas
    if (showAIRecommendations) {
      return (b.aiScore || 0) - (a.aiScore || 0)
    }
    return 0
  })

  // Categorias para filtro
  const categories = [
    { id: 'all', name: 'Todos', icon: '🔄' },
    { id: 'infrastructure', name: 'Infraestrutura', icon: '🏢' },
    { id: 'customs', name: 'Aduaneiro', icon: '🛃' },
    { id: 'logistics', name: 'Logística', icon: '🚚' },
    { id: 'consulting', name: 'Consultoria', icon: '💼' }
  ]

  // Tradução de status
  const getStatusText = (status: Service['status']) => {
    switch (status) {
      case 'available':
        return <span className="text-green-600 dark:text-green-400">Disponível</span>
      case 'unavailable':
        return <span className="text-red-600 dark:text-red-400">Indisponível</span>
      case 'maintenance':
        return <span className="text-yellow-600 dark:text-yellow-400">Em Manutenção</span>
    }
  }

  // Função para solicitar um serviço
  const requestService = (serviceId: string) => {
    alert(`Solicitação enviada para o serviço ${serviceId}`)
    // Em uma implementação real, integraria com uma API
  }

  return (
    <div className="h-full flex flex-col">
      {/* Cabeçalho e busca */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Serviços Disponíveis</h1>
          <button
            onClick={() => setShowAIRecommendations(!showAIRecommendations)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              showAIRecommendations 
                ? 'bg-primary-500 text-white' 
                : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/30'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {showAIRecommendations ? 'Desativar IA' : 'Recomendações de IA'}
          </button>
        </div>
        
        {showAIRecommendations && (
          <div className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-900/30 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary-700 dark:text-primary-400">Análise de IA Personalizada</h3>
                {isAIAnalyzing ? (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Analisando seu perfil e histórico de operações...
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Baseado no seu perfil e atividades recentes, nossa IA identificou os serviços mais relevantes para sua operação atual. Os serviços estão ordenados por relevância.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar serviços..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-2 rounded-full text-sm flex items-center space-x-1.5 transition-all ${
                activeCategory === category.id
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de serviços */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group border border-gray-100 dark:border-secondary-700 relative"
            >
              {showAIRecommendations && service.aiScore && service.aiScore > 85 && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary-500 text-white text-xs font-semibold z-10 shadow-md flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Recomendado
                </div>
              )}
              
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3 p-2 bg-gray-100 dark:bg-secondary-700 rounded-full">{service.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg">{service.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getStatusText(service.status)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                
                {showAIRecommendations && service.aiScore && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Relevância</span>
                      <span className="text-xs font-medium">{service.aiScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          service.aiScore > 85 ? 'bg-primary-500' : 
                          service.aiScore > 60 ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${service.aiScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <button
                    onClick={() => requestService(service.id)}
                    disabled={service.status !== 'available'}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                      service.status === 'available'
                        ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {service.status === 'available' ? 'Solicitar Serviço' : 'Indisponível'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-gray-50 dark:bg-secondary-800/50 rounded-xl border border-gray-100 dark:border-secondary-700">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium">Nenhum serviço encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              Tente ajustar seus filtros ou busca, ou consulte nosso assistente de IA para recomendações personalizadas.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesSection 