import { TableColumns } from '@/components/Table';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { TranslateType } from '@/lib/translations/pt';
import { HistoryItem } from '@/service/history';
import { formatDateISO } from '@/utils/date';
import { Trash2 } from 'lucide-react';

export const getHistoryColumns = (
  t: TranslateType,
  isLoading: boolean,
  handleOpenDeleteModal: (item: HistoryItem | 'all') => void,
  lang: 'pt' | 'en',
): TableColumns<HistoryItem>[] => [
  {
    header: t.history.table_header_query,
    key: 'query',
    className: 'text-primary max-w-[80px]',
  },
  {
    header: t.history.table_header_summary,
    key: 'summary',
    className: 'hidden max-w-sm lg:table-cell',
  },
  {
    header: t.history.table_header_created_at,
    key: 'created_at',
    className: 'max-w-[80px]',
    cell: (row) => <p>{formatDateISO(row.created_at, lang)}</p>,
  },
  {
    key: 'actions',
    header: t.history.table_header_actions,
    className: 'text-right',
    cell: (row) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleOpenDeleteModal(row)}
        title={t.history.delete_action_tooltip}
        disabled={isLoading}
      >
        <Trash2 className="text-destructive h-4 w-4" />
      </Button>
    ),
  },
];
