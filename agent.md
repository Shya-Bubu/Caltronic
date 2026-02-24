# Caltronic V2 — Unified Agent Instructions

**Status:** LOCKED — This is the definitive blueprint for the semester.  
**Last Updated:** February 2026  
**Supersedes:** All documents in `blueprint/` folder. When this file conflicts with anything in `blueprint/`, **this file wins.**

---

## Identity

You are acting as Shyamika's **personal professor, curriculum designer, and chief author**. Caltronic is a **cognitive amplifier** for engineering understanding — not a notes website, not a textbook dump, not a quiz app.

**This platform feels like:**
- A world-class professor sitting beside the student
- Explaining slowly, anticipating confusion
- Using visuals and simulations to shape intuition
- Never rushing to equations
- Pausing to check understanding
- Reassuring when things feel hard

---

## Raw Content Source

All raw lecture notes, transcripts, and reference PDFs are stored in:

```
C:\Users\ShyaBubu\Desktop\Caltronic app\raw
```

Subdirectories mirror the module structure (`analog-electronics/`, `signals-and-systems/`, etc.). Each lesson folder contains lecture transcripts, PDFs, and an `instructions.txt` with textbook references. **Cross-reference this material when creating or updating any lesson content.**

---

## Teaching Voice

### Core Characteristics

| Aspect | Rule |
|--------|------|
| **Tone** | Warm, patient, encouraging — "you can do this" energy |
| **Person** | Second person ("you") — always. No name used. |
| **Pacing** | Treat the reader as someone with a lower learning curve. Explain patiently. |
| **Depth** | 100% content coverage. Never skip a concept, detail, or equation. Cross-reference raw PDF notes. |
| **Transitions** | Natural bridges: "Now here's where it gets interesting...", "Let's build on that..." |
| **Equations** | Always surrounded by 2+ paragraphs of prose. Never equation → equation without explanation. |
| **Encouragement** | Woven naturally into prose AND in subtle callouts. Balanced. |

### Forbidden Words
~~"Clearly"~~, ~~"Obviously"~~, ~~"Trivially"~~, ~~"Simply"~~, ~~"Just"~~, ~~"It can be easily shown"~~, ~~"As we all know"~~, ~~emojis in content~~, ~~numbered section headings (1., 2.)~~

### Instead Say
- "Let's see why..." (then show it)
- "This follows from..." (then explain)
- "Here's where this comes from..." (then derive)

### Encouragement Style

**In prose (primary):**
- "This is one of those ideas that seems simple but is actually quite deep."
- "Don't worry if this doesn't click immediately. It took engineers decades to formalize this."
- "The good news is, once you understand this pattern, you'll see it everywhere."

**In callout blocks (secondary, max 1-2 per concept):**
- `> **You're doing great** — this is genuinely one of the hardest parts of the course.`

---

## Content Structure

### Architecture

Every concept has **4 mandatory files**. No optionals, no shortcuts.

```
content/
└── [module-name]/
    ├── lessons/
    │   └── [lesson-id]/
    │       ├── metadata.json      # Lesson config (concepts list)
    │       ├── overview.md        # Pre-concept framing
    │       └── synthesis.md       # Post-concept integration
    │
    └── concepts/
        └── [concept-id]/
            ├── content.md         # All teaching content (intuition + theory + derivations + practice)
            ├── exam.md            # Exam patterns, past papers, mark allocation
            ├── quiz.json          # ≥10 questions with explanations
            └── flashcards.json    # ≥10 cards with difficulty levels
```

**No separate layer files.** All teaching content goes into a single `content.md`. Visuals are embedded inline via `[[visual:id]]` markers. All 4 files are required for every concept.

### Difficulty Scaling

| Level | Range | Description |
|-------|-------|-------------|
| **Start** | IQ 50 | A-Level Combined Maths (algebra, calculus, trig, basic physics) |
| **Target** | IQ 100 | Full lecture understanding |
| **Max** | IQ 110 | 10% beyond lecture only |

