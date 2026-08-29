import { TrackType } from '../sharedTypes/types';

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function getUniqueAuthors(tracks: TrackType[]): string[] {
  return Array.from(new Set(tracks.map(track => track.author)));
}

export function getUniqueGenres(tracks: TrackType[]): string[] {
  const genres = tracks.flatMap(track => track.genre);
  return Array.from(new Set(genres));
}
