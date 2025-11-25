'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export type DropdownOption = React.HTMLAttributes<HTMLDivElement> & {
  label: string | React.ReactNode;
  value: string;
};

type DropdownProps = {
  triggerTitle?: string;
  label?: string;
  size?: number;
  defaultValue?: DropdownOption;
  options: DropdownOption[];
  value?: DropdownOption;
  onSelect: (value: DropdownOption) => void;
  compact?: boolean;
  compactIcon?: React.ReactNode;
  align?: 'right' | 'left' | 'center';
};

export const Dropdown = ({
  triggerTitle,
  label,
  options,
  defaultValue,
  onSelect,
  size = 120,
  compact = false,
  compactIcon = <ArrowUpRight />,
  value,
  align = 'left',
}: DropdownProps) => {
  const [selectedOpt, setSelectedOpt] = useState<DropdownOption>(defaultValue || options[0]);

  const onSelectOpt = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: DropdownOption) => {
    onSelect(item);
    item.onClick?.(e);
  };

  useEffect(() => {
    !!value && setSelectedOpt(value);
  }, [value]);

  return (
    <div className={cn('flex', 'flex-col', 'gap-2', `max-w-[${size}px]`, 'w-full')}>
      {label && <Label className="text-sm">{label}</Label>}
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'flex gap-2',
                  {
                    right: 'justify-end',
                    left: 'justify-start',
                    center: '',
                  }[align],
                  compact && 'items-center justify-center',
                )}
              >
                {compact ? compactIcon : triggerTitle || selectedOpt.label}
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={(e) => onSelectOpt(e, item)}
                className={cn(
                  {
                    right: 'justify-end!',
                    left: 'justify-start!',
                    center: '',
                  }[align],
                )}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent side="right" className={!compact ? 'hidden' : ''}>
          <p>{selectedOpt.label}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