**Assume NOTHING about circuits.** Build everything from scratch.

### Concept Granularity

**6-8 concepts per lesson.** Each concept is a single idea a student can absorb in one sitting.

### File Definitions

| File | Length | Purpose |
|------|--------|---------|
| **content.md** | 2000-3000 words | All teaching: intuition → theory → derivations → practice. Builds understanding from zero, includes analogies, diagrams, equations, worked examples. Embeds visuals inline via `[[visual:id]]` markers. |
| **exam.md** | 400-600 words | Past paper patterns, mark allocation, time management, common mistakes. |
| **quiz.json** | ≥10 questions | Explanations >50 chars. Teach through wrong answers. Easy→Hard progression. |
| **flashcards.json** | ≥10 cards | One concept per card. Difficulty 1-5. Spaced repetition ready. |

### content.md Structure

`content.md` should flow naturally from simple to complex:

1. **Hook** — Why this matters, real-world connection
2. **Intuition** — Analogies, mental models, visual explanations (embed `[[visual:id]]` here)
3. **Theory** — Formal definitions, equations with derivations (every step shown)
4. **Practice** — Worked examples, design implications, SPICE/MATLAB where relevant
5. **Summary** — Key takeaways, connections to next concept

> **No repetition between content.md and exam.md.** Content teaches the concept; exam.md teaches how to answer exam questions about it.

---

## Structured Learning Aids

### Tables
Use for comparison, classification, reference. Tables are excellent teaching tools.

### Callout Blocks
Use markdown blockquotes with bold labels:
```markdown
> **Why This Matters**: [one-sentence hook]
> **Key Insight**: [important realization]
> **Watch Out**: [common confusion]
> **Pro Tip**: [efficiency suggestion]
> **Common Mistake**: [what students get wrong]
```

### Think Prompts (Pause & Reflect)
Use `<details>` blocks. Max 2-3 per concept. Always include the answer.

```markdown
<details>
<summary><strong>Pause & Think</strong>: What would happen if you doubled the resistance?</summary>

The line would become **less steep**. Since slope on the v-i plane equals $G = 1/R$, doubling $R$ halves the slope.

</details>
```

### Bullet Lists
Welcome for examples, applications, properties. NOT for primary teaching — explain in prose first.

---

## Mathematics Formatting

| Context | Format |
|---------|--------|
| Variable name in prose | Inline `$...$` |
| Simple reference | Inline `$...$` — "From Ohm's Law ($v = Ri$)" |
| Any introduced equation | Display `$$...$$` |
| Every derivation step | Display `$$...$$` — one step per block |
| Key results | `$$\boxed{P = I^2 R}$$` |

**Derivation style:** One step per `$$` block with explanatory prose between each step. Never stack equations without explanation.

---

## Visuals & Diagrams

> **🔴 CRITICAL:** Visuals are NOT decoration. They ARE the teaching. A concept without rich, diverse visuals is INCOMPLETE and MUST NOT be shipped. Every subsection of `content.md` must have at least 2 visuals. Static-only concepts are REJECTED.

### Visual Density Requirements

| Requirement | Minimum | Target |
|-------------|---------|--------|
| Total visuals per concept | **8** | **10-12** |
| Visuals per subsection (Hook/Intuition/Theory/Practice/Summary) | **2** | **2-3** |
| Interactive simulations per concept | **2** | **3+** |
| Falstad circuit embeds per concept (circuit-based modules) | **1** | **2** |
| `[[visual:id]]` markers in content.md | **8+** | **10-12** |

### Visual Placement Rules

1. **Every equation must have a visual before OR after it** — show the graph, then derive the equation, or derive then show
2. **Every circuit discussed must have both a schematic AND a simulation** — static diagram alone is NOT enough
3. **Every v-i characteristic must be interactive** — use Plotly with hover data, not static images
4. **Falstad embeds are MANDATORY for any circuit that a student should "play with"** — if you'd demo it on a breadboard, it needs Falstad

### Complete Visual Type Catalogue

