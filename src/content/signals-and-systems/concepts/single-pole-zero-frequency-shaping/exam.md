## Exam Focus

In a question on this example, the examiner is usually checking whether you can handle both a pole and a zero without losing track of the physical interpretation.

Start from

$$
H(s)=\frac{s+C}{s+B},
\qquad 0<C<B
$$

Then write

$$
H(\omega)=\frac{j\omega+C}{j\omega+B}
$$

and derive

$$
|H(\omega)|=\frac{\sqrt{\omega^2+C^2}}{\sqrt{\omega^2+B^2}}
$$

and

$$
\angle H(\omega)=\tan^{-1}\!\left(\frac{\omega}{C}\right)-\tan^{-1}\!\left(\frac{\omega}{B}\right)
$$

After that, a strong answer evaluates:

- the magnitude and phase at $\omega=0$
- the limiting values as $\omega \to \infty$
- the sign of the phase when $0<C<B$

That is usually enough to justify the sketch.

Common mistakes include:

- writing the magnitude without square roots
- forgetting that the phase is the angle of the numerator minus the angle of the denominator
- claiming the phase is negative, even though the first inverse tangent is larger
- calling the response an ideal high-pass filter instead of describing it as a similar or resembling characteristic

If the example $H(s)=(s+1)/(s+2)$ is used, make sure you state that the magnitude starts at $1/2$ and approaches $1$. Those two values anchor the sketch immediately.
