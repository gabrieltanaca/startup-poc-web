import { AnalysisItem, AnalyzeMetaDataItem, SmartPlaceItem } from '@/types/search';
import api from './api';
import { PlaceItem } from '@/types/search';

export type AnalyzeResponse = {
  success: boolean;
  analysis?: AnalysisItem;
  metadata?: AnalyzeMetaDataItem;
};

export type SearchResponse = {
  places: PlaceItem[];
  summary: string;
};

export type SmartSearchResponse = {
  query: string;
  places: SmartPlaceItem[];
  summary: string;
  insights: string;
  source: string;
};

export async function getSearch(query?: string): Promise<SearchResponse | null> {
  const response = await api.get<SearchResponse>(`/search?q=${query || 'Brasil'}`);

  return response.ok ? response.data || null : null;
}

export async function getSmartSearch(query?: string): Promise<SmartSearchResponse | null> {
  const response = await api.get<SmartSearchResponse>(`/search?q=${query}`);

  return response.ok ? response.data || null : null;
}

export async function post(places?: PlaceItem[]): Promise<AnalyzeResponse> {
  const response = await api.post<AnalyzeResponse>(`/analyze-places`, { places });

  return response.ok ? response.data || { success: false } : { success: false };
}