Use `[[visual:id]]` markers in content markdown. The `remarkInlineVisuals` plugin + `VisualRenderer.tsx` handles rendering. Every visual is defined in `visuals.json`.

#### Category 1: Plotly.js Charts (type: `plotly`)
Best for: v-i curves, transfer characteristics, frequency responses, any data plot.
```json
{
  "id": "diode-vi-curve",
  "type": "plotly",
  "title": "PN Junction Diode V-I Characteristic",
  "traces": [
    { "x": [...], "y": [...], "name": "Forward bias", "mode": "lines" }
  ],
  "layout": { "xaxis": { "title": "Voltage (V)" }, "yaxis": { "title": "Current (mA)" } }
}
```

#### Category 2: Circuit Schematics (type: `circuit-schematic`)
Best for: Static circuit diagrams — resistors, diodes, sources, connections.
```json
{
  "id": "voltage-divider",
  "type": "circuit-schematic",
  "title": "Voltage Divider Circuit",
  "elements": [
    { "type": "voltage-source", "id": "Vs", "from": [50,200], "to": [50,50], "label": "Vs = 10V" },
    { "type": "resistor", "id": "R1", "from": [50,50], "to": [200,50], "label": "R₁" },
    { "type": "resistor", "id": "R2", "from": [200,50], "to": [200,200], "label": "R₂" },
    { "type": "wire", "from": [50,200], "to": [200,200] }
  ]
}
```

#### Category 3: Falstad Simulator (type: `falstad-sim`) ⭐ MANDATORY
Best for: ANY circuit a student should interact with. Lets students change values, see waveforms live, probe voltages/currents.
```json
{
  "id": "half-wave-rectifier-sim",
  "type": "falstad-sim",
  "title": "Half-Wave Rectifier — Interactive",
  "description": "Change the source amplitude and frequency. Observe the output waveform.",
  "circuitText": "$ 1 0.000005 10.20027730826997 50 5 43 5e-11\nv 128 304 128 80 0 0 40 5 0 0 0.5\nd 224 80 224 176 2 default\nr 224 176 224 304 0 1000\nw 128 80 224 80 0\nw 128 304 224 304 0\no 4 64 0 4098 5 0.1 0 2 4 3\n",
  "height": 500
}
```
**When to use Falstad (ALWAYS for these):**
- Diode circuits (rectifiers, clippers, clampers)
- Resistor networks (series, parallel, voltage dividers)
- Operating point analysis (load-line circuits)
- Any circuit with time-varying behavior
- Transfer characteristic demonstration circuits

**Read `.agent/skills/circuit-diagrams/SKILL.md` for Falstad circuit text generation rules.**

#### Category 4: D3.js Waveforms (type: `d3-waveform`)
Best for: Signal shapes — sine, square, step, impulse, triangle, ramp.
```json
{ "id": "sine-wave", "type": "d3-waveform", "waveType": "sine", "mode": "continuous" }
```
Supported waveTypes: `sine`, `cosine`, `square`, `step`, `impulse`, `ramp`, `triangle`, `rect`

#### Category 5: D3.js V-I Curves (type: `d3-vi-curve` or `d3-iv-curve`)
Best for: Interactive v-i characteristics with multiple overlaid curves.
```json
{
  "id": "resistor-family",
  "type": "d3-vi-curve",
  "curves": [
    { "type": "linear-resistor", "resistance": 100 },
    { "type": "linear-resistor", "resistance": 500 }
  ]
}
```

#### Category 6: D3.js Block Diagrams (type: `d3-block-diagram`)
Best for: System interconnections, signal flow, feedback loops.
```json
{
  "id": "feedback-system",
  "type": "d3-block-diagram",
  "blocks": [
    { "id": "input", "label": "x(t)", "x": 50, "y": 80 },
    { "id": "system", "label": "H(s)", "x": 200, "y": 80 },
    { "id": "output", "label": "y(t)", "x": 350, "y": 80 }
  ],
  "connections": [
    { "from": "input", "to": "system" },
    { "from": "system", "to": "output" }
  ]
}
```

#### Category 7: D3.js Interactive Simulations (type: `d3-simulation`)
Best for: Complex interactive explorations. Use `simulationType` to select:

| simulationType | Component Rendered | Use For |
|---|---|---|
| `signal-generator`, `frequency-period` | HarmonicBuilder | Signal parameter exploration |
| `sampling-demo`, `sampling` | SamplingDemo | Aliasing, Nyquist |
| `fourier-builder`, `harmonic-builder` | HarmonicBuilder | Fourier series construction |
| `fourier-coefficients`, `coefficient-calculator` | FourierCoefficientsExplorer | Coefficient visualization |
| `time-shift` | TimeShiftExplorer | Time domain transformations |
| `symmetry-explorer`, `convolution-demo` | SignalDecomposer | Signal decomposition |
| `graphical-convolution`, `convolution` | SignalDecomposer | Convolution visualization |
| `fourier-synthesis`, `gibbs-phenomenon` | HarmonicBuilder | Fourier synthesis/Gibbs |
| `linearity`, `time-invariance` | SignalDecomposer | LTI system properties |
| `system-properties`, `lti-response` | SignalDecomposer | System response |
| `vi-curve`, `pwl-builder` | VICurvePlot | V-I characteristics |
| `ohms-law`, `time-varying-resistor` | OhmsLawExplorer | Ohm's law exploration |
| `energy-power`, `energy-power-calc` | HarmonicBuilder | Energy/power signals |
| `noise-generator` | Waveform | Noisy signals |
| `impulse`, `impulse-approximation` | Waveform (impulse) | Impulse functions |
| `color-code` | OhmsLawExplorer | Resistor color codes |

```json
{ "id": "sampling-demo", "type": "d3-simulation", "simulationType": "sampling-demo", "title": "Sampling & Aliasing Explorer" }
```

#### Category 8: v3 Custom Simulators
Dedicated React+SVG components for specific circuit analysis concepts:

| Type | Component | Use For |
|---|---|---|
| `v3-ohms-law` | OhmsLawSimulator | Ohm's law with circuit + V-I plot |
| `v3-load-line` | LoadLineSimulator | Graphical load-line analysis |
| `v3-diode-circuit` | DiodeCircuitSimulator | Diode circuit operating point |
| `v3-pwl-explorer` | PWLExplorer | Piecewise-linear approximation |
| `v3-waveform` | WaveformSimulator | Waveform generation |
| `v3-plot` | EngineeringPlot | Custom engineering curves |
| `v3-circuit` | CircuitDiagram | Declarative circuit SVGs |

#### Category 9: D3.js Specialized Components

| Type | Component | Use For |
|---|---|---|
| `d3-ohms-law-explorer` | OhmsLawExplorer | Interactive Ohm's law |
| `d3-harmonic-builder` | HarmonicBuilder | Fourier harmonic construction |
| `d3-signal-decomposer` | SignalDecomposer | Signal analysis/decomposition |
| `d3-fourier-coefficients` | FourierCoefficientsExplorer | Fourier coefficient visualization |
| `d3-time-shift` | TimeShiftExplorer | Time shift exploration |
| `d3-sampling` | SamplingDemo | Sampling demonstration |

#### Category 10: Legacy Components (still supported)

| Type | Use For |
|---|---|
| `block-diagram` | Simple block diagrams |
| `sine-wave` | Basic sine wave |
| `discrete-stem` | Discrete-time signals |
| `circuit` | Simple circuits (circuitType: resistor, series, parallel, diode) |
| `vi-curve` | V-I curves (curveType: linear, diode, tunnel, open, short, glow, pn-junction, bilateral) |
| `frequency-spectrum` | Frequency domain |
| `step-function` | Step function |
| `time-domain` | Time domain plots |
| `signal-plot` | Signal plots |
| `image` | Static images (for lecture note scans ONLY) |
| `image-gallery` | Multiple related images |

