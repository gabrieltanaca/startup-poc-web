import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/Language';

// Mock de dados para o gráfico de estatísticas
const mockStatisticsData = [
  { name: 'Jan', revenue: 4000, registrations: 2400 },
  { name: 'Fev', revenue: 3000, registrations: 1398 },
  { name: 'Mar', revenue: 2000, registrations: 9800 },
  { name: 'Abr', revenue: 2780, registrations: 3908 },
  { name: 'Mai', revenue: 1890, registrations: 4800 },
  { name: 'Jun', revenue: 2390, registrations: 3800 },
  { name: 'Jul', revenue: 3490, registrations: 4300 },
  { name: 'Ago', revenue: 4500, registrations: 5000 },
  { name: 'Set', revenue: 4200, registrations: 3500 },
  { name: 'Out', revenue: 5100, registrations: 6000 },
  { name: 'Nov', revenue: 6000, registrations: 5500 },
  { name: 'Dez', revenue: 7000, registrations: 7500 },
];

const SimpleAreaChart = () => {
  const { t } = useLanguage();

  return (
    <Card className="col-span-1 md:col-span-7">
      {' '}
      <CardHeader>
        <CardTitle>{t.dashboard.statistics_chart_title}</CardTitle>
        <CardDescription>{t.dashboard.statistics_chart_desc}</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockStatisticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ borderRadius: '0.5rem', background: '#333', border: 'none' }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name={t.dashboard.legend_revenue}
            />
            <Area
              type="monotone"
              dataKey="registrations"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorRegistrations)"
              name={t.dashboard.legend_registrations}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SimpleAreaChart;
