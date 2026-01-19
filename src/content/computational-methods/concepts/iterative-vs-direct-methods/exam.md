# Iterative vs Direct Methods - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **Direct method** | Solves exactly in a finite number of steps (e.g., LU) |
| **Iterative method** | Successively improves approximation until convergence |
| **Spectral radius** | ρ(B) = largest magnitude eigenvalue of B |
| **Condition number** | κ(A) = λ_max / λ_min for SPD matrices |

---

## Essential Formulas

### Jacobi Iteration
$$x_i^{(k+1)} = \frac{1}{A_{ii}}\left(b_i - \sum_{j \neq i} A_{ij}x_j^{(k)}\right)$$

### Gauss-Seidel Iteration
$$x_i^{(k+1)} = \frac{1}{A_{ii}}\left(b_i - \sum_{j < i} A_{ij}x_j^{(k+1)} - \sum_{j > i} A_{ij}x_j^{(k)}\right)$$

### CG Convergence Rate
$$\|\mathbf{e}_k\| \leq 2\left(\frac{\sqrt{\kappa} - 1}{\sqrt{\kappa} + 1}\right)^k \|\mathbf{e}_0\|$$

### Convergence Condition
Iteration $x^{(k+1)} = Bx^{(k)} + c$ converges ⟺ ρ(B) < 1

---

## Exam Question Types

### Type 1: Jacobi Iteration

**Question pattern**: "Perform Jacobi iterations for this system."

**Example**:
Solve using 2 Jacobi iterations, starting from x₀ = [0, 0]ᵀ:
$$\begin{bmatrix} 4 & 1 \\ 1 & 3 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 5 \\ 5 \end{bmatrix}$$

**Solution**:

Jacobi formulas:
$$x_1^{(k+1)} = \frac{1}{4}(5 - x_2^{(k)}) = \frac{5 - x_2^{(k)}}{4}$$
$$x_2^{(k+1)} = \frac{1}{3}(5 - x_1^{(k)}) = \frac{5 - x_1^{(k)}}{3}$$

Iteration 1 (k=0):
$$x_1^{(1)} = \frac{5 - 0}{4} = 1.25$$
$$x_2^{(1)} = \frac{5 - 0}{3} = 1.667$$

Iteration 2 (k=1):
$$x_1^{(2)} = \frac{5 - 1.667}{4} = 0.833$$
$$x_2^{(2)} = \frac{5 - 1.25}{3} = 1.25$$

**Result**: x ≈ [0.833, 1.25]ᵀ (exact: [0.909, 1.364]ᵀ)

---

### Type 2: Gauss-Seidel Iteration

**Question pattern**: "Perform Gauss-Seidel iterations."

**Same example, Gauss-Seidel**:

$$x_1^{(k+1)} = \frac{5 - x_2^{(k)}}{4}$$
$$x_2^{(k+1)} = \frac{5 - x_1^{(k+1)}}{3}$$  ← Note: uses NEW x₁!

Iteration 1:
$$x_1^{(1)} = \frac{5 - 0}{4} = 1.25$$
$$x_2^{(1)} = \frac{5 - 1.25}{3} = 1.25$$  ← Used x₁⁽¹⁾, not x₁⁽⁰⁾

Iteration 2:
$$x_1^{(2)} = \frac{5 - 1.25}{4} = 0.9375$$
$$x_2^{(2)} = \frac{5 - 0.9375}{3} = 1.354$$

**Faster convergence** than Jacobi! (Already closer to [0.909, 1.364]ᵀ)

---

### Type 3: Convergence Analysis

**Question pattern**: "Will Jacobi converge for this matrix?"

**Example**:
$$A = \begin{bmatrix} 5 & 1 & 1 \\ 1 & 4 & 1 \\ 1 & 1 & 6 \end{bmatrix}$$

**Solution using diagonal dominance**:

Check: |A_ii| > Σ|A_ij| for j≠i?

Row 1: |5| > |1| + |1| = 2 ✓
Row 2: |4| > |1| + |1| = 2 ✓
Row 3: |6| > |1| + |1| = 2 ✓

**Yes, strictly diagonally dominant → Jacobi converges!**

---

### Type 4: Compare Methods

**Question pattern**: "Compare direct and iterative methods for this problem."

