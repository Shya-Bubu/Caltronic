# v-i Characteristics and Circuit Duality

> **Narrative thread**: Understanding how to represent and manipulate circuit elements through their voltage-current relationships is fundamental to circuit analysis. The concept of duality reveals deep symmetries in circuit theory that simplify design and analysis.

> The language we use to describe all circuit elements.

---

## FROM BASICS: What is a Characteristic?

Let's start with something familiar from A-Level maths: **graphs of relationships**.

Remember plotting $y = 2x$? You got a straight line. That graph **characterizes** the relationship between x and y — it tells you everything about how they're connected.

In circuits, we do the same thing with voltage and current. Instead of x and y, we use v and i.

**A v-i characteristic is simply a graph (or equation) showing how voltage and current are related for a circuit element.**

Think of it as the "fingerprint" of a circuit element — it uniquely identifies how that element behaves.

**If you're thinking "Why do we need graphs? Can't we just use equations?"** — excellent question. For simple elements, equations work fine. But when circuits get complex with nonlinear elements, graphical methods become the ONLY practical way to solve them. We're building that foundation now.

---

## THE BIG IDEA: Every Element Has a Characteristic

### Examples You Already Know

**1. Linear Resistor:**
- Equation: $v = Ri$
- Graph: Straight line through origin
- "Fingerprint": Constant slope

**2. Open Circuit (broken wire):**
- Equation: $i = 0$ for any $v$
- Graph: Horizontal line on v-axis
- "Fingerprint": No current ever flows

**3. Short Circuit (ideal wire):**
- Equation: $v = 0$ for any $i$
- Graph: Vertical line on i-axis
- "Fingerprint": No voltage drop ever occurs

**4. Battery (ideal voltage source):**
- Equation: $v = V_0$ (constant) for any $i$
- Graph: Vertical line at $v = V_0$
- "Fingerprint": Fixed voltage regardless of current

**Notice the pattern?** Each element has a unique "shape" on the v-i plane. That's the power of characteristics — you can recognize an element just by looking at its curve.

[[visual:v1]]

---

## BUILDING UNDERSTANDING: The v-i Plane vs i-v Plane

Your lecture notes (Pages 2-3) emphasize an important distinction: **which axis is which matters!**

**This confuses almost everyone at first** because we're used to it not mattering much. But in circuit theory, the axis convention is crucial for duality and graphical analysis.

### Convention (Critical!)

When we say "x-y plane" in mathematics:
- **x** is the horizontal axis (abscissa)
- **y** is the vertical axis (ordinate)

Same rule in circuits:

**v-i plane:**
- v (voltage) is horizontal →
- i (current) is vertical ↑

**i-v plane:**
- i (current) is horizontal →
- v (voltage) is vertical ↑

**Why does this matter?** Because when we flip axes, slopes change! The same resistor looks different on each plane.

[[visual:v2]]

---

## The Concept of DUALITY

Here's where it gets beautiful. Your professor introduces **duality** on Page 3 of the notes.

### What is Duality?

**Definition:** The **dual** of a resistor is another resistor whose v-i characteristic in the **v-i plane** is the same curve as the original resistor in the **i-v plane**.

In simpler terms: **If you flip the axes (swap v and i), you get the dual circuit element.**

### Example: Dual of a 100Ω Resistor

**Original resistor:**
- On i-v plane: $v = 100i$ (slope = 100)
- This means: voltage equals 100 times current

**To find the dual:**
1. Take the original equation: $v = 100i$
2. Swap v and i: $i = 100v$
3. This is the dual!

**But wait!** $i = 100v$ means $i = Gv$ where $G = 100$ Siemens.

So the dual of a 100Ω resistor is... **a 0.01Ω resistor** (or equivalently, a 100S conductor).

Actually, more precisely: $G = 1/R = 1/100 = 0.01$ S, so $R_{dual} = 1/100 = 0.01Ω$.

**General rule:** The dual of resistance R is conductance G = 1/R (or resistance 1/R).

[[visual:v3]]

---

## Special Cases: Open and Short Circuits

### Open Circuit

**Definition:** $R = \infty$ (infinite resistance)

**Characteristics:**
- $i = 0$ for all $v$ (no current flows)
- On v-i plane: horizontal line along v-axis
- On i-v plane: vertical line at $i = 0$

**Your lecture notation (Page 3):**
$$\mathcal{R}_{open} = \{(v, i) : i = 0 \text{ for all } v\}$$

### Short Circuit

