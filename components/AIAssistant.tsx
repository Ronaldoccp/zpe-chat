'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { callDeepSeekAPI, ChatMessage } from '@/lib/api'
import { useEffect, useRef, useState } from 'react'

interface AIAssistantProps {
  onClose: () => void
  suggestions: string[]
}

const AIAssistant = ({ onClose, suggestions }: AIAssistantProps) => {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<{
    id: string
    content: string
    sender: 'user' | 'assistant'
    timestamp: Date
  }[]>([
    {
      id: 'welcome',
      content: 'Olá! Sou seu assistente de IA DeepSeek. Como posso ajudar você hoje?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focar no input quando o componente é montado
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Processar a mensagem usando a API do DeepSeek
  const processMessage = async (message: string) => {
    setIsProcessing(true)
    
    try {
      // Preparar o histórico de conversas para o formato necessário para a API
      const chatHistory: ChatMessage[] = [
        {
          role: 'system',
          content: 'Você é um assistente virtual multilíngue especializado em comércio exterior, aduanas e Zonas de Processamento de Exportação. Forneça respostas precisas, claras e concisas em português. Seja prestativo e profissional.'
        }
      ];
      
      // Adicionar o histórico de mensagens anteriores
      messages.forEach(msg => {
        chatHistory.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
      
      // Adicionar a mensagem atual do usuário
      chatHistory.push({
        role: 'user',
        content: message
      });
      
      // Chamar a API do DeepSeek
      const response = await callDeepSeekAPI(chatHistory);
      
      // Adicionar a resposta do assistente ao histórico de mensagens
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      
      // Em caso de erro, fornecer uma resposta de fallback
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        content: 'Desculpe, estou enfrentando dificuldades para processar sua solicitação. Por favor, tente novamente mais tarde.',
        sender: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  }

  // Enviar mensagem
  const sendMessage = () => {
    if (!input.trim()) return
    
    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date()
    }])
    
    // Processar a mensagem
    processMessage(input)
    
    // Limpar input
    setInput('')
  }

  // Usar uma sugestão como mensagem
  const useSuggestion = (suggestion: string) => {
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      content: suggestion,
      sender: 'user',
      timestamp: new Date()
    }])
    
    processMessage(suggestion)
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-secondary-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-secondary-700 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-secondary-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">DeepSeek AI</h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Mensagens */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Sugestões */}
      {suggestions.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => useSuggestion(suggestion)}
                className="text-xs bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 px-3 py-1 rounded-full transition text-gray-700 dark:text-gray-300"
              >
                {suggestion.length > 30 ? suggestion.substring(0, 30) + '...' : suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input de mensagem */}
      <div className="p-4 border-t border-gray-200 dark:border-secondary-700">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-secondary-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
          />
          <button
            onClick={sendMessage}
            disabled={isProcessing || !input.trim()}
            className={`px-4 py-2 rounded-r-lg ${
              isProcessing || !input.trim()
                ? 'bg-gray-300 dark:bg-secondary-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant 