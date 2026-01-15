/**
 * LECTURE FLOW HOOK
 * 
 * PURPOSE:
 * Controls the learning experience by managing concept-by-concept progression.
 * This is the STATE MACHINE for lecture navigation.
 * 
 * PHILOSOPHY:
 * - One concept at a time (no infinite scroll)
 * - Progress is tracked, not enforced
 * - Deterministic and predictable
 * - No UI concerns (pure state logic)
 * 
 * RULES:
 * - Can always navigate between concepts
 * - Completion is tracked per concept
 * - Lecture is complete when ALL concepts are complete
 */

import { useState, useMemo, useCallback } from 'react';
import { LectureContract } from '../contracts/LectureContract';
import { LoadedConcept } from '../loaders/loadConcept';

/**
 * Input parameters for useLectureFlow hook
 */
export interface UseLectureFlowParams {
    /**
     * Lecture metadata (must have ≥3 concepts)
     */
    lecture: LectureContract;

    /**
     * Loaded concept data (must match lecture.concepts array)
     * Order matters - concepts[0] corresponds to lecture.concepts[0]
     */
    concepts: LoadedConcept[];
}

/**
 * Return type of useLectureFlow hook
 */
export interface UseLectureFlowResult {
    /**
     * Currently active concept (null if no concepts)
     */
    currentConcept: LoadedConcept | null;

    /**
     * Current concept index (0-based)
     */
    currentIndex: number;

    /**
     * Total number of concepts in lecture
     */
    totalConcepts: number;

    /**
     * Map of concept ID → completion status
     * Only completed concepts are present (missing = incomplete)
     */
    completionStatus: Map<string, boolean>;

    /**
     * Whether the lecture is fully complete (all concepts done)
     */
    isLectureComplete: boolean;

    /**
     * Check if a specific concept is marked complete
     */
    isConceptComplete: (conceptId: string) => boolean;

    /**
     * Mark a concept as complete
     * This unlocks the ability to advance to next concept
     */
    markConceptComplete: (conceptId: string) => void;

    /**
     * Jump to a specific concept index (0-based)
     * RULE: Always allowed (free navigation)
     */
    goToIndex: (index: number) => boolean;

    /**
     * Advance to next concept
        * RULE: Always allowed if not at end
     * @returns boolean - true if advanced, false if blocked
     */
    goNext: () => boolean;

    /**
     * Go back to previous concept
        * RULE: Always allowed if not at start
     * @returns boolean - true if moved, false if already at start
     */
    goPrevious: () => boolean;

    /**
     * Check if can advance to next concept
        * (not at end)
     */
    canGoNext: boolean;

    /**
     * Check if can go to previous concept
     * (not at start)
     */
    canGoPrevious: boolean;
}

/**
 * Learning flow state machine hook
 * 
 * USAGE PATTERN:
 * 1. Load lecture and concepts using loaders
 * 2. Pass to this hook
 * 3. Hook manages navigation and completion state
 * 4. UI calls goNext(), goPrevious(), markConceptComplete()
 * 5. UI renders currentConcept
 * 
 * STATE TRANSITIONS:
 * - Initial: currentIndex = 0, no concepts complete
 * - User marks concept complete → updates completion state
 * - goToIndex()/goNext()/goPrevious() → updates currentIndex (if allowed)
 * 
 * @param params - Lecture and loaded concepts
 * @returns Flow control interface
 */
