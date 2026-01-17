# Mathematics of Continuous Convolution

## Definition

$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau) h(t-\tau) d\tau$$

## Derivation from LTI Properties

Starting from impulse decomposition:
$$x(t) = \int_{-\infty}^{\infty} x(\tau)\delta(t-\tau)d\tau$$

Applying time invariance: $\delta(t-\tau) \rightarrow h(t-\tau)$

Applying linearity:
$$y(t) = \int_{-\infty}^{\infty} x(\tau) h(t-\tau) d\tau$$

## Properties

### Commutativity
$$x * h = h * x$$

**Proof:** Substitute $\sigma = t - \tau$

### Associativity
$$(x * h_1) * h_2 = x * (h_1 * h_2)$$

### Differentiation
$$\frac{d}{dt}(x * h) = \frac{dx}{dt} * h = x * \frac{dh}{dt}$$

### Integration
$$\int(x * h)dt = (\int x \, dt) * h = x * (\int h \, dt)$$

## Transform Domain

$$\mathcal{L}\{x * h\} = X(s) \cdot H(s)$$

This is the **Convolution Theorem** — the reason transforms are so useful!
