# Algorithm Complexity Fundamentals - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **Big-O** | Upper bound on growth rate: f(n) = O(g(n)) means f grows no faster than g |
| **Time complexity** | Number of operations as function of input size |
| **Space complexity** | Memory usage as function of input size |
| **Dominant term** | The fastest-growing term that determines overall complexity |

---

## Essential Formulas

### Big-O Definition
$$f(n) = O(g(n)) \iff \exists c > 0, n_0 : f(n) \leq c \cdot g(n) \text{ for all } n \geq n_0$$

### Common Operation Counts

| Operation | Count |
|-----------|-------|
| Dense matvec | $n^2$ |
| Dense LU | $\frac{2n^3}{3}$ |
| Sparse matvec | $nnz$ |
| Forward substitution | $n^2$ (dense) or $nnz$ (sparse) |

---

## Exam Question Types

### Type 1: Determine Complexity

**Question pattern**: "What is the complexity of this algorithm?"

**Example**:
```
for i = 1 to n:
    for j = 1 to i:
        print(i, j)
```

**Solution**:
- Inner loop runs i times for each i
- Total iterations: $1 + 2 + 3 + ... + n = \frac{n(n+1)}{2}$
- Complexity: $O(n^2)$

---

### Type 2: Compare Algorithms

**Question pattern**: "Which algorithm is faster for large n?"

**Example**:
Algorithm A: $T_A(n) = 100n$
Algorithm B: $T_B(n) = n^2$

**Solution**:
- For small n: B might be faster (when $n^2 < 100n$, i.e., $n < 100$)
- For large n: A is faster (linear beats quadratic)
- Crossover at n = 100
- **Answer**: Algorithm A for n > 100

---

### Type 3: Predict Execution Time

**Question pattern**: "If algorithm takes T seconds for n, how long for 2n?"

**Example**:
Sorting n=1000 items takes 0.1 seconds. If the algorithm is O(n log n), how long for n=10,000?

**Solution**:
$$\frac{T_{10000}}{T_{1000}} = \frac{10000 \cdot \log(10000)}{1000 \cdot \log(1000)}$$
$$= \frac{10000 \cdot 4}{1000 \cdot 3} = \frac{40000}{3000} = 13.3$$
$$T_{10000} = 13.3 \times 0.1s = 1.33s$$

---

### Type 4: Simplify Big-O

**Question pattern**: "Simplify the following expression to Big-O notation."

**Rules**:
1. Keep only dominant term
2. Drop constants

**Examples**:
- $5n^2 + 3n + 10 = O(n^2)$
- $n^3 + n^2 \log n = O(n^3)$
- $2^n + n^{100} = O(2^n)$
- $\log n + \sqrt{n} = O(\sqrt{n})$

---

### Type 5: Prove Big-O

**Question pattern**: "Prove that f(n) = O(g(n))."

**Example**: Prove $2n^2 + 3n = O(n^2)$

**Proof**:
Need to find c and n₀ such that $2n^2 + 3n \leq cn^2$ for all $n \geq n_0$.

For $n \geq 3$:
$$2n^2 + 3n \leq 2n^2 + n \cdot n = 3n^2$$

With $c = 3$ and $n_0 = 3$:
$$2n^2 + 3n \leq 3n^2 \text{ for all } n \geq 3$$

Therefore, $2n^2 + 3n = O(n^2)$. ∎

---

## Worked Problems

### Problem 1: Loop Analysis (10 marks)

**Q**: Determine the time complexity.
```
for i = 1 to n:
    for j = 1 to n:
        for k = 1 to j:
            work()
```

**Solution**:
- Outermost loop: n iterations
- Middle loop: n iterations
- Inner loop: j iterations (varies from 1 to n)

For fixed i, inner two loops:
$$\sum_{j=1}^{n} j = \frac{n(n+1)}{2} = O(n^2)$$

Total with outer loop:
$$n \times O(n^2) = O(n^3)$$

