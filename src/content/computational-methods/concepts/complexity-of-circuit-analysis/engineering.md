# Complexity of Circuit Analysis - Engineering Perspective

## SPICE Internal Architecture

### The SPICE Simulation Loop

```
┌────────────────────────────────────────────────────────────────┐
│                        SPICE FLOW                               │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│  │   Parse     │───▶│   Build     │───▶│  Symbolic   │        │
│  │   Netlist   │    │   Matrix    │    │   Factor    │        │
│  └─────────────┘    └─────────────┘    └──────┬──────┘        │
│                                               │                │
│                                               ▼                │
│  ┌─────────────────────────────────────────────────────┐      │
│  │                 ANALYSIS LOOP                        │      │
│  │  ┌─────────────┐    ┌─────────────┐    ┌──────────┐│      │
│  │  │  Evaluate   │───▶│  Numeric    │───▶│  Solve   ││      │
│  │  │  Models     │    │  Factor     │    │  System  ││      │
│  │  └─────────────┘    └─────────────┘    └──────────┘│      │
│  │         ▲                                    │      │      │
│  │         └────────────────────────────────────┘      │      │
│  │                     (Newton loop)                   │      │
│  └─────────────────────────────────────────────────────┘      │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Profiling Real SPICE Runs

Typical time distribution for nonlinear transient:

| Phase | Time % | Notes |
|-------|--------|-------|
| Model evaluation | 40-60% | Device equations (MOSFETs, etc.) |
| Numeric factorization | 20-40% | LU decomposition |
| Forward/back substitution | 5-15% | Solving triangular systems |
| Matrix loading | 5-10% | Stamping element contributions |
| Convergence checks | 1-5% | Residual calculation |
| Output/bookkeeping | 1-5% | Writing results |

**Key insight**: Model evaluation often dominates, not linear algebra!

---

## DC Analysis in Practice

### Linear DC Analysis

```python
def dc_analysis_linear(circuit):
    # Build MNA matrix (O(m))
    G, i = build_MNA(circuit)
    
    # Sparse LU factorization (O(n*fill^2))
    lu = splu(G)
    
    # Solve (O(fill))
    v = lu.solve(i)
    
    return v
```

### Nonlinear DC with Newton-Raphson

```python
def dc_analysis_nonlinear(circuit, tol=1e-9, max_iter=50):
    # Initial guess (often zero or previous operating point)
    v = initial_guess(circuit)
    
    # Symbolic factorization once
    J_pattern = build_jacobian_pattern(circuit)
    
    for iteration in range(max_iter):
        # Evaluate nonlinear functions and Jacobian
        f, J = evaluate_circuit(circuit, v)
        
        # Check convergence
        if norm(f) < tol:
            print(f"Converged in {iteration} iterations")
            return v
        
        # Solve Newton step (numeric factorization + solve)
        lu = splu(J)  # Reuses symbolic pattern
        dv = lu.solve(-f)
        
        # Update with damping for stability
        v = v + damping_factor(dv) * dv
    
    raise ConvergenceError("Newton did not converge")
```

### Newton Convergence Issues

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| Slow convergence | Poor initial guess | Use .nodeset or continuation |
| Oscillation | Over-shooting | Add damping |
| Divergence | Singularity | Check topology, add gmin |
| Never converges | Multiple solutions | Better initial guess |

---

## AC Analysis Implementation

### Basic AC Sweep

```python
def ac_analysis(circuit, frequencies, op_point):
    """Small-signal AC analysis."""
    # Build linearized circuit around operating point
    G, C = build_linear_model(circuit, op_point)
    
    # Get sparsity pattern (same for all frequencies)
    pattern = get_sparsity_pattern(G)
    
    results = []
    for omega in 2 * np.pi * frequencies:
        # Complex admittance matrix
        Y = G + 1j * omega * C
        
        # Factor and solve (reuses pattern)
        lu = splu(Y)
        V = lu.solve(I_source)
        results.append(V)
    
    return results
