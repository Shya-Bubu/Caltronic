/**
 * QUIZ LOADER
 * 
 * PURPOSE:
 * Load quiz JSON from filesystem and validate it against QuizContract.
 * This is the ONLY way quiz data should enter the application.
 * 
 * PHILOSOPHY:
 * - Load, validate, return OR throw
 * - No silent failures
 * - No default values
 * - Validators enforce quality
 */

import { readFile } from 'fs/promises';
import { QuizContract } from '../contracts/QuizContract';
import { validateQuiz, QuizValidationError } from '../validators/validateQuiz';

/**
 * Error thrown when quiz loading fails
 */
export class QuizLoadError extends Error {
    constructor(path: string, reason: string, cause?: Error) {
        super(`Failed to load quiz from "${path}": ${reason}`);
        this.name = 'QuizLoadError';
        this.cause = cause;
    }
}

/**
 * Load quiz JSON from filesystem and validate
 * 
 * PROCESS:
 * 1. Read JSON file from disk
 * 2. Parse JSON
 * 3. Validate against QuizContract (fails fast on invalid data)
 * 4. Return typed QuizContract
 * 
 * @param quizPath - Absolute path to quiz.json file
 * @returns Promise<QuizContract> - Validated quiz data
 * @throws QuizLoadError if file cannot be read
 * @throws QuizValidationError if quiz data is invalid
 */
export async function loadQuiz(quizPath: string): Promise<QuizContract> {
    try {
        // Step 1: Read file from disk
        const fileContent = await readFile(quizPath, 'utf-8');

        // Step 2: Parse JSON
        let quizData: unknown;
        try {
            quizData = JSON.parse(fileContent);
        } catch (parseError) {
            throw new QuizLoadError(
                quizPath,
                'Failed to parse JSON. File may be malformed.',
                parseError as Error
            );
        }

        // Step 3: Validate (throws QuizValidationError if invalid)
        // This is THE CRITICAL STEP - validators enforce quality
        validateQuiz(quizData);

        // Step 4: Return typed data
        // TypeScript now knows quizData is QuizContract thanks to assertion signature
        return quizData;

    } catch (error) {
        // Re-throw validation errors as-is (they have good messages)
        if (error instanceof QuizValidationError) {
            throw error;
        }

        // Re-throw our own load errors
        if (error instanceof QuizLoadError) {
            throw error;
        }

        // Wrap filesystem errors
        throw new QuizLoadError(
            quizPath,
            `Filesystem error: ${(error as Error).message}`,
            error as Error
        );
    }
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const quiz = await loadQuiz('/content/concepts/ct-signals/quiz.json');
 *   // quiz is guaranteed to:
 *   // - Have ≥10 questions
 *   // - Have valid structure
 *   // - Have explanations ≥50 chars
 *   // - Have correctAnswer in options
 *   
 *   console.log(`Loaded ${quiz.questions.length} questions`);
 *   
 * } catch (error) {
 *   if (error instanceof QuizValidationError) {
 *     console.error('Invalid quiz data:', error.message);
 *   } else if (error instanceof QuizLoadError) {
 *     console.error('Quiz load failed:', error.message);
 *   }
 *   // Do NOT render quiz to user
 * }
 */
