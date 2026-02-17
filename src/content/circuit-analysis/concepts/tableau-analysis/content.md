# Tableau Analysis for Circuit Equations

## Prerequisites

Before diving into tableau analysis, ensure you are comfortable with:

- **Nodal analysis** — writing KCL equations using node voltages (Concept 1)
- **Incidence matrix A** — the (n−1) × b matrix encoding the circuit graph topology
- **KCL and KVL** — Kirchhoff's current and voltage laws in matrix form
- **Branch constitutive relations** — Ohm's law and ideal source models

> **Bridge from Concept 1:** In the previous concept we saw how nodal analysis elegantly reduces a circuit to (n−1) node-voltage unknowns. But we also hit a wall: what happens when the circuit contains an ideal voltage source, an ideal transformer, or a current-controlled voltage source? Nodal analysis either requires awkward workarounds (super-nodes, source transformations) or simply cannot handle these elements at all. Tableau analysis resolves every one of these limitations by writing *all* circuit equations — KCL, KVL, and branch relations — simultaneously.

---

## 1 · Why Nodal Analysis Falls Short

Nodal analysis works beautifully for resistive networks driven by current sources. However, three common circuit elements expose its limitations:

| Element | Problem with Nodal Analysis |
|---|---|
| **Ideal voltage source** | Imposes a constraint $v_k = V_s$ but no explicit current-voltage relationship of the form $i = f(v)$ |
| **Ideal transformer** | Couples two branches via $v_1 / v_2 = n$ and $i_1 \cdot n + i_2 = 0$; cannot be expressed as a single admittance |
| **Dependent sources** (CCCS, CCVS, VCVS, VCCS) | Controlling variable may be a *branch current*, which is not a node-voltage quantity |

> **Key insight:** Nodal analysis only tracks node voltages. Whenever a circuit element's behaviour depends on a branch current, we need that current as an explicit variable — and that is exactly what tableau analysis provides.

[VISUAL: vis-tableau-nodal-vs-tableau]

---

## 2 · The Tableau Idea — Write Everything Down

Consider a circuit with **b branches** and **n nodes** (one chosen as datum, leaving **n − 1** independent nodes).

Tableau analysis introduces **three sets of unknowns** and **three sets of equations**:

| Set | Unknowns | Equations | Count |
|---|---|---|---|
| Branch voltages | $v_b = [v_1, v_2, \ldots, v_b]^T$ | KVL | b |
| Branch currents | $i_b = [i_1, i_2, \ldots, i_b]^T$ | KCL | n − 1 |
| Node voltages | $e = [e_1, e_2, \ldots, e_{n-1}]^T$ | Branch equations | b |

**Total unknowns:** $2b + (n - 1)$
**Total equations:** $b + (n - 1) + b = 2b + (n - 1)$ ✓

The system is *square* — the same number of equations as unknowns.

<!-- PAUSE: Count the unknowns and equations yourself for a simple 3-branch, 3-node (2 independent) circuit. You should get 2(3) + 2 = 8 unknowns and 8 equations. -->

[VISUAL: vis-tableau-equation-structure]

---

## 3 · The Three Equation Sets in Detail

### 3.1 KCL — Kirchhoff's Current Law

Using the reduced incidence matrix $\mathbf{A}$ (size $(n-1) \times b$):

$$\mathbf{A} \cdot \mathbf{i}_b = \mathbf{0}$$

Each row corresponds to one independent node; each column corresponds to one branch. The entries are $+1$ (current leaves node), $-1$ (current enters node), or $0$ (branch not incident).

This gives **(n − 1) equations**.

### 3.2 KVL — Kirchhoff's Voltage Law

Every branch voltage can be expressed as the difference of its terminal node voltages:

$$\mathbf{v}_b - \mathbf{A}^T \cdot \mathbf{e} = \mathbf{0}$$

This gives **b equations** — one per branch.

> Recall from Concept 1: $\mathbf{A}^T$ maps node voltages to branch voltages. The equation above states that the branch voltage $v_k$ *must equal* the potential difference across its terminals.

### 3.3 Branch Constitutive Equations

Each branch contributes one equation relating its own voltage and current. For **linear** elements:

| Element | Branch equation |
|---|---|
| Resistor ($R_k$) | $v_k - R_k \, i_k = 0$ |
| Independent voltage source ($V_s$) | $v_k = V_s$ (current $i_k$ free) |
| Independent current source ($I_s$) | $i_k = I_s$ (voltage $v_k$ free) |
| VCVS (gain $\mu$, controlling branch $j$) | $v_k - \mu \, v_j = 0$ |
| CCVS (gain $r$, controlling branch $j$) | $v_k - r \, i_j = 0$ |
| VCCS (gain $g$, controlling branch $j$) | $i_k - g \, v_j = 0$ |
| CCCS (gain $\beta$, controlling branch $j$) | $i_k - \beta \, i_j = 0$ |
| Ideal transformer (turns ratio $n$, branches $p,s$) | $v_p - n \, v_s = 0$ and $n \, i_p + i_s = 0$ |

