# Approximation Methods - Engineering Applications

## Industry Context

### Where Approximation is Used Daily

**1. Embedded Systems**
Microcontrollers in IoT devices, automotive ECUs, and consumer electronics compute trigonometric and exponential functions using polynomial approximations. No floating-point coprocessor? Use Taylor series!

**2. DSP Chips**
Digital signal processors implement `sin()`, `cos()`, `exp()` using lookup tables combined with polynomial interpolation—all derived from Taylor series.

**3. SPICE Simulation**
Device models use polynomial approximations for speed. The BSIM4 transistor model has hundreds of parameters, many involving polynomial curve fits.

---

## Practical Implementation: CORDIC vs Taylor

### CORDIC Algorithm
**COordinate Rotation DIgital Computer** - an alternative to Taylor series.

Advantages over Taylor:
- Only uses shifts and adds (no multiplication!)
- Better for hardware implementation
- Fixed number of iterations

Used in: Calculators, FPGA implementations, low-power systems

### Taylor in Practice
Better when:
- You have fast multipliers
- Accuracy requirements vary
- Function range is limited

---

## Design Example: Sine Approximation for DSP

**Requirement**: Compute sin(x) for x ∈ [-π/2, π/2] with error < 10⁻⁶

### Solution 1: Direct Taylor
```
sin(x) ≈ x - x³/6 + x⁵/120 - x⁷/5040
```

**Analysis**:
- 4 terms sufficient for this range
- 3 multiplications, 3 additions per term
- Error at x = π/2: ~2.4×10⁻⁷ ✓

### Solution 2: Chebyshev Polynomial (Advanced)
Better than Taylor for uniform error across interval:
```
sin(x) ≈ c₁x + c₃x³ + c₅x⁵
```
with optimized coefficients c₁, c₃, c₅.

**Same number of terms, smaller maximum error!**

---

## Component Selection: When Approximation Matters

### Op-Amp Gain Approximation

For non-inverting amplifier:
$$A_v = 1 + \frac{R_f}{R_1}$$

But with finite op-amp gain A_OL:
$$A_v = \frac{A_{OL}}{1 + A_{OL}/A_{ideal}} \approx A_{ideal}\left(1 - \frac{A_{ideal}}{A_{OL}}\right)$$

**First-order approximation** when A_OL >> A_ideal.

### Diode Forward Voltage
Instead of solving the transcendental diode equation, engineers use:
$$V_F \approx 0.7V$$ (silicon)
$$V_F \approx 0.3V$$ (Schottky)

These are zero-order approximations! For more accuracy, use iterative methods with Taylor linearization.

---

## SPICE Model Considerations

### Polynomial Device Models
SPICE uses polynomial expansions for:
- Voltage-controlled current sources
- Capacitance models (C = C₀ + C₁v + C₂v² + ...)
- Mobility degradation in MOSFETs

### Convergence and Approximation
SPICE's Newton-Raphson solver relies on Taylor linearization at each iteration. Poor initial guess = more iterations = slower simulation.

**Tip**: Use `.IC` (initial conditions) near expected operating point to speed convergence.

---

## MATLAB/Python Implementation

### Taylor Series for exp(x)
```python
import numpy as np

def exp_taylor(x, n_terms=10):
    """Approximate e^x using Taylor series."""
    result = 0
    for n in range(n_terms):
        result += x**n / np.math.factorial(n)
    return result

# Test
x = 0.5
print(f"Taylor: {exp_taylor(x, 6)}")
print(f"numpy:  {np.exp(x)}")
print(f"Error:  {abs(exp_taylor(x, 6) - np.exp(x))}")
```

### Error Analysis
```python
import matplotlib.pyplot as plt

x_range = np.linspace(-2, 2, 100)
errors = {1: [], 3: [], 5: [], 7: []}

for x in x_range:
    for n in errors.keys():
        errors[n].append(abs(exp_taylor(x, n) - np.exp(x)))

# Plot error vs x for different term counts
```

---

## Design Rules of Thumb

| Function | Terms for 6-digit accuracy | Valid Range |
|----------|---------------------------|-------------|
| sin(x) | 6 | |x| < π/2 |
| cos(x) | 6 | |x| < π/2 |
| exp(x) | 12 | |x| < 1 |
| ln(1+x) | 15 | |x| < 0.5 |

**For larger ranges**: Use range reduction first, then approximate.

---

## Common Pitfalls

### 1. Using Too Few Terms
Symptoms: Unexpected errors, oscillatory behavior
Solution: Test at range boundaries, add terms or reduce range

### 2. Ignoring Convergence Radius
Symptoms: Series diverges, NaN results
Solution: Check function singularities, use range reduction

### 3. Numerical Cancellation
Problem: When x is small, x - x³/6 loses precision
Solution: Use Horner's method: x(1 - x²/6(1 - x²/20(...)))

---

## Real-World Case Study: GPS Receiver

**Challenge**: Compute sin/cos for carrier tracking loops at 1 MHz update rate

**Solution**:
1. Reduce angle to first quadrant
2. Use 5-term Taylor polynomial
3. Implement in fixed-point for speed
4. Error budget: 0.1% acceptable for tracking

**Result**: Meets real-time requirements on low-cost DSP
