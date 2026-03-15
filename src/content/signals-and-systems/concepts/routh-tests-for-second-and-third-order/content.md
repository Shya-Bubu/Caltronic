## The Short Results at the End of the Lecture

The last page of the note gives compact Routh results for second-order and third-order polynomials. These are worth learning well because they are not extra formulas from somewhere else. They come directly from the same array-building procedure you just learned.

[[visual:low-order-results-note]]

## Second-Order Polynomial

Start with

$$
P(s)=s^2+a_1 s+a_0
$$

The note writes the Routh array as

$$
\begin{array}{c|cc}
s^2 & 1 & a_0 \\
s^1 & a_1 & 0 \\
s^0 & a_0 & 0
\end{array}
$$

So the first column is

$$
1,\quad a_1,\quad a_0
$$

and the stability condition becomes

$$
\boxed{a_1>0,\qquad a_0>0}
$$

[[visual:second-order-first-column]]

This follows from the general rule immediately: every first-column entry must be positive. Since the leading coefficient is already positive, the decision reduces to checking $a_1$ and $a_0$.

## Third-Order Polynomial

Now move to

$$
P(s)=s^3+a_2 s^2+a_1 s+a_0
$$

The first two rows are

$$
\begin{array}{c|cc}
s^3 & 1 & a_1 \\
s^2 & a_2 & a_0
\end{array}
$$

The next first-column term becomes

$$
a_1-\frac{a_0}{a_2}
$$

which is equivalent to

$$
\frac{a_1 a_2-a_0}{a_2}
$$

So the full first column is

$$
1,\quad a_2,\quad a_1-\frac{a_0}{a_2},\quad a_0
$$

and the stability conditions are

$$
a_2>0,\qquad a_0>0,\qquad a_1-\frac{a_0}{a_2}>0
$$

or equivalently

$$
\boxed{a_2>0,\qquad a_0>0,\qquad a_1 a_2>a_0}
$$

[[visual:third-order-first-column]]

## Why the Third-Order Case Deserves Attention

Here is the crucial difference between second order and third order.

For second order, the answer comes from direct positivity of the coefficients appearing in the first column.

For third order, a new combined condition appears:

$$
a_1 a_2>a_0
$$

So positive coefficients alone are not enough anymore. The relationship between coefficients now matters.

[[visual:third-order-margin-chart]]

This is the first low-order case where you really feel the strength of the Routh method. It is not only checking signs one by one. It is revealing how the coefficients work together.

## Fast Recall Summary

If you are revising quickly, the note ends with these two checks:

- second order: $a_1>0$ and $a_0>0$
- third order: $a_2>0$, $a_0>0$, and $a_1 a_2>a_0$

[[visual:decision-summary-flow]]

Those are the compact forms. But the good news is, once you understand where they came from, they stop feeling like facts to memorize and start feeling like direct consequences of the first-column rule.
