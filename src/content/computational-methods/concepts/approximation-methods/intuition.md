# Approximation Methods

## The Big Idea
> **Replace hard functions with simple ones that are "close enough" within acceptable error bounds.**

When computers can't evaluate a function exactly (like sin(x), eˣ, or ln(x)), we replace it with something simpler—usually a polynomial. The art is knowing how many terms you need and how much error you introduce.

---

## From Basics: The Polynomial Advantage

From A-Level, you know polynomials are easy to compute:
- Addition, subtraction, multiplication only
- No special functions needed
- Computers handle them blazingly fast

**The key insight**: ANY smooth function can be approximated by a polynomial if you're willing to accept some error.

---

## Taylor Series: The Master Tool

### The Intuition

Imagine you're at a point x = a on a curve, and you want to predict values nearby. What information would help?

1. **The value at a**: f(a) tells you where you start
2. **The slope at a**: f'(a) tells you which direction you're heading
3. **The curvature at a**: f''(a) tells you how the slope is changing
4. **Higher derivatives**: Give even more detail about the curve's shape

Taylor series uses ALL this information:

$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots$$

### Water Analogy

Think of predicting where a ball will land:
- **0th order** (just f(a)): "It's here right now" → terrible prediction
- **1st order** (add velocity): "It's moving this direction" → better
- **2nd order** (add acceleration): "Gravity is pulling it down" → much better
- **Higher orders**: Wind resistance, spin, etc. → increasingly accurate

Each term adds more physics, just like each Taylor term adds more curve information.

---

## The Maclaurin Series: Taylor at Zero

When a = 0, we get the Maclaurin series (special case of Taylor):

$$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots$$

### Common Expansions You MUST Know

| Function | Maclaurin Series | Valid Range |
|----------|-----------------|-------------|
| eˣ | 1 + x + x²/2! + x³/3! + ... | All x |
| sin(x) | x - x³/3! + x⁵/5! - ... | All x |
| cos(x) | 1 - x²/2! + x⁴/4! - ... | All x |
| ln(1+x) | x - x²/2 + x³/3 - ... | -1 < x ≤ 1 |
| 1/(1-x) | 1 + x + x² + x³ + ... | |x| < 1 |

**Notice**: Some series work everywhere (eˣ, sin, cos), others have limited range (ln, geometric).

---

## Truncation: Where to Stop

### The Tradeoff

More terms = more accuracy but more computation.

**Truncation error**: The error from stopping after n terms.

For Taylor series around a:
$$\text{Error} \approx \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$$

where ξ is some point between a and x.

### Practical Rule

The error shrinks when:
1. **(x - a) is small**: Stay close to your expansion point!
2. **You use more terms**: Higher accuracy, more computation
3. **Higher derivatives are bounded**: Smooth functions behave better

---

## Visual Understanding

[[visual:taylor-approximation-interactive]]

*Drag the slider to add more terms. See how the polynomial "hugs" the true function closer as you add terms—but only near the expansion point!*

---

## When Approximations Fail

### Radius of Convergence

Not all series converge everywhere. ln(1+x) diverges for x < -1 because... well, ln(0) doesn't exist!

### Far from Expansion Point

Taylor series work LOCALLY. Far from a, even many terms may not suffice.

```
Near x = a:    f(x) ≈ polynomial  ✓
Far from a:    f(x) ≠ polynomial  ✗
```

### Non-Smooth Functions

No Taylor series for |x| at x = 0 (derivative doesn't exist). Step functions, corners, and discontinuities break Taylor.

---

## Applications in EEE

### 1. SPICE Simulation
SPICE approximates device models (diode equations, transistor curves) using polynomials for speed.

### 2. Signal Processing
Sine/cosine calculations in DSP chips use polynomial approximations (CORDIC or Taylor).

### 3. Control Systems
Transfer function analysis often uses low-order approximations of complex systems.

### 4. Small-Signal Analysis
The entire concept of small-signal models comes from first-order Taylor approximation!

---

## Worked Example

**Problem**: Approximate e^0.1 using Taylor series. How many terms for 6-digit accuracy?

**Solution**:

Maclaurin series for eˣ: 1 + x + x²/2! + x³/3! + ...

With x = 0.1:
- 1 term: 1.000000
- 2 terms: 1.100000
- 3 terms: 1.105000
- 4 terms: 1.105167
- 5 terms: 1.105171

True value: e^0.1 = 1.105171...

**Answer**: 5 terms gives 6-digit accuracy for small x!

---

## Key Takeaways

1. **Taylor series** convert any smooth function to polynomial form
2. **Accuracy** depends on distance from expansion point and number of terms
3. **Truncation error** is the price of stopping the infinite series
4. **Convergence radius** limits where the series works
5. Every **numerical computation** of transcendental functions uses approximation

---

## Connection to Circuit Analysis

Remember small-signal models? The diode equation:
$$i_D = I_S(e^{v_D/V_T} - 1)$$

Taylor expand around operating point V_Q:
$$i_D \approx I_Q + \frac{I_Q}{V_T}(v_D - V_Q)$$

This is just first-order Taylor approximation! The small-signal conductance g_d = I_Q/V_T comes directly from the derivative.

---

## What's Next

Now that you can approximate functions, the next question is: how do we handle continuous domains? That's **discretization**—turning continuous space and time into finite grids.
