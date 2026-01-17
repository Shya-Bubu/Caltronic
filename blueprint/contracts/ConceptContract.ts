/**
 * CONCEPT CONTRACT
 * 
 * WHY THIS EXISTS:
 * - The concept is the ATOMIC UNIT of learning in this system
 * - Every concept must teach at multiple cognitive levels (intuition → exam)
 * - Forces decomposition of complex topics into teachable chunks
 * - Prevents shallow "here's the formula" teaching
 * 
 * ENFORCEMENT PHILOSOPHY:
 * - ALL fields are REQUIRED (no optionals, no unions, no escape hatches)
 * - Each field is a PATH (not inline content) to enforce file-per-layer architecture
 * - No flexibility = no shortcuts = guaranteed depth
 * 
 * THE LEARNING LAYERS:
 * This contract enforces that EVERY concept is taught through 6 mandatory lenses:
 * 1. Intuition  - "What is this? Why does it matter?"
 * 2. Engineering - "How is this used in practice?"
 * 3. Mathematics - "What are the formal relationships and derivations?"
 * 4. Exam - "What variations appear in tests? What are the traps?"
 * 5. Visuals - "How do we SEE this concept?"
 * 6. Assessment - "Can the student prove understanding?"
 */

export interface ConceptContract {
    /**
     * Unique identifier for this concept
     * Example: "continuous-time-signals"
     * 
     * WHY REQUIRED: Enables cross-referencing between concepts and navigation
     */
    id: string;

    /**
     * Human-readable concept title
     * Example: "Continuous-Time Signals"
     * 
     * WHY REQUIRED: Navigation, headings, and UX
     */
    title: string;

    /**
     * Path to the intuition layer file
     * Example: "/content/signals/concepts/continuous-time/intuition.md"
     * 
     * WHY REQUIRED: Every concept needs an intuitive, accessible entry point
     * WHY SEPARATE FILE: Prevents mixing cognitive levels (IQ 100-110 explanations)
     * 
     * CONTENT EXPECTATIONS:
     * - Plain language explanation
     * - Real-world analogies
     * - "What" and "Why" before "How"
     */
    intuitionPath: string;

    /**
     * Path to the engineering layer file
     * Example: "/content/signals/concepts/continuous-time/engineering.md"
     * 
     * WHY REQUIRED: Connects theory to practice (IQ 110-120 application)
     * WHY SEPARATE FILE: Engineering context is distinct from math rigor
     * 
     * CONTENT EXPECTATIONS:
     * - Practical applications
     * - Engineering trade-offs
     * - When to use this concept in real systems
     */
    engineeringPath: string;

    /**
     * Path to the mathematics layer file
     * Example: "/content/signals/concepts/continuous-time/mathematics.md"
     * 
     * WHY REQUIRED: Formal understanding is non-negotiable (IQ 120-135+ rigor)
     * WHY SEPARATE FILE: Math deserves focused attention without clutter
     * 
     * CONTENT EXPECTATIONS:
     * - Formal definitions
     * - Complete derivations (no "it can be shown that...")
     * - Mathematical properties and proofs
     */
    mathematicsPath: string;

    /**
     * Path to the exam strategy layer file
     * Example: "/content/signals/concepts/continuous-time/exam.md"
     * 
     * WHY REQUIRED: Students must see how concepts appear in assessments
     * WHY SEPARATE FILE: Exam patterns are distinct from learning
     * 
     * CONTENT EXPECTATIONS:
     * - Common problem variations
     * - Tricks and traps in exam questions
     * - Time-saving strategies
     * - Worked examples from past papers
     */
    examPath: string;

    /**
     * Path to the visuals configuration file
     * Example: "/content/signals/concepts/continuous-time/visuals.json"
     * 
     * WHY REQUIRED: Every concept must be visualized (diagrams, animations, graphs)
     * WHY SEPARATE FILE: Visual assets are distinct from text content
     * 
     * CONTENT EXPECTATIONS:
     * - Illustrations
     * - Interactive animations
     * - Parameter-tunable simulations
     * - Mind maps
     */
    visualsPath: string;

    /**
     * Path to the quiz configuration file
     * Example: "/content/signals/concepts/continuous-time/quiz.json"
     * 
     * WHY REQUIRED: Self-assessment is mandatory for every concept
     * WHY SEPARATE FILE: Quiz data is structured differently from teaching content
     * 
     * CONTENT EXPECTATIONS:
     * - Must satisfy QuizContract (minimum 10 questions)
     * - Detailed explanations for every answer
     */
    quizPath: string;

    /**
     * Path to the flashcards configuration file
     * Example: "/content/signals/concepts/continuous-time/flashcards.json"
     * 
     * WHY REQUIRED: Spaced repetition support for every concept
     * WHY SEPARATE FILE: Flashcard data is distinct from teaching flow
     * 
     * CONTENT EXPECTATIONS:
     * - Must satisfy FlashcardContract (minimum 10 cards)
     * - Covers key definitions, formulas, and relationships
     */
    flashcardsPath: string;

    /**
     * FORBIDDEN FIELDS (DO NOT ADD):
     * - content?: string        ❌ Would allow dumping everything in metadata
     * - body?: string           ❌ Same problem
     * - layers?: any            ❌ Would make layers optional
     * - optional*?: string      ❌ All layers are mandatory
     * 
     * Every concept MUST teach through ALL layers.
     * No shortcuts. No summarization. No "coming soon."
     */
}

/**
 * CONTENT DIRECTORY STRUCTURE (ENFORCED):
 * 
 * content/
 * └── [module]/
 *     └── concepts/
 *         └── [concept-id]/
 *             ├── intuition.md       ← ConceptContract.intuitionPath
 *             ├── engineering.md     ← ConceptContract.engineeringPath
 *             ├── mathematics.md     ← ConceptContract.mathematicsPath
 *             ├── exam.md            ← ConceptContract.examPath
 *             ├── visuals.json       ← ConceptContract.visualsPath
 *             ├── quiz.json          ← ConceptContract.quizPath (QuizContract)
 *             └── flashcards.json    ← ConceptContract.flashcardsPath (FlashcardContract)
 * 
 * This structure is NOT optional. Validators must enforce it.
 */
