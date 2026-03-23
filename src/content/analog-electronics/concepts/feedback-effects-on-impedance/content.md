# Feedback Effects on Input and Output Impedance

> **Why This Matters**: Knowing that "series mixing increases input impedance" is a fact. But *understanding why* — by following the derivation step by step — gives you the power to analyze any feedback circuit you'll ever encounter, including ones your professor hasn't shown you. This is also a very common exam topic, so let's go through it carefully.

## The Core Idea: Why Does Feedback Change Impedance?

Here's the intuitive picture before we get to the math:

**For input impedance**: When you apply feedback, the amplifier "fights back" against any current the source tries to push in. With series feedback, the source has to provide *extra voltage* to overcome the feedback voltage — so it *looks* like a higher impedance. With shunt feedback, the feedback current *helps* establish the input conditions — so it looks like a *lower* impedance.

**For output impedance**: When you look at the output, you're asking "how stiff is this output?" With voltage (shunt) feedback sampling, the feedback constantly monitors the output voltage and corrects for any changes — making the output very stiff against loading (low $R_o$). With current (series) feedback sampling, the feedback monitors the output current and keeps it constant — making the output behave like a current source (high $R_o$).

[[visual:impedance-intuition]]

## Derivation: Input Impedance with Series Mixing

Let's derive the input impedance for the case of **series mixing** (used in series-shunt and series-series topologies).

[[visual:series-mixing-impedance-derivation]]

### Setup

Consider the input loop. The source provides voltage $V_S$. The feedback voltage $V_f$ appears in series. By KVL:

$$V_S = V_i + V_f$$

where $V_i$ is the voltage that actually appears across the amplifier's input terminals ($R_i$).

The input current is:

$$I_i = \frac{V_i}{R_i}$$

Now, $V_f = \beta \cdot X_o$, and $X_o = A \cdot V_i$, so:

$$V_f = \beta \cdot A \cdot V_i$$

### Input Impedance Derivation

The input impedance *with feedback* is defined as the impedance seen by the source:

$$R_{if} = \frac{V_S}{I_i}$$

We know $V_S = V_i + V_f = V_i + \beta A V_i = V_i(1 + \beta A)$

And $I_i = V_i / R_i$

Therefore:

$$R_{if} = \frac{V_i(1 + \beta A)}{V_i / R_i} = R_i \cdot (1 + \beta A)$$

$$\boxed{R_{if} = R_i \times (1 + A\beta) = R_i \times D}$$

The input impedance is **multiplied** by the desensitivity factor $D = 1 + A\beta$.

### Physical Interpretation

Think about it: the source has to provide the total voltage $V_S = V_i + V_f$. But the amplifier only draws current based on $V_i$. So the source provides more voltage ($V_S$) for the same current ($I_i$) — which means the effective resistance is higher. The feedback voltage $V_f$ acts like an extra series resistance, but it's not a real resistor — it's an active "back-EMF" created by the amplifier.

<details>
<summary><strong>Pause & Think</strong>: Is there a maximum limit to how high $R_{if}$ can get?</summary>

In theory, as $A\beta \rightarrow \infty$, $R_{if} \rightarrow \infty$. In practice, $R_{if}$ is limited by the finite gain $A$ of the amplifier and by parasitic effects (stray capacitances, leakage currents). For a practical op-amp with $A = 10^5$ and $\beta = 0.01$, $D = 1001$, so even a modest $R_i = 10\,\text{k}\Omega$ becomes $R_{if} = 10\,\text{M}\Omega$ — which is essentially infinite for most purposes!

</details>

## Derivation: Input Impedance with Shunt Mixing

Now let's derive the input impedance for **shunt mixing** (used in shunt-shunt and shunt-series topologies).

[[visual:shunt-mixing-impedance-derivation]]

### Setup

At the input node, KCL gives:

$$I_S = I_i + I_f$$

The input voltage is $V_i = I_i \cdot R_i$

The feedback current is $I_f = \beta \cdot X_o = \beta \cdot A \cdot I_i$

(Note: here $A$ is the appropriate gain — transresistance $R_M$ for shunt-shunt, or current gain $A_I$ for shunt-series)

### Input Impedance Derivation

The input impedance as seen by the source is:

$$R_{if} = \frac{V_i}{I_S}$$

But we need to express $V_i$ and $I_S$ in compatible terms. Since $V_i = I_i \cdot R_i$ and $I_S = I_i + I_f = I_i + \beta A I_i = I_i(1 + \beta A)$:

$$R_{if} = \frac{I_i \cdot R_i}{I_i(1 + \beta A)} = \frac{R_i}{1 + \beta A}$$

$$\boxed{R_{if} = \frac{R_i}{1 + A\beta} = \frac{R_i}{D}}$$

The input impedance is **divided** by $D$!

### Physical Interpretation

With shunt feedback, the feedback current $I_f$ flows into the input node along with the source current $I_S$. But from the source's perspective, the voltage at the input node ($V_i$) is determined by $I_i \cdot R_i$, which is only a fraction of $I_S$. The rest of $I_S$ ($= I_f$) is "absorbed" by the feedback path. So the source sees a node where most of its current disappears — making the impedance look low.

