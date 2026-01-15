'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { modules } from './data/modules';

import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* Animated Background */}
      <div className={styles.bgGlow} aria-hidden />

      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className={styles.title}>
            EEE Learning Kit
          </h1>
          <p className={styles.subtitle}>
            An unofficial, complete resource for Electrical &amp; Electronic Engineering
            students at the University of Peradeniya.
          </p>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>{modules.length}</span>
            <span className={styles.statLabel}>Modules</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>50+</span>
            <span className={styles.statLabel}>Concepts</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>∞</span>
            <span className={styles.statLabel}>Practice</span>
          </div>
        </motion.div>
      </header>

      <section className={styles.grid} aria-label="Modules">
        {modules.map((module, index) => {
          const progress = typeof module.progress === 'number' ? module.progress : undefined;
          const moduleHref = `/${module.slug}`;
          const accent = module.accent ?? 'rgba(102, 170, 255, 0.85)';
          const safeProgress = progress === undefined ? 0 : Math.max(0, Math.min(100, progress));
          const updated = module.updatedToWeek
            ? `Updated to Week ${module.updatedToWeek}`
            : 'Coming soon';

          return (
            <motion.article
              key={module.id}
              className={styles.card}
              style={{ ['--module-accent' as never]: accent }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardGlow} aria-hidden />

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
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${safeProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                  />
                </div>
                <div className={styles.progressText}>{safeProgress}%</div>
              </div>

              <div className={styles.actions}>
                <Link className={styles.primary} href={moduleHref}>
                  <span>Open module</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Built with ❤️ for EEE students at UoP
        </p>
        <p className={styles.footerDisclaimer}>
          Unofficial resource • Not affiliated with the university
        </p>
      </footer>
    </>
  );
}
