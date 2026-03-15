## Pole Location Is the Stability Test

The note begins with causal, linear, time-invariant, finite-dimensional continuous-time systems. For that class, the transfer function is written as

$$
H(s)=\frac{b_M s^M+b_{M-1}s^{M-1}+\cdots+b_0}{s^N+a_{N-1}s^{N-1}+\cdots+a_0}
$$

and the impulse response satisfies

$$
H(s)=\mathcal{L}\{h(t)\}
$$

So the stability question is tied directly to the form of $h(t)$.

[[visual:lesson-note-page-17]]

The note then separates numerator roots and denominator roots:

- roots of the numerator are zeros
- roots of the denominator are poles

and rewrites the transfer function in factored form:

$$
H(s)=K\frac{(s-z_M)(s-z_{M-1})\cdots(s-z_1)}{(s-p_N)(s-p_{N-1})\cdots(s-p_1)}
$$

This matters because partial fractions turn those poles into the time-domain terms that appear in $h(t)$.

## What Different Poles Produce

The next page states the three main cases:

- if $H(s)$ has a real pole $p$, then $h(t)$ contains a term of the form $e^{pt}$
- if $H(s)$ has a complex-conjugate pair $p=\sigma \pm j\omega$, then $h(t)$ contains a term of the form $e^{\sigma t}\cos(\omega t+\theta)$
- if $H(s)$ has repeated poles, then $h(t)$ contains terms with extra powers of $t$, such as $t^i e^{pt}$ or $t^i e^{\sigma t}\cos(\omega t+\theta)$

[[visual:pole-response-building-blocks]]

This is the key bridge in the note. Stability is not decided by poles as isolated points on a diagram. It is decided by the time functions those poles generate.

If the pole contribution contains a negative exponential envelope, the response decays. If that envelope is zero, the response stays at constant magnitude. If the envelope is positive, the response grows.

## Why Negative Real Part Is the Condition

From those time-domain forms, the note states

$$
\lim_{t\to\infty} h(t)=0
\quad \text{iff} \quad
\operatorname{Re}(p_i)<0,\ \ i=1,2,\ldots,N
$$

That is the asymptotic stability condition for the systems under discussion.

To see why, take the two basic pole types:

- for a real pole $p$, the term is $e^{pt}$, which decays only when $p<0$
- for a complex pole $\sigma \pm j\omega$, the oscillation is multiplied by $e^{\sigma t}$, so decay happens only when $\sigma<0$

[[visual:stable-pole-map]]

That is why the note marks the left half of the $s$-plane as the stable region. If every pole lies to the left of the $j\omega$ axis, then every natural mode in $h(t)$ decays.

## What the Note Wants You to Remember

The final sentence on the page is the compact rule:

for the transient response to go to zero, all poles should lie in the left half plane.

That is the main idea of this first concept. Once you know where the poles are, you already know whether the natural response will die away.

[[visual:lesson-note-page-18]]