export function useLectureFlow(params: UseLectureFlowParams): UseLectureFlowResult {
    const { lecture, concepts } = params;

    // Validate input (development-time check)
    if (concepts.length !== lecture.concepts.length) {
        throw new Error(
            `Concept count mismatch: lecture has ${lecture.concepts.length} concepts, ` +
            `but ${concepts.length} were loaded. This indicates a loader error.`
        );
    }

    if (concepts.length === 0) {
        throw new Error(
            'Lecture has no concepts. This should be impossible (LectureContract requires ≥3).'
        );
    }

    // STATE: Current concept index (0-based)
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // STATE: Concept completion tracking
    // Map<conceptId, true> (only completed concepts are in the map)
    const [completionStatus, setCompletionStatus] = useState<Map<string, boolean>>(
        () => new Map()
    );

    // DERIVED: Current concept
    const currentConcept = useMemo(() => {
        return concepts[currentIndex] || null;
    }, [concepts, currentIndex]);

    // DERIVED: Total concepts
    const totalConcepts = concepts.length;

    // DERIVED: Is lecture complete (all concepts marked complete)
    const isLectureComplete = useMemo(() => {
        return concepts.every(concept => completionStatus.has(concept.id));
    }, [concepts, completionStatus]);

    // DERIVED: Can go next
    // Requires: Not at end
    const canGoNext = useMemo(() => {
        if (!currentConcept) return false;
        if (currentIndex >= totalConcepts - 1) return false; // At end
        return true;
    }, [currentConcept, currentIndex, totalConcepts]);

    // DERIVED: Can go previous
    // Always allowed if not at start (can review)
    const canGoPrevious = useMemo(() => {
        return currentIndex > 0;
    }, [currentIndex]);

    // ACTION: Check if concept is complete
    const isConceptComplete = useCallback((conceptId: string): boolean => {
        return completionStatus.has(conceptId);
    }, [completionStatus]);

    // ACTION: Mark concept as complete
    const markConceptComplete = useCallback((conceptId: string): void => {
        setCompletionStatus(prev => {
            // Immutable update - create new Map
            const next = new Map(prev);
            next.set(conceptId, true);
            return next;
        });
    }, []);

    // ACTION: Jump to specific concept index
    const goToIndex = useCallback((index: number): boolean => {
        if (!Number.isFinite(index)) return false;
        const nextIndex = Math.max(0, Math.min(totalConcepts - 1, Math.floor(index)));
        if (nextIndex === currentIndex) return false;
        setCurrentIndex(nextIndex);
        return true;
    }, [currentIndex, totalConcepts]);

    // ACTION: Advance to next concept
    // RULE: Always allowed if not at end
    const goNext = useCallback((): boolean => {
        if (!canGoNext) {
            // Blocked: already at end
            return false;
        }

        setCurrentIndex(prev => prev + 1);
        return true;
    }, [canGoNext]);

    // ACTION: Go to previous concept
    // RULE: Always allowed (can review)
    const goPrevious = useCallback((): boolean => {
        if (!canGoPrevious) {
            // Already at start
            return false;
        }

        setCurrentIndex(prev => prev - 1);
        return true;
    }, [canGoPrevious]);

    // RETURN: Flow control interface
    return {
        currentConcept,
        currentIndex,
        totalConcepts,
        completionStatus,
        isLectureComplete,
        isConceptComplete,
        markConceptComplete,
        goToIndex,
        goNext,
        goPrevious,
        canGoNext,
        canGoPrevious,
    };
}

/**
 * USAGE EXAMPLE:
 * 
 * ```typescript
 * function LecturePage() {
 *   // 1. Load lecture and concepts (using loaders)
 *   const lecture = await loadLecture('/content/lectures/lecture-01');
 *   const concepts = await Promise.all(
 *     lecture.concepts.map(id => loadConcept(`/content/concepts/${id}`))
 *   );
 *   
 *   // 2. Initialize flow hook
 *   const flow = useLectureFlow({ lecture, concepts });
 *   
 *   // 3. Render current concept
 *   if (!flow.currentConcept) return <div>No concepts</div>;
 *   
 *   return (
 *     <div>
 *       <h1>{flow.currentConcept.title}</h1>
 *       <p>Concept {flow.currentIndex + 1} of {flow.totalConcepts}</p>
 *       
 *       // Render concept layers
 *       <ConceptContent concept={flow.currentConcept} />
 *       
 *       // Navigation
 *       <button 
 *         onClick={flow.goPrevious}
 *         disabled={!flow.canGoPrevious}
 *       >
 *         Previous
 *       </button>
 *       
 *       <button
 *         onClick={() => flow.markConceptComplete(flow.currentConcept.id)}
 *         disabled={flow.isConceptComplete(flow.currentConcept.id)}
 *       >
 *         Mark Complete
 *       </button>
 *       
 *       <button
 *         onClick={flow.goNext}
 *         disabled={!flow.canGoNext}
 *       >
 *         Next
 *       </button>
 *       
 *       {flow.isLectureComplete && <div>🎉 Lecture Complete!</div>}
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * DESIGN DECISIONS:
 * 
 * 1. WHY Map<string, boolean> for completion?
 *    - Fast O(1) lookup
 *    - Immutable updates (create new Map)
 *    - Only stores completed concepts (missing = incomplete)
 * 
 * 2. WHY return boolean from goNext/goPrevious?
 *    - UI can show feedback if navigation blocked
 *    - Useful for animations (only animate if moved)
 *    - Clear contract (true = moved, false = blocked)
 * 
 * 3. WHY separate canGoNext and canGoPrevious?
 *    - UI can enable/disable buttons BEFORE clicking
 *    - Better UX (grayed out buttons vs error messages)
 *    - Declarative (UI just binds to flags)
 * 
 * 4. WHY no persistence?
 *    - This is PURE state logic
 *    - Persistence is a separate concern
 *    - Easy to add later (useEffect + localStorage)
 * 
 * 5. WHY strict input validation?
 *    - Fail fast on programmer errors
 *    - Mismatched concept arrays = loader bug
 *    - Better than silent corruption
 */
