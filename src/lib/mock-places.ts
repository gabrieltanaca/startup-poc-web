export interface PlaceResult {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  distance: number;
  openTime: string;
  description: string;
  brandColor?: string;
}

export const MOCK_PLACES: PlaceResult[] = [
  {
    id: '1',
    name: 'Adidas',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.52,
    longitude: 13.405,
    distance: 0.5,
    openTime: '6pm',
    description:
      'A maior loja Adidas da cidade, com uma vasta seleção de roupas esportivas e calçados.',
    brandColor: '#000000',
  },
  {
    id: '2',
    name: 'Nike',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.525,
    longitude: 13.415,
    distance: 0.7,
    openTime: '6pm',
    description: 'Experimente as últimas inovações da Nike em performance e estilo.',
    brandColor: '#E4213F',
  },
  {
    id: '3',
    name: 'Puma',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.518,
    longitude: 13.4,
    distance: 0.3,
    openTime: '6pm',
    description: 'Produtos de alta qualidade para atletas e entusiastas de esportes.',
    brandColor: '#CC0000',
  },
  {
    id: '4',
    name: 'Under Armour',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.53,
    longitude: 13.42,
    distance: 0.2,
    openTime: '8pm',
    description: 'Equipamentos e vestuário de performance para otimizar seus treinos.',
    brandColor: '#171A21',
  },
  {
    id: '5',
    name: 'Timberland',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.51,
    longitude: 13.41,
    distance: 0.4,
    openTime: '6pm',
    description: 'Calçados e roupas para aventura e estilo urbano, com foco em sustentabilidade.',
    brandColor: '#CCA354',
  },
  {
    id: '6',
    name: 'EA7 Emporio Armani',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.505,
    longitude: 13.402,
    distance: 2.1,
    openTime: '7pm',
    description: 'Moda esportiva de luxo com o design icônico da Armani.',
    brandColor: '#D0D0D0',
  },
  {
    id: '7',
    name: 'Converse',
    city: 'Berlim',
    country: 'Alemanha',
    latitude: 52.513,
    longitude: 13.425,
    distance: 2.5,
    openTime: '6pm',
    description: 'Os clássicos tênis e vestuário que definem gerações.',
    brandColor: '#777777',
  },
];
