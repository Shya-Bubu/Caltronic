# Engineering Applications: Numerical Error

## Real-World Error Examples

### Control Systems: Accumulating Error

In a digital controller running at 1 kHz for 1 hour:
- 3.6 million loop iterations
- Small round-off errors accumulate
- Can cause integrator windup in PID controllers

**Solution:** Use anti-windup techniques and periodic reset.

[[visual:v4]]

### Finite Element Analysis: Mesh Refinement

For structural or EM analysis:
- Coarse mesh → Large truncation error
- Fine mesh → More accurate but computationally expensive

**Rule of thumb:** Refine mesh until results change by less than 1%.

```python
# Mesh convergence study
mesh_sizes = [0.1, 0.05, 0.02, 0.01, 0.005]
results = []
for h in mesh_sizes:
    result = run_fem_analysis(mesh_size=h)
    results.append(result)
    
# Plot to check convergence
plt.semilogx(mesh_sizes, results, 'o-')
plt.xlabel('Mesh size h')
plt.ylabel('Result')
plt.title('Mesh Convergence Study')
```

### Signal Processing: Quantization Error

ADC converts analog to digital with quantization error:
$$E_{quant} = \frac{\Delta}{2}$$

Where $\Delta$ = least significant bit (LSB) voltage.

For 12-bit ADC with 3.3V range:
$$\Delta = \frac{3.3}{4096} \approx 0.8 \text{ mV}$$

## Python: Error Analysis Demo

```python
import numpy as np

# Compute derivative using forward difference
def forward_diff(f, x, h):
    return (f(x + h) - f(x)) / h

# Compute derivative using central difference
def central_diff(f, x, h):
    return (f(x + h) - f(x - h)) / (2 * h)

# Test function: f(x) = sin(x), f'(x) = cos(x)
f = np.sin
x = 1.0
true_derivative = np.cos(x)

# Study error vs step size
h_values = np.logspace(-1, -15, 15)
forward_errors = []
central_errors = []

for h in h_values:
    fwd = abs(forward_diff(f, x, h) - true_derivative)
    ctr = abs(central_diff(f, x, h) - true_derivative)
    forward_errors.append(fwd)
    central_errors.append(ctr)

# Results show:
# - Error decreases with h (truncation dominates)
# - Then increases for tiny h (round-off dominates)
# - Optimal h balances both
```

[[visual:v5]]

## The "Sweet Spot" for Step Size

For derivative approximations:
- **Large h:** Truncation error dominates (error ∝ h)
- **Small h:** Round-off error dominates (error ∝ 1/h)
- **Optimal h:** Balance point (~10⁻⁵ to 10⁻⁸ for double)

## Error Bounds in Practice

| Application | Acceptable Relative Error |
|-------------|-------------------------|
| Financial calculations | 10⁻¹⁵ (exact if possible) |
| Scientific computing | 10⁻¹⁰ to 10⁻⁶ |
| Engineering simulation | 10⁻³ to 10⁻⁵ |
| Real-time control | 10⁻³ |
| Graphics/games | 10⁻² |

## Error Estimation Strategies

1. **Compare with analytical solution** (when available)
2. **Richardson extrapolation:** Use two step sizes to estimate error
3. **A posteriori estimates:** Compute error bounds after solution
4. **Refinement studies:** Halve step size, check change
