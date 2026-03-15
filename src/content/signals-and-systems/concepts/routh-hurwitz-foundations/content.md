## Why Routh-Hurwitz Appears Right Here

The note introduces the Routh-Hurwitz stability criterion immediately after the parameter-dependent example. That order is important. You have just seen a case where direct pole calculation is still possible, but you can also feel how quickly that approach could become inconvenient for higher-order polynomials.

[[visual:routh-foundation-note]]

The denominator polynomial is written as

$$
P(s)=a_0 s^N+a_1 s^{N-1}+\cdots+a_N,\qquad a_i\in\mathbb{R}
$$

and the question on the page is direct:

How can you know there are no positive-real-part roots without factorizing the polynomial?

That is the exact problem Routh-Hurwitz is designed to solve.

## What the Coefficients Tell You First

The note expands the polynomial in terms of its roots and compares the coefficients. From that comparison, it extracts a necessary condition:

if all poles have negative real parts, then all coefficients must have the same sign.

[[visual:coefficient-sign-logic]]

This follows from the way the root sums and root products appear inside the coefficient expressions. So same-sign coefficients are not random luck. They reflect the structure a stable polynomial must have.

But here is the part you must not miss: the note immediately warns that this is only a necessary condition.

## Necessary Is Not the Same as Sufficient

The counterexample written in the note is

$$
P(s)=s^3+2s^2+2s+40
$$

Every coefficient is positive. If you stopped there, you would incorrectly call the system stable.

But the note factorizes it as

$$
P(s)=(s+4)(s^2-2s+10)
$$

Now let's see why that matters. The quadratic factor has roots with positive real part, so the polynomial is unstable even though its coefficients all have the same sign.

[[visual:positive-coefficients-counterexample]]

That is the whole logic of this concept in one example:

- same-sign coefficients help
- same-sign coefficients do not prove stability

So if you rely only on that quick check, you can still be wrong.

## What Routh-Hurwitz Adds

The lecture then introduces the Routh-Hurwitz test as a necessary-and-sufficient condition.

For

$$
H(s)=\frac{Z(s)}{P(s)}
$$

the stability test is applied to the denominator polynomial $P(s)$, because poles come from the denominator and poles decide stability.

Instead of solving for the roots one by one, the coefficients of $P(s)$ are rearranged into the Routh array. That array is built so that its first column reveals the stability information you care about.

[[visual:denominator-only-focus]]

> **Why This Matters**: This is the conceptual shift of Lesson 11. You are no longer asking only, "Can I solve for the poles?" You are asking, "Can I decide stability from the denominator itself?"

That shift is what makes the next concept worth learning carefully.
