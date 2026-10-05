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
import { AppDispatch } from '../../redux/store';

type FilterKey = 'author' | 'year' | 'genre' | null;

interface CenterblockProps {
  tracks: TrackType[];
  title?: string;
}

export default function Centerblock({ tracks, title = 'Треки' }: CenterblockProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPlaylist(tracks));
  }, [tracks, dispatch]);

  const uniqueAuthors = useMemo(() => getUniqueAuthors(tracks), [tracks]);
  const uniqueGenres = useMemo(() => getUniqueGenres(tracks), [tracks]);
  const yearOptions = useMemo(
    () => ['По умолчанию', 'Сначала новые', 'Сначала старые'],
    [],
  );


  const toggleFilter = useCallback((filter: Exclude<FilterKey, null>) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }, []);

  return (
    <div className={styles.centerblock}>
      <Search />

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
                {uniqueAuthors.map((item, idx) => (
                  <FilterItem key={idx} item={item} />
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
                {yearOptions.map((item, idx) => (
                    <FilterItem key={idx} item={item} />
                  ),
                )}
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
                {uniqueGenres.map((item, idx) => (
                  <FilterItem key={idx} item={item} />
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
          {tracks.map((track) => (
            <TrackItem
              key={track._id}
              track={track}
              time={formatDuration(track.duration_in_seconds)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
