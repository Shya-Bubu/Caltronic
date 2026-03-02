# Exam Guide: Approximation Methods

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Taylor computation** — "Approximate sin(0.3) using 1st and 3rd order." | 4-5 | 5 min |
| **Error bound** — "Estimate the maximum error of 5th-order Taylor for sin(1)." | 4 | 4 min |
| **Classification** — "Is this approximation, discretization, or linearization?" | 3-4 | 3 min |
| **Model simplification** — "Justify when the piecewise-linear diode model is acceptable." | 5 | 5 min |

## Mark Allocation Tips

- **Taylor problems**: Always show the general formula, substitute, compute term by term. State the approximation order explicitly.
- **Classification questions**: Name the concept, state WHY it's that concept (what's being replaced with what), and mention the error type.
- **Error bounds**: Use the Taylor remainder theorem: error ≤ |x|^(N+1)/(N+1)!. Compute the actual number.

## Common Mistakes

- **Confusing approximation with linearization**: Linearization is a *specific type* of approximation (1st-order Taylor at a point). Not all approximations are linear.
- **Ignoring error**: Always state the error trade-off. An approximation without error analysis is incomplete.
- **Confusing order**: The "3rd-order" Taylor keeps the x³ term (3 terms total for sin), not 3 terms of arbitrary functions.
