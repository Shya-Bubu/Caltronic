# Section 2 Synthesis: General Resistive Circuit Analysis

## The Big Picture

Section 2 gave you three increasingly powerful tools for analyzing resistive circuits. Each tool builds on the previous one, and together they handle any resistive circuit — linear or nonlinear, with any combination of elements.

## Method Comparison

| Feature | Nodal Analysis | Tableau Analysis | Newton-Raphson |
|---------|---------------|------------------|----------------|
| **Matrix size** | $(n-1) \times (n-1)$ | $(2b+n-1) \times (2b+n-1)$ | Same as underlying method |
| **Voltage sources** | Requires supernode | Natural | Natural |
| **Dependent sources** | Limited | Natural | Natural |
| **Nonlinear elements** | Cannot solve | Cannot solve directly | Iterative solution |
| **Computation** | Small, fast | Large, systematic | Repeated linear solves |

## Key Formulas

### Nodal Analysis
$$\mathbf{Y}_n \cdot \mathbf{e} = \mathbf{i}_s(t)$$

- Diagonal: $Y_{kk} = \sum (\text{conductances at node } k)$
- Off-diagonal: $Y_{kj} = -(\text{conductance between nodes } k \text{ and } j)$
- Incidence matrix: $\mathbf{Y}_n = \mathbf{A} \mathbf{Y}_b \mathbf{A}^\top$

### Tableau Analysis
$$\begin{bmatrix} \mathbf{0} & \mathbf{A} & \mathbf{0} \\ \mathbf{I} & \mathbf{0} & -\mathbf{A}^\top \\ \text{branch} & \text{equations} & \end{bmatrix} \begin{bmatrix} \mathbf{v}_b \\ \mathbf{i}_b \\ \mathbf{e} \end{bmatrix} = \begin{bmatrix} \mathbf{0} \\ \mathbf{0} \\ \mathbf{u} \end{bmatrix}$$

### Newton-Raphson
$$\mathbf{x}^{(j+1)} = \mathbf{x}^{(j)} - \mathbf{J}^{-1}(\mathbf{x}^{(j)}) \cdot \mathbf{f}(\mathbf{x}^{(j)})$$

Jacobian: $J_{ij} = \dfrac{\partial f_i}{\partial x_j}$

Convergence: terminate when $\|\mathbf{f}(\mathbf{x}^{(j)})\| < \varepsilon$

## Critical Exam Skills

1. **Forming $\mathbf{Y}_n$ by inspection**: Practice on 3-4 node circuits until it takes under 30 seconds. Diagonal = sum of connected conductances. Off-diagonal = negative of shared conductance.

2. **Incidence matrix**: Label branches with consistent direction. $a_{ij} = +1$ if branch $j$ leaves node $i$, $-1$ if enters.

3. **Tableau construction**: Write KCL block (using $\mathbf{A}$), KVL block (using $\mathbf{A}^\top$), and branch equations block. For dependent sources, cross-reference the controlling variable.

4. **Newton-Raphson iteration**: Show ALL steps:
   - Evaluate $\mathbf{f}(\mathbf{x}^{(j)})$
   - Compute $\mathbf{J}(\mathbf{x}^{(j)})$
   - Solve $\mathbf{J} \cdot \Delta\mathbf{x} = -\mathbf{f}$ (or compute $\mathbf{J}^{-1}$)
   - Update: $\mathbf{x}^{(j+1)} = \mathbf{x}^{(j)} + \Delta\mathbf{x}$

5. **Discrete equivalent circuit**: At iteration $j$, the nonlinear element becomes a linear resistor $R^{(j)}$ in series with a voltage source $E^{(j)}$, computed from the current iterate.

## Common Pitfalls

- **Reference node omission**: The reference node is NOT included in $\mathbf{Y}_n$ — it has $(n-1)$ rows and columns for $n$ nodes
- **Sign errors in incidence matrix**: Be consistent with branch directions. Once chosen, the same direction applies to $\mathbf{A}$, KVL, and branch equations
- **Forgetting to update the Jacobian**: At each iteration, $\mathbf{J}$ must be recomputed using $\mathbf{x}^{(j)}$, not the initial guess
- **Singular tableau matrix**: If $\det(\mathbf{T}) = 0$, the circuit has no unique solution. This can happen with contradictory sources or floating subcircuits

## Looking Ahead

Section 3 introduces **energy-storage elements** — capacitors and inductors — that turn algebraic circuit equations into **differential equations**. The resistive analysis methods from this section become tools for finding Thévenin equivalents, initial conditions, and steady-state values within dynamic circuits.
