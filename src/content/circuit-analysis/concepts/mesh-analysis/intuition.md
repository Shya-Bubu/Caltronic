# Mesh Current Method (Mesh Analysis)

## The Dual of Nodal Analysis

If nodal analysis focuses on **where** (voltage at nodes), mesh analysis focuses on **what flows** (current around loops).

Both methods solve the same circuits—they're just different perspectives!

---

## The Core Idea

Instead of tracking voltages at nodes, define **mesh currents** that circulate around each mesh (inner loop).

**Why mesh currents?**
- Once you know mesh currents, you can find ANY branch current
- KVL naturally applies to loops
- Fewer unknowns for circuits with many series elements

---

## A Racetrack Analogy

Imagine a race track with multiple lanes that share common segments.

**Mesh currents** are like cars in each lane:
- Each lane has a car going around continuously
- Where lanes overlap, both cars pass through
- The total traffic on a shared segment = sum of cars from each lane

In circuits:
- Each mesh has a circulating current
- Shared branches carry the difference of adjacent mesh currents

---

## What Is a Mesh?

A **mesh** is a loop that doesn't contain any other loops inside it.

Think of it as the "windows" in a circuit when drawn flat on paper.

```
    ┌────────┬────────┐
    │        │        │
    │  M₁    │  M₂    │   ← Two meshes (M₁ and M₂)
    │        │        │
    └────────┴────────┘
```

**Important**: Mesh analysis only works for **planar circuits** (circuits that can be drawn on paper without crossing wires).

---

## The Systematic Procedure

### Step 1: Identify All Meshes

Draw the circuit flat and find all the "windows."

### Step 2: Assign Mesh Currents

Define a current for each mesh, typically clockwise:
- $i_1$ for mesh 1
- $i_2$ for mesh 2
- etc.

### Step 3: Write KVL for Each Mesh

Around each mesh, sum voltage drops = 0.

For a resistor in only one mesh:
$$V = i_{mesh} \cdot R$$

For a resistor shared by two meshes:
$$V = (i_{this mesh} - i_{other mesh}) \cdot R$$

### Step 4: Solve the Equations

You get M equations for M meshes. Solve!

---

## Simple Example

```
        R₁=2Ω
    ┌────/\/\/────┐
    │             │
   (+)           │
   12V           R₂=4Ω
   (-)           │
    │             │
    └─────────────┘
       
       i₁ ↻ (clockwise)
```

**One mesh**: Just one loop!

**KVL for mesh 1** (clockwise):
$$+12 - i_1 \cdot 2 - i_1 \cdot 4 = 0$$
$$12 = 6i_1$$
$$i_1 = 2A$$

---

## Two-Mesh Example

```
        R₁=4Ω         R₂=2Ω
    ┌────/\/\/────┬────/\/\/────┐
    │             │             │
   (+)           R₃=6Ω        (-)
   24V            │            8V
   (-)           │            (+)
    │             │             │
    └─────────────┴─────────────┘
       
       i₁ ↻        i₂ ↻
```

**Mesh 1** (left, clockwise):
$$+24 - 4i_1 - 6(i_1 - i_2) = 0$$
$$24 = 10i_1 - 6i_2 \quad ...(1)$$

**Mesh 2** (right, clockwise):
$$-6(i_2 - i_1) - 2i_2 + 8 = 0$$
$$8 = -6i_1 + 8i_2 \quad ...(2)$$

From (2): $i_1 = \frac{8i_2 - 8}{6} = \frac{4i_2 - 4}{3}$

Substitute into (1):
$$24 = 10 \cdot \frac{4i_2 - 4}{3} - 6i_2$$
$$72 = 40i_2 - 40 - 18i_2$$
$$112 = 22i_2$$
$$i_2 = \frac{112}{22} = \frac{56}{11} \approx 5.09A$$
$$i_1 = \frac{4 \times 5.09 - 4}{3} \approx 5.45A$$

**Branch current through R₃**: $i_1 - i_2 = 5.45 - 5.09 = 0.36A$ (downward)

---

## Handling Current Sources: The Supermesh

What if a current source is in a branch?

**Problem**: Current sources don't have a fixed voltage—we can't write KVL through them directly.

**Solution**: Create a **supermesh** that goes around the current source!

```
        R₁              R₂
    ┌────/\/\/────┬────/\/\/────┐
    │             │             │
   Vs            3A↑           R₃
    │             │             │
    └─────────────┴─────────────┘
       
       i₁ ↻        i₂ ↻
```

**Supermesh**: Combine meshes 1 and 2, going around the outside.

**Equations**:
1. **Supermesh KVL**: Trace around both meshes, skipping the current source
2. **Constraint**: $i_2 - i_1 = 3A$ (the current source sets the difference)

---

## When to Use Mesh Analysis

### Best Situations
✅ Circuits with many voltage sources (easy—just add to KVL)
✅ Circuits with many series elements
✅ Planar circuits (no crossing wires)
✅ When you need currents, not voltages

### Less Ideal Situations
❌ Current sources (need supermesh)
❌ Non-planar circuits (can't define meshes)
❌ More meshes than nodes

---

## The Inspection Method

For circuits with only voltage sources and resistors, write mesh equations by inspection:

**Matrix form**: $\mathbf{R} \cdot \mathbf{i} = \mathbf{v}$

Where:
- $R_{ii}$ = Sum of resistances in mesh i
- $R_{ij}$ = −(resistance shared between meshes i and j)
- $v_k$ = Sum of voltage rises in mesh k

---

## Mesh vs Nodal: Comparison

| Aspect | Nodal | Mesh |
|--------|-------|------|
| Variables | Node voltages | Mesh currents |
| Uses | KCL | KVL |
| Favors | Current sources, parallel | Voltage sources, series |
| Special case | Supernode | Supermesh |
| Limitation | None | Planar circuits only |

---

## Summary

| Step | Action |
|------|--------|
| 1 | Identify all meshes (inner loops) |
| 2 | Assign mesh currents (usually clockwise) |
| 3 | Write KVL for each mesh |
| 4 | Use supermesh for current sources |
| 5 | Solve the system |
| 6 | Find branch currents from mesh currents |

**The Magic**: M meshes give M equations in M unknowns—always solvable for planar circuits!
