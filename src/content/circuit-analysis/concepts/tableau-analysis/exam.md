# Tableau Analysis — Exam-Style Problems

---

## Problem 1: Tableau Formulation for a 3-Branch Circuit with a Voltage Source

### Problem Statement

Consider a circuit with **3 nodes** (node 0 is datum) and **3 branches**:

- **Branch 1:** Independent voltage source $V_s = 12\;\text{V}$ from node 0 to node 1 (current reference: into node 1)
- **Branch 2:** Resistor $R_2 = 6\;\Omega$ from node 1 to node 2
- **Branch 3:** Resistor $R_3 = 3\;\Omega$ from node 2 to node 0

**(a)** Write the reduced incidence matrix $\mathbf{A}$.

**(b)** Write the three sets of tableau equations (KCL, KVL, branch).

**(c)** Assemble the full tableau matrix $\mathbf{T}$ and the vectors $\mathbf{x}$ and $\mathbf{u}$.

**(d)** Solve the system to find all branch voltages, branch currents, and node voltages.

---

### Solution

**Parameters:** $b = 3$, $n = 3$, $n - 1 = 2$. System size: $2(3) + 2 = 8$ unknowns and 8 equations.

**Unknown vector:**

$$\mathbf{x} = [v_1,\; v_2,\; v_3,\; i_1,\; i_2,\; i_3,\; e_1,\; e_2]^T$$

---

**(a) Reduced incidence matrix:**

Reference directions: current flows from the higher-numbered node terminal to the lower within each branch's defined orientation.

- Branch 1 (0 → 1): enters node 1 → $a_{1,1} = -1$; not at node 2 → $a_{2,1} = 0$
- Branch 2 (1 → 2): leaves node 1 → $a_{1,2} = +1$; enters node 2 → $a_{2,2} = -1$
- Branch 3 (2 → 0): not at node 1 → $a_{1,3} = 0$; leaves node 2 → $a_{2,3} = +1$

$$\mathbf{A} = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix}$$

---

**(b) Three equation sets:**

**KCL** ($\mathbf{A} \cdot \mathbf{i}_b = 0$, 2 equations):

$$-i_1 + i_2 = 0 \quad \text{(node 1)}$$
$$-i_2 + i_3 = 0 \quad \text{(node 2)}$$

**KVL** ($\mathbf{v}_b - \mathbf{A}^T \mathbf{e} = 0$, 3 equations):

$$\mathbf{A}^T = \begin{bmatrix} -1 & 0 \\ 1 & -1 \\ 0 & 1 \end{bmatrix}$$

$$v_1 - (-e_1) = 0 \;\Rightarrow\; v_1 + e_1 = 0 \quad \text{... wait, let's be careful.}$$

Actually: $v_1 - \mathbf{A}^T_{\text{row 1}} \cdot \mathbf{e} = v_1 - (-1 \cdot e_1 + 0 \cdot e_2) = v_1 + e_1 = 0$

Hmm — this gives $v_1 = -e_1$, but since the voltage source is from node 0 to node 1, we expect $v_1 = e_1$. The sign depends on reference direction. With branch 1 oriented from node 0 to node 1, the incidence matrix entry at node 1 is $-1$ (current entering), so $(\mathbf{A}^T)_{1,1} = -1$. KVL gives:

$$v_1 = \mathbf{A}^T_{\text{row 1}} \cdot \mathbf{e} = -e_1$$

This means $v_1 = -e_1$ with our sign convention. Since $v_1 = V_s = 12$, we get $e_1 = -12$... which would be unusual. Let's redefine branch 1 orientation as from node 1 to node 0 (current leaves node 1):

- Branch 1 (1 → 0): leaves node 1 → $a_{1,1} = +1$; not at node 2 → $a_{2,1} = 0$

$$\mathbf{A} = \begin{bmatrix} 1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix}$$

$$\mathbf{A}^T = \begin{bmatrix} 1 & 0 \\ 1 & -1 \\ 0 & 1 \end{bmatrix}$$

KVL:
- $v_1 = e_1$ ✓ (branch 1 voltage = potential at node 1 minus potential at node 0 = $e_1$)
- $v_2 = e_1 - e_2$
- $v_3 = e_2$

**Branch constitutive equations** (3 equations):

- Branch 1 (voltage source): $v_1 = 12$
- Branch 2 (resistor): $v_2 - 6 i_2 = 0$
- Branch 3 (resistor): $v_3 - 3 i_3 = 0$

**KCL** (with revised $\mathbf{A}$):

- Node 1: $i_1 + i_2 = 0$
- Node 2: $-i_2 + i_3 = 0$

---

**(c) Tableau matrix:**

