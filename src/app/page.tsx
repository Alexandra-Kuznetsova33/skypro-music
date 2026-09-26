'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Centerblock from './components/Centerblock/Centerblock';
import MainLayout from './components/MainLayout/MainLayout';
import { getTracks } from './services/tracks/tracksApi';
import { TrackType } from './sharedTypes/types';
import styles from './page.module.css';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => setTracks(res))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data?.message || 'Ошибка при получении треков');
          } else if (error.request) {
            setError('Нет соединения с сервером');
          } else {
            setError('Неизвестная ошибка');
          }
        } else {
          setError('Неизвестная ошибка');
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <div className={styles.loading}>Загрузка треков...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <Centerblock tracks={tracks} />
      )}
    </MainLayout>
  );
}