## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- Periodic signals are power signals (infinite energy, finite power)
- EFS: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$ and $X_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt$
- Orthogonality of FS basis functions (Kronecker delta result)
- Complex conjugate: $|x|^2 = x \cdot x^*$

</details>

---

## 🎯 The Core Question

How do you compute the **average power** of a periodic signal? You can do it in the time domain (integrate $|x(t)|^2$ over one period). But can you do it in the **frequency domain** using the FS coefficients?

**Parseval's theorem answers this: Yes.** The total average power equals the sum of the squared magnitudes of all FS coefficients.

---

## 📖 Average Power of a Periodic Signal

### Time-Domain Definition

$$P_{avg} = \frac{1}{T_0}\int_{T_0} |x(t)|^2\,dt$$

For complex-valued signals, $|x(t)|^2 = x(t) \cdot x^*(t)$

This is the average power over one period — the "DC power equivalent" of the signal.

---

## 📖 Parseval's Theorem

### Statement

$$\boxed{P_{avg} = \frac{1}{T_0}\int_{T_0} |x(t)|^2\,dt = \sum_{k=-\infty}^{\infty} |X_k|^2}$$

**Total average power = sum of powers in all harmonics.**

### Derivation

Start with:

$$\frac{1}{T_0}\int_{T_0} |x(t)|^2\,dt = \frac{1}{T_0}\int_{T_0} x(t)\,x^*(t)\,dt$$

Substitute the FS for $x(t)$:

$$= \frac{1}{T_0}\int_{T_0} \left(\sum_k X_k\,e^{jk\omega_0 t}\right) x^*(t)\,dt$$

$$= \sum_k X_k \underbrace{\left(\frac{1}{T_0}\int_{T_0} x^*(t)\,e^{jk\omega_0 t}\,dt\right)}_{= X_k^*}$$

The term in parentheses is the **conjugate** of the analysis equation, which equals $X_k^*$:

$$= \sum_k X_k \cdot X_k^* = \sum_k |X_k|^2$$

### The Key Insight

Each term $|X_k|^2$ represents the **power contribution** of the $k$-th harmonic. Parseval's theorem says you can compute total power by simply adding up all harmonic powers — no time-domain integration needed!

---

## 📖 Power Spectrum

The set of values $\{|X_k|^2\}$ for all $k$ is called the **power spectrum** (or power spectral density in discrete form):

| Component | Power |
|:---:|:---:|
| DC ($k = 0$) | $|X_0|^2$ |
| Fundamental ($k = \pm 1$) | $|X_1|^2 + |X_{-1}|^2 = 2|X_1|^2$ |
| 2nd harmonic ($k = \pm 2$) | $|X_2|^2 + |X_{-2}|^2 = 2|X_2|^2$ |
| ... | ... |

For real signals, $|X_{-k}| = |X_k|$, so the power in the $k$-th harmonic pair is $2|X_k|^2$.

---

## 💡 Practical Applications

### Application 1: Bandwidth Estimation

If you truncate the FS to $N$ terms, the power captured is:

$$P_N = \sum_{k=-N}^{N} |X_k|^2$$

Compare $P_N / P_{avg}$ to decide if $N$ terms are "enough". For example, if $P_{10}/P_{avg} = 0.99$, then 10 harmonics capture 99% of the signal power.

### Application 2: System Power Transfer

If you know $H(jk\omega_0)$ and $X_k$, then $Y_k = H(jk\omega_0)X_k$, and the output power is:

$$P_{out} = \sum_k |Y_k|^2 = \sum_k |H(jk\omega_0)|^2 |X_k|^2$$

---

## 📖 Example: Power of a Square Pulse Train

For a square pulse with duty cycle $d = 2T_1/T_0$:

$$X_k = \frac{\sin(k\omega_0 T_1)}{k\pi}$$

Time-domain power: $P_{avg} = d$ (since $|x(t)|^2 = 1$ over fraction $d$ of the period).

Frequency-domain check (Parseval's):

$$\sum_k |X_k|^2 = X_0^2 + 2\sum_{k=1}^{\infty} \left|\frac{\sin(k\omega_0 T_1)}{k\pi}\right|^2 = d \quad \checkmark$$

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the $k = 0$ term | Include $|X_0|^2$ — the DC power is part of the total |
| Using $X_k$ instead of $|X_k|^2$ | Power is the squared magnitude, not the coefficient itself |
| Summing only positive $k$ | Sum from $-\infty$ to $+\infty$, or sum $|X_0|^2 + 2\sum_{k=1}^{\infty}|X_k|^2$ for real signals |
| Confusing power and energy | Periodic signals have finite **power** but infinite **energy** |

---

## 📝 Summary

- **Average power**: $P_{avg} = \frac{1}{T_0}\int|x(t)|^2 dt = \sum_k |X_k|^2$
- Parseval's theorem: **total power = sum of harmonic powers**
- $|X_k|^2$ is the power contribution of the $k$-th harmonic
- Enables frequency-domain power calculations without time integration
- Essential for bandwidth estimation, system analysis, and signal comparison
