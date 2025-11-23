'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export type DropdownOption = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
};

type DropdownProps = {
  triggerTitle?: string;
  label?: string;
  size?: number;
  defaultValue?: DropdownOption;
  options: DropdownOption[];
  onSelect: (value: DropdownOption) => void;
  compact?: boolean;
};

export const Dropdown = ({
  triggerTitle,
  label,
  options,
  defaultValue,
  onSelect,
  size = 120,
  compact = false,
}: DropdownProps) => {
  const [selectedOpt, setSelectedOpt] = useState<DropdownOption>(defaultValue || options[0]);

  const onSelectOpt = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: DropdownOption) => {
    setSelectedOpt(item);
    onSelect(item);
    item.onClick?.(e);
  };

  return (
    <div className={cn('flex', 'flex-col', 'gap-2', `max-w-[${size}px]`, 'w-full')}>
      {label && <Label className="text-sm">{label}</Label>}
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn('flex gap-2', compact && 'items-center justify-center')}
              >
                {compact ? <Languages /> : triggerTitle || selectedOpt.label}
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options.map((item) => (
              <DropdownMenuItem key={item.value} onClick={(e) => onSelectOpt(e, item)}>
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
