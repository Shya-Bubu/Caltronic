# Response to Arbitrary Inputs

> **Why This Matters**: So far, you've computed outputs for specific inputs: step, impulse, sinusoid. But real-world signals can be anything — a rectangular pulse, a triangular wave, a burst of data. The key idea: if you know $H(s)$, you can find the output for **any** input by decomposing it into simpler signals using **superposition** and the **time-shift property**. This concept shows you the general-purpose workflow.

## The General Principle

For any LTI system with known transfer function $H(s)$:

$$Y(s) = H(s) \cdot X(s)$$

If you can express $X(s)$ in some useful form, you can find $Y(s)$ and then $y(t)$. The procedure is always the same:

1. Find $X(s) = \mathcal{L}\{x(t)\}$
2. Multiply: $Y(s) = H(s) \cdot X(s)$
3. Partial fractions → inverse Laplace → $y(t)$

[[visual:general-workflow-plotly]]

[[visual:lecture-page-9]]

## Example: Rectangular Pulse Input

A rectangular pulse of width 1 and height 1:

$$x(t) = u(t) - u(t-1)$$

This is a signal that is "on" from $t = 0$ to $t = 1$ and zero everywhere else.

[[visual:rectangular-pulse-plotly]]

### Step 1: Find X(s)

Using the **time-shift property** of the Laplace transform:

$$\mathcal{L}\{f(t - t_0) \cdot u(t - t_0)\} = e^{-st_0} F(s)$$

So:

$$X(s) = \mathcal{L}\{u(t)\} - \mathcal{L}\{u(t-1)\} = \frac{1}{s} - \frac{e^{-s}}{s} = \frac{1 - e^{-s}}{s}$$

### Step 2: Find Y(s)

With $H(s) = \frac{1}{1 + RCs}$ (RC filter):

$$Y(s) = \frac{1}{1 + RCs} \cdot \frac{1 - e^{-s}}{s} = \frac{1}{s(1 + RCs)} - \frac{e^{-s}}{s(1 + RCs)}$$

Notice: the second term is exactly the first term multiplied by $e^{-s}$!

### Step 3: Use Superposition

We already know the step response:

$$\mathcal{L}^{-1}\left\{\frac{1}{s(1 + RCs)}\right\} = u(t)\left(1 - e^{-t/RC}\right)$$

By the time-shift property, the delayed version:

$$\mathcal{L}^{-1}\left\{\frac{e^{-s}}{s(1 + RCs)}\right\} = u(t-1)\left(1 - e^{-(t-1)/RC}\right)$$

[[visual:lecture-page-10]]

### The Output

$$\boxed{y(t) = u(t)\left(1 - e^{-t/RC}\right) - u(t-1)\left(1 - e^{-(t-1)/RC}\right)}$$

This is the **difference of two shifted step responses**:

[[visual:pulse-response-plotly]]

### Understanding the Result

| Time interval | Active terms | Behaviour |
|--------------|-------------|-----------|
| $t < 0$ | None | $y = 0$ |
| $0 \leq t < 1$ | First step response only | Capacitor charges: $y = 1 - e^{-t/RC}$ |
| $t \geq 1$ | Both step responses | Capacitor discharges: charging curve minus delayed charging curve |

<details>
<summary><strong>Pause & Think</strong>: What happens to the output after t = 1?</summary>

At $t = 1$, the input drops to zero. The capacitor starts discharging through R. For $t > 1$: $y(t) = (1-e^{-t/RC}) - (1-e^{-(t-1)/RC}) = e^{-(t-1)/RC} - e^{-t/RC}$. This decays exponentially to zero — the capacitor fully discharges. The key insight: by superposition, the "turn-off" is a delayed copy of the "turn-on" but with opposite sign.

</details>

## The Power of Superposition

This example illustrates a fundamental principle: **any input can be decomposed into simpler signals** whose responses you already know.

Common decompositions:

| Signal | Decomposition |
|--------|--------------|
| Rectangular pulse | $u(t) - u(t-T)$ |
| Triangular pulse | Integral of rectangular pulse |
| Staircase | Sum of shifted steps |
| Periodic signal | Sum of sinusoids (Fourier) |
| Arbitrary signal | Integral of weighted impulses (convolution) |

[[visual:decomposition-plotly]]

## The Complete Toolkit

You now have everything you need to analyse any LTI system:

| Tool | What it does |
|------|-------------|
| **Transfer function** $H(s)$ | Describes the system |
| **Partial fractions** | Decomposes $Y(s)$ into invertible terms |
| **Inverse Laplace** | Converts each term back to time domain |
| **Time-shift property** | Handles delayed inputs |
| **Superposition** | Handles composed inputs |
| **Value theorems** | Quick check of initial/final values |

## Summary

- If $H(s)$ is known, output to **any** input follows from $Y(s) = H(s) \cdot X(s)$
- Rectangular pulse: $x(t) = u(t) - u(t-T)$, so $X(s) = (1-e^{-sT})/s$
- **Time-shift property**: $\mathcal{L}\{f(t-t_0)u(t-t_0)\} = e^{-st_0}F(s)$
- Pulse response = step response − delayed step response (superposition)
- Any complex input can be decomposed into simpler signals → compute each → sum
- This is the most general and powerful analysis approach for LTI systems
