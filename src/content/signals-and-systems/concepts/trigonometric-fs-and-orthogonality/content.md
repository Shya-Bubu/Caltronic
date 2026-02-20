## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- EFS: $x(t) = \sum_k X_k\,e^{jk\omega_0 t}$
- Euler's formula: $e^{j\theta} = \cos\theta + j\sin\theta$
- Conjugate symmetry for real signals: $X_{-k} = X_k^*$
- Linear algebra inner product and orthogonality

</details>

---

## 🎯 Why the Trigonometric Form?

The exponential Fourier series uses complex exponentials $e^{jk\omega_0 t}$ — mathematically elegant but hard to visualise. The **trigonometric FS** rewrites the series using **real-valued cosines and sines**, connecting it to the familiar harmonic analysis you learned in A-levels.

The professor notes this is done "for completeness" and to help you feel grounded. The EFS is the real workhorse; the trigonometric form is a bridge to your prior knowledge.

---

## 📖 Deriving the Trigonometric FS

### Starting Point

Take the EFS, separate $k = 0$, and pair up $+k$ and $-k$ terms:

$$x(t) = X_0 + \sum_{k=1}^{\infty} \left[ X_k\,e^{jk\omega_0 t} + X_{-k}\,e^{-jk\omega_0 t} \right]$$

### Expanding Using Euler's Formula

$$X_k\,e^{jk\omega_0 t} = X_k(\cos k\omega_0 t + j\sin k\omega_0 t)$$
$$X_{-k}\,e^{-jk\omega_0 t} = X_{-k}(\cos k\omega_0 t - j\sin k\omega_0 t)$$

### Combining the Pair

$$X_k\,e^{jk\omega_0 t} + X_{-k}\,e^{-jk\omega_0 t} = (X_k + X_{-k})\cos k\omega_0 t + j(X_k - X_{-k})\sin k\omega_0 t$$

### Define the Trigonometric Coefficients

$$a_k = X_k + X_{-k}, \qquad b_k = j(X_k - X_{-k})$$

So we get the **trigonometric Fourier series**:

$$\boxed{x(t) = a_0 + \sum_{k=1}^{\infty} \left[ a_k\cos(k\omega_0 t) + b_k\sin(k\omega_0 t) \right]}$$

where $a_0 = X_0$.

### Finding $a_k$ and $b_k$ Directly

Using the EFS analysis equation:

$$a_k = \frac{2}{T_0}\int_{T_0} x(t)\cos(k\omega_0 t)\,dt$$

$$b_k = \frac{2}{T_0}\int_{T_0} x(t)\sin(k\omega_0 t)\,dt$$

Note the **factor of 2** (compared to $1/T_0$ in the EFS).

### Key Relationships

| Trigonometric | Exponential |
|:---:|:---:|
| $a_0$ | $X_0$ |
| $a_k$ | $X_k + X_{-k} = 2\,\text{Re}(X_k)$ |
| $b_k$ | $j(X_k - X_{-k}) = -2\,\text{Im}(X_k)$ |

For **real signals**: $X_{-k} = X_k^*$, so $a_k = 2\,\text{Re}(X_k)$ and $b_k = -2\,\text{Im}(X_k)$.

---

## 📖 Orthogonality of FS Basis Functions

### What Is Orthogonality?

Two functions are **orthogonal** if their inner product is zero — just like perpendicular vectors in linear algebra.

### Defining the Inner Product

For basis functions $\phi_k(t) = e^{jk\omega_0 t}$, the inner product is:

$$\langle \phi_k, \phi_m \rangle = \frac{1}{T_0}\int_{T_0} \phi_k(t)\,\phi_m^*(t)\,dt$$

### Evaluating

$$\frac{1}{T_0}\int_{T_0} e^{jk\omega_0 t}\,e^{-jm\omega_0 t}\,dt = \frac{1}{T_0}\int_{T_0} e^{j(k-m)\omega_0 t}\,dt$$

**Case 1: $k \neq m$**

The integrand $e^{j(k-m)\omega_0 t}$ completes an integer number of full cycles over $T_0$, so the integral is **zero**.

**Case 2: $k = m$**

The integrand is $e^{0} = 1$, so the integral equals $T_0/T_0 = 1$.

### Result: The Kronecker Delta

$$\langle \phi_k, \phi_m \rangle = \delta_{km} = \begin{cases} 1 & k = m \\ 0 & k \neq m \end{cases}$$

This means the FS basis functions $\{e^{jk\omega_0 t}\}$ form an **orthonormal set**.

### Why This Matters

Orthogonality is **why the FS works**. When you compute $X_k$ using the analysis equation, you're projecting $x(t)$ onto the $k$-th basis function. Because the basis functions are orthogonal, each projection gives you exactly one coefficient — no cross-talk between harmonics.

This is exactly analogous to decomposing a vector into components along orthogonal axes (like $\hat{x}$, $\hat{y}$, $\hat{z}$).

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting the factor of 2 in $a_k$ and $b_k$ | The trig FS formulas have $2/T_0$, not $1/T_0$ |
| Confusing $a_k$ with $X_k$ | $a_k = X_k + X_{-k}$ (sum), not just $X_k$ |
| Thinking orthogonality only applies to vectors | It applies to functions too — the inner product is an integral |
| Writing the trig FS sum from $-\infty$ to $\infty$ | The trig FS sums from $k = 1$ to $\infty$ only |

---

## 📝 Summary

- **Trigonometric FS**: $x(t) = a_0 + \sum_k (a_k\cos k\omega_0 t + b_k\sin k\omega_0 t)$ — familiar trig form
- $a_k = 2\text{Re}(X_k)$, $b_k = -2\text{Im}(X_k)$ for real signals
- **Orthogonality**: $\langle e^{jk\omega_0 t}, e^{jm\omega_0 t} \rangle = \delta_{km}$ — basis functions don't interfere
- Orthogonality is why each $X_k$ can be found independently via the analysis equation
- The EFS is preferred for computation; the trig FS is useful for intuition
