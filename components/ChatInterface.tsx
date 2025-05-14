'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import React, { useEffect, useRef, useState } from 'react'
import VirtualAssistant from './VirtualAssistant'

type Message = {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

const ChatInterface = () => {
  const { t, detectLanguage } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Função para adicionar uma mensagem ao chat
  const addMessage = (text: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  // Rolagem automática para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Foco automático no input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Exemplo de mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(t('welcomeMessage'), 'assistant')
      }, 500)
    }
  }, [t])

  // Enviar mensagem do usuário
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Detectar idioma (RF01.2)
    const detectedLang = await detectLanguage(inputValue)
    console.log('Idioma detectado:', detectedLang)

    // Adicionar mensagem do usuário
    addMessage(inputValue, 'user')
    setInputValue('')
    
    // Simulação de digitação do assistente
    setIsTyping(true)
    
    // Simulação de resposta do assistente (substituir por integração real)
    setTimeout(() => {
      setIsTyping(false)
      addMessage(`Resposta simulada para: "${inputValue}"`, 'assistant')
    }, 1500)
  }

  // Lidar com tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-secondary-900 rounded-lg overflow-hidden">
      {/* Área de avatar e assistente virtual */}
      <div className="bg-primary-500 text-white p-4">
        <VirtualAssistant />
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100'
                  : 'bg-white dark:bg-secondary-800 shadow'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-secondary-800 max-w-xs rounded-lg px-4 py-2 shadow">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Área de input */}
      <div className="p-4 border-t border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chatPlaceholder')}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('send')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface 