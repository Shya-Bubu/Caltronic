export interface LectureLink {
  id: string;
  title: string;
  path: string;
}

export interface Module {
  id: string;
  slug: string;
  code: string;
  title: string;
  description?: string;
  category?: string;
  accent?: string;
  updatedToWeek?: number;
  progress?: number;
  lectures: LectureLink[];
}

export const modules: Module[] = [
  {
    id: "EE2010",
    slug: "circuit-analysis",
    code: "EE2010-Nov2025",
    title: "Circuit Analysis",
    description: "Core circuit laws, analysis techniques, and engineering problem solving.",
    category: "Core Theory",
    accent: "#4f8cff",
    updatedToWeek: 0,
    lectures: [],
  },
  {
    id: "EE2020",
    slug: "signals-and-systems",
    code: "EE2020-Nov2025",
    title: "Signals and Systems",
    description: "Signals, systems, and the mathematical language of engineering change over time.",
    category: "Core Theory",
    accent: "#6b62ff",
    updatedToWeek: 2,
    lectures: [
      {
        id: "lesson-01",
        title: "Introduction to Signals and Systems",
        path: "/signals-and-systems/lesson-01",
      },
    ],
  },
  {
    id: "EE2030",
    slug: "digital-logic-design",
    code: "EE2030-Nov2025",
    title: "Digital Logic Design and Synthesis",
    description: "Boolean reasoning, combinational/sequential design, and synthesis fundamentals.",
    category: "Foundational",
    accent: "#2fbf8f",
    updatedToWeek: 0,
    lectures: [],
  },
  {
    id: "EE2040",
    slug: "analog-electronics",
    code: "EE2040-Nov2025",
    title: "Analog Electronics",
    description: "Analog device behavior, amplifiers, and practical circuit intuition.",
    category: "Core Theory",
    accent: "#f0a03a",
    updatedToWeek: 0,
    lectures: [],
  },
  {
    id: "EE2050",
    slug: "design-and-manufacturing",
    code: "EE2050-Nov2025",
    title: "Design Principles and Manufacturing Technologies",
    description: "Design thinking and the realities of manufacturing constraints.",
    category: "Practical",
    accent: "#ff6b8a",
    updatedToWeek: 0,
    lectures: [],
  },
  {
    id: "EE3070",
    slug: "computational-methods",
    code: "EE3070-Nov2025",
    title: "Computational Methods in Electrical and Electronic Engineering",
    description: "Numerical methods and computation as an engineering tool.",
    category: "Computational",
    accent: "#62c6ff",
    updatedToWeek: 0,
    lectures: [],
  },
];
