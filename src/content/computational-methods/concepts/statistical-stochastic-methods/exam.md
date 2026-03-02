# Exam Guide: Statistical and Stochastic Methods

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Monte Carlo setup** — "Describe how to estimate filter yield using Monte Carlo. State assumptions." | 5-6 | 6 min |
| **GA design** — "Design a GA to optimize [antenna/filter]. Specify encoding, fitness, operators." | 8-10 | 10 min |
| **UQ problem** — "Given R ~ N(1kΩ, 50²) and C ~ N(1nF, 0.1²), estimate E[fc] and Var[fc]." | 6-8 | 8 min |
| **Compare methods** — "When would you use Monte Carlo vs. exhaustive search?" | 4 | 4 min |

## Mark Allocation Tips

- **Monte Carlo**: Always state (1) the distributions of inputs, (2) the number of samples, (3) the simulation procedure, (4) how yield is computed from results.
- **GA problems**: Specify the chromosome encoding, fitness function, selection method, crossover type, mutation rate, and termination criterion. Each earns marks.

## Common Mistakes

- **Monte Carlo ≠ random guessing**: Monte Carlo is systematic statistical sampling with convergence guarantees (Law of Large Numbers). It's not trial-and-error.
- **Search space underestimation**: Students often ignore that search spaces grow exponentially. Always compute 2^(N×B) and compare to feasible limits (~10⁹).
- **Confusing UQ with sensitivity analysis**: Sensitivity analysis measures how much the output changes per unit change in one input (derivative). UQ propagates the full probability distributions of all inputs simultaneously.
