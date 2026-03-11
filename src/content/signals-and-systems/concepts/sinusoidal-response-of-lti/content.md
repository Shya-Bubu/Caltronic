# Sinusoidal Response of LTI Systems

> **Why This Matters**: In practice, most signals — AC power, audio, radio, communications — are sinusoidal or can be decomposed into sinusoids (via Fourier). Understanding how an LTI system responds to a sinusoidal input is the foundation of **frequency response** and **filter design**. The key result: after the transient dies out, the **steady-state output is also a sinusoid** at the same frequency, but with different amplitude and phase shift determined by $H(j\omega)$.

## Sinusoidal Inputs in the Laplace Domain

The Laplace transforms of the two basic sinusoids:

$$\mathcal{L}\{A\sin(\omega t)\} = \frac{A\omega}{s^2 + \omega^2}$$

$$\mathcal{L}\{A\cos(\omega t)\} = \frac{As}{s^2 + \omega^2}$$

Note the poles at $s = \pm j\omega$ — on the imaginary axis. This is what causes the sustained oscillation.

[[visual:sinusoidal-laplace-plotly]]

## Example: RC Filter with Sinusoidal Input

[[visual:lecture-page-7]]

Consider the RC low-pass filter with $H(s) = \frac{1}{1 + RCs}$ and input $x(t) = A\sin(\omega t)$.

### Finding Y(s)

$$Y(s) = H(s) \cdot X(s) = \frac{1}{1 + RCs} \cdot \frac{A\omega}{s^2 + \omega^2}$$

Rewrite:

$$Y(s) = \frac{A\omega}{RC} \cdot \frac{1}{(s + \frac{1}{RC})(s + j\omega)(s - j\omega)}$$

### Partial Fraction Expansion

$$Y(s) = \frac{K_1}{s + \frac{1}{RC}} + \frac{K_2}{s + j\omega} + \frac{K_2^*}{s - j\omega}$$

Note: $K_2^*$ is the complex conjugate of $K_2$ — this always happens with complex conjugate poles for real signals.

[[visual:lecture-page-8]]

### Inverse Laplace Transform

$$y(t) = K_1 e^{-t/RC} + K_2 e^{-j\omega t} + K_2^* e^{j\omega t}$$

Using Euler's formula ($e^{j\theta} + e^{-j\theta} = 2\cos\theta$ and $e^{j\theta} - e^{-j\theta} = 2j\sin\theta$):

$$y(t) = \underbrace{K_1 e^{-t/RC}}_{\text{Transient}} + \underbrace{2\text{Re}(K_2)\cos(\omega t) + 2\text{Im}(K_2)\sin(\omega t)}_{\text{Steady-state sinusoidal}}$$

[[visual:transient-ss-plotly]]

## The Two Parts of the Response

### Transient Part

$$y_{transient}(t) = K_1 e^{-t/RC}$$

This comes from the **system pole** at $s = -1/RC$. It decays exponentially and vanishes after a few time constants ($\approx 5RC$).

### Steady-State Part

$$y_{ss}(t) = |H(j\omega)| \cdot A \sin(\omega t + \angle H(j\omega))$$

This comes from the **input poles** at $s = \pm j\omega$. It is a **sinusoid at the same frequency** $\omega$ but with:
- **Amplitude** scaled by $|H(j\omega)|$
- **Phase** shifted by $\angle H(j\omega)$

> **Key Result**: For any stable LTI system with sinusoidal input, the steady-state output is a sinusoid at the same frequency, with amplitude $|H(j\omega)| \cdot A$ and phase shift $\angle H(j\omega)$.

[[visual:steady-state-result-plotly]]

## Computing $H(j\omega)$ for the RC Filter

$$H(j\omega) = \frac{1}{1 + j\omega RC}$$

**Magnitude:**
$$|H(j\omega)| = \frac{1}{\sqrt{1 + (\omega RC)^2}}$$

**Phase:**
$$\angle H(j\omega) = -\arctan(\omega RC)$$

So the steady-state output is:

$$y_{ss}(t) = \frac{A}{\sqrt{1 + (\omega RC)^2}} \sin\left(\omega t - \arctan(\omega RC)\right)$$

The output sinusoid is **reduced in amplitude** and **delayed in phase** compared to the input.

[[visual:bode-preview-plotly]]

<details>
<summary><strong>Pause & Think</strong>: What happens to the output at very low frequencies (ω → 0) and very high frequencies (ω → ∞)?</summary>

**Low frequency** ($\omega \to 0$): $|H| \to 1$, phase $\to 0$. Output ≈ input — low frequencies pass through unchanged. This is why it's called a **low-pass** filter.

**High frequency** ($\omega \to \infty$): $|H| \to 0$, phase $\to -90°$. Output amplitude drops to zero — high frequencies are blocked. The output also lags by almost 90°.

</details>

## Using FVT with Sinusoidal Response

The final value theorem gives:

$$y(\infty) = \lim_{s \to 0} s \cdot Y(s) = 0$$

This tells us the average value of the steady-state response is **zero** — which makes sense because $\sin(\omega t)$ oscillates symmetrically around zero.

## Summary

- Sinusoidal input: $X(s) = A\omega/(s^2+\omega^2)$
- Output has **two parts**: transient ($K_1 e^{-t/\tau}$, dies out) + steady-state (sinusoid)
- After the transient dies: $y_{ss}(t) = |H(j\omega)| \cdot A \sin(\omega t + \angle H(j\omega))$
- Same frequency $\omega$, but amplitude scaled by $|H(j\omega)|$ and phase shifted by $\angle H(j\omega)$
- Complex conjugate poles in PFE always pair up for real signals
- For RC filter: $|H| = 1/\sqrt{1+(\omega RC)^2}$, phase $= -\arctan(\omega RC)$
- Low frequencies pass, high frequencies are attenuated → low-pass behaviour
