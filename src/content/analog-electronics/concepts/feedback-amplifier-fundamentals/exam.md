# Exam Practice — Feedback Amplifier Fundamentals

## Question 1 (5 marks)

An amplifier has an open-loop voltage gain of $A_V = 2000$. A negative feedback network with $\beta = 0.005$ is applied.

**(a)** Calculate the closed-loop gain $A_{Vf}$. **(2 marks)**

**(b)** If the open-loop gain changes by 25% (increases to 2500) due to temperature variation, calculate the new closed-loop gain and the percentage change in $A_{Vf}$. **(3 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)**
$$A_{Vf} = \frac{A_V}{1 + A_V \beta} = \frac{2000}{1 + 2000 \times 0.005} = \frac{2000}{1 + 10} = \frac{2000}{11} \approx 181.8$$

**(b)** With $A_V = 2500$:
$$A_{Vf,new} = \frac{2500}{1 + 2500 \times 0.005} = \frac{2500}{1 + 12.5} = \frac{2500}{13.5} \approx 185.2$$

Percentage change in $A_{Vf}$:
$$\frac{185.2 - 181.8}{181.8} \times 100\% \approx 1.87\%$$

So a 25% change in open-loop gain results in less than 2% change in closed-loop gain. The desensitivity factor $D = 11$ reduces the sensitivity by a factor of 11.

</details>

## Question 2 (5 marks)

**(a)** Starting from the feedback block diagram, derive the expression for the closed-loop gain $A_f = \frac{A}{1 + A\beta}$. **(3 marks)**

**(b)** Show that the sensitivity of the closed-loop gain to changes in the open-loop gain is given by $\frac{dA_f}{A_f} = \frac{1}{1 + A\beta} \cdot \frac{dA}{A}$. Explain the significance of this result. **(2 marks)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** From the block diagram:
- Error signal: $X_i = X_S - X_f$
- Output: $X_o = A \cdot X_i = A(X_S - X_f)$
- Feedback: $X_f = \beta X_o$

Substituting: $X_o = A(X_S - \beta X_o)$

$X_o = AX_S - A\beta X_o$

$X_o(1 + A\beta) = AX_S$

$$A_f = \frac{X_o}{X_S} = \frac{A}{1 + A\beta}$$

**(b)** Differentiating $A_f = \frac{A}{1+A\beta}$ with respect to $A$:

$$\frac{dA_f}{dA} = \frac{(1+A\beta) - A\beta}{(1+A\beta)^2} = \frac{1}{(1+A\beta)^2}$$

Therefore:
$$dA_f = \frac{dA}{(1+A\beta)^2}$$

Dividing by $A_f = \frac{A}{1+A\beta}$:

$$\frac{dA_f}{A_f} = \frac{dA}{(1+A\beta)^2} \cdot \frac{1+A\beta}{A} = \frac{1}{1+A\beta} \cdot \frac{dA}{A}$$

**Significance**: The fractional change in closed-loop gain is reduced by the desensitivity factor $D = 1 + A\beta$ compared to the fractional change in open-loop gain. This is the mathematical proof that negative feedback makes the gain stable.

</details>

## Question 3 (4 marks)

A feedback amplifier needs to have a closed-loop gain of exactly 50. The available amplifier has $A = 10{,}000$ but this value varies by ±10%.

**(a)** What value of $\beta$ is needed? **(1 mark)**

**(b)** Calculate the actual range of $A_f$ values when $A$ varies from 9000 to 11000. **(2 marks)**

**(c)** What is the percentage variation in $A_f$? **(1 mark)**

<details>
<summary><strong>Solution</strong></summary>

**(a)** From $A_f \approx \frac{1}{\beta}$: $\beta = \frac{1}{50} = 0.02$

More precisely: $A_f = \frac{A}{1+A\beta}$, so $50 = \frac{10000}{1+10000\beta}$, giving $1+10000\beta = 200$, so $\beta = \frac{199}{10000} = 0.0199 \approx 0.02$.

**(b)** When $A = 9000$:
$$A_f = \frac{9000}{1 + 9000 \times 0.02} = \frac{9000}{181} = 49.72$$

When $A = 11000$:
$$A_f = \frac{11000}{1 + 11000 \times 0.02} = \frac{11000}{221} = 49.77$$

**(c)** Range: 49.72 to 49.77, centered around ≈ 49.75.

Percentage variation: $\frac{49.77 - 49.72}{49.75} \times 100\% \approx 0.1\%$

A ±10% variation in $A$ produces only ±0.05% variation in $A_f$!

</details>
