'use client';

import { useEffect, useState } from 'react';
import Centerblock from './components/Centerblock/Centerblock';
import MainLayout from './components/MainLayout/MainLayout';
import { getTracks } from './services/tracks/tracksApi';
import { TrackType } from './sharedTypes/types';
import styles from './page.module.css';
import { getApiErrorMessage } from './utils/handleApiError';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => setTracks(res))
      .catch((error) => {
        setError(getApiErrorMessage(error, 'Ошибка при получении треков'));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <MainLayout showSkeleton={isLoading}>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <Centerblock tracks={tracks} isLoading={isLoading} title="Треки" />
      )}
    </MainLayout>
  );
}