**Definition:** $R = 0$ (zero resistance, or $G = \infty$)

**Characteristics:**
- $v = 0$ for all $i$ (no voltage drop)
- On v-i plane: vertical line at $v = 0$
- On i-v plane: horizontal line along i-axis

**Your lecture notation (Page 3):**
$$\mathcal{R}_{short} = \{(v, i) : v = 0 \text{ for all } i\}$$

### The Duality

**Open circuit is the DUAL of short circuit!**

- Open: $i = 0$ for all $v$ → swap variables → Short: $v = 0$ for all $i$
- Open has $R = \infty$ → dual has $R = 0$ (short)
- Open has $G = 0$ → dual has $G = \infty$ (short)

[[visual:v4]]

---

## CONNECTION TO LECTURE: The General Form

Your professor writes (Page 2):

$$\mathcal{R}_R = \{(v, i) : f(v, i) = 0\}$$

This is the most general way to describe a resistor. It says:

"A resistor $\mathcal{R}_R$ is the set of all voltage-current pairs $(v, i)$ that satisfy some relationship $f(v, i) = 0$."

### Examples:

**Linear resistor:**
$$f(v, i) = v - Ri = 0 \implies v = Ri$$

**Another way (conductance form):**
$$f(v, i) = i - Gv = 0 \implies i = Gv$$

**Nonlinear resistor (you'll see this later):**
$$f(v, i) = v - i^3 = 0 \implies v = i^3$$

This general form works for **any** resistor, linear or nonlinear!

---

## GOING SLIGHTLY DEEPER: Why Duality Matters

### 1. Simplifies Circuit Design

If you've designed a **current amplifier** and it works great, you can instantly design a **voltage amplifier** by applying duality — just swap all resistances with conductances, current sources with voltage sources, series with parallel, etc.

You don't start from scratch; you use duality!

### 2. Helps Discover New Circuits

The **mutual capacitor** was discovered by investigating the dual of the mutual inductor. Duality led to a new component!

### 3. Makes Analysis Easier

Many circuit theorems come in dual pairs:
- **Thévenin's theorem** ↔ **Norton's theorem** (you'll learn these later)
- **Series** ↔ **Parallel**
- **Voltage** ↔ **Current**

Understanding one immediately gives you the other for free!

### 4. Validates Simulations

Testing a high-power current source is hard and dangerous. But you can test its **dual** (a voltage source) at lower power, then apply duality to infer the current source behavior. Much safer!

---

## Exercise: Reflecting About the 45° Line

Your lecture (Page 4, Exercise 3) mentions an important geometric fact:

**Given the v-i characteristic on the v-i plane, the dual characteristic is obtained by reflecting about the 45° line through the origin.**

### Why the 45° Line?

The 45° line is where $v = i$ (equal axes). Reflecting about this line **swaps** v and i.

**Geometric interpretation:**
- Point $(v_0, i_0)$ on original characteristic
- After reflection: $(i_0, v_0)$ on dual characteristic
- This is exactly what "swap v and i" means!

[[visual:v5]]

---

## Why You Care: Real EEE Applications

### 1. **Power Systems**
Transmission lines are often analyzed using their dual circuits to simplify calculations.

### 2. **Filter Design**
Low-pass filters have dual high-pass filters. Design one, get the other by duality.

### 3. **Amplifier Design**
Current-mode amplifiers and voltage-mode amplifiers are duals. Understanding both through duality saves design time.

### 4. **Signal Processing**
Many signal processing algorithms have dual formulations (time-domain ↔ frequency-domain). The concept traces back to circuit duality.

### 5. **Simulation and Testing**
Duality lets you test difficult-to-measure circuits by testing their duals instead.

[[visual:v6]]

[[visual:v7]]

[[visual:v8]]

---

## Summary: Key Takeaways

1. **v-i characteristic** = the graph/equation relating voltage and current for an element
2. **v-i plane**: v horizontal, i vertical; **i-v plane**: i horizontal, v vertical
3. **Duality**: swap v ↔ i to get the dual element
4. **Open circuit** (R = ∞, i = 0) is dual to **short circuit** (R = 0, v = 0)
5. **Linear resistor R** is dual to **linear resistor 1/R** (or conductor G)
6. **Reflection about 45° line** on v-i plane gives the dual characteristic
7. **Duality simplifies design, analysis, and discovery** of new circuits

Master v-i characteristics and duality, and you unlock a powerful symmetry in circuit theory!

[[visual:v9]]

[[visual:v10]]

