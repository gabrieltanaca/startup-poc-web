'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import SimpleAreaChart from './__features/SimpleAreaChart';
import { mockOperations, metricTiles } from '@/lib/mock-data';
import { useLanguage } from '@/contexts/Language';
import MetricTile from './__features/MetricTile';
import OperationsHistory from './__features/OperationsHistory';
import AutoSlidingCarousel from '@/components/AutoSlideCarrousel';

const DashboardPage = () => {
  const { t } = useLanguage();

  const metricSlides = metricTiles(t).map((tile, index) => (
    <MetricTile key={`metric-${index}`} {...tile} />
  ));

  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t.dashboard.title}</h2>
        <div className="flex items-center space-x-2">
          <Button>{t.dashboard.download_report}</Button>
        </div>
      </div>

      <Separator />
      <AutoSlidingCarousel
        items={metricSlides}
        className="h-[150px]"
        interval={2000}
        visibleItems={3}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <SimpleAreaChart />
        </div>

        <OperationsHistory operations={mockOperations} />
      </div>
    </div>
  );
};

export default DashboardPage;
