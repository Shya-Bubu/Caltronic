# Mathematical Foundation

## Pre-Lab 1: Deriving the Gain Formula

[[visual:diag-mathematics-01]]

### The Setup

For the inverting amplifier:
- Input voltage Vi applied through R1
- Feedback resistor R2 from output to inverting input
- Non-inverting input grounded (V+ = 0)

### Step-by-Step Derivation

**Assumption 1**: No current into op-amp inputs (I- = 0)
**Assumption 2**: Virtual short (V- = V+ = 0, since V+ is grounded)

**Step 1**: Apply KCL at the inverting node (-)

Current in through R1 + Current in through R2 = Current into op-amp
$$\frac{V_i - V_-}{R_1} + \frac{V_o - V_-}{R_2} = 0$$

**Step 2**: Apply virtual short (V- = 0)
$$\frac{V_i - 0}{R_1} + \frac{V_o - 0}{R_2} = 0$$
$$\frac{V_i}{R_1} + \frac{V_o}{R_2} = 0$$

**Step 3**: Solve for Vo/Vi
$$\frac{V_o}{R_2} = -\frac{V_i}{R_1}$$
$$\frac{V_o}{V_i} = -\frac{R_2}{R_1}$$

$$\boxed{A_V = -\frac{R_2}{R_1}}$$

> 🤔 **Pause & Reflect**: The gain depends ONLY on the ratio of resistors, not on the op-amp's internal gain. Why is this useful?

<details>
<summary>Click to reveal answer</summary>

This means the gain is **precisely controlled** by the resistor values you choose, not by the op-amp's characteristics (which vary with temperature, batch, etc.). This predictability is what makes op-amp circuits so reliable!

</details>

## Input and Output Impedance

**Input Impedance** of inverting amplifier:
$$Z_{in} = R_1$$

(Current flows through R1, so the source "sees" R1 as the load)

**Output Impedance**:
$$Z_{out} \approx 0$$ (very low due to op-amp feedback)

## Numerical Example

For Activity 1 values:
- R1 = 2.2 kΩ = 2200 Ω
- R2 = 39 kΩ = 39000 Ω

$$A_V = -\frac{39000}{2200} = -17.73$$

This means:
- A 1V input produces a 17.73V output
- The output is inverted (180° phase shift)

## Saturation Condition

Output saturates when:
$$|V_o| > V_{sat} \approx V_{supply} - 1V = 14V$$

Maximum undistorted input:
$$|V_{i(max)}| = \frac{V_{sat}}{|A_V|} = \frac{14V}{17.73} = 0.79V$$

Any input greater than ~0.8V peak will cause clipping!

---

*For exam preparation tips, continue to the Exam layer.*
