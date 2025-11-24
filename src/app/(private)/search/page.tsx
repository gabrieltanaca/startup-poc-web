'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SlidersHorizontal, GripVertical, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';

import { useLanguage } from '@/contexts/Language';
import { Dropdown, DropdownOption } from '@/components/Dropdown';
import { getShowOptions, getSortOptions } from './constants';
import { SearchInput } from '@/components/SearchInput';
import PlaceCard from './__features/PlaceItem';
import { getSearch } from '@/service/search';
import { PlaceItem } from '@/types/search';
import { MOCK_PLACES } from '@/lib/mock-places';

const DynamicMapComponent = dynamic(() => import('@/components/DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
      Carregando Mapa...
    </div>
  ),
});

const SearchPage = () => {
  const { t } = useLanguage();

  const showOpts = getShowOptions(t);
  const sortOpts = getSortOptions(t);

  const [searchTerm, setSearchTerm] = useState('');
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);

  const [selectShowOpt, setSelectShowOpt] = useState<DropdownOption>(showOpts[0]);
  const [selectSortOpt, setSelectSortOpt] = useState<DropdownOption>(sortOpts[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchPlaces = async () => {
    setIsLoading(true);
    const response = await getSearch(searchTerm);

    setPlaces(response?.places || []);
    setIsLoading(false);
  };

  useEffect(() => {
    searchPlaces();
  }, [searchTerm]);

  const filteredPlaces = useMemo(() => {
    if (!searchTerm) return MOCK_PLACES;
    return MOCK_PLACES.filter(
      (place) =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.country.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <section className="bg-background flex w-full flex-col p-4 md:w-1/3 md:max-w-md md:border-r">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold">{t.search.title}</h2>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <GripVertical className="h-5 w-5" />
          </Button>
        </header>

        <SearchInput
          placeholder={t.search.placeholder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="mb-4 flex flex-wrap gap-2">
          <Dropdown options={showOpts} onSelect={(opt) => setSelectShowOpt(opt)} />
          <Dropdown options={sortOpts} onSelect={(opt) => setSelectSortOpt(opt)} />
          <Button variant="outline" className="flex items-center space-x-1">
            <SlidersHorizontal className="h-4 w-4" />
            <span>{t.search.filters}</span>
          </Button>
        </div>

        <Separator className="mb-4" />

        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-muted-foreground">Buscando...</p>
            </div>
          ) : places.length === 0 ? (
            <p className="text-muted-foreground text-center">Nenhum lugar encontrado.</p>
          ) : (
            places.map((place) => (
              <PlaceCard
                key={place.formatted_address}
                place={place}
                isSelected={selectedPlace?.formatted_address === place.formatted_address}
                setSelectedPlace={setSelectedPlace}
              />
            ))
          )}
        </div>
      </section>

      <section className="hidden flex-1 md:block">
        <DynamicMapComponent places={filteredPlaces} />
      </section>
    </div>
  );
};

export default SearchPage;
