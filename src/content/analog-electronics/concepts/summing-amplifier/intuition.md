# Summing Amplifier

## Activity 4: Adding Signals Together

The **summing amplifier** (or adder) produces an output proportional to the **weighted sum** of multiple input signals. It's essentially multiple inverting amplifiers combined!

### The Circuit

[[visual:diag-intuition-01]]

The circuit has:
- Multiple inputs (V1, V2) through separate resistors (R1, R2)
- All inputs connect to the same inverting node
- Single feedback resistor Rf
- Non-inverting terminal grounded

### The Output Formula (Pre-Lab 4)

$$V_o = -\left(\frac{R_f}{R_1}V_1 + \frac{R_f}{R_2}V_2\right) = -A_1V_1 - A_2V_2$$

where:
- $A_1 = R_f/R_1$ (gain for input V1)
- $A_2 = R_f/R_2$ (gain for input V2)

### How Does It Work?

Think of it as an extension of the inverting amplifier:
1. Each input contributes current through its resistor to the virtual ground
2. All currents sum at the inverting node
3. Total current flows through Rf
4. Output is the sum of all contributions!

> 🤔 **Pause & Reflect**: If R1 = R2 = Rf, what is the output?

<details>
<summary>Click to reveal answer</summary>

$$V_o = -\left(\frac{R_f}{R_f}V_1 + \frac{R_f}{R_f}V_2\right) = -(V_1 + V_2)$$

The output is simply the **inverted sum** of the inputs! This is called a "unity-gain summing amplifier."

</details>

[[visual:sim-intuition-01]]

### Activity 4 Values

- R1 = 1.2 kΩ, R2 = 18 kΩ, Rf = 39 kΩ

Gains:
- A1 = Rf/R1 = 39k/1.2k = **32.5**
- A2 = Rf/R2 = 39k/18k = **2.17**

Different resistor values give **different weights** to each input!

### Application: Audio Mixing

Summing amplifiers are the heart of audio mixers:
- Multiple microphones → multiple inputs
- Volume controls → adjust R values
- Single output → mixed audio signal

---

*Continue to Engineering for Activity 4 lab procedure.*
