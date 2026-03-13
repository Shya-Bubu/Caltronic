## A Worked Stability Test on a Real Circuit

Abstract pole rules are useful, but they become much easier to trust once you see them inside an actual circuit. The note does exactly that with a **series RLC network**. This is a great example because the circuit can be overdamped, critically damped, or underdamped, yet its pole pattern still tells one consistent stability story.

[[visual:rlc-note-gallery]]

The circuit takes an input voltage $v(t)$ and treats the capacitor current $i(t)$ as the output variable of interest. In the $s$-domain the transfer function written in the note is

$$
H(s) = \frac{I(s)}{V(s)} = \frac{1}{R + Ls + \frac{1}{Cs}}
$$

Multiplying numerator and denominator by $Cs$ gives

$$
H(s) = \frac{Cs}{LCs^2 + RCs + 1}
$$

and dividing through by $LC$ gives the normalized denominator

$$
H(s) = \frac{s/L}{s^2 + \frac{R}{L}s + \frac{1}{LC}}
$$

The numerator is not the main character here. The denominator is.

## Finding the Poles

To classify stability, solve the characteristic equation

$$
s^2 + \frac{R}{L}s + \frac{1}{LC} = 0
$$

Using the quadratic formula:

$$
p_{1,2} = -\frac{R}{2L} \pm \sqrt{\left(\frac{R}{2L}\right)^2 - \frac{1}{LC}}
$$

The note then rewrites the square-root term in a way that separates the real and imaginary parts. If the quantity inside the square root is negative, the poles become a complex-conjugate pair:

$$
p_{1,2} = -\frac{R}{2L} \pm j \sqrt{\frac{1}{LC} - \left(\frac{R}{2L}\right)^2}
$$

That form is extremely revealing, because the real part is still

$$
\operatorname{Re}(p_{1,2}) = -\frac{R}{2L}
$$

and for ordinary passive components with $R>0$ and $L>0$, that quantity is negative.

[[visual:rlc-pole-map]]

## Three Damping Cases, One Stability Verdict

The discriminant

$$
\left(\frac{R}{2L}\right)^2 - \frac{1}{LC}
$$

decides the *shape* of the response:

- positive discriminant -> two distinct real poles -> overdamped
- zero discriminant -> repeated real pole -> critically damped
- negative discriminant -> complex-conjugate poles -> underdamped

Students sometimes see these as separate topics, but the stability test unifies them. In all three cases, the real part stays at or below $-R/(2L)$ for passive component values. That means the natural response decays.

[[visual:rlc-response-cases]]

This is a really important engineering lesson. The waveform can look very different from case to case:

- one response may decay without oscillation
- another may decay as fast as possible without oscillation
- another may ring before settling

but all three are still stable because the poles remain in the left half plane.

## Why the Real Part Stays Negative

Let us examine the two cases the note emphasizes.

### Case 1: Complex poles

If

$$
\left(\frac{R}{2L}\right)^2 - \frac{1}{LC} < 0
$$

then the poles are

$$
-\frac{R}{2L} \pm j\omega_d
$$

for some damped frequency $\omega_d$. The oscillation part changes, but the envelope is

$$
e^{-Rt/(2L)}
$$

which decays because $R/(2L) > 0$.

### Case 2: Real poles

If the discriminant is non-negative, the square root is real. The note shows that both resulting pole values are still negative. That means both exponential terms decay. So even without oscillation, the response still settles down.

The conclusion written in the notes is beautifully simple:

> **The circuit is stable in any case.**

That line is worth remembering because it ties physical intuition to pole algebra. A passive series RLC circuit does not generate unlimited energy on its own. The pole locations reflect that.

## What This Teaches You Beyond One Example

This example is much more than a homework calculation. It teaches three powerful habits:

1. derive the denominator carefully
2. find poles before worrying about exact inverse transforms
3. read stability from the real parts immediately

In an exam, that means you can often classify the circuit before finishing every algebraic detail of the time response.

## A Useful Mental Picture

Imagine moving the resistance value $R$:

- large $R$ pushes the poles further left and usually reduces oscillation
- small $R$ brings the poles closer to the imaginary axis and increases ringing
- but as long as $R$ stays positive, the poles do not cross into the right half plane

So changing parameters changes damping and speed, but not the fact of stability itself.

[[visual:series-rlc-note-page]]

## The Takeaway

The series RLC circuit is the perfect demonstration that stability is not about whether the output wiggles. It is about whether the wiggles are trapped inside a decaying envelope.

That is why the real part matters more than the imaginary part. The imaginary part controls **how** the system oscillates. The real part controls **whether** the oscillation dies away.
