## The Low-Order Results at the End of the Note

The last page of the lecture gives worked Routh tables for second-order and third-order polynomials.

[[visual:low-order-results-note]]

## Second-Order Polynomial

For

$$
P(s)=s^2+a_1 s+a_0
$$

the note writes the short Routh array as

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

This result comes directly from the general rule that every first-column entry must be positive.

## Third-Order Polynomial

For

$$
P(s)=s^3+a_2 s^2+a_1 s+a_0
$$

the first two rows are

$$
\begin{array}{c|cc}
s^3 & 1 & a_1 \\
s^2 & a_2 & a_0
\end{array}
$$

The next first-column entry is

$$
a_1-\frac{a_0}{a_2}
$$

which is the same as

$$
\frac{a_1 a_2-a_0}{a_2}
$$

So the completed first column is

$$
1,\quad a_2,\quad a_1-\frac{a_0}{a_2},\quad a_0
$$

and the stability conditions become

$$
a_2>0,\qquad a_0>0,\qquad a_1-\frac{a_0}{a_2}>0
$$

or equivalently

$$
\boxed{a_2>0,\qquad a_0>0,\qquad a_1 a_2>a_0}
$$

[[visual:third-order-first-column]]

## Why the Third-Order Case Is Different

For second order, positivity of the coefficients in the first column immediately gives the answer.

For third order, the extra expression

$$
a_1-\frac{a_0}{a_2}
$$

appears, so positive coefficients alone are not enough. The note therefore ends with the stronger condition

$$
a_1 a_2>a_0
$$

[[visual:third-order-margin-chart]]

So the quick checks you should retain are:

- second order: $a_1>0$ and $a_0>0$
- third order: $a_2>0$, $a_0>0$, and $a_1 a_2>a_0$

[[visual:decision-summary-flow]]
