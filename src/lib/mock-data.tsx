import { MetricTileItem } from '@/app/(private)/dashboard/__features/MetricTile';
import {
  Clock,
  Database,
  DollarSign,
  History,
  Search,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import { TranslateType } from './translations/pt';
import { AdminTileItem } from '@/app/(private)/analytics/__features/AdminTiles';

export const metricTiles = (t: TranslateType): MetricTileItem[] => [
  {
    icon: <Search className="text-primary h-4 w-4" />,
    title: t.dashboard.total_searches,
    value: '45.231',
    change: '+20.1%',
    description: t.dashboard.description_last_month,
  },
  {
    icon: <Clock className="text-primary h-4 w-4" />,
    title: t.dashboard.avg_response_time,
    value: '1.2s',
    change: '-5%',
    description: t.dashboard.description_last_week,
  },
  {
    icon: <Users className="text-primary h-4 w-4" />,
    title: t.dashboard.active_users,
    value: '2.340',
    change: '+15.4%',
    description: t.dashboard.description_last_24h,
  },
  {
    icon: <DollarSign className="text-primary h-4 w-4" />,
    title: t.dashboard.revenue,
    value: '$12,450',
    change: '+5.7%',
    description: t.dashboard.description_this_quarter,
  },
];

export const mockSearchData = [
  { name: 'Jan', total: 4000 },
  { name: 'Fev', total: 3000 },
  { name: 'Mar', total: 2000 },
  { name: 'Abr', total: 2780 },
  { name: 'Mai', total: 1890 },
  { name: 'Jun', total: 2390 },
  { name: 'Jul', total: 3490 },
  { name: 'Ago', total: 4200 },
  { name: 'Set', total: 3800 },
  { name: 'Out', total: 4500 },
  { name: 'Nov', total: 5100 },
  { name: 'Dez', total: 6000 },
];

export const mockOperations = [
  {
    id: 'OP-001',
    type: 'Busca por Endereço',
    user: 'Ana P.',
    date: '24/11/2025 10:30',
    status: 'Concluída' as const,
  },
  {
    id: 'OP-002',
    type: 'Filtro por Categoria',
    user: 'João S.',
    date: '24/11/2025 09:15',
    status: 'Pendente' as const,
  },
  {
    id: 'OP-003',
    type: 'Exportar Relatório',
    user: 'Carlos M.',
    date: '23/11/2025 18:00',
    status: 'Erro' as const,
  },
  {
    id: 'OP-004',
    type: 'Busca por Coordenadas',
    user: 'Ana P.',
    date: '23/11/2025 14:45',
    status: 'Concluída' as const,
  },
  {
    id: 'OP-005',
    type: 'Alteração de Perfil',
    user: 'Maria C.',
    date: '22/11/2025 11:20',
    status: 'Concluída' as const,
  },
];

export const mockAnalyticsData = {
  totalRecords: 125890,
  recentErrors: 42,
  lastUpdateDate: '24/11/2025 08:00 BRT',
  avgQueryTimeMs: 154,
};

export const mockLogs = [
  {
    id: 'L-0001',
    timestamp: '24/11/2025 10:30:15',
    level: 'INFO' as const,
    message: 'Busca de sucesso na região Sudeste.',
    endpoint: '/api/search/region',
    duration: 120,
  },
  {
    id: 'L-0002',
    timestamp: '24/11/2025 10:28:40',
    level: 'ERROR' as const,
    message: 'Falha de conexão com o banco de dados secundário.',
    endpoint: '/api/db/healthcheck',
    duration: 450,
  },
  {
    id: 'L-0003',
    timestamp: '24/11/2025 10:25:01',
    level: 'WARN' as const,
    message: 'Consulta lenta detectada (> 200ms). Usuário: 102.',
    endpoint: '/api/search/coordinates',
    duration: 210,
  },
  {
    id: 'L-0004',
    timestamp: '24/11/2025 10:20:55',
    level: 'INFO' as const,
    message: 'Exportação de dados iniciada por Admin.',
    endpoint: '/api/report/export',
    duration: 80,
  },
  {
    id: 'L-0005',
    timestamp: '24/11/2025 10:15:30',
    level: 'INFO' as const,
    message: 'Login de usuário bem-sucedido: joao.s.',
    endpoint: '/api/auth/login',
    duration: 55,
  },
  {
    id: 'L-0006',
    timestamp: '24/11/2025 10:10:05',
    level: 'WARN' as const,
    message: 'Tentativa de acesso não autorizado bloqueada.',
    endpoint: '/api/admin/config',
    duration: 150,
  },
  {
    id: 'L-0007',
    timestamp: '24/11/2025 10:05:45',
    level: 'ERROR' as const,
    message: 'Erro de validação de esquema Zod na rota.',
    endpoint: '/api/data/post',
    duration: 320,
  },
];

export const adminTiles = (t: TranslateType): AdminTileItem[] => [
  {
    icon: <Database className="h-4 w-4 text-white" />,
    title: t.analytics.total_records,
    value: mockAnalyticsData.totalRecords.toLocaleString('pt-BR'),
    description: t.analytics.records_description,
    colorClass: 'bg-primary dark:bg-primary/80',
  },
  {
    icon: <XCircle className="h-4 w-4 text-white" />,
    title: t.analytics.recent_errors,
    value: mockAnalyticsData.recentErrors.toLocaleString('pt-BR'),
    description: t.analytics.errors_description,
    colorClass: 'bg-destructive dark:bg-destructive/80',
  },
  {
    icon: <History className="h-4 w-4 text-white" />,
    title: t.analytics.last_update,
    value: mockAnalyticsData.lastUpdateDate,
    description: t.analytics.last_update_description,
    colorClass: 'bg-yellow-500 dark:bg-yellow-600',
  },
  {
    icon: <TrendingUp className="h-4 w-4 text-white" />,
    title: t.analytics.avg_query_time,
    value: `${mockAnalyticsData.avgQueryTimeMs} ms`,
    description: t.analytics.avg_query_time_description,
    colorClass: 'bg-green-500 dark:bg-green-600',
  },
];
