import Link from 'next/link';
import { modules } from './data/modules';

import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <header className={styles.hero}>
        <h1 className={styles.title}>EEE Learning Kit</h1>
        <p className={styles.subtitle}>
          An unofficial, complete resource for Electrical &amp; Electronic Engineering
          students at the University of Peradeniya.
        </p>
      </header>

      <section className={styles.grid} aria-label="Modules">
        {modules.map((module) => {
          const progress = typeof module.progress === 'number' ? module.progress : undefined;
          const moduleHref = `/${module.slug}`;
          const accent = module.accent ?? 'rgba(102, 170, 255, 0.85)';
          const safeProgress = progress === undefined ? 0 : Math.max(0, Math.min(100, progress));
          const updated = module.updatedToWeek
            ? `Nov 2025 · Updated to Week ${module.updatedToWeek}`
            : 'Nov 2025';

          return (
            <article
              key={module.id}
              className={styles.card}
              style={{ ['--module-accent' as never]: accent }}
            >
              {module.category && (
                <div className={styles.category}>{module.category}</div>
              )}

              <div className={styles.cardTop}>
                <h2 className={styles.moduleName}>
                  {module.id} — {module.title}
                </h2>
              </div>

              <div className={styles.meta}>{updated}</div>

              <div className={styles.progressRow} aria-label="Module progress">
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={safeProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={styles.progressFill} style={{ width: `${safeProgress}%` }} />
                </div>
                <div className={styles.progressText}>{safeProgress}%</div>
              </div>

              <div className={styles.actions}>
                <Link className={styles.primary} href={moduleHref}>
                  Open module
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}

