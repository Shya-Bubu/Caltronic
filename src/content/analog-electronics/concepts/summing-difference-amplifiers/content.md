# Summing and Difference Amplifiers

> **Why This Matters**: In the previous sections, we amplified a single voltage. But what if we want to combine signals? An audio mixing desk needs to combine the vocals, guitar, and drums into a single track. A sensor system might need to subtract a steady background noise level from a faint signal. By cleverly arranging multiple resistors at the input of an op-amp, we can physically perform mathematical operations—**addition** and **subtraction**—using analog voltages in real time.

## The Inverting Summing Amplifier (Adder)

Let's return to the basic inverting amplifier. The inverting terminal ($-$) is a **Virtual Ground** (held at $0\text{V}$). 

Because it's at zero volts, we can easily add more input resistors to that exact same node without them interfering with each other. This creates a **Summing Amplifier**.

[[visual:summing-amp-schematic]]

### Mathematical Derivation via KCL

Let's apply Kirchhoff's Current Law (KCL) at the virtual ground node. Because the op-amp draws zero input current ($i_- = 0$), the sum of all currents entering the node from the various inputs must exactly equal the current leaving through the feedback resistor $R_F$.

$$I_1 + I_2 + I_3 = I_F$$

Since the node is at $0\text{V}$, we can write those currents using Ohm's law:

$$\frac{V_1 - 0}{R_1} + \frac{V_2 - 0}{R_2} + \frac{V_3 - 0}{R_3} = \frac{0 - V_o}{R_F}$$

$$\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3} = -\frac{V_o}{R_F}$$

Rearranging to solve for the output voltage $V_o$:

$$\boxed{V_o = -R_F \left( \frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3} \right)}$$

### Real-World Applications of the Summer

#### 1. The Audio Mixer (Equal Resistors)
If we make all the resistors identical ($R_1 = R_2 = R_3 = R_F = R$), the equation simplifies beautifully:

$$V_o = -R \left( \frac{V_1}{R} + \frac{V_2}{R} + \frac{V_3}{R} \right)$$
$$\boxed{V_o = -(V_1 + V_2 + V_3)}$$

This is a straight mathematical addition (albeit inverted). In an audio mixing desk, sliding the volume faders simply changes the values of $R_1$, $R_2$, etc., which scales the contribution (weighting) of each track before they are added together.

[[visual:falstad-summing-amp]]
[[visual:weighted-sum-demo]]

#### 2. Digital-to-Analog Converter (Binary Weighted Resistors)
Computers speak in binary (1s and 0s). The physical world operates in analog voltages. How do we convert a 4-bit binary number (like `1010`) into an analog voltage?

We can use a summing amplifier where the input resistors are **binary weighted**. 
Let $V_3, V_2, V_1, V_0$ be digital signals that are either $0\text{V}$ (Logic '0') or $5\text{V}$ (Logic '1').

We choose resistors that double in value for each less significant bit:
- MSB ($V_3$) connects to $R$
- $V_2$ connects to $2R$
- $V_1$ connects to $4R$
- LSB ($V_0$) connects to $8R$

[[visual:binary-weighted-dac]]

Plug this into our summing equation:

$$V_o = -R_F \left( \frac{V_3}{R} + \frac{V_2}{2R} + \frac{V_1}{4R} + \frac{V_0}{8R} \right)$$
$$V_o = -\frac{R_F}{8R} \left( 8V_3 + 4V_2 + 2V_1 + 1V_0 \right)$$

This is magical! By simply scaling physical resistors by powers of two, the analog output voltage perfectly matches the numerical value of the binary input.

[[visual:dac-staircase]]

<details>
<summary><strong>Pause & Think</strong>: While binary-weighted DACs are conceptually elegant, they are rarely used beyond 4 or 8 bits in practice. Why might it be difficult to build a 16-bit binary-weighted DAC?</summary>

The ratio between the smallest and largest resistor would be $2^{15} = 32,768$. If your smallest resistor is $10\text{ k}\Omega$, your largest would need to be $327\text{ M}\Omega$! Producing massively different resistors that maintain extremely tight precision and identical temperature characteristics on a single silicon chip is practically impossible. (Modern converters use different topologies like R-2R ladders or Delta-Sigma modulation).
</details>

## The Difference Amplifier (Subtractor)

What if we want to calculate $V_2 - V_1$? We can use both inputs of the op-amp simultaneously.

[[visual:difference-amp-schematic]]

This circuit looks complex, but we can solve it easily using **superposition**. We analyze the circuit's response to one input source at a time, treating the other source as $0\text{V}$ (ground).

**Case 1: $V_1$ active, $V_2 = 0\text{V}$**
If $V_2$ is grounded, the non-inverting terminal $(+)$ is connected to ground through $R_3$ and $R_4$. Since $i_+ = 0$, there is no voltage drop across them. $V_+ = 0\text{V}$.
The circuit is now just a standard inverting amplifier!
$$V_{o1} = -\left(\frac{R_2}{R_1}\right) V_1$$

**Case 2: $V_2$ active, $V_1 = 0\text{V}$**
If $V_1$ is grounded, the circuit is a non-inverting amplifier driven by a voltage divider formed by $R_3$ and $R_4$.
First, find $V_+$ via the voltage divider:
$$V_+ = V_2 \left( \frac{R_4}{R_3 + R_4} \right)$$
Then multiply by the non-inverting gain:
$$V_{o2} = V_+ \left( 1 + \frac{R_2}{R_1} \right)$$

**Total Output:**
Using superposition, $V_o = V_{o1} + V_{o2}$. 
This results in a messy generic equation. However, if we carefully select our resistors such that **the ratio of the inverting side equals the ratio of the non-inverting side**:

$$\frac{R_1}{R_2} = \frac{R_3}{R_4}$$

The math collapses beautifully into:

$$\boxed{V_o = \frac{R_2}{R_1} (V_2 - V_1)}$$

### Real-World Application
If we make $R_1=R_2=R_3=R_4$, we get a perfect subtractor: $V_o = V_2 - V_1$.
This is used extensively in biomedical engineering (like ECG machines) to measure a tiny voltage difference between two electrodes on your chest, while completely subtracting the massive 50 Hz electrical noise sitting on your body (which appears equally as $V_1$ and $V_2$).

[[visual:falstad-difference-amp]]

## Summary

- Connecting multiple inputs via resistors to the virtual ground of an inverting amplifier creates a **Summing Amplifier**.
- The output voltage is the scaled sum of the inputs: $V_o = -R_F \sum \frac{V_i}{R_i}$.
- Binary-weighted resistors in a summing amplifier form a primitive **Digital-to-Analog Converter (DAC)**.
- Applying signals to both the inverting and non-inverting inputs via a matched resistor network creates a **Difference Amplifier**.
- By ensuring $R_1/R_2 = R_3/R_4$, the difference amplifier directly subtracts the two signals: $V_o = \frac{R_2}{R_1}(V_2 - V_1)$.
