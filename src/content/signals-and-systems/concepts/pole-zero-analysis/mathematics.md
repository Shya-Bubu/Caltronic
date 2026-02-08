# Mathematical Framework for Pole-Zero Analysis

## Transfer Function Factored Form

Any rational transfer function can be written as:

$$H(s) = K \frac{(s-z_1)(s-z_2)\cdots(s-z_m)}{(s-p_1)(s-p_2)\cdots(s-p_n)}$$

Where:
- K is the gain constant
- z₁, z₂, ..., zₘ are the zeros
- p₁, p₂, ..., pₙ are the poles
- m ≤ n for proper systems

## Partial Fraction Expansion

To find the impulse response, expand H(s):

$$H(s) = \sum_{i=1}^{n} \frac{A_i}{s-p_i}$$

For distinct poles. Each term corresponds to:
$$h_i(t) = A_i e^{p_i t} u(t)$$

## Complex Conjugate Poles

Complex poles always come in conjugate pairs for real systems:
$$p_{1,2} = -\sigma \pm j\omega$$

Their contribution to h(t):
$$h(t) = 2|A|e^{-\sigma t}\cos(\omega t + \phi)u(t)$$

## Second-Order System Standard Form

$$H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

Poles at: $s = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2-1}$

For ζ < 1 (underdamped): $s = -\sigma \pm j\omega_d$
Where σ = ζωₙ and ωd = ωₙ√(1-ζ²)

## Frequency Response from Poles/Zeros

At frequency ω, the magnitude is:

$$|H(j\omega)| = |K| \frac{\prod |j\omega - z_i|}{\prod |j\omega - p_i|}$$

Each factor is a geometric distance from jω to the pole or zero.
