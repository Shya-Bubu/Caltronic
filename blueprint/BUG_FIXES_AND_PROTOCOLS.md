# BUG FIXES AND CONTENT PROTOCOLS

> **STATUS:** CRITICAL — READ BEFORE CREATING ANY CONTENT
> **IMPACT:** Site-breaking 404 errors if ignored
> **TARGET AUDIENCE:** AI Content Generators / Human Authors

This document outlines the **non-negotiable technical constraints** for creating content in Caltronic V2. Failure to follow these rules will cause the content loader to throw errors, resulting in **404 Page Not Found** errors for the entire lecture.

---

## 🚨 CRITICAL VALIDATION RULES

### Rule 0: Minimum 3 Concepts Per Lesson
**Every lesson MUST have at least 3 concepts.** The validator enforces this to prevent trivial single-concept lessons.

```
❌ BAD: "concepts": ["only-one-concept"]
❌ BAD: "concepts": ["concept-1", "concept-2"]  
✅ GOOD: "concepts": ["concept-1", "concept-2", "concept-3"]
```

**If raw content has fewer topics, break them down:**
- "Convolution" → "Impulse Response", "Discrete Convolution", "Continuous Convolution"

---

## 📁 REQUIRED FILE STRUCTURE

### Lesson Folder Structure
```
lessons/lesson-XX/
├── metadata.json     (REQUIRED)
├── overview.md       (REQUIRED)
└── synthesis.md      (REQUIRED)
```

### Concept Folder Structure (7 MANDATORY FILES)
```
concepts/my-concept/
├── metadata.json     (REQUIRED - with all path fields!)
├── intuition.md      (REQUIRED)
├── engineering.md    (REQUIRED)
├── mathematics.md    (REQUIRED)
├── exam.md           (REQUIRED)
├── visuals.json      (REQUIRED - can be {} if empty)
├── quiz.json         (REQUIRED - minimum 10 questions)
└── flashcards.json   (REQUIRED - minimum 10 cards)
```

**FAILURE TO CREATE ALL 7 FILES = 404 ERROR**

---

## 📋 JSON SCHEMA SPECIFICATIONS

### 1. Lesson metadata.json
```json
{
    "id": "lesson-XX",
    "title": "Lesson Title",
    "description": "Brief description",
    "concepts": [
        "concept-id-1",
        "concept-id-2",
        "concept-id-3"
    ],
    "estimatedTime": "X-Y hours",
    "difficulty": "beginner|intermediate|advanced",
    "prerequisites": ["lesson-XX"],
    "learningObjectives": ["Objective 1", "Objective 2"],
    "overviewPath": "overview.md",
    "synthesisPath": "synthesis.md",
    "status": "complete"
}
```

### 2. Concept metadata.json (ALL FIELDS REQUIRED!)
```json
{
    "id": "concept-name",
    "title": "Human Readable Title",
    "lesson": "lesson-XX",
    "order": 1,
    "intuitionPath": "intuition.md",
    "engineeringPath": "engineering.md",
    "mathematicsPath": "mathematics.md",
    "examPath": "exam.md",
    "visualsPath": "visuals.json",
    "quizPath": "quiz.json",
    "flashcardsPath": "flashcards.json"
}
```

> ⚠️ **CRITICAL:** Missing ANY path field = ConceptValidationError = 404!

### 3. quiz.json (STRICT FORMAT)
```json
{
    "id": "concept-name-quiz",
    "questions": [
        {
            "id": "q1",
            "prompt": "Question text goes here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option B",
            "explanation": "Explanation MUST be >50 characters. Explain why correct answer is right AND why others are wrong."
        }
    ]
}
```

| Field | Type | Requirement |
|-------|------|-------------|
| `id` | string | Root level, format: `concept-name-quiz` |
| `questions` | array | Minimum 10 questions |
| `questions[].id` | string | `q1`, `q2`, etc. |
| `questions[].prompt` | string | NOT `question`! Use `prompt` |
| `questions[].correctAnswer` | string | Exact text from options, NOT index! |
| `questions[].explanation` | string | Minimum 50 characters |

### 4. flashcards.json (STRICT FORMAT)
```json
{
    "id": "concept-name-flashcards",
    "cards": [
        {
            "id": "f1",
            "front": "Question or term",
            "back": "Answer or definition",
            "difficultyLevel": 2
        }
    ]
}
```

| Field | Type | Requirement |
|-------|------|-------------|
| `id` | string | Root level, format: `concept-name-flashcards` |
| `cards` | array | Minimum 10 cards |
| `cards[].id` | string | REQUIRED: `f1`, `f2`, etc. |
| `cards[].front` | string | Question side |
| `cards[].back` | string | Answer side |
| `cards[].difficultyLevel` | number | 1-5 scale |

### 5. visuals.json (CRITICAL for 100 IQ Accessibility)

