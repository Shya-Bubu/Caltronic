# Iterative vs Direct Methods - Mathematical Framework

## Direct Methods

### LU Factorization

**Theorem**: Any non-singular matrix $\mathbf{A}$ can be factored as:
$$\mathbf{PA} = \mathbf{LU}$$

where:
- $\mathbf{P}$ = permutation matrix (row swaps for stability)
- $\mathbf{L}$ = lower triangular with $L_{ii} = 1$
- $\mathbf{U}$ = upper triangular

**Existence**: Requires no zero pivots (guaranteed with partial pivoting for non-singular A).

### Cholesky Factorization

**Theorem**: Any symmetric positive definite matrix $\mathbf{A}$ can be factored as:
$$\mathbf{A} = \mathbf{LL}^T$$

where $\mathbf{L}$ is lower triangular with positive diagonal.

**Computation**: 
$$L_{jj} = \sqrt{A_{jj} - \sum_{k=1}^{j-1} L_{jk}^2}$$
$$L_{ij} = \frac{1}{L_{jj}}\left(A_{ij} - \sum_{k=1}^{j-1} L_{ik}L_{jk}\right), \quad i > j$$

**Cost**: $\frac{n^3}{3}$ operations (half of LU).

---

## Iterative Methods: Fixed Point Formulation

### General Framework

Convert $\mathbf{Ax} = \mathbf{b}$ to fixed-point form:
$$\mathbf{x} = \mathbf{Bx} + \mathbf{c}$$

The iteration:
$$\mathbf{x}^{(k+1)} = \mathbf{Bx}^{(k)} + \mathbf{c}$$

converges if $\rho(\mathbf{B}) < 1$ where $\rho$ is the spectral radius.

### Jacobi Method

Split $\mathbf{A} = \mathbf{D} + \mathbf{L} + \mathbf{U}$ where:
- $\mathbf{D}$ = diagonal
- $\mathbf{L}$ = strictly lower triangular
- $\mathbf{U}$ = strictly upper triangular

Iteration matrix: $\mathbf{B}_J = -\mathbf{D}^{-1}(\mathbf{L} + \mathbf{U})$

$$\mathbf{x}^{(k+1)} = \mathbf{D}^{-1}(\mathbf{b} - (\mathbf{L} + \mathbf{U})\mathbf{x}^{(k)})$$

Component form:
$$x_i^{(k+1)} = \frac{1}{A_{ii}}\left(b_i - \sum_{j \neq i} A_{ij}x_j^{(k)}\right)$$

### Gauss-Seidel Method

Use updated values immediately:
$$x_i^{(k+1)} = \frac{1}{A_{ii}}\left(b_i - \sum_{j < i} A_{ij}x_j^{(k+1)} - \sum_{j > i} A_{ij}x_j^{(k)}\right)$$

Iteration matrix: $\mathbf{B}_{GS} = -(\mathbf{D} + \mathbf{L})^{-1}\mathbf{U}$

### SOR (Successive Over-Relaxation)

Accelerate Gauss-Seidel with relaxation parameter $\omega$:
$$x_i^{(k+1)} = (1-\omega)x_i^{(k)} + \frac{\omega}{A_{ii}}\left(b_i - \sum_{j < i} A_{ij}x_j^{(k+1)} - \sum_{j > i} A_{ij}x_j^{(k)}\right)$$

Optimal $\omega \in (1, 2)$ for SPD matrices.

---

## Convergence Analysis

### Spectral Radius

**Definition**: $\rho(\mathbf{B}) = \max_i |\lambda_i(\mathbf{B})|$

**Theorem**: Iteration $\mathbf{x}^{(k+1)} = \mathbf{Bx}^{(k)} + \mathbf{c}$ converges for any $\mathbf{x}^{(0)}$ if and only if $\rho(\mathbf{B}) < 1$.

**Error bound**: 
$$\|\mathbf{e}^{(k)}\| \leq \rho(\mathbf{B})^k \|\mathbf{e}^{(0)}\|$$

### Convergence Conditions

**Theorem (Diagonal Dominance)**: If $\mathbf{A}$ is strictly diagonally dominant:
$$|A_{ii}| > \sum_{j \neq i} |A_{ij}| \quad \forall i$$
then Jacobi and Gauss-Seidel converge.

**Theorem (SPD)**: If $\mathbf{A}$ is symmetric positive definite, Gauss-Seidel converges.

---

## Conjugate Gradient Method

### Theoretical Foundation

For SPD matrix $\mathbf{A}$, solving $\mathbf{Ax} = \mathbf{b}$ is equivalent to minimizing:
$$\phi(\mathbf{x}) = \frac{1}{2}\mathbf{x}^T\mathbf{Ax} - \mathbf{b}^T\mathbf{x}$$

CG finds the minimum in at most n steps.

### Algorithm

Initialize: $\mathbf{x}_0$, $\mathbf{r}_0 = \mathbf{b} - \mathbf{Ax}_0$, $\mathbf{p}_0 = \mathbf{r}_0$

