# Frequency Response and Bode Plots - Synthesis

The lecture begins with the steady-state result from the previous lesson and generalizes it into the definition

$$
H(\omega)=H(s)\big|_{s=j\omega}
$$

That gives two fundamental descriptions:

$$
|H(\omega)| \quad \text{and} \quad \angle H(\omega)
$$

which are the amplitude response and phase response of the system.

For the first-order system

$$
H(s)=\frac{K}{s+B}
$$

the note shows

$$
|H(\omega)|=\frac{K}{\sqrt{\omega^2+B^2}},
\qquad
\angle H(\omega)=-\tan^{-1}\!\left(\frac{\omega}{B}\right)
$$

and identifies $B$ as the 3 dB bandwidth. That example gives the basic low-pass picture.

For the pole-zero system

$$
H(s)=\frac{s+C}{s+B},
\qquad 0<C<B
$$

the note shows that the magnitude rises from $C/B$ toward $1$, while the phase starts at $0^\circ$, becomes positive, and then returns toward $0^\circ$. This is the first clear example of a zero reshaping the frequency response.

For the second-order system

$$
H(s)=\frac{K}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

the lecture distinguishes between:

- $\zeta \ge 1$, where the poles are real and the response behaves like a sharper low-pass filter
- $0<\zeta<1$, where the poles are complex and the magnitude can develop a peak near the damped frequency

So the lecture leaves you with one strong message: pole and zero locations are not only stability information. They also determine the magnitude shape, the phase shift, the bandwidth, and the presence or absence of resonance.
