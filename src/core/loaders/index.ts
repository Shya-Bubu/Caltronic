/**
 * LOADERS INDEX
 * 
 * Central export for all content loaders.
 * 
 * USAGE:
 * Loaders are the ONLY gateway from filesystem to application state.
 * All loaders:
 * - Call validators before returning data
 * - Throw on validation failures (no silent fallbacks)
 * - Return typed, validated data
 * 
 * IMPORT HIERARCHY:
 * loadQuiz, loadFlashcards  (atomic loaders)
 *         ↓
 *    loadConcept  (composite loader, uses quiz/flashcard loaders)
 *         ↓
 *    loadLecture  (metadata only, references concepts)
 */

// Atomic loaders (no dependencies on other loaders)
export { loadQuiz, QuizLoadError } from './loadQuiz';
export { loadFlashcards, FlashcardLoadError } from './loadFlashcards';

// Metadata loader
export { loadLecture, LectureLoadError } from './loadLecture';

// Composite loader (depends on quiz and flashcard loaders)
export { loadConcept, ConceptLoadError, type LoadedConcept } from './loadConcept';

/**
 * LOADING WORKFLOW:
 * 
 * 1. Application requests content (e.g., lecture page)
 * 2. Loader reads from filesystem
 * 3. Loader parses JSON/reads files
 * 4. Loader calls validators (CRITICAL STEP)
 * 5. Validators check structure, minimums, quality
 * 6. If invalid: Error thrown → Content rejected → User sees error
 * 7. If valid: Typed data returned → Safe to render
 * 
 * GUARANTEES:
 * - If a loader returns data, that data is VALID
 * - If data is invalid, loader THROWS (never returns partial/corrupt data)
 * - Validators are ALWAYS called (no bypass)
 * - No silent failures or defaults
 */

/**
 * EXAMPLE: Load entire lecture with all concepts
 * 
 * ```typescript
 * import { loadLecture, loadConcept } from '@/core/loaders';
 * 
 * async function loadFullLecture(lecturePath: string) {
 *   // 1. Load lecture metadata
 *   const lecture = await loadLecture(lecturePath);
 *   console.log(`Loading lecture: ${lecture.title}`);
 *   
 *   // 2. Load all concepts
 *   const concepts = await Promise.all(
 *     lecture.concepts.map(conceptId =>
 *       loadConcept(`/content/concepts/${conceptId}`)
 *     )
 *   );
 *   
 *   // 3. All content is now validated and safe to render
 *   return {
 *     lecture,
 *     concepts,
 *   };
 * }
 * 
 * try {
 *   const lectureData = await loadFullLecture('/content/lectures/lecture-01');
 *   // Render to user - all content is validated
 * } catch (error) {
 *   // ANY validation failure causes entire load to fail
 *   console.error('Cannot load lecture:', error.message);
 *   // Show error to user, do NOT render partial content
 * }
 * ```
 */

/**
 * ERROR HIERARCHY:
 * 
 * LoadError (filesystem/parsing issues)
 *   - LectureLoadError
 *   - ConceptLoadError
 *   - QuizLoadError
 *   - FlashcardLoadError
 * 
 * ValidationError (content quality issues)
 *   - LectureValidationError
 *   - ConceptValidationError
 *   - QuizValidationError
 *   - FlashcardValidationError
 * 
 * Both types are fatal - content is rejected if EITHER occurs
 */
