'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import React from 'react'

interface HeaderProps {
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { t } = useLanguage()

  return (
    <header className="bg-white dark:bg-secondary-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Logo placeholder - substituir pela logo real */}
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                ZPE
              </div>
            </div>
            <div className="hidden md:block ml-4">
              <h1 className="text-lg font-semibold">AIMI-ZPE</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('systemTitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {children}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 