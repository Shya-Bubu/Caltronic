'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { modules } from './data/modules';

import styles from './page.module.css';

// Module colors for variety
const moduleColors = [
  { accent: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)' },   // Blue
  { accent: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },   // Violet
  { accent: '#06b6d4', bg: 'rgba(6, 182, 212, 0.08)' },    // Cyan
  { accent: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },   // Emerald
  { accent: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },   // Amber
  { accent: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },    // Red
];

export default function HomePage() {
  const gridRef = useRef<HTMLElement>(null);

  // Spotlight effect on mouse move
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = grid.querySelectorAll<HTMLElement>(`.${styles.card}`);
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    grid.addEventListener('mousemove', handleMouseMove);
    return () => grid.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        <div className={styles.gradientLine} />
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

      <section ref={gridRef} className={styles.grid} aria-label="Modules">
        {modules.map((module, index) => {
          const progress = typeof module.progress === 'number' ? module.progress : undefined;
          const moduleHref = `/${module.slug}`;
          const safeProgress = progress === undefined ? 0 : Math.max(0, Math.min(100, progress));
          const updated = module.updatedToWeek
            ? `Updated to Week ${module.updatedToWeek}`
            : 'Coming soon';
          const colorScheme = moduleColors[index % moduleColors.length];

          return (
            <motion.article
              key={module.id}
              className={styles.card}
              style={{ '--card-accent': colorScheme.accent, '--card-bg': colorScheme.bg } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: 'easeOut' }}
            >
              {/* Spotlight overlay */}
              <div className={styles.spotlight} />

              <div className={styles.cardContent}>
                {module.category && (
                  <div className={styles.category}>{module.category}</div>
                )}

                <h2 className={styles.moduleName}>
                  <span className={styles.moduleId}>{module.id}</span>
                  <span className={styles.moduleDash}>—</span>
                  {module.title}
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
                  <span>Open module</span>
                  <svg className={styles.linkIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
}
