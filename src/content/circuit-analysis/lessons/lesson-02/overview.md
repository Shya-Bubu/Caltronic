# General Resistive Circuit Analysis

## Welcome to Systematic Circuit Analysis

In Lesson 01, you learned about individual circuit elements—resistors, sources, and their characteristics. Now comes the exciting part: **putting them together** into real circuits and analyzing them systematically.

This lesson introduces the powerful tools that professional engineers use every day to solve complex circuits efficiently and reliably.

---

## The Challenge

Consider a circuit with 10 resistors and 3 voltage sources. How do you find all the currents and voltages?

**The brute force approach**:
- Write equations by inspection
- Try to combine resistors
- Get confused about what's in series vs parallel
- Eventually give up or make errors

**The systematic approach** (what you'll learn):
- Apply Kirchhoff's Laws
- Choose either Nodal or Mesh Analysis
- Write equations mechanically
- Solve (by hand or computer)
- Get the right answer every time!

---

## Learning Journey

### Foundation: Kirchhoff's Laws

Before any systematic method, you need to master:
- **KCL**: Current in = Current out (at every node)
- **KVL**: Voltages around any loop sum to zero

These aren't just rules—they're physical laws based on conservation of charge and energy.

### Systematic Methods: Nodal and Mesh Analysis

Two complementary approaches:
- **Nodal Analysis**: Write KCL at nodes, solve for voltages
- **Mesh Analysis**: Write KVL around meshes, solve for currents

Both methods work; the choice depends on the circuit structure.

### Simplification: Superposition and Equivalents

For insight and simplification:
- **Superposition**: Break complex problems into simple ones
- **Thévenin/Norton**: Replace complex networks with simple equivalents

### Application: Maximum Power Transfer

The practical culmination:
- When does a load receive maximum power?
- How do we match source to load?

---

## Prerequisites

From Lesson 01, you should understand:
- ✅ Ohm's Law (V = IR)
- ✅ V-I characteristics
- ✅ Series and parallel connections
- ✅ Voltage and current sources
- ✅ Power calculations (P = VI)

---

## What You'll Be Able to Do

After completing this lesson:

1. **Apply Kirchhoff's Laws** correctly to any circuit topology
2. **Use Nodal Analysis** to solve circuits with many parallel branches
3. **Use Mesh Analysis** to solve circuits with many series elements
4. **Apply Superposition** to analyze multi-source circuits
5. **Find Thévenin/Norton equivalents** of any linear network
6. **Calculate maximum power transfer** conditions
7. **Choose the most efficient method** for any given circuit

---

## Concept Flow

```
Kirchhoff's Laws (KVL & KCL)
         ↓
    ┌────┴────┐
    ↓         ↓
 Nodal     Mesh
Analysis   Analysis
    ↓         ↓
    └────┬────┘
         ↓
  Superposition
         ↓
Thévenin & Norton
         ↓
Maximum Power Transfer
```

---

## Tips for Success

1. **Master KVL/KCL first** - Everything else builds on these
2. **Practice the systematic steps** - Don't skip steps even if it seems obvious
3. **Check your answers** - Use power balance: source power = dissipated power
4. **Know when to use which method** - Nodal vs Mesh vs Thévenin
5. **Draw neat diagrams** - Label everything clearly

Let's begin with the foundation: Kirchhoff's Laws!
