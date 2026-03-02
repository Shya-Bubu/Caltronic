# Exam Guide: Asymptotic Growth and Big-O

## Typical Question Patterns

| Pattern | Marks | Time |
|---------|-------|------|
| **FLOP counting** — "Count multiplications & additions for N×N matrix-vector multiply." | 5-6 | 5 min |
| **Big-O proof** — "Show that 5N² + 3N + 7 = O(N²)." | 4-5 | 5 min |
| **Scaling prediction** — "If N = 100 takes T seconds, how long for N = 500 at O(N³)?" | 3-4 | 3 min |
| **Classification** — "Order these: O(N log N), O(N²), O(2^N), O(N)." | 2-3 | 2 min |

## Common Mistakes

- **Forgetting to count additions AND multiplications**: FLOPs = multiplications + additions. Matrix multiply: N³ mults + (N³−N²) adds = 2N³−N².
- **Keeping constants in Big-O**: O(24N²) is wrong. Write O(N²) — drop the constant.
- **Confusing memory and ops**: Memory for matrices is O(N²); operations for matrix multiply is O(N³). Don't mix them.
