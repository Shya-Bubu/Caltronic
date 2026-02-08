# System Classifications

> **Why This Matters**: Before analyzing any system, you must know what type it is. These classifications determine which mathematical tools you can use and what properties you can exploit for design.

---

## The Four Critical System Properties

Every system can be classified along four independent dimensions. Each property answers a specific question about system behavior:

[[visual:system-properties-overview]]

| Property | Question | Why It Matters |
|----------|----------|----------------|
| **Memory** | Does current output depend on past/future inputs? | Determines if system stores information |
| **Causality** | Does output depend only on present/past inputs? | Determines if system is physically realizable |
| **Time-Invariance** | Does system behavior change over time? | Allows simpler frequency-domain analysis |
| **Linearity** | Does superposition hold? | Enables decomposition and powerful analysis tools |

---

## Memory vs Memoryless Systems

### Memoryless (Static) Systems

A system is **memoryless** if the output at time $t$ depends ONLY on the input at time $t$:

$$y(t) = f(x(t))$$

[[visual:memoryless-system]]

**Examples**:
- Resistor: $v(t) = R \cdot i(t)$
- Ideal diode: $v = f(i)$ at each instant
- Square-law device: $y(t) = x^2(t)$

### Systems with Memory

A system has **memory** if output depends on past or future inputs:

$$y(t) = f(..., x(t-1), x(t), x(t+1), ...)$$

**Examples**:
- Capacitor: $v(t) = \frac{1}{C}\int_{-\infty}^{t} i(\tau) d\tau$ (integrates past current)
- Delay line: $y(t) = x(t - T)$ (remembers past input)
- Moving average: $y[n] = \frac{1}{3}(x[n] + x[n-1] + x[n-2])$

[[visual:memory-system-examples]]

---

## Causal vs Non-Causal Systems

### Causal Systems

A system is **causal** if output at time $t$ depends only on inputs at time $t$ or earlier:

$$y(t) \text{ depends only on } x(\tau) \text{ for } \tau \leq t$$

[[visual:causal-system]]

**Physical systems are inherently causal** — we can't respond to future inputs we haven't received yet!

**Examples**:
- All real-time electronic circuits
- $y(t) = x(t) + x(t-1)$ ✅ Causal
- $y(t) = x(t) \cdot x(t-2)$ ✅ Causal

### Non-Causal Systems

A system is **non-causal** if output depends on future inputs:

$$y(t) \text{ depends on } x(\tau) \text{ for some } \tau > t$$

**Examples**:
- $y(t) = x(t+1)$ ❌ Non-causal (looks into future)
- $y[n] = x[n] + x[n+1]$ ❌ Non-causal

<details>
<summary>🧠 <strong>Pause & Think</strong>: Can non-causal systems exist in practice?</summary>

YES! Non-causal systems can be implemented when:
1. **Offline processing**: Process recorded signals where "future" data is already available
2. **Image processing**: Process entire image at once (no time direction)
3. **Ideal filters**: Theoretical constructs for analysis

Example: Video editor applies effects using "future" frames because the entire video is already recorded.
</details>

---

## Time-Invariant vs Time-Varying Systems

### Time-Invariant (TI) Systems

A system is **time-invariant** if shifting the input causes the same shift in output:

$$\text{If } x(t) \to y(t), \text{ then } x(t-t_0) \to y(t-t_0)$$

[[visual:time-invariance-test]]

**Physical meaning**: The system behaves the same way regardless of WHEN you apply the input.

**Examples**:
- $y(t) = 3x(t) + 2$ ✅ TI
- $y(t) = \cos(\omega_0 t) \cdot x(t)$ ❌ Time-varying (multiplier changes with time)
- $y(t) = x(2t)$ ❌ Time-varying (time scaling)

### Time-Varying (TV) Systems

Systems whose behavior changes over time:

$$y(t) = t \cdot x(t)$$ — the gain increases linearly with time!

[[visual:time-varying-example]]

---

## Linear vs Nonlinear Systems

### Linear Systems

A system is **linear** if it satisfies **superposition**:

1. **Additivity**: $T\{x_1 + x_2\} = T\{x_1\} + T\{x_2\}$
2. **Homogeneity**: $T\{ax\} = a \cdot T\{x\}$

Combined: $T\{ax_1 + bx_2\} = a \cdot T\{x_1\} + b \cdot T\{x_2\}$

[[visual:superposition-principle]]

**Examples**:
- $y = 5x$ ✅ Linear
- $y = dx/dt$ ✅ Linear (differentiation)
- $y = \int x \, dt$ ✅ Linear (integration)

### Nonlinear Systems

Any system that violates superposition:

**Examples**:
- $y = x^2$ ❌ Nonlinear ($(ax)^2 \neq a(x^2)$ in general)
- $y = \log(x)$ ❌ Nonlinear
- $y = x + 5$ ❌ Nonlinear (zero input gives non-zero output!)

[[visual:nonlinear-examples]]

---

## LTI Systems: The Golden Standard

A system that is BOTH **Linear** AND **Time-Invariant** is called an **LTI system**.

[[visual:lti-system-importance]]

**Why LTI systems are special**:
1. Completely characterized by impulse response $h(t)$
2. Output = Convolution: $y(t) = x(t) * h(t)$
3. Frequency domain analysis using Fourier/Laplace transforms
4. Can be analyzed using powerful linear algebra techniques

> **Key Insight**: Most of signals and systems theory focuses on LTI systems because they're mathematically tractable AND accurately model many real-world systems.

---

## Testing for System Properties

### Mathematical Tests

| Property | Test |
|----------|------|
| **Memoryless** | Does $y(t)$ depend ONLY on $x(t)$? |
| **Causal** | Does $y(t)$ depend on $x(\tau)$ for any $\tau > t$? |
| **TI** | Does $x(t-t_0) \to y(t-t_0)$? |
| **Linear** | Does $T\{ax_1 + bx_2\} = aT\{x_1\} + bT\{x_2\}$? |

### Quick Classification Example

System: $y(t) = \int_{-\infty}^{t} x(\tau) e^{-(t-\tau)} d\tau$

- **Memory?** YES — integrates over all past inputs
- **Causal?** YES — upper limit is $t$, not $\infty$
- **TI?** YES — shifting input shifts output
- **Linear?** YES — integration is linear

Therefore: This is a **causal LTI system with memory**.

---

## Summary Table

| System | Memoryless | Causal | TI | Linear |
|--------|------------|--------|-----|--------|
| $y = 2x(t)$ | ✅ | ✅ | ✅ | ✅ |
| $y = x(t-2)$ | ❌ | ✅ | ✅ | ✅ |
| $y = x(t+1)$ | ❌ | ❌ | ✅ | ✅ |
| $y = tx(t)$ | ✅ | ✅ | ❌ | ✅ |
| $y = x^2(t)$ | ✅ | ✅ | ✅ | ❌ |
