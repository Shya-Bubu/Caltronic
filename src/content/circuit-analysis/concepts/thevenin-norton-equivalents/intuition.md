# Thévenin and Norton Equivalents

## The Power of Simplification

What if you could replace a messy circuit with just two components? That's exactly what Thévenin and Norton equivalents do!

---

## The Big Idea

Any linear circuit, no matter how complex, behaves exactly like:

**Thévenin**: A voltage source ($V_{th}$) in series with a resistor ($R_{th}$)

**Norton**: A current source ($I_N$) in parallel with a resistor ($R_N$)

From the outside, you can't tell the difference between the original circuit and its equivalent!

---

## A Factory Analogy

Imagine you're buying electricity from a power company:

**Your view**: You see two wires coming to your house
**Reality**: Behind the wires is a massive power station with turbines, transformers, and thousands of components

**Do you care about all those details?** No! You just want to know:
1. What voltage arrives at your house? → $V_{th}$
2. How much does the voltage drop when you use more power? → $R_{th}$

That's exactly what Thévenin's theorem captures!

---

## Thévenin Equivalent

Any linear circuit with two terminals can be replaced by:

```
         Rth
    A ○───/\/\/───┬───○ A'
                  │
                 Vth
                  │
    B ○───────────┴───○ B'
```

- **$V_{th}$** (Thévenin voltage): Open-circuit voltage between terminals
- **$R_{th}$** (Thévenin resistance): Resistance seen looking into terminals

---

## Norton Equivalent

The same circuit can also be replaced by:

```
    A ○────┬────────○ A'
           │
          R_N
           │
          I_N↑
           │
    B ○────┴────────○ B'
```

- **$I_N$** (Norton current): Short-circuit current between terminals
- **$R_N$** (Norton resistance): Same as $R_{th}$!

---

## Finding Thévenin Values

### Step 1: Find $V_{th}$ (Open-Circuit Voltage)

Remove the load (leave terminals open).
Find the voltage between terminals A and B.

```
         Complex          
         Circuit      → V_oc = Vth
         
    A ○────────○ +
                  V_oc
    B ○────────○ -
```

### Step 2: Find $R_{th}$ (Thévenin Resistance)

**Method 1 - Kill sources, find R**:
- Turn off all independent sources
- Find resistance between terminals

**Method 2 - Use $V_{th}$ and $I_{sc}$**:
$$R_{th} = \frac{V_{th}}{I_{sc}}$$

---

## Finding Norton Values

### Norton Current

Short the terminals and find the current:

```
         Complex          
         Circuit      → I_sc = I_N
         
    A ○────┬───○
           │
         short
           │
    B ○────┴───○
```

### Norton Resistance

$$R_N = R_{th}$$ (Always the same!)

---

## The Conversion

Thévenin and Norton are related:

$$I_N = \frac{V_{th}}{R_{th}}$$

$$V_{th} = I_N \cdot R_N$$

$$R_{th} = R_N$$

They're just two ways of representing the same circuit!

```
   Thévenin              Norton
        Rth
    ○───/\/\/───┐       ○────┬────○
               │            │
              Vth          R_N ↑I_N
               │            │
    ○──────────┘       ○────┴────○
```

---

## Example: Finding Thévenin Equivalent

```
        6Ω          4Ω
    ┌───/\/\/───┬───/\/\/───○ A
    │           │
   12V         3Ω
    │           │
    └───────────┴───────────○ B
```

### Find $V_{th}$

No current through 4Ω (open circuit), so voltage at junction = voltage at A.

Voltage divider on 6Ω and 3Ω:
$$V_{th} = 12 \times \frac{3}{6+3} = 12 \times \frac{1}{3} = 4V$$

### Find $R_{th}$

Turn off 12V (short it):
```
        6Ω          4Ω
    ┌───/\/\/───┬───/\/\/───○ A
    │           │
   short       3Ω
    │           │
    └───────────┴───────────○ B
```

6Ω || 3Ω = 2Ω, then in series with 4Ω:
$$R_{th} = 2 + 4 = 6Ω$$

### Thévenin Equivalent

```
        6Ω
    A ○───/\/\/───┐
                 │
                4V
                 │
    B ○──────────┘
```

---

## Why This Is Powerful

### Analyzing Different Loads

Original circuit + 10 different loads = 10 complex analyses

Thévenin equivalent + 10 loads = 10 simple voltage dividers!

### Finding Maximum Power Transfer

With Thévenin form, it's easy: Match the load to $R_{th}$!

### Understanding Circuit Behavior

$V_{th}$ tells you the "ideal" output
$R_{th}$ tells you how "stiff" the source is (low $R_{th}$ = strong source)

---

## Summary

| Property | Thévenin | Norton |
|----------|----------|--------|
| Source type | Voltage source | Current source |
| Configuration | Series | Parallel |
| Open-circuit V | $V_{th}$ | $I_N \cdot R_N$ |
| Short-circuit I | $V_{th}/R_{th}$ | $I_N$ |
| Resistance | $R_{th}$ | $R_N = R_{th}$ |

**The Bottom Line**: Any complex linear circuit = Simple two-element model!
