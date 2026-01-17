# Exam Preparation: Power and Passivity

> Question patterns for power calculations and passive/active determination.

---

## Common Question Types

### Type 1: Power Calculation
**Given:** $v(t)$ and $i(t)$, find $p(t)$  
**Strategy:** $p = vi$, then simplify using trig identities if needed

**Watch for:** Sign of power (positive = absorbed, negative = delivered)

### Type 2: Passive vs Active Classification
**Given:** v-i characteristic (graph or equation)  
**Strategy:** Check if curve stays in Q1 and Q3

**Lecture emphasis (Page 4):** Use quadrant test, not just equation!

### Type 3: Energy Calculation
**Given:** $p(t)$ from $t_1$ to $t_2$  
**Strategy:** $W = \int_{t_1}^{t_2} p(t) \, dt$

---

## Solution Strategies

### Quadrant Test Shortcut
**Quick check on graph:**
1. Does curve ever enter Q2 (v<0, i>0)? → Active
2. Does curve ever enter Q4 (v>0, i<0)? → Active
3. Only in Q1, Q3, and axes? → Passive

### Power for Sinusoidal Signals
If $v = V_m \sin \omega t$ and $i = I_m \sin \omega t$:

$$p = V_m I_m \sin^2 \omega t = \frac{V_m I_m}{2}(1 - \cos 2\omega t)$$

**Average power:** $P_{avg} = V_m I_m / 2$

### Negative Resistance Detection
If characteristic has **negative slope** in v-i plane → negative R → active

**Example:** $v = -5i$ has slope -5 → enters Q2 and Q4 → active

---

## Time Management

**Power/passivity questions: 3-5 minutes each**

- Simple power calculation: 2-3 min
- Quadrant classification: 1-2 min
- Energy integral: 3-5 min

---

## Common Errors

1. **Forgetting sign convention:** Check current direction vs voltage polarity
2. **Confusing $p(t)$ with $P_{avg}$:** Instantaneous vs average power
3. **Missing axes in quadrant test:** Origin (0,0) and axes are allowed for passive
4. **Wrong integral limits:** Energy from $-\infty$ to $t$, not $0$ to $t$

---

## Formula Summary

**Memorize:**
- $p(t) = v(t) i(t)$
- $p = Ri^2 = Gv^2$ (for linear R)
- $W = \int p \, dt$
- Passive: $p(t) \geq 0$ for all $t$

---

## Practice Problem Pattern

**Expected question:** "A resistor has $v = 10\sin t$ (V) and $i = -2\sin t$ (A). Determine:  
(a) $p(t)$  
(b) Is it passive or active?  
(c) Energy from $t=0$ to $t=\pi$"

**Solution:**
(a) $p = vi = 10\sin t \cdot (-2\sin t) = -20\sin^2 t$ W

(b) $p(t) < 0$ for all $t \neq n\pi$ → **Active** (delivers power)

(c) $W = \int_0^{\pi} -20\sin^2 t \, dt = -20\pi$ J (negative = energy delivered)
