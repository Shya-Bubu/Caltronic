"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { LectureContract } from '@/core/contracts/LectureContract';
import { useLectureFlow, type UseLectureFlowResult } from '@/core/flow';
import type { LoadedConcept } from '@/core/loaders';

import Button from './components/Button';
import MarkdownView from './components/MarkdownView';
import QuizView from './components/QuizView';
import FlashcardView from './components/FlashcardView';
import Tabs, { type TabItem } from './components/Tabs';
import SimulationEmbed from './components/SimulationEmbed';
import styles from './LectureClient.module.css';

type ViewKey =
    | 'intuition'
    | 'engineering'
    | 'mathematics'
    | 'exam'
    | 'quiz'
    | 'flashcards';
type LectureMode = 'overview' | 'concepts' | 'synthesis' | 'resources';

const VIEW_TABS: ReadonlyArray<TabItem<ViewKey>> = [
    { key: 'intuition', label: 'Intuition' },
    { key: 'engineering', label: 'Engineering' },
    { key: 'mathematics', label: 'Mathematics' },
    { key: 'exam', label: 'Exam' },
    { key: 'quiz', label: 'Quiz' },
    { key: 'flashcards', label: 'Flashcards' },
] as const;

const VIEW_ORDER: ReadonlyArray<ViewKey> = VIEW_TABS.map((t) => t.key);

function LectureEdgeScreen({
    title,
    subtitle,
    markdown,
    actions,
    actionsPosition = 'header',
}: {
    title: string;
    subtitle?: string;
    markdown: string;
    actions?: React.ReactNode;
    actionsPosition?: 'header' | 'footer';
}) {
    return (
        <section className={styles.viewer} aria-label={title}>
            <header className={styles.viewerHeader}>
                <div className={styles.viewerHeading}>
                    {subtitle ? <div className={styles.viewerKicker}>{subtitle}</div> : null}
                    <h2 className={styles.viewerTitle}>{title}</h2>
                </div>
                {actions && actionsPosition === 'header' ? (
                    <div className={styles.viewerControls}>{actions}</div>
                ) : null}
            </header>

            <div className={styles.contentShell}>
                <article className={styles.content}>
                    <MarkdownView markdown={markdown} />
                </article>
            </div>

            {actions && actionsPosition === 'footer' ? (
                <footer className={styles.viewerFooter}>
                    {actions}
                </footer>
            ) : null}
        </section>
    );
}

