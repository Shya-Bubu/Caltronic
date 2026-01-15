/**
 * CONCEPT LOADER
 * 
 * PURPOSE:
 * Load a complete concept with ALL 7 layers from filesystem.
 * This is the MAIN loader that assembles all concept content.
 * 
 * PHILOSOPHY:
 * - Load ALL 7 layers or fail completely
 * - Validate metadata and all sub-components (quiz, flashcards)
 * - Return fully assembled concept object
 * - No partial returns
 */

import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { ConceptContract } from '../contracts/ConceptContract';
import { QuizContract } from '../contracts/QuizContract';
import { FlashcardContract } from '../contracts/FlashcardContract';
import { validateConcept, ConceptValidationError } from '../validators/validateConcept';
import { loadQuiz, QuizLoadError } from './loadQuiz';
import { loadFlashcards, FlashcardLoadError } from './loadFlashcards';

/**
 * Error thrown when concept loading fails
 */
export class ConceptLoadError extends Error {
    constructor(path: string, reason: string, cause?: Error) {
        super(`Failed to load concept from "${path}": ${reason}`);
        this.name = 'ConceptLoadError';
        this.cause = cause;
    }
}

/**
 * Fully loaded concept with all 7 layers
 * Extends ConceptContract with actual loaded content
 */
export interface LoadedConcept extends ConceptContract {
    /**
     * Loaded layer content (markdown as strings, JSON as parsed objects)
     */
    layers: {
        intuition: string;      // Loaded from intuitionPath
        engineering: string;    // Loaded from engineeringPath
        mathematics: string;    // Loaded from mathematicsPath
        exam: string;           // Loaded from examPath
        summary?: string;       // Optional summary.md (concept closure)
        visuals: unknown;       // Loaded from visualsPath (JSON, structure not yet defined)
        quiz: QuizContract;     // Loaded and validated via loadQuiz
        flashcards: FlashcardContract; // Loaded and validated via loadFlashcards
    };
}

/**
 * Load concept metadata and ALL 7 layer files
 * 
 * PROCESS:
 * 1. Read metadata.json
 * 2. Parse and validate metadata (validates all 7 files exist)
 * 3. Load all 7 layer files:
 *    - Markdown layers (intuition, engineering, mathematics, exam) as strings
 *    - Visuals JSON
 *    - Quiz via loadQuiz (validated)
 *    - Flashcards via loadFlashcards (validated)
 * 4. Return fully assembled LoadedConcept
 * 
 * @param conceptPath - Absolute path to concept directory OR metadata.json file
 * @returns Promise<LoadedConcept> - Fully loaded and validated concept
 * @throws ConceptLoadError if any file cannot be read
 * @throws ConceptValidationError if concept metadata is invalid
 * @throws QuizLoadError | QuizValidationError if quiz is invalid
 * @throws FlashcardLoadError | FlashcardValidationError if flashcards are invalid
 */
