'use client';

import Image from 'next/image';
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
  const logoHeight = mode === 'lecture' ? 24 : 28;

  return (
    <header className={mode === 'lecture' ? styles.headerLecture : styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label="CalTronic home">
            {/* Dark logo for dark and eye-comfort themes */}
            <Image
              src="/logo-dark.png"
              alt="CalTronic"
              width={logoHeight * 4}
              height={logoHeight}
              priority
              className={`${styles.logo} ${styles.logoDark}`}
            />
            {/* Light logo for light theme */}
            <Image
              src="/logo-light.png"
              alt="CalTronic"
              width={logoHeight * 4}
              height={logoHeight}
              priority
              className={`${styles.logo} ${styles.logoLight}`}
            />
          </Link>

          <div className={styles.divider} aria-hidden />

          <Breadcrumbs crumbs={crumbs} compact={mode === 'lecture'} />
        </div>

        <nav className={styles.right} aria-label="Top navigation">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
