/**
 * SAFE CONTENT LOADERS
 * 
 * PURPOSE:
 * Provide graceful fallbacks when content is missing or invalid.
 * These wrappers ensure the app NEVER crashes with 500 errors due to content issues.
 * 
 * PHILOSOPHY:
 * - Content errors should NEVER crash the app
 * - Show helpful "Content not available" messages instead
 * - Log errors for debugging but don't throw to user
 * - Valid content works exactly as before
 */

import { resolve } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import type { LectureContract } from '../contracts/LectureContract';
import type { LoadedConcept } from './loadConcept';
import { loadLecture, LectureLoadError } from './loadLecture';
import { loadConcept, ConceptLoadError } from './loadConcept';
import { LectureValidationError } from '../validators/validateLecture';
import { ConceptValidationError } from '../validators/validateConcept';
import { QuizValidationError } from '../validators/validateQuiz';
import { FlashcardValidationError } from '../validators/validateFlashcards';

/**
 * Result of safe content loading operations
 */
export interface SafeLoadResult<T> {
    success: boolean;
    data: T | null;
    error: string | null;
    errorType: 'not-found' | 'invalid' | 'incomplete' | null;
}

/**
 * Placeholder content shown when real content is unavailable
 */
export const PLACEHOLDER_CONTENT = {
    lecture: {
        notFound: '# Content Not Available\n\nThis lesson has not been created yet. Check back soon!',
        invalid: '# Content Error\n\nThis lesson content could not be loaded. Please report this issue.',
    },
    concept: {
        notFound: '# Concept Not Available\n\nThis concept has not been created yet.',
        invalid: '# Concept Error\n\nThis concept content could not be loaded.',
    },
    markdown: '<!-- Content not yet generated -->\n\n# Coming Soon\n\nThis content is being developed.',
};

/**
 * Check if a lesson directory exists and has basic required files
 */
export function lessonDirectoryExists(contentRoot: string, moduleSlug: string, lessonId: string): boolean {
    const lessonDir = resolve(contentRoot, moduleSlug, 'lessons', lessonId);
    const metadataPath = resolve(lessonDir, 'metadata.json');
    return existsSync(lessonDir) && existsSync(metadataPath);
}

/**
 * Check if a concept directory exists and has basic required files
 */
export function conceptDirectoryExists(contentRoot: string, moduleSlug: string, conceptId: string): boolean {
    const conceptDir = resolve(contentRoot, moduleSlug, 'concepts', conceptId);
    const metadataPath = resolve(conceptDir, 'metadata.json');
    return existsSync(conceptDir) && existsSync(metadataPath);
}

/**
 * Safely load a lecture with graceful error handling
 * 
 * @returns SafeLoadResult with either valid data or error information
 */
