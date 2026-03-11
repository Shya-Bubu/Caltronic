# Step Response, Value Theorems & Sinusoidal Response — Overview

> **Why This Matters**: In the previous lesson, you learned how to derive the transfer function $H(s)$ for a circuit. That's powerful — but what do you actually *do* with $H(s)$? This lesson answers that question. You'll learn how to use $H(s)$ to compute the output for three critical input types: the **unit step** (to understand transient behaviour), **sinusoids** (to understand frequency response), and **arbitrary signals** (via superposition). These are the skills you'll use in every exam and every engineering problem involving LTI systems.

## What You'll Learn

This lesson takes the transfer function toolbox from Lesson 08 and puts it to work:

- How to compute the **step response** — the output when you "switch on" a system — using partial fractions and inverse Laplace transforms
- The **Initial Value Theorem** and **Final Value Theorem** — shortcuts to find $y(0)$ and $y(\infty)$ directly from $Y(s)$ without inverse-transforming
- How **second-order systems** (RLC circuits) respond to a step — and how damping determines whether the response is smooth, critically fast, or oscillatory
- What happens when you feed a **sinusoidal input** into an LTI system — the transient dies away and only the steady-state sinusoidal response remains
- How to handle **arbitrary inputs** by decomposing them into simpler signals and using superposition

## The Big Picture

$$H(s) \xrightarrow{\text{Step Input}} \text{Transient Analysis} \xrightarrow{\text{Value Theorems}} \text{Quick Checks} \xrightarrow{\text{Sinusoidal Input}} \text{Frequency Response} \xrightarrow{\text{Arbitrary Input}} \text{Complete Analysis}$$

## Prerequisites

This lesson builds directly on Lesson 08. You should be comfortable with:
- Transfer functions $H(s) = Y(s)/X(s)$
- The Laplace transform and its properties (especially time shift)
- Partial fraction expansion
- Inverse Laplace transform using standard pairs
- s-domain impedances ($R$, $Ls$, $1/Cs$)
