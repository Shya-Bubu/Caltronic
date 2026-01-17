# Caltronic V2 — System Requirements Specification

**Project:** Caltronic V2 Learning Platform  
**Author:** Shyamika Randimal Dharmarathna  
**Institution:** University of Peradeniya, Faculty of Engineering  
**Version:** 2.0  
**Last Updated:** January 17, 2026

---

## Executive Summary

Caltronic V2 is a **premium, IQ-scaled learning platform** designed specifically for Electrical and Electronic Engineering (EE2020) students. The system transforms dense lecture content into an interactive, visually-rich learning experience with progressive difficulty scaling, immediate feedback, and comprehensive exam preparation tools.

---

## 1. FUNCTIONAL REQUIREMENTS

### 1.1 Core Navigation System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-NAV-01 | System SHALL display a homepage with module grid | Critical |
| FR-NAV-02 | System SHALL support navigation between modules via URL routing (`/[module]/[lecture]`) | Critical |
| FR-NAV-03 | System SHALL display a sidebar with lesson list and concept navigation | Critical |
| FR-NAV-04 | System SHALL support breadcrumb navigation (Home > Module > Lesson) | High |
| FR-NAV-05 | System SHALL provide a top navigation bar with logo, links, and theme toggle | High |

### 1.2 Content Delivery System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CON-01 | System SHALL load and render markdown content (`.md` files) | Critical |
| FR-CON-02 | System SHALL render LaTeX equations using KaTeX | Critical |
| FR-CON-03 | System SHALL support 7 learning layers per concept: Intuition, Engineering, Mathematics, Exam, Visuals, Quiz, Flashcards | Critical |
| FR-CON-04 | System SHALL display tabbed interface for switching between learning layers | Critical |
| FR-CON-05 | System SHALL render embedded visuals using `[[visual:id]]` syntax | Critical |
| FR-CON-06 | System SHALL load visual definitions from `visuals.json` files | Critical |
| FR-CON-07 | System SHALL support inline code blocks and syntax highlighting | High |
| FR-CON-08 | System SHALL support tables with proper styling | High |

### 1.3 Visualization System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-VIS-01 | System SHALL render D3.js-based visualizations inline with content | Critical |
| FR-VIS-02 | System SHALL support the following visual types: | |
| | - `d3-waveform` (sine, cosine, square, step, impulse, ramp, triangle, rect) | Critical |
| | - `d3-vi-curve` / `d3-iv-curve` (V-I characteristic curves) | Critical |
| | - `d3-block-diagram` (block diagram with connections) | Critical |
| | - `d3-sampling` (interactive sampling/aliasing demo) | High |
| | - `d3-simulation` (interactive parameter-controlled simulations) | High |
| FR-VIS-03 | System SHALL support multiple curves on single plot with different colors | High |
| FR-VIS-04 | System SHALL support curve parameters (resistance, voltage, current) | High |
| FR-VIS-05 | System SHALL support interactive controls (sliders, buttons) on simulations | High |
| FR-VIS-06 | System SHALL render multiline labels in block diagrams (using `\\n`) | Medium |

### 1.4 Quiz System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-QZ-01 | System SHALL load quiz questions from `quiz.json` files | Critical |
| FR-QZ-02 | System SHALL display multiple-choice questions with 4 options | Critical |
| FR-QZ-03 | System SHALL provide immediate feedback on answer selection | Critical |
| FR-QZ-04 | System SHALL display detailed explanations for correct/incorrect answers | Critical |
| FR-QZ-05 | System SHALL validate minimum 10 questions per quiz | High |
| FR-QZ-06 | System SHALL validate minimum 50 characters per explanation | High |
| FR-QZ-07 | System SHALL track quiz progress (questions answered, score) | Medium |

### 1.5 Flashcard System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-FC-01 | System SHALL load flashcards from `flashcards.json` files | Critical |
| FR-FC-02 | System SHALL display front/back card interface with flip animation | Critical |
| FR-FC-03 | System SHALL validate minimum 10 cards per deck | High |
| FR-FC-04 | System SHALL support difficulty levels (1-5) per card | Medium |
| FR-FC-05 | System SHALL support spaced repetition scheduling | Low |

