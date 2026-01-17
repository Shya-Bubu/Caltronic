# DC Operating Points

> **Narrative thread:** We've built up all the theory — passive/active, linear/nonlinear, series/parallel, PWL synthesis. Now the practical question: given a circuit, **where does it settle**? What are the actual voltage and current values?

---

## THE BIG IDEA

**The operating point is where the device characteristic meets the external circuit constraint.**

Graphically, it's the **intersection** of two curves:
1. **Device characteristic:** $f_device(v, i) = 0$ (e.g., diode equation)
2. **Load line:** The constraint imposed by the rest of the circuit (battery + resistor)

**Three possibilities:**
- **Unique solution:** One intersection → circuit has one stable state
- **Multiple solutions:** Multiple intersections → bistable/multistable circuit
- **No solution:** No intersection → circuit can't exist in steady state

**Why it matters in EEE:** Every transistor bias point, every LED current, every voltage regulator, every logic gate threshold — they're all DC operating points. Get this wrong and your circuit doesn't work.

---

## DC Analysis and Load Lines

From lecture Page 20:

**DC analysis:** Determining the solutions to a circuit with DC inputs.

**DC operating point:** The solution (v, i) determined by DC analysis.

### The Load Line

Consider a simple circuit: voltage source $E_b$ + series resistor $R_b$ + nonlinear element.

**KVL around the loop:**
$$E_b = v + R_b i$$

Rearranging:
$$i = \frac{E_b - v}{R_b}$$

This is the **load line** — a straight line on the i-v or v-i plane.

### Intercepts:
- **Voltage intercept** (i = 0): $v = E_b$
- **Current intercept** (v = 0): $i = E_b / R_b$

The slope is $-1/R_b$.

[[visual:v1]]

---

## Finding the Operating Point Graphically

From lecture Pages 20-22:

**Procedure:**
1. Draw the device characteristic on the v-i plane
2. Draw the load line from $(E_b, 0)$ to $(0, E_b/R_b)$
3. Find intersection(s)
4. Read $(V_Q, I_Q)$ from the graph

**This is the operating point Q.**

[[visual:v4]]

### Three Cases (Lecture Page 20):

**Case 1: Unique solution**
- One intersection
- Most common for passive linear elements + battery

**Case 2: Multiple solutions**
- Example: Tunnel diode (N-shaped curve) intersects load line 3 times
- Circuit is **bistable** — can settle at Q1 or Q3 (stable), but not Q2 (unstable)

[[visual:v9]]

**Case 3: No solution**
- Load line and characteristic don't intersect
- Circuit cannot reach steady state (oscillates or fails)

[[visual:v8]]

---

## Analytical Solution Methods

For simple cases, you can solve algebraically.

### Example from Lecture (Page 22):

**Device:** $i_a = 4v_a^2$  
**External:** $v_b = E_b - R_b i_b$ where $E_b = 2V$, $R_b = 0.25\Omega$

**Back-to-back connection:** $v_a = v_b = v$ and $i_a = -i_b = i$

Substitute:
$$i = 4v^2$$
$$i = -\frac{1}{R_b}v + \frac{1}{R_b}E_b$$

Setting equal:
$$4v^2 = -\frac{1}{0.25}v + \frac{2}{0.25}$$
$$v^2 + 0.25v - 0.5 = 0$$

**Solutions:** $v = 1V$ (i = 4A) and $v = -2V$ (i = 16A)

**Two operating points!**

[[visual:v2]]

But for most nonlinear circuits, analytical solutions don't exist → must use numerical methods.

---

## Newton-Raphson Method

From lecture Page 22:

When you can't solve analytically (e.g., $i = I_s(e^{v/V_T}-1)$ + load line), use **iterative numerical methods**.

