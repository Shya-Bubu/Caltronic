## Exam Focus

For a second-order frequency-response question, the safest approach is to organize your answer by damping case.

Start with

$$
H(s)=\frac{K}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

and state the pole expressions. Then split the discussion into:

1. $\zeta \ge 1$
2. $0<\zeta<1$

For $\zeta \ge 1$, you should explain that the poles are real and negative, the response behaves like a low-pass filter, and the phase tends from $0^\circ$ toward $-180^\circ$. If the special case $\zeta=1$ and $K=\omega_n^2$ is used, you should know the simplified magnitude expression and the bandwidth result

$$
B=\sqrt{\sqrt{2}-1}\,\omega_n
$$

For $0<\zeta<1$, you should define

$$
\omega_d=\omega_n\sqrt{1-\zeta^2}
$$

and explain that the complex poles can create a peak in the magnitude response. A strong answer mentions why: one denominator factor decreases up to $\omega=\omega_d$ while the other increases, so the overall product can become small enough to produce resonance.

Common mistakes include:

- not separating the two damping cases
- writing the pole expressions incorrectly
- forgetting that the two-pole phase tends to $-180^\circ$, not $-90^\circ$
- missing the physical meaning of the resonant hump

If sketches are required, label the qualitative shape clearly. For the real-pole case, show a sharper low-pass fall. For the complex-pole case, show the peak near the damped frequency.
