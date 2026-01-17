# Energy Signals vs Power Signals

> **Narrative thread:** This classification determines whether a signal represents a finite burst or a continuous hum — critical for hardware design, battery life, and system analysis.

---

## FROM BASICS: The Battery vs Power Plant Analogy

Recall from A-Level physics:
- **Energy** is the capacity to do work (Joules)
- **Power** is the rate of energy flow (Watts = Joules/second)

For a resistor with current $I$ and voltage $V$:
- Power dissipated: $P = VI = I^2R$ (Watts)
- Energy consumed over time T: $E = P \cdot T$ (Joules)

Now apply this to signals. The signal $x(t)$ carries "energy content" proportional to $|x(t)|^2$.

---

## THE BIG IDEA: Finite Burst vs Endless Hum

[[visual:v1]]

The rectangular pulse above is an **energy signal**. Notice how it exists only for a limited time — like a flashlight with a battery, it eventually "runs out."

[[visual:v2]]

The sinusoid above is a **power signal**. It extends forever in both directions — like a power grid, it delivers continuous power indefinitely.

---

## Formal Definitions

### Energy of a Signal

The **total energy** of a continuous-time signal:

$$\boxed{E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt}$$

For discrete-time:
$$E = \sum_{n=-\infty}^{\infty} |x[n]|^2$$

### Power of a Signal

The **average power** of a signal:

$$\boxed{P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt}$$

For discrete-time:
$$P = \lim_{N \to \infty} \frac{1}{2N+1} \sum_{n=-N}^{N} |x[n]|^2$$

---

## The Mutual Exclusion Principle

Here's the critical insight:

> **A signal is either an energy signal OR a power signal. Never both!**

| Signal Type | Total Energy E | Average Power P |
|-------------|----------------|-----------------|
| **Energy signal** | Finite | Zero |
| **Power signal** | Infinite | Finite |
| **Neither** | Infinite | Infinite (rare) |

### Why the exclusion?

**If E is finite:**
$$P = \lim_{T \to \infty} \frac{E}{2T} = \frac{\text{finite}}{\infty} = 0$$

**If P is finite and non-zero:**
$$E = P \times \text{(infinite time)} = \infty$$

---

## BUILDING UNDERSTANDING: Classifying Common Signals

### Example 1: Rectangular Pulse

$$x(t) = \begin{cases} A & |t| < T_0 \\ 0 & \text{otherwise} \end{cases}$$

**Energy:**
$$E = \int_{-T_0}^{T_0} A^2 \, dt = 2A^2 T_0 < \infty \checkmark$$

**Classification:** Energy signal

---

### Example 2: Sinusoid

$$x(t) = A\cos(\omega_0 t)$$

**Energy:**
$$E = \int_{-\infty}^{\infty} A^2\cos^2(\omega_0 t) \, dt = \infty$$

**Power:**
$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} A^2\cos^2(\omega_0 t) \, dt = \frac{A^2}{2}$$

**Classification:** Power signal with $P = A^2/2$

---

### Example 3: DC Signal

$$x(t) = C \quad \text{(constant)}$$

**Energy:** $E = \int_{-\infty}^{\infty} C^2 \, dt = \infty$

**Power:** $P = \lim \frac{1}{2T} \int_{-T}^{T} C^2 \, dt = C^2$

**Classification:** Power signal with $P = C^2$

---

### Example 4: Unit Step

$$u(t) = \begin{cases} 1 & t \geq 0 \\ 0 & t < 0 \end{cases}$$

[[visual:v4]]

**Energy:** $E = \int_0^{\infty} 1 \, dt = \infty$

**Power:** $P = \lim_{T \to \infty} \frac{1}{2T} \int_0^{T} 1 \, dt = \frac{1}{2}$

**Classification:** Power signal with $P = 1/2$

---

## Quick Classification Algorithm

```
1. Calculate E = ∫|x(t)|² dt

2. If E < ∞ → ENERGY SIGNAL ✓
   (Average power will be zero)

3. If E = ∞ → Calculate P = lim (1/2T)∫|x(t)|² dt

4. If P < ∞ → POWER SIGNAL ✓
   (Total energy is infinite)

5. If both E = ∞ and P = ∞ → NEITHER
   (Pathological case, rare in practice)
```

---

## Why This Classification Matters

| Application | Relevance |
|-------------|-----------|
| **Fourier Transform** | Energy signals have nice transforms (Parseval's theorem) |
| **Communication** | Data packets = energy signals, carriers = power signals |
| **Battery design** | Energy signals drain battery predictably |
| **Thermal analysis** | Power signals determine heat dissipation |

---

## Key Takeaways

1. **Energy signals** have finite $E = \int |x(t)|^2 dt$ and zero average power
2. **Power signals** have finite $P = \lim (1/2T)\int |x(t)|^2 dt$ and infinite energy
3. A signal is **never both** — they're mutually exclusive
4. Pulses, transients → energy signals
5. Sinusoids, periodic, DC → power signals

---

*Next: We'll learn how to sketch and manipulate these signals graphically.*
