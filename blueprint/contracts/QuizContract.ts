/**
 * QUIZ CONTRACT
 * 
 * WHY THIS EXISTS:
 * - Every concept must have assessments to verify understanding
 * - Prevents "I think I get it" false confidence
 * - Forces creation of questions that test depth, not just memorization
 * 
 * ENFORCEMENT PHILOSOPHY:
 * - Minimum 10 questions (no trivial 3-question quizzes)
 * - BOTH correct reasoning AND incorrect reasoning must be explained
 * - No "check the docs" lazy answers
 */

export interface QuizQuestion {
    /**
     * Unique identifier for this question
     * Example: "ct-signals-q1"
     * 
     * WHY REQUIRED: Enables tracking attempts, analytics, and ordering
     */
    id: string;

    /**
     * The question text or prompt
     * Example: "Which of the following is true about continuous-time signals?"
     * 
     * WHY REQUIRED: Obviously needed for a quiz question
     */
    prompt: string;

    /**
     * Array of answer options
     * MUST have at least 2 options (otherwise it's not a question)
     * Typically 4 options for multiple choice
     * 
     * WHY REQUIRED: Questions need choices
     * WHY ARRAY: Supports multiple-choice format
     */
    options: [string, string, ...string[]]; // Minimum 2 options

    /**
     * The correct answer (must match one of the options exactly)
     * Example: "Continuous-time signals are defined for all values of time"
     * 
     * WHY REQUIRED: Must have a correct answer to validate responses
     * WHY STRING: Matches against options array
     */
    correctAnswer: string;

    /**
     * Detailed explanation of why the correct answer is correct
     * AND why each incorrect answer is wrong
     * 
     * Example:
     * "The correct answer is A because continuous-time signals have defined 
     * values at every instant t ∈ ℝ. Option B is wrong because discrete-time 
     * signals are only defined at integer time indices. Option C is incorrect 
     * because..."
     * 
     * WHY REQUIRED: Learning happens in the explanation, not the selection
     * WHY DETAILED: Students must understand their mistakes
     * MUST INCLUDE: Why correct answer is right + why each wrong answer is wrong
     */
    explanation: string;

    /**
     * FORBIDDEN FIELDS (DO NOT ADD):
     * - hint?: string              ❌ Makes questions too easy
     * - explanation?: string       ❌ Explanation is MANDATORY, not optional
     * - points?: number            ❌ All questions are equal; prevents gaming
     * - difficulty?: string        ❌ Students shouldn't see this (bias)
     * 
     * Keep quizzes simple and uniform. The goal is learning, not gamification.
     */
}

export interface QuizContract {
    /**
     * Unique identifier for this quiz
     * Example: "continuous-time-signals-quiz"
     * 
     * WHY REQUIRED: Links quiz to parent concept
     */
    id: string;

    /**
     * Array of quiz questions
     * MUST contain at least 10 questions
     * 
     * WHY MINIMUM 10: 
     * - Forces comprehensive coverage of the concept
     * - Prevents lazy 2-3 question "quizzes" that don't test depth
     * - Ensures multiple angles of the concept are tested
     * 
     * WHY REQUIRED:
     * - A quiz without questions is useless
     * - Every concept must be assessable
     */
    questions: [
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        QuizQuestion,
        ...QuizQuestion[] // Minimum 10 enforced via tuple
    ];

    /**
     * FORBIDDEN FIELDS (DO NOT ADD):
     * - questions?: QuizQuestion[]        ❌ Questions are MANDATORY
     * - passingScore?: number             ❌ No scoring; this is for learning
     * - timeLimit?: number                ❌ No time pressure; defeats learning
     * - randomize?: boolean               ❌ Order is intentional (easy → hard)
     * 
     * Quizzes are learning tools, not gatekeepers.
     */
}

/**
 * MINIMUM QUESTION COUNT
 * Exported for validators to reference
 */
export const MINIMUM_QUIZ_QUESTIONS = 10;

/**
 * USAGE EXAMPLE:
 * 
 * const quiz: QuizContract = {
 *   id: "continuous-time-signals-quiz",
 *   questions: [
 *     {
 *       id: "q1",
 *       prompt: "What defines a continuous-time signal?",
 *       options: [
 *         "Defined for all t ∈ ℝ",
 *         "Defined only at integer t",
 *         "Always periodic",
 *         "Must be bounded"
 *       ],
 *       correctAnswer: "Defined for all t ∈ ℝ",
 *       explanation: "Correct answer is A because continuous-time signals 
 *                    are functions of a continuous variable t. Option B 
 *                    describes discrete-time signals. Option C is wrong 
 *                    because not all continuous signals are periodic (e.g., 
 *                    exponential decay). Option D is incorrect as many valid 
 *                    continuous signals are unbounded (e.g., t²)."
 *     },
 *     // ... 9 more questions minimum
 *   ]
 * };
 */
