'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Centerblock from '../components/Centerblock/Centerblock';
import MainLayout from '../components/MainLayout/MainLayout';
import { getFavoriteTracks } from '../services/tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setFavoriteTracks } from '../redux/tracksSlice';
import styles from '../page.module.css';
import { getApiErrorMessage } from '../utils/handleApiError';

export default function FavoritesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { access } = useAppSelector((state) => state.auth);
  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!access) {
      router.push('/auth/signin');
      return;
    }

    getFavoriteTracks(access)
      .then((tracks) => {
        dispatch(setFavoriteTracks(tracks));
      })
      .catch((error) => {
        setError(getApiErrorMessage(error, 'Ошибка при получении избранного'));
      })
      .finally(() => setIsLoading(false));
  }, [access, dispatch, router]);

  if (error) {
    return (
      <MainLayout>
        <div className={styles.error}>{error}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showSkeleton={isLoading}>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <Centerblock
          tracks={favoriteTracks}
          title="Мои треки"
          isLoading={isLoading}
        />
      )}
    </MainLayout>
  );
}