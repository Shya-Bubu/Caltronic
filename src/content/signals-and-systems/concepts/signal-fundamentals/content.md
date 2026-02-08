# Signal Fundamentals and Classifications

> **Why This Matters**: Signals and systems form the foundation of ALL electrical engineering. Whether you work in power, communications, control systems, AI, or signal processing—everything builds on these fundamentals. Master this, and you unlock every advanced topic.

---

## What is a Signal?

A **signal** is a variation of a physical property over time (or another independent variable).

Right now, as you watch this, you're receiving multiple signals simultaneously:

- **Acoustic signal**: Air pressure fluctuations carrying my voice
- **Video signal**: Light intensity variations creating this image  
- **Electrical signal**: Voltage fluctuations in your device's circuits

[[visual:everyday-signals]]

But signals extend far beyond electrical engineering:

| Signal Type | Physical Property | Independent Variable |
|-------------|-------------------|---------------------|
| Speech | Air pressure | Time |
| ECG | Heart voltage | Time |
| Image | Light intensity | Spatial position (x, y) |
| Temperature record | Temperature | Time |
| Stock price | Currency value | Time |

**Key Insight**: The signal's **dependent variable** (voltage, pressure, etc.) changes as the **independent variable** (usually time) progresses.

---

## Signal Dimensionality

Most signals you'll imagine are **1D signals**—one value plotted against time:

$$x(t) = \text{voltage at time } t$$

But signals can be multi-dimensional:

- **2D signals**: Images have intensity at position $(x, y)$
- **3D signals**: Video has RGB values at $(x, y)$ changing with time $t$
- **Position signals**: $(x(t), y(t), z(t))$ tracking movement through space

**Example**: Consider a single pixel in a video. Its red, green, and blue values each form separate 1D signals as they change over time. One pixel alone generates 3 signals!

<details>
<summary>🧠 <strong>Pause & Think</strong>: How many independent signals does a 1920×1080 video at 30fps generate per second?</summary>

Each pixel has 3 color channels (RGB). Total pixels = 1920 × 1080 = 2,073,600.

Per frame: 2,073,600 × 3 = 6,220,800 values  
Per second (30 fps): 6,220,800 × 30 = **186,624,000 values/second**

This is why video compression is so important!
</details>

---

## What is a System?

A **system** is an interconnection of components that transforms an input signal into an output signal.

$$\text{Input } x(t) \longrightarrow \boxed{\text{SYSTEM}} \longrightarrow \text{Output } y(t)$$

[[visual:system-block-diagram]]

**Real-World Example Chain**:
1. **Microphone** (system): Acoustic signal → Electrical signal
2. **Amplifier** (system): Low-power signal → High-power signal  
3. **Speaker** (system): Electrical signal → Acoustic signal

Each component is a system with its own input-output relationship. Systems can be connected in chains, and signals flow between them.

---

## Classification 1: Continuous-Time vs Discrete-Time

### Continuous-Time (CT) Signals

A **continuous-time signal** $x(t)$ is defined for **all** real values of $t$.

$$x(t) = A\cos(\omega t)$$

[[visual:continuous-signal-plot]]

The signal has a value at $t = 0$, at $t = 0.001$, at $t = \pi/7$—everywhere on the time axis.

**Notation**: Parentheses indicate continuous-time: $x(t)$

### Discrete-Time (DT) Signals

A **discrete-time signal** $x[n]$ is defined **only** at integer values of $n$.

$$x[n] = A\cos(\Omega n)$$

[[visual:discrete-signal-plot]]

The signal only exists at $n = 0, 1, 2, 3, \ldots$ — not between these points.

**Notation**: Square brackets indicate discrete-time: $x[n]$

### How Discrete Signals Are Created: Sampling

To create a discrete signal from a continuous one, we **sample** — selecting values at regular intervals:

$$x[n] = x(nT_s)$$

where $T_s$ is the **sampling period** and $f_s = 1/T_s$ is the **sampling frequency**.

[[visual:sampling-process]]

<details>
<summary>🧠 <strong>Pause & Think</strong>: If you sample a 1 kHz sine wave at 8000 samples/second, how many samples do you get per cycle of the sine wave?</summary>

Sine wave frequency: 1000 Hz → Period = 1/1000 = 0.001 seconds = 1 ms

Sampling frequency: 8000 Hz → Sampling period = 1/8000 = 0.000125 seconds

Samples per cycle = Period / Sampling period = 0.001 / 0.000125 = **8 samples per cycle**

This is why telephone audio (8 kHz sampling) sounds acceptable for voice (max ~4 kHz).
</details>

---

## Classification 2: Deterministic vs Random

### Deterministic Signals

A **deterministic signal** can be expressed by an explicit mathematical equation. Given the time $t$, you know the **exact** value with probability 1.

$$x(t) = 5\cos(2\pi \cdot 100 \cdot t)$$

At $t = 0.005$: $x(0.005) = 5\cos(\pi) = -5$ (exactly, with certainty)

### Random (Stochastic) Signals

A **random signal** cannot be expressed by a simple equation. Each time instant has a **probability distribution** of possible values.

[[visual:random-vs-deterministic]]

**Example**: Noise in a circuit. At time $t$, the voltage might be anywhere between $-1\text{mV}$ and $+1\text{mV}$ with some probability distribution—you can't predict the exact value.

**Key Distinction**:
- **Deterministic**: Value is known with certainty
- **Random**: Value exists on a probability distribution

> **Course Focus**: We primarily study deterministic signals in second and third year. Random signals are covered in advanced courses (communication theory, stochastic signal processing).

---

## Classification 3: Energy Signals vs Power Signals

This classification asks: **Does the signal have finite total energy or finite average power?**

### Signal Energy

For a continuous-time signal, the **total energy** is:

$$E_\infty = \lim_{T \to \infty} \int_{-T}^{T} |x(t)|^2 \, dt = \int_{-\infty}^{\infty} |x(t)|^2 \, dt$$

For a discrete-time signal:

$$E_\infty = \sum_{n=-\infty}^{\infty} |x[n]|^2$$

**Why $|x(t)|^2$?** For complex-valued signals, $|x(t)|^2 = x(t) \cdot x^*(t)$ where $x^*(t)$ is the complex conjugate. This ensures energy is always real and non-negative.

### Signal Power

The **average power** is the energy per unit time:

$$P_\infty = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 \, dt$$

For discrete-time:

$$P_\infty = \lim_{N \to \infty} \frac{1}{2N+1} \sum_{n=-N}^{N} |x[n]|^2$$

<details>
<summary>🧠 <strong>Pause & Think</strong>: Why do we divide by $2T$ (not just $T$) in the power formula?</summary>

Because we're integrating from $-T$ to $+T$, which is a total duration of $2T$.

If we only integrated from $0$ to $T$, we'd divide by $T$.
</details>

### Energy Signal vs Power Signal

| Type | Energy | Power | Example |
|------|--------|-------|---------|
| **Energy Signal** | Finite ($E < \infty$) | Zero ($P = 0$) | Pulses, decaying exponentials |
| **Power Signal** | Infinite ($E = \infty$) | Finite ($0 < P < \infty$) | Sinusoids, constants, periodic signals |
| **Neither** | Infinite | Infinite | Growing exponential $e^t$ |

**Critical Insight**: A signal **cannot** be both an energy signal and a power signal simultaneously!

---

## Worked Example: Energy of a Triangular Pulse

[[visual:triangular-pulse]]

Consider the signal:
$$x(t) = \begin{cases} 1 - \frac{|t|}{T} & |t| \leq T \\ 0 & |t| > T \end{cases}$$

**Step 1**: Understand the shape. At $t=0$: $x(0) = 1$. At $t = \pm T$: $x(\pm T) = 0$. This is a triangular pulse.

**Step 2**: Set up the energy integral.

$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt = \int_{-T}^{T} \left(1 - \frac{|t|}{T}\right)^2 dt$$

**Step 3**: Split by symmetry. Since the function is even, we can compute from $0$ to $T$ and double:

$$E = 2 \int_{0}^{T} \left(1 - \frac{t}{T}\right)^2 dt$$

**Step 4**: Expand and integrate.

$$E = 2 \int_{0}^{T} \left(1 - \frac{2t}{T} + \frac{t^2}{T^2}\right) dt$$

$$E = 2 \left[ t - \frac{t^2}{T} + \frac{t^3}{3T^2} \right]_0^T$$

$$E = 2 \left( T - T + \frac{T}{3} \right) = \frac{2T}{3}$$

**Conclusion**: The triangular pulse has finite energy $E = \frac{2T}{3}$, so it's an **energy signal**.

<details>
<summary>🧠 <strong>Pause & Think</strong>: If you double the width of the triangular pulse (use $2T$ instead of $T$), what happens to the energy?</summary>

With width $2T$: $E = \frac{2(2T)}{3} = \frac{4T}{3}$

The energy **doubles** when the width doubles (while keeping the same height).

This makes sense: we're adding more "area under the squared curve."
</details>

---

## Worked Example: Power of a Sinusoid

Consider $x(t) = A\sin(\omega t)$. Is this an energy signal or power signal?

**Step 1**: Calculate total energy.

$$E = \int_{-\infty}^{\infty} A^2\sin^2(\omega t) \, dt$$

The integral of $\sin^2$ over all time is infinite. So $E = \infty$.

**Not an energy signal.**

**Step 2**: Calculate average power.

$$P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} A^2\sin^2(\omega t) \, dt$$

Use the trigonometric identity:

$$\sin^2(\omega t) = \frac{1 - \cos(2\omega t)}{2}$$

Substituting:

$$P = \lim_{T \to \infty} \frac{A^2}{2T} \int_{-T}^{T} \frac{1 - \cos(2\omega t)}{2} \, dt$$

$$P = \lim_{T \to \infty} \frac{A^2}{4T} \left[ \int_{-T}^{T} 1 \, dt - \int_{-T}^{T} \cos(2\omega t) \, dt \right]$$

The first integral gives $2T$.

The second integral: $\int_{-T}^{T} \cos(2\omega t) \, dt = \frac{\sin(2\omega T)}{2\omega} \Big|_{-T}^{T} = \frac{2\sin(2\omega T)}{2\omega}$

As $T \to \infty$, this term oscillates between fixed bounds while being divided by $T \to \infty$, so it vanishes.

$$P = \frac{A^2}{4T} \cdot 2T = \frac{A^2}{2}$$

**Conclusion**: Sinusoids are **power signals** with $P = \frac{A^2}{2}$.

> **🔑 Key Formula**: For $x(t) = A\sin(\omega t)$ or $x(t) = A\cos(\omega t)$:
> $$P = \frac{A^2}{2}$$

---

## Classification 4: Even and Odd Signals

### Even Signals

An **even signal** satisfies: $x(t) = x(-t)$ for all $t$.

[[visual:even-signal-symmetry]]

**Geometric meaning**: Mirror symmetry about the vertical axis.

**Examples**: $\cos(t)$, $|t|$, $t^2$, $e^{-|t|}$

### Odd Signals

An **odd signal** satisfies: $x(t) = -x(-t)$ for all $t$.

[[visual:odd-signal-symmetry]]

**Geometric meaning**: Rotational symmetry about the origin (180°).

**Examples**: $\sin(t)$, $t$, $t^3$

**Important property**: For odd signals, $x(0)$ must equal $-x(0)$, which means $x(0) = 0$.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is $e^t$ even, odd, or neither?</summary>

Test at specific point: $e^{-1} = 0.368$ but $e^{1} = 2.718$

