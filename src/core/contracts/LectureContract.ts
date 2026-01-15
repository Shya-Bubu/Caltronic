/**
 * LECTURE CONTRACT
 * 
 * WHY THIS EXISTS:
 * - Prevents the "single-file lecture" anti-pattern that killed the old system
 * - Enforces that lectures are COLLECTIONS of concepts, not monolithic content blobs
 * - Makes it structurally impossible to summarize or skip depth
 * 
 * ENFORCEMENT PHILOSOPHY:
 * - Every field is REQUIRED (no optionals)
 * - Lectures MUST have at least 3 concepts (arbitrary minimum to prevent trivial lectures)
 * - No "content" field allowed - all content must live in concept files
 * - Overview and synthesis are separate files to force intentional framing
 */

export interface LectureContract {
    /**
     * Unique identifier for this lecture
     * Example: "signals-systems-lecture-01"
     * 
     * WHY REQUIRED: Enables referencing, tracking, and routing
     */
    id: string;

    /**
     * Human-readable title
     * Example: "Introduction to Signals and Systems"
     * 
     * WHY REQUIRED: Navigation and UX
     */
    title: string;

    /**
     * Path to the overview markdown file
     * Example: "/content/signals-systems/lecture-01/overview.md"
     * 
     * WHY REQUIRED: Every lecture needs context-setting before diving into concepts
     * WHY A PATH: Forces overview into its own file, preventing bloat in metadata
     */
    overviewPath: string;

    /**
     * Array of concept IDs that comprise this lecture
     * MUST contain at least 3 concepts
     * 
     * WHY REQUIRED: Lectures are CONTAINERS for concepts, not content holders themselves
     * WHY MINIMUM 3: Prevents trivial single-concept "lectures" that should be concepts
     * WHY ARRAY: Enforces that knowledge is decomposed into atomic units
     */
    concepts: [string, string, string, ...string[]]; // Minimum 3 using tuple + rest

    /**
     * Path to the synthesis/conclusion markdown file
     * Example: "/content/signals-systems/lecture-01/synthesis.md"
     * 
     * WHY REQUIRED: Forces reflection on how concepts connect
     * WHY A PATH: Keeps lecture structure clean and synthesis intentional
     */
    synthesisPath: string;

    /**
     * FORBIDDEN FIELDS (DO NOT ADD):
     * - content: string  ❌ Would allow single-file lectures
     * - body: string     ❌ Same problem
     * - markdown: string ❌ Same problem
     * 
     * The lecture contract is ONLY metadata and structure.
     * All actual teaching content lives in concept files.
     */
}

/**
 * TYPE GUARD: Ensures at least 3 concepts
 * This is enforced at the type level via tuple syntax above,
 * but validators should also check this at runtime
 */
export type MinimumConceptCount = 3;
