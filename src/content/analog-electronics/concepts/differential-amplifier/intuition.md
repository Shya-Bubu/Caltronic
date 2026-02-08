# Differential Amplifier & CMRR

## Activity 3: Amplifying the Difference

The **differential amplifier** amplifies only the **difference** between two input signals, rejecting any signal that is common to both inputs.

### Why Is This Useful?

Imagine measuring a tiny sensor signal in a noisy environment:
- Noise appears at **both** wires from the sensor
- The actual signal is the **difference** between the wires
- Differential amp amplifies signal, rejects noise!

**Applications**: ECG machines, audio preamps, instrumentation systems

### The Circuit

[[visual:diag-intuition-01]]

The circuit has:
- **Vi1** through R1 to inverting input
- **Vi2** through R3 to non-inverting input
- **R2** as feedback, **R4** to ground
- **Condition**: R2/R1 = R4/R3

### The Output Formula

When R2/R1 = R4/R3:

$$V_o = \frac{R_2}{R_1}(V_{i2} - V_{i1})$$

For Activity 3: R1 = R3 = 2.2kΩ, R2 = R4 = 39kΩ

$$V_o = \frac{39k}{2.2k}(V_{i2} - V_{i1}) = 17.73(V_{i2} - V_{i1})$$

> 🤔 **Pause & Reflect**: What happens if both inputs receive the same voltage (like noise)?

<details>
<summary>Click to reveal answer</summary>

If Vi1 = Vi2 (same signal at both inputs), then:
$$V_o = 17.73(V_{i2} - V_{i1}) = 17.73 \times 0 = 0$$

The common signal is **completely rejected**! This is the power of the differential amplifier.

</details>

[[visual:sim-intuition-01]]

## Common Mode Rejection Ratio (CMRR)

### Definitions

**Differential-mode signal**: The difference between inputs
$$V_d = V_{i2} - V_{i1}$$

**Common-mode signal**: The average of inputs (noise, offset)
$$V_{cm} = \frac{V_{i1} + V_{i2}}{2}$$

### Why CMRR Matters

An ideal diff amp:
- Amplifies Vd by differential gain Ad
- Has **zero** common-mode gain Acm

Real diff amps amplify common-mode signals slightly due to resistor mismatch.

$$CMRR = \frac{A_d}{A_{cm}}$$

**Higher CMRR = better noise rejection!**

In dB: $CMRR_{dB} = 20\log_{10}(CMRR)$

For 741 op-amp: CMRR ≈ 70dB ≈ 3000

---

*Continue to Engineering for Activity 3 lab procedure.*
