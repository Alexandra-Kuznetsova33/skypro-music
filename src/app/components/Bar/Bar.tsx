'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { togglePlay, setPlaying } from '../../redux/playerSlice';
import styles from './bar.module.css';

export default function Bar() {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.player.currentTrack);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const isPlayerVisible = useSelector((state: RootState) => state.player.isPlayerVisible);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  if (!audioRef.current || !currentTrack) return;

  if (audioRef.current.src !== currentTrack.track_file) {
    audioRef.current.src = currentTrack.track_file;
    audioRef.current.load();
  }

  if (isPlaying) {
    audioRef.current.play();
  } else {
    audioRef.current.pause();
  }
}, [currentTrack, isPlaying]);

  if (!isPlayerVisible || !currentTrack) {
    return null;
  }

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const handleEnded = () => {
    dispatch(setPlaying(false));
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        onEnded={handleEnded}
      />
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={`${styles.player__btnPlay} ${styles.btn}`} onClick={handlePlayPause}>
                <svg className={styles.player__btnPlaySvg}>
                  <use href={isPlaying ? '/img/icon/sprite.svg#icon-pause' : '/img/icon/sprite.svg#icon-play'}></use>
                </svg>
              </div>
              <div className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div className={`${styles.player__btnRepeat} ${styles.btnIcon}`}>
                <svg className={styles.player__btnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={`${styles.player__btnShuffle} ${styles.btnIcon}`}>
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
                <div className={`${styles.trackPlay__like} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlay__likeSvg}>
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
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}