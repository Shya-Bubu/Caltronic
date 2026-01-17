# QUICK REFERENCE: Content Creation Checklist

> **Print this page and check off items before submitting content!**

---

## 🚀 BEFORE YOU START

- [ ] Raw content has **3+ distinct topics** (minimum concepts per lesson)
- [ ] You have access to full lecture transcript/notes
- [ ] Lesson folder structure planned

---

## 📁 LESSON CREATION

### Files Required
```
lessons/lesson-XX/
├── metadata.json
├── overview.md  
└── synthesis.md
```

### metadata.json Template
```json
{
    "id": "lesson-XX",
    "title": "Title",
    "description": "Description",
    "concepts": ["concept-1", "concept-2", "concept-3"],
    "estimatedTime": "X-Y hours",
    "difficulty": "intermediate",
    "prerequisites": [],
    "learningObjectives": [],
    "overviewPath": "overview.md",
    "synthesisPath": "synthesis.md",
    "status": "complete"
}
```

---

## 📁 CONCEPT CREATION (×7 FILES!)

### Files Required (ALL MANDATORY)
```
concepts/my-concept/
├── metadata.json      ← WITH ALL PATH FIELDS
├── intuition.md
├── engineering.md
├── mathematics.md
├── exam.md
├── visuals.json       ← Can be {} if empty
├── quiz.json          ← Min 10 questions  
└── flashcards.json    ← Min 10 cards
```

### metadata.json Template
```json
{
    "id": "concept-name",
    "title": "Title",
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

---

## 📝 QUIZ FORMAT

```json
{
    "id": "concept-name-quiz",          // ← NOT conceptId!
    "questions": [
        {
            "id": "q1",                  // ← REQUIRED
            "prompt": "Question?",       // ← NOT question!
            "options": ["A", "B", "C", "D"],
            "correctAnswer": "B",        // ← Exact text, NOT index!
            "explanation": "50+ chars explaining WHY..."
        }
    ]
}
```

### Quick Checks
- [ ] Root has `"id"` not `"conceptId"`
- [ ] Questions use `"prompt"` not `"question"`
- [ ] `"correctAnswer"` is text, not number
- [ ] Each question has `"id": "q1"`, `"q2"`, etc.
- [ ] Explanations are 50+ characters
- [ ] At least 10 questions

---

## 📝 FLASHCARD FORMAT

```json
{
    "id": "concept-name-flashcards",    // ← NOT conceptId!
    "cards": [
        {
            "id": "f1",                  // ← REQUIRED
            "front": "Question",
            "back": "Answer",
            "difficultyLevel": 2        // ← NOT difficulty!
        }
    ]
}
```

### Quick Checks
- [ ] Root has `"id"` not `"conceptId"`
- [ ] Each card has `"id": "f1"`, `"f2"`, etc.
- [ ] Uses `"difficultyLevel"` not `"difficulty"`
- [ ] At least 10 cards

---

## ⚠️ THINGS TO AVOID

### ❌ LaTeX Environments
```latex
\begin{cases}    ← BREAKS KaTeX
\begin{array}    ← BREAKS KaTeX
\begin{align}    ← BREAKS KaTeX
```

**Use bullet lists instead:**
```markdown
- If $v < 0$: $i = 0$
- If $i > 0$: $v = 0$
```

### ❌ Hardcoded CSS Colors
```css
rgba(231, 238, 247, 0.xx)  ← BREAKS LIGHT MODE
```

**Use:**
```css
var(--text-muted)
var(--border)
var(--accent)
```

---

## 🔧 IF YOU GET A 404

1. Check terminal for exact error
2. Error contains: `QuizValidation` → Check quiz fields
3. Error contains: `FlashcardValidation` → Check flashcard fields  
4. Error contains: `ConceptValidation` → Check metadata paths
5. Error contains: `LectureValidation` → Need 3+ concepts

---

## 📋 FINAL CHECKLIST

- [ ] Lesson has 3+ concepts
- [ ] All 7 concept files exist
- [ ] metadata.json has all path fields
- [ ] quiz.json uses `id`, `prompt`, `correctAnswer`
- [ ] flashcards.json cards have `id`, `difficultyLevel`
- [ ] No LaTeX environments
- [ ] CSS uses variables

---

*Keep this handy! One missed field = site-breaking 404*
