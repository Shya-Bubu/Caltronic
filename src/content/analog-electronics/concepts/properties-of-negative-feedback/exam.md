# Exam Practice — Properties of Negative Feedback

## Question 1 (6 marks)

An amplifier has a midband gain of $A_M = 5000$, an upper cutoff frequency of $f_H = 50$ kHz, and generates 8% harmonic distortion at full output.

A negative feedback network with $\beta = 0.004$ is applied.

**(a)** Calculate the desensitivity factor $D$. **(1 mark)**

**(b)** Find the new midband gain, upper cutoff frequency, and harmonic distortion. **(3 marks)**

**(c)** Verify that the gain-bandwidth product is conserved. **(2 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** $D = 1 + A_M\beta = 1 + 5000 \times 0.004 = 1 + 20 = 21$

**(b)**
- New midband gain: $A_{Mf} = \frac{5000}{21} = 238.1$
- New upper cutoff frequency: $f_{Hf} = 50\,\text{kHz} \times 21 = 1.05\,\text{MHz}$
- New distortion: $D_{f} = \frac{8\%}{21} = 0.38\%$

**(c)** Without feedback: $A_M \times f_H = 5000 \times 50\,\text{kHz} = 250 \times 10^6$

With feedback: $A_{Mf} \times f_{Hf} = 238.1 \times 1.05 \times 10^6 = 250 \times 10^6$ ✓

The gain-bandwidth product is conserved.

</details>

## Question 2 (5 marks)

**(a)** Derive the expression for the closed-loop sensitivity: $\frac{dA_f}{A_f} = \frac{1}{1+A\beta} \cdot \frac{dA}{A}$ **(3 marks)**

**(b)** An amplifier with $A = 10^4$ has its gain changing by 20% due to temperature. If the maximum allowable change in $A_f$ is 0.1%, what is the minimum value of $\beta$ required? **(2 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
$A_f = \frac{A}{1+A\beta}$

$\frac{dA_f}{dA} = \frac{1}{(1+A\beta)^2}$

$dA_f = \frac{dA}{(1+A\beta)^2}$

$\frac{dA_f}{A_f} = \frac{dA}{(1+A\beta)^2} \cdot \frac{1+A\beta}{A} = \frac{1}{1+A\beta} \cdot \frac{dA}{A}$

**(b)** We need: $\frac{dA_f}{A_f} \leq 0.1\%$

$\frac{0.1\%}{} = \frac{1}{1+A\beta} \times 20\%$

$\frac{1}{1+A\beta} = \frac{0.1}{20} = 0.005$

$1 + A\beta = 200$

$A\beta = 199$

$\beta = \frac{199}{10^4} = 0.0199 \approx 0.02$

</details>

## Question 3 (4 marks)

Explain, using the feedback block diagram and relevant equations, why negative feedback:

**(a)** Reduces nonlinear distortion. **(2 marks)**

**(b)** Cannot reduce noise that enters at the amplifier input (before the mixer). **(2 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** Distortion is generated internally within the amplifier block. In the feedback model, it can be represented as an unwanted signal $D_{dist}$ added at the amplifier output. The feedback loop samples this distortion along with the desired signal and feeds it back to the input with opposite polarity. This generates an error signal that partially cancels the distortion at the output. The net distortion is reduced by the factor $1 + A\beta$ because the feedback loop effectively treats the distortion as a deviation from the expected output and corrects for it.

**(b)** Noise at the input (before the mixer) enters the system at the same point as the desired signal $X_S$. The amplifier (and feedback loop) cannot distinguish between the desired signal and the noise — both are amplified by the same closed-loop gain $A_f$. Therefore, the signal-to-noise ratio at the input is preserved at the output. Feedback can only reduce noise that is generated *inside* the loop (between the mixer and the sampling point).

</details>
