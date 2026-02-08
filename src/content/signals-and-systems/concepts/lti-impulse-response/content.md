# LTI Impulse Response

> **Why This Matters**: The impulse response h(t) is the DNA of an LTI system. Once you know h(t), you know EVERYTHING about how the system transforms signals.

---

## The Fundamental Relationship

For an LTI system, apply impulse δ(t), get output h(t):

$$\delta(t) \longrightarrow \boxed{\text{LTI System}} \longrightarrow h(t)$$

[[visual:impulse-response-definition]]

**h(t) completely characterizes the system** because:
1. Any input = sum of shifted impulses
2. LTI means each impulse produces shifted response
3. Total output = sum of shifted responses = convolution!

---

## Why LTI Properties Enable This

[[visual:lti-derivation]]

**Linearity** lets us decompose:
$$x(t) = \int x(\tau)\delta(t-\tau)d\tau$$

**Time-Invariance** means:
$$\delta(t-\tau) \to h(t-\tau)$$

Combining these:
$$y(t) = \int x(\tau)h(t-\tau)d\tau = x(t) * h(t)$$

---

## Determining System Properties from h(t)

### Causality
A system is causal if and only if:
$$h(t) = 0 \text{ for } t < 0$$

[[visual:causal-impulse-response]]

**Physical interpretation**: No response before the impulse arrives.

### Stability (BIBO)
A system is BIBO stable if and only if:
$$\int_{-\infty}^{\infty} |h(t)| \, dt < \infty$$

**Meaning**: Impulse response must be absolutely integrable.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Why does this condition guarantee stability?</summary>

If input is bounded: $|x(t)| < M$

Then: $|y(t)| = |\int x(\tau)h(t-\tau)d\tau| \leq M \int |h(t-\tau)|d\tau = M \int |h(\tau)|d\tau$

If the integral is finite, output is bounded!
</details>

---

## Common Impulse Responses

[[visual:common-impulse-responses]]

| System | h(t) | Properties |
|--------|------|------------|
| Ideal delay | $\delta(t - T)$ | Causal, stable |
| Exponential decay | $e^{-at}u(t)$, $a>0$ | Causal, stable |
| Integrator | $u(t)$ | Causal, unstable |
| Ideal lowpass | $\text{sinc}(t)$ | Non-causal, stable |

---

## Cascaded Systems

When LTI systems are connected in series:

$$x \to \boxed{h_1} \to \boxed{h_2} \to y$$

[[visual:cascaded-systems]]

The overall impulse response is:
$$h(t) = h_1(t) * h_2(t)$$

**Order doesn't matter** (commutativity):
$$h_1 * h_2 = h_2 * h_1$$

---

## Parallel Systems

When LTI systems are in parallel:

[[visual:parallel-systems]]

$$h(t) = h_1(t) + h_2(t)$$

---

## Summary

| Concept | Condition |
|---------|-----------|
| h(t) definition | Output when input is δ(t) |
| Output formula | y(t) = x(t) * h(t) |
| Causal system | h(t) = 0 for t < 0 |
| BIBO stable | ∫|h(t)|dt < ∞ |
| Cascade | h = h₁ * h₂ |
| Parallel | h = h₁ + h₂ |
