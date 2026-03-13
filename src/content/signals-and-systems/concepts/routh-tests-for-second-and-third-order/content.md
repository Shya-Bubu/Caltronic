## Low-Order Cases You Should Recognize Immediately

Once you understand how to build the full Routh array, the note gives two shortcuts that are worth memorizing. These are not random formulas. They come directly from applying the Routh procedure to second-order and third-order denominator polynomials.

That means you can save time in an exam. Instead of rebuilding the entire table every single time, you can often recognize the stability conditions almost immediately.

[[visual:low-order-results-note]]

## Second-Order Polynomial

Start with the monic denominator

$$
P(s)=s^2+a_1 s+a_0
$$

The Routh array begins as

$$
\begin{array}{c|cc}
s^2 & 1 & a_0 \\
s^1 & a_1 & 0 \\
s^0 & a_0 &
\end{array}
$$

So the first column is

$$
1,\quad a_1,\quad a_0
$$

For stability, every first-column entry must be positive. Since the leading coefficient is already positive, the condition reduces to

$$
\boxed{a_1>0,\qquad a_0>0}
$$

That result is beautifully simple. A second-order monic polynomial is stable exactly when both remaining coefficients are positive.

[[visual:second-order-first-column]]

## Why This Matches Your Pole Intuition

For a quadratic, you could still solve the roots directly. But the Routh result shows something deeper: you do not need to. The coefficient signs already contain the necessary information for this low-order case.

That is reassuring because it agrees with everything you learned in the previous lesson. Stable poles must stay in the left half plane, and the Routh test captures that fact using only coefficients.

> **Key Insight**: The low-order rules are not separate from the general Routh method. They are compressed versions of it.

## Third-Order Polynomial

Now take

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

The next first-column entry becomes

$$
\frac{a_2 a_1-a_0}{a_2}
$$

So the completed first column is

$$
1,\quad a_2,\quad \frac{a_2 a_1-a_0}{a_2},\quad a_0
$$

To make every one of those positive, the note writes the third-order stability conditions as

$$
\boxed{a_2>0,\qquad a_0>0,\qquad a_1 a_2>a_0}
$$

You will also see the third condition written as

$$
a_1-\frac{a_0}{a_2}>0
$$

which is the same statement after dividing by the positive coefficient $a_2$.

[[visual:third-order-first-column]]

## What the Extra Inequality Means

This is where third-order systems become more interesting than second-order systems. Positive coefficients alone are still not enough. You now need an extra relationship between the coefficients:

$$
a_1 a_2>a_0
$$

That inequality is the compact form of the Routh test for third order. It tells you that the middle coefficients must be strong enough, in a combined sense, relative to the constant term.

So the third-order case is the first place where you really feel why Routh-Hurwitz matters. It is no longer only about sign checks. It is about a structured interaction among coefficients.

[[visual:third-order-margin-chart]]

## How to Use These Results in an Exam

If the denominator is second order, check $a_1$ and $a_0$ immediately.

If the denominator is third order, do not stop at "all coefficients are positive." You must also check the product condition $a_1 a_2>a_0$.

That habit saves marks because many exam questions are designed exactly around that trap. A polynomial can look harmless at first glance, but the third-order inequality is what decides the case.

<details>
<summary><strong>Pause & Think</strong>: If a third-order polynomial has positive coefficients but satisfies $a_1 a_2<a_0$, what should you conclude?</summary>

You should conclude that the system is unstable. Positive coefficients pass only the necessary sign test. Failing the inequality $a_1 a_2>a_0$ means the Routh first column cannot remain entirely positive.

</details>

## The Big Picture

These low-order results are worth remembering because they let you move very quickly:

- second order: check two positive coefficients
- third order: check two positive coefficients and one product inequality

But do not memorize them as isolated facts. They are really the first convenient summaries of the full Routh-Hurwitz machinery. Once you see that connection, the formulas become much easier to trust and much harder to forget.

[[visual:decision-summary-flow]]
