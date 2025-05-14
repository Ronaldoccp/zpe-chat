'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

interface Workflow {
  id: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  createdAt: Date
  dueDate?: Date
  steps: {
    id: string
    name: string
    status: 'pending' | 'in_progress' | 'completed' | 'rejected'
    responsible?: string
    estimatedTime?: number // tempo estimado em dias
    actualTime?: number // tempo real em dias
  }[]
  aiInsights?: {
    prediction: string
    confidence: number
    bottlenecks: string[]
    optimizations: string[]
  }
}

const WorkflowsSection = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Dados simulados de fluxos de trabalho
  const mockWorkflows: Workflow[] = [
    {
      id: 'wf-1',
      name: 'Processo de Importação #2023-05',
      description: 'Importação de matéria-prima para produção de eletrônicos',
      status: 'in_progress',
      createdAt: new Date('2023-05-10'),
      dueDate: new Date('2023-06-15'),
      steps: [
        {
          id: 'step-1',
          name: 'Registro da DI',
          status: 'completed',
          responsible: 'Carlos Silva',
          estimatedTime: 2,
          actualTime: 1.5
        },
        {
          id: 'step-2',
          name: 'Inspeção Aduaneira',
          status: 'in_progress',
          responsible: 'Receita Federal',
          estimatedTime: 5,
          actualTime: 3
        },
        {
          id: 'step-3',
          name: 'Pagamento de Impostos',
          status: 'pending',
          responsible: 'Financeiro',
          estimatedTime: 2
        },
        {
          id: 'step-4',
          name: 'Liberação da Mercadoria',
          status: 'pending',
          responsible: 'Depto. Logística',
          estimatedTime: 3
        }
      ],
      aiInsights: {
        prediction: "O processo será concluído em aproximadamente 8 dias, 2 dias antes do prazo previsto.",
        confidence: 87,
        bottlenecks: [
          "A etapa de Inspeção Aduaneira possui um tempo médio histórico maior que o atual",
          "A etapa de Pagamento de Impostos frequentemente atrasa devido à validação bancária"
        ],
        optimizations: [
          "Submeter documentação adicional para agilizar a inspeção",
          "Preparar pagamento com 2 dias de antecedência",
          "Agendar transporte com antecedência para evitar atrasos na liberação"
        ]
      }
    },
    {
      id: 'wf-2',
      name: 'Processo de Exportação #2023-08',
      description: 'Exportação de produtos manufaturados para os EUA',
      status: 'pending',
      createdAt: new Date('2023-05-20'),
      dueDate: new Date('2023-06-25'),
      steps: [
        {
          id: 'step-1',
          name: 'Emissão de Nota Fiscal',
          status: 'pending',
          responsible: 'Depto. Fiscal',
          estimatedTime: 1
        },
        {
          id: 'step-2',
          name: 'Despacho Aduaneiro',
          status: 'pending',
          responsible: 'Despachante',
          estimatedTime: 4
        },
        {
          id: 'step-3',
          name: 'Emissão do Conhecimento de Embarque',
          status: 'pending',
          responsible: 'Transportadora',
          estimatedTime: 3
        }
      ],
      aiInsights: {
        prediction: "O processo levará aproximadamente 10 dias, dentro do prazo estimado.",
        confidence: 75,
        bottlenecks: [
          "O despacho aduaneiro pode sofrer atrasos devido ao volume atual na Receita Federal",
          "A emissão do conhecimento de embarque depende de disponibilidade de navios"
        ],
        optimizations: [
          "Realizar pré-registro das informações para agilizar o despacho",
          "Verificar disponibilidade de embarque com antecedência",
          "Considerar modal aéreo como alternativa para reduzir tempo"
        ]
      }
    },
    {
      id: 'wf-3',
      name: 'Processo de Admissão Temporária #2023-03',
      description: 'Admissão temporária de equipamentos para feira',
      status: 'completed',
      createdAt: new Date('2023-03-05'),
      steps: [
        {
          id: 'step-1',
          name: 'Solicitação de Regime Especial',
          status: 'completed',
          responsible: 'Jurídico',
          estimatedTime: 3,
          actualTime: 4
        },
        {
          id: 'step-2',
          name: 'Apresentação de Garantia',
          status: 'completed',
          responsible: 'Financeiro',
          estimatedTime: 2,
          actualTime: 1.5
        },
        {
          id: 'step-3',
          name: 'Liberação dos Equipamentos',
          status: 'completed',
          responsible: 'Depto. Logística',
          estimatedTime: 3,
          actualTime: 2.5
        },
        {
          id: 'step-4',
          name: 'Reexportação dos Equipamentos',
          status: 'completed',
          responsible: 'Depto. Logística',
          estimatedTime: 2,
          actualTime: 2
        }
      ]
    }
  ]

  // Efeito para simular análise de IA quando um fluxo é selecionado
  useEffect(() => {
    if (selectedWorkflow && showAIInsights) {
      setIsAnalyzing(true)
      
      const timer = setTimeout(() => {
        setIsAnalyzing(false)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [selectedWorkflow, showAIInsights])

  // Filtrar workflows por status
  const filteredWorkflows = mockWorkflows.filter(workflow => {
    if (activeTab === 'active') {
      return workflow.status === 'pending' || workflow.status === 'in_progress';
    } else {
      return workflow.status === 'completed' || workflow.status === 'rejected';
    }
  });

  // Formatação de data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  }

  // Cor do badge de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  }

  // Texto de status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluído';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  }

  // Porcentagem de conclusão do workflow
  const getCompletionPercentage = (workflow: Workflow) => {
    const totalSteps = workflow.steps.length;
    const completedSteps = workflow.steps.filter(step => step.status === 'completed').length;
    return Math.round((completedSteps / totalSteps) * 100);
  }

  // Tempo estimado total para o workflow
  const getTotalEstimatedTime = (workflow: Workflow) => {
    return workflow.steps.reduce((total, step) => total + (step.estimatedTime || 0), 0);
  }

  // Tempo real gasto até o momento
  const getCurrentActualTime = (workflow: Workflow) => {
    return workflow.steps.reduce((total, step) => total + (step.actualTime || 0), 0);
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Fluxos de Trabalho</h1>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'active'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Ativos
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('completed')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'completed'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Concluídos
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Lista de workflows */}
        <div className={`w-1/3 overflow-auto pr-4 ${selectedWorkflow ? 'hidden md:block' : 'w-full'}`}>
          {filteredWorkflows.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-lg font-medium">Nenhum fluxo de trabalho encontrado</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === 'active' ? 'Não há fluxos de trabalho ativos' : 'Não há fluxos de trabalho concluídos'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWorkflows.map(workflow => (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{workflow.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(workflow.status)}`}>
                      {getStatusText(workflow.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {workflow.description}
                  </p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progresso</span>
                      <span>{getCompletionPercentage(workflow)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${getCompletionPercentage(workflow)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>Criado em: {formatDate(workflow.createdAt)}</span>
                    {workflow.dueDate && (
                      <span>Prazo: {formatDate(workflow.dueDate)}</span>
                    )}
                  </div>
                  {workflow.aiInsights && (
                    <div className="mt-3 flex items-center text-xs text-primary-600 dark:text-primary-400">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      IA detectou possíveis otimizações
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes do workflow */}
        {selectedWorkflow && (
          <div className="flex-1 bg-white dark:bg-secondary-800 rounded-lg shadow overflow-auto p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-6">
              <div>
                <button
                  onClick={() => setSelectedWorkflow(null)}
                  className="md:hidden text-primary-600 dark:text-primary-400 mb-2 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar
                </button>
                <h2 className="text-xl font-bold">{selectedWorkflow.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {selectedWorkflow.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedWorkflow.status)}`}>
                  {getStatusText(selectedWorkflow.status)}
                </span>
                
                {selectedWorkflow.aiInsights && (
                  <button
                    onClick={() => setShowAIInsights(!showAIInsights)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      showAIInsights 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Insights IA
                  </button>
                )}
              </div>
            </div>

            {/* Insights de IA */}
            {selectedWorkflow.aiInsights && showAIInsights && (
              <div className="mb-6 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/10 dark:to-blue-900/10 border border-primary-100 dark:border-primary-800/20 rounded-lg p-4">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-12 h-12 mb-4">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 dark:border-primary-800/30 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-primary-700 dark:text-primary-400 font-medium">Analisando processo...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Nosso modelo de IA está avaliando métricas e dados históricos</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 mr-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary-700 dark:text-primary-400">Análise Inteligente</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Análise baseada em IA com {selectedWorkflow.aiInsights.confidence}% de confiança
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="bg-white dark:bg-secondary-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
                        <h4 className="font-medium text-sm text-primary-700 dark:text-primary-400 mb-2">Previsão de Conclusão</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedWorkflow.aiInsights.prediction}</p>
                      </div>
                      <div className="bg-white dark:bg-secondary-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
                        <h4 className="font-medium text-sm text-yellow-700 dark:text-yellow-400 mb-2">Potenciais Gargalos</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                          {selectedWorkflow.aiInsights.bottlenecks.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-white dark:bg-secondary-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
                      <h4 className="font-medium text-sm text-green-700 dark:text-green-400 mb-2">Recomendações de Otimização</h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        {selectedWorkflow.aiInsights.optimizations.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Informações</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Criação</p>
                  <p className="font-medium">{formatDate(selectedWorkflow.createdAt)}</p>
                </div>
                {selectedWorkflow.dueDate && (
                  <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Prazo</p>
                    <p className="font-medium">{formatDate(selectedWorkflow.dueDate)}</p>
                  </div>
                )}
                <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Progresso</p>
                  <p className="font-medium">{getCompletionPercentage(selectedWorkflow)}% concluído</p>
                </div>
                <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Etapas</p>
                  <p className="font-medium">{selectedWorkflow.steps.length} etapas</p>
                </div>
              </div>
            </div>

            {/* Gráfico de tempo estimado vs. real */}
            {selectedWorkflow.status !== 'pending' && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Análise de Tempo</h3>
                <div className="bg-white dark:bg-secondary-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Tempo estimado total: {getTotalEstimatedTime(selectedWorkflow)} dias</span>
                    <span>Tempo atual: {getCurrentActualTime(selectedWorkflow)} dias</span>
                  </div>
                  
                  <div className="h-12 flex items-center">
                    {selectedWorkflow.steps.map((step, index) => {
                      const estimatedWidth = ((step.estimatedTime || 0) / getTotalEstimatedTime(selectedWorkflow)) * 100;
                      const actualWidth = step.actualTime ? ((step.actualTime || 0) / getTotalEstimatedTime(selectedWorkflow)) * 100 : 0;
                      
                      return (
                        <div key={step.id} className="h-full relative" style={{ width: `${estimatedWidth}%` }}>
                          {/* Barra de tempo estimado */}
                          <div className="absolute top-0 h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                          
                          {/* Barra de tempo real */}
                          {step.actualTime && (
                            <div 
                              className={`absolute top-0 h-4 rounded-sm ${
                                (step.actualTime <= (step.estimatedTime || 0)) 
                                  ? 'bg-green-500' 
                                  : 'bg-red-500'
                              }`} 
                              style={{ width: `${(actualWidth / estimatedWidth) * 100}%` }}
                            ></div>
                          )}
                          
                          {/* Rótulo */}
                          <div className="absolute -bottom-5 left-0 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Etapa {index + 1}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center mt-8 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 mr-1"></div>
                      <span>Estimado</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 bg-green-500 mr-1"></div>
                      <span>Dentro do prazo</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 mr-1"></div>
                      <span>Acima do prazo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium mb-4">Etapas do Processo</h3>
              <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
                {selectedWorkflow.steps.map((step, index) => (
                  <li key={step.id} className="mb-10 ml-6">
                    <span
                      className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        step.status === 'completed'
                          ? 'bg-green-500 dark:bg-green-700'
                          : step.status === 'in_progress'
                            ? 'bg-blue-500 dark:bg-blue-700'
                            : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <span className="text-xs text-white">{index + 1}</span>
                      )}
                    </span>
                    <h4 className="font-medium">
                      {step.name}
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(step.status)}`}>
                        {getStatusText(step.status)}
                      </span>
                    </h4>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-x-4">
                      {step.responsible && (
                        <p>Responsável: {step.responsible}</p>
                      )}
                      {step.estimatedTime && (
                        <p>Tempo estimado: {step.estimatedTime} dias</p>
                      )}
                      {step.actualTime && (
                        <p>Tempo real: {step.actualTime} dias</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Ações */}
            {(selectedWorkflow.status === 'pending' || selectedWorkflow.status === 'in_progress') && (
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 shadow-sm">
                  Atualizar Status
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-secondary-700">
                  Adicionar Comentário
                </button>
                {selectedWorkflow.aiInsights && (
                  <button 
                    onClick={() => setShowAIInsights(!showAIInsights)}
                    className="px-4 py-2 border border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {showAIInsights ? 'Ocultar Insights' : 'Ver Insights da IA'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowsSection 