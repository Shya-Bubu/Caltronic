# Series and Parallel Connections of Nonlinear Resistors

> **Narrative thread:** For linear resistors, series means $R_{eq} = R_1 + R_2$ and parallel means $1/R_{eq} = 1/R_1 + 1/R_2$. But for nonlinear resistors, we can't just "add" anymore. We need graphical methods.

---

## THE BIG IDEA

**You can't add nonlinear resistances algebraically — you add them graphically.**

For series connection:
- Currents are equal: $i_1 = i_2 = i$
- Voltages add: $v = v_1 + v_2$
- On the v-i plane: **horizontal addition** of curves

For parallel connection:
- Voltages are equal: $v_1 = v_2 = v$
- Currents add: $i = i_1 + i_2$
- On the v-i plane: **vertical addition** of curves

**Why it matters:** This graphical method is the ONLY general way to analyze circuits with nonlinear elements. SPICE simulators use this internally.

[[visual:v1]]

[[visual:v2]]

---

## Series Connection: Current-Controlled Case

From lecture Pages 9-11:

**Setup:** Two current-controlled resistors in series:
$$v_1 = \hat{v}_1(i), \quad v_2 = \hat{v}_2(i)$$

**KCL:** All branch currents equal the port current: $i_1 = i_2 = i$

**KVL:** Port voltage is the sum: $v = v_1 + v_2$

**Result:**
$$v = \hat{v}_1(i) + \hat{v}_2(i)$$

The series connection is also **current-controlled**.

### Graphical Procedure (Horizontal Addition on v-i plane)

1. Draw $v_1(i)$ and $v_2(i)$ on the v-i plane
2. For each value of $i$:
   - Read $v_1$ from first curve
   - Read $v_2$ from second curve
   - Plot point at $(v_1 + v_2, i)$
3. Connect the dots → driving-point characteristic

**Why horizontal?** Because you're adding voltages (horizontal axis) for fixed current (vertical axis).

[[visual:v3]]

[[visual:v4]]

[[visual:v5]]

---

## Parallel Connection: Voltage-Controlled Case

From lecture Pages 12-13:

**Setup:** Two voltage-controlled resistors in parallel:
$$i_1 = \hat{i}_1(v), \quad i_2 = \hat{i}_2(v)$$

**KVL:** Both have the same voltage: $v_1 = v_2 = v$

**KCL:** Port current is the sum: $i = i_1 + i_2$

**Result:**
$$i = \hat{i}_1(v) + \hat{i}_2(v)$$

The parallel connection is also **voltage-controlled**.

### Graphical Procedure (Vertical Addition on v-i plane)

1. Draw ${i}_1(v)$ and $\hat{i}_2(v)$ on the v-i plane
2. For each value of $v$:
   - Read $i_1$ from first curve
   - Read $i_2$ from second curve
   - Plot point at $(v, i_1 + i_2)$
3. Connect the dots → driving-point characteristic

**Why vertical?** Because you're adding currents (vertical axis) for fixed voltage (horizontal axis).

[[visual:v6]]

[[visual:v7]]

[[visual:v8]]

---

## The Duality Connection

From lecture Page 12-13:

**Notice the symmetry:**

| Series | Parallel |
|--------|----------|
| Current-controlled | Voltage-controlled |
| $v = \hat{v}_1(i) + \hat{v}_2(i)$ | $i = \hat{i}_1(v) + \hat{i}_2(v)$ |
| Horizontal addition | Vertical addition |
| KVL: sum voltages | KCL: sum currents |

This is **duality** in action. Every statement about series has a dual statement about parallel where you swap:
- $v \leftrightarrow i$
- $R \leftrightarrow G$
- Series ↔ Parallel
- KVL ↔ KCL

---

## Driving-Point Characteristic

From lecture Page 9:

> The v-i characteristic of a one-port in terms of its port voltage and port current is often referred to as the **driving-point characteristic** of the one-port.

**Why "driving-point"?**

Because we imagine the one-port as being "driven" by either:
- An independent voltage source (we set $v$, measure $i$)
- An independent current source (we set $i$, measure $v$)

The characteristic tells us what we observe at those terminals, regardless of the internal complexity.

[[visual:v9]]

[[visual:v10]]

---

## Mixed Case: Series of Voltage-Controlled + Current-Controlled

From lecture Page 11:

**Problem:** What if $R_1$ is current-controlled but $R_2$ is voltage-controlled?

**Answer:** The result is **neither** voltage-controlled nor current-controlled, but can be represented **parametrically**.

Using $v^*$ as the parameter (the voltage across $R_2$):

$$v = \hat{v}_1(i) + v^*, \quad i = \hat{i}_2(v^*)$$

This is a **parametric representation**: as $v^*$ varies, we trace out a curve in the v-i plane.

---

## Going Deeper: Why Graphical Addition Works

The graphical method is really just **visualizing KVL or KCL**.

**Series:** KVL says $v = v_1 + v_2$. On a graph:
- Pick a current $i$
- $v_1$ is the horizontal distance from origin to curve 1
- $v_2$ is the horizontal distance from origin to curve 2  
- $v$ is the horizontal distance from origin to the sum curve
- This is literally "adding horizontal distances"

**Parallel:** KCL says $i = i_1 + i_2$. On a graph:
- Pick a voltage $v$
- $i_1$ is the vertical distance from origin to curve 1
- $i_2$ is the vertical distance from origin to curve 2
- $i$ is the vertical distance from origin to the sum curve
- This is literally "adding vertical distances"

---

## Real-World Application: Filter Design

**Problem:** Design a voltage regulator using a Zener diode and resistor in series.

**Approach:**
1. Draw Zener v-i curve (sharp breakdown at $V_Z$)
2. Draw resistor v-i curve (straight line)
3. Series combination: horizontal addition
4. Result: overall characteristic shows how circuit responds to input voltage

**This graphical method lets you "see" the operating point** without solving nonlinear equations.

---

## Pose & Reflect

1. **Why can't you use $R_{eq} = R_1 + R_2$ for nonlinear resistors in series?**  
   Hint: What assumption does that formula require about the v-i relationship?

2. **If two identical diodes are in series, does the current double or stay the same?**  
   Think about current vs. voltage.

3. **The graphical method seems tedious. When do engineers actually use it?**  
   Consider: manual analysis vs. computer simulation.

---

## Summary

**Series connection (current-controlled):**
- $v = \hat{v}_1(i) + \hat{v}_2(i)$
- Graphical: horizontal addition on v-i plane

**Parallel connection (voltage-controlled):**
- $i = \hat{i}_1(v) + \hat{i}_2(v)$
- Graphical: vertical addition on v-i plane

**Duality:** Series ↔ Parallel, $v$ ↔ $i$, KVL ↔ KCL

**Next:** What if we want to *synthesize* a specific nonlinear characteristic using simple elements? That's where piecewise-linear approximation comes in — build any curve from ideal diodes and linear resistors.

[[visual:v11]]

[[visual:v12]]

