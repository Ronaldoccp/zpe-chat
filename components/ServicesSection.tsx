'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

interface Service {
  id: string
  name: string
  icon: string
  description: string
  status: 'available' | 'unavailable' | 'maintenance'
  category: 'infrastructure' | 'customs' | 'logistics' | 'consulting'
}

const ServicesSection = () => {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string | null>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const mockServices: Service[] = [
    {
      id: 'service-1',
      name: 'Desembaraço Aduaneiro',
      icon: '📦',
      description: 'Serviço de desembaraço aduaneiro para importação e exportação de mercadorias.',
      status: 'available',
      category: 'customs'
    },
    {
      id: 'service-2',
      name: 'Transporte Interno',
      icon: '🚚',
      description: 'Serviço de transporte interno das mercadorias dentro da ZPE.',
      status: 'available',
      category: 'logistics'
    },
    {
      id: 'service-3',
      name: 'Consultoria em Comércio Exterior',
      icon: '📊',
      description: 'Serviço de consultoria em operações de comércio exterior e regimes aduaneiros especiais.',
      status: 'available',
      category: 'consulting'
    },
    {
      id: 'service-4',
      name: 'Armazenagem',
      icon: '🏭',
      description: 'Serviço de armazenagem de mercadorias em regime de entreposto aduaneiro.',
      status: 'maintenance',
      category: 'infrastructure'
    },
    {
      id: 'service-5',
      name: 'Certificação de Origem',
      icon: '📜',
      description: 'Emissão de certificados de origem para mercadorias exportadas.',
      status: 'available',
      category: 'customs'
    },
    {
      id: 'service-6',
      name: 'Agendamento de Inspeções',
      icon: '🔍',
      description: 'Agendamento de inspeções aduaneiras e fitossanitárias.',
      status: 'unavailable',
      category: 'customs'
    }
  ]

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
        <h1 className="text-2xl font-bold mb-4">Serviços Disponíveis</h1>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar serviços..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
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
              className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1 ${
                activeCategory === category.id
                ? 'bg-primary-500 text-white'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className="bg-white dark:bg-secondary-800 rounded-lg shadow overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{service.icon}</div>
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getStatusText(service.status)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => requestService(service.id)}
                    disabled={service.status !== 'available'}
                    className={`w-full py-2 rounded-md text-sm font-medium ${
                      service.status === 'available'
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
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
          <div className="text-center py-10">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-medium">Nenhum serviço encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tente ajustar seus filtros ou busca
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesSection 