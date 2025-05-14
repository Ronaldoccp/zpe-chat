'use client'

import { SUPPORTED_LANGUAGES, useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  
  // Encontrar o idioma atual para exibir sua bandeira
  const currentLangObj = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)
  
  const toggleDropdown = () => setIsOpen(!isOpen)
  
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-secondary-800 transition-colors"
        aria-label={t('selectLanguage')}
      >
        <span className="text-xl">{currentLangObj?.flag}</span>
        <span className="hidden sm:inline-block">{currentLangObj?.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-md shadow-lg z-10 py-1">
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors ${
                currentLanguage === lang.code ? 'bg-primary-50 dark:bg-primary-900' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher 