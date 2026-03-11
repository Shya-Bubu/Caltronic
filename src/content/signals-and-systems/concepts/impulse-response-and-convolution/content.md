# Impulse Response & The Convolution Integral

> **Why This Matters**: This is arguably the single most important concept in all of Signals & Systems. The convolution integral tells you how to find the output of **any** LTI system for **any** input — if you know just one function: the impulse response $h(t)$. This one concept connects everything: system classification, Fourier analysis, Laplace transforms, and circuit analysis. Master this, and the entire course clicks into place.

## Domains for Analysis

Before diving into the convolution integral, let's see the bigger picture. There are two domains for analysing systems:

**Time Domain:**
- Continuous: $x(t)$, $y(t)$
- Discrete: $x[n]$, $y[n]$

**Frequency Domain:**
- Fourier Transform (for signals)
- **Laplace Transform** (for CT systems)
- Z-Transform (for DT systems)

[[visual:lecture-page-3]]

The time domain gives physical intuition. The frequency domain gives mathematical power. You'll need both.

## The Dirac Delta — A Perfect Spike

The **Dirac delta function** $\delta(t)$ is a mathematical idealisation: an infinitely narrow, infinitely tall pulse with unit area.

[[visual:delta-function-plotly]]

It's defined as the limit of a rectangular pulse $\delta_\Delta(t)$ of width $\Delta$ and height $1/\Delta$ as $\Delta \to 0$:

$$\delta_\Delta(t) = \begin{cases} \frac{1}{\Delta}, & -\frac{\Delta}{2} \leq t \leq \frac{\Delta}{2} \\ 0, & \text{otherwise} \end{cases}$$

$$\delta(t) = \lim_{\Delta \to 0} \delta_\Delta(t)$$

The key property — the **sifting property** — is:

$$\boxed{\int_{-\infty}^{\infty} x(\tau) \delta(\tau - t_0) \, d\tau = x(t_0)}$$

The delta function "picks out" the value of any signal at the specified time.

## The Impulse Response $h(t)$

The **impulse response** is what the system outputs when you feed it a Dirac delta:

$$\delta(t) \longrightarrow \boxed{\text{LTI System}} \longrightarrow h(t)$$

[[visual:impulse-response-concept]]

This single function $h(t)$ **completely characterises** the LTI system. Once you know $h(t)$, you can compute the output for any input. Let's see why.

## Deriving the Convolution Integral — Step by Step

This is the most beautiful derivation in the course. We'll build it up piece by piece, using the lecture's exact approach.

### Step 1: Approximate the Input with Rectangles

Any continuous signal $x(t)$ can be approximated by a sum of narrow rectangular pulses of width $\Delta$:

$$x^\Delta(t) = \sum_{k=-\infty}^{\infty} x(k\Delta) \cdot \delta_\Delta(t - k\Delta) \cdot \Delta$$

[[visual:signal-approximation-plotly]]

Each rectangle has height $x(k\Delta)$ and width $\Delta$, centred at time $t = k\Delta$.

### Step 2: Response to Each Rectangle

When $\delta_\Delta(t)$ is input to the system, it produces response $h_\Delta(t)$.

By **scaling** (linearity):

$$x(k\Delta) \cdot \delta_\Delta(t) \longrightarrow x(k\Delta) \cdot h_\Delta(t)$$

By **time invariance**:

$$x(k\Delta) \cdot \delta_\Delta(t - k\Delta) \cdot \Delta \longrightarrow x(k\Delta) \cdot h_\Delta(t - k\Delta) \cdot \Delta$$

[[visual:lecture-page-5]]

### Step 3: Sum by Additivity (Superposition)

By **additivity** (linearity), the response to the sum of all rectangles is the sum of individual responses:

$$\sum_{k=-\infty}^{\infty} x(k\Delta) \cdot \delta_\Delta(t - k\Delta) \cdot \Delta \longrightarrow \sum_{k=-\infty}^{\infty} x(k\Delta) \cdot h_\Delta(t - k\Delta) \cdot \Delta$$

### Step 4: Take the Limit $\Delta \to 0$

As $\Delta \to 0$, the rectangles become infinitely narrow, the sum becomes an integral, $\delta_\Delta \to \delta$, and $h_\Delta \to h$:

$$x(t) = \int_{-\infty}^{\infty} x(\tau) \delta(t - \tau) \, d\tau \longrightarrow y(t) = \int_{-\infty}^{\infty} x(\tau) h(t - \tau) \, d\tau$$

[[visual:convolution-integral-plotly]]

The left side is the sifting property (reconstructing $x(t)$). The right side is the **convolution integral**:

$$\boxed{y(t) = \int_{-\infty}^{\infty} x(\tau) \, h(t - \tau) \, d\tau = x(t) * h(t)}$$

The symbol $*$ denotes convolution.

> **Key Insight**: Every step in this derivation used one of the LTI properties! Scaling → Time Invariance → Additivity → Limit. That's why the convolution formula works **only for LTI systems**. If either linearity or time invariance fails, this entire derivation breaks down.

## Understanding Convolution Intuitively

What does the convolution integral actually do? Here's the physical picture:

1. **Flip** the impulse response: $h(\tau) \to h(-\tau)$ (mirror about $\tau = 0$)
2. **Shift** by $t$: $h(-\tau) \to h(t - \tau)$
3. **Multiply** $x(\tau)$ and $h(t - \tau)$ together
4. **Integrate** (sum the product over all $\tau$)
5. The result is $y(t)$ at that specific time $t$

Repeat for every value of $t$ to get the full output.

[[visual:convolution-steps-plotly]]

<details>
<summary><strong>Pause & Think</strong>: Why is the impulse response flipped (reversed) in convolution?</summary>

When you slide the impulse response along the time axis, you're asking: "at time $t$, how much does each past input value $x(\tau)$ contribute to the output?" The contribution weights come from $h(t-\tau)$ — the impulse response evaluated at the elapsed time since that input arrived. Looking backward in time from $t$ naturally involves reversing the impulse response. It's like reading a history book from the present moment backwards.

</details>

## Special Cases

### Unit Step Response

The response to a unit step $u(t)$ is called the **step response**:

$$u(t) = \int_{0}^{\infty} \delta(t - \tau) \, d\tau$$

So the step response is:

$$s(t) = u(t) * h(t) = \int_{0}^{t} h(\tau) \, d\tau$$

The step response is the integral of the impulse response! Conversely:

$$h(t) = \frac{ds(t)}{dt}$$

[[visual:step-response-plotly]]

<details>
<summary><strong>Pause & Think</strong>: If the step response of a system is an exponential $s(t) = (1 - e^{-t/RC})u(t)$, what is $h(t)$?</summary>

Differentiate: $h(t) = ds/dt = \frac{1}{RC} e^{-t/RC} u(t)$. This is the impulse response of an RC low-pass filter! The step response is a charging exponential; the impulse response is a decaying exponential. You'll see this exact result when we derive the RC transfer function.

</details>

[[visual:lecture-page-4]]

## Summary

- The **impulse response** $h(t)$ completely characterises an LTI system
- The **convolution integral** $y(t) = \int x(\tau) h(t-\tau) d\tau$ gives the output for any input
- Convolution is derived using **all three LTI properties**: scaling, time invariance, additivity
- The derivation goes: approximate input with rectangles → use LTI properties → take the limit
- Convolution involves: flip $h$, shift by $t$, multiply with $x$, integrate
- Step response = integral of impulse response; $h(t) = ds(t)/dt$
- Convolution in time is computationally expensive — the Laplace transform will simplify it
