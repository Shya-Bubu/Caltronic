# Constitutive Relations

## Conservation Laws Need a Partner

In the previous concept, you learned that KCL and KVL give us the **structure** of circuit equations—they tell us that currents must balance and voltages must sum to zero. But try to solve a circuit using only KCL and KVL:

**KCL at node**: $i_1 = i_2$
**KVL around loop**: $v_1 + v_2 = V_s$

Great... but what's the relationship between $v_1$ and $i_1$? Between $v_2$ and $i_2$?

**We need more equations!** These come from **constitutive relations**—the equations that describe how specific components behave.

---

## What is a Constitutive Relation?

A constitutive relation answers the question:

> "For this specific component, how do voltage and current relate?"

Think of it like this:
- **Conservation laws** = The rules of the game (universal)
- **Constitutive relations** = How each player behaves (component-specific)

---

## The Water Analogy (One More Time!)

Let's use water to understand constitutive relations:

### The Pipe (Resistor)

```
    Pressure P1                Pressure P2
         │                          │
         ▼                          ▼
    ════════════════════════════════════
         Narrow Pipe (Resistance R)
    ════════════════════════════════════
                    ──────►
                   Flow Q
```

**Observation**: The flow depends on the pressure difference AND the pipe's resistance.

**Constitutive Relation** (Poiseuille's Law simplified):
$$Q = \frac{P_1 - P_2}{R_{pipe}}$$

This is exactly Ohm's Law! The pipe doesn't care about conservation—it just relates flow to pressure difference through its own properties.

### The Flexible Tank (Capacitor)

```
    ┌────────────────────┐
    │  Flexible membrane │
    │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ ← Stretches with pressure
    │                    │
    │      Water         │
    │                    │
    └────────────────────┘
         Pressure P
```

**Observation**: The tank stores water. How much flow it takes depends on how fast the pressure changes.

**Constitutive Relation**:
$$Q_{in} = C_{tank} \frac{dP}{dt}$$

where $C_{tank}$ is the tank's "capacitance" (flexibility). More flexible = more capacity to absorb flow when pressure changes.

### The Water Wheel (Inductor)

```
         Flow Q
           │
           ▼
        ╭─────╮
       ╱  ◯◯◯  ╲   ← Heavy water wheel
      │   ◯◯◯   │     (has inertia)
       ╲  ◯◯◯  ╱
        ╰─────╯
           │
           ▼
```

**Observation**: The heavy wheel resists changes in flow rate due to inertia.

**Constitutive Relation**:
$$P_{across} = L_{wheel} \frac{dQ}{dt}$$

It takes pressure to accelerate the flow (overcome inertia).

---

## Electrical Constitutive Relations

Now let's translate to circuits:

### Resistor: Ohm's Law

**The Rule**: Current is proportional to voltage.

$$v = iR \quad \text{or} \quad i = \frac{v}{R} = Gv$$

where $G = 1/R$ is conductance.

```
        ───►  i
    ─────/\/\/\/─────
       +  v   -
           R
```

**Properties**:
- **Memoryless**: Output depends only on current input
- **Algebraic**: No derivatives, no integrals
- **Dissipative**: Power $P = vi = i^2R = v^2/R \geq 0$ always

**Physical Meaning**: Collisions of electrons with the material lattice cause energy loss (heat).

---

### Capacitor: Charge Storage

**The Rule**: Current is proportional to the rate of voltage change.

$$i = C\frac{dv}{dt}$$

Or in integral form: $v = \frac{1}{C}\int i \, dt$

```
       ───►  i
    ─────┤├─────
       +  v  -
          C
```

**Properties**:
- **Has memory**: Voltage depends on history of current
- **Differential**: Involves derivatives
- **Energy storage**: Stores energy in electric field $W = \frac{1}{2}Cv^2$

**Physical Meaning**: Charge accumulates on plates, creating an electric field that stores energy.

**Key Insight**: A capacitor **resists changes in voltage**. Why? If voltage tries to change instantly, that would require infinite current ($i = C \cdot \infty$), which is impossible.

---

### Inductor: Flux Storage

**The Rule**: Voltage is proportional to the rate of current change.

$$v = L\frac{di}{dt}$$

Or in integral form: $i = \frac{1}{L}\int v \, dt$

```
       ───►  i
    ─────⊃⊃⊃⊃─────
       +  v  -
          L
```

**Properties**:
- **Has memory**: Current depends on history of voltage
- **Differential**: Involves derivatives
- **Energy storage**: Stores energy in magnetic field $W = \frac{1}{2}Li^2$

**Physical Meaning**: Current creates a magnetic field, and changing that field induces a back-EMF.

**Key Insight**: An inductor **resists changes in current**. If current tries to change instantly, that would require infinite voltage.

---

## Why Constitutive Relations Complete the Model

Let's solve a real circuit:

```
        R
    ─┬─/\/\/─┬─
     │       │
    (+)     ═╪═ C
    Vs       │
     │       │
    ─┴───────┴─
```

**Conservation Laws Give Us**:
- KCL: Current through R = Current into C
- KVL: $V_s = v_R + v_C$

**Constitutive Relations Give Us**:
- Resistor: $v_R = i \cdot R$
- Capacitor: $i = C\frac{dv_C}{dt}$

**Now Combine**:
$$V_s = iR + v_C = RC\frac{dv_C}{dt} + v_C$$

**One equation, one unknown ($v_C$)—solvable!**

Without constitutive relations, we'd just have:
"Current through R equals current through C, and their voltages sum to $V_s$"—completely unsolvable!

---

## Linear vs Nonlinear Constitutive Relations

### Linear Components (Superposition Works!)

| Component | Relation | Domain |
|-----------|----------|--------|
| Resistor | $v = iR$ | Algebraic |
| Capacitor | $i = C\frac{dv}{dt}$ | Time/Frequency |
| Inductor | $v = L\frac{di}{dt}$ | Time/Frequency |

All these are **linear**—double the input, double the output.

### Nonlinear Components (The Real World)

| Component | Relation | Notes |
|-----------|----------|-------|
| Diode | $i = I_s(e^{v/V_T} - 1)$ | Exponential! |
| MOSFET | $i_D = \frac{k}{2}(v_{GS} - V_{TH})^2$ | Square law |
| Varactor | $C(v) = \frac{C_0}{(1 + v/\phi)^m}$ | Voltage-dependent capacitance |

Nonlinearity means:
- Superposition doesn't work
- Frequency mixing (harmonics, intermodulation)
- Potentially chaotic behavior

---

## The Constitutive Relation Zoo

### Ideal Components

```
Resistor:     v = iR         (memoryless, dissipative)
Capacitor:    q = Cv         (stores charge)
Inductor:     φ = Li         (stores flux)

Voltage source: v = Vs(t)    (forces voltage)
Current source: i = Is(t)    (forces current)
```

### Controlled Sources

```
VCVS:  v2 = μ·v1          (voltage-controlled voltage)
CCCS:  i2 = β·i1          (current-controlled current)
VCCS:  i2 = gm·v1         (voltage-controlled current - transistor!)
CCVS:  v2 = rm·i1         (current-controlled voltage)
```

### Ideal Switches

```
Open:   i = 0  (any voltage)
Closed: v = 0  (any current)
```

Switching between these creates discontinuities that require careful handling!

---

## Choosing the Right Constitutive Relation

### When Does the Simple Model Work?

| Component | Simple Model | Fails When |
|-----------|--------------|------------|
| Resistor ($v = iR$) | Most situations | High frequency (parasitic L, C), high power (temperature) |
| Capacitor ($i = C\frac{dv}{dt}$) | Most situations | Near self-resonance (parasitic L), high voltage (dielectric breakdown) |
| Inductor ($v = L\frac{di}{dt}$) | Most situations | Near self-resonance (parasitic C), saturation (current limit) |

### When to Use Nonlinear Models

- **Diodes/transistors**: Almost always nonlinear
- **Large signals**: When signal swings are comparable to bias
- **Switching circuits**: Need on/off behavior
- **Precision work**: When 1% matters

### When to Use Complex Models

SPICE uses sophisticated models:
- **BSIM4 for MOSFETs**: 300+ parameters
- **Gummel-Poon for BJTs**: 40+ parameters
- **Parasitic-aware models**: Include package effects

---

## Summary

> **Constitutive relations tell us how specific components behave. Combined with conservation laws, they give us complete, solvable circuit equations.**

The Two Pillars of Circuit Modeling:

| Pillar | What It Provides | Examples |
|--------|------------------|----------|
| **Conservation Laws** | Universal structure | KCL, KVL |
| **Constitutive Relations** | Component behavior | Ohm's law, capacitor/inductor equations |

Key constitutive relations to remember:

| Component | Relation | Energy |
|-----------|----------|--------|
| Resistor | $v = iR$ | Dissipates: $P = i^2R$ |
| Capacitor | $i = C\frac{dv}{dt}$ | Stores: $W = \frac{1}{2}Cv^2$ |
| Inductor | $v = L\frac{di}{dt}$ | Stores: $W = \frac{1}{2}Li^2$ |

In the next concept, we'll learn how to **validate** our models to ensure they actually represent reality!
