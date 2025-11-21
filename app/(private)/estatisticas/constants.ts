import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { Activity } from 'react';

export const kpiMetrics = [
  {
    title: 'Receita Total',
    value: 'R$ 45.231,89',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Novos Usuários',
    value: '2.345',
    change: '+3.1%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Taxa de Conversão',
    value: '4.87%',
    change: '-0.5%',
    trend: 'down',
    icon: TrendingUp,
  },
  {
    title: 'Sessões Ativas',
    value: '1.209',
    change: '+18.2%',
    trend: 'up',
    icon: Activity,
  },
];

export const monthlyRevenueData = [
  { label: 'Jan', value: 120 },
  { label: 'Fev', value: 180 },
  { label: 'Mar', value: 90 },
  { label: 'Abr', value: 240 },
  { label: 'Mai', value: 210 },
  { label: 'Jun', value: 300 },
  { label: 'Jul', value: 270 },
];
