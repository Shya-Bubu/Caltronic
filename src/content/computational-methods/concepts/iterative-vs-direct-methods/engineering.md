# Iterative vs Direct Methods - Engineering Perspective

## Direct Solvers in Practice

### LU Factorization Workflow

```python
import numpy as np
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import splu

# 1. Build sparse matrix
G = build_conductance_matrix(circuit)  # Returns sparse matrix

# 2. Symbolic factorization (done once)
lu = splu(G)  # Finds fill-in pattern and permutation

# 3. Numeric factorization (done once per unique G)
# (Included in splu above)

# 4. Solve for multiple right-hand sides (fast!)
v1 = lu.solve(i1)  # First current source
v2 = lu.solve(i2)  # Second current source - reuses factorization!
v3 = lu.solve(i3)  # Third - still fast!
```

### When to Re-factorize

| Scenario | Action |
|----------|--------|
| Different RHS, same A | Reuse LU (just forward/back sub) |
| Modified element values | Re-factorize numerically |
| Changed topology (new element) | Re-factor symbolically + numerically |
| Different time step (transient) | Often reuse LU with updated values |

### SPICE Factorization Strategy

```
DC Analysis:
  1. Factor once
  2. Solve for operating point

AC Analysis:
  1. Reuse symbolic pattern from DC
  2. Re-factor for each frequency (G + jωC changes)
  3. Solve for phasors

Transient:
  1. Factor at t=0
  2. Update for nonlinear elements (Newton)
  3. Re-factor only when time step changes or convergence fails
```

---

## Iterative Solvers in Practice

### Jacobi Implementation

```python
def jacobi(A, b, x0, tol=1e-8, max_iter=1000):
    """
    Solve Ax = b using Jacobi iteration.
    """
    n = len(b)
    x = x0.copy()
    d = np.diag(A)  # Diagonal elements
    
    for iteration in range(max_iter):
        x_new = np.zeros(n)
        for i in range(n):
            sigma = np.dot(A[i, :], x) - A[i, i] * x[i]
            x_new[i] = (b[i] - sigma) / d[i]
        
        # Check convergence
        if np.linalg.norm(x_new - x) < tol:
            print(f"Converged in {iteration+1} iterations")
            return x_new
        x = x_new
    
    print("Warning: Did not converge")
    return x
```

### Conjugate Gradient Implementation

```python
def conjugate_gradient(A, b, x0, tol=1e-8, max_iter=1000):
    """
    Solve Ax = b using Conjugate Gradient.
    A must be symmetric positive definite.
    """
    x = x0.copy()
    r = b - A @ x
    p = r.copy()
    rs_old = np.dot(r, r)
    
    for iteration in range(max_iter):
        Ap = A @ p
        alpha = rs_old / np.dot(p, Ap)
        x = x + alpha * p
        r = r - alpha * Ap
        
        rs_new = np.dot(r, r)
        if np.sqrt(rs_new) < tol:
            print(f"CG converged in {iteration+1} iterations")
            return x
        
        p = r + (rs_new / rs_old) * p
        rs_old = rs_new
    
    print("Warning: CG did not converge")
    return x
```

### Using SciPy Iterative Solvers

```python
from scipy.sparse.linalg import cg, gmres, bicgstab

# Conjugate Gradient (for SPD matrices)
x, info = cg(A, b, tol=1e-8)

# GMRES (for general matrices)
x, info = gmres(A, b, tol=1e-8)

# BiCGSTAB (for general, often faster than GMRES)
x, info = bicgstab(A, b, tol=1e-8)
```

---

## Preconditioning: Making Iteration Faster

### The Problem

Iterative methods converge slowly when the matrix is **ill-conditioned** (large κ = λ_max/λ_min).

### The Solution: Preconditioning

Instead of solving Ax = b, solve:
$$M^{-1}Ax = M^{-1}b$$

where M approximates A but is easy to invert.

**Goal**: Make κ(M⁻¹A) << κ(A)

### Common Preconditioners

