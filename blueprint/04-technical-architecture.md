# 04 — Technical Architecture

**Purpose:** Understand the codebase structure, routing, and validation system

---

## Project Structure

```
caltronic-v2/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── [module]/           # Dynamic module routes
│   │   │   └── [lecture]/      # Dynamic lecture routes
│   │   │       └── page.tsx    # Lecture page component
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── ContentRenderer.tsx # Markdown → JSX renderer
│   │   ├── D3Waveform.tsx      # D3 visualizations
│   │   ├── QuizComponent.tsx   # Quiz interface
│   │   └── ...
│   ├── content/                # Learning content (markdown + JSON)
│   │   ├── [module-name]/
│   │   │   ├── lessons/
│   │   │   │   └── lesson-XX/
│   │   │   │       └── metadata.json
│   │   │   └── concepts/
│   │   │       └── [concept-name]/
│   │   │           ├── intuition.md
│   │   │           ├── engineering.md
│   │   │           ├── mathematics.md
│   │   │           ├── exam.md
│   │   │           ├── visuals.json
│   │   │           ├── quiz.json
│   │   │           └── flashcards.json
│   ├── core/                   # Business logic
│   │   ├── contracts/          # TypeScript validation schemas
│   │   ├── loaders/            # Content loading functions
│   │   └── validators/         # Validation logic
│   └── lib/                    # Utilities
├── public/                     # Static assets
├── blueprint/                  # System documentation (this folder)
└── package.json
```

---

## Routing System

Caltronic V2 uses Next.js App Router with dynamic routes:

### URL Pattern
```
/[module]/[lecture]
```

**Examples:**
- `/circuit-analysis/lesson-01`
- `/signals-and-systems/lesson-02`

### File: `src/app/[module]/[lecture]/page.tsx`

```typescript
export default async function LecturePage({
  params,
}: {
  params: { module: string; lecture: string };
}) {
  // 1. Load lecture metadata
  const lecture = await loadLecture(params.module, params.lecture);
  
  // 2. Load all concepts for this lecture
  const concepts = await Promise.all(
    lecture.concepts.map(conceptId => 
      loadConcept(params.module, conceptId)
    )
  );
  
  // 3. Validate
  validateLecture(lecture);
  concepts.forEach(validateConcept);
  
  // 4. Render
  return (
    <LectureLayout lecture={lecture} concepts={concepts} />
  );
}
```

---

## Content Loading

### Loader Functions

**File:** `src/core/loaders/conceptLoader.ts`

```typescript
export async function loadConcept(
  module: string,
  conceptId: string
): Promise<Concept> {
  const basePath = `src/content/${module}/concepts/${conceptId}`;
  
  // Load markdown files
  const intuition = await fs.readFile(`${basePath}/intuition.md`, 'utf-8');
  const engineering = await fs.readFile(`${basePath}/engineering.md`, 'utf-8');
  const mathematics = await fs.readFile(`${basePath}/mathematics.md`, 'utf-8');
  const exam = await fs.readFile(`${basePath}/exam.md`, 'utf-8');
  
  // Load JSON files
  const metadata = JSON.parse(await fs.readFile(`${basePath}/metadata.json`, 'utf-8'));
  const visuals = JSON.parse(await fs.readFile(`${basePath}/visuals.json`, 'utf-8'));
  const quiz = JSON.parse(await fs.readFile(`${basePath}/quiz.json`, 'utf-8'));
  const flashcards = JSON.parse(await fs.readFile(`${basePath}/flashcards.json`, 'utf-8'));
  
  return {
    id: conceptId,
    metadata,
    content: {
      intuition,
      engineering,
      mathematics,
      exam,
    },
    interactive: {
      visuals,
      quiz,
      flashcards,
    },
  };
}
```

---

## Validation System

### Contract-Based Validation

Each JSON file must conform to a TypeScript contract (schema).

#### QuizContract

**File:** `src/core/contracts/QuizContract.ts`

```typescript
export interface QuizQuestion {
  id: string;                    // Unique identifier
  prompt: string;                 // Question text
  options: [string, string, ...string[]]; // Min 2 options
  correctAnswer: string;          // Must match one option
  explanation: string;            // >50 characters
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];      // Min 10 questions
}
```

**Validation:** `src/core/validators/quizValidator.ts`

```typescript
export function validateQuiz(quiz: Quiz): void {
  // Check minimum question count
  if (quiz.questions.length < 10) {
    throw new ValidationError('Quiz must have at least 10 questions');
  }
  
  // Check unique IDs
  const ids = quiz.questions.map(q => q.id);
  if (new Set(ids).size !== ids.length) {
    throw new ValidationError('Quiz questions must have unique IDs');
  }
  
  // Validate each question
  quiz.questions.forEach((q, index) => {
    // Explanation length
    if (q.explanation.length < 50) {
      throw new ValidationError(
        `Question ${index + 1}: explanation must be ≥50 chars. Current: ${q.explanation.length}`
      );
    }
    
    // correctAnswer must match an option
    if (!q.options.includes(q.correctAnswer)) {
      throw new ValidationError(
        `Question ${index + 1}: correctAnswer must match one of the options`
      );
    }
  });
}
```

