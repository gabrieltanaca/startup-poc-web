'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import SimpleAreaChart from './__features/SimpleAreaChart';
import { mockSearchData, mockOperations, metricTiles } from '@/lib/mock-data';
import { useLanguage } from '@/contexts/Language';
import MetricTile from './__features/MetricTile';
import OperationsHistory from './__features/OperationsHistory';

const DashboardPage = () => {
  const { t } = useLanguage();
  const metrics = metricTiles(t);

  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t.dashboard.title}</h2>
        <div className="flex items-center space-x-2">
          <Button>{t.dashboard.download_report}</Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((tile, index) => (
          <MetricTile key={index} {...tile} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle>{t.dashboard.overview_chart}</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] pl-2">
            <SimpleAreaChart data={mockSearchData} />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm">{t.dashboard.chart_footer_tip}</p>
          </CardFooter>
        </Card>

        <OperationsHistory operations={mockOperations} />
      </div>
    </div>
  );
};

export default DashboardPage;
