# 03 — Content Creation Guide: Step-by-Step Workflow

**Purpose:** Exact process for generating concept content from lecture notes

---

## Prerequisites

Before starting, ensure you have:
- [ ] Lecture notes PDF or scanned pages
- [ ] Past exam papers (if available)
- [ ] Module syllabus/course outline
- [ ] Access to contracts folder for validation
- [ ] Working example from Signals & Systems

---

## The Complete Workflow

### Phase 1: Analysis & Planning

#### Step 1.1: Read Lecture Notes Thoroughly
- Identify the main topic/concept
- Note which pages cover this concept
- Extract equation numbers (e.g., "Eq. 2.1")
- Highlight professor's emphasis points (starred, underlined, repeated)

#### Step 1.2: Map Prerequisites
Ask: "What does the student need to know BEFORE this?"
- List prerequisite concepts from earlier lectures
- Note any A-Level math requirements
- Identify assumed knowledge to build from

#### Step 1.3: Define the Concept Scope
Create a brief outline:
```markdown
Concept: [Name]
Lecture: [X], Pages: [Y-Z]
Prerequisites: [List]
Core Equations: [List with numbers]
Key Applications: [What prof mentioned]
Difficulty Range: [50-110 mapping]
```

#### Step 1.4: Identify Real Applications
- What did the professor mention?
- Where does this appear in EEE industry?
- Find 2-3 concrete examples (power systems, communications, embedded, etc.)

---

### Phase 2: Content Generation

#### Step 2.1: Write INTUITION Layer
**Time:** 30-45 minutes  
**Goal:** Student understands WHAT and WHY

Process:
1. **Hook** — Real-world connection
   - "Have you ever noticed..."
   - "Every time you use [device], this is happening..."

2. **From Basics** — A-Level starting point
   - "Let's start with something familiar: [water flow / gravity / etc.]"
   - Build the analogy systematically
   - Define technical terms as you introduce them

3. **The Big Idea** — Core concept
   - Explain graphically/visually first
   - Then introduce the simplest form of the equation
   - "This tells us that..."

4. **Connection to Lecture** — Bridge
   - "Now let's see how your professor explains this on page X"
   - Show the formal definition
   - "Notice how this matches our intuition that..."

5. **Why You Care** — Motivation
   - Real EEE applications
   - Future courses that build on this
   - Industry relevance

**Test:** Can an A-Level student with no circuit knowledge understand this?

---

#### Step 2.2: Write ENGINEERING Layer
**Time:** 25-35 minutes  
**Goal:** Student can APPLY this

Process:
1. **Practical Context**
   - "In practice, engineers use this to..."
   - When do you need this calculation?

2. **Design Example**
   - Choose a realistic problem
   - DESIGN, not just analyze (more engaging)
   - Show parameter selection reasoning
   - Include component non-idealities

   Example structure:
   ```markdown
   ## Designing a [Component/Circuit]
   
   **Specifications:** [What we need]
   **Constraints:** [Real-world limits]
   
   ### Step 1: [First calculation]
   [Show work]
   
   ### Step 2: [Next step]
   [Show work]
   
   ### Step 3: Select Standard Values
   [E12/E24 series, commercial components]
   ```

3. **Tool Integration**
   - SPICE netlist OR
   - MATLAB code snippet
   - How to verify your design

4. **Debugging**
   - "If your circuit doesn't work, check:"
   - Common mistakes
   - Troubleshooting steps

**Test:** Could you build/simulate this with the info given?

---

#### Step 2.3: Write MATHEMATICS Layer
**Time:** 30-40 minutes  
**Goal:** Student understands WHY equations are true

Process:
1. **Setup**
   - "We're going to derive Equation [X.Y] from the lecture notes"
   - State starting assumptions
   - Link to lecture page

2. **Derivation** — NO SKIPPED STEPS
   - Start from first principles or given equations
   - Every algebraic manipulation shown
   - Justify each step:
     - "By Ohm's Law..."
     - "Substituting V = IR..."
     - "Rearranging both sides..."
   - Number your steps (Step 1, Step 2, ...)

3. **Special Cases**
   - What happens when R → 0?
   - What if R → ∞?
   - Edge cases the professor mentioned

4. **Mathematical Insight**
   - "This equation is linear because..."
   - "Notice the form resembles..."
   - Geometric interpretation if applicable

**Test:** Could you reproduce this derivation in an exam?

---

#### Step 2.4: Write EXAM Layer
**Time:** 20-30 minutes  
**Goal:** Student can SCORE MARKS

Process:
1. **Analyze Past Papers**
   - Find questions related to this concept
   - Note frequency and mark allocation
   - Identify patterns

2. **Document Question Types**
   ```markdown
   ## Common Question Patterns
   
   1. **Type A: [Description]**
      - Frequency: [X%] of past papers
      - Marks: [Y] marks
      - Time: [Z] minutes
   
   2. **Type B: [Description]**
      ...
   ```

