import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type AdminTileItem = {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  colorClass: string;
};

const AdminTile = ({ icon, title, value, description, colorClass }: AdminTileItem) => (
  <Card className="transition-shadow duration-300 hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colorClass}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-muted-foreground mt-1 text-xs">{description}</p>
    </CardContent>
  </Card>
);

export default AdminTile;
