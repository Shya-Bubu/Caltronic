# Fourier Series Properties

> **Why This Matters**: These properties let you transform known Fourier series into new ones without recomputing integrals. Master them and you can solve problems in seconds that would otherwise take pages of calculation.

---

## Time Shifting Property

If $x(t) \leftrightarrow c_k$, then:

$$x(t - t_0) \leftrightarrow c_k e^{-jk\omega_0 t_0}$$

[[visual:time-shift-property]]

**Interpretation**: Time delay adds a linear phase shift. Amplitude spectrum unchanged!

---

## Time Scaling Property

If $x(t)$ has period $T$, then $x(at)$ has period $T/|a|$.

The NEW fundamental frequency is $|a|\omega_0$, but coefficients stay the same:
$$x(at) \leftrightarrow c_k \text{ (with new } \omega_0' = |a|\omega_0\text{)}$$

---

## Linearity

$$ax(t) + by(t) \leftrightarrow ac_k^{(x)} + bc_k^{(y)}$$

[[visual:linearity-property]]

Fourier series is a linear operation!

---

## Differentiation Property

$$\frac{dx}{dt} \leftrightarrow jk\omega_0 c_k$$

[[visual:differentiation-property]]

**Effect**: Differentiation amplifies high frequencies (factor of $k$) and adds 90° phase shift.

---

## Integration Property

$$\int x(t) dt \leftrightarrow \frac{c_k}{jk\omega_0} \text{ (for } k \neq 0\text{)}$$

**Effect**: Integration attenuates high frequencies and shifts phase by -90°.

---

## Parseval's Theorem

The average power of a signal equals the sum of powers in each harmonic:

$$\frac{1}{T}\int_T |x(t)|^2 dt = \sum_{k=-\infty}^{\infty} |c_k|^2$$

[[visual:parseval-theorem]]

**Practical use**: Calculate power in frequency domain!

---

## Summary Table

| Property | Time Domain | Frequency Domain |
|----------|-------------|------------------|
| Linearity | $ax + by$ | $ac_k^x + bc_k^y$ |
| Time Shift | $x(t-t_0)$ | $c_k e^{-jk\omega_0 t_0}$ |
| Differentiate | $dx/dt$ | $jk\omega_0 c_k$ |
| Integrate | $\int x dt$ | $c_k/(jk\omega_0)$ |
| Parseval | Avg power | $\sum|c_k|^2$ |
