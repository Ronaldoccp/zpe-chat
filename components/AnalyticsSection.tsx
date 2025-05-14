'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const AnalyticsSection = () => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('month')
  const [mounted, setMounted] = useState(false)
  const [chartData, setChartData] = useState<any>(null)

  // Cores para os gráficos
  const chartColors = {
    primary: theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)',
    secondary: theme === 'dark' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(5, 150, 105, 0.8)',
    background: theme === 'dark' ? '#1f2937' : '#f9fafb',
    text: theme === 'dark' ? '#e5e7eb' : '#111827',
    grid: theme === 'dark' ? 'rgba(229, 231, 235, 0.1)' : 'rgba(17, 24, 39, 0.1)',
    red: theme === 'dark' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(220, 38, 38, 0.8)',
    yellow: theme === 'dark' ? 'rgba(245, 158, 11, 0.8)' : 'rgba(217, 119, 6, 0.8)',
    blue: theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)',
    green: theme === 'dark' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(5, 150, 105, 0.8)',
    purple: theme === 'dark' ? 'rgba(139, 92, 246, 0.8)' : 'rgba(124, 58, 237, 0.8)',
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
      avgTime: 4.2,
      types: [
        { name: 'Despacho Aduaneiro', value: 145, color: chartColors.blue },
        { name: 'Licenças de Importação', value: 87, color: chartColors.green },
        { name: 'Certificados de Origem', value: 64, color: chartColors.yellow },
        { name: 'Vistorias', value: 46, color: chartColors.red }
      ],
      timeByType: [
        { name: 'Despacho Aduaneiro', value: 5.2 },
        { name: 'Licenças de Importação', value: 4.7 },
        { name: 'Certificados de Origem', value: 2.3 },
        { name: 'Vistorias', value: 3.8 }
      ]
    }
  }

  // Inicialização de dados e configurações dos gráficos
  useEffect(() => {
    setMounted(true)
    
    // Preparar dados para os gráficos
    if (mounted) {
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
      
      // Dados para o gráfico de tendências
      const trendData = {
        labels: months,
        datasets: [
          {
            label: 'Importações',
            data: operationData.import.monthlyData,
            borderColor: chartColors.blue,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          },
          {
            label: 'Exportações',
            data: operationData.export.monthlyData,
            borderColor: chartColors.green,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }
        ]
      }
      
      // Dados para o gráfico de pizza
      const proceduresTypeData = {
        labels: operationData.procedures.types.map(t => t.name),
        datasets: [
          {
            data: operationData.procedures.types.map(t => t.value),
            backgroundColor: operationData.procedures.types.map(t => t.color),
            borderColor: theme === 'dark' ? '#374151' : '#ffffff',
            borderWidth: 2
          }
        ]
      }
      
      // Dados para o gráfico de barras
      const proceduresTimeData = {
        labels: operationData.procedures.timeByType.map(t => t.name),
        datasets: [
          {
            label: 'Tempo Médio (dias)',
            data: operationData.procedures.timeByType.map(t => t.value),
            backgroundColor: chartColors.purple,
            borderColor: 'rgba(139, 92, 246, 0.3)',
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      }
      
      setChartData({
        trendData,
        proceduresTypeData,
        proceduresTimeData
      })
    }
  }, [mounted, theme])

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
  
  // Opções comuns para gráficos
  const commonOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: chartColors.text,
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        titleColor: chartColors.text,
        bodyColor: chartColors.text,
        borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: 'Inter, sans-serif'
        },
        titleFont: {
          family: 'Inter, sans-serif',
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: chartColors.grid
        },
        ticks: {
          color: chartColors.text
        }
      },
      y: {
        grid: {
          color: chartColors.grid
        },
        ticks: {
          color: chartColors.text
        }
      }
    }
  }
  
  // Opções específicas para o gráfico de tendências
  const trendOptions: ChartOptions<'line'> = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales?.y,
        ticks: {
          ...commonOptions.scales?.y?.ticks,
          callback: function(value) {
            return formatCurrency(value as number).replace(/[^\d]/g, '') + 'K';
          }
        }
      }
    }
  }
  
  // Opções específicas para o gráfico de pizza
  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: chartColors.text,
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        titleColor: chartColors.text,
        bodyColor: chartColors.text,
        borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: 'Inter, sans-serif'
        },
        titleFont: {
          family: 'Inter, sans-serif',
          weight: 'bold'
        }
      }
    }
  }

  // Opções específicas para o gráfico de barras
  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        titleColor: chartColors.text,
        bodyColor: chartColors.text,
        borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: 'Inter, sans-serif'
        },
        titleFont: {
          family: 'Inter, sans-serif',
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: chartColors.grid
        },
        ticks: {
          color: chartColors.text
        }
      },
      y: {
        grid: {
          color: chartColors.grid
        },
        ticks: {
          color: chartColors.text
        }
      }
    }
  }

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
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
                <div className="h-64 relative">
                  {chartData ? (
                    <Line 
                      data={chartData.trendData} 
                      options={trendOptions} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Distribuição por Tipo de Procedimento</h3>
                <div className="h-64 relative">
                  {chartData ? (
                    <Pie 
                      data={chartData.proceduresTypeData} 
                      options={pieOptions} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  )}
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
                <div className="h-56 mt-4 relative">
                  {chartData ? (
                    <Line 
                      data={{
                        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                        datasets: [chartData.trendData.datasets[0]]
                      }} 
                      options={trendOptions} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  )}
                </div>
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
                <div className="h-56 mt-4 relative">
                  {chartData ? (
                    <Line 
                      data={{
                        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                        datasets: [chartData.trendData.datasets[1]]
                      }} 
                      options={trendOptions} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  )}
                </div>
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
                <div className="h-48 relative">
                  {chartData ? (
                    <Pie 
                      data={{
                        labels: ['Concluídos', 'Pendentes'],
                        datasets: [{
                          data: [operationData.procedures.completed, operationData.procedures.pending],
                          backgroundColor: [chartColors.green, chartColors.yellow],
                          borderColor: theme === 'dark' ? '#374151' : '#ffffff',
                          borderWidth: 2
                        }]
                      }} 
                      options={pieOptions} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  )}
                </div>
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
                <div className="h-64 relative">
                  {chartData ? (
                    <Bar 
                      data={chartData.proceduresTimeData}
                      options={barOptions}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  )}
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
              <div className="h-64 relative">
                {chartData ? (
                  <Line 
                    data={{
                      labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                      datasets: [
                        {
                          label: 'Previsão Importações',
                          data: [1300000, 1320000, 1400000, 1450000, 1480000, 1350000],
                          borderColor: chartColors.blue,
                          backgroundColor: 'rgba(59, 130, 246, 0)',
                          borderWidth: 2,
                          borderDash: [],
                          tension: 0.3
                        },
                        {
                          label: 'Previsão Exportações',
                          data: [1920000, 1980000, 2050000, 2100000, 1950000, 1900000],
                          borderColor: chartColors.green,
                          backgroundColor: 'rgba(16, 185, 129, 0)',
                          borderWidth: 2,
                          borderDash: [],
                          tension: 0.3
                        },
                        {
                          label: 'Intervalo de Confiança (Imp.)',
                          data: [1250000, 1270000, 1350000, 1400000, 1430000, 1300000],
                          borderColor: 'transparent',
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          borderWidth: 0,
                          pointRadius: 0,
                          fill: '+1',
                        },
                        {
                          label: 'Limite Superior (Imp.)',
                          data: [1350000, 1370000, 1450000, 1500000, 1530000, 1400000],
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                          pointRadius: 0,
                          fill: false,
                        },
                        {
                          label: 'Intervalo de Confiança (Exp.)',
                          data: [1870000, 1930000, 2000000, 2050000, 1900000, 1850000],
                          borderColor: 'transparent',
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          borderWidth: 0,
                          pointRadius: 0,
                          fill: '+1',
                        },
                        {
                          label: 'Limite Superior (Exp.)',
                          data: [1970000, 2030000, 2100000, 2150000, 2000000, 1950000],
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                          pointRadius: 0,
                          fill: false,
                        }
                      ]
                    }}
                    options={{
                      ...trendOptions,
                      plugins: {
                        ...trendOptions.plugins,
                        legend: {
                          ...trendOptions.plugins?.legend,
                          labels: {
                            ...trendOptions.plugins?.legend?.labels,
                            filter: (item) => !item.text?.includes('Intervalo') && !item.text?.includes('Limite')
                          }
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  </div>
                )}
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

export default AnalyticsSection 