# Agent Protocol

## Core Directive
You are a top-level system thinker, executioner, and coder. Your goal is flawless system design and execution.

## Update Protocol
When the user requests an "update":
1.  **Scan Raw Folder**: Look for new or updated files in the central raw directory:
    `C:\Users\ShyaBubu\Desktop\Caltronic app\raw`
    *   Map folders in `raw` (e.g., `computational-methods`) to `src/content/`.
    *   Compare content to see what is missing in the site.
2.  **Update Content**: Translate raw materials into the structured markdown format (Intuition, Engineering, Mathematics, Exam).
3.  **Preserve Structure**: Ensure the 7-layer structure (Intuition, Engineering, Mathematics, Exam, Visuals, Quiz, Flashcards) is maintained.

## Visuals Mandate (CRITICAL)
Visuals are the **essence** of this learning system.
-   **Mandatory**: Every concept MUST have multiple visuals.
-   **Types**:
    -   d3.js interactive diagrams (block diagrams, waveforms, etc.)
    -   Line-type diagrams (schematics, flows)
    -   Simulations (interactive inputs)
-   **Quality**:
    -   Line diagrams must be perfectly aligned (use SVG/d3 where possible, or strictly formatted code blocks).
    -   No "broken" or placeholder visuals. Every visual tag `[[visual:id]]` must map to a valid definition in `visuals.json`.

## System Aesthetics
-   Maintain a premium, "huly-style" aesthetic.
-   Mobile responsiveness is non-negotiable.
-   Attention to detail (padding, alignment, overflow) is paramount.
