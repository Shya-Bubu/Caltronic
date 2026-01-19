# Lesson Blueprint Template

To create or update a lesson, copy this structure and fill in the blanks.

## Metadata (`metadata.json`)
```json
{
  "id": "lesson-XX",
  "title": "Lesson Title",
  "overviewPath": "overview.md",
  "synthesisPath": "synthesis.md",
  "concepts": [
    "concept-1-slug",
    "concept-2-slug"
  ]
}
```

## Folder Structure
```text
lesson-XX/
├── metadata.json
├── overview.md
├── synthesis.md
└── raw/
    └── (Source materials here)
```

## Concept Structure (in `../../concepts/concept-slug/`)
Every concept MUST have these files:

1.  **intuition.md**
    -   Real-world analogy
    -   Core "Why?" and "What?"
    -   Visuals: Block diagrams, high-level flows
2.  **engineering.md**
    -   Implementation details
    -   Constraints (bandwidth, noise, cost)
    -   Visuals: Schematics, timing diagrams
3.  **mathematics.md**
    -   Derivations and proofs
    -   Formal definitions
    -   Visuals: Plots, graphs
4.  **exam.md**
    -   Typical problem solving
    -   Step-by-step examples
5.  **visuals.json** (CRITICAL)
    -   Definitions for d3-waveform, d3-block-diagram, etc.
    -   Minimum 8+ visuals per concept.
6.  **quiz.json**
    -   5-10 multiple choice questions with detailed explanations.
7.  **flashcards.json**
    -   Key terms and definitions.

## Visuals Checklist
- [ ] Diagram for Intuition (Block/Analogy)
- [ ] Diagram for Engineering (Schematic/System)
- [ ] Plot/Graph for Mathematics
- [ ] Interactive Simulation where applicable
