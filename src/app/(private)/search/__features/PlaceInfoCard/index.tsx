import React, { useMemo } from 'react';
import { Clock, ShoppingBag, Smile, CheckCircle, MapPin, Star } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceItem } from '@/types/search';
import { TranslateType } from '@/lib/translations/pt';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getTags } from '../../constants';

type PlaceInfoCardProps = PlaceItem & {
  translation: TranslateType;
  summary: string;
};

const PlaceInfoCard = ({
  name,
  rating,
  formatted_address,
  user_ratings_total,
  translation: t,
  types,
  summary,
}: PlaceInfoCardProps) => {
  const tags = useMemo(() => getTags(types || [], t), [types, t]);

  return (
    <Card className="w-full max-w-md rounded-xl bg-gray-900 text-white shadow-2xl">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <div className="flex min-w-[40px] items-center justify-center overflow-hidden rounded-full border border-gray-700 bg-white">
          <Image src="/logo.png" alt={`${name} Logo`} className="p-1" width={40} height={40} />
        </div>

        <div className="flex flex-col space-y-1">
          <CardTitle className="text-xl font-bold text-gray-50">{name}</CardTitle>
          <div className="flex flex-col gap-1 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{formatted_address}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      {!!rating && (
        <CardContent className="px-4 pb-4">
          <div className="flex items-center justify-between space-x-4 rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm text-gray-300">
            <span className="flex items-center gap-1 font-semibold text-amber-300">
              <Star className="h-4 w-4" />
              <span>{rating || t.search.noRatings} |</span>
              <span>{`${user_ratings_total || 0} ${t.search.usersRating}`}</span>
            </span>
          </div>
        </CardContent>
      )}

      <CardContent className="space-y-3 px-4 pb-4">
        <ul className="ml-4 list-disc space-y-2 text-sm text-gray-300">
          <li>{summary}</li>
        </ul>
        <div className="flex gap-2">
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardContent className="px-4 pb-4">
        <Button className="w-full rounded-lg bg-blue-500 py-2 text-white transition-all duration-200 hover:bg-blue-700">
          {t.general.moreDetails}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceInfoCard;
