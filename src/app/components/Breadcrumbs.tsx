import Link from 'next/link';

import { modules } from '../data/modules';
import styles from './Breadcrumbs.module.css';

export type Crumb = {
  label: string;
  href: string;
};

function findModuleBySlug(slug: string) {
  return modules.find((m) => m.slug === slug);
}

function findLectureTitle(moduleSlug: string, lectureSlug: string) {
  const mod = findModuleBySlug(moduleSlug);
  if (!mod) return undefined;
  const hit = mod.lectures.find((l) => l.path === `/${moduleSlug}/${lectureSlug}`);
  return hit?.title;
}

export default function Breadcrumbs({
  crumbs,
  compact,
}: {
  crumbs: Crumb[];
  compact?: boolean;
}) {
  if (crumbs.length <= 1) {
    return <div className={compact ? styles.compact : styles.row} />;
  }

  return (
    <nav className={compact ? styles.compact : styles.row} aria-label="Breadcrumb">
      {crumbs.map((c, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={c.href} className={styles.crumb}>
            {idx > 0 ? <span className={styles.sep}>/</span> : null}
            {isLast ? (
              <span className={styles.current} title={c.label}>
                {c.label}
              </span>
            ) : (
              <Link href={c.href} className={styles.link}>
                {c.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function buildCrumbs(pathname: string): Crumb[] {
  const parts = pathname.split('/').filter(Boolean);

  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
  if (parts.length === 0) return crumbs;

  const moduleSlug = parts[0];
  const mod = findModuleBySlug(moduleSlug);
  crumbs.push({
    label: mod ? mod.title : moduleSlug,
    href: `/${moduleSlug}`,
  });

  if (parts.length >= 2) {
    const lectureSlug = parts[1];
    const title = findLectureTitle(moduleSlug, lectureSlug);
    crumbs.push({
      label: title ?? lectureSlug,
      href: `/${moduleSlug}/${lectureSlug}`,
    });
  }

  return crumbs;
}
