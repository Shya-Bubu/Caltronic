# Feedback Amplifiers: The Big Picture

> **Why This Matters**: Every amplifier you've studied so far — common emitter, common collector, multi-stage — has been an *open-loop* amplifier. But in the real world, almost every practical amplifier uses **feedback**. Feedback is the single most powerful technique in electronics engineering. It lets you trade something you have too much of (gain) for things you desperately need: stability, predictability, and control. Understanding feedback is the key to understanding modern electronic systems, from audio amplifiers to control systems to op-amps.

## Open-Loop vs Closed-Loop: What's the Difference?

Think of it like driving a car. An **open-loop** system is like driving blindfolded — you set the steering wheel and *hope* you stay on the road. A **closed-loop** system is normal driving — you constantly look at the road, compare where you *are* with where you *want to be*, and adjust the steering.

In electronics:
- **Open-loop amplifier** — No connection from the output back to the input. The output is determined entirely by the input and the amplifier's internal gain $A$. If $A$ changes (due to temperature, aging, or manufacturing variations), the output changes unpredictably.
- **Closed-loop amplifier** — A portion of the output signal is fed back to the input through a **feedback network**. The amplifier constantly "corrects" itself by comparing its actual output with the desired output.

[[visual:open-vs-closed-loop]]

<details>
<summary><strong>Pause & Think</strong>: If open-loop amplifiers are simpler, why would we ever add the complexity of feedback?</summary>

Because open-loop amplifiers are *unreliable*. The gain $A$ of a transistor amplifier depends on $h_{FE}$ (or $\beta$), which varies wildly — even transistors from the same manufacturing batch can have $h_{FE}$ values anywhere from 50 to 300. With feedback, the closed-loop gain depends on **resistor ratios** instead, and resistors are extremely stable and precise. So feedback makes the amplifier behave predictably despite the unpredictable transistors inside it!

</details>

## The Feedback Block Diagram

Every feedback amplifier, no matter how complex the actual circuit, can be represented by this universal block diagram:

[[visual:feedback-block-diagram]]

Here are the four building blocks:

1. **Signal Source** — provides the input signal $X_S$ (can be a voltage $V_S$ or a current $I_S$)
2. **Mixer (Comparator)** — combines the input signal with the feedback signal. For negative feedback, it *subtracts* the feedback from the input: $X_i = X_S - X_f$
3. **Basic Amplifier** — the amplifier without feedback, with forward transfer gain $A$. It produces the output: $X_o = A \cdot X_i$
4. **Feedback Network** — samples the output and produces the feedback signal: $X_f = \beta \cdot X_o$

Here, $X$ represents a general signal — it can be a voltage or a current depending on the type of amplifier.

> **Important**: The symbol $\beta$ here is the **feedback factor** — the fraction of the output that is fed back. Do **not** confuse this with the transistor $\beta$ (which is $h_{FE}$, the current gain of a BJT). They are completely different quantities that unfortunately share the same Greek letter! The feedback $\beta$ is typically set by a ratio of passive components like resistors, so for example $\beta = \frac{R_2}{R_1 + R_2}$, and it is usually much less than 1 ($\beta < 1$).

## Deriving the Closed-Loop Gain

Let's derive the most important equation in feedback theory. Starting from our block diagram:

The mixer produces:

$$X_i = X_S - X_f$$

The amplifier amplifies this:

$$X_o = A \cdot X_i = A \cdot (X_S - X_f)$$

The feedback network feeds back a fraction of the output:

$$X_f = \beta \cdot X_o$$

Now we substitute the expression for $X_f$ into the output equation:

$$X_o = A \cdot (X_S - \beta \cdot X_o)$$

Expand:

$$X_o = A \cdot X_S - A \cdot \beta \cdot X_o$$

Collect the $X_o$ terms on the left side:

$$X_o + A \cdot \beta \cdot X_o = A \cdot X_S$$

Factor out $X_o$:

$$X_o \cdot (1 + A\beta) = A \cdot X_S$$

And finally, the **closed-loop gain** $A_f$ is:

$$\boxed{A_f = \frac{X_o}{X_S} = \frac{A}{1 + A\beta}}$$

This is the **fundamental feedback equation**. Everything else in this chapter flows from this single result.

[[visual:closed-loop-gain-derivation]]

## Understanding the Key Terminology

Let's give names to the quantities that appear in our fundamental equation:

| Term | Symbol | Meaning |
|---|---|---|
| **Open-loop gain** | $A$ | Gain of the amplifier without any feedback |
| **Feedback factor** | $\beta$ | Fraction of the output fed back (set by passive components) |
| **Loop gain** | $T = A\beta$ | The product of gains around the entire loop |
| **Amount of feedback** | $D = 1 + A\beta$ | The factor by which gain is reduced (also called the **desensitivity factor**) |
| **Closed-loop gain** | $A_f = \frac{A}{1+A\beta}$ | The overall gain with feedback applied |

[[visual:loop-gain-visualization]]

