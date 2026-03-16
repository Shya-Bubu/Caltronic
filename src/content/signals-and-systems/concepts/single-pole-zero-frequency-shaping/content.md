## Adding One Zero Changes the Picture

The second worked example in the note is

$$
H(s)=\frac{s+C}{s+B},
\qquad B,C>0
$$

with the additional condition

$$
0<C<B
$$

This looks only slightly more complicated than the first-order example, but the extra zero changes both the magnitude shape and the phase shape in a very visible way.

[[visual:pole-zero-note]]

The note places the zero at $s=-C$ and the pole at $s=-B$. Since $C<B$, the zero is closer to the origin than the pole.

## Magnitude and Phase Expressions

After setting $s=j\omega$, the note writes

$$
H(\omega)=\frac{j\omega+C}{j\omega+B}
$$

From this it obtains

$$
|H(\omega)|=\frac{\sqrt{\omega^2+C^2}}{\sqrt{\omega^2+B^2}}
$$

and

$$
\angle H(\omega)=\tan^{-1}\!\left(\frac{\omega}{C}\right)-\tan^{-1}\!\left(\frac{\omega}{B}\right)
$$

[[visual:pole-zero-magnitude]]

[[visual:pole-zero-phase]]

The magnitude now contains one square root in the numerator and one in the denominator. That means the response no longer falls monotonically like the single-pole example. Instead, it rises from one level toward another.

## Reading the Limits from the Note

The note evaluates the response at low and high frequency.

At $\omega=0$,

$$
|H(0)|=\frac{C}{B},
\qquad
\angle H(0)=0^\circ
$$

At $\omega \to \infty$,

$$
|H(\omega)| \rightarrow 1,
\qquad
\angle H(\omega) \rightarrow 0^\circ
$$

So the magnitude begins at $C/B$ and ends at $1$. Because $C<B$, the starting magnitude is below $1$, and the response rises toward unity as frequency increases.

That is why the note says the example resembles a high-pass filter, although the cutoff is not sharp.

## Why the Phase Becomes Positive

The phase formula is especially interesting:

$$
\angle H(\omega)=\tan^{-1}\!\left(\frac{\omega}{C}\right)-\tan^{-1}\!\left(\frac{\omega}{B}\right)
$$

Since $0<C<B$, the ratio $\omega/C$ is always larger than $\omega/B$. Therefore the first inverse tangent is larger than the second, so the phase stays positive.

The note also remarks that once $\omega$ grows beyond $B$, the phase starts to decrease again. So the phase does not keep rising forever. It has a positive hump.

[[visual:phase-peak-note]]

This is one of the clearest places in the lecture where the zero reveals itself. The zero does not only affect the magnitude level. It also pushes the phase upward before the phase eventually returns toward $0^\circ$.

## The Specific Example in the Note

The note then chooses

$$
H(s)=\frac{s+1}{s+2}
$$

which means

$$
C=1, \qquad B=2
$$

The magnitude therefore starts at

$$
|H(0)|=\frac{1}{2}
$$

and tends toward $1$ as frequency increases.

The phase starts from $0^\circ$, rises to a peak, and then falls back toward $0^\circ$.

[[visual:example-s-plus-1-over-s-plus-2]]

The note comments that this resembles the characteristic of a high-pass filter, although the 3 dB cutoff point is not sharp. That last remark is important. The lecture is not claiming that every rising curve is an ideal high-pass filter. It is showing the qualitative effect of placing one zero and one pole on the negative real axis.

## What This Concept Adds

Compared with the single-pole system, this example teaches a new lesson:

- a pole alone tends to pull the magnitude downward
- a zero can lift the magnitude and create a positive phase region

So the system shape is no longer explained by poles alone. The zero matters directly, and this is the first note example where that becomes visually obvious.
