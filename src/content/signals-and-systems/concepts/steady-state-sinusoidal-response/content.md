## From the Partial Fractions to the Time-Domain Output

At the end of the previous derivation, the note has already reached

$$
Y(s)=\frac{R(s)}{P(s)}+\frac{\frac{C}{2}H(j\omega_0)}{s-j\omega_0}+\frac{\frac{C}{2}H^*(j\omega_0)}{s+j\omega_0}
$$

The next step is interpretation. The term $R(s)/P(s)$ is associated with the poles of the system itself, whereas the two simple-pole terms are associated with the sinusoidal input at $s=\pm j\omega_0$.

[[visual:steady-state-response-note]]

When the inverse Laplace transform is taken, the note writes

$$
y(t)=y_t(t)+\frac{C}{2}\left[H(j\omega_0)e^{j\omega_0 t}+H^*(j\omega_0)e^{-j\omega_0 t}\right], \qquad t \ge 0
$$

Here $y_t(t)$ denotes the transient response. It comes from the system poles contained in $P(s)$.

## Why the Output Remains Sinusoidal

The second term may look complex, but it is simply the standard way of representing a real sinusoid using a conjugate pair. The note then rewrites that term in amplitude-phase form:

$$
y(t)=y_t(t)+C|H(j\omega_0)|\cos\!\bigl(\omega_0 t+\angle H(j\omega_0)\bigr), \qquad t \ge 0
$$

[[visual:steady-state-waveform-transform]]

This is one of the central facts of signals and systems: when a stable LTI system is driven by a sinusoid, the sustained output is still a sinusoid at the same frequency. What changes are only:

- the amplitude, multiplied by $|H(j\omega_0)|$
- the phase, shifted by $\angle H(j\omega_0)$

So the frequency is preserved, while the system modifies magnitude and phase.

## Transient Response Versus Steady-State Response

The note explicitly separates the total response into two parts:

- $y_t(t)$, the transient response
- the sinusoidal term, the steady-state response

For a stable system, the transient term decays to zero as time increases. Therefore the lasting response is

$$
y_{ss}(t)=C|H(j\omega_0)|\cos\!\bigl(\omega_0 t+\angle H(j\omega_0)\bigr)
$$

That formula is not an approximation in the note. It is the exact steady-state term extracted from the Laplace-domain derivation.

[[visual:frequency-response-note]]

The interpretive meaning of $H(j\omega_0)$ is now clear. Evaluating the transfer function on the imaginary axis at the input frequency tells you exactly how that frequency component survives in steady state.

## The Fourier-Transform View

The note then revisits the same result from the Fourier-transform perspective. It states that if the sinusoidal input is regarded as existing for

$$
-\infty < t < \infty
$$

then the response appears directly in steady-state form, without a separate transient term. The reason is conceptual: the Fourier-transform viewpoint does not start from a switch-on instant at $t=0$.

The note also records the relationship

$$
H_1(\omega)=\mathcal{F}\{h(t)\}=H(s)\big|_{s=j\omega}
$$

so the frequency response is obtained by evaluating the transfer function on the $j\omega$ axis.

[[visual:laplace-vs-fourier-summary]]

This lets you reconcile the two viewpoints cleanly:

- Laplace analysis gives the complete response, including the transient
- Fourier analysis gives the steady-state sinusoidal response directly

Both lead to the same steady-state term, and that is the main point of the last page of the lecture.