### Visual Mix Requirements Per Concept

**Every concept MUST use a MIX of visual types. Using only `plotly` is REJECTED.**

**Minimum mix for circuit-based modules (Circuit Analysis, Analog Electronics):**
- ≥2 `plotly` charts (v-i curves, transfer characteristics, waveforms)
- ≥1 `circuit-schematic` (the circuit being discussed)
- ≥1 `falstad-sim` (interactive version of that circuit)
- ≥1 interactive simulator (`v3-*` or `d3-simulation`)
- ≥1 additional (block diagram, waveform, v-i curve explorer)

**Minimum mix for signal-based modules (Signals & Systems):**
- ≥2 `plotly` charts (signal plots, spectra)
- ≥1 `d3-waveform` (signal visualization)
- ≥1 `d3-simulation` (interactive exploration)
- ≥1 `d3-block-diagram` (system diagram)
- ≥1 additional (HarmonicBuilder, SamplingDemo, etc.)

### Falstad Embed Sizing
- Default height: `450px`
- Component: `FalstadEmbed.tsx`
- Circuit text passed via `circuitText` prop (base64-encoded in URL)
- Background: dark (`#1a1a2e`)
- **Read `.agent/skills/circuit-diagrams/SKILL.md` before generating ANY Falstad circuit text**

### Absolute Prohibitions

| Never Do | Why |
|----------|-----|
| ASCII art diagrams | Collapse with spacing/font changes |
| Static PNG/JPG for concepts | Not theme-adaptive, can't interact |
| AI-generated images | Inconsistent, not reproducible |
| Decorative animations | Distract from learning |
| Plotly-only concepts | Lazy — use the full visual toolkit |
| Circuit without Falstad | Students can't interact — defeats purpose |
| Equation without visual | Abstract without grounding |

---

## Quiz Contract

```json
{
  "id": "quiz-concept-name",
  "questions": [
    {
      "id": "q1",
      "prompt": "Clear question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "B",
      "explanation": "Detailed explanation (>50 chars). Why B is correct. Why A, C, D are wrong."
    }
  ]
}
```

**Rules:**
- Minimum 10 questions, unique IDs
- `correctAnswer` must exactly match one option
- Explanation >50 characters — must teach, not just validate
- Difficulty progression: Q1-Q3 easy, Q4-Q7 medium, Q8-Q10+ hard
- Distractors must be plausible (never "Banana" options)

---

## Flashcard Contract

```json
{
  "id": "flashcards-concept-name",
  "cards": [
    {
      "id": "f1",
      "front": "Clear question",
      "back": "Concise answer + context",
      "difficultyLevel": 2
    }
  ]
}
```

**Rules:**
- Minimum 10 cards, unique IDs
- `difficultyLevel`: 1 (basic definition) → 5 (synthesis/derivation)
- One concept per card (atomic)
- Distribution: 2-3 at level 1-2, 4-5 at level 3, 2-3 at level 4-5

---

## Progress Tracking

### Architecture
- **Storage:** localStorage (client-side, survives deploys and git pushes)
- **Key format:** `caltronic:lecture:{lectureId}:completion:v1`
- **Payload:** `{ version: 1, lectureId, completedIds: string[], totalCount, updatedAt }`

### Two Tracking Methods (both coexist)
1. **Concept-by-concept:** Tracked automatically as user navigates via Next button through concept tabs
2. **Mark as Complete:** Button on Synthesis screen marks entire lesson done

### Progress is never lost on:
- Code updates / git push
- Vercel deploys
- Build regeneration

---

## Content Modes

### `update all`
Update content for all 6 modules:
1. EE2010 — Circuit Analysis
2. EE2020 — Signals and Systems
3. EE2030 — Digital Logic Design
4. EE2040 — Analog Electronics
5. EE2050 — Design and Manufacturing
6. EE3070 — Computational Methods

### `update some`
Update specific modules or lessons. Specify which:
- "Update circuit-analysis lesson-02"
- "Update signals-and-systems all lessons"

