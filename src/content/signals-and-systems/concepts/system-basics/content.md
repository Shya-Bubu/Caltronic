# Introduction to Systems

> **Why This Matters**: Systems transform signals. Understanding system properties lets you predict behavior, design controllers, build filters, and analyze communication channels. The properties you learn here—linearity, time-invariance, causality, stability—form the foundation of ALL system analysis.

---

## What is a System?

A **system** is a mathematical model that describes the relationship between an input signal and an output signal.

$$\text{Input } x(t) \xrightarrow{\mathcal{T}} \text{Output } y(t)$$

We write this as: $y(t) = \mathcal{T}\{x(t)\}$

[[visual:system-input-output]]

### Physical Examples

| System | Input | Output |
|--------|-------|--------|
| Amplifier | Low-power signal | High-power signal |
| Microphone | Sound pressure | Electrical voltage |
| Low-pass filter | Signal with noise | Smoothed signal |
| Differentiator | Position signal | Velocity signal |
| Car suspension | Road bumps | Chassis motion |

### Mathematical Description

A system can be described in multiple ways:

1. **Input-output equation**: $y(t) = 2x(t) + x(t-1)$
2. **Differential equation**: $\frac{dy}{dt} + 3y(t) = x(t)$
3. **Block diagram**: Visual representation of operations
4. **Impulse response**: $h(t)$ — response to an impulse input

---

## System Properties Overview

We classify systems by six fundamental properties:

| Property | Question It Answers |
|----------|---------------------|
| **Memory/Memoryless** | Does output depend only on current input? |
| **Causality** | Does output depend on future inputs? |
| **Stability** | Do bounded inputs produce bounded outputs? |
| **Linearity** | Does superposition apply? |
| **Time-Invariance** | Does shifting input shift output identically? |
| **Invertibility** | Can we recover input from output? |

[[visual:system-properties-tree]]

Let's examine each property in depth.

---

## Memoryless vs. Systems with Memory

### Memoryless System

A system is **memoryless** if the output at any time $t$ depends **only** on the input at that same time $t$.

$$y(t_0) = f(x(t_0)) \quad \text{only}$$

**Examples of memoryless systems**:
- $y(t) = 2x(t)$ — simple scaling
- $y(t) = x^2(t)$ — squaring
- $y(t) = |x(t)|$ — absolute value
- $y(t) = \cos(x(t))$ — any instantaneous function

### System with Memory

A system **has memory** if the output depends on input values at times other than the current time.

**Examples with memory**:
- $y(t) = x(t-1)$ — delay (needs past value)
- $y(t) = \int_{-\infty}^{t} x(\tau) d\tau$ — integrator (needs all past values)
- $y(t) = \frac{dx(t)}{dt}$ — differentiator (needs infinitesimally close values)
- $y(t) = x(t+1)$ — predictor (needs future value!)

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is $y(t) = x(t) \cdot x(t-1)$ memoryless?</summary>

No! The output at time $t$ depends on:
- $x(t)$ — the current input
- $x(t-1)$ — the input 1 second ago

Since it uses a past value, the system **has memory**.

Even though it multiplies the current value, the fact that it also needs $x(t-1)$ means it cannot work without storing past values.
</details>

---

## Causality

### Causal System

A system is **causal** if the output at any time $t_0$ depends only on input values at times $t \leq t_0$ (present and past).

**Causal** = No crystal ball needed — can't see the future!

**Examples of causal systems**:
- $y(t) = x(t)$
- $y(t) = x(t-5)$
- $y(t) = \int_{-\infty}^{t} x(\tau) d\tau$

### Non-Causal System

A **non-causal** system depends on future input values.

**Examples of non-causal systems**:
- $y(t) = x(t+1)$ — needs input 1 second from now
- $y(t) = x(-t)$ — for $t < 0$, needs input at future positive times
- $y(t) = \int_{-\infty}^{\infty} x(\tau) d\tau$ — needs all future values too!

### Why Causality Matters

**For real-time systems**, causality is mandatory! You can't compute output before the input arrives.

**For offline processing** (like editing recorded audio), non-causal systems are perfectly fine—you have the entire signal available.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is the system $y(t) = x(2t)$ causal?</summary>

Check what happens at $t = 1$: $y(1) = x(2)$

At output time $t = 1$, we need input at $t = 2$ (a future time!)

Therefore, **the system is non-causal**.

For any positive output time $t_0$, we need input at time $2t_0 > t_0$.
</details>

---

## Stability (BIBO Stability)

### Definition

A system is **BIBO stable** (Bounded-Input, Bounded-Output stable) if:

> Every bounded input produces a bounded output.