---

### Problem 2: Algorithm Comparison (15 marks)

**Q**: Algorithm A has complexity O(n²). Algorithm B has complexity O(n log n).
(a) For what values of n is A faster, given A takes 2n² operations and B takes 50n log n? (10 marks)
(b) Which would you choose for n = 10,000? (5 marks)

**Solution**:

(a) A is faster when:
$$2n^2 < 50n \log_2 n$$
$$2n < 50 \log_2 n$$
$$\frac{n}{\log_2 n} < 25$$

Testing values:
- n=4: 4/2 = 2 < 25 ✓
- n=16: 16/4 = 4 < 25 ✓
- n=64: 64/6 = 10.7 < 25 ✓
- n=128: 128/7 = 18.3 < 25 ✓
- n=256: 256/8 = 32 > 25 ✗

A is faster for approximately n < 200.

(b) For n = 10,000:
- A: 2 × 10,000² = 200,000,000 ops
- B: 50 × 10,000 × log₂(10,000) = 50 × 10,000 × 13.3 = 6,650,000 ops

**Choose B** (30× faster).

---

### Problem 3: Sparse vs Dense (10 marks)

**Q**: A 1000×1000 circuit matrix has 5000 non-zero entries.
(a) What is the sparsity? (2 marks)
(b) How much memory is saved using sparse storage? (3 marks)
(c) How much faster is sparse matrix-vector multiply? (5 marks)

**Solution**:

(a) Sparsity = 1 - nnz/n² = 1 - 5000/1,000,000 = 99.5%

(b) Dense: 1,000,000 entries × 8 bytes = 8 MB
   Sparse (CSR): ≈ 5000 values + 5000 indices + 1001 pointers ≈ 88 KB
   **Savings**: 8000/88 ≈ 91× less memory

(c) Dense matvec: n² = 1,000,000 operations
   Sparse matvec: nnz = 5,000 operations
   **Speedup**: 1,000,000/5,000 = 200×

---

### Problem 4: Transient Simulation (15 marks)

**Q**: A circuit has n=2000 nodes with nnz=10,000 non-zeros. Transient simulation runs for 1000 timesteps.
Compare total complexity for:
(a) Dense LU at each step
(b) Sparse LU at each step  
(c) Sparse LU once, reuse for substitution

Assume sparse LU has fill-in of 50,000 entries.

**Solution**:

(a) Dense LU each step:
$$T \times \frac{2n^3}{3} = 1000 \times \frac{2 \times 2000^3}{3} = 5.3 \times 10^{12} \text{ ops}$$

(b) Sparse LU each step:
Sparse LU ≈ O(n × fill) ≈ 2000 × 50,000 = 10⁸ ops per step
$$T \times 10^8 = 10^{11} \text{ ops}$$

(c) Sparse LU once + T substitutions:
- LU: 10⁸ ops
- Each substitution: O(fill) = 50,000 ops
- Total: 10⁸ + 1000 × 50,000 = 1.5 × 10⁸ ops

**Comparison**:
| Method | Operations | Relative |
|--------|------------|----------|
| Dense each step | 5.3×10¹² | 35,000× |
| Sparse each step | 10¹¹ | 670× |
| Sparse reuse | 1.5×10⁸ | 1× |

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Adding complexities: O(n²) + O(n²) = O(n⁴) | O(n²) + O(n²) = O(n²) |
| Keeping constants: O(5n²) | O(n²) |
| Wrong loop count: nested = always n² | Depends on loop bounds! |
| Forgetting log base doesn't matter | O(log₂n) = O(ln n) = O(log n) |

---

## Quick Reference

| Input Growth | O(n) | O(n log n) | O(n²) | O(n³) |
|--------------|------|------------|-------|-------|
| n → 10n | 10× | ≈13× | 100× | 1000× |
| n → 100n | 100× | ≈200× | 10000× | 10⁶× |
