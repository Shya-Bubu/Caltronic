# Algorithm Complexity Fundamentals - Mathematical Framework

## Formal Definition of Big-O

### Asymptotic Upper Bound

**Definition**: $f(n) = O(g(n))$ if and only if there exist positive constants $c$ and $n_0$ such that:

$$0 \leq f(n) \leq c \cdot g(n) \quad \text{for all } n \geq n_0$$

**Interpretation**: $f(n)$ grows no faster than $g(n)$ for large $n$.

### Example Proof

**Claim**: $3n^2 + 5n + 100 = O(n^2)$

**Proof**: 
For $n \geq 10$:
$$3n^2 + 5n + 100 \leq 3n^2 + 5n^2 + 100n^2 = 108n^2$$

So with $c = 108$ and $n_0 = 10$:
$$3n^2 + 5n + 100 \leq 108 \cdot n^2 \quad \text{for all } n \geq 10$$

Therefore, $3n^2 + 5n + 100 = O(n^2)$. ∎

---

## Related Notations

### Big-Ω (Lower Bound)

$f(n) = \Omega(g(n))$ if there exist constants $c > 0$ and $n_0$ such that:
$$f(n) \geq c \cdot g(n) \quad \text{for all } n \geq n_0$$

**Interpretation**: $f(n)$ grows at least as fast as $g(n)$.

### Big-Θ (Tight Bound)

$f(n) = \Theta(g(n))$ if and only if:
$$f(n) = O(g(n)) \text{ and } f(n) = \Omega(g(n))$$

**Interpretation**: $f(n)$ grows at exactly the rate of $g(n)$.

### Little-o (Strict Upper Bound)

$f(n) = o(g(n))$ if:
$$\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$$

**Interpretation**: $f(n)$ grows strictly slower than $g(n)$.

---

## Complexity Hierarchies

### Standard Hierarchy

$$O(1) \subset O(\log n) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(n^3) \subset O(2^n)$$

### Polynomial vs Exponential

**Polynomial**: $O(n^k)$ for any constant $k$
**Exponential**: $O(c^n)$ for any constant $c > 1$

Key result: Any polynomial grows slower than any exponential:
$$\lim_{n \to \infty} \frac{n^k}{c^n} = 0 \quad \text{for any } k \text{ and } c > 1$$

---

## Recurrence Relations

### Master Theorem

For recurrences of the form:
$$T(n) = aT(n/b) + f(n)$$

where $a \geq 1$, $b > 1$:

Let $c_{crit} = \log_b a$. Then:

1. If $f(n) = O(n^c)$ where $c < c_{crit}$: $T(n) = \Theta(n^{c_{crit}})$

2. If $f(n) = \Theta(n^{c_{crit}} \log^k n)$: $T(n) = \Theta(n^{c_{crit}} \log^{k+1} n)$

3. If $f(n) = \Omega(n^c)$ where $c > c_{crit}$: $T(n) = \Theta(f(n))$

### Example: Merge Sort

$$T(n) = 2T(n/2) + O(n)$$

- $a = 2$, $b = 2$
- $c_{crit} = \log_2 2 = 1$
- $f(n) = O(n) = O(n^1)$, so $c = 1 = c_{crit}$

Case 2 applies: $T(n) = \Theta(n \log n)$

---

## Amortized Analysis

### Definition

For a sequence of n operations, amortized cost is:
$$\text{Amortized cost} = \frac{\text{Total cost of n operations}}{n}$$

### Example: Dynamic Array

Doubling array when full:

| Operation | Actual Cost | Amortized Cost |
|-----------|-------------|----------------|
| Insert (no resize) | O(1) | O(1) |
| Insert (resize) | O(n) | O(1) |

**Analysis**: After n insertions:
- $\log_2 n$ resizes occur
- Total resize cost: $1 + 2 + 4 + ... + n = 2n - 1$
- Total cost: $n + (2n - 1) = 3n - 1$
- Amortized: $(3n - 1)/n = O(1)$ per insertion

---

## Matrix Operation Complexity

### Matrix-Vector Multiplication

$\mathbf{y} = \mathbf{A}\mathbf{x}$ where $\mathbf{A} \in \mathbb{R}^{m \times n}$

