/**
 * QUIZ VALIDATOR
 * 
 * PURPOSE:
 * Enforces QuizContract at runtime by validating:
 * - JSON structure conformance
 * - Minimum 10 questions
 * - Every question has all required fields
 * - correctAnswer matches one of the options
 * 
 * PHILOSOPHY: FAIL FAST
 * - Invalid quiz = rejected quiz
 * - No warnings, no partial acceptance
 * - Every question must be complete
 */

import { QuizContract, QuizQuestion, MINIMUM_QUIZ_QUESTIONS } from '../contracts/QuizContract';

/**
 * Validation error thrown when quiz content is invalid
 */
export class QuizValidationError extends Error {
    constructor(quizId: string, reason: string) {
        super(`Quiz validation failed for "${quizId}": ${reason}`);
        this.name = 'QuizValidationError';
    }
}

/**
 * Validates a single quiz question
 * 
 * @param question - Question object to validate
 * @param questionIndex - Index in questions array (for error messages)
 * @param quizId - Quiz ID for error context
 * @throws QuizValidationError if question is invalid
 */
function validateQuizQuestion(
    question: unknown,
    questionIndex: number,
    quizId: string
): asserts question is QuizQuestion {
    // Type guard: ensure question is an object
    if (typeof question !== 'object' || question === null) {
        throw new QuizValidationError(
            quizId,
            `Question at index ${questionIndex} must be an object, got: ${typeof question}`
        );
    }

    const q = question as Record<string, unknown>;
    const questionLabel = `Question ${questionIndex + 1}`;

    // Validate: id field
    if (typeof q.id !== 'string' || q.id.trim().length === 0) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} must have a non-empty string "id" field`
        );
    }

    // Validate: prompt field
    if (typeof q.prompt !== 'string' || q.prompt.trim().length === 0) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) must have a non-empty string "prompt" field`
        );
    }

    // Validate: options field is array
    if (!Array.isArray(q.options)) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) "options" must be an array`
        );
    }

    // Validate: minimum 2 options (otherwise it's not a question)
    if (q.options.length < 2) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) must have at least 2 options, found ${q.options.length}`
        );
    }

    // Validate: all options are non-empty strings
    q.options.forEach((option, optionIndex) => {
        if (typeof option !== 'string' || option.trim().length === 0) {
            throw new QuizValidationError(
                quizId,
                `${questionLabel} (id: ${q.id}) option at index ${optionIndex} must be a non-empty string`
            );
        }
    });

    // Validate: correctAnswer field
    if (typeof q.correctAnswer !== 'string' || q.correctAnswer.trim().length === 0) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) must have a non-empty string "correctAnswer" field`
        );
    }

    // CRITICAL: Validate correctAnswer is one of the options
    const options = q.options as string[];
    if (!options.includes(q.correctAnswer as string)) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) correctAnswer "${q.correctAnswer}" is not one of the provided options.\n` +
            `Options: ${JSON.stringify(options)}`
        );
    }

    // Validate: explanation field (MANDATORY, not optional)
    if (typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) must have a non-empty string "explanation" field.\n` +
            `Explanations are MANDATORY for learning. Must explain why correct answer is right ` +
            `AND why each incorrect answer is wrong.`
        );
    }

    // Quality check: explanation should be substantial (at least 50 characters)
    // This is a soft heuristic to catch lazy "It's correct" explanations
    if ((q.explanation as string).trim().length < 50) {
        throw new QuizValidationError(
            quizId,
            `${questionLabel} (id: ${q.id}) explanation is too brief (${(q.explanation as string).length} chars).\n` +
            `Explanations must be detailed. Explain why the correct answer is right AND why each ` +
            `incorrect answer is wrong. Minimum 50 characters expected.`
        );
    }

    // All validations passed for this question
}

/**
 * Validates quiz JSON structure and all questions
 * 
 * VALIDATION STEPS:
 * 1. Check quiz structure conformance to QuizContract
 * 2. Ensure ≥10 questions (MINIMUM_QUIZ_QUESTIONS)
 * 3. Validate each question:
 *    - Has all required fields (id, prompt, options, correctAnswer, explanation)
 *    - Has ≥2 options
 *    - correctAnswer is one of the options
 *    - explanation is non-empty and substantial
 * 
 * @param quiz - Quiz data object
 * @throws QuizValidationError if validation fails
 */
export function validateQuiz(quiz: unknown): asserts quiz is QuizContract {
    // Type guard: ensure quiz is an object
    if (typeof quiz !== 'object' || quiz === null) {
        throw new QuizValidationError(
            'unknown',
            'Quiz data must be an object'
        );
    }

    const quizObj = quiz as Record<string, unknown>;

    // Validate: id field
    if (typeof quizObj.id !== 'string' || quizObj.id.trim().length === 0) {
        throw new QuizValidationError(
            'unknown',
            'Quiz must have a non-empty string "id" field'
        );
    }

    const quizId = quizObj.id as string;

    // Validate: questions field is array
    if (!Array.isArray(quizObj.questions)) {
        throw new QuizValidationError(
            quizId,
            'Quiz "questions" field must be an array'
        );
    }

    // CRITICAL: Validate minimum question count (prevents trivial quizzes)
    if (quizObj.questions.length < MINIMUM_QUIZ_QUESTIONS) {
        throw new QuizValidationError(
            quizId,
            `Quiz must have at least ${MINIMUM_QUIZ_QUESTIONS} questions, found ${quizObj.questions.length}.\n` +
            `This minimum ensures comprehensive coverage of the concept. ` +
            `Trivial 2-3 question "quizzes" don't test depth.`
        );
    }

    // Validate each question
    quizObj.questions.forEach((question, index) => {
        validateQuizQuestion(question, index, quizId);
    });

    // All validations passed - quiz conforms to contract
}

/**
 * USAGE EXAMPLE:
 * 
 * try {
 *   const quizData = JSON.parse(await fs.readFile('quiz.json', 'utf-8'));
 *   validateQuiz(quizData);
 *   // If we reach here, quiz is valid with ≥10 questions
 * } catch (error) {
 *   if (error instanceof QuizValidationError) {
 *     console.error('Invalid quiz:', error.message);
 *     // Reject content, do NOT load
 *   }
 * }
 */
