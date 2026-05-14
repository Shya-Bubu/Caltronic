# CalTronic V2

> ### ⚠️ This repository is **ARCHIVED** — No longer actively maintained
> CalTronic served its purpose brilliantly during 3rd Year, 2nd Semester (Nov 2025 – May 2026). It has been superseded by [Avora](https://github.com/Shya-Bubu), a LaTeX-to-PDF pedagogical system, and its engine lives on as **[Lectron](#-whats-next)** — a clean, subject-agnostic version anyone can use.

---

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Plotly](https://img.shields.io/badge/Plotly.js-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)

**An AI-orchestrated, exploration-first learning platform built for Electrical & Electronic Engineering.**

*6 modules · 31 lessons · 164 concepts · 1,300+ interactive visuals · 1,698 quiz questions · 1,694 flashcards*

</div>

---

## 🧠 What Is CalTronic?

CalTronic V2 is a **filesystem-driven educational web app** that transforms raw university lecture content into deeply structured, multi-layer learning experiences. It was designed as a personal **cognitive amplifier** — a system that feels like having a world-class professor sitting beside you, explaining slowly, anticipating confusion, and using interactive visuals to shape intuition.

Every concept flows through a guided pipeline:

```
Overview → Concept (Content → Exam → Quiz → Flashcards) → Synthesis
```

The system reads lecture transcripts, PDFs, and textbook references from a `raw/` folder, synthesizes them into structured markdown + JSON content, validates everything against strict contracts, and renders it through an interactive lecture UI with progress tracking.

---

## 📊 Content Inventory

| Module | Code | Lessons | Concepts | Status |
|--------|------|---------|----------|--------|
| **Circuit Analysis** | EE2010 | 5 | 31 | ✅ Complete through Week 10 |
| **Signals and Systems** | EE2020 | 11 | 51 | ✅ Complete through Week 13 |
| **Analog Electronics** | EE2040 | 8 | 56 | ✅ Complete through Week 9 |
| **Computational Methods** | EE3070 | 6 | 21 | ✅ Complete through Week 6 |
| **Digital Logic Design** | EE2030 | 1 | 5 | 🟨 Partial |
| **Design & Manufacturing** | EE2050 | 0 | 0 | ⬜ Not started |
| **Total** | — | **31** | **164** | — |

### Visual System

| Visual Type | Description | Interactive? |
|-------------|-------------|:---:|
| `plotly` | V-I curves, transfer characteristics, waveforms, Bode plots | ✅ |
| `circuit-schematic` | Declarative SVG circuit diagrams (resistors, diodes, op-amps, etc.) | — |
| `falstad-sim` | Embedded Falstad circuit simulator — change values, see live waveforms | ✅ |
| `v3-ohms-law` | Custom Ohm's law simulator with circuit + V-I plot | ✅ |
| `v3-load-line` | Graphical load-line analysis tool | ✅ |
| `v3-diode-circuit` | Diode circuit operating point finder | ✅ |
| `v3-pwl-explorer` | Piecewise-linear approximation explorer | ✅ |
| `v3-waveform` | Waveform generator (freq/amp/phase sliders) | ✅ |
| `v3-plot` | Custom engineering curve plotter | ✅ |
| `v3-circuit` | Declarative circuit diagrams (React+SVG) | — |
| Legacy types | `sine-wave`, `discrete-stem`, `block-diagram`, `vi-curve`, `frequency-spectrum`, `step-function`, `signal-plot`, `time-domain` | Varies |
| `image` / `image-gallery` | Static lecture note scans | — |

---

## 🏗️ Architecture

```
caltronic-v2/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── data/modules.ts           # Module registry (UI source of truth)
│   │   ├── components/               # Shared UI (TopNav, Breadcrumbs, ThemeToggle, etc.)
│   │   └── [module]/[lecture]/       # Dynamic routes → LectureClient.tsx
│   ├── content/                      # Filesystem content repository
│   │   └── [module]/
│   │       ├── lessons/[lesson-id]/  # metadata.json, overview.md, synthesis.md
│   │       └── concepts/[concept-id]/ # content.md, exam.md, quiz.json, flashcards.json, visuals.json
│   ├── core/
│   │   ├── contracts/                # TypeScript type contracts
│   │   ├── loaders/                  # Filesystem readers (strict + safe modes)
│   │   ├── validators/               # Runtime validation
│   │   └── flow/                     # Lecture state machine (useLectureFlow)
│   └── hooks/                        # Custom React hooks
├── scripts/                          # Content validation, manifest generation
├── public/course/                    # Static assets (images)
└── raw/                              # Source lecture materials (PDFs, transcripts)
```

### Key Design Decisions

- **No database** — The filesystem IS the content store
- **No auth** — Single-user learning tool
- **No API layer** — Server components read files directly from disk
- **Markdown + `[[visual:id]]` markers** — Not MDX. Visuals are embedded via remark plugin → VisualRenderer dispatch
- **LocalStorage persistence** — Progress and theme survive deploys, but no cross-device sync
- **Strict contract system** — TypeScript contracts + runtime validators ensure content integrity

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/Shya-Bubu/Caltronic.git
cd Caltronic
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run validate-content` | Run content contract validation |
| `npm run generate-manifest` | Regenerate content manifest |

---

## ⚠️ Known Issues

These issues are **not being fixed** — this repo is archived as-is.

1. **Visual breakage cascades** — When an interactive visual fails to render (broken Plotly data, malformed circuit schematic, missing Falstad ground), it can crash the entire concept view, making even the text unreadable. This was the primary motivation for moving to a PDF-based system.

2. **Some circuit schematics have misaligned wires** — The declarative SVG circuit renderer requires precise coordinate math. Some schematics have disconnected or overlapping elements.

3. **Generic `v3-waveform` renders** — The waveform simulator always renders an identical generic sine wave regardless of per-visual configuration. Documented workaround: use `plotly` instead.

4. **ESLint warnings** — Multiple React hook and compiler complaints. Functionality unaffected.

5. **Design & Manufacturing module** — Registered in `modules.ts` but has zero content.

---

## 🔀 What's Next

### Avora
The personal learning pipeline has moved to **Avora** — a LaTeX-to-PDF document generation system. Key advantage: when images break in PDFs, the surrounding text remains readable. Content creation takes ~15 minutes of hands-off processing vs. the 3+ hours of manual debugging that CalTronic often required.

### Lectron
The CalTronic engine is being cleaned and released as **Lectron** — a standalone, subject-agnostic version of this platform. Anyone can clone it, drop their own lecture content into the `raw/` folder, and get a full interactive learning experience. See [`engineer.md`](engineer.md) for the transformation roadmap.

---

## 📄 Content Pipeline (How It Was Used)

```
┌─────────────────────────┐
│  Raw Lecture Material    │  PDFs, transcripts, OCR outputs
│  (raw/ folder)          │  organized by module/lesson
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  AI-Assisted Synthesis  │  Claude Opus reads raw files,
│  (agent.md rules)       │  writes content.md, exam.md,
│                         │  quiz.json, flashcards.json,
│                         │  visuals.json
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Validation             │  Contract checks, build verify,
│  (scripts/)             │  visual rendering test
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Interactive Lecture     │  Guided UI with progress tracking,
│  (Next.js App)          │  quizzes, flashcards, simulations
└─────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1 (App Router + Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, Framer Motion, Lucide Icons |
| Charts | Plotly.js, Recharts |
| Circuit Viz | Custom SVG renderer, Falstad Embed, tscircuit |
| Math | KaTeX (via rehype-katex) |
| Markdown | react-markdown + remark-gfm + remark-math + rehype-raw |
| 3D | Three.js + React Three Fiber (experimental) |
| Diagrams | Mermaid, WaveDrom, DigitalJS |
| Styling | CSS Modules + Custom Design System |
| Deployment | Vercel |
| Persistence | LocalStorage |

---

## 👤 Author

**Shyamika Randimal**
B.Sc. Electrical & Electronic Engineering
University of Peradeniya, Sri Lanka

---

## 📜 License

MIT License — See [LICENSE](LICENSE) for details.

---

> *"The best way to learn is to teach the machine to teach you."*
>
> CalTronic was born from that idea. It served its purpose — every concept, every visual, every quiz question was a step toward understanding.
> The semester is over. The knowledge remains.
