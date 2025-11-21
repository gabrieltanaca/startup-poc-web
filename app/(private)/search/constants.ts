import { DropdownOption } from '@/components/Dropdown';
import { TranslateType } from '@/lib/translations/pt';

export const getShowOptions = (t: TranslateType): DropdownOption[] => [
  {
    value: 'openNow',
    label: t.search.openNow,
  },
  {
    value: 'all',
    label: t.search.all,
  },
];

export const getSortOptions = (t: TranslateType): DropdownOption[] => [
  {
    value: 'nearest',
    label: t.search.nearest,
  },
  {
    value: 'rating',
    label: t.search.rating,
  },
];