$$\mathbf{T} = \begin{bmatrix}
0 & 0 & 0 & 1 & 1 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & -1 & 1 & 0 & 0 \\
1 & 0 & 0 & 0 & 0 & 0 & -1 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 & -1 & 1 \\
0 & 0 & 1 & 0 & 0 & 0 & 0 & -1 \\
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 & -6 & 0 & 0 & 0 \\
0 & 0 & 1 & 0 & 0 & -3 & 0 & 0
\end{bmatrix}$$

$$\mathbf{u} = [0,\; 0,\; 0,\; 0,\; 0,\; 12,\; 0,\; 0]^T$$

---

**(d) Solve:**

From the branch and KVL equations:

1. $v_1 = 12$ (branch 1) and $v_1 = e_1$ (KVL) → $e_1 = 12\;\text{V}$
2. KCL node 2: $i_3 = i_2$
3. KCL node 1: $i_1 = -i_2$ (current flows into node 1 through branch 1, so $i_1$ is negative for current leaving node 1)
4. KVL: $v_2 = e_1 - e_2 = 12 - e_2$ and $v_3 = e_2$
5. Branch 2: $v_2 = 6 i_2$ → $12 - e_2 = 6 i_2$
6. Branch 3: $v_3 = 3 i_3 = 3 i_2$ → $e_2 = 3 i_2$
7. Substituting (6) into (5): $12 - 3 i_2 = 6 i_2$ → $i_2 = \frac{12}{9} = \frac{4}{3}\;\text{A}$

**Results:**

| Variable | Value |
|---|---|
| $i_2$ | $4/3 \approx 1.333\;\text{A}$ |
| $i_3$ | $4/3\;\text{A}$ |
| $i_1$ | $-4/3\;\text{A}$ (current flows from node 0 to node 1 through the source) |
| $e_1$ | $12\;\text{V}$ |
| $e_2$ | $4\;\text{V}$ |
| $v_1$ | $12\;\text{V}$ |
| $v_2$ | $8\;\text{V}$ |
| $v_3$ | $4\;\text{V}$ |

**Verification:** Power delivered by source $= V_s \cdot |i_1| = 12 \times 4/3 = 16\;\text{W}$. Power dissipated: $R_2: (4/3)^2 \times 6 = 32/3\;\text{W}$; $R_3: (4/3)^2 \times 3 = 16/3\;\text{W}$. Total dissipated $= 48/3 = 16\;\text{W}$ ✓

---

## Problem 2: Tableau Analysis with a Dependent Source (VCVS)

### Problem Statement

A circuit has **4 nodes** (node 0 is datum, nodes 1, 2, 3) and **5 branches**:

- **Branch 1:** Independent current source $I_s = 2\;\text{A}$ from node 0 to node 1 (current enters node 1)
- **Branch 2:** Resistor $R_2 = 5\;\Omega$ from node 1 to node 2
- **Branch 3:** Resistor $R_3 = 10\;\Omega$ from node 2 to node 0
- **Branch 4:** VCVS with gain $\mu = 3$, controlled by $v_2$ (voltage across branch 2), placed from node 2 to node 3
- **Branch 5:** Resistor $R_5 = 4\;\Omega$ from node 3 to node 0

**(a)** Determine the dimensions of the tableau matrix.

**(b)** Write the branch constitutive equations for all 5 branches.

**(c)** Form the complete tableau system and solve for all node voltages $e_1, e_2, e_3$.

---

### Solution

**Parameters:** $b = 5$, $n = 4$, $n - 1 = 3$. System size: $2(5) + 3 = 13$ unknowns and 13 equations.

---

**(a)** The tableau matrix $\mathbf{T}$ is $13 \times 13$.

- KCL: 3 equations (nodes 1, 2, 3)
- KVL: 5 equations (one per branch)
- Branch: 5 equations

Total: $3 + 5 + 5 = 13$ ✓

---

**(b) Branch constitutive equations:**

| Branch | Element | Equation |
|---|---|---|
| 1 | Current source $I_s = 2$ A | $i_1 = 2$ |
| 2 | Resistor $R_2 = 5\;\Omega$ | $v_2 - 5 i_2 = 0$ |
| 3 | Resistor $R_3 = 10\;\Omega$ | $v_3 - 10 i_3 = 0$ |
| 4 | VCVS, $\mu = 3$, ctrl: $v_2$ | $v_4 - 3 v_2 = 0$ |
| 5 | Resistor $R_5 = 4\;\Omega$ | $v_5 - 4 i_5 = 0$ |

---

**(c) Reduced incidence matrix** (rows: nodes 1, 2, 3; columns: branches 1–5):

