# Exam Practice — Nodal Analysis and the Node-Admittance Matrix

---

## Problem 1: 3-Node Circuit — Forming $Y_n$ and Solving for Node Voltages

### Problem Statement

A resistive circuit has 4 nodes (node 0 is ground, nodes 1–3 are non-reference) and the following elements:

| Element | Connection | Value |
|---------|-----------|-------|
| $R_1$ | node 1 → ground | $R_1 = 2\;\Omega$ ($G_1 = 0.5\;\text{S}$) |
| $R_2$ | node 2 → ground | $R_2 = 4\;\Omega$ ($G_2 = 0.25\;\text{S}$) |
| $R_3$ | node 3 → ground | $R_3 = 5\;\Omega$ ($G_3 = 0.2\;\text{S}$) |
| $R_4$ | node 1 → node 2 | $R_4 = 1\;\Omega$ ($G_4 = 1\;\text{S}$) |
| $R_5$ | node 2 → node 3 | $R_5 = 2\;\Omega$ ($G_5 = 0.5\;\text{S}$) |
| $I_{s1}$ | into node 1 | $5\;\text{A}$ |
| $I_{s2}$ | into node 3 | $3\;\text{A}$ |

No current source is connected to node 2.

**(a)** Form the node-admittance matrix $Y_n$ by inspection.

**(b)** Write the nodal equation $Y_n \mathbf{e} = \mathbf{i}_s$.

**(c)** Solve for $e_1$, $e_2$, and $e_3$.

**(d)** Find the current through $R_4$.

---

### Solution

#### Part (a): Form $Y_n$ by inspection

**Diagonal entries** (sum of conductances at each node):

$$Y_{11} = G_1 + G_4 = 0.5 + 1 = 1.5\;\text{S}$$

$$Y_{22} = G_2 + G_4 + G_5 = 0.25 + 1 + 0.5 = 1.75\;\text{S}$$

$$Y_{33} = G_3 + G_5 = 0.2 + 0.5 = 0.7\;\text{S}$$

**Off-diagonal entries** (negative of conductance between nodes):

$$Y_{12} = Y_{21} = -G_4 = -1\;\text{S}$$

$$Y_{23} = Y_{32} = -G_5 = -0.5\;\text{S}$$

$$Y_{13} = Y_{31} = 0\;\text{S} \quad \text{(no branch between nodes 1 and 3)}$$

$$\boxed{Y_n = \begin{pmatrix} 1.5 & -1 & 0 \\ -1 & 1.75 & -0.5 \\ 0 & -0.5 & 0.7 \end{pmatrix}}$$

#### Part (b): Write the nodal equation

The source current vector has $i_{s1} = 5$ A at node 1, $i_{s2} = 0$ at node 2, and $i_{s3} = 3$ A at node 3:

$$\begin{pmatrix} 1.5 & -1 & 0 \\ -1 & 1.75 & -0.5 \\ 0 & -0.5 & 0.7 \end{pmatrix} \begin{pmatrix} e_1 \\ e_2 \\ e_3 \end{pmatrix} = \begin{pmatrix} 5 \\ 0 \\ 3 \end{pmatrix}$$

#### Part (c): Solve for node voltages

**Step 1** — Compute $\det(Y_n)$:

Expanding along the first row:

$$\det(Y_n) = 1.5\bigl(1.75 \times 0.7 - (-0.5)(-0.5)\bigr) - (-1)\bigl((-1)(0.7) - (-0.5)(0)\bigr) + 0(\cdots)$$

$$= 1.5(1.225 - 0.25) + 1(-0.7 - 0)$$

$$= 1.5(0.975) + (-0.7)$$

$$= 1.4625 - 0.7 = 0.7625$$

**Step 2** — Solve for $e_1$ using Cramer's rule:

$$e_1 = \frac{1}{0.7625}\det\begin{pmatrix} 5 & -1 & 0 \\ 0 & 1.75 & -0.5 \\ 3 & -0.5 & 0.7 \end{pmatrix}$$

Expanding along row 1:

$$= \frac{1}{0.7625}\left[5(1.75 \times 0.7 - (-0.5)(-0.5)) - (-1)(0 \times 0.7 - (-0.5)(3)) + 0\right]$$

$$= \frac{1}{0.7625}\left[5(1.225 - 0.25) + 1(0 + 1.5)\right]$$

$$= \frac{1}{0.7625}\left[5(0.975) + 1.5\right] = \frac{4.875 + 1.5}{0.7625} = \frac{6.375}{0.7625}$$

$$\boxed{e_1 \approx 8.361\;\text{V}}$$

**Step 3** — Solve for $e_2$:

$$e_2 = \frac{1}{0.7625}\det\begin{pmatrix} 1.5 & 5 & 0 \\ -1 & 0 & -0.5 \\ 0 & 3 & 0.7 \end{pmatrix}$$

Expanding along row 1:

$$= \frac{1}{0.7625}\left[1.5(0 \times 0.7 - (-0.5)(3)) - 5((-1)(0.7) - (-0.5)(0)) + 0\right]$$

$$= \frac{1}{0.7625}\left[1.5(0 + 1.5) - 5(-0.7 - 0)\right]$$

$$= \frac{1}{0.7625}\left[2.25 + 3.5\right] = \frac{5.75}{0.7625}$$

$$\boxed{e_2 \approx 7.541\;\text{V}}$$

**Step 4** — Solve for $e_3$:

$$e_3 = \frac{1}{0.7625}\det\begin{pmatrix} 1.5 & -1 & 5 \\ -1 & 1.75 & 0 \\ 0 & -0.5 & 3 \end{pmatrix}$$

Expanding along row 1:

$$= \frac{1}{0.7625}\left[1.5(1.75 \times 3 - 0 \times (-0.5)) - (-1)((-1)(3) - 0 \times 0) + 5((-1)(-0.5) - 1.75 \times 0)\right]$$

$$= \frac{1}{0.7625}\left[1.5(5.25) + 1(-3) + 5(0.5)\right]$$

$$= \frac{1}{0.7625}\left[7.875 - 3 + 2.5\right] = \frac{7.375}{0.7625}$$

$$\boxed{e_3 \approx 9.672\;\text{V}}$$

**Verification** — Check KCL at node 2:

$$-e_1 + 1.75\,e_2 - 0.5\,e_3 = -8.361 + 1.75(7.541) - 0.5(9.672)$$

$$= -8.361 + 13.197 - 4.836 = 0.000 \;\checkmark$$

#### Part (d): Current through $R_4$

$$i_{R_4} = G_4(e_1 - e_2) = 1 \times (8.361 - 7.541) = \boxed{0.820\;\text{A}}$$

(Current flows from node 1 to node 2.)

---

## Problem 2: Incidence Matrix and $Y_n = A Y_b A^\top$ Verification

### Problem Statement

A circuit has 3 nodes (node 0 = ground, nodes 1 and 2) and 3 branches:

| Branch | From | To | Resistance |
|--------|------|----|-----------|
| 1 | node 1 | node 0 | $R_1 = 4\;\Omega$ |
| 2 | node 2 | node 0 | $R_2 = 2\;\Omega$ |
| 3 | node 1 | node 2 | $R_3 = 8\;\Omega$ |

A current source $I_s = 6\;\text{A}$ feeds into node 1.

**(a)** Write the reduced incidence matrix $A$.

**(b)** Write the branch admittance matrix $Y_b$.

**(c)** Compute $Y_n = A \cdot Y_b \cdot A^\top$ and verify it matches the by-inspection result.

**(d)** Solve for $e_1$ and $e_2$.

**(e)** Find the power dissipated in $R_3$.

---

### Solution

#### Part (a): Reduced incidence matrix $A$

With 2 non-reference nodes and 3 branches:

| Branch | From → To | Row 1 (node 1) | Row 2 (node 2) |
|--------|-----------|-----------------|-----------------|
| 1 | 1 → 0 | +1 | 0 |
| 2 | 2 → 0 | 0 | +1 |
| 3 | 1 → 2 | +1 | $-1$ |

