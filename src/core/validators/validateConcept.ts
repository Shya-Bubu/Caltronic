/**
 * CONCEPT VALIDATOR
 * 
 * PURPOSE:
 * Enforces ConceptContract at runtime by validating:
 * - Metadata structure conformance
 * - ALL 7 layer files exist
 * - ALL 7 layer files are non-empty
 * 
 * PHILOSOPHY: FAIL FAST
 * - A concept missing ANY layer is REJECTED
 * - No partial concepts allowed
 * - Empty files are as bad as missing files
 */

import { ConceptContract } from '../contracts/ConceptContract';
import { existsSync, statSync, readFileSync } from 'fs';

/**
 * Validation error thrown when concept content is invalid
 */
export class ConceptValidationError extends Error {
    constructor(conceptId: string, reason: string) {
        super(`Concept validation failed for "${conceptId}": ${reason}`);
        this.name = 'ConceptValidationError';
    }
}

/**
 * The 7 mandatory layer paths that MUST exist for every concept
 */
const REQUIRED_LAYERS = [
    'intuitionPath',
    'engineeringPath',
    'mathematicsPath',
    'examPath',
    'visualsPath',
    'quizPath',
    'flashcardsPath',
] as const;

/**
 * Human-readable names for error messages
 */
const LAYER_NAMES: Record<typeof REQUIRED_LAYERS[number], string> = {
    intuitionPath: 'Intuition layer',
    engineeringPath: 'Engineering layer',
    mathematicsPath: 'Mathematics layer',
    examPath: 'Exam strategy layer',
    visualsPath: 'Visuals',
    quizPath: 'Quiz',
    flashcardsPath: 'Flashcards',
};

/**
 * Validates that a file exists and is non-empty
 * 
 * @param filePath - Absolute path to file
 * @param layerName - Human-readable layer name for error messages
 * @param conceptId - Concept ID for error context
 * @throws ConceptValidationError if file doesn't exist or is empty
 */
function validateLayerFileExistsAndNonEmpty(
    filePath: string,
    layerName: string,
    conceptId: string
): void {
    // Check existence
    if (!existsSync(filePath)) {
        throw new ConceptValidationError(
            conceptId,
            `${layerName} file MUST exist but was not found at: ${filePath}\n` +
            `All 7 concept layers are REQUIRED (no optionals). This concept is incomplete.`
        );
    }

    // Check that it's a file, not a directory
    const stats = statSync(filePath);
    if (!stats.isFile()) {
        throw new ConceptValidationError(
            conceptId,
            `${layerName} path is not a file: ${filePath}`
        );
    }

    // Check non-empty
    const content = readFileSync(filePath, 'utf-8').trim();
    if (content.length === 0) {
        throw new ConceptValidationError(
            conceptId,
            `${layerName} file exists but is EMPTY: ${filePath}\n` +
            `Empty files are not allowed. Every concept layer must have actual content.`
        );
    }
}

/**
 * Validates concept metadata and all 7 required layer files
 * 
 * VALIDATION STEPS:
 * 1. Check metadata structure conformance to ConceptContract
 * 2. Ensure ALL 7 layer path fields are present and non-empty strings
 * 3. Ensure ALL 7 referenced files exist
 * 4. Ensure ALL 7 files are non-empty
 * 
 * @param concept - Concept metadata object
 * @param basePath - Base path for resolving relative paths (optional)
 * @throws ConceptValidationError if validation fails
 */
export function validateConcept(
    concept: unknown,
    basePath?: string
): asserts concept is ConceptContract {
    // Type guard: ensure concept is an object
    if (typeof concept !== 'object' || concept === null) {
        throw new ConceptValidationError(
            'unknown',
            'Concept metadata must be an object'
        );
    }

    const conceptObj = concept as Record<string, unknown>;

    // Validate: id field
    if (typeof conceptObj.id !== 'string' || conceptObj.id.trim().length === 0) {
        throw new ConceptValidationError(
            'unknown',
            'Concept must have a non-empty string "id" field'
        );
    }

    const conceptId = conceptObj.id as string;

    // Validate: title field
    if (typeof conceptObj.title !== 'string' || conceptObj.title.trim().length === 0) {
        throw new ConceptValidationError(
            conceptId,
            'Concept must have a non-empty string "title" field'
        );
    }

    // Validate: ALL 7 layer path fields are present and are non-empty strings
    REQUIRED_LAYERS.forEach(layerField => {
        const layerValue = conceptObj[layerField];

        if (layerValue === undefined) {
            throw new ConceptValidationError(
                conceptId,
                `Missing REQUIRED field "${layerField}". All 7 concept layers are mandatory (no optionals).`
            );
        }

        if (typeof layerValue !== 'string' || layerValue.trim().length === 0) {
            throw new ConceptValidationError(
                conceptId,
                `Field "${layerField}" must be a non-empty string path, got: ${typeof layerValue}`
            );
        }
    });

    // Validate: forbidden fields check (prevent inline content antipattern)
    const forbiddenFields = ['content', 'body', 'markdown', 'layers'];
    forbiddenFields.forEach(field => {
        if (field in conceptObj) {
            throw new ConceptValidationError(
                conceptId,
                `Forbidden field "${field}" detected. Concepts must NOT contain inline content. ` +
                `All layers must reference separate files to enforce file-per-layer architecture.`
            );
        }
    });

    // FILE EXISTENCE AND NON-EMPTY VALIDATION
    // Resolve paths (use basePath if provided)
    const resolveFullPath = (path: string): string => {
        if (basePath && !path.startsWith('/') && !path.match(/^[a-zA-Z]:\\/)) {
            // Relative path, resolve against basePath
            return `${basePath}/${path}`.replace(/\\/g, '/');
        }
        return path;
    };

    // Validate each of the 7 required layer files
    REQUIRED_LAYERS.forEach(layerField => {
        const layerPath = conceptObj[layerField] as string;
        const fullPath = resolveFullPath(layerPath);
        const layerName = LAYER_NAMES[layerField];

        validateLayerFileExistsAndNonEmpty(fullPath, layerName, conceptId);
    });

    // All validations passed - concept conforms to contract
    // All 7 layers exist and are non-empty
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const conceptData = {
 *     id: 'continuous-time-signals',
 *     title: 'Continuous-Time Signals',
 *     intuitionPath: './intuition.md',
 *     engineeringPath: './engineering.md',
 *     mathematicsPath: './mathematics.md',
 *     examPath: './exam.md',
 *     visualsPath: './visuals.json',
 *     quizPath: './quiz.json',
 *     flashcardsPath: './flashcards.json'
 *   };
 *   
 *   validateConcept(conceptData, '/content/signals/concepts/continuous-time-signals');
 *   // If we reach here, concept is valid and all 7 files exist
 * } catch (error) {
 *   if (error instanceof ConceptValidationError) {
 *     console.error('Invalid concept:', error.message);
 *     // Reject content, do NOT load
 *   }
 * }
 */
