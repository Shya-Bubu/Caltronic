/**
 * CORE CONTRACTS INDEX
 * 
 * This file exports all contracts that define the structure of learning content.
 * 
 * PHILOSOPHY:
 * These contracts are the ENFORCEMENT LAYER that prevents shallow teaching.
 * By making all fields required and setting minimums, we make it structurally
 * impossible to create summarized, low-quality content.
 * 
 * USAGE:
 * Import these contracts in:
 * - Validators (to enforce at runtime)
 * - Loaders (to ensure type safety when reading content)
 * - Content creation tools (to guide authors)
 */

// Core learning structure
export type { LectureContract, MinimumConceptCount } from './LectureContract';
export type { ConceptContract } from './ConceptContract';

// Assessment contracts
export type { QuizContract, QuizQuestion } from './QuizContract';
export { MINIMUM_QUIZ_QUESTIONS } from './QuizContract';

export type { FlashcardContract, Flashcard } from './FlashcardContract';
export { MINIMUM_FLASHCARD_COUNT } from './FlashcardContract';

/**
 * CONTENT HIERARCHY:
 * 
 * Module
 *   └─ Lecture (LectureContract)
 *       ├─ Overview (file)
 *       ├─ Concept 1 (ConceptContract)
 *       │   ├─ intuition.md
 *       │   ├─ engineering.md
 *       │   ├─ mathematics.md
 *       │   ├─ exam.md
 *       │   ├─ visuals.json
 *       │   ├─ quiz.json (QuizContract)
 *       │   └─ flashcards.json (FlashcardContract)
 *       ├─ Concept 2 (ConceptContract)
 *       ├─ Concept 3 (ConceptContract)
 *       └─ Synthesis (file)
 * 
 * ENFORCEMENT RULES:
 * 1. Lectures MUST have ≥3 concepts
 * 2. Concepts MUST have all 7 layers (no optionals)
 * 3. Quizzes MUST have ≥10 questions
 * 4. Flashcards MUST have ≥10 cards
 * 5. All fields are required (no ?, no unions, no escape hatches)
 */
