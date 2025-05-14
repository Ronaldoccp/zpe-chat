'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import React, { useState } from 'react'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { t } = useLanguage()
  const [collapsed, setCollapsed] = useState(false)

  // Menu items
  const menuItems = [
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'documents', icon: '📄', label: 'Documentos' },
    { id: 'knowledge', icon: '📚', label: 'Base de Conhecimento' },
    { id: 'services', icon: '🔧', label: 'Serviços' },
    { id: 'workflows', icon: '📋', label: 'Fluxos de Trabalho' },
    { id: 'analytics', icon: '📊', label: 'Análises' },
    { id: 'profile', icon: '👤', label: 'Perfil' },
  ]

  return (
    <aside
      className={`bg-white dark:bg-secondary-800 border-r border-gray-200 dark:border-secondary-700 transition-all ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 self-end"
        >
          {collapsed ? '→' : '←'}
        </button>

        {/* Navigation menu */}
        <nav className="mt-5 flex-1 px-2">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-secondary-700'
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-secondary-700">
          <div className="flex items-center">
            {!collapsed && (
              <div className="ml-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  © 2023 AIMI-ZPE
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar 