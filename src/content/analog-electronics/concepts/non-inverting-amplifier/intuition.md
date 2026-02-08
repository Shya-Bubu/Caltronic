# Non-Inverting Amplifier

## Activity 2: Amplification Without Inversion

The **non-inverting amplifier** amplifies the signal while keeping it **in phase** with the input.

### The Circuit

[[visual:diag-intuition-01]]

**Key difference from inverting**: Input signal goes to the **non-inverting (+)** terminal!

The circuit has:
- Input signal to non-inverting (+) terminal
- **R1** (2.2kΩ) from inverting terminal to ground
- **R2** (39kΩ) as feedback from output to inverting terminal

### Why Doesn't It Invert?

Think about it:
1. Vi applied directly to V+
2. Through virtual short, V- = V+ = Vi
3. R1 and R2 form a voltage divider from Vo to ground
4. Op-amp adjusts Vo so that this divider produces V- = Vi
5. Output must be **larger** than input (and same polarity) to satisfy this!

> 🤔 **Pause & Reflect**: The input impedance of the non-inverting amp is much higher than the inverting amp. Why?

<details>
<summary>Click to reveal answer</summary>

In the non-inverting configuration, the input connects directly to the op-amp's non-inverting input, which has **extremely high impedance** (megaohms). No current flows into it!

In contrast, the inverting amp's input impedance is only R1 (2.2kΩ in Activity 1), because current must flow through R1 to reach the virtual ground.

</details>

[[visual:sim-intuition-01]]

### The Gain Formula (Pre-Lab 2)

$$A_V = \frac{V_o}{V_i} = 1 + \frac{R_2}{R_1}$$

For Activity 2: R1 = 2.2kΩ, R2 = 39kΩ

$$A_V = 1 + \frac{39k\Omega}{2.2k\Omega} = 1 + 17.73 = 18.73$$

**No negative sign** — output is in phase with input!

[[visual:diag-intuition-02]]

### Comparing Inverting vs Non-Inverting

| Property | Inverting | Non-Inverting |
|----------|-----------|---------------|
| Gain | -R2/R1 | 1 + R2/R1 |
| Phase | Inverted (180°) | In-phase (0°) |
| Input Impedance | R1 (low) | Very high (MΩ) |
| Minimum Gain | Can be < 1 | Always ≥ 1 |

---

*Continue to Engineering for the Activity 2 lab procedure.*
