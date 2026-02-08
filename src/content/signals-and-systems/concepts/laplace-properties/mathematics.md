# Mathematical Framework for Laplace Properties

## Derivation of Key Properties

### Time Shifting Property

For $f(t-T)u(t-T)$ where T > 0:

$$\mathcal{L}\{f(t-T)u(t-T)\} = \int_0^\infty f(t-T)u(t-T)e^{-st}dt$$

Substituting $\tau = t - T$:
$$= \int_{-T}^\infty f(\tau)u(\tau)e^{-s(\tau+T)}d\tau = e^{-sT}\int_0^\infty f(\tau)e^{-s\tau}d\tau = e^{-sT}F(s)$$

### Differentiation Property

Using integration by parts on $\mathcal{L}\{f'(t)\}$:

$$\int_0^\infty f'(t)e^{-st}dt = [f(t)e^{-st}]_0^\infty + s\int_0^\infty f(t)e^{-st}dt$$

For convergent transforms (Re(s) sufficiently large):
$$= -f(0^-) + sF(s) = sF(s) - f(0^-)$$

### Convolution Property

$$\mathcal{L}\{f*g\} = \int_0^\infty \left[\int_0^t f(\tau)g(t-\tau)d\tau\right]e^{-st}dt$$

Reversing integration order and using substitutions:
$$= \int_0^\infty f(\tau)e^{-s\tau}d\tau \cdot \int_0^\infty g(\lambda)e^{-s\lambda}d\lambda = F(s)G(s)$$

## ROC Considerations

Properties affect the Region of Convergence:

| Property | Effect on ROC |
|----------|---------------|
| Linearity | Intersection of ROCs (at minimum) |
| Time shift | ROC unchanged |
| Frequency shift by a | ROC shifts right by Re(a) |
| Differentiation | ROC same or larger |
| Integration | May lose Re(s)>0 if F(0)≠0 |

## Transform Table with ROC

| $f(t)$ | $F(s)$ | ROC |
|--------|--------|-----|
| $\delta(t)$ | 1 | All s |
| $u(t)$ | $1/s$ | Re(s) > 0 |
| $e^{-at}u(t)$ | $1/(s+a)$ | Re(s) > -Re(a) |
| $tu(t)$ | $1/s^2$ | Re(s) > 0 |
| $te^{-at}u(t)$ | $1/(s+a)^2$ | Re(s) > -Re(a) |
| $\sin(\omega t)u(t)$ | $\omega/(s^2+\omega^2)$ | Re(s) > 0 |
| $\cos(\omega t)u(t)$ | $s/(s^2+\omega^2)$ | Re(s) > 0 |