This gives **b equations** (one per branch).

[VISUAL: vis-tableau-branch-equations]

<!-- PAUSE: For a CCVS with transresistance r controlling branch 3, write the branch equation relating v_k and i_3. Confirm it matches the table above. -->

---

## 4 · Assembling the Tableau Matrix

Stack the three equation sets into a single matrix equation:

$$\mathbf{T} \cdot \mathbf{x} = \mathbf{u}$$

where the unknown vector is:

$$\mathbf{x} = \begin{bmatrix} \mathbf{v}_b \\ \mathbf{i}_b \\ \mathbf{e} \end{bmatrix} \quad (2b + n - 1) \times 1$$

and the **tableau matrix** $\mathbf{T}$ has block structure:

$$\mathbf{T} = \begin{bmatrix} \mathbf{0} & \mathbf{A} & \mathbf{0} \\ \mathbf{I}_b & \mathbf{0} & -\mathbf{A}^T \\ \mathbf{M}_v & \mathbf{M}_i & \mathbf{0} \end{bmatrix}$$

| Block row | Equation set | Size |
|---|---|---|
| Row 1 | KCL: $\mathbf{A} \, \mathbf{i}_b = 0$ | $(n-1) \times (2b+n-1)$ |
| Row 2 | KVL: $\mathbf{v}_b - \mathbf{A}^T \mathbf{e} = 0$ | $b \times (2b+n-1)$ |
| Row 3 | Branch: $\mathbf{M}_v \mathbf{v}_b + \mathbf{M}_i \mathbf{i}_b = \mathbf{u}_s$ | $b \times (2b+n-1)$ |

Here $\mathbf{M}_v$ and $\mathbf{M}_i$ encode the branch constitutive equations, and $\mathbf{u}_s$ contains the source terms.

The right-hand side vector is:

$$\mathbf{u} = \begin{bmatrix} \mathbf{0} \\ \mathbf{0} \\ \mathbf{u}_s \end{bmatrix}$$

[VISUAL: vis-tableau-matrix-blocks]

---

## 5 · Worked Example — 4-Branch Circuit

Consider the following circuit with **4 branches** and **3 nodes** (nodes 1, 2, and datum 0):

- **Branch 1:** Voltage source $V_s = 10\;\text{V}$ from node 0 to node 1
- **Branch 2:** Resistor $R_2 = 2\;\Omega$ from node 1 to node 2
- **Branch 3:** Resistor $R_3 = 4\;\Omega$ from node 2 to node 0
- **Branch 4:** CCVS with transresistance $r = 3\;\Omega$, controlled by $i_2$ (current through $R_2$), from node 1 to node 0

[VISUAL: vis-tableau-4branch-circuit]

**Step 1 — Identify parameters:**
- $b = 4$ branches, $n = 3$ nodes → $n - 1 = 2$ independent nodes
- Total unknowns: $2(4) + 2 = 10$
- Total equations: $4 + 2 + 4 = 10$ ✓

**Step 2 — Reduced incidence matrix** (rows: nodes 1, 2; columns: branches 1–4):

Assign reference directions: current flows from the positive to the negative terminal within each branch.

- Branch 1 (0 → 1): leaves node 1? No, enters node 1 → col 1 row 1 = −1; not incident to node 2 → col 1 row 2 = 0
- Branch 2 (1 → 2): leaves node 1 → +1; enters node 2 → −1
- Branch 3 (2 → 0): leaves node 2 → +1; no node 1 → 0
- Branch 4 (1 → 0): leaves node 1 → +1; no node 2 → 0

$$\mathbf{A} = \begin{bmatrix} -1 & 1 & 0 & 1 \\ 0 & -1 & 1 & 0 \end{bmatrix}$$

**Step 3 — Branch equations:**

| Branch | Equation | $M_v$ row | $M_i$ row | $u_s$ entry |
|---|---|---|---|---|
| 1 (voltage source) | $v_1 = 10$ | $[1, 0, 0, 0]$ | $[0, 0, 0, 0]$ | 10 |
| 2 (resistor $2\Omega$) | $v_2 - 2 i_2 = 0$ | $[0, 1, 0, 0]$ | $[0, -2, 0, 0]$ | 0 |
| 3 (resistor $4\Omega$) | $v_3 - 4 i_3 = 0$ | $[0, 0, 1, 0]$ | $[0, 0, -4, 0]$ | 0 |
| 4 (CCVS, $r=3$, ctrl by $i_2$) | $v_4 - 3 i_2 = 0$ | $[0, 0, 0, 1]$ | $[0, -3, 0, 0]$ | 0 |

