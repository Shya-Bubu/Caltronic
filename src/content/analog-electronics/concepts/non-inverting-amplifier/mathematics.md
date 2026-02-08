# Mathematical Foundation

## Pre-Lab 2: Deriving the Gain Formula

[[visual:diag-mathematics-01]]

### The Setup

For the non-inverting amplifier:
- Input voltage Vi applied to non-inverting input (+)
- R1 from inverting input to ground
- R2 from output to inverting input (feedback)

### Step-by-Step Derivation

**Assumption 1**: No current into op-amp inputs
**Assumption 2**: Virtual short (V- = V+ = Vi)

**Step 1**: Apply voltage divider relationship

R1 and R2 form a voltage divider from Vo to ground:
$$V_- = V_o \times \frac{R_1}{R_1 + R_2}$$

**Step 2**: Apply virtual short
$$V_- = V_+ = V_i$$

Therefore:
$$V_i = V_o \times \frac{R_1}{R_1 + R_2}$$

**Step 3**: Solve for Vo/Vi
$$\frac{V_o}{V_i} = \frac{R_1 + R_2}{R_1} = 1 + \frac{R_2}{R_1}$$

$$\boxed{A_V = 1 + \frac{R_2}{R_1}}$$

> 🤔 **Pause & Reflect**: Why can the non-inverting gain never be less than 1?

<details>
<summary>Click to reveal answer</summary>

Look at the formula: Av = 1 + R2/R1

Since R2/R1 is always positive (or zero), the minimum gain occurs when R2 = 0:
- Av,min = 1 + 0/R1 = 1

You cannot get gain less than 1 with a standard non-inverting configuration! This is different from the inverting amp, where |Av| = R2/R1 can be less than 1 if R2 < R1.

</details>

## Input and Output Impedance

**Input Impedance**:
$$Z_{in} \approx \infty$$ (very high, limited only by op-amp itself)

**Output Impedance**:
$$Z_{out} \approx 0$$ (very low due to feedback)

This makes the non-inverting amp ideal for **buffering** — it can be connected to high-impedance sources without loading them down.

## Numerical Example

For Activity 2 values:
- R1 = 2.2 kΩ, R2 = 39 kΩ
$$A_V = 1 + \frac{39000}{2200} = 1 + 17.73 = 18.73$$

With 1V peak input → 18.73V peak output (in phase)

## Comparison with Inverting

| Same R1, R2 | Inverting | Non-Inverting |
|-------------|-----------|---------------|
| Gain magnitude | 17.73 | 18.73 |
| Difference | | +1 |

The "+1" in the non-inverting formula gives slightly higher gain for the same resistor values.

---

*For exam preparation, continue to the Exam layer.*
