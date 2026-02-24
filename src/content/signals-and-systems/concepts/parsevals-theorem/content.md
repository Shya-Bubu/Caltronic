## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **EFS pair**: analysis and synthesis equations
- **Magnitude spectrum**: $|X_k|$ vs $k$
- **Square pulse FS**: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$, $X_0 = 2T_1/T_0$
- **Orthogonality** of complex exponentials

</details>

---

## The Central Question

You've learned how to decompose a periodic signal into harmonics. You've seen that different signals have different spectral shapes. But here's a practical question: **how much power does each harmonic carry?** And is there a way to compute the total power of a signal *without* going back to the time domain?

Parseval's theorem answers both questions. It's a conservation law — it says the total power computed in the time domain *must equal* the total power computed in the frequency domain.

> **Why This Matters**: Parseval's theorem is the bridge between time-domain and frequency-domain energy analysis. It lets you compute RMS values from spectra, determine signal bandwidth, and design filters that pass a desired fraction of signal power.

---

## The Theorem

### Statement

For a periodic signal $x(t)$ with period $T_0$ and FS coefficients $X_k$:

$$\boxed{\frac{1}{T_0}\int_{T_0} |x(t)|^2\,dt = \sum_{k=-\infty}^{\infty} |X_k|^2}$$

The left side is the **average power** of $x(t)$ computed in the time domain.
The right side is the **sum of squared magnitudes** of all FS coefficients.

They are always equal.

[[visual:parseval-concept-diagram]]

### In Words

The average power of a periodic signal equals the sum of the powers of its individual harmonics. Power is **additive** across harmonics because the harmonics are **orthogonal** — there is no cross-talk between different frequency components.

---

## Why It's True: The Proof

Start from the definition of average power and substitute the synthesis equation:

$$P = \frac{1}{T_0}\int_{T_0} |x(t)|^2\,dt = \frac{1}{T_0}\int_{T_0} x(t)\,x^*(t)\,dt$$

Replace one copy of $x(t)$ with its FS expansion:

$$= \frac{1}{T_0}\int_{T_0} \left[\sum_k X_k\,e^{jk\omega_0 t}\right] x^*(t)\,dt = \sum_k X_k \underbrace{\left[\frac{1}{T_0}\int_{T_0} x^*(t)\,e^{jk\omega_0 t}\,dt\right]}_{= X_k^*}$$

The expression in brackets is exactly $X_k^*$ (the conjugate of the analysis integral). So:

$$P = \sum_k X_k \cdot X_k^* = \sum_k |X_k|^2$$

The orthogonality of the complex exponentials is what makes the cross-terms vanish. Each harmonic's power contributes independently.

---

## Power Spectrum

The quantity $|X_k|^2$ is the **power** carried by the $k$-th harmonic. The plot of $|X_k|^2$ vs $k$ is the **power spectrum**.

[[visual:power-spectrum-bars]]

### Example: Square Pulse (25% duty cycle)

For $T_0 = 4$, $T_1 = 0.5$:

$$|X_0|^2 = (0.25)^2 = 0.0625$$
$$|X_1|^2 = (0.225)^2 \approx 0.0507$$
$$|X_2|^2 = (0.159)^2 \approx 0.0253$$
$$|X_3|^2 = (0.075)^2 \approx 0.0056$$

**Time-domain check**: For a pulse that is 1 for $2T_1 = 1$ second out of $T_0 = 4$ seconds:

$$P = \frac{1}{4}\int_{-0.5}^{0.5} 1^2\,dt = \frac{1}{4} \cdot 1 = 0.25$$

The duty cycle is 0.25, and the average power equals the duty cycle (since the signal is 0 or 1).

[[visual:power-waveform-area]]

Now sum the frequency-domain powers:

$$\sum_{k=-\infty}^{\infty} |X_k|^2 = |X_0|^2 + 2\sum_{k=1}^{\infty} |X_k|^2 = 0.0625 + 2(0.0507 + 0.0253 + 0.0056 + \cdots) = 0.25$$

The two answers match — Parseval's theorem confirmed.

[[visual:harmonic-power-pie]]

<details>
<summary><strong>Pause & Think</strong>: For a pure sinusoid x(t) = A sin(ω₀t), what is the average power using Parseval's theorem?</summary>

The FS coefficients are $X_1 = -jA/2$ and $X_{-1} = jA/2$. So $|X_1|^2 + |X_{-1}|^2 = A^2/4 + A^2/4 = A^2/2$. The average power is $A^2/2$, which matches the well-known formula $P = V_{\text{rms}}^2 = (A/\sqrt{2})^2 = A^2/2$.

</details>

---

## RMS from the Spectrum

A direct consequence of Parseval's theorem: the **RMS value** of a signal equals:

$$x_{\text{rms}} = \sqrt{P} = \sqrt{\sum_{k=-\infty}^{\infty} |X_k|^2}$$

[[visual:rms-from-spectrum]]

For real signals (where $|X_{-k}| = |X_k|$), this simplifies to:

$$x_{\text{rms}} = \sqrt{|X_0|^2 + 2\sum_{k=1}^{\infty} |X_k|^2}$$

This is extremely useful: if you know the FS coefficients, you can compute the RMS without doing any time-domain integration.

---

## Bandwidth and the 95% Power Rule

Parseval's theorem also defines a practical notion of **bandwidth**. Although a periodic signal technically has infinitely many harmonics, most of the power is concentrated in a finite number of them.

[[visual:cumulative-power]]

The **95% power bandwidth** is the number of harmonics needed to capture 95% of the total signal power. For the 25% duty cycle square pulse, this is roughly 8 harmonics. Beyond that, each additional harmonic adds negligible power.

[[visual:bandwidth-power-tradeoff]]

The trade-off:
- **Narrow pulses** (small duty cycle) → power spread over many harmonics → wide bandwidth
- **Wide pulses** (large duty cycle) → power concentrated in few harmonics → narrow bandwidth

This is the power-domain perspective on the bandwidth–duration trade-off you saw earlier.

---

## Comparing Waveform Powers

Different waveforms with the same peak amplitude can have very different RMS values and power distributions:

| Waveform | Peak amplitude $A$ | Average power | RMS |
|----------|-------------------|---------------|-----|
| Sinusoid | $A$ | $A^2/2$ | $A/\sqrt{2}$ |
| Square wave (50%) | $A$ | $A^2$ | $A$ |
| Triangular wave | $A$ | $A^2/3$ | $A/\sqrt{3}$ |
| Sawtooth wave | $A$ | $A^2/3$ | $A/\sqrt{3}$ |

[[visual:signal-power-comparison]]

Notice that the square wave has the highest RMS for a given peak amplitude — it stays at $\pm A$ for the entire period. The triangular and sawtooth waves have lower RMS because they spend time away from the peak.

<details>
<summary><strong>Pause & Think</strong>: Why does the 50% square wave have power A² while the sinusoid has power A²/2?</summary>

The square wave is at $|A|$ for the *entire* period, so $|x(t)|^2 = A^2$ always. The sinusoid oscillates between $-A$ and $A$, spending significant time near zero. Its average $|x(t)|^2$ is $A^2/2$. Parseval's theorem confirms this: the square wave puts more power into its DC and harmonics combined.

</details>

---

## Parseval's Theorem in Practice

### Filter Design

If you want to pass 95% of a signal's power through a bandpass filter, Parseval's theorem tells you exactly which harmonics to include.

### Signal Quality

The power in the higher harmonics quantifies how "non-sinusoidal" a signal is. Total Harmonic Distortion (THD) is defined as:

$$\text{THD} = \frac{\sqrt{\sum_{k=2}^{\infty} |X_k|^2}}{|X_1|} \times 100\%$$

### Error Analysis

When you truncate the FS to $N$ harmonics, the power in the truncation error is:

$$P_{\text{error}} = \sum_{|k| > N} |X_k|^2$$

[[visual:power-in-band]]

Parseval's theorem guarantees this error power decreases as $N$ increases.

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Summing $|X_k|$ instead of $|X_k|^2$ | Parseval uses **squared** magnitudes, not magnitudes |
| Forgetting the double-counting for real signals | For real signals, $|X_{-k}| = |X_k|$, so $\sum_k |X_k|^2 = |X_0|^2 + 2\sum_{k=1}^{\infty} |X_k|^2$ |
| Confusing average power with energy | Average power = energy per period / period. For periodic signals, total energy is infinite |
| Expecting cross-terms between harmonics | Orthogonality eliminates all cross-terms: $\int X_k e^{jk\omega_0 t} \cdot X_m^* e^{-jm\omega_0 t}\,dt = 0$ for $k \neq m$ |

[[visual:parseval-verification-sim]]

---

## Summary

- **Parseval's theorem**: $\frac{1}{T_0}\int_{T_0}|x(t)|^2\,dt = \sum_k |X_k|^2$. Average power in time = sum of harmonic powers in frequency.
- **Power spectrum**: $|X_k|^2$ is the power carried by the $k$-th harmonic.
- **RMS from spectrum**: $x_{\text{rms}} = \sqrt{\sum_k |X_k|^2}$ — no time-domain integration needed.
- **Bandwidth**: the 95% power bandwidth counts how many harmonics capture 95% of the total power.
- **THD**: quantifies signal distortion using the power in harmonics beyond the fundamental.
- Parseval's theorem rests on **orthogonality** — because harmonics are independent, their powers add without interference.
