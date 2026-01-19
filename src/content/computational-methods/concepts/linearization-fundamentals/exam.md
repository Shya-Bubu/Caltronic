# Linearization Fundamentals - Exam Guide

## Question Types

### Type 1: Compute Linearization
**"Linearize f(x) around x = a"** or **"Find the tangent line"**

### Type 2: Compute Jacobian
**"Find the Jacobian matrix of f at point (a,b)"**

### Type 3: Small-Signal Parameters
**"Find gm, rπ, rd at given operating point"**

### Type 4: Stability Analysis  
**"Determine stability from Jacobian eigenvalues"**

### Type 5: State-Space Linearization
**"Linearize the system around equilibrium"**

---

## Pattern Recognition

### Recognize Common Linearizations

| Function | Linear approximation near x=0 |
|----------|------------------------------|
| $e^x$ | $1 + x$ |
| $\sin(x)$ | $x$ |
| $\cos(x)$ | $1$ |
| $\ln(1+x)$ | $x$ |
| $(1+x)^n$ | $1 + nx$ |
| $\sqrt{1+x}$ | $1 + x/2$ |

### Small-Signal Formulas

| Device | Parameter | Formula |
|--------|-----------|---------|
| Diode | $g_d$ | $I_Q/V_T$ |
| Diode | $r_d$ | $V_T/I_Q$ |
| BJT | $g_m$ | $I_C/V_T$ |
| BJT | $r_\pi$ | $\beta/g_m$ |
| MOSFET | $g_m$ | $2I_D/(V_{GS}-V_{th})$ |

---

## Step-by-Step Procedures

### Linearizing a Single-Variable Function

1. Identify function f(x) and point a
2. Compute f(a)
3. Compute f'(x), then evaluate f'(a)
4. Write: $L(x) = f(a) + f'(a)(x - a)$

### Computing a Jacobian

1. Identify all component functions $f_1, f_2, ...$
2. Identify all variables $x_1, x_2, ...$
3. Compute each partial: $J_{ij} = \partial f_i / \partial x_j$
4. Assemble into matrix
5. Evaluate at given point

### Stability from Eigenvalues

1. Find Jacobian at equilibrium
2. Compute $\det(\mathbf{A} - \lambda \mathbf{I}) = 0$
3. Solve for eigenvalues λ
4. Check: All Re(λ) < 0? → Stable

---

## Worked Examples

### Example 1: Basic Linearization [6 marks]

**Q**: Linearize $f(x) = e^{2x}$ around $x = 0$.

**Solution**:

**Step 1**: $f(0) = e^0 = 1$

**Step 2**: $f'(x) = 2e^{2x}$, so $f'(0) = 2$

**Step 3**: Linear approximation:
$$L(x) = 1 + 2(x - 0) = 1 + 2x$$

**Verification**: $f(0.1) = e^{0.2} = 1.221$, $L(0.1) = 1.2$ (1.7% error) ✓

---

### Example 2: Jacobian Computation [10 marks]

**Q**: Find the Jacobian of $\mathbf{f}(x,y) = \begin{bmatrix} x^2y \\ x + y^3 \end{bmatrix}$ at $(1, 2)$.

**Solution**:

$$J_{11} = \frac{\partial(x^2y)}{\partial x} = 2xy \quad \Rightarrow \quad J_{11}|_{(1,2)} = 4$$

$$J_{12} = \frac{\partial(x^2y)}{\partial y} = x^2 \quad \Rightarrow \quad J_{12}|_{(1,2)} = 1$$

$$J_{21} = \frac{\partial(x + y^3)}{\partial x} = 1 \quad \Rightarrow \quad J_{21}|_{(1,2)} = 1$$

$$J_{22} = \frac{\partial(x + y^3)}{\partial y} = 3y^2 \quad \Rightarrow \quad J_{22}|_{(1,2)} = 12$$

$$\mathbf{J}|_{(1,2)} = \begin{bmatrix} 4 & 1 \\ 1 & 12 \end{bmatrix}$$

---

### Example 3: Diode Small-Signal [8 marks]

**Q**: A diode operates at $I_D = 2$ mA. Find the small-signal resistance. ($V_T = 26$ mV)

**Solution**:

The diode equation: $i_D = I_S(e^{v_D/V_T} - 1)$

**Small-signal conductance** (derivative at operating point):
$$g_d = \frac{di_D}{dv_D}\bigg|_{I_Q} = \frac{I_S}{V_T}e^{V_Q/V_T} \approx \frac{I_Q}{V_T}$$

