'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

interface KnowledgeCategory {
  id: string
  name: string
  icon: string
  articles: KnowledgeArticle[]
}

interface KnowledgeArticle {
  id: string
  title: string
  summary: string
  content: string
  tags: string[]
  lastUpdated: Date
  sourceUrl?: string
}

const KnowledgeBase = () => {
  const { t, currentLanguage } = useLanguage()
  const [categories, setCategories] = useState<KnowledgeCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [relatedArticles, setRelatedArticles] = useState<KnowledgeArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados da base de conhecimento
  useEffect(() => {
    // Simulação de busca de dados
    setIsLoading(true)
    setTimeout(() => {
      const mockCategories: KnowledgeCategory[] = [
        {
          id: 'legislation',
          name: t('legislation'),
          icon: '⚖️',
          articles: [
            {
              id: 'legislation-1',
              title: t('zpeDecree'),
              summary: t('zpeDecreeSummary'),
              content: t('zpeDecreeContent'),
              tags: ['legislação', 'decreto', 'ZPE'],
              lastUpdated: new Date('2023-01-15')
            },
            {
              id: 'legislation-2',
              title: t('taxIncentives'),
              summary: t('taxIncentivesSummary'),
              content: t('taxIncentivesContent'),
              tags: ['incentivos', 'impostos', 'benefícios'],
              lastUpdated: new Date('2023-03-22')
            }
          ]
        },
        {
          id: 'procedures',
          name: t('procedures'),
          icon: '📋',
          articles: [
            {
              id: 'procedures-1',
              title: t('importProcedure'),
              summary: t('importProcedureSummary'),
              content: t('importProcedureContent'),
              tags: ['importação', 'procedimentos', 'documentos'],
              lastUpdated: new Date('2023-02-10')
            },
            {
              id: 'procedures-2',
              title: t('exportProcedure'),
              summary: t('exportProcedureSummary'),
              content: t('exportProcedureContent'),
              tags: ['exportação', 'procedimentos', 'documentos'],
              lastUpdated: new Date('2023-02-12')
            }
          ]
        },
        {
          id: 'infrastructure',
          name: t('infrastructure'),
          icon: '🏗️',
          articles: [
            {
              id: 'infrastructure-1',
              title: t('availableServices'),
              summary: t('availableServicesSummary'),
              content: t('availableServicesContent'),
              tags: ['infraestrutura', 'serviços', 'instalações'],
              lastUpdated: new Date('2022-11-05')
            }
          ]
        },
        {
          id: 'partners',
          name: t('partners'),
          icon: '🤝',
          articles: [
            {
              id: 'partners-1',
              title: t('customsBrokers'),
              summary: t('customsBrokersSummary'),
              content: t('customsBrokersContent'),
              tags: ['parceiros', 'despachantes', 'serviços'],
              lastUpdated: new Date('2023-04-01')
            }
          ]
        }
      ]
      
      setCategories(mockCategories)
      if (mockCategories.length > 0) {
        setSelectedCategory(mockCategories[0].id)
      }
      setIsLoading(false)
    }, 1000)
  }, [currentLanguage, t])

  // Buscar artigos baseados na consulta
  const searchArticles = (query: string) => {
    if (!query.trim()) {
      setRelatedArticles([])
      return
    }
    
    const lowerQuery = query.toLowerCase()
    const results: KnowledgeArticle[] = []
    
    categories.forEach(category => {
      category.articles.forEach(article => {
        if (
          article.title.toLowerCase().includes(lowerQuery) ||
          article.summary.toLowerCase().includes(lowerQuery) ||
          article.content.toLowerCase().includes(lowerQuery) ||
          article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        ) {
          results.push(article)
        }
      })
    })
    
    setRelatedArticles(results)
  }

  // Efeito para busca com delay
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchArticles(searchQuery)
    }, 300)
    
    return () => clearTimeout(delaySearch)
  }, [searchQuery])

  // Selecionar artigo para visualização
  const handleArticleClick = (article: KnowledgeArticle) => {
    setSelectedArticle(article)
    // Em uma implementação real, faria uma requisição para obter o conteúdo completo
  }

  // Obter artigos da categoria selecionada
  const getCategoryArticles = () => {
    if (!selectedCategory) return []
    const category = categories.find(cat => cat.id === selectedCategory)
    return category ? category.articles : []
  }

  // Formatar data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Barra de pesquisa */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchKnowledgeBase')}
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">{t('loading')}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Resultados de busca */}
          {searchQuery && relatedArticles.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('searchResults')}</h2>
              <div className="space-y-3">
                {relatedArticles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="p-4 bg-white dark:bg-secondary-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
                  >
                    <h3 className="font-medium text-primary-600 dark:text-primary-400">{article.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {article.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {searchQuery && relatedArticles.length === 0 && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-600 dark:text-yellow-400">{t('noResultsFound')}</p>
            </div>
          )}
          
          {/* Conteúdo principal */}
          {!searchQuery && (
            <div className="flex flex-1 gap-6 overflow-hidden">
              {/* Categorias */}
              <div className="w-64 flex-shrink-0 overflow-auto">
                <h2 className="text-xl font-semibold mb-4">{t('categories')}</h2>
                <nav>
                  <ul className="space-y-1">
                    {categories.map(category => (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-secondary-700'
                          }`}
                        >
                          <span className="mr-2 text-xl">{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Artigos */}
              <div className="flex-1 overflow-auto">
                {!selectedArticle ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {selectedCategory && categories.find(c => c.id === selectedCategory)?.name}
                    </h2>
                    <div className="space-y-4">
                      {getCategoryArticles().map(article => (
                        <div
                          key={article.id}
                          onClick={() => handleArticleClick(article)}
                          className="p-4 bg-white dark:bg-secondary-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
                        >
                          <h3 className="font-medium text-primary-600 dark:text-primary-400">{article.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.summary}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex flex-wrap gap-1">
                              {article.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {t('lastUpdated')}: {formatDate(article.lastUpdated)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
                    <button 
                      onClick={() => setSelectedArticle(null)} 
                      className="flex items-center text-sm text-primary-600 dark:text-primary-400 mb-4"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      {t('backToList')}
                    </button>
                    
                    <h1 className="text-2xl font-bold mb-2">{selectedArticle.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {t('lastUpdated')}: {formatDate(selectedArticle.lastUpdated)}
                    </p>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      {/* Em produção, o conteúdo teria formatação rica (HTML/Markdown) */}
                      <p>{selectedArticle.content}</p>
                    </div>
                    
                    {/* Conteúdo relacionado */}
                    <div className="mt-10">
                      <h3 className="text-lg font-medium mb-4">{t('relatedContent')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories
                          .flatMap(cat => cat.articles)
                          .filter(art => 
                            art.id !== selectedArticle.id && 
                            art.tags.some(tag => selectedArticle.tags.includes(tag))
                          )
                          .slice(0, 2)
                          .map(article => (
                            <div
                              key={article.id}
                              onClick={() => handleArticleClick(article)}
                              className="p-4 border border-gray-100 dark:border-secondary-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
                            >
                              <h4 className="font-medium text-primary-600 dark:text-primary-400">{article.title}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.summary}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default KnowledgeBase 