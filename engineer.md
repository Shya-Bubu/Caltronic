# Engineer Instructions — CalTronic → Lectron Transformation

> **Role**: You are the Engineer. The Master has archived CalTronic V2 and now needs you to transform it into **Lectron** — a clean, subject-agnostic, standalone learning platform that anyone on the internet can clone and use for their own courses.
>
> **Read this entire document before making any changes.**

---

## Mission Summary

CalTronic V2 is a Next.js learning platform built for Electrical & Electronic Engineering. Your job is to:

1. **Strip** all EEE-specific content (lectures, modules, raw materials, personal files)
2. **Rebrand** from "CalTronic" to "Lectron"
3. **Create** sample/demo content proving the system works
4. **Fix** the critical visual resilience bug (broken visuals should not crash text)
5. **Document** everything a new user needs to clone-and-use
6. **Push** to a new GitHub repository
7. **Report** back to the Master when done

---

## Phase 1: Understand the System

Before touching anything, read these files to understand the architecture:

| File | What it tells you |
|------|-------------------|
| `SYSTEM_BLUEPRINT.md` | Complete architecture overview |
| `agent.md` | Content creation rules, visual types, contracts |
| `src/app/data/modules.ts` | Module registry (UI source of truth) |
| `src/core/contracts/*.ts` | TypeScript type contracts |
| `src/core/loaders/*.ts` | How content is loaded from filesystem |
| `src/core/validators/*.ts` | How content is validated |
| `src/app/[module]/[lecture]/components/VisualRenderer.tsx` | Visual dispatch system |
| `HOW_TO_ADD_DIAGRAMS.md` | Visual type catalogue |

---

## Phase 2: Strip EEE Content

### 2.1 Delete Content Directories

