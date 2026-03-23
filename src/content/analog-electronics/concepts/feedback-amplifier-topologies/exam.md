# Exam Practice — Feedback Amplifier Topologies

## Question 1 (6 marks)

For each of the following feedback amplifier configurations, identify:
- The type of sampling (series or shunt)
- The type of mixing (series or shunt)
- The feedback topology name
- The amplifier type

**(a)** A resistor connects from the emitter resistor (output side) of a transistor back to the base of the input stage, where the emitter resistor carries the output current. **(3 marks)**

**(b)** A voltage divider ($R_1$, $R_2$) is connected across the output terminals, and the voltage from the divider junction is fed back to the emitter of the input transistor (in the base-emitter loop). **(3 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
- The feedback element is in series with the output current path (connected through the emitter resistor where current flows) → **Series sampling** (current output)
- The feedback connects directly to the base (a node) → **Shunt mixing** (current input)
- Topology: **Shunt-Series**
- Amplifier type: **Current amplifier**

**(b)**
- The voltage divider is connected across the output voltage → **Shunt sampling** (voltage output)
- The divider voltage appears at the emitter, which is in the input KVL loop with V_BE → **Series mixing** (voltage input)
- Topology: **Series-Shunt**
- Amplifier type: **Voltage amplifier**

</details>

## Question 2 (4 marks)

A feedback amplifier uses shunt-shunt topology with the following parameters:
- Open-loop transresistance gain: $R_M = 50\,\text{k}\Omega$
- Feedback resistor: $R_f = 10\,\text{k}\Omega$ (where $\beta = 1/R_f$)
- Input resistance without feedback: $R_i = 2\,\text{k}\Omega$
- Output resistance without feedback: $R_o = 20\,\text{k}\Omega$

Calculate: **(a)** $\beta$, **(b)** $D$, **(c)** $R_{if}$, **(d)** $R_{of}$

<details>
<summary><strong>Solution</strong></summary>

**(a)** $\beta = \frac{1}{R_f} = \frac{1}{10\,\text{k}\Omega} = 0.1\,\text{mS}$

**(b)** $D = 1 + \beta R_M = 1 + 0.0001 \times 50000 = 1 + 5 = 6$

**(c)** For shunt-shunt, input impedance decreases:
$$R_{if} = \frac{R_i}{D} = \frac{2\,\text{k}\Omega}{6} = 333\,\Omega$$

**(d)** For shunt-shunt, output impedance also decreases:
$$R_{of} = \frac{R_o}{D} = \frac{20\,\text{k}\Omega}{6} = 3.33\,\text{k}\Omega$$

Both impedances decrease, consistent with shunt-shunt topology (needed for transresistance amplifier: low $R_i$ to accept current, low $R_o$ to provide voltage).

</details>

## Question 3 (5 marks)

Explain the systematic procedure for identifying a feedback topology in a transistor circuit. Apply your procedure to the common-collector (emitter follower) configuration to identify its topology and justify why its gain is approximately unity.

<details>
<summary><strong>Solution</strong></summary>

**Procedure:**
1. **Identify the feedback element** — look for the component(s) connecting output to input
2. **Determine sampling type** — check if feedback element connects directly to the output node:
   - Directly to output node → Voltage (shunt) sampling
   - In the output current path → Current (series) sampling
3. **Determine mixing type** — check if feedback connects directly to the input node:
   - Directly to input node → Current (shunt) mixing
   - In the input voltage loop → Voltage (series) mixing
4. **Name the topology** — mixing type first, sampling type second

**Application to Emitter Follower:**

1. **Feedback element**: $R_E$ (the emitter resistor). The output voltage $V_o$ appears across $R_E$, and this voltage also appears in the base-emitter loop.

2. **Sampling**: The output voltage is measured across $R_E$ (connected to the emitter, which is the output terminal) → **Shunt sampling** (voltage output).

3. **Mixing**: The feedback voltage (across $R_E$) appears in the KVL loop: $V_S = V_{BE} + V_f$, so $V_i = V_S - V_f$ → **Series mixing** (voltage input).

4. **Topology**: **Series-Shunt** → Voltage amplifier.

**Why gain ≈ 1**: In the emitter follower, $\beta = V_f/V_o = 1$ since the entire output voltage is fed back. Therefore:
$$A_f \approx \frac{1}{\beta} = \frac{1}{1} = 1$$

The gain is approximately unity because 100% of the output is fed back.

</details>
