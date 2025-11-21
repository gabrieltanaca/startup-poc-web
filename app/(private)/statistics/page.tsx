'use client';

import { useState } from 'react';
import { BarChart, ChevronDown } from 'lucide-react';
import MockChart from './__features/MockChart';
import MetricCard from './__features/MetricCard';
import { kpiMetrics, monthlyRevenueData } from './constants';

function StatisticsPage() {
  const [timeframe, setTimeframe] = useState('Últimos 7 Dias');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="mb-8 flex flex-col items-start justify-between border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <BarChart className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">Visão Geral Estatística</h1>
        </div>

        {/* Dropdown de Intervalo de Tempo (Timeframe Selector) */}
        <div className="relative mt-4 inline-block text-left sm:mt-0">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none"
            onClick={() => alert('Seleção de período não implementada')} // Usando alert simples para simulação
          >
            {timeframe}
            <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="border-b pb-2 text-2xl font-bold text-gray-800">Análise de Tendências</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MockChart title="Receita Mensal (Milhares R$)" trendData={monthlyRevenueData} />
          <MockChart
            title="Engajamento de Usuários (Últimos 7 Meses)"
            trendData={[
              { label: 'Jan', value: 400 },
              { label: 'Fev', value: 550 },
              { label: 'Mar', value: 500 },
              { label: 'Abr', value: 720 },
              { label: 'Mai', value: 800 },
              { label: 'Jun', value: 650 },
              { label: 'Jul', value: 950 },
            ]}
          />
        </div>
      </section>

      <footer className="pt-12 text-center text-sm text-gray-400">
        Dados de Análise Gerados: {new Date().toLocaleDateString('pt-BR')}
      </footer>
    </div>
  );
}

export default StatisticsPage;
