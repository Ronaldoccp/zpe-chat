'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

type AvatarType = 'default' | 'asian' | 'african' | 'european' | 'middleEastern'

// Mapeamento de idiomas para avatares culturalmente apropriados (RF02.4)
const languageToAvatar: Record<string, AvatarType> = {
  'zh': 'asian',    // Chinês
  'ja': 'asian',    // Japonês
  'ko': 'asian',    // Coreano
  'ar': 'middleEastern', // Árabe
  'fr': 'european', // Francês
  'de': 'european', // Alemão
  'en': 'default',  // Inglês
  'es': 'default',  // Espanhol
  'pt': 'default',  // Português
  'ru': 'european', // Russo
}

const VirtualAssistant = () => {
  const { currentLanguage, t } = useLanguage()
  const { theme } = useTheme()
  const [avatarType, setAvatarType] = useState<AvatarType>('default')
  const [speaking, setSpeaking] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Garantir renderização apenas no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Atualizar avatar com base no idioma
  useEffect(() => {
    if (!mounted) return;
    const newAvatarType = languageToAvatar[currentLanguage] || 'default'
    setAvatarType(newAvatarType)
  }, [currentLanguage, mounted])

  // Renderizar avatar apropriado
  const renderAvatar = () => {
    // Em produção, usaríamos imagens ou avatares 3D
    // Aqui estamos usando placeholders com emojis
    const avatarEmojis: Record<AvatarType, string> = {
      'default': '👩‍💼',
      'asian': '👲',
      'african': '👨🏿‍💼',
      'european': '👱‍♀️',
      'middleEastern': '👳‍♂️'
    }

    return (
      <div className="flex items-center justify-center">
        <div className="text-6xl">
          {avatarEmojis[avatarType]}
        </div>
      </div>
    )
  }

  // Simular assistente falando
  const simulateSpeaking = () => {
    setSpeaking(true)
    setTimeout(() => setSpeaking(false), 2000)
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div 
        onClick={simulateSpeaking}
        className={`relative cursor-pointer transition-transform ${speaking ? 'animate-pulse' : ''}`}
      >
        {renderAvatar()}
        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${speaking ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      </div>
      <div className="mt-2 text-center">
        <h3 className="font-medium">AIMI</h3>
        <p className="text-xs opacity-80">{t('virtualAssistant')}</p>
      </div>
    </div>
  )
}

export default VirtualAssistant 