# Exam Preparation: DC Operating Points

> Question patterns for load line analysis and operating point determination.

---

## Common Question Types

### Type 1: Load Line Construction
**Given:** $V_{supply}$, $R_{load}$  
**Strategy:** 
- v-intercept: $(V_{supply}, 0)$
- i-intercept: $(0, V_{supply}/R_{load})$
- Draw straight line connecting them

**Lecture key (Page 20):** $i = (V_s - v)/R_L$

### Type 2: Graphical Q-point Finding
**Given:** Device curve + load line  
**Strategy:** Mark intersection(s), read $(V_Q, I_Q)$  

**Watch for:** Multiple intersections → multiple operating points!

### Type 3: Analytical Q-point Solution
**Given:** Device equation + circuit equation  
**Strategy:** Set equal, solve algebraically (or use Newton-Raphson if nonlinear)

---

## Solution Strategies

### Graphical Method (Step-by-Step)

**Step 1:** Plot device characteristic on v-i or i-v plane  
**Step 2:** Plot load line using intercepts  
**Step 3:** Mark intersection point(s)  
**Step 4:** Read coordinates → that's your Q-point  
**Step 5:** Verify: substitute $(V_Q, I_Q)$ into both equations

**Exam pro tip:** Use a ruler for load line! Sloppy graphs → wrong Q-point

### Analytical Method

**Setup equations:**
- Device: $i = f(v)$ or $v = g(i)$
- Load line: $i = (E - v)/R$

**Substitute and solve:**
$$f(v) = \frac{E - v}{R}$$

Rearrange to standard form, then solve (quadratic formula, iterative, etc.)

### Multiple Operating Points

From lecture Page 20:
- **Unique:** Typical for monotonic device curves
- **Multiple:** N-shaped (tunnel diode) or S-shaped curves
- **None:** Load line doesn't intersect characteristic

---

## Time Management

**DC operating point questions: 6-12 minutes each**

- Load line plot: 2-3 min
- Graphical Q-point: 2-3 min
- Analytical solution: 5-8 min
- Stability check (multiple Q): +2-3 min

---

## Common Errors

1. **Intercept mistakes:** v-intercept is NOT $V/R$, it's just $V$ (where $i=0$)!
2. **Wrong plane:** Check if question uses i-v or v-i plane
3. **Sign errors:** KVL: $V_s = v_R + v_{device}$ → $i = (V_s - v)/R$
4. **Multiple Q-points:** Don't stop at first intersection if curve is non-monotonic
5. **Units:** Always convert mA ↔ A, kΩ ↔ Ω before calculating

---

## Formula Summary

**Memorize:**
- Load line: $i = \frac{V_s - v}{R}$ (slope $-1/R$)
- Intercepts: $(V_s, 0)$ and $(0, V_s/R)$
- Q-point: Intersection of device curve and load line
- Stability: Middle Q of 3 solutions is usually unstable

---

## Practice Problem Pattern

**Expected question:** "A diode with $i = 10^{-14}(e^{v/0.026} - 1)$ A is in series with $V_s = 5V$ and $R = 1k\Omega$. Find the operating point."

**Solution (Graphical):**
1. Load line: intercepts $(5V, 0)$ and $(0, 5mA)$
2. Plot diode exponential curve
3. Intersection ≈ $(0.7V, 4.3mA)$ (visual approximation)

**Solution (Analytical approximation):**
Assume forward bias → $i \approx I_s e^{v/V_T}$

From load line: $i = (5 - v)/1000$

$$10^{-14} e^{v/0.026} = \frac{5 - v}{1000}$$

**Newton-Raphson from $v_0 = 0.6V$:**
- Iteration 1: $v_1 \approx 0.68V$
- Iteration 2: $v_2 \approx 0.695V$
- **Converged:** $V_Q \approx 0.7V$, $I_Q = (5-0.7)/1000 = 4.3mA$ ✓
