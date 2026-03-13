# Routh-Hurwitz Stability Criterion - Synthesis

Lesson 10 taught you to read stability from pole locations. Lesson 11 teaches you how to predict those stability properties **without solving for every pole explicitly**.

That is the real power of Routh-Hurwitz.

## The Main Story of the Lesson

The active RLC example shows that stability can depend on a tunable parameter. In that example:

- $A < 1$ keeps the system stable
- $A = 1$ places the poles on the imaginary axis, giving marginal stability
- $A > 1$ pushes the poles into the unstable region

That example is valuable because it makes the stability boundary feel physical. A parameter change is not just a number change. It literally moves poles across the $s$-plane.

Once you see that, the need for a coefficient-based test becomes obvious.

## What Routh-Hurwitz Gives You

For a denominator polynomial

$$
P(s) = a_0 s^N + a_1 s^{N-1} + \cdots + a_N
$$

the Routh array lets you decide stability from the coefficients alone.

The core rules from this lesson are:

- the system is stable **iff** all entries in the first column of the Routh array are positive
- the number of sign changes in that first column equals the number of poles not in the left half plane
- equal-sign coefficients are necessary for stability, but not sufficient

That last point matters. The note gives a counterexample with all-positive coefficients but an unstable quadratic factor. So you should never stop at the coefficient-sign check.

## The Low-Order Results Worth Memorizing

From the Routh array you get two especially useful shortcuts:

For

$$
P(s)=s^2+a_1 s+a_0
$$

stability requires

$$
a_1>0,\qquad a_0>0
$$

For

$$
P(s)=s^3+a_2 s^2+a_1 s+a_0
$$

stability requires

$$
a_2>0,\qquad a_0>0,\qquad a_1 a_2>a_0
$$

Those conditions save a huge amount of time in exams.

## The Habit to Build

When you see a denominator polynomial now, your reaction should be:

1. check coefficient signs
2. if the order is low, use the compact Routh conditions
3. if the order is higher, build the Routh array
4. inspect the first column

That habit gives you a direct path from polynomial coefficients to stability classification, which is exactly what this lesson was designed to teach.
