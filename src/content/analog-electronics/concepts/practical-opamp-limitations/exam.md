# Exam Practice — Practical Limitations

## Question 1 (4 marks)

An inverting amplifier is built with a feedback resistor $R_F = 100\text{ k}\Omega$ and an input resistor $R_1 = 1\text{ k}\Omega$. The op-amp is an older BJT model with a typical input offset voltage $V_{OS} = 2\text{ mV}$ and an average input bias current $I_B = 100\text{ nA}$. The input signal is connected to ground ($0\text{V}$).

**(a)** Calculate the theoretical output voltage assuming an ideal op-amp. **(1 mark)**
**(b)** Calculate the actual error output voltage caused solely by the input offset voltage $V_{OS}$. **(1 mark)**
**(c)** What causes this input offset voltage to exist? **(1 mark)**
**(d)** If the temperature of the op-amp increases by $30^\circ\text{C}$, and the offset voltage temperature drift $\alpha$ is specified as $+10\text{ }\mu\text{V}/^\circ\text{C}$, what is the new value of $V_{OS}$? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
If the input is grounded ($0\text{V}$), an ideal op-amp circuit will have exactly $0\text{V}$ at the output.

**(b)**
The input offset voltage $V_{OS}$ acts as a small voltage source in series with the non-inverting terminal. It is amplified by the **non-inverting** gain of the circuit.
$$A_{\text{error}} = 1 + \frac{R_F}{R_1} = 1 + \frac{100\text{k}}{1\text{k}} = 101$$
$$V_{o(\text{error})} = 101 \times 2\text{mV} = +202\text{ mV}$$

**(c)**
It is caused by microscopic manufacturing mismatches between the primary input transistors in the differential pair (e.g., mismatched emitter areas, doping concentrations, or $V_{BE}$ drops).

**(d)**
The change in $V_{OS}$ is:
$$\Delta V_{OS} = \alpha \times \Delta T = (10\text{ }\mu\text{V}/^\circ\text{C}) \times 30^\circ\text{C} = 300\text{ }\mu\text{V} = 0.3\text{ mV}$$
The new $V_{OS}$ is $2.0\text{ mV} + 0.3\text{ mV} = 2.3\text{ mV}$.
</details>

## Question 2 (3 marks)

Discuss the impact of Input Bias Current ($I_B$) and Input Offset Current ($I_{OS}$) in an op-amp circuit.

**(a)** Define what Input Bias Current ($I_B$) is and why it exists. **(1 mark)**
**(b)** Define Input Offset Current ($I_{OS}$). **(1 mark)**
**(c)** If both inputs of a BJT op-amp require $100\text{ nA}$ of bias current, and you use a $10\text{ M}\Omega$ resistor connected to the non-inverting terminal, what error voltage will appear directly at that input pin? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
Input bias current ($I_B$) is the tiny DC current that must physically flow into or out of the op-amp's internal input transistors to bias them into their active linear region (creating base current). It contradicts the "infinite input impedance ($i = 0$)" assumption of ideal op-amps.

**(b)**
Input Offset Current ($I_{OS}$) is the absolute difference between the two bias currents ($|I_{B+} - I_{B-}|$). They are never perfectly equal due to manufacturing mismatches.

**(c)**
The $100\text{ nA}$ bias current must flow through the $10\text{ M}\Omega$ resistor to reach ground/source.
Using Ohm's Law: $V_{error} = I_B \times R = (100 \times 10^{-9}\text{ A}) \times (10 \times 10^6\text{ }\Omega) = 1.0\text{ V}$.
This massive $1.0\text{V}$ error appearing right at the input pin will ruin the entire amplifier's operation! (This is why very high-impedance circuits must use FET op-amps, which draw pico-amps instead of nano-amps).
</details>

## Question 3 (3 marks)

You are tasked with manually tuning an LM741 op-amp to nullify its input offset voltage.

**(a)** Describe the physical setup required on the LM741 chip to achieve null compensation. **(1 mark)**
**(b)** What signals must be applied to the $V_{in}$ terminal during this calibration process? **(1 mark)**
**(c)** Why is manual null compensation rarely used in modern consumer electronics production? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
A potentiometer (typically $10\text{ k}\Omega$) is connected across Pins 1 and 5 (the Offset Null pins). The wiper of the potentiometer is connected directly to the negative power supply pin ($-V_{EE}$, usually Pin 4).

**(b)**
The input signals must be absolutely zero. Both the inverting and non-inverting terminals should be shorted directly to ground to ensure the only thing being amplified is the internal error.

**(c)**
Manual tuning requires a human technician measuring each individual circuit board and turning a physical knob with a screwdriver during manufacturing. It is extremely slow and expensive. Modern precision op-amps are laser-trimmed by machines during fabrication to eliminate offsets automatically.
</details>
