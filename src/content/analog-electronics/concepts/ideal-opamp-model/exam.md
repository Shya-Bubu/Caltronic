# Exam Practice — Ideal Op-Amp Model & Differential Amplifiers

## Question 1 (4 marks)

A differential amplifier has a differential voltage gain of $A_{vd} = 2500$ and a common-mode gain of $A_{cm} = 0.5$.

**(a)** Calculate the Common-Mode Rejection Ratio (CMRR) in absolute ratio. **(1 mark)**
**(b)** Convert the CMRR value to decibels (dB). **(1 mark)**
**(c)** If the inputs are $V_1 = 5.010\text{ V}$ and $V_2 = 4.990\text{ V}$, calculate the difference voltage $V_d$ and the common-mode voltage $V_{cm}$. **(1 mark)**
**(d)** Calculate the total output voltage $V_o$ for these inputs. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** 
$$\text{CMRR} = \frac{A_{vd}}{A_{cm}} = \frac{2500}{0.5} = 5000$$

**(b)**
$$\text{CMRR (dB)} = 20 \log_{10}(5000) = 20 \times 3.699 \approx 74\text{ dB}$$

**(c)**
$$V_d = V_1 - V_2 = 5.010 - 4.990 = 0.020\text{ V} = 20\text{ mV}$$
$$V_{cm} = \frac{V_1 + V_2}{2} = \frac{5.010 + 4.990}{2} = 5.000\text{ V}$$

**(d)**
$$V_o = A_{vd}V_d + A_{cm}V_{cm}$$
$$V_o = (2500 \times 0.020) + (0.5 \times 5.000)$$
$$V_o = 50 + 2.5 = 52.5\text{ V}$$

*(Note: In reality, the op-amp would saturate at its supply rails, typically ±15V or ±24V, so it would just output the max positive rail voltage unless it's a high voltage op-amp).*
</details>

## Question 2 (4 marks)

The BJT differential pair is the foundational building block of the operational amplifier.

**(a)** Explain why a constant current source (tail current) is preferred over a simple emitter resistor $R_E$ in a differential pair. Make reference to the CMRR equation. **(2 marks)**
**(b)** State the two "Golden Rules" of ideal op-amp analysis. **(2 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** The formula for Common-Mode Rejection Ratio is $\text{CMRR} = 1 + \frac{2(1+h_{fe})R_E}{h_{ie}}$. To maximise CMRR (which is desired so the amplifier ignores common noise), the value of $R_E$ must be as large as possible. However, a physically large resistor would require an impractically massive negative supply voltage ($-V_{CC}$) to maintain the correct bias current. A constant current source acts as an active load, providing a very high equivalent AC resistance (massive $R_E$ for the signal) while having a relatively small DC voltage drop.

**(b)** 
1. **Infinite Input Impedance**: No current flows into either the inverting or non-inverting input terminals ($i_+ = 0$ and $i_- = 0$).
2. **Virtual Short (when negative feedback is applied)**: The infinite open-loop gain drives the voltage difference between the input terminals to zero ($V_+ = V_-$), without any physical connection between them.
*(A third acceptable rule is Zero Output Impedance: the output acts as a perfect voltage source).*
</details>

## Question 3 (2 marks)

An op-amp is configured with negative feedback. The non-inverting terminal is connected to a 3V DC source. The output voltage is measured as 6V. 

**(a)** Assuming an ideal op-amp, what is the voltage at the inverting terminal? **(1 mark)**
**(b)** What is the current flowing into the non-inverting terminal? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** $3\text{ V}$. Because negative feedback is present, the virtual short principle applies. The op-amp forces $V_- = V_+$, so the inverting terminal must also be at 3V.

**(b)** $0\text{ A}$. According to the ideal op-amp model, the input impedance is infinite. No current ever flows into the input terminals, regardless of the voltage applied.
</details>
