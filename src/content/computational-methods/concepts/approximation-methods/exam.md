# Approximation Methods - Exam Guide

## Question Types You'll See

### Type 1: Compute Taylor Coefficients
**"Find the first n terms of the Taylor/Maclaurin series for f(x)"**

### Type 2: Error Estimation  
**"Estimate the error when using n terms to approximate f(x₀)"**

### Type 3: Determine Required Terms
**"How many terms are needed to achieve accuracy ε?"**

### Type 4: Convergence Analysis
**"For what values of x does the series converge?"**

### Type 5: Application
**"Use Taylor series to approximate small-signal behavior"**

---

## Pattern Recognition

### Recognize Common Series

| If you see... | Think... |
|---------------|----------|
| $1 + x + x^2/2! + x^3/3! + ...$ | $e^x$ |
| $x - x^3/3! + x^5/5! - ...$ | $\sin(x)$ (odd powers) |
| $1 - x^2/2! + x^4/4! - ...$ | $\cos(x)$ (even powers) |
| $x - x^2/2 + x^3/3 - ...$ | $\ln(1+x)$ |
| $1 + x + x^2 + x^3 + ...$ | $1/(1-x)$ |

### Derivative Patterns

| Function | All derivatives |
|----------|-----------------|
| $e^x$ | $e^x$ (all same) |
| $\sin(x)$ | Cycle: $\sin, \cos, -\sin, -\cos$ |
| $\cos(x)$ | Cycle: $\cos, -\sin, -\cos, \sin$ |
| $\ln(x)$ | $1/x, -1/x^2, 2/x^3, -6/x^4, ...$ |

---

## Exam Strategies

### Strategy 1: Check Your Answer at a Known Point

After finding the series, plug in a value where you know the answer:
- $e^0 = 1$ → series should give 1 at x=0
- $\sin(0) = 0$ → series should give 0 at x=0
- $\sin(\pi/2) = 1$ → use this to verify

### Strategy 2: Use Symmetry

- $\sin(x)$ is odd → only odd powers
- $\cos(x)$ is even → only even powers

If your answer has wrong parity, you made an error!

### Strategy 3: Quick Error Bounds

For alternating series, error ≤ |first omitted term|

For $\sin(x) \approx x - x^3/6$:
Error ≤ $|x^5/120|$

---

## Worked Examples

### Example 1: Finding Series [10 marks typical]

**Q**: Find the Maclaurin series for $f(x) = e^{-x^2}$ up to $x^6$.

**Solution**:

Start with known series: $e^u = 1 + u + u^2/2! + u^3/3! + ...$

Substitute $u = -x^2$:
$$e^{-x^2} = 1 + (-x^2) + \frac{(-x^2)^2}{2!} + \frac{(-x^2)^3}{3!} + ...$$

$$= 1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + ...$$

**Answer**: $e^{-x^2} = 1 - x^2 + \frac{x^4}{2} - \frac{x^6}{6} + O(x^8)$

---

### Example 2: Error Estimation [8 marks typical]

**Q**: Estimate the error when $\cos(0.1)$ is approximated by $1 - x^2/2$.

**Solution**:

The next term is $x^4/4! = x^4/24$.

For alternating series, error ≤ |first omitted term|:

$$|Error| \leq \frac{(0.1)^4}{24} = \frac{0.0001}{24} \approx 4.2 \times 10^{-6}$$

**Alternative using Lagrange remainder**:

$f^{(4)}(x) = \cos(x)$, so $|f^{(4)}(\xi)| \leq 1$

$$|R_3| \leq \frac{1 \cdot (0.1)^4}{4!} = 4.2 \times 10^{-6}$$

---

### Example 3: Required Terms [10 marks typical]

**Q**: How many terms of the Maclaurin series for $e^x$ are needed to compute $e^{0.5}$ with error less than $10^{-6}$?

**Solution**:

The Lagrange remainder for $e^x$:
$$|R_n| = \frac{e^\xi}{(n+1)!}(0.5)^{n+1}$$

where $0 < \xi < 0.5$, so $e^\xi < e^{0.5} < 2$.

Need: $\frac{2 \cdot (0.5)^{n+1}}{(n+1)!} < 10^{-6}$

Test values:
- n=5: $\frac{2 \cdot (0.5)^6}{720} = 4.3 \times 10^{-5}$ ✗
- n=6: $\frac{2 \cdot (0.5)^7}{5040} = 3.1 \times 10^{-6}$ ✗
- n=7: $\frac{2 \cdot (0.5)^8}{40320} = 1.9 \times 10^{-7}$ ✓

**Answer**: 8 terms (n=7 means terms up to $x^7$)

---

### Example 4: Linearization [12 marks typical]

**Q**: The diode current is $i = I_S(e^{v/V_T} - 1)$. Find the small-signal conductance at bias point $V_Q$.

**Solution**:

Linearization gives: $i(v) \approx i(V_Q) + \frac{di}{dv}|_{V_Q}(v - V_Q)$

**Step 1**: Find derivative
$$\frac{di}{dv} = \frac{I_S}{V_T}e^{v/V_T}$$

**Step 2**: Evaluate at $V_Q$
$$g_d = \frac{di}{dv}|_{V_Q} = \frac{I_S}{V_T}e^{V_Q/V_T}$$

**Step 3**: Simplify using $I_Q = I_S(e^{V_Q/V_T} - 1) \approx I_S e^{V_Q/V_T}$ for forward bias

$$g_d = \frac{I_Q + I_S}{V_T} \approx \frac{I_Q}{V_T}$$

**Answer**: Small-signal conductance $g_d = I_Q/V_T$, resistance $r_d = V_T/I_Q$

---

## Common Mistakes to Avoid

### Mistake 1: Forgetting the Factorial
❌ $e^x = 1 + x + x^2 + x^3 + ...$
✓ $e^x = 1 + x + x^2/2! + x^3/3! + ...$

### Mistake 2: Wrong Signs in Alternating Series
Remember: $\sin$ and $\cos$ alternate signs!

### Mistake 3: Using Series Outside Convergence Radius
$\ln(1+x)$ series does NOT work for $x = 2$!

### Mistake 4: Confusing n and n+1 in Error Bounds
Lagrange remainder involves (n+1)th derivative and (n+1)! for n-term approximation.

---

## Time-Saving Tips

1. **Memorize common series** - don't re-derive every time
2. **Use substitution** - $e^{-x^2}$ from $e^u$ with $u = -x^2$
3. **Check dimensional consistency** - all terms should have same units
4. **Sanity check** - $e^0 = 1$, $\sin(0) = 0$, etc.

---

## Mark Scheme Expectations

| Component | Typical Marks |
|-----------|---------------|
| Correct formula/setup | 2-3 |
| Correct derivatives | 2-3 |
| Correct evaluation | 2-3 |
| Error analysis | 2-3 |
| Final answer with units | 1-2 |
