'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [aiStatus, setAiStatus] = useState<'loading' | 'active' | 'offline'>('loading')

  // Simular inicialização da IA
  useEffect(() => {
    const timer = setTimeout(() => {
      setAiStatus('active')
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  // Links do menu principal
  const mainLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'chat', label: 'Assistente', icon: 'message-circle', aiEnabled: true },
    { id: 'documents', label: 'Documentos', icon: 'file-text' },
    { id: 'services', label: 'Serviços', icon: 'shopping-bag', aiEnabled: true },
    { id: 'workflows', label: 'Fluxos de Trabalho', icon: 'git-branch', aiEnabled: true, notification: 3 },
    { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2', aiEnabled: true }
  ]

  // Links secundários
  const secondaryLinks = [
    { id: 'knowledge', label: 'Base de Conhecimento', icon: 'book-open' },
    { id: 'settings', label: 'Configurações', icon: 'settings' },
    { id: 'profile', label: 'Perfil', icon: 'user' }
  ]

  // Renderizar ícone com base no nome
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'grid':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        )
      case 'message-circle':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )
      case 'file-text':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'shopping-bag':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )
      case 'git-branch':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        )
      case 'bar-chart-2':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      case 'book-open':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'settings':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'chevron-left':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        )
      case 'chevron-right':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <aside 
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } h-screen bg-white dark:bg-secondary-800 shadow-sm border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-9 h-9 bg-primary-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
            ZPE
          </div>
          {!collapsed && (
            <span className="ml-3 font-semibold text-gray-800 dark:text-white text-lg">
              AIMI-ZPE
            </span>
          )}
        </div>
      </div>

      {/* Status da IA */}
      <div className={`${collapsed ? 'mx-4' : 'mx-6'} py-3 border-b border-gray-200 dark:border-gray-700`}>
        <div className="flex items-center">
          <div className="relative">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${aiStatus === 'active' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${
              aiStatus === 'active' 
              ? 'bg-green-500' 
              : aiStatus === 'loading' 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
            } border-2 border-white dark:border-secondary-800`}></span>
          </div>

          {!collapsed && (
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                Assistente IA
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {aiStatus === 'active' 
                  ? 'Ativo e funcionando' 
                  : aiStatus === 'loading' 
                    ? 'Inicializando...' 
                    : 'Offline'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu principal */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav>
          <div className={`${collapsed ? 'px-3' : 'px-6'} space-y-1`}>
            {mainLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`${
                  activeSection === link.id
                    ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 border-transparent'
                } ${
                  collapsed ? 'justify-center' : ''
                } group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg border-l-4 transition-all`}
              >
                <div className="relative flex-shrink-0">
                  <span className={`${
                    activeSection === link.id 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}>
                    {renderIcon(link.icon)}
                  </span>
                  
                  {/* Indicador de AI */}
                  {link.aiEnabled && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
                  )}
                  
                  {/* Notificação */}
                  {link.notification && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs text-white bg-red-500 rounded-full">
                      {link.notification}
                    </span>
                  )}
                </div>
                
                {!collapsed && (
                  <span className="ml-4 truncate">{link.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* Seção secundária */}
          <div className={`mt-8 ${collapsed ? 'px-3' : 'px-6'}`}>
            <h3 className={`px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
              collapsed ? 'text-center' : ''
            }`}>
              {collapsed ? '···' : 'Sistema'}
            </h3>
            <div className="mt-2 space-y-1">
              {secondaryLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setActiveSection(link.id)}
                  className={`${
                    activeSection === link.id
                      ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 border-primary-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 border-transparent'
                  } ${
                    collapsed ? 'justify-center' : ''
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-lg border-l-4 transition-all`}
                >
                  <span className={`${
                    activeSection === link.id 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}>
                    {renderIcon(link.icon)}
                  </span>
                  
                  {!collapsed && (
                    <span className="ml-4 truncate">{link.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Rodapé */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-lg bg-gray-50 dark:bg-secondary-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-secondary-600 transition-colors"
        >
          {renderIcon(collapsed ? 'chevron-right' : 'chevron-left')}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar 