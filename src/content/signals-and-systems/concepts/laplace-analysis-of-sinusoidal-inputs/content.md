## Revisiting the Response to a Sinusoidal Input

The second half of the lecture shifts from Routh tables to sinusoidal response. The note considers a stable system with transfer function

$$
H(s)=\frac{Z(s)}{P(s)}
$$

where the order of $Z(s)$ is less than the order of $P(s)$, and applies the sinusoidal input

$$
x(t)=C\cos(\omega_0 t),\qquad t\ge 0
$$

[[visual:sinusoidal-input-note]]

The note then takes the Laplace transform:

$$
X(s)=\frac{Cs}{s^2+\omega_0^2}
=\frac{Cs}{(s+j\omega_0)(s-j\omega_0)}
$$

So the input itself contributes a pair of poles at

$$
s=\pm j\omega_0
$$

[[visual:input-poles-plot]]

This is the key setup. The system poles still come from $P(s)$, but the sinusoidal input introduces its own pair of imaginary-axis poles.

## Forming Y(s)

Assuming no initial energy in the system, the note writes

$$
Y(s)=\frac{Z(s)}{P(s)}\frac{Cs}{(s+j\omega_0)(s-j\omega_0)}
$$

Now here's where the decomposition begins. The note separates $Y(s)$ into a part associated with the system poles and a part associated with the sinusoidal input poles:

$$
Y(s)=\frac{R(s)}{P(s)}+\frac{K}{s-j\omega_0}+\frac{K^*}{s+j\omega_0}
$$

[[visual:partial-fraction-note]]

That split is the whole reason the later time-domain expression has two pieces:

- a transient part coming from the system poles
- a sinusoidal part coming from the input poles

The constants $K$ and $K^*$ appear as a complex-conjugate pair so that the final time-domain response remains real.

## Deriving K

The note then evaluates $K$ by multiplying by $(s-j\omega_0)$ and substituting $s=j\omega_0$:

$$
K=\left[Y(s)(s-j\omega_0)\right]_{s=j\omega_0}
$$

Substituting the expression for $Y(s)$ gives

$$
K=\left[\frac{CsZ(s)}{P(s)(s+j\omega_0)}\right]_{s=j\omega_0}
$$

Now substitute $s=j\omega_0$ carefully:

$$
K=\frac{jC\omega_0 Z(j\omega_0)}{P(j\omega_0)(2j\omega_0)}
$$

which reduces to

$$
K=\frac{C}{2}\frac{Z(j\omega_0)}{P(j\omega_0)}
$$

and therefore

$$
\boxed{K=\frac{C}{2}H(j\omega_0)}
$$

[[visual:k-coefficient-flow]]

This is the most important algebraic step in the concept. The frequency-response quantity $H(j\omega_0)$ appears naturally from the partial-fraction calculation. It is not inserted by definition afterward. The derivation produces it.

## What This Concept Gives You

At the end of this part of the lecture, you know that the Laplace-domain output can be written as

$$
Y(s)=\frac{R(s)}{P(s)}+\frac{\frac{C}{2}H(j\omega_0)}{s-j\omega_0}+\frac{\frac{C}{2}H^*(j\omega_0)}{s+j\omega_0}
$$

That is the exact launch point for the next concept, where the note converts this into the time-domain steady-state formula.
