## 📋 Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- EFS analysis and synthesis equations
- Differentiating $e^{jk\omega_0 t}$ with respect to $t$
- The four basic FS properties from Lesson 04 (linearity, shift, reversal, scaling)
- The concept of harmonics and their magnitudes

</details>

---

## 🎯 What Happens When You Differentiate or Integrate a Signal?

This is one of the most practically important FS properties. It tells you:
- **Differentiation** in time ↔ multiplication by $jk\omega_0$ in the FS domain
- **Integration** in time ↔ division by $jk\omega_0$ in the FS domain

The professor emphasises that understanding these is not about memorising formulas — it's about understanding what differentiation and integration *do* to a signal's frequency content.

---

## 📖 Differentiation Property

### Statement

If $x(t) \xleftrightarrow{} X_k$, then:

$$x'(t) = \frac{dx(t)}{dt} \xleftrightarrow{} jk\omega_0 X_k \quad (k \neq 0)$$

### Derivation

Start with the synthesis equation, separating out $X_0$:

$$x(t) = X_0 + \sum_{k \neq 0} X_k\,e^{jk\omega_0 t}$$

Differentiate both sides:

$$x'(t) = 0 + \sum_{k \neq 0} X_k \cdot jk\omega_0\,e^{jk\omega_0 t}$$

The $X_0$ term (DC component) disappears because it's a constant. The derivative of each basis function $e^{jk\omega_0 t}$ simply brings down the factor $jk\omega_0$.

So the FS coefficient of $x'(t)$ is:

$$X'_k = jk\omega_0 X_k \quad (k \neq 0)$$

### Physical Interpretation: Differentiation = Highpass

The multiplier $jk\omega_0$ has magnitude $|k|\omega_0$, which **grows with k**. This means:

| Harmonic $k$ | Original $|X_k|$ | After differentiation $|X'_k|$ = $|k\omega_0 X_k|$ |
|:---:|:---:|:---:|
| 1 | $|X_1|$ | $\omega_0|X_1|$ |
| 5 | $|X_5|$ | $5\omega_0|X_5|$ |
| 100 | $|X_{100}|$ | $100\omega_0|X_{100}|$ |

Higher harmonics get amplified more. Differentiation is a **highpass process** — it *sharpens* the signal by boosting high-frequency content.

Think about it physically: a sharp edge (like a square pulse) has a large derivative at the transitions. Sharp edges require high-frequency components. So differentiation, which emphasises transitions, must amplify high frequencies.

---

## 📖 Integration Property

### Statement

If $x(t) \xleftrightarrow{} X_k$, then:

$$\int x(t)\,dt \xleftrightarrow{} \frac{X_k}{jk\omega_0} \quad (k \neq 0)$$

### Physical Interpretation: Integration = Lowpass

The divisor $jk\omega_0$ has magnitude $|k|\omega_0$, which **grows with k**. Dividing by a growing number **attenuates** high harmonics:

$$\left|\frac{X_k}{jk\omega_0}\right| = \frac{|X_k|}{|k|\omega_0}$$

Integration is a **lowpass process** — it *smooths* the signal by reducing high-frequency content.

Think about it physically: integrating a square pulse gives a triangular wave. The sharp edges are smoothed into ramps. The high-frequency content needed for those sharp edges has been attenuated.

---

## 💡 Sharpening vs Smoothing Summary

| Operation | FS Effect | Frequency Behaviour | Signal Effect |
|-----------|-----------|---------------------|---------------|
| **Differentiation** | Multiply by $jk\omega_0$ | Highpass (amplify high-$k$) | **Sharpening** — edges become sharper |
| **Integration** | Divide by $jk\omega_0$ | Lowpass (attenuate high-$k$) | **Smoothing** — edges become rounded |

---

## 📖 Important Note: $k = 0$ Case

Both properties are **only valid for $k \neq 0$**. The DC component needs separate treatment:

- **Differentiation**: $X'_0 = 0$ always (derivative of a constant is zero — the average of the derivative of a periodic signal is always zero)
- **Integration**: $X_0$ of the integral relates to the integration constant; handle separately

---

## 📖 Practical Application: Using Differentiation to Avoid Hard Integrals

This is a *key exam technique*. The professor demonstrates it with the triangular pulse train:

**Problem**: Find FS of a triangular wave.

**Naïve approach**: Substitute into the analysis integral → integration by parts → tedious.

**Smart approach**:

1. Differentiate the triangular wave → get a much simpler signal (constant segments + delta functions at jumps)
2. Find $X'_k$ of this simpler signal (using known pairs like the impulse train)
3. Recover $X_k = X'_k / (jk\omega_0)$

This is always easier: **differentiation + division** beats **integration by parts**.

> The professor notes: "Always go to the simpler method. Differentiation and division is always easier than integration."

---

## ⚠️ Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Applying the property at $k = 0$ | Only valid for $k \neq 0$; find $X_0$ separately |
| Forgetting to include delta functions when differentiating discontinuous signals | Finite jumps in $x(t)$ produce delta functions in $x'(t)$ |
| Confusing which is highpass/lowpass | Differentiation = multiply by $k$ → amplify high-$k$ → **highpass/sharpening** |
| Using integration by parts when differentiation property works | Always check if differentiating first gives a simpler signal |

---

## 📝 Summary

- $x'(t) \leftrightarrow jk\omega_0 X_k$ — differentiation = multiplication by $jk\omega_0$ (highpass, sharpening)
- $\int x(t)\,dt \leftrightarrow X_k/(jk\omega_0)$ — integration = division by $jk\omega_0$ (lowpass, smoothing)
- Both valid for $k \neq 0$ only
- **Key technique**: differentiate a complex signal to get a simpler one, find its FS, then divide by $jk\omega_0$
- This is arguably the most practically useful FS property for problem-solving
