'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

interface UserProfile {
  id: string
  name: string
  email: string
  company: string
  position: string
  sector: string
  country: string
  preferredLanguage: string
  profilePicture: string
  registrationDate: Date
  preferences: {
    notifications: {
      email: boolean
      sms: boolean
      app: boolean
      whatsapp: boolean
    }
    topics: string[]
  }
}

const ProfileSection = () => {
  const { t, currentLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<'info' | 'preferences' | 'activity'>('info')
  const [editMode, setEditMode] = useState(false)

  // Dados simulados do perfil do usuário
  const [profile, setProfile] = useState<UserProfile>({
    id: 'usr-123456',
    name: 'João Silva',
    email: 'joao.silva@empresa.com.br',
    company: 'Tecnologia Ltda.',
    position: 'Gerente de Exportação',
    sector: 'Tecnologia',
    country: 'Brasil',
    preferredLanguage: currentLanguage,
    profilePicture: '',
    registrationDate: new Date('2023-01-15'),
    preferences: {
      notifications: {
        email: true,
        sms: false,
        app: true,
        whatsapp: true
      },
      topics: ['Importação', 'Exportação', 'Legislação Aduaneira', 'Incentivos Fiscais']
    }
  })

  // Simulação de atividades recentes
  const recentActivities = [
    {
      id: 'act-1',
      type: 'login',
      date: new Date('2023-05-20T14:30:00'),
      description: 'Login no sistema'
    },
    {
      id: 'act-2',
      type: 'document',
      date: new Date('2023-05-19T10:15:00'),
      description: 'Upload de documento: Fatura Comercial #12345'
    },
    {
      id: 'act-3',
      type: 'workflow',
      date: new Date('2023-05-18T16:45:00'),
      description: 'Iniciou processo de exportação #2023-08'
    },
    {
      id: 'act-4',
      type: 'chat',
      date: new Date('2023-05-17T09:20:00'),
      description: 'Interação com assistente sobre requisitos de importação'
    }
  ]

  // Opções de setores
  const sectors = [
    'Tecnologia',
    'Automotivo',
    'Químico',
    'Farmacêutico',
    'Alimentos e Bebidas',
    'Têxtil',
    'Mineração',
    'Energia',
    'Outros'
  ]

  // Formatar data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR')
  }

  // Formatar data e hora
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('pt-BR')
  }

  // Ícone para tipo de atividade
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return '🔐'
      case 'document':
        return '📄'
      case 'workflow':
        return '📋'
      case 'chat':
        return '💬'
      default:
        return '📌'
    }
  }

  // Salvar alterações no perfil
  const saveChanges = () => {
    // Em uma implementação real, enviaria os dados para a API
    setEditMode(false)
    alert('Perfil atualizado com sucesso')
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Perfil do Usuário</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'info'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Informações Pessoais
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('preferences')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'preferences'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Preferências
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('activity')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'activity'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Atividade Recente
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        {/* Informações Pessoais */}
        {activeTab === 'info' && (
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Informações Pessoais</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                {editMode ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Foto de perfil */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-secondary-700 flex items-center justify-center text-5xl mb-4">
                  {profile.profilePicture ? (
                    <img 
                      src={profile.profilePicture} 
                      alt={profile.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    profile.name.charAt(0)
                  )}
                </div>
                
                {editMode && (
                  <button className="text-sm text-primary-600 dark:text-primary-400">
                    Alterar foto
                  </button>
                )}
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  ID: {profile.id}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Desde {formatDate(profile.registrationDate)}
                </p>
              </div>

              {/* Formulário */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome Completo
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={e => setProfile({...profile, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      E-mail
                    </label>
                    {editMode ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => setProfile({...profile, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Empresa
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.company}
                        onChange={e => setProfile({...profile, company: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.company}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cargo
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.position}
                        onChange={e => setProfile({...profile, position: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.position}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Setor
                    </label>
                    {editMode ? (
                      <select
                        value={profile.sector}
                        onChange={e => setProfile({...profile, sector: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
                      >
                        {sectors.map(sector => (
                          <option key={sector} value={sector}>{sector}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.sector}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      País
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.country}
                        onChange={e => setProfile({...profile, country: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{profile.country}</p>
                    )}
                  </div>
                </div>

                {editMode && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preferências */}
        {activeTab === 'preferences' && (
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Preferências</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preferências de Notificação */}
              <div>
                <h3 className="text-lg font-medium mb-4">Notificações</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notif"
                      checked={profile.preferences.notifications.email}
                      onChange={e => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          notifications: {
                            ...profile.preferences.notifications,
                            email: e.target.checked
                          }
                        }
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email-notif" className="ml-3 text-gray-700 dark:text-gray-300">
                      Receber notificações por e-mail
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms-notif"
                      checked={profile.preferences.notifications.sms}
                      onChange={e => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          notifications: {
                            ...profile.preferences.notifications,
                            sms: e.target.checked
                          }
                        }
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms-notif" className="ml-3 text-gray-700 dark:text-gray-300">
                      Receber notificações por SMS
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="app-notif"
                      checked={profile.preferences.notifications.app}
                      onChange={e => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          notifications: {
                            ...profile.preferences.notifications,
                            app: e.target.checked
                          }
                        }
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="app-notif" className="ml-3 text-gray-700 dark:text-gray-300">
                      Receber notificações no aplicativo
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="whatsapp-notif"
                      checked={profile.preferences.notifications.whatsapp}
                      onChange={e => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          notifications: {
                            ...profile.preferences.notifications,
                            whatsapp: e.target.checked
                          }
                        }
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="whatsapp-notif" className="ml-3 text-gray-700 dark:text-gray-300">
                      Receber notificações via WhatsApp
                    </label>
                  </div>
                </div>
              </div>

              {/* Tópicos de Interesse */}
              <div>
                <h3 className="text-lg font-medium mb-4">Tópicos de Interesse</h3>
                
                {/* Todos os tópicos disponíveis */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Importação',
                    'Exportação',
                    'Legislação Aduaneira',
                    'Incentivos Fiscais',
                    'Armazenagem',
                    'Logística',
                    'Certificações',
                    'Eventos',
                    'Novas Oportunidades'
                  ].map(topic => (
                    <div key={topic} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`topic-${topic}`}
                        checked={profile.preferences.topics.includes(topic)}
                        onChange={e => {
                          if (e.target.checked) {
                            setProfile({
                              ...profile,
                              preferences: {
                                ...profile.preferences,
                                topics: [...profile.preferences.topics, topic]
                              }
                            })
                          } else {
                            setProfile({
                              ...profile,
                              preferences: {
                                ...profile.preferences,
                                topics: profile.preferences.topics.filter(t => t !== topic)
                              }
                            })
                          }
                        }}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`topic-${topic}`} className="ml-3 text-gray-700 dark:text-gray-300">
                        {topic}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => alert('Preferências salvas com sucesso')}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        )}

        {/* Atividade Recente */}
        {activeTab === 'activity' && (
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Atividade Recente</h2>

            <div className="space-y-6">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                      <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(activity.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-primary-600 dark:text-primary-400 hover:underline">
                Ver histórico completo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileSection 