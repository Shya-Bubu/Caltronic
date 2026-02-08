# Inverting Amplifier

## Activity 1: Your First Op-Amp Circuit

The **inverting amplifier** is the most fundamental op-amp configuration. It amplifies the input signal and **flips it upside-down** (inverts it).

### The Circuit

[[visual:diag-intuition-01]]

The inverting amplifier has:
- **R1** (2.2kΩ) from input to the inverting terminal
- **R2** (39kΩ) as feedback from output to inverting terminal
- Non-inverting terminal connected to ground

### Why Does It Invert?

Think about what happens:
1. Apply positive voltage at Vi
2. Current flows through R1 into the inverting node
3. Op-amp adjusts Vo to "suck" that current back through R2
4. To suck current, Vo must go **negative**!

> 🤔 **Pause & Reflect**: If Vi suddenly increases, what direction does current want to flow? And how does the op-amp react?

<details>
<summary>Click to reveal answer</summary>

When Vi increases, current wants to flow INTO the inverting node (−). But no current can actually enter the op-amp input! So the op-amp quickly adjusts Vo to be more negative, creating a path for that current to flow OUT through R2 instead. This is negative feedback in action!

</details>

[[visual:sim-intuition-01]]

### The Gain Formula (Pre-Lab 1)

$$A_V = \frac{V_o}{V_i} = -\frac{R_2}{R_1}$$

For Activity 1: R1 = 2.2kΩ, R2 = 39kΩ

$$A_V = -\frac{39k\Omega}{2.2k\Omega} = -17.7$$

**The negative sign means inversion** — when input goes up, output goes down!

[[visual:diag-intuition-02]]

### What You'll See on the Oscilloscope

| Input (CH1) | Output (CH2) |
|-------------|--------------|
| 1V peak sine wave | 17.7V peak sine wave, **inverted** |
| Positive peak | Negative peak (flipped) |
| 1kHz frequency | Same 1kHz frequency |

## Understanding Saturation

In step 3 of Activity 1, you increase the input until distortion occurs.

**Why does this happen?**

- With gain = 17.7, an input > 0.8V produces output > 14V
- But the op-amp is powered by ±15V!
- Output clips at approximately ±14V

**Example**:
- Input = 1V peak → Expected output = 17.7V
- But maximum output ≈ 14V
- Result: Flat-topped (clipped) waveform

---

*Continue to Engineering for the complete lab procedure.*
