import styles from './trackItem.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack } from '../../../redux/playerSlice';
import { RootState } from '../../../redux/store';
import classNames from 'classnames';
import { TrackType } from '../../../sharedTypes/types';

interface TrackItemProps {
  track: TrackType;
  time: string;
}

export default function TrackItem({ track, time }: TrackItemProps) {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.player.currentTrack);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  const isCurrent = currentTrack?._id === track._id;
  const isPlayingCurrent = isCurrent && isPlaying;

  const handleClick = () => {
    dispatch(playTrack(track));
  };

  return (
    <div className={styles.playlist__item} onClick={handleClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use href="/img/icon/sprite.svg#icon-note"></use>
            </svg>
            {isCurrent && (
              <span
                className={classNames(styles.playingDot, {
                  [styles.pulsing]: isPlayingCurrent,
                })}
              />
            )}
          </div>
          <div className={styles.track__titleText}>
            <Link href="#" className={styles.track__titleLink}>
              {track.name}
              {track.album && <span className={styles.track__titleSpan}> ({track.album})</span>}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link href="#" className={styles.track__authorLink}>
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link href="#" className={styles.track__albumLink}>
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use href="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{time}</span>
        </div>
      </div>
    </div>
  );
}