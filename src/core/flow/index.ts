/**
 * FLOW CONTROL INDEX
 * 
 * Central export for learning flow hooks and utilities.
 * 
 * PHILOSOPHY:
 * Flow control manages the LEARNING EXPERIENCE state machine:
 * - How users progress through content
 * - When they can advance
 * - What they've completed
 * 
 * This layer is UI-agnostic pure logic.
 * UI components will consume these hooks.
 */

export { useLectureFlow, type UseLectureFlowParams, type UseLectureFlowResult } from './useLectureFlow';

/**
 * FLOW ARCHITECTURE:
 * 
 * Current State:
 * - useLectureFlow: Concept-by-concept progression
 * 
 * Future Extensions:
 * - useQuizFlow: Quiz completion tracking
 * - useFlashcardFlow: Spaced repetition scheduling
 * - useProgressPersistence: Save/restore state
 * - useLearningAnalytics: Track time, attempts, patterns
 */

/**
 * CORE FLOW PRINCIPLES:
 * 
 * 1. EARNED PROGRESSION
 *    - Users must complete current step to unlock next
 *    - No skipping ahead (enforces depth)
 * 
 * 2. FREE REVIEW
 *    - Users can always go backwards
 *    - Completed content remains accessible
 * 
 * 3. DETERMINISTIC STATE
 *    - Given same inputs, same outputs
 *    - No hidden state, no magic
 * 
 * 4. SEPARATION OF CONCERNS
 *    - Flow = logic (this layer)
 *    - UI = presentation (separate layer)
 *    - Storage = persistence (separate layer)
 */
