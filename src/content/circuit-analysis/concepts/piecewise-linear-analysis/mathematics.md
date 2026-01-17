# Mathematical Foundations: Piecewise-Linear Analysis

> Formal characterization of PWL functions and synthesis.

---

## Piecewise-Linear Function Definition

A function $f: \mathbb{R} \to \mathbb{R}$ is **piecewise-linear** if the domain can be partitioned into intervals where $f$ is linear.

**Formal:** There exist breakpoints $x_0 < x_1 < \cdots < x_n$ such that on each interval $[x_{k-1}, x_k]$:

$$f(x) = a_k x + b_k$$

for constants $a_k$ (slope) and $b_k$ (intercept).

---

## Concave Resistor (Lecture Page 16)

**Voltage-controlled PWL resistor** with breakpoint voltage $E$ and conductance $G$:

$$i = \begin{cases}
0 & \text{if } v \leq E \\
G(v - E) & \text{if } v > E
\end{cases}$$

**Alternative notation using "positive part" function:**

$$i = G[v - E]^+$$

where $[x]^+ = \max(0, x)$.

**Why "concave"?** The second derivative $\frac{d^2i}{dv^2} \leq 0$ (slopes decrease).

---

## General PWL Synthesis (Lecture Page 19)

For an $(n+1)$-segment voltage-controlled PWL with breakpoints $E_1, E_2, ..., E_n$ and slopes $G_0, G_1, ..., G_n$:

$$i = G_0 v + \sum_{k=1}^{n} (G_k - G_{k-1})[v - E_k]^+$$

**Proof of correctness:**

**Region 1 ($v < E_1$):** All $[v - E_k]^+ = 0$  
→ $i = G_0 v$ ✓

**Region 2 ($E_1 < v < E_2$):** Only $[v - E_1]^+ = v - E_1$  
→ $i = G_0 v + (G_1 - G_0)(v - E_1) = G_1 v - (G_1 - G_0)E_1$ ✓

**Region k ($E_{k-1} < v < E_k$):**  
→ $i = G_0 v + \sum_{j=1}^{k-1} (G_j - G_{j-1})(v - E_j)$  
Simplifying: $i = G_{k-1} v + \text{constant}$ ✓

---

## Circuit Realization

Each term $(G_k - G_{k-1})[v - E_k]^+$ corresponds to:
- One ideal diode
- One voltage source $E_k$
- One resistor $R_k = 1/(G_k - G_{k-1})$

**Total elements for n breakpoints:**
- $n$ ideal diodes
- $n$ voltage sources
- $(n+1)$ resistors (including base $G_0$)

---

## Convex Resistor (Dual)

**Current-controlled PWL** with breakpoint current $I$ and resistance $R$:

$$v = \begin{cases}
0 & \text{if } i \leq I \\
R(i - I) & \text{if } i > I
\end{cases}$$

By duality, the synthesis formula is:

$$v = R_0 i + \sum_{k=1}^{n} (R_k - R_{k-1})[i - I_k]^+$$

---

## Continuity Requirement

For the PWL characteristic to be valid, it must be **continuous** at breakpoints:

At $v = E_k$, the left and right limits must match:

$$G_{k-1} E_k + c_{k-1} = G_k E_k + c_k$$

where $c_k$ are the y-intercepts of each segment.

This ensures no "jump" discontinuities in current.

---

## Summary: Mathematical Rigor

**PWL function:**
- Linear on each interval $[x_{k-1}, x_k]$
- Breakpoints separate regions

**Concave (voltage-controlled):**
- $i = G[v - E]^+$ (single breakpoint)
- General: $i = G_0 v + \sum (G_k - G_{k-1})[v - E_k]^+$

**Synthesis:**
- Each breakpoint → one ideal diode branch
- $(n+1)$ segments → $n$ diodes + $(n+1)$ resistors

**Duality:**
- Convex (current-controlled) is dual of concave
- Swap $v \leftrightarrow i$, $G \leftrightarrow R$
