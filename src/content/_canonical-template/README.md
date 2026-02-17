# Canonical Template v3.0

> **This is the ONE TRUE TEMPLATE** — All future lessons MUST use this structure.

## Quick Start

1. Copy `lesson.template/` to `src/content/[module]/lessons/[lesson-id]/`
2. Copy `concept.template/` to `src/content/[module]/concepts/[concept-id]/` (3+ times)
3. Update all metadata.json files with correct IDs
4. Fill all markdown and JSON files — NO EMPTY FILES ALLOWED

## Critical Rules

1. **Minimum 3 concepts per lesson** — validated at runtime
2. **Minimum 10 quiz questions per concept** — validated at runtime
3. **Minimum 10 flashcards per concept** — validated at runtime
4. **Diagrams render ABOVE text** — use `<!-- DIAGRAM: id -->` markers
5. **Simulations render BELOW text** — use `<!-- SIMULATION: id -->` markers
6. **Every concept has continuation context** — no isolated concepts

## Visual Placement

```
╔══════════════════════════════════════════════════════════════╗
║  <!-- DIAGRAM: diag-01 -->                                   ║
║  ┌──────────────────────────────────────┐                    ║
║  │         D3 DIAGRAM RENDERS HERE      │                    ║
║  └──────────────────────────────────────┘                    ║
║                                                              ║
║  Explanatory paragraph that references the diagram above...  ║
║                                                              ║
║  More explanation text that sets up the simulation...        ║
║                                                              ║
║  <!-- SIMULATION: sim-01 -->                                 ║
║  ┌──────────────────────────────────────┐                    ║
║  │       SIMULATION RENDERS HERE        │                    ║
║  │       [Interactive Controls]         │                    ║
║  └──────────────────────────────────────┘                    ║
╚══════════════════════════════════════════════════════════════╝
```

## Template Files

```
_canonical-template/
├── README.md           # This file
├── lesson.template/    # Copy for each lesson
│   ├── metadata.json
│   ├── overview.md
│   └── synthesis.md
└── concept.template/   # Copy for each concept (≥3 per lesson)
    ├── metadata.json
    ├── intuition.md
    ├── engineering.md
    ├── mathematics.md
    ├── exam.md
    ├── visuals.json
    ├── quiz.json
    └── flashcards.json
```