export async function loadConcept(conceptPath: string): Promise<LoadedConcept> {
    try {
        // Resolve to metadata.json if directory path given
        const metadataPath = conceptPath.endsWith('metadata.json')
            ? conceptPath
            : resolve(conceptPath, 'metadata.json');

        const basePath = dirname(metadataPath);

        // Step 1: Read metadata file
        const fileContent = await readFile(metadataPath, 'utf-8');

        // Step 2: Parse JSON
        let conceptData: unknown;
        try {
            conceptData = JSON.parse(fileContent);
        } catch (parseError) {
            throw new ConceptLoadError(
                metadataPath,
                'Failed to parse metadata JSON. File may be malformed.',
                parseError as Error
            );
        }

        // Step 3: Validate metadata
        // This validates:
        // - Structure conformance to ConceptContract
        // - ALL 7 layer files exist and are non-empty
        // - No forbidden inline content
        validateConcept(conceptData, basePath);

        // TypeScript now knows conceptData is ConceptContract
        const concept = conceptData as ConceptContract;

        // Step 4: Load ALL 7 layer files
        // Resolve paths relative to basePath if needed
        const resolvePath = (path: string): string => {
            return resolve(basePath, path);
        };

        try {
            // Load markdown layers (no parsing, just raw strings)
            const [intuition, engineering, mathematics, exam, visualsContent] = await Promise.all([
                readFile(resolvePath(concept.intuitionPath), 'utf-8'),
                readFile(resolvePath(concept.engineeringPath), 'utf-8'),
                readFile(resolvePath(concept.mathematicsPath), 'utf-8'),
                readFile(resolvePath(concept.examPath), 'utf-8'),
                readFile(resolvePath(concept.visualsPath), 'utf-8'),
            ]);

            // Parse visuals JSON
            let visuals: unknown;
            try {
                visuals = JSON.parse(visualsContent);
            } catch (parseError) {
                throw new ConceptLoadError(
                    concept.visualsPath,
                    'Failed to parse visuals JSON',
                    parseError as Error
                );
            }

            // Load and validate quiz (uses loadQuiz which validates)
            const quiz = await loadQuiz(resolvePath(concept.quizPath));

            // Load and validate flashcards (uses loadFlashcards which validates)
            const flashcards = await loadFlashcards(resolvePath(concept.flashcardsPath));

            // Optionally load summary.md (concept closure)
            let summary: string | undefined;
            try {
                summary = await readFile(resolve(basePath, 'summary.md'), 'utf-8');
            } catch {
                // summary.md is optional, don't fail if not found
                summary = undefined;
            }

            // Step 5: Return fully assembled concept
            return {
                ...concept,
                layers: {
                    intuition,
                    engineering,
                    mathematics,
                    exam,
                    summary,
                    visuals,
                    quiz,
                    flashcards,
                },
            };

        } catch (error) {
            // Re-throw quiz/flashcard errors (they're already descriptive)
            if (error instanceof QuizLoadError ||
                error instanceof FlashcardLoadError ||
                error instanceof ConceptLoadError) {
                throw error;
            }

            // Wrap filesystem errors for layer files
            throw new ConceptLoadError(
                conceptPath,
                `Failed to load layer file: ${(error as Error).message}`,
                error as Error
            );
        }

    } catch (error) {
        // Re-throw validation errors as-is
        if (error instanceof ConceptValidationError) {
            throw error;
        }

        // Re-throw our own load errors
        if (error instanceof ConceptLoadError) {
            throw error;
        }

        // Re-throw quiz/flashcard errors
        if (error instanceof QuizLoadError || error instanceof FlashcardLoadError) {
            throw error;
        }

        // Wrap filesystem errors
        throw new ConceptLoadError(
            conceptPath,
            `Filesystem error: ${(error as Error).message}`,
            error as Error
        );
    }
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const concept = await loadConcept('/content/concepts/continuous-time-signals');
 *   
 *   // concept is guaranteed to have ALL 7 layers loaded:
 *   console.log('Intuition:', concept.layers.intuition.substring(0, 100));
 *   console.log('Engineering:', concept.layers.engineering.substring(0, 100));
 *   console.log('Mathematics:', concept.layers.mathematics.substring(0, 100));
 *   console.log('Exam:', concept.layers.exam.substring(0, 100));
 *   console.log('Visuals:', concept.layers.visuals);
 *   console.log('Quiz questions:', concept.layers.quiz.questions.length);
 *   console.log('Flashcards:', concept.layers.flashcards.cards.length);
 *   
 *   // All content is validated:
 *   // - Quiz has ≥10 questions with valid structure
 *   // - Flashcards has ≥10 cards with difficulty levels
 *   // - All markdown files are non-empty
 *   
 * } catch (error) {
 *   // Handle various error types
 *   console.error('Failed to load concept:', error.message);
 *   // Do NOT render partial concept to user
 * }
 */