For $k = 0, 1, 2, ...$:
$$\alpha_k = \frac{\mathbf{r}_k^T\mathbf{r}_k}{\mathbf{p}_k^T\mathbf{Ap}_k}$$
$$\mathbf{x}_{k+1} = \mathbf{x}_k + \alpha_k\mathbf{p}_k$$
$$\mathbf{r}_{k+1} = \mathbf{r}_k - \alpha_k\mathbf{Ap}_k$$
$$\beta_k = \frac{\mathbf{r}_{k+1}^T\mathbf{r}_{k+1}}{\mathbf{r}_k^T\mathbf{r}_k}$$
$$\mathbf{p}_{k+1} = \mathbf{r}_{k+1} + \beta_k\mathbf{p}_k$$

### Convergence Rate

**Theorem**: For SPD matrix with condition number $\kappa = \lambda_{max}/\lambda_{min}$:
$$\|\mathbf{e}_k\|_A \leq 2\left(\frac{\sqrt{\kappa} - 1}{\sqrt{\kappa} + 1}\right)^k \|\mathbf{e}_0\|_A$$

where $\|\mathbf{e}\|_A = \sqrt{\mathbf{e}^T\mathbf{Ae}}$ is the A-norm.

**Implication**: Number of iterations to reduce error by factor $\epsilon$:
$$k \approx \frac{1}{2}\sqrt{\kappa}\ln\left(\frac{2}{\epsilon}\right)$$

---

## Preconditioning Theory

### Preconditioned System

Instead of $\mathbf{Ax} = \mathbf{b}$, solve:
$$\mathbf{M}^{-1}\mathbf{Ax} = \mathbf{M}^{-1}\mathbf{b}$$

**Goal**: $\kappa(\mathbf{M}^{-1}\mathbf{A}) \ll \kappa(\mathbf{A})$

**Ideal**: $\mathbf{M} = \mathbf{A}$ gives $\kappa = 1$, but then $\mathbf{M}^{-1}$ is as expensive as solving original.

**Practical**: $\mathbf{M} \approx \mathbf{A}$ but cheap to invert.

### Common Preconditioners

**Jacobi**: $\mathbf{M} = \mathbf{D}$ (diagonal of $\mathbf{A}$)

**ILU(0)**: Incomplete LU with same sparsity pattern as $\mathbf{A}$
$$\mathbf{M} = \tilde{\mathbf{L}}\tilde{\mathbf{U}} \approx \mathbf{A}$$

**SSOR**: 
$$\mathbf{M} = \frac{1}{\omega(2-\omega)}(\mathbf{D} + \omega\mathbf{L})\mathbf{D}^{-1}(\mathbf{D} + \omega\mathbf{U})$$

---

## Complexity Comparison

### Per-Solve Complexity

| Method | Dense | Sparse (nnz non-zeros) |
|--------|-------|------------------------|
| LU factorization | $O(n^3)$ | $O(n \cdot fill^2)$ |
| Forward/back sub | $O(n^2)$ | $O(fill)$ |
| Jacobi (per iter) | $O(n^2)$ | $O(nnz)$ |
| CG (per iter) | $O(n^2)$ | $O(nnz)$ |

### Total Solve Cost

| Method | Dense | Sparse |
|--------|-------|--------|
| Direct | $O(n^3)$ | $O(n \cdot fill^2)$ |
| Jacobi (k iters) | $O(kn^2)$ | $O(k \cdot nnz)$ |
| CG (k iters) | $O(kn^2)$ | $O(k \cdot nnz)$ |

For CG with good preconditioner: $k \approx O(1)$ to $O(\log n)$

---

## Error Analysis

### Direct Method Error

For computed solution $\hat{\mathbf{x}}$:
$$\frac{\|\hat{\mathbf{x}} - \mathbf{x}\|}{\|\mathbf{x}\|} \leq \kappa(\mathbf{A}) \cdot u$$

where $u$ ≈ 10⁻¹⁶ is machine precision.

### Iterative Method Error

Two components:
1. **Iteration error**: Distance from converged solution
2. **Round-off error**: Accumulation during iteration

Stopping criterion based on residual:
$$\|\mathbf{r}_k\| = \|\mathbf{b} - \mathbf{Ax}_k\| < \tau$$

Relation to true error:
$$\|\mathbf{e}_k\| \leq \|\mathbf{A}^{-1}\| \|\mathbf{r}_k\|$$

---

## Summary: Key Results

| Property | Jacobi | Gauss-Seidel | CG |
|----------|--------|--------------|-----|
| Converges if | $\rho(\mathbf{B}_J) < 1$ | $\rho(\mathbf{B}_{GS}) < 1$ | $\mathbf{A}$ is SPD |
| Diag. dominant | Yes | Yes | Yes |
| Rate | $\rho^k$ | $\rho^k$ | $((√κ-1)/(√κ+1))^k$ |
| Memory | $O(n)$ | $O(n)$ | $O(n)$ |
| Per iteration | $O(nnz)$ | $O(nnz)$ | $O(nnz)$ |
