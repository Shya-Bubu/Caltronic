# Continuous vs Discrete Signals

> **Narrative thread:** This is your first major classification. Understanding whether time is "smooth" or "sampled" determines which mathematical tools you'll use and whether your signal can live inside a computer.

---

## FROM BASICS: Two Ways to Measure Time

Think back to your A-Level physics. When you measured the position of a falling ball:
- If you used a **video camera**, you got frames at specific times (e.g., 30 frames per second)
- If you used a **ruler and stopwatch**, you could theoretically measure at ANY instant

This is the fundamental distinction we're about to formalize.

---

## THE BIG IDEA: Smooth vs. Sampled

[[visual:v1]]

The waveform above shows a **continuous-time signal** — notice how the curve is smooth and defined at every instant.

**Continuous-time (CT) signals** exist for ALL values of time. You can zoom in infinitely, and the signal is still defined.

$$x(t), \quad t \in \mathbb{R}$$

The parentheses `( )` indicate continuous time.

---

[[visual:v2]]

Now look at this **discrete-time signal** — notice the individual stems, each representing a sample at a specific integer index.

**Discrete-time (DT) signals** exist only at INTEGER time indices. Between samples? The signal is simply undefined.

$$x[n], \quad n \in \mathbb{Z}$$

The brackets `[ ]` indicate discrete time.

---

## Visual Comparison

| Property | Continuous x(t) | Discrete x[n] |
|----------|-----------------|---------------|
| **Plot style** | Smooth curve | Stem plot (dots) |
| **Time values** | All real numbers | Integers only |
| **Zoom in** | Still defined | Just one point |
| **Hardware** | Analog circuits | Digital processors |
| **Math tools** | Integrals | Summations |

---

## BUILDING UNDERSTANDING: The Sampling Bridge

The natural world is analog — your voice, light, temperature all vary continuously.

But computers are digital — they only understand discrete numbers.

So how do we bridge these two worlds? **Sampling.**

### The Sampling Process

```
Continuous Signal x(t)
        ↓
   [Sample every T_s seconds]
        ↓
Discrete Signal x[n] = x(nT_s)
```

Where:
- $T_s$ = **sampling period** (time between samples)
- $f_s = 1/T_s$ = **sampling frequency** (samples per second)

### Real Example: CD Audio

- Sampling frequency: $f_s = 44,100$ Hz
- Sampling period: $T_s = 1/44100 \approx 22.7 \, \mu s$
- For a 3-minute song: $44100 \times 180 = 7.94$ million samples!

---

## THE CRITICAL WARNING: Aliasing

What happens if you don't sample fast enough?

[[visual:v3]]

The interactive simulation above demonstrates **aliasing** — when a high-frequency signal appears as a low-frequency imposter due to inadequate sampling.

### The Nyquist-Shannon Theorem

> To perfectly capture a signal with maximum frequency $f_{max}$, you must sample at:
> $$f_s > 2 f_{max}$$

This $2 f_{max}$ is called the **Nyquist rate**.

**Example:** To capture audio up to 20 kHz (human hearing limit):
$$f_s > 2 \times 20,000 = 40,000 \text{ Hz}$$

That's why CD audio uses 44,100 Hz — safely above the Nyquist rate!

---

## Why This Classification Matters

| When you work with... | You're using... |
|----------------------|-----------------|
| Analog circuits | Continuous-time signals |
| Microcontrollers | Discrete-time signals |
| Digital filters | Discrete-time systems |
| Control theory | Both, depending on implementation |
| Communications | Continuous transmitted, discrete processed |

---

## Mathematical Implications

The choice between CT and DT changes your entire mathematical toolkit:

| Operation | Continuous-Time | Discrete-Time |
|-----------|-----------------|---------------|
| **System model** | Differential equations | Difference equations |
| **Integration** | $\int_{-\infty}^{\infty}$ | $\sum_{n=-\infty}^{\infty}$ |
| **Convolution** | $x*h = \int x(\tau)h(t-\tau)d\tau$ | $x*h = \sum x[k]h[n-k]$ |
| **Transform** | Laplace, Fourier | Z-transform, DTFT |

---

## Key Takeaways

1. **Continuous signals** x(t) exist for all real t — smooth curves
2. **Discrete signals** x[n] exist only at integers — stem plots
3. **Sampling** converts CT → DT at rate $f_s = 1/T_s$
4. **Nyquist theorem**: Sample at $f_s > 2f_{max}$ to avoid aliasing
5. Different math tools for each — integrals vs. summations

---

*Next: We'll explore another classification — deterministic vs. random signals.*
