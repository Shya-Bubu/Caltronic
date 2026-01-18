# Mathematical Foundations: Algorithm Complexity

## Formal Big-O Definition

$f(n) = O(g(n))$ if there exist constants $c > 0$ and $n_0$ such that:
$$|f(n)| \leq c \cdot g(n) \quad \text{for all } n \geq n_0$$

This captures asymptotic behavior—how $f$ grows for large $n$.

## Related Notations

- **O (Big-O):** Upper bound (at most)
- **Ω (Omega):** Lower bound (at least)
- **Θ (Theta):** Tight bound (exactly)

Example: Merge sort is $\Theta(n \log n)$—always, best and worst case.

## Common Complexity Classes

### O(1) — Constant
```
Array access: A[i]
Hash table lookup (average)
```

### O(log n) — Logarithmic
```
Binary search
Balanced tree operations
```

The logarithm grows very slowly: $\log_2(10^9) \approx 30$.

### O(n) — Linear
```python
for i in range(n):
    # O(1) operation
```

### O(n log n) — Linearithmic
```
FFT
Merge sort, heap sort
```

### O(n²) — Quadratic
```python
for i in range(n):
    for j in range(n):
        # O(1) operation
```

Common in naive matrix operations.

### O(n³) — Cubic
Matrix multiplication (naive), Gaussian elimination.

$$C = AB \Rightarrow c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$$

Each element needs n multiplications, n² elements = O(n³).

[[visual:v6]]

## Space Complexity

Memory usage also uses Big-O:

| Algorithm | Time | Space |
|-----------|------|-------|
| Bubble sort | O(n²) | O(1) |
| Merge sort | O(n log n) | O(n) |
| Matrix multiply | O(n³) | O(n²) |

## Amortized Analysis

Some operations are expensive occasionally but cheap on average.

**Example:** Dynamic array doubling
- Most insertions: O(1)
- Occasional resize: O(n)
- Amortized: O(1) per insertion

## Computational Complexity Theory

Problems are classified by difficulty:
- **P:** Solvable in polynomial time (efficient)
- **NP:** Verifiable in polynomial time
- **NP-hard:** At least as hard as hardest NP problems

Most circuit optimization problems are NP-hard!

## Master Theorem (for recursive algorithms)

For recurrence $T(n) = aT(n/b) + f(n)$:

Compare $f(n)$ to $n^{\log_b a}$:
1. If $f(n) < n^{\log_b a}$: $T(n) = \Theta(n^{\log_b a})$
2. If $f(n) = n^{\log_b a}$: $T(n) = \Theta(n^{\log_b a} \log n)$
3. If $f(n) > n^{\log_b a}$: $T(n) = \Theta(f(n))$

**FFT example:** $T(n) = 2T(n/2) + O(n)$
Here $a=2$, $b=2$, $f(n) = n$, $n^{\log_2 2} = n$.
Case 2: $T(n) = \Theta(n \log n)$ ✓
