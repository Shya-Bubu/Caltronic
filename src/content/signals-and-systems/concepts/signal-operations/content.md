# Signal Operations and Transformations

> **Why This Matters**: To analyze and design systems, you need to manipulate signals mathematically. These operations are the building blocks of ALL signal processing—from audio effects to radar systems to neural networks.

---

## The Five Fundamental Signal Operations

Every complex signal manipulation can be broken down into combinations of these five basic operations:

| Operation | Effect on Signal | Mathematical Form |
|-----------|------------------|-------------------|
| **Time Shifting** | Move left/right | $x(t - t_0)$ |
| **Time Reversal** | Mirror about y-axis | $x(-t)$ |
| **Time Scaling** | Compress/expand | $x(at)$ |
| **Amplitude Scaling** | Stretch/shrink vertically | $Ax(t)$ |
| **Addition** | Combine signals | $x_1(t) + x_2(t)$ |

[[visual:five-operations-overview]]

Let's explore each in depth with the **consequences** and **implications** of each operation.

---

## Time Shifting: $y(t) = x(t - t_0)$

Time shifting moves the entire signal along the time axis.

### The Rule

- $x(t - t_0)$ with **positive $t_0$**: Signal shifts **RIGHT** (delayed)
- $x(t + t_0)$ with **positive $t_0$**: Signal shifts **LEFT** (advanced)

[[visual:time-shift-animation]]

### Why the Sign Seems "Backwards"

This confuses many students! Here's the intuition:

For $y(t) = x(t - 3)$:
- At output time $t = 3$: $y(3) = x(3-3) = x(0)$
- At output time $t = 5$: $y(5) = x(5-3) = x(2)$

The output at time $3$ shows what the input was at time $0$. The signal appears **delayed**—what was at $t=0$ now appears at $t=3$.

**Memory aid**: $x(t - t_0)$ means "look backward in time by $t_0$" → the signal appears shifted to the right.

<details>
<summary>🧠 <strong>Pause & Think</strong>: If $x(t)$ is a pulse that starts at $t = 0$, where does $x(t + 5)$ start?</summary>

$x(t + 5)$ shifts the signal **LEFT** by 5 units.

The pulse that originally started at $t = 0$ now starts at $t = -5$.

To verify: At $t = -5$, we have $x(-5 + 5) = x(0)$, which is the start of the original pulse.
</details>

### What Happens to Signal Properties Under Time Shift?

| Property | Effect of shifting by $t_0$ |
|----------|--------------------------------|
| **Energy** | Unchanged (same area under $|x|^2$) |
| **Power** | Unchanged |
| **Period** | Unchanged (if periodic) |
| **Even/Odd symmetry** | **DESTROYED** (unless $t_0 = 0$) |
| **Support** (where signal is non-zero) | Shifted by $t_0$ |

**Critical insight**: An even signal $x(t) = x(-t)$ stops being even after shifting! This is a common exam trap.

<details>
<summary>🧠 <strong>Pause & Think</strong>: If $x(t) = \cos(t)$ (an even signal), is $x(t-3) = \cos(t-3)$ still even?</summary>

Check: Is $\cos(t-3) = \cos(-t-3)$?

$\cos(t-3) \neq \cos(-t-3)$ in general (try $t = 0$: $\cos(-3) \neq \cos(-3)$ ✓ wait, that's equal!)

Actually, let's try $t = 3$: $\cos(0) = 1$ vs $\cos(-6) = 0.96$... not equal!

The signal is **no longer even**. The axis of symmetry moved from $t = 0$ to $t = 3$.

More precisely: $\cos(t-3)$ is symmetric about $t = 3$, not about $t = 0$.
</details>

---

## Time Reversal: $y(t) = x(-t)$

Time reversal reflects the signal about the vertical axis ($t = 0$).

[[visual:time-reversal-animation]]

### The Process

At each time $t$, the output equals the input at time $-t$:
- $y(0) = x(0)$ (the value at $t=0$ stays)
- $y(1) = x(-1)$ (the value at $t=-1$ appears at $t=1$)
- $y(-2) = x(2)$ (the value at $t=2$ appears at $t=-2$)

### Key Properties

**For even signals**: $x(-t) = x(t)$ → Reversal has no effect!

**For odd signals**: $x(-t) = -x(t)$ → Reversal produces the negative!

**For general signals**: Reversal produces a distinct signal unless it's even.

### What Happens to Signal Properties Under Reversal?

| Property | Effect |
|----------|--------|
| **Energy** | Unchanged |
| **Power** | Unchanged |
| **Even/Odd** | Even stays even, odd stays odd |
| **Causality** | A causal signal (zero for $t < 0$) becomes anti-causal (zero for $t > 0$) |

---

## Combining Shifts and Reversals: Order Matters!

When you have both operations like $x(-t + 3)$ or $x(-(t - 3))$, you need to be careful.

### Two Approaches

**Approach 1: Substitute and Simplify**

For $y(t) = x(3 - 2t)$:

Rewrite: $y(t) = x(-2(t - 1.5))$

This tells us: Scale by 2, shift right by 1.5, then reverse.

**Approach 2: Step-by-Step Transformation**

**Critical Rule**: When performing multiple operations, the order is:
1. **First reverse** (if needed)
2. **Then shift**

OR equivalently:
1. **First shift**
2. **Then reverse about the new position**

[[visual:shift-reverse-order]]

### Worked Example: Sketch $y(t) = x(1 - t)$ given $x(t)$

Rewrite: $y(t) = x(-(t - 1))$

**Step 1**: Create $x(-t)$ by reversing $x(t)$ about $t = 0$

**Step 2**: Shift right by 1 to get $x(-(t-1)) = x(1-t)$

<details>
<summary>🧠 <strong>Pause & Think</strong>: Given $x(t) = u(t)$ (unit step), what is $x(1-t)$?</summary>

Original: $u(t)$ equals 1 for $t \geq 0$, and 0 for $t < 0$.

$x(1-t) = u(1-t)$

This equals 1 when $1-t \geq 0$, i.e., when $t \leq 1$.

So $u(1-t)$ is a **reversed step** that equals:
- 1 for $t \leq 1$
- 0 for $t > 1$

It's a step going "downward" at $t = 1$ instead of "upward" at $t = 0$!
</details>

---

## Time Scaling: $y(t) = x(at)$

Time scaling compresses or expands the signal horizontally.

### The Rule

- $|a| > 1$: Signal is **compressed** (happens faster)
- $|a| < 1$: Signal is **expanded** (happens slower)
- $a < 0$: Also includes reversal!

[[visual:time-scaling-animation]]

### Understanding Compression vs Expansion

For $y(t) = x(2t)$:
- At $t = 0.5$: $y(0.5) = x(1)$
- At $t = 1$: $y(1) = x(2)$

The output at time 0.5 already shows what the input was at time 1. Everything happens **twice as fast** → the signal is **compressed by factor 2**.

For $y(t) = x(t/2) = x(0.5t)$:
- At $t = 2$: $y(2) = x(1)$
- At $t = 4$: $y(4) = x(2)$

The output at time 2 shows what the input was at time 1. Everything happens **half as fast** → the signal is **expanded by factor 2**.

### What Happens to Signal Properties Under Scaling?

| Property | Effect of $x(at)$ |
|----------|-------------------|
| **Duration** | Divided by $|a|$ |
| **Energy** | Scaled: $E_{new} = E_{old}/|a|$ |
| **Period** | Divided by $|a|$ |
| **Frequency** | Multiplied by $|a|$ |

**Critical Formula for Energy**:

$$\int_{-\infty}^{\infty} |x(at)|^2 \, dt = \frac{1}{|a|} \int_{-\infty}^{\infty} |x(\tau)|^2 \, d\tau = \frac{E}{|a|}$$

(This comes from the substitution $\tau = at$, $dt = d\tau/|a|$)

<details>
<summary>🧠 <strong>Pause & Think</strong>: If a signal has duration $T$ and energy $E$, what's the energy of the signal compressed by factor 3?</summary>

The compressed signal is $x(3t)$.

New duration: $T/3$

New energy: $E/3$ (from the formula $E_{new} = E/|a|$ with $a = 3$)

**Intuition**: Compressing the signal makes it shorter, so there's less "area" under $|x|^2$.
</details>

---

## Combined Transformations: The General Case

For $y(t) = x(at + b)$, always rewrite to standard form:

$$y(t) = x\left(a\left(t + \frac{b}{a}\right)\right)$$

### Step-by-Step Method

1. **Factor out** the coefficient of $t$
2. **Interpret**: Scale by $|a|$, shift by $-b/a$, reverse if $a < 0$

### Worked Example: Sketch $y(t) = x(3 - 2t)$ given $x(t)$

**Step 1**: Rewrite in standard form

$$y(t) = x(-2t + 3) = x(-2(t - 1.5))$$

**Step 2**: Identify operations
- Scale factor: $|a| = 2$ (compress by 2)
- Shift: $t_0 = 1.5$ (shift right by 1.5)
- Sign of $a$: negative (reverse)

**Step 3**: Apply in order
1. Compress $x(t)$ by factor 2 → $x(2t)$
2. Shift right by 1.5 → $x(2(t-1.5))$
3. Reverse about $t = 1.5$ → $x(-2(t-1.5)) = x(3-2t)$

[[visual:combined-transformation-example]]

### Finding Where a Transformed Signal is Defined

If $x(t)$ is defined on $[t_1, t_2]$, where is $y(t) = x(at + b)$ defined?

Set up the inequality:
$$t_1 \leq at + b \leq t_2$$

Solve for $t$:
$$\frac{t_1 - b}{a} \leq t \leq \frac{t_2 - b}{a}$$ (if $a > 0$)

$$\frac{t_2 - b}{a} \leq t \leq \frac{t_1 - b}{a}$$ (if $a < 0$, inequality flips!)

<details>
<summary>🧠 <strong>Pause & Think</strong>: If $x(t)$ is defined on $[0, 2]$, where is $y(t) = x(3 - 2t)$ defined?</summary>

We need: $0 \leq 3 - 2t \leq 2$

From $3 - 2t \geq 0$: $t \leq 1.5$

From $3 - 2t \leq 2$: $t \geq 0.5$

The signal $y(t)$ is defined on $[0.5, 1.5]$.

**Check**: Original duration was 2. After compression by 2, new duration is 1: from 0.5 to 1.5. ✓
</details>

---

## Amplitude Scaling: $y(t) = Ax(t)$

This is the simplest operation: multiply all values by a constant.

- $A > 1$: Amplification
- $0 < A < 1$: Attenuation
- $A < 0$: Inversion (flip about time axis)

[[visual:amplitude-scaling]]

### Effects on Properties

| Property | Effect of multiplication by $A$ |
|----------|--------------------------------|
| **Amplitude** | Scaled by $A$ |
| **Energy** | Scaled by $A^2$ |
| **Power** | Scaled by $A^2$ |
| **Even/Odd symmetry** | Preserved |
| **Period** | Unchanged |

<details>
<summary>🧠 <strong>Pause & Think</strong>: If a signal has power $P = 5$ watts, what's the power after multiplying by $-3$?</summary>

New power $= (-3)^2 \times 5 = 9 \times 5 = 45$ watts.

The negative sign doesn't affect power because power involves $|x|^2$.
</details>

---

## Signal Addition and Subtraction

When signals are added, their values at each time instant are summed.

$$y(t) = x_1(t) + x_2(t)$$

[[visual:signal-addition]]

### The Even-Odd Decomposition Revisited

This is a perfect example of signal arithmetic:

$$x(t) = \underbrace{\frac{x(t) + x(-t)}{2}}_{\text{even part}} + \underbrace{\frac{x(t) - x(-t)}{2}}_{\text{odd part}}$$

Notice:
- $x(t) + x(-t)$ produces an even signal (automatically symmetric!)
- $x(t) - x(-t)$ produces an odd signal (automatically anti-symmetric!)

<details>
<summary>🧠 <strong>Pause & Think</strong>: What is $x(t) + x(-t)$ when $x(t) = e^{2t}$?</summary>

$x(t) + x(-t) = e^{2t} + e^{-2t} = 2\cosh(2t)$

This is even: $2\cosh(2(-t)) = 2\cosh(-2t) = 2\cosh(2t)$ ✓

(Using the property $\cosh(-x) = \cosh(x)$)
</details>

---

## The Unit Step Function: $u(t)$

The **unit step function** is arguably the most important elementary signal.

$$u(t) = \begin{cases} 1 & t \geq 0 \\ 0 & t < 0 \end{cases}$$

[[visual:unit-step-function]]

Some textbooks define $u(0) = 0.5$, but operationally it doesn't matter for most integrations.

### Using the Step to "Turn On" a Signal

To make signal $x(t)$ zero for $t < 0$:

$$y(t) = x(t) \cdot u(t)$$

[[visual:signal-windowing-with-step]]

### Shifted Step Function

$u(t - t_0)$ turns on at $t = t_0$:

$$u(t - 3) = \begin{cases} 1 & t \geq 3 \\ 0 & t < 3 \end{cases}$$

### Creating a Rectangular Pulse with Steps

A pulse from $t = a$ to $t = b$:

$$\text{rect}(t) = u(t - a) - u(t - b)$$

This equals 1 for $a \leq t < b$ and 0 elsewhere.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Express the signal that equals $\sin(t)$ for $0 \leq t \leq \pi$ and zero elsewhere using step functions.</summary>

$$y(t) = \sin(t) \cdot [u(t) - u(t - \pi)]$$

The term $[u(t) - u(t-\pi)]$ creates a "window" that's 1 for $0 \leq t < \pi$ and 0 elsewhere.
</details>

---

## The Ramp Function: $r(t)$

The **ramp function** increases linearly starting at $t = 0$:

$$r(t) = t \cdot u(t) = \begin{cases} t & t \geq 0 \\ 0 & t < 0 \end{cases}$$

[[visual:ramp-function]]

### Relationship to Step Function

The ramp is the integral of the step:

$$r(t) = \int_{-\infty}^{t} u(\tau) \, d\tau$$

And the step is the derivative of the ramp:

$$u(t) = \frac{dr(t)}{dt}$$ (in the distributional sense)

<details>
<summary>🧠 <strong>Pause & Think</strong>: What does $r(t) - 2r(t-1) + r(t-2)$ look like?</summary>

- At $t = 0$: Ramp starts going up
- At $t = 1$: Subtract $2r(t-1)$ which starts. Net slope becomes $1 - 2 = -1$? No!

Let's trace carefully:
- For $0 \leq t < 1$: Only $r(t) = t$ is active. Shape: ramp up.
- For $1 \leq t < 2$: $r(t) - 2r(t-1) = t - 2(t-1) = t - 2t + 2 = 2 - t$. Shape: ramp down.
- For $t \geq 2$: $r(t) - 2r(t-1) + r(t-2) = t - 2(t-1) + (t-2) = t - 2t + 2 + t - 2 = 0$.

This is a **triangular pulse** from $t=0$ to $t=2$, peak at $t=1$!
</details>

---

## Discrete-Time Signal Operations

The operations work similarly for discrete-time signals, with some key differences.

### Discrete Time Shifting

$$y[n] = x[n - n_0]$$

Since $n$ is an integer, $n_0$ must also be an integer!

### Discrete Time Reversal

$$y[n] = x[-n]$$

Same as continuous, but at integer points.

### Discrete Time Scaling

$$y[n] = x[kn]$$ (only for integer $k$)

**Downsampling**: $x[2n]$ keeps every other sample—you LOSE information!

$$y[n] = x\left[\frac{n}{k}\right]$$ is only defined when $n$ is a multiple of $k$.

**Upsampling**: Insert zeros between samples.

<details>
<summary>🧠 <strong>Pause & Think</strong>: If $x[n] = \{1, 2, 3, 4, 5\}$ for $n = 0, 1, 2, 3, 4$, what is $y[n] = x[2n]$?</summary>

$y[0] = x[0] = 1$  
$y[1] = x[2] = 3$  
$y[2] = x[4] = 5$

The signal $y[n] = \{1, 3, 5\}$ for $n = 0, 1, 2$.

We kept only the even-indexed samples!
</details>

---

## Processing Order in System Analysis

When analyzing how signals transform through systems, track each operation carefully:

### Example: System with Multiple Operations

A system performs: $y(t) = 2x(3t - 6) + 1$

**Break it down**:
1. $x(t)$ → $x(3t)$: Compress by 3
2. $x(3t)$ → $x(3(t-2)) = x(3t-6)$: Shift right by 2
3. $x(3t-6)$ → $2x(3t-6)$: Amplify by 2
4. $2x(3t-6)$ → $2x(3t-6) + 1$: Add DC offset of 1

[[visual:cascaded-operations]]

---

## Summary: Operation Effects Cheat Sheet

| Operation | Energy | Power | Period | Symmetry |
|-----------|--------|-------|--------|----------|
| $x(t - t_0)$ | Same | Same | Same | Lost (unless $t_0 = 0$) |
| $x(-t)$ | Same | Same | Same | Preserved |
| $x(at)$ | $E/|a|$ | Same | $T/|a|$ | Preserved if $a > 0$ |
| $Ax(t)$ | $A^2 E$ | $A^2 P$ | Same | Preserved |

---

## Key Formulas

| Transformation | Formula | Effect |
|----------------|---------|--------|
| Time shift | $x(t - t_0)$ | Right shift if $t_0 > 0$ |
| Time reversal | $x(-t)$ | Mirror about $t = 0$ |
| Time scaling | $x(at)$, $|a| > 1$ | Compress |
| Time scaling | $x(at)$, $|a| < 1$ | Expand |
| Combined | $x(at + b) = x(a(t + b/a))$ | Scale by $|a|$, shift by $-b/a$ |
| Even part | $x_e(t) = \frac{x(t) + x(-t)}{2}$ | Symmetric component |
| Odd part | $x_o(t) = \frac{x(t) - x(-t)}{2}$ | Anti-symmetric component |
| Energy after scaling | $E_{x(at)} = \frac{E_x}{|a|}$ | Compression reduces energy |
