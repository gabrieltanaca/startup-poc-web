export type RecommendationItem = {
  name: string;
  rating: 4.1;
  reason: string;
};

export type AnalysisItem = {
  topRecommendations: [];
  averageRating: 4.1;
  summary: string;
  categories: string[];
};

export type AnalyzeMetaDataItem = {
  totalPlaces: number;
  timestamp: string;
};

export type PlaceItem = {
  name: string;
  types: string[];
  rating: number;
  formatted_address: string;
  user_ratings_total: number;
};