function ConceptSidebar({
    concepts,
    flow,
    mode,
    setMode,
    collapsed,
    onToggle,
}: {
    concepts: LoadedConcept[];
    flow: UseLectureFlowResult;
    mode: LectureMode;
    setMode: (m: LectureMode) => void;
    collapsed: boolean;
    onToggle: () => void;
}) {
    const isOverview = mode === 'overview';
    const isSynthesis = mode === 'synthesis';
    const isResources = mode === 'resources';

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`} aria-label="Concept list">
            <div className={styles.sidebarHeader}>
                <button
                    type="button"
                    className={styles.collapseBtn}
                    onClick={onToggle}
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? '→' : '←'}
                </button>
                {!collapsed && (
                    <>
                        <div className={styles.sidebarTitle}>Concepts</div>
                        <div className={styles.sidebarMeta}>
                            {mode === 'concepts' ? (
                                <>
                                    {flow.currentIndex + 1} / {flow.totalConcepts}
                                    {flow.isLectureComplete ? ' • Complete' : ''}
                                </>
                            ) : (
                                <>Lecture • {flow.totalConcepts} concepts</>
                            )}
                        </div>
                    </>
                )}
            </div>

            <ol className={styles.conceptList}>
                <li>
                    <button
                        type="button"
                        className={[styles.conceptRow, isOverview ? styles.conceptRowActive : '']
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => setMode('overview')}
                    >
                        <div
                            className={[styles.conceptStatus, styles.conceptStatusTodo]
                                .filter(Boolean)
                                .join(' ')}
                            aria-hidden
                        />
                        <div className={styles.conceptText}>
                            <div className={styles.conceptIndex}>0</div>
                            {!collapsed && <div className={styles.conceptTitle}>Overview</div>}
                        </div>
                    </button>
                </li>

                {concepts.map((concept, index) => {
                    const isActive = mode === 'concepts' && index === flow.currentIndex;
                    const isDone = flow.isConceptComplete(concept.id);

                    return (
                        <li key={concept.id}>
                            <button
                                type="button"
                                className={[
                                    styles.conceptRow,
                                    isActive ? styles.conceptRowActive : '',
                                    collapsed ? styles.conceptRowCollapsed : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                onClick={() => {
                                    setMode('concepts');
                                    flow.goToIndex(index);
                                }}
                                title={collapsed ? concept.title : undefined}
                            >
                                <div
                                    className={[
                                        styles.conceptStatus,
                                        isDone ? styles.conceptStatusDone : styles.conceptStatusTodo,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    aria-label={isDone ? 'Completed' : 'Incomplete'}
                                    title={isDone ? 'Completed' : 'Incomplete'}
                                />

                                <div className={styles.conceptText}>
                                    <div className={styles.conceptIndex}>{index + 1}</div>
                                    {!collapsed && <div className={styles.conceptTitle}>{concept.title}</div>}
                                </div>
                            </button>
                        </li>
                    );
                })}

                <li>
                    <button
                        type="button"
                        className={[styles.conceptRow, isSynthesis ? styles.conceptRowActive : '']
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => setMode('synthesis')}
                    >
                        <div
                            className={[styles.conceptStatus, styles.conceptStatusTodo]
                                .filter(Boolean)
                                .join(' ')}
                            aria-hidden
                        />
                        <div className={styles.conceptText}>
                            <div className={styles.conceptIndex}>•</div>
                            <div className={styles.conceptTitle}>Summary</div>
                        </div>
                    </button>
                </li>

                <li>
                    <button
                        type="button"
                        className={[styles.conceptRow, isResources ? styles.conceptRowActive : '']
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => setMode('resources')}
                    >
                        <div
                            className={[styles.conceptStatus, styles.conceptStatusTodo]
                                .filter(Boolean)
                                .join(' ')}
                            aria-hidden
                        />
                        <div className={styles.conceptText}>
                            <div className={styles.conceptIndex}>•</div>
                            <div className={styles.conceptTitle}>Resources</div>
                        </div>
                    </button>
                </li>
            </ol>
        </aside>
    );
}

// Map concept IDs to their respective simulation IDs
const CONCEPT_SIMULATION_MAP: Record<string, string> = {
    // Lesson 01 concepts
    'signal-and-system-foundations': 'system',
    'signal-classification-by-time': 'sampling',
    'deterministic-vs-random-signals': 'noise',
    'energy-and-power-signals': 'energy-power',
    'signal-sketching-basics': 'transform',

    // Lesson 02 concepts
    'impulse-and-unit-step': 'transform', // Shows step function and transformations
    'system-classification-modeling': 'sampling', // Shows continuous vs discrete
    'system-interconnections-feedback': 'system', // Shows system input/output

    // NOTE: Circuit Analysis simulations removed until proper circuit-specific ones are built
    // Circuit Analysis needs: v-i curve plotter, load-line analyzer, PWL simulator
};

function ConceptViewer({ flow }: { flow: UseLectureFlowResult }) {
    const concept = flow.currentConcept;
    const [activeView, setActiveView] = useState<ViewKey>('intuition');

    useEffect(() => {
        setActiveView('intuition');
    }, [concept?.id]);

    // Scroll to top when changing sections
    const handleViewChange = (newView: ViewKey) => {
        setActiveView(newView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const layerMarkdown = useMemo((): string => {
        if (!concept) return '';
        if (activeView === 'intuition') return concept.layers.intuition;
        if (activeView === 'engineering') return concept.layers.engineering;
        if (activeView === 'mathematics') return concept.layers.mathematics;
        if (activeView === 'exam') return concept.layers.exam;
        return '';
    }, [concept, activeView]);

    // Get simulation ID for this concept
    const simulationId = concept ? CONCEPT_SIMULATION_MAP[concept.id] : undefined;

    if (!concept) return null;

    const isComplete = flow.isConceptComplete(concept.id);
    const activeIndex = VIEW_ORDER.indexOf(activeView);

    // Navigation logic
    const isFirstSection = activeView === 'intuition';
    const isLastSection = activeView === 'flashcards';
    const canGoPrevLayer = activeIndex > 0;
    const canGoNextLayer = activeIndex >= 0 && activeIndex < VIEW_ORDER.length - 1;
    const canGoPrevConcept = flow.canGoPrevious;
    const canGoNextConcept = flow.canGoNext;

    // Previous button: go to prev section, or prev concept's flashcards if on intuition
    const handlePrevious = () => {
        if (isFirstSection) {
            // Go to previous concept (will start at intuition, but that's the reset behavior)
            if (flow.goPrevious()) {
                // After going to prev concept, jump to flashcards (last section)
                setActiveView('flashcards');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            handleViewChange(VIEW_ORDER[activeIndex - 1]!);
        }
    };

    // Next button: go to next section, or next concept's intuition if on flashcards
    const handleNext = () => {
        if (isLastSection) {
            // Mark current concept as complete when leaving flashcards
            flow.markConceptComplete(concept.id);
            // Go to next concept
            if (flow.goNext()) {
                // Scroll to the viewer header instead of page top
                setTimeout(() => {
                    const viewerHeader = document.querySelector('[aria-label="Concept content"]');
                    if (viewerHeader) {
                        viewerHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 50);
            }
        } else {
            handleViewChange(VIEW_ORDER[activeIndex + 1]!);
        }
    };

    // Button states
    const prevDisabled = isFirstSection ? !canGoPrevConcept : !canGoPrevLayer;
    const nextDisabled = isLastSection ? !canGoNextConcept : !canGoNextLayer;

    // Button labels
    const prevLabel = isFirstSection && canGoPrevConcept ? '← Prev Concept' : 'Previous';
    const nextLabel = isLastSection && canGoNextConcept ? 'Next Concept →' : 'Next';

    return (
        <section className={styles.viewer} aria-label="Concept content">
            <header className={styles.viewerHeader}>
                <div className={styles.viewerHeading}>
                    <div className={styles.viewerKicker}>
                        Concept {flow.currentIndex + 1} of {flow.totalConcepts}
                    </div>
                    <h2 className={styles.viewerTitle}>{concept.title}</h2>
                </div>

                <div className={styles.viewerControls}>
                    <Tabs items={VIEW_TABS} activeKey={activeView} onChange={handleViewChange} />
                </div>
            </header>

            <div className={styles.contentShell}>
                <article className={styles.content}>
                    {activeView === 'quiz' ? (
                        <QuizView quiz={concept.layers.quiz} />
                    ) : activeView === 'flashcards' ? (
                        <FlashcardView deck={concept.layers.flashcards} />
                    ) : (
                        <>
                            {/* Show simulation at top of Intuition view */}
                            {activeView === 'intuition' && simulationId && (
                                <SimulationEmbed simulationId={simulationId} />
                            )}
                            <MarkdownView markdown={layerMarkdown} visuals={concept.layers.visuals} />
                        </>
                    )}
                </article>
            </div>

            <footer className={styles.footer}>
                <div className={styles.navLeft}>
                    <Button
                        variant="secondary"
                        onClick={handlePrevious}
                        disabled={prevDisabled}
                    >
                        {prevLabel}
                    </Button>
                </div>

                {/* Exploration tracking replaces manual completion */}

                <div className={styles.navRight}>
                    <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={nextDisabled}
                    >
                        {nextLabel}
                    </Button>
                </div>
            </footer>
        </section>
    );
}

export default function LectureClient({
    lecture,
    concepts,
    overviewMarkdown,
    synthesisMarkdown,
    failedConcepts = [],
}: {
    lecture: LectureContract;
    concepts: LoadedConcept[];
    overviewMarkdown: string;
    synthesisMarkdown: string;
    failedConcepts?: Array<{ id: string; error: string }>;
}) {
    const flow = useLectureFlow({ lecture, concepts });
    const [mode, setMode] = useState<LectureMode>('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const storageKey = useMemo(() => {
        return `caltronic:lecture:${lecture.id}:completion:v1`;
    }, [lecture.id]);

    const hasHydratedCompletionRef = useRef(false);

    // Hydrate completion from localStorage once
    useEffect(() => {
        if (hasHydratedCompletionRef.current) return;
        hasHydratedCompletionRef.current = true;

        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) return;

            const parsed = JSON.parse(raw) as unknown;
            if (typeof parsed !== 'object' || parsed === null) return;
            const obj = parsed as { completedIds?: unknown };
            if (!Array.isArray(obj.completedIds)) return;

            const conceptIdSet = new Set(concepts.map((c) => c.id));
            for (const id of obj.completedIds) {
                if (typeof id !== 'string') continue;
                if (!conceptIdSet.has(id)) continue;
                flow.markConceptComplete(id);
            }
        } catch {
            // Ignore malformed localStorage
        }
    }, [storageKey, concepts, flow]);

    // Persist completion to localStorage when it changes
    useEffect(() => {
        if (!hasHydratedCompletionRef.current) return;

        try {
            const completedIds = Array.from(flow.completionStatus.keys());
            const payload = {
                version: 1,
                lectureId: lecture.id,
                completedIds,
                totalCount: concepts.length,
                updatedAt: Date.now(),
            };
            localStorage.setItem(storageKey, JSON.stringify(payload));
        } catch {
            // Ignore storage failures (e.g., quota)
        }
    }, [flow.completionStatus, lecture.id, storageKey, concepts.length]);

    useEffect(() => {
        // No enforced progression: completion updates are informational only.
    }, [flow.isLectureComplete]);

    return (
        <main className={styles.page}>
            <header className={styles.topbar}>
                <div className={styles.topbarInner}>
                    <h1 className={styles.lectureTitle}>{lecture.title}</h1>
                    <div className={styles.lectureMeta}>
                        {concepts.length} concepts • {Array.from(flow.completionStatus.values()).filter(Boolean).length} explored
                    </div>
                    <div className={styles.lessonMap}>
                        {concepts.map((concept, i) => (
                            <div
                                key={concept.id}
                                className={[
                                    styles.lessonMapDot,
                                    flow.isConceptComplete(concept.id) ? styles.lessonMapDotDone : '',
                                    mode === 'concepts' && i === flow.currentIndex ? styles.lessonMapDotActive : '',
                                ].filter(Boolean).join(' ')}
                                title={concept.title}
                            />
                        ))}
                    </div>
                </div>
            </header>

            <div className={`${styles.shell} ${sidebarCollapsed ? styles.shellCollapsed : ''}`}>
                <ConceptSidebar
                    concepts={concepts}
                    flow={flow}
                    mode={mode}
                    setMode={setMode}
                    collapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                {mode === 'overview' ? (
                    <LectureEdgeScreen
                        title="Overview"
                        subtitle={`Lecture • ${concepts.length} concepts`}
                        markdown={overviewMarkdown}
                        actionsPosition="footer"
                        actions={
                            <Button variant="primary" onClick={() => {
                                setMode('concepts');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                                Start
                            </Button>
                        }
                    />
                ) : mode === 'synthesis' ? (
                    <LectureEdgeScreen
                        title="Summary"
                        subtitle="Key takeaways and closure"
                        markdown={synthesisMarkdown}
                        actions={
                            <>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        try {
                                            localStorage.setItem(`caltronic:lesson:${lecture.id}:complete:v1`, 'true');
                                            alert(`${lecture.title} marked complete!`);
                                        } catch { /* ignore */ }
                                    }}
                                >
                                    Mark {lecture.title} Complete
                                </Button>
                            </>
                        }
                    />
                ) : mode === 'resources' ? (
                    <section className={styles.viewer} aria-label="Resources">
                        <header className={styles.viewerHeader}>
                            <div className={styles.viewerHeading}>
                                <div className={styles.viewerKicker}>External Materials</div>
                                <h2 className={styles.viewerTitle}>Resources</h2>
                            </div>
                        </header>
                        <div className={styles.contentShell}>
                            <article className={styles.content}>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                    Add resources by creating a <code>resources.txt</code> file in the lesson&apos;s <code>raw/</code> folder.
                                </p>
                                <div style={{ padding: '2rem', border: '1px dashed var(--border)', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ color: 'var(--text-muted)' }}>No resources have been added for this lesson yet.</p>
                                </div>
                            </article>
                        </div>
                    </section>
                ) : (
                    <ConceptViewer flow={flow} />
                )}
            </div>
        </main>
    );
}
