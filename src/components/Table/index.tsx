import { ReactNode, useEffect, useMemo, useState, useCallback } from 'react';
import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { ArrowLeft, ArrowRight, Loader2, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '@/contexts/Language';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

export type TableColumns<T> = {
  key: keyof T | 'actions' | string;
  header: string | ReactNode;
} & Partial<{
  cell: (row: T) => ReactNode;
  className: string;
  isSortable: boolean;
}>;

export type TableProps<T> = {
  data: T[];
  columns: TableColumns<T>[];
} & Partial<{
  title: string;

  onPerPageChange: (perPage: number) => void;
  onSearchTermChange: (searchTerm: string) => void;
  perPageOptions: number[];
  isLoading: boolean;
  hasPaginated: boolean;
  hasSearch: boolean;
  className: string;

  emptyStateText: string;
}>;

function Table<T extends Record<string, any>>({
  title,
  data = [],
  columns = [],
  onPerPageChange,
  onSearchTermChange,
  perPageOptions = [5, 10, 20, 50],
  isLoading = false,
  hasPaginated = true,
  hasSearch = true,
  className,
  emptyStateText,
}: TableProps<T>) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(perPageOptions[0] || 10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchableColumns = useMemo(
    () => columns.filter((col) => typeof col.key === 'string' && col.key !== 'actions'),
    [columns],
  );

  const filteredData = useMemo(() => {
    if (!hasSearch || !searchTerm) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return data.filter((item) => {
      return searchableColumns.some((col) => {
        const value = item[col.key as keyof T];

        return String(value).toLowerCase().includes(lowerSearchTerm);
      });
    });
  }, [data, searchTerm, hasSearch, searchableColumns]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    if (!hasPaginated) return filteredData;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage, hasPaginated]);

  const handleItemsPerPageChange = (value: string) => {
    const newPerPage = Number(value);
    setItemsPerPage(newPerPage);
    setCurrentPage(1);
    onPerPageChange?.(newPerPage);
  };

  const handlePagination = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  useEffect(() => {
    onSearchTermChange?.(searchTerm);
  }, [searchTerm, onSearchTermChange]);

  const renderCellContent = useCallback((item: T, column: TableColumns<T>): ReactNode => {
    if (typeof column.cell === 'function') {
      return column.cell(item);
    }

    const value = item[column.key as keyof T];

    return String(value);
  }, []);

  return (
    <>
      {hasSearch && (
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <Input
              type="text"
              placeholder={t.table.search_placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>
      )}

      <Card>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className={cn('min-h-[400px] overflow-x-auto', className)}>
            <TableComponent>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index} className={column.className}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t.table?.loading}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <TableRow key={index}>
                      {columns.map((column, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className={cn(
                            'text-muted-foreground max-w-[300px] truncate text-sm',
                            column.className,
                          )}
                        >
                          {renderCellContent(item, column)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-muted-foreground h-24 text-center"
                    >
                      {emptyStateText ||
                        (searchTerm
                          ? t.table?.no_results_filtered ||
                            'Nenhum resultado encontrado para a busca.'
                          : t.table?.no_results_default || 'Nenhum dado disponível.')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableComponent>
          </div>
        </CardContent>
      </Card>

      {hasPaginated && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <Label className="hidden text-sm font-normal sm:block">{t.table.items_per_page}:</Label>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {perPageOptions.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="text-muted-foreground hidden flex-1 text-sm sm:block">
              {t.table.pagination_info_prefix} {currentPage} {t.table.pagination_info_of}{' '}
              {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePagination('prev')}
                disabled={currentPage <= 1 || totalPages === 0 || isLoading}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePagination('next')}
                disabled={currentPage >= totalPages || totalPages === 0 || isLoading}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
