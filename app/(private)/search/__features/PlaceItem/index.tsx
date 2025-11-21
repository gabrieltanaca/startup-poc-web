import { Button } from '@/components/ui/button';
import { PlaceItem } from '@/types/search';
import { Clock, GripVertical, MapPin } from 'lucide-react';
import Image from 'next/image';

type PlaceCardProps = {
  place: PlaceItem;
  setSelectedPlace: (place: PlaceItem) => void;
  isSelected: boolean;
};

const PlaceCard = ({ isSelected, setSelectedPlace, place }: PlaceCardProps) => {
  return (
    <div
      className={`hover:bg-muted flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors ${
        isSelected ? 'bg-muted' : ''
      }`}
      onClick={() => setSelectedPlace(place)}
    >
      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-stone-200">
        <Image src="/logo.png" alt={place.name} width={40} height={40} className="object-cover" />
      </div>
      <div className="grow">
        <p className="font-semibold">{place.name}</p>
        <p className="text-muted-foreground flex flex-col items-center space-x-1 text-sm">
          <div>
            <MapPin className="h-3 w-3" />
            <span>{place.formatted_address}</span>
          </div>
          <div>
            <Clock className="ml-2 h-3 w-3" />
            <span>{place.rating}</span>
          </div>
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <GripVertical className="text-muted-foreground h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlaceCard;
