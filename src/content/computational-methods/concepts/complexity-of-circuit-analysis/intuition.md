# Complexity of Circuit Analysis

## Putting It All Together

You now understand:
- Algorithm complexity (Big-O)
- Matrix sparsity and fill-in
- Direct vs iterative methods

Let's see how all of this applies to real circuit simulation!

---

## The Three Types of Circuit Analysis

### DC Analysis: Find the Operating Point

**Question**: What are the voltages and currents when everything settles?

**Mathematics**: Solve Gv = i (linear) or f(v) = 0 (nonlinear)

**When used**: 
- Before any other analysis
- Finding bias points for transistors

### AC Analysis: Frequency Response

**Question**: How does the circuit respond to sinusoidal signals at different frequencies?

**Mathematics**: Solve (G + jωC)V = I for each frequency ω

**When used**:
- Amplifier bandwidth
- Filter response
- Stability analysis

### Transient Analysis: Time Evolution

**Question**: How do voltages/currents change over time?

**Mathematics**: Solve differential equations at many time steps

**When used**:
- Digital switching behavior
- Startup transients
- Mixed analog-digital simulation

---

## DC Analysis Complexity

### Linear Circuits

For a linear resistive circuit with n nodes:

1. **Build G matrix**: O(m) where m = number of elements
2. **Factor G**: O(n³) dense or O(n·fill²) sparse
3. **Solve Gv = i**: O(n²) dense or O(fill) sparse

**Total**: Dominated by factorization

### Nonlinear Circuits (Newton-Raphson)

For circuits with diodes, transistors, etc.:

```
while (not converged):
    J = Jacobian(v)      # Build linearized matrix
    Δv = solve(J, -f(v)) # Solve for update
    v = v + Δv           # Update solution
```

Each Newton iteration:
- Build Jacobian: O(m)
- Factor Jacobian: O(n·fill²)
- Solve: O(fill)

**Total**: O(k × n·fill²) where k = Newton iterations (typically 5-20)

### The Good News

The Jacobian has the **same sparsity pattern** at each iteration!

→ **Symbolic factorization done once, numeric factorization repeated**

This is a huge optimization in SPICE.

---

## AC Analysis Complexity

### Single Frequency

At frequency ω:

**Matrix**: Y(ω) = G + jωC (complex-valued)

1. **Build Y**: O(m)
2. **Factor Y**: O(n·fill²)
3. **Solve**: O(fill)

### Frequency Sweep (F frequencies)

**Naive approach**: Factor at each frequency
- Total: O(F × n·fill²)

**Smart approach**: Same sparsity pattern for all frequencies!
- Symbolic factorization: O(n) once
- Numeric factorization: O(F × fill²·n)

But wait—there's more optimization possible:
- Model-order reduction
- Fast frequency sweep methods

---

## Transient Analysis Complexity

### The Time-Stepping Challenge

Transient analysis solves:
$$C\frac{dv}{dt} + Gv = i(t)$$

Using numerical integration (e.g., Backward Euler):
$$\left(\frac{C}{\Delta t} + G\right)v_{n+1} = \frac{C}{\Delta t}v_n + i_{n+1}$$

This is a **linear system** at each time step!

### For T Time Steps

**Naive**: Factor at each step
- Total: O(T × n·fill²) ← Very expensive!

**Smart**: Reuse factorization when possible
- If Δt is constant and no nonlinear elements update:
  - Factor once: O(n·fill²)
  - Solve T times: O(T × fill)
  - Total: O(n·fill²) + O(T·fill)

### Nonlinear Transient

Each time step may need Newton iterations:

```
for each time step:
    while (not converged):
        Build Jacobian
        Solve Newton update
    end
end
```

Total: O(T × k × n·fill²) where k = avg Newton iterations

**This is why SPICE can be slow for complex transient simulations!**

---

## Scaling Examples

### Example 1: Op-Amp Circuit (100 nodes)

| Analysis | Complexity | Estimated Time |
|----------|------------|----------------|
| DC | O(n³) ≈ 10⁶ | < 1 ms |
| AC (100 freq) | O(100 × n³) ≈ 10⁸ | < 100 ms |
| Transient (1000 steps) | O(1000 × n³) ≈ 10⁹ | < 1 s |

Small circuit: No worries!

### Example 2: Full IC Block (10,000 nodes)

| Analysis | Dense | Sparse (good order) |
|----------|-------|---------------------|
| DC | 10¹² ops (~17 min) | 10⁸ ops (~0.1 s) |
| AC (100 freq) | 10¹⁴ ops (~28 hr) | 10⁹ ops (~1 s) |
| Transient (10k steps) | 10¹⁶ ops (~1 year) | 10¹⁰ ops (~10 s) |

**Sparse methods are essential!**

### Example 3: Full Chip (1,000,000 nodes)

Even sparse methods struggle:
- Fill-in can reach 10⁸
- Memory becomes an issue
- Parallel/hierarchical methods needed

---

## SPICE Optimization Strategies

### 1. Symbolic Analysis Once

```
DC:        [Symbolic Factor] → [Numeric Factor] → [Solve]
AC sweep:  (reuse symbolic)  → [Numeric Factor] → [Solve] × F
Transient: (reuse symbolic)  → [Numeric Factor] → [Solve] × T
```

### 2. Adaptive Time Stepping

Instead of fixed Δt:
- Large Δt when signals change slowly
- Small Δt when signals change fast

**Savings**: 10-100× fewer time steps

### 3. Bypassing

Skip components that aren't changing:
- Linear components: constant contribution
- Nonlinear at DC: bypass during AC analysis

### 4. Hierarchical Simulation

For very large circuits:
- Partition into blocks
- Solve blocks (nearly) independently
- Handle coupling between blocks
- Parallelize across blocks

---

## Complexity Summary Table

| Analysis | Linear | With Newton |
|----------|--------|-------------|
| DC | O(n·fill²) | O(k·n·fill²) |
| AC (F freq) | O(F·n·fill²) | N/A (small signal) |
| Transient (T steps) | O(n·fill²) + O(T·fill) | O(T·k·n·fill²) |

Where:
- n = nodes
- fill = fill-in during factorization
- k = Newton iterations (~5-20)
- F = number of frequencies
- T = number of time steps

---

## Practical Guidelines

### When Simulation Is Fast

✅ Small circuits (< 1000 nodes)
✅ Linear circuits (no nonlinear devices)
✅ Short transients (< 1000 time steps)
✅ Good matrix ordering

### When Simulation Is Slow

❌ Large circuits (> 100,000 nodes)
❌ Highly nonlinear (many Newton iterations)
❌ Long transients with fast dynamics
❌ Poor sparsity structure

### Optimization Priority

1. **Good ordering** (free, can reduce fill-in 10×)
2. **Exploit linearity** (reuse factorization)
3. **Adaptive time step** (reduce T)
4. **Hierarchical methods** (for very large)
5. **Parallelization** (last resort, most complex)

---

## Summary

> "Understanding complexity is the difference between waiting 1 second and waiting 1 year for your simulation."

| Key Insight | Implication |
|-------------|-------------|
| Circuit matrices are sparse | Use sparse solvers |
| Same sparsity pattern | Symbolic factorization once |
| Newton iterations dominate | Minimize nonlinear model complexity |
| Transient = many solves | Reuse factorization when Δt constant |
| Very large circuits | Need hierarchical/parallel methods |
