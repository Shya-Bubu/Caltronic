# Lesson 03: Convolution and LTI System Response

> This lesson introduces the most powerful tool in signals and systems: **convolution**. You'll learn how knowing just the impulse response lets you predict the output for ANY input.

## What You'll Learn

1. **Impulse train decomposition** — How any signal can be written as a sum of shifted impulses
2. **LTI system response** — How linearity and time invariance determine system behavior
3. **The convolution sum** — The mathematical formula that computes any LTI output
4. **Graphical convolution** — The "flip, shift, multiply, sum" procedure

## Why This Matters

Convolution is the **foundation** of:
- Digital filter design
- Image processing
- Audio processing
- Communication systems
- Machine learning (CNNs!)

Once you master convolution, you can analyze ANY linear system.

## Prerequisites

Make sure you understand:
- Impulse and step functions (Lesson 02)
- LTI system properties (Lesson 02)
- Signal classification (Lesson 01)

---

*Let's begin with how impulse response defines a system completely.*
