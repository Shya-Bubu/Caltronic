/**
 * TYPES — Central type re-exports and shared utility types
 *
 * Re-exports the core types from their canonical locations so consumers
 * can import from '@/core/types' without knowing the internal file layout.
 *
 * Canonical definitions live in:
 *   - Contracts:  src/core/contracts/
 *   - Loaders:    src/core/loaders/  (LoadedConcept, SafeLoadResult, error classes)
 *   - Validators: src/core/validators/ (error classes)
 *   - Flow:       src/core/flow/     (UseLectureFlowParams, UseLectureFlowResult)
 *   - Data:       src/app/data/      (Module, LectureLink)
 */

// ── Contract types ──────────────────────────────────────────────────
export type { ConceptContract } from '../contracts/ConceptContract';
export type { LectureContract } from '../contracts/LectureContract';
export type { QuizContract, QuizQuestion } from '../contracts/QuizContract';
export type { FlashcardContract, Flashcard } from '../contracts/FlashcardContract';
export type { SimulationContract } from '../contracts/SimulationContract';
export { MINIMUM_QUIZ_QUESTIONS } from '../contracts/QuizContract';
export { MINIMUM_FLASHCARD_COUNT } from '../contracts/FlashcardContract';

// ── Loader result types ─────────────────────────────────────────────
export type { LoadedConcept } from '../loaders/loadConcept';
export type { SafeLoadResult } from '../loaders/safeLoaders';

// ── Validation error types ──────────────────────────────────────────
export { ConceptValidationError } from '../validators/validateConcept';
export { LectureValidationError } from '../validators/validateLecture';
export { QuizValidationError } from '../validators/validateQuiz';
export { FlashcardValidationError } from '../validators/validateFlashcards';

// ── Flow types ──────────────────────────────────────────────────────
export type { UseLectureFlowParams, UseLectureFlowResult } from '../flow/useLectureFlow';

// ── Utility types ───────────────────────────────────────────────────

/** A concept layer name (the keys of LoadedConcept.layers) */
export type ConceptLayerName =
  | 'intuition'
  | 'engineering'
  | 'mathematics'
  | 'exam'
  | 'summary'
  | 'content'
  | 'visuals'
  | 'quiz'
  | 'flashcards';

/** The 4 prose/markdown layers that every concept must have */
export type RequiredProseLayer = 'intuition' | 'engineering' | 'mathematics' | 'exam';

/** Difficulty level for flashcards (1-5 numeric scale) */
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

