# Laplace Transform Basics

> **Why This Matters**: The Laplace transform extends Fourier analysis to handle growing signals and transient behavior. It's THE tool for analyzing differential equations, control systems, and circuit dynamics.

---

## From Fourier to Laplace

Fourier transform requires $\int|x(t)|dt < \infty$. Many signals (like $e^{2t}$) don't satisfy this.

**Solution**: Add a converging factor $e^{-\sigma t}$:
$$X(s) = \int_0^{\infty} x(t)e^{-st}dt$$

where $s = \sigma + j\omega$ (complex frequency).

[[visual:fourier-to-laplace]]

---

## The Laplace Transform

**Definition** (unilateral/one-sided):
$$X(s) = \mathcal{L}\{x(t)\} = \int_0^{\infty} x(t)e^{-st}dt$$

[[visual:laplace-definition]]

**Inverse**:
$$x(t) = \frac{1}{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty} X(s)e^{st}ds$$

---

## Region of Convergence (ROC)

The integral converges only for certain values of $\text{Re}(s) = \sigma$.

[[visual:s-plane-roc]]

| Signal | Transform | ROC |
|--------|-----------|-----|
| $e^{-at}u(t)$ | $\frac{1}{s+a}$ | $\text{Re}(s) > -a$ |
| $-e^{-at}u(-t)$ | $\frac{1}{s+a}$ | $\text{Re}(s) < -a$ |

**Same transform, different ROC = different signal!**

---

## Essential Transform Pairs

[[visual:transform-table]]

| $x(t)$ | $X(s)$ | ROC |
|--------|--------|-----|
| $\delta(t)$ | $1$ | All $s$ |
| $u(t)$ | $1/s$ | Re(s) > 0 |
| $e^{-at}u(t)$ | $1/(s+a)$ | Re(s) > -a |
| $t^n u(t)$ | $n!/s^{n+1}$ | Re(s) > 0 |
| $\cos(\omega_0 t)u(t)$ | $s/(s^2+\omega_0^2)$ | Re(s) > 0 |

---

## Key Properties

| Property | Time Domain | s-Domain |
|----------|-------------|----------|
| Linearity | $ax + by$ | $aX + bY$ |
| Time shift | $x(t-t_0)u(t-t_0)$ | $e^{-st_0}X(s)$ |
| Differentiation | $dx/dt$ | $sX(s) - x(0^-)$ |
| Integration | $\int_0^t x(\tau)d\tau$ | $X(s)/s$ |

---

## Summary

| Concept | Key Point |
|---------|-----------|
| Laplace vs Fourier | Laplace handles growing/transient signals |
| s | Complex frequency $s = \sigma + j\omega$ |
| ROC | Region where transform converges |
| Same X(s), different ROC | Different signals! |
