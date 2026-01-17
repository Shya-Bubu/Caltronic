# 06 — Quiz & Flashcard Creation Guide

**Purpose:** Detailed rules for creating high-quality assessments

---

## Part 1: Quiz Creation

### Philosophy

Quizzes in Caltronic V2 serve TWO purposes:
1. **Test understanding** (formative assessment)
2. **Teach through feedback** (explanations matter more than scores)

**Key Principle:** Students should learn MORE from getting an answer WRONG than from getting it right.

---

### Quiz Structure (JSON)

**File:** `quiz.json`

```json
{
  "id": "quiz-concept-name",
  "questions": [
    {
      "id": "q1",
      "prompt": "Question text here",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": "Option C",
      "explanation": "Detailed explanation (>50 chars) of why C is correct and why others are wrong."
    }
  ]
}
```

---

### Contract Requirements

From `QuizContract.ts`:

1. **Minimum 10 questions** per concept
2. **Unique IDs** (`q1`, `q2`, ..., `q10`, etc.)
3. **Prompt** (question text) must be clear and specific
4. **Options** (minimum 2, typically 4)
   - Must be strings (not numbers or objects)
   - Grammatically parallel
   - Similar length (avoid obvious short/long patterns)
5. **correctAnswer** must EXACTLY match one of the options
6. **Explanation** must be >50 characters
   - Should teach, not just validate
   - Explain WHY correct answer is right
   - Explain WHY distractors are wrong

---

### Writing Effective Questions

#### Question Types

**Type 1: Definition/Recall**
```json
{
  "id": "q1",
  "prompt": "What is Ohm's Law?",
  "options": [
    "V = IR",
    "P = VI",
    "I = V/R",
    "R = V/I"
  ],
  "correctAnswer": "V = IR",
  "explanation": "Ohm's Law states that voltage equals current times resistance (V = IR). While I = V/R is algebraically equivalent, the standard form is V = IR. P = VI is the power formula, not Ohm's Law."
}
```

**Type 2: Conceptual Understanding**
```json
{
  "id": "q2",
  "prompt": "What happens to current if you double the voltage across a resistor?",
  "options": [
    "Current stays the same",
    "Current doubles",
    "Current halves",
    "Current quadruples"
  ],
  "correctAnswer": "Current doubles",
  "explanation": "From Ohm's Law (I = V/R), current is directly proportional to voltage when resistance is constant. Doubling V doubles I. This linear relationship is why resistors are called 'linear' elements."
}
```

**Type 3: Application/Calculation**
```json
{
  "id": "q3",
  "prompt": "A 100Ω resistor has 5V across it. What is the power dissipated?",
  "options": [
    "0.05 W",
    "0.25 W",
    "0.5 W",
    "2.5 W"
  ],
  "correctAnswer": "0.25 W",
  "explanation": "First find current: I = V/R = 5V/100Ω = 0.05A. Then power: P = VI = 5V × 0.05A = 0.25W. Alternatively, P = V²/R = 25/100 = 0.25W. Common mistake: using  P = VI with wrong values, or forgetting to square in P = V²/R."
}
```

**Type 4: Troubleshooting/Analysis**
```json
{
  "id": "q4",
  "prompt": "An LED circuit isn't lighting up. The resistor is hot. What's the likely problem?",
  "options": [
    "Resistor value too high",
    "Resistor value too low",
    "LED is backwards",
    "Voltage source is dead"
  ],
  "correctAnswer": "Resistor value too low",
  "explanation": "If the resistor is getting hot, too much current is flowing (high power dissipation P = I²R). This means the resistor value is too LOW. If it were too high, very little current would flow and the resistor would stay cool. LED backwards would prevent current (no heat). Dead source = no current."
}
```

---

### Difficulty Progression

Structure your 10+ questions like this:

**Q1-Q3 (Easy):** Definitions, basic recall
- "What is X?"
- "Which equation represents Y?"

**Q4-Q7 (Medium):** Application, calculation
- "Calculate X given Y and Z"
- "What happens if we change this parameter?"

**Q8-Q10 (Hard):** Synthesis, troubleshooting
- "Design a circuit that..."
- "Why would this circuit fail?"
- "Compare and contrast X and Y"

**Q11+ (Optional):** Extra challenging
- Edge cases
- Common exam tricks
- Cross-concept integration

---

### Writing Excellent Explanations

