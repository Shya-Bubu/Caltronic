# Exam Preparation: Number Representation

## Key Facts to Remember

1. **Double precision:** 64 bits = 1 sign + 11 exponent + 52 mantissa
2. **Machine epsilon (double):** ε ≈ 2.22 × 10⁻¹⁶
3. **Decimal accuracy (double):** ~15-16 significant digits
4. **Range (double):** ~10⁻³⁰⁸ to 10³⁰⁸

## Common Question Types

### Type 1: Understanding Machine Epsilon

**Q:** What is machine epsilon and why is it important?

**A:** Machine epsilon is the smallest number ε such that 1 + ε > 1 in floating-point arithmetic. For double precision, ε ≈ 2.22 × 10⁻¹⁶. It represents the relative precision limit—you cannot distinguish numbers that differ by less than ε relative to their magnitude.

### Type 2: Calculations

**Q:** How many significant decimal digits does single precision (32-bit) provide?

**A:** Single precision has 23 mantissa bits:
$$\log_{10}(2^{24}) \approx 7.2 \text{ digits}$$

(24 because of implied leading 1)

### Type 3: Identifying Problems

**Q:** What is catastrophic cancellation? Give an example.

**A:** Catastrophic cancellation occurs when subtracting two nearly equal numbers, resulting in loss of significant digits.

Example: Computing $x^2 - y^2$ when $x \approx y$:
- Let $x = 1.0000001$, $y = 1.0000000$
- $x^2 - y^2 \approx 10^{-7}$, but with only ~9 reliable digits

**Solution:** Use $(x+y)(x-y)$ instead.

### Type 4: Float Comparison

**Q:** Why is `if x == 0.3:` problematic? What should be used instead?

**A:** 0.3 cannot be exactly represented in binary floating-point. After arithmetic operations, values may be close to but not exactly 0.3.

**Better approach:**
```python
if abs(x - 0.3) < 1e-10:
    # x is approximately 0.3
```

## Practice Problems

1. **Calculate:** How many bits are needed to store 10 significant decimal digits with floating-point?

**Solution:** Need $\log_2(10^{10}) \approx 33.2$ bits, so at least 34 mantissa bits.

2. **Explain:** Why does $0.1 + 0.1 + 0.1 \neq 0.3$ in floating-point?

**Solution:** 0.1 in decimal is 0.000110011001100... in binary (repeating). When truncated to 52 bits, the representation isn't exact. Adding three inexact 0.1 values doesn't equal the inexact 0.3 representation.

3. **Compute:** Approximate the gap between floating-point numbers near $10^{10}$.

**Solution:** Gap ≈ ε × magnitude = $2.22 \times 10^{-16} \times 10^{10} \approx 2.22 \times 10^{-6}$

## Quick Reference

| Property | Single (32-bit) | Double (64-bit) |
|----------|----------------|-----------------|
| Mantissa bits | 23 | 52 |
| Exponent bits | 8 | 11 |
| ε_mach | ~1.2 × 10⁻⁷ | ~2.2 × 10⁻¹⁶ |
| Decimal digits | ~7 | ~15-16 |
| Max value | ~3.4 × 10³⁸ | ~1.8 × 10³⁰⁸ |
| Min positive | ~1.2 × 10⁻³⁸ | ~2.2 × 10⁻³⁰⁸ |
