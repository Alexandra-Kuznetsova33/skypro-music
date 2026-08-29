import styles from './filterItem.module.css';

interface FilterItemProps {
  item: string;
}

export default function FilterItem({ item }: FilterItemProps) {
  return <li className={styles.filter__item}>{item}</li>;
}