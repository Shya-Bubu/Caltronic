# Exam Guide: Foundations — Representation and Transformation

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Define and give example** — "Define approximation in computational methods. Give an ECE example." | 4-5 | 5 min |
| **Nyquist calculation** — "A signal has components up to 8 kHz. What is the minimum sampling rate?" | 3 | 3 min |
| **Linearization problem** — "Linearize f(x) = sin(x) around x₀ = π/4." | 5-6 | 7 min |
| **Compare principles** — "Compare discretization and approximation with examples." | 6-8 | 8 min |
| **Application identification** — "Which foundational principles are used in SPICE simulation?" | 4-5 | 5 min |

## Mark Allocation Tips

- **Definitions**: State the principle in one sentence + give a specific ECE example = full marks. Generic answers lose 1-2 marks.
- **Nyquist problems**: Show the formula (fs ≥ 2fmax), substitute, conclude. Don't just write the answer.
- **Linearization**: Show f(x₀), compute f'(x₀), write the linear model f(x) ≈ f(x₀) + f'(x₀)(x - x₀). Each step earns marks.
- **Comparison questions**: Use a structured table (what it does, when to use, limitation) for maximum clarity.

## Common Mistakes

- **Confusing approximation with discretization**: Approximation simplifies the *model* (e.g., linearizing a nonlinear equation). Discretization simplifies the *domain* (e.g., replacing continuous time with discrete samples). They often work together but are distinct principles.
- **Forgetting Nyquist is a minimum**: Students often state fs = 2fmax as exact rather than ≥. In practice, you always sample faster.
- **Linearization validity**: Many students linearize correctly but forget to state the limitation — it's only valid near the operating point. Always mention this for full marks.
- **PCA misconception**: PCA doesn't "compress" data — it identifies the most informative directions. The discarded components aren't missing data; they're the least important variation.