$e^t \neq e^{-t}$ (not even)  
$e^t \neq -e^{-t}$ (not odd)

$e^t$ is **neither** even nor odd.
</details>

---

## Even-Odd Decomposition (Critical Skill!)

**Any signal can be decomposed into the sum of an even and an odd component.**

Define:
- **Even component**: $x_e(t) = \frac{x(t) + x(-t)}{2}$
- **Odd component**: $x_o(t) = \frac{x(t) - x(-t)}{2}$

Then: $x(t) = x_e(t) + x_o(t)$

### Proof that $x_e(t)$ is Even

$$x_e(-t) = \frac{x(-t) + x(-(-t))}{2} = \frac{x(-t) + x(t)}{2} = x_e(t) \checkmark$$

### Proof that $x_o(t)$ is Odd

$$x_o(-t) = \frac{x(-t) - x(-(-t))}{2} = \frac{x(-t) - x(t)}{2} = -\frac{x(t) - x(-t)}{2} = -x_o(t) \checkmark$$

### Proof of Reconstruction

$$x_e(t) + x_o(t) = \frac{x(t) + x(-t)}{2} + \frac{x(t) - x(-t)}{2} = \frac{2x(t)}{2} = x(t) \checkmark$$

### Worked Example: Decompose $x(t) = e^t$

**Even component**:
$$x_e(t) = \frac{e^t + e^{-t}}{2} = \cosh(t)$$

**Odd component**:
$$x_o(t) = \frac{e^t - e^{-t}}{2} = \sinh(t)$$

**Verification**: $\cosh(t) + \sinh(t) = \frac{e^t + e^{-t}}{2} + \frac{e^t - e^{-t}}{2} = e^t$ ✓

This connects exponentials to hyperbolic functions!

<details>
<summary>🧠 <strong>Pause & Think</strong>: A signal is defined as $x(t) = t$ for $-1 \leq t \leq 1$, zero elsewhere. Find its even and odd components.</summary>

**Original**: $x(t) = t$ (a ramp from $-1$ to $1$)

**Even component**: $x_e(t) = \frac{t + (-t)}{2} = 0$ for $|t| \leq 1$

**Odd component**: $x_o(t) = \frac{t - (-t)}{2} = t$ for $|t| \leq 1$

The signal $x(t) = t$ is **purely odd** — its even component is zero!
</details>

---

## Classification 5: Periodic vs Aperiodic

### Periodic Signals

A signal is **periodic** with period $T$ if:

$$x(t) = x(t + T) \quad \text{for all } t$$

[[visual:periodic-signal]]

The **fundamental period** $T_0$ is the smallest positive value of $T$ satisfying this condition.

The **fundamental frequency** is $f_0 = \frac{1}{T_0}$ (Hz) and the **angular frequency** is $\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0}$ (rad/s).

### Finding the Period of Complex Exponentials

For $x(t) = e^{j\omega t}$, find the period $T$ such that $x(t) = x(t+T)$:

$$e^{j\omega t} = e^{j\omega(t+T)}$$
$$e^{j\omega t} = e^{j\omega t} \cdot e^{j\omega T}$$
$$1 = e^{j\omega T}$$

Using Euler's formula: $e^{j\omega T} = \cos(\omega T) + j\sin(\omega T) = 1$

This requires: $\cos(\omega T) = 1$ and $\sin(\omega T) = 0$

Therefore: $\omega T = 2n\pi$ for integer $n$

$$T = \frac{2n\pi}{\omega}$$

The fundamental period (smallest positive $T$) is at $n = 1$:

$$\boxed{T_0 = \frac{2\pi}{\omega}}$$

### Aperiodic Signals

Any signal that is not periodic is called **aperiodic**.

**Examples**: Pulses, decaying exponentials, ramps

<details>
<summary>🧠 <strong>Pause & Think</strong>: Is the signal $x(t) = \cos(3t) + \cos(\pi t)$ periodic?</summary>