3. **Worked Example**
   - Use an actual past paper question
   - Solve step-by-step
   - Note mark allocation per step
   - "This step earns 2 marks because..."

4. **Common Mistakes**
   - From midsem feedback if available
   - Generic mistakes for this type
   - "Students often forget to..."

5. **Time Management**
   - How to quickly check answer
   - When to move on
   - Partial credit strategies

**Test:** Would this help you finish the exam in time?

---

#### Step 2.5: Create VISUALS Specification
**Time:** 15-20 minutes  
**Goal:** Visual reinforcement of concepts

Process:
1. **Identify Visual Needs**
   For each layer (Intuition, Engineering, Math, Exam):
   - What diagram would help most?
   - Can D3.js render this?

2. **Choose Visual Types**
   - **Waveforms:** Use `d3-waveform` (sine, square, step, impulse)
   - **Block Diagrams:** Use `d3-block-diagram` (systems, feedback)
   - **IV Curves:** Use `d3-iv-curve` (components, load lines)
   - **Phasors:** Use `d3-phasor` (AC analysis)

3. **Write JSON Spec**
   ```json
   {
     "conceptId": "concept-id",
     "visuals": [
       {
         "id": "v1",
         "type": "d3-waveform",
         "title": "Clear descriptive title",
         "description": "What this demonstrates",
         "placement": "intuition",
         "waveType": "sine",
         "mode": "continuous"
       }
     ]
   }
   ```

4. **Assign to Layers**
   - `placement`: "intuition", "engineering", "mathematics", or "exam"
   - Typically 1-2 visuals per layer

**Test:** Do these visuals actually teach, or just decorate?

---

#### Step 2.6: Generate QUIZ
**Time:** 30-40 minutes  
**Goal:** Test comprehension with feedback

Process:
1. **Extract Key Concepts**
   - List 10-15 testable points from the lecture notes
   - Mix difficulty: easy (definition), medium (application), hard (synthesis)

2. **Write Questions**
   For each question:
   ```json
   {
     "id": "q1",
     "prompt": "Clear, specific question",
     "options": [
       "Option A (plausible distractor)",
       "Option B (common misconception)",
       "Option C (correct answer)",
       "Option D (plausible distractor)"
     ],
     "correctAnswer": "Option C (correct answer)",
     "explanation": "Explain why C is correct: [reasoning]. Why not A: [misconception]. Why not B: [misconception]. Why not D: [distractor reasoning]."
   }
   ```

3. **Quality Checks**
   - Explanation >50 characters (contract requirement)
   - All options are grammatically consistent
   - Distractors are plausible (not obviously wrong)
   - Covers the full concept scope

4. **Difficulty Progression**
   - Q1-Q3: Definitions and basic understanding
   - Q4-Q7: Application and calculation
   - Q8-Q10: Synthesis and problem-solving

**Test:** Would wrong answers teach, not just frustrate?

---

#### Step 2.7: Create FLASHCARDS
**Time:** 20-30 minutes  
**Goal:** Long-term retention

Process:
1. **Identify Memorizable Items**
   - Definitions ("What is Ohm's Law?")
   - Equations ("Write the power formula")
   - Distinctions ("Difference between voltage and current?")
   - Applications ("When do we use this?")

2. **Write Cards**
   ```json
   {
     "id": "f1",
     "front": "What is Ohm's Law?",
     "back": "V = IR. Voltage equals current times resistance. Fundamental relationship for resistive elements.",
     "difficultyLevel": 2
   }
   ```

3. **Assign Difficulty**
   - **Level 1:** Basic definitions
   - **Level 2:** Core equations
   - **Level 3:** Applications
   - **Level 4:** Derivations
   - **Level 5:** Synthesis/distinctions

4. **Balance the Deck**
   - 3-4 cards at level 1-2 (foundations)
   - 4-5 cards at level 3 (core)
   - 2-3 cards at level 4-5 (advanced)

**Test:** Could these cards be used with Anki/spaced repetition?

---

#### Step 2.8: Create METADATA
**Time:** 5 minutes  
**Goal:** Describe the concept for navigation

```json
{
  "id": "concept-id",
  "title": "Concept Title",
  "description": "One-sentence summary of what this concept teaches",
  "difficultyRange": {
    "min": 50,
    "max": 110
  },
  "estimatedMinutes": 30,
  "prerequisites": ["prerequisite-concept-id"],
  "tags": ["circuits", "analysis", "fundamentals"]
}
```

---

### Phase 3: Validation

#### Step 3.1: Check File Presence
Ensure all 7 files exist:
- [ ] `metadata.json`
- [ ] `intuition.md`
- [ ] `engineering.md`
- [ ] `mathematics.md`
- [ ] `exam.md`
- [ ] `visuals.json`
- [ ] `quiz.json`
- [ ] `flashcards.json`

