# Signal Transformations

> **Why This Matters**: Every signal processing operation involves transforming signals. Time shifting creates delays, time scaling changes speed, and reflection reverses signals. Mastering these operations is essential for understanding convolution, Fourier analysis, and filter design.

---

## The Three Fundamental Operations

All time-domain signal transformations can be built from three basic operations:

[[visual:three-operations-overview]]

| Operation | Notation | Effect |
|-----------|----------|--------|
| **Time Shifting** | $x(t - t_0)$ | Moves signal left/right |
| **Time Scaling** | $x(at)$ | Compresses/expands signal |
| **Time Reversal** | $x(-t)$ | Flips signal horizontally |

---

## Time Shifting

### Shifting Right (Delay)

$x(t - t_0)$ with $t_0 > 0$ **shifts the signal RIGHT** (delays it):

[[visual:time-shift-delay]]

**Think of it this way**: To get the same value that was at $t = 0$, you now need to wait until $t = t_0$.

**Example**: If $x(t) = u(t)$ (step at origin), then $x(t-3) = u(t-3)$ (step at $t = 3$).

### Shifting Left (Advance)

$x(t + t_0)$ with $t_0 > 0$ **shifts the signal LEFT** (advances it):

[[visual:time-shift-advance]]

**Memory trick**: 
- Minus sign → shift right (delay)
- Plus sign → shift left (advance)

<details>
<summary>🧠 <strong>Pause & Think</strong>: Why does subtracting shift right?</summary>

Consider $x(t - 3)$. Ask: "At what time $t$ does this equal $x(0)$?"

Answer: When $t - 3 = 0$, so $t = 3$.

The value that was at $t = 0$ is now at $t = 3$ — the signal moved RIGHT!
</details>

---

## Time Scaling

### Compression ($|a| > 1$)

$x(at)$ with $|a| > 1$ **compresses** the signal horizontally:

[[visual:time-compression]]

**Example**: $x(2t)$ compresses by factor of 2 — everything happens twice as fast.

If original signal spans $[0, T]$, compressed version spans $[0, T/2]$.

### Expansion ($|a| < 1$)

$x(at)$ with $0 < |a| < 1$ **expands** the signal:

[[visual:time-expansion]]

**Example**: $x(0.5t)$ expands by factor of 2 — everything happens at half speed.

If original signal spans $[0, T]$, expanded version spans $[0, 2T]$.

### Key Formula

If original feature at $t = t_1$ → after scaling by $a$, feature at $t = t_1/a$

---

## Time Reversal (Reflection)

$x(-t)$ **flips the signal about $t = 0$**:

[[visual:time-reversal]]

- Points at positive $t$ move to negative $t$
- Points at negative $t$ move to positive $t$
- The value at $t = 0$ stays unchanged

**Application**: Playing audio backward, analyzing even/odd symmetry.

---

## Combining Operations

### The Order Matters!

When applying multiple operations, the order can change the result.

**Method 1: Replace variable systematically**

For $y(t) = x(at + b)$:
1. First substitute $t' = at + b$  
2. Solve: $t = (t' - b)/a$
3. Apply inverse operations to find where features land

**Method 2: Inside-out approach**

For $x(2t - 6) = x(2(t - 3))$:
1. First shift: $x(t) \to x(t-3)$ (shift right by 3)
2. Then scale: $x(t-3) \to x(2t-3)$... 

Wait! This doesn't work directly. Let's be more careful:

[[visual:combined-transformations]]

### Correct Approach for $x(at - b)$

**Step 1**: Identify anchor points in original $x(t)$
**Step 2**: New location = (original location + $b/a$) / $a$... 

Actually, the cleanest method:

**For $x(at + b)$**: The point that was at $t = t_0$ is now at $t = (t_0 - b)/a$

**Example**: $x(2t - 4)$
- Original feature at $t = 0$ → now at $t = (0 - (-4))/2 = 2$
- Original feature at $t = 2$ → now at $t = (2 - (-4))/2 = 3$

---

## Discrete-Time Transformations

The same operations apply to discrete-time signals $x[n]$:

| Operation | Notation | Effect |
|-----------|----------|--------|
| Shift | $x[n - n_0]$ | Delay by $n_0$ samples |
| Decimation | $x[Mn]$ | Keep every $M$th sample |
| Reversal | $x[-n]$ | Flip about $n = 0$ |

[[visual:discrete-transformations]]

**Important difference**: Discrete scaling only makes sense for integer factors (otherwise you'd need samples at non-integer indices).

---

## Transformation Examples

### Example 1: Rectangular Pulse

Let $x(t) = u(t) - u(t-2)$ (pulse from 0 to 2)

Find $y(t) = x(t-1)$:
- Shift everything right by 1
- Result: $y(t) = u(t-1) - u(t-3)$ (pulse from 1 to 3)

[[visual:pulse-shift-example]]

### Example 2: Combined Operations

Let $x(t)$ be a triangular pulse centered at $t = 0$, spanning $[-1, 1]$.

Find $y(t) = x(2t + 3)$:

Original feature at $t = 0$ → now at $t = (0 - 3)/2 = -1.5$
Original span $[-1, 1]$ → new span $[(-1-3)/2, (1-3)/2] = [-2, -1]$

The pulse is compressed by 2 and shifted left by 1.5 (centered at -1.5).

---

## Summary: Transformation Quick Reference

| Original | Transformation | Result |
|----------|---------------|--------|
| $x(t)$ | $x(t - t_0)$ | Shift right by $t_0$ |
| $x(t)$ | $x(t + t_0)$ | Shift left by $t_0$ |
| $x(t)$ | $x(at)$, $a > 1$ | Compress by $a$ |
| $x(t)$ | $x(at)$, $0 < a < 1$ | Expand by $1/a$ |
| $x(t)$ | $x(-t)$ | Reflect about origin |
| $x(t)$ | $x(at + b)$ | Feature at $t_0$ moves to $(t_0 - b)/a$ |

