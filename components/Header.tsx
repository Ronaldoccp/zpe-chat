'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import React from 'react'

interface HeaderProps {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { t } = useLanguage()

  return (
    <header className="bg-white dark:bg-secondary-800 shadow border-b border-gray-200 dark:border-gray-700">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">AIMI-ZPE</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full">
              Powered by DeepSeek
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('systemTitle')}
            </p>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header 