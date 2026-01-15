/**
 * FLASHCARDS LOADER
 * 
 * PURPOSE:
 * Load flashcard deck JSON from filesystem and validate it against FlashcardContract.
 * This is the ONLY way flashcard data should enter the application.
 * 
 * PHILOSOPHY:
 * - Load, validate, return OR throw
 * - No silent failures
 * - No default values
 * - Validators enforce quality
 */

import { readFile } from 'fs/promises';
import { FlashcardContract } from '../contracts/FlashcardContract';
import { validateFlashcards, FlashcardValidationError } from '../validators/validateFlashcards';

/**
 * Error thrown when flashcard loading fails
 */
export class FlashcardLoadError extends Error {
    constructor(path: string, reason: string, cause?: Error) {
        super(`Failed to load flashcards from "${path}": ${reason}`);
        this.name = 'FlashcardLoadError';
        this.cause = cause;
    }
}

/**
 * Load flashcard deck JSON from filesystem and validate
 * 
 * PROCESS:
 * 1. Read JSON file from disk
 * 2. Parse JSON
 * 3. Validate against FlashcardContract (fails fast on invalid data)
 * 4. Return typed FlashcardContract
 * 
 * @param flashcardsPath - Absolute path to flashcards.json file
 * @returns Promise<FlashcardContract> - Validated flashcard deck data
 * @throws FlashcardLoadError if file cannot be read
 * @throws FlashcardValidationError if flashcard data is invalid
 */
export async function loadFlashcards(flashcardsPath: string): Promise<FlashcardContract> {
    try {
        // Step 1: Read file from disk
        const fileContent = await readFile(flashcardsPath, 'utf-8');

        // Step 2: Parse JSON
        let flashcardData: unknown;
        try {
            flashcardData = JSON.parse(fileContent);
        } catch (parseError) {
            throw new FlashcardLoadError(
                flashcardsPath,
                'Failed to parse JSON. File may be malformed.',
                parseError as Error
            );
        }

        // Step 3: Validate (throws FlashcardValidationError if invalid)
        // This is THE CRITICAL STEP - validators enforce quality
        validateFlashcards(flashcardData);

        // Step 4: Return typed data
        // TypeScript now knows flashcardData is FlashcardContract thanks to assertion signature
        return flashcardData;

    } catch (error) {
        // Re-throw validation errors as-is (they have good messages)
        if (error instanceof FlashcardValidationError) {
            throw error;
        }

        // Re-throw our own load errors
        if (error instanceof FlashcardLoadError) {
            throw error;
        }

        // Wrap filesystem errors
        throw new FlashcardLoadError(
            flashcardsPath,
            `Filesystem error: ${(error as Error).message}`,
            error as Error
        );
    }
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const flashcards = await loadFlashcards('/content/concepts/ct-signals/flashcards.json');
 *   // flashcards is guaranteed to:
 *   // - Have ≥10 cards
 *   // - Have valid structure
 *   // - Have difficulty levels 1-5
 *   // - Have non-empty front/back
 *   
 *   console.log(`Loaded ${flashcards.cards.length} flashcards`);
 *   
 * } catch (error) {
 *   if (error instanceof FlashcardValidationError) {
 *     console.error('Invalid flashcard data:', error.message);
 *   } else if (error instanceof FlashcardLoadError) {
 *     console.error('Flashcard load failed:', error.message);
 *   }
 *   // Do NOT render flashcards to user
 * }
 */
