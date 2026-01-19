# Kirchhoff's Laws - Mathematical Framework

## Formal Statements

### Kirchhoff's Current Law (KCL)

For any node n in a circuit:
$$\sum_{k=1}^{m} i_k(t) = 0$$

where $m$ is the number of branches connected to node n, and currents entering are positive, leaving are negative.

### Kirchhoff's Voltage Law (KVL)

For any closed loop in a circuit:
$$\sum_{k=1}^{p} v_k(t) = 0$$

where $p$ is the number of elements in the loop, and voltage rises are positive, drops are negative.

---

## Graph-Theoretic Foundation

### Circuit as a Graph

A circuit can be represented as a graph:
- **Nodes** → Vertices
- **Branches** (elements) → Edges

### Key Graph Properties

| Property | Symbol | Definition |
|----------|--------|------------|
| Nodes | N | Number of vertices |
| Branches | B | Number of edges |
| Trees | T | Connected subgraph with no loops |
| Tree branches | N-1 | Branches in any tree |
| Links | B-N+1 | Branches not in tree |

### Independent Equations

**KCL**: Provides (N-1) independent equations
**KVL**: Provides (B-N+1) independent equations (one per fundamental loop)

**Total**: (N-1) + (B-N+1) = B equations

This matches the B unknown branch currents or voltages!

---

## Matrix Formulation

### Incidence Matrix

Define the **incidence matrix** A (N×B):
$$A_{nk} = \begin{cases} +1 & \text{if branch } k \text{ leaves node } n \\ -1 & \text{if branch } k \text{ enters node } n \\ 0 & \text{if branch } k \text{ not connected to node } n \end{cases}$$

### KCL in Matrix Form

$$\mathbf{A} \cdot \mathbf{i} = \mathbf{0}$$

where $\mathbf{i}$ is the vector of branch currents.

### Loop Matrix

Define the **loop matrix** B (L×B) where L = B-N+1:
$$B_{lk} = \begin{cases} +1 & \text{if branch } k \text{ in loop } l, \text{ same direction} \\ -1 & \text{if branch } k \text{ in loop } l, \text{ opposite direction} \\ 0 & \text{if branch } k \text{ not in loop } l \end{cases}$$

### KVL in Matrix Form

$$\mathbf{B} \cdot \mathbf{v} = \mathbf{0}$$

where $\mathbf{v}$ is the vector of branch voltages.

---

## Mathematical Properties

### Orthogonality

The incidence matrix and loop matrix satisfy:
$$\mathbf{A} \cdot \mathbf{B}^T = \mathbf{0}$$

This reflects the fundamental duality between KCL and KVL.

### Rank

$$\text{rank}(\mathbf{A}) = N - 1$$
$$\text{rank}(\mathbf{B}) = B - N + 1$$

---

## Example: Three-Node Circuit

```
     1      2      3
    (1)───/\/\/───(2)───/\/\/───(3)
     │                           │
     │            4              │
     └─────────/\/\/─────────────┘
           
    Ground at node 1
```

### Incidence Matrix (reduced, excluding reference)

Nodes 2 and 3 (node 1 is reference):

| | Branch 1 | Branch 2 | Branch 3 | Branch 4 |
|-|----------|----------|----------|----------|
|Node 2| -1 | +1 | 0 | 0 |
|Node 3| 0 | -1 | +1 | 0 |

$$\mathbf{A} = \begin{bmatrix} -1 & 1 & 0 & 0 \\ 0 & -1 & 1 & 0 \end{bmatrix}$$

### KCL Equations

$$\mathbf{A} \cdot \mathbf{i} = \mathbf{0}$$

$$\begin{bmatrix} -1 & 1 & 0 & 0 \\ 0 & -1 & 1 & 0 \end{bmatrix} \begin{bmatrix} i_1 \\ i_2 \\ i_3 \\ i_4 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

Gives: $-i_1 + i_2 = 0$ and $-i_2 + i_3 = 0$

---

## Tellegen's Theorem

For any circuit satisfying KCL and KVL:
$$\sum_{k=1}^{B} v_k \cdot i_k = 0$$

**Interpretation**: Total power in any circuit is conserved (power delivered = power absorbed).

### Proof Sketch

From KVL: $\mathbf{v} = \mathbf{B}^T \mathbf{e}$ (branch voltages from loop voltages)
From KCL: $\mathbf{A} \cdot \mathbf{i} = \mathbf{0}$

Using orthogonality: $\mathbf{v}^T \mathbf{i} = \mathbf{e}^T \mathbf{B} \mathbf{i}$

But $\mathbf{i}$ is in the null space of $\mathbf{B}$ (since $\mathbf{A}\mathbf{B}^T = 0$), so $\mathbf{B}\mathbf{i} = 0$.

Therefore: $\sum v_k i_k = 0$ ✓

---

## Solving Circuit Equations

### General Approach

1. **Variables**: B branch currents + B branch voltages = 2B unknowns

2. **Equations**:
   - KCL: (N-1) equations
   - KVL: (B-N+1) equations
   - Element equations: B equations (e.g., V = IR)
   - Total: (N-1) + (B-N+1) + B = 2B equations ✓

3. **Solve**: Linear system (for linear circuits)

### Example: Finding Current

Given: $V_s = 10V$, $R_1 = 2\Omega$, $R_2 = 3\Omega$ in series

**Variables**: $i, v_{R1}, v_{R2}$ (3 unknowns)

**Equations**:
- KVL: $V_s - v_{R1} - v_{R2} = 0$
- Ohm: $v_{R1} = iR_1$
- Ohm: $v_{R2} = iR_2$

**Solution**:
$$V_s = iR_1 + iR_2 = i(R_1 + R_2)$$
$$i = \frac{V_s}{R_1 + R_2} = \frac{10}{2+3} = 2A$$

---

## Summary: Key Formulas

| Concept | Formula |
|---------|---------|
| KCL (node n) | $\sum_{k} i_k = 0$ |
| KVL (loop l) | $\sum_{k} v_k = 0$ |
| KCL matrix | $\mathbf{Ai} = \mathbf{0}$ |
| KVL matrix | $\mathbf{Bv} = \mathbf{0}$ |
| Independent KCL eqs | N - 1 |
| Independent KVL eqs | B - N + 1 |
| Tellegen's theorem | $\sum v_k i_k = 0$ |
