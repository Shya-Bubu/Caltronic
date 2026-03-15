## A Stability Problem Controlled by One Parameter

The lesson begins with an active RLC circuit where the parameter $A$ appears directly in the denominator. That is what makes this example valuable: stability is no longer hidden inside fixed component values. You can watch it change as $A$ changes.

[[visual:active-rlc-note-page]]

The note assumes zero stored energy at $t=0$ and applies KCL in the $s$-domain:

$$
-I(s)+\frac{V(s)}{Ls}+CsV(s)+\frac{V(s)-AV(s)}{R}=0
$$

Now here's where it gets interesting. Every term that contains $V(s)$ is a contribution to the effective denominator seen by the circuit. So when you collect those terms, you are not doing routine algebra only. You are building the expression that will decide the pole locations.

$$
V(s)\left[\frac{1}{Ls}+Cs+\frac{1-A}{R}\right]=I(s)
$$

This follows from moving $I(s)$ to the other side and factoring out $V(s)$. Once you do that, the transfer function comes out as

$$
H(s)=\frac{V(s)}{I(s)}=\frac{RLs}{RLCs^2+(1-A)Ls+R}
$$

The note then substitutes

$$
R=1\Omega,\qquad L=\frac{1}{2}\text{ H},\qquad C=1\text{ F}
$$

which reduces the transfer function to

$$
H(s)=\frac{s}{s^2+(1-A)s+2}
$$

> **Key Insight**: At this point, the whole stability problem has become a quadratic denominator problem. The numerator is not the stability driver. The denominator is.

## Pole Formula

The poles satisfy

$$
s^2+(1-A)s+2=0
$$

Applying the quadratic formula gives

$$
p_{1,2}=\frac{-(1-A)\pm\sqrt{(1-A)^2-8}}{2}
$$

This one line contains almost the entire lesson example. The square-root term tells you whether the poles are real or complex. The coefficient $(1-A)$ tells you where those poles sit relative to the imaginary axis.

The note first checks when the poles are real:

$$
(1-A)^2-8\ge 0
$$

so

$$
|1-A|\ge 2\sqrt{2}
$$

That means:

- outside that interval, the poles are real
- inside that interval, the poles are a complex-conjugate pair

[[visual:gain-vs-stability-map]]

This is one of those ideas that seems simple but is actually quite deep. Real poles and complex poles give different response shapes, but neither one alone tells you whether the system is stable. Stability still depends on the real part.

## The Boundary Case at A = 1

The note then isolates the most important special value:

$$
1-A=0
$$

which means

$$
A=1
$$

Substituting that into the pole formula gives

$$
p_{1,2}=\pm j\sqrt{2}
$$

So the poles are purely imaginary. Their real part is zero, which is exactly the boundary between decay and growth.

[[visual:imaginary-axis-boundary]]

This is why the note classifies $A=1$ as marginal stability. The response does not decay away, but it does not diverge either.

## Stable and Unstable Regions

Now let's build the full classification carefully, just as the note does.

When

$$
0<1-A<2\sqrt{2}
$$

the poles are complex, but the real part is negative. So the system is stable.

When

$$
-2\sqrt{2}<1-A<0
$$

the poles are still complex, but now the real part is positive. So the system is unstable.

For the real-pole regions, the note checks the signs directly:

- if $A<1-2\sqrt{2}$, both real poles are negative, so the system is stable
- if $A>1+2\sqrt{2}$, at least one real pole is positive, so the system is unstable

So the final classification is

| Range of $A$ | Pole location result | Stability |
|---|---|---|
| $A<1$ | poles in the left half plane | stable |
| $A=1$ | poles on the imaginary axis | marginally stable |
| $A>1$ | poles move to the unstable side | unstable |

[[visual:stability-summary-chart]]

## What You Should Take from This Example

The point of this concept is not only the answer $A<1$, $A=1$, $A>1$. The deeper lesson is that stability changes because the denominator changes, and the denominator changes because the parameter changes.

So this example is the bridge into Routh-Hurwitz. A second-order case can still be solved directly. But once the order grows, or once several parameters appear, you need a faster way than explicit root calculation. That is exactly what the next concept gives you.
