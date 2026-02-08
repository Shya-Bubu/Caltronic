# Stability Analysis

> **Why This Matters**: Stability is the first question asked about any real system. An unstable control system causes crashes, oscillations, or explosions. Pole locations in the s-plane tell you everything about stability at a glance.

---

## What is BIBO Stability?

**Bounded-Input Bounded-Output (BIBO) Stability**: Every bounded input produces a bounded output.

$$|x(t)| < M_x \implies |y(t)| < M_y$$

[[visual:bibo-definition]]

A system that "blows up" for bounded inputs is UNSTABLE.

---

## Stability from Impulse Response

An LTI system is BIBO stable if and only if:

$$\int_{-\infty}^{\infty}|h(t)|dt < \infty$$

The impulse response must be **absolutely integrable**.

---

## Stability from Pole Locations

[[visual:pole-location-stability]]

For a **causal** LTI system:

| Pole Location | Stability |
|--------------|-----------|
| All poles in LHP (Re(s) < 0) | **STABLE** |
| Any pole in RHP (Re(s) > 0) | **UNSTABLE** |
| Simple poles on jω-axis | **Marginally stable** |
| Repeated poles on jω-axis | **UNSTABLE** |

---

## Why Left Half-Plane Means Stable

Poles at $s = p$ contribute terms like $e^{pt}$ to h(t):

[[visual:pole-contribution]]

| Pole Location | Term in h(t) | Behavior |
|--------------|--------------|----------|
| $\text{Re}(p) < 0$ | Decaying exponential | Stable |
| $\text{Re}(p) > 0$ | Growing exponential | Unstable |
| $\text{Re}(p) = 0$ (simple) | Sustained oscillation | Marginally stable |

<details>
<summary>🧠 <strong>Pause & Think</strong>: What about complex conjugate poles?</summary>

Complex poles come in conjugate pairs: $p = \sigma \pm j\omega_d$

They produce oscillating terms: $e^{\sigma t}\cos(\omega_d t)$ or $e^{\sigma t}\sin(\omega_d t)$

- $\sigma < 0$: Damped oscillation (stable)
- $\sigma > 0$: Growing oscillation (unstable)
- $\sigma = 0$: Sustained oscillation (marginally stable)
</details>

---

## Pole-Zero Diagram Analysis

[[visual:pole-zero-examples]]

**Quick stability check**:
1. Find all poles
2. Check: All poles have Re(s) < 0?
3. If yes → STABLE. If no → UNSTABLE or marginally stable.

---

## Examples

### Stable: H(s) = 1/(s+2)
- Pole at s = -2 (LHP)
- h(t) = e^(-2t)u(t) → decays to zero ✓

### Unstable: H(s) = 1/(s-1)  
- Pole at s = +1 (RHP)
- h(t) = e^(t)u(t) → grows without bound ✗

### Marginally Stable: H(s) = 1/(s²+4)
- Poles at s = ±2j (jω-axis)
- h(t) = (1/2)sin(2t)u(t) → oscillates forever
- Bounded but doesn't decay

---

## Summary

| Condition | Stability |
|-----------|-----------|
| All poles in LHP | BIBO Stable |
| Any pole in RHP | Unstable |
| Simple jω-axis poles | Marginally stable |
| Repeated jω-axis poles | Unstable |
