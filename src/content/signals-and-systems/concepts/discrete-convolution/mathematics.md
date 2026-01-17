# Mathematical Properties of Discrete Convolution

## Definition

$$y[n] = x[n] * h[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot h[n-k]$$

## Fundamental Properties

### Commutativity
$$x[n] * h[n] = h[n] * x[n]$$

**Proof:** Let m = n - k, then k = n - m, dk = -dm
$$\sum_k x[k]h[n-k] = \sum_m h[m]x[n-m]$$

### Associativity
$$(x * h_1) * h_2 = x * (h_1 * h_2)$$

**Implication:** Cascaded systems can be combined into single impulse response.

### Distributivity
$$x * (h_1 + h_2) = x * h_1 + x * h_2$$

**Implication:** Parallel systems' responses add.

## Output Length

For finite signals with lengths N₁ and N₂:
$$\text{length}(y) = N_1 + N_2 - 1$$

## Z-Transform Relationship

$$Y(z) = X(z) \cdot H(z)$$

Convolution in time domain = multiplication in z-domain.

## Parseval's Relation

$$\sum_n |y[n]|^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |X(e^{j\omega})|^2 |H(e^{j\omega})|^2 d\omega$$
