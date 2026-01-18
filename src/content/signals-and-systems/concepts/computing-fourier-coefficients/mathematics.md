# Mathematics of Computing Fourier Coefficients

## The Analysis Equation

$$X_k = \frac{1}{T_0} \int_{T_0} x(t) \cdot e^{-jk\omega_0 t} \, dt$$

This is derived from the synthesis equation using orthogonality.

## Derivation of the Analysis Equation

Start with:
$$x(t) = \sum_{m=-\infty}^{\infty} X_m e^{jm\omega_0 t}$$

Multiply both sides by e^(-jkω₀t) and integrate over T₀:
$$\int_{T_0} x(t) e^{-jk\omega_0 t} dt = \int_{T_0} \sum_{m} X_m e^{jm\omega_0 t} e^{-jk\omega_0 t} dt$$

Exchange sum and integral:
$$= \sum_{m} X_m \int_{T_0} e^{j(m-k)\omega_0 t} dt$$

By orthogonality, the integral equals T₀ when m = k and 0 otherwise:
$$\int_{T_0} e^{j(m-k)\omega_0 t} dt = \begin{cases} T_0 & m = k \\ 0 & m \neq k \end{cases}$$

Therefore:
$$\int_{T_0} x(t) e^{-jk\omega_0 t} dt = X_k \cdot T_0$$

Solving for Xk gives the analysis equation.

## DC Component (k = 0)

$$X_0 = \frac{1}{T_0} \int_{T_0} x(t) \, dt$$

This is the average (mean) value of x(t).

## Square Pulse Train Analysis

**Signal definition:**
$$g(t) = \begin{cases} 1 & |t| < T_1 \\ 0 & \text{otherwise} \end{cases}$$

$$x(t) = \sum_{m=-\infty}^{\infty} g(t - mT_0)$$

**Computing Xk:**
$$X_k = \frac{1}{T_0} \int_{-T_1}^{T_1} 1 \cdot e^{-jk\omega_0 t} \, dt$$

$$= \frac{1}{T_0} \left[ \frac{e^{-jk\omega_0 t}}{-jk\omega_0} \right]_{-T_1}^{T_1}$$

$$= \frac{1}{T_0} \cdot \frac{e^{-jk\omega_0 T_1} - e^{jk\omega_0 T_1}}{-jk\omega_0}$$

$$= \frac{e^{jk\omega_0 T_1} - e^{-jk\omega_0 T_1}}{jk\omega_0 T_0}$$

Using $\sin\theta = (e^{j\theta} - e^{-j\theta})/(2j)$:
$$X_k = \frac{2\sin(k\omega_0 T_1)}{k\omega_0 T_0}$$

Since $\omega_0 T_0 = 2\pi$:
$$X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$$

## The Sinc Function

The result relates to the **sinc function**:
$$\text{sinc}(x) = \frac{\sin(\pi x)}{\pi x}$$

For the square pulse: $X_k \propto \text{sinc}(k \cdot 2T_1/T_0)$

## Convergence Properties

**Dirichlet conditions** ensure convergence:
1. x(t) is absolutely integrable over one period
2. x(t) has finite number of maxima/minima per period
3. x(t) has finite number of discontinuities per period

At discontinuities, the series converges to the average of left and right limits.

## Decay Rate

The rate at which |Xk| → 0 depends on signal smoothness:
- Discontinuous (square wave): |Xk| ~ 1/k
- Continuous but not smooth (triangle): |Xk| ~ 1/k²
- Smooth signals: faster decay

## Parseval's Relation

$$\frac{1}{T_0} \int_{T_0} |x(t)|^2 dt = \sum_{k=-\infty}^{\infty} |X_k|^2$$

Power in time domain = sum of powers in frequency domain.
