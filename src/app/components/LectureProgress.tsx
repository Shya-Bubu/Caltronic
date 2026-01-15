'use client';

import { useEffect, useMemo, useState } from 'react';

import styles from './LectureProgress.module.css';

type ProgressState = {
  completedCount: number;
  percent: number;
  status: 'Not started' | 'In progress' | 'Complete';
  cta: 'Start' | 'Continue';
};

function safeParseCompletedCount(raw: string | null): number {
  if (!raw) return 0;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return 0;
    const obj = parsed as { completedIds?: unknown };
    if (!Array.isArray(obj.completedIds)) return 0;
    return obj.completedIds.filter((x) => typeof x === 'string').length;
  } catch {
    return 0;
  }
}

export default function LectureProgress({
  lectureId,
  conceptCount,
}: {
  lectureId: string;
  conceptCount: number;
}) {
  const storageKey = useMemo(() => {
    return `caltronic:lecture:${lectureId}:completion:v1`;
  }, [lectureId]);

  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const read = () => {
      setCompletedCount(safeParseCompletedCount(localStorage.getItem(storageKey)));
    };

    read();

    // Cross-tab updates
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) read();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [storageKey]);

  const state = useMemo<ProgressState>(() => {
    const total = Math.max(1, conceptCount);
    const done = Math.max(0, Math.min(completedCount, total));
    const percent = Math.round((done / total) * 100);

    if (done >= total) {
      return { completedCount: done, percent: 100, status: 'Complete', cta: 'Continue' };
    }
    if (done <= 0) {
      return { completedCount: done, percent: 0, status: 'Not started', cta: 'Start' };
    }
    return { completedCount: done, percent, status: 'In progress', cta: 'Continue' };
  }, [completedCount, conceptCount]);

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.status}>{state.status}</div>
        <div className={styles.count}>
          {state.completedCount}/{conceptCount}
        </div>
      </div>
      <div className={styles.bar} aria-hidden>
        <div className={styles.fill} style={{ width: `${state.percent}%` }} />
      </div>
    </div>
  );
}
