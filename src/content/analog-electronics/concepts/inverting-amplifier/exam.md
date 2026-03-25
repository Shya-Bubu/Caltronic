# Exam Practice — The Inverting Amplifier

## Question 1 (4 marks)

An inverting amplifier is designed using an ideal op-amp. It uses an input resistor $R_1 = 2.2\text{ k}\Omega$ and a feedback resistor $R_2 = 33\text{ k}\Omega$. The op-amp is powered by $\pm 12\text{V}$ DC supplies.

**(a)** Calculate the theoretical voltage gain $A_v$ of the amplifier. **(1 mark)**
**(b)** What is the input impedance of this entire amplifier circuit? **(1 mark)**
**(c)** If a DC input voltage of $V_{in} = 0.5\text{ V}$ is applied, calculate the expected output voltage $V_o$. **(1 mark)**
**(d)** If an input voltage of $V_{in} = 1.0\text{ V}$ is applied, what will be the actual output voltage $V_o$? Explain your answer. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** 
$$A_v = -\frac{R_2}{R_1} = -\frac{33\text{ k}\Omega}{2.2\text{ k}\Omega} = -15$$

**(b)** The input impedance of an inverting amplifier is equal to the input resistor because the inverting terminal is at a virtual ground.
$$Z_{in} = R_1 = 2.2\text{ k}\Omega$$

**(c)**
$$V_o = A_v \times V_{in} = -15 \times 0.5\text{ V} = -7.5\text{ V}$$

**(d)** 
Theoretical output: $V_o = -15 \times 1.0\text{ V} = -15\text{ V}$.
However, the op-amp is powered by $\pm 12\text{V}$ supplies. An op-amp cannot output a voltage greater than its supply rails. Therefore, the amplifier will **saturate**, and the actual output will be pinned at the negative supply rail, **$V_o = -12\text{ V}$** (or slightly less, e.g. $-11\text{V}$, depending on the specific op-amp's rail-to-rail capabilities, but $-12\text{V}$ is expected for the ideal exam answer).
</details>

## Question 2 (4 marks)

Using the ideal op-amp assumptions, derive the voltage gain equation $A_v = -\frac{R_2}{R_1}$ for the standard inverting amplifier circuit consisting of $R_1$ and $R_2$. Be sure to clearly state your assumptions and the steps involved.

<details>
<summary><strong>Solution</strong></summary>

**Assumptions based on the Ideal Op-Amp Model:**
1. Infinite open-loop gain ($A_{vd} \to \infty$)
2. Infinite input impedance ($i_+ = 0$, $i_- = 0$)

**Derivation Step 1:** Because the non-inverting terminal is grounded ($V_+ = 0\text{V}$) and there is negative feedback (via $R_2$), the infinite open-loop gain forces a virtual short ($V_+ = V_-$). Therefore, the inverting terminal is at a **virtual ground**: $V_- = 0\text{V}$.

**Derivation Step 2:** Apply Kirchhoff's Current Law (KCL) at the inverting terminal node. Let $I_1$ be the current flowing from the source $V_{in}$ through $R_1$, and $I_2$ be the current flowing from the output $V_o$ through $R_2$.
$$I_1 + I_2 + i_- = 0$$

Since infinite input impedance means $i_- = 0$:
$$I_1 + I_2 = 0 \quad \text{or} \quad I_1 = -I_2$$

**Derivation Step 3:** Express the currents using Ohm's Law in terms of the node voltages.
$$I_1 = \frac{V_{in} - V_-}{R_1} = \frac{V_{in} - 0}{R_1} = \frac{V_{in}}{R_1}$$
$$I_2 = \frac{V_o - V_-}{R_2} = \frac{V_o - 0}{R_2} = \frac{V_o}{R_2}$$

Substitute into the KCL equation:
$$\frac{V_{in}}{R_1} + \frac{V_o}{R_2} = 0$$

**Derivation Step 4:** Solve for the voltage gain $A_v = V_o / V_{in}$.
$$\frac{V_o}{R_2} = -\frac{V_{in}}{R_1}$$
$$V_o = -\left(\frac{R_2}{R_1}\right)V_{in}$$
$$A_v = \frac{V_o}{V_{in}} = -\frac{R_2}{R_1}$$
</details>

## Question 3 (2 marks)

For an inverting amplifier with $R_1 = 10\text{ k}\Omega$ and $R_2 = 100\text{ k}\Omega$:

**(a)** If the input signal is a $2\text{ V}$ peak-to-peak sine wave, sketch or describe the output waveform relative to the input. **(1 mark)**
**(b)** Describe the primary disadvantage of increasing the gain to $-100$ by swapping $R_1$ for a $1\text{ k}\Omega$ resistor. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** The gain is $A_v = -100\text{k}/10\text{k} = -10$. The output will be a $20\text{ V}$ peak-to-peak sine wave that is exactly 180° out of phase (inverted) compared to the input. When the input goes positive, the output goes negative.

**(b)** The input impedance of the inverting amplifier circuit is equal to $R_1$. If $R_1$ is reduced to $1\text{ k}\Omega$, the circuit will pose a much heavier load on whatever signal source is driving it. If the source has a high internal resistance, it may not be able to provide the necessary current without dropping the signal voltage drastically.
</details>
