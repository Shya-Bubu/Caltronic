# Conservation Laws and Balance Equations

## The Universe's Bookkeeping

Here's something profound: the universe is an obsessive accountant. Some things simply cannot be created or destroyed—they can only move from place to place. These conserved quantities give us the foundation for all physics-based models.

**What's conserved?**
- **Charge**: Electrons can't appear from nothing
- **Energy**: Can't create free energy (sorry, perpetual motion enthusiasts)
- **Mass**: Doesn't disappear (at normal scales)
- **Momentum**: Motion transfers, doesn't vanish

For electrical engineers, charge conservation and energy conservation are our bread and butter—they give us **Kirchhoff's Current Law** and **Kirchhoff's Voltage Law**.

---

## The Water Analogy Returns

Remember our water tank? Let's use it to understand conservation laws deeply.

### Conservation of Water (Mass)

```
    Water In: Qin = 5 L/min
           │
           ▼
    ┌──────────────┐
    │              │
    │    Tank      │  Volume = V(t)
    │              │
    │              │
    └──────┬───────┘
           │
           ▼
    Water Out: Qout = 3 L/min
```

**The Conservation Statement**:
> "Water doesn't appear from nothing or vanish into nothing inside the tank."

**Mathematical Translation**:
$$\frac{d(\text{water in tank})}{dt} = \text{flow in} - \text{flow out}$$

$$\frac{dV}{dt} = Q_{in} - Q_{out} = 5 - 3 = 2 \text{ L/min}$$

The tank fills at 2 liters per minute. That's it! Conservation gave us the equation automatically.

---

## Charge Conservation: Kirchhoff's Current Law

Now replace water with electric charge:

```
       Current In: i1
           │
           ▼
    ┌──────●──────┐
    │      │      │
   i2→     │     ←i3
    │      │      │
    └──────┴──────┘
           │
           ▼
       Current Out: i4
```

**The Conservation Statement**:
> "Charge doesn't accumulate at a node in a circuit (for practical frequencies)."

**Mathematical Translation (KCL)**:
$$\sum i_{entering} = \sum i_{leaving}$$
$$i_1 + i_2 = i_3 + i_4$$

Or in the form engineers prefer:
$$\sum_k i_k = 0 \quad \text{(with sign convention)}$$

### Why Does This Work?

Think about it: if more current entered a node than left, where would those electrons go? They'd pile up, creating an enormous charge buildup (like static electricity, but worse). This would create huge voltages that would immediately push the charges out again.

In normal circuits operating at normal frequencies, this equilibrium happens so fast that we can say currents always balance—**instantaneously**.

---

## Energy Conservation: Kirchhoff's Voltage Law

Energy conservation gives us our second fundamental law.

### The Hiking Analogy

Imagine hiking around a mountain:

```
          Start/End
              A
             /\
            /  \  
      +50m /    \ -30m
          /      \
         B────────C
             -20m
```

If you start at point A, hike to B (gain 50m elevation), then to C (lose 30m), then back to A (lose 20m), what's your total elevation change?

**Zero!** You're back where you started.

This is exactly what KVL says about voltage around a loop.

### Voltage Around a Loop

```
       +5V
    ──┬─+  -┬──
      │     │
    + │     │ -
    2V│     │3V
    - │     │ +
      │     │
    ──┴─────┴──
```

**The Conservation Statement**:
> "If you walk around any closed loop, the total voltage rise equals the total voltage drop."

**Mathematical Translation (KVL)**:
$$\sum_k v_k = 0 \quad \text{(around any closed loop)}$$

For our example: $+5 - 2 - 3 = 0$ ✓

### Why Does This Work?

Voltage is **potential difference**—like elevation. If you could go around a loop and gain net voltage, you could extract infinite energy by going around repeatedly. That violates energy conservation!

KVL is really saying: **no free energy from going in circles**.

---

## The General Balance Equation

Both KCL and KVL are special cases of a universal pattern:

$$\boxed{\frac{d(\text{stored quantity})}{dt} = \text{inflow} - \text{outflow} + \text{generation}}$$

### Applying the Pattern

| System | Stored | Inflow | Outflow | Generation |
|--------|--------|--------|---------|------------|
| Water tank | Volume | Pump in | Drain out | Rain (external source) |
| Capacitor | Charge (Q = CV) | Current in | Current out | None |
| Thermal mass | Heat (Q = mcT) | Heat from hot side | Heat to cold side | Electrical heating |
| Node (KCL) | 0 (instantaneous) | Currents in | Currents out | None |

### Why "Generation" Matters