<details>
<summary><strong>Pause & Think</strong>: What happens to the closed-loop gain when $A$ is very large?</summary>

If $A \gg 1$ (which is very common — transistor amplifiers can easily have gains of 1000 or more), then $A\beta \gg 1$, so:

$$A_f = \frac{A}{1 + A\beta} \approx \frac{A}{A\beta} = \frac{1}{\beta}$$

The gain becomes approximately $\frac{1}{\beta}$, which depends **only on the feedback network** — not on the amplifier gain $A$ at all! Since $\beta$ is set by stable, precise resistors, the closed-loop gain is now rock-solid. This is the magic of feedback.

</details>

## The Power of $\frac{1}{\beta}$: Why Feedback Works

Let's put numbers to this to see how remarkable this result is.

**Example**: Suppose you have an amplifier with $A = 1000$ and a feedback network with $\beta = 0.01$ (which means $\beta = \frac{R_2}{R_1 + R_2}$ for some resistor divider).

The loop gain is: $T = A\beta = 1000 \times 0.01 = 10$

The desensitivity factor is: $D = 1 + T = 11$

The closed-loop gain is:
$$A_f = \frac{1000}{11} \approx 90.9$$

Now suppose the amplifier gain drifts by 20% (say, due to temperature change) to $A = 1200$:

$$A_f = \frac{1200}{1 + 1200 \times 0.01} = \frac{1200}{13} \approx 92.3$$

The amplifier gain changed by **20%**, but the closed-loop gain changed by only about **1.5%**! The feedback absorbed the variation. And the ideal value $\frac{1}{\beta} = \frac{1}{0.01} = 100$ — the closed-loop gain is approaching this stable value.

[[visual:gain-stabilization-example]]

## Temperature Stabilization with Complementary Pairs

One practical way to improve open-loop stability before even applying feedback is to use both **NPN and PNP transistors** together in the same circuit. This is called a **complementary pair**.

Here's why this works: every BJT has a base-emitter voltage $V_{BE}$ that changes with temperature at about $-2$ mV/°C. If you use only NPN transistors, all the $V_{BE}$ shifts add up in the same direction, making the operating point drift badly. But if you pair an NPN with a PNP transistor, their $V_{BE}$ temperature coefficients **cancel each other out** — one goes up while the other goes down. The net drift is greatly reduced.

This is commonly done in multi-stage amplifiers before applying external feedback, giving you double protection against temperature variations.

[[visual:complementary-pair-temperature]]

## Multi-Stage Closed-Loop Amplifier Example

Even a single-stage amplifier can use feedback, but the concept becomes especially powerful in multi-stage amplifiers. Consider a two-stage common-emitter amplifier with a feedback resistor $R_f$ connected from the output (collector of the second stage) back to the input (emitter of the first stage):

[[visual:two-stage-feedback-amplifier]]

In this circuit:
- The **DC operating point** is set by the ratio $R_f : R_{E1}$ — the feedback resistor and the emitter resistor of the first stage control the DC biasing
- The **AC gain** is set by the ratio $R_f : R_{C}$ — the feedback resistor and the collector resistor control the voltage gain
- The overall gain is stabilized by the feedback loop, making it far less sensitive to transistor parameter variations

This is an example of an **inverting amplifier with feedback** — the output is 180° out of phase with the input, and the feedback connection ensures that the loop provides negative feedback (which is what we want for stabilization).

## Positive vs Negative Feedback: A Critical Distinction

The sign of the feedback determines the amplifier's behavior dramatically:

**Negative feedback** ($A\beta > 0$, so the denominator $1 + A\beta > 1$):
- Gain is **reduced** by the factor $D = 1 + A\beta$
- Amplifier becomes **stable and predictable**
- This is what we use in almost all amplifier design

**Positive feedback** ($A\beta < 0$, so the denominator $1 + A\beta < 1$):
- Gain **increases** — the amplifier becomes more sensitive
- If $|A\beta| = 1$, the denominator becomes zero and the gain is theoretically infinite — the circuit **oscillates**
- This is used in **oscillator design**, not in amplifiers

> **Key Rule**: For feedback to be negative, the feedback signal must be **subtracted** from the input. In practice, this means the feedback signal must arrive at the mixer with the correct polarity to oppose the input.

[[visual:positive-vs-negative-feedback]]

## Summary

- **Open-loop amplifiers** have no feedback — gain depends on transistor parameters and is unstable
- **Closed-loop amplifiers** use feedback to stabilize gain — the closed-loop gain depends on the stable feedback network
- The **fundamental feedback equation**: $A_f = \frac{A}{1 + A\beta}$
- The **loop gain** $T = A\beta$ determines how much the feedback controls the circuit
- When $A$ is large, $A_f \approx \frac{1}{\beta}$ — gain depends only on passive components
- The **desensitivity factor** $D = 1 + A\beta$ quantifies how much feedback reduces sensitivity to amplifier variations
- **Negative feedback** reduces gain but stabilizes it; **positive feedback** increases gain and can cause oscillation
- Complementary NPN/PNP pairs provide additional temperature stability
