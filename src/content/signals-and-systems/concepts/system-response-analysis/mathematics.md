# Mathematical Framework

## Step Response Derivation

For second-order system with step input:
$$Y(s) = \frac{\omega_n^2}{s(s^2 + 2\zeta\omega_n s + \omega_n^2)}$$

Using partial fractions and inverse transform:
$$y(t) = 1 - \frac{e^{-\zeta\omega_n t}}{\sqrt{1-\zeta^2}}\sin(\omega_d t + \phi)$$

where $\phi = \cos^{-1}(\zeta)$

## Transient Response Components

For distinct real poles at -p₁ and -p₂:
$$y(t) = A_0 + A_1 e^{-p_1 t} + A_2 e^{-p_2 t}$$

For complex poles at -σ ± jωd:
$$y(t) = A_0 + Be^{-\sigma t}\sin(\omega_d t + \phi)$$

## Steady-State Analysis

For step input, final value:
$$y_{ss} = \lim_{s \to 0} sY(s) = \lim_{s \to 0} s \cdot H(s) \cdot \frac{1}{s} = H(0)$$

Steady-state error for unity feedback:
$$e_{ss} = \frac{1}{1 + K_p}$$
where Kp = lim H(s) as s→0 (position error constant)
