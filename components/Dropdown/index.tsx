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
  defaultValue?: DropdownOption;
  options: DropdownOption[];
  onSelect: (value: DropdownOption) => void;
};

export const Dropdown = ({
  triggerTitle,
  label,
  options,
  defaultValue,
  onSelect,
  size = 120,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="">
            <Button variant="outline" className="flex-1 justify-between">
              {triggerTitle || selectedOpt.label}
            </Button>
          </div>
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
};
