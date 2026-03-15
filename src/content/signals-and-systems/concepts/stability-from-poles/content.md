## Stability from Pole Locations

The note considers causal, linear, time-invariant, finite-dimensional continuous-time systems with transfer function

$$
H(s) = \frac{b_M s^M + b_{M-1}s^{M-1} + \cdots + b_0}{s^N + a_{N-1}s^{N-1} + \cdots + a_0}
$$

The factored form is written as

$$
H(s) = K\frac{(s-z_M)\cdots(s-z_1)}{(s-p_N)\cdots(s-p_1)}
$$

so the denominator poles $p_i$ determine the natural modes in $h(t)$.

[[visual:lesson-note-page-17]]

## Modes Produced by Poles

The note connects pole type to time-domain terms:

- a real pole gives an exponential term $e^{pt}$
- a complex pole pair gives an oscillatory term with exponential envelope
- a repeated pole adds factors such as $t e^{pt}$

So stability depends on whether these terms decay or not.

[[visual:pole-response-building-blocks]]

For the systems in the lecture, the key statement is

$$
\lim_{t\to\infty} h(t)=0
\quad \text{iff} \quad
\operatorname{Re}(p_i)<0 \text{ for all } i
$$

## Why the Left Half Plane Matters

If a pole is real, the mode is $e^{pt}$.

- $p<0$ gives decay
- $p=0$ gives a constant term
- $p>0$ gives growth

If a pole is complex, $p=\sigma \pm j\omega$, then the oscillation is multiplied by $e^{\sigma t}$. The sign of $\sigma$ decides decay or growth.

That is why the imaginary axis separates stable and unstable pole locations.

[[visual:stable-pole-map]]

## Final Rule from the Note

For these finite-dimensional systems, asymptotic stability is decided by the poles only:

$$
\text{asymptotically stable} \iff \operatorname{Re}(p_i)<0 \text{ for every pole}
$$

Zeros are part of the transfer function, but the stability condition comes from the denominator poles.

[[visual:lesson-note-page-18]]
