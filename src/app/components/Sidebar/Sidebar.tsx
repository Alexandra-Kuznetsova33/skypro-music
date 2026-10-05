'use client';
import Link from 'next/link';
import { useCallback } from 'react';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearCredentials } from '../../redux/authSlice';
import { clearFavoriteTracks } from '../../redux/tracksSlice';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = useCallback(() => {
    dispatch(clearCredentials());
    dispatch(clearFavoriteTracks());

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');

    if (pathname === '/favorites') {
      router.push('/');
    } else {
      router.refresh();
    }
  }, [dispatch, pathname, router]);
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {user?.username || 'Гость'}
        </p>
        <div className={styles.sidebar__icon} onClick={handleLogout}>
          <svg>
            <use href="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                fill
                sizes="250px"
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                fill
                sizes="250px"
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                fill
                sizes="250px"
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