### Newton-Raphson:
$$x_{n} = x_{n-1} - \frac{f(x_{n-1})}{f'(x_{n-1})}$$

**Geometric interpretation:** Draw tangent line at current guess, find where it crosses x-axis, that's the next guess.

**For circuits:** Set up $f(v) = i_{device}(v) - i_{load line}(v) = 0$ and iterate.

**Convergence:** Usually converges quickly (~3-5 iterations) if initial guess is reasonable.

**Failure modes:** Can diverge if initial guess is bad or if there are multiple solutions.

---

## Back-to-Back Connection

From lecture Pages 21-22:

**Setup:** Two one-ports $N_a$ and $N_b$ connected directly (terminals to terminals).

**Kirchhoff's Laws:**
- **KVL:** $v_a = v_b = v$ (same voltage)
- **KCL:** $i_a = -i_b$ (currents flow opposite directions)

**Constraints:**
$$f_a(v, i) = 0 \quad \text{and} \quad f_b(v, -i) = 0$$

**Solution:** Intersection of these two curves on the v-i plane.

[[visual:v3]]

**Why model it this way?** Because it generalizes to ANY circuit — we can always think of a circuit as "one-port driving another one-port at the back-to-back connection."

[[visual:v6]]

---

## Going Deeper: Stability of Multiple Operating Points

When a circuit has **three operating points** (like tunnel diode example):

**Q1 (leftmost) and Q3 (rightmost):** Usually **stable**
- Small perturbations → system returns to Q
- These are the "resting states" of the circuit

**Q2 (middle):** Usually **unstable**
- Small perturbations → system moves away to Q1 or Q3
- This is a "tipping point"

**How to check stability?**

Look at the **incremental resistance** $r_d = dv/di$ at each Q:
- If $r_d + R_b > 0$ → stable
- If $r_d + R_b < 0$ → unstable

**For tunnel diode:** Middle Q is in the negative resistance region where $r_d < 0$ and $|r_d| > R_b$ → unstable.

[[visual:v5]]

**Real application:** Bistable circuits (flip-flops, memories) exploit multiple operating points.

---

## Real-World Application: Transistor Biasing

**Problem:** Design a transistor amplifier. Choose $V_{CC}$, $R_C$, $R_B$ so the transistor operates in the active region.

**Approach:**
1. Draw transistor output characteristic: $I_C$ vs. $V_{CE}$ for different $I_B$
2. Choose desired Q-point (e.g., $V_{CEQ} = V_{CC}/2$ for maximum swing)
3. Draw load line: $I_C = (V_{CC} - V_{CE})/R_C$
4. Find intersection → this gives you the operating point
5. Design $R_B$ to deliver the required base current $I_B$

**If Q-point is wrong:**
- Too low $V_{CE}$ → saturation → clipping
- Too high $V_{CE}$ → cutoff → no amplification

[[visual:v10]]

**DC analysis is the FIRST step in any amplifier design.**

[[visual:v7]]

---

## Pose & Reflect

1. **Why does a steeper load line (smaller $R_b$) tend to give a unique operating point?**  
   Hint: Think about how many times a steep line can intersect an N-curve.

2. **If you want to bias an LED at exactly 20mA, how do you choose $R_b$ if $E_b = 5V$ and $V_{LED} \approx 2V$?**  
   Use the load line method.

3. **The Newton-Raphson method can fail. When would you use a more robust method like bisection?**

---

## Summary

**DC operating point:** Where device meets circuit  
**Graphical:** Intersection of characteristic + load line  
**Analytical:** Solve $f(v, i) = 0$ + constraint (if possible)  
**Numerical:** Newton-Raphson or other iterative methods

**Load line:** $i = (E_b - v)/R_b$  
**Back-to-back:** $v_a = v_b$, $i_a = -i_b$

**Unique/multiple/no solutions possible** for nonlinear circuits  
**Stability:** Check incremental resistance $r_d + R_{ext}$

**This completes the foundation:** You can now analyze ANY resistive network with linear + nonlinear elements,finding where it settles in DC.
