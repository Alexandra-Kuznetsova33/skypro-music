'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Centerblock from '../components/Centerblock/Centerblock';
import MainLayout from '../components/MainLayout/MainLayout';
import { getFavoriteTracks } from '../services/tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setFavoriteTracks } from '../redux/tracksSlice';
import styles from '../page.module.css';

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
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data?.message || 'Ошибка при получении избранного');
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
  }, [access, dispatch, router]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Загрузка избранного...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className={styles.error}>{error}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Centerblock tracks={favoriteTracks} title="Мои треки" />
    </MainLayout>
  );
}