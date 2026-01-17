# Ideal Diode and v-i Characteristics

> **Narrative thread:** Linear resistors have straight-line characteristics. Now we introduce our first **nonlinear** element — the ideal diode — where the v-i relationship is made of two straight segments meeting at a corner.

---

## THE BIG IDEA

**The ideal diode is a one-way valve for current.**

It has two states:
1. **Reverse bias** ($v < 0$): Acts as an **open circuit** (i = 0)
2. **Forward bias** ($i > 0$): Acts as a **short circuit** (v = 0)

This simple piecewise-linear characteristic is the foundation of:
- **Rectifiers** (AC → DC conversion)
- **Logic gates** (diode logic)
- **Protection circuits** (reverse polarity, voltage spikes)

**Why it matters:** Understanding the ideal diode gives you the mental model for ALL semiconductor diodes — pn-junctions, Zeners, LEDs, tunnel diodes. They're all variations on this theme.

---

## The Ideal Diode Characteristic

From lecture Page 5:

$$\mathcal{R}_{ID} = \{(v, i): v \cdot i = 0, i \geq 0 \text{ for } v < 0 \text{ and } v = 0 \text{ for } i > 0\}$$

**Translation:** The constraint $v \cdot i = 0$ means **either voltage or current is zero** (or both).

- If $v < 0$ (reverse bias) → $i = 0$ (negative v-axis)
- If $i > 0$ (conducting) → $v = 0$ (positive i-axis)

On the v-i plane, this looks like an "L" shape lying along the axes.

[[visual:v1]]

---

## Two Operating Regions

### Region 1: Reverse Bias ($v < 0$)
**Diode acts as open circuit:**
- Current $i = 0$ regardless of how negative v is
- Diode "blocks" current flow
- Like an infinite resistance

**Real-world:** This is how half-wave rectifiers block negative half-cycles.

### Region 2: Forward Conduction ($i > 0$)
**Diode acts as short circuit:**
- Voltage $v = 0$ regardless of how large i is
- Diode "conducts" freely
- Like zero resistance

**Real-world:** This is where current flows through during positive half-cycles.

---

## The pn-Junction Diode: A Real Diode

From lecture Page 6:

Real semiconductor diodes follow the **Shockley equation**:

$$i = I_s \left(e^{v/V_T} - 1\right)$$

Where:
- $I_s$ = reverse saturation current (~$10^{-12}$ to $10^{-15}$ A)
- $V_T = \frac{kT}{q}$ = thermal voltage ≈ 26 mV at room temperature (300K)
- $k$ = Boltzmann's constant
- $q$ = electron charge
- $T$ = temperature in Kelvins

### What does this curve look like?

- **Reverse bias** ($v < 0$): $i \approx -I_s$ (tiny reverse current)
- **Forward bias** ($v > 0$): $i$ grows **exponentially** with v

**Key difference from ideal:** There's a voltage drop (~0.6-0.7V for Si) when conducting, not zero.

[[visual:v2]]

[[visual:v8]]

---

## Voltage-Controlled vs. Current-Controlled

From lecture Page 6:

> The pn-junction equation means that, for any given voltage v, the current i is **uniquely specified**. Any nonlinear resistor having this property is called a **voltage-controlled nonlinear resistor**.

**Voltage-controlled:** $i = \hat{i}(v)$ — single-valued function  
**Current-controlled:** $v = \hat{v}(i)$ — single-valued function

**Why does this matter?**
- For graphical analysis (series/parallel combinations)
- For synthesis (how to build PWL models)
- For choosing analysis methods

The ideal diode is **neither** fully voltage-controlled nor current-controlled because of the vertical and  horizontal segments.

---

## Other Important Diodes

### Tunnel Diode (Lecture Page 6)
Has an **N-shaped** characteristic with a **negative resistance region**:
- Current first increases with voltage
- Then **decreases** (negative slope!)
- Then increases again

**Used in:** High-frequency oscillators, microwave circuits

[[visual:v3]]

### Glow Tube (Lecture Page 6)
Has an **S-shaped** characteristic:
- Voltage rises with current initially
- Then **drops** as current increases (negative resistance)
- Then rises again

**Used in:** Voltage regulators (old technology), neon lamps

[[visual:v4]]

### Zener Diode
Sharp **reverse breakdown** at a specific voltage $V_Z$:
- Acts like ideal diode in forward direction
- In reverse, blocks until $v = -V_Z$, then conducts heavily

**Used in:** Voltage regulation at $V_Z$ (e.g., 5.1V, 12V)

[[visual:v5]]

[[visual:v6]]

[[visual:v7]]

---

## Going Deeper: Why the Exponential Form?

The pn-junction equation $i = I_s(e^{v/V_T} - 1)$ comes from **semiconductor physics**:

When you apply voltage v across a pn-junction:
1. It lowers the **energy barrier** for electrons to cross from n-side to p-side
2. The probability of crossing depends on **Boltzmann statistics**: $P \propto e^{qv/kT}$
3. Current is proportional to this probability

**The thermal voltage** $V_T = kT/q$ is the "natural voltage scale" of the junction. At room temp:
$$V_T = \frac{(1.38 \times 10^{-23})(300)}{1.6 \times 10^{-19}} \approx 26 \text{ mV}$$

So every 26 mV increase in forward voltage multiplies the current by **e ≈ 2.718**.

---

## Bilateral Property

From lecture Page 7:

> A bilateral resistor satisfies $f(v, i) = f(-v, -i)$ for all $(v, i)$ on its characteristic.

**Translation:** If you flip both voltage and current signs, you get the same characteristic.

**Example:** A linear resistor $v = Ri$ is bilateral because:
$$-v = R(-i)$$

**Ideal diode is NOT bilateral** — flipping signs changes the behavior completely.

---

## Pose & Reflect

1. **Why can't you use an ideal diode model for precision circuit design?**  
   Hint: What happens when you need to know the exact voltage drop?

2. **The pn-junction equation has an exponential. What does this mean for small-signal analysis?**  
   Think about the slope $di/dv$ at an operating point.

3. **If $I_s$ doubles with every 10°C rise in temperature, what happens to diode current at fixed voltage?**

---

## Summary

**Ideal diode: two-segment piecewise-linear**
- Reverse bias: open circuit (i=0)
- Forward bias: short circuit (v=0)

**Real pn-junction diode:**
- $i = I_s(e^{v/V_T} - 1)$
- Voltage-controlled
- Exponential relationship due to Boltzmann statistics

**Other diodes (tunnel, Zener, glow) have different shapes** — N-curves, sharp breakdown — enabling oscillators, voltage regulation, etc.

**Next:** We'll explore what happens when a nonlinear resistor meets a sinusoidal input. Answer: **harmonic generation** — creating new frequencies that weren't in the input.

[[visual:v9]]

[[visual:v10]]

