# System Interconnections — Series, Parallel & Feedback

> **Why This Matters**: Real engineering systems are rarely single blocks. Your phone's audio chain has a microphone (transducer), amplifier, filter, ADC, DSP, DAC, amplifier, and speaker — all interconnected. Understanding how systems connect tells you how to build complex systems from simple ones and how to analyse them mathematically.

## Three Fundamental Interconnections

There are exactly three ways to connect two systems, and each has a clean mathematical description. Let's build them up.

[[visual:interconnection-overview]]

## Series (Cascade) Connection

In a series or cascade connection, the output of System #1 becomes the input of System #2:

$$x(t) \longrightarrow \boxed{\text{System } \#1} \longrightarrow x_1(t) \longrightarrow \boxed{\text{System } \#2} \longrightarrow y(t)$$

The intermediate signal $x_1(t)$ is the output of System #1 and the input to System #2. Think of it as an assembly line — each stage processes the signal and passes it along.

[[visual:series-connection]]

For LTI systems with impulse responses $h_1(t)$ and $h_2(t)$:

$$y(t) = x(t) * h_1(t) * h_2(t)$$

In the Laplace domain, this becomes beautifully simple:

$$\boxed{Y(s) = H_1(s) \cdot H_2(s) \cdot X(s)}$$

The overall transfer function is the **product** of the individual transfer functions:

$$H_{total}(s) = H_1(s) \cdot H_2(s)$$

> **Key Insight**: Because convolution is **commutative** ($h_1 * h_2 = h_2 * h_1$), the order of LTI systems in a cascade doesn't matter mathematically. Swapping System #1 and System #2 gives the same overall response! (In practice, order matters for noise and dynamic range, but the input-output relationship is identical.)

[[visual:series-transfer-plotly]]

## Parallel Connection

In a parallel connection, the same input feeds both systems, and their outputs are summed:

$$y(t) = y_1(t) + y_2(t)$$

where $y_1(t)$ is the output of System #1 and $y_2(t)$ is the output of System #2.

[[visual:parallel-connection]]

For LTI systems:

$$y(t) = x(t) * h_1(t) + x(t) * h_2(t) = x(t) * [h_1(t) + h_2(t)]$$

In the Laplace domain:

$$\boxed{Y(s) = [H_1(s) + H_2(s)] \cdot X(s)}$$

The overall transfer function is the **sum** of the individual transfer functions:

$$H_{total}(s) = H_1(s) + H_2(s)$$

[[visual:parallel-transfer-plotly]]

<details>
<summary><strong>Pause & Think</strong>: In a parallel connection, if H₁(s) amplifies low frequencies and H₂(s) amplifies high frequencies, what does the combined system do?</summary>

The combined system amplifies both low and high frequencies — it acts as a broadband amplifier! This is actually how wideband amplifiers are designed in practice: parallel paths handle different frequency bands, and the outputs are summed. The parallel structure lets you combine specialised subsystems.

</details>

## Feedback Connection

Feedback is the most powerful and complex interconnection. The output $y(t)$ is fed back through a **feedback system** and subtracted from (or added to) the input:

$$e(t) = x(t) - y_{fb}(t)$$

where $e(t)$ is the error signal that drives the **forward system**.

[[visual:feedback-connection]]

The forward system has transfer function $G(s)$ (sometimes called the "plant"), and the feedback system has transfer function $F(s)$.

For the feedback loop:

$$Y(s) = G(s) \cdot E(s) = G(s) \cdot [X(s) - F(s) \cdot Y(s)]$$

$$Y(s) = G(s) \cdot X(s) - G(s) \cdot F(s) \cdot Y(s)$$

$$Y(s) [1 + G(s) F(s)] = G(s) \cdot X(s)$$

$$\boxed{H_{total}(s) = \frac{Y(s)}{X(s)} = \frac{G(s)}{1 + G(s) F(s)}}$$

This is the **closed-loop transfer function** — one of the most important formulas in all of control theory and electronics.

[[visual:feedback-formula-plotly]]

> **Watch Out**: The sign of the feedback matters enormously. **Negative feedback** (subtraction at the summing junction) stabilises the system and is used in nearly all amplifiers and control systems. **Positive feedback** (addition) can cause instability and oscillation — useful for oscillator circuits but dangerous in amplifiers. The formula above assumes negative feedback. For positive feedback, the denominator becomes $1 - G(s)F(s)$.

<details>
<summary><strong>Pause & Think</strong>: What happens to the closed-loop transfer function if the forward gain G(s) is very large?</summary>

If $G(s) \to \infty$ and $G(s)F(s) \gg 1$, then $H = G/(1+GF) \approx G/GF = 1/F(s)$. The overall gain depends only on the feedback path, not the forward gain! This is the principle behind op-amp circuits: the op-amp has enormous gain, so the circuit behaviour is determined entirely by the feedback network (resistors). This makes the design robust and predictable.

</details>

[[visual:lecture-page-2]]

## Summary Table

| Interconnection | Overall h(t) | Overall H(s) |
|----------------|-------------|--------------|
| **Series** | $h_1(t) * h_2(t)$ | $H_1(s) \cdot H_2(s)$ |
| **Parallel** | $h_1(t) + h_2(t)$ | $H_1(s) + H_2(s)$ |
| **Feedback** (negative) | Complex | $\frac{G(s)}{1 + G(s)F(s)}$ |

[[visual:summary-comparison]]

## Summary

- Systems can be connected in **series** (cascade), **parallel**, or **feedback** configurations
- **Series**: transfer functions multiply — $H = H_1 \cdot H_2$
- **Parallel**: transfer functions add — $H = H_1 + H_2$
- **Feedback** (negative): $H = G/(1 + GF)$ — the closed-loop transfer function
- Series order doesn't matter for LTI systems (commutativity of convolution)
- Negative feedback stabilises; positive feedback can cause oscillation
- Complex systems are built by combining these three fundamental interconnections
