# Content Directory

## Responsibility
This directory stores all learning content for the CalTronic V2 system.

**CRITICAL**: This system enforces CONCEPT-BASED learning architecture.
Single-file lectures are **FORBIDDEN** and will be rejected by validators.

## System Hardening (v2.0)

This content system has been hardened with the following guarantees:

### 1. Graceful Degradation
- Missing or invalid content shows helpful error messages
- The app NEVER crashes with 500 errors due to content issues
- Partial content is handled gracefully

### 2. Contract Enforcement
- All content is validated against strict TypeScript contracts
- Content that doesn't meet requirements is rejected at load time
- Minimum requirements: 3 concepts per lesson, 10 quiz questions, 10 flashcards

### 3. Single Source of Truth
- `src/app/data/modules.ts` defines what the UI displays
- Content validation runs against the filesystem
- `npm run validate-content` verifies everything matches

### 4. Canonical Template
- `_lesson-template/` contains the authoritative structure
- Copy this folder when creating new lessons
- All files in template are REQUIRED for valid lessons

## Enforcement Philosophy
- Lectures are **containers** for concepts, not content holders
- Concepts are the **atomic unit** of learning
- Every concept teaches through **7 mandatory layers**
- No optionals, no shortcuts, no summarization

## Mandatory Structure (ENFORCED BY CONTRACTS)

```
content/
└── [module-name]/
    ├── lectures/
    │   └── [lecture-id]/
    │       ├── metadata.json          # LectureContract (lecture config)
    │       ├── overview.md             # Pre-concept framing
    │       └── synthesis.md            # Post-concept integration
    │
    └── concepts/
        └── [concept-id]/
            ├── intuition.md            # Layer 1: Accessible entry (IQ 100-110)
            ├── engineering.md          # Layer 2: Practical application (IQ 110-120)
            ├── mathematics.md          # Layer 3: Formal rigor (IQ 120-135+)
            ├── exam.md                 # Layer 4: Assessment patterns
            ├── visuals.json            # Layer 5: Diagrams, animations
            ├── quiz.json               # Layer 6: QuizContract (≥10 questions)
            └── flashcards.json         # Layer 7: FlashcardContract (≥10 cards)
```

## Example: Signals and Systems - Lecture 01

```
content/
└── signals-and-systems/
    ├── lectures/
    │   └── lecture-01/
    │       ├── metadata.json
    │       ├── overview.md
    │       └── synthesis.md
    │
    └── concepts/
        ├── continuous-time-signals/
        │   ├── intuition.md
        │   ├── engineering.md
        │   ├── mathematics.md
        │   ├── exam.md
        │   ├── visuals.json
        │   ├── quiz.json
        │   └── flashcards.json
        │
        ├── discrete-time-signals/
        │   ├── intuition.md
        │   ├── engineering.md
        │   ├── mathematics.md
        │   ├── exam.md
        │   ├── visuals.json
        │   ├── quiz.json
        │   └── flashcards.json
        │
        └── signal-operations/
            ├── intuition.md
            ├── engineering.md
            ├── mathematics.md
            ├── exam.md
            ├── visuals.json
            ├── quiz.json
            └── flashcards.json
```

## Contract Enforcement

### LectureContract (`metadata.json`)
- **MUST** have 3+ concept IDs
- **MUST** reference `overview.md` and `synthesis.md`
- **CANNOT** contain inline content

### ConceptContract (enforced per concept folder)
- **ALL 7 files are REQUIRED** (no optionals)
- Each layer teaches at a different cognitive level
- Missing any file = validation failure

### QuizContract (`quiz.json`)
- **MINIMUM 10 questions** per concept
- Each question **MUST** have detailed explanations
- Must explain both correct AND incorrect answers

### FlashcardContract (`flashcards.json`)
- **MINIMUM 10 cards** per concept
- Each card **MUST** have difficulty level (1-5)
- Supports spaced repetition algorithms

## Why This Structure Exists

### ❌ OLD SYSTEM (FAILED)
```
lecture-01/
└── content.mdx          # Everything in one file = shallow teaching
```

**Problems:**
- AI could dump knowledge without decomposition
- No enforcement of depth or multi-level teaching
- Easy to summarize or skip rigorous derivations
- Validators had nothing to check

### ✅ NEW SYSTEM (ENFORCED)
```
lecture-01/
├── overview.md                     # Intentional framing
├── synthesis.md                    # Intentional integration
└── concepts/
    └── concept-x/
        ├── intuition.md            # MUST exist
        ├── engineering.md          # MUST exist
        ├── mathematics.md          # MUST exist
        ├── exam.md                 # MUST exist
        ├── visuals.json            # MUST exist
        ├── quiz.json               # MUST exist (≥10 questions)
        └── flashcards.json         # MUST exist (≥10 cards)
```

**Benefits:**
- Structurally impossible to create shallow content
- Each concept taught through multiple lenses
- Validators can enforce completeness
- Clear separation of cognitive levels

## Content Creation Rules

1. **No content in lecture metadata** - Lectures only reference concepts
2. **All 7 concept files required** - No "coming soon" placeholders
3. **Minimum counts enforced** - 10 quiz questions, 10 flashcards, 3 concepts per lecture
4. **No optional fields** - If a contract field exists, it's required
5. **Path-based references** - All content lives in files, not in JSON blobs

## Validation
Content will be validated against these contracts at:
- Build time (TypeScript compiler)
- Load time (runtime validators)
- Deployment time (CI/CD checks)

**Invalid content will be REJECTED**, not warned.
