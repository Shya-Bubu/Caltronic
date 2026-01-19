# Superposition Principle - Engineering Perspective

## Professional Application

### Complete Workflow

1. **Verify linearity**: Ensure all elements are linear (R, L, C)
2. **List all independent sources**: Count voltage and current sources
3. **Analyze each source individually**:
   - Keep one source
   - Replace voltage sources with shorts
   - Replace current sources with opens
   - Solve simplified circuit
4. **Combine results**: Add contributions algebraically
5. **Calculate derived quantities**: Power, energy after summing V and I

---

## Detailed Example: Three Sources

```
           R₁=3Ω        R₂=6Ω
    ┌──────/\/\/────┬────/\/\/────┐
    │               │             │
   (+)             R₃=2Ω        2A↑
   18V              │             │
   (-)             │             │
    │               │             │
    └───────────────┴─────────────┘
                    │
                   (+)
                   12V
                   (-)
                    │
                   ─┴─ GND
```

**Goal**: Find V across R₃

### Source 1: 18V Acting Alone

Kill 12V (short) and 2A (open):

```
           3Ω          6Ω
    ┌──────/\/\/────┬────/\/\/────○ open
    │               │
   18V             2Ω
    │               │
    └───────────────┴────short────
```

2Ω is in series with 3Ω (no current through 6Ω branch—it's open):
Wait, let me reconsider the topology...

Actually with 12V shorted, 2Ω connects to ground. With 2A opened, right side is disconnected.

Current: $I = \frac{18}{3+2} = 3.6A$

$V_{R3}^{(18V)} = 3.6 \times 2 = 7.2V$ (+ at junction)

### Source 2: 12V Acting Alone

Kill 18V (short) and 2A (open):

```
           3Ω          6Ω
    ○ short ────────┬────/\/\/────○ open
                    │
                   2Ω
                    │
                   12V
                    │
                   GND
```

6Ω branch open, 3Ω shorted:
$I = \frac{12}{2} = 6A$

$V_{R3}^{(12V)} = 6 \times 2 = 12V$ (+ at junction)

### Source 3: 2A Acting Alone

Kill 18V and 12V (both short):

```
           3Ω          6Ω
    ○ short ────────┬────/\/\/────┐
                    │             │
                   2Ω            2A
                    │             │
                   short──────────┘
```

2A flows through 6Ω and the parallel combination of 3Ω||2Ω:

3Ω||2Ω = $\frac{3 \times 2}{3+2} = 1.2Ω$

Total R seen by 2A: $6 + 1.2 = 7.2Ω$

Voltage across parallel section: $V = 2 \times 1.2 = 2.4V$

$V_{R3}^{(2A)} = 2.4V$ (+ at junction)

### Total

$$V_{R3} = 7.2 + 12 + 2.4 = 21.6V$$

---

## Common Scenarios

### Voltage Divider with Two Sources

```
    V₁ ───┬─── R₁ ───┬─── R₂ ───┬─── V₂
          │         │         │
         GND       V_out     GND
```

Using superposition:
$$V_{out} = V_1 \cdot \frac{R_2}{R_1+R_2} + V_2 \cdot \frac{R_1}{R_1+R_2}$$

This is the **weighted average** of the two source voltages!

### Current Source with Load

When a current source feeds a resistive network:
- The current distributes according to resistance ratios
- Other voltage sources affect the node voltages but not the current source's output

---

## Dependent Sources

**Important**: Dependent sources are NEVER turned off!

Why? They depend on circuit variables, not external inputs.

Procedure:
1. Turn off only INDEPENDENT sources
2. Keep all dependent sources active
3. Express dependent source value in terms of the controlling variable

### Example with VCCS

```
    V_s ───R₁───┬───R₂───○
                │
               g·v₁  (dependent current source)
                │
               GND
```

When analyzing with V_s:
- Keep g·v₁ active
- Express v₁ in terms of node voltages
- Solve as usual

---

## Efficiency Tips

### When Superposition Is Efficient

1. **Two sources, want contribution of each**: Perfect use case
2. **One source changed frequently**: Solve once for each source, scale results
3. **Understanding circuit behavior**: See how each source affects output

### When Nodal/Mesh Is Better

1. **Many sources**: 5 sources = 5 separate analyses with superposition
2. **Just need final answer**: Direct methods faster
3. **Power calculations**: Need total V and I anyway

---

## Sign Conventions

### Combining Contributions

Pay attention to:
- Reference direction for currents
- Polarity for voltages

If two sources create current in same direction: **ADD**
If two sources create current in opposite directions: **SUBTRACT**

### Example

Source 1 gives $I_R = 2A$ (rightward)
Source 2 gives $I_R = -3A$ (rightward reference, so actually leftward)

Total: $I_R = 2 + (-3) = -1A$ (leftward)

---

## Verification Methods

### Check with Full Circuit Analysis

After superposition, verify:
1. Do KCL at each node
2. Do KVL around each loop
3. Check power balance

### Quick Sanity Checks

- Current from a lone voltage source into a pure resistive network must be positive
- A current source's current must equal the sum of currents through parallel branches
- Total power delivered must equal total power absorbed

---

## Summary Table

| Source Type | "Off" Equivalent |
|-------------|------------------|
| Ideal voltage source | Short circuit (V=0) |
| Ideal current source | Open circuit (I=0) |
| Dependent source | KEEP ACTIVE |

| Works For | Doesn't Work For |
|-----------|------------------|
| Voltage (linear) | Power (nonlinear) |
| Current (linear) | Energy (nonlinear) |
| Linear circuits | Nonlinear elements |
