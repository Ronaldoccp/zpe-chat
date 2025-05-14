'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

const AnalyticsSection = () => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('month')
  const [mounted, setMounted] = useState(false)

  // Garantir que executa apenas no navegador
  useEffect(() => {
    setMounted(true)
    
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      // Código para inicializar gráficos iria aqui
      // Normalmente usaríamos Chart.js ou outra biblioteca
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  // Dados simulados para os gráficos
  const operationData = {
    import: {
      current: 1250000,
      previous: 980000,
      change: 27.5,
      monthlyData: [850000, 920000, 780000, 1100000, 980000, 1250000]
    },
    export: {
      current: 1850000,
      previous: 1650000,
      change: 12.1,
      monthlyData: [1450000, 1380000, 1620000, 1750000, 1650000, 1850000]
    },
    procedures: {
      total: 342,
      completed: 289,
      pending: 53,
      avgTime: 4.2
    }
  }

  // Formatar números para exibição
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`
  }

  // Componente de gráfico simulado (em produção usaríamos Chart.js)
  const ChartPlaceholder = ({ data, type }: { data: number[], type: string }) => {
    const max = Math.max(...data)
    
    return (
      <div className="h-64 flex items-end space-x-4 mt-4">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-full ${type === 'import' ? 'bg-blue-500' : 'bg-green-500'} rounded-t-sm`}
              style={{ height: `${(value / max) * 100}%` }}
            ></div>
            <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][index]}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Componente de card de métrica
  const MetricCard = ({ title, value, change = null, icon }: { title: string, value: string, change?: string | null, icon: string }) => (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-sm ${
              change.startsWith('+') ? 'text-green-500' : change.startsWith('-') ? 'text-red-500' : 'text-gray-500'
            }`}>
              {change} em relação ao período anterior
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )

  // Donut chart simulado (em produção usaríamos Chart.js)
  const DonutChartPlaceholder = ({ completed, total }: { completed: number, total: number }) => {
    const percentage = Math.round((completed / total) * 100)
    
    return (
      <div className="relative h-40 w-40 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary-500"
            strokeWidth="10"
            strokeDasharray={`${percentage * 2.51} 251`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{percentage}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Concluídos</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Análises e Inteligência de Negócios</h1>
        
        {/* Seletor de período */}
        <div className="flex bg-white dark:bg-secondary-800 rounded-lg shadow">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 text-sm ${
              timeRange === 'week' 
                ? 'bg-primary-500 text-white rounded-lg' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 text-sm ${
              timeRange === 'month' 
                ? 'bg-primary-500 text-white rounded-lg' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-3 py-1.5 text-sm ${
              timeRange === 'quarter' 
                ? 'bg-primary-500 text-white rounded-lg' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Trimestre
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1.5 text-sm ${
              timeRange === 'year' 
                ? 'bg-primary-500 text-white rounded-lg' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Ano
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Visão Geral
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('operations')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'operations'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Operações
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('procedures')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'procedures'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Procedimentos
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('forecast')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'forecast'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              Previsões
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        {/* Visão Geral */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Volume de Importações"
                value={formatCurrency(operationData.import.current)}
                change={formatPercentage(operationData.import.change)}
                icon="📥"
              />
              <MetricCard
                title="Volume de Exportações"
                value={formatCurrency(operationData.export.current)}
                change={formatPercentage(operationData.export.change)}
                icon="📤"
              />
              <MetricCard
                title="Procedimentos"
                value={operationData.procedures.total.toString()}
                icon="📋"
              />
              <MetricCard
                title="Tempo Médio de Processamento"
                value={`${operationData.procedures.avgTime} dias`}
                icon="⏱️"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Tendência de Operações</h3>
                <div className="flex gap-4 mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Importações</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Exportações</span>
                  </div>
                </div>
                <div className="h-64 bg-gray-100 dark:bg-secondary-700 rounded p-4 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    <p>Gráfico de Tendências</p>
                    <p className="text-xs">Seria renderizado usando Chart.js em produção</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Distribuição por Tipo de Procedimento</h3>
                <div className="h-64 bg-gray-100 dark:bg-secondary-700 rounded p-4 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    <p>Gráfico de Pizza</p>
                    <p className="text-xs">Seria renderizado usando Chart.js em produção</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operações */}
        {activeTab === 'operations' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium">Importações</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="text-3xl font-bold">
                      {formatCurrency(operationData.import.current)}
                    </p>
                    <p className={`text-sm ${operationData.import.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatPercentage(operationData.import.change)} vs. período anterior
                    </p>
                  </div>
                </div>
                <ChartPlaceholder data={operationData.import.monthlyData} type="import" />
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium">Exportações</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="text-3xl font-bold">
                      {formatCurrency(operationData.export.current)}
                    </p>
                    <p className={`text-sm ${operationData.export.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatPercentage(operationData.export.change)} vs. período anterior
                    </p>
                  </div>
                </div>
                <ChartPlaceholder data={operationData.export.monthlyData} type="export" />
              </div>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Principais Produtos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Produto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Variação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Eletrônicos</td>
                      <td className="px-6 py-4 whitespace-nowrap">Exportação</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(750000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-500">+12.5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Componentes</td>
                      <td className="px-6 py-4 whitespace-nowrap">Importação</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(520000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-500">+8.3%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Químicos</td>
                      <td className="px-6 py-4 whitespace-nowrap">Importação</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(320000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-500">-5.2%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Alimentos</td>
                      <td className="px-6 py-4 whitespace-nowrap">Exportação</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(480000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-500">+15.7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Procedimentos */}
        {activeTab === 'procedures' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-center mb-4">Status dos Procedimentos</h3>
                <DonutChartPlaceholder 
                  completed={operationData.procedures.completed} 
                  total={operationData.procedures.total} 
                />
                <div className="flex justify-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Concluídos</p>
                    <p className="text-xl font-bold">{operationData.procedures.completed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pendentes</p>
                    <p className="text-xl font-bold">{operationData.procedures.pending}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4 col-span-2">
                <h3 className="text-lg font-medium mb-4">Tempo Médio por Tipo de Procedimento</h3>
                <div className="h-64 bg-gray-100 dark:bg-secondary-700 rounded p-4 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    <p>Gráfico de Barras</p>
                    <p className="text-xs">Seria renderizado usando Chart.js em produção</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Procedimentos Recentes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Iniciado em</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tempo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">PR-2023-089</td>
                      <td className="px-6 py-4 whitespace-nowrap">Despacho Aduaneiro</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                          Concluído
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">15/05/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">3 dias</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">PR-2023-092</td>
                      <td className="px-6 py-4 whitespace-nowrap">Licença de Importação</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400">
                          Em Análise
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">18/05/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">5 dias</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">PR-2023-095</td>
                      <td className="px-6 py-4 whitespace-nowrap">Certificado de Origem</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400">
                          Pendente
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">20/05/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">2 dias</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Previsões */}
        {activeTab === 'forecast' && (
          <div>
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">Previsão de Demanda</h3>
              <div className="h-64 bg-gray-100 dark:bg-secondary-700 rounded p-4 flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  <p>Gráfico de Previsão</p>
                  <p className="text-xs">Seria renderizado usando Chart.js em produção</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Tendências Identificadas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">▲</span>
                    <div>
                      <p className="font-medium">Aumento de Exportações Tecnológicas</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Crescimento de 15% esperado para o próximo trimestre
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▼</span>
                    <div>
                      <p className="font-medium">Redução em Tempo de Despacho</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Expectativa de redução de 20% no tempo médio
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">■</span>
                    <div>
                      <p className="font-medium">Estabilidade em Produtos Químicos</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Volume deve permanecer estável nos próximos meses
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Alertas e Oportunidades</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-yellow-800 dark:text-yellow-300">
                    <p className="font-medium">Pico de Demanda Previsto</p>
                    <p className="text-sm">Aumento de 30% em solicitações esperado para Julho</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 text-green-800 dark:text-green-300">
                    <p className="font-medium">Oportunidade de Mercado</p>
                    <p className="text-sm">Crescimento em exportações para a Ásia identificado</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 text-red-800 dark:text-red-300">
                    <p className="font-medium">Alerta de Regulamentação</p>
                    <p className="text-sm">Novas regras previstas para Agosto/2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsSection 