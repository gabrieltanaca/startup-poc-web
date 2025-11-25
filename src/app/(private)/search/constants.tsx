import { DropdownOption } from '@/components/Dropdown';
import { TranslateType } from '@/lib/translations/pt';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const getShowOptions = (t: TranslateType): DropdownOption[] => [
  {
    value: 'all',
    label: t.search.all,
  },
  {
    value: 'restaurant',
    label: t.search.restaurant,
  },
];

export const getSortOptions = (t: TranslateType): DropdownOption[] => [
  {
    value: 'rating_descending',
    label: (
      <span className="flex items-center gap-1">
        <span>{t.search.rating}</span> <ArrowDown />
      </span>
    ),
  },
  {
    value: 'rating_ascending',
    label: (
      <span className="flex items-center gap-1">
        <span>{t.search.rating}</span> <ArrowUp />
      </span>
    ),
  },
];
