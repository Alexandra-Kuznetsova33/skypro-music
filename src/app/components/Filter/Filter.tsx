import classNames from 'classnames';
import styles from './filter.module.css';

interface FilterProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export default function Filter({
  label,
  isActive,
  onClick,
  count = 0,
}: FilterProps) {
  return (
    <div
      className={classNames(styles.filter__button, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {label}
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </div>
  );
}