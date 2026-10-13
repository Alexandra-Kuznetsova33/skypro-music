'use client';

import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearCredentials } from '../../redux/authSlice';
import { clearFavoriteTracks } from '../../redux/tracksSlice';

interface SidebarProps {
  showSkeleton?: boolean;
}

const playlists = [
  { href: '/category/2', src: '/img/playlist01.png' },
  { href: '/category/3', src: '/img/playlist02.png' },
  { href: '/category/4', src: '/img/playlist03.png' },
];

export default function Sidebar({ showSkeleton = false }: SidebarProps) {
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
          {playlists.map((playlist) => (
            <div className={styles.sidebar__item} key={playlist.href}>
              {showSkeleton ? (
                <Skeleton
                  width={250}
                  height={150}
                  baseColor="#313131"
                  highlightColor="#4e4e4e"
                />
              ) : (
                <Link className={styles.sidebar__link} href={playlist.href}>
                  <Image
                    className={styles.sidebar__img}
                    src={playlist.src}
                    alt="day's playlist"
                    width={250}
                    height={150}
                    priority
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