#### Bad Explanation ❌
```json
"explanation": "The answer is B because that's the definition."
```
(Too short: 46 chars. Not helpful. Doesn't explain WHY wrong answers are wrong.)

#### Good Explanation ✅
```json
"explanation": "The correct answer is B (V = IR) because this is the standard form of Ohm's Law from Lecture 1. Option A (I = V/R) is algebraically equivalent but not the canonical form. Option C (P = VI) is the power formula, not Ohm's Law. Option D (R = V/I) is correct algebra but unusual form."
```
(157 chars. Teaches why B is best AND addresses all distractors.)

#### Excellent Explanation ✅✅
```json
"explanation": "The correct answer is B (V = IR). This is Ohm's Law as stated in Lecture 1, Eq. 2.1. It tells us voltage is CAUSED by current flowing through resistance. While I = V/R is mathematically correct, engineers prefer V = IR because it emphasizes causality: current creates voltage drop. Option C (P = VI) is the power formula (different concept). Option D is mathematically correct but not standard form. Remember: Ohm's Law relates V, I, and R only—not power."
```
(444 chars. Teaches the concept, explains notation preference, addresses all options, and prevents confusion with related formulas.)

---

### Common Mistakes to Avoid

#### Mistake 1: Obvious Distractors
❌ **Bad:**
```json
"options": [
  "V = IR",
  "X = YZ",
  "Banana",
  "12345"
]
```

✅ **Good:**
```json
"options": [
  "V = IR",
  "I = VR",
  "V = I/R",
  "V = RI"
]
```
(All plausible if you're unsure of the formula.)

#### Mistake 2: Answer in Question
 ❌ **Bad:**
```json
"prompt": "Ohm's Law states V = IR. What does V represent?"
```
(Already gave away the formula.)

✅ **Good:**
```json
"prompt": "In Ohm's Law, what does V represent?"
```

#### Mistake 3: Ambiguous Wording
❌ **Bad:**
```json
"prompt": "What's better, high or low resistance?"
```
(Depends on context!)

✅ **Good:**
```json
"prompt": "For an LED current-limiting resistor, would you want high or low resistance to increase brightness?"
```

#### Mistake 4: Trick Questions
❌ **Avoid:**
```json
"prompt": "Is Ohm's Law V = IR or I = V/R?"
```
(Both are mathematically correct—unfair.)

✅ **Instead:**
```json
"prompt": "What is the standard form of Ohm's Law as given in your lecture notes?"
```

---

### Quiz Quality Checklist

Before finalizing:

- [ ] Minimum 10 questions
- [ ] IDs are unique (`q1`, `q2`, ...)
- [ ] Difficulty progresses (easy → hard)
- [ ] All 4 options are plausible
- [ ] `correctAnswer` exactly matches an option (copy-paste to be sure)
- [ ] All explanations >50 characters
- [ ] Explanations teach (not just validate)
- [ ] Covers 100% of concept content
- [ ] No questions on material outside lecture
- [ ] Grammar/spelling checked

---

## Part 2: Flashcard Creation

### Philosophy

Flashcards are for **spaced repetition**: memorizing key facts, equations, and concepts for long-term retention.

**Key Principle:** Flashcards should be ATOMIC—one concept per card.

---

### Flashcard Structure (JSON)

**File:** `flashcards.json`

```json
{
  "id": "flashcards-concept-name",
  "cards": [
    {
      "id": "f1",
      "front": "What is Ohm's Law?",
      "back": "V = IR (Voltage equals Current times Resistance)",
      "difficultyLevel": 2
    }
  ]
}
```

---

### Contract Requirements

From `FlashcardContract.ts`:

1. **Minimum 10 cards** per concept
2. **Unique IDs** (`f1`, `f2`, ..., `f10`, etc.)
3. **Front** (question/prompt)
   - Clear, specific
   - One question per card
4. **Back** (answer)
   - Concise but complete
   - Context reminder if needed
5. **Difficulty Level** (1-5)
   - 1: Easiest (basic definitions)
   - 5: Hardest (synthesis, distinctions)

---

### Card Types

#### Type 1: Definition
```json
{
  "id": "f1",
  "front": "What is voltage?",
  "back": "Electric potential difference. The 'pressure' that pushes current through a circuit. Measured in volts (V).",
  "difficultyLevel": 1
}
```

#### Type 2: Equation
```json
{
  "id": "f2",
  "front": "Write Ohm's Law",
  "back": "V = IR",
  "difficultyLevel": 2
}
```

#### Type 3: Concept Distinction
```json
{
  "id": "f3",
  "front": "What's the difference between voltage and current?",
  "back": "Voltage is the potential difference (pressure). Current is the flow of charge (rate). Analogy: Voltage = water pressure, Current = water flow rate.",
  "difficultyLevel": 3
}
```

#### Type 4: Application
```json
{
  "id": "f4",
  "front": "When do you use the formula P = I²R instead of P = VI?",
  "back": "When you know current and resistance, but not voltage directly. It's derived from P = VI and V = IR, so P = (IR)I = I²R.",
  "difficultyLevel": 4
}
```

#### Type 5: Derivation/Proof
```json
{
  "id": "f5",
  "front": "Derive P = I²R from Ohm's Law and P = VI",
  "back": "Start with P = VI. Substitute V = IR: P = (IR)I = I²R. ✓",
  "difficultyLevel": 5
}
```

---

### Difficulty Level Guidelines

| Level | Content | Example |
|-------|---------|---------|
| **1** | Basic definitions, terms | "What is a resistor?" |
| **2** | Key equations, standard forms | "Write Ohm's Law" |
| **3** | Applications, when to use | "When do we use voltage dividers?" |
| **4** | Distinctions, comparisons | "Difference between active and passive?" |
| **5** | Derivations, synthesis | "Derive power formula" |

**Distribution for 10 cards:**
- 2-3 cards at level 1 (foundations)
- 3-4 cards at level 2-3 (core)
- 2-3 cards at level 4-5 (advanced)

---

### Writing Atomic Cards

#### Bad: Too Much On One Card ❌
```json
{
  "front": "Explain Ohm's Law, power formula, and series resistance",
  "back": "V = IR for Ohm's Law, P = VI for power, and Rseries = R1 + R2 + ... for series",
  "difficultyLevel": 3
}
```
(Trying to memorize 3 things at once = hard to review.)

#### Good: One Concept Per Card ✅
**Card 1:**
```json
{
  "front": "What is Ohm's Law?",
  "back": "V = IR",
  "difficultyLevel": 2
}
```

**Card 2:**
```json
{
  "front": "What is the power formula?",
  "back": "P = VI (Power equals Voltage times Current)",
  "difficultyLevel": 2
}
```

**Card 3:**
```json
{
  "front": "How do you find total resistance in series?",
  "back": "Rseries = R1 + R2 + R3 + ... (add them up)",
  "difficultyLevel": 2
}
```

---

### Context Clues

When multiple similar equations exist, add context:

#### Without Context (Confusing) ❌
```json
{
  "front": "Power formula",
  "back": "P = I²R",
  "difficultyLevel": 2
}
```
(Wait, isn't it P = VI? Or P = V²/R?)

#### With Context (Clear) ✅
```json
{
  "front": "Power formula in terms of current and resistance",
  "back": "P = I²R (derived from P = VI by substituting V = IR)",
  "difficultyLevel": 3
}
```

---

### Flashcard Quality Checklist

- [ ] Minimum 10 cards
- [ ] IDs are unique (`f1`, `f2`, ...)
- [ ] Each card tests ONE concept
- [ ] Front is a clear question
- [ ] Back is concise but complete
- [ ] Difficulty levels assigned (1-5)
- [ ] Distribution: mix of easy/medium/hard
- [ ] Covers all key points from lecture
- [ ] No ambiguity or tricks

---

## Integration: Quiz + Flashcards

### Coverage Map

Ensure between quiz and flashcards you cover:
- [ ] All definitions
- [ ] All key equations
- [ ] All applications mentioned in lecture
- [ ] Common mistakes (quiz explanations)
- [ ] Distinctions between similar concepts

### Example for "Linear Resistor Fundamentals"

**Quiz (10 questions):**
1. Q1-Q2: Ohm's Law definition and direction
2. Q3-Q4: Power formulas
3. Q5-Q6: Calculations (given V, find I)
4. Q7-Q8: Series/parallel basics
5. Q9-Q10: Troubleshooting scenarios

**Flashcards (12 cards):**
1. F1-F2: Voltage and current definitions
2. F3: Ohm's Law
3. F4-F6: Power formulas (P = VI, I²R, V²/R)
4. F7: Resistor symbol
5. F8-F9: Series vs parallel
6. F10: When to use each power formula
7. F11-F12: Real-world applications

**Total Coverage:** Definitions + Equations + Applications + Problem-Solving ✓

---

**Quizzes test understanding. Flashcards build retention. Together, they ensure mastery.**
