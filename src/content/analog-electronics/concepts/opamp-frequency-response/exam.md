# Exam Practice — Frequency Response & Bandwidth

## Question 1 (4 marks)

You are designing an audio amplifier using a standard LM741 operational amplifier. The datasheet specifies that the Gain-Bandwidth Product (GBP) is $1\text{ MHz}$. The op-amp is configured as a non-inverting amplifier with $R_1 = 1\text{ k}\Omega$ and a variable feedback resistor $R_F$.

**(a)** State the formula connecting closed-loop gain ($A_f$), open-loop gain ($A_d$), and the feedback factor ($\beta$). **(1 mark)**
**(b)** If you set $R_F = 99\text{ k}\Omega$, calculate the theoretical closed-loop voltage gain $A_f$. **(1 mark)**
**(c)** Using the GBP, calculate the maximum frequency ($f_{max}$) at which the amplifier can operate before the gain begins to drop below its designed value. **(1 mark)**
**(d)** The human hearing range extends up to $20\text{ kHz}$. Will your amplifier in part (b) be suitable for high-fidelity audio reproduction across the entire human hearing range? Justify your answer. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
$A_f = \frac{A_d}{1 + A_d \beta}$

**(b)**
For a non-inverting amplifier:
$A_f = 1 + \frac{R_F}{R_1} = 1 + \frac{99\text{k}}{1\text{k}} = 100$.

**(c)**
$\text{GBP} = \text{Gain} \times \text{Bandwidth}$
$1,000,000\text{ Hz} = 100 \times f_{max}$
$f_{max} = \frac{1,000,000}{100} = 10,000\text{ Hz} = 10\text{ kHz}$.

**(d)**
No, it will not be suitable. The calculated maximum bandwidth is $10\text{ kHz}$. The amplifier's gain will start rolling off at $10\text{ kHz}$, meaning audio frequencies between $10\text{ kHz}$ and $20\text{ kHz}$ (like cymbals, high hats, and vocal "s" sounds) will be heavily muffled or entirely lost. To fix this, you would need an op-amp with a higher GBP or you would need to accept a lower gain (e.g., cascading two amplifiers each with a gain of $10$, which would give a combined gain of $100$ but a bandwidth of $100\text{ kHz}$ each).
</details>

## Question 2 (3 marks)

Discuss the relationship between Open-Loop Gain and Closed-Loop Gain.

**(a)** What causes the open-loop gain of an op-amp to roll off at very low frequencies (e.g., $10\text{ Hz}$)? **(1 mark)**
**(b)** If the open-loop gain drops from $200,000$ to $100,000$ due to a temperature change, explain why a closed-loop amplifier with a designed gain of $10$ remains almost perfectly stable at a gain of $10$. **(1 mark)**
**(c)** Describe the mathematical approximation that proves the statement in part (b). **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
The manufacturer intentionally builds a microscopic compensation capacitor into the silicon chip. This acts as an internal low-pass filter specifically designed to kill the gain at high frequencies to prevent the amplifier from accidentally turning into an unstable radio-frequency oscillator.

**(b)**
Negative feedback works by comparing the output to the input and forcing the output to whatever voltage minimizes the difference. As long as the op-amp has *enough* raw gain to perform this forcing action, the exact number doesn't matter. The closed-loop gain is determined entirely by the physical external resistors, which don't care about the op-amp's internal temperature.

**(c)**
The exact formula is $A_f = \frac{A_d}{1 + A_d \beta}$.
If $A_d$ is massively large (e.g. $100,000$), then the term $A_d \beta \gg 1$.
The "$+1$" in the denominator becomes negligible.
$A_f \approx \frac{A_d}{A_d \beta}$
The $A_d$ terms cancel out in the numerator and denominator, leaving:
$A_f \approx \frac{1}{\beta}$.
This proves the closed-loop gain depends completely on $\beta$ (the external resistor network) and is totally independent of $A_d$.
</details>

## Question 3 (3 marks)

You need an amplifier with a voltage gain of $1000$ that can operate up to $50\text{ kHz}$ for an ultrasonic sensor array.

**(a)** What is the required Gain-Bandwidth Product (GBP) for this application? **(1 mark)**
**(b)** You only have LM741 op-amps ($\text{GBP} = 1\text{ MHz}$) in your parts bin. What is the maximum bandwidth a SINGLE LM741 can provide if configured for a gain of $1000$? **(1 mark)**
**(c)** Explain how you could logically combine *three* LM741 op-amps to achieve both the required gain of $1000$ AND the required $50\text{ kHz}$ bandwidth. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
Required GBP = Gain $\times$ Bandwidth = $1000 \times 50,000\text{ Hz} = 50\text{ MHz}$.

**(b)**
Max Bandwidth = $\text{GBP} / \text{Gain} = 1,000,000 / 1000 = 1\text{ kHz}$.
A single LM741 fails completely, reaching only $1/50$th of the required speed.

**(c)**
Instead of one stage with a massive gain of $1000$, you can **cascade** (daisy-chain) three separate inverting amplifiers, each configured with a very low gain of $10$.
Total System Gain = $10 \times 10 \times 10 = 1000$.
Bandwidth of *each* individual stage = $1\text{ MHz} / 10 = 100\text{ kHz}$.
Since $100\text{ kHz}$ is well above the required $50\text{ kHz}$, the cascaded system successfully achieves both the high $50\text{ kHz}$ bandwidth and the massive overall gain of $1000$ using slow $1\text{ MHz}$ parts.
</details>