Mathematically: If $|x(t)| \leq M_x$ for all $t$, then $|y(t)| \leq M_y$ for all $t$.

[[visual:bibo-stability]]

### Stable Systems

**The output never "blows up" for reasonable inputs.**

Examples:
- $y(t) = \cos(x(t))$ — output always between $-1$ and $1$
- $y(t) = e^{-t}x(t)$ for $t \geq 0$ — decaying multiplier
- $y(t) = x(t-1)$ — just delays, doesn't amplify

### Unstable Systems

**The output can grow without bound even for bounded input.**

Examples:
- $y(t) = e^t x(t)$ — the exponential grows without bound
- $y(t) = \int_{-\infty}^{t} x(\tau) d\tau$ — a DC input integrates forever, growing unboundedly
- $y(t) = tx(t)$ for $t \to \infty$ — the multiplier grows

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is $y(t) = \frac{x(t)}{1 + x^2(t)}$ BIBO stable?</summary>

Consider bounded input: $|x(t)| \leq M$

The output is:
$$|y(t)| = \left|\frac{x(t)}{1 + x^2(t)}\right|$$

For any real $x$, the denominator $1 + x^2 \geq 1$, so:
$$|y(t)| \leq |x(t)| \leq M$$

Actually, we can prove $\left|\frac{x}{1+x^2}\right| \leq \frac{1}{2}$ for all $x$ (maximum at $x = 1$).

The system is **BIBO stable** — output is always bounded regardless of bounded input!
</details>

---

## Linearity

This is the **most important** system property. Linear systems are vastly easier to analyze!

### Definition

A system is **linear** if it satisfies two conditions:

1. **Additivity (Superposition)**:
$$\mathcal{T}\{x_1(t) + x_2(t)\} = \mathcal{T}\{x_1(t)\} + \mathcal{T}\{x_2(t)\}$$

2. **Homogeneity (Scaling)**:
$$\mathcal{T}\{ax(t)\} = a\mathcal{T}\{x(t)\}$$

Combining both:
$$\boxed{\mathcal{T}\{ax_1(t) + bx_2(t)\} = a\mathcal{T}\{x_1(t)\} + b\mathcal{T}\{x_2(t)\}}$$

[[visual:linearity-superposition]]

### How to Test for Linearity

**Method**: Check if $\mathcal{T}\{ax_1 + bx_2\} = a\mathcal{T}\{x_1\} + b\mathcal{T}\{x_2\}$

**Step 1**: Find $y_1 = \mathcal{T}\{x_1\}$ and $y_2 = \mathcal{T}\{x_2\}$

**Step 2**: Find $y_3 = \mathcal{T}\{ax_1 + bx_2\}$

**Step 3**: Compare $y_3$ with $ay_1 + by_2$

If they're equal for all $a$, $b$, $x_1$, $x_2$, the system is linear.

### Common Nonlinear Operations

These operations **destroy linearity**:

- **Adding a constant**: $y(t) = x(t) + 5$ ❌
  - $\mathcal{T}\{0\} = 5 \neq 0$ (violates $\mathcal{T}\{0\} = 0$ requirement)
  
- **Squaring**: $y(t) = x^2(t)$ ❌
  - $\mathcal{T}\{2x\} = 4x^2 \neq 2x^2 = 2\mathcal{T}\{x\}$
  
- **Absolute value**: $y(t) = |x(t)|$ ❌
  - $\mathcal{T}\{-1\} = 1 \neq -1 = -\mathcal{T}\{1\}$
  
- **Products**: $y(t) = x(t) \cdot x(t-1)$ ❌
  - Nonlinear in $x$

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is $y(t) = t \cdot x(t)$ linear?</summary>

Test: $\mathcal{T}\{ax_1 + bx_2\} = t(ax_1(t) + bx_2(t)) = atx_1(t) + btx_2(t)$

Also: $a\mathcal{T}\{x_1\} + b\mathcal{T}\{x_2\} = atx_1(t) + btx_2(t)$

These are equal! ✓

The system **is linear**.

Note: The coefficient $t$ changes with time, but that doesn't affect linearity. It affects time-invariance (as we'll see next).
</details>

### The Zero-Input Test

Quick check: For a linear system, **zero input must produce zero output**.

$$\mathcal{T}\{0\} = 0$$

Why? Set $a = 0$ in the homogeneity property:
$$\mathcal{T}\{0 \cdot x\} = 0 \cdot \mathcal{T}\{x\} = 0$$

If a system gives non-zero output for zero input, it's **definitely nonlinear**.

---

## Time-Invariance

### Definition

A system is **time-invariant** (TI) if a time shift in the input produces an identical time shift in the output.

