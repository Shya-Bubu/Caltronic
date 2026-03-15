# Stability of Systems - Synthesis

The lecture gives these final rules:

- asymptotically stable if all poles satisfy $\operatorname{Re}(p_i) < 0$
- marginally stable if all poles satisfy $\operatorname{Re}(p_i) \le 0$ and any imaginary-axis poles are non-repeated
- unstable if any pole has positive real part or if an imaginary-axis pole is repeated

For the series RLC example,

$$
p_{1,2}=-\frac{R}{2L}\pm\sqrt{\left(\frac{R}{2L}\right)^2-\frac{1}{LC}}
$$

so for positive $R$ and $L$, the real part stays negative and the circuit is stable.

For BIBO stability, the lecture result is

$$
\int_0^\infty |h(t)|\,dt < \infty
$$

This is enough to guarantee bounded output for every bounded input.
