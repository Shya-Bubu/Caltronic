# Independent Voltage and Current Sources

> **Narrative thread**: We've studied resistors — elements whose v-i relationship depends on both voltage and current. Now we introduce **sources** — elements that fix either voltage OR current regardless of the other variable. These are the "drivers" of every circuit.

> Every circuit needs a source — this is where the energy comes from.

---

## FROM BASICS: What is a "Source"?

Think back to our water analogy:

**Water pump:**
- Maintains a fixed **pressure difference** regardless of how much water flows
- If the pipe is narrow (high resistance), less water flows
- If the pipe is wide (low resistance), more water flows
- But the pressure stays the same!

This is like a **voltage source** — it maintains fixed voltage regardless of current.

**Water flow regulator:**
- Forces a fixed **flow rate** regardless of the pressure required
- If the pipe is narrow, pressure builds up
- If the pipe is wide, pressure stays low
- But the flow rate stays the same!

This is like a **current source** — it maintains fixed current regardless of voltage.

[[visual:v1]]

---

## THE BIG IDEA: Sources Fix One Variable

### Independent Voltage Source

**Definition (from lecture Page 8):**

$$\mathcal{R}_{vs} = \{(v, i) : v = v_s(t) \text{ for } -\infty < i < \infty\}$$

**Translation:**
- Voltage is **fixed** at $v = v_s(t)$
- Current can be **anything** ($-\infty$ to $+\infty$)

**v-i characteristic:**
- Vertical line at $v = v_s(t)$ on the v-i plane
- Horizontal line at $v = v_s(t)$ on the i-v plane

**Physical examples:**
- Battery (approximately, for small currents)
- Wall outlet (120V AC or 230V AC)
- Power supply set to constant voltage mode
- Ideal op-amp output (when not current-limited)

[[visual:v2]]

---

### Independent Current Source

**Definition (from lecture Page 8):**

$$\mathcal{R}_{cs} = \{(v, i) : i = i_s(t) \text{ for } -\infty < v < \infty\}$$

**Translation:**
- Current is **fixed** at $i = i_s(t)$
- Voltage can be **anything** ($-\infty$ to $+\infty$)

**v-i characteristic:**
- Horizontal line at $i = i_s(t)$ on the v-i plane
- Vertical line at $i = i_s(t)$ on the i-v plane

**Physical examples:**
- Current mirror in transistor circuits
- Current-mode power supply
- Photodiode in reverse bias (approximately)
- Active current sinks/sources in IC design

[[visual:v3]]

---

## BUILDING UNDERSTANDING: DC vs AC Sources

### DC (Constant) Sources

**DC voltage source:**
$$v_s(t) = V_0 \text{ (constant for all } t)$$

Examples: batteries, regulated DC power supplies

**DC current source:**
$$i_s(t) = I_0 \text{ (constant for all } t)$$

Examples: bias current in amplifiers

### AC (Time-Varying) Sources

**AC voltage source (sinusoidal):**
$$v_s(t) = V_m \sin(\omega t)$$

From lecture Page 8: This represents AC mains, signal generators, etc.

**AC current source:**
$$i_s(t) = I_m \sin(\omega t)$$

Less common, but used in AC circuit analysis.

[[visual:v4]]

---

## CONNECTION TO LECTURE: Duality of Sources

From lecture Page 8, Exercise:

> Under what condition is an independent current source the **dual** of an independent voltage source?

Let's think about duality systematically:

**Voltage source:**
- Characteristic: $v = v_s(t)$ for all $i$
- On v-i plane: vertical line

**Apply duality (swap v ↔ i):**
- Dual characteristic: $i = v_s(t)$ for all $v$
- This is a current source with $i_s(t) = v_s(t)$

**Answer:** A current source is the dual of a voltage source when **the numerical value of the current equals the numerical value of the voltage**.

More generally:
- **Voltage source** $v = V_0$ ↔ **Current source** $i = V_0$ (numerically)
- **Series voltage source** ↔ **Parallel current source**

---

## Why "Independent"?

The word "**independent**" means the source value doesn't depend on any other circuit variable.

**Independent voltage source:** $v = v_s(t)$ (set by the source itself)

**Dependent (controlled) voltage source:** $v = k \cdot i_{other}$ (depends on current somewhere else)

You'll see dependent sources when studying transistors, op-amps, and controlled sources. For now, we focus on **independent** sources.

---

## GOING SLIGHTLY DEEPER: Ideal vs. Real Sources

### Real Voltage Sources Have Internal Resistance

A real battery isn't a perfect voltage source. It has internal resistance $R_{int}$:

**Equivalent circuit:**
- Ideal voltage source $V_0$ in series with $R_{int}$
- Terminal voltage: $v = V_0 - i \cdot R_{int}$

When you draw more current, the terminal voltage **drops** due to $R_{int}$.

