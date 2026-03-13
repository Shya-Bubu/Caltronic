## Stability Without Solving Every Root

The active RLC example was still manageable because the denominator was quadratic. You could solve for the poles explicitly and classify the system from their real parts. But what if the denominator is fourth order, fifth order, or higher? Solving for the roots directly becomes slower, messier, and sometimes completely impractical.

That is the problem the note addresses with the **Routh-Hurwitz stability criterion**.

[[visual:routh-foundation-note]]

The note begins with a general denominator polynomial

$$
P(s) = a_0 s^N + a_1 s^{N-1} + \cdots + a_{N-1}s + a_N
$$

with real coefficients. The key question is:

> How can you know whether there are **no positive real-part roots** without factorizing the polynomial?

That is the right motivation. Routh-Hurwitz is not about finding every pole. It is about answering the stability question directly.

## What the Coefficients Can Tell You Immediately

The note expands the polynomial in terms of its roots and compares coefficients. From that comparison, one useful fact appears:

if **all poles have negative real parts**, then it is necessary for all coefficients of the polynomial to have the same sign.

That makes sense. A stable denominator cannot jump between positive and negative coefficient signs arbitrarily.

But here is the critical warning from the note:

> having all coefficients with the same sign is **necessary**, but it is **not sufficient**.

This is one of the most important logical distinctions in the lesson.

[[visual:coefficient-sign-logic]]

## Necessary Is Not the Same as Sufficient

The note gives a counterexample:

$$
P(s) = s^3 + 2s^2 + 2s + 40
$$

All coefficients are positive, so the polynomial passes the quick sign check. But the factorization shown in the note reveals an unstable quadratic factor. So the coefficient-sign rule alone is not enough to guarantee stability.

[[visual:positive-coefficients-counterexample]]

This is the exact moment where Routh-Hurwitz becomes necessary. We need a test that is both:

- necessary
- sufficient

and the note states that the Routh-Hurwitz test provides exactly that.

## What the Criterion Is For

The Routh-Hurwitz test is applied to the denominator polynomial of the transfer function:

$$
H(s) = \frac{Z(s)}{P(s)}
$$

The numerator is not the focus here because, once again, stability is decided by the denominator poles.

The idea is to arrange the denominator coefficients into a special array. Then instead of solving for the roots directly, you inspect the **first column** of that array.

That sounds almost magical the first time you see it, but the logic is consistent with the whole course:

- denominator coefficients encode the pole locations
- the Routh array reorganizes those coefficients in a way that exposes left-half-plane information

[[visual:denominator-only-focus]]

## Why This Matters in Practice

Suppose you are given a polynomial of order five. Even writing the exact roots may be useless for design. What you really want to know is:

- is the system stable?
- if not, how many poles are on the wrong side?

Routh-Hurwitz answers exactly those questions. That is why it shows up everywhere in control and systems theory.

> **Key Insight**: Routh-Hurwitz does not replace the meaning of poles. It gives you a faster route to the same stability information when explicit root-solving is inconvenient.

## The Mental Shift

Up to now, the story has been

$$
\text{transfer function} \to \text{poles} \to \text{stability}
$$

Now it becomes

$$
\text{denominator coefficients} \to \text{Routh array} \to \text{stability}
$$

That is the conceptual shift this lesson wants you to make.