#### FlashcardContract

**File:** `src/core/contracts/FlashcardContract.ts`

```typescript
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
}

export interface FlashcardDeck {
  id: string;
  cards: Flashcard[];  // Min 10 cards
}
```

**Validation:**
- Minimum 10 cards
- Each card has unique ID
- `difficultyLevel` must be 1-5
- `front` and `back` are non-empty

#### LectureContract

**File:** `src/core/contracts/LectureContract.ts`

```typescript
export interface Lecture {
  id: string;
  title: string;
  description: string;
  week: string;
  concepts: string[];  // Min 3 concept IDs
}
```

**Key Rule:**
- **Minimum 3 concepts per lecture** (enforced during validation)

---

## Markdown Rendering

### ContentRenderer Component

**File:** `src/components/ContentRenderer.tsx`

```typescript
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export function ContentRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // Custom component renderers
        h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>,
        code: ({ inline, children }) => 
          inline 
            ? <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">{children}</code>
            : <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto"><code>{children}</code></pre>,
        // ... more custom renderers
      }}
    />
  );
}
```

**Features:**
- **Math rendering:** `$$...$$` for display math, `$...$` for inline
- **Syntax highlighting:** Code blocks with language tags
- **Theme support:** Tailwind classes adapt to light/dark mode

---

## D3 Visualization Rendering

### D3Waveform Component

**File:** `src/components/D3Waveform.tsx`

```typescript
'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from 'next-themes';

export function D3Waveform({ config }: { config: WaveformConfig }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const colors = theme === 'dark' ? darkTheme : lightTheme;
    
    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', 300)
      .attr('viewBox', '0 0 600 300');
    
    // Generate waveform data
    const data = generateWaveform(config);
    
    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, config.params.duration])
      .range([50, 550]);
    
    const yScale = d3.scaleLinear()
      .domain([-config.params.amplitude * 1.2, config.params.amplitude * 1.2])
      .range([250, 50]);
    
    // Draw axes
    svg.append('g')
      .attr('transform', 'translate(0,150)')
      .call(d3.axisBottom(xScale))
      .attr('color', colors.gridLines);
    
    svg.append('g')
      .attr('transform', 'translate(50,0)')
      .call(d3.axisLeft(yScale))
      .attr('color', colors.gridLines);
    
    // Draw waveform
    if (config.mode === 'continuous') {
      const line = d3.line<{x: number, y: number}>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));
      
      svg.append('path')
        .datum(data)
        .attr('d', line)
        .attr('stroke', colors.primary)
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    } else {
      // Discrete: stem plot
      svg.selectAll('.stem')
        .data(data)
        .enter()
        .append('line')
        .attr('x1', d => xScale(d.x))
        .attr('y1', 150) // Zero line
        .attr('x2', d => xScale(d.x))
        .attr('y2', d => yScale(d.y))
        .attr('stroke', colors.primary)
        .attr('stroke-width', 2);
      
      svg.selectAll('.marker')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 4)
        .attr('fill', colors.primary);
    }
  }, [config, theme]);
  
  return (
    <div className="flex flex-col items-center my-6">
      <svg ref={svgRef} />
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl text-center">
        {config.description}
      </p>
    </div>
  );
}
```

---

## Build Process

### Development
```bash
npm run dev
```
- Hot reload enabled
- Runs on `http://localhost:3000`
- No validation errors tolerated (strict mode)

### Production Build
```bash
npm run build
```
- Validates ALL content files
- Fails fast on validation errors
- Generates static pages where possible

### Validation During Build

**File:** `next.config.js`

```javascript
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Run full content validation
      require('./src/core/validators/validateAll.ts')();
    }
    return config;
  },
};
```

---

## Error Handling

### 404 Pages
If a lecture/concept doesn't exist:
→ `notFound()` triggers Next.js 404 page

### Validation Errors
If JSON fails validation:
→ Build fails with specific error message
→ Dev server shows error in console

**Example Error:**
```
ConceptValidationError: power-and-passivity
  ├─ Quiz validation failed
  └─ Question 3: explanation must be ≥50 chars. Current: 23
```

---

## Testing Strategy

### Manual Testing
1. **Browser test:** Navigate to each lecture
2. **Visual check:** Verify D3 renders correctly
3. **Theme toggle:** Switch light/dark mode
4. **Quiz:** Take quiz, check feedback
5. **Responsive:** Test on mobile viewport

### Automated Validation
- JSON schema validation (TypeScript contracts)
- Markdown linting (remark plugins)
- Build-time validation (all content)

---

## Performance Optimizations

### Static Generation
- Lecture pages are statically generated at build time
- Concepts are loaded server-side (no client fetch)

### Code Splitting
- D3 components lazy-loaded
- Each concept's content loaded on-demand (tabs)

### Caching
- Markdown processed once, cached
- D3 SVGs rendered client-side (lightweight)

---

## Deployment

### Recommended Platform: Vercel
```bash
vercel --prod
```

### Environment Variables
(None required for basic deployment)

### Build Output
- Static HTML for each lecture
- Client-side JavaScript for interactivity
- D3 render on client (small bundle)

---

**This architecture prioritizes clarity, validation, and maintainability over complexity.**
