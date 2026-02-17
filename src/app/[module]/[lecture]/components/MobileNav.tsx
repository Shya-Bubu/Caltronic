'use client';

import { useState, useCallback, useEffect } from 'react';
import type { LoadedConcept } from '@/core/loaders';
import type { UseLectureFlowResult } from '@/core/flow';
import styles from './MobileNav.module.css';

type LectureMode = 'overview' | 'concepts' | 'synthesis' | 'resources';

interface MobileNavProps {
    concepts: LoadedConcept[];
    flow: UseLectureFlowResult;
    mode: LectureMode;
    setMode: (m: LectureMode) => void;
    onPrevious: () => void;
    onNext: () => void;
    canGoPrev: boolean;
    canGoNext: boolean;
}

export default function MobileNav({
    concepts,
    flow,
    mode,
    setMode,
    onPrevious,
    onNext,
    canGoPrev,
    canGoNext,
}: MobileNavProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Close drawer on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDrawerOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [drawerOpen]);

    const handleConceptSelect = useCallback((index: number) => {
        setMode('concepts');
        flow.goToIndex(index);
        setDrawerOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setMode, flow]);

    const handleModeSelect = useCallback((newMode: LectureMode) => {
        setMode(newMode);
        setDrawerOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setMode]);

    // Calculate progress
    const completedCount = Array.from(flow.completionStatus.values()).filter(Boolean).length;
    const totalCount = concepts.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    // Current position label
    const getPositionLabel = () => {
        if (mode === 'overview') return 'Overview';
        if (mode === 'synthesis') return 'Summary';
        if (mode === 'resources') return 'Resources';
        return `${flow.currentIndex + 1} / ${totalCount}`;
    };

    return (
        <>
            {/* Overlay */}
            <div 
                className={`${styles.drawerOverlay} ${drawerOpen ? styles.drawerOverlayVisible : ''}`}
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.drawerHandle}>
                    <div className={styles.drawerHandleBar} />
                </div>
                
                <div className={styles.drawerHeader}>
                    <div>
                        <div className={styles.drawerTitle}>Concepts</div>
                        <div className={styles.drawerMeta}>
                            {completedCount} of {totalCount} explored
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.drawerCloseBtn}
                        onClick={() => setDrawerOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.drawerContent}>
                    {/* Overview */}
                    <div className={styles.drawerSection}>Lecture</div>
                    <button
                        type="button"
                        className={`${styles.conceptItem} ${mode === 'overview' ? styles.conceptItemActive : ''}`}
                        onClick={() => handleModeSelect('overview')}
                    >
                        <span className={styles.conceptNumber}>0</span>
                        <span className={styles.conceptName}>Overview</span>
                    </button>

                    {/* Concepts */}
                    <div className={styles.drawerSection}>Concepts</div>
                    {concepts.map((concept, index) => {
                        const isActive = mode === 'concepts' && index === flow.currentIndex;
                        const isDone = flow.isConceptComplete(concept.id);

                        return (
                            <button
                                key={concept.id}
                                type="button"
                                className={`${styles.conceptItem} ${isActive ? styles.conceptItemActive : ''} ${isDone ? styles.conceptItemDone : ''}`}
                                onClick={() => handleConceptSelect(index)}
                            >
                                <span className={styles.conceptNumber}>{index + 1}</span>
                                <span className={styles.conceptName}>{concept.title}</span>
                                {isDone && (
                                    <svg className={styles.conceptCheck} viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}

                    {/* Summary & Resources */}
                    <div className={styles.drawerSection}>Wrap-up</div>
                    <button
                        type="button"
                        className={`${styles.conceptItem} ${mode === 'synthesis' ? styles.conceptItemActive : ''}`}
                        onClick={() => handleModeSelect('synthesis')}
                    >
                        <span className={styles.conceptNumber}>•</span>
                        <span className={styles.conceptName}>Summary</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.conceptItem} ${mode === 'resources' ? styles.conceptItemActive : ''}`}
                        onClick={() => handleModeSelect('resources')}
                    >
                        <span className={styles.conceptNumber}>•</span>
                        <span className={styles.conceptName}>Resources</span>
                    </button>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
                <div className={styles.navInner}>
                    {/* Previous Button */}
                    <button
                        type="button"
                        className={styles.arrowBtn}
                        onClick={onPrevious}
                        disabled={!canGoPrev}
                        aria-label="Previous"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="none">
                            <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Menu / Progress Center */}
                    <button
                        type="button"
                        className={`${styles.menuBtn} ${drawerOpen ? styles.menuBtnActive : ''}`}
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open concept menu"
                        aria-expanded={drawerOpen}
                    >
                        <svg className={styles.menuIcon} viewBox="0 0 20 20" fill="none">
                            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className={styles.menuLabel}>{getPositionLabel()}</span>
                    </button>

                    {/* Progress Bar */}
                    <div className={styles.progressCenter}>
                        <span className={styles.progressLabel}>Progress</span>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill} 
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        type="button"
                        className={styles.arrowBtn}
                        onClick={onNext}
                        disabled={!canGoNext}
                        aria-label="Next"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="none">
                            <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </nav>
        </>
    );
}
