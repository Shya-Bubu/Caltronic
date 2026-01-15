import styles from './Tabs.module.css';

export interface TabItem<T extends string> {
  key: T;
  label: string;
}

export interface TabsProps<T extends string> {
  items: ReadonlyArray<TabItem<T>>;
  activeKey: T;
  onChange: (key: T) => void;
}

export default function Tabs<T extends string>({ items, activeKey, onChange }: TabsProps<T>) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Concept layers">
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            type="button"
            className={[styles.tab, isActive ? styles.active : ''].filter(Boolean).join(' ')}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.key)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
