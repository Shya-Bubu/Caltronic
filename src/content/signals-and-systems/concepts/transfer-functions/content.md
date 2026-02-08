# Transfer Functions

> **Why This Matters**: The transfer function H(s) is the most compact and powerful representation of an LTI system. It encapsulates system behavior, enables easy cascade/parallel analysis, and directly reveals stability.

---

## Definition

The **transfer function** is the Laplace transform of the impulse response:

$$H(s) = \mathcal{L}\{h(t)\} = \frac{Y(s)}{X(s)} \quad \text{(for zero ICs)}$$

[[visual:transfer-function-definition]]

---

## Poles and Zeros

H(s) is typically a ratio of polynomials:

$$H(s) = K\frac{(s-z_1)(s-z_2)\cdots}{(s-p_1)(s-p_2)\cdots} = K\frac{N(s)}{D(s)}$$

[[visual:pole-zero-plot]]

- **Zeros** ($z_i$): roots of numerator, where H(s) = 0
- **Poles** ($p_i$): roots of denominator, where H(s) → ∞

---

## System Connections

[[visual:system-connections]]

| Connection | H(s) |
|------------|------|
| Cascade | $H_1(s) \cdot H_2(s)$ |
| Parallel | $H_1(s) + H_2(s)$ |
| Feedback | $\frac{G(s)}{1 + G(s)H(s)}$ |

---

## From Differential Equation to H(s)

Given: $a_n y^{(n)} + \cdots + a_0 y = b_m x^{(m)} + \cdots + b_0 x$

Transfer function (zero ICs):
$$H(s) = \frac{b_m s^m + \cdots + b_0}{a_n s^n + \cdots + a_0}$$

[[visual:diff-eq-to-tf]]

---

## Impulse Response from H(s)

The impulse response is the inverse Laplace transform:

$$h(t) = \mathcal{L}^{-1}\{H(s)\}$$

Use partial fraction expansion + table of pairs.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| H(s) | Laplace transform of h(t) |
| Poles | Roots of denominator |
| Zeros | Roots of numerator |
| Cascade | Multiply H(s) |
| Parallel | Add H(s) |
