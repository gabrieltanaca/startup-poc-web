import api, { FetchCustomResponse } from './api';

export type HistoryItem = {
  id: string;
  query: string;
  summary: string;
  created_at: string; //'2025-11-20T00:17:48.353655+00:00'
};

export async function getHistory(): Promise<HistoryItem[]> {
  const response = await api.get<{ history: HistoryItem[] }>(`/history`);

  return response.ok ? response.data?.history || [] : [];
}

export async function deleteHistory(id: string): Promise<FetchCustomResponse<string>> {
  const response = await api.get<string>(`/history?id=${id}`);

  return response;
}
