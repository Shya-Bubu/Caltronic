## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **EFS pair**: analysis and synthesis with complex exponentials
- **All FS properties**: linearity, time shift, differentiation, integration
- **Parseval's theorem**: average power = sum of $|X_k|^2$
- **LTI systems**: systems that are both linear and time-invariant
- **Transfer function** $H(j\omega)$: the system's frequency response (you may have seen this in circuit analysis)

</details>

---

## The Central Idea

This is where everything comes together. You've spent several concepts learning to decompose signals into harmonics. You've seen how properties transform those harmonics. Now the payoff: what happens when a periodic signal passes through an **LTI system**?

The answer is remarkably clean: the system processes *each harmonic independently*. It multiplies each FS coefficient $X_k$ by the system's frequency response evaluated at that harmonic's frequency. That's it.

> **Why This Matters**: This result is the foundation of **frequency-domain analysis** for circuits and systems. Instead of solving differential equations in the time domain, you can simply multiply spectra in the frequency domain. It's the reason engineers think in terms of filters, not differential equations.

---

## The Eigenfunction Property

### The Key Fact

Complex exponentials $e^{jk\omega_0 t}$ are **eigenfunctions** of LTI systems. This means:

$$\text{Input: } e^{jk\omega_0 t} \quad\xrightarrow{\text{LTI system } H(j\omega)}\quad \text{Output: } H(jk\omega_0)\,e^{jk\omega_0 t}$$

[[visual:lti-eigenfunction-diagram]]

The output is the *same* complex exponential, scaled by the complex number $H(jk\omega_0)$. The shape is preserved; only the amplitude and phase change.

### Why?

For an LTI system with impulse response $h(t)$, the output is the convolution:

$$y(t) = h(t) * e^{jk\omega_0 t} = \int_{-\infty}^{\infty} h(\tau)\,e^{jk\omega_0(t-\tau)}\,d\tau$$

$$= e^{jk\omega_0 t} \int_{-\infty}^{\infty} h(\tau)\,e^{-jk\omega_0\tau}\,d\tau = e^{jk\omega_0 t} \cdot H(jk\omega_0)$$

The exponential factors out of the integral because it involves $t$, not $\tau$. The remaining integral is exactly the definition of $H(j\omega)$ evaluated at $\omega = k\omega_0$.

[[visual:eigenfunction-waveform]]

> **Key Insight**: The eigenfunction property is analogous to how stretching a spring produces a force proportional to the displacement — the "shape" of the response matches the "shape" of the input. Complex exponentials pass through LTI systems and come out as scaled versions of themselves.

---

## Periodic Signals Through LTI Systems

Since $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$ is a sum of eigenfunctions, and LTI systems are linear, the output is:

$$\boxed{y(t) = \sum_{k=-\infty}^{\infty} X_k\,H(jk\omega_0)\,e^{jk\omega_0 t}}$$

The output FS coefficients are:

$$\boxed{Y_k = X_k \cdot H(jk\omega_0)}$$

[[visual:periodic-through-lti]]

Each harmonic is processed *independently*:
- Its **magnitude** is scaled by $|H(jk\omega_0)|$
- Its **phase** is shifted by $\angle H(jk\omega_0)$
- **No new frequencies are created** — the output is still periodic with the same $\omega_0$

This is the **multiplication property**: convolution in time becomes multiplication in the frequency domain.

<details>
<summary><strong>Pause & Think</strong>: Why doesn't an LTI system create new harmonics?</summary>

Because LTI systems are linear. If the input contains only harmonics at $k\omega_0$, linearity guarantees the output contains only those same frequencies. Nonlinear systems (like amplifiers driven into clipping) *do* create new harmonics — that's harmonic distortion.

</details>

---

## Frequency-Selective Filtering

The function $H(jk\omega_0)$ acts as a **frequency-selective filter**. Depending on its shape, it can:

### Lowpass Filtering

$$|H(j\omega)| \approx 1 \text{ for } |\omega| < \omega_c, \quad |H(j\omega)| \approx 0 \text{ for } |\omega| > \omega_c$$

A lowpass filter passes low harmonics and blocks high ones:

[[visual:lowpass-magnitude]]

[[visual:square-through-lowpass]]

The output is a smoothed version of the input — the sharp edges are rounded off because the high-frequency harmonics (which carry the edge information) are removed.

### Highpass Filtering

A highpass filter does the opposite: it removes low harmonics and passes high ones.

[[visual:highpass-effect]]

The output shows only the transitions (edges) of the square wave — the flat tops disappear because the low-frequency content is gone.

### What About the Spectrum?

[[visual:coeff-modification]]

The input-output relationship is visual: the filter's magnitude response "sculpts" the spectrum, amplifying some harmonics and attenuating others.

