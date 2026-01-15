/**
 * FLASHCARD CONTRACT
 * 
 * WHY THIS EXISTS:
 * - Spaced repetition is critical for long-term retention
 * - Forces distillation of concepts into memorable atomic facts
 * - Every concept must be "flashcard-able" (if it can't be, it's too vague)
 * 
 * ENFORCEMENT PHILOSOPHY:
 * - Minimum 10 cards per concept (ensures comprehensive coverage)
 * - Difficulty levels enable adaptive review scheduling
 * - No optional fields (every card needs front, back, difficulty)
 */

export interface Flashcard {
    /**
     * Unique identifier for this flashcard
     * Example: "ct-signal-def-1"
     * 
     * WHY REQUIRED: Enables tracking review history and spaced repetition
     */
    id: string;

    /**
     * The front of the card (the question or prompt)
     * Example: "Define a continuous-time signal"
     * 
     * WHY REQUIRED: The stimulus that triggers recall
     * SHOULD BE: Concise, clear, unambiguous
     */
    front: string;

    /**
     * The back of the card (the answer)
     * Example: "A signal x(t) defined for all t ∈ ℝ, where t is continuous"
     * 
     * WHY REQUIRED: The information to be recalled
     * SHOULD BE: Precise, complete, but not verbose
     */
    back: string;

    /**
     * Difficulty level (1-5 scale)
     * 1 = Basic definition (should recall in <5 seconds)
     * 2 = Simple relationship (formula, basic property)
     * 3 = Moderate complexity (multi-step reasoning)
     * 4 = Advanced (derivation steps, complex relationships)
     * 5 = Expert (subtle distinctions, proof steps)
     * 
     * WHY REQUIRED: Enables adaptive scheduling (review hard cards more often)
     * WHY NUMBER: Allows algorithmic weighting for spaced repetition
     * WHY 1-5 SCALE: Balances granularity with simplicity
     */
    difficultyLevel: 1 | 2 | 3 | 4 | 5;

    /**
     * FORBIDDEN FIELDS (DO NOT ADD):
     * - hint?: string                    ❌ Flashcards test recall, not recognition
     * - difficultyLevel?: number         ❌ Difficulty is MANDATORY
     * - tags?: string[]                  ❌ Overcomplicates; concept ID is the tag
     * - image?: string                   ❌ Keep flashcards text-based for simplicity
     * - lastReviewed?: Date              ❌ User data, not card data
     * 
     * Flashcards should be pure content. User progress is tracked separately.
     */
}

export interface FlashcardContract {
    /**
     * Unique identifier for this flashcard deck
     * Example: "continuous-time-signals-flashcards"
     * 
     * WHY REQUIRED: Links deck to parent concept
     */
    id: string;

    /**
     * Array of flashcards
     * MUST contain at least 10 cards
     * 
     * WHY MINIMUM 10:
     * - A concept worth teaching has at least 10 facts/relationships worth memorizing
     * - Prevents trivial "decks" with 2-3 cards
     * - Ensures spaced repetition has enough material to work with
     * 
     * WHY REQUIRED:
     * - Flashcard deck without cards is useless
     * - Every concept must have memorable takeaways
     */
    cards: [
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        Flashcard,
        ...Flashcard[] // Minimum 10 enforced via tuple
    ];

    /**
     * FORBIDDEN FIELDS (DO NOT ADD):
     * - cards?: Flashcard[]              ❌ Cards are MANDATORY
     * - optional?: boolean               ❌ Flashcards are never optional
     * - algorithm?: string               ❌ Spaced repetition algo is separate concern
     * 
     * This contract is about content only. Review scheduling is handled elsewhere.
     */
}

/**
 * MINIMUM CARD COUNT
 * Exported for validators to reference
 */
export const MINIMUM_FLASHCARD_COUNT = 10;

/**
 * DIFFICULTY DISTRIBUTION RECOMMENDATION:
 * While not enforced in the contract, a well-balanced deck should have:
 * - 30% Level 1-2 (definitions, basic facts)
 * - 40% Level 3 (core relationships and formulas)
 * - 30% Level 4-5 (advanced derivations and subtle points)
 * 
 * This ensures both breadth (basics) and depth (advanced) are reviewable.
 */

/**
 * USAGE EXAMPLE:
 * 
 * const flashcards: FlashcardContract = {
 *   id: "continuous-time-signals-flashcards",
 *   cards: [
 *     {
 *       id: "card-1",
 *       front: "Define continuous-time signal",
 *       back: "A signal x(t) defined for all real values of t",
 *       difficultyLevel: 1
 *     },
 *     {
 *       id: "card-2",
 *       front: "What is the relationship between continuous-time and frequency domain?",
 *       back: "Related via Fourier Transform: X(ω) = ∫ x(t)e^(-jωt) dt",
 *       difficultyLevel: 3
 *     },
 *     // ... 8 more cards minimum
 *   ]
 * };
 */
