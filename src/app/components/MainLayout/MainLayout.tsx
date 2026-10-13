'use client';

import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Bar from '../Bar/Bar';
import styles from './mainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  showSkeleton?: boolean;
}

export default function MainLayout({
  children,
  showSkeleton = false,
}: MainLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Sidebar showSkeleton={showSkeleton} />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
