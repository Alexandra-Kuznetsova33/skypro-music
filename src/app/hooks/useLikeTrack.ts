'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addLikedTracks,
  removeLikedTracks,
} from '../redux/tracksSlice';
import { addLike, removeLike } from '../services/tracks/tracksApi';
import { withReauth } from '../utils/withReauth';
import { TrackType } from '../sharedTypes/types';

interface UseLikeTrackReturn {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
}

export const useLikeTrack = (track: TrackType | null): UseLikeTrackReturn => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!track) return;

    if (!access) {
      setErrorMsg('Нет авторизации');
      return;
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);

    withReauth(
      (newToken) => actionApi(newToken || access, track._id),
      refresh,
      dispatch,
    )
      .then(() => {
        dispatch(actionSlice(track));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMsg(error.response.data?.message || 'Ошибка при лайке');
          } else if (error.request) {
            setErrorMsg('Произошла ошибка. Попробуйте позже');
          } else {
            setErrorMsg('Неизвестная ошибка');
          }
        } else {
          setErrorMsg('Неизвестная ошибка');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, errorMsg, toggleLike, isLike };
};