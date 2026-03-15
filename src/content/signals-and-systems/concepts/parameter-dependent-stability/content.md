## Active RLC Example with Parameter $A$

The note studies an active RLC circuit whose stability depends on the gain parameter $A$.

[[visual:active-rlc-note-page]]

Using the $s$-domain KCL equation,

$$
-I(s) + \frac{V(s)}{Ls} + CsV(s) + \frac{V(s)-AV(s)}{R} = 0
$$

the transfer function becomes

$$
H(s)=\frac{V(s)}{I(s)}=\frac{RLs}{RLCs^2+(1-A)Ls+R}
$$

With

$$
R=1,\qquad L=\frac{1}{2},\qquad C=1
$$

the note gets

$$
H(s)=\frac{s}{s^2+(1-A)s+2}
$$

## Pole Formula

The poles satisfy

$$
s^2+(1-A)s+2=0
$$

so

$$
p_{1,2}=\frac{-(1-A)\pm \sqrt{(1-A)^2-8}}{2}
$$

The poles are real when

$$
(1-A)^2-8\ge 0
$$

that is,

$$
|1-A|\ge 2\sqrt{2}
$$

[[visual:gain-vs-stability-map]]

## Stability Classification

At

$$
A=1
$$

the poles become

$$
p_{1,2}=\pm j\sqrt{2}
$$

so the system is marginally stable.

[[visual:imaginary-axis-boundary]]

The note's final classification is:

- $A<1$: stable
- $A=1$: marginally stable
- $A>1$: unstable

This follows because the pole real parts are negative for $A<1$, zero at $A=1$, and positive for $A>1$.

[[visual:stability-summary-chart]]
