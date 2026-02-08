# Convolution Fundamentals

> **Why This Matters**: Convolution is the single most important operation in LTI system analysis. It tells you exactly how any input signal gets transformed by a system, using only the impulse response.

---

## The Central Idea

For any LTI system with impulse response $h(t)$, the output $y(t)$ for input $x(t)$ is:

$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau) h(t - \tau) \, d\tau$$

[[visual:convolution-definition]]

This single equation encapsulates all LTI system behavior!

---

## Intuition: Weighted Sum of Shifted Impulses

Here's why convolution works. Any signal can be written as a weighted sum of shifted impulses:

$$x(t) = \int_{-\infty}^{\infty} x(\tau) \delta(t - \tau) \, d\tau$$

[[visual:signal-as-impulses]]

For an LTI system:
- Each impulse $\delta(t - \tau)$ produces response $h(t - \tau)$
- Each response gets weighted by $x(\tau)$
- Total output = sum of all weighted responses

---

## The Convolution Integral

### Continuous-Time

$$y(t) = \int_{-\infty}^{\infty} x(\tau) h(t - \tau) \, d\tau$$

Or equivalently (by substitution):

$$y(t) = \int_{-\infty}^{\infty} h(\tau) x(t - \tau) \, d\tau$$

### Discrete-Time

$$y[n] = \sum_{k=-\infty}^{\infty} x[k] h[n - k]$$

[[visual:discrete-convolution]]

---

## Graphical Convolution

The step-by-step graphical method:

[[visual:graphical-convolution-steps]]

**Step 1**: Choose which signal to flip (usually h)
**Step 2**: Plot $h(-\tau)$ — this is h flipped about τ = 0
**Step 3**: Shift to get $h(t - \tau)$ for specific t value
**Step 4**: Multiply $x(\tau) \cdot h(t - \tau)$ point by point
**Step 5**: Integrate (sum) over all τ to get y(t)
**Step 6**: Repeat for all values of t

<details>
<summary>🧠 <strong>Pause & Think</strong>: Why do we flip and slide?</summary>

The term $h(t - \tau)$ means:
- Take h, flip it to get $h(-\tau)$
- Then shift right by t to get $h(t - \tau)$

As t increases, the flipped h slides across x from left to right. At each position, we compute the "overlap" (product integral).
</details>

---

## Convolution Example

Let $x(t) = u(t)$ (unit step) and $h(t) = e^{-t}u(t)$ (exponential decay).

[[visual:convolution-example]]

$$y(t) = \int_{-\infty}^{\infty} u(\tau) e^{-(t-\tau)} u(t-\tau) \, d\tau$$

For $t > 0$: Integration limits become 0 to t (where both functions are nonzero):

$$y(t) = \int_{0}^{t} e^{-(t-\tau)} \, d\tau = e^{-t} \int_{0}^{t} e^{\tau} \, d\tau = e^{-t}(e^t - 1) = 1 - e^{-t}$$

For $t < 0$: $y(t) = 0$ (no overlap)

Result: $y(t) = (1 - e^{-t})u(t)$

---

## The * Notation

The asterisk * denotes convolution:

$$y = x * h$$

**Warning**: This is NOT multiplication! Don't confuse with $x \cdot h$ or $x \times h$.

---

## Summary

| Concept | Formula |
|---------|---------|
| CT Convolution | $y(t) = \int x(\tau)h(t-\tau)d\tau$ |
| DT Convolution | $y[n] = \sum x[k]h[n-k]$ |
| Graphical Method | Flip h, slide across x, multiply, integrate |
| Key Insight | Output = weighted sum of shifted impulse responses |