| Preconditioner | Cost | Effectiveness |
|----------------|------|---------------|
| Jacobi (diagonal) | O(n) | Weak |
| ILU (incomplete LU) | O(nnz) | Good |
| SSOR | O(nnz) | Moderate |
| Algebraic Multigrid | O(n) | Very good |

### ILU Preconditioning Example

```python
from scipy.sparse.linalg import spilu, LinearOperator

# Compute incomplete LU
ilu = spilu(A)

# Create preconditioner as linear operator
M_x = lambda x: ilu.solve(x)
M = LinearOperator((n, n), M_x)

# Use preconditioned CG
x, info = cg(A, b, M=M, tol=1e-8)
```

---

## Performance Comparison

### Test Case: 2D Resistor Grid

Circuit: 100×100 grid of 1kΩ resistors (10,000 nodes)

| Method | Time | Memory | Iterations |
|--------|------|--------|------------|
| Dense LU | 15.2 s | 800 MB | N/A |
| Sparse LU (AMD) | 0.23 s | 12 MB | N/A |
| Jacobi | 4.1 s | 0.3 MB | 2,847 |
| Gauss-Seidel | 2.3 s | 0.3 MB | 1,512 |
| CG | 0.18 s | 0.4 MB | 178 |
| CG + ILU | 0.04 s | 2 MB | 12 |

### Observations

1. **Dense LU**: Impractical for this size
2. **Sparse LU**: Fast, but more memory
3. **Simple iterations**: Slow convergence
4. **CG**: Competitive with sparse direct
5. **Preconditioned CG**: Fastest overall

---

## Choosing Solvers in Practice

### Decision Matrix

| Matrix Size | Matrix Type | Fill-in | Recommended |
|-------------|-------------|---------|-------------|
| < 1,000 | Any | - | Dense LU |
| 1k-10k | SPD | Low | Sparse Cholesky |
| 1k-10k | General | Low | Sparse LU (UMFPACK) |
| 1k-10k | SPD | High | CG + ILU |
| > 10k | SPD | - | CG + AMG |
| > 10k | General | - | GMRES + ILU |

### Library Recommendations

| Task | Recommended Library |
|------|---------------------|
| Dense direct | LAPACK (via NumPy/SciPy) |
| Sparse direct | SuiteSparse UMFPACK, CHOLMOD |
| Iterative | SciPy sparse.linalg, PETSc |
| Preconditioners | HYPRE, Trilinos |

---

## Monitoring Convergence

### Residual vs Error

**Residual**: $r = b - Ax$ (computable)
**Error**: $e = x_{true} - x$ (unknown!)

We monitor residual norm ||r|| because we can't compute error directly.

### Convergence Plots

```python
def cg_with_history(A, b, x0, tol=1e-8, max_iter=1000):
    """CG with convergence history for plotting."""
    residuals = []
    x = x0.copy()
    r = b - A @ x
    p = r.copy()
    rs_old = np.dot(r, r)
    residuals.append(np.sqrt(rs_old))
    
    for iteration in range(max_iter):
        Ap = A @ p
        alpha = rs_old / np.dot(p, Ap)
        x = x + alpha * p
        r = r - alpha * Ap
        rs_new = np.dot(r, r)
        residuals.append(np.sqrt(rs_new))
        
        if np.sqrt(rs_new) < tol:
            break
        p = r + (rs_new / rs_old) * p
        rs_old = rs_new
    
    return x, residuals

# Plot convergence
x, residuals = cg_with_history(A, b, np.zeros(n))
plt.semilogy(residuals)
plt.xlabel('Iteration')
plt.ylabel('||r||')
plt.title('CG Convergence')
```

### Stagnation Detection

If ||r|| doesn't decrease for several iterations → problem with:
- Matrix not SPD (for CG)
- Preconditioner inadequate
- Numerical issues

---

## Summary: Engineering Guidelines

| Scenario | Recommendation |
|----------|----------------|
| First prototype | Direct solver (simple, reliable) |
| Production, moderate size | Sparse direct with good ordering |
| Very large SPD | CG with strong preconditioner |
| Very large general | GMRES or BiCGSTAB with ILU |
| Multiple RHS | Direct (amortize factorization) |
| Memory-constrained | Iterative (low memory footprint) |
