# Exam Practice — Comparators and Schmitt Triggers

## Question 1 (4 marks)

An op-amp is powered by $\pm 10\text{V}$ power supplies. It is configured as an open-loop comparator. The non-inverting terminal ($V_+$) is connected to a reference voltage of $+2.0\text{V}$. The inverting terminal ($V_-$) is connected to an input signal $V_{in}$.

**(a)** If $V_{in} = 1.9\text{V}$, what is the expected output voltage $V_o$? **(1 mark)**
**(b)** If $V_{in} = 2.1\text{V}$, what is the expected output voltage $V_o$? **(1 mark)**
**(c)** The input signal $V_{in}$ is a sine wave with a peak amplitude of $5\text{V}$. Draw a sketch of the input wave and the resulting output wave $V_o$ over one full cycle. **(1 mark)**
**(d)** Explain the primary disadvantage of this simple comparator circuit if the input sine wave contains high-frequency electrical noise. **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
$V_+$ is $+2.0\text{V}$. $V_-$ ($V_{in}$) is $1.9\text{V}$.
$V_+ > V_-$, so the differential voltage is positive. The op-amp saturates at the positive rail.
$V_o \approx +10\text{V}$.

**(b)**
$V_+$ is $+2.0\text{V}$. $V_-$ ($V_{in}$) is $2.1\text{V}$.
$V_+ < V_-$, so the differential voltage is negative. The op-amp saturates at the negative rail.
$V_o \approx -10\text{V}$.

**(c)**
*(Student should sketch a sine wave oscillating between $+5\text{V}$ and $-5\text{V}$. They should draw a dashed horizontal line at $+2.0\text{V}$. The output $V_o$ should be a square wave that is $+10\text{V}$ whenever the sine wave is BELOW the $+2.0\text{V}$ line, and $-10\text{V}$ whenever the sine wave is ABOVE the $+2.0\text{V}$ line).*

**(d)**
If the input signal is noisy, as it crosses the $2.0\text{V}$ threshold, the noise spikes will cause the signal to rapidly cross back and forth across $2.0\text{V}$ multiple times. The comparator's high open-loop gain will amplify this, causing the output to violently chatter between $+10\text{V}$ and $-10\text{V}$ before settling.
</details>

## Question 2 (3 marks)

To fix the noise issue in the previous question, a Schmitt Trigger circuit is designed. The op-amp is still powered by $\pm 10\text{V}$ supplies.

The output $V_o$ is connected back to the non-inverting terminal $V_+$ through a voltage divider: a $9\text{ k}\Omega$ resistor ($R_1$) and a $1\text{ k}\Omega$ resistor ($R_2$) to ground. The input $V_{in}$ is applied to the inverting terminal $V_-$.

**(a)** Does this circuit utilize positive or negative feedback? **(1 mark)**
**(b)** Calculate the upper threshold voltage ($V_{TU}$) when the output is in its high state ($+10\text{V}$). **(1 mark)**
**(c)** Calculate the lower threshold voltage ($V_{TL}$) when the output is in its low state ($-10\text{V}$). **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
It utilizes **Positive Feedback** because the output is fed back to the non-inverting ($+$) terminal.

**(b)**
When $V_o = +10\text{V}$, the voltage divider feeds a fraction to $V_+$.
$V_{TU} = V_o \times \left( \frac{R_2}{R_1 + R_2} \right)$
$V_{TU} = +10\text{V} \times \left( \frac{1\text{k}}{9\text{k} + 1\text{k}} \right) = +10 \times \left( \frac{1}{10} \right)$
$V_{TU} = +1.0\text{V}$.

**(c)**
When $V_o = -10\text{V}$:
$V_{TL} = V_o \times \left( \frac{R_2}{R_1 + R_2} \right)$
$V_{TL} = -10\text{V} \times \left( \frac{1}{10} \right)$
$V_{TL} = -1.0\text{V}$.
*(The hysteresis band is $2.0\text{V}$ wide, from $-1.0\text{V}$ to $+1.0\text{V}$).*
</details>