$$\mathbf{M}_v = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad
\mathbf{M}_i = \begin{bmatrix} 0 & 0 & 0 & 0 \\ 0 & -2 & 0 & 0 \\ 0 & 0 & -4 & 0 \\ 0 & -3 & 0 & 0 \end{bmatrix}$$

**Step 4 — Assemble the full 10×10 tableau matrix:**

$$\mathbf{T} = \begin{bmatrix}
0 & 0 & 0 & 0 & -1 & 1 & 0 & 1 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & -1 & 1 & 0 & 0 & 0 \\
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & -1 & 1 \\
0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & -1 \\
0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & -1 & 0 \\
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 & 0 & -2 & 0 & 0 & 0 & 0 \\
0 & 0 & 1 & 0 & 0 & 0 & -4 & 0 & 0 & 0 \\
0 & 0 & 0 & 1 & 0 & -3 & 0 & 0 & 0 & 0
\end{bmatrix}$$

Columns correspond to: $v_1, v_2, v_3, v_4, i_1, i_2, i_3, i_4, e_1, e_2$.

$$\mathbf{u} = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \\ 0 \\ 0 \\ 10 \\ 0 \\ 0 \\ 0 \end{bmatrix}$$

<!-- PAUSE: Verify that row 4 of T correctly encodes the KVL equation v₂ = e₁ − e₂ for branch 2 (from node 1 to node 2). Check that the signs match Aᵀ. -->

**Step 5 — Solve** $\mathbf{T}\mathbf{x} = \mathbf{u}$:

From the branch equations and KVL/KCL, solving the linear system yields:

- From branch 1: $v_1 = 10\;\text{V}$
- KVL branch 1: $v_1 = e_1 - 0 = e_1$ → $e_1 = 10\;\text{V}$
- KCL at node 1: $-i_1 + i_2 + i_4 = 0$
- KCL at node 2: $-i_2 + i_3 = 0$ → $i_3 = i_2$
- KVL branch 2: $v_2 = e_1 - e_2 = 10 - e_2$
- KVL branch 3: $v_3 = e_2$
- Branch 2: $v_2 = 2 i_2$ → $10 - e_2 = 2 i_2$
- Branch 3: $v_3 = 4 i_3 = 4 i_2$ → $e_2 = 4 i_2$
- Substituting: $10 - 4 i_2 = 2 i_2$ → $i_2 = \frac{10}{6} = \frac{5}{3}\;\text{A}$
- KVL branch 4: $v_4 = e_1 = 10\;\text{V}$
- Branch 4 (CCVS): $v_4 = 3 i_2 = 5\;\text{V}$ ... wait — let's recheck.

Actually, KVL for branch 4 (from node 1 to node 0): $v_4 = e_1 - 0 = e_1$. But the CCVS equation says $v_4 = 3 i_2$. So $e_1 = 3 i_2$.

Let us redo with this correction — note that both branch 1 and branch 4 have terminal node 1 and node 0, but they are *different* branches with *different* voltages:

- Branch 1 (voltage source): $v_1 = 10$ and $v_1 = e_1$ → $e_1 = 10\;\text{V}$
- Branch 4 (CCVS): $v_4 = 3 i_2$ and $v_4 = e_1 = 10$ → $i_2 = 10/3\;\text{A}$

But we also have from branches 2 and 3:
- $v_2 = 2 i_2 = 20/3$ and $v_2 = e_1 - e_2 = 10 - e_2$ → $e_2 = 10 - 20/3 = 10/3\;\text{V}$
- $v_3 = 4 i_3$ and $v_3 = e_2 = 10/3$ and $i_3 = i_2 = 10/3$ → $4(10/3) = 40/3 \neq 10/3$

This inconsistency means the CCVS imposes a constraint that conflicts. This is expected — the CCVS *forces* $v_4 = 3i_2$, and the network must satisfy all equations simultaneously. Let's solve the full system properly.

From the equations:
1. $e_1 = 10$ (from branch 1 + KVL)
2. $i_3 = i_2$ (from KCL node 2)
3. $v_2 = e_1 - e_2 = 10 - e_2$, and $v_2 = 2 i_2$
4. $v_3 = e_2$, and $v_3 = 4 i_3 = 4 i_2$
5. $v_4 = e_1 = 10$, and $v_4 = 3 i_2$ → $i_2 = 10/3$

