# Complexity of Circuit Analysis - Mathematical Framework

## Modified Nodal Analysis (MNA) Complexity

### System Formation

MNA formulates circuit equations as:
$$\begin{bmatrix} G & B \\ C & D \end{bmatrix} \begin{bmatrix} v \\ i \end{bmatrix} = \begin{bmatrix} s_1 \\ s_2 \end{bmatrix}$$

Or compactly: $\mathbf{Ax} = \mathbf{b}$

**Matrix assembly complexity**:
- Resistor stamp: O(1)
- Capacitor stamp: O(1)
- Voltage source: O(1)
- VCCS: O(1)

**Total assembly**: O(m) where m = number of elements

**Sparsity**: Each element affects only its terminal nodes
$$nnz(\mathbf{A}) = O(m) \approx O(n)$$

---

## DC Analysis Complexity

### Linear DC

**Problem**: Solve $\mathbf{Gv} = \mathbf{i}$

| Operation | Dense | Sparse |
|-----------|-------|--------|
| Matrix assembly | O(m) | O(m) |
| LU factorization | O(n³) | O(n · fill²) |
| Solve | O(n²) | O(fill) |
| **Total** | O(n³) | O(n · fill² + fill) |

For circuit matrices with good ordering: fill ≈ O(n^1.2)
$$\text{Sparse total} \approx O(n^{2.4})$$

### Nonlinear DC (Newton-Raphson)

**Problem**: Solve $\mathbf{f}(\mathbf{v}) = \mathbf{0}$

Newton iteration:
$$\mathbf{v}^{(k+1)} = \mathbf{v}^{(k)} - \mathbf{J}^{-1}(\mathbf{v}^{(k)}) \mathbf{f}(\mathbf{v}^{(k)})$$

where $\mathbf{J}$ is the Jacobian: $J_{ij} = \partial f_i / \partial v_j$

**Per iteration**:
| Operation | Complexity |
|-----------|------------|
| Evaluate f | O(m) |
| Evaluate J | O(m) |
| Factor J | O(n · fill²) |
| Solve Jδv = -f | O(fill) |

**Total for k iterations**: O(k · n · fill²)

**Convergence**: Quadratic near solution
$$\|\mathbf{v}^{(k+1)} - \mathbf{v}^*\| \leq C \|\mathbf{v}^{(k)} - \mathbf{v}^*\|^2$$

Typical k = 5-20 iterations

---

## AC Analysis Complexity

### Small-Signal Model

Linearize around DC operating point $\mathbf{v}_0$:
$$(\mathbf{G} + j\omega\mathbf{C})\mathbf{V} = \mathbf{I}$$

where $\mathbf{G}$ and $\mathbf{C}$ are conductance and capacitance matrices evaluated at $\mathbf{v}_0$.

### Single Frequency

| Operation | Complexity |
|-----------|------------|
| Form Y(ω) = G + jωC | O(nnz) |
| LU factorization | O(n · fill²) |
| Solve | O(fill) |

**Note**: Complex arithmetic doubles operation count but doesn't change complexity class.

### Frequency Sweep (F frequencies)

**Method 1: Naive**
$$\text{Cost} = O(F \cdot n \cdot fill^2)$$

**Method 2: Factorization Reuse**
- Same sparsity pattern for all ω
- Symbolic factorization: O(n) once
- Numeric factorization per frequency: O(fill²)
$$\text{Cost} = O(n) + O(F \cdot fill^2)$$

**Method 3: AWE (Asymptotic Waveform Evaluation)**
Compute transfer function moments:
$$\mathbf{m}_k = (-1)^k \mathbf{G}^{-1}(\mathbf{C}\mathbf{G}^{-1})^k \mathbf{I}$$

Then form Padé approximation. Cost: O(q · n · fill²) for q moments
Valid for many frequencies with q << F typical.

---

## Transient Analysis Complexity

### Numerical Integration

