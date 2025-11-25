import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/contexts/Language';
import { ArrowUpRight } from 'lucide-react';

interface OperationLog {
  id: string;
  type: string;
  user: string;
  date: string;
  status: 'Concluída' | 'Pendente' | 'Erro';
}

const OperationsHistory = ({ operations }: { operations: OperationLog[] }) => {
  const { t } = useLanguage();

  const getStatusBadge = (status: OperationLog['status']) => {
    switch (status) {
      case 'Concluída':
        return (
          <Badge
            variant="secondary"
            className="bg-green-500/10 text-green-500 dark:bg-green-300/10 dark:text-green-300"
          >
            {status}
          </Badge>
        );
      case 'Pendente':
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/10 text-yellow-500 dark:bg-yellow-300/10 dark:text-yellow-300"
          >
            {status}
          </Badge>
        );
      case 'Erro':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="col-span-1 md:col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle>{t.dashboard.recent_operations}</CardTitle>
        <CardDescription>{t.dashboard.latest_activity_summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t.dashboard.table_header_id}</TableHead>
              <TableHead>{t.dashboard.table_header_type}</TableHead>
              <TableHead className="hidden md:table-cell">
                {t.dashboard.table_header_user}
              </TableHead>
              <TableHead className="text-center">{t.dashboard.table_header_status}</TableHead>
              <TableHead className="text-right">{t.dashboard.table_header_date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operations.map((op) => (
              <TableRow key={op.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="text-primary font-medium">{op.id}</TableCell>
                <TableCell>{op.type}</TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">
                  {op.user}
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(op.status)}</TableCell>
                <TableCell className="text-muted-foreground text-right text-sm">
                  {op.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="link" className="px-0 text-sm font-normal">
          {t.dashboard.view_all_operations} <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OperationsHistory;
