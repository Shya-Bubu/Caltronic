## Why Routh-Hurwitz Is Introduced

After the active RLC example, the note asks how to test stability without solving all poles explicitly.

[[visual:routh-foundation-note]]

The denominator polynomial is written as

$$
P(s)=a_0 s^N+a_1 s^{N-1}+\cdots+a_N
$$

The question is whether this polynomial has any roots with positive real part.

## Necessary Condition

From the coefficient comparison in the note:

if all poles have negative real parts, then all coefficients of the polynomial must have the same sign.

So same-sign coefficients are a necessary condition for stability.

[[visual:coefficient-sign-logic]]

## Why That Is Not Enough

The note gives the counterexample

$$
P(s)=s^3+2s^2+2s+40
$$

All coefficients are positive, but the polynomial is not stable. So same-sign coefficients are not sufficient.

[[visual:positive-coefficients-counterexample]]

## Routh-Hurwitz Idea

The Routh-Hurwitz test is then introduced as a necessary-and-sufficient test based on the denominator coefficients.

For

$$
H(s)=\frac{Z(s)}{P(s)}
$$

the stability test is applied to the denominator $P(s)$. The coefficients are arranged into the Routh array, and stability is decided from that array instead of explicit root solving.

[[visual:denominator-only-focus]]
