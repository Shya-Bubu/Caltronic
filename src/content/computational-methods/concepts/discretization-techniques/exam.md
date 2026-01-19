# Discretization Techniques - Exam Guide

## Question Types

### Type 1: Derive Finite Difference Formula
**"Derive the central difference formula for f'(x) using Taylor series"**

### Type 2: Apply Finite Differences
**"Approximate f'(1) using forward/central difference with h = 0.1"**

### Type 3: Stability Analysis
**"Determine the stability condition for given method"**

### Type 4: Nyquist/Sampling
**"What sample rate is needed for signal with bandwidth B?"**

### Type 5: Error Order Determination
**"What is the order of accuracy of this scheme?"**

---

## Pattern Recognition

### Recognize Method Orders

| If you see... | Order is... |
|---------------|-------------|
| Forward/Backward Euler | 1 |
| Central difference | 2 |
| Trapezoidal/Crank-Nicolson | 2 |
| RK4 | 4 |
| 5-point stencil | 4 |

### Recognize Stability Requirements

| Method | Stability Condition |
|--------|---------------------|
| Forward Euler | $h < 2/|\lambda_{max}|$ |
| Backward Euler | Always stable (A-stable) |
| FTCS for heat equation | $r = \alpha\Delta t/\Delta x^2 < 1/2$ |

---

## Step-by-Step Problem Solving

### Deriving Finite Differences

**Step 1**: Write Taylor expansions for all points used

**Step 2**: Combine expansions to isolate desired derivative

**Step 3**: Identify truncation error from leftover terms

### Example: Derive central difference for f''(x)

**Taylor expansions**:
$$f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x) + O(h^4)$$
$$f(x-h) = f(x) - hf'(x) + \frac{h^2}{2}f''(x) - \frac{h^3}{6}f'''(x) + O(h^4)$$

**Add them**:
$$f(x+h) + f(x-h) = 2f(x) + h^2 f''(x) + O(h^4)$$

**Solve**:
$$f''(x) = \frac{f(x+h) - 2f(x) + f(x-h)}{h^2} + O(h^2)$$

---

## Worked Examples

### Example 1: Numerical Differentiation [8 marks]

**Q**: Given f(x) = sin(x), compute f'(1) using:
(a) Forward difference with h = 0.1
(b) Central difference with h = 0.1
(c) Compare errors with exact value.

**Solution**:

Exact: f'(1) = cos(1) = 0.5403

**(a) Forward difference**:
$$f'(1) \approx \frac{\sin(1.1) - \sin(1)}{0.1} = \frac{0.8912 - 0.8415}{0.1} = 0.4974$$
Error = |0.5403 - 0.4974| = 0.0429

**(b) Central difference**:
$$f'(1) \approx \frac{\sin(1.1) - \sin(0.9)}{0.2} = \frac{0.8912 - 0.7833}{0.2} = 0.5395$$
Error = |0.5403 - 0.5395| = 0.0008

**(c) Comparison**:
- Forward: 4.3% error (O(h))
- Central: 0.08% error (O(h²))
- Central is ~50× more accurate ✓

---

### Example 2: Stability Analysis [10 marks]

**Q**: For the ODE $y' = -100y$, determine the maximum stable step size for Forward Euler.

**Solution**:

Forward Euler: $y_{n+1} = y_n + h \cdot f(t_n, y_n) = y_n + h(-100y_n) = (1 - 100h)y_n$

**Stability requires**: $|1 - 100h| < 1$

This gives: $-1 < 1 - 100h < 1$

From right inequality: $-100h > -2$ → $h < 0.02$

From left inequality: $1 - 100h > -1$ → $h < 0.02$ (same)

**Answer**: $h < 0.02$ (or $h < 2/|\lambda|$ where $\lambda = -100$)

---

### Example 3: Nyquist Sampling [6 marks]

**Q**: An audio signal contains frequencies up to 18 kHz. 
(a) What is the minimum sampling rate?
(b) If sampled at 40 kHz, what frequencies will be affected by aliasing?

**Solution**:

**(a)** Nyquist: $f_s > 2f_{max} = 2(18) = 36$ kHz minimum

**(b)** Nyquist frequency = 40/2 = 20 kHz

Frequencies > 20 kHz would alias, but signal only goes to 18 kHz.

**No aliasing occurs** because 18 kHz < 20 kHz ✓

---

### Example 4: Heat Equation Stability [12 marks]

**Q**: For the FTCS scheme applied to the heat equation with $\alpha = 0.1$ m²/s, $\Delta x = 0.1$ m, find the maximum stable time step.

**Solution**:

FTCS stability: $r = \frac{\alpha \Delta t}{(\Delta x)^2} \leq \frac{1}{2}$

$$\Delta t \leq \frac{(\Delta x)^2}{2\alpha} = \frac{(0.1)^2}{2(0.1)} = \frac{0.01}{0.2} = 0.05 \text{ s}$$

**Answer**: $\Delta t_{max} = 0.05$ s = 50 ms

---

## Common Exam Mistakes

### Mistake 1: Confusing Local and Global Error Orders
- Local error O(h³) → Global error O(h²)
- They differ by one power of h!

### Mistake 2: Wrong Stability Inequality Direction
For Forward Euler on y' = λy with λ < 0:
❌ $h > 2/|λ|$ (unstable!)
✓ $h < 2/|λ|$ (stable)

### Mistake 3: Nyquist Factor of 2
Minimum rate is $2f_{max}$, not $f_{max}$!

### Mistake 4: Sign Errors in Stencil
Second derivative: $[1, -2, 1]$ (note the -2)
NOT $[1, 2, 1]$

---

## Quick Reference Formulas

### First Derivative
- Forward: $(f_{i+1} - f_i)/h$, O(h)
- Backward: $(f_i - f_{i-1})/h$, O(h)
- Central: $(f_{i+1} - f_{i-1})/(2h)$, O(h²)

### Second Derivative
- Central: $(f_{i+1} - 2f_i + f_{i-1})/h²$, O(h²)

### Euler Methods
- Forward: $y_{n+1} = y_n + hf(t_n, y_n)$
- Backward: $y_{n+1} = y_n + hf(t_{n+1}, y_{n+1})$

### Stability
- Forward Euler: $h < 2/|λ_{max}|$
- FTCS: $r < 1/2$

---

## Time Management

| Question Type | Suggested Time |
|---------------|----------------|
| Finite difference derivation | 8-10 min |
| Numerical calculation | 5-7 min |
| Stability analysis | 8-10 min |
| Nyquist/sampling | 5 min |
| Error order analysis | 5-7 min |
