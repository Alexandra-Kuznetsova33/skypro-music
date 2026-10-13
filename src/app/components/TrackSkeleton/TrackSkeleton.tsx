'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './trackSkeleton.module.css';

export default function TrackSkeleton() {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <Skeleton
            width={51}
            height={51}
            baseColor="#313131"
            highlightColor="#4e4e4e"
          />
          <Skeleton
            width={180}
            height={16}
            baseColor="#313131"
            highlightColor="#4e4e4e"
          />
        </div>
        <div className={styles.track__author}>
          <Skeleton
            width={120}
            height={16}
            baseColor="#313131"
            highlightColor="#4e4e4e"
          />
        </div>
        <div className={styles.track__album}>
          <Skeleton
            width={100}
            height={16}
            baseColor="#313131"
            highlightColor="#4e4e4e"
          />
        </div>
        <div className={styles.track__time}>
          <Skeleton
            width={40}
            height={16}
            baseColor="#313131"
            highlightColor="#4e4e4e"
          />
        </div>
      </div>
    </div>
  );
}