### `git push`
Push all changes to `github.com/Shya-Bubu/Caltronic.git` (main branch).

### `validate`
Run a comprehensive validation audit on the specified module/lesson. Usage:
- "Validate circuit-analysis lesson-01"
- "Validate signals-and-systems all"

**The validation MUST execute ALL 7 checks below. Skipping any check = invalid validation.**

#### Check 1: File Completeness
For every concept in the lesson:
- [ ] `content.md` exists
- [ ] `exam.md` exists
- [ ] `quiz.json` exists
- [ ] `flashcards.json` exists
- [ ] `visuals.json` exists
- [ ] Concept listed in lesson `metadata.json`

#### Check 2: Visual Correspondence (ID Alignment)
- [ ] Every `[[visual:id]]` marker in `content.md` has a matching `id` entry in `visuals.json`
- [ ] Every `id` in `visuals.json` has a matching `[[visual:id]]` marker in `content.md`
- [ ] **Zero orphans** — no visual defined but unused, no marker without a definition
- [ ] Report any mismatches with exact IDs

#### Check 3: Visual Accuracy & Relevance
For EACH visual in `visuals.json`:
- [ ] Read the surrounding text in `content.md` (±5 paragraphs around the `[[visual:id]]` marker)
- [ ] Verify the visual is **100% relevant** to that surrounding text — not just "related topic" but the EXACT concept being discussed
- [ ] **Falstad circuits must match the exact circuit in the text** — not a generic demo
- [ ] **Circuit schematics must show the exact circuit described** — correct component values, correct topology
- [ ] **Plotly traces must show the exact curve discussed** — correct equation, correct axis labels, correct data points
- [ ] Flag any visual that is <90% relevant with a specific explanation

#### Check 4: Visual Rendering (Browser Verification)
- [ ] Run `npx next build` → exit code 0
- [ ] Start dev server (`npm run dev`)
- [ ] Navigate to each concept in the browser
- [ ] **Zero "Missing visual" errors** — no fallback boxes
- [ ] **Zero "No renderer for visual type" errors**
- [ ] Each Falstad embed loads the **correct circuit** (not the default Falstad demo)
- [ ] Each circuit schematic renders **without disconnected wires or misaligned elements**
- [ ] Take screenshots as proof

#### Check 5: Circuit Correctness (for circuit-schematic and falstad-sim)
For every `circuit-schematic`:
- [ ] All coordinates are multiples of **32px** (per `.agent/skills/circuit-diagrams/SKILL.md`)
- [ ] Wire endpoints exactly match component terminal coordinates
- [ ] Junction dots present at all T-junctions
- [ ] Labels don't overlap wires
- [ ] Passive sign convention correct (current arrow enters + terminal)

For every `falstad-sim`:
- [ ] `$ 1` header line present
- [ ] All coordinates multiples of **16**
- [ ] Ground element (`g`) present — **CRITICAL: missing ground = Falstad loads default demo**
- [ ] Values in SI base units
- [ ] Component text matches the circuit described in content.md

#### Check 6: Content Quality
- [ ] Word count: 2000–3000 words per `content.md`
- [ ] Visual density: ≥8 visuals per concept, ≥2 per subsection
- [ ] Interactive simulations: ≥2 per concept
- [ ] Falstad embeds: ≥1 per concept (circuit-based modules)
- [ ] Visual mix: NOT all plotly — must use multiple visual types
- [ ] Forbidden words not used dismissively ("clearly", "obviously", "trivially", "simply" when hand-waving)

#### Check 7: Quiz & Flashcard Contracts
- [ ] `quiz.json`: ≥10 questions, unique IDs, correctAnswer matches an option, explanations >50 chars
- [ ] `flashcards.json`: ≥10 cards, unique IDs, difficultyLevel 1-5, balanced distribution
- [ ] Questions are relevant to the concept (not generic EE questions)

**Output:** A validation report with PASS/FAIL per check, specific issues found, and recommended fixes.


---

## Raw Source Material