### 1.6 Theme System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-THM-01 | System SHALL support 4 themes: Dark, Light, Antigravity, Eye Comfort | High |
| FR-THM-02 | System SHALL persist theme selection in localStorage | High |
| FR-THM-03 | System SHALL provide dropdown theme selector | High |
| FR-THM-04 | System SHALL apply theme instantly without page reload | High |
| FR-THM-05 | System SHALL default to Dark theme on first visit | Medium |

### 1.7 Module Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-MOD-01 | System SHALL support multiple modules (Circuit Analysis, Signals & Systems) | Critical |
| FR-MOD-02 | System SHALL load module metadata from `metadata.json` | Critical |
| FR-MOD-03 | System SHALL display module overview on lesson page | High |
| FR-MOD-04 | System SHALL show concept list with progress indicators | Medium |
| FR-MOD-05 | System SHALL display "weeks covered" for exam scheduling | Medium |

---

## 2. NON-FUNCTIONAL REQUIREMENTS

### 2.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PERF-01 | Initial page load time | < 2 seconds |
| NFR-PERF-02 | Content switching (tab change) | < 200ms |
| NFR-PERF-03 | Visual rendering time | < 500ms |
| NFR-PERF-04 | Simulation frame rate | ≥ 30 FPS |
| NFR-PERF-05 | Memory usage | < 200MB |

### 2.2 Usability

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-USE-01 | **Responsive Design** | Works on desktop (1920x1080), laptop (1366x768), tablet (768x1024) |
| NFR-USE-02 | **Accessibility** | Keyboard navigation, proper heading hierarchy, alt text |
| NFR-USE-03 | **Reading Experience** | Maximum 80 characters per line, proper line height (1.6) |
| NFR-USE-04 | **Visual Hierarchy** | Clear distinction between headings, body, code, equations |
| NFR-USE-05 | **Error Handling** | Graceful fallbacks for missing content, clear error messages |

### 2.3 Reliability

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-REL-01 | **Content Validation** | All content files validated on load |
| NFR-REL-02 | **Graceful Degradation** | Missing visuals show placeholder, not crash |
| NFR-REL-03 | **Hot Reload** | Development changes reflect without full reload |
| NFR-REL-04 | **Error Isolation** | One concept error doesn't break entire lesson |

### 2.4 Maintainability

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-MAIN-01 | **Content Structure** | 7 files per concept, clear folder hierarchy |
| NFR-MAIN-02 | **Visual Schema** | JSON-based visual definitions |
| NFR-MAIN-03 | **Component Modularity** | Reusable D3 components |
| NFR-MAIN-04 | **Documentation** | Blueprint, bug fixes document, teaching methodology |

### 2.5 Security

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-SEC-01 | **No User Data Collection** | Platform is read-only, no personal data stored |
| NFR-SEC-02 | **Content Isolation** | User cannot modify content files |
| NFR-SEC-03 | **Safe Rendering** | No arbitrary JavaScript execution in content |

### 2.6 Scalability

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-SCALE-01 | **Modules** | Support 10+ modules without performance degradation |
| NFR-SCALE-02 | **Concepts per Lesson** | Support 15+ concepts per lesson |
| NFR-SCALE-03 | **Visuals per Concept** | Support 20+ visuals per concept |

---

## 3. CONTENT STRUCTURE

### 3.1 Module Hierarchy

```
/src/content/
├── [module-name]/
│   ├── concepts/
│   │   └── [concept-name]/
│   │       ├── metadata.json      # Concept metadata
│   │       ├── intuition.md       # Core understanding (IQ 100-115)
│   │       ├── engineering.md     # Practical applications (IQ 115-125)
│   │       ├── mathematics.md     # Rigorous derivations (IQ 125-135)
│   │       ├── exam.md            # Exam patterns and strategies
│   │       ├── visuals.json       # D3 visualization definitions
│   │       ├── quiz.json          # Quiz questions (min 10)
│   │       └── flashcards.json    # Flashcard deck (min 10)
│   └── lessons/
│       └── [lesson-name]/
│           ├── metadata.json      # Lesson metadata
│           ├── overview.md        # Lesson introduction
│           └── synthesis.md       # Lesson summary
```

