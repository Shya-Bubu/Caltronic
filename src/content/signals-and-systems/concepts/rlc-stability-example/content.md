## The Series RLC Example in the Note

The lecture now tests the pole rules on a specific circuit: a series RLC network with input voltage $v(t)$ and capacitor current $i(t)$ as output.

[[visual:rlc-note-gallery]]

The transfer function is written as

$$
H(s)=\frac{I(s)}{V(s)}=\frac{1}{R+Ls+\frac{1}{Cs}}
$$

Multiplying the numerator and denominator by $Cs$ gives

$$
H(s)=\frac{Cs}{LCs^2+RCs+1}
$$

and dividing by $LC$ gives the denominator in standard form:

$$
H(s)=\frac{s/L}{s^2+\frac{R}{L}s+\frac{1}{LC}}
$$

So the stability question reduces to the roots of

$$
s^2+\frac{R}{L}s+\frac{1}{LC}=0
$$

## Pole Calculation

Using the quadratic formula, the note gets

$$
p_{1,2}=-\frac{R}{2L}\pm\sqrt{\left(\frac{R}{2L}\right)^2-\frac{1}{LC}}
$$

If the quantity inside the square root is negative, this is rewritten as

$$
p_{1,2}=-\frac{R}{2L}\pm j\sqrt{\frac{1}{LC}-\left(\frac{R}{2L}\right)^2}
$$

[[visual:rlc-pole-map]]

In either form, the real part is

$$
\operatorname{Re}(p_{1,2})=-\frac{R}{2L}
$$

So for positive $R$ and $L$, the real part is negative.

## Why the Circuit Is Stable in Every Case

The note then checks the different cases of the discriminant.

If

$$
\left(\frac{R}{2L}\right)^2-\frac{1}{LC}<0
$$

the poles are complex conjugates, but their real part is still $-R/(2L)$, so they remain in the left half plane.

If the discriminant is zero, the poles are repeated, but the repeated pole is still at a negative real value.

If the discriminant is positive, the poles are real. The note rewrites them to show both are still negative.

[[visual:rlc-response-cases]]

That is why the handwritten conclusion is:

> Circuit is stable in any case.

The damping behaviour can change from real poles to repeated poles to complex poles, but the stability result does not change because the pole real parts remain negative.

[[visual:series-rlc-note-page]]
