import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type MetricTileItem = {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  description: string;
};

const MetricTile = ({ icon, title, value, change, description }: MetricTileItem) => (
  <Card className="transition-shadow duration-300 hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-muted-foreground mt-1 text-xs">
        <span
          className={`font-semibold ${change.includes('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
        >
          {change}
        </span>{' '}
        {description}
      </p>
    </CardContent>
  </Card>
);

export default MetricTile;
