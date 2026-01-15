/**
 * VALIDATORS INDEX
 * 
 * Central export for all runtime validators.
 * 
 * USAGE:
 * Import validators in loaders to enforce content quality at runtime.
 * All validators follow the FAIL FAST philosophy:
 * - Invalid content throws descriptive errors
 * - No warnings, no auto-fixing
 * - Content is either valid or rejected
 */

// Lecture validation
export { validateLecture, LectureValidationError } from './validateLecture';

// Concept validation
export { validateConcept, ConceptValidationError } from './validateConcept';

// Quiz validation
export { validateQuiz, QuizValidationError } from './validateQuiz';

// Flashcard validation
export { validateFlashcards, FlashcardValidationError } from './validateFlashcards';

/**
 * VALIDATION WORKFLOW:
 * 
 * 1. Content is loaded from filesystem
 * 2. JSON is parsed
 * 3. Validators check:
 *    - Structure conformance to contracts
 *    - Minimum counts (3 concepts, 10 questions, 10 cards)
 *    - File existence and non-empty content
 *    - Field validity (e.g., correctAnswer in options, difficultyLevel 1-5)
 * 4. If ANY validation fails:
 *    - Descriptive error thrown
 *    - Content rejected (not loaded)
 *    - System refuses to proceed
 * 5. If ALL validations pass:
 *    - Content is marked as valid
 *    - Safe to render to user
 * 
 * FAIL FAST BENEFITS:
 * - Prevents corrupt content from reaching users
 * - Forces content creators to meet quality standards
 * - Makes debugging easier (clear error messages)
 * - Protects users from incomplete/malformed learning material
 */

/**
 * Example usage in a content loader:
 * 
 * ```typescript
 * import { validateLecture, validateConcept, validateQuiz } from '@/core/validators';
 * 
 * async function loadLecture(lectureId: string) {
 *   try {
 *     const lectureData = JSON.parse(await fs.readFile('metadata.json', 'utf-8'));
 *     
 *     // VALIDATE before using
 *     validateLecture(lectureData, basePath);
 *     
 *     // If we reach here, lecture is valid
 *     return lectureData;
 *     
 *   } catch (error) {
 *     if (error instanceof LectureValidationError) {
 *       console.error('Cannot load lecture:', error.message);
 *       throw error; // Bubble up, don't suppress
 *     }
 *   }
 * }
 * ```
 */
