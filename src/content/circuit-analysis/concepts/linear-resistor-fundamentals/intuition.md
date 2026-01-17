# Linear Resistors — Understanding from Scratch

> **Narrative thread**: Linear resistors are the foundation of circuit analysis. Understanding the v-i relationship and Ohm's Law is essential for analyzing every circuit you'll encounter in EEE.

> This is where your circuit journey begins.

---

## FROM BASICS: What ARE Voltage, Current, and Resistance?

Before jumping into circuits, let's connect to something familiar: **water flowing through pipes**.

**Pause for a moment.** You might be thinking: "I've seen voltage and current before, but I'm not really sure what they *are*." That's completely normal. These are abstract concepts, and your textbook probably just defined them mathematically without building intuition first.

Let's fix that.

### The Water-Circuit Analogy

**Imagine a water system:**
- **Water tank on a roof** = source of pressure
- **Pipes** = path for water to flow
- **Narrower pipes** = more resistance to flow
- **Water flow meter** = measures how much water passes per second

Now translate to electricity:

| Water System | Electrical Circuit |
|--------------|-------------------|
| Water pressure (from height difference) | **Voltage (V)** in Volts |
| Water flow rate (litres/sec) | **Current (I)** in Amperes |
| Narrow pipe (restricts flow) | **Resistance (R)** in Ohms (Ω) |
| Pump | Battery or voltage source |

**Key idea:** Just like water pressure pushes water through pipes, **voltage pushes current through wires**. And just like narrow pipes slow water down, **resistance slows current down**.

**Critical point:** Voltage is always measured **between two points** (like pressure difference between tank top and ground). Current is measured **through a point** (like flow rate through a pipe cross-section).

**If this analogy feels a bit hand-wavy, that's fine.** Analogies are never perfect. The water analogy breaks down when we get to capacitors and inductors later. For now, it's just giving you a mental handle to grab onto.

[[visual:v1]]

[[visual:v5]]

---

## What IS a Resistor? Going Deeper

A **resistor** is a two-terminal circuit element that establishes a relationship between the voltage across it and the current through it.

**Let's be precise:** When we say "two-terminal," we mean the resistor has exactly two connection points. The voltage is measured between these terminals, and the current flows from one terminal to the other.

**Why do we use them?**
1. To **control current** (like a tap controls water flow)
2. To **divide voltage** (share voltage between components)
3. To **convert electrical energy to heat** (like in a kettle or heater)
4. To **limit current** (protect sensitive components like LEDs)
5. To **set operating points** (biasing transistors in amplifiers)

**In real life:** Every wire has some resistance (even copper!). But when we say "resistor," we usually mean a specific component designed to have a particular resistance value.

**Important distinction:** Unlike the usual terminology, in circuit theory a "resistor" doesn't always mean "linear resistor." A resistor is ANY element characterized by a relationship between voltage and current. It can be linear, nonlinear, time-varying, or time-invariant. But we'll start with the simplest case: the linear resistor.

---

## THE BIG IDEA: Ohm's Law

In 1827, Georg Ohm discovered something amazing: **for many materials, voltage and current have a simple, straight-line relationship**.

### The Relationship in Words

"If you double the voltage across a resistor, you double the current through it."

This proportional relationship is called **Ohm's Law**.

**You might be wondering: why should this be true?** Good question. It's not obvious at all that voltage and current should be proportional. In fact, for many materials (like diodes and transistors), they're NOT proportional — we'll see that later. 

For now, just know that **metals happen to behave this way**, and that's incredibly useful for engineers. It's one of those fortunate facts about nature that makes circuit design possible.

[[visual:v2]]

[[visual:v3]]

[[visual:v4]]

### The Mathematical Form

$$V = R \times I$$

Let's break down what each symbol means:
- **V** = Voltage across the resistor (in Volts) — the "push"
- **R** = Resistance (in Ohms, Ω) — how much it resists
- **I** = Current through resistor (in Amperes, A) — the "flow"

**Important:** Sometimes you'll see this written as:
- $V = IR$ (same thing, just reordered)
- $I = V/R$ (solving for current)  or $I = GV$ where $G = 1/R$
- $R = V/I$ (solving for resistance)

All three forms are Ohm's Law — just rearranged depending on what you're solving for.

---

## BUILDING UNDERSTANDING: Why This Form?

Let's see where $V = IR$ comes from using our water analogy.

**Pause and think:** Why should voltage and current be proportional at all? What makes this relationship make sense?

**Water pressure → flow rate relationship:**
- More pressure → more flow ✓
- Narrower pipe → less flow ✓