### 3.2 Content Validation Rules

| File | Validation |
|------|------------|
| `metadata.json` | Required fields: id, title |
| `intuition.md` | Must exist, valid markdown |
| `engineering.md` | Must exist (can be placeholder) |
| `mathematics.md` | Must exist (can be placeholder) |
| `exam.md` | Must exist (can be placeholder) |
| `visuals.json` | Valid JSON, optional empty `{}` |
| `quiz.json` | Min 10 questions, explanations > 50 chars |
| `flashcards.json` | Min 10 cards, difficulty 1-5 |

---

## 4. VISUAL TYPES SPECIFICATION

### 4.1 Waveform Types (`d3-waveform`)

| Type | Description |
|------|-------------|
| `sine` | Sinusoidal wave |
| `cosine` | Cosine wave |
| `square` | Square wave |
| `step` | Unit step function u(t) |
| `impulse` | Dirac delta δ(t) |
| `ramp` | Ramp function |
| `triangle` | Triangular wave |
| `rect` | Rectangular pulse |

### 4.2 Curve Types (`d3-iv-curve` / `d3-vi-curve`)

| Type | Description | Parameters |
|------|-------------|------------|
| `linear-resistor` | Linear V-I characteristic | resistance |
| `open-circuit` | Horizontal line (i=0) | — |
| `short-circuit` | Vertical line (v=0) | — |
| `ideal-diode` | L-shaped PWL curve | — |
| `voltage-source` | Vertical line at V₀ | voltage |
| `current-source` | Horizontal line at I₀ | current |
| `pn-junction` | Exponential diode curve | — |
| `tunnel` | N-shaped negative resistance | — |
| `zener` | Reverse breakdown curve | voltage |
| `glow` | S-shaped discharge curve | — |

### 4.3 Block Diagram Types (`d3-block-diagram`)

| Block Type | Rendering |
|------------|-----------|
| `process` | Rectangular block with border |
| `sum` | Circle with Σ symbol |
| `branch` | Small circle junction |
| `input` | Text label (no border) |
| `output` | Text label (no border) |

---

## 5. TECHNOLOGY STACK

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.1 (App Router) |
| **Language** | TypeScript |
| **Styling** | CSS Modules, CSS Custom Properties |
| **Visualization** | D3.js v7 |
| **Math Rendering** | KaTeX |
| **Markdown** | react-markdown with remark plugins |
| **State** | React hooks (no external state management) |
| **Build** | Turbopack |

---

## 6. THEME SPECIFICATIONS

### 6.1 Dark Theme (Default)

```css
--bg: #0a0a0a;
--text: #ededed;
--accent: #3b82f6;
```

### 6.2 Light Theme

```css
--bg: #ffffff;
--text: #171717;
--accent: #2563eb;
```

### 6.3 Antigravity Theme

```css
--bg: #050508;
--text: #e0e0e0;
--accent: #00d4ff;
--accent-secondary: #b14eff;
```

### 6.4 Eye Comfort Theme

```css
--bg: #1a1a1a;
--text: #a0a0a0;
--accent: #8b8b6e;
```

---

## 7. APPENDICES

### 7.1 Known Limitations

1. **LaTeX environments** — `\begin{cases}`, `\begin{array}` not supported by KaTeX
2. **Offline mode** — Not currently supported
3. **Progress persistence** — Quiz/flashcard progress not saved between sessions
4. **Mobile optimization** — Primary target is desktop/laptop

### 7.2 Future Enhancements (Roadmap)

1. [ ] Spaced repetition flashcard scheduling
2. [ ] User progress tracking with localStorage
3. [ ] Search across all content
4. [ ] PDF export of notes
5. [ ] Dark mode system preference detection
6. [ ] PWA support for offline access

---

*Document generated for Caltronic V2 Learning Platform*
