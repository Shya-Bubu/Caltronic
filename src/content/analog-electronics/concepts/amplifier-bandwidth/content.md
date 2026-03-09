# Amplifier Bandwidth

## Why Amplifiers Don't Work at All Frequencies

So far, we've analysed amplifier gain and impedance as if they were fixed numbers. But in reality, an amplifier's gain changes with frequency. Every amplifier has a **bandwidth** — a range of frequencies over which it provides useful amplification.

Outside this range, the gain drops off. Understanding why — and how to calculate the boundaries — is essential.

> **Why This Matters**: In audio applications, your amplifier must work from 20 Hz to 20 kHz. If the lower cutoff frequency is 100 Hz, you'll lose the bass. If the upper cutoff is 10 kHz, you'll lose the treble. Bandwidth determines what your amplifier can actually amplify.

[[visual:bandwidth-overview]]

## The Lower Cutoff: Coupling Capacitors

Remember those coupling capacitors at the input and output of your BJT amplifier? They block DC (protecting the bias) while passing AC. But the impedance of a capacitor is:

$$X_C = \frac{1}{\omega C}$$

At low frequencies, $\omega$ is small, so $X_C$ is large. A large impedance means the capacitor drops a significant voltage — the signal is **attenuated** before it reaches the amplifier.

[[visual:coupling-cap-effect]]

## Deriving the Lower Cutoff Frequency

Consider the input coupling capacitor $C_c$ in series with the amplifier's input impedance $R_{in}$. Together, they form a voltage divider:

$$V_{in} = V_S \cdot \frac{R_{in}}{R_{in} + X_C} = V_S \cdot \frac{R_{in}}{R_{in} + \frac{1}{j\omega C_c}}$$

Simplifying:

$$\frac{V_{in}}{V_S} = \frac{j\omega C_c R_{in}}{1 + j\omega C_c R_{in}}$$

This is a **high-pass filter** transfer function. The magnitude is:

$$\left|\frac{V_{in}}{V_S}\right| = \frac{\omega C_c R_{in}}{\sqrt{1 + (\omega C_c R_{in})^2}}$$

[[visual:highpass-response]]

## The -3 dB Point

The cutoff frequency is where the power drops to **half** its maximum value. Since power ∝ voltage², this corresponds to the voltage dropping to $1/\sqrt{2} \approx 0.707$ of its maximum:

$$\left|\frac{V_{in}}{V_S}\right| = \frac{1}{\sqrt{2}} \quad \text{when} \quad \omega = \omega_L = \frac{1}{R_{in} C_c}$$

Converting to hertz:

$$\boxed{f_L = \frac{1}{2\pi R_{in} C_c}}$$

This is the **lower cutoff frequency** — below this, the gain drops at 20 dB/decade (a factor of 10 per decade of frequency).

<details>
<summary><strong>Pause & Think</strong>: If $R_{in}$ = 10 kΩ and $C_c$ = 100 μF, what is $f_L$?</summary>

$f_L = 1/(2\pi \times 10^4 \times 10^{-4}) = 1/(2\pi) \approx 0.16$ Hz. This is well below the audio range (20 Hz), so the coupling capacitor has negligible effect on audio signals. This is why large coupling capacitors (100 μF) are commonly used.

</details>

[[visual:cutoff-calculation]]

## The Upper Cutoff: Parasitic Capacitances

At high frequencies, a different mechanism limits the bandwidth. The BJT has parasitic capacitances between its terminals:

- **$C_{be}$**: Base-emitter capacitance (junction + diffusion)
- **$C_{bc}$**: Base-collector capacitance (junction)

These are tiny (picofarads) but at high frequencies, their impedance becomes small enough to create significant current paths that **bypass** the normal amplifier action.

The upper cutoff frequency depends on these parasitic capacitances and is typically in the range of hundreds of kHz to MHz for small-signal transistors.

> **Watch Out**: The upper cutoff analysis is beyond the scope of this course. But knowing it exists is important — it explains why you can't simply increase the frequency indefinitely.

[[visual:parasitic-caps]]

## Multiple Capacitors: Which One Sets the Cutoff?

A real amplifier has multiple capacitors:
- Input coupling capacitor
- Output coupling capacitor  
- Emitter bypass capacitor

Each creates its own cutoff frequency. The **actual lower cutoff frequency** of the amplifier is determined by the **highest** of these individual cutoffs:

$$f_L = \max(f_{L,\text{input}}, \, f_{L,\text{output}}, \, f_{L,\text{bypass}})$$

The capacitor that produces the highest cutoff frequency is the "bottleneck" — it's the one that starts attenuating the signal first as frequency decreases.

[[visual:multiple-cutoffs]]

<details>
<summary><strong>Pause & Think</strong>: The emitter bypass capacitor creates a cutoff at 50 Hz, the input coupling cap at 5 Hz, and the output coupling cap at 8 Hz. What is the amplifier's lower cutoff?</summary>

50 Hz — the bypass capacitor is the bottleneck. Below 50 Hz, the bypass capacitor doesn't effectively short-circuit $R_{E2}$, so the emitter resistance increases and the gain drops.

</details>

## The Complete Frequency Response

Putting it all together, the amplifier's frequency response looks like:

[[visual:complete-freq-response]]

| Region | Frequency Range | Behaviour |
|--------|----------------|-----------|
| Below $f_L$ | $f < f_L$ | Gain drops at 20 dB/decade (coupling caps have high impedance) |
| Midband | $f_L < f < f_H$ | Gain is approximately constant (this is where we do our analysis) |
| Above $f_H$ | $f > f_H$ | Gain drops (parasitic capacitances shunt signal to ground) |

The **bandwidth** is defined as $BW = f_H - f_L$, but since usually $f_H \gg f_L$, we often approximate $BW \approx f_H$.

## Summary

- **Lower cutoff** ($f_L$) is caused by coupling and bypass capacitors acting as high-pass filters
- $f_L = 1/(2\pi R C)$ where $R$ and $C$ are the relevant resistance and capacitance
- **Upper cutoff** ($f_H$) is caused by parasitic capacitances in the BJT (beyond this course)
- The actual $f_L$ is the **highest** of all individual capacitor cutoff frequencies
- All our small-signal analysis assumes we're in the **midband** region between $f_L$ and $f_H$
