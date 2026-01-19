# Nodal Analysis - Exam Preparation

## Key Formulas

| Formula | Meaning |
|---------|---------|
| $\sum I_{leaving} = 0$ | KCL at each node |
| $I = (v_a - v_b)/R$ | Current from node a to b |
| $G_{kk} = \sum G_{connected}$ | Diagonal entry |
| $G_{kj} = -G_{between}$ | Off-diagonal entry |
| $\mathbf{Gv} = \mathbf{i}$ | Matrix form |

---

## Step-by-Step Procedure

1. **Draw & Label**: Identify nodes, choose ground
2. **Count Unknowns**: (N-1) node voltages
3. **Handle Sources**: 
   - V-source to GND: v = V (known)
   - Floating V-source: Supernode
   - I-source: Direct in KCL
4. **Write KCL**: One equation per unknown node
5. **Solve**: Substitution or matrix methods
6. **Verify**: Power balance

---

## Worked Examples

### Example 1: Two Unknowns

**Problem**: Find v₁ and v₂.

```
         v₁         v₂
    ┌────○───2Ω────○────┐
    │                   │
   3A↑                 4Ω
    │     ┌───4Ω───┐    │
    └─────┴────────┴────┘
              GND
```

**Solution**:

KCL at v₁:
$$3 = \frac{v_1 - v_2}{2} + \frac{v_1 - 0}{4}$$
$$3 = \frac{v_1}{2} - \frac{v_2}{2} + \frac{v_1}{4}$$
$$3 = \frac{3v_1}{4} - \frac{v_2}{2} \quad ...(1)$$

KCL at v₂:
$$\frac{v_1 - v_2}{2} = \frac{v_2 - 0}{4}$$
$$\frac{v_1 - v_2}{2} = \frac{v_2}{4}$$
$$2(v_1 - v_2) = v_2$$
$$2v_1 = 3v_2$$
$$v_1 = \frac{3v_2}{2} \quad ...(2)$$

Substitute (2) into (1):
$$3 = \frac{3}{4} \cdot \frac{3v_2}{2} - \frac{v_2}{2}$$
$$3 = \frac{9v_2}{8} - \frac{4v_2}{8} = \frac{5v_2}{8}$$
$$v_2 = \frac{24}{5} = 4.8V$$
$$v_1 = \frac{3 \times 4.8}{2} = 7.2V$$

**Answer**: $v_1 = 7.2V$, $v_2 = 4.8V$

---

### Example 2: With Voltage Source to Ground

**Problem**: Find v₂ and the current through the 6V source.

```
         6V         v₂
    ┌───(+)────2Ω────○────┐
    │                      │
   GND                    4Ω
                           │
    ──────────────────────
              GND
```

**Solution**:

Since 6V connects to GND: v₁ = 6V (known!)

KCL at v₂:
$$\frac{v_1 - v_2}{2} = \frac{v_2}{4}$$
$$\frac{6 - v_2}{2} = \frac{v_2}{4}$$
$$2(6 - v_2) = v_2$$
$$12 - 2v_2 = v_2$$
$$v_2 = 4V$$

Current through 2Ω (same as source current):
$$I_s = \frac{6 - 4}{2} = 1A$$

**Answer**: $v_2 = 4V$, $I_{source} = 1A$

---

### Example 3: Supernode

**Problem**: Find v₁ and v₂.

```
        2A→   v₁        v₂
    ○────────○──(+5V)───○────○
    │        │           │    │
    │       2Ω          4Ω   │
    │        │           │    │
    └────────┴───────────┴────┘
                  GND
```

**Solution**:

**Supernode constraint**:
$$v_1 - v_2 = 5 \quad ...(1)$$

**KCL around supernode** (currents in = currents out):
$$2 = \frac{v_1}{2} + \frac{v_2}{4}$$
$$8 = 2v_1 + v_2 \quad ...(2)$$

From (1): $v_1 = v_2 + 5$

Substitute into (2):
$$8 = 2(v_2 + 5) + v_2 = 3v_2 + 10$$
$$v_2 = -\frac{2}{3}V$$
$$v_1 = -\frac{2}{3} + 5 = \frac{13}{3}V \approx 4.33V$$

**Answer**: $v_1 = 4.33V$, $v_2 = -0.67V$

---

### Example 4: Matrix Method

**Problem**: Set up the nodal equations in matrix form.

```
        1A↑  v₁    R=2Ω   v₂   ↓2A
    ┌────────○────/\/\/────○────────┐
    │        │             │        │
    │       4Ω            4Ω       │
    │        │             │        │
    └────────┴─────────────┴────────┘
                   GND
```

**Solution**:

$G_1 = 1/2 = 0.5S$ (between nodes)
$G_2 = 1/4 = 0.25S$ (node 1 to GND)
$G_3 = 1/4 = 0.25S$ (node 2 to GND)

**G matrix**:
$$G_{11} = G_1 + G_2 = 0.5 + 0.25 = 0.75$$
$$G_{22} = G_1 + G_3 = 0.5 + 0.25 = 0.75$$
$$G_{12} = G_{21} = -G_1 = -0.5$$

**Current vector**:
$$i_1 = +1A, \quad i_2 = -2A$$

**System**:
$$\begin{bmatrix} 0.75 & -0.5 \\ -0.5 & 0.75 \end{bmatrix} \begin{bmatrix} v_1 \\ v_2 \end{bmatrix} = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Wrong current direction | Current = (V_high - V_low)/R |
| Forgetting supernode constraint | Always write v_i - v_j = V_source |
| Wrong sign in G matrix | Off-diagonal always negative |
| Counting ground as unknown | Ground is reference, not unknown |

---

## Quick Check Methods

### Power Balance
$$\sum P_{sources} = \sum P_{resistors}$$

### Current at Source Node
Sum of currents leaving through resistors = Source current

---

## Exam Strategy

1. **Simple circuits (2-3 nodes)**: Direct KCL equations
2. **Complex circuits**: Matrix method
3. **Verify**: Always check one node with KCL
4. **Units**: V for voltages, A for currents