$$y_i = \sum_{j=1}^{n} A_{ij} x_j$$

- Multiplications: $mn$
- Additions: $m(n-1)$
- **Total**: $O(mn)$, or $O(n^2)$ for square matrix

### Matrix-Matrix Multiplication

$\mathbf{C} = \mathbf{A}\mathbf{B}$ where $\mathbf{A} \in \mathbb{R}^{m \times n}$, $\mathbf{B} \in \mathbb{R}^{n \times p}$

$$C_{ij} = \sum_{k=1}^{n} A_{ik} B_{kj}$$

- **Naive**: $O(mnp)$, or $O(n^3)$ for square
- **Strassen**: $O(n^{2.807})$
- **Best known**: $O(n^{2.373})$ (Coppersmith-Winograd family)

### LU Factorization

For $\mathbf{A} \in \mathbb{R}^{n \times n}$:

$$\mathbf{A} = \mathbf{L}\mathbf{U}$$

**Operation count**:
$$\sum_{k=1}^{n-1} 2(n-k)^2 = \frac{2n^3}{3} - \frac{n^2}{2} + \frac{n}{6}$$

**Complexity**: $O(n^3)$, specifically $\frac{2n^3}{3}$ multiplications

### Forward/Backward Substitution

Solve $\mathbf{L}\mathbf{y} = \mathbf{b}$:
$$y_i = b_i - \sum_{j=1}^{i-1} L_{ij} y_j$$

**Operation count**: $n^2$
**Complexity**: $O(n^2)$

---

## Sparse Matrix Complexity

### Definitions

- $n$ = matrix dimension
- $nnz$ = number of non-zeros
- **Sparsity**: $s = 1 - nnz/n^2$
- **Density**: $d = nnz/n^2$

### Sparse Matrix-Vector Multiply

$$y_i = \sum_{j: A_{ij} \neq 0} A_{ij} x_j$$

**Complexity**: $O(nnz)$

For circuits: $nnz \approx O(n)$, so sparse matvec is $O(n)$ vs $O(n^2)$ dense.

### Fill-in in LU Factorization

**Fill-in**: Non-zero entries created during factorization that were zero in original matrix.

For arbitrary sparse matrix: fill-in can be $O(n^2)$ (worst case).

For banded matrix with bandwidth $b$:
- Fill-in bounded by $nb$
- LU complexity: $O(nb^2)$

For circuit matrices with good ordering:
- Fill-in typically $O(n \log n)$ to $O(n^{1.5})$
- Complexity depends heavily on ordering

---

## Complexity of Iterative Methods

### Jacobi and Gauss-Seidel

Per iteration: One matrix-vector multiply + vector operations
- Dense: $O(n^2)$ per iteration
- Sparse: $O(nnz)$ per iteration

Total for k iterations: $O(k \cdot nnz)$

### Conjugate Gradient

Per iteration:
- One matrix-vector multiply: $O(nnz)$
- Two dot products: $O(n)$
- Three vector updates: $O(n)$

Total: $O(k \cdot nnz)$ where $k$ ≤ n (often $k \ll n$)

### Convergence Rate

For SPD matrix with condition number $\kappa = \lambda_{max}/\lambda_{min}$:

**Conjugate Gradient**:
$$\|e_k\| \leq 2\left(\frac{\sqrt{\kappa} - 1}{\sqrt{\kappa} + 1}\right)^k \|e_0\|$$

To reduce error by factor $\epsilon$:
$$k \approx \frac{\sqrt{\kappa}}{2} \ln\left(\frac{2}{\epsilon}\right)$$

**Key insight**: Fewer iterations for well-conditioned systems.

---

## Summary: Key Formulas

| Operation | Dense | Sparse |
|-----------|-------|--------|
| Storage | $O(n^2)$ | $O(nnz)$ |
| Matvec | $O(n^2)$ | $O(nnz)$ |
| LU factorization | $\frac{2n^3}{3}$ | $O(n \cdot fill^2)$ |
| Solve (with LU) | $O(n^2)$ | $O(fill)$ |
| CG (k iterations) | $O(kn^2)$ | $O(k \cdot nnz)$ |
