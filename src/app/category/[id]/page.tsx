'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import Centerblock from '../../components/Centerblock/Centerblock';
import MainLayout from '../../components/MainLayout/MainLayout';
import { getTracks, getSelectionById } from '../../services/tracks/tracksApi';
import { TrackType } from '../../sharedTypes/types';
import styles from '../../page.module.css';

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState('Треки');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([getSelectionById(id), getTracks()])
      .then(([selection, allTracks]) => {
        const selectionTracks = allTracks.filter((track) =>
          selection.items.includes(track._id),
        );
        setTracks(selectionTracks);
        setTitle(selection.name || 'Треки');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data?.message || 'Ошибка при получении подборки');
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
  }, [id]);

  return (
    <MainLayout>
      {isLoading ? (
        <div className={styles.loading}>Загрузка подборки...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <Centerblock tracks={tracks} title={title} />
      )}
    </MainLayout>
  );
}