**Example**:
Matrix is 10,000 × 10,000, SPD, with 50,000 non-zeros.
Compare sparse LU vs CG for solving one system.

**Analysis**:

Sparse LU:
- Fill-in estimate: ~200,000 (4× original nnz typical)
- Factorization: O(n × fill) ≈ 10,000 × 200,000 = 2×10⁹ ops
- One solve: O(fill) ≈ 200,000 ops
- Total: ~2×10⁹ ops

CG (assume κ ≈ 1000):
- Iterations: ~√1000/2 × ln(10⁸) ≈ 16 × 18 ≈ 290 iterations
- Per iteration: O(nnz) ≈ 50,000 ops
- Total: 290 × 50,000 ≈ 1.5×10⁷ ops

**CG is ~100× faster for this single solve!**

But for 10 right-hand sides:
- Sparse LU: 2×10⁹ + 10×200,000 = 2.002×10⁹ ops
- CG: 10 × 1.5×10⁷ = 1.5×10⁸ ops

CG still faster, but gap narrows.

---

### Type 5: CG Iteration Count

**Question pattern**: "Estimate CG iterations for this condition number."

**Example**:
SPD matrix has condition number κ = 100. Estimate iterations to reduce residual by 10⁻⁶.

**Solution**:

For CG:
$$k \approx \frac{\sqrt{\kappa}}{2}\ln\left(\frac{2}{\epsilon}\right)$$

$$k \approx \frac{\sqrt{100}}{2}\ln\left(\frac{2}{10^{-6}}\right) = 5 \times \ln(2 \times 10^6)$$

$$= 5 \times 14.5 \approx 73 \text{ iterations}$$

---

## Worked Problems

### Problem 1: Method Selection (15 marks)

**Q**: A 5000×5000 SPD matrix has 25,000 non-zeros. You need to solve for 100 different right-hand sides. Which method: sparse Cholesky or CG?

**Solution**:

Sparse Cholesky:
- Assume fill-in ≈ 100,000
- Factorization: O(n × fill) ≈ 5000 × 100,000 = 5×10⁸ ops (done once)
- Per solve: O(fill) = 100,000 ops
- Total for 100 solves: 5×10⁸ + 100 × 100,000 = 5.1×10⁸ ops

CG (assume κ = 100, need 50 iterations each):
- Per solve: 50 × 25,000 = 1.25×10⁶ ops
- Total for 100 solves: 100 × 1.25×10⁶ = 1.25×10⁸ ops

**CG is faster** (~4×), but:
- Direct gives exact answers
- CG needs good preconditioner to achieve 50 iterations
- If κ is larger, CG takes more iterations

**Recommendation**: For 100 RHS, sparse Cholesky is more robust unless memory is a concern.

---

### Problem 2: Convergence Analysis (10 marks)

**Q**: Given iteration matrix B with eigenvalues 0.3, -0.5, 0.8:
(a) Will the iteration converge? (5 marks)
(b) After k iterations, by what factor is error reduced? (5 marks)

**Solution**:

(a) Spectral radius:
$$\rho(B) = \max(|0.3|, |-0.5|, |0.8|) = 0.8$$

Since ρ(B) = 0.8 < 1, **yes, the iteration converges**.

(b) Error reduction:
$$\frac{\|e^{(k)}\|}{\|e^{(0)}\|} \approx \rho^k = 0.8^k$$

After k iterations, error reduced by factor 0.8ᵏ.

For k=10: 0.8¹⁰ ≈ 0.107 (~10× reduction)
For k=20: 0.8²⁰ ≈ 0.012 (~90× reduction)

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Using old values in G-S | G-S uses updated values immediately |
| Assuming iteration always converges | Must check ρ(B) < 1 or diagonal dominance |
| Forgetting CG requires SPD | CG only works for symmetric positive definite |
| Comparing iterations, not total work | Compare total ops (iterations × cost per iteration) |

---

## Quick Reference

| Property | Direct (LU) | Jacobi/G-S | CG |
|----------|-------------|------------|-----|
| Matrix type | Any | Diag. dominant | SPD only |
| Answer | Exact | Approximate | Approximate |
| Memory | O(fill) | O(n) | O(n) |
| Multiple RHS | Cheap | Full cost each | Full cost each |
| Parallelizable | Limited | Yes | Yes |
