'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import TopNav from './TopNav';
import { buildCrumbs, type Crumb } from './Breadcrumbs';
import styles from './AppChrome.module.css';

function isLecturePath(pathname: string) {
  // /: false
  // /[module]: false
  // /[module]/[lecture]: true
  const parts = pathname.split('/').filter(Boolean);
  return parts.length >= 2;
}

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const lectureMode = isLecturePath(pathname);

  const crumbs = useMemo<Crumb[]>(() => {
    return buildCrumbs(pathname);
  }, [pathname]);

  return (
    <div className={styles.root}>
      <TopNav mode={lectureMode ? 'lecture' : 'default'} crumbs={crumbs} />
      <div className={lectureMode ? styles.lectureShell : styles.shell}>
        <main className={lectureMode ? styles.lectureMain : styles.main}>{children}</main>
        {!lectureMode ? (
          <footer className={styles.footer} aria-label="Site note">
            Powered by 22 Jila · Made with AI — may contain inaccuracies · Built for academic study, not official use
          </footer>
        ) : null}
      </div>
    </div>
  );
}
