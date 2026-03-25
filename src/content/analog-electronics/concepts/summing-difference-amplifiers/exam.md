# Exam Practice — Summing and Difference Amplifiers

## Question 1 (4 marks)

An inverting summing amplifier is designed to mix three audio signals. The feedback resistor is $R_F = 100\text{ k}\Omega$. The three input resistors are $R_1 = 20\text{ k}\Omega$, $R_2 = 50\text{ k}\Omega$, and $R_3 = 100\text{ k}\Omega$. 

**(a)** Write the specific equation relating $V_o$ to $V_1, V_2$, and $V_3$ for these resistor values. **(1 mark)**
**(b)** If $V_1 = 0.5\text{V}$, $V_2 = -1.0\text{V}$, and $V_3 = 2.0\text{V}$, calculate the output voltage $V_o$. **(1 mark)**
**(c)** What is the significance of the negative sign in your final equation? **(1 mark)**
**(d)** If $V_1$ is driven by a very weak microphone, how could you increase the "volume" (gain) of $V_1$ in the mix without affecting $V_2$ or $V_3$? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
$$V_o = -R_F \left( \frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3} \right)$$
$$V_o = -100\text{k} \left( \frac{V_1}{20\text{k}} + \frac{V_2}{50\text{k}} + \frac{V_3}{100\text{k}} \right)$$
$$V_o = -\left( 5V_1 + 2V_2 + 1V_3 \right)$$

**(b)**
$$V_o = -\left( 5(0.5) + 2(-1.0) + 1(2.0) \right)$$
$$V_o = -\left( 2.5 - 2.0 + 2.0 \right)$$
$$V_o = -2.5\text{ V}$$

**(c)**
The negative sign indicates that the summing amplifier inverts the phase of all input signals.

**(d)**
You can decrease the value of $R_1$. Because the mixing node is a virtual ground ($0\text{V}$), changing $R_1$ only affects the current contribution $I_1$. It has absolutely no effect on $I_2$ or $I_3$, so the other signals remain unaffected.
</details>

## Question 2 (3 marks)

A difference amplifier uses four resistors: $R_1$ (input 1, inverting), $R_2$ (feedback), $R_3$ (input 2, non-inverting), and $R_4$ (non-inverting to ground). 

**(a)** State the required resistor ratio condition for the circuit to act as a perfect difference amplifier. **(1 mark)**
**(b)** Under this condition, write the equation for $V_o$ in terms of $V_1$, $V_2$, $R_1$, and $R_2$. **(1 mark)**
**(c)** If $R_1 = 10\text{ k}\Omega$, $R_2 = 100\text{ k}\Omega$, $R_3 = 10\text{ k}\Omega$, and $R_4 = 100\text{ k}\Omega$, calculate $V_o$ if exactly the same $5\text{V}$ noise signal appears on both $V_1$ and $V_2$. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
The ratio of the resistors connected to the inverting side must equal the ratio on the non-inverting side:
$$\frac{R_1}{R_2} = \frac{R_3}{R_4}$$

**(b)**
$$V_o = \frac{R_2}{R_1} (V_2 - V_1)$$

**(c)**
Since $V_1 = 5\text{V}$ and $V_2 = 5\text{V}$:
$V_o = \frac{100\text{k}}{10\text{k}} \times (5 - 5) = 10 \times 0 = 0\text{V}$.
The difference amplifier perfectly rejects common-mode signals (noise present on both lines).
</details>

## Question 3 (3 marks)

You are analyzing a 4-bit binary-weighted Digital-to-Analog Converter (DAC) implemented with an inverting summing amplifier. The feedback resistor is $R_F = 10\text{ k}\Omega$. The input resistors are $R, 2R, 4R$, and $8R$, corresponding to MSB down to LSB. The digital inputs are $5\text{V}$ for Logic high and $0\text{V}$ for Logic low.

**(a)** If you want the MSB (Most Significant Bit) to contribute exactly $-5\text{V}$ to the output when it is Logic 1 ($5\text{V}$), what must the value of $R$ be? **(1 mark)**
**(b)** Given your value for $R$, what will the LSB (Least Significant Bit) contribute to the output when it is Logic 1? **(1 mark)**
**(c)** Calculate the total output voltage when the digital input is `1010` (MSB first). **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
The gain for the MSB is $-R_F/R$. We want $-5\text{V}$ output for a $5\text{V}$ input, so the gain must be $-1$.
$-1 = -\frac{10\text{k}\Omega}{R}$
$R = 10\text{ k}\Omega$

**(b)**
The LSB connects to resistor $8R = 80\text{ k}\Omega$.
The gain for the LSB is $-\frac{R_F}{8R} = -\frac{10\text{k}}{80\text{k}} = -1/8$.
When LSB is $5\text{V}$, output contribution = $5 \times (-1/8) = -0.625\text{ V}$.

**(c)**
Digital input `1010` means MSB=5V, Bit2=0V, Bit1=5V, LSB=0V.
$V_o = -\left( \frac{10\text{k}}{10\text{k}}(5) + \frac{10\text{k}}{20\text{k}}(0) + \frac{10\text{k}}{40\text{k}}(5) + \frac{10\text{k}}{80\text{k}}(0) \right)$
$V_o = -\left( 5 + 0 + 1.25 + 0 \right)$
$V_o = -6.25\text{ V}$.
</details>