$$\text{If } \mathcal{T}\{x(t)\} = y(t), \text{ then } \mathcal{T}\{x(t-t_0)\} = y(t-t_0)$$

**Intuition**: The system behaves the same at all times. Its "rules" don't change.

[[visual:time-invariance-test]]

### How to Test for Time-Invariance

**Method**:

**Step 1**: Find $y_1(t) = \mathcal{T}\{x(t)\}$

**Step 2**: Find $y_2(t) = \mathcal{T}\{x(t-t_0)\}$ by substituting $x(t-t_0)$ into the system equation

**Step 3**: Compare $y_2(t)$ with $y_1(t-t_0)$

If $y_2(t) = y_1(t-t_0)$ for all $t_0$, the system is time-invariant.

### Time-Varying Systems

These indicate a **time-varying** system:

- **Time-dependent coefficient**: $y(t) = t \cdot x(t)$
- **Time-dependent transformation**: $y(t) = x(t)\cos(\omega_0 t)$
- **Explicit time dependence**: $y(t) = x(2t)$ (time scaling)

### Worked Example: Testing $y(t) = t \cdot x(t)$

**Step 1**: For input $x(t)$, output is $y(t) = t \cdot x(t)$

**Step 2**: For input $x(t-t_0)$:
$$y_2(t) = t \cdot x(t-t_0)$$

**Step 3**: Check if this equals $y_1(t-t_0)$:
$$y_1(t-t_0) = (t-t_0) \cdot x((t-t_0))$$

Comparing: $t \cdot x(t-t_0) \neq (t-t_0) \cdot x(t-t_0)$

The system is **time-varying** because the coefficient is $t$, not $(t-t_0)$.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is $y(t) = x(t) + x(t-1)$ time-invariant?</summary>

**Step 1**: For input $x(t)$: $y(t) = x(t) + x(t-1)$

**Step 2**: For input $x(t-t_0)$:
$$y_2(t) = x(t-t_0) + x(t-t_0-1) = x(t-t_0) + x((t-1)-t_0)$$

**Step 3**: Check $y_1(t-t_0)$:
$$y_1(t-t_0) = x(t-t_0) + x(t-t_0-1)$$

These are equal! ✓

The system **is time-invariant**.
</details>

---

## LTI Systems: The Holy Grail

A system that is both **Linear** and **Time-Invariant** is called an **LTI system**.

$$\text{LTI} = \text{Linear} + \text{Time-Invariant}$$

### Why LTI Systems Are Special

1. **Completely characterized by impulse response** $h(t)$
2. **Superposition principle applies**
3. **Convolution** describes input-output relationship: $y(t) = x(t) * h(t)$
4. **Eigenfunction property**: Complex exponentials pass through unchanged in shape
5. **Transfer function** exists in frequency domain

[[visual:lti-system-block]]

Almost all of signal processing and control theory focuses on LTI systems because of their mathematical tractability!

---

## Invertibility

### Definition

A system is **invertible** if distinct inputs produce distinct outputs.

$$x_1(t) \neq x_2(t) \implies y_1(t) \neq y_2(t)$$

Equivalently: You can recover the input from the output.

### Invertible Systems

- $y(t) = 2x(t)$ — invert with $x(t) = y(t)/2$
- $y(t) = x(t-5)$ — invert with $x(t) = y(t+5)$
- $y(t) = \int_{-\infty}^{t} x(\tau)d\tau$ — invert with $x(t) = \frac{dy}{dt}$

### Non-Invertible Systems

- $y(t) = x^2(t)$ — can't distinguish $+x$ from $-x$
- $y(t) = 0$ — all inputs give same output
- $y(t) = |x(t)|$ — sign is lost

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is $y[n] = x[2n]$ (downsampling) invertible?</summary>

No! Consider two inputs:
- $x_1[n] = \{1, 0, 2, 0, 3, 0, ...\}$
- $x_2[n] = \{1, 5, 2, 7, 3, 9, ...\}$

Both produce output $y[n] = \{1, 2, 3, ...\}$

Different inputs → same output. **Not invertible**.

The odd-indexed samples are completely lost!
</details>

---

## System Interconnections

Systems can be connected in various ways to build complex systems from simple ones.

### Cascade (Series) Connection

[[visual:cascade-connection]]

Output of first system feeds into second:
$$y(t) = \mathcal{T}_2\{\mathcal{T}_1\{x(t)\}\}$$

For LTI systems: $h(t) = h_1(t) * h_2(t)$ (convolution)

### Parallel Connection

[[visual:parallel-connection]]

Inputs are the same; outputs are added:
$$y(t) = \mathcal{T}_1\{x(t)\} + \mathcal{T}_2\{x(t)\}$$

