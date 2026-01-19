# Algorithm Complexity Fundamentals - Engineering Perspective

## Practical Complexity Analysis

### Measuring vs Predicting

**Theoretical analysis** predicts complexity from the algorithm.
**Empirical measurement** confirms it with real data.

```python
import time
import numpy as np

def measure_complexity(algorithm, sizes):
    times = []
    for n in sizes:
        start = time.time()
        algorithm(n)
        times.append(time.time() - start)
    return times

# Example: Dense matrix-vector multiply
def dense_matvec(n):
    A = np.random.rand(n, n)
    x = np.random.rand(n)
    return A @ x

sizes = [100, 200, 400, 800, 1600]
times = measure_complexity(dense_matvec, sizes)
# Plot log(time) vs log(n) to determine slope = complexity exponent
```

### Interpreting Log-Log Plots

Plot time vs n on log-log scale:
- **Slope = 1** → O(n)
- **Slope = 2** → O(n²)
- **Slope = 3** → O(n³)

```
log(time)
    │
    │                    ╱ slope = 3 (O(n³))
    │                  ╱
    │              ╱────── slope = 2 (O(n²))
    │          ╱────
    │      ╱────────────── slope = 1 (O(n))
    │  ╱────────
    └─────────────────────→ log(n)
```

---

## Circuit Simulation Complexity

### MNA Matrix Construction

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Allocate matrix | O(n²) dense / O(nnz) sparse | Memory |
| Stamp resistor | O(1) | 4 additions |
| Stamp capacitor | O(1) | 4 additions |
| Stamp VCCS | O(1) | 4 additions |
| Total stamping | O(m) | m = # elements |

**Typical**: O(n) time since m ≈ few × n

### Matrix Factorization

| Method | Time | Space | Best For |
|--------|------|-------|----------|
| Dense LU | O(n³) | O(n²) | n < 500 |
| Banded LU | O(nb²) | O(nb) | Regular structures |
| Sparse LU | O(n·fill²) | O(fill) | General circuits |

Where:
- n = matrix dimension
- b = bandwidth
- fill = fill-in count (new non-zeros during factorization)

### Transient Simulation

For transient simulation with T timesteps:

| Component | Complexity |
|-----------|------------|
| Matrix construction | O(n) per step |
| LU factorization | O(n³) dense or O(n·fill²) sparse |
| Back-substitution | O(n²) dense or O(fill) sparse |
| Total (dense) | O(T·n³) |
| Total (sparse, reuse LU) | O(n·fill²) + O(T·fill) |

**Key insight**: For transient analysis, factor once, solve T times. Sparse LU amortizes!

---

## Memory Considerations

### Cache Effects

Modern CPUs have hierarchical memory:

```
┌─────────────────┐
│   Registers     │  < 1 ns access, ~1 KB
├─────────────────┤
│   L1 Cache      │  1 ns access, ~32 KB
├─────────────────┤
│   L2 Cache      │  4 ns access, ~256 KB
├─────────────────┤
│   L3 Cache      │  12 ns access, ~8 MB
├─────────────────┤
│   Main Memory   │  100 ns access, ~16+ GB
├─────────────────┤
│   Disk/SSD      │  10,000 ns+, TB+
└─────────────────┘
```

**Implication**: Algorithms with good **memory locality** are faster in practice.

Dense matrices access memory sequentially → good locality.
Sparse matrices with random access → cache misses → slower per operation.

But sparse matrices access **fewer** locations, so often win overall.

### Memory-Bound vs Compute-Bound

| Regime | Bottleneck | Optimization |
|--------|------------|--------------|
| Memory-bound | RAM bandwidth | Improve data locality |
| Compute-bound | CPU speed | Use SIMD, parallelize |

Matrix-vector multiply is often **memory-bound** (limited by memory bandwidth).
Dense matrix multiply is **compute-bound** (limited by FLOP rate).

---

## SPICE Performance

### Historical Complexity of SPICE

Original Berkeley SPICE used:
- Dense matrix storage: O(n²) memory
- Dense LU: O(n³) time

SPICE2 introduced:
- Sparse matrix storage: O(nnz) memory
- Sparse LU: O(n·fill²) time

This enabled simulation of circuits with 1000s of nodes instead of 100s.

### Modern SPICE Performance

| Circuit Size | Typical Time (Sparse) | Notes |
|--------------|----------------------|-------|
| 100 nodes | < 1 sec | Trivial |
| 1K nodes | 1-10 sec | Routine |
| 10K nodes | 1-10 min | Careful setup |
| 100K nodes | 1+ hours | Parallel methods |
| 1M+ nodes | Distributed computing | Requires hierarchy |

### Commercial Simulator Tricks

1. **Subcircuit hierarchy**: Solve blocks independently
2. **Model reduction**: Simplify inactive regions
3. **Adaptive time-stepping**: Larger steps when possible
4. **Parallelization**: Multi-core LU factorization
5. **Approximate methods**: Fast multipole, FFT-based

---

## Benchmarking Best Practices

### Warm-Up Runs

Always discard first run (JIT compilation, cache effects):

```python
# Warm-up
for _ in range(3):
    algorithm(test_data)

# Actual measurement
times = []
for _ in range(10):
    start = time.perf_counter()
    algorithm(test_data)
    times.append(time.perf_counter() - start)

median_time = np.median(times)
```

### Statistical Significance

Report median (robust to outliers) and include:
- Minimum time (best case)
- Maximum time (worst case)  
- Standard deviation (consistency)

### Fair Comparisons

When comparing algorithms:
- Use same hardware
- Use same input data
- Run sufficient repetitions
- Compare at multiple problem sizes

---

## Complexity of Common Operations

### Linear Algebra Operations

| Operation | Dense | Sparse (nnz non-zeros) |
|-----------|-------|------------------------|
| Vector add | O(n) | O(n) |
| Dot product | O(n) | O(n) |
| Matrix-vector | O(n²) | O(nnz) |
| Matrix-matrix | O(n³) | O(n·nnz) or less |
| LU factorization | O(n³) | O(n·fill²) |
| Cholesky | O(n³/3) | O(n·fill²) |
| Eigenvalues | O(n³) | O(k·nnz) for k eigenpairs |

### Circuit Operations

| Operation | Complexity |
|-----------|------------|
| Nodal analysis setup | O(n + m) |
| Modified nodal analysis | O(n + m) |
| DC operating point | O(k·n·fill²) for k Newton steps |
| AC analysis (one freq) | O(n·fill²) |
| AC sweep (F freqs) | O(n·fill² + F·n·fill) |
| Transient (T steps) | O(n·fill² + T·n·fill) |

---

## Summary: Engineering Guidelines

| Problem Size | Recommended Approach |
|--------------|---------------------|
| n < 100 | Any method works |
| 100 < n < 1,000 | Dense usually okay |
| 1,000 < n < 10,000 | Sparse essential |
| n > 10,000 | Sparse + ordering + possibly iterative |
| n > 100,000 | Hierarchical and/or parallel |

> **Engineering Rule**: Always prototype with small circuits, then extrapolate using complexity analysis before committing to full-scale simulation.