Assign branch orientations:
- Branch 1 (0 → 1): enters node 1 → $a_{1,1} = -1$
- Branch 2 (1 → 2): leaves node 1 → $a_{1,2} = +1$; enters node 2 → $a_{2,2} = -1$
- Branch 3 (2 → 0): leaves node 2 → $a_{2,3} = +1$
- Branch 4 (2 → 3): leaves node 2 → $a_{2,4} = +1$; enters node 3 → $a_{3,4} = -1$
- Branch 5 (3 → 0): leaves node 3 → $a_{3,5} = +1$

$$\mathbf{A} = \begin{bmatrix} -1 & 1 & 0 & 0 & 0 \\ 0 & -1 & 1 & 1 & 0 \\ 0 & 0 & 0 & -1 & 1 \end{bmatrix}$$

**KCL:**
- Node 1: $-i_1 + i_2 = 0$ → $i_2 = i_1$
- Node 2: $-i_2 + i_3 + i_4 = 0$
- Node 3: $-i_4 + i_5 = 0$ → $i_5 = i_4$

**KVL** (from $\mathbf{A}^T$):
- $v_1 = -e_1$ → but with branch 1 from node 0 to node 1, redefine: branch 1 oriented as (1 → 0), so $a_{1,1} = +1$:

Let's use consistent orientation. Redefine branch 1 as (1 → 0):

$$\mathbf{A} = \begin{bmatrix} 1 & 1 & 0 & 0 & 0 \\ 0 & -1 & 1 & 1 & 0 \\ 0 & 0 & 0 & -1 & 1 \end{bmatrix}$$

KCL:
- Node 1: $i_1 + i_2 = 0$ → $i_2 = -i_1$

Hmm, this gets messy with current source direction. Let's keep branch 1 as (0→1) with $a_{1,1} = -1$, meaning the current source pushes current into node 1.

With the original $\mathbf{A}$:

$$\mathbf{A}^T = \begin{bmatrix} -1 & 0 & 0 \\ 1 & -1 & 0 \\ 0 & 1 & 0 \\ 0 & 1 & -1 \\ 0 & 0 & 1 \end{bmatrix}$$

KVL:
- $v_1 = -e_1$ (branch 1): With $i_1 = 2$ A flowing from 0 to 1, $v_1$ is the voltage drop in the branch direction (0→1), so $v_1 = e_1 - e_0 = e_1$. The sign convention gives $v_1 = (-1)(e_1) = -e_1$... This is the branch voltage *in the direction of assumed current*. If the source current flows from 0 to 1, then $v_1 = -(e_1 - e_0) = -e_1$. This is the voltage *drop from node 0 to node 1*, which is $-e_1$. OK.

Since the sign conventions can be confusing, let's solve directly from physics:

**Direct solution from circuit equations:**

The current source delivers $I_s = 2$ A into node 1.

KCL node 1: Current in = current out → $I_s = i_2$ → $i_2 = 2\;\text{A}$

Branch 2: $v_2 = R_2 \cdot i_2 = 5 \times 2 = 10\;\text{V}$

KVL: $e_1 - e_2 = v_2 = 10$, so $e_1 = e_2 + 10$

VCVS (branch 4): $v_4 = 3 v_2 = 30\;\text{V}$

KVL: $e_2 - e_3 = v_4 = 30$, so $e_3 = e_2 - 30$

Branch 5: $v_5 = e_3 = R_5 \cdot i_5 = 4 i_5$, so $i_5 = e_3 / 4$

Branch 3: $v_3 = e_2 = R_3 \cdot i_3 = 10 i_3$, so $i_3 = e_2 / 10$

KCL node 3: $i_4 = i_5$ (KCL: $-i_4 + i_5 = 0$)

KCL node 2: $i_2 = i_3 + i_4$ → $2 = e_2/10 + i_4$

We also need $i_5 = e_3 / 4 = (e_2 - 30)/4$, and $i_4 = i_5 = (e_2 - 30)/4$.

From KCL node 2:
$$2 = \frac{e_2}{10} + \frac{e_2 - 30}{4}$$

Multiply through by 20:
$$40 = 2 e_2 + 5(e_2 - 30) = 2 e_2 + 5 e_2 - 150 = 7 e_2 - 150$$

$$7 e_2 = 190 \quad \Rightarrow \quad e_2 = \frac{190}{7} \approx 27.14\;\text{V}$$

$$e_1 = e_2 + 10 = \frac{190}{7} + 10 = \frac{260}{7} \approx 37.14\;\text{V}$$

$$e_3 = e_2 - 30 = \frac{190}{7} - 30 = \frac{190 - 210}{7} = \frac{-20}{7} \approx -2.857\;\text{V}$$

**Remaining variables:**

$$i_3 = \frac{e_2}{10} = \frac{190}{70} = \frac{19}{7} \approx 2.714\;\text{A}$$

Wait — KCL node 1 says $i_2 = 2$ A, but KCL node 2 says $i_2 = i_3 + i_4$, and $i_3 = 19/7 \approx 2.71$ which is already greater than 2. Let me recheck.

