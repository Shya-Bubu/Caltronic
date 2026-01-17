# Complete Blueprint Index

## 🎯 START HERE — MASTER PROMPT

**🔴 READ THIS FIRST:** **[00-MASTER-PROMPT.md](00-MASTER-PROMPT.md)** — The primary directive for all content generation (10 min read)

This document defines the entire teaching philosophy, cognitive companionship approach, and quality standards. Everything else builds on this foundation.

---

## 📚 Read in This Order

### For AI Content Generators (First Time):
1. **[00-MASTER-PROMPT.md](00-MASTER-PROMPT.md)** ⭐ — PRIMARY DIRECTIVE (10 min read, MANDATORY)
2. **[README.md](README.md)** — System overview and quick start (5 min read)
3. **[01-content-philosophy.md](01-content-philosophy.md)** — Teaching approach & difficulty scaling (15 min read)
4. **[02-content-structure.md](02-content-structure.md)** — 7-layer system breakdown (20 min read)
5. **[03-content-creation-guide.md](03-content-creation-guide.md)** — Step-by-step workflow (25 min read)
6. **[examples/signal-and-system-foundations/](examples/signal-and-system-foundations/)** — Study the working example (30 min)
7. **[05-visualization-guide.md](05-visualization-guide.md)** — D3.js specs (10 min read)
8. **[06-quiz-flashcard-guide.md](06-quiz-flashcard-guide.md)** — Assessment creation (15 min read)
9. **[04-technical-architecture.md](04-technical-architecture.md)** — Code structure (optional, 15 min read)

**Total Time:** ~3 hours to fully understand the system

---

### For Quick Reference:
- **⚠️ Getting 404 errors?** → `BUG_FIXES_AND_PROTOCOLS.md` ⭐
- **Quick validation checklist?** → `QUICK_REFERENCE.md` ⭐
- **Creating a new concept?** → `03-content-creation-guide.md`
- **Writing quiz questions?** → `06-quiz-flashcard-guide.md`
- **Adding visualizations?** → `05-visualization-guide.md`
- **Checking contracts?** → `contracts/` folder
- **Unsure about tone/style?** → `examples/README.md`

---

## 📁 Folder Structure

```
blueprint/
├── README.md                      # System overview & quick start
├── INDEX.md                       # This file - reading guide
│
├── 01-content-philosophy.md       # Teaching methodology
│   ├─ Difficulty progression (50-110)
│   ├─ A-Level starting point
│   ├─ Layer definitions
│   └─ Shyamika's learning preferences
│
├── 02-content-structure.md        # 7-layer system
│   ├─ Intuition (IQ 100-115)
│   ├─ Engineering (IQ 115-125)
│   ├─ Mathematics (IQ 125-135)
│   ├─ Exam (pattern recognition)
│   ├─ Visuals (D3.js specs)
│   ├─ Quiz (10+questions)
│   └─ Flashcards (10+ cards)
│
├── 03-content-creation-guide.md   # Step-by-step workflow
│   ├─ Phase 1: Analysis & Planning
│   ├─ Phase 2: Content Generation
│   ├─ Phase 3: Validation
│   └─ Phase 4: Integration
│
├── 04-technical-architecture.md   # Code structure
│   ├─ Project structure
│   ├─ Routing system
│   ├─ Content loading
│   ├─ Validation system
│   └─ Build process
│
├── 05-visualization-guide.md      # D3.js visualizations
│   ├─ Visual types (waveform, block-diagram, iv-curve, phasor)
│   ├─ JSON specifications
│   ├─ Theme adaptivity
│   └─ Responsive design
│
├── 06-quiz-flashcard-guide.md     # Assessment creation
│   ├─ Quiz design principles
│   ├─ Question types
│   ├─ Explanation guidelines
│   ├─ Flashcard atomic design
│   └─ Difficulty levels (1-5)
│
├── contracts/                     # TypeScript validation schemas
│   ├── ConceptContract.ts
│   ├── QuizContract.ts
│   ├── FlashcardContract.ts
│   ├── LectureContract.ts
│   ├── SimulationContract.ts
│   └── index.ts
│
└── examples/                      # Working reference implementations
    ├── README.md                  # How to use examples
    └── signal-and-system-foundations/  # Complete concept
        ├── metadata.json
        ├── intuition.md
        ├── engineering.md
        ├── mathematics.md
        ├── exam.md
        ├── visuals.json
        ├── quiz.json
        └── flashcards.json
```

---

## 🎯 Common Tasks

### Task: Generate Content for New Concept

**Steps:**
1. Read lecture notes → identify scope
2. Follow `03-content-creation-guide.md` workflow
3. Reference `examples/signal-and-system-foundations/` for tone
4. Validate against `contracts/` schemas
5. Check difficulty: 50 (A-Level start) → 110 (Lecture + 10%)

**Time:** ~4.5 hours per concept

---

### Task: Fix Validation Error

**Steps:**
1. Read error message (e.g., "Quiz explanation <50 chars")
2. Check relevant contract in `contracts/`
3. Fix JSON file
4. Rebuild: `npm run build`

---

### Task: Add D3 Visualization

**Steps:**
1. Identify visual type from `05-visualization-guide.md`
2. Write JSON spec in `visuals.json`
3. Assign to layer (`placement`: "intuition" / "engineering" / etc.)
4. Test in browser

---

### Task: Understand System from Scratch (for new AI)

**Steps:**
1. Read `README.md` (overview)
2. Read `01-content-philosophy.md` (teaching approach)
3. Study `examples/signal-and-system-foundations/intuition.md` (see it in action)
4. Read `02-content-structure.md` (layer breakdown)
5. Follow `03-content-creation-guide.md` to generate first concept

**You're now ready to generate Caltronic V2 content!**

---

## ✅ Quality Checklist

Before considering a concept "complete":

**Content:**
- [ ] All 7 files present (metadata, 4 markdown layers, 3 JSON files)
- [ ] Difficulty progression: 50 → 110 across layers
- [ ] 100% of lecture content covered
- [ ] No topics outside syllabus

**Validation:**
- [ ] `quiz.json` passes QuizContract (10+ questions, explanations >50 chars)
- [ ] `flashcards.json` passes FlashcardContract (10+ cards, difficulty 1-5)
- [ ] `visuals.json` valid JSON with correct placement
- [ ] `metadata.json` has correct difficultyRange

**Style:**
- [ ] Tone matches `signal-and-system-foundations/` example
- [ ] All derivations shown step-by-step
- [ ] Visual/graphical emphasis before equations
- [ ] Cross-references to lecture pages included

---

## 🚀 Success Metrics

**A concept is "excellent" when:**
1. **A fresh Year 1 EEE student** can understand the intuition layer
2. **Engineering layer** provides buildable/simulatable examples
3. **Mathematics layer** enables exam derivation reproduction
4. **Quiz wrong answers** teach misconceptions (not just frustrate)
5. **Flashcards** cover 100% of key points
6. **Visuals** reinforce (not just decorate)
7. **Exam layer** directly helps with past papers

---

## 📞 Support

**For Shyamika:**
- Review new concepts against this blueprint
- Provide feedback on what works/doesn't
- Update blueprint when requirements change

**For Future AI:**
- If confused, re-read `README.md` and `01-content-philosophy.md`
- When in doubt, copy the structure from `examples/`
- Validate early and often

---

**This blueprint is the complete specification for Caltronic V2. Follow it exactly for consistent, high-quality content.**

---

*Last Updated: January 16, 2026*  
*Version: 1.0*
