# Convolution Properties

> **Why This Matters**: These algebraic properties simplify convolution calculations dramatically. They also reveal deep connections between system interconnections and mathematical operations.

---

## The Key Properties

[[visual:properties-overview]]

| Property | Formula | Meaning |
|----------|---------|---------|
| **Commutative** | $x * h = h * x$ | Order doesn't matter |
| **Associative** | $(x * h_1) * h_2 = x * (h_1 * h_2)$ | Grouping doesn't matter |
| **Distributive** | $x * (h_1 + h_2) = x * h_1 + x * h_2$ | Distributes over addition |
| **Identity** | $x * \delta = x$ | Impulse is the identity |

---

## Commutativity: Order Doesn't Matter

$$x(t) * h(t) = h(t) * x(t)$$

[[visual:commutativity]]

**Proof insight**: In the integral $\int x(\tau)h(t-\tau)d\tau$, substitute $\sigma = t - \tau$:

$$= \int h(\sigma)x(t-\sigma)d\sigma = h * x$$

**Practical use**: Flip whichever signal is simpler! If x is complicated and h is simple, compute h * x instead.

---

## Associativity: Grouping Doesn't Matter

$$(x * h_1) * h_2 = x * (h_1 * h_2)$$

[[visual:associativity]]

**Physical meaning**: For cascaded systems:
- You can process signal through each system sequentially
- OR combine the systems first, then process once

**Computational advantage**: If $h_1 * h_2$ is precomputed, you do ONE convolution instead of two!

---

## Distributivity: Splits Over Addition

$$x * (h_1 + h_2) = x * h_1 + x * h_2$$

[[visual:distributivity]]

**Physical meaning**: Parallel systems can be analyzed separately then summed.

This extends to sums:
$$x * \sum_k h_k = \sum_k (x * h_k)$$

---

## Identity Element: The Impulse

$$x * \delta = \delta * x = x$$

[[visual:impulse-identity]]

Convolving with the impulse leaves the signal unchanged—like multiplying by 1.

**Useful for**: 
- Checking convolution calculations
- Understanding that $\delta(t)$ is a "transparent" system

---

## Shift Property

$$x(t) * h(t - t_0) = y(t - t_0)$$

[[visual:shift-property]]

Shifting one signal shifts the result by the same amount.

**Combined shifts**: 
$$x(t - t_1) * h(t - t_2) = y(t - t_1 - t_2)$$

---

## Width Property

[[visual:width-property]]

If $x(t)$ has duration $T_x$ and $h(t)$ has duration $T_h$:

**Duration of $y = x * h$**: $T_x + T_h$

**Start of y**: earliest start among x and h
**End of y**: sum of latest ends

---

## Differentiation and Integration

### Differentiation Property
$$\frac{d}{dt}[x * h] = \frac{dx}{dt} * h = x * \frac{dh}{dt}$$

[[visual:differentiation-property]]

**Practical use**: Differentiate whichever function is easier!

### Integration Property
$$\int_{-\infty}^{t} [x * h] d\tau = \left[\int x\right] * h = x * \left[\int h\right]$$

---

## Summary Table

| Property | Formula | System Interpretation |
|----------|---------|----------------------|
| Commutative | x*h = h*x | Flip either one |
| Associative | (x*h₁)*h₂ = x*(h₁*h₂) | Cascade order irrelevant |
| Distributive | x*(h₁+h₂) = x*h₁+x*h₂ | Parallel splits |
| Identity | x*δ = x | δ is "wire" |
| Shift | x*(h delayed) = y delayed | Delays add |
| Differentiate | d/dt(x*h) = (dx/dt)*h | Apply d/dt to either |

