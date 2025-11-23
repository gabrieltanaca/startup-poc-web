'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: 'map-pin.svg',
  shadowUrl: '',
  iconSize: [40],
});

import { PlaceResult } from '@/lib/mock-places';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin } from 'lucide-react';

interface DynamicMapProps {
  places: PlaceResult[];
  selectedPlace?: PlaceResult | null;
  onPlaceSelect?: (place: PlaceResult | null) => void;
}

function MapViewUpdater({
  places,
  selectedPlace,
}: {
  places: PlaceResult[];
  selectedPlace: PlaceResult | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.setView([selectedPlace.latitude, selectedPlace.longitude], 14);
    } else if (places.length > 0) {
      const bounds = L.latLngBounds(places.map((p) => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, places, selectedPlace]);

  return null;
}

export default function DynamicMap({ places, selectedPlace, onPlaceSelect }: DynamicMapProps) {
  const initialPosition: [number, number] = [52.52, 13.405];

  const routeCoordinates = useMemo(() => {
    if (selectedPlace) {
      return [
        initialPosition,
        [selectedPlace.latitude, selectedPlace.longitude],
      ] as L.LatLngExpression[];
    }
    return [];
  }, [selectedPlace]);

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full rounded-md shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewUpdater places={places} selectedPlace={selectedPlace || places[0]} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          eventHandlers={{
            click: () => onPlaceSelect?.(place),
          }}
        >
          {selectedPlace?.id === place.id && (
            <Popup>
              <Card className="border-none shadow-none">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{place.distance} mi</span>
                    <Clock className="ml-2 h-3 w-3" />
                    <span>Open 'til {place.openTime}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-2 text-sm">{place.description}</p>
                  <Button size="sm" className="w-full">
                    More Details
                  </Button>
                </CardContent>
              </Card>
            </Popup>
          )}
        </Marker>
      ))}

      {routeCoordinates.length > 0 && (
        <Polyline positions={routeCoordinates} color="#82E0AA" weight={5} />
      )}
    </MapContainer>
  );
}