From (4): $e_2 = 4(10/3) = 40/3$
From (3): $10 - 40/3 = 2(10/3)$ → $-10/3 = 20/3$ — contradiction.

The contradiction reveals that this particular CCVS configuration with these values has no consistent solution — the tableau matrix $\mathbf{T}$ is **singular**. This is itself an important lesson: not all circuits have solutions!

**Revised example** — replace branch 4 with a CCCS ($\beta = 2$, controlled by $i_3$):

- Branch 4 (CCCS): $i_4 = 2 i_3$

Now the branch equation row 4 becomes: $i_4 - 2 i_3 = 0$, so $M_v$ row 4 = $[0,0,0,0]$, $M_i$ row 4 = $[0, 0, -2, 1]$.

Solving:
1. $e_1 = 10$
2. $i_3 = i_2$ (KCL node 2)
3. $v_2 = 10 - e_2 = 2 i_2$
4. $v_3 = e_2 = 4 i_3 = 4 i_2$
5. $i_4 = 2 i_3 = 2 i_2$
6. KCL node 1: $-i_1 + i_2 + i_4 = 0$ → $i_1 = i_2 + 2 i_2 = 3 i_2$

From (3) and (4): $10 - 4 i_2 = 2 i_2$ → $i_2 = 5/3\;\text{A}$

**Final solution:**

| Variable | Value |
|---|---|
| $i_2$ | $5/3 \approx 1.667\;\text{A}$ |
| $i_3$ | $5/3\;\text{A}$ |
| $i_4$ | $10/3 \approx 3.333\;\text{A}$ |
| $i_1$ | $5\;\text{A}$ |
| $e_1$ | $10\;\text{V}$ |
| $e_2$ | $20/3 \approx 6.667\;\text{V}$ |
| $v_1$ | $10\;\text{V}$ |
| $v_2$ | $10/3 \approx 3.333\;\text{V}$ |
| $v_3$ | $20/3 \approx 6.667\;\text{V}$ |
| $v_4$ | $10\;\text{V}$ |

[VISUAL: vis-tableau-solved-example]

---

## 6 · Existence and Uniqueness

The linear tableau system $\mathbf{T}\mathbf{x} = \mathbf{u}$ has a **unique solution** if and only if:

$$\det(\mathbf{T}) \neq 0$$

When $\mathbf{T}$ is singular:
- The circuit may have **no solution** (inconsistent constraints, e.g. two voltage sources in parallel with different values)
- The circuit may have **infinitely many solutions** (underdetermined, e.g. a loop of ideal voltage sources summing to zero)

> **Engineering interpretation:** A singular tableau matrix signals a physically unrealisable or under-specified circuit. In practice, parasitic resistances prevent true singularity.

---

## 7 · Advantages of Tableau Analysis over Nodal Analysis

| Feature | Nodal Analysis | Tableau Analysis |
|---|---|---|
| **Variables** | Node voltages only ($n-1$) | All branch voltages, currents, and node voltages ($2b + n - 1$) |
| **System size** | Small ($n-1$) | Larger ($2b + n - 1$) |
| **Voltage sources** | Requires super-node tricks | Natural — just a branch equation |
| **Current sources** | Natural | Natural |
| **Dependent sources** | May require augmented equations | Systematic — one branch equation per source |
| **Ideal transformers** | Cannot handle directly | Two coupled branch equations |
| **Generality** | Limited to admittance-representable elements | Completely general |

> **Trade-off:** Tableau analysis is more general but produces a larger system. In computer-aided circuit simulation (e.g., SPICE), a hybrid called **Modified Nodal Analysis (MNA)** combines the compactness of nodal analysis with the generality of tableau analysis.

[VISUAL: vis-tableau-comparison-table]

---

## 8 · Handling Special Elements

### 8.1 Ideal Voltage Source

Branch equation: $v_k = V_s$. The current $i_k$ is *not* specified by the element — it is determined by the rest of the circuit through KCL/KVL. In tableau analysis this is perfectly fine: we simply write $v_k = V_s$ as the branch equation, and $i_k$ remains an unknown solved by the full system.

### 8.2 Ideal Transformer

An ideal transformer with turns ratio $n$ coupling primary branch $p$ and secondary branch $s$:

$$v_p = n \, v_s \quad \text{and} \quad n \, i_p + i_s = 0$$

This uses **two** branch equation rows — one for each branch. Both branches' constitutive relations are coupled.

### 8.3 Dependent Sources

