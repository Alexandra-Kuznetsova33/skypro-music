import {
  filterTracks,
  searchTracks,
  sortTracks,
  applyFilters,
} from './filterHelpers';
import { TrackType } from '../sharedTypes/types';

const makeTrack = (overrides: Partial<TrackType>): TrackType => ({
  _id: 1,
  name: 'Track',
  author: 'Author',
  release_date: '2020-01-01',
  genre: ['rock'],
  duration_in_seconds: 200,
  album: 'Album',
  logo: null,
  track_file: '',
  stared_user: [],
  ...overrides,
});

const trackA = makeTrack({
  _id: 1,
  name: 'Alpha',
  author: 'Nero',
  genre: ['rock'],
  release_date: '2020-01-01',
});

const trackB = makeTrack({
  _id: 2,
  name: 'Beta',
  author: 'Basta',
  genre: ['pop'],
  release_date: '2022-05-15',
});

const trackC = makeTrack({
  _id: 3,
  name: 'Gamma',
  author: 'Nero',
  genre: ['rock', 'indie'],
  release_date: '2018-03-10',
});

const tracks = [trackA, trackB, trackC];

describe('filterTracks', () => {
  it('возвращает все треки, если фильтры пустые', () => {
    expect(filterTracks(tracks, '', '')).toEqual(tracks);
  });

  it('фильтрует по автору', () => {
    const result = filterTracks(tracks, 'Nero', '');
    expect(result).toEqual([trackA, trackC]);
  });

  it('фильтрует по жанру', () => {
    const result = filterTracks(tracks, '', 'pop');
    expect(result).toEqual([trackB]);
  });

  it('фильтрует по автору и жанру одновременно', () => {
    const result = filterTracks(tracks, 'Nero', 'rock');
    expect(result).toEqual([trackA, trackC]);
  });

  it('возвращает пустой массив, если ничего не совпало', () => {
    const result = filterTracks(tracks, 'Nero', 'pop');
    expect(result).toEqual([]);
  });
});

describe('searchTracks', () => {
  it('возвращает все треки при пустом запросе', () => {
    expect(searchTracks(tracks, '')).toEqual(tracks);
  });

  it('ищет по первым буквам (регистронезависимо)', () => {
    expect(searchTracks(tracks, 'alp')).toEqual([trackA]);
    expect(searchTracks(tracks, 'BET')).toEqual([trackB]);
  });

  it('возвращает пустой массив, если совпадений нет', () => {
    expect(searchTracks(tracks, 'xyz')).toEqual([]);
  });
});

describe('sortTracks', () => {
  it('возвращает исходный массив при "default"', () => {
    expect(sortTracks(tracks, 'default')).toEqual(tracks);
  });

  it('сортирует от новых к старым при "newest"', () => {
    const result = sortTracks(tracks, 'newest');
    expect(result.map((t) => t._id)).toEqual([2, 1, 3]);
  });

  it('сортирует от старых к новым при "oldest"', () => {
    const result = sortTracks(tracks, 'oldest');
    expect(result.map((t) => t._id)).toEqual([3, 1, 2]);
  });

  it('не мутирует исходный массив', () => {
    const original = [...tracks];
    sortTracks(tracks, 'newest');
    expect(tracks).toEqual(original);
  });
});

describe('applyFilters', () => {
  it('применяет только фильтр по автору', () => {
    const result = applyFilters(tracks, { author: 'Nero' });
    expect(result).toEqual([trackA, trackC]);
  });

  it('применяет поиск + сортировку', () => {
  const result = applyFilters(tracks, {
    query: 'a',
    sort: 'newest',
  });
  expect(result.map((t) => t._id)).toEqual([1]);
});

  it('применяет всё вместе', () => {
    const result = applyFilters(tracks, {
      author: 'Nero',
      genre: 'rock',
      query: 'gam',
      sort: 'newest',
    });
    expect(result).toEqual([trackC]);
  });

  it('возвращает пустой массив, если ничего не подошло', () => {
    const result = applyFilters(tracks, {
      author: 'Nero',
      genre: 'pop',
    });
    expect(result).toEqual([]);
  });
});