Delete ALL module content folders (keep the `_canonical-template` and `_updates` folders if they exist — they're templates):

```
DELETE: src/content/circuit-analysis/
DELETE: src/content/signals-and-systems/
DELETE: src/content/digital-logic-design/
DELETE: src/content/analog-electronics/
DELETE: src/content/computational-methods/
DELETE: src/content/design-and-manufacturing/
```

### 2.2 Delete Raw Source Materials

```
DELETE: raw/              (entire directory — contains EEE lecture PDFs and transcripts)
```

Create an empty `raw/` directory with a `.gitkeep` and a `README.md` explaining what goes here:

```markdown
# Raw Source Materials

Place your raw lecture materials here, organized by module and lesson:

```
raw/
├── your-module-name/
│   ├── lesson-01/
│   │   ├── lecture-transcript.txt
│   │   ├── lecture-slides.pdf
│   │   └── instructions.txt    (textbook references, special notes)
│   ├── lesson-02/
│   │   └── ...
│   └── Papers/                 (past exam papers)
└── another-module/
    └── ...
```

These files are used by AI agents (following `agent.md`) to synthesize structured learning content into `src/content/`.
```

### 2.3 Delete Personal Files

From the workspace root (`Caltronic app/`):
```
DO NOT TOUCH — these are outside the git repo and belong to the user personally:
- academic.md
- shyamika.md
- caltronic-pitch-deck.html
- lfr-tutorial.html
- verilog-guide/
- free-claude-code/
- chat.txt
- report.txt
```

From inside the git repo (`caltronic-v2/`):
```
DELETE: halfduplex.md                                    (stray lecture notes)
DELETE: lecture-outlines-ss-04-07.md                     (EEE lecture outlines)
DELETE: src/content/analog-electronics/combined_content.md   (stray content dump)
DELETE: src/app/test/                                    (test directory)
DELETE: patch_content.js                                 (EEE-specific content patches)
DELETE: patch_strict_quiz.js                             (EEE-specific quiz patches)
DELETE: patch_strict_quiz_v2.js                          (EEE-specific quiz patches)
DELETE: scripts/ae03_check.txt                           (EEE validation output)
DELETE: scripts/check_ae03.js                            (EEE-specific checker)
DELETE: scripts/validate-lab02.js                        (EEE-specific validator)
DELETE: scripts/fix-content-format.js                    (EEE content fixer)
DELETE: scripts/fix-circuit-schematics.js                (EEE circuit fixer)
DELETE: scripts/fix-schematics.js                        (EEE schematic fixer)
DELETE: scripts/fix-emojis.js                            (EEE emoji fixer)
```

### 2.4 Delete EEE-Specific Public Assets

```
DELETE: public/course/          (contains EEE lecture images)
```

Create empty `public/course/` with `.gitkeep`.

### 2.5 Clean Agent Instructions

`agent.md` — This is a comprehensive content authoring guide. It needs to be **kept but generalized**:

**Remove:**
- All references to specific EEE modules (Circuit Analysis, Signals & Systems, etc.)
- All references to specific professors, University of Peradeniya, Shyamika
- The "Raw Content Source" section pointing to `C:\Users\ShyaBubu\...`
- Module-Specific Notes section (Section at bottom)
- The `update all` section listing specific EEE module codes
- Deployment Safeguards that reference specific EEE lessons

**Keep and generalize:**
- Teaching Voice section (this is universal)
- Content Structure section (4-file system is the core architecture)
- Visual system documentation (all types, contracts, prohibitions)
- Quiz and Flashcard contracts
- Progress Tracking architecture
- Content Creation Workflow
- Multi-Agent Validation Workflow
- Quality Checklist

**Update:**
- Change "Caltronic" → "Lectron" everywhere
- Change raw content source path to a generic `./raw/` relative path
- Update `update all` to say "Update all modules defined in `modules.ts`"

---

## Phase 3: Rebrand to Lectron

### 3.1 Global String Replacements

In ALL files across the repo:
- `CalTronic` → `Lectron`
- `Caltronic` → `Lectron`
- `caltronic` → `lectron` (in code identifiers, CSS classes, localStorage keys)
- `CALTRONIC` → `LECTRON`

**Special attention to:**
- `package.json` — change `"name": "caltronic-v2"` → `"name": "lectron"`
- `src/app/layout.tsx` — update page title and metadata
- `src/app/globals.css` — any caltronic-named CSS variables
- `src/app/components/TopNav.tsx` — logo text
- `src/app/components/AppChrome.tsx` — branding
- LocalStorage keys: `caltronic:theme` → `lectron:theme`, `caltronic:lecture:*` → `lectron:lecture:*`

### 3.2 Update Logos

The current logos (`public/logo.png`, `public/logo-dark.png`, `public/logo-light.png`) have CalTronic branding. Options:
1. **Best**: Generate new Lectron logos (use text-based SVG for now)
2. **Acceptable**: Remove logos, use text-only branding

### 3.3 Update Module Registry

Rewrite `src/app/data/modules.ts` to contain ZERO modules (empty array) with a comment explaining how to add modules:

```typescript
export interface LectureLink {
  id: string;
  title: string;
  path: string;
}

export interface Module {
  id: string;
  slug: string;
  code: string;
  title: string;
  description?: string;
  category?: string;
  accent?: string;
  updatedToWeek?: number;
  progress?: number;
  lectures: LectureLink[];
}

/**
 * Module Registry — Add your modules here.
 *
 * Each module needs:
 * 1. An entry in this array (defines UI navigation)
 * 2. A matching content directory in src/content/[slug]/
 *    with lessons/ and concepts/ subdirectories
 *
 * See README.md for the complete content structure guide.
 *
 * Example:
 * {
 *   id: "CS101",
 *   slug: "intro-to-cs",
 *   code: "CS101-2026",
 *   title: "Introduction to Computer Science",
 *   description: "Fundamentals of programming and computational thinking.",
 *   category: "Core",
 *   accent: "#6b62ff",
 *   updatedToWeek: 4,
 *   lectures: [
 *     { id: "lesson-01", title: "What is a Computer?", path: "/intro-to-cs/lesson-01" },
 *   ],
 * }
 */
export const modules: Module[] = [];
```

---

## Phase 4: Create Sample Content

Create ONE demo module to prove the system works. This is critical — a user cloning the repo needs to see something working immediately.

### Demo Module: `sample-course`

Create the following structure:

```
src/content/sample-course/
├── module.json
├── lessons/
│   └── lesson-01/
│       ├── metadata.json
│       ├── overview.md
│       └── synthesis.md
└── concepts/
    ├── what-is-lectron/
    │   ├── metadata.json
    │   ├── content.md
    │   ├── exam.md
    │   ├── quiz.json
    │   ├── flashcards.json
    │   └── visuals.json
    ├── content-structure/
    │   ├── metadata.json
    │   ├── content.md
    │   ├── exam.md
    │   ├── quiz.json
    │   ├── flashcards.json
    │   └── visuals.json
    └── visual-types-gallery/
        ├── metadata.json
        ├── content.md
        ├── exam.md
        ├── quiz.json
        ├── flashcards.json
        └── visuals.json
```

**Concept 1: "What is Lectron?"** — Explains what the platform does, how it works, and what a student gets from it.

**Concept 2: "Content Structure"** — Teaches users how lessons and concepts are organized. Uses actual content structure as the subject matter.

**Concept 3: "Visual Types Gallery"** — A showcase of EVERY working visual type. Include one example of each:
- `plotly` (simple line chart)
- `circuit-schematic` (basic resistor circuit)
- `falstad-sim` (simple RC circuit)
- `v3-ohms-law` simulator
- `v3-load-line` simulator
- `block-diagram`
- `sine-wave`
- `discrete-stem`
- `vi-curve`

This concept serves as both documentation AND a test — if all visuals render, the system is working.

**Add to modules.ts:**
```typescript
{
  id: "DEMO",
  slug: "sample-course",
  code: "DEMO-001",
  title: "Welcome to Lectron",
  description: "A guided tour of the Lectron platform and its features.",
  category: "Demo",
  accent: "#6b62ff",
  updatedToWeek: 1,
  lectures: [
    { id: "lesson-01", title: "Getting Started", path: "/sample-course/lesson-01" },
  ],
}
```

**All content must follow the contracts:**
- `quiz.json`: ≥10 questions, unique IDs, correctAnswer matches option, explanation >50 chars
- `flashcards.json`: ≥10 cards, unique IDs, difficultyLevel 1-5
- `content.md`: 2000-3000 words with `[[visual:id]]` markers
- `visuals.json`: all IDs match markers in content.md

---

## Phase 5: Fix Visual Resilience (CRITICAL)

**The Problem**: When an interactive visual fails to render (bad data, missing renderer, JavaScript error), it crashes the entire concept view. The student can't even read the surrounding text.

**The Fix**: Add error boundaries around visual rendering.

### File: `src/app/[module]/[lecture]/components/VisualRenderer.tsx`

Wrap the visual dispatch in a React Error Boundary. When a visual fails:
1. Show a styled fallback box with the visual's title and type
2. Log the error to console
3. **Do not crash the parent component** — text above and below must remain readable

### File: `src/app/[module]/[lecture]/components/SimulationInline.tsx`

Same treatment — wrap in error boundary.

### File: `src/app/[module]/[lecture]/components/MarkdownView.tsx`

Ensure that if the remark plugin fails to parse a `[[visual:id]]` marker, it degrades to showing the raw marker text rather than crashing.

### Implementation Pattern:

```tsx
// VisualErrorBoundary.tsx
'use client';
import React from 'react';

interface Props {
  visualTitle?: string;
  visualType?: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class VisualErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[Lectron] Visual render failed: ${this.props.visualTitle}`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          border: '1px solid rgba(255,107,138,0.3)',
          borderRadius: '8px',
          padding: '16px 20px',
          margin: '16px 0',
          background: 'rgba(255,107,138,0.05)',
          color: 'inherit',
        }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>
            ⚠️ Visual failed to render
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.7 }}>
            {this.props.visualTitle || 'Unknown'} ({this.props.visualType || 'unknown type'})
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
```

Wrap every visual render call in `<VisualErrorBoundary>`.

---

## Phase 6: Write the Lectron README

Create a fresh, welcoming README for the Lectron repo. It should feel like a product README, not an academic project. Key sections:

1. **Hero** — One-line pitch: "Turn your lecture notes into an interactive learning experience"
2. **Features** — Multi-layer learning, interactive visuals, quizzes, flashcards, progress tracking
3. **Quick Start** — Clone → install → run → see the demo
4. **How to Add Your Own Content** — Step-by-step guide:
   - Create module directory in `src/content/`
   - Add to `modules.ts`
   - Create lesson and concept files following the contracts
   - Run content validation
5. **Content Structure Reference** — File formats for each type
6. **Visual Types Reference** — Complete catalogue with example JSON for each type
7. **AI-Assisted Content Creation** — How to use `agent.md` with AI coding assistants to generate content from raw lectures
8. **Architecture** — Brief technical overview
9. **License** — MIT

---

## Phase 7: Create New Repository

1. Initialize a new git repo (remove the `.git` directory first)
2. Create a new repository on GitHub: `Shya-Bubu/Lectron`
3. Set as origin, commit everything, push

```bash
rm -rf .git
git init
git add .
git commit -m "Initial release: Lectron — AI-orchestrated learning platform"
git remote add origin https://github.com/Shya-Bubu/Lectron.git
git branch -M main
git push -u origin main
```

---

## Phase 8: Report to Master

When you're done, create a `worker-report.md` file in the repo root with:

1. **What was done** — Summary of all changes
2. **What works** — Confirmed working features
3. **What needs attention** — Any issues found during cleanup
4. **Content stats** — New repo stats (file count, demo content)
5. **Screenshots** — If possible, capture the app running with demo content
6. **Next steps** — What the Master should review

The Master will then:
1. Review your work
2. Update the README if needed
3. Create LinkedIn promotional content
4. Record a demo video

---

## Checklist

Use this to track your progress:

- [ ] Read and understand the system (Phase 1)
- [ ] Delete all EEE content directories (Phase 2.1)
- [ ] Delete raw source materials, create empty raw/ with README (Phase 2.2)
- [ ] Delete personal/stray files (Phase 2.3)
- [ ] Clean public/course/ (Phase 2.4)
- [ ] Generalize agent.md (Phase 2.5)
- [ ] Global CalTronic → Lectron rename (Phase 3.1)
- [ ] Update/replace logos (Phase 3.2)
- [ ] Rewrite modules.ts (Phase 3.3)
- [ ] Create sample-course module with 3 concepts (Phase 4)
- [ ] Fix visual error boundaries (Phase 5)
- [ ] Write the Lectron README (Phase 6)
- [ ] Create new GitHub repo and push (Phase 7)
- [ ] Write worker-report.md (Phase 8)

---

## Important Rules

1. **Do NOT modify the core rendering pipeline** unless fixing the visual resilience bug. The loaders, validators, contracts, and lecture flow should remain identical.
2. **Do NOT change the 4-file concept model** (content.md, exam.md, quiz.json, flashcards.json + visuals.json). This is the core architecture.
3. **Do NOT remove the visual system** — it's the platform's key differentiator.
4. **DO test the app** — run `npm run dev` and verify the sample content renders correctly.
5. **DO run `npm run build`** — ensure production build passes.
6. The `.agent/` directory (if it exists) contains AI skill files. Keep it — it's useful for future AI-assisted content creation.

---

> **Reminder**: The Master is watching. Do clean, professional work. When you're done, the Master will review everything before it goes public.