Sometimes quantities don't just flow—they can be created or destroyed:
- **Heat can be generated** by resistors (I²R losses)
- **Chemical reactions** can produce or consume substances
- **Sources** actively inject quantities into the system

In pure electrical circuits with passive components, there's usually no generation term—energy enters only through sources.

---

## Conservation in Action: RC Circuit

Let's derive the governing equation for a simple RC circuit using only conservation laws.

```
        R
    ─┬─/\/\/─┬─
     │       │
    (+)      │
    Vin     ═╪═ C    Vout = vc
     │       │
    ─┴───────┴─
```

### Step 1: Identify What's Conserved

- **Charge** at the top node
- **Energy** around any loop

### Step 2: Apply KCL at the Top Node

Current into node = Current out of node

Current through R: $i_R = \frac{V_{in} - v_C}{R}$

Current into C: $i_C = C\frac{dv_C}{dt}$

**KCL**: $i_R = i_C$ (since current must flow through R and into C)

$$\frac{V_{in} - v_C}{R} = C\frac{dv_C}{dt}$$

### Step 3: Rearrange

$$\frac{dv_C}{dt} = \frac{V_{in} - v_C}{RC} = \frac{1}{RC}V_{in} - \frac{1}{RC}v_C$$

**We derived the governing ODE using only conservation!**

---

## The Power of Conservation Laws

### Why They're So Useful

1. **Universal**: Same laws work for any circuit topology
2. **Automatic equation generation**: Number of equations = number of unknowns
3. **Error checking**: Violations indicate mistakes
4. **Physical insight**: Equations have clear physical meaning

### The Modeling Recipe

```
┌─────────────────────────────────────────────────────────────┐
│               CIRCUIT MODELING RECIPE                       │
├─────────────────────────────────────────────────────────────┤
│  1. Label all node voltages and branch currents            │
│  2. Write KCL at each independent node                      │
│  3. Write KVL around each independent loop                  │
│  4. Substitute component relations (Ohm's law, etc.)       │
│  5. Solve the resulting equations                           │
└─────────────────────────────────────────────────────────────┘
```

### How Many Equations?

For a circuit with:
- **n** nodes (including ground)
- **b** branches

You get:
- **n - 1** independent KCL equations
- **b - (n - 1)** independent KVL equations

Total: **b** equations for **b** unknown branch quantities.

---

## Beyond Circuits: Energy Balance

For thermal systems, energy conservation gives us the heat equation:

### Heat Conduction Example

```
    Hot Side                          Cold Side
    T1 = 100°C    Thermal Mass        T2 = 25°C
         │         (capacity C)            │
         │                                 │
         └──────────┬──────────────────────┘
                    │
              Temperature T
```

**Energy Balance**:
$$C\frac{dT}{dt} = \frac{T_1 - T}{R_1} - \frac{T - T_2}{R_2}$$

where $R_1, R_2$ are thermal resistances.

**This is the exact same pattern as the RC circuit!** The math is identical even though the physics is different.

---

## The Control Volume Concept

When applying conservation laws, you must define a **control volume** (or control surface)—the boundary you're tracking across.

### For KCL

```
    ╔══════════════╗
    ║   Control    ║
    ║   Volume     ║
    ║     ●────────║───→ i_out
    ║     │        ║
    ║    i_in      ║
    ╚══════════════╝
         │
         ↓
```

The control volume is the node. Currents cross its boundary.

### For KVL

```
    ╔═══════════════════╗
    ║    + v1 -         ║
    ║   ─────────       ║
    ║   │       │       ║
    ║ + │       │ -     ║
    ║ v2│       │v3     ║
    ║ - │       │ +     ║
    ║   │       │       ║
    ║   ─────────       ║
    ╚═══════════════════╝
```

The control volume is the loop. Voltages sum around its perimeter.

---

## Why Conservation Laws First?

In model building, you always start with conservation laws because:

1. **They're universal** - They don't depend on specific components
2. **They're exact** - No approximations yet
3. **They give structure** - The skeleton of your equations

Then you add **constitutive relations** (component-specific behavior) to complete the model. That's the next concept!

---

## Summary

> **Conservation laws tell us what the universe keeps track of. For circuits, that means charge (KCL) and energy (KVL).**

Key insights:
- **KCL**: Sum of currents at any node = 0 (charge conservation)
- **KVL**: Sum of voltages around any loop = 0 (energy conservation)
- **General form**: Rate of change = In - Out + Generated
- **Control volume**: Define your boundary before applying conservation
- **Conservation laws alone aren't enough** - Need constitutive relations too

These two laws, combined with component equations, let you model any lumped electrical circuit. That's the power of physics!