$$g_d = \frac{2 \text{ mA}}{26 \text{ mV}} = 76.9 \text{ mS}$$

**Small-signal resistance**:
$$r_d = \frac{1}{g_d} = \frac{26 \text{ mV}}{2 \text{ mA}} = 13 \text{ Ω}$$

---

### Example 4: Stability Analysis [12 marks]

**Q**: Determine the stability of the system with Jacobian at equilibrium:
$$\mathbf{A} = \begin{bmatrix} -1 & 2 \\ -1 & -3 \end{bmatrix}$$

**Solution**:

**Characteristic equation**: $\det(\mathbf{A} - \lambda\mathbf{I}) = 0$

$$\det\begin{bmatrix} -1-\lambda & 2 \\ -1 & -3-\lambda \end{bmatrix} = 0$$

$$(-1-\lambda)(-3-\lambda) - (2)(-1) = 0$$

$$\lambda^2 + 4\lambda + 3 + 2 = 0$$

$$\lambda^2 + 4\lambda + 5 = 0$$

**Quadratic formula**:
$$\lambda = \frac{-4 \pm \sqrt{16-20}}{2} = \frac{-4 \pm 2i}{2} = -2 \pm i$$

**Analysis**: Both eigenvalues have Re(λ) = -2 < 0

**Conclusion**: System is **STABLE** (decaying oscillations)

---

### Example 5: State-Space Linearization [15 marks]

**Q**: Linearize the system $\dot{x} = x^2 - y$, $\dot{y} = x - 2y$ around equilibrium.

**Solution**:

**Step 1: Find equilibrium** (set derivatives to zero)
$$x^2 - y = 0 \Rightarrow y = x^2$$
$$x - 2y = 0 \Rightarrow x = 2y$$

Substituting: $x = 2x^2 \Rightarrow x(1-2x) = 0$

Solutions: $(x, y) = (0, 0)$ or $(1/2, 1/4)$

**Step 2: Compute Jacobian**
$$\mathbf{J} = \begin{bmatrix} \partial\dot{x}/\partial x & \partial\dot{x}/\partial y \\ \partial\dot{y}/\partial x & \partial\dot{y}/\partial y \end{bmatrix} = \begin{bmatrix} 2x & -1 \\ 1 & -2 \end{bmatrix}$$

**At (0,0)**: $\mathbf{A} = \begin{bmatrix} 0 & -1 \\ 1 & -2 \end{bmatrix}$

**Eigenvalues**: $\lambda^2 + 2\lambda + 1 = 0 \Rightarrow \lambda = -1$ (repeated)

Stable! (Re(λ) < 0)

**At (1/2, 1/4)**: $\mathbf{A} = \begin{bmatrix} 1 & -1 \\ 1 & -2 \end{bmatrix}$

$\lambda^2 + \lambda - 1 = 0 \Rightarrow \lambda = \frac{-1 \pm \sqrt{5}}{2}$

$\lambda_1 \approx 0.618 > 0$ → **Unstable!**

---

## Common Mistakes

### Mistake 1: Forgetting to Evaluate at Point
❌ $J = \begin{bmatrix} 2x & 1 \end{bmatrix}$ (still has x!)
✓ $J|_{x=3} = \begin{bmatrix} 6 & 1 \end{bmatrix}$

### Mistake 2: Wrong Linearization Formula
❌ $L(x) = f(a) + f'(x)(x-a)$ (derivative still has x)
✓ $L(x) = f(a) + f'(a)(x-a)$ (everything evaluated at a)

### Mistake 3: Wrong Jacobian Dimensions
Jacobian is (outputs) × (inputs), not the other way!

### Mistake 4: Forgetting Complex Eigenvalues
When discriminant is negative, eigenvalues are complex!
Check the **real part** for stability.

---

## Quick Reference

### Linearization
$$f(x) \approx f(a) + f'(a)(x-a)$$

### Jacobian
$$J_{ij} = \frac{\partial f_i}{\partial x_j}$$

### Stability
- All Re(λ) < 0 → Stable
- Any Re(λ) > 0 → Unstable

### Small-Signal Rules
- $g_d = I_Q/V_T$ (diode)
- $g_m = I_C/V_T$ (BJT)
- $r_d = V_T/I_Q$ ≈ 26Ω at 1mA

---

## Time Allocation

| Question Type | Suggested Time |
|---------------|----------------|
| Basic linearization | 5-7 min |
| Jacobian computation | 8-10 min |
| Small-signal parameters | 5-8 min |
| Eigenvalue stability | 10-12 min |
| Full state-space | 12-15 min |
