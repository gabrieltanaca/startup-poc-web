import { Search, Zap } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type SearchInputProps = {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  smartSearch: boolean;
};

export function SearchInput({
  placeholder,
  searchTerm,
  setSearchTerm,
  smartSearch,
}: SearchInputProps) {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <div className="relative grow">
        {smartSearch && (
          <Zap className="absolute top-1/2 left-8 h-4 w-4 -translate-y-1/2 text-amber-500" />
        )}
        <Search
          className={cn(
            'absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
            smartSearch ? 'text-amber-500!' : 'text-muted-foreground',
          )}
        />
        <Input
          placeholder={placeholder}
          className={cn(
            'pr-2',
            smartSearch
              ? 'border-amber-500 pl-14 focus-visible:border-amber-500 focus-visible:ring-amber-200'
              : 'pl-10',
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon" onClick={() => setSearchTerm('')}>
        X
      </Button>
    </div>
  );
}
