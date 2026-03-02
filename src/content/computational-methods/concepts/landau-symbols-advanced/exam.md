# Exam Guide: Landau Symbols

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **Symbol identification** — "f(n) = 3n² + 2n. Write all valid Landau statements." | 4 | 4 min |
| **Proof** — "Prove that 3n² + 5n = Θ(n²)." | 5 | 5 min |
| **Comparison** — "Distinguish Big-O, Big-Θ, and little-o with examples." | 5 | 5 min |
| **Application** — "Why is sorting Ω(n log n)?" | 4 | 4 min |

## Common Mistakes

- **Confusing O and Θ**: O is just an upper bound (f ≤ Cg). Θ requires both upper AND lower (Cg ≤ f ≤ Cg). n = O(n²) is true but misleading; n ≠ Θ(n²).
- **Confusing o and O**: Little-o (f/g → 0) is stricter than Big-O (f/g ≤ C). n = o(n²) is true (n/n² → 0), but n ≠ o(n) (n/n → 1 ≠ 0).
- **Ω confusion**: Ω is a lower bound on f, not on computation time. f = Ω(g) means f grows at least as fast as g.
