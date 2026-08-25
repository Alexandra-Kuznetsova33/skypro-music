import styles from './centerblock.module.css';
import TrackItem from './TrackItem/TrackItem';

export default function Centerblock() {
  const tracks = [
    {
      title: 'Guilt',
      author: 'Nero',
      album: 'Welcome Reality',
      time: '4:44',
    },
    {
      title: 'Elektro',
      author: 'Dynoro, Outwork, Mr. Gee',
      album: 'Elektro',
      time: '2:22',
    },
    {
      title: 'I’m Fire',
      author: 'Ali Bakgor',
      album: 'I’m Fire',
      time: '2:22',
    },
    {
      title: 'Non Stop',
      titleSpan: '(Remix)',
      author: 'Стоункат, Psychopath',
      album: 'Non Stop',
      time: '4:12',
    },
    {
      title: 'Run Run',
      titleSpan: '(feat. AR/CO)',
      author: 'Jaded, Will Clarke, AR/CO',
      album: 'Run Run',
      time: '2:54',
    },
  ];

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use href="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__button}>исполнителю</div>
        <div className={styles.filter__button}>году выпуска</div>
        <div className={styles.filter__button}>жанру</div>
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={`${styles.playlistTitle__col} ${styles.col01}`}>Трек</div>
          <div className={`${styles.playlistTitle__col} ${styles.col02}`}>Исполнитель</div>
          <div className={`${styles.playlistTitle__col} ${styles.col03}`}>Альбом</div>
          <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
            <svg className={styles.playlistTitle__svg}>
              <use href="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {tracks.map((track, index) => (
            <TrackItem key={index} {...track} />
          ))}
        </div>
      </div>
    </div>
  );
}