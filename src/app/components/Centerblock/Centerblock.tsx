'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPlaylist } from '../../redux/playerSlice';
import styles from './centerblock.module.css';
import TrackItem from './TrackItem/TrackItem';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import { TrackType } from '../../sharedTypes/types';
import {
  formatDuration,
  getUniqueAuthors,
  getUniqueGenres,
} from '../../utils/helpers';
import {
  applyFilters,
  SortOption,
} from '../../utils/filterHelpers';

type FilterKey = 'author' | 'year' | 'genre' | null;

interface CenterblockProps {
  tracks: TrackType[];
  title?: string;
}

const sortLabels: Record<SortOption, string> = {
  default: 'По умолчанию',
  newest: 'Сначала новые',
  oldest: 'Сначала старые',
};

const sortValues: SortOption[] = ['default', 'newest', 'oldest'];

export default function Centerblock({
  tracks,
  title = 'Треки',
}: CenterblockProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>(null);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaylist(tracks));
  }, [tracks, dispatch]);

  const uniqueAuthors = useMemo(() => getUniqueAuthors(tracks), [tracks]);
  const uniqueGenres = useMemo(() => getUniqueGenres(tracks), [tracks]);

  const filteredTracks = useMemo(
    () =>
      applyFilters(tracks, {
        author: selectedAuthor,
        genre: selectedGenre,
        query: searchQuery,
        sort: sortOption,
      }),
    [tracks, selectedAuthor, selectedGenre, searchQuery, sortOption],
  );

  const toggleFilter = useCallback((filter: Exclude<FilterKey, null>) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }, []);

  const handleAuthorSelect = (author: string) => {
    setSelectedAuthor((prev) => (prev === author ? '' : author));
    setActiveFilter(null);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre((prev) => (prev === genre ? '' : genre));
    setActiveFilter(null);
  };

  const handleSortSelect = (label: string) => {
    const entry = Object.entries(sortLabels).find(([, v]) => v === label);
    if (entry) {
      setSortOption(entry[0] as SortOption);
    }
    setActiveFilter(null);
  };

  return (
    <div className={styles.centerblock}>
      <Search value={searchQuery} onChange={setSearchQuery} />

      <h2 className={styles.centerblock__h2}>{title}</h2>

      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>

        <div className={styles.filter__wrapper}>
          <Filter
            label="исполнителю"
            isActive={activeFilter === 'author'}
            onClick={() => toggleFilter('author')}
          />
          {activeFilter === 'author' && (
            <div className={styles.filter__list_wrapper}>
              <ul className={styles.filter__list}>
                {uniqueAuthors.map((item) => (
                  <FilterItem
                    key={item}
                    item={item}
                    onClick={handleAuthorSelect}
                    isSelected={selectedAuthor === item}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.filter__wrapper}>
          <Filter
            label="году выпуска"
            isActive={activeFilter === 'year'}
            onClick={() => toggleFilter('year')}
          />

          {activeFilter === 'year' && (
            <div className={styles.filter__list_wrapper}>
              <ul className={styles.filter__list}>
                {sortValues.map((value) => (
                  <FilterItem
                    key={value}
                    item={sortLabels[value]}
                    onClick={handleSortSelect}
                    isSelected={sortOption === value}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.filter__wrapper}>
          <Filter
            label="жанру"
            isActive={activeFilter === 'genre'}
            onClick={() => toggleFilter('genre')}
          />
          {activeFilter === 'genre' && (
            <div className={styles.filter__list_wrapper}>
              <ul className={styles.filter__list}>
                {uniqueGenres.map((item) => (
                  <FilterItem
                    key={item}
                    item={item}
                    onClick={handleGenreSelect}
                    isSelected={selectedGenre === item}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={`${styles.playlistTitle__col} ${styles.col01}`}>
            Трек
          </div>
          <div className={`${styles.playlistTitle__col} ${styles.col02}`}>
            Исполнитель
          </div>
          <div className={`${styles.playlistTitle__col} ${styles.col03}`}>
            Альбом
          </div>
          <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
            <svg className={styles.playlistTitle__svg}>
              <use href="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {filteredTracks.length === 0 ? (
            <div className={styles.empty}>Нет подходящих треков</div>
          ) : (
            filteredTracks.map((track) => (
              <TrackItem
                key={track._id}
                track={track}
                time={formatDuration(track.duration_in_seconds)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}