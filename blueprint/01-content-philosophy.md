# Caltronic V2 — Teaching Blueprint
**For:** Shyamika Randimal Dharmarathna  
**Purpose:** Define the exact teaching methodology for all content generation  
**Version:** 1.0 | **Date:** January 16, 2026

---

## Core Philosophy: "Teach What's There, Deeply"

### The Fundamental Rule
**100% of lecture content explained in depth + 5-10% enrichment**

NOT: Teaching new mathematical concepts  
NOT: Random applications beyond syllabus  
YES: Deep understanding of professor's material  
YES: Reflective questions, insights, brain-teasers

---

## The Big Idea → Depth Architecture

**CRITICAL: Start at A-Level Combined Maths, build to lecture + 10%**

### Difficulty Progression
- **Level 50 (START):** A-Level Combined Maths student (knows algebra, calculus, trig, basic physics)
- **Level 100 (TARGET):** Full lecture understanding
- **Level 110 (MAX):** 10% beyond lecture only

### What to ASSUME the student knows:
- Basic algebra (solving equations, manipulating expressions)
- Calculus (differentiation, integration, simple ODEs)
- Trigonometry (sin, cos, identities)
- Physics concepts (force, energy, motion)
- **NOTHING about circuits** - assume zero prior knowledge

### What to BUILD from scratch:
- What voltage and current actually ARE
- Why we use circuit elements
- How to read circuit diagrams
- All circuit-specific terms and notation

---

Every concept follows this structure:

### 1. FROM BASICS (3-5 minutes) — NEW!
- **Start from A-Level knowledge**
- "Before we dive into [concept], let's connect to what you know..."
- Use everyday analogies (water flow, gravity, etc.)
- Define EVERY technical term when first used

### 2. THE BIG IDEA (2-3 minutes)
- **What is this?** One-sentence essence in plain language
- **Why does it matter?** Connection to real EEE work
- **Where does it fit?** Narrative thread from previous concepts

### 3. BUILDING THE UNDERSTANDING (8-10 minutes)
- Start simple, add complexity gradually
- Visual/graphical explanations FIRST
- Then introduce equations ONE AT A TIME
- **Show every step** - no "clearly" or "it's obvious"
- "Let's see where this equation comes from..."

### 4. THE LECTURE CONTENT (10-12 minutes)
- Now connect to professor's material
- "This matches page X of your notes"
- But explained in simpler terms first
- Build up to the lecture's level of rigor

### 5. GOING SLIGHTLY DEEPER (5 minutes) — REDUCED!
- Only 10% beyond lecture, not 40%!
- One interesting application
- One mathematical insight
- **Stop here** - don't overload

### 6. PRACTICE (5 minutes)
- Worked example with EVERY SINGLE STEP shown
- Practice problem with hints
- Common mistakes to avoid

---

## Content Layer Definitions

### INTUITION Tab (IQ 100-115)
**Goal:** Understand WHAT and WHY before HOW

- Starts with big picture
- Uses analogies to familiar concepts
- Visual/graphical emphasis
- Minimal equations, maximum insight
- Connects to real-world EEE applications
- "This is the story of..." narrative style

**Length:** 800-1200 words

### ENGINEERING Tab (IQ 115-125)
**Goal:** Apply concepts to practical problems

- Bridges theory to application
- Design problems, not just analysis
- Parameter selection strategies
- Real component constraints (e.g., "actual resistors are 1%, not ideal")
- SPICE/MATLAB integration examples
- Debugging frameworks

**Length:** 600-900 words

### MATHEMATICS Tab (IQ 125-135+)
**Goal:** Rigorous derivations and formal proofs

- Complete step-by-step derivations
- Every equation justified
- "Why this form?" explanations
- Connects to broader mathematical frameworks
- Addresses special cases and limits
- References to lecture note equation numbers

**Length:** 700-1000 words

### EXAM Tab
**Goal:** Pattern recognition and exam technique

- **FROM PAST PAPERS ONLY** - no made-up questions
- Common question types identified
- Solution strategies (not just solutions)
- Time management tips
- Common mistakes from your midsem
- "What the grader looks for" insights

**Length:** 400-600 words

### QUIZ (5-7 questions)
**Source:** Lecture note concepts directly
- Multiple choice or short answer
- Immediate feedback with WHY answers are right/wrong
- Difficulty ladder: easy → medium → hard

### FLASHCARDS (8-12 cards)
**Content:** Key definitions, equations, concepts from lecture notes
- Front: Question/prompt
- Back: Answer + context reminder

---

## Visual Rendering Strategy

### D3.js Visualizations (Code-Generated)
Use for:
- Signal plots (sine, square, step, impulse)
- V-I characteristics
- Block diagrams (system interconnections)
- Interactive demos (sampling, aliasing)

**Rule:** Must be centered, theme-adaptive (dark/light mode)

### Lecture Note Images (Real)
Use when:
- Professor's original diagram is best (e.g., multi-panel analysis)
- Hand-drawn circuit notation
- Annotated derivations

**Source:** Only from `/raw/[module]/` folders

### NO AI-Generated Images
**Ever.** Only code (D3) or real lecture materials.

