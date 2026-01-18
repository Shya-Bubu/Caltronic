# Number Representation and Precision

## How Computers Store Numbers

Computers don't think in decimals—they think in binary. And they have finite memory. This fundamental constraint shapes everything in computational methods.

[[visual:v1]]

## Integers Are Easy

Integers are stored exactly (within range):
- **32-bit signed integer:** -2,147,483,648 to 2,147,483,647
- **64-bit signed integer:** ±9.2 × 10¹⁸

But engineering rarely uses just integers. We need real numbers.

## Floating-Point: The Engineering Workhorse

Real numbers are stored in **floating-point format**, based on scientific notation:

$$x = \pm m \times 2^e$$

Where:
- **m** = mantissa (significand), a binary fraction
- **e** = exponent, shifts the decimal point

[[visual:v2]]

## IEEE 754 Standard

The universal standard for floating-point:

| Format | Total Bits | Sign | Exponent | Mantissa | Decimal Digits |
|--------|-----------|------|----------|----------|----------------|
| Single (float) | 32 | 1 | 8 | 23 | ~7 |
| Double | 64 | 1 | 11 | 52 | ~15-16 |

> **Insight:** Double precision gives you about 15 reliable decimal digits. Beyond that, you're rounding.

## Numbers That Can't Be Represented

### Between Representable Numbers

Floating-point numbers aren't continuous. There are gaps:
- Near 1.0: gaps of about 10⁻¹⁶
- Near 10⁶: gaps of about 10⁻¹⁰

[[visual:v3]]

### The Classic Example

```python
>>> 0.1 + 0.2
0.30000000000000004
```

Why? Because 0.1 in decimal is a repeating fraction in binary, like 1/3 in decimal.

## Machine Epsilon

**Machine epsilon (ε)** is the smallest number where:
$$1 + \epsilon > 1$$

For double precision:
$$\epsilon_{mach} \approx 2.22 \times 10^{-16}$$

This tells you the relative precision of floating-point arithmetic.

## Special Values

IEEE 754 defines special values:
- **±Inf:** Overflow results (1.0/0.0 = Inf)
- **NaN:** Not a Number (0.0/0.0 = NaN)
- **±0:** Positive and negative zero exist!
- **Denormals:** Very small numbers with reduced precision

## Why This Matters for Engineers

1. **Error accumulation:** Many small errors can add up
2. **Comparison issues:** Never use `==` with floats
3. **Cancellation:** Subtracting similar numbers loses precision
4. **Overflow/underflow:** Extreme values cause problems

> **Rule:** Always think about precision when designing numerical algorithms.
