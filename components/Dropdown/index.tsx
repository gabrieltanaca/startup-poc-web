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

export type DropdownOption = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
};

type DropdownProps = {
  triggerTitle?: string;
  label?: string;
  size?: number;
  options: DropdownOption[];
  onSelect: (value: DropdownOption) => void;
};

export function Dropdown({ triggerTitle, label, options, onSelect, size = 120 }: DropdownProps) {
  const [selectedOpt, setSelectedOpt] = useState<DropdownOption>(options[0]);

  const onSelectOpt = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: DropdownOption) => {
    setSelectedOpt(item);
    onSelect(item);
    item.onClick?.(e);
  };

  return (
    <div className={cn('flex', 'flex-col', 'gap-2', `max-w-[${size}px]`, 'w-full')}>
      {label && <Label>{label}</Label>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex-1 justify-between">
            {triggerTitle || selectedOpt.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((item) => (
            <DropdownMenuItem key={item.value} onClick={(e) => onSelectOpt(e, item)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
