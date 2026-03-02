# Exam Guide: Convergence and Error Analysis

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Error order** — "What is the error order of E₃ for sin(x)?" | 3-4 | 3 min |
| **Log-log slope** — "From data, estimate the convergence order." | 4-5 | 5 min |
| **Bound proof** — "Prove that ε_k = O(x^(k+1)) for the Taylor series." | 6-8 | 8 min |
| **Rate identification** — "Is this method linear or quadratic convergence?" | 3-4 | 3 min |

## Common Mistakes

- **Confusing order and rate**: Order is about how error depends on x (for fixed k). Rate is about how error decreases with k (for fixed x).
- **|f_k − f_{k-1}| vs. |P − f_k|**: The practical criterion uses successive differences, not the actual error. They're related via Cauchy sequences.
- **Convergence rate constants**: Linear m=1 doesn't mean "slow" if the constant C is small. Taylor's C = |x|/(k+2) shrinks, making it practically fast.
