'use client';

import { useEffect, useRef, useState, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../redux/store';
import {
  togglePlay,
  setPlaying,
  nextTrack,
  prevTrack,
  toggleShuffle,
  toggleLoop,
  setVolume,
} from '../../redux/playerSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { formatDuration } from '../../utils/helpers';
import styles from './bar.module.css';
import { useLikeTrack } from '../../hooks/useLikeTrack';

export default function Bar() {
  const dispatch = useDispatch();
  const currentTrack = useSelector((s: RootState) => s.player.currentTrack);
  const isPlaying = useSelector((s: RootState) => s.player.isPlaying);
  const isPlayerVisible = useSelector((s: RootState) => s.player.isPlayerVisible);
  const playlist = useSelector((s: RootState) => s.player.playlist);
  const shuffle = useSelector((s: RootState) => s.player.shuffle);
  const loop = useSelector((s: RootState) => s.player.loop);
  const volume = useSelector((s: RootState) => s.player.volume);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { isLike, errorMsg, toggleLike } = useLikeTrack(currentTrack);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    if (audioRef.current.src !== currentTrack.track_file) {
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.load();
      setCurrentTime(0);
    }
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
    }
  }, [loop]);

  useEffect(() => {
    if (errorMsg) {
      console.warn('Ошибка лайка в плеере:', errorMsg);
    }
  }, [errorMsg]);

  const handlePlayPause = useCallback(() => dispatch(togglePlay()), [dispatch]);
  const handleNext = useCallback(() => dispatch(nextTrack()), [dispatch]);
  const handlePrev = useCallback(() => dispatch(prevTrack()), [dispatch]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }, []);

  const handleEnded = useCallback(() => {
    if (loop) return;
    const currentIndex = playlist.findIndex((t) => t._id === currentTrack?._id);
    if (shuffle || currentIndex < playlist.length - 1) {
      dispatch(nextTrack());
    } else {
      dispatch(setPlaying(false));
    }
  }, [loop, playlist, currentTrack, shuffle, dispatch]);

  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setVolume(Number(e.target.value)));
    },
    [dispatch],
  );

  if (!isPlayerVisible || !currentTrack) return null;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className={styles.bar__content}>
        <div className={styles.bar__progressBlock}>
          <span className={styles.bar__time}>{formatDuration(currentTime)}</span>
          <div className={styles.bar__progressWrapper}>
            <ProgressBar
              max={duration || 0}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
              readOnly={false}
            />
          </div>
          <span className={styles.bar__time}>{formatDuration(duration)}</span>
        </div>

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={handlePrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={`${styles.player__btnPlay} ${styles.btn}`}
                onClick={handlePlayPause}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    href={
                      isPlaying
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={handleNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon, {
                  [styles.active]: loop,
                })}
                onClick={() => dispatch(toggleLoop())}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnShuffle, styles.btnIcon, {
                  [styles.active]: shuffle,
                })}
                onClick={() => dispatch(toggleShuffle())}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use href="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use href="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <a className={styles.trackPlay__authorLink} href="#">
                    {currentTrack.name}
                  </a>
                </div>
                <div className={styles.trackPlay__album}>
                  <a className={styles.trackPlay__albumLink} href="#">
                    {currentTrack.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div
                  className={`${styles.trackPlay__like} ${styles.btnIcon}`}
                  onClick={toggleLike}
                >
                  <svg
                    className={classNames(styles.trackPlay__likeSvg, {
                      [styles.liked]: isLike,
                    })}
                  >
                    <use href="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={`${styles.trackPlay__dislike} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use href="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use href="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={`${styles.volume__progress} ${styles.btn}`}>
                <input
                  className={`${styles.volume__progressLine} ${styles.btn}`}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}