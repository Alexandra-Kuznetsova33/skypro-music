import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { TrackType, SelectionType } from '../../sharedTypes/types';

interface TracksApiResponse {
  success: boolean;
  data: TrackType[];
}

interface SelectionsApiResponse {
  success: boolean;
  data: SelectionType[];
}

interface SelectionByIdApiResponse {
  success: boolean;
  data: SelectionType;
}

export async function getTracks(): Promise<TrackType[]> {
  const res = await axios.get<TracksApiResponse>(
    `${API_BASE_URL}/catalog/track/all/`,
  );
  return res.data.data;
}

export async function getSelections(): Promise<SelectionType[]> {
  const res = await axios.get<SelectionsApiResponse>(
    `${API_BASE_URL}/catalog/selection/all`,
  );
  return res.data.data;
}

export async function getSelectionById(id: string | number): Promise<SelectionType> {
  const res = await axios.get<SelectionByIdApiResponse>(
    `${API_BASE_URL}/catalog/selection/${id}/`,
  );
  return res.data.data;
}

export async function getFavoriteTracks(access: string): Promise<TrackType[]> {
  const res = await axios.get<{ success: boolean; data: TrackType[] }>(
    `${API_BASE_URL}/catalog/track/favorite/all/`,
    { headers: { Authorization: `Bearer ${access}` } },
  );
  return res.data.data;
}

export async function addLike(
  access: string,
  id: number,
): Promise<void> {
  await axios.post(
    `${API_BASE_URL}/catalog/track/${id}/favorite/`,
    {},
    { headers: { Authorization: `Bearer ${access}` } },
  );
}

export async function removeLike(
  access: string,
  id: number,
): Promise<void> {
  await axios.delete(`${API_BASE_URL}/catalog/track/${id}/favorite/`, {
    headers: { Authorization: `Bearer ${access}` },
  });
}