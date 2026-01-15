'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Layer types that can be explored within a concept
 */
export type LayerType = 'intuition' | 'engineering' | 'mathematics' | 'exam' | 'quiz' | 'flashcards';

const ALL_LAYERS: LayerType[] = ['intuition', 'engineering', 'mathematics', 'exam', 'quiz', 'flashcards'];

/**
 * Track which layers have been viewed for each concept
 */
interface ConceptExploration {
    [layer: string]: boolean;
}

interface ExplorationState {
    [conceptId: string]: ConceptExploration;
}

/**
 * Get storage key for a lesson's exploration state
 */
function getStorageKey(lessonId: string): string {
    return `caltronic:lesson:${lessonId}:exploration:v1`;
}

/**
 * Hook to track concept layer exploration
 * 
 * @param lessonId - The ID of the lesson being explored
 * @param conceptIds - Array of concept IDs in this lesson
 * 
 * @returns Object with:
 *   - explorationState: Current exploration state
 *   - markLayerViewed: Function to mark a layer as viewed
 *   - getConceptProgress: Function to get % progress for a concept
 *   - getTotalExplored: Number of fully explored concepts
 *   - isConceptExplored: Check if a concept is fully explored
 */
export function useExplorationTracking(lessonId: string, conceptIds: string[]) {
    const [explorationState, setExplorationState] = useState<ExplorationState>({});

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(getStorageKey(lessonId));
            if (stored) {
                setExplorationState(JSON.parse(stored));
            }
        } catch (e) {
            console.warn('Failed to load exploration state:', e);
        }
    }, [lessonId]);

    // Save to localStorage when state changes
    useEffect(() => {
        if (Object.keys(explorationState).length > 0) {
            try {
                localStorage.setItem(getStorageKey(lessonId), JSON.stringify(explorationState));
            } catch (e) {
                console.warn('Failed to save exploration state:', e);
            }
        }
    }, [lessonId, explorationState]);

    /**
     * Mark a specific layer of a concept as viewed
     */
    const markLayerViewed = useCallback((conceptId: string, layer: LayerType) => {
        setExplorationState((prev) => ({
            ...prev,
            [conceptId]: {
                ...prev[conceptId],
                [layer]: true,
            },
        }));
    }, []);

    /**
     * Get progress percentage for a concept (0-100)
     */
    const getConceptProgress = useCallback((conceptId: string): number => {
        const concept = explorationState[conceptId];
        if (!concept) return 0;

        const viewedCount = ALL_LAYERS.filter((layer) => concept[layer]).length;
        return Math.round((viewedCount / ALL_LAYERS.length) * 100);
    }, [explorationState]);

    /**
     * Check if a concept is fully explored (all 6 layers viewed)
     */
    const isConceptExplored = useCallback((conceptId: string): boolean => {
        const concept = explorationState[conceptId];
        if (!concept) return false;

        return ALL_LAYERS.every((layer) => concept[layer]);
    }, [explorationState]);

    /**
     * Get total number of fully explored concepts
     */
    const getTotalExplored = useCallback((): number => {
        return conceptIds.filter((id) => isConceptExplored(id)).length;
    }, [conceptIds, isConceptExplored]);

    /**
     * Check if a specific layer has been viewed
     */
    const isLayerViewed = useCallback((conceptId: string, layer: LayerType): boolean => {
        return explorationState[conceptId]?.[layer] ?? false;
    }, [explorationState]);

    return {
        explorationState,
        markLayerViewed,
        getConceptProgress,
        getTotalExplored,
        isConceptExplored,
        isLayerViewed,
        totalConcepts: conceptIds.length,
    };
}

/**
 * Hook to track lesson completion
 */
export function useLessonCompletion(lessonId: string, lessonTitle: string) {
    const [isComplete, setIsComplete] = useState(false);

    const storageKey = `caltronic:lesson:${lessonId}:complete:v1`;

    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            setIsComplete(stored === 'true');
        } catch (e) {
            console.warn('Failed to load completion state:', e);
        }
    }, [storageKey]);

    const markLessonComplete = useCallback(() => {
        try {
            localStorage.setItem(storageKey, 'true');
            setIsComplete(true);
        } catch (e) {
            console.warn('Failed to save completion state:', e);
        }
    }, [storageKey]);

    return {
        isComplete,
        markLessonComplete,
        buttonText: `Mark ${lessonTitle} Complete`,
    };
}
