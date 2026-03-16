# Frequency Response and Bode Plots - Overview

> **Why This Matters**: Lesson 12 ended with the steady-state formula involving $H(j\omega_0)$. Lesson 13 turns that result into a full language for describing systems in the frequency domain.

This lecture begins by asking a natural question: if the input frequency is allowed to vary, what does the system do to each sinusoid?

The answer is called the frequency response. The note defines

$$
H(\omega)=H(s)\big|_{s=j\omega}
$$

and then separates that quantity into:

- an amplitude response, $|H(\omega)|$
- a phase response, $\angle H(\omega)$

From there, the lecture moves through increasingly informative examples. First, it studies the single-pole form $H(s)=K/(s+B)$ and shows how that system behaves like a low-pass filter. Then it adds a zero and studies

$$
H(s)=\frac{s+C}{s+B}
$$

to show how the zero reshapes both magnitude and phase. Finally, it moves to the second-order form

$$
H(s)=\frac{K}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

and separates the behavior into two cases: real poles and complex poles.

So the lesson flow is

$$
H(j\omega) \rightarrow \text{Bode description} \rightarrow \text{1-pole response} \rightarrow \text{pole-zero shaping} \rightarrow \text{2nd-order response}
$$

If you keep that sequence in mind, the lecture becomes very coherent. The first page gives the definitions, and the remaining pages show what those definitions mean for real transfer functions.
