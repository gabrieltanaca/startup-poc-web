'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { GripVertical, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useLanguage } from '@/contexts/Language';
import { DropdownOption } from '@/components/Dropdown';
import { getShowOptions, getSortOptions } from './constants';
import { SearchInput } from '@/components/SearchInput';
import PlaceCard from './__features/PlaceItem';
import { getSearch, getSmartSearch } from '@/service/search';
import { PlaceItem } from '@/types/search';
import { MOCK_PLACES } from '@/lib/mock-places';
import SearchFilters from './__features/SearchFilters';
import PlaceInfoCard from './__features/PlaceInfoCard';
import { types } from 'util';

const DynamicMapComponent = dynamic(() => import('@/components/DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
      Carregando Mapa...
    </div>
  ),
});

const DEBOUNCE_DELAY = 500;

const SearchPage = () => {
  const { t, lang } = useLanguage();

  const showOpts = getShowOptions(t);
  const sortOpts = getSortOptions(t);

  const [searchTerm, setSearchTerm] = useState('');
  const [dataPlaces, setDataPlaces] = useState<PlaceItem[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isSmartSearch, setIsSmartSearch] = useState(false);

  const [selectShowOpt, setSelectShowOpt] = useState<DropdownOption>(showOpts[0]);
  const [selectSortOpt, setSelectSortOpt] = useState<DropdownOption>(sortOpts[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterPlaces = (places: PlaceItem[]): PlaceItem[] => {
    let newPlaces = places;

    if (selectShowOpt.value === 'restaurant') {
      newPlaces = newPlaces.filter((x) => x.types.includes('restaurant'));
    }

    const sortedPlaces = newPlaces.sort((a, b) => {
      const ratingA = parseFloat(a.rating as any) * 10 || 0;
      const ratingB = parseFloat(b.rating as any) * 10 || 0;

      if (selectSortOpt.value === 'rating_ascending') {
        return ratingA - ratingB;
      } else {
        return ratingB - ratingA;
      }
    });

    return sortedPlaces;
  };

  const searchPlaces = async () => {
    if (!searchTerm) {
      setDataPlaces([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let response;

    if (isSmartSearch) {
      response = await getSmartSearch(searchTerm);
    } else {
      response = await getSearch(searchTerm);
    }

    setSummary(response?.summary || '');
    setDataPlaces(response?.places || []);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      searchPlaces();
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, isSmartSearch]);

  useEffect(() => {
    setSelectShowOpt((prev) => showOpts?.find((x) => x.value === prev.value) || prev);
    setSelectSortOpt((prev) => sortOpts?.find((x) => x.value === prev.value) || prev);
  }, [lang]);

  useEffect(() => {
    setFilteredPlaces(filterPlaces(dataPlaces));
  }, [selectShowOpt, selectSortOpt, dataPlaces]);

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
          placeholder={isSmartSearch ? t.search.smartPlaceholder : t.search.placeholder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          smartSearch={isSmartSearch}
        />

        <SearchFilters
          translation={t}
          isSmartSearch={isSmartSearch}
          setIsSmartSearch={setIsSmartSearch}
          showOpts={showOpts}
          selectShowOpt={selectShowOpt}
          onSelectShow={(opt) => setSelectShowOpt(opt)}
          sortOpts={sortOpts}
          selectSortOpt={selectSortOpt}
          onSelectSort={(opt) => setSelectSortOpt(opt)}
        />

        <Separator className="mb-4" />

        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-muted-foreground">{t.general.searching}</p>
            </div>
          ) : filteredPlaces.length === 0 ? (
            <p className="text-muted-foreground text-center">{t.search.noResults}</p>
          ) : (
            filteredPlaces.map((place) => (
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

      <section className="relative hidden flex-1 md:block">
        <DynamicMapComponent places={MOCK_PLACES} />
        {selectedPlace && (
          <div className="absolute bottom-2 left-2 z-1000 w-[400px] max-w-[400px]">
            <PlaceInfoCard translation={t} summary={summary} {...selectedPlace} />
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
