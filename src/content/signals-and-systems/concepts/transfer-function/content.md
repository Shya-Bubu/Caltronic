# The Transfer Function H(s) — RC Circuit Example

> **Why This Matters**: The transfer function $H(s) = Y(s)/X(s)$ is the most practical tool you'll learn in this course. Given any circuit, you can write KVL/KCL, transform to the Laplace domain, and extract $H(s)$ — a compact formula that tells you *everything* about how the system processes signals. This concept walks you through the theory and then applies it to a real RC circuit, step by step.

## Defining H(s)

From the previous concept, you know that for an LTI system:

$$Y(s) = H(s) \cdot X(s)$$

Rearranging:

$$\boxed{H(s) = \frac{Y(s)}{X(s)}}$$

This is the **system transfer function** — the ratio of the Laplace-transformed output to the Laplace-transformed input, assuming zero initial conditions.

[[visual:transfer-function-definition]]

Since convolution is commutative:

$$y(t) = h(t) * x(t) = x(t) * h(t)$$

$$Y(s) = H(s) \cdot X(s) = X(s) \cdot H(s)$$

The transfer function is equally the Laplace transform of the impulse response:

$$H(s) = \mathcal{L}\{h(t)\}$$

> **Key Insight**: $H(s)$ encodes the system's entire behaviour in one ratio of polynomials (for circuits). The numerator zeros and denominator poles determine frequency response, stability, and transient behaviour. One formula, all the information.

## What H(s) Tells You

| Feature | Where to look in H(s) |
|---------|----------------------|
| **DC gain** | $H(0)$ = value at $s = 0$ |
| **Natural frequencies** | Poles of $H(s)$ (where denominator = 0) |
| **Frequency response** | $H(j\omega)$ = substitute $s = j\omega$ |
| **Stability** | All poles must have negative real parts |
| **Time constant** | $\tau = 1/|$pole$|$ for first-order systems |

[[visual:hs-information-plotly]]

## Example 1: RC Low-Pass Filter

Now let's derive $H(s)$ for a real circuit — the RC series circuit from your lecture notes.

### The Circuit

A resistor $R$ and capacitor $C$ are in series. The input $x(t)$ is the source voltage. The output $y(t)$ is the voltage across the capacitor.

[[visual:rc-circuit-schematic]]

[[visual:rc-circuit-falstad]]

### Step 1: Write KVL in the Time Domain

Apply Kirchhoff's Voltage Law around the loop:

$$x(t) - i(t) \cdot R - \frac{1}{C} \int_{-\infty}^{t} i(\tau) \, d\tau = 0$$

The voltage across the capacitor is the output:

$$y(t) = \frac{1}{C} \int_{-\infty}^{t} i(\tau) \, d\tau$$

[[visual:lecture-page-7]]

### Step 2: Take the Laplace Transform

Assuming **zero initial conditions** (the capacitor starts uncharged), the Laplace transform gives:

$$X(s) - R \cdot I(s) - \frac{I(s)}{Cs} = 0$$

Notice how the integral became division by $Cs$ — this is the power of the Laplace transform.

Rearranging for $I(s)$:

$$X(s) = I(s) \left[ R + \frac{1}{Cs} \right]$$

$$I(s) = \frac{X(s)}{R + \frac{1}{Cs}}$$

### Step 3: Find Y(s)

The output is the capacitor voltage:

$$Y(s) = \frac{I(s)}{Cs} = \frac{X(s)}{Cs \left( R + \frac{1}{Cs} \right)} = \frac{X(s)}{RCs + 1}$$

[[visual:lecture-page-8-top]]

### Step 4: Extract H(s)

$$\boxed{H(s) = \frac{Y(s)}{X(s)} = \frac{1}{1 + RCs}}$$

This is the transfer function of a **first-order low-pass filter**!

[[visual:rc-transfer-function-plotly]]

<details>
<summary><strong>Pause & Think</strong>: What is the DC gain of this filter? What happens at very high frequencies?</summary>

**DC gain** ($s = 0$): $H(0) = 1/(1 + 0) = 1$. At DC, the output equals the input — the capacitor fully charges.

**High frequency** ($s \to \infty$): $H(s) \to 0$. The capacitor's impedance $1/Cs \to 0$, so it shorts and the output drops to zero. High frequencies are blocked — that's why it's called a "low-pass" filter.

</details>

## Understanding with Impedance

There's a faster way using the **impedance** concept. In the Laplace domain:

| Component | Time domain | Impedance (s-domain) |
|-----------|------------|---------------------|
| Resistor | $v = Ri$ | $Z_R = R$ |
| Capacitor | $v = \frac{1}{C} \int i \, dt$ | $Z_C = \frac{1}{Cs}$ |
| Inductor | $v = L \frac{di}{dt}$ | $Z_L = Ls$ |

The RC circuit is a **voltage divider** in the s-domain:

$$H(s) = \frac{Z_C}{Z_R + Z_C} = \frac{1/Cs}{R + 1/Cs} = \frac{1}{RCs + 1}$$

Same result, much faster! The impedance approach avoids KVL entirely — you treat the s-domain circuit like a DC resistor network.

[[visual:impedance-divider-plotly]]

<details>
<summary><strong>Pause & Think</strong>: The transfer function has a pole at $s = -1/RC$. What is the physical meaning of this pole?</summary>

The pole at $s = -1/RC$ determines the **time constant** $\tau = RC$ of the circuit. The impulse response decays as $h(t) = \frac{1}{RC} e^{-t/RC}$. The pole location tells you how fast the transient dies out. Since the pole has a negative real part, the system is **stable** — transients decay rather than grow.

</details>

## Frequency Response Preview

By substituting $s = j\omega$:

$$H(j\omega) = \frac{1}{1 + j\omega RC}$$

The magnitude:

$$|H(j\omega)| = \frac{1}{\sqrt{1 + (\omega RC)^2}}$$

[[visual:rc-frequency-response]]

At the **cutoff frequency** $\omega_c = 1/RC$, the gain drops to $1/\sqrt{2} \approx 0.707$ (−3dB). Below this frequency, signals pass; above, they're attenuated.

## Summary

- **Transfer function**: $H(s) = Y(s)/X(s)$ — the complete system description
- $H(s)$ equals the Laplace transform of the impulse response: $H(s) = \mathcal{L}\{h(t)\}$
- **RC low-pass filter**: $H(s) = 1/(1 + RCs)$
- Derived using KVL + Laplace transform (or faster: impedance voltage divider)
- **Pole** at $s = -1/RC$ → time constant $\tau = RC$, system is stable
- **DC gain** = 1 (passes low frequencies), gain → 0 at high frequencies
- The impedance method ($Z_R = R$, $Z_C = 1/Cs$, $Z_L = Ls$) simplifies circuit analysis enormously
