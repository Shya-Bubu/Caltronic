# Exam Guide: Algorithmic Strategies

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Define with example** — "Explain iterative algorithms with an ECE example." | 4-5 | 5 min |
| **Newton-Raphson application** — "Use Newton-Raphson to find √2 starting from x₀ = 1." | 6-8 | 8 min |
| **Complexity comparison** — "Compare O(N²) and O(N log N) for N = 1000." | 4 | 4 min |
| **Strategy selection** — "Which strategy would you use for [problem]? Justify." | 5 | 5 min |
| **FFT structure** — "Explain how the FFT achieves O(N log N) from O(N²)." | 6-8 | 7 min |

## Mark Allocation Tips

- **Newton-Raphson problems**: Show the formula, compute f(xₙ) and f'(xₙ) at each step, apply the update. Show at least 2-3 iterations. Include a convergence check.
- **Complexity questions**: Always state the formula, substitute a concrete value of N, and compute the actual number of operations for comparison.
- **Strategy selection**: Name the strategy, briefly explain why it applies, and mention what alternatives exist and why they're worse.

## Common Mistakes

- **Confusing iterative with recursive**: Iterative algorithms refine a single value repeatedly (like Newton-Raphson). Recursive algorithms call themselves with smaller inputs (like FFT). They're different strategies.
- **Forgetting Newton-Raphson can fail**: Students often present it as guaranteed to converge. Always mention that it can diverge with a bad initial guess or when f'(xₙ) ≈ 0.
- **Greedy = always optimal**: A common error. Greedy gives optimal results only when the problem has the greedy choice property. For many problems, it gives suboptimal answers.