For LTI systems: $h(t) = h_1(t) + h_2(t)$

### Feedback Connection

[[visual:feedback-connection]]

Output feeds back to modify input:
$$y(t) = \mathcal{T}\{x(t) - \alpha y(t)\}$$

Feedback is crucial for control systems and stability.

---

## Testing System Properties: Systematic Approach

### Step-by-Step Method

Given a system equation, test each property:

1. **Memoryless?** Does output only use $x(t)$ (not $x(t-a)$, $x(t+a)$, or $\int x$)?

2. **Causal?** Does output only use $x(\tau)$ for $\tau \leq t$?

3. **Stable?** For bounded input, is output bounded?

4. **Linear?** Does $\mathcal{T}\{ax_1 + bx_2\} = a\mathcal{T}\{x_1\} + b\mathcal{T}\{x_2\}$?

5. **Time-Invariant?** Does $\mathcal{T}\{x(t-t_0)\} = y(t-t_0)$?

### Worked Example: Analyze $y(t) = e^{x(t)}$

**Memoryless?** Output at $t$ depends only on $x(t)$. ✓ **Yes**

**Causal?** Only needs current input. ✓ **Yes**

**Stable?** If $|x(t)| \leq M$, then $|y(t)| = e^{x(t)} \leq e^M$. ✓ **Yes**

**Linear?** Test: $e^{ax_1 + bx_2} = e^{ax_1} \cdot e^{bx_2} \neq ae^{x_1} + be^{x_2}$ ✗ **No**

**Time-Invariant?** $\mathcal{T}\{x(t-t_0)\} = e^{x(t-t_0)}$ and $y(t-t_0) = e^{x(t-t_0)}$. ✓ **Yes**

**Summary**: Memoryless, causal, stable, nonlinear, time-invariant.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Analyze the system $y(t) = \int_{t-1}^{t} x(\tau) d\tau$ (moving average over past 1 second)</summary>

**Memoryless?** Uses $x(\tau)$ for $\tau$ from $t-1$ to $t$ — needs past values. ✗ **Has memory**

**Causal?** Only uses $x(\tau)$ for $\tau \leq t$. ✓ **Yes**

**Stable?** If $|x(t)| \leq M$:
$$|y(t)| = \left|\int_{t-1}^{t} x(\tau)d\tau\right| \leq \int_{t-1}^{t} |x(\tau)|d\tau \leq M \cdot 1 = M$$
✓ **Yes**

**Linear?** The integral is linear (can split sums, pull out constants). ✓ **Yes**

**Time-Invariant?** For $x(t-t_0)$:
$$\int_{t-1}^{t} x(\tau-t_0) d\tau = \int_{t-1-t_0}^{t-t_0} x(u) du$$
This equals $y(t-t_0) = \int_{(t-t_0)-1}^{t-t_0} x(\tau)d\tau$. ✓ **Yes**

**Summary**: Has memory, causal, stable, linear, time-invariant → This is an **LTI system**!
</details>

---

## Summary Table

| Property | Test | Examples Passing | Examples Failing |
|----------|------|-----------------|------------------|
| **Memoryless** | Output uses only $x(t)$ | $y = 2x(t)$, $y = x^2(t)$ | $y = x(t-1)$, $y = \int x$ |
| **Causal** | Uses only $x(\tau)$, $\tau \leq t$ | $y = x(t-5)$, $y = \int_{-\infty}^t x$ | $y = x(t+1)$, $y = x(2t)$ for $t>0$ |
| **Stable** | Bounded in → bounded out | $y = \sin(x)$, $y = x(t-1)$ | $y = e^t x(t)$, $y = \int_{-\infty}^t x$ |
| **Linear** | Superposition holds | $y = 3x(t) + 2x(t-1)$ | $y = x^2$, $y = x+5$, $y = |x|$ |
| **Time-Invariant** | Shift in → shift out | $y = x(t-5)$, $y = 2x$ | $y = tx(t)$, $y = x(2t)$ |
| **LTI** | Linear AND TI | $y = x(t) * h(t)$ | $y = x^2$, $y = tx$ |

---

## Key Takeaways

1. **LTI systems** are the foundation of signal processing—learn to identify them!

2. **Linearity** requires zero output for zero input and superposition.

3. **Time-invariance** means the system's behavior doesn't change with time.

4. **Causality** is required for real-time implementation.

5. **BIBO stability** ensures bounded inputs produce bounded outputs.

6. **Memory** distinguishes instantaneous processing from history-dependent processing.

7. To **analyze a system**, systematically test each property with the input-output relationship.
