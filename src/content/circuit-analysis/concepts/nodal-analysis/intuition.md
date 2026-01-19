# Node Voltage Method (Nodal Analysis)

## The Power of Systematic Thinking

You've learned KCL and KVL. Now comes a systematic method that transforms any circuit—no matter how complex—into a solvable set of equations.

---

## The Core Idea

Instead of tracking individual currents through every wire, focus on **node voltages**.

**Why voltages?**
- Once you know the voltage at each node, you can find ANY current using Ohm's Law
- Node voltages are measured relative to a common reference (ground)
- Fewer unknowns than tracking all currents

---

## A Pressure Analogy

Think of voltage as water pressure at different points in a pipe network.

**The Setup**:
- Ground = Reference pressure (atmospheric)
- Each junction = Node with some pressure
- Pipes = Resistors (restrict flow)

**The Method**:
1. Pick a reference point (ground)
2. Label pressure (voltage) at each junction
3. At each junction: Water in = Water out (KCL)
4. Express flows using pressure differences

This is exactly nodal analysis!

---

## The Systematic Procedure

### Step 1: Identify Nodes

Mark every point where elements connect. All points joined by wire are ONE node.

```
         ┌─────────────────┐
        (1)               (2)
         │                 │
        ───               ───
         │                 │
        (0) ───Ground─── (0)
```

### Step 2: Choose Reference Node

Select one node as **ground** (0V reference):
- Usually the node with most connections
- Or the negative terminal of a voltage source

### Step 3: Label Node Voltages

Assign a voltage variable (v₁, v₂, ...) to each non-reference node.

### Step 4: Write KCL at Each Node

At each non-reference node, write:
$$\sum \text{(currents leaving)} = 0$$

Express currents using Ohm's Law:
$$I = \frac{V_{higher} - V_{lower}}{R}$$

### Step 5: Solve the Equations

You get (N-1) equations for (N-1) unknowns. Solve!

---

## Simple Example

```
         v₁
    ┌────○────┐
    │         │
   10V       4Ω
    │         │
    ▼         │
    ┴ GND     │
              │
              2Ω
              │
              ▼
              ┴ GND
```

**Nodes**: Ground (reference), v₁ (top)

**KCL at v₁**: Current from source = Current through 4Ω + Current through 2Ω

But wait—current from 10V source directly sets v₁ = 10V.

For a more interesting example...

---

## Better Example: Two Nodes

```
         v₁              v₂
    ┌────○────/\/\/────○────┐
    │        2Ω             │
   12V                      4Ω
    │         │             │
    ▼        3Ω            │
    ┴         │             ▼
    GND       ▼             ┴ GND
              ┴ GND
```

**Identify**: 3 nodes (ground + v₁ + v₂)

**KCL at v₁**:
Current from source = Current through 2Ω + Current through 3Ω
$$\frac{12 - v_1}{R_{int}} = \frac{v_1 - v_2}{2} + \frac{v_1 - 0}{3}$$

Wait—this assumes the 12V has internal resistance. Let's redraw for clarity.

---

## Clearer Example

```
    12V
    (+)
     │───┬───────────────────┐
        (v₁)                 │
         │                   │
        2Ω                   │
         │                  3Ω
        (v₂)                 │
         │                   │
        4Ω                   │
         │                   │
     ────┴─────────GND───────┘
```

**Nodes**: GND (reference), v₁ (top), v₂ (middle)

**KCL at v₁**:
Since connected directly to 12V source: v₁ = 12V (no equation needed!)

**KCL at v₂**:
$$\frac{v_1 - v_2}{2} = \frac{v_2 - 0}{4} + \frac{v_2 - 0}{3}$$
$$\frac{12 - v_2}{2} = \frac{v_2}{4} + \frac{v_2}{3}$$
$$\frac{12 - v_2}{2} = v_2 \left(\frac{1}{4} + \frac{1}{3}\right) = v_2 \cdot \frac{7}{12}$$
$$6 - \frac{v_2}{2} = \frac{7v_2}{12}$$
$$6 = \frac{v_2}{2} + \frac{7v_2}{12} = \frac{6v_2 + 7v_2}{12} = \frac{13v_2}{12}$$
$$v_2 = \frac{72}{13} \approx 5.54V$$

---

## Handling Voltage Sources: The Supernode

What if a voltage source connects two non-reference nodes?

```
        v₁        v₂
    ────○───(+5V)───○────
        │           │
       R₁          R₂
        │           │
    ────┴───GND─────┴────
```

**Problem**: We can't write KCL at v₁ or v₂ alone (we don't know the source current).

**Solution**: Treat v₁ and v₂ together as a **supernode**!

**Supernode Equations**:
1. **KCL around supernode**: Currents entering supernode = Currents leaving
2. **Constraint**: v₁ - v₂ = 5V (from the voltage source)

Now you have 2 equations for 2 unknowns.

---

## When to Use Nodal Analysis

### Best Situations
✅ Circuits with many parallel branches
✅ Circuits with current sources (easy—just write them directly)
✅ Circuits where you need voltages, not currents
✅ Circuits with fewer nodes than meshes

### Less Ideal Situations
❌ Many voltage sources (need supernodes)
❌ Circuits where you mainly need currents
❌ More nodes than meshes

---

## The Inspection Method

For circuits with only current sources and resistors, you can write the nodal equations by inspection:

**Matrix form**: $\mathbf{G} \cdot \mathbf{v} = \mathbf{i}$

Where:
- $G_{ii}$ = Sum of conductances connected to node i
- $G_{ij}$ = −(conductance between nodes i and j)
- $i_k$ = Sum of current sources entering node k

---

## Summary

| Step | Action |
|------|--------|
| 1 | Identify all nodes |
| 2 | Choose ground (reference) |
| 3 | Label node voltages |
| 4 | Write KCL at each non-reference node |
| 5 | Use supernodes for floating voltage sources |
| 6 | Solve the linear system |

**The Magic**: Any circuit with N nodes gives (N-1) equations in (N-1) unknowns—always solvable!
