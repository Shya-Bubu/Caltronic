# Exam Practice — Non-Inverting Amplifier & Buffers

## Question 1 (4 marks)

A transducer outputs a weak signal of $50\text{ mV}$ DC but has an incredibly high internal resistance of $100\text{ k}\Omega$. It needs to drive an ADC (Analog-to-Digital Converter) that requires a $5\text{ V}$ input range, and the ADC has an input resistance of $1\text{ k}\Omega$.

**(a)** Calculate the overall voltage gain required to boost the $50\text{ mV}$ signal to $5\text{ V}$. **(1 mark)**
**(b)** A student suggests using an inverting amplifier with $R_1 = 100\text{ }\Omega$ and $R_2 = 10\text{ k}\Omega$. Explain why this will fail miserably. **(1 mark)**
**(c)** Design a non-inverting amplifier to achieve this gain. Specify the values of $R_1$ and $R_2$ assuming you choose $R_1 = 1\text{ k}\Omega$. **(1 mark)**
**(d)** What is the input impedance of your designed non-inverting amplifier? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
Required Gain $A_v = \frac{V_o}{V_{in}} = \frac{5\text{ V}}{0.050\text{ V}} = 100$

**(b)**
The input impedance of the inverting amplifier is equal to $R_1$, which is $100\text{ }\Omega$. The transducer has an internal resistance ($R_S$) of $100\text{ k}\Omega$. When connected, they form a voltage divider. The actual voltage reaching the amplifier will be:
$V_{actual} = 50\text{mV} \times \frac{100}{100\text{k} + 100} \approx 0.05\text{ mV}$.
The signal is almost completely lost due to loading before it even gets amplified.

**(c)**
For a non-inverting amplifier, $A_v = 1 + \frac{R_2}{R_1}$.
We need $A_v = 100$.
$100 = 1 + \frac{R_2}{1\text{k}\Omega}$
$99 = \frac{R_2}{1\text{k}\Omega}$
$R_2 = 99\text{ k}\Omega$

**(d)**
The input impedance $Z_{in}$ of the non-inverting amplifier is theoretically **infinite** (or whatever the finite input impedance of the real op-amp chip is, typically $>2\text{ M}\Omega$). It connects directly to the non-inverting terminal and draws almost zero current, completely preventing the loading effect that ruined the inverting design.
</details>

## Question 2 (3 marks)

The Unity Gain Buffer (Voltage Follower) is defined by $V_o = V_{in}$.

**(a)** Draw the circuit diagram for a Unity Gain Buffer. **(1 mark)**
**(b)** Based on the non-inverting gain equation $A_v = 1 + R_2/R_1$, what are the effective values of $R_1$ and $R_2$ in the buffer? **(1 mark)**
**(c)** If the buffer has a gain of exactly 1, why is it used in electronic circuits instead of a simple wire? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** 
*(Student should draw an op-amp with $V_{in}$ connected to the $(+)$ terminal, and a solid wire connecting the output directly back to the $(-)$ terminal).*

**(b)** 
$R_2$ (the feedback resistor) is $0\text{ }\Omega$ (a short circuit).
$R_1$ (the resistor to ground) is $\infty\text{ }\Omega$ (an open circuit, i.e. it is removed).
$A_v = 1 + 0/\infty = 1 + 0 = 1$.

**(c)**
While a wire transfers both voltage and current (loading the source), the buffer provides **impedance isolation**. It has an incredibly high input impedance (drawing no current from a weak source) and a near-zero output impedance (capable of supplying whatever current a heavy load demands). It "buffers" the weak source from the heavy load.
</details>