**Example:** A 9V battery might have $R_{int} \approx 1-10\Omega$. Under heavy load (1A), the voltage drops to 8-9V.

### Real Current Sources Have Internal Conductance

A real current source has internal conductance $G_{int}$ (or resistance $R_{int}$ in parallel):

**Equivalent circuit:**
- Ideal current source $I_0$ in parallel with $G_{int}$
- Terminal current: $i = I_0 - v \cdot G_{int}$

When voltage across it increases, some current "leaks" through $G_{int}$.

[[visual:v5]]

---

## Power Delivered by Sources

### Voltage Source

Power delivered **BY** the voltage source **TO** the circuit:

$$P = v \cdot i = v_s(t) \cdot i(t)$$

- If $i > 0$ and $v_s > 0$: source **delivers** power (discharging battery)
- If $i < 0$ and $v_s > 0$: source **absorbs** power (charging battery)

### Current Source

Power delivered **BY** the current source **TO** the circuit:

$$P = v \cdot i = v(t) \cdot i_s(t)$$

- If $v > 0$ and $i_s > 0$: source **delivers** power
- If $v < 0$ and $i_s > 0$: source **absorbs** power

**Key insight:** Sources can deliver OR absorb power, depending on the circuit they're connected to!

---

## Forbidden Connections

### 1. **Never short-circuit an ideal voltage source!**

If you connect a voltage source directly to a wire (short circuit):
- Voltage source says: $v = V_0$
- Short circuit says: $v = 0$
- **Contradiction!** No solution exists

In reality, huge current flows (limited only by internal resistance), potentially causing fire/explosion.

### 2. **Never open-circuit an ideal current source!**

If you disconnect a current source (open circuit):
- Current source says: $i = I_0$
- Open circuit says: $i = 0$
- **Contradiction!** No solution exists

In reality, voltage builds up until breakdown or damage occurs.

### 3. **Never connect two different voltage sources in parallel!**

If $V_1 \neq V_2$:
- Source 1 says: $v = V_1$
- Source 2 says: $v = V_2$
- **Contradiction!**

### 4. **Never connect two different current sources in series!**

If $I_1 \neq I_2$:
- Source 1 says: $i = I_1$
- Source 2 says: $i = I_2$
- **Contradiction!**

---

## PRACTICE: Worked Example

**Question:** An ideal 12V voltage source is connected to a 6Ω resistor. Find the current and power delivered by the source.

**Solution:**

Step 1: Draw the circuit
- Voltage source: $v = 12V$
- Resistor: $v = Ri$

Step 2: Apply KVL
$$12 = v_R = Ri$$

Step 3: Solve for current
$$i = \frac{12V}{6\Omega} = 2A$$

Step 4: Calculate power
$$P = v \cdot i = 12V \times 2A = 24W$$

**Answer:** Current is 2A, power delivered is 24W (absorbed by resistor as heat).

---

## Why You Care: Real EEE Applications

### 1. **Power Supply Design**
Every circuit needs a voltage source (or current source). Understanding ideal sources helps you specify real power supplies.

### 2. **Biasing Transistor Circuits**
Transistors are often biased with current sources for stable operating points.

### 3. **Op-Amp Circuits**
Op-amps are modeled as voltage-controlled voltage sources (dependent sources).

### 4. **Current Mirrors in ICs**
Integrated circuits use current sources extensively for biasing and loading.

### 5. **Battery Management Systems**
Understanding voltage sources helps you design charging circuits and estimate battery life.

---

## Summary: Key Takeaways

**Before moving to the next concept, make sure you can answer these questions without looking back:**

1. What does an independent voltage source fix? (Answer: voltage, regardless of current)
2. What does an independent current source fix? (Answer: current, regardless of voltage)
3. Why can't you short-circuit a voltage source? (Answer: creates contradiction — source says v≠0, short says v=0)
4. Are voltage and current sources duals? (Answer: yes, swap v↔i)

**If you forget everything else from this concept, remember this:**

Sources are the **energy suppliers** in every circuit. Voltage sources maintain fixed voltage. Current sources maintain fixed current. Real sources have internal resistance that makes them slightly non-ideal.

**The one thing that trips up students most:** Trying to connect forbidden configurations (shorting voltage sources, opening current sources). Don't do it — mathematically inconsistent, physically dangerous.

---

**Key Equations:**
1. **Independent voltage source**: $v = v_s(t)$, $i$ can be anything
2. **Independent current source**: $i = i_s(t)$, $v$ can be anything
3. **v-i characteristics**: vertical line (voltage source), horizontal line (current source)
4. **Duality**: voltage sources and current sources are duals (swap v ↔ i)
5. **Real sources have internal impedances** (series $R$ for voltage, parallel $G$ for current)
6. **Forbidden connections**: don't short voltage sources or open current sources!
7. **Sources deliver power** to the circuit (or absorb, depending on direction)

Sources are the energy suppliers in every circuit — master them to design functional systems!
