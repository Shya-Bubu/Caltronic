/**
 * FLASHCARDS VALIDATOR
 * 
 * PURPOSE:
 * Enforces FlashcardContract at runtime by validating:
 * - JSON structure conformance
 * - Minimum 10 cards
 * - Every card has all required fields
 * - Difficulty levels are valid (1-5)
 * 
 * PHILOSOPHY: FAIL FAST
 * - Invalid flashcard deck = rejected deck
 * - No warnings, no partial acceptance
 * - Every card must be complete and valid
 */

import { FlashcardContract, Flashcard, MINIMUM_FLASHCARD_COUNT } from '../contracts/FlashcardContract';

/**
 * Validation error thrown when flashcard content is invalid
 */
export class FlashcardValidationError extends Error {
    constructor(deckId: string, reason: string) {
        super(`Flashcard validation failed for "${deckId}": ${reason}`);
        this.name = 'FlashcardValidationError';
    }
}

/**
 * Valid difficulty levels (1-5)
 */
const VALID_DIFFICULTY_LEVELS = [1, 2, 3, 4, 5] as const;

/**
 * Validates a single flashcard
 * 
 * @param card - Card object to validate
 * @param cardIndex - Index in cards array (for error messages)
 * @param deckId - Deck ID for error context
 * @throws FlashcardValidationError if card is invalid
 */
function validateFlashcard(
    card: unknown,
    cardIndex: number,
    deckId: string
): asserts card is Flashcard {
    // Type guard: ensure card is an object
    if (typeof card !== 'object' || card === null) {
        throw new FlashcardValidationError(
            deckId,
            `Card at index ${cardIndex} must be an object, got: ${typeof card}`
        );
    }

    const c = card as Record<string, unknown>;
    const cardLabel = `Card ${cardIndex + 1}`;

    // Validate: id field
    if (typeof c.id !== 'string' || c.id.trim().length === 0) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} must have a non-empty string "id" field`
        );
    }

    // Validate: front field
    if (typeof c.front !== 'string' || c.front.trim().length === 0) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) must have a non-empty string "front" field (the question/prompt)`
        );
    }

    // Validate: back field
    if (typeof c.back !== 'string' || c.back.trim().length === 0) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) must have a non-empty string "back" field (the answer)`
        );
    }

    // Validate: difficultyLevel field exists
    if (c.difficultyLevel === undefined || c.difficultyLevel === null) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) must have a "difficultyLevel" field.\n` +
            `Difficulty levels are MANDATORY for spaced repetition scheduling.`
        );
    }

    // Validate: difficultyLevel is a number
    if (typeof c.difficultyLevel !== 'number') {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) "difficultyLevel" must be a number, got: ${typeof c.difficultyLevel}`
        );
    }

    // CRITICAL: Validate difficultyLevel is in valid range (1-5)
    if (!VALID_DIFFICULTY_LEVELS.includes(c.difficultyLevel as 1 | 2 | 3 | 4 | 5)) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) "difficultyLevel" must be 1, 2, 3, 4, or 5, got: ${c.difficultyLevel}\n` +
            `Difficulty scale:\n` +
            `  1 = Basic definition (<5 sec recall)\n` +
            `  2 = Simple relationship (formula, basic property)\n` +
            `  3 = Moderate complexity (multi-step reasoning)\n` +
            `  4 = Advanced (derivation steps, complex relationships)\n` +
            `  5 = Expert (subtle distinctions, proof steps)`
        );
    }

    // Quality check: front and back should be substantial (at least 3 characters)
    // This catches lazy "A" / "B" type cards
    if ((c.front as string).trim().length < 3) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) front is too brief (${(c.front as string).length} chars).\n` +
            `Flashcard fronts should be clear questions/prompts. Minimum 3 characters expected.`
        );
    }

    if ((c.back as string).trim().length < 3) {
        throw new FlashcardValidationError(
            deckId,
            `${cardLabel} (id: ${c.id}) back is too brief (${(c.back as string).length} chars).\n` +
            `Flashcard backs should be complete answers. Minimum 3 characters expected.`
        );
    }

    // All validations passed for this card
}

/**
 * Validates flashcard deck JSON structure and all cards
 * 
 * VALIDATION STEPS:
 * 1. Check deck structure conformance to FlashcardContract
 * 2. Ensure ≥10 cards (MINIMUM_FLASHCARD_COUNT)
 * 3. Validate each card:
 *    - Has all required fields (id, front, back, difficultyLevel)
 *    - difficultyLevel is 1, 2, 3, 4, or 5
 *    - front and back are substantial (≥3 chars)
 * 
 * @param flashcards - Flashcard deck data object
 * @throws FlashcardValidationError if validation fails
 */
export function validateFlashcards(flashcards: unknown): asserts flashcards is FlashcardContract {
    // Type guard: ensure flashcards is an object
    if (typeof flashcards !== 'object' || flashcards === null) {
        throw new FlashcardValidationError(
            'unknown',
            'Flashcard deck data must be an object'
        );
    }

    const deckObj = flashcards as Record<string, unknown>;

    // Validate: id field
    if (typeof deckObj.id !== 'string' || deckObj.id.trim().length === 0) {
        throw new FlashcardValidationError(
            'unknown',
            'Flashcard deck must have a non-empty string "id" field'
        );
    }

    const deckId = deckObj.id as string;

    // Validate: cards field is array
    if (!Array.isArray(deckObj.cards)) {
        throw new FlashcardValidationError(
            deckId,
            'Flashcard deck "cards" field must be an array'
        );
    }

    // CRITICAL: Validate minimum card count (prevents trivial decks)
    if (deckObj.cards.length < MINIMUM_FLASHCARD_COUNT) {
        throw new FlashcardValidationError(
            deckId,
            `Flashcard deck must have at least ${MINIMUM_FLASHCARD_COUNT} cards, found ${deckObj.cards.length}.\n` +
            `This minimum ensures sufficient material for spaced repetition. ` +
            `A concept worth teaching has at least ${MINIMUM_FLASHCARD_COUNT} facts/relationships worth memorizing.`
        );
    }

    // Validate each card
    deckObj.cards.forEach((card, index) => {
        validateFlashcard(card, index, deckId);
    });

    // All validations passed - flashcard deck conforms to contract
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const flashcardData = JSON.parse(await fs.readFile('flashcards.json', 'utf-8'));
 *   validateFlashcards(flashcardData);
 *   // If we reach here, flashcard deck is valid with ≥10 cards
 * } catch (error) {
 *   if (error instanceof FlashcardValidationError) {
 *     console.error('Invalid flashcard deck:', error.message);
 *     // Reject content, do NOT load
 *   }
 * }
 */
