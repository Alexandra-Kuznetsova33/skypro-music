import classNames from 'classnames';
import styles from './filter.module.css';

interface FilterProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Filter({ label, isActive, onClick }: FilterProps) {
  return (
    <div
      className={classNames(styles.filter__button, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {label}
    </div>
  );
}