Convert $\mathbf{C}\frac{d\mathbf{v}}{dt} + \mathbf{G}\mathbf{v} = \mathbf{i}(t)$

**Backward Euler** (first order):
$$\left(\frac{\mathbf{C}}{\Delta t} + \mathbf{G}\right)\mathbf{v}_{n+1} = \frac{\mathbf{C}}{\Delta t}\mathbf{v}_n + \mathbf{i}_{n+1}$$

**Trapezoidal** (second order):
$$\left(\frac{2\mathbf{C}}{\Delta t} + \mathbf{G}\right)\mathbf{v}_{n+1} = \left(\frac{2\mathbf{C}}{\Delta t} - \mathbf{G}\right)\mathbf{v}_n + \mathbf{i}_{n+1} + \mathbf{i}_n$$

### Linear Transient (T time steps)

**Case 1: Fixed time step, reuse LU**
- One factorization: O(n · fill²)
- T forward/back subs: O(T · fill)
$$\text{Total} = O(n \cdot fill^2 + T \cdot fill)$$

**Case 2: Variable time step, re-factor each step**
$$\text{Total} = O(T \cdot n \cdot fill^2)$$

**Savings**: For T = 10,000 and fill = n, reuse gives 10,000× speedup!

### Nonlinear Transient

Each time step requires Newton:
$$\text{Total} = O(T \cdot k_{avg} \cdot n \cdot fill^2)$$

where $k_{avg}$ = average Newton iterations per time step (typically 2-5 for well-behaved circuits)

---

## Adaptive Time Stepping

### Local Truncation Error (LTE)

For backward Euler:
$$LTE \approx \frac{\Delta t}{2} \frac{d^2 v}{dt^2}$$

For trapezoidal:
$$LTE \approx \frac{\Delta t^2}{12} \frac{d^3 v}{dt^3}$$

### Time Step Control

Standard formula:
$$\Delta t_{new} = \Delta t_{old} \cdot \left(\frac{\epsilon_{tol}}{LTE}\right)^{1/(p+1)}$$

where p = order of method (1 for BE, 2 for trap)

### Complexity Impact

Let $N_{eff}$ = number of time steps with adaptive stepping
$$N_{eff} \ll \frac{T_{total}}{\Delta t_{min}}$$

Typical savings: 10-100× for circuits with varied time scales.

---

## Condition Number Effects

### Linear System Sensitivity

For $\mathbf{Ax} = \mathbf{b}$:
$$\frac{\|\delta \mathbf{x}\|}{\|\mathbf{x}\|} \leq \kappa(\mathbf{A}) \frac{\|\delta \mathbf{b}\|}{\|\mathbf{b}\|}$$

### Circuit Matrix Condition Number

Typical circuit matrices:
- Resistive networks: κ ≈ 10-1000 (well-conditioned)
- With widely varying element values: κ ≈ 10⁶-10¹² (ill-conditioned)
- Near singular (floating nodes): κ → ∞

### Gmin Stepping

Add small conductance gmin to ground at each node:
$$\mathbf{G}_{eff} = \mathbf{G} + g_{min}\mathbf{I}$$

This bounds condition number: κ ≤ ||G||/gmin

SPICE uses gmin stepping for convergence.

---

## Summary: Complexity Formulas

| Analysis | Linear | Nonlinear |
|----------|--------|-----------|
| DC | O(n · fill²) | O(k · n · fill²) |
| AC (F freq) | O(F · fill²) | N/A |
| Transient (T steps, reuse) | O(n · fill²) + O(T · fill) | O(T · k · n · fill²) |
| Transient (T steps, no reuse) | O(T · n · fill²) | O(T · k · n · fill²) |

**Key parameters**:
- n = number of nodes
- fill = fill-in during factorization ≈ O(n^1.2) with good ordering
- k = Newton iterations ≈ 5-20
- T = time steps ≈ 100-1,000,000
- F = frequency points ≈ 10-1000
