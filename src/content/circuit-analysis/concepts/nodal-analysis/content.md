# Nodal Analysis and the Node-Admittance Matrix

<details>
<summary><strong>Prerequisites — what you need before starting</strong></summary>

- **Ohm's Law**: $v = iR$ and conductance form $i = Gv$ where $G = 1/R$
- **KCL (Kirchhoff's Current Law)**: The algebraic sum of currents leaving any node is zero
- **KVL (Kirchhoff's Voltage Law)**: The algebraic sum of voltages around any closed loop is zero
- **Matrix operations**: Matrix–vector multiplication, determinants, solving $Ax = b$ via Cramer's rule or Gaussian elimination
- **Two-terminal resistor v-i characteristics** (Section 1): Linear and nonlinear resistor models

</details>

---

In Section 1 we studied individual two-terminal elements and their v-i characteristics. But real circuits contain **many elements connected at multiple nodes**. The central question now becomes: *how do we systematically write and solve the equations governing an entire network?* **Nodal analysis** answers this by expressing every branch current in terms of **node voltages**, then applying KCL at each node to produce a compact matrix equation.

---

## 1 · Why Node Voltages?

A circuit with $b$ branches has $2b$ unknowns (one voltage and one current per branch). KCL and KVL together supply $b$ independent equations, and the $b$ element relations (Ohm's law, etc.) supply the remaining $b$. Solving $2b$ simultaneous equations directly is unwieldy.

**Key insight**: if we define voltages at each node relative to a chosen **reference node** (ground), every branch voltage is simply the *difference* of the node voltages at its endpoints:

$$v_k = e_i - e_j$$

where branch $k$ connects node $i$ (positive terminal) to node $j$. This eliminates KVL as a separate step — it is automatically satisfied. We then only need to apply KCL.

> **⏸ Pause**: Consider a circuit with 4 nodes and 6 branches. How many unknowns does the brute-force approach require? How many does nodal analysis require? *(Answer: brute-force needs 12 unknowns; nodal analysis needs only 3 node voltages.)*

---

## 2 · The Node Analysis Procedure

For networks containing **only voltage-controlled resistors and independent current sources**, the procedure is:

1. **Choose a reference node** (ground) — label it node 0.
2. **Assign node voltages** $e_1, e_2, \ldots, e_n$ at the remaining $n$ nodes.
3. **Express each branch current** in terms of the node voltages using the element relation (e.g., $i_k = G_k(e_i - e_j)$).
4. **Write KCL** at each non-reference node: the sum of currents leaving the node equals zero.
5. **Collect terms** to form the matrix equation.

[[visual:nodal-analysis-sample-circuit]]

### 2.1 · Worked Example — 3-Node Circuit

Consider a circuit with 3 non-reference nodes and the following elements:

| Branch | From → To | Conductance |
|--------|-----------|-------------|
| 1 | node 1 → node 0 | $G_1 = 2\;\text{S}$ |
| 2 | node 2 → node 0 | $G_2 = 3\;\text{S}$ |
| 3 | node 3 → node 0 | $G_3 = 1\;\text{S}$ |
| 4 | node 1 → node 2 | $G_4 = 4\;\text{S}$ |
| 5 | node 2 → node 3 | $G_5 = 2\;\text{S}$ |
| 6 | node 1 → node 3 | $G_6 = 1\;\text{S}$ |

Current sources: $i_{s1} = 10\;\text{A}$ into node 1, $i_{s2} = -5\;\text{A}$ into node 2 (i.e., 5 A leaving node 2), $i_{s3} = 3\;\text{A}$ into node 3.

**KCL at node 1:**

$$G_1 e_1 + G_4(e_1 - e_2) + G_6(e_1 - e_3) = i_{s1}$$

$$(G_1 + G_4 + G_6)\,e_1 - G_4\,e_2 - G_6\,e_3 = i_{s1}$$

$$(2 + 4 + 1)\,e_1 - 4\,e_2 - 1\,e_3 = 10$$

$$7e_1 - 4e_2 - e_3 = 10$$

**KCL at node 2:**

$$G_2 e_2 + G_4(e_2 - e_1) + G_5(e_2 - e_3) = i_{s2}$$

$$-G_4\,e_1 + (G_2 + G_4 + G_5)\,e_2 - G_5\,e_3 = i_{s2}$$

$$-4e_1 + 9e_2 - 2e_3 = -5$$

**KCL at node 3:**

$$G_3 e_3 + G_5(e_3 - e_2) + G_6(e_3 - e_1) = i_{s3}$$

$$-G_6\,e_1 - G_5\,e_2 + (G_3 + G_5 + G_6)\,e_3 = i_{s3}$$

$$-e_1 - 2e_2 + 4e_3 = 3$$

> **⏸ Pause**: Before reading on, verify that the diagonal entry for node 2 is $G_2 + G_4 + G_5 = 3 + 4 + 2 = 9\;\text{S}$. Does this match the rule "sum of all conductances connected to that node"?

---

## 3 · The Node-Admittance Matrix $Y_n$

Collecting the equations from Section 2.1 into matrix form:

$$\mathbf{Y}_n \cdot \mathbf{e} = \mathbf{i}_s$$

$$\begin{pmatrix} 7 & -4 & -1 \\ -4 & 9 & -2 \\ -1 & -2 & 4 \end{pmatrix} \begin{pmatrix} e_1 \\ e_2 \\ e_3 \end{pmatrix} = \begin{pmatrix} 10 \\ -5 \\ 3 \end{pmatrix}$$

[[visual:yn-matrix-structure]]

### 3.1 · Formulation by Inspection

For circuits with **resistors and current sources only**, $Y_n$ can be written directly:

| Entry | Rule |
|-------|------|
| **Diagonal** $Y_{kk}$ | Sum of **all** conductances connected to node $k$ |
| **Off-diagonal** $Y_{kj}$ | **Negative** of the conductance between nodes $k$ and $j$ |

**Symmetry property**: For circuits containing only resistors (no dependent sources), the node-admittance matrix is **symmetric**:

$$Y_{kj} = Y_{jk}$$

This is a direct consequence of the reciprocal nature of linear resistors.

### 3.2 · Solving the 3×3 System

Using Cramer's rule or Gaussian elimination on the system above:

**Step 1** — Compute $\det(Y_n)$:

$$\det(Y_n) = 7(9 \cdot 4 - (-2)(-2)) - (-4)((-4)(4) - (-2)(-1)) + (-1)((-4)(-2) - 9(-1))$$

$$= 7(36 - 4) + 4(-16 - 2) - 1(8 + 9)$$

$$= 7(32) + 4(-18) - 17$$

$$= 224 - 72 - 17 = 135$$

Since $\det(Y_n) = 135 \neq 0$, a **unique solution** exists.

**Step 2** — Solve for $e_1$ (Cramer's rule):

$$e_1 = \frac{1}{135}\det\begin{pmatrix} 10 & -4 & -1 \\ -5 & 9 & -2 \\ 3 & -2 & 4 \end{pmatrix}$$

$$= \frac{1}{135}\left[10(36 - 4) + 4(-20 + 6) - 1(10 - 27)\right]$$

$$= \frac{1}{135}\left[320 - 56 + 17\right] = \frac{281}{135} \approx 2.082\;\text{V}$$

**Step 3** — Similarly, $e_2$ and $e_3$:

$$e_2 = \frac{1}{135}\det\begin{pmatrix} 7 & 10 & -1 \\ -4 & -5 & -2 \\ -1 & 3 & 4 \end{pmatrix} = \frac{1}{135}\left[7(-20 + 6) - 10(-16 - 2) - 1(-12 - 5)\right]$$

$$= \frac{1}{135}\left[-98 + 180 + 17\right] = \frac{99}{135} \approx 0.733\;\text{V}$$

$$e_3 = \frac{1}{135}\det\begin{pmatrix} 7 & -4 & 10 \\ -4 & 9 & -5 \\ -1 & -2 & 3 \end{pmatrix} = \frac{1}{135}\left[7(27 - 10) + 4(-12 - 5) + 10(8 + 9)\right]$$

$$= \frac{1}{135}\left[119 - 68 + 170\right] = \frac{221}{135} \approx 1.637\;\text{V}$$

> **⏸ Pause**: Verify one of these solutions by substituting back into the original KCL equation for node 1: $7(2.082) - 4(0.733) - 1(1.637) \approx 14.574 - 2.933 - 1.637 = 10.004 \approx 10$ ✓

---

## 4 · A Simpler 2×2 Example

Consider two non-reference nodes with:
- $G_1 = 5\;\text{S}$ (node 1 to ground), $G_2 = 3\;\text{S}$ (node 2 to ground), $G_3 = 2\;\text{S}$ (node 1 to node 2)
- Current sources: $i_{s1} = 8\;\text{A}$ into node 1, $i_{s2} = 4\;\text{A}$ into node 2

By inspection:

$$Y_n = \begin{pmatrix} G_1 + G_3 & -G_3 \\ -G_3 & G_2 + G_3 \end{pmatrix} = \begin{pmatrix} 7 & -2 \\ -2 & 5 \end{pmatrix}$$

$$\begin{pmatrix} 7 & -2 \\ -2 & 5 \end{pmatrix}\begin{pmatrix} e_1 \\ e_2 \end{pmatrix} = \begin{pmatrix} 8 \\ 4 \end{pmatrix}$$

$$\det(Y_n) = 35 - 4 = 31$$

$$e_1 = \frac{40 + 8}{31} = \frac{48}{31} \approx 1.548\;\text{V}, \quad e_2 = \frac{56 - 8}{31} = \frac{32 + 16}{31} = \frac{48}{31}$$

Wait — let us recompute carefully:

$$e_1 = \frac{\det\begin{pmatrix}8 & -2 \\ 4 & 5\end{pmatrix}}{31} = \frac{40 + 8}{31} = \frac{48}{31} \approx 1.548\;\text{V}$$

$$e_2 = \frac{\det\begin{pmatrix}7 & 8 \\ -2 & 4\end{pmatrix}}{31} = \frac{28 + 16}{31} = \frac{44}{31} \approx 1.419\;\text{V}$$

Verification at node 1: $7(1.548) - 2(1.419) = 10.835 - 2.839 = 7.997 \approx 8$ ✓

[[visual:kcl-at-node]]

---

## 5 · The Reduced Incidence Matrix $A$

For a more rigorous and general formulation, we use **graph theory**. The **reduced incidence matrix** $A$ of a circuit with $(n+1)$ nodes (including ground) and $b$ branches is an $n \times b$ matrix defined by:

$$a_{ij} = \begin{cases} +1 & \text{if branch } j \text{ leaves node } i \\ -1 & \text{if branch } j \text{ enters node } i \\ 0 & \text{if branch } j \text{ is not connected to node } i \end{cases}$$

The reference node (ground) row is **excluded** — hence "reduced."

[[visual:incidence-matrix-mapping]]

### 5.1 · Constructing $A$ Step by Step

Consider the 3-node example from Section 2.1. Assign branch orientations (arrows) from lower-numbered to higher-numbered node (choosing a convention):

| Branch | From | To | $a_{1j}$ | $a_{2j}$ | $a_{3j}$ |
|--------|------|----|-----------|-----------|-----------|
| 1 | 1 | 0 | +1 | 0 | 0 |
| 2 | 2 | 0 | 0 | +1 | 0 |
| 3 | 3 | 0 | 0 | 0 | +1 |
| 4 | 1 | 2 | +1 | $-1$ | 0 |
| 5 | 2 | 3 | 0 | +1 | $-1$ |
| 6 | 1 | 3 | +1 | 0 | $-1$ |

$$A = \begin{pmatrix} 1 & 0 & 0 & 1 & 0 & 1 \\ 0 & 1 & 0 & -1 & 1 & 0 \\ 0 & 0 & 1 & 0 & -1 & -1 \end{pmatrix}$$

### 5.2 · KCL and KVL in Matrix Form

With the incidence matrix, the fundamental circuit laws become elegant matrix equations:

**KCL** (Kirchhoff's Current Law):

$$A \cdot \mathbf{i}_b = \mathbf{0}$$

where $\mathbf{i}_b$ is the vector of branch currents. Each row of $A$ represents one node — multiplying by $\mathbf{i}_b$ sums up currents entering/leaving that node.

**KVL** (Kirchhoff's Voltage Law):

$$\mathbf{v}_b = A^\top \cdot \mathbf{e}$$

where $\mathbf{v}_b$ is the vector of branch voltages and $\mathbf{e}$ is the vector of node voltages. This states that each branch voltage is the difference of the node voltages at its endpoints.

[[visual:kcl-kvl-matrix-form]]

---

## 6 · Deriving $Y_n = A \cdot Y_b \cdot A^\top$

This is the central result connecting graph theory to nodal analysis.

**Branch admittance matrix** $Y_b$: a diagonal $b \times b$ matrix whose $k$-th diagonal entry is the conductance $G_k$ of branch $k$:

$$Y_b = \text{diag}(G_1, G_2, \ldots, G_b)$$

For our example:

$$Y_b = \text{diag}(2, 3, 1, 4, 2, 1)$$

**Derivation**:

1. Branch currents from element relations: $\mathbf{i}_b = Y_b \cdot \mathbf{v}_b$
2. Branch voltages from KVL: $\mathbf{v}_b = A^\top \mathbf{e}$
3. Substitute: $\mathbf{i}_b = Y_b A^\top \mathbf{e}$
4. Apply KCL with sources: $A \cdot \mathbf{i}_b = \mathbf{i}_s$
5. Combine: $A \cdot Y_b \cdot A^\top \cdot \mathbf{e} = \mathbf{i}_s$

Therefore:

$$\boxed{Y_n = A \cdot Y_b \cdot A^\top}$$

[[visual:yn-derivation-flow]]

### 6.1 · Verification

Let us verify by computing $A \cdot Y_b \cdot A^\top$ for our example.

First, $Y_b \cdot A^\top$:

$$Y_b \cdot A^\top = \begin{pmatrix} 2&0&0&0&0&0 \\ 0&3&0&0&0&0 \\ 0&0&1&0&0&0 \\ 0&0&0&4&0&0 \\ 0&0&0&0&2&0 \\ 0&0&0&0&0&1 \end{pmatrix} \begin{pmatrix} 1&0&0 \\ 0&1&0 \\ 0&0&1 \\ 1&-1&0 \\ 0&1&-1 \\ 1&0&-1 \end{pmatrix} = \begin{pmatrix} 2&0&0 \\ 0&3&0 \\ 0&0&1 \\ 4&-4&0 \\ 0&2&-2 \\ 1&0&-1 \end{pmatrix}$$

Then, $A \cdot (Y_b \cdot A^\top)$:

$$Y_n = \begin{pmatrix} 1&0&0&1&0&1 \\ 0&1&0&-1&1&0 \\ 0&0&1&0&-1&-1 \end{pmatrix} \begin{pmatrix} 2&0&0 \\ 0&3&0 \\ 0&0&1 \\ 4&-4&0 \\ 0&2&-2 \\ 1&0&-1 \end{pmatrix}$$

Row 1: $(2+4+1, \; 0-4+0, \; 0+0-1) = (7, -4, -1)$

Row 2: $(0+0-4+0, \; 3+0+4+2, \; 0+0+0-2) = (-4, 9, -2)$

Row 3: $(0+0+0-0-1, \; 0+0+0-2+0, \; 1+0+2+1) = (-1, -2, 4)$

$$Y_n = \begin{pmatrix} 7 & -4 & -1 \\ -4 & 9 & -2 \\ -1 & -2 & 4 \end{pmatrix} \quad \checkmark$$

This matches the matrix we built by inspection — confirming $Y_n = A Y_b A^\top$.

> **⏸ Pause**: Notice that $Y_n$ is symmetric. Why must $A Y_b A^\top$ always be symmetric when $Y_b$ is diagonal with positive entries? *(Hint: $(AY_bA^\top)^\top = A Y_b^\top A^\top = A Y_b A^\top$ since $Y_b$ is symmetric.)*

---

## 7 · Nonlinear Resistive Circuits

When the network contains **nonlinear resistors**, each branch current is a nonlinear function of its branch voltage:

$$\hat{i}_k = \hat{i}_k(v_k)$$

Since $v_k = (A^\top \mathbf{e})_k$, the branch current vector becomes $\hat{\mathbf{i}}(A^\top \mathbf{e})$.

The node equation, incorporating current sources, is:

$$\mathbf{f}(\mathbf{e}) = A \cdot \hat{\mathbf{i}}(A^\top \mathbf{e}) - \mathbf{i}_s = \mathbf{0}$$

**Critical difference**: This is a system of **nonlinear** equations. We **cannot** simply invert a matrix. Instead, we need:

- **Newton–Raphson iteration**: Linearize $\mathbf{f}(\mathbf{e})$ around a guess $\mathbf{e}^{(k)}$ and iteratively refine
- **Fixed-point iteration**: Rearrange into $\mathbf{e} = \mathbf{g}(\mathbf{e})$ form
- **Continuation methods**: Track solutions as a parameter varies

[[visual:nonlinear-extension]]

[[visual:falstad-two-node-circuit]]


---

## 8 · Existence and Uniqueness

### 8.1 · Linear Case

For a linear resistive network, the node equation is:

$$Y_n \mathbf{e} = \mathbf{i}_s$$

A **unique solution** exists if and only if:

$$\det(Y_n) \neq 0$$

For connected networks with all positive conductances, $Y_n$ is always positive definite (hence nonsingular), guaranteeing a unique solution.

### 8.2 · Nonlinear Case

For nonlinear circuits, the situation is more subtle:

- **Existence** is not guaranteed — the nonlinear equation $\mathbf{f}(\mathbf{e}) = \mathbf{0}$ may have **no solution**
- **Uniqueness** is not guaranteed — there may be **multiple solutions** (e.g., bistable circuits, tunnel diode circuits)
- Special classes of nonlinear resistors (e.g., strictly increasing v-i characteristics) do guarantee unique solutions

> **⏸ Pause**: Think about a tunnel diode: its v-i curve is not monotonic (it has a negative resistance region). Can you see intuitively why a circuit containing such an element might have multiple operating points?

---

## 9 · Summary

| Concept | Key Formula |
|---------|-------------|
| Branch voltage from node voltages | $v_k = e_i - e_j$ |
| Formulation by inspection (diagonal) | $Y_{kk} = \sum G_{\text{connected to }k}$ |
| Formulation by inspection (off-diagonal) | $Y_{kj} = -G_{\text{between }k\text{ and }j}$ |
| KCL in matrix form | $A \mathbf{i}_b = \mathbf{0}$ |
| KVL in matrix form | $\mathbf{v}_b = A^\top \mathbf{e}$ |
| Node-admittance matrix | $Y_n = A Y_b A^\top$ |
| Linear circuit solution | $\mathbf{e} = Y_n^{-1} \mathbf{i}_s$ (if $\det Y_n \neq 0$) |
| Nonlinear node equation | $\mathbf{f}(\mathbf{e}) = A \hat{\mathbf{i}}(A^\top \mathbf{e}) - \mathbf{i}_s = \mathbf{0}$ |

> **⏸ Pause**: Close your notes and try to write the formulation-by-inspection rules from memory. Can you state the diagonal and off-diagonal rules without looking?

---

## 10 · What Comes Next

With nodal analysis established, the next concept extends these ideas to **mesh analysis** — the dual approach that uses loop currents instead of node voltages. We will see that mesh analysis produces a similar matrix equation $Z_m \mathbf{j} = \mathbf{v}_s$ where $Z_m$ is the mesh-impedance matrix.
