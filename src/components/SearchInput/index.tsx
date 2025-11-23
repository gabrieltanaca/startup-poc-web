import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type SearchInputProps = {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export function SearchInput({ placeholder, searchTerm, setSearchTerm }: SearchInputProps) {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <div className="relative grow">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={placeholder}
          className="pr-2 pl-10"
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
