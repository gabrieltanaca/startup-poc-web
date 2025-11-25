import api, { FetchCustomResponse } from './api';

export type HistoryItem = {
  id: string;
  query: string;
  summary: string;
  created_at: string; //'2025-12-30T23:59:59.999999+00:00'
};

export type DeleteMessage = {
  message: string;
  success: boolean;
};

export async function getHistory(): Promise<HistoryItem[]> {
  const response = await api.get<{ history: HistoryItem[] }>(`/history`);

  return response.ok ? response.data?.history || [] : [];
}

export async function deleteHistory(id: string): Promise<FetchCustomResponse<DeleteMessage>> {
  return await api.delete<DeleteMessage>(`/history?id=${id}`);
}
