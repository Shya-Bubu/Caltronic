# Newton-Raphson Method for Nonlinear Circuits — Exam-Style Problems

## Problem 1: Newton-Raphson Iterations on a Two-Resistor Nonlinear Circuit

### Problem Statement

A circuit contains two resistors connected to a 10 A current source at a common node:
- **Branch 1**: Linear resistor with $v_1 = 2i_1$ ($R_1 = 2\;\Omega$)
- **Branch 2**: Nonlinear resistor with $v_2 = 5i_2^3$

Both branches share the same voltage across them (parallel connection), and KCL gives $i_1 + i_2 = 10$.

**(a)** Write the system of equations $f(x) = 0$ with unknowns $x = [i_1,\; i_2]^T$.

**(b)** Compute the Jacobian $J(x)$.

**(c)** Starting from $x^{(0)} = [5,\; 5]^T$, perform **two full Newton-Raphson iterations**. Show all matrix computations.

**(d)** Compute the discrete equivalent circuit parameters $R^{(j)}$ and $E^{(j)}$ for the nonlinear branch at each iteration.

---

### Solution

#### Part (a): System of equations

From KCL: $i_1 + i_2 = 10$

From equal voltages (parallel): $v_1 = v_2 \implies 2i_1 = 5i_2^3$

Define:

$$f_1(i_1, i_2) = i_1 + i_2 - 10 = 0$$

$$f_2(i_1, i_2) = 2i_1 - 5i_2^3 = 0$$

#### Part (b): Jacobian

$$J = \begin{bmatrix} \dfrac{\partial f_1}{\partial i_1} & \dfrac{\partial f_1}{\partial i_2} \\[8pt] \dfrac{\partial f_2}{\partial i_1} & \dfrac{\partial f_2}{\partial i_2} \end{bmatrix} = \begin{bmatrix} 1 & 1 \\[6pt] 2 & -15i_2^2 \end{bmatrix}$$

Note: The entry $-15i_2^2$ comes from $\partial(2i_1 - 5i_2^3)/\partial i_2 = -15i_2^2$ and is the only iteration-dependent entry.

#### Part (c): Newton-Raphson Iterations

**Iteration 0 → 1**: Starting from $x^{(0)} = [5,\; 5]^T$

**Step 1 — Evaluate $f$**:

$$f(x^{(0)}) = \begin{bmatrix} 5 + 5 - 10 \\ 2(5) - 5(5)^3 \end{bmatrix} = \begin{bmatrix} 0 \\ 10 - 625 \end{bmatrix} = \begin{bmatrix} 0 \\ -615 \end{bmatrix}$$

**Step 2 — Evaluate $J$**:

$$J(x^{(0)}) = \begin{bmatrix} 1 & 1 \\ 2 & -15(5)^2 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 2 & -375 \end{bmatrix}$$

**Step 3 — Solve $J \Delta x = -f$**:

$$\begin{bmatrix} 1 & 1 \\ 2 & -375 \end{bmatrix} \begin{bmatrix} \Delta i_1 \\ \Delta i_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 615 \end{bmatrix}$$

From row 1: $\Delta i_1 + \Delta i_2 = 0 \implies \Delta i_1 = -\Delta i_2$

Substitute into row 2: $2(-\Delta i_2) - 375 \Delta i_2 = 615$

$$-377 \Delta i_2 = 615 \implies \Delta i_2 = -\frac{615}{377} \approx -1.6313$$

$$\Delta i_1 = 1.6313$$

**Step 4 — Update**:

$$x^{(1)} = \begin{bmatrix} 5 \\ 5 \end{bmatrix} + \begin{bmatrix} 1.6313 \\ -1.6313 \end{bmatrix} = \begin{bmatrix} 6.6313 \\ 3.3687 \end{bmatrix}$$

**Check**: $i_1 + i_2 = 6.6313 + 3.3687 = 10$ ✓ (KCL preserved)

---

**Iteration 1 → 2**: Starting from $x^{(1)} = [6.6313,\; 3.3687]^T$

**Step 1 — Evaluate $f$**:

$$f_1 = 6.6313 + 3.3687 - 10 = 0$$

$$f_2 = 2(6.6313) - 5(3.3687)^3 = 13.2626 - 5(38.2305) = 13.2626 - 191.1525 = -177.8899$$

