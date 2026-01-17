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

### 5. visuals.json
```json
{
    "conceptId": "concept-name",
    "visuals": [
        {
            "id": "v1",
            "type": "d3-waveform|d3-block-diagram|d3-vi-curve|d3-iv-curve|d3-sampling",
            "title": "Visual Title",
            "description": "Description",
            "placement": "intuition|engineering|mathematics"
        }
    ]
}
```

**If no visuals needed, use empty object:** `{}`

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
Use `\\n` (double backslash) for line breaks:
```json
{"label": "Line 1\\nLine 2"}
```

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

*Last Updated: January 17, 2026*
*Document Version: 2.0 — Comprehensive Validation Rules*
