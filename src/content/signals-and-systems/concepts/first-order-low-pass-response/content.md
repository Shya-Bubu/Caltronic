## The Basic First-Order Example

The first worked example in the note is the single-pole system

$$
H(s)=\frac{K}{s+B},
\qquad K>0,\; B>0
$$

This is the simplest nontrivial transfer function in the lecture. It contains one pole at

$$
s=-B
$$

which the note sketches on the real axis.

[[visual:first-order-note]]

The significance of that pole becomes visible only after substituting $s=j\omega$.

## Magnitude and Phase for the Single Pole

The note writes

$$
H(\omega)=\frac{K}{j\omega+B}
$$

and from that obtains the magnitude response

$$
|H(\omega)|=\frac{K}{\sqrt{\omega^2+B^2}}
$$

and the phase response

$$
\angle H(\omega)=-\tan^{-1}\!\left(\frac{\omega}{B}\right)
$$

[[visual:first-order-magnitude]]

[[visual:first-order-phase]]

These two expressions already tell you almost everything about the shape of the response. The magnitude decreases as $\omega$ increases, while the phase starts at zero and moves downward toward negative angles.

## Three Frequencies the Note Emphasizes

The note evaluates the first-order response at three important places.

At $\omega \to 0$,

$$
|H(\omega)| \rightarrow \frac{K}{B},
\qquad
\angle H(\omega) \rightarrow 0^\circ
$$

At $\omega \to \infty$,

$$
|H(\omega)| \rightarrow 0,
\qquad
\angle H(\omega) \rightarrow -90^\circ
$$

At $\omega=B$,

$$
|H(B)|=\frac{K}{\sqrt{2}B},
\qquad
\angle H(B)=-45^\circ
$$

This is the part of the note that turns the algebra into a filter interpretation. Low frequencies pass with relatively large magnitude, but as the frequency grows, the magnitude falls toward zero. That is why the note identifies the response as a low-pass characteristic.

## The 3 dB Bandwidth

The next page in the note rewrites the magnitude at $\omega=B$ in dB form.

Starting from

$$
|H(B)|=\frac{1}{\sqrt{2}}\frac{K}{B}
$$

the note shows that

$$
20\log_{10}|H(B)|=20\log_{10}\!\left(\frac{K}{B}\right)-3\text{ dB}
$$

So the response at $\omega=B$ is 3 dB below its low-frequency value.

[[visual:three-db-bandwidth]]

That is why the note calls $B$ the 3 dB bandwidth, or half-power point. The phrase "half power" is consistent with the factor $1/\sqrt{2}$ in magnitude.

## The Numerical Example in the Note

The note then chooses

$$
H(s)=\frac{2}{s+2}
$$

so that

$$
K=2, \qquad B=2
$$

and therefore the 3 dB bandwidth is

$$
2 \text{ rad/s}
$$

The note labels

- $0$ to $2$ rad/s as the pass band
- $2$ to $\infty$ rad/s as the stop band

[[visual:example-two-over-s-plus-two]]

This is a useful way to read the graph. The pass band is the region where the magnitude stays near its low-frequency level. The stop band is the region where the attenuation becomes significant.

## What This Example Teaches

The note ends this example with a practical observation: the transition from pass band to stop band is not very sharp for a first-order system. That is why higher-order systems are used when sharper filtering is required.

So the first-order example gives you three core ideas at once:

- a single pole on the negative real axis creates a low-pass response
- the magnitude drops by 3 dB at $\omega=B$
- the phase moves gradually from $0^\circ$ to $-90^\circ$

That is the basic template against which the rest of the lesson will be compared.
