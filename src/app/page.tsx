import Navigation from './components/Navigation/Navigation';
import Centerblock from './components/Centerblock/Centerblock';
import Sidebar from './components/Sidebar/Sidebar';
import Bar from './components/Bar/Bar';
import styles from './page.module.css';
import { data } from './data';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock tracks={data} />
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}