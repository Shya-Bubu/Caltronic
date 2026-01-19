# Thévenin and Norton - Engineering Perspective

## Professional Workflow

### Complete Procedure for Thévenin Equivalent

**Step 1**: Identify the two terminals (port) of interest
**Step 2**: Calculate open-circuit voltage $V_{th}$
**Step 3**: Calculate Thévenin resistance $R_{th}$
**Step 4**: Draw equivalent circuit

---

## Methods for Finding $R_{th}$

### Method 1: Source Deactivation

1. Turn off all independent sources:
   - Voltage sources → short circuit
   - Current sources → open circuit
2. Calculate resistance between terminals
3. Keep dependent sources active (if present)

**Works for**: Circuits without dependent sources (or with them if you handle carefully)

### Method 2: Open-Circuit / Short-Circuit

$$R_{th} = \frac{V_{th}}{I_{sc}}$$

**Works for**: All circuits, especially those with dependent sources

### Method 3: Test Source Method

For circuits with dependent sources:
1. Turn off all independent sources
2. Apply test voltage $V_t$ (or current $I_t$) at terminals
3. Calculate resulting current $I_t$ (or voltage $V_t$)
4. $R_{th} = V_t / I_t$

---

## Detailed Example 1: Resistive Network

```
           R₁=10Ω      R₂=30Ω
    ┌──────/\/\/───┬────/\/\/────○ A
    │              │
   (+)            R₃=20Ω
   40V             │
   (-)            │
    │              │
    └──────────────┴─────────────○ B
```

### Open-Circuit Voltage

No current through R₂ (terminal A is open).
Current through R₁ and R₃:
$$I = \frac{40}{10+20} = \frac{40}{30} = \frac{4}{3}A$$

Voltage across R₃ = $V_A$:
$$V_{th} = I \times R_3 = \frac{4}{3} \times 20 = \frac{80}{3} = 26.67V$$

### Thévenin Resistance

Short the 40V:
```
           10Ω        30Ω
    ┌──────/\/\/───┬────/\/\/────○ A
    │              │
   short         20Ω
    │              │
    └──────────────┴─────────────○ B
```

From A-B: 30Ω in series with (10Ω || 20Ω)
10Ω || 20Ω = $\frac{10 \times 20}{30} = \frac{200}{30} = 6.67Ω$

$$R_{th} = 30 + 6.67 = 36.67Ω$$

### Complete Equivalent

```
        36.67Ω
    A ○───/\/\/───┐
                 │
               26.67V
                 │
    B ○──────────┘
```

---

## Detailed Example 2: With Current Source

```
           4Ω          
    ┌──────/\/\/────┬───○ A
    │               │
   6V              2Ω    3A↑
    │               │   │
    └───────────────┴───┴───○ B
```

### Open-Circuit Voltage

Using superposition:

**Due to 6V alone** (open 3A):
Voltage divider: $V_A^{(6V)} = 6 \times \frac{2}{4+2} = 2V$

**Due to 3A alone** (short 6V):
3A through 2Ω||4Ω = $\frac{8}{6} = 1.33Ω$
$V_A^{(3A)} = 3 \times 1.33 = 4V$

$$V_{th} = 2 + 4 = 6V$$

### Short-Circuit Current

Short A-B:
2Ω is shorted, so 6V drives through 4Ω: $I_1 = 6/4 = 1.5A$
3A adds directly: $I_{sc} = 1.5 + 3 = 4.5A$

### Thévenin Resistance

$$R_{th} = \frac{V_{th}}{I_{sc}} = \frac{6}{4.5} = 1.33Ω$$

---

## Example 3: Circuit with Dependent Source

```
        R=2Ω         
    ┌───/\/\/───┬────○ A
    │           │
   10V         2vₓ↓
    │      vₓ   │
    └───────────┴────○ B
```

Where $v_x$ is the voltage across the dependent source.

### Finding $V_{th}$

With A-B open: $v_x = V_{th}$
KCL at top node: Current through R = current through dependent source
$$\frac{10 - V_{th}}{2} = 2V_{th}$$
$$10 - V_{th} = 4V_{th}$$
$$V_{th} = 2V$$

### Finding $R_{th}$ (Test Source Method)

Turn off 10V (short). Apply test voltage $V_t$ at A-B.
Now $v_x = V_t$.

Current from test source:
$$I_t = \frac{0 - V_t}{2} + 2V_t = -0.5V_t + 2V_t = 1.5V_t$$

$$R_{th} = \frac{V_t}{I_t} = \frac{V_t}{1.5V_t} = \frac{2}{3}Ω$$

---

## Norton Equivalent Conversion

Given Thévenin values:

$$I_N = \frac{V_{th}}{R_{th}}$$
$$R_N = R_{th}$$

**Example**: $V_{th} = 6V$, $R_{th} = 1.33Ω$
$$I_N = \frac{6}{1.33} = 4.5A$$
$$R_N = 1.33Ω$$

---

## Source Transformation

You can convert back and forth at will:

```
   Thévenin               Norton
       R                    R
   ○──/\/\/──┐         ○────┬────○
            │              │
           V_s         R  ↑I_s
            │              │
   ○─────────┘         ○────┴────○

   I_s = V_s/R          V_s = I_s·R
```

This is useful for circuit simplification!

---

## Practical Applications

### 1. Load Analysis

Once you have Thévenin equivalent:
$$V_{load} = V_{th} \times \frac{R_{load}}{R_{th} + R_{load}}$$
$$I_{load} = \frac{V_{th}}{R_{th} + R_{load}}$$

### 2. Matching

For maximum power transfer: $R_{load} = R_{th}$

### 3. Understanding Real Sources

Real battery ≈ Ideal $V_{th}$ + Internal $R_{th}$
Real current source ≈ Ideal $I_N$ || $R_N$

---

## Summary Comparison

| Find | Method |
|------|--------|
| $V_{th}$ | Open-circuit voltage |
| $I_N$ | Short-circuit current |
| $R_{th}$ | Kill sources + find R, OR $V_{th}/I_{sc}$ |
| $R_N$ | Same as $R_{th}$ |

| Conversion | Formula |
|------------|---------|
| Thévenin → Norton | $I_N = V_{th}/R_{th}$, $R_N = R_{th}$ |
| Norton → Thévenin | $V_{th} = I_N \cdot R_N$, $R_{th} = R_N$ |
