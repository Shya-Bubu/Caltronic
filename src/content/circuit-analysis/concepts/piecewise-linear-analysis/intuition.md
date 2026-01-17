# Piecewise-Linear Analysis and Synthesis

> **Narrative thread:** We've learned HOW to combine nonlinear resistors graphically. Now the key question: can we BUILD any nonlinear characteristic we want using simple elements (ideal diodes + linear resistors)?

---

## THE BIG IDEA

**Any piecewise-linear (PWL) characteristic can be synthesized using ideal diodes, resistors, and voltage/current sources.**

This is profound because:
1. **Analysis:** Complex smooth curves can be approximated by PWL segments → easier math
2. **Synthesis:** You can design circuits to realize specific v-i characteristics
3. **Simulation:** SPICE uses PWL models internally for speed

**Two key building blocks:**
- **Concave resistors** (voltage-controlled PWL with decreasing slopes)
- **Convex resistors** (current-controlled PWL with decreasing slopes)

**Why it matters:** Every Zener voltage regulator, every clipper circuit, every limiter — they're all PWL approximations of smooth nonlinear curves.

[[visual:v1]]

---

## Concave Resistors

From lecture Page 16:

A **concave resistor** is a voltage-controlled PWL resistor with:
- **Breakpoint voltage** $E$
- **Slope** $G$ (conductance)

### Characteristic:

- If $v \leq E$: $i = 0$ (no current flows)
- If $v > E$: $i = G(v - E)$ (linear with slope G)

**Graphically:** Two linear segments meeting at voltage $E$.

### Circuit Realization:
```
Ideal diode + voltage source E + resistor R (where G = 1/R)
```

**Why "concave"?** The slope *decreases* as you move left (zero slope, then finite slope).

[[visual:v2]]

[[visual:v5]]

---

## Convex Resistors

From lecture Page 17:

A **convex resistor** is the **dual** of a concave resistor — it's current-controlled:

### Characteristic:

- If $i \leq I$: $v = 0$ (no voltage drop)
- If $i > I$: $v = R(i - I)$ (linear with slope R)

### Circuit Realization:
```
Ideal diode + current source I + resistor R (in series)
```

**Why "convex"?** By duality. The i-v curve is concave, so v-i curve is convex.

[[visual:v3]]

[[visual:v6]]

---

## Multi-Segment PWL Synthesis

From lecture Pages 17-19:

**Key result:** Any (n+1)-segment voltage-controlled PWL characteristic can be synthesized using:
- One linear resistor $R_0$
- $n$ concave resistors (one per breakpoint)
- One current source (if curve doesn't pass through origin)

### The General Formula (Lecture Page 19):
For breakpoints $E_1, E_2, ..., E_n$ and slopes $G_a, G_b, G_c, ...$:

$$i = G_0 v + \sum_{k=1}^{n} (G_k - G_{k-1})[v - E_k]^+$$

Where $[x]^+ = \max(0, x)$ is the "positive part" function.

**Example:** 3-segment PWL (lecture Page 18)
- Region 1 slope: $G_a$
- Region 2 slope: $G_b$
- Region 3 slope: $G_c$
- Breakpoints: $E_1, E_2$

**Synthesis:**
- Base conductance: $G_0 = G_a$
- First concave: $G_1 - G_0 = G_b - G_a$ at $E_1$
- Second concave: $G_2 - G_1 = G_c - G_b$ at $E_2$

[[visual:v4]]

[[visual:v7]]

---

## The Ideal Diode as a PWL Building Block

The **ideal diode** creates the "kink" at the breakpoint:

For voltage $v$:
- If $v < E$: diode OFF → open circuit → that branch doesn't conduct
- If $v > E$: diode ON → short circuit → branch conducts with slope $\Delta G$

**This is why PWL synthesis works** — each breakpoint needs one ideal diode to "turn on" a new conductance.

---

## PWL Approximation of Smooth Curves

From lecture Page 17:

**Problem:** You have a smooth curve like $i = I_s(e^{v/V_T} - 1)$ (pn-junction). How do you approximate it with PWL?

**Approach:**
1. Pick breakpoint voltages: $E_1, E_2, ..., E_n$
2. Calculate slopes between breakpoints
3. Synthesize using n concave resistors

**Trade-off:**
- More segments → better approximation → more accurate
- Fewer segments → simpler circuit → faster simulation

**SPICE uses this internally:** It replaces exponential diode equations with PWL segments during DC analysis for speed, then switches to accurate models when needed.

[[visual:v8]]

[[visual:v9]]

---

## Going Deeper: Why PWL Works Mathematically

Any **continuous piecewise-linear function** is locally linear but globally nonlinear.

**Key insight:** The $[v - E]^+$ function is like a "switch":
$$[v - E]^+ = \begin{cases}0 & v \leq E \\ v - E & v > E\end{cases}$$

This is **exactly what an ideal diode + voltage source does**:
- Ideal diode characteristic: blocks until $v = E$, then conducts
- This "turns on" the conductance $\Delta G$ at voltage $E$

**Each term in the sum** $\sum (G_k - G_{k-1})[v - E_k]^+$ adds a new linear segment at $E_k$.

---

## Real-World Application: Zener Voltage Regulator

From lecture Pages 15, 18:

A **Zener diode** has a PWL characteristic:
1. **Forward:** Acts like regular diode (~0.7V drop)
2. **Reverse blocking:** Open circuit until $v = -V_Z$
3. **Reverse breakdown:** Conducts heavily at $-V_Z$

**PWL model (3 segments):**
- Region 1: $v < -V_Z$ → slope $≈ \infty$ (breakdown)
- Region 2: $-V_Z < v < 0.7V$ → slope ≈ 0 (blocking)
- Region 3: $v > 0.7V$ → slope large (forward conduction)

**Regulator circuit:** Zener + series resistor $R$
- Input voltage $V_{in}$ varies
- Output voltage $V_{out}$ stays at $V_Z$ (regulated)

The PWL model lets you **analytically solve** for operating point using load line method.

[[visual:v10]]

[[visual:v11]]

---

## Pose & Reflect

1. **How many ideal diodes do you need to create a 5-segment PWL characteristic?**  
   Hint: Think about breakpoints.

2. **Can you synthesize an N-shaped curve (like a tunnel diode) using only concave resistors?**  
   What about convex resistors?

3. **Why do SPICE simulators use PWL models internally if computers can solve exponential equations?**  
   Think about numerical stability and speed.

---

## Summary

**Concave resistor (voltage-controlled PWL):**
- Breakpoint at voltage $E$, slope $G$
- Realized with: ideal diode + voltage source + resistor

**Convex resistor (current-controlled PWL):**
- Dual of concave
- Realized with: ideal diode + current source + resistor (series)

**Multi-segment synthesis:**
- (n+1) segments requires n concave/convex elements
- Each breakpoint = one ideal diode

**Why PWL?** Approximates smooth curves, enables synthesis, speeds up simulation.

**Next:** Now we have resistors and we know how to combine them. The final question: given a circuit with a nonlinear resistor and a battery, how do we find the operating point (the voltage and current)? That's DC operating point analysis.