> ⚠️ **ESSENTIAL:** Visuals are the ESSENCE of this learning system. Every concept MUST have adequate illustrations and simulations so even a 100 IQ person can understand abstract concepts.

**MINIMUM REQUIREMENTS:**
- **8+ visuals per concept** (minimum)
- **Every layer** (intuition, engineering, mathematics, exam) should have at least 1 visual
- Use **block diagrams** to break down complex processes
- Use **waveforms** to show signal shapes

```json
{
    "conceptId": "concept-name",
    "visuals": [
        {
            "id": "v1",
            "type": "d3-waveform",
            "title": "Descriptive Title",
            "waveType": "sine",
            "mode": "continuous",
            "description": "ALWAYS explain what the visual shows",
            "placement": "intuition"
        }
    ]
}
```

> 🚨 **CRITICAL FORMAT:** Properties like `waveType`, `mode`, `blocks`, `connections` go DIRECTLY on the item object, NOT nested in a `config` object!

```
❌ WRONG: {"type": "d3-waveform", "config": {"waveType": "sine"}}
✅ CORRECT: {"type": "d3-waveform", "waveType": "sine", "mode": "continuous"}
```

**Visual Types Reference:**

| Type | Required Properties | Use Case |
|------|-------------------|----------|
| `d3-waveform` | `waveType`, `mode` | Signals, pulses, steps |
| `d3-block-diagram` | `blocks`, `connections` | System diagrams, processes |
| `d3-vi-curve`, `d3-iv-curve` | `curves` array | Circuit characteristics |
| `d3-sampling` | `signalFrequency` | Aliasing demos |

**waveType Options:** `sine`, `cosine`, `square`, `step`, `impulse`, `ramp`, `triangle`, `rect`
**mode Options:** `continuous`, `discrete`

**Block Diagram Example:**
```json
{
    "id": "v1",
    "type": "d3-block-diagram",
    "title": "System Overview",
    "blocks": [
        {"id": "in", "label": "Input", "x": 30, "y": 50, "width": 70, "type": "input"},
        {"id": "sys", "label": "System", "x": 140, "y": 45, "width": 80, "type": "process"},
        {"id": "out", "label": "Output", "x": 260, "y": 50, "width": 70, "type": "output"}
    ],
    "connections": [
        {"from": "in", "to": "sys"},
        {"from": "sys", "to": "out"}
    ],
    "placement": "intuition"
}
```

**If visuals are absolutely not applicable, use empty structure:** 
```json
{"conceptId": "name", "visuals": []}
```

### 6. CRITICAL: Embedding Visuals in Markdown

> 🚨 **Visuals will NOT appear unless you embed them in markdown files!**

Use the `[[visual:vX]]` syntax in your .md files to place visuals:

```markdown
## Section Title

Here's some explanatory text before the visual...

[[visual:v1]]

And here's text after the visual that explains what it shows.
```

**Rules:**
1. Place `[[visual:vX]]` on its own line
2. The `vX` ID must match an entry in `visuals.json`
3. Add visual tags to EVERY layer (.md file) where relevant
4. Space out visuals throughout the content—don't cluster them

**Example distribution for a concept:**
- `intuition.md`: 3-4 visuals (fundamental diagrams, simple waveforms)
- `engineering.md`: 2-3 visuals (real-world applications)
- `mathematics.md`: 1-2 visuals (formula illustrations)
- `exam.md`: 1-2 visuals (worked examples)

---

## ❌ COMMON ERRORS AND FIXES

### Error 1: "Missing REQUIRED field intuitionPath"
```
❌ {"id": "concept", "title": "Title", "order": 1}
✅ {"id": "concept", "title": "Title", "lesson": "lesson-XX", "order": 1, 
    "intuitionPath": "intuition.md", "engineeringPath": "engineering.md", ...}
```

### Error 2: "Quiz must have non-empty string id field"
```
❌ {"conceptId": "name", "questions": [...]}
✅ {"id": "name-quiz", "questions": [...]}
```

### Error 3: "Question 1 must have non-empty string prompt field"
```
❌ {"question": "What is...?", "options": [...]}
✅ {"prompt": "What is...?", "options": [...]}
```

### Error 4: "Card 1 must have non-empty string id field"
```
❌ {"front": "Q", "back": "A", "difficulty": 1}
✅ {"id": "f1", "front": "Q", "back": "A", "difficultyLevel": 1}
```

### Error 5: "Lecture must have at least 3 concepts"
```
❌ "concepts": ["concept-1", "concept-2"]
✅ "concepts": ["concept-1", "concept-2", "concept-3"]
```

---

## 🎨 VISUAL RENDERING ISSUES

### Supported Visual Types
| Type | Description |
|------|-------------|
| `d3-waveform` | Sine, square, step, impulse waveforms |
| `d3-block-diagram` | System block diagrams with connections |
| `d3-vi-curve` | Voltage-Current characteristic curves |
| `d3-iv-curve` | Current-Voltage characteristic curves |
| `d3-sampling` | Sampling demonstration |