```

### Fast Frequency Sweep Methods

For very dense frequency sweeps:

**Asymptotic Waveform Evaluation (AWE)**:
- Compute moments of transfer function
- Construct Padé approximation
- Very fast for 100s-1000s of frequencies

**Model Order Reduction**:
- Reduce n-dimensional system to k-dimensional (k << n)
- Solve reduced system at each frequency
- Accuracy vs speed trade-off

---

## Transient Analysis Details

### Basic Transient Loop

```python
def transient_analysis(circuit, t_end, dt_init):
    """Transient simulation with adaptive time stepping."""
    v = dc_analysis(circuit)  # Start from DC operating point
    t = 0
    dt = dt_init
    
    history = [(t, v.copy())]
    
    # Build companion model matrix pattern
    pattern = build_transient_pattern(circuit)
    
    while t < t_end:
        # Build companion model: (G + C/dt) v_new = C/dt * v_old + i
        G_eff, rhs = build_companion(circuit, v, dt)
        
        # Newton iteration for nonlinear elements
        v_new = newton_solve(G_eff, rhs, v)
        
        # Estimate local truncation error
        lte = estimate_error(v, v_new, dt)
        
        if lte > tolerance:
            # Reject step, reduce dt
            dt = dt * 0.5
            continue
        
        # Accept step
        v = v_new
        t = t + dt
        history.append((t, v.copy()))
        
        # Adjust dt for next step
        dt = adjust_timestep(dt, lte, tolerance)
    
    return history
```

### Adaptive Time Stepping

```
Signal
    │
    │    ╭─╮
    │   ╱   ╲        Large dt OK
    │  ╱     ╲
    │ ╱       ╲       ┌─────────────────┐
    │╱         ╲      │                 │
    ├──────────────────────────────────────────────
    │            ╲    │                 │
    │             ╲   │    Small dt     │  Large dt
    │              ╲  │     needed      │    OK
    │               ╲ │                 │
    │                ╲│                 │
    │                 ╰─────────────────┘
    └─────────────────────────────────────────────▶ t
```

**Benefit**: 10-100× fewer time steps for typical waveforms

---

## Performance Benchmarks

### Commercial SPICE Performance (Typical)

| Circuit | Nodes | Transistors | DC Time | 1μs Transient |
|---------|-------|-------------|---------|---------------|
| Op-amp | 50 | 20 | < 1 ms | 0.1 s |
| Comparator | 200 | 100 | 5 ms | 0.5 s |
| PLL | 2,000 | 1,000 | 0.5 s | 30 s |
| ADC | 20,000 | 10,000 | 30 s | 30 min |
| Full chip | 1,000,000 | 500,000 | hours | days |

### Scaling Observations

Empirically, for well-optimized SPICE:
- DC analysis: ~O(n^1.5) to O(n^2)
- AC analysis: ~O(n^1.5) per frequency
- Transient: ~O(n^1.5) per time step × number of steps

---

## Optimization Techniques

### Level 1: Algorithmic

| Technique | Benefit | When to Use |
|-----------|---------|-------------|
| Sparse factorization | 10-1000× | Always |
| AMD ordering | 2-10× | Always |
| Factorization reuse | 2-5× | Transient, sweeps |
| Adaptive time step | 10-100× | Transient |

### Level 2: Model Simplification

| Technique | Benefit | Trade-off |
|-----------|---------|-----------|
| Simpler transistor models | 2-5× | Accuracy |
| Ideal vs real switches | 10× | Physical fidelity |
| Behavioral models | 10-100× | Implementation effort |

### Level 3: Hierarchical/Parallel

| Technique | Benefit | Complexity |
|-----------|---------|------------|
| Subcircuit caching | 2-5× | Moderate |
| Parallel factorization | 2-4× | High |
| Distributed simulation | 10-100× | Very high |

---

## Estimating Simulation Time

### Quick Estimation Formula

For transient analysis:
$$T_{sim} \approx \frac{T_{total}}{T_{step}} \times \frac{N_{transistors}}{10000} \times 0.1 \text{ seconds}$$

**Example**: 
- 1μs transient, 1ns average time step → 1000 steps
- 50,000 transistors
- Estimate: 1000 × 5 × 0.1 = 500 seconds ≈ 8 minutes

### When to Worry

| Estimated Time | Action |
|----------------|--------|
| < 1 minute | Just run it |
| 1-10 minutes | Check settings are reasonable |
| 10-60 minutes | Consider model simplification |
| > 1 hour | Definitely optimize or use parallel |
| > 1 day | Hierarchical methods essential |

---

## Summary: Engineering Guidelines

| Circuit Size | DC | AC (100 freq) | Transient (1000 steps) |
|--------------|----|--------------:|----------------------:|
| 100 nodes | instant | instant | < 1 s |
| 1,000 nodes | < 1 s | < 10 s | < 1 min |
| 10,000 nodes | < 10 s | < 2 min | < 10 min |
| 100,000 nodes | minutes | hours | hours |
| 1M nodes | hours | days | weeks |

**Bottom line**: Understand your circuit size and choose appropriate methods and expectations!
