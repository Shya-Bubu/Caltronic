# Lesson 03 Synthesis

## Key Takeaways

**Convolution**: The output of any LTI system equals the convolution of input with impulse response:
$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau)h(t-\tau)d\tau$$

**Graphical Interpretation**: Flip h, slide it across x, multiply and integrate at each position.

**Properties that simplify calculations**:
- Commutative: $x * h = h * x$
- Associative: $(x * h_1) * h_2 = x * (h_1 * h_2)$
- Distributive: $x * (h_1 + h_2) = x * h_1 + x * h_2$

**Impulse as identity**: $x(t) * \delta(t) = x(t)$

## Looking Ahead

With convolution mastered, we're ready for **frequency domain analysis**. Fourier series and transforms will show that convolution in time becomes MULTIPLICATION in frequency—dramatically simplifying many calculations.
