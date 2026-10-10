import { TrackType } from '../sharedTypes/types';

export type SortOption = 'default' | 'newest' | 'oldest';

export function filterTracks(
  tracks: TrackType[],
  authors: string[],
  genres: string[],
): TrackType[] {
  return tracks.filter((track) => {
    const authorMatch = authors.length === 0 || authors.includes(track.author);
    const genreMatch =
      genres.length === 0 || track.genre.some((g) => genres.includes(g));
    return authorMatch && genreMatch;
  });
}

export function searchTracks(tracks: TrackType[], query: string): TrackType[] {
  if (!query) return tracks;
  const lower = query.toLowerCase();
  return tracks.filter((track) => track.name.toLowerCase().startsWith(lower));
}

export function sortTracks(
  tracks: TrackType[],
  sort: SortOption,
): TrackType[] {
  if (sort === 'default') return tracks;
  const sorted = [...tracks].sort((a, b) => {
    const dateA = new Date(a.release_date).getTime();
    const dateB = new Date(b.release_date).getTime();
    return sort === 'newest' ? dateB - dateA : dateA - dateB;
  });
  return sorted;
}

export function applyFilters(
  tracks: TrackType[],
  options: {
    authors?: string[];
    genres?: string[];
    query?: string;
    sort?: SortOption;
  },
): TrackType[] {
  const { authors = [], genres = [], query = '', sort = 'default' } = options;
  let result = filterTracks(tracks, authors, genres);
  result = searchTracks(result, query);
  result = sortTracks(result, sort);
  return result;
}