# Blueprint Examples

This folder contains **working reference implementations** from the Signals & Systems module.

---

## signal-and-system-foundations/

**Status:** ✅ Complete and validated  
**Module:** Signals & Systems, Lecture 1  
**Difficulty Range:** 50-110 (A-Level → Lecture + 10%)

### Why This Example?

This concept demonstrates:
- ✅ Proper difficulty progression (starts from basics)
- ✅ Complete 7-layer structure
- ✅ Validated quiz (10 questions, explanations >50 chars)
- ✅ Validated flashcards (10 cards, difficulty levels 1-5)
- ✅ D3.js visual specifications
- ✅ Clear markdown structure

### Files Included

```
signal-and-system-foundations/
├── metadata.json          # Concept metadata
├── intuition.md          # Big picture (IQ 100-115)
├── engineering.md        # Applications (IQ 115-125)
├── mathematics.md        # Rigorous proofs (IQ 125-135)
├── exam.md              # Past paper patterns
├── visuals.json         # D3.js visualization specs
├── quiz.json            # 15 questions with detailed explanations
└── flashcards.json      # 15 cards with difficulty levels
```

---

## How to Use This Example

### For AI Content Generators:

1. **Study the Tone:**
   - Read `intuition.md` — notice how it starts from first principles
   - Read `mathematics.md` — notice every derivation step is shown
   - Read `engineering.md` — notice practical, buildable examples

2. **Copy the Structure:**
   - Use the same markdown heading hierarchy
   - Follow the same section flow (Big Idea → Depth)
   - Match the approximate word counts

3. **Replicate the Quality:**
   - Quiz explanations: see how they teach through wrong answers
   - Flashcard difficulty: see the 1-5 distribution
   - Visuals: see how they're specified in JSON

### For Human Reviewers:

1. **Benchmark:** Compare new concepts against this
2. **Quality bar:** New content should match or exceed this quality
3. **Consistency:** Tone and structure should feel similar

---

## Key Takeaways from This Example

### What Makes `intuition.md` Good:

```markdown
# Signals and Systems: The Foundation

Before we jump into mathematics, let's answer a simple question: **What is a signal?**

Think about your day so far. You probably:
- Checked your phone (electrical signals)
- Listened to music (sound signals)
- Looked at a screen (visual signals)

Signals are everywhere. They carry information...
```

**Notice:**
- Starts with a question
- Uses real-world examples
- Builds from familiar concepts
- No equations in first 3 paragraphs

---

### What Makes the Quiz Good:

**Question 5:**
```json
{
  "id": "q5",
  "prompt": "Which of these is a continuous-time signal?",
  "options": [
    "Temperature reading every hour",
    "A piano key recording",
    "Photos taken every second",
    "A heartbeat sensor output (continuous)"
  ],
  "correctAnswer": "A heartbeat sensor output (continuous)",
  "explanation": "A continuous-time signal is defined for all values of time, not just discrete points. The heartbeat sensor outputs a continuous waveform. The other options are discrete-time: they sample at specific intervals. Temperature every hour = discrete samples. Piano recording (after digitization) = discrete samples. Photos = discrete frames. Even though the heartbeat itself is discrete (beats), a sensor that measures it continuously produces a continuous signal."
}
```

**Notice:**
- Clear prompt
- 4 plausible options (all involve time-based signals)
- Detailed explanation (>200 chars)
- Addresses ALL wrong answers
- Teaches the distinction between continuous and discrete

---

### What Makes the Flashcards Good:

**Card Distribution:**
- 3 cards at level 1-2 (definitions)
- 7 cards at level 3 (applications)
- 5 cards at level 4-5 (distinctions, derivations)

**Example Level 5 Card:**
```json
{
  "id": "f15",
  "front": "Why do we care about the distinction between energy and power signals?",
  "back": "Different analysis techniques apply to each. Energy signals (finite energy) use Fourier Transform. Power signals (periodic or infinite) use Fourier Series or Power Spectral Density. Knowing which type helps choose the right mathematical tool.",
  "difficultyLevel": 5
}
```

**Notice:**
- Asks "why" (not just "what")
- Answer explains practical implications
- Level 5 appropriate (synthesis/justification)

---

## Differences from Circuit Analysis Content

### This Example (Signals & Systems):
- **Working perfectly** → use as technical reference
- Difficulty progression is correct (50 → 110)
- No validation errors

### Circuit Analysis (in progress):
- Concept 1 (`linear-resistor-fundamentals`) has been corrected
- Concepts 2-3 have valid quiz/flashcards but incomplete markdown layers
- Use Signals & Systems for structure, Circuit Analysis for the NEW teaching approach

---

## Applying This to New Concepts

### Step-by-Step:

1. **Open `intuition.md`** from this example
2. **Identify the pattern:**
   - Hook (real-world)
   - From Basics (build up)
   - Big Idea (core concept)
   - Lecture Connection
   - Why It Matters
3. **Write your new concept** following the same flow
4. **Check length:** Should be 800-1200 words (similar to this)
5. **Repeat for other layers**

---

## Version History

- **v1.0** (Dec 2025) — Original Signals & Systems content
- **v1.1** (Jan 2026) — Added to blueprint as reference

---

**When in doubt, copy this structure. Quality over novelty.**