For the sum of two periodic signals to be periodic, the ratio of their periods must be **rational**.

Period of $\cos(3t)$: $T_1 = \frac{2\pi}{3}$  
Period of $\cos(\pi t)$: $T_2 = \frac{2\pi}{\pi} = 2$

Ratio: $\frac{T_1}{T_2} = \frac{2\pi/3}{2} = \frac{\pi}{3}$

Since $\frac{\pi}{3}$ is **irrational**, the sum is **NOT periodic**!
</details>

---

## Euler's Formula (Your Most Important Tool!)

$$\boxed{e^{j\theta} = \cos\theta + j\sin\theta}$$

This single equation bridges exponentials and trigonometry.

### Key Derived Relationships

From Euler's formula with $+\theta$ and $-\theta$:

$$e^{j\theta} = \cos\theta + j\sin\theta$$
$$e^{-j\theta} = \cos\theta - j\sin\theta$$

Adding them:
$$\boxed{\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}}$$

Subtracting them:
$$\boxed{\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}}$$

### Special Values

| $\theta$ | $e^{j\theta}$ | Meaning |
|----------|---------------|---------|
| $0$ | $1$ | On positive real axis |
| $\pi/2$ | $j$ | On positive imaginary axis |
| $\pi$ | $-1$ | On negative real axis (Euler's identity!) |
| $3\pi/2$ | $-j$ | On negative imaginary axis |
| $2\pi$ | $1$ | Back to start (period!) |

### Euler's Identity

Setting $\theta = \pi$:

$$e^{j\pi} = \cos\pi + j\sin\pi = -1 + j(0) = -1$$

$$\boxed{e^{j\pi} + 1 = 0}$$

This connects the five most important mathematical constants: $e$, $j$ (or $i$), $\pi$, $1$, and $0$.

<details>
<summary>🧠 <strong>Pause & Think</strong>: Simplify $e^{j\pi/4}$ into rectangular form.</summary>

$$e^{j\pi/4} = \cos\frac{\pi}{4} + j\sin\frac{\pi}{4} = \frac{\sqrt{2}}{2} + j\frac{\sqrt{2}}{2} = \frac{1+j}{\sqrt{2}}$$

This represents a unit vector at 45° in the complex plane.
</details>

---

## Summary: Signal Classification Tree

```
SIGNALS
├── By Time Definition
│   ├── Continuous-time: x(t)
│   └── Discrete-time: x[n]
│
├── By Predictability  
│   ├── Deterministic: Exact value known
│   └── Random: Probability distribution
│
├── By Energy/Power
│   ├── Energy signal: E < ∞, P = 0
│   ├── Power signal: E = ∞, P < ∞
│   └── Neither: E = ∞, P = ∞
│
├── By Symmetry
│   ├── Even: x(t) = x(-t)
│   ├── Odd: x(t) = -x(-t)
│   └── Neither (decomposable into even + odd)
│
└── By Repetition
    ├── Periodic: x(t) = x(t+T)
    └── Aperiodic: Not periodic
```

---

## Key Formulas to Memorize

| Concept | Formula |
|---------|---------|
| Signal energy (CT) | $E = \int_{-\infty}^{\infty} |x(t)|^2 dt$ |
| Signal power (CT) | $P = \lim_{T \to \infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 dt$ |
| Sinusoid power | $P = A^2/2$ |
| Even component | $x_e(t) = \frac{x(t) + x(-t)}{2}$ |
| Odd component | $x_o(t) = \frac{x(t) - x(-t)}{2}$ |
| Period of $e^{j\omega t}$ | $T = 2\pi/\omega$ |
| Euler's formula | $e^{j\theta} = \cos\theta + j\sin\theta$ |
| Cosine from exponentials | $\cos\theta = \frac{e^{j\theta} + e^{-j\theta}}{2}$ |
| Sine from exponentials | $\sin\theta = \frac{e^{j\theta} - e^{-j\theta}}{2j}$ |
