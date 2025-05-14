'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

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
  }[]
}

const WorkflowsSection = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)

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
          responsible: 'Carlos Silva'
        },
        {
          id: 'step-2',
          name: 'Inspeção Aduaneira',
          status: 'in_progress',
          responsible: 'Receita Federal'
        },
        {
          id: 'step-3',
          name: 'Pagamento de Impostos',
          status: 'pending',
          responsible: 'Financeiro'
        },
        {
          id: 'step-4',
          name: 'Liberação da Mercadoria',
          status: 'pending',
          responsible: 'Depto. Logística'
        }
      ]
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
          responsible: 'Depto. Fiscal'
        },
        {
          id: 'step-2',
          name: 'Despacho Aduaneiro',
          status: 'pending',
          responsible: 'Despachante'
        },
        {
          id: 'step-3',
          name: 'Emissão do Conhecimento de Embarque',
          status: 'pending',
          responsible: 'Transportadora'
        }
      ]
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
          responsible: 'Jurídico'
        },
        {
          id: 'step-2',
          name: 'Apresentação de Garantia',
          status: 'completed',
          responsible: 'Financeiro'
        },
        {
          id: 'step-3',
          name: 'Liberação dos Equipamentos',
          status: 'completed',
          responsible: 'Depto. Logística'
        },
        {
          id: 'step-4',
          name: 'Reexportação dos Equipamentos',
          status: 'completed',
          responsible: 'Depto. Logística'
        }
      ]
    }
  ]

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
                  className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes do workflow */}
        {selectedWorkflow && (
          <div className="flex-1 bg-white dark:bg-secondary-800 rounded-lg shadow overflow-auto p-6">
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
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedWorkflow.status)}`}>
                {getStatusText(selectedWorkflow.status)}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Informações</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Criação</p>
                  <p>{formatDate(selectedWorkflow.createdAt)}</p>
                </div>
                {selectedWorkflow.dueDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Prazo</p>
                    <p>{formatDate(selectedWorkflow.dueDate)}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Progresso</p>
                  <p>{getCompletionPercentage(selectedWorkflow)}% concluído</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Etapas</p>
                  <p>{selectedWorkflow.steps.length} etapas</p>
                </div>
              </div>
            </div>

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
                    {step.responsible && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Responsável: {step.responsible}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Ações */}
            {(selectedWorkflow.status === 'pending' || selectedWorkflow.status === 'in_progress') && (
              <div className="mt-8 flex gap-3">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                  Atualizar Status
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-secondary-700">
                  Adicionar Comentário
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowsSection 