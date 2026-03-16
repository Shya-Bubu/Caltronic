# Caltronic System Blueprint

## What the system is

Caltronic V2 is a filesystem-driven educational web app for electrical and electronic engineering lessons.

It is not a CMS, not a notes dump, and not a backend-heavy platform. The real system is:

1. A Next.js App Router frontend.
2. A strict content repository under `src/content`.
3. Server-side loaders that read lesson and concept files directly from disk.
4. Client-side lecture UX for stepping through concepts, quizzes, flashcards, and visuals.
5. LocalStorage-based progress and theme persistence.

There is no database, no auth system, and no API layer in the current app.

## Product shape

The app has a three-level navigation model:

1. Home page: shows all modules.
2. Module page: shows lessons for one module.
3. Lecture page: shows overview, concept-by-concept learning, synthesis, and resources.

Current published footprint in this repo:

- 6 modules
- 22 lessons
- 126 concepts
- 1065 inline visual markers in concept `content.md` files

## Core routes

The app uses three main routes:

- `/`
- `/[module]`
- `/[module]/[lecture]`

Key files:

- [src/app/page.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\page.tsx)
- [src/app/[module]/page.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\page.tsx)
- [src/app/[module]/[lecture]/page.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\page.tsx)

## Source of truth

There are two important truths in the repo:

1. UI truth: `src/app/data/modules.ts`
2. Content truth: the lesson and concept folders in `src/content`

For runtime navigation, `modules.ts` is the primary registry.

`module.json` files exist inside content modules, but they are not used by the current app routing or rendering flow.

Key file:

- [src/app/data/modules.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\data\modules.ts)

## Actual content model

The current runtime supports two concept formats:

1. Unified format:
   - `content.md`
   - `exam.md`
   - `visuals.json`
   - `quiz.json`
   - `flashcards.json`
2. Legacy split-layer format:
   - `intuition.md`
   - `engineering.md`
   - `mathematics.md`
   - `exam.md`
   - `visuals.json`
   - `quiz.json`
   - `flashcards.json`

Real state of the repo:

- Almost everything uses unified `content.md`
- Only 3 real concept metadata files still use `intuitionPath` / `engineeringPath` / `mathematicsPath`

Lesson structure:

```text
src/content/[module]/lessons/[lesson-id]/
  metadata.json
  overview.md
  synthesis.md
```

Concept structure used by most of the repo:

```text
src/content/[module]/concepts/[concept-id]/
  metadata.json
  content.md
  exam.md
  visuals.json
  quiz.json
  flashcards.json
```

Representative files:

- [src/content/circuit-analysis/lessons/lesson-01/metadata.json](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\content\circuit-analysis\lessons\lesson-01\metadata.json)
- [src/content/circuit-analysis/concepts/linear-resistors-ohms-law/metadata.json](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\content\circuit-analysis\concepts\linear-resistors-ohms-law\metadata.json)
- [src/content/circuit-analysis/concepts/linear-resistors-ohms-law/content.md](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\content\circuit-analysis\concepts\linear-resistors-ohms-law\content.md)
- [src/content/circuit-analysis/concepts/linear-resistors-ohms-law/visuals.json](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\content\circuit-analysis\concepts\linear-resistors-ohms-law\visuals.json)

## Lesson contract

Each lesson metadata file contains:

- `id`
- `title`
- `overviewPath`
- `synthesisPath`
- `concepts` array

The loader/validator expects at least 3 concepts per lesson.

Key files:

- [src/core/contracts/LectureContract.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\contracts\LectureContract.ts)
- [src/core/loaders/loadLecture.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\loaders\loadLecture.ts)
- [src/core/validators/validateLecture.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\validators\validateLecture.ts)

## Concept contract

Each concept metadata file contains either:

- legacy layer paths, or
- unified `contentPath`

And always:

- `examPath`
- `visualsPath`
- `quizPath`
- `flashcardsPath`

The loader then assembles a `LoadedConcept` object with raw markdown strings and parsed JSON.

Key files:

- [src/core/contracts/ConceptContract.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\contracts\ConceptContract.ts)
- [src/core/loaders/loadConcept.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\loaders\loadConcept.ts)
- [src/core/validators/validateConcept.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\validators\validateConcept.ts)

## Quiz and flashcard contracts

Quiz rules:

- `quiz.json` must contain `id` and `questions`
- minimum 10 questions
- each question must include `id`, `prompt`, `options`, `correctAnswer`, `explanation`
- `correctAnswer` must exactly match one option

Flashcard rules:

- `flashcards.json` must contain `id` and `cards`
- minimum 10 cards
- each card must include `id`, `front`, `back`, `difficultyLevel`
- difficulty level must be 1 through 5

Key files:

- [src/core/contracts/QuizContract.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\contracts\QuizContract.ts)
- [src/core/contracts/FlashcardContract.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\contracts\FlashcardContract.ts)
- [src/core/validators/validateQuiz.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\validators\validateQuiz.ts)
- [src/core/validators/validateFlashcards.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\validators\validateFlashcards.ts)

## Rendering pipeline

The lecture route works like this:

1. Read lesson metadata from disk.
2. Read `overview.md` and `synthesis.md`.
3. Read each concept listed in lesson metadata.
4. Validate concept metadata, quiz, and flashcards.
5. Pass loaded content into the client lecture UI.
6. Render markdown through `react-markdown`.
7. Replace inline `[[visual:id]]` markers with a custom visual component.

Key files:

- [src/app/[module]/[lecture]/page.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\page.tsx)
- [src/app/[module]/[lecture]/LectureClient.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\LectureClient.tsx)
- [src/app/[module]/[lecture]/components/MarkdownView.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\components\MarkdownView.tsx)
- [src/app/[module]/[lecture]/components/remarkInlineVisuals.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\components\remarkInlineVisuals.ts)
- [src/app/[module]/[lecture]/components/SimulationInline.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\components\SimulationInline.tsx)

## Visual system

The visuals system is one of the defining parts of the app.

`content.md` does not embed JSX. It embeds markers:

```md
[[visual:some-id]]
```

Those markers are transformed into `simulation-inline` nodes, then resolved against the concept's `visuals.json`.

`VisualRenderer` dispatches visuals by `type`.

Important supported families:

- `plotly`
- `circuit-schematic`
- `falstad-sim`
- `ohms-law-sim`
- legacy diagram types like `signal-plot`, `time-domain`, `vi-curve`
- v3 interactive types like `v3-ohms-law`, `v3-load-line`, `v3-diode-circuit`, `v3-pwl-explorer`, `v3-waveform`, `v3-plot`, `v3-circuit`
- `image`
- `image-gallery`

Key files:

- [src/app/[module]/[lecture]/components/VisualRenderer.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\components\VisualRenderer.tsx)
- [src/app/components/PlotlyChart.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\PlotlyChart.tsx)
- [src/app/components/CircuitSchematic.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\CircuitSchematic.tsx)
- [src/app/components/FalstadEmbed.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\FalstadEmbed.tsx)
- [src/app/[module]/[lecture]/components/visualsSchema.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\components\visualsSchema.ts)

## Lecture UX state machine

The lecture experience is not free-scroll.

It is a guided shell with modes:

- `overview`
- `concepts`
- `synthesis`
- `resources`

Inside concept mode, the user views:

- unified mode: `Content`, `Exam`, `Flashcards`, `Quiz`
- legacy mode: `Intuition`, `Engineering`, `Mathematics`, `Exam`, `Quiz`, `Flashcards`

Concept completion is marked when the user advances past the last section, or when the whole lesson is marked complete on the synthesis screen.

Key files:

- [src/core/flow/useLectureFlow.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\flow\useLectureFlow.ts)
- [src/app/[module]/[lecture]/LectureClient.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\[module]\[lecture]\LectureClient.tsx)

## Persistence

The app persists user state entirely in the browser.

Theme:

- `caltronic:theme`

Lesson completion:

- `caltronic:lecture:{lectureId}:completion:v1`

Payload shape:

```json
{
  "version": 1,
  "lectureId": "lesson-01",
  "completedIds": ["concept-a", "concept-b"],
  "totalCount": 12,
  "updatedAt": 1730000000000
}
```

