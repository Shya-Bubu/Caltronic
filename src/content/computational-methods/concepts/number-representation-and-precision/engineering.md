# Engineering Applications: Number Representation

## Real-World Precision Issues

### Example 1: Financial Simulations
Banks don't use floats for money! They use fixed-point or decimal arithmetic:
```python
# Bad: Floating-point drift
>>> 0.1 + 0.1 + 0.1 - 0.3
5.551115123125783e-17

# Good: Use Decimal module
from decimal import Decimal
>>> Decimal('0.1') + Decimal('0.1') + Decimal('0.1') - Decimal('0.3')
Decimal('0.0')
```

### Example 2: GPS and Navigation
GPS requires extremely high precision for position calculations:
- 1 mm precision needs ~15 significant digits
- Double precision is barely sufficient
- Some systems use extended precision or clever algorithms

[[visual:v4]]

## Python Investigation

```python
import numpy as np
import sys

# Check your system's floating-point precision
print(f"Machine epsilon (float64): {np.finfo(np.float64).eps}")
print(f"Smallest positive number: {np.finfo(np.float64).tiny}")
print(f"Largest finite number: {np.finfo(np.float64).max}")

# Output:
# Machine epsilon (float64): 2.220446049250313e-16
# Smallest positive number: 2.2250738585072014e-308
# Largest finite number: 1.7976931348623157e+308
```

## Common Precision Pitfalls

### Pitfall 1: Comparing Floats
```python
# WRONG
if x == 1.0:
    print("Equal")

# RIGHT
if abs(x - 1.0) < 1e-10:
    print("Close enough")
```

### Pitfall 2: Accumulating Errors
```python
# Sum of 0.1, one million times
total = 0.0
for _ in range(1_000_000):
    total += 0.1
print(f"Expected: 100000.0, Got: {total}")
# Got: 100000.00000133288

# Better: Use math.fsum for more accurate summation
import math
total = math.fsum([0.1] * 1_000_000)
print(f"With fsum: {total}")  # 100000.0
```

[[visual:v5]]

### Pitfall 3: Catastrophic Cancellation
```python
# Computing x² - y² when x ≈ y
x = 1.0000001
y = 1.0000000

# Naive way (loses precision)
result1 = x**2 - y**2
# Better way (mathematically equivalent)
result2 = (x + y) * (x - y)

print(f"Naive: {result1}")
print(f"Better: {result2}")
```

## Floating-Point Best Practices

| Practice | Why |
|----------|-----|
| Use double (float64) by default | More headroom for error |
| Use relative tolerance for comparisons | Scales with number magnitude |
| Prefer multiplication over repeated addition | Less error accumulation |
| Avoid subtracting nearly equal numbers | Catastrophic cancellation |
| Use library functions (np.sum vs. sum) | Often more robust |

## MATLAB/NumPy Precision Control

```python
import numpy as np

# Single precision (32-bit)
x_single = np.float32(1.0)

# Double precision (64-bit) - default
x_double = np.float64(1.0)

# Extended precision (system dependent)
x_extended = np.longdouble(1.0)

print(f"Single epsilon: {np.finfo(np.float32).eps}")  # ~1.2e-7
print(f"Double epsilon: {np.finfo(np.float64).eps}")  # ~2.2e-16
```
