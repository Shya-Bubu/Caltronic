# Exam Practice — Feedback Effects on Impedance

## Question 1 (6 marks)

A voltage amplifier uses series-shunt feedback with the following parameters:
- Open-loop voltage gain: $A_V = 1000$
- Input resistance without feedback: $R_i = 2\,\text{k}\Omega$
- Output resistance without feedback: $R_o = 50\,\text{k}\Omega$
- Feedback factor: $\beta = 0.01$

**(a)** Calculate the desensitivity factor $D$. **(1 mark)**

**(b)** Calculate the input resistance with feedback $R_{if}$. **(1 mark)**

**(c)** Calculate the output resistance with feedback $R_{of}$. **(1 mark)**

**(d)** Verify that the impedance changes are consistent with the ideal requirements for a voltage amplifier. **(3 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** $D = 1 + A_V\beta = 1 + 1000 \times 0.01 = 1 + 10 = 11$

**(b)** Series mixing at input:
$$R_{if} = R_i \times D = 2\,\text{k}\Omega \times 11 = 22\,\text{k}\Omega$$

**(c)** Shunt sampling at output:
$$R_{of} = \frac{R_o}{D} = \frac{50\,\text{k}\Omega}{11} = 4.55\,\text{k}\Omega$$

**(d)** For an ideal voltage amplifier:
- $R_i$ should be as large as possible (ideally $\infty$) → $R_{if}$ increased from 2 kΩ to 22 kΩ ✓
- $R_o$ should be as small as possible (ideally 0) → $R_{of}$ decreased from 50 kΩ to 4.55 kΩ ✓

Both impedances moved toward their ideal values by the factor $D = 11$.

The voltage gain with feedback: $A_{Vf} = 1000/11 = 90.9$ (reduced from 1000, which is the expected trade-off).

</details>

## Question 2 (5 marks)

Derive the expression for the output impedance with feedback for the case of voltage (shunt) sampling, showing that $R_{of} = R_o / (1 + A\beta)$.

<details>
<summary><strong>Solution</strong></summary>

To find $R_{of}$, we set the input source to zero ($V_S = 0$) and apply a test voltage $V_t$ at the output.

With $V_S = 0$:
- The feedback signal is: $X_f = \beta V_t$
- The error signal at the mixer: $X_i = 0 - X_f = -\beta V_t$
- The amplifier produces: $V_{amp} = A \cdot X_i = A \cdot (-\beta V_t) = -A\beta V_t$

The test current through $R_o$:
$$I_t = \frac{V_t - V_{amp}}{R_o} = \frac{V_t - (-A\beta V_t)}{R_o} = \frac{V_t(1 + A\beta)}{R_o}$$

Therefore the output impedance with feedback:
$$R_{of} = \frac{V_t}{I_t} = \frac{R_o}{1 + A\beta}$$

**Physical interpretation**: When the test voltage tries to change the output, the feedback detects this change and the amplifier generates an internal voltage $A\beta V_t$ that opposes the test voltage. This active opposition makes the output appear as a very low impedance source, dividing $R_o$ by $D = 1 + A\beta$.

</details>

## Question 3 (4 marks)

An amplifier has $A = 200$, $R_i = 1\,\text{k}\Omega$, $R_o = 40\,\text{k}\Omega$, and uses shunt-series feedback with $\beta = 0.05$.

**(a)** What type of amplifier is this? **(1 mark)**

**(b)** Calculate $R_{if}$ and $R_{of}$. **(2 marks)**

**(c)** Are the impedance changes consistent with what you'd expect? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** Shunt-Series topology → **Current amplifier** (current in, current out)

**(b)** $D = 1 + A\beta = 1 + 200 \times 0.05 = 11$

Shunt mixing at input: $R_{if} = R_i / D = 1000/11 = 90.9\,\Omega$

Series sampling at output: $R_{of} = R_o \times D = 40\,\text{k}\Omega \times 11 = 440\,\text{k}\Omega$

**(c)** For an ideal current amplifier:
- $R_i$ should be low (ideally 0) → went from 1 kΩ to 90.9 Ω ✓
- $R_o$ should be high (ideally ∞) → went from 40 kΩ to 440 kΩ ✓

Both are consistent. Low $R_{if}$ absorbs current from the source, high $R_{of}$ ensures output current goes to the load.

</details>
