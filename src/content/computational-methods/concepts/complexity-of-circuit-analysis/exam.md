# Complexity of Circuit Analysis - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **DC analysis** | Find steady-state (dv/dt = 0) solution |
| **AC analysis** | Small-signal frequency response |
| **Transient analysis** | Time-domain solution of ODEs |
| **Newton iteration** | Iterative method for nonlinear DC |

---

## Essential Formulas

### DC Analysis
- Linear: O(n · fill²)
- Nonlinear: O(k · n · fill²) where k = Newton iterations

### AC Analysis
- Per frequency: O(n · fill²)
- F frequencies: O(F · fill²) with pattern reuse

### Transient Analysis
- T steps, reuse LU: O(n · fill²) + O(T · fill)
- T steps, no reuse: O(T · n · fill²)

---

## Exam Question Types

### Type 1: Estimate DC Analysis Time

**Question**: A circuit has 5000 nodes. Sparse fill-in is 25,000. Estimate DC analysis complexity for:
(a) Linear circuit
(b) Nonlinear circuit (10 Newton iterations)

**Solution**:

(a) Linear:
$$\text{Cost} = O(n \cdot fill^2) = O(5000 \times 25000^2)$$
Wait—that's not right. Fill-in is the number of non-zeros in L+U, not the factor to square.

Correction: Sparse LU ≈ O(n × fill) for well-ordered circuits
$$\text{Cost} \approx O(5000 \times 25000) = O(1.25 \times 10^8) \text{ ops}$$

At 10⁹ FLOPS: ~0.1 seconds

(b) Nonlinear (10 Newton iterations):
$$\text{Cost} = 10 \times O(1.25 \times 10^8) = O(1.25 \times 10^9) \text{ ops}$$

At 10⁹ FLOPS: ~1 second

---

### Type 2: Compare Analysis Types

**Question**: Circuit has 1000 nodes, fill-in 10,000. Compare ops for:
(a) One DC analysis
(b) AC sweep at 100 frequencies
(c) Transient with 10,000 time steps (fixed dt)

**Solution**:

(a) DC:
$$\text{Cost} = O(n \cdot fill) = O(1000 \times 10000) = 10^7 \text{ ops}$$

(b) AC (with pattern reuse):
$$\text{Cost} = O(F \cdot fill^2 / n) \approx O(100 \times 10000) = 10^6 \text{ ops}$$
(Each frequency: numeric factorization ≈ O(fill))

Actually, more accurately: O(F × fill) for solve, plus one symbolic
$$\approx O(10^7) + O(100 \times 10^4) = 10^7 + 10^6 \approx 10^7 \text{ ops}$$

(c) Transient with reuse:
$$\text{Cost} = O(n \cdot fill) + O(T \cdot fill)$$
$$= 10^7 + O(10000 \times 10000) = 10^7 + 10^8 = 1.1 \times 10^8 \text{ ops}$$

**Ranking**: DC < AC << Transient

---

### Type 3: Newton Iteration Impact

**Question**: Nonlinear circuit needs 20 Newton iterations for DC. Each iteration re-factors the Jacobian. If factorization takes 0.5 seconds, how long does DC analysis take?

**Solution**:
- 20 iterations × 0.5 seconds = **10 seconds**
- Plus time for function evaluations (usually smaller)

If we use symbolic/numeric separation and Jacobian pattern is constant:
- Symbolic: 0.5 seconds (once)
- Numeric: 0.1 seconds per iteration (5× faster than full)
- Total: 0.5 + 20 × 0.1 = **2.5 seconds**

**Insight**: Reusing symbolic factorization saves 4× time.

---

### Type 4: Transient Scaling

**Question**: A linear transient simulation with 1000 steps takes 10 seconds. How long for 10,000 steps?

**Solution**:

If factorization is reused (same dt):
- Initial factor: ~fixed cost
- Per step: O(fill) for forward/back sub

Assuming factorization dominates at 1000 steps:
T_total = T_factor + T × T_solve

If T_factor ≈ T_solve × 1000 at 10 seconds total:
T_factor ≈ 5 seconds, 1000 × T_solve ≈ 5 seconds

For 10,000 steps:
T_total = 5 + 10,000 × 0.005 = 5 + 50 = **55 seconds**

Not 10× increase because factorization is fixed cost!

---

### Type 5: When to Use Iterative

**Question**: Circuit has 100,000 nodes. Compare sparse LU vs CG for DC analysis.

**Solution**:

Sparse LU:
- Fill-in estimate: 10× nodes = 1,000,000
- Cost: O(n × fill) ≈ O(10⁵ × 10⁶) = O(10¹¹) ops
- Time at 10⁹ FLOPS: ~100 seconds

CG (assume κ = 1000, need 50 iterations):
- Per iteration: O(nnz) ≈ O(5×10⁵)
- Total: 50 × 5×10⁵ = 2.5×10⁷ ops
- Time: ~0.025 seconds

**CG is ~4000× faster!** (if circuit matrix is SPD and CG converges)

---

## Worked Problems

### Problem 1: Complete Analysis Suite (20 marks)

**Q**: Design team needs to simulate a 10,000-node analog IC:
- DC operating point (10 Newton iterations)
- AC sweep (1000 frequencies)
- 1μs transient at 1ns steps (1,000,000 steps)

Assume fill-in = 50,000, one factorization takes 1 second.

(a) Estimate time for each analysis (6 marks each)
(b) Which dominates? How to optimize? (2 marks)

**Solution**:

(a) DC:
- 10 iterations × 1 second = **10 seconds**

AC (reuse pattern):
- Symbolic: 1 second (once)
- Numeric factor per freq: ~0.2 seconds
- Total: 1 + 1000 × 0.2 = **201 seconds ≈ 3.4 minutes**

Transient (reuse factorization, linear case):
- Factor: 1 second
- Each solve: ~0.001 seconds (fill = 50,000)
- Total: 1 + 1,000,000 × 0.001 = **1001 seconds ≈ 17 minutes**

(b) **Transient dominates** at 17 minutes.

Optimizations:
- Adaptive time stepping (reduce from 1M to ~10,000 steps) → ~12 seconds
- Hierarchical partitioning for parallelism

---

### Problem 2: Adaptive Time Step Benefit (10 marks)

**Q**: Fixed 1ns time step gives 1,000,000 steps. With adaptive stepping, average step is 100ns. Estimate speedup assuming factorization-reuse applies.

**Solution**:

Fixed: 1,000,000 steps
Adaptive: 1,000,000 / 100 = 10,000 steps

Time = T_factor + T × T_solve

Fixed: T_factor + 1,000,000 × T_solve
Adaptive: T_factor + 10,000 × T_solve

If T_factor = 1s and T_solve = 0.001s:

Fixed: 1 + 1000 = 1001 seconds
Adaptive: 1 + 10 = 11 seconds

**Speedup: 91×**

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Forgetting fill-in in complexity | fill > nnz for sparse LU |
| Linear scaling for transient | Factorization is fixed cost; steps add only O(fill) each |
| Same time for all analysis types | Transient >> AC >> DC typically |
| Ignoring Newton iterations | Each Newton re-factors (or at least re-evaluates) |

---

## Quick Reference

| Analysis | Formula | Typical Time (10k nodes) |
|----------|---------|-------------------------|
| Linear DC | O(n · fill²) | 0.1 - 1 s |
| Nonlinear DC | O(k · n · fill²) | 1 - 10 s |
| AC (F freq) | O(F · fill²) | 10 - 100 s |
| Transient (T steps) | O(n·fill²) + O(T·fill) | minutes to hours |
