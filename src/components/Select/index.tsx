import * as React from 'react';

import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SelectOption = {
  label: string;
  value: string;
};

export type GroupOptions = {
  groupLabel: string;
  options: SelectOption[];
};

type SelectProps = {
  width?: number;
  placeholder: string;
  options: SelectOption[] | GroupOptions[];
  value: string;
  onValueChange?: (value: string) => void;
};

export const Select = ({
  width = 180,
  placeholder,
  options = [],
  value,
  onValueChange,
}: SelectProps) => {
  return (
    <SelectComponent value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-[${width}px]`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.length > 0 ? (
          'groupLabel' in options[0] ? (
            (options as GroupOptions[]).map((group) => (
              <SelectGroup key={group.groupLabel}>
                <SelectLabel>{group.groupLabel}</SelectLabel>
                {group.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          ) : (
            <SelectGroup>
              {(options as SelectOption[]).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          )
        ) : null}
      </SelectContent>
    </SelectComponent>
  );
};
