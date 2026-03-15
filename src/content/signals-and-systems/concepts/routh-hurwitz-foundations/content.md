## Why a New Stability Test Is Needed

After the active RLC example, the note introduces the Routh-Hurwitz stability criterion.

[[visual:routh-foundation-note]]

The denominator polynomial is written as

$$
P(s)=a_0 s^N+a_1 s^{N-1}+\cdots+a_N,\qquad a_i\in\mathbb{R}
$$

The question asked on the page is:

how can we know that there are no positive real roots without factorizing the polynomial?

That is the motivation for the whole method.

## Necessary Condition from the Coefficients

The note expands the polynomial in terms of its roots and compares the coefficients. From that comparison it concludes:

if all poles have negative real parts, then it is necessary for all the coefficients to have the same sign.

[[visual:coefficient-sign-logic]]

This is an important filter, but the note immediately says it is not enough by itself.

## Why Same-Sign Coefficients Are Not Sufficient

The counterexample written in the note is

$$
P(s)=s^3+2s^2+2s+40
$$

and it is factorized as

$$
P(s)=(s+4)(s^2-2s+10)
$$

The quadratic factor gives roots with positive real part, so the polynomial is not stable even though all coefficients are positive.

[[visual:positive-coefficients-counterexample]]

So the note's conclusion is precise:

- same-sign coefficients are necessary
- same-sign coefficients are not sufficient

## Routh-Hurwitz Criterion

That is why the lecture introduces the Routh-Hurwitz test as a necessary-and-sufficient stability condition.

For

$$
H(s)=\frac{Z(s)}{P(s)}
$$

the test is applied to the denominator polynomial $P(s)$, because stability is decided by the poles.

The coefficients of $P(s)$ are then arranged in a Routh array, and the stability decision is taken from that array instead of explicit factorization.

[[visual:denominator-only-focus]]
