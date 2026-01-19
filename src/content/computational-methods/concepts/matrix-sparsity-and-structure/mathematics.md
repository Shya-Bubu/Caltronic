# Matrix Sparsity and Structure - Mathematical Framework

## Sparsity Definitions

### Basic Measures

For matrix $\mathbf{A} \in \mathbb{R}^{n \times n}$:

**Non-zeros**: $nnz(\mathbf{A}) = |\{(i,j) : A_{ij} \neq 0\}|$

**Density**: $d = \frac{nnz}{n^2}$

**Sparsity**: $s = 1 - d = 1 - \frac{nnz}{n^2}$

### Structural Properties

**Symmetric**: $A_{ij} = A_{ji}$ for all $i,j$

**Positive Definite**: $\mathbf{x}^T \mathbf{A} \mathbf{x} > 0$ for all $\mathbf{x} \neq \mathbf{0}$

**Diagonally Dominant**: $|A_{ii}| > \sum_{j \neq i} |A_{ij}|$ for all $i$

---

## Graph Representation

### Adjacency Graph

For symmetric matrix $\mathbf{A}$, define graph $G = (V, E)$:
- $V = \{1, 2, ..., n\}$ (nodes)
- $E = \{(i,j) : A_{ij} \neq 0, i \neq j\}$ (edges)

The graph captures the sparsity pattern.

### Degree

$deg(i) = |\{j : A_{ij} \neq 0, j \neq i\}|$

For circuits: Average degree ≈ 3-6 (independent of n)

---

## LU Factorization and Fill-in

### Standard LU

Factor $\mathbf{A} = \mathbf{L}\mathbf{U}$ where:
- $\mathbf{L}$ is lower triangular with ones on diagonal
- $\mathbf{U}$ is upper triangular

### Fill-in Definition

**Fill-in set**: $\mathcal{F} = \{(i,j) : L_{ij} \neq 0 \text{ or } U_{ij} \neq 0 \text{ but } A_{ij} = 0\}$

**Fill-in count**: $|\mathcal{F}|$

### Elimination Graph Model

For symmetric positive definite matrices, fill-in has an elegant graph interpretation.

**Elimination step k**: Remove vertex k and add edges between all pairs of neighbors of k that weren't already connected.

**Theorem**: $(i,j)$ is fill-in if and only if $i$ and $j$ become adjacent in the elimination graph before either is eliminated.

---

## Fill-in Bounds

### Worst Case

For arbitrary sparse matrix: Fill-in can be $O(n^2)$

**Example**: Arrow matrix (dense row and column)
```
[X X X X X]
[X X . . .]
[X . X . .]
[X . . X .]
[X . . . X]
```
Eliminating column 1 first fills entire matrix.

### Best Case

For banded matrix with bandwidth $b$: Fill-in is $O(nb)$

For tree-structured graph: Fill-in is $O(n)$

### Typical Circuits

With good ordering: Fill-in ≈ $O(n^{1.2})$ to $O(n^{1.5})$

---

## Ordering Theory

### Permutation Matrices

A permutation matrix $\mathbf{P}$ reorders rows:
$$\mathbf{P}\mathbf{A}\mathbf{P}^T$$

represents $\mathbf{A}$ with both rows and columns permuted.

The fill-in depends on the permutation!

### Optimal Ordering

**Problem**: Find permutation $\mathbf{P}$ that minimizes fill-in in $LU(\mathbf{P}\mathbf{A}\mathbf{P}^T)$

**Result**: This problem is NP-complete!

We use heuristics instead.

### Minimum Degree Heuristic

At each step, eliminate the vertex with minimum degree in current elimination graph.

**Complexity**: $O(n \cdot deg_{max}^2)$ with proper implementation

**Fill-in**: Often near-optimal for circuit matrices

### Nested Dissection

**Idea**: Recursively partition graph using small separators.

**Formal definition**: A separator $S$ divides $V$ into $A$, $B$, $S$ where:
- $|A| \approx |B|$ (balanced)
- No edges between $A$ and $B$
- $|S|$ is small

**Ordering**: $A$ first, $B$ second, $S$ last

**Theorem** (George 1973): For a $\sqrt{n} \times \sqrt{n}$ grid, nested dissection achieves:
- Fill-in: $O(n \log n)$
- Factorization: $O(n^{1.5})$

---

## Complexity with Good Ordering

### Sparse Cholesky

For SPD matrix with good ordering:

**Fill-in**: $f$ non-zeros in $\mathbf{L}$

**Operations**: 
$$\sum_{j=1}^{n} c_j^2$$

where $c_j$ = number of non-zeros in column $j$ of $\mathbf{L}$

**Result**: $O(n \cdot f^2 / n^2) = O(f^2/n)$ if fill distributed evenly

### Circuit Matrix Complexity

For circuit matrices with $m$ elements, $n$ nodes:

| Quantity | Typical Value |
|----------|---------------|
| Original nnz | $O(m) \approx O(n)$ |
| Fill-in (AMD) | $O(n^{1.2})$ to $O(n^{1.5})$ |
| Factorization ops | $O(n^{1.5})$ to $O(n^2)$ |
| Solve ops | $O(f) = O(n^{1.2})$ to $O(n^{1.5})$ |

Compare to dense: $O(n^3)$ factorization, $O(n^2)$ solve

---

## Bandwidth and Profile

### Bandwidth Definition

$$\beta = \max_i \max_{j: A_{ij} \neq 0} |i - j|$$

### Envelope (Profile)

$$env(i) = \min\{j : A_{ij} \neq 0 \text{ or } A_{ji} \neq 0, j < i\}$$

$$profile = \sum_{i=1}^{n} (i - env(i))$$

### Banded LU

For matrix with bandwidth $\beta$:
- Storage: $O(n\beta)$
- Factorization: $O(n\beta^2)$
- Solve: $O(n\beta)$

**Cuthill-McKee** ordering minimizes bandwidth (approximately).

---

## Sparse Storage Complexity

### CSR Format

For matrix with nnz non-zeros:
- Values array: nnz floats
- Column indices: nnz integers
- Row pointers: n+1 integers

**Total**: $O(nnz + n)$

### Operations Complexity

| Operation | Dense | CSR |
|-----------|-------|-----|
| Storage | $n^2$ | $nnz + n$ |
| Access $A_{ij}$ | $O(1)$ | $O(\log(nnz/n))$ with binary search |
| $\mathbf{y} = \mathbf{A}\mathbf{x}$ | $O(n^2)$ | $O(nnz)$ |
| $\mathbf{A} + \mathbf{B}$ | $O(n^2)$ | $O(nnz_A + nnz_B)$ |

---

## Summary: Key Formulas

| Concept | Formula/Bound |
|---------|---------------|
| Sparsity | $s = 1 - nnz/n^2$ |
| CSR storage | $O(nnz + n)$ |
| Sparse matvec | $O(nnz)$ |
| Banded LU | $O(n\beta^2)$ |
| Grid (nested dissection) | $O(n^{1.5})$ factorization |
| Circuit (AMD) | $O(n^{1.5})$ to $O(n^2)$ factorization |