## Derivation: Output Impedance with Shunt (Voltage) Sampling

For output impedance, we need to "turn off the source" ($V_S = 0$ or $I_S = 0$) and apply a test voltage/current at the output.

[[visual:output-impedance-voltage-sampling]]

### Setup

With the input source turned off and a test voltage $V_t$ applied at the output:

The feedback network samples $V_t$: $X_f = \beta V_t$

With the source off: the error signal is $X_i = 0 - X_f = -\beta V_t$

The amplifier produces: $X_o' = A \cdot (-\beta V_t) = -A\beta V_t$

This internally generated signal opposes $V_t$. The test current is:

$$I_t = \frac{V_t - X_o'}{R_o} = \frac{V_t - (-A\beta V_t)}{R_o} = \frac{V_t(1 + A\beta)}{R_o}$$

### Output Impedance

$$R_{of} = \frac{V_t}{I_t} = \frac{V_t \cdot R_o}{V_t(1 + A\beta)} = \frac{R_o}{1 + A\beta}$$

$$\boxed{R_{of} = \frac{R_o}{D}}$$

Output impedance **decreases** with voltage sampling.

### Physical Interpretation

When you try to change the output voltage (by applying $V_t$), the feedback loop *detects* this change and generates an internal voltage to oppose it. The amplifier actively fights to maintain its output voltage — making the output look like a very stiff (low impedance) voltage source. This is exactly the behavior you want from a voltage amplifier!

## Derivation: Output Impedance with Series (Current) Sampling

[[visual:output-impedance-current-sampling]]

For current sampling, the feedback monitors the output *current*. When you apply a test source, the feedback tries to maintain the output current constant.

By a similar analysis (applying a test current and finding the resulting voltage):

$$\boxed{R_{of} = R_o \times (1 + A\beta) = R_o \times D}$$

Output impedance **increases** with current sampling. The amplifier fights to maintain constant current — making it look like a high-impedance current source. This is exactly what a transconductance or current amplifier needs.

## The Complete Picture: A Memory Aid

Here's a simple way to remember everything:

**"Series Multiplies, Shunt Divides"**

| Connection Type | Where | Effect on Impedance |
|---|---|---|
| **Series** at input (mixing) | Input | $R_{if} = R_i \times D$ |
| **Shunt** at input (mixing) | Input | $R_{if} = R_i / D$ |
| **Shunt** at output (sampling) | Output | $R_{of} = R_o / D$ |
| **Series** at output (sampling) | Output | $R_{of} = R_o \times D$ |

Wait — for the output, shunt divides and series multiplies. So the rule is slightly different:

Actually, the most consistent rule is: **at both input and output, the impedance changes in the direction that makes the amplifier more ideal**.

[[visual:impedance-changes-ideal-direction]]

- Voltage amplifier (Series-Shunt): $R_i \uparrow$ (ideal: $\infty$), $R_o \downarrow$ (ideal: 0) ✓
- Transconductance (Series-Series): $R_i \uparrow$ (ideal: $\infty$), $R_o \uparrow$ (ideal: $\infty$) ✓
- Transresistance (Shunt-Shunt): $R_i \downarrow$ (ideal: 0), $R_o \downarrow$ (ideal: 0) ✓
- Current amplifier (Shunt-Series): $R_i \downarrow$ (ideal: 0), $R_o \uparrow$ (ideal: $\infty$) ✓

**Feedback always pushes the impedances toward their ideal values!** This is the deepest insight about feedback and impedance.

## Numerical Example

An amplifier has:
- Open-loop voltage gain $A_V = 500$
- $R_i = 5\,\text{k}\Omega$, $R_o = 10\,\text{k}\Omega$
- Feedback factor $\beta = 0.02$

This is a series-shunt (voltage amplifier) configuration.

**Step 1**: Calculate $D$:
$$D = 1 + A_V \beta = 1 + 500 \times 0.02 = 1 + 10 = 11$$

**Step 2**: Input impedance:
$$R_{if} = R_i \times D = 5\,\text{k}\Omega \times 11 = 55\,\text{k}\Omega$$

Input impedance went from 5 kΩ to 55 kΩ — an 11× increase!

**Step 3**: Output impedance:
$$R_{of} = \frac{R_o}{D} = \frac{10\,\text{k}\Omega}{11} = 909\,\Omega$$

Output impedance went from 10 kΩ to 909 Ω — an 11× decrease!

Both changes make the amplifier a *better* voltage amplifier.

## Summary

- **Series mixing** at input → $R_{if} = R_i \times D$ (increases)
- **Shunt mixing** at input → $R_{if} = R_i / D$ (decreases)
- **Shunt sampling** at output → $R_{of} = R_o / D$ (decreases)
- **Series sampling** at output → $R_{of} = R_o \times D$ (increases)
- Where $D = 1 + A\beta$ is the desensitivity factor
- Feedback always pushes impedances toward the **ideal values** for that amplifier type
- The physical reason: feedback creates a "virtual" impedance by actively opposing changes — series feedback adds a virtual series impedance (increasing total), shunt feedback adds a virtual parallel path (decreasing total)
