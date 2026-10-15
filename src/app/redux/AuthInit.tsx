'use client';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { setCredentials, setInitialized } from './authSlice';
import { setFavoriteTracks } from './tracksSlice';
import { getFavoriteTracks } from '../services/tracks/tracksApi';
import { withReauth } from '../utils/withReauth';

export default function AuthInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userRaw = localStorage.getItem('user');

    if (access && refresh && userRaw) {
      try {
        const user = JSON.parse(userRaw);
        dispatch(setCredentials({ tokens: { access, refresh }, user }));
        dispatch(setInitialized());

        withReauth(
          (newToken) => getFavoriteTracks(newToken || access),
          refresh,
          dispatch,
        )
          .then((tracks) => {
            dispatch(setFavoriteTracks(tracks));
          })
          .catch(() => {
          });
      } catch {
        dispatch(setInitialized());
      }
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);

  return <>{children}</>;
}