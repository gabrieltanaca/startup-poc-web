'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: { from: Date; to: Date } | undefined;
  setDate: React.Dispatch<React.SetStateAction<{ from: Date; to: Date } | undefined>>;
  placeholder?: string;
}

export function DateRangePicker({
  className,
  date,
  setDate,
  placeholder,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatRange = (range: { from: Date; to: Date }) => {
    const start = range.from ? format(range.from, 'dd/MM/yyyy', { locale: ptBR }) : null;
    const end = range.to ? format(range.to, 'dd/MM/yyyy', { locale: ptBR }) : null;

    if (start && end) {
      return `${start} - ${end}`;
    }
    if (start) {
      return `${start}`;
    }
    return placeholder || 'Selecione o intervalo de datas';
  };

  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? formatRange(date) : placeholder || 'Selecione o intervalo de datas'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              if (!date || !date.from || !date.to) return;

              const { from, to } = date;
              setDate({ from, to });
              setOpen(false);
            }}
            numberOfMonths={2}
            locale={ptBR}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
