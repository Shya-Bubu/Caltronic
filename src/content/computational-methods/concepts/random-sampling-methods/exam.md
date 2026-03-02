# Exam Guide: Random Sampling Methods

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Monte Carlo setup** — "Describe how to estimate ∫₀¹ e^(−x²) dx using Monte Carlo." | 5 | 5 min |
| **Error calculation** — "How many samples for 1% accuracy in a Monte Carlo estimate?" | 4 | 4 min |
| **Yield analysis** — "Describe Monte Carlo yield analysis for a filter with R ±5%, C ±10%." | 6 | 6 min |
| **Comparison** — "Compare grid-based and Monte Carlo integration for a 6D integral." | 5 | 5 min |

## Common Mistakes

- **Thinking Monte Carlo is inaccurate**: Monte Carlo can be as accurate as you want — just use more samples. The error is ~1/√N, so N = 10⁶ gives ~0.1% error. The convergence is slow but dimension-independent.
- **Error = 1/N not 1/√N**: This is the most common numerical mistake. Monte Carlo error goes as 1/√N (Central Limit Theorem). To halve error: quadruple (not double) the samples.
- **Confusing with random noise**: Monte Carlo uses DELIBERATE randomness to estimate properties. It's a computational strategy, not a measurement artifact.
