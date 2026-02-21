import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolve } from 'path';

import { modules } from '@/app/data/modules';
import LectureProgress from '@/app/components/LectureProgress';
import { safeLoadLecture, lessonDirectoryExists } from '@/core/loaders';
import styles from './page.module.css';

interface ModuleIndexProps {
  params: Promise<{ module: string }>;
}

interface LectureCardData {
  link: { id: string; title: string; path: string };
  lectureId: string;
  conceptCount: number;
  available: boolean;
  error?: string;
}

export default async function ModuleIndexPage({ params }: ModuleIndexProps) {
  const { module: slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const hasLectures = mod.lectures.length > 0;

  const contentRoot = resolve(process.cwd(), 'src', 'content');

  // Safe loading with graceful fallbacks
  const lectureCards: LectureCardData[] = await Promise.all(
    mod.lectures.map(async (lecture) => {
      const lectureSlug = lecture.path.split('/').filter(Boolean).at(1) ?? lecture.id;
      const lectureDir = resolve(contentRoot, slug, 'lessons', lectureSlug);

      // Check if directory exists first
      if (!lessonDirectoryExists(contentRoot, slug, lectureSlug)) {
        return {
          link: lecture,
          lectureId: lecture.id,
          conceptCount: 0,
          available: false,
          error: 'Content not yet created',
        };
      }

      // Try to load the lecture
      const result = await safeLoadLecture(lectureDir);

      if (result.success && result.data) {
        return {
          link: lecture,
          lectureId: result.data.id,
          conceptCount: result.data.concepts.length,
          available: true,
        };
      }

      // Fallback for invalid/incomplete content
      return {
        link: lecture,
        lectureId: lecture.id,
        conceptCount: 0,
        available: false,
        error: result.error || 'Content unavailable',
      };
    })
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.kicker}>{mod.id}</div>
        <h1 className={styles.title}>{mod.title}</h1>
        <p className={styles.subtitle}>{mod.description ?? 'Lecture list and progress.'}</p>
      </header>

      {typeof mod.progress === 'number' ? (
        <section className={styles.progress} aria-label="Module progress">
          <div className={styles.progressRow}>
            <div className={styles.progressLabel}>Progress</div>
            <div className={styles.progressValue}>{mod.progress}%</div>
          </div>
          <div className={styles.progressBar} aria-hidden>
            <div className={styles.progressFill} style={{ width: `${mod.progress}%` }} />
          </div>
        </section>
      ) : null}

      <section className={styles.section} aria-label="Lessons">
        <h2 className={styles.sectionTitle}>Lessons</h2>

        {hasLectures ? (
          <div className={styles.lectures}>
            {lectureCards.map((card) => {
              // Extract number from ID (e.g. "lesson-01" -> "01")
              const lessonNum = card.link.id.match(/\d+/)?.[0] || '00';
              const isLab = card.link.id.startsWith('lab-');
              const kickerLabel = isLab ? `Lab ${lessonNum}` : `Lesson ${lessonNum}`;

              return (
                <article
                  key={card.link.id}
                  className={`${styles.lectureCard} ${!card.available ? styles.lectureCardUnavailable : ''}`}
                >
                  <div className={styles.lectureNumber}>
                    {lessonNum}
                  </div>
                  <div className={styles.lectureInfo}>
                    <div className={styles.lectureKicker}>{kickerLabel}</div>
                    <div className={styles.lectureTitle}>{card.link.title}</div>
                    <div className={styles.lectureMeta}>
                      {card.available
                        ? `${card.conceptCount} concepts`
                        : card.error || 'Content not available'}
                    </div>
                  </div>
                  <div className={styles.lectureProgress}>
                    {card.available ? (
                      <LectureProgress lectureId={card.lectureId} conceptCount={card.conceptCount} />
                    ) : (
                      <span className={styles.unavailableBadge}>Coming Soon</span>
                    )}
                  </div>
                  <div className={styles.lectureActions}>
                    {card.available ? (
                      <Link href={card.link.path} className={styles.primary}>
                        Open
                      </Link>
                    ) : (
                      <span className={styles.disabled}>Not Available</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>No lessons have been published for this module yet.</div>
        )}
      </section>
    </>
  );
}
