## The Second-Order Form in the Note

The final part of the lecture studies

$$
H(s)=\frac{K}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

with

$$
K>0, \qquad \zeta>0, \qquad \omega_n>0
$$

The note first states that the system is stable under those conditions and then writes the poles as

$$
p_1=-\zeta\omega_n+\omega_n\sqrt{\zeta^2-1}
$$

and

$$
p_2=-\zeta\omega_n-\omega_n\sqrt{\zeta^2-1}
$$

[[visual:second-order-note]]

The lecture then separates the frequency-response discussion into two cases, because the pole pattern changes qualitatively depending on $\zeta$.

## Case 1: zeta Greater Than or Equal to 1

When

$$
\zeta \ge 1
$$

the poles are real and negative. The note interprets this as a low-pass type response.

At $\omega=0$, it shows

$$
|H(0)|=\frac{K}{p_1 p_2}=\frac{K}{\omega_n^2},
\qquad
\angle H(0)=0^\circ
$$

At $\omega \to \infty$,

$$
|H(\omega)| \rightarrow 0,
\qquad
\angle H(\omega) \rightarrow -180^\circ
$$

So compared with the first-order system, the magnitude still decays with frequency, but the phase now has another $-90^\circ$ to travel because there are two poles.

[[visual:real-pole-low-pass]]

The note then takes the special case

$$
K=\omega_n^2, \qquad \zeta=1
$$

for which

$$
p_1=p_2=-\omega_n
$$

and obtains

$$
|H(\omega)|=\frac{\omega_n^2}{\omega^2+\omega_n^2}
$$

This makes the 3 dB bandwidth calculation very direct. Setting

$$
|H(B)|=\frac{1}{\sqrt{2}}
$$

leads to

$$
B^2=(\sqrt{2}-1)\omega_n^2
$$

and therefore

$$
B=\sqrt{\sqrt{2}-1}\,\omega_n
$$

The note gives the numerical example

$$
\zeta=1, \qquad \omega_n=3.1 \text{ rad/s}
$$

which yields approximately

$$
B \approx 2 \text{ rad/s}
$$

[[visual:two-pole-bandwidth-note]]

The comparison graph on the note shows that the two-pole magnitude falls more sharply than the single-pole response. That is the main physical message of this case.

## Case 2: zeta Between 0 and 1

When

$$
0<\zeta<1
$$

the poles become complex. The note introduces

$$
\omega_d=\omega_n\sqrt{1-\zeta^2}
$$

and writes

$$
p_1=-\zeta\omega_n-j\omega_d,
\qquad
p_2=-\zeta\omega_n+j\omega_d
$$

Then the frequency response is expressed as

$$
H(\omega)=\frac{K}{\bigl(\zeta\omega_n+j(\omega-\omega_d)\bigr)\bigl(\zeta\omega_n+j(\omega+\omega_d)\bigr)}
$$

with magnitude

$$
|H(\omega)|=
\frac{K}{
\sqrt{\zeta^2\omega_n^2+(\omega-\omega_d)^2}
\sqrt{\zeta^2\omega_n^2+(\omega+\omega_d)^2}
}
$$

The note then studies what happens as $\omega$ increases from zero. One factor in the denominator decreases until $\omega=\omega_d$, while the other continues increasing. That creates the possibility of a magnitude peak.

[[visual:complex-pole-note]]

This is the beginning of resonant behavior. The note does not introduce a new abstract theory here. It shows directly from the denominator factors why a peak can appear.

## The Numerical Example with Complex Poles

The note chooses

$$
\zeta=0.1, \qquad \omega_n=10, \qquad K=20
$$

so that

$$
H(s)=\frac{20}{s^2+2s+100}
$$

and

$$
\omega_d=10\sqrt{1-0.01}\approx 9.9
$$

Therefore the poles are approximately

$$
p_1=-1+j9.9,
\qquad
p_2=-1-j9.9
$$

The note writes the corresponding magnitude and phase expressions and then sketches a strong peak near the damped frequency.

[[visual:resonant-example]]

This is the biggest contrast with the earlier low-pass examples. The response no longer decreases smoothly from its low-frequency value. Instead, it rises and forms a pronounced hump before it eventually decays.

## What the Second-Order Example Adds

The second-order part of the lecture is really a lesson about pole geometry.

- two real poles produce a sharper low-pass characteristic than one pole
- two complex poles can create a peak in the magnitude response
- the phase for the two-pole case eventually tends toward $-180^\circ$

So by the end of the lecture, frequency response is no longer just a definition. It becomes a visual way of reading what the pole pattern is doing to the system across frequency.
