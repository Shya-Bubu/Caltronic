/**
 * LECTURE LOADER
 * 
 * PURPOSE:
 * Load lecture metadata from filesystem and validate it against LectureContract.
 * Does NOT load concept content - only returns lecture metadata structure.
 * 
 * PHILOSOPHY:
 * - Load, validate, return OR throw
 * - No silent failures
 * - Validators enforce quality (≥3 concepts, files exist)
 */

import { readFile } from 'fs/promises';
import { LectureContract } from '../contracts/LectureContract';
import { validateLecture, LectureValidationError } from '../validators/validateLecture';
import { resolve, dirname } from 'path';

/**
 * Error thrown when lecture loading fails
 */
export class LectureLoadError extends Error {
    constructor(path: string, reason: string, cause?: Error) {
        super(`Failed to load lecture from "${path}": ${reason}`);
        this.name = 'LectureLoadError';
        this.cause = cause;
    }
}

/**
 * Load lecture metadata JSON from filesystem and validate
 * 
 * PROCESS:
 * 1. Read metadata.json file from disk
 * 2. Parse JSON
 * 3. Validate against LectureContract (checks ≥3 concepts, files exist)
 * 4. Return typed LectureContract
 * 
 * NOTE: This loader only loads METADATA. It does not load:
 * - Overview/synthesis content (those are validated to exist, but not loaded here)
 * - Concept content (use loadConcept for that)
 * 
 * @param lecturePath - Absolute path to lecture directory OR metadata.json file
 * @returns Promise<LectureContract> - Validated lecture metadata
 * @throws LectureLoadError if file cannot be read
 * @throws LectureValidationError if lecture metadata is invalid
 */
export async function loadLecture(lecturePath: string): Promise<LectureContract> {
    try {
        // Resolve to metadata.json if directory path given
        const metadataPath = lecturePath.endsWith('metadata.json')
            ? lecturePath
            : resolve(lecturePath, 'metadata.json');

        const basePath = dirname(metadataPath);

        // Step 1: Read file from disk
        const fileContent = await readFile(metadataPath, 'utf-8');

        // Step 2: Parse JSON
        let lectureData: unknown;
        try {
            lectureData = JSON.parse(fileContent);
        } catch (parseError) {
            throw new LectureLoadError(
                metadataPath,
                'Failed to parse JSON. File may be malformed.',
                parseError as Error
            );
        }

        // Step 3: Validate (throws LectureValidationError if invalid)
        // This validates:
        // - Structure conformance
        // - ≥3 concepts
        // - Overview/synthesis files exist and are non-empty
        // - No forbidden inline content fields
        validateLecture(lectureData, basePath);

        // Step 4: Return typed data
        // TypeScript now knows lectureData is LectureContract
        return lectureData;

    } catch (error) {
        // Re-throw validation errors as-is (they have good messages)
        if (error instanceof LectureValidationError) {
            throw error;
        }

        // Re-throw our own load errors
        if (error instanceof LectureLoadError) {
            throw error;
        }

        // Wrap filesystem errors
        throw new LectureLoadError(
            lecturePath,
            `Filesystem error: ${(error as Error).message}`,
            error as Error
        );
    }
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const lecture = await loadLecture('/content/signals-systems/lectures/lecture-01');
 *   // lecture is guaranteed to:
 *   // - Have ≥3 concept IDs
 *   // - Have overview.md and synthesis.md (validated to exist)
 *   // - Have valid structure
 *   // - NOT have inline content
 *   
 *   console.log(`Lecture "${lecture.title}" has ${lecture.concepts.length} concepts`);
 *   
 *   // To load concepts:
 *   for (const conceptId of lecture.concepts) {
 *     const concept = await loadConcept(`/content/concepts/${conceptId}`);
 *     // ...
 *   }
 *   
 * } catch (error) {
 *   if (error instanceof LectureValidationError) {
 *     console.error('Invalid lecture metadata:', error.message);
 *   } else if (error instanceof LectureLoadError) {
 *     console.error('Lecture load failed:', error.message);
 *   }
 *   // Do NOT render lecture to user
 * }
 */
