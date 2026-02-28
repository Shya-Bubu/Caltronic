const fs = require('fs');
const p = require('path');
const base = 'c:/Users/ShyaBubu/Desktop/Caltronic app/caltronic-v2/src/content/analog-electronics';

// Create lesson dir
fs.mkdirSync(p.join(base, 'lessons', 'lesson-05'), { recursive: true });

// Metadata
fs.writeFileSync(p.join(base, 'lessons', 'lesson-05', 'metadata.json'), JSON.stringify({
    id: "lesson-05",
    title: "Amplifier Classification & BJT Configurations",
    slug: "lesson-05",
    description: "Classify amplifiers by input/output signal type (voltage, current, transconductance, transresistance), understand ideal vs practical parameters, and analyse the three BJT amplifier configurations (CE, CB, CC) using two-port network models.",
    prerequisites: ["lesson-04"],
    overviewPath: "overview.md",
    synthesisPath: "synthesis.md",
    lectureWeek: 5,
    estimatedMinutes: 180,
    concepts: [
        "amplifier-classification",
        "ideal-vs-practical-amplifiers",
        "common-emitter-amplifier",
        "common-base-and-common-collector",
        "bjt-two-port-analysis"
    ]
}, null, 4));

// Overview
fs.writeFileSync(p.join(base, 'lessons', 'lesson-05', 'overview.md'), `# Amplifier Classification & BJT Configurations

You've learned how to bias a BJT and model its small-signal behaviour. Now it's time to use that knowledge to build **real amplifiers** — the circuits that actually make signals bigger.

But "amplifier" is a broad term. A microphone pre-amp boosts voltage. A speaker driver delivers current. A sensor interface converts a tiny current into a measurable voltage. These are fundamentally different jobs, and they demand different circuit architectures.

In this lesson, you will:

- **Classify amplifiers** into four types based on input/output signal: voltage, current, transconductance, and transresistance
- Understand **ideal vs practical parameters** — why R_in, R_out, and gain matter for each type
- Analyse the **Common-Emitter (CE)** configuration — the workhorse of BJT amplifiers
- Compare **Common-Base (CB)** and **Common-Collector (CC)** configurations and their unique strengths
- Model BJT amplifiers as **two-port networks** for systematic analysis

> **This lesson connects theory to practice.** After this, you'll be able to look at any BJT amplifier and predict its behaviour — gain, input impedance, output impedance — using systematic methods.
`);

// Synthesis
fs.writeFileSync(p.join(base, 'lessons', 'lesson-05', 'synthesis.md'), `# Pulling It All Together

## The Four Amplifier Types

| Type | Input | Output | Gain | Ideal R_in | Ideal R_out |
|------|-------|--------|------|-----------|------------|
| **Voltage** | V | V | A_V (dimensionless) | ∞ | 0 |
| **Current** | I | I | A_I (dimensionless) | 0 | ∞ |
| **Transconductance** | V | I | G_M (Siemens) | ∞ | ∞ |
| **Transresistance** | I | V | R_M (Ohms) | 0 | 0 |

## The Three BJT Configurations

| Property | CE | CB | CC |
|----------|----|----|-----|
| Voltage Gain | High (inverted) | High (non-inverted) | ≈ 1 |
| Current Gain | High (β) | ≈ 1 | High (β+1) |
| Power Gain | Highest | Moderate | Moderate |
| R_in | Medium | Low | High |
| R_out | Medium-High | High | Low |
| Best For | General-purpose | High-frequency | Impedance matching |

## The Big Picture

Every BJT amplifier is just one of CE, CB, or CC — or a combination. The two-port model gives you a systematic way to analyse any configuration: find R_in, R_out, and the appropriate gain. From there, you can cascade stages, match impedances, and design complete amplifier systems.
`);

// Create concept directories
const concepts = [
    'amplifier-classification',
    'ideal-vs-practical-amplifiers',
    'common-emitter-amplifier',
    'common-base-and-common-collector',
    'bjt-two-port-analysis'
];
concepts.forEach(c => fs.mkdirSync(p.join(base, 'concepts', c), { recursive: true }));

console.log('Lesson-05 infrastructure created!');
console.log('Concepts:', concepts.join(', '));
