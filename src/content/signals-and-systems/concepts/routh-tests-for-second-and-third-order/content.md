## Low-Order Routh Results

The note ends with direct results for second-order and third-order polynomials.

[[visual:low-order-results-note]]

## Second Order

For

$$
P(s)=s^2+a_1 s+a_0
$$

the Routh array gives first column

$$
1,\quad a_1,\quad a_0
$$

So the stability conditions are

$$
\boxed{a_1>0,\qquad a_0>0}
$$

[[visual:second-order-first-column]]

## Third Order

For

$$
P(s)=s^3+a_2 s^2+a_1 s+a_0
$$

the first-column entries become

$$
1,\quad a_2,\quad \frac{a_2 a_1-a_0}{a_2},\quad a_0
$$

So the lecture gives

$$
\boxed{a_2>0,\qquad a_0>0,\qquad a_1 a_2>a_0}
$$

or equivalently

$$
a_1-\frac{a_0}{a_2}>0
$$

[[visual:third-order-first-column]]

For third order, positive coefficients alone are not enough. The extra condition is

$$
a_1 a_2>a_0
$$

[[visual:third-order-margin-chart]]

So the quick checks from the note are:

- second order: $a_1>0,\ a_0>0$
- third order: $a_2>0,\ a_0>0,\ a_1 a_2>a_0$

[[visual:decision-summary-flow]]