**Electrical version:**
- More voltage → more current (they're proportional)
- More resistance → less current (they're inversely related)

So we need an equation where:
- Current increases when voltage increases: $I \propto V$
- Current decreases when resistance increases: $I \propto 1/R$

Combining these: $I = \frac{V}{R}$

Multiply both sides by R: $V = IR$ ← **Ohm's Law!**

**If this feels too simple, that's actually good.** You're building correct intuition. The math follows naturally from the physical behavior. Later, when we see nonlinear resistors, you'll appreciate how nice this linear case is.

---

## Visualizing the v-i Characteristic

### What is a v-i Characteristic?

In circuit theory, we describe every resistor by its **v-i characteristic** — a mathematical or graphical relationship between voltage and current.

**Most students find this confusing at first because** we're suddenly talking about "planes" and "axes" when we just learned a simple equation. But here's why this matters: graphical methods become essential when we analyze complex circuits with multiple components. We're building the foundation now.

For a linear resistor, we can plot this in two ways:

### The v-i Plane (voltage vs current)

Plot voltage on horizontal axis (abscissa), current on vertical axis (ordinate). For a linear resistor, you get a **straight line through the origin**.

[[visual:v3]]

**Why straight?** Because doubling v doubles i — that's what "linear" means!

**The slope tells you everything:**
- Slope = $\frac{di}{dv} = \frac{1}{R} = G$ (conductance)
- **Steep slope** = small resistance (current flows easily)
- **Gentle slope** = large resistance (current restricted)

**Stop here and visualize this:** Can you picture what a 10Ω resistor looks like compared to a 100Ω resistor on this graph? The 10Ω line should be steeper (more current for same voltage).

### The i-v Plane (current vs voltage)

We can also flip the axes: current on horizontal, voltage on vertical.

[[visual:v4]]

Now the slope = $\frac{dv}{di} = R$ (resistance)

**Important convention (from your lecture, Page 2):** When we say "x-y plane," we mean x is horizontal and y is vertical. So:
- **i-v plane** means current (i) is horizontal, voltage (v) is vertical
- **v-i plane** means voltage (v) is horizontal, current (i) is vertical

---

## THE LECTURE CONTENT: Two Ways to Write It

Your lecture notes (Page 2) show two equivalent forms of Ohm's Law:

### Form 1: Resistance Form
$$v(t) = R \cdot i(t)$$

"Voltage equals resistance times current"

We can also write this as an implicit relation:
$$v(t) - R \cdot i(t) = 0$$

or using set notation (your lecture uses this):
$$\mathcal{R}_R = \{(v, i) : f(v, i) = 0\} = \{(v, i) : v - Ri = 0\}$$

This says: "The resistor R is the set of all voltage-current pairs $(v, i)$ that satisfy $v = Ri$."

### Form 2: Conductance Form
$$i(t) = G \cdot v(t)$$

Where $G = \frac{1}{R}$ is called **conductance** (measured in Siemens, S, or sometimes mhos, ℧).

Similarly: $i(t) - G \cdot v(t) = 0$

**What's the difference?**
- **Resistance (R)** = how much it opposes current (units: Ohms, Ω)
- **Conductance (G)** = how well it conducts current (units: Siemens, S)

Higher R = harder for current to flow  
Higher G = easier for current to flow

**They're just inverses:** $G = 1/R$ and $R = 1/G$

**When to use which?**
- Use $v = Ri$ when solving for voltage
- Use $i = Gv$ when solving for current
- Both forms are equally valid!

**Students often wonder:** "Why have two ways to say the same thing? Isn't that confusing?"

Actually, it's incredibly useful. When analyzing parallel resistors, conductance makes the math much easier. When analyzing series resistors, resistance is simpler. Your professor will show you this pattern repeatedly. For now, just know both exist and mean the same thing.

---

## A Simple Example (Every Step Shown)

Let's work through a problem together. Don't skip ahead — follow each step and make sure it makes sense.

**Question:** A resistor has R = 100Ω. If we apply V = 5V across it, what current flows?

**Solution:**

Step 1: Write Ohm's Law
$$V = IR$$

**Pause:** Make sure you understand what this equation says. Voltage equals current times resistance.

Step 2: Solve for I
$$I = \frac{V}{R}$$

**Common confusion point:** Students sometimes forget to rearrange before substituting. Always solve symbolically first, then plug in numbers.

Step 3: Substitute values
$$I = \frac{5V}{100\Omega}$$

Step 4: Calculate
$$I = 0.05 A = 50 mA$$

**Answer:** 50 milliamperes flows through the resistor.

**Check:** Does this make sense? Small current for medium voltage and large resistance — yes! ✓

---

## GOING SLIGHTLY DEEPER: Real Resistors

### One Real-World Application

**LED current limiting:**

LEDs need around 20mA to light up properly. If you connect a 5V battery directly to an LED (which has very low resistance), it would draw huge current and burn out instantly!

**Solution:** Add a resistor in series.

Required R = $\frac{V_{supply} - V_{LED}}{I_{desired}} = \frac{5V - 2V}{0.02A} = 150\Omega$

Use a standard 150Ω resistor, and your LED is safe!

### One Mathematical Insight

Why do we call the relationship "linear"?

In A-Level maths, you learned that a linear relationship has the form $y = mx + c$.

For Ohm's Law: $V = R \cdot I + 0$

- Slope (m) = R
- Y-intercept (c) = 0 (passes through origin)

This is why we plot it as a **straight line** and call it a **linear resistor**.

---

## PRACTICE

**Worked Example:**

A 2.2kΩ resistor has 11V across it. Find the current.

**Step 1:** Convert kΩ to Ω
$$2.2k\Omega = 2200\Omega$$

**Step 2:** Use Ohm's Law
$$I = \frac{V}{R} = \frac{11V}{2200\Omega}$$

**Step 3:** Calculate
$$I = 0.005A = 5mA$$

---

**Your Turn:**

A resistor has R = 470Ω and carries I = 10mA. What's the voltage across it?

**Hint:** Use $V = IR$ and remember to convert mA to A first!

<details>
<summary>Click for answer</summary>

Step 1: Convert mA to A
$$10mA = 0.01A$$

Step 2: Apply Ohm's Law
$$V = IR = 0.01A \times 470\Omega = 4.7V$$

**Answer:** 4.7 Volts
</details>


---

## Why You Care: Real-World Applications in EEE

### 1. LED Circuit Design
Every LED circuit needs a current-limiting resistor. Without it, the LED draws excessive current and burns out. Ohm's Law lets you calculate the exact resistor value needed.

### 2. Sensor Interface Circuits
Temperature sensors, light sensors (LDRs), and strain gauges are all resistors whose resistance changes with physical quantities. Understanding linear resistor behavior is the foundation for sensor circuit design.

### 3. Power Supply Design
Every power supply uses resistors for voltage division, current limiting, and feedback control. These are all based on Ohm's Law.

### 4. Signal Processing
In amplifiers and filters (which you'll study in later courses), resistors set gain, bandwidth, and frequency response. All calculations start with $v = iR$.

### 5. Digital Logic Gates
Even in digital circuits, resistors are used for pull-up/pull-down configurations, termination, and current limiting. Understanding their linear behavior is essential.

**The bottom line:** Ohm's Law and linear resistors are the foundation of EVERY circuit you'll ever design or analyze in your EEE career. Master this, and everything else builds naturally from here.

[[visual:v6]]

[[visual:v7]]

[[visual:v8]]

---

## Connection to Future Courses

- **Analog Electronics:** Resistors bias transistors and set amplifier gain
- **Power Systems:** Transmission line resistance affects power loss
- **Control Systems:** Resistors in feedback networks determine system stability
- **Communications:** Matching resistors maximize signal transfer
- **Embedded Systems:** Pull-up resistors configure microcontroller pins

Linear resistors appear everywhere. This concept is truly foundational.

---

## Summary: The Essential Points

1. **Voltage pushes, current flows, resistance opposes** — like water pressure, flow, and pipe narrowness
2. **Ohm's Law: $v = Ri$ or $i = Gv$** — the fundamental linear relationship
3. **v-i characteristic is a straight line through the origin** — that's what makes it "linear"
4. **Conductance $G = 1/R$** — two ways to describe the same relationship
5. **Real resistors satisfy Ohm's Law almost precisely** — an excellent model for metallic materials
6. **This is the foundation of all circuit analysis** — everything builds from here

Master these concepts, and you'll have a solid foundation for the rest of circuit analysis!
4. **Wrong proportionality:** Thinking current decreases when voltage increases → no! They're directly proportional

---

## Summary

**Ohm's Law tells us:**
- Voltage and current are **proportional** (V = IR)
- Resistance is the **proportionality constant**
- Graphically: straight line through origin
- Two forms: $V = IR$ (resistance) or $I = GV$ (conductance)

**Next concept:** Now that we know what resistors do (oppose current), we'll explore what happens to the **power** (energy) when current flows through them.

[[visual:v9]]

[[visual:v10]]

[[visual:v11]]

[[visual:v12]]

