## Active RLC Example with a Variable Parameter

The lecture starts Lesson 11 with an active RLC circuit whose stability depends on the gain parameter $A$.

[[visual:active-rlc-note-page]]

Assuming zero stored energy at $t=0$, the note moves to the $s$-domain and applies KCL at the main node:

$$
-I(s)+\frac{V(s)}{Ls}+CsV(s)+\frac{V(s)-AV(s)}{R}=0
$$

Collecting the $V(s)$ terms gives

$$
V(s)\left[\frac{1}{Ls}+Cs+\frac{1-A}{R}\right]=I(s)
$$

and therefore

$$
H(s)=\frac{V(s)}{I(s)}=\frac{RLs}{RLCs^2+(1-A)Ls+R}
$$

The note then substitutes

$$
R=1\Omega,\qquad L=\frac{1}{2}\text{ H},\qquad C=1\text{ F}
$$

which gives

$$
H(s)=\frac{s}{s^2+(1-A)s+2}
$$

## Pole Formula and Real-Pole Region

The poles satisfy

$$
s^2+(1-A)s+2=0
$$

so the quadratic formula gives

$$
p_{1,2}=\frac{-(1-A)\pm\sqrt{(1-A)^2-8}}{2}
$$

The note first asks when the poles are real. That happens when

$$
(1-A)^2-8\ge 0
$$

or

$$
|1-A|\ge 2\sqrt{2}
$$

So outside the central interval, the poles are real, and inside it they are a complex-conjugate pair.

[[visual:gain-vs-stability-map]]

## Boundary at A = 1

The note then picks the special case

$$
1-A=0
$$

which means

$$
A=1
$$

At that value,

$$
p_{1,2}=\pm j\sqrt{2}
$$

so the poles are purely imaginary and the real part is zero.

[[visual:imaginary-axis-boundary]]

This is the stability boundary used by the note.

## Stability Regions

When

$$
-2\sqrt{2}<1-A<0
$$

the poles are complex and

$$
\operatorname{Re}(p_{1,2})>0
$$

so the system is unstable.

When

$$
0<1-A<2\sqrt{2}
$$

the poles are complex and

$$
\operatorname{Re}(p_{1,2})<0
$$

so the system is stable.

For the outer real-pole regions, the note checks the signs directly and concludes:

- if $A>1+2\sqrt{2}$, at least one pole is positive, so the system is unstable
- if $A<1-2\sqrt{2}$, both poles are negative, so the system is stable

Putting all cases together, the final result is

- $A<1$: stable
- $A=1$: marginally stable
- $A>1$: unstable

[[visual:stability-summary-chart]]