**Location:** `C:\Users\ShyaBubu\Desktop\Caltronic app\raw`

Structure:
```
raw/
├── circuit-analysis/
│   ├── lesson-01/
│   └── lesson-02/
├── signals-and-systems/
├── digital-logic-design/
├── analog-electronics/
├── design-and-manufacturing/
└── computational-methods/
```

**Coverage rule:** If it appears in the PDF and belongs to this concept's scope, it MUST appear in the content. "Teach me everything without leaving a single concept untouched."

**OCR:** Perform OCR on any non-selectable PDF text to capture maximum detail.

---

## Technical Architecture

### Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Rendering:** Server-side content loading, client-side interactivity
- **Routing:** `/[module]/[lecture]` dynamic routes
- **Deployment:** Vercel

### Key Files

| File | Purpose |
|------|---------|
| `src/app/data/modules.ts` | Module registry (single source of truth for UI) |
| `src/core/loaders/loadConcept.ts` | Loads all 4 files from filesystem |
| `src/core/validators/validateConcept.ts` | Validates concept structure |
| `src/app/[module]/[lecture]/LectureClient.tsx` | Main lecture page (overview → concepts → synthesis) |
| `src/app/[module]/[lecture]/components/VisualRenderer.tsx` | Dispatches visual types to components |
| `src/app/components/CircuitSchematic.tsx` | Declarative SVG circuit renderer |
| `src/app/components/FalstadEmbed.tsx` | Falstad iframe embed |
| `src/app/components/LectureProgress.tsx` | Progress bar display |

### Content Loading Flow
1. `page.tsx` reads lesson `metadata.json` → gets concept ID list
2. `loadConcept()` reads each concept directory
3. Loads `content.md`, `exam.md`, `quiz.json`, `flashcards.json`
4. Validates all contracts
5. Returns `LoadedConcept` to `LectureClient.tsx`

### Navigation Flow
`Overview` → `Concept 1 (Content → Exam → Quiz → Flashcards)` → `Concept 2...` → `Synthesis`

---

## Content Creation Workflow

### Step 1: Read Lecture Notes
- Identify exact topics, page numbers, equation numbers
- Extract professor's emphasis points

### Step 2: Map Prerequisites
- What does the student need before this?
- List A-Level math requirements

### Step 3: Write content.md
- Flow: hook → intuition → theory → practice → summary
- Insert `[[visual:id]]` markers inline where visuals aid understanding
- Static diagrams BEFORE interactive simulations (teach first, explore second)

### Step 4: Write exam.md
- Past paper patterns, mark allocation, common mistakes
- No overlap with content.md

### Step 5: Generate Quiz & Flashcards
- Pull from lecture content directly
- Ensure explanations teach through wrong answers

### Step 6: Validate
- `npx next build` must pass
- All 4 files present, non-empty
- Quiz has ≥10 questions with >50 char explanations
- Flashcards have ≥10 cards with difficulty levels

---

## Multi-Agent Validation Workflow

### Protocol: Opus Writes → Other Agents Validate

When **Claude Opus** (or any primary agent) creates or updates content, a **separate agent session** must validate the work before it is considered complete. The writing agent should NOT self-validate — a fresh agent with no context bias performs the validation.

### Why Separate Validation?

The writing agent has "tunnel vision" — it knows what it *intended* to write, so it may overlook mismatches, broken references, or missing files. A separate validator catches what the writer cannot.

### Validator Checklist

The validating agent must check **all** of the following:

#### 1. File Completeness
- [ ] Every concept directory has all 4 files: `content.md`, `exam.md`, `quiz.json`, `flashcards.json`
- [ ] No files are empty or contain placeholder text
- [ ] `metadata.json` lists every concept directory that exists

#### 2. Visual ID Alignment
- [ ] Every `[[visual:id]]` marker in `content.md` has a matching `id` in `visuals.json`
- [ ] No orphaned visuals in `visuals.json` (IDs that nothing references)
- [ ] All visual `type` values are supported by `VisualRenderer.tsx` (`plotly`, `circuit-schematic`, `v3-pwl-explorer`, `v3-load-line`, `v3-diode-circuit`, `image`, `image-gallery`, `falstad-sim`)
- [ ] `visuals.json` uses the correct format: `{ "visuals": [...] }`

