## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- The EFS analysis and synthesis equations
- Complex conjugate: $(a + jb)^* = a - jb$
- Even function: $x(t) = x(-t)$; Odd function: $x(t) = -x(-t)$
- Time reversal property: $x(-t) \xleftrightarrow{} X_{-k}$

</details>

---

## 🎯 Why Symmetry Matters

Not every periodic signal has arbitrary complex FS coefficients. Signals with special symmetries — **real**, **even**, **odd**, or combinations thereof — impose powerful constraints on $X_k$ that vastly reduce the work needed to find the spectrum.

In the exam, recognising symmetry lets you:
1. **Skip half the computation** (only compute $k \geq 0$, then fill in $k < 0$ by symmetry)
2. **Predict the form** of $X_k$ (real? imaginary? does it have certain zeros?)
3. **Verify your answers** (if your computed $X_k$ violates symmetry, something is wrong)

---

## 📖 Conjugate Symmetry (Real Signals)

### The rule

If $x(t)$ is **real**, then:

$$X_{-k} = X_k^*$$

This is called **conjugate symmetry** (or Hermitian symmetry).

### What this implies

| Quantity | Property |
|----------|----------|
| Magnitude: $|X_{-k}|$ | $= |X_k|$ → **even** function of $k$ |
| Phase: $\angle X_{-k}$ | $= -\angle X_k$ → **odd** function of $k$ |
| Real part: $\text{Re}(X_{-k})$ | $= \text{Re}(X_k)$ → even |
| Imaginary part: $\text{Im}(X_{-k})$ | $= -\text{Im}(X_k)$ → odd |

### Why?

For real $x(t)$, taking the conjugate of the analysis equation:

$$X_k^* = \left(\frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,dt\right)^* = \frac{1}{T_0}\int_{T_0} x(t)\,e^{+jk\omega_0 t}\,dt = X_{-k}$$

The last step uses the fact that $x(t) = x(t)^*$ for real signals.

### Practical significance

You only need to compute $X_k$ for $k \geq 0$: negative-$k$ values are automatically determined by $X_{-k} = X_k^*$.

---

## 📖 Real and Even Signals

If $x(t)$ is both **real** and **even** ($x(t) = x(-t)$), then:

$$X_k \text{ is purely real and even: } X_k = X_{-k} \in \mathbb{R}$$

### Why?

Combining two facts:
1. Real signal: $X_{-k} = X_k^*$
2. Even signal: $x(-t) \to X_{-k}$, but $x(-t) = x(t)$ means $X_{-k} = X_k$

Together: $X_k^* = X_k$, which means $X_k$ is real (imaginary part is zero).

### Example
The centred square pulse train is real and even → its FS coefficients $\frac{\sin(k\omega_0 T_1)}{k\pi}$ are indeed all real.

---

## 📖 Real and Odd Signals

If $x(t)$ is both **real** and **odd** ($x(t) = -x(-t)$), then:

$$X_k \text{ is purely imaginary and odd: } X_k = -X_{-k}, \quad X_k \in j\mathbb{R}$$

### Why?

1. Real signal: $X_{-k} = X_k^*$
2. Odd signal: $x(-t) = -x(t) \to X_{-k} = -X_k$

Together: $X_k^* = -X_k$, which means $X_k = jb_k$ for some real $b_k$ (purely imaginary).

### Additional consequence

$X_0 = 0$ for odd signals (the average of an odd signal is always zero).

---

## 📐 Complete Symmetry Table

| Signal property | Constraint on $X_k$ |
|----------------|---------------------|
| Real | $X_{-k} = X_k^*$ (conjugate symmetric) |
| Real & Even | $X_k$ is real and even: $X_k = X_{-k} \in \mathbb{R}$ |
| Real & Odd | $X_k$ is purely imaginary and odd: $X_k = -X_{-k}$, $X_0 = 0$ |
| Purely Imaginary | $X_{-k} = -X_k^*$ |
| Even (general) | $X_k = X_{-k}$ (coefficients are even) |
| Odd (general) | $X_k = -X_{-k}$, $X_0 = 0$ |

---

## 💡 Using Symmetry as a Verification Tool

After computing $X_k$, always check:

1. **Is $x(t)$ real?** → Check that $X_{-k} = X_k^*$. If not, you made an error.
2. **Is $x(t)$ even?** → $X_k$ should be real. If you get imaginary parts, check your work.
3. **Is $x(t)$ odd?** → $X_k$ should be purely imaginary with $X_0 = 0$.
4. **Mixed signal?** → Decompose: any real signal can be split into even part $x_e(t) = \frac{x(t)+x(-t)}{2}$ and odd part $x_o(t) = \frac{x(t)-x(-t)}{2}$.

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Assuming all real signals have real $X_k$ | Real signals have $X_{-k} = X_k^*$, but $X_k$ can be complex (real+imaginary). Only real *and* even signals have purely real $X_k$ |
| Forgetting $X_0 = 0$ for odd signals | The average of an odd function is always zero |
| Confusing "even $X_k$" with "real $X_k$" | Even means $X_k = X_{-k}$; real means $\text{Im}(X_k) = 0$. For real, even signals, both hold simultaneously |
| Not using symmetry to simplify integration | For even $x(t)$, compute $X_k = \frac{2}{T_0}\int_0^{T_0/2} x(t)\cos(k\omega_0 t)\,dt$ (halve the work) |

---

## 📝 Summary

- **Real signals**: $X_{-k} = X_k^*$ → magnitude even, phase odd
- **Real + Even**: $X_k$ is real and even → no phase plot needed
- **Real + Odd**: $X_k$ is purely imaginary and odd, $X_0 = 0$
- Use symmetry to **halve your computation** and **verify your answers**
- Any real signal = even part + odd part, and their FS coefficients split accordingly