This means progress survives deployments because it is browser-local, not server-local.

Key files:

- [src/app/page.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\page.tsx)
- [src/app/components/LectureProgress.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\LectureProgress.tsx)
- [src/app/components/ThemeToggle.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\ThemeToggle.tsx)

## App shell

The layout stack is:

1. Root layout
2. AppChrome
3. TopNav + Breadcrumbs + ThemeToggle
4. Page content
5. Footer note

Key files:

- [src/app/layout.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\layout.tsx)
- [src/app/components/AppChrome.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\AppChrome.tsx)
- [src/app/components/TopNav.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\TopNav.tsx)
- [src/app/components/Breadcrumbs.tsx](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\components\Breadcrumbs.tsx)
- [src/app/globals.css](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\app\globals.css)

## Safety and failure behavior

The system tries hard not to crash when content is missing.

There are two loading layers:

1. strict loaders and validators
2. safe wrappers that return placeholder/error states instead of throwing into a 500

If a lesson is missing completely, the route 404s.
If a lesson exists but content is incomplete, the app renders an error screen or partial lecture with failed concepts omitted.

Key file:

- [src/core/loaders/safeLoaders.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\src\core\loaders\safeLoaders.ts)

## Authoring and maintenance pipeline

The repo includes helper scripts for:

- content validation
- manifest generation
- batch content repair
- content generation experiments

Important point: these scripts are convenience tooling, not runtime dependencies.

Key files:

- [scripts/validate-content.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\scripts\validate-content.ts)
- [scripts/generate-manifest.ts](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\scripts\generate-manifest.ts)
- [patch_content.js](c:\Users\ShyaBubu\Desktop\Caltronic app\caltronic-v2\patch_content.js)

## Raw source pipeline

The actual educational source material lives outside the app code in the workspace `raw/` folder.

That raw tree mirrors module and lesson structure and contains:

- PDFs
- transcripts
- OCR outputs
- instructions files

The intended workflow is:

1. Read raw lesson material.
2. Synthesize lesson and concept content into `src/content`.
3. Validate.
4. Render through the app.

This means the content repository is the curated teaching layer, not the raw ingestion layer.

## What I would rebuild from scratch

If I had to reproduce this system without the codebase, I would rebuild it in this order:

1. Create a Next.js App Router app with dynamic routes for `/[module]` and `/[module]/[lecture]`.
2. Create a content tree under `src/content` with `lessons/` and `concepts/`.
3. Define `modules.ts` as the UI registry.
4. Implement lesson and concept contracts plus runtime validators.
5. Implement filesystem loaders with a strict mode and a safe mode.
6. Build a lecture client that supports overview, concept stepping, synthesis, and resources.
7. Render markdown through `react-markdown` with KaTeX, GFM, and a custom inline visual marker plugin.
8. Build a visual dispatcher for Plotly, declarative SVG circuits, Falstad embeds, and custom React simulations.
9. Persist theme and completion state in localStorage.
10. Add a validation script that checks `modules.ts` against the filesystem before deployment.

## Non-obvious truths about the current system

These matter if you want to replicate the current behavior accurately:

1. The repo documentation still talks heavily about a 7-layer concept model, but the running app is mostly on the unified `content.md` model.
2. `module.json` exists but is effectively secondary; `modules.ts` drives the UI.
3. There is no backend at all. The filesystem is the content store.
4. Visual embedding is markdown-marker based, not MDX-based.
5. Progress is localStorage-only, so there is no cross-device sync.
6. The content validator currently passed cleanly when run directly with Node on March 13, 2026.
7. TypeScript `tsc --noEmit` passed.
8. ESLint currently reports multiple issues, including React hook/compiler complaints.
9. Production build verification is currently blocked in this environment by a Next workspace-root / permission issue, not by a confirmed lesson-content failure.

## Confidence statement

At this point, the system is understandable enough to reproduce without the original codebase.

The essential blueprint is:

- filesystem content repository
- strict typed contracts
- server loaders
- markdown plus inline visual markers
- lecture state machine
- localStorage persistence
- modular visual renderer
- Next.js route shell around it

That is the real architecture.
