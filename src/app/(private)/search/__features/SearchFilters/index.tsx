import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal, Zap } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dropdown, DropdownOption } from '@/components/Dropdown';
import { TranslateType } from '@/lib/translations/pt';

type SearchFiltersProps = {
  translation: TranslateType;
  isSmartSearch: boolean;
  setIsSmartSearch: Dispatch<SetStateAction<boolean>>;
  showOpts: DropdownOption[];
  selectShowOpt: DropdownOption;
  onSelectShow: (opt: DropdownOption) => void;
  sortOpts: DropdownOption[];
  selectSortOpt: DropdownOption;
  onSelectSort: (opt: DropdownOption) => void;
};

const SearchFilters = ({
  translation: t,
  isSmartSearch,
  setIsSmartSearch,
  showOpts,
  selectShowOpt,
  onSelectShow,
  sortOpts,
  selectSortOpt,
  onSelectSort,
}: SearchFiltersProps) => {
  return (
    <Card className="mb-4 gap-2 p-2">
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          <Label>{t.search.smartSearch}</Label>
          <Switch checked={isSmartSearch} onCheckedChange={setIsSmartSearch} />
        </div>
        <Button variant="outline" className="flex items-center">
          <SlidersHorizontal className="h-4 w-4" />
          <span>{t.search.filters}</span>
        </Button>
      </div>
      <Separator />
      <div className="flex items-end gap-2">
        <Dropdown
          label={t.search.showMe}
          options={showOpts}
          value={selectShowOpt}
          onSelect={onSelectShow}
        />
        <Dropdown
          label={t.search.sortBy}
          options={sortOpts}
          value={selectSortOpt}
          onSelect={onSelectSort}
        />
      </div>
    </Card>
  );
};

export default SearchFilters;
