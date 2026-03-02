# Distinguishing Core Computational Concepts

> **What you're about to learn**: Approximation, Discretization, Linearization, and Random Sampling are four fundamental tools that engineers reach for constantly — but students often confuse them. This lesson gives you crisp definitions, multiple examples for each, and a systematic comparison so you can instantly recognize which concept is at work in any given situation.

## Why This Lesson Matters

In Lesson 01, you met these concepts briefly as part of the 26 foundational principles. Now we go *deep*. Each concept gets its own dedicated treatment with multiple ECE examples, and we'll systematically compare all four side-by-side.

The payoff? When you encounter a computational method in later lessons, you'll be able to immediately classify what's happening: "This step is discretization, that step is linearization, and the uncertainty analysis uses random sampling."

## The Four Concepts at a Glance

| Concept | Primary goal | Key tool | Error type |
|---------|-------------|----------|-----------|
| **Approximation** | Simplify complexity | Truncation, simplification | Truncation / model error |
| **Discretization** | Make continuous discrete | Sampling, gridding | Aliasing / discretization error |
| **Linearization** | Make nonlinear linear | Taylor expansion, derivatives | Linearization error (local) |
| **Random Sampling** | Estimate via randomness | Probability, statistics | Statistical error ($\sim 1/\sqrt{N}$) |

## A Critical Relationship

These concepts are **not independent** — they have deep interconnections:
- **Linearization is a special case of approximation** — all linearizations are approximations, but not all approximations are linearizations
- **Discretization often involves approximation** — replacing derivatives with finite differences is both
- **Random sampling is orthogonal** — it can be combined with any of the others

Recognizing these overlaps and distinctions is the key to clear thinking about computational methods.
