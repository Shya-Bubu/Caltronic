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
 * The 7 mandatory layer paths for CLASSIC mode (separate tab files)
 */
const CLASSIC_REQUIRED_LAYERS = [
    'intuitionPath',
    'engineeringPath',
    'mathematicsPath',
    'examPath',
    'visualsPath',
    'quizPath',
    'flashcardsPath',
] as const;

/**
 * Required layer paths for UNIFIED content mode (content.md replaces 3 teaching tabs)
 */
const UNIFIED_REQUIRED_LAYERS = [
    'contentPath',
    'examPath',
    'visualsPath',
    'quizPath',
    'flashcardsPath',
] as const;

/**
 * Human-readable names for error messages
 */
const LAYER_NAMES: Record<string, string> = {
    intuitionPath: 'Intuition layer',
    engineeringPath: 'Engineering layer',
    mathematicsPath: 'Mathematics layer',
    contentPath: 'Unified content',
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
            `This concept is incomplete.`
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
 * Checks visual requirements for a concept (NON-FATAL)
 * 
 * NOTE: These are NON-BLOCKING recommendations.
 * A concept with fewer visuals or no simulations will still load.
 * This prevents breaking existing working content.
 * 
 * @param visualsPath - Absolute path to visuals.json
 * @param conceptId - Concept ID for warning context
 */
function checkVisualRequirements(
    visualsPath: string,
    conceptId: string
): void {
    try {
        const content = readFileSync(visualsPath, 'utf-8');
        const visualsData = JSON.parse(content);

        // Check visuals array exists
        if (!visualsData.visuals || !Array.isArray(visualsData.visuals)) {
            console.warn(`[ConceptValidator] ${conceptId}: visuals.json should have a "visuals" array`);
            return;
        }

        const visuals = visualsData.visuals;

        // RECOMMENDATION: At least 6 visuals (non-blocking)
        if (visuals.length < 6) {
            console.warn(
                `[ConceptValidator] ${conceptId}: Recommends 6+ visuals, found ${visuals.length}`
            );
        }

        // RECOMMENDATION: At least 1 simulation (non-blocking)
        const simulations = visuals.filter(
            (v: { type?: string }) => v.type === 'd3-simulation'
        );
        if (simulations.length < 1) {
            console.warn(
                `[ConceptValidator] ${conceptId}: Recommends 1+ simulation, found ${simulations.length}`
            );
        }

    } catch {
        // JSON parse error - still not fatal, just log it
        console.warn(`[ConceptValidator] ${conceptId}: Could not parse visuals.json for recommendations check`);
    }
}

/**
 * Validates concept metadata and required layer files
 * 
 * Supports TWO modes:
 * - CLASSIC: All 7 layer files (intuition, engineering, mathematics, exam, visuals, quiz, flashcards)
 * - UNIFIED: contentPath replaces intuition+engineering+mathematics → requires contentPath + exam + visuals + quiz + flashcards
 * 
 * Mode is auto-detected: if contentPath is present, unified mode is used.
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

    // Detect mode: unified (contentPath present) or classic (7 separate files)
    const isUnifiedMode = typeof conceptObj.contentPath === 'string' && conceptObj.contentPath.trim().length > 0;
    const requiredLayers = isUnifiedMode ? UNIFIED_REQUIRED_LAYERS : CLASSIC_REQUIRED_LAYERS;

    // Validate: required layer path fields are present and non-empty strings
    requiredLayers.forEach(layerField => {
        const layerValue = conceptObj[layerField];

        if (layerValue === undefined) {
            throw new ConceptValidationError(
                conceptId,
                `Missing REQUIRED field "${layerField}". ${isUnifiedMode ? 'Unified content' : 'All 7 concept layers are'} mandatory.`
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
    // Note: 'content' is NOT forbidden when used as contentPath (a file path reference)
    const forbiddenFields = ['body', 'markdown', 'layers'];
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

    // Validate each required layer file exists and is non-empty
    requiredLayers.forEach(layerField => {
        const layerPath = conceptObj[layerField] as string;
        const fullPath = resolveFullPath(layerPath);
        const layerName = LAYER_NAMES[layerField] || layerField;

        validateLayerFileExistsAndNonEmpty(fullPath, layerName, conceptId);
    });

    // VISUAL REQUIREMENTS CHECK (NON-FATAL - logs warnings only)
    const visualsFullPath = resolveFullPath(conceptObj.visualsPath as string);
    checkVisualRequirements(visualsFullPath, conceptId);

    // All validations passed - concept conforms to contract
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