$$f(x^{(1)}) = \begin{bmatrix} 0 \\ -177.8899 \end{bmatrix}$$

**Step 2 — Evaluate $J$**:

$$J(x^{(1)}) = \begin{bmatrix} 1 & 1 \\ 2 & -15(3.3687)^2 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 2 & -170.2260 \end{bmatrix}$$

(where $15 \times (3.3687)^2 = 15 \times 11.3481 = 170.2260$)

**Step 3 — Solve $J \Delta x = -f$**:

$$\begin{bmatrix} 1 & 1 \\ 2 & -170.226 \end{bmatrix} \begin{bmatrix} \Delta i_1 \\ \Delta i_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 177.8899 \end{bmatrix}$$

From row 1: $\Delta i_1 = -\Delta i_2$

Row 2: $-2\Delta i_2 - 170.226 \Delta i_2 = 177.8899$

$$-172.226 \Delta i_2 = 177.8899 \implies \Delta i_2 = -1.0329$$

$$\Delta i_1 = 1.0329$$

**Step 4 — Update**:

$$x^{(2)} = \begin{bmatrix} 6.6313 \\ 3.3687 \end{bmatrix} + \begin{bmatrix} 1.0329 \\ -1.0329 \end{bmatrix} = \begin{bmatrix} 7.6642 \\ 2.3358 \end{bmatrix}$$

**Check**: $2(7.6642) = 15.3284$ and $5(2.3358)^3 = 5(12.7359) = 63.68$. The residual $|15.33 - 63.68| = 48.35$ is still significant — more iterations would be needed. The rapid decrease in corrections demonstrates convergence is progressing.

#### Part (d): Discrete equivalent parameters

For the nonlinear branch $v_2 = 5i_2^3$:

$$R^{(j)} = \frac{dv_2}{di_2}\bigg|_{i_2^{(j)}} = 15(i_2^{(j)})^2$$

$$E^{(j)} = v_2(i_2^{(j)}) - R^{(j)} \cdot i_2^{(j)} = 5(i_2^{(j)})^3 - 15(i_2^{(j)})^2 \cdot i_2^{(j)} = -10(i_2^{(j)})^3$$

| Iteration | $i_2^{(j)}$ | $R^{(j)} = 15(i_2^{(j)})^2$ | $E^{(j)} = -10(i_2^{(j)})^3$ |
|:---------:|:----------:|:---------------------------:|:----------------------------:|
| 0 | 5 | 375 Ω | −1250 V |
| 1 | 3.3687 | 170.23 Ω | −382.31 V |
| 2 | 2.3358 | 81.84 Ω | −127.36 V |

At each iteration, the nonlinear branch $v_2 = 5i_2^3$ is replaced by a linear resistor $R^{(j)}$ in series with a voltage source $E^{(j)}$, and the resulting linear circuit is solved.

---

## Problem 2: Newton-Raphson with a Diode-Like Nonlinearity

### Problem Statement

A circuit contains a current source $I_s = 6\;\text{A}$, a linear resistor $R = 4\;\Omega$, and a nonlinear resistor with characteristic:

$$i_{NL} = 0.1 v_{NL}^2 \quad (\text{voltage-controlled})$$

The linear resistor and nonlinear resistor are in parallel across the current source.

**(a)** Write the system as a single equation $f(v) = 0$ where $v$ is the common voltage across both elements.

**(b)** Compute the Newton-Raphson update formula for this scalar problem.

**(c)** Starting from $v^{(0)} = 4\;\text{V}$, perform **three iterations**. Show all computations.

**(d)** At each iteration, find the Norton discrete equivalent ($G^{(j)}$, $I^{(j)}$) for the nonlinear element.

**(e)** Verify that the final answer satisfies the original equation to within $10^{-4}$.

---

### Solution

#### Part (a): Equation setup

KCL at the top node (current into node = current out):

$$I_s = \frac{v}{R} + i_{NL} = \frac{v}{4} + 0.1v^2$$

$$f(v) = \frac{v}{4} + 0.1v^2 - 6 = 0$$

or equivalently:

$$f(v) = 0.1v^2 + 0.25v - 6 = 0$$

#### Part (b): Newton-Raphson formula

$$f'(v) = 0.2v + 0.25$$