---

## A Real Example: RC Lowpass Filter

An RC circuit with transfer function:

$$H(j\omega) = \frac{1}{1 + j\omega RC}$$

is a first-order lowpass filter.

[[visual:rc-lowpass-response]]

**Magnitude**: $|H(j\omega)| = \frac{1}{\sqrt{1 + (\omega RC)^2}}$

- At low frequencies ($\omega \ll 1/RC$): $|H| \approx 1$ — harmonics pass through
- At high frequencies ($\omega \gg 1/RC$): $|H| \approx 1/(\omega RC)$ — harmonics are attenuated
- At the corner frequency ($\omega = 1/RC$): $|H| = 1/\sqrt{2} \approx 0.707$ — the −3 dB point

**Phase**: $\angle H(j\omega) = -\arctan(\omega RC)$

- Shifts from $0°$ at DC to $-90°$ at high frequencies.

### Applying to a Square Wave

If a 1 kHz square wave (period $T_0 = 1$ ms, $\omega_0 = 2000\pi$) passes through an RC filter with $RC = 0.1$ ms:

- $H(j\omega_0) = \frac{1}{1 + j(2000\pi)(0.0001)} = \frac{1}{1 + j0.628}$, $|H| \approx 0.847$
- $H(j3\omega_0) = \frac{1}{1 + j1.885}$, $|H| \approx 0.469$
- $H(j5\omega_0) = \frac{1}{1 + j3.14}$, $|H| \approx 0.303$

The fundamental passes with 85% of its amplitude, the 3rd harmonic is reduced to 47%, and the 5th to 30%. The sharp edges of the square wave are softened.

[[visual:lti-filter-sim]]

---

## Output Power: Combining with Parseval's

Using Parseval's theorem on the output:

$$P_y = \sum_k |Y_k|^2 = \sum_k |X_k|^2 |H(jk\omega_0)|^2$$

The output power is the input power at each harmonic, weighted by the filter's power gain $|H(jk\omega_0)|^2$.

[[visual:output-power-parseval]]

This formula lets you compute how much signal power a filter passes or blocks — essential for communication system design.

<details>
<summary><strong>Pause & Think</strong>: If |H(jkω₀)| < 1 for all k, is P_y always less than P_x?</summary>

Yes! If $|H(jk\omega_0)| \leq 1$ for all $k$ (a passive filter), then $|Y_k|^2 = |X_k|^2|H|^2 \leq |X_k|^2$ for every term. Summing gives $P_y \leq P_x$. Active filters with $|H| > 1$ at some frequencies can produce $P_y > P_x$ (amplification).

</details>

---

## The Big Picture

Let's step back and appreciate what we've accomplished across Lessons 04 and 05:

| Concept | What it gives you |
|---------|------------------|
| EFS analysis/synthesis | Decompose any periodic signal into harmonics |
| Properties | Transform spectra without re-integrating |
| Symmetry | Predict the form of coefficients from signal shape |
| Parseval | Compute power from the spectrum |
| **LTI + FS** | **Predict the output of any LTI system for periodic inputs** |

The FS + LTI combination means you can:
1. Decompose the input into harmonics
2. Look up $H(jk\omega_0)$ for each harmonic
3. Multiply to get the output coefficients
4. Synthesize the output waveform
5. Compute the output power

No differential equations. No convolution integrals. Just multiplication.

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Applying $Y_k = X_k \cdot H(jk\omega_0)$ to nonlinear systems | This only works for **LTI** systems. Nonlinear systems create new harmonics not present in the input |
| Evaluating $H$ at $\omega = k$ instead of $\omega = k\omega_0$ | The frequency of the $k$-th harmonic is $k\omega_0$, not $k$ |
| Forgetting the phase: $Y_k = X_k \cdot H(jk\omega_0)$ is complex multiplication | Both magnitude and phase must be multiplied correctly |
| Thinking the output period changes | The output of an LTI system excited by a periodic input has the **same period** as the input |

---

## Summary

- Complex exponentials are **eigenfunctions** of LTI systems: $e^{jk\omega_0 t} \to H(jk\omega_0)\,e^{jk\omega_0 t}$.
- For periodic inputs: $Y_k = X_k \cdot H(jk\omega_0)$ — each harmonic is independently scaled and phase-shifted.
- **No new harmonics** are created by LTI systems — the output has the same fundamental frequency as the input.
- **Lowpass filters** smooth signals by removing high harmonics; **highpass filters** sharpen signals by removing low harmonics.
- Output power: $P_y = \sum_k |X_k|^2|H(jk\omega_0)|^2$ (Parseval on the output).
- This is the conceptual foundation of **frequency-domain circuit analysis** — you'll build on it for the rest of your engineering career.