All four types (VCVS, VCCS, CCVS, CCCS) are handled by placing appropriate coefficients in the $\mathbf{M}_v$ and $\mathbf{M}_i$ rows. The controlling variable — whether a branch voltage or branch current — is always an explicit unknown in $\mathbf{x}$.

---

## 9 · Nonlinear Tableau Equations

When the circuit contains **nonlinear elements** (e.g., diodes, transistors), the branch constitutive equations become nonlinear:

$$f_k(v_k, i_k) = 0$$

For example, a diode: $i_k = I_s(e^{v_k / V_T} - 1)$ → branch equation: $i_k - I_s(e^{v_k/V_T} - 1) = 0$.

The overall nonlinear tableau system is:

$$\mathbf{F}(\mathbf{x}) = \begin{bmatrix} \mathbf{A} \, \mathbf{i}_b \\ \mathbf{v}_b - \mathbf{A}^T \mathbf{e} \\ \mathbf{f}(\mathbf{v}_b, \mathbf{i}_b) \end{bmatrix} = \mathbf{0}$$

> Note: KCL and KVL remain *linear* — only the branch equations become nonlinear.

### Newton-Raphson Iteration

To solve $\mathbf{F}(\mathbf{x}) = \mathbf{0}$, we linearise around a current guess $\mathbf{x}^{(k)}$:

$$\mathbf{J}(\mathbf{x}^{(k)}) \cdot \Delta \mathbf{x} = -\mathbf{F}(\mathbf{x}^{(k)})$$

$$\mathbf{x}^{(k+1)} = \mathbf{x}^{(k)} + \Delta \mathbf{x}$$

where $\mathbf{J}$ is the **Jacobian matrix** of $\mathbf{F}$. For the linear rows (KCL, KVL) the Jacobian rows are constant. Only the branch-equation rows contribute nonlinear Jacobian entries:

$$\frac{\partial f_k}{\partial v_k}, \quad \frac{\partial f_k}{\partial i_k}$$

This is precisely how SPICE solves circuits with diodes and transistors.

[VISUAL: vis-tableau-nonlinear-iteration]

<!-- PAUSE: Think about why KCL and KVL are always linear regardless of the circuit elements. The answer lies in the fact that these are topological laws (graph properties) that do not depend on element physics. -->

---

## 10 · Summary and Connection Forward

**What we established:**
- Tableau analysis writes *all* circuit equations (KCL + KVL + branch) as one system $\mathbf{T}\mathbf{x} = \mathbf{u}$
- It handles voltage sources, transformers, and dependent sources without special cases
- The tableau matrix $\mathbf{T}$ has size $(2b + n - 1) \times (2b + n - 1)$
- Unique solution exists iff $\det(\mathbf{T}) \neq 0$
- Nonlinear elements lead to $\mathbf{F}(\mathbf{x}) = \mathbf{0}$, solved by Newton-Raphson

**Looking ahead:** The tableau system is completely general but large. In the next concept we will see how **Modified Nodal Analysis (MNA)** reduces the system size while retaining tableau's ability to handle all element types — this is the method actually used in SPICE and modern circuit simulators.

[VISUAL: vis-tableau-summary-flowchart]

---

## Notation Reference

| Symbol | Meaning |
|---|---|
| $b$ | Number of branches |
| $n$ | Number of nodes ($n-1$ independent) |
| $\mathbf{A}$ | Reduced incidence matrix, $(n-1) \times b$ |
| $\mathbf{v}_b$ | Branch voltage vector, $b \times 1$ |
| $\mathbf{i}_b$ | Branch current vector, $b \times 1$ |
| $\mathbf{e}$ | Node voltage vector, $(n-1) \times 1$ |
| $\mathbf{T}$ | Tableau matrix, $(2b+n-1) \times (2b+n-1)$ |
| $\mathbf{x}$ | Full unknown vector $[\mathbf{v}_b;\;\mathbf{i}_b;\;\mathbf{e}]$ |
| $\mathbf{M}_v, \mathbf{M}_i$ | Branch equation coefficient matrices |
| $\mathbf{J}$ | Jacobian matrix (nonlinear case) |

[[visual:falstad-full-circuit]]

[[visual:vis-tableau-nodal-vs-tableau]]

[[visual:vis-tableau-equation-structure]]

[[visual:vis-tableau-branch-equations]]

[[visual:vis-tableau-matrix-blocks]]

[[visual:vis-tableau-4branch-circuit]]

[[visual:vis-tableau-solved-example]]

[[visual:vis-tableau-comparison-table]]

[[visual:vis-tableau-nonlinear-iteration]]

[[visual:vis-tableau-summary-flowchart]]