$$v^{(j+1)} = v^{(j)} - \frac{f(v^{(j)})}{f'(v^{(j)})} = v^{(j)} - \frac{0.1(v^{(j)})^2 + 0.25 v^{(j)} - 6}{0.2 v^{(j)} + 0.25}$$

#### Part (c): Three iterations

**Iteration 0 → 1**: $v^{(0)} = 4\;\text{V}$

$$f(4) = 0.1(16) + 0.25(4) - 6 = 1.6 + 1.0 - 6 = -3.4$$

$$f'(4) = 0.2(4) + 0.25 = 0.8 + 0.25 = 1.05$$

$$v^{(1)} = 4 - \frac{-3.4}{1.05} = 4 + 3.2381 = 7.2381\;\text{V}$$

---

**Iteration 1 → 2**: $v^{(1)} = 7.2381\;\text{V}$

$$f(7.2381) = 0.1(52.3901) + 0.25(7.2381) - 6 = 5.2390 + 1.8095 - 6 = 1.0485$$

$$f'(7.2381) = 0.2(7.2381) + 0.25 = 1.4476 + 0.25 = 1.6976$$

$$v^{(2)} = 7.2381 - \frac{1.0485}{1.6976} = 7.2381 - 0.6176 = 6.6205\;\text{V}$$

---

**Iteration 2 → 3**: $v^{(2)} = 6.6205\;\text{V}$

$$f(6.6205) = 0.1(43.8310) + 0.25(6.6205) - 6 = 4.3831 + 1.6551 - 6 = 0.0382$$

$$f'(6.6205) = 0.2(6.6205) + 0.25 = 1.3241 + 0.25 = 1.5741$$

$$v^{(3)} = 6.6205 - \frac{0.0382}{1.5741} = 6.6205 - 0.0243 = 6.5962\;\text{V}$$

**Summary**:

| $j$ | $v^{(j)}$ (V) | $f(v^{(j)})$ | $f'(v^{(j)})$ |
|:---:|:------------:|:------------:|:--------------:|
| 0 | 4.0000 | −3.4000 | 1.0500 |
| 1 | 7.2381 | 1.0485 | 1.6976 |
| 2 | 6.6205 | 0.0382 | 1.5741 |
| 3 | 6.5962 | ≈ 0.0000 | 1.5692 |

Observe the residual shrinking rapidly: $3.4 \to 1.05 \to 0.038 \to \approx 0$ — characteristic of quadratic convergence.

#### Part (d): Norton discrete equivalent at each iteration

For $i_{NL} = 0.1v^2$ (voltage-controlled):

$$G^{(j)} = \frac{di_{NL}}{dv}\bigg|_{v^{(j)}} = 0.2 v^{(j)}$$

$$I^{(j)} = i_{NL}(v^{(j)}) - G^{(j)} \cdot v^{(j)} = 0.1(v^{(j)})^2 - 0.2(v^{(j)})^2 = -0.1(v^{(j)})^2$$

| $j$ | $v^{(j)}$ | $G^{(j)} = 0.2v^{(j)}$ (S) | $I^{(j)} = -0.1(v^{(j)})^2$ (A) |
|:---:|:---------:|:--------------------------:|:-------------------------------:|
| 0 | 4.0 | 0.8 | −1.6 |
| 1 | 7.2381 | 1.4476 | −5.2390 |
| 2 | 6.6205 | 1.3241 | −4.3831 |

At each iteration, the nonlinear element $i = 0.1v^2$ is replaced by a conductance $G^{(j)}$ in parallel with a current source $I^{(j)}$, forming a Norton equivalent. The resulting linear circuit (current source $I_s = 6\;\text{A}$ in parallel with $R = 4\;\Omega$ and the Norton equivalent) is solved for $v$ to get the next iterate.

#### Part (e): Verification

At $v^{(3)} = 6.5962\;\text{V}$:

$$f(6.5962) = 0.1(6.5962)^2 + 0.25(6.5962) - 6 = 0.1(43.5099) + 1.6491 - 6 = 4.3510 + 1.6491 - 6 = 0.0001$$

Since $|f(v^{(3)})| = 0.0001 < 10^{-4}$, the convergence criterion is satisfied. ✓

**Final answer**: The common voltage across both elements is $v \approx 6.596\;\text{V}$.

Branch currents: $i_R = 6.596/4 = 1.649\;\text{A}$, $i_{NL} = 0.1(6.596)^2 = 4.351\;\text{A}$. Check KCL: $1.649 + 4.351 = 6.000\;\text{A}$ ✓

---

## Problem 3: Multi-Variable Newton-Raphson — Two Nonlinear Branches

### Problem Statement

A circuit has three branches meeting at a single node, driven by a 5 A current source:
- **Branch A**: $v_A = 3i_A$ (linear, $R_A = 3\;\Omega$)
- **Branch B**: $v_B = 2i_B^2$ (current-controlled nonlinear)
- KCL: $i_A + i_B = 5$

All branches share the same node voltage $v$.

**(a)** Write the system $f(x) = 0$ with $x = [i_A,\; i_B]^T$.

**(b)** Compute the Jacobian.

**(c)** Starting from $x^{(0)} = [3,\; 2]^T$, perform **two iterations**.

---

### Solution

#### Part (a): System

From KCL: $f_1 = i_A + i_B - 5 = 0$

From equal voltages: $f_2 = 3i_A - 2i_B^2 = 0$

#### Part (b): Jacobian

$$J = \begin{bmatrix} 1 & 1 \\ 3 & -4i_B \end{bmatrix}$$

#### Part (c): Iterations

**Iteration 0 → 1**: $x^{(0)} = [3,\; 2]^T$

$$f(x^{(0)}) = \begin{bmatrix} 3 + 2 - 5 \\ 3(3) - 2(4) \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

$$J(x^{(0)}) = \begin{bmatrix} 1 & 1 \\ 3 & -8 \end{bmatrix}$$

$$\det J = -8 - 3 = -11$$

$$J^{-1} = \frac{1}{-11}\begin{bmatrix} -8 & -1 \\ -3 & 1 \end{bmatrix}$$

$$\Delta x = -J^{-1} f = -\frac{1}{-11}\begin{bmatrix} -8 & -1 \\ -3 & 1 \end{bmatrix}\begin{bmatrix} 0 \\ 1 \end{bmatrix} = \frac{1}{11}\begin{bmatrix} -1 \\ 1 \end{bmatrix} = \begin{bmatrix} -0.0909 \\ 0.0909 \end{bmatrix}$$

$$x^{(1)} = \begin{bmatrix} 3 \\ 2 \end{bmatrix} + \begin{bmatrix} -0.0909 \\ 0.0909 \end{bmatrix} = \begin{bmatrix} 2.9091 \\ 2.0909 \end{bmatrix}$$

**Check**: KCL: $2.9091 + 2.0909 = 5$ ✓

---

**Iteration 1 → 2**: $x^{(1)} = [2.9091,\; 2.0909]^T$

$$f_1 = 2.9091 + 2.0909 - 5 = 0$$

$$f_2 = 3(2.9091) - 2(2.0909)^2 = 8.7273 - 2(4.3719) = 8.7273 - 8.7438 = -0.0165$$

$$f(x^{(1)}) = \begin{bmatrix} 0 \\ -0.0165 \end{bmatrix}$$

$$J(x^{(1)}) = \begin{bmatrix} 1 & 1 \\ 3 & -4(2.0909) \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 3 & -8.3636 \end{bmatrix}$$

$$\det J = -8.3636 - 3 = -11.3636$$

$$\Delta x = -J^{-1} f = -\frac{1}{-11.3636}\begin{bmatrix} -8.3636 & -1 \\ -3 & 1 \end{bmatrix}\begin{bmatrix} 0 \\ -0.0165 \end{bmatrix}$$

$$= \frac{1}{11.3636}\begin{bmatrix} (-8.3636)(0) + (-1)(-0.0165) \\ (-3)(0) + (1)(-0.0165) \end{bmatrix} = \frac{1}{11.3636}\begin{bmatrix} 0.0165 \\ -0.0165 \end{bmatrix} = \begin{bmatrix} 0.00145 \\ -0.00145 \end{bmatrix}$$

$$x^{(2)} = \begin{bmatrix} 2.9091 \\ 2.0909 \end{bmatrix} + \begin{bmatrix} 0.00145 \\ -0.00145 \end{bmatrix} = \begin{bmatrix} 2.9106 \\ 2.0894 \end{bmatrix}$$

**Verification**: $3(2.9106) = 8.7318$ and $2(2.0894)^2 = 2(4.3656) = 8.7312$. Residual $= 0.0006$ — nearly converged.

The correction dropped from $|\Delta x| \approx 0.091$ to $0.0015$, consistent with quadratic convergence.
