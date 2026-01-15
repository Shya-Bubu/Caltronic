/**
 * LECTURE VALIDATOR
 * 
 * PURPOSE:
 * Enforces LectureContract at runtime by validating:
 * - Metadata structure conformance
 * - Minimum concept count (≥3)
 * - Required file existence and non-empty content
 * 
 * PHILOSOPHY: FAIL FAST
 * - Throw on first violation
 * - No warnings, no auto-fixing
 * - Descriptive error messages for debugging
 */

import { LectureContract } from '../contracts/LectureContract';
import { existsSync, statSync } from 'fs';
import { readFileSync } from 'fs';

/**
 * Validation error thrown when lecture content is invalid
 */
export class LectureValidationError extends Error {
    constructor(lectureId: string, reason: string) {
        super(`Lecture validation failed for "${lectureId}": ${reason}`);
        this.name = 'LectureValidationError';
    }
}

/**
 * Validates that a file exists and is non-empty
 * 
 * @param filePath - Absolute path to file
 * @param fileType - Description for error message (e.g., "overview", "synthesis")
 * @param lectureId - Lecture ID for error context
 * @throws LectureValidationError if file doesn't exist or is empty
 */
function validateFileExistsAndNonEmpty(
    filePath: string,
    fileType: string,
    lectureId: string
): void {
    // Check existence
    if (!existsSync(filePath)) {
        throw new LectureValidationError(
            lectureId,
            `${fileType} file does not exist at path: ${filePath}`
        );
    }

    // Check that it's a file, not a directory
    const stats = statSync(filePath);
    if (!stats.isFile()) {
        throw new LectureValidationError(
            lectureId,
            `${fileType} path is not a file: ${filePath}`
        );
    }

    // Check non-empty
    const content = readFileSync(filePath, 'utf-8').trim();
    if (content.length === 0) {
        throw new LectureValidationError(
            lectureId,
            `${fileType} file is empty: ${filePath}`
        );
    }
}

/**
 * Validates lecture metadata and referenced files
 * 
 * VALIDATION STEPS:
 * 1. Check metadata structure conformance to LectureContract
 * 2. Ensure ≥3 concepts
 * 3. Ensure overview file exists and is non-empty
 * 4. Ensure synthesis file exists and is non-empty
 * 
 * @param lecture - Lecture metadata object
 * @param basePath - Base path for resolving relative paths (optional)
 * @throws LectureValidationError if validation fails
 */
export function validateLecture(
    lecture: unknown,
    basePath?: string
): asserts lecture is LectureContract {
    // Type guard: ensure lecture is an object
    if (typeof lecture !== 'object' || lecture === null) {
        throw new LectureValidationError(
            'unknown',
            'Lecture metadata must be an object'
        );
    }

    const lectureObj = lecture as Record<string, unknown>;

    // Validate: id field
    if (typeof lectureObj.id !== 'string' || lectureObj.id.trim().length === 0) {
        throw new LectureValidationError(
            'unknown',
            'Lecture must have a non-empty string "id" field'
        );
    }

    const lectureId = lectureObj.id as string;

    // Validate: title field
    if (typeof lectureObj.title !== 'string' || lectureObj.title.trim().length === 0) {
        throw new LectureValidationError(
            lectureId,
            'Lecture must have a non-empty string "title" field'
        );
    }

    // Validate: overviewPath field
    if (typeof lectureObj.overviewPath !== 'string' || lectureObj.overviewPath.trim().length === 0) {
        throw new LectureValidationError(
            lectureId,
            'Lecture must have a non-empty string "overviewPath" field'
        );
    }

    // Validate: concepts field is array
    if (!Array.isArray(lectureObj.concepts)) {
        throw new LectureValidationError(
            lectureId,
            'Lecture "concepts" field must be an array'
        );
    }

    // Validate: minimum 3 concepts (CRITICAL ENFORCEMENT)
    if (lectureObj.concepts.length < 3) {
        throw new LectureValidationError(
            lectureId,
            `Lecture must have at least 3 concepts, found ${lectureObj.concepts.length}. ` +
            `This prevents trivial single-concept "lectures" that should be standalone concepts.`
        );
    }

    // Validate: all concepts are non-empty strings
    lectureObj.concepts.forEach((concept, index) => {
        if (typeof concept !== 'string' || concept.trim().length === 0) {
            throw new LectureValidationError(
                lectureId,
                `Concept at index ${index} must be a non-empty string, got: ${typeof concept}`
            );
        }
    });

    // Validate: synthesisPath field
    if (typeof lectureObj.synthesisPath !== 'string' || lectureObj.synthesisPath.trim().length === 0) {
        throw new LectureValidationError(
            lectureId,
            'Lecture must have a non-empty string "synthesisPath" field'
        );
    }

    // Validate: forbidden fields check (prevent single-file antipattern)
    const forbiddenFields = ['content', 'body', 'markdown', 'mdx'];
    forbiddenFields.forEach(field => {
        if (field in lectureObj) {
            throw new LectureValidationError(
                lectureId,
                `Forbidden field "${field}" detected. Lectures must NOT contain inline content. ` +
                `All content must live in separate files to prevent single-file lecture antipattern.`
            );
        }
    });

    // FILE EXISTENCE VALIDATION
    // Resolve paths (use basePath if provided)
    const resolveFullPath = (path: string): string => {
        if (basePath && !path.startsWith('/') && !path.match(/^[a-zA-Z]:\\/)) {
            // Relative path, resolve against basePath
            return `${basePath}/${path}`.replace(/\\/g, '/');
        }
        return path;
    };

    const overviewFullPath = resolveFullPath(lectureObj.overviewPath as string);
    const synthesisFullPath = resolveFullPath(lectureObj.synthesisPath as string);

    // Validate: overview file exists and is non-empty
    validateFileExistsAndNonEmpty(overviewFullPath, 'Overview', lectureId);

    // Validate: synthesis file exists and is non-empty
    validateFileExistsAndNonEmpty(synthesisFullPath, 'Synthesis', lectureId);

    // All validations passed - lecture conforms to contract
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const lectureData = JSON.parse(await fs.readFile('metadata.json', 'utf-8'));
 *   validateLecture(lectureData, '/content/signals-systems/lectures/lecture-01');
 *   // If we reach here, lecture is valid
 * } catch (error) {
 *   if (error instanceof LectureValidationError) {
 *     console.error('Invalid lecture:', error.message);
 *     // Reject content, do NOT load
 *   }
 * }
 */
