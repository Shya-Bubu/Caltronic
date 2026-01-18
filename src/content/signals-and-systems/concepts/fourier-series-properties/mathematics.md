# Mathematics of Fourier Series Properties

## Linearity

**Statement:** If $x(t) \leftrightarrow X_k$ and $y(t) \leftrightarrow Y_k$ with the same $\omega_0$, then:
$$\alpha x(t) + \beta y(t) \leftrightarrow \alpha X_k + \beta Y_k$$

**Proof:**
$$Z_k = \frac{1}{T_0}\int_{T_0} [\alpha x(t) + \beta y(t)] e^{-jk\omega_0 t} dt$$
$$= \alpha \frac{1}{T_0}\int_{T_0} x(t) e^{-jk\omega_0 t} dt + \beta \frac{1}{T_0}\int_{T_0} y(t) e^{-jk\omega_0 t} dt$$
$$= \alpha X_k + \beta Y_k$$

## Time Shifting

**Statement:** If $x(t) \leftrightarrow X_k$, then:
$$x(t - t_0) \leftrightarrow X_k e^{-jk\omega_0 t_0}$$

**Proof:**
Start with the synthesis equation:
$$x(t) = \sum_k X_k e^{jk\omega_0 t}$$

Replace t with (t - t₀):
$$x(t - t_0) = \sum_k X_k e^{jk\omega_0 (t - t_0)} = \sum_k X_k e^{-jk\omega_0 t_0} \cdot e^{jk\omega_0 t}$$

The new coefficient is $Y_k = X_k e^{-jk\omega_0 t_0}$.

**Magnitude and Phase:**
$$|Y_k| = |X_k| \cdot |e^{-jk\omega_0 t_0}| = |X_k| \cdot 1 = |X_k|$$
$$\angle Y_k = \angle X_k - k\omega_0 t_0$$

## Time Reversal

**Statement:** If $x(t) \leftrightarrow X_k$, then:
$$x(-t) \leftrightarrow X_{-k}$$

**Proof:**
Start with:
$$x(t) = \sum_k X_k e^{jk\omega_0 t}$$

Replace t with -t:
$$x(-t) = \sum_k X_k e^{-jk\omega_0 t}$$

Substitute m = -k:
$$= \sum_m X_{-m} e^{jm\omega_0 t}$$

The coefficient of $e^{jm\omega_0 t}$ is $X_{-m}$, so the kth coefficient of x(-t) is $X_{-k}$.

## Time Scaling

**Statement:** If $x(t) \leftrightarrow X_k$ with fundamental $\omega_0$, then:
$$x(\alpha t) \leftrightarrow X_k \text{ with fundamental } \alpha\omega_0$$

**Proof:**
$$x(t) = \sum_k X_k e^{jk\omega_0 t}$$

Replace t with αt:
$$x(\alpha t) = \sum_k X_k e^{jk\omega_0 \alpha t} = \sum_k X_k e^{jk(\alpha\omega_0) t}$$

The coefficients Xk are unchanged, but the fundamental frequency becomes $\omega_0' = \alpha\omega_0$.

## Conjugate Symmetry for Real Signals

**Statement:** If x(t) is real, then:
$$X_{-k} = X_k^*$$

**Proof:**
For real x(t), $x(t) = x^*(t)$. Take conjugate of synthesis equation:
$$x^*(t) = \sum_k X_k^* e^{-jk\omega_0 t}$$

Substitute m = -k:
$$= \sum_m X_{-m}^* e^{jm\omega_0 t}$$

But also $x^*(t) = x(t) = \sum_m X_m e^{jm\omega_0 t}$.

Comparing coefficients: $X_m = X_{-m}^*$, or equivalently $X_{-k} = X_k^*$.

**Consequences:**
- $|X_{-k}| = |X_k|$ (even symmetry in magnitude)
- $\angle X_{-k} = -\angle X_k$ (odd symmetry in phase)
- $\text{Re}(X_k) = \text{Re}(X_{-k})$ (real part is even)
- $\text{Im}(X_k) = -\text{Im}(X_{-k})$ (imaginary part is odd)
