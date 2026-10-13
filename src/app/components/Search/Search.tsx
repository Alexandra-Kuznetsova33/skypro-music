import styles from './search.module.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use href="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}