$$\boxed{A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \end{pmatrix}}$$

#### Part (b): Branch admittance matrix $Y_b$

$$G_1 = \frac{1}{4} = 0.25\;\text{S}, \quad G_2 = \frac{1}{2} = 0.5\;\text{S}, \quad G_3 = \frac{1}{8} = 0.125\;\text{S}$$

$$\boxed{Y_b = \begin{pmatrix} 0.25 & 0 & 0 \\ 0 & 0.5 & 0 \\ 0 & 0 & 0.125 \end{pmatrix}}$$

#### Part (c): Compute $Y_n = A \cdot Y_b \cdot A^\top$

**Step 1** — $Y_b \cdot A^\top$:

$$A^\top = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & -1 \end{pmatrix}$$

$$Y_b \cdot A^\top = \begin{pmatrix} 0.25 & 0 & 0 \\ 0 & 0.5 & 0 \\ 0 & 0 & 0.125 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & -1 \end{pmatrix} = \begin{pmatrix} 0.25 & 0 \\ 0 & 0.5 \\ 0.125 & -0.125 \end{pmatrix}$$

**Step 2** — $A \cdot (Y_b \cdot A^\top)$:

$$Y_n = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \end{pmatrix}\begin{pmatrix} 0.25 & 0 \\ 0 & 0.5 \\ 0.125 & -0.125 \end{pmatrix} = \begin{pmatrix} 0.25 + 0.125 & 0 - 0.125 \\ 0 - 0.125 & 0.5 + 0.125 \end{pmatrix}$$

$$\boxed{Y_n = \begin{pmatrix} 0.375 & -0.125 \\ -0.125 & 0.625 \end{pmatrix}}$$

**Verification by inspection**:
- $Y_{11} = G_1 + G_3 = 0.25 + 0.125 = 0.375$ ✓
- $Y_{22} = G_2 + G_3 = 0.5 + 0.125 = 0.625$ ✓
- $Y_{12} = -G_3 = -0.125$ ✓

#### Part (d): Solve for node voltages

$$\begin{pmatrix} 0.375 & -0.125 \\ -0.125 & 0.625 \end{pmatrix}\begin{pmatrix} e_1 \\ e_2 \end{pmatrix} = \begin{pmatrix} 6 \\ 0 \end{pmatrix}$$

$$\det(Y_n) = 0.375 \times 0.625 - (-0.125)^2 = 0.234375 - 0.015625 = 0.21875$$

$$e_1 = \frac{\det\begin{pmatrix}6 & -0.125 \\ 0 & 0.625\end{pmatrix}}{0.21875} = \frac{6 \times 0.625 - 0}{0.21875} = \frac{3.75}{0.21875}$$

$$\boxed{e_1 = \frac{120}{7} \approx 17.143\;\text{V}}$$

$$e_2 = \frac{\det\begin{pmatrix}0.375 & 6 \\ -0.125 & 0\end{pmatrix}}{0.21875} = \frac{0 - (-0.75)}{0.21875} = \frac{0.75}{0.21875}$$

$$\boxed{e_2 = \frac{24}{7} \approx 3.429\;\text{V}}$$

**Verification** — KCL at node 1:

$$0.375(17.143) - 0.125(3.429) = 6.429 - 0.429 = 6.000\;\checkmark$$

#### Part (e): Power dissipated in $R_3$

The voltage across $R_3$:

$$v_{R_3} = e_1 - e_2 = 17.143 - 3.429 = 13.714\;\text{V}$$

The current through $R_3$:

$$i_{R_3} = \frac{v_{R_3}}{R_3} = \frac{13.714}{8} = 1.714\;\text{A}$$

The power dissipated:

$$P_{R_3} = v_{R_3} \times i_{R_3} = 13.714 \times 1.714 = \boxed{23.51\;\text{W}}$$

Alternatively: $P = \frac{v^2}{R} = \frac{(13.714)^2}{8} = \frac{188.07}{8} \approx 23.51\;\text{W}$ ✓
