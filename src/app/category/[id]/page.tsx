'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Centerblock from '../../components/Centerblock/Centerblock';
import MainLayout from '../../components/MainLayout/MainLayout';
import { getTracks, getSelectionById } from '../../services/tracks/tracksApi';
import { TrackType } from '../../sharedTypes/types';
import styles from '../../page.module.css';
import { getApiErrorMessage } from '../../utils/handleApiError';

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [title, setTitle] = useState<string | undefined>(undefined);
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
        setError(getApiErrorMessage(error, 'Ошибка при получении подборки'));
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <MainLayout showSkeleton={isLoading}>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <Centerblock tracks={tracks} title={title} isLoading={isLoading} />
      )}
    </MainLayout>
  );
}