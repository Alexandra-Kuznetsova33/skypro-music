'use client';

import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Bar from '../Bar/Bar';
import styles from './mainLayout.module.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}