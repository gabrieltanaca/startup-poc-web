'use client';

import { useState, useEffect, useMemo } from 'react';
import { Database, Filter } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

import { useLanguage } from '@/contexts/Language';
import { adminTiles, mockLogs } from '@/lib/mock-data';
import AdminTile from './__features/AdminTiles';

const AnalyticsPage = () => {
  const { t } = useLanguage();

  const adminData = adminTiles(t);

  const [selectedPeriod, setSelectedPeriod] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [logLevelFilter, setLogLevelFilter] = useState<string>('ALL');

  const filteredLogs = useMemo(() => {
    let tempLogs = mockLogs;

    if (logLevelFilter !== 'ALL') {
      tempLogs = tempLogs.filter((log) => log.level === logLevelFilter);
    }

    return tempLogs;
  }, [logLevelFilter, selectedPeriod]);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (selectedPeriod || logLevelFilter) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        console.log(
          `Buscando dados para o período: ${JSON.stringify(selectedPeriod)} e Nível: ${logLevelFilter}`,
        );
        setIsUpdating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedPeriod, logLevelFilter]);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden md:flex-row">
      <aside className="bg-muted/20 w-full flex-shrink-0 border-b p-4 md:w-64 md:border-r md:border-b-0">
        <h3 className="mb-4 flex items-center text-lg font-semibold">
          <Filter className="mr-2 h-5 w-5" />
          {t.analytics.filters_title}
        </h3>
        <Separator className="mb-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="period-filter">{t.analytics.filter_period_label}</Label>
            <DateRangePicker
              date={selectedPeriod}
              setDate={setSelectedPeriod}
              placeholder={t.analytics.filter_placeholder_period}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="log-level-filter">{t.analytics.filter_log_level_label}</Label>
            <Select onValueChange={setLogLevelFilter} defaultValue="ALL">
              <SelectTrigger id="log-level-filter">
                <SelectValue placeholder={t.analytics.filter_placeholder_level} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">{t.analytics.level_all}</SelectItem>
                <SelectItem value="INFO">INFO</SelectItem>
                <SelectItem value="WARN">WARN</SelectItem>
                <SelectItem value="ERROR">ERROR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={() => setIsUpdating(true)} disabled={isUpdating}>
            {t.analytics.apply_filters}
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="mb-6 flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t.analytics.page_title}</h2>
          <div className="text-muted-foreground text-sm">
            {t.analytics.data_status}:{' '}
            {isUpdating ? t.analytics.status_updating : t.analytics.status_updated}
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {adminData.map((tile, index) => (
            <AdminTile key={index} {...tile} />
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Tabela de Logs */}
        <Card>
          <CardHeader>
            <CardTitle>{t.analytics.logs_title}</CardTitle>
            <CardDescription>{t.analytics.logs_description}</CardDescription>
          </CardHeader>
          <CardContent>
            {isUpdating ? (
              <div className="flex items-center justify-center py-8">
                <Database className="text-primary mr-2 h-6 w-6 animate-spin" />
                <span className="text-primary">{t.analytics.loading_logs}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">ID</TableHead>
                      <TableHead>{t.analytics.table_header_timestamp}</TableHead>
                      <TableHead>{t.analytics.table_header_level}</TableHead>
                      <TableHead className="hidden w-[200px] sm:table-cell">
                        {t.analytics.table_header_endpoint}
                      </TableHead>
                      <TableHead>{t.analytics.table_header_duration}</TableHead>
                      <TableHead>{t.analytics.table_header_message}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-primary font-mono text-xs">{log.id}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              log.level === 'ERROR'
                                ? 'bg-destructive/20 text-destructive'
                                : log.level === 'WARN'
                                  ? 'bg-yellow-500/20 text-yellow-500 dark:text-yellow-400'
                                  : 'bg-primary/20 text-primary dark:text-primary'
                            }
                          >
                            {log.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden font-mono text-xs sm:table-cell">
                          {log.endpoint}
                        </TableCell>
                        <TableCell className="text-sm">{log.duration}ms</TableCell>
                        <TableCell className="max-w-xs truncate text-sm">{log.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AnalyticsPage;