---

## The "5-10% More" Definition

### What IT IS ✅
1. **Real-Life Engineering Applications**: How this concept is actually used in EEE work
   - Power systems, communication circuits, embedded systems
   - Industry standard practices
   - Where you'll encounter this after graduation

2. **Mathematical Insights**: Deeper understanding of the math IN the lecture
   - "This equation has this form because..."
   - Geometric interpretations of formulas
   - Mathematical elegance and patterns
   - Alternative derivation approaches

3. **Connections**: "This relates to [earlier concept] because..."

4. **Thought experiments**: "What if we changed this parameter?"

5. **Alternative views**: "Some textbooks write this as..."

### What IT IS NOT ❌
1. Topics not in lecture notes
2. Advanced mathematics beyond syllabus (e.g., random topology)
3. Unrelated applications outside EEE
4. "Nice to know" tangents
5. Graduate-level theory not in syllabus

---

## Content Generation Workflow

### Step 1: Read Lecture Notes
- Identify EXACT topics covered
- Note page numbers, equation numbers
- Extract professor's emphasis points

### Step 2: Map to Concept Structure
- What's the big idea?
- What prerequisites?
- What's the mathematical core?
- What applications does prof mention?

### Step 3: Write Each Layer
- **Intuition**: Big picture narrative
- **Engineering**: Application-focused
- **Mathematics**: Rigorous derivations
- **Exam**: Past paper patterns

### Step 4: Create Visuals
- D3 components for standard plots
- Link to lecture note images if needed

### Step 5: Generate Quiz & Flashcards
- Pull from lecture content directly
- Difficulty progression

---

## Quality Checklist

Before publishing any concept, verify:

- [ ] 100% of lecture note content covered
- [ ] No topics outside syllabus
- [ ] Big Idea → Depth flow maintained
- [ ] Equations derived, not dropped
- [ ] Visuals align with content
- [ ] "Pose & Reflect" questions included
- [ ] Past exam patterns referenced
- [ ] D3 visuals centered and theme-adaptive
- [ ] Links to lecture note pages where relevant

---

## Reference System

### Citing Lecture Notes
```markdown
> From Lecture 1, Page 3: [key concept]
```

### Linking to Prerequisites
```markdown
**Prerequisite:** [Concept Name from L1](#link)
```

### Cross-Module Connections
```markdown
**Related:** This connects to [Module Name, Concept]
```

---

## Shya's Learning Preferences (from academic.md)

### DO ✅
- **Direct & honest** - no sugar-coating
- **Structured** - tables, bullet points, hierarchies
- **Complete** - full explanations, no "you should know"
- **Visual-first** - graphs before equations
- **Actionable** - clear next steps

### DON'T ❌
- Skip derivation steps
- Assume prior knowledge without checking
- Give vague "figure it out" responses
- Ignore deadline pressure
- Forget previous context

### Teaching Session Structure (from academic.md)
1. **Context** (2 min) - where we are, why it matters
2. **Core** (10-15 min) - visual → math → intuition check
3. **Worked Example** (10 min) - annotated step-by-step
4. **Practice** (5 min) - you try, I feedback
5. **Summary** (2 min) - what learned, what next

---

## The Silent Protocol Adaptation

**Reality:** Shya learns without whiteboard or verbal collaboration

**Our Response:**
- ASCII diagrams replace whiteboard sketches
- Written explanations are COMPLETE (no "we'll discuss")
- MATLAB/SPICE simulations replace lab walkthroughs
- AI becomes the Socratic dialogue partner

---

## Engineering Second Brain Integration

Every concept becomes:
```
module/
├── lecture-XX-topic/
│   ├── intuition.md
│   ├── engineering.md
│   ├── mathematics.md
│   ├── exam.md
│   ├── quiz.json
│   ├── flashcards.json
│   └── visuals.json
```

**Publishing Standard:** Write as if this will be on public GitHub → forces clarity

---

## Module-Specific Notes

### Circuit Analysis
- Graphical methods preferred (load lines, v-i curves)
- SPICE verification essential
- Nonlinear resistors: voltage-controlled vs current-controlled emphasis

### Signals & Systems
- Visual/animated explanations critical
- Fourier intuition before math
- MATLAB demos for every concept

### Analog Electronics
- Transistor regions: visual first
- Small-signal models: derive with intuition
- Lab-to-theory mapping

### Digital Logic
- Professor collaboration opportunity - go deep
- Synthesis concepts emphasized
- Project integration

---

## The "Year of Shya" Alignment

Academic excellence = execution proof

Every A-grade = "I execute, not just plan"

This system must:
1. Actually work (A-grade outcomes)
2. Build portfolio (GitHub-ready notes)
3. Save time (efficient study, not busywork)
4. Build confidence (mastery, not surface)

---

## Blueprint Updates

**When to update:**
- New lecture materials added
- Shya provides feedback on what works/doesn't
- Exam patterns shift
- New teaching methods discovered

**How to update:**
- Version this document
- Keep changelog
- Test changes on one concept before applying broadly

---

**END OF BLUEPRINT**
*Use this as the source of truth for all content generation in Caltronic V2*
