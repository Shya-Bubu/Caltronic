import Link from 'next/link';

import styles from './TopNav.module.css';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import ThemeToggle from './ThemeToggle';

export default function TopNav({
  mode,
  crumbs,
}: {
  mode: 'default' | 'lecture';
  crumbs: Crumb[];
}) {
  return (
    <header className={mode === 'lecture' ? styles.headerLecture : styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label="CalTronic home">
            <span className={styles.brandMark} aria-hidden>
              C
            </span>
            <span className={styles.brandText}>CalTronic</span>
          </Link>

          <div className={styles.divider} aria-hidden />

          <Breadcrumbs crumbs={crumbs} compact={mode === 'lecture'} />
        </div>

        <nav className={styles.right} aria-label="Top navigation">
          {mode === 'default' ? (
            <ThemeToggle />
          ) : (
            <Link href={crumbs[1]?.href ?? '/'} className={styles.navLink}>
              Back
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
