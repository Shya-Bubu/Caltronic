# j-Axis Poles and Sinusoidal Steady-State Response - Synthesis

The first conclusion of the lesson is a refined Routh-Hurwitz result. If every entry in the first column is positive except the one indexed by $s^1$, which is zero, then the polynomial has a conjugate pair on the $j\omega$ axis. In the worked example of the note, that pair is

$$
\pm j\sqrt{2}
$$

The second conclusion comes from the sinusoidal-input analysis. Starting with

$$
x(t)=C\cos(\omega_0 t)
$$

the note shows that

$$
Y(s)=\frac{R(s)}{P(s)}+\frac{\frac{C}{2}H(j\omega_0)}{s-j\omega_0}+\frac{\frac{C}{2}H^*(j\omega_0)}{s+j\omega_0}
$$

and therefore

$$
y(t)=y_t(t)+C|H(j\omega_0)|\cos\!\bigl(\omega_0 t+\angle H(j\omega_0)\bigr), \qquad t \ge 0
$$

Here $y_t(t)$ is the transient contribution associated with the system poles. For a stable system it decays to zero, leaving the steady-state response

$$
y_{ss}(t)=C|H(j\omega_0)|\cos\!\bigl(\omega_0 t+\angle H(j\omega_0)\bigr)
$$

The final point of the lecture is interpretive: the Fourier-transform method gives this same sinusoidal steady-state term directly, because that viewpoint describes the response after the transient has already disappeared.
