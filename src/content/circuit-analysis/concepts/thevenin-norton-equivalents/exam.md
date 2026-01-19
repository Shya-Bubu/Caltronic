# Thévenin and Norton Equivalents - Exam Preparation

## Key Definitions

| Term | Definition |
|------|------------|
| **$V_{th}$** | Open-circuit voltage (Thévenin voltage) |
| **$R_{th}$** | Thévenin resistance (source-off resistance) |
| **$I_N$** | Short-circuit current (Norton current) |
| **$R_N$** | Norton resistance (= $R_{th}$) |

---

## Essential Formulas

$$R_{th} = \frac{V_{th}}{I_{sc}} = R_N$$

$$I_N = \frac{V_{th}}{R_{th}}$$

$$V_{th} = I_N \cdot R_N$$

---

## Worked Examples

### Example 1: Basic Thévenin

**Problem**: Find Thévenin equivalent.

```
        10Ω          5Ω
    ┌───/\/\/───┬───/\/\/───○ A
    │           │
   30V        15Ω
    │           │
    └───────────┴───────────○ B
```

**Solution**:

**$V_{th}$**: No current through 5Ω (open terminals)
$$V_{th} = 30 \times \frac{15}{10+15} = 30 \times \frac{15}{25} = 18V$$

**$R_{th}$**: Short the 30V
```
        10Ω          5Ω
    ○───/\/\/───┬───/\/\/───○ A
                │
              15Ω
                │
    ○───────────┴───────────○ B
```
$R_{th} = 5 + (10||15) = 5 + 6 = 11Ω$

**Answer**: $V_{th} = 18V$, $R_{th} = 11Ω$

---

### Example 2: Finding Norton Equivalent

**Problem**: Find Norton equivalent for the same circuit.

**Solution**:

$$I_N = \frac{V_{th}}{R_{th}} = \frac{18}{11} = 1.64A$$

$$R_N = R_{th} = 11Ω$$

**Answer**: $I_N = 1.64A$, $R_N = 11Ω$

---

### Example 3: Mixed Sources

**Problem**: Find Thévenin equivalent.

```
        4Ω        
    ┌───/\/\/───┬───○ A
    │           │
   12V         2A↑
    │           │
    └───────────┴───○ B
```

**Solution**:

**$V_{th}$**: Use superposition or KVL
2A flows up through nothing at A (open), so it must flow through 4Ω and 12V.
But wait—2A can't flow into an open circuit!

Let me reconsider: With A-B open, 2A must come from somewhere and return.

Actually, with these connections: 2A enters at B, but A is open. The current source cannot function properly with open terminals.

Let me redraw assuming parallel configuration:
```
        4Ω        
    ┌───/\/\/───┬───○ A
    │           │
   12V         2A↑   R_load
    │           │     │
    └───────────┴─────┴───○ B
```

With A-B open: No path for 2A except through 4Ω and 12V.
KVL: $12 - 4(2) = 12 - 8 = 4V$
But direction? 2A up, so current through 4Ω is 2A left-to-right.
$V_{th} = 12 - 4 \times 2 = 4V$ (A is positive)

Actually: $V_A = 12 + 4 \times 2 = 20V$ if 2A adds to the 12V's effect.

Let me be more careful:
- 12V: positive at top
- 2A: pushes current up

At open circuit, 2A flows through 12V and 4Ω in a loop:
KVL: $-12 + 4 \times 2 + V_{th} = 0$? 

Better: Apply KCL at node A: No current leaves (open), so any current from 4Ω must equal current into 2A source. But current into top of current source = 2A.

So 2A flows through 4Ω (right to left).
$V_A - V_{left} = 4 \times 2 = 8V$
$V_{left} = 12V$ (from voltage source)
$V_A = V_{th} = 12 + 8 = 20V$

**$I_{sc}$**: Short A-B
12V drives $12/4 = 3A$ through 4Ω
2A adds: $I_{sc} = 3 + 2 = 5A$

**$R_{th}$**: $R_{th} = V_{th}/I_{sc} = 20/5 = 4Ω$

Or: Kill sources → $R_{th} = 4Ω$ (current source open, voltage source short)

**Answer**: $V_{th} = 20V$, $R_{th} = 4Ω$

---

### Example 4: With Dependent Source

**Problem**: Find $R_{th}$.

```
        2Ω        vₓ
    ┌───/\/\/───┬───○ A
    │           │
   10V        3vₓ↓
    │           │
    └───────────┴───○ B
```

**Solution**:

$v_x$ is voltage across dependent source = $V_{AB}$.

**$V_{th}$**: Open circuit, $v_x = V_{th}$
KCL at A: $\frac{10-V_{th}}{2} = 3V_{th}$
$10 - V_{th} = 6V_{th}$
$V_{th} = \frac{10}{7} = 1.43V$

**$R_{th}$**: Use test source method
Kill 10V, apply $V_t$ at A-B. Now $v_x = V_t$.
$I_t = \frac{0-V_t}{2} + 3V_t = -0.5V_t + 3V_t = 2.5V_t$
$R_{th} = \frac{V_t}{I_t} = \frac{1}{2.5} = 0.4Ω$

**Answer**: $V_{th} = 1.43V$, $R_{th} = 0.4Ω$

---

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Turning off dependent sources | NEVER turn off dependent sources |
| Wrong source replacement | V-source → short, I-source → open |
| Forgetting to include all resistances | Check all paths between terminals |
| Sign errors in $V_{th}$ | Define polarity clearly, use KVL |

---

## Quick Reference

**To find $V_{th}$**:
1. Leave terminals open
2. Find voltage across terminals
3. Can use any method (nodal, mesh, superposition)

**To find $R_{th}$**:
- **No dependent sources**: Kill independent sources, find R
- **With dependent sources**: Use $R_{th} = V_{th}/I_{sc}$ or test source

**Conversions**:
- $I_N = V_{th}/R_{th}$
- $V_{th} = I_N \times R_N$
- $R_N = R_{th}$

---

## Exam Checklist

- [ ] Correctly identify two terminals
- [ ] Find $V_{th}$ with terminals open
- [ ] Kill sources correctly for $R_{th}$ (if no dependent sources)
- [ ] Use $V_{th}/I_{sc}$ if dependent sources present
- [ ] Convert to Norton if required
- [ ] Check: $V_{th} = I_N \times R_{th}$
