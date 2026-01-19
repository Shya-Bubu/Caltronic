# Kirchhoff's Laws - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **Node** | A point where two or more circuit elements connect |
| **Branch** | A path between two nodes containing one element |
| **Loop** | Any closed path through a circuit |
| **Mesh** | A loop that contains no other loops inside it |
| **KCL** | Sum of currents at any node equals zero |
| **KVL** | Sum of voltages around any closed loop equals zero |

---

## Essential Formulas

| Formula | Application |
|---------|-------------|
| $\sum I_{node} = 0$ | KCL at any node |
| $\sum V_{loop} = 0$ | KVL around any loop |
| Independent KCL equations: $N-1$ | N = number of nodes |
| Independent KVL equations: $B-N+1$ | B = number of branches |

---

## Worked Examples

### Example 1: KCL at a Junction

**Problem**: Find $I_3$ given $I_1 = 5A$ and $I_2 = 2A$.

```
      I₁=5A ↓
            ○
         ↙     ↘
      I₂=2A     I₃=?
```

**Solution**:

Apply KCL at the node:
$$I_1 = I_2 + I_3$$
$$5 = 2 + I_3$$
$$I_3 = 3A$$

---

### Example 2: KVL in a Series Circuit

**Problem**: Find the current I in the circuit.

```
    +12V-          
    ──┤├────┬────/\/\/────┬────/\/\/────
              4Ω              2Ω
                                        │
    ────────────────────────────────────
```

**Solution**:

Apply KVL clockwise:
$$+12 - I(4) - I(2) = 0$$
$$12 = 6I$$
$$I = 2A$$

---

### Example 3: Two-Loop Circuit

**Problem**: Find $I_1$ and $I_2$.

```
        4Ω              2Ω
    ┌──/\/\/──┬──/\/\/──┐
    │         │          │
   (+)       6Ω         │
   24V        │         │
   (-)       │          │
    │         │          │
    └─────────┴──────────┘
```

**Solution**:

Define mesh currents $I_1$ (left loop, CW) and $I_2$ (right loop, CW).

**Mesh 1**:
$$24 - 4I_1 - 6(I_1 - I_2) = 0$$
$$24 = 10I_1 - 6I_2 \quad ...(1)$$

**Mesh 2**:
$$-6(I_2 - I_1) - 2I_2 = 0$$
$$6I_1 = 8I_2$$
$$I_1 = \frac{4}{3}I_2 \quad ...(2)$$

Substitute (2) into (1):
$$24 = 10 \cdot \frac{4}{3}I_2 - 6I_2$$
$$24 = \frac{40}{3}I_2 - 6I_2 = \frac{40-18}{3}I_2 = \frac{22}{3}I_2$$
$$I_2 = \frac{72}{22} = \frac{36}{11} \approx 3.27A$$
$$I_1 = \frac{4}{3} \times \frac{36}{11} = \frac{48}{11} \approx 4.36A$$

---

### Example 4: Circuit with Current Source

**Problem**: Find the voltage across the 3Ω resistor.

```
         ┌───/\/\/───┐
         │    6Ω     │
    ┌────┴────┬──────┴────┐
    │         │           │
   ↑2A       3Ω          6Ω
    │         │           │
    └─────────┴───────────┘
```

**Solution**:

KCL at top node (let V be voltage at top):
$$2 = \frac{V}{6} + \frac{V}{3} + \frac{V}{6}$$
$$2 = \frac{V + 2V + V}{6} = \frac{4V}{6}$$
$$V = 3V$$

Voltage across 3Ω resistor = **3V**

Check: Current through 3Ω = 3/3 = 1A
Current through each 6Ω = 3/6 = 0.5A
Total = 1 + 0.5 + 0.5 = 2A ✓

---

### Example 5: Power Verification

**Problem**: Verify power balance for the circuit.

```
    10V source, 2Ω and 3Ω resistors in series
```

**Solution**:

Current: $I = \frac{10}{2+3} = 2A$

**Power delivered by source**: $P_s = VI = 10 \times 2 = 20W$

**Power absorbed by 2Ω**: $P_1 = I^2 R = 4 \times 2 = 8W$

**Power absorbed by 3Ω**: $P_2 = I^2 R = 4 \times 3 = 12W$

**Check**: $8 + 12 = 20W$ ✓ (Tellegen's theorem satisfied)

---

## Common Exam Mistakes

| Mistake | How to Avoid |
|---------|--------------|
| Wrong current direction | Define direction first, let math give sign |
| Missing a branch in KCL | Count all branches at each node |
| Wrong loop direction | Be consistent—clockwise is standard |
| Forgetting element in KVL | Trace slowly, include every element |
| Sign errors | Use: rise (+), drop (−) consistently |

---

## Quick Solve Strategies

### For Simple Circuits

1. Look for series/parallel combinations first
2. Reduce to single equivalent resistor
3. Find total current, then work backward

### For Complex Circuits

1. Identify number of nodes (N) and branches (B)
2. Choose method: KCL if N-1 < B-N+1, else KVL
3. Write equations systematically
4. Check with power balance

---

## Practice Problems

### Problem 1 (KCL)
Three currents meet at a node: $I_1 = 3A$ (into), $I_2 = 7A$ (out). Find $I_3$ and its direction.

**Answer**: $I_3 = 4A$ (into the node)

### Problem 2 (KVL)
Find the voltage across the 5Ω resistor if a 15V source is in series with 3Ω and 5Ω resistors.

**Answer**: $V_{5Ω} = 15 \times \frac{5}{8} = 9.375V$

### Problem 3 (Combined)
Find all currents in a circuit with 20V source, two 10Ω resistors in parallel, all in series with a 5Ω resistor.

**Answer**: Source current = 2A, each 10Ω carries 1A

---

## Exam Checklist

Before submitting your answer:
- [ ] All currents have defined directions
- [ ] All voltage polarities are marked
- [ ] Number of equations = Number of unknowns
- [ ] Units are correct (A, V, Ω)
- [ ] Power balance verified (if time permits)
