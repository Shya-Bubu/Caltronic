# Matrix Sparsity and Structure - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **Sparsity** | Fraction of entries that are zero: $s = 1 - nnz/n^2$ |
| **Fill-in** | New non-zeros created during LU factorization |
| **Bandwidth** | Maximum distance from diagonal: $\beta = \max|i-j|$ for $A_{ij} \neq 0$ |
| **Ordering** | Permutation of rows/columns to minimize fill-in |

---

## Essential Formulas

### Storage
- Dense: $n^2$ entries
- Sparse (CSR): $nnz + n$ entries

### Operations
- Dense matvec: $O(n^2)$
- Sparse matvec: $O(nnz)$
- Banded LU: $O(n\beta^2)$ where $\beta$ = bandwidth

### Circuit Matrices
- Typical nnz: $4n$ to $10n$ (linear in n)
- Fill-in with good ordering: $O(n^{1.2})$ to $O(n^{1.5})$

---

## Exam Question Types

### Type 1: Calculate Sparsity

**Question pattern**: "Calculate the density and sparsity of this matrix."

**Example**:
A 500×500 matrix has 3000 non-zero entries.

**Solution**:
- Density = nnz/n² = 3000/(500×500) = 3000/250000 = 0.012 = 1.2%
- Sparsity = 1 - 0.012 = 0.988 = 98.8%

---

### Type 2: Storage Comparison

**Question pattern**: "Compare memory requirements for sparse vs dense storage."

**Example**:
Matrix is 10,000×10,000 with 80,000 non-zeros. Compare storage for dense vs CSR (8 bytes per float, 4 bytes per integer).

**Solution**:

Dense:
- Entries: 10,000 × 10,000 = 10⁸
- Memory: 10⁸ × 8 bytes = 800 MB

CSR:
- Values: 80,000 × 8 bytes = 640 KB
- Column indices: 80,000 × 4 bytes = 320 KB
- Row pointers: 10,001 × 4 bytes = 40 KB
- Total: 1,000 KB ≈ **1 MB**

**Savings**: 800× less memory

---

### Type 3: Fill-in Analysis

**Question pattern**: "Determine the fill-in from eliminating a node."

**Example**:
Given this sparsity pattern, what fill-in occurs when eliminating node 1?

```
  1 2 3 4
1 X X X .
2 X X . .
3 X . X .
4 . . . X
```

**Solution**:
- Node 1 connects to nodes 2 and 3
- Eliminating node 1 creates edge between 2 and 3 (if not present)
- Current A[2,3] = 0, so fill-in at (2,3) and by symmetry (3,2)
- **Fill-in count: 2 entries**

---

### Type 4: Ordering Impact

**Question pattern**: "Compare fill-in for different elimination orderings."

**Example**:
Arrow matrix (star graph):
```
  1 2 3 4 5
1 X X X X X
2 X X . . .
3 X . X . .
4 X . . X .
5 X . . . X
```

(a) Fill-in if node 1 is eliminated first?
(b) Fill-in if nodes 2,3,4,5 are eliminated first, then 1?

**Solution**:

(a) Eliminate node 1 first:
- Node 1 connects to 2,3,4,5
- Elimination creates edges: (2,3), (2,4), (2,5), (3,4), (3,5), (4,5)
- Fill-in: 6 pairs × 2 = 12 entries (matrix becomes dense!)

(b) Eliminate 2,3,4,5 first:
- Each connects only to node 1
- No fill-in occurs!
- **Fill-in: 0 entries**

**Conclusion**: Order matters dramatically (12 vs 0 fill-in)

---

### Type 5: Bandwidth and Banded Storage

**Question pattern**: "Calculate bandwidth and banded LU complexity."

**Example**:
A tridiagonal 1000×1000 matrix.

**Solution**:
- Bandwidth β = 1 (only adjacent diagonals are non-zero)
- Banded LU complexity: O(nβ²) = O(1000 × 1) = O(1000)
- Compare to dense: O(n³) = O(10⁹)
- **Speedup: ~1,000,000×**

---

## Worked Problems

### Problem 1: Circuit Matrix Analysis (15 marks)

**Q**: A circuit has 1000 nodes and 4000 elements (resistors, capacitors, etc.).
(a) Estimate the number of non-zeros (5 marks)
(b) Calculate the sparsity (5 marks)
(c) Compare storage for dense vs CSR (5 marks)

**Solution**:

(a) Non-zeros estimate:
- Each 2-terminal element contributes ~4 non-zeros (stamps at 4 positions)
- Total: ~4 × 4000 = 16,000 non-zeros
- But many overlap (shared nodes), so estimate: **8,000 - 12,000 nnz**

(b) Sparsity:
- Matrix size: 1000 × 1000 = 1,000,000 entries
- Density: 10,000 / 1,000,000 = 1%
- **Sparsity: 99%**

(c) Storage comparison (using nnz = 10,000):
- Dense: 1,000,000 × 8 = 8 MB
- CSR: (10,000 × 8) + (10,000 × 4) + (1001 × 4) = 80 + 40 + 4 = **124 KB**
- Ratio: 8000/124 ≈ **65× less memory**

---

### Problem 2: Fill-in Prediction (10 marks)

**Q**: A symmetric 5×5 matrix has this pattern:
```
X X . . X
X X X . .
. X X X .
. . X X X
X . . X X
```

Using minimum degree ordering:
(a) What is the first node to eliminate? (3 marks)
(b) What fill-in results? (7 marks)

**Solution**:

(a) Degree of each node:
- Node 1: degree 2 (connects to 2, 5)
- Node 2: degree 2 (connects to 1, 3)
- Node 3: degree 2 (connects to 2, 4)
- Node 4: degree 2 (connects to 3, 5)
- Node 5: degree 2 (connects to 1, 4)

All have same degree! Choose node 1 (or any).

(b) Eliminate node 1:
- Node 1 connects to nodes 2 and 5
- A[2,5] = 0 currently, so fill-in at (2,5) and (5,2)
- **Fill-in: 2 entries**

After elimination, continue with remaining nodes...
(Pattern becomes chain: 2-3-4-5 with new edge 2-5)

---

### Problem 3: Complexity Comparison (10 marks)

**Q**: Compare total operations for solving Ax = b:
- Dense matrix 1000×1000
- Sparse matrix 1000×1000 with 5000 nnz and fill-in of 10000

**Solution**:

Dense:
- LU factorization: (2/3)n³ = (2/3)(10⁹) = 6.67 × 10⁸ ops
- Forward/back sub: 2n² = 2 × 10⁶ ops
- **Total: ~6.7 × 10⁸ ops**

Sparse (with fill = 10,000):
- Sparse LU: approximately O(n × fill) ≈ 1000 × 10000 = 10⁷ ops
- Sparse solve: O(fill) = 10⁴ ops
- **Total: ~10⁷ ops**

**Speedup: ~67×**

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Forgetting fill-in in sparse LU | Sparse LU creates new non-zeros |
| Using nnz for LU complexity | Use fill-in count, not original nnz |
| Ignoring ordering | Different orderings give vastly different fill-in |
| Storing sparse as dense | Always use sparse format for sparse matrices |

---

## Quick Reference

| Property | Formula |
|----------|---------|
| Density | $d = nnz/n^2$ |
| CSR storage | $nnz + n$ values |
| Sparse matvec | $O(nnz)$ ops |
| Dense LU | $(2/3)n^3$ ops |
| Banded LU | $n\beta^2$ ops |
| Circuit nnz | ≈ 4-10 × nodes |