Hmm, the issue is that not all current from the current source necessarily goes through branch 2. If node 1 connects only to branches 1 and 2, then yes $i_2 = 2$. But let's verify: node 1 is incident only to branches 1 and 2 in our circuit. Branch 1 (0→1) brings 2 A in, and branch 2 (1→2) carries current out. So $i_2 = 2$ A. ✓

Then: $2 = 19/7 + i_4$ → $i_4 = 2 - 19/7 = (14 - 19)/7 = -5/7\;\text{A}$

$i_5 = i_4 = -5/7\;\text{A}$ (direction: from node 3 to node 0)

Check: $e_3 = 4 i_5 = 4(-5/7) = -20/7$ ✓

**Final results:**

| Variable | Value |
|---|---|
| $e_1$ | $260/7 \approx 37.14\;\text{V}$ |
| $e_2$ | $190/7 \approx 27.14\;\text{V}$ |
| $e_3$ | $-20/7 \approx -2.857\;\text{V}$ |
| $i_1$ | $2\;\text{A}$ (given) |
| $i_2$ | $2\;\text{A}$ |
| $i_3$ | $19/7 \approx 2.714\;\text{A}$ |
| $i_4$ | $-5/7 \approx -0.714\;\text{A}$ |
| $i_5$ | $-5/7 \approx -0.714\;\text{A}$ |
| $v_1$ | $e_1 = 260/7\;\text{V}$ |
| $v_2$ | $10\;\text{V}$ |
| $v_3$ | $190/7 \approx 27.14\;\text{V}$ |
| $v_4$ | $30\;\text{V}$ |
| $v_5$ | $-20/7 \approx -2.857\;\text{V}$ |

**Verification:**

- VCVS: $v_4 = 30 = 3 \times 10 = 3 v_2$ ✓
- KCL node 2: $i_2 = i_3 + i_4$ → $2 = 19/7 + (-5/7) = 14/7 = 2$ ✓
- KCL node 3: $i_5 = i_4 = -5/7$ ✓
- Power: Source delivers $P_s = v_1 \cdot I_s = (260/7)(2) = 520/7 \approx 74.3\;\text{W}$
- Resistor dissipation: $R_2: 5(2)^2 = 20\;\text{W}$; $R_3: 10(19/7)^2 = 10(361/49) = 3610/49\;\text{W}$; $R_5: 4(5/7)^2 = 100/49\;\text{W}$
- VCVS power: $v_4 \cdot i_4 = 30(-5/7) = -150/7\;\text{W}$ (absorbs negative power = delivers power)
- Total: $520/7 = 20 + 3610/49 + 100/49 - 150/7$
  - RHS $= 980/49 + 3610/49 + 100/49 - 1050/49 = 3640/49 = 520/7$ ✓

> **Key takeaway:** The VCVS was handled systematically — just one extra branch equation $v_4 = 3 v_2$. No super-node tricks or special manipulations were required.

---

## Problem 3 (Bonus): Determining Singularity

### Problem Statement

Two ideal voltage sources $V_1 = 5\;\text{V}$ and $V_2 = 8\;\text{V}$ are connected in parallel (both from node 0 to node 1).

**(a)** Set up the tableau equations.

**(b)** Show that the tableau matrix is singular and explain the physical meaning.

### Solution

$b = 2$, $n = 2$, $n - 1 = 1$. System size: $2(2) + 1 = 5$.

$$\mathbf{A} = \begin{bmatrix} -1 & -1 \end{bmatrix}$$

(Both branches go from node 0 to node 1, entering node 1.)

**Equations:**

1. KCL: $-i_1 - i_2 = 0$ → $i_1 + i_2 = 0$
2. KVL branch 1: $v_1 + e_1 = 0$ → $v_1 = -e_1$... (in branch direction 0→1, $v_1 = e_1$, adjusting sign: $v_1 - (-1)(e_1) = v_1 + e_1 = 0$ → $v_1 = -e_1$)

With the convention that $v_k$ is the voltage drop in the direction of the branch:
- Since branch traverses 0→1, $v_1 = e_0 - e_1 = -e_1$

3. KVL branch 2: $v_2 = -e_1$
4. Branch 1: $v_1 = 5$
5. Branch 2: $v_2 = 8$

From equations 2 and 4: $-e_1 = 5$ → $e_1 = -5$
From equations 3 and 5: $-e_1 = 8$ → $e_1 = -8$

**Contradiction:** $e_1$ cannot be both $-5$ and $-8$. The tableau matrix is singular (the system is inconsistent).

**Physical meaning:** Two ideal voltage sources of different values in parallel is a physically impossible circuit — it violates KVL. In practice, internal resistances of real sources prevent this, and current redistributes until a consistent voltage is established.
