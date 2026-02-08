# Lesson 04 Synthesis

## Key Takeaways

**Fourier Series**: Any periodic signal with period T can be written as:
$$x(t) = \sum_{k=-\infty}^{\infty} c_k e^{jk\omega_0 t}$$

where $\omega_0 = 2\pi/T$ and coefficients are:
$$c_k = \frac{1}{T}\int_T x(t) e^{-jk\omega_0 t} dt$$

**Key Properties**:
- Time shift → phase change in coefficients
- Time scaling → frequency scaling
- Real signals have conjugate symmetric coefficients

## Looking Ahead

In Part II, we'll explore differentiation/integration properties, Parseval's theorem for power calculation, and how LTI systems affect Fourier series.