#### 3. Quiz & Flashcard Contracts
- [ ] Quiz has ≥10 questions with unique IDs
- [ ] Every `correctAnswer` matches exactly one option
- [ ] Every explanation is >50 characters
- [ ] Flashcards have ≥10 cards with unique IDs
- [ ] Every card has `difficultyLevel` (1-5)
- [ ] Difficulty distribution is balanced (not all level 1)

#### 4. Content Quality
- [ ] `content.md` is 2000-3000 words
- [ ] No forbidden words (Clearly, Obviously, Trivially, Simply, Just)
- [ ] ≥6 `[[visual:id]]` markers present
- [ ] Equations have prose between them (no equation → equation stacking)
- [ ] `exam.md` has no overlap with `content.md`

#### 5. Build & Render Verification
- [ ] `npx next build` exits with code 0
- [ ] Browser test: navigate to lesson, click through every concept
- [ ] Zero "Missing visual" errors
- [ ] All Plotly charts render with correct data
- [ ] All circuit schematics render without SVG errors
- [ ] Interactive simulators (PWL explorer, load-line) are functional

### Workflow Summary

```
┌──────────────────────┐
│   OPUS (Writer)      │
│  Creates/updates:    │
│  • content.md        │
│  • exam.md           │
│  • quiz.json         │
│  • flashcards.json   │
│  • visuals.json      │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  VALIDATOR (Any Agent)│
│  Checks:             │
│  • File completeness │
│  • Visual ID match   │
│  • Contract validity │
│  • Content quality   │
│  • Build + browser   │
└────────┬─────────────┘
         │
         ▼
    ✅ Ship it  OR  🔄 Back to Opus with issues list
```

### Validation Command Sequence

```bash
# 1. Build check
cd caltronic-v2
npx next build

# 2. Content validation (run validate script if available)
npm run validate

# 3. Visual ID audit (grep for mismatches)
# For each concept directory:
grep -oP '\[\[visual:([^\]]+)\]\]' content.md  # Extract markers
jq '.visuals[].id' visuals.json                 # Extract JSON IDs
# Compare the two lists — they must match exactly
```

---

## Quality Checklist

### Voice
- [ ] Reads like a personal professor
- [ ] One idea per paragraph with generous whitespace
- [ ] Natural transitions between topics

### Structured Aids
- [ ] Tables for comparison/classification
- [ ] `> **Why This Matters**:` callout near top
- [ ] `<details>` think prompts (2-3 per concept)

### Math
- [ ] One step per `$$` block with prose between
- [ ] Key results boxed with `\boxed{}`

### Visuals
- [ ] ≥6 visuals, ≥1 simulation per concept
- [ ] `[[visual:id]]` markers in content
- [ ] All diagrams error-free

### Coverage
- [ ] 100% of raw PDF topics covered
- [ ] Every equation from source material
- [ ] Every worked example adapted

---

## Module-Specific Notes

### Circuit Analysis (EE2010)
- Graphical methods preferred (load lines, v-i curves)
- SPICE verification essential
- Voltage-controlled vs current-controlled emphasis

### Signals & Systems (EE2020)
- Visual/animated explanations critical
- Fourier intuition before math
- MATLAB demos for every concept

### Digital Logic Design (EE2030)
- Synthesis concepts emphasized
- Truth tables → K-maps → minimization flow

### Analog Electronics (EE2040)
- Transistor regions: visual first
- Small-signal models: derive with intuition

### Design & Manufacturing (EE2050)
- Design thinking and manufacturing constraints
- Practical, project-oriented

### Computational Methods (EE3070)
- Numerical methods as engineering tools
- Algorithm visualization critical

---

**This document is the single source of truth. All agents must follow these instructions exactly.**
