## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **EFS pair**: $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$ and $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$
- **Square pulse FS**: $X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$
- **Magnitude and phase spectra** of a periodic signal

</details>

---

## 🎯 Why Properties?

Computing FS coefficients from scratch (the analysis integral) for every new signal is tedious. **Properties** are shortcuts: if you already know the FS of one signal, you can derive the FS of related signals *without re-evaluating the integral*.

The professor emphasises this strongly: properties turn the FS from a calculation tool into a **manipulation framework**. Learn these well — they save enormous time in exams and practice.

---

## 📖 Property 1: Linearity

**Statement:** If $x(t) \xleftrightarrow{} X_k$ and $y(t) \xleftrightarrow{} Y_k$ are periodic with the **same** $\omega_0$, then:

$$\alpha\,x(t) + \beta\,y(t) \xleftrightarrow{} \alpha\,X_k + \beta\,Y_k$$

### Why same $\omega_0$?

The FS coefficients are indexed by $k$, and the $k$-th coefficient corresponds to frequency $k\omega_0$. If $x(t)$ and $y(t)$ have different fundamental frequencies, their spectra sit on different grids — you can't add $X_k$ and $Y_k$ at the same $k$ because they represent different frequencies.

Think of it visually: if the X spectrum has spikes at $\omega_0, 2\omega_0, 3\omega_0, ...$ and the Y spectrum has spikes at $\omega_0', 2\omega_0', 3\omega_0', ...$, these won't align unless $\omega_0 = \omega_0'$.

### Usage
Given a signal that is a sum of simpler signals (all sharing $\omega_0$), compute each FS separately and add them.

---

## 📖 Property 2: Time Shifting

**Statement:** If $x(t) \xleftrightarrow{} X_k$, then:

$$x(t - t_0) \xleftrightarrow{} X_k\,e^{-jk\omega_0 t_0}$$

### What this means

Shifting a signal in time **does not change the magnitudes** $|X_k|$ — it only changes the **phases** $\angle X_k$.

Specifically:
- $|X_k'| = |X_k|$ (magnitude unchanged)
- $\angle X_k' = \angle X_k - k\omega_0 t_0$ (phase shifted linearly in $k$)

### Why?

In the synthesis equation, replacing $t$ with $t - t_0$:

$$x(t-t_0) = \sum_k X_k\,e^{jk\omega_0(t-t_0)} = \sum_k \underbrace{(X_k\,e^{-jk\omega_0 t_0})}_{X_k'}\,e^{jk\omega_0 t}$$

The factor $e^{-jk\omega_0 t_0}$ has magnitude 1, so it only rotates each coefficient in the complex plane.

### Physical intuition

A time shift doesn't change what frequencies are present or how strong they are — it only changes the *relative timing* of the components. Higher harmonics ($k$ large) experience a *larger* phase change because the same time shift represents more cycles at higher frequencies.

---

## 📖 Property 3: Time Reversal

**Statement:** If $x(t) \xleftrightarrow{} X_k$, then:

$$x(-t) \xleftrightarrow{} X_{-k}$$

### What this means

Reversing a signal in time **mirrors** its FS coefficients about $k = 0$.

If the magnitude spectrum was $|X_k|$ and the phase spectrum was $\angle X_k$, then:
- $|X_{-k}|$: the magnitude plot is mirrored (but for real signals it was already symmetric, so nothing changes)
- $\angle X_{-k}$: the phase plot is also mirrored

### Derivation

$$x(-t) = \sum_k X_k\,e^{jk\omega_0(-t)} = \sum_k X_k\,e^{-jk\omega_0 t}$$

Substituting $m = -k$:

$$= \sum_m X_{-m}\,e^{jm\omega_0 t}$$

So the FS coefficient of $x(-t)$ at index $m$ is $X_{-m}$.

---

## 📖 Property 4: Time Scaling

**Statement:** If $x(t)$ is periodic with period $T_0$ and FS coefficients $X_k$, then $x(\alpha t)$ (for $\alpha > 0$) is periodic with period $T_0/\alpha$ and fundamental frequency $\alpha\omega_0$, but the **FS coefficients remain the same**: $X_k$.

### What changes and what doesn't

| Aspect | $x(t)$ | $x(\alpha t)$ |
|--------|--------|---------------|
| Period | $T_0$ | $T_0/\alpha$ |
| Fundamental frequency | $\omega_0$ | $\alpha\omega_0$ |
| FS coefficients | $X_k$ | $X_k$ (same!) |

### Why?

$$x(\alpha t) = \sum_k X_k\,e^{jk\omega_0 (\alpha t)} = \sum_k X_k\,e^{jk(\alpha\omega_0)t}$$

The coefficients $X_k$ are unchanged — only the frequency axis is rescaled.

### Physical intuition

Speeding up a signal ($\alpha > 1$) compresses it in time, which stretches the frequency axis. But the *weights* on each harmonic remain the same — only the spacing between harmonics changes.

---

## 📐 Property Summary Table

| Property | Time Domain | FS Coefficients |
|----------|------------|-----------------|
| **Linearity** | $\alpha x(t) + \beta y(t)$ | $\alpha X_k + \beta Y_k$ (same $\omega_0$) |
| **Time Shift** | $x(t - t_0)$ | $X_k\,e^{-jk\omega_0 t_0}$ |
| **Time Reversal** | $x(-t)$ | $X_{-k}$ |
| **Time Scaling** | $x(\alpha t)$ | $X_k$ (period → $T_0/\alpha$) |

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Using linearity when $\omega_0$ values differ | Linearity requires the **same** fundamental frequency |
| Forgetting the sign: $e^{-jk\omega_0 t_0}$ vs $e^{+jk\omega_0 t_0}$ | Time shift uses $e^{-jk\omega_0 t_0}$ (minus sign) |
| Thinking time shift changes magnitudes | Only phase changes; $|X_k'| = |X_k|$ |
| Confusing time reversal $X_{-k}$ with $X_k^*$ | They are the same **only** for real signals. In general, $x(-t) \to X_{-k}$ |

---

## 📝 Summary

- **Linearity**: add/scale signals → add/scale their FS coefficients (same $\omega_0$ only)
- **Time shift**: delays only affect phase, not magnitude — $X_k' = X_k\,e^{-jk\omega_0 t_0}$
- **Time reversal**: mirrors coefficients — $x(-t) \to X_{-k}$
- **Time scaling**: compresses/stretches the period but keeps coefficients unchanged
- These properties are **exam shortcuts** — use them to derive FS of modified signals without re-integrating
