# Exam Preparation: Algorithm Efficiency

## Key Concepts

1. **Big-O notation:** Describes asymptotic growth rate
2. **Time complexity:** Operations as function of input size
3. **Space complexity:** Memory as function of input size
4. **Trade-offs:** Speed vs. memory, accuracy vs. speed

## Common Question Types

### Type 1: Identify Complexity

**Q:** What is the time complexity of this code?
```python
for i in range(n):
    for j in range(i):
        # O(1) operation
```

**A:** Inner loop runs 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 = O(n²) times.

### Type 2: Compare Algorithms

**Q:** Compare O(n²) and O(n log n) for n = 10,000.

**A:**
- O(n²) = 100,000,000 = 10⁸
- O(n log n) ≈ 10,000 × 13.3 ≈ 133,000 ≈ 1.3 × 10⁵
- Ratio: ~750× faster for O(n log n)

### Type 3: Memory Calculation

**Q:** How much memory for a 5000×5000 double precision matrix?

**A:** 5000 × 5000 × 8 bytes = 200,000,000 bytes = 200 MB

### Type 4: Algorithm Selection

**Q:** For solving a sparse linear system with 100,000 unknowns, would you use Gaussian elimination? Why or why not?

**A:** No! Gaussian elimination is O(n³) = 10¹⁵ operations—infeasible.

For sparse systems, use iterative methods like Conjugate Gradient, which are O(kn) where k is the number of iterations (typically k << n).

## Practice Problems

1. What is the complexity of matrix-matrix multiplication (n×n matrices)?

2. FFT computes DFT in O(n log n). If n = 2¹⁰, how many operations? (Assume log₂)

3. If an O(n²) algorithm takes 1 second for n = 1000, how long for n = 10,000?

## Solutions

1. O(n³) — each of n² elements requires n multiplications.

2. n log n = 1024 × 10 = 10,240 operations

3. Time scales as n²: (10,000/1,000)² = 100× longer = 100 seconds

## Big-O Cheat Sheet

| O() | Name | Example |
|-----|------|---------|
| O(1) | Constant | Array index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | FFT, good sorts |
| O(n²) | Quadratic | Nested loops |
| O(n³) | Cubic | Matrix operations |
| O(2ⁿ) | Exponential | Brute force |

## Key Insight

Choosing the right algorithm is often more important than optimizing code. An O(n²) algorithm will always lose to O(n log n) for large n, no matter how much you optimize the code.
