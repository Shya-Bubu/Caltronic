# Iterative vs Direct Methods

## Two Ways to Solve Ax = b

You have a system of equations **Ax = b**. How do you find **x**?

There are two fundamentally different approaches:

### Direct Methods (Like Cooking from a Recipe)

Follow exact steps that guarantee the correct answer:
1. Factor A = LU
2. Solve Ly = b
3. Solve Ux = y
4. **Done!** x is the exact answer (to machine precision)

### Iterative Methods (Like Guessing a Password)

Make educated guesses that get closer each time:
1. Start with a guess x₀
2. Compute x₁ = improve(x₀)
3. Compute x₂ = improve(x₁)
4. Keep going until "close enough"

---

## The Package Delivery Analogy

### Direct Method: GPS Navigation

You enter your destination, the GPS calculates the exact route, and you follow it precisely.

- **Always works** (barring road closures)
- **Known time** to calculate route
- **Optimal path** guaranteed
- **Expensive** for complex route networks

### Iterative Method: Following Scent

You're looking for a bakery. You can smell bread. Walk toward the stronger smell, and eventually you'll find it.

- **May not work** (smell might be misleading)
- **Unknown time** (might wander for a while)
- **Gets "close enough"** (within sniffing distance)
- **Cheap** per step (just sniff and walk)

---

## Direct Methods: LU Factorization

### The Key Idea

Transform the hard problem (solve Ax = b) into easy problems:

```
A = LU

where L = lower triangular (easy to solve)
      U = upper triangular (easy to solve)
```

Then:
```
Ax = b
LUx = b

Let y = Ux

Solve Ly = b  (forward substitution - easy!)
Solve Ux = y  (backward substitution - easy!)
```

### Why Triangular Systems Are Easy

Lower triangular Ly = b:
```
[L₁₁  0   0 ] [y₁]   [b₁]
[L₂₁ L₂₂  0 ] [y₂] = [b₂]
[L₃₁ L₃₂ L₃₃] [y₃]   [b₃]

y₁ = b₁/L₁₁                        ← only one unknown!
y₂ = (b₂ - L₂₁y₁)/L₂₂              ← y₁ already known!
y₃ = (b₃ - L₃₁y₁ - L₃₂y₂)/L₃₃      ← y₁, y₂ already known!
```

Each equation has only one unknown—solve in order!

### Direct Method: Pros and Cons

✅ **Advantages**:
- Exact answer (to machine precision)
- Predictable time (know before you start)
- Handles any (non-singular) matrix
- Multiple right-hand sides are cheap after factorization

❌ **Disadvantages**:
- O(n³) for dense, expensive for large n
- Fill-in increases memory for sparse
- Must store full L and U factors

---

## Iterative Methods: Successive Improvement

### The Key Idea

Start somewhere, and take steps that reduce the error.

**Jacobi Method**:
```
For each equation i:
    x_i^(new) = (b_i - sum of A_ij * x_j^(old) for j≠i) / A_ii
```

In words: Assume all other variables are their current values, solve for one variable.

### Example: 2×2 System

```
2x + y = 5
x + 3y = 6
```

Rearranging:
```
x = (5 - y)/2
y = (6 - x)/3
```

Iteration:
```
Start: x₀=0, y₀=0

Step 1: x₁ = (5 - 0)/2 = 2.5
        y₁ = (6 - 0)/3 = 2.0

Step 2: x₂ = (5 - 2.0)/2 = 1.5
        y₂ = (6 - 2.5)/3 = 1.17

Step 3: x₃ = (5 - 1.17)/2 = 1.92
        y₃ = (6 - 1.5)/3 = 1.5

...

Exact:  x = 1.8, y = 1.4
```

Getting closer each time!

### Iterative Methods: Pros and Cons

✅ **Advantages**:
- Low memory (only vectors, not full matrices)
- Only needs matrix-vector multiply (easy for sparse)
- Can stop early if approximate answer is okay
- Naturally parallelizable

❌ **Disadvantages**:
- May not converge!
- Unknown number of iterations
- Convergence depends on matrix properties
- Only gets approximate answer

---

## When Does Iteration Converge?

### Diagonal Dominance

A matrix is **diagonally dominant** if:

