## A Circuit Whose Stability Depends on a Gain Parameter

Lesson 10 taught you a clean rule: once you know the poles, you know the stability story. This lesson begins by showing something even more interesting: a circuit can move from stable to marginally stable to unstable as a **parameter** changes.

The note uses an active RLC network with a controlled source gain $A$. That is a perfect teaching example because it shows the stability boundary moving in real time as one coefficient changes.

[[visual:active-rlc-note-page]]

Assuming zero initial stored energy, the note converts the circuit into the $s$-domain and applies KCL at the main node:

$$
-I(s) + \frac{V(s)}{Ls} + CsV(s) + \frac{V(s)-AV(s)}{R} = 0
$$

Grouping the $V(s)$ terms gives

$$
V(s)\left[\frac{1}{Ls} + Cs + \frac{1-A}{R}\right] = I(s)
$$

So the transfer function becomes

$$
H(s) = \frac{V(s)}{I(s)} = \frac{RLs}{RLCs^2 + (1-A)Ls + R}
$$

The note then sets

$$
R=1,\qquad L=\frac{1}{2},\qquad C=1
$$

which simplifies the transfer function to

$$
H(s) = \frac{s}{s^2 + (1-A)s + 2}
$$

That denominator is the real object of interest.

## Pole Formula

The poles satisfy

$$
s^2 + (1-A)s + 2 = 0
$$

Using the quadratic formula:

$$
p_{1,2} = \frac{-(1-A) \pm \sqrt{(1-A)^2 - 8}}{2}
$$

This one formula already tells you almost everything:

- the discriminant $(1-A)^2-8$ decides whether the poles are real or complex
- the average of the two roots is $\frac{A-1}{2}$, which controls the real part

That second observation is the most important one. If the poles are complex, their real part is

$$
\operatorname{Re}(p_{1,2}) = \frac{A-1}{2}
$$

So the gain parameter $A$ literally shifts the pole pair left or right.

[[visual:gain-vs-stability-map]]

## When Are the Poles Real?

The note first asks when the poles are real. That happens when the discriminant is non-negative:

$$
(1-A)^2 - 8 \ge 0
$$

which means

$$
|1-A| \ge 2\sqrt{2}
$$

So the poles are real when

$$
A \le 1-2\sqrt{2}
\qquad \text{or} \qquad
A \ge 1+2\sqrt{2}
$$

Between those two values, the poles form a complex-conjugate pair.

This is already a nice result, but "real" versus "complex" is not the same as "stable" versus "unstable." Stability still depends on the real part.

## The Critical Boundary at A = 1

The note highlights a beautiful special case:

$$
1-A = 0 \qquad \Rightarrow \qquad A=1
$$

Then the poles become

$$
p_{1,2} = \pm j\sqrt{2}
$$

So the poles lie exactly on the imaginary axis. That gives **marginal stability**. The response does not decay, but it does not grow either.

That is a perfect boundary point. It separates the stable region from the unstable region.

[[visual:imaginary-axis-boundary]]

## Stable Region

To be stable, the pole real parts must be negative.

For the complex-pole case, the real part is $(A-1)/2$, so stability requires

$$
\frac{A-1}{2} < 0
\qquad \Rightarrow \qquad
A < 1
$$

For the real-pole case, the note checks the sign of the two roots and shows the same overall conclusion. If $A < 1-2\sqrt{2}$, both real poles are negative, so the system is stable. If $A$ is between $1-2\sqrt{2}$ and $1$, the poles are complex but still have negative real part, so the system is again stable.

So the full stable region is:

$$
A < 1
$$

## Unstable Region

Now move to $A > 1$.

If the poles are complex, the real part becomes positive. That already means instability. If $A$ becomes large enough that the poles turn real again, the note shows that at least one of them is positive. So the system stays unstable there too.

That gives the complete picture:

- $A < 1$ -> stable
- $A = 1$ -> marginally stable
- $A > 1$ -> unstable

[[visual:stability-summary-chart]]

This is a powerful example because the final rule is so simple, yet it emerged from a full pole calculation and careful case splitting.

## Why This Example Matters

This active RLC circuit teaches two ideas at once.

First, it reinforces everything from Lesson 10. Stability is still about pole location. Even when the circuit becomes more complicated, that part does not change.

Second, it exposes the limitation of direct root-solving as a general strategy. For a quadratic, this was manageable. For a fourth-order or fifth-order polynomial with parameters, solving explicitly becomes much less friendly. That is exactly why the next concept introduces Routh-Hurwitz.

> **Key Insight**: The parameter $A$ does not "change stability" in a mysterious way. It changes the denominator coefficients, which move the poles, which changes the time-domain envelope.

Once you see that chain clearly, the Routh-Hurwitz method will feel like a natural upgrade rather than a disconnected trick.
