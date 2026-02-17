# CalTronic V2

> **AI-Orchestrated Learning Platform for Electrical Engineering**

A next-generation academic learning system designed specifically for Electrical & Electronic Engineering students at the University of Peradeniya.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> ### 🤖 For AI Agents
> **Before making any changes**, read the complete systems reference:
> - **[systems.md](systems.md)** — Complete architecture, contracts, components, and rules
> - **[../AGENT.md](../AGENT.md)** — Quick-start instructions for AI agents

---

## 🎯 Vision

Transform university lecture content into deeply structured, IQ-scalable learning experiences that push understanding from 60-70% to 90%+.

## ✨ Features

### 📚 Multi-Layer Learning
Each concept is taught through **7 specialized layers**:
- **Intuition** — Build conceptual understanding first
- **Engineering** — Real-world applications and systems
- **Mathematics** — Rigorous definitions and proofs
- **Exam** — Common traps and grading patterns
- **Summary** — 5-bullet key takeaways
- **Quiz** — Interactive self-assessment
- **Flashcards** — Spaced repetition study

### 🎨 Premium UI/UX
- Dark mode by default with light mode toggle
- Minimalist, high-end aesthetic inspired by Linear.app and Huly.io
- Responsive design for all devices
- Custom academic visualizations

### 📊 Progress Tracking
- Module-level progress indicators
- Concept completion tracking
- Week-by-week content updates

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Shya-Bubu/Caltronic.git
cd Caltronic

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
caltronic-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── data/               # Module definitions
│   │   └── [module]/           # Dynamic module routes
│   ├── components/             # Reusable UI components
│   └── content/                # Learning content
│       └── signals-and-systems/
│           ├── lessons/        # Lesson overviews
│           └── concepts/       # Concept layers
├── public/
│   └── course/                 # Static assets (images)
└── raw/                        # Source lecture materials
```

---

## 📖 Current Modules

| Module | Status | Content |
|--------|--------|---------|
| **Signals and Systems** | ✅ Active | Lesson 01 complete |
| Circuit Analysis | 🔜 Planned | — |
| Digital Logic Design | 🔜 Planned | — |
| Analog Electronics | 🔜 Planned | — |

---

## 🛠 Tech Stack

- **Framework**: Next.js 16.1 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: CSS Modules + Custom Design System
- **Content**: Markdown + JSON schemas
- **Images**: AI-generated academic visualizations

---

## 📝 Content Structure

### Lesson Structure
```
lessons/lesson-XX/
├── metadata.json      # Concept IDs, order, status
├── overview.md        # Learning objectives
└── synthesis.md       # Key takeaways
```

### Concept Structure
```
concepts/concept-slug/
├── metadata.json      # Layer paths
├── intuition.md       # Conceptual layer
├── engineering.md     # Applications layer
├── mathematics.md     # Formal layer
├── exam.md            # Exam prep layer
├── summary.md         # Quick reference
├── visuals.json       # Image references
├── quiz.json          # Assessment questions
└── flashcards.json    # Study cards
```

---

## 🤝 Contributing

This is an academic project. Contributions are welcome for:
- Additional lecture content
- UI/UX improvements
- Bug fixes

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Shyamika Randimal**  
Electrical & Electronic Engineering  
University of Peradeniya

---

> *"The best way to learn is to teach the machine to teach you."*
