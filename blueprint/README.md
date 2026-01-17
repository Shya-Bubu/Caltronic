# Caltronic V2 — Complete System Blueprint

**Last Updated:** January 16, 2026  
**Purpose:** Complete documentation to replicate the entire Caltronic V2 learning platform

---

## 📋 What is This?

This folder contains **everything** needed to understand and replicate the Caltronic V2 system. If you shared this folder with a fresh AI instance (Claude, GPT, etc.), it should be able to generate 100% accurate content that matches our standards.

---

## 🎯 System Overview

**Caltronic V2** is a personalized, IQ-scaled learning platform for Electrical & Electronic Engineering students at the University of Peradeniya. It transforms lecture content into a multi-layered learning experience.

### Core Principles

1. **100% Lecture Coverage** — Every concept from professor's notes
2. **Difficulty Scaling** — Start at A-Level (IQ 100), build to Lecture+10% (IQ 110)
3. **7-Layer System** — Each concept has: Intuition, Engineering, Mathematics, Exam, Visuals, Quiz, Flashcards
4. **No Hallucinations** — Only lecture content + real engineering applications
5. **Visual-First** — D3.js visualizations, no AI-generated images

---

## 📂 Blueprint Structure

```
blueprint/
├── README.md                          # This file - start here
├── 01-content-philosophy.md           # Teaching approach & difficulty scaling
├── 02-content-structure.md            # 7-layer system breakdown
├── 03-content-creation-guide.md       # Step-by-step creation process
├── 04-technical-architecture.md       # Code structure & validation
├── 05-visualization-guide.md          # D3.js & interactive elements
├── 06-quiz-flashcard-guide.md         # Assessment creation rules
├── contracts/                         # TypeScript validation schemas
│   ├── ConceptContract.ts
│   ├── QuizContract.ts
│   ├── FlashcardContract.ts
│   ├── LectureContract.ts
│   └── SimulationContract.ts
└── examples/                          # Working reference implementations
    ├── signal-and-system-foundations/ # Complete concept example
    └── circuit-analysis-v2-plan/      # Corrected difficulty approach
```

---

## 🚀 Quick Start for New AI Instance

### If you're a fresh AI reading this folder:

1. **Read in Order:**
   - `01-content-philosophy.md` — Understand the teaching approach
   - `02-content-structure.md` — Learn the 7-layer system
   - `03-content-creation-guide.md` — Follow the workflow

2. **Study the Example:**
   - Review `examples/signal-and-system-foundations/` as your template

3. **Check Contracts:**
   - Validate all JSON against `contracts/*.ts` schemas

4. **Apply to New Content:**
   - Use the same structure for any new concept generation

---

## 🎓 Who Is This For?

**Primary User:** Shyamika Randimal Dharmarathna  
- Year 2 EEE student at University of Peradeniya
- Target: A-grade in all modules through deep understanding
- Learning style: Visual-first, complete explanations, structured notes

**Content Philosophy:**
- Start from A-Level Combined Maths knowledge (knows calculus, algebra, trig)
- Build to lecture understanding + 10% enrichment
- NO topics beyond syllabus
- Assume ZERO prior circuit/signal knowledge

---

## 🔧 Technical Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom theme
- **Visualizations:** D3.js (v7+)
- **Content:** Markdown + JSON
- **Validation:** Zod schemas

---

## 📊 Module Status

| Module | Lessons | Concepts | Status | Notes |
|--------|---------|----------|--------|-------|
| Signals & Systems | 2 | 8 | ✅ Complete | Reference implementation |
| Circuit Analysis | 1 | 3/7 | 🚧 In Progress | Difficulty level corrected |
| Analog Electronics | - | - | ⏳ Planned | - |
| Digital Logic | - | - | ⏳ Planned | - |

---

## ⚠️ Critical Rules

### DO ✅
- Use lecture notes as the ONLY source of truth
- Start every explanation from A-Level understanding
- Show EVERY step in derivations
- Use D3.js for all visualizations
- Validate all JSON against contracts
- Reference working examples from Signals & Systems

### DON'T ❌
- Introduce topics not in lecture notes
- Skip derivation steps with "clearly" or "obviously"
- Use AI-generated images (ever!)
- Assume prior domain knowledge
- Go beyond lecture+10% difficulty

---

## 📖 How Content is Structured

Each concept follows this file structure:

```
concept-name/
├── metadata.json          # Concept info (title, difficulty, etc.)
├── intuition.md          # Big picture (IQ 100-115)
├── engineering.md        # Applications (IQ 115-125)
├── mathematics.md        # Rigorous proofs (IQ 125-135)
├── exam.md              # Past paper patterns
├── visuals.json         # D3.js visualization specs
├── quiz.json            # Assessment questions
└── flashcards.json      # Spaced repetition cards
```

---

## 🎯 Success Metrics

A concept is "complete" when:
- [ ] 100% of lecture content covered
- [ ] All 7 layers present and validated
- [ ] Difficulty progression: 50 → 110 (no jumps)
- [ ] All equations derived step-by-step
- [ ] D3.js visuals render correctly
- [ ] Quiz/Flashcards pass contract validation
- [ ] Cross-references to lecture notes included

---

## 🔄 Version History

- **v1.0** (Jan 16, 2026) — Initial blueprint creation
  - Captured teaching philosophy from `academic.md`
  - Documented 7-layer system
  - Added working Signals & Systems examples
  - Defined corrected Circuit Analysis approach

---

## 📞 Next Steps

1. **For Shyamika:** Review this blueprint and confirm it captures your requirements
2. **For Future AI:** Use this as the source of truth for all content generation
3. **For Contributors:** Follow the guides in numbered order

---

**This blueprint represents the complete specifications for Caltronic V2. Any content generated outside these rules is not aligned with the system.**
