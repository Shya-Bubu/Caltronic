# Mathematical Foundations: Nonlinear Resistor Properties

> Taylor series expansion and harmonic generation from nonlinearity.

---

## Nonlinear Resistor Definition

A resistor is **nonlinear** if its v-i relationship cannot be written as $v = Ri$ for a constant $R$.

**General form:**
$$\mathcal{R} = \{(v, i): f(v, i) = 0\}$$

where $f$ is a **nonlinear function**.

---

## Taylor Series Expansion

For a voltage-controlled nonlinear resistor $i = g(v)$, expand around operating point $V_Q$:

$$i = g(V_Q) + g'(V_Q)(v - V_Q) + \frac{g''(V_Q)}{2!}(v - V_Q)^2 + \frac{g'''(V_Q)}{3!}(v - V_Q)^3 + \cdots$$

Let $v(t) = V_Q + V_m \sin(\omega t)$:

$$i(t) = g(V_Q) + g'(V_Q) V_m \sin(\omega t) + \frac{g''(V_Q)}{2} V_m^2 \sin^2(\omega t) + \frac{g'''(V_Q)}{6} V_m^3 \sin^3(\omega t) + \cdots$$

---

## Harmonic Generation: Mathematical Derivation

### Second-Order Term

$$\sin^2(\omega t) = \frac{1 - \cos(2\omega t)}{2}$$

Contribution:
$$\frac{g''(V_Q)}{2} V_m^2 \cdot \frac{1 - \cos(2\omega t)}{2} = \frac{g'' V_m^2}{4} - \frac{g'' V_m^2}{4} \cos(2\omega t)$$

**Result:** DC term + second harmonic at $2\omega$

### Third-Order Term

$$\sin^3(\omega t) = \frac{3\sin(\omega t) - \sin(3\omega t)}{4}$$

Contribution:
$$\frac{g'''(V_Q)}{6} V_m^3 \cdot \frac{3\sin(\omega t) - \sin(3\omega t)}{4}$$

**Result:** Fundamental ($\omega$) + third harmonic ($3\omega$)

### General Result (Lecture Page 7)

$$i(t) = I_0 + \sum_{k=1}^{\infty} I_k \sin(k\omega t + \varphi_k)$$

Where:
- $I_0$ = DC component (from even-order terms)
- $I_k$ = kth harmonic amplitude
- $\varphi_k$ = phase of kth harmonic

---

## Time-Varying Resistor: Frequency Mixing

From lecture Page 8, consider:
$$i(t) = G(t) \cdot v(t)$$

where $G(t) = G_a + G_b \cos(\omega t)$ and $v(t) = V_m \cos(\omega_1 t)$.

**Product:**
$$i(t) = (G_a + G_b \cos \omega t) V_m \cos \omega_1 t$$
$$= G_a V_m \cos \omega_1 t + G_b V_m \cos \omega t \cos \omega_1 t$$

Using product-to-sum formula:
$$\cos A \cos B = \frac{1}{2}[\cos(A - B) + \cos(A + B)]$$

$$i(t) = G_a V_m \cos \omega_1 t + \frac{G_b V_m}{2}[\cos((\omega - \omega_1)t) + \cos((\omega + \omega_1)t)]$$

**Output frequencies:**
1. $\omega_1$ (original signal)
2. $\omega - \omega_1$ (lower sideband)
3. $\omega + \omega_1$ (upper sideband)

This is **amplitude modulation** (AM).

---

## Bilateral Property: Mathematical Condition

**Definition:** A resistor is bilateral if:
$$f(v, i) = f(-v, -i) \quad \forall (v, i)$$

### Consequences for Harmonics

**Theorem:** A bilateral voltage-controlled resistor produces **only odd harmonics**.

**Proof sketch:** If $i = g(v)$ and bilateral, then:
$$g(-v) = -g(v)$$

This means $g$ is an **odd function**.

Taylor expansion of an odd function contains only odd powers:
$$g(v) = a_1 v + a_3 v^3 + a_5 v^5 + \cdots$$

When $v = V_m \sin \omega t$:
- $v^1$ → fundamental ($\omega$)
- $v^3$ → 3rd harmonic ($3\omega$)
- $v^5$ → 5th harmonic ($5\omega$)

**No even harmonics!** ∎

---

## Summary: Mathematical Rigor

**Taylor expansion:**
- Nonlinear $i = g(v)$ expanded as power series
- Each term produces harmonics

**Harmonic frequencies:**
- 2nd order → DC + $2\omega$
- 3rd order → $\omega$ + $3\omega$
- General: $k$th order → harmonics at $n\omega$ for $n = 0, 1, ..., k$

**Time-varying:**
- $G(t) = G_a + G_b \cos \omega t$
- Creates sum/difference: $\omega \pm \omega_1$

**Bilateral:**
- $f(v, i) = f(-v, -i)$
- Only odd harmonics (1st, 3rd, 5th, ...)
