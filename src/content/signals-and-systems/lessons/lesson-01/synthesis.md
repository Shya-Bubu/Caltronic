# Lesson 01 Summary

> **Key Takeaways** from Introduction to Signals and Systems

---

## The Big Picture

You've now learned the **vocabulary** of signals and systems. Everything that follows in this course — Fourier transforms, convolution, Laplace — builds on these foundations.

---

## Core Concepts Covered

### 1. Signals and Systems
- A **signal** is a physical quantity that varies with time (or space)
- A **system** transforms input signals into output signals
- They're inseparable: no signals without systems observing them

### 2. Signal Classifications

| Classification | Types | Key Difference |
|----------------|-------|----------------|
| **Time** | Continuous / Discrete | Defined for all t vs only integer n |
| **Predictability** | Deterministic / Random | Exact value vs probability distribution |
| **Energy** | Energy / Power | Finite total energy vs finite average power |

### 3. Mathematical Notation
- Continuous: $x(t)$ — parentheses mean continuous
- Discrete: $x[n]$ — brackets mean discrete
- This notation is **universal** in all EE literature

### 4. Energy and Power
$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt$$
$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt$$

---

## What's Next

In the next lesson, we'll explore **signal operations** — how to shift, scale, and transform signals. This leads directly to convolution, which is the heart of LTI system analysis.

---

## Quick Self-Check

Before moving on, make sure you can:

- [ ] Define signal and system in one sentence each
- [ ] Distinguish continuous vs discrete signals from a graph
- [ ] Explain why a sinusoid is a power signal, not an energy signal
- [ ] Sketch a triangular pulse from its piecewise equation

---

> **Well done.** You've completed the first step in mastering signals and systems.
