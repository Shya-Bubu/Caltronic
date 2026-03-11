# Step Response of LTI Systems

> **Why This Matters**: The step response is what happens when you "switch on" a system — apply a sudden constant input. Every time you flip a switch, power up a circuit, or send a control signal, you're essentially applying a step. Understanding the step response tells you how fast the system responds, whether it overshoots, and when it settles to its final value. It's the single most practical test you can perform on any system.

## The Unit Step Function

The unit step function $u(t)$ is a signal that "turns on" at $t = 0$:

$$u(t) = \begin{cases} 0, & t < 0 \\ 1, & t \geq 0 \end{cases}$$

Its Laplace transform is:

$$U(s) = \mathcal{L}\{u(t)\} = \frac{1}{s}$$

[[visual:step-function-plotly]]

## Computing the Step Response

For an LTI system with transfer function $H(s)$, the step response is:

$$Y(s) = H(s) \cdot U(s) = H(s) \cdot \frac{1}{s}$$

[[visual:step-response-block]]

The procedure is always:
1. Multiply $H(s)$ by $1/s$
2. Perform **partial fraction expansion** on $Y(s)$
3. Take the **inverse Laplace transform** of each term
4. Sum the results to get $y(t)$

## Example: RC Low-Pass Filter Step Response

[[visual:lecture-page-1]]

From Lesson 08, the RC filter has $H(s) = \frac{1}{1 + RCs}$.

### Step 1: Find Y(s)

$$Y(s) = H(s) \cdot U(s) = \frac{1}{1 + RCs} \cdot \frac{1}{s}$$

Rewrite the denominator:

$$Y(s) = \frac{1}{RCs\left(s + \frac{1}{RC}\right)} \cdot \frac{1}{RC \cdot \frac{1}{RC}} = \frac{1}{s\left(s + \frac{1}{RC}\right) \cdot RC}$$

### Step 2: Partial Fraction Expansion

$$Y(s) = \frac{1}{s(s+\frac{1}{RC}) \cdot RC} = \frac{K_1}{s} + \frac{K_2}{s + \frac{1}{RC}}$$

**Finding K₁** (cover-up method, set $s = 0$):

$$K_1 = \left. \frac{1}{(s + \frac{1}{RC})RC} \right|_{s=0} = \frac{1}{\frac{1}{RC} \cdot RC} = 1$$

**Finding K₂** (cover-up method, set $s = -\frac{1}{RC}$):

$$K_2 = \left. \frac{1}{s \cdot RC} \right|_{s=-\frac{1}{RC}} = \frac{1}{-\frac{1}{RC} \cdot RC} = -1$$

So:

$$Y(s) = \frac{1}{s} - \frac{1}{s + \frac{1}{RC}}$$

[[visual:partial-fractions-plotly]]

### Step 3: Inverse Laplace Transform

Using standard pairs: $\mathcal{L}^{-1}\{1/s\} = u(t)$ and $\mathcal{L}^{-1}\{1/(s+a)\} = e^{-at}u(t)$:

$$\boxed{y(t) = u(t) - u(t) \cdot e^{-t/RC} = u(t)\left(1 - e^{-t/RC}\right)}$$

[[visual:lecture-page-2]]

This is the **step response of the RC low-pass filter** — an exponential that starts at 0 and rises towards 1.

[[visual:rc-step-response-plotly]]

## Understanding the Step Response

The step response reveals several key system properties:

### Time Constant $\tau = RC$

At $t = \tau = RC$:

$$y(\tau) = 1 - e^{-1} = 1 - 0.368 = 0.632$$

So after one time constant, the output has reached **63.2%** of its final value. This is the standard definition of the time constant.

| Time | $y(t)$ | % of final value |
|------|--------|-----------------|
| $\tau$ | $1 - e^{-1}$ | **63.2%** |
| $2\tau$ | $1 - e^{-2}$ | 86.5% |
| $3\tau$ | $1 - e^{-3}$ | 95.0% |
| $5\tau$ | $1 - e^{-5}$ | 99.3% |

[[visual:time-constant-table-plotly]]

> **Engineering Rule**: After $5\tau$, the system is considered to have "settled" — the output is within 0.7% of its final value. This is the **settling time** $t_s \approx 5RC$.

<details>
<summary><strong>Pause & Think</strong>: If R = 1 kΩ and C = 1 µF, what is the time constant and settling time?</summary>

$\tau = RC = 1000 \times 10^{-6} = 1$ ms. Settling time $\approx 5\tau = 5$ ms. So the capacitor charges to within 1% of its final voltage in just 5 milliseconds. Smaller RC = faster response. Larger RC = slower response.

</details>

### Initial and Final Values

From the formula:
- **Initial value**: $y(0^+) = 1 - e^0 = 1 - 1 = 0$ ✓ (capacitor starts uncharged)
- **Final value**: $y(\infty) = 1 - e^{-\infty} = 1 - 0 = 1$ ✓ (capacitor charges to full input voltage)

These match our physical intuition perfectly.

## The Step Response in Context

The step response connects to everything:

- **Impulse response**: $h(t) = \frac{dy(t)}{dt} = \frac{1}{RC}e^{-t/RC}u(t)$ — differentiate the step response
- **Transfer function**: $H(s) = s \cdot Y(s)$ when multiplied by $s$ (since $U(s) = 1/s$)
- **Frequency response**: The time constant $\tau = RC$ determines the cutoff frequency $\omega_c = 1/\tau$

[[visual:connections-plotly]]

## Summary

- The **step response** $y(t)$ is the output when $x(t) = u(t)$ (unit step)
- Compute via: $Y(s) = H(s)/s \xrightarrow{\text{PFE}} \xrightarrow{\mathcal{L}^{-1}} y(t)$
- RC filter step response: $y(t) = (1 - e^{-t/RC})u(t)$
- **Time constant** $\tau = RC$: output reaches 63.2% of final value
- **Settling time** $\approx 5\tau$: output within 0.7% of final value
- Step response is the integral of the impulse response
- Partial fractions and inverse Laplace are your key computational tools
