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

export const getTags = (types: string[], t: TranslateType) => {
  const tagValues = {
    administrative_area: t.tags.locality,
    locality: t.tags.locality,
    country: t.tags.country,
    restaurant: t.tags.restaurant,
    store: t.tags.store,
    attraction: t.tags.attraction,
    park: t.tags.park,
    station: t.tags.station,
  };

  const tags = Object.entries(tagValues)
    .map(([key, value]) => {
      if (types.join(' ').includes(key)) {
        return value;
      }
      return '';
    })
    .filter((f) => !!f);

  return [...new Set(tags)];
};
