'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { modules } from './data/modules';

import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          EEE Learning Kit
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          An unofficial, complete resource for Electrical &amp; Electronic Engineering
          students at the University of Peradeniya.
        </motion.p>
      </header>

      <section className={styles.grid} aria-label="Modules">
        {modules.map((module, index) => {
          const progress = typeof module.progress === 'number' ? module.progress : undefined;
          const moduleHref = `/${module.slug}`;
          const safeProgress = progress === undefined ? 0 : Math.max(0, Math.min(100, progress));
          const updated = module.updatedToWeek
            ? `Updated to Week ${module.updatedToWeek}`
            : 'Coming soon';

          return (
            <motion.article
              key={module.id}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
            >
              {module.category && (
                <div className={styles.category}>{module.category}</div>
              )}

              <h2 className={styles.moduleName}>
                {module.id} — {module.title}
              </h2>

              <p className={styles.meta}>{updated}</p>

              <div className={styles.progressRow}>
                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${safeProgress}%` }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
                  />
                </div>
                <span className={styles.progressText}>{safeProgress}%</span>
              </div>

              <Link className={styles.link} href={moduleHref}>
                Open module →
              </Link>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
}
