# What Is a System? — Classification & LTI

> **Why This Matters**: Everything in engineering — every amplifier, filter, motor controller, and communication channel — is a system. Before you can analyse, design, or fix any of these, you need a precise language for describing what systems do and what properties they have. The classification you'll learn here determines which powerful mathematical tools you can use. Get this right, and the rest of signals and systems becomes a toolkit you can apply everywhere.

## The System Concept

A system takes an **input signal** and produces an **output signal**. That's the fundamental idea.

$$x(t) \longrightarrow \boxed{\text{System}} \longrightarrow y(t)$$

For continuous-time (CT) systems, the input is $x(t)$ and the output is $y(t)$. For discrete-time (DT) systems, we use $x[n]$ and $y[n]$.

[[visual:system-block-diagram]]

The system "processes" the input according to some rule — it could amplify, filter, delay, distort, or transform the signal in any number of ways. The question is: **what properties does this processing rule have?**

## Linearity — The Superposition Property

A system is **linear** if it satisfies two properties simultaneously:

### Additivity

If input $x_1(t)$ produces output $y_1(t)$, and input $x_2(t)$ produces output $y_2(t)$, then the input $x_1(t) + x_2(t)$ must produce output $y_1(t) + y_2(t)$.

$$x_1(t) + x_2(t) \longrightarrow \boxed{\text{System}} \longrightarrow y_1(t) + y_2(t)$$

In words: the response to a sum equals the sum of the individual responses.

[[visual:additivity-diagram]]

### Scaling (Homogeneity)

If input $x(t)$ produces output $y(t)$, then the input $\alpha \cdot x(t)$ must produce output $\alpha \cdot y(t)$, where $\alpha$ is any scalar constant.

$$\alpha \cdot x(t) \longrightarrow \boxed{\text{System}} \longrightarrow \alpha \cdot y(t)$$

[[visual:scaling-diagram]]

Together, additivity and scaling give **superposition**:

$$\boxed{\alpha_1 x_1(t) + \alpha_2 x_2(t) \longrightarrow \alpha_1 y_1(t) + \alpha_2 y_2(t)}$$

This is enormously powerful. It means you can **break any complex input into simple pieces**, find the response to each piece individually, and then add them up to get the total response. This is the entire foundation of Fourier analysis applied to systems.

<details>
<summary><strong>Pause & Think</strong>: Is a system described by $y(t) = x(t)^2$ linear?</summary>

No! If you double the input, the output quadruples ($(\alpha x)^2 = \alpha^2 x^2 \neq \alpha x^2$), violating the scaling property. Squaring is a nonlinear operation. This is why amplifiers must stay in their linear operating region — if the signal is too large, the output clips (a nonlinear effect) and superposition breaks down.

</details>

## Time Invariance

A system is **time invariant** if shifting the input in time produces the same shift in the output. Formally:

If $x(t) \longrightarrow y(t)$, then $x(t - \tau) \longrightarrow y(t - \tau)$ for any time shift $\tau$.

[[visual:time-invariance-plotly]]

The system's behaviour doesn't change with time — the same input today gives the same output as it would tomorrow. The system's "rule" is **constant** over time.

> **Key Insight**: Time invariance means the input-output relationship is constant with respect to time. The system treats every moment the same way. A system whose parameters change over time (like a time-varying channel in wireless communications) is time-varying and much harder to analyse.

## The LTI Classification

[[visual:lti-classification-plotly]]

Combining these properties gives four categories:

| | Time-Invariant | Time-Varying |
|---|---|---|
| **Linear** | **LTI** ⭐ | Linear Time-Varying |
| **Nonlinear** | Nonlinear TI | Nonlinear TV |

The star of the show is the **LTI (Linear Time-Invariant) system**. Why? Because for LTI systems:

1. **Superposition** applies → break complex inputs into simple pieces
2. **Time invariance** applies → the system is completely characterised by its impulse response $h(t)$
3. The output can be computed via **convolution**: $y(t) = x(t) * h(t)$
4. In the frequency domain: $Y(s) = H(s) \cdot X(s)$ — convolution becomes multiplication!

These facts make LTI systems the only class of systems we can fully analyse with the elegant mathematical tools of Fourier and Laplace transforms. Nearly all the circuits you've studied (resistors, capacitors, inductors in linear combinations) form LTI systems.

[[visual:lti-properties-summary]]

<details>
<summary><strong>Pause & Think</strong>: Can a system be linear but not time-invariant?</summary>

Yes! Consider $y(t) = t \cdot x(t)$. This multiplies the input by time itself. It satisfies superposition (scaling and addition work because $t \cdot [\alpha x_1 + \beta x_2] = \alpha t x_1 + \beta t x_2$), but it's time-varying because the gain changes with time. Such systems arise in, for example, amplitude modulation.

</details>

## Testing System Properties — A Systematic Approach

To test whether a system is LTI:

**Step 1 — Test Linearity:**
- Apply input $\alpha_1 x_1(t) + \alpha_2 x_2(t)$
- Compute the output
- Check if it equals $\alpha_1 y_1(t) + \alpha_2 y_2(t)$

**Step 2 — Test Time Invariance:**
- Replace $x(t)$ with $x(t - \tau)$ in the system equation
- Check if the output becomes $y(t - \tau)$

If both pass → the system is LTI. If either fails → it's not.

[[visual:testing-flowchart]]

> **Watch Out**: A very common mistake is assuming all physical systems are LTI. In reality, every system has nonlinearities somewhere — transistor saturation, mechanical friction, material yielding. We model them as LTI within their **linear operating region**, which is usually "small signal" conditions. This approximation is what makes engineering tractable.

[[visual:lecture-page-1]]

## Summary

- A **system** maps input signals to output signals: $x(t) \to y(t)$
- **Linearity** = additivity + scaling (superposition principle)
- **Time invariance** = shifting input shifts output by the same amount
- **LTI systems** are both linear and time-invariant — the most tractable and important class
- LTI systems are completely characterised by their impulse response $h(t)$
- All the powerful tools (Fourier, Laplace, convolution) apply specifically to LTI systems
- Real systems are approximately LTI within their linear operating region