#### Step 3.2: Run Contract Validation
The system will automatically validate JSON files against TypeScript contracts:

**QuizContract:**
- Minimum 10 questions
- Each question has unique ID
- Explanation >50 characters
- correctAnswer matches one of the options

**FlashcardContract:**
- Minimum 10 cards
- Each card has unique ID
- difficultyLevel is 1-5
- Front and back are non-empty

**Visuals:** (No strict contract, but check)
- Valid JSON syntax
- Placement values: "intuition", "engineering", "mathematics", "exam"

#### Step 3.3: Content Quality Review
- [ ] All derivations shown step-by-step
- [ ] No topics outside lecture scope
- [ ] Difficulty progression maintained (50 → 110)
- [ ] Cross-references to lecture pages included
- [ ] Real applications cited
- [ ] Common mistakes identified

---

### Phase 4: Integration

#### Step 4.1: Add to Lesson Metadata
Update `lessons/lesson-XX/metadata.json`:
```json
{
  "concepts": [
    "existing-concept-1",
    "existing-concept-2",
    "new-concept-id"  // <-- Add here
  ]
}
```

#### Step 4.2: Test Locally
```bash
npm run dev
```
Navigate to: `http://localhost:3000/[module]/lesson-XX`

Check:
- [ ] Concept appears in lesson navigation
- [ ] All 7 tabs render
- [ ] D3 visuals display correctly
- [ ] Quiz and flashcards load
- [ ] No console errors

#### Step 4.3: Build Verification
```bash
npm run build
```
Ensure no validation errors during build.

---

## Time Estimates (Per Concept)

| Layer | Time | Notes |
|-------|------|-------|
| Analysis & Planning | 30 min | Critical — don't rush |
| Intuition | 45 min | Most important layer |
| Engineering | 35 min | |
| Mathematics | 40 min | Derivations take time |
| Exam | 30 min | Needs past papers |
| Visuals | 20 min | JSON spec only |
| Quiz | 40 min | Quality > speed |
| Flashcards | 30 min | |
| Validation | 15 min | |
| **Total** | **~4.5 hours** | For complete concept |

---

## Common Pitfalls

### ❌ Don't:
1. **Skip the planning phase** — diving straight into writing leads to gaps
2. **Assume prior knowledge** — always start from A-Level
3. **Use "clearly" or "obviously"** — show the steps
4. **Go beyond lecture + 10%** — scope creep kills quality
5. **Generate AI images** — use D3 or lecture scans only
6. **Write short explanations** — quiz.explanation must be >50 chars
7. **Forget difficulty levels** — flashcards need 1-5 scale

### ✅ Do:
1. **Reference lecture pages** — "From Lecture 2, Page 5..."
2. **Show every step** — even "obvious" algebraic manipulations
3. **Use real applications** — power systems, embedded, communications
4. **Test your own quiz** — would wrong answers teach you?
5. **Read examples first** — study `signal-and-system-foundations/`
6. **Maintain consistency** — same tone across all concepts
7. **Validate early** — check JSON syntax before finishing

---

## Quality Benchmarks

A concept is "good enough" when:
- [ ] A fresh Year 1 EEE student could understand intuition layer
- [ ] Engineering layer provides buildable/simulatable examples
- [ ] Mathematics layer enables exam derivation reproduction
- [ ] Exam layer directly helps with past paper questions
- [ ] Visuals reinforce (not just decorate) the content
- [ ] Quiz wrong answers teach misconceptions
- [ ] Flashcards cover 100% of lecture key points

---

## Example Workflow: "Linear Resistor Fundamentals"

### Phase 1: Analysis
- Lecture: Circuit Analysis, Lecture 1, Pages 2-4
- Prerequisites: None (first concept)
- Core Equations: V=IR (Eq. 1.1), P=VI (Eq. 1.2)
- Applications: LED current limiting, voltage dividers

### Phase 2: Content
- **Intuition:** Water pipe analogy → V is pressure, I is flow, R is narrowness
- **Engineering:** Design LED current limiter (given V, VLED, ILED → find R)
- **Mathematics:** Derive P=I²R and P=V²/R from P=VI and V=IR
- **Exam:** Series resistance calculation pattern (past paper 2023 Q2)
- **Visuals:** IV characteristic line, power dissipation graph
- **Quiz:** 10 questions (Ohm's Law, power formulas, unit conversions)
- **Flashcards:** 12 cards (definition, formulas, applications)

### Phase 3: Validation
- All files created ✓
- Quiz explanations >50 chars ✓
- Flashcard difficulties assigned ✓

### Phase 4: Integration
- Added to `lesson-01/metadata.json` ✓
- Tested at `localhost:3000/circuit-analysis/lesson-01` ✓
- Build successful ✓

**Total Time:** 4.5 hours  
**Result:** Complete, validated concept ready for use

---

**Follow this workflow for every concept. Consistency is key to a high-quality learning platform.**
