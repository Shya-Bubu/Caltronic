# Mesh Analysis - Exam Preparation

## Key Formulas

| Formula | Meaning |
|---------|---------|
| $\sum V_{loop} = 0$ | KVL for each mesh |
| $V_R = i_{mesh} \cdot R$ | Voltage drop (exclusive branch) |
| $V_R = (i_1 - i_2) \cdot R$ | Voltage drop (shared branch) |
| $R_{kk} = \sum R_{in mesh}$ | Diagonal entry |
| $R_{kj} = -R_{shared}$ | Off-diagonal entry |

---

## Procedure Summary

1. **Verify planar** circuit
2. **Count meshes** M (inner loops)
3. **Assign mesh currents** (clockwise)
4. **Write KVL** for each mesh
5. **Solve** M equations
6. **Find branch currents** from mesh currents

---

## Worked Examples

### Example 1: Two Meshes, Two Sources

**Problem**: Find mesh currents.

```
        2Ω             4Ω
    ┌───/\/\/────┬────/\/\/────┐
    │            │             │
   (+)          6Ω           (+)
   12V           │            6V
   (-)          │            (-)
    │            │             │
    └────────────┴─────────────┘
       i₁ ↻       i₂ ↻
```

**Solution**:

**Mesh 1**:
$$+12 - 2i_1 - 6(i_1 - i_2) = 0$$
$$12 = 8i_1 - 6i_2 \quad ...(1)$$

**Mesh 2**:
$$-6(i_2 - i_1) - 4i_2 - 6 = 0$$
$$-6 = -6i_1 + 10i_2 \quad ...(2)$$

From (2): $i_1 = \frac{10i_2 + 6}{6} = \frac{5i_2 + 3}{3}$

Substitute into (1):
$$12 = 8 \cdot \frac{5i_2 + 3}{3} - 6i_2$$
$$36 = 40i_2 + 24 - 18i_2$$
$$12 = 22i_2$$
$$i_2 = \frac{6}{11} ≈ 0.545A$$
$$i_1 = \frac{5(6/11) + 3}{3} = \frac{30/11 + 33/11}{3} = \frac{63/11}{3} = \frac{21}{11} ≈ 1.91A$$

**Answer**: $i_1 = 1.91A$, $i_2 = 0.545A$

---

### Example 2: Current Source in Mesh

**Problem**: Find mesh currents.

```
        3Ω
    ┌───/\/\/────┐
    │            │
   2A↑          6Ω
    │            │
    └────────────┘
       i₁ ↻
```

**Solution**:

Current source in outer branch sets:
$$i_1 = 2A$$

Done! No equations to solve.

**Answer**: $i_1 = 2A$

---

### Example 3: Supermesh

**Problem**: Find i₁ and i₂.

```
        4Ω             6Ω
    ┌───/\/\/────┬────/\/\/────┐
    │            │             │
   (+)          2A↑          12Ω
   20V           │             │
   (-)          │             │
    │            │             │
    └────────────┴─────────────┘
       i₁ ↻       i₂ ↻
```

**Solution**:

**Constraint** (from 2A source):
$$i_2 - i_1 = 2 \quad ...(1)$$

**Supermesh KVL** (around outside, skip current source):
$$+20 - 4i_1 - 6i_2 - 12i_2 = 0$$
$$20 = 4i_1 + 18i_2 \quad ...(2)$$

From (1): $i_2 = i_1 + 2$

Substitute into (2):
$$20 = 4i_1 + 18(i_1 + 2)$$
$$20 = 22i_1 + 36$$
$$i_1 = \frac{-16}{22} = -\frac{8}{11} ≈ -0.727A$$
$$i_2 = -\frac{8}{11} + 2 = \frac{14}{11} ≈ 1.27A$$

**Answer**: $i_1 = -0.727A$ (counterclockwise), $i_2 = 1.27A$

---

### Example 4: Three Meshes

**Problem**: Set up mesh equations (don't solve).

```
        R₁         R₂         R₃
    ┌───/\/\/───┬───/\/\/───┬───/\/\/───┐
    │           │           │           │
   V₁          R₄          R₅          V₂
    │           │           │           │
    └───────────┴───────────┴───────────┘
       i₁ ↻      i₂ ↻       i₃ ↻
```

**Solution**:

**R Matrix**:
$$\mathbf{R} = \begin{bmatrix} 
R_1 + R_4 & -R_4 & 0 \\
-R_4 & R_2 + R_4 + R_5 & -R_5 \\
0 & -R_5 & R_3 + R_5
\end{bmatrix}$$

**v Vector**:
$$\mathbf{v} = \begin{bmatrix} V_1 \\ 0 \\ -V_2 \end{bmatrix}$$

---

## Common Exam Mistakes

| Mistake | How to Avoid |
|---------|--------------|
| Wrong voltage sign | + when going − to + through source |
| Forgetting shared current | V = (i₁ - i₂)R for shared resistor |
| Wrong supermesh boundary | Go around BOTH meshes |
| Non-planar circuit | Check if wires cross—if so, use nodal |

---

## Quick Formulas

### Branch Current from Mesh Currents

- **Only in mesh k**: $I = i_k$
- **Shared by k and j**: $I = i_k - i_j$ (direction of mesh k)

### Power Verification

$$P_{source} = V \cdot i_{mesh} \text{ (if mesh current goes + to -)}$$
$$P_{resistor} = i_{branch}^2 \cdot R$$

---

## Problem-Solving Strategy

### Given: Circuit Diagram

1. Count meshes: **M meshes → M equations**
2. Current source in branch?
   - Outer branch: $i_{mesh} = I_s$ (known)
   - Shared: Use supermesh
3. Write KVL for each independent mesh
4. Solve system
5. Extract branch currents

### Verification

Check one KVL equation with calculated values—should sum to zero.

---

## Exam Checklist

Before submitting:
- [ ] Circuit is planar (no crossing wires)
- [ ] All mesh currents defined with direction
- [ ] Voltage polarities correctly identified
- [ ] Shared resistances have (i₁ - i₂) term
- [ ] Supermesh used for shared current sources
- [ ] Number of equations = Number of unknowns
- [ ] Units correct (A for currents, V for voltages)