$$|A_{ii}| > \sum_{j \neq i} |A_{ij}|$$

(Diagonal entry is larger than sum of off-diagonals in each row)

**Good news**: Jacobi and Gauss-Seidel converge for diagonally dominant matrices!

**Circuit matrices**: Often diagonally dominant due to physics (positive conductances).

### Positive Definiteness

A symmetric matrix is **positive definite** if:
$$x^T A x > 0 \text{ for all } x \neq 0$$

**Good news**: Conjugate Gradient converges for symmetric positive definite matrices!

**Circuit matrices**: Conductance matrices are often SPD.

---

## The Big Methods

### Direct Methods

| Method | Matrix Type | Complexity |
|--------|-------------|------------|
| LU | Any | O(n³) dense, O(fill²·n) sparse |
| Cholesky | SPD | O(n³/3) dense (half of LU) |
| LDLT | Symmetric | O(n³/3) dense |

### Iterative Methods

| Method | Matrix Type | Per Iteration | When to Use |
|--------|-------------|---------------|-------------|
| Jacobi | Diag. dominant | O(nnz) | Simple, parallelizable |
| Gauss-Seidel | Diag. dominant | O(nnz) | Faster than Jacobi |
| SOR | Diag. dominant | O(nnz) | Accelerated G-S |
| Conjugate Gradient | SPD | O(nnz) | Best for large SPD |
| GMRES | Any | O(k·nnz) | General purpose |

---

## Conjugate Gradient: The Best of Both Worlds

CG is special because:
1. **Guaranteed to converge** in at most n iterations for SPD
2. **Usually converges much faster** (often √n iterations)
3. **Only needs matrix-vector multiply** (cheap for sparse)
4. **Low memory** (just a few vectors)

### CG Algorithm (Simplified)

```
r = b - A*x₀       # Initial residual
p = r              # Search direction

for k = 1, 2, 3, ...:
    α = (rᵀr) / (pᵀAp)     # Step size
    x = x + α*p            # Update solution
    r_new = r - α*A*p      # Update residual
    
    if ||r_new|| < tolerance:
        STOP  # Converged!
    
    β = (r_newᵀr_new) / (rᵀr)
    p = r_new + β*p        # New search direction
    r = r_new
```

Each iteration: One matrix-vector multiply + a few dot products and vector adds.

---

## Convergence Rate Matters!

How fast errors decrease:

| Method | Error after k iterations |
|--------|-------------------------|
| Jacobi | ~ρᵏ where ρ close to 1 |
| Gauss-Seidel | ~ρᵏ (better ρ than Jacobi) |
| CG | ~((√κ-1)/(√κ+1))ᵏ |

Where κ = condition number (ratio of largest to smallest eigenvalue).

**Key insight**: Conjugate Gradient convergence depends on √κ, not κ.
For ill-conditioned matrices, this is a huge advantage!

---

## Decision Guide: When to Use What

```
                    Is n large (> 10,000)?
                           │
              ┌────────────┴────────────┐
              │                         │
              No                        Yes
              │                         │
              ▼                         ▼
     ┌─────────────────┐     Is matrix SPD or nearly so?
     │  Use Direct     │              │
     │  (LU or         │    ┌─────────┴─────────┐
     │   Cholesky)     │    │                   │
     └─────────────────┘    Yes                 No
                            │                   │
                            ▼                   ▼
                    ┌───────────────┐   ┌───────────────┐
                    │ Try CG first  │   │ Use GMRES or  │
                    │ (fast, low    │   │ sparse direct │
                    │  memory)      │   │ (depends on   │
                    └───────────────┘   │  fill-in)     │
                                        └───────────────┘
```

---

## Summary

| Aspect | Direct | Iterative |
|--------|--------|-----------|
| Answer | Exact | Approximate |
| Memory | High (store L, U) | Low (just vectors) |
| Time | Predictable | Variable |
| Large sparse | Fill-in limits size | Scales well |
| Multiple RHS | Cheap after factorization | Repeat full solve |
| Failure mode | Only fails for singular | May not converge |

**Rule of thumb**:
- Small/medium problems: Use direct (simpler, exact)
- Large sparse SPD: Try CG first
- If CG struggles: Fall back to sparse direct with good ordering
