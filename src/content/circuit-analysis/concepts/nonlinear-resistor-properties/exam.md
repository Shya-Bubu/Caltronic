# Exam Preparation: Nonlinear Resistor Properties

> Question patterns for harmonic analysis and time-varying resistors.

---

## Common Question Types

### Type 1: Harmonic Identification
**Given:** Nonlinear $i = f(v)$ and input $v = V_m \sin \omega t$  
**Strategy:** Expand using power of sine formulas

**Key formulas to memorize:**
- $\sin^2 \theta = \frac{1 - \cos 2\theta}{2}$ → DC + 2nd harmonic
- $\sin^3 \theta = \frac{3\sin \theta - \sin 3\theta}{4}$ → 1st + 3rd harmonic

### Type 2: Bilateral Classification
**Given:** v-i characteristic  
**Strategy:** Check if $f(v, i) = f(-v, -i)$

**Lecture key (Page 7):** Bilateral → only odd harmonics

### Type 3: Frequency Mixing
**Given:** Time-varying $G(t) = G_a + G_b \cos \omega t$  
**Strategy:** Use product-to-sum: $\cos A \cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$

---

## Solution Strategies

### Taylor Series Shortcut

For $i = a_0 + a_1 v + a_2 v^2 + a_3 v^3 + \cdots$ with $v = V_m \sin \omega t$:

**DC component:** From even powers  
- $a_2 V_m^2 \sin^2 \rightarrow \frac{a_2 V_m^2}{2}$

**Fundamental ($\omega$):** From all odd powers  
- $a_1 V_m \sin \omega t$
- $\frac{3a_3 V_m^3}{4} \sin \omega t$

**Second harmonic ($2\omega$):** From even powers  
- $-\frac{a_2 V_m^2}{2} \cos 2\omega t$

### Bilateral Test (Quick)
If characteristic is **symmetric about origin** → bilateral → odd harmonics only

Example: $i = v^3$ is bilateral (check: $(-v)^3 = -v^3$)

---

## Time Management

**Nonlinear/harmonic questions: 5-8 minutes each**

- Harmonic calculation: 5-6 min
- Bilateral check: 1-2 min
- Time-varying mixing: 6-8 min

---

## Common Errors

1. **Forgetting trig identities:** Memorize $\sin^2$, $\sin^3$, $\cos^2$ formulas
2. **Missing DC term:**Always check for even-power contributions
3. **Wrong frequency labels:** 2nd harmonic is at $2\omega$, not $\omega/2$!
4. **Bilateral assumption:** Don't assume bilateral without checking!

---

## Formula Summary

**Memorize:**
- $\sin^2 x = (1 - \cos 2x)/2$
- $\sin^3 x = (3\sin x - \sin 3x)/4$
- $\cos A \cos B = \frac{1}{2}[\cos(A-B) +\cos(A+B)]$
- Bilateral: $f(-v, -i) = f(v, i)$ → odd harmonics only

---

## Practice Problem Pattern

**Expected question:** "A resistor has $i = 0.1v^2$ (A), input $v = 2\sin(1000t)$ V. Find:  
(a) Output current expression  
(b) Harmonic frequencies present"

**Solution:**
(a) $i = 0.1(2\sin 1000t)^2 = 0.4\sin^2(1000t)$

Using $\sin^2 x = \frac{1-\cos 2x}{2}$:

$i = 0.4 \cdot \frac{1 - \cos(2000t)}{2} = 0.2 - 0.2\cos(2000t)$ A

(b) **DC (0 Hz): 0.2 A**, **2nd harmonic (2000 rad/s = 318 Hz): 0.2 A amplitude**
