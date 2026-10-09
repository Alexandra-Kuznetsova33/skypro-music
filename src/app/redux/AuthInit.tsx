'use client';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { setCredentials } from './authSlice';

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
      } catch {

      }
    }
  }, [dispatch]);

  return <>{children}</>;
}