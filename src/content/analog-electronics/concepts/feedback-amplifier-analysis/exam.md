# Exam Practice — Feedback Amplifier Analysis

## Question 1 (10 marks)

A single-stage common-emitter amplifier uses shunt-shunt feedback via a resistor $R_f = 100\,\text{k}\Omega$ connected from the collector to the base. The transistor has $h_{fe} = 100$ and $h_{ie} = 2.5\,\text{k}\Omega$. The collector resistor is $R_C = 5\,\text{k}\Omega$ and the load is $R_L = 10\,\text{k}\Omega$.

Using the systematic feedback analysis procedure:

**(a)** Identify the feedback topology and amplifier type. **(2 marks)**

**(b)** Calculate the feedback factor $\beta$. **(1 mark)**

**(c)** Draw the open-loop equivalent circuit accounting for loading effects. **(2 marks)**

**(d)** Calculate the open-loop transresistance gain $R_M$. **(2 marks)**

**(e)** Calculate the closed-loop gain $R_{Mf}$, input impedance $R_{if}$, and output impedance $R_{of}$. **(3 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** $R_f$ connects directly to the collector (output node) → **Shunt sampling** (voltage). $R_f$ connects directly to the base (input node) → **Shunt mixing** (current). Topology: **Shunt-Shunt** → **Transresistance amplifier**.

**(b)** For shunt-shunt:
$$\beta = \frac{I_f}{V_o} = \frac{-1}{R_f} = \frac{-1}{100\,\text{k}\Omega} = -0.01\,\text{mS}$$

(The negative sign indicates the feedback current flows opposite to the input current direction for negative feedback. We use $|\beta| = 0.01\,\text{mS}$ in calculations.)

**(c)** In the open-loop circuit:
- At input: $R_f$ appears in parallel with $h_{ie}$ (since it's shunt mixing) → $R_{i} = h_{ie} \| R_f = 2.5\text{k} \| 100\text{k} \approx 2.44\,\text{k}\Omega$
- At output: $R_f$ appears in parallel with $R_C$ and $R_L$ → effective load $= R_C \| R_L \| R_f = 5\text{k} \| 10\text{k} \| 100\text{k}$

**(d)** Effective load at output:
$$R_{eff} = 5\text{k} \| 10\text{k} \| 100\text{k} = 3.23\,\text{k}\Omega$$

$$V_o = -h_{fe} \cdot I_{b} \cdot R_{eff}$$

Input current: $I_i$ enters the base through $R_i = h_{ie} \| R_f$

The transresistance gain: $R_M = V_o / I_i$

Since $I_b = I_i \cdot \frac{R_f}{R_f + h_{ie}} \approx I_i \cdot \frac{100}{102.5} \approx 0.976 \cdot I_i$

$$R_M = \frac{V_o}{I_i} = -h_{fe} \cdot 0.976 \cdot R_{eff} = -100 \times 0.976 \times 3230 \approx -315.2\,\text{k}\Omega$$

**(e)**
$$D = 1 + |\beta| \cdot |R_M| = 1 + 0.00001 \times 315200 = 1 + 3.15 = 4.15$$

$$R_{Mf} = \frac{R_M}{D} = \frac{-315.2\,\text{k}\Omega}{4.15} \approx -76.0\,\text{k}\Omega$$

Input impedance (shunt mixing → divided by D):
$$R_{if} = \frac{R_i}{D} = \frac{2440}{4.15} \approx 588\,\Omega$$

Output impedance (shunt sampling → divided by D):
$$R_{of} = \frac{R_o}{D}$$

$R_o = R_C \| R_f = 5000 \| 100000 = 4762\,\Omega$

$$R_{of} = \frac{4762}{4.15} \approx 1148\,\Omega$$

</details>

## Question 2 (8 marks)

For the PNP emitter follower circuit with $R_S = 10\,\text{k}\Omega$, $R_E = 4.7\,\text{k}\Omega$, $R_L = 4.7\,\text{k}\Omega$, $h_{fe} = 50$, and $h_{ie} = 1.1\,\text{k}\Omega$:

**(a)** Using the feedback analysis approach, show that the voltage gain $A_{Vf} \approx 1$. **(4 marks)**

**(b)** Calculate the input and output impedances with feedback. **(2 marks)**

**(c)** Explain why the emitter follower is used as a buffer between a high-impedance source and a low-impedance load. **(2 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** Topology: Series-Shunt (as identified in lecture). $\beta = V_f/V_o = 1$.

Open-loop gain:
$$A_V = \frac{h_{fe} \cdot (R_E \| R_L)}{h_{ie}} = \frac{50 \times 2350}{1100} = 106.8$$

Closed-loop gain:
$$D = 1 + A_V\beta = 1 + 106.8 = 107.8$$
$$A_{Vf} = \frac{106.8}{107.8} = 0.991 \approx 1 \checkmark$$

**(b)**
$$R_{if} = R_i \times D = 1100 \times 107.8 = 118.6\,\text{k}\Omega$$

For output impedance, $R_o$ (resistance seen looking back into the emitter):
$$R_o = R_E \| \frac{h_{ie} + R_S}{h_{fe}+1} = 4700 \| \frac{11100}{51} = 4700 \| 217.6 \approx 208\,\Omega$$
$$R_{of} = \frac{R_o}{D} = \frac{208}{107.8} = 1.93\,\Omega$$

**(c)** The emitter follower has:
- Very high input impedance (118.6 kΩ) — it does not load the high-impedance source, ensuring minimal voltage drop across $R_S$
- Very low output impedance (1.93 Ω) — it can drive low-impedance loads without significant voltage drop inside the amplifier
- Unity gain — the full signal voltage is transferred from source to load

This makes it an ideal impedance transformer or buffer: it isolates the source from the load while preserving the signal voltage.

</details>