### Block Diagram Block Types
Only use: `"process"`, `"sum"`, `"branch"`, `"input"`, `"output"`
```
❌ "type": "system"
✅ "type": "process"
```

### Multi-line Block Labels
Use `\n` for line breaks in JSON:
```json
{"label": "Line 1\nLine 2"}
```

> ⚠️ **BUG FIX (Jan 18, 2026):** If labels display literal `\n` instead of breaking lines, the `BlockDiagram.tsx` component regex was incorrect. The fix: change `text.replace(/\\\\n/g, '\n')` to `text.replace(/\\n/g, '\n')`.

---

## 📐 LaTeX RESTRICTIONS

### AVOID Environment Blocks
The KaTeX parser breaks on complex LaTeX environments.

```latex
❌ AVOID:
$$\begin{cases}...\end{cases}$$
$$\begin{array}...\end{array}$$
$$\begin{align}...\end{align}$$
$$\begin{equation}...\end{equation}$$

✅ USE INSTEAD:
- Markdown bullet lists
- Separate $$ equations
- Simple inline $math$
```

**Example fix:**
```markdown
❌ $$\begin{cases} i = 0 & \text{if } v < 0 \\ v = 0 & \text{if } i > 0 \end{cases}$$

✅ Piecewise conditions:
- If $v < 0$: $i = 0$
- If $i > 0$: $v = 0$
```

---

## 🎨 CSS THEME COMPATIBILITY

### Use CSS Variables, Not Hardcoded Colors
```css
❌ color: rgba(231, 238, 247, 0.62);
✅ color: var(--text-muted);
```

| Hardcoded RGBA | CSS Variable |
|---------------|--------------|
| `rgba(231, 238, 247, 0.xx)` | `var(--text)` or `var(--text-muted)` |
| `rgba(102, 170, 255, 0.xx)` | `var(--accent)` |
| `rgba(255, 255, 255, 0.01)` | `var(--surface)` |
| Border colors | `var(--border)` |

---

## ✅ PRE-SUBMISSION CHECKLIST

Before creating any content, verify:

### Lesson Level
- [ ] Lesson folder has `metadata.json`, `overview.md`, `synthesis.md`
- [ ] **Minimum 3 concepts** in metadata.json concepts array
- [ ] All concept IDs in metadata match actual folder names

### Concept Level (x7 files each)
- [ ] `metadata.json` has ALL path fields (7 paths required)
- [ ] All 7 content files exist and are valid JSON/Markdown
- [ ] `quiz.json` has root `id: "concept-name-quiz"`
- [ ] `quiz.json` uses `prompt` (not `question`)
- [ ] `quiz.json` uses `correctAnswer` string (not `correctIndex`)
- [ ] `quiz.json` has 10+ questions with 50+ char explanations
- [ ] `flashcards.json` has root `id: "concept-name-flashcards"`
- [ ] `flashcards.json` cards have individual `id` fields (`f1`, `f2`, etc.)
- [ ] `flashcards.json` uses `difficultyLevel` (not `difficulty`)
- [ ] `flashcards.json` has 10+ cards

### Content Level
- [ ] No `\begin{cases}` or similar LaTeX environments
- [ ] Visual references `[[visual:vX]]` match `visuals.json` IDs
- [ ] Content starts at Level 50 (A-Level knowledge baseline)
- [ ] CSS uses theme variables, not hardcoded RGBA

---

## 🔧 DEBUGGING 404 ERRORS

1. **Check server terminal** for exact error message
2. **Common patterns:**
   - `ConceptValidationError` → Missing metadata path field
   - `QuizValidationError` → Wrong field names or missing id
   - `FlashcardValidationError` → Cards missing id field
   - `LectureValidationError` → Less than 3 concepts

3. **Quick fix process:**
   - Read exact error message
   - Find corresponding rule in this document
   - Fix the specific issue
   - Refresh browser

---

## 🐛 BUG FIXES LOG

### 2026-01-18: Block Diagram Newline Fix
**Symptom:** Block diagram labels show literal `\n` text instead of line breaks.
**Cause:** `BlockDiagram.tsx` regex was `\\\\n` (matching `\\n`) instead of `\\n` (matching `\n`).
**Fix:** Update `renderMultilineText` function:
```typescript
// Before (wrong):
text.replace(/\\\\n/g, '\n')
// After (correct):
text.replace(/\\n/g, '\n')
```
**File:** `src/app/components/visualizations/BlockDiagram.tsx`, line 62

### 2026-01-17: Visuals Not Rendering
**Symptom:** All 8 visuals defined in `visuals.json` don't appear on the page.
**Cause 1:** Properties nested in `config` object instead of flat on item.
**Cause 2:** Missing `[[visual:vX]]` tags in markdown files.
**Fix:** Use flat format in JSON and add visual tags to .md files.

---

*Last Updated: January 18, 2026*
*Document Version: 2.1 — Added Bug Fixes Log*
