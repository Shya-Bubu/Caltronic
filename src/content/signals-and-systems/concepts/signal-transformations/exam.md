# Exam Focus: Signal Transformations

## Key Rules

1. **Shift**: $x(t - t_0)$ shifts RIGHT for positive $t_0$
2. **Scale**: $x(at)$ compresses for $|a| > 1$
3. **Reflect**: $x(-t)$ flips about origin
4. **Combined**: Feature at $t_0$ moves to $(t_0 - b)/a$ for $x(at + b)$

## Common Exam Patterns

### Find where features move

Q: If $x(t)$ has a peak at $t = 4$, where is the peak in $x(3t - 6)$?

A: New position = $(4 - (-6))/3 = 10/3 = 3.33$

### Determine transformation parameters

Q: Signal shifted from $t = 2$ to $t = 5$ and compressed by 2. Write transformation.

A: $x(2(t - 5) + 2 \cdot 2) = x(2t - 10 + 4) = x(2t - 6)$

Actually simpler: $x(2t - 6) = x(2(t - 3))$ — shift by 3, compress by 2.

## Pitfalls to Avoid

- Confusing shift direction (minus = right!)
- Forgetting scaling affects shift amount
- Not factoring properly: $x(2t - 6) = x(2(t - 3))$, not shift by 6