export async function safeLoadLecture(lecturePath: string): Promise<SafeLoadResult<LectureContract>> {
    try {
        const lecture = await loadLecture(lecturePath);
        return {
            success: true,
            data: lecture,
            error: null,
            errorType: null,
        };
    } catch (error) {
        // Determine error type for appropriate UI messaging
        let errorType: 'not-found' | 'invalid' | 'incomplete' = 'invalid';
        let errorMessage = 'Unknown error loading lecture';

        if (error instanceof LectureLoadError) {
            if (error.message.includes('ENOENT') || error.message.includes('not found')) {
                errorType = 'not-found';
                errorMessage = 'Lesson directory or metadata not found';
            } else {
                errorMessage = error.message;
            }
        } else if (error instanceof LectureValidationError) {
            errorType = 'incomplete';
            errorMessage = error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error(`[SafeLoader] Lecture load failed: ${errorMessage}`);

        return {
            success: false,
            data: null,
            error: errorMessage,
            errorType,
        };
    }
}

/**
 * Safely load a concept with graceful error handling
 * 
 * @returns SafeLoadResult with either valid data or error information
 */
export async function safeLoadConcept(conceptPath: string): Promise<SafeLoadResult<LoadedConcept>> {
    try {
        const concept = await loadConcept(conceptPath);
        return {
            success: true,
            data: concept,
            error: null,
            errorType: null,
        };
    } catch (error) {
        let errorType: 'not-found' | 'invalid' | 'incomplete' = 'invalid';
        let errorMessage = 'Unknown error loading concept';

        if (error instanceof ConceptLoadError) {
            if (error.message.includes('ENOENT') || error.message.includes('not found')) {
                errorType = 'not-found';
                errorMessage = 'Concept directory or files not found';
            } else {
                errorMessage = error.message;
            }
        } else if (error instanceof ConceptValidationError) {
            errorType = 'incomplete';
            errorMessage = error.message;
        } else if (error instanceof QuizValidationError || error instanceof FlashcardValidationError) {
            errorType = 'incomplete';
            errorMessage = error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error(`[SafeLoader] Concept load failed: ${errorMessage}`);

        return {
            success: false,
            data: null,
            error: errorMessage,
            errorType,
        };
    }
}

/**
 * Safely load multiple concepts, returning both successful and failed loads
 */
export async function safeLoadConcepts(
    contentRoot: string,
    moduleSlug: string,
    conceptIds: string[]
): Promise<{
    loaded: LoadedConcept[];
    failed: Array<{ id: string; error: string }>;
}> {
    const results = await Promise.all(
        conceptIds.map(async (conceptId) => {
            const conceptPath = resolve(contentRoot, moduleSlug, 'concepts', conceptId);
            const result = await safeLoadConcept(conceptPath);
            return { conceptId, result };
        })
    );

    const loaded: LoadedConcept[] = [];
    const failed: Array<{ id: string; error: string }> = [];

    for (const { conceptId, result } of results) {
        if (result.success && result.data) {
            loaded.push(result.data);
        } else {
            failed.push({ id: conceptId, error: result.error || 'Unknown error' });
        }
    }

    return { loaded, failed };
}

/**
 * Safely read a markdown file with fallback content
 */
export async function safeReadMarkdown(filePath: string, fallback?: string): Promise<string> {
    try {
        const content = await readFile(filePath, 'utf-8');
        if (content.trim().length === 0) {
            return fallback || PLACEHOLDER_CONTENT.markdown;
        }
        return content;
    } catch {
        return fallback || PLACEHOLDER_CONTENT.markdown;
    }
}

/**
 * Validate that all concepts in a lecture exist
 * Returns list of missing concept IDs
 */
export function getMissingConcepts(
    contentRoot: string,
    moduleSlug: string,
    conceptIds: string[]
): string[] {
    const missing: string[] = [];
    for (const conceptId of conceptIds) {
        if (!conceptDirectoryExists(contentRoot, moduleSlug, conceptId)) {
            missing.push(conceptId);
        }
    }
    return missing;
}

/**
 * Pre-validate a lesson before adding to module
 * 
 * PURPOSE:
 * Run this BEFORE deploying a new lesson to ensure it won't break the app.
 * Returns detailed report of any issues that would cause 404/500 errors.
 * 
 * @param lessonPath - Absolute path to lesson directory
 * @returns Promise with validation result
 */
export async function preValidateLesson(
    lessonPath: string
): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
    conceptsChecked: number;
}> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let conceptsChecked = 0;

    // Check required lesson files exist
    const requiredFiles = ['metadata.json', 'overview.md', 'synthesis.md'];
    for (const file of requiredFiles) {
        if (!existsSync(resolve(lessonPath, file))) {
            errors.push(`Missing required lesson file: ${file}`);
        }
    }

    // If metadata exists, try to load and validate
    if (existsSync(resolve(lessonPath, 'metadata.json'))) {
        const lectureResult = await safeLoadLecture(lessonPath);

        if (!lectureResult.success) {
            errors.push(`Lesson metadata invalid: ${lectureResult.error}`);
        } else if (lectureResult.data) {
            // Check each concept referenced in the lesson
            const conceptsDir = resolve(lessonPath, 'concepts');

            for (const conceptId of lectureResult.data.concepts) {
                conceptsChecked++;
                const conceptPath = resolve(conceptsDir, conceptId);

                if (!existsSync(conceptPath)) {
                    errors.push(`Concept folder missing: ${conceptId}`);
                    continue;
                }

                const conceptResult = await safeLoadConcept(conceptPath);
                if (!conceptResult.success) {
                    errors.push(`Concept "${conceptId}": ${conceptResult.error}`);
                }
            }

            // Check minimum concept count
            if (lectureResult.data.concepts.length < 3) {
                warnings.push(`Only ${lectureResult.data.concepts.length} concepts (minimum 3 recommended)`);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        conceptsChecked,
    };
}
