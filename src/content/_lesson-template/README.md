# Canonical Lesson Template

**DO NOT RENDER THIS DIRECTORY DIRECTLY**

This folder is the single source of truth for lesson and concept structure.
Copy this entire folder when creating new lessons.

## Usage

To create a new lesson:
1. Copy this entire `_lesson-template` folder
2. Rename to your lesson ID (e.g., `lesson-05`)
3. Place in `src/content/[module]/lessons/`
4. Update all files with actual content
5. Create concepts in `src/content/[module]/concepts/` using the concept template

## Structure

```
_lesson-template/
├── metadata.json           # Lesson configuration (edit IDs, title, concepts)
├── overview.md             # Pre-concept framing (REQUIRED, non-empty)
├── synthesis.md            # Post-concept summary (REQUIRED, non-empty)
├── raw/                    # Source materials
│   └── resources.txt       # Links to lecture videos, PDFs, etc.
└── _concept-template/      # Template for concepts (copy to concepts folder)
    ├── metadata.json       # Concept configuration
    ├── intuition.md        # Layer 1: Accessible explanation (IQ 100-110)
    ├── engineering.md      # Layer 2: Practical application (IQ 110-120)
    ├── mathematics.md      # Layer 3: Formal rigor (IQ 120-135+)
    ├── exam.md             # Layer 4: Exam patterns and strategies
    ├── visuals.json        # Layer 5: Diagram/animation definitions
    ├── quiz.json           # Layer 6: ≥10 questions with explanations
    ├── flashcards.json     # Layer 7: ≥10 cards for spaced repetition
    └── images/             # Local images for this concept
```

## Contract Requirements

### Lesson Requirements
- `metadata.json` with id, title, overviewPath, synthesisPath, concepts array
- `concepts` array must contain ≥3 concept IDs
- `overview.md` must exist and be non-empty
- `synthesis.md` must exist and be non-empty

### Concept Requirements
- ALL 7 layer files MUST exist and be non-empty
- `quiz.json` must have ≥10 questions with explanations
- `flashcards.json` must have ≥10 cards with difficulty levels 1-5
- Each question/card must meet minimum content requirements

## Validation

Content is validated at:
- Load time (runtime validators)
- Build time (CI/CD)

Invalid content will be **REJECTED** with descriptive error messages.
No silent failures. No partial content.
