import styles from './filterItem.module.css';

interface FilterItemProps {
  item: string;
  onClick: (item: string) => void;
  isSelected?: boolean;
}

export default function FilterItem({
  item,
  onClick,
  isSelected = false,
}: FilterItemProps) {
  return (
    <li
      className={`${styles.filter__item} ${isSelected ? styles.selected : ''}`}
      onClick={() => onClick(item)}
    >
      {item}
    </li>
  );
}