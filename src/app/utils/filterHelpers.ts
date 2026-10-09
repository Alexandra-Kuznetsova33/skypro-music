import { TrackType } from '../sharedTypes/types';

export type SortOption = 'default' | 'newest' | 'oldest';

export function filterTracks(
  tracks: TrackType[],
  author: string,
  genre: string,
): TrackType[] {
  return tracks.filter((track) => {
    const authorMatch = !author || track.author === author;
    const genreMatch = !genre || track.genre.includes(genre);
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
    author?: string;
    genre?: string;
    query?: string;
    sort?: SortOption;
  },
): TrackType[] {
  const { author = '', genre = '', query = '', sort = 'default' } = options;
  let result = filterTracks(tracks, author, genre);
  result = searchTracks(result, query);
  result = sortTracks(result, sort);
  return result;
}