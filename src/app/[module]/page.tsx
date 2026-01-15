import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolve } from 'path';

import { modules } from '@/app/data/modules';
import LectureProgress from '@/app/components/LectureProgress';
import { loadLecture } from '@/core/loaders/loadLecture';
import styles from './page.module.css';

interface ModuleIndexProps {
  params: Promise<{ module: string }>;
}

export default async function ModuleIndexPage({ params }: ModuleIndexProps) {
  const { module: slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const hasLectures = mod.lectures.length > 0;

  const contentRoot = resolve(process.cwd(), 'src', 'content');

  const lectureCards = await Promise.all(
    mod.lectures.map(async (lecture) => {
      const lectureSlug = lecture.path.split('/').filter(Boolean).at(1) ?? lecture.id;
      const lectureDir = resolve(contentRoot, slug, 'lessons', lectureSlug);
      const meta = await loadLecture(lectureDir);
      return {
        link: lecture,
        lectureId: meta.id,
        conceptCount: meta.concepts.length,
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

      <section className={styles.section} aria-label="Lectures">
        <h2 className={styles.sectionTitle}>Lectures</h2>

        {hasLectures ? (
          <div className={styles.lectures}>
            {lectureCards.map((card) => (
              <article key={card.link.id} className={styles.lectureCard}>
                <div className={styles.lectureTop}>
                  <div>
                    <div className={styles.lectureTitle}>{card.link.title}</div>
                    <div className={styles.lectureMeta}>
                      {card.conceptCount} concepts
                    </div>
                  </div>
                  <div className={styles.lectureProgress}>
                    <LectureProgress lectureId={card.lectureId} conceptCount={card.conceptCount} />
                  </div>
                </div>

                <div className={styles.lectureActions}>
                  <Link href={card.link.path} className={styles.primary}>
                    Open
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>No lectures have been published for this module yet.</div>
        )}
      </section>
    </>
  );
}
