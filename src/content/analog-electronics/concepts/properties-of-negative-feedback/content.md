# Properties of Negative Feedback

> **Why This Matters**: You now know that negative feedback reduces gain. But *why* would any sane engineer deliberately throw away gain? Because feedback gives you back something far more valuable than raw gain — it gives you **predictability** and **quality**. In this section, we'll explore the six remarkable benefits that make negative feedback the most used technique in all of electronics engineering.

## The Six Benefits of Negative Feedback

Negative feedback does all of the following:

1. 🎯 **Desensitized (stabilized) gain**
2. 📐 **Reduced nonlinear distortion**
3. 🔇 **Reduced effects of noise**
4. 🔌 **Controlled input and output impedances**
5. 📊 **Extended bandwidth**
6. ⚠️ **All at the cost of reduced gain**

Let's explore each one in depth.

[[visual:six-benefits-overview]]

## Benefit 1: Desensitized Gain

We derived the closed-loop gain formula in the previous section:

$$A_f = \frac{A}{1 + A\beta}$$

Now let's formally prove *how much* the gain sensitivity improves.

### Deriving the Sensitivity Formula

Let's find how a small change $dA$ in the open-loop gain affects the closed-loop gain. We differentiate $A_f$ with respect to $A$:

$$\frac{dA_f}{dA} = \frac{d}{dA}\left(\frac{A}{1+A\beta}\right)$$

Using the quotient rule — the numerator gives $(1+A\beta)$ and the denominator derivative gives $\beta$:

$$\frac{dA_f}{dA} = \frac{(1+A\beta) \cdot 1 - A \cdot \beta}{(1+A\beta)^2} = \frac{1 + A\beta - A\beta}{(1+A\beta)^2} = \frac{1}{(1+A\beta)^2}$$

So:

$$dA_f = \frac{dA}{(1+A\beta)^2}$$

Now, to express this as a *relative* (percentage) change, we divide both sides by $A_f = \frac{A}{1+A\beta}$:

$$\frac{dA_f}{A_f} = \frac{dA}{(1+A\beta)^2} \times \frac{1+A\beta}{A}$$

$$\boxed{\frac{dA_f}{A_f} = \frac{1}{1+A\beta} \cdot \frac{dA}{A}}$$

This is a beautiful result! It says that the **fractional change in $A_f$** is equal to the **fractional change in $A$** divided by the desensitivity factor $D = 1 + A\beta$.

[[visual:sensitivity-reduction]]

The quantity $D = 1 + A\beta$ is called the **desensitivity amount** or the **amount of feedback**. The larger it is, the more the closed-loop gain is "de-sensitized" (made insensitive) to variations in the open-loop gain.

<details>
<summary><strong>Pause & Think</strong>: Why is the assumption that $\beta$ is constant so important?</summary>

The whole magic of desensitized gain relies on $\beta$ being rock-solid. And it is — because $\beta$ is set by **passive components** (resistor dividers), not by active devices. Resistors are manufactured to very tight tolerances (1% or even 0.1%) and their values barely change with temperature. So the assumption that $\beta$ is constant is not just convenient — it's physically realistic. That's the key insight: we're trading dependence on **unreliable active components** (transistors) for dependence on **reliable passive components** (resistors).

</details>

## Benefit 2: Reduced Nonlinear Distortion

Real amplifiers are never perfectly linear. As the signal gets larger, the amplifier's gain starts to change — the transfer characteristic curves away from a straight line. This produces **harmonic distortion** in the output.

[[visual:nonlinear-distortion-comparison]]

Think of it like this: in a perfectly linear amplifier, if you put in a pure sine wave, you get a pure (but larger) sine wave out. But in a real amplifier, the output waveform gets slightly squished or stretched — it's no longer a perfect sine wave. These deformations are the distortion.

### How Feedback Reduces Distortion

Here's the intuitive argument: negative feedback is constantly comparing the output with the input and correcting any differences. If the amplifier starts to distort (because it's not perfectly linear), the feedback signal won't match what it should be, and the error signal at the mixer will adjust to compensate. The result is that the output more closely follows the input.

Mathematically, if the distortion in the open-loop amplifier is $D_{dist}$, then the distortion with feedback is approximately:

$$D_{dist,f} \approx \frac{D_{dist}}{1 + A\beta}$$

The distortion is reduced by the same desensitivity factor! However, there's a catch — the gain is also reduced by $1 + A\beta$. If you try to restore the gain by adding a pre-amplifier stage, you might introduce new distortion from that stage. So the net benefit depends on careful design.

[[visual:distortion-before-after-feedback]]

## Benefit 3: Reduced Effects of Noise

Noise generated *within* the amplifier (like thermal noise from resistors or shot noise from transistors) is treated similarly to distortion — it's an unwanted signal added internally. Feedback reduces the effect of this internal noise by the factor $1 + A\beta$, for the same reason it reduces distortion.

However, there's an important caveat: if the noise appears at the *input* of the amplifier (before the mixer), feedback cannot help at all — it gets amplified just like the desired signal. Feedback only helps with noise generated *inside the feedback loop*.

This is why in receiver design, the **first stage** (often called the Low-Noise Amplifier or LNA) is the most critical — the noise it adds cannot be removed by downstream feedback.

## Benefit 4: Controlled Input and Output Impedances

This is one of the most powerful and practically useful benefits of feedback. By choosing the right feedback topology, you can make the input impedance go **up or down** and the output impedance go **up or down** — exactly as you need for your application.

We'll explore this in complete detail in the next section on feedback topologies, but here's the preview:

[[visual:impedance-control-table]]

| Amplifier Type | Feedback Topology | Input $R_{if}$ | Output $R_{of}$ |
|---|---|---|---|
| Voltage amp | Series-Shunt | $R_i \times D$ ↑ | $R_o / D$ ↓ |
| Transconductance amp | Series-Series | $R_i \times D$ ↑ | $R_o \times D$ ↑ |
| Transresistance amp | Shunt-Shunt | $R_i / D$ ↓ | $R_o / D$ ↓ |
| Current amp | Shunt-Series | $R_i / D$ ↓ | $R_o \times D$ ↑ |

Where $D = 1 + A\beta$ is the desensitivity factor.

The key pattern is:
- **Series mixing** (voltage input) → input impedance **increases** (multiplied by $D$)
- **Shunt mixing** (current input) → input impedance **decreases** (divided by $D$)
- **Shunt sampling** (voltage output) → output impedance **decreases** (divided by $D$)
- **Series sampling** (current output) → output impedance **increases** (multiplied by $D$)

<details>
<summary><strong>Pause & Think</strong>: Does this make intuitive sense?</summary>

Absolutely! For a **voltage amplifier**, you want high input impedance (so it doesn't load the source) and low output impedance (so it can drive any load) — and that's exactly what series-shunt feedback provides. For a **current amplifier**, you want low input impedance (so all the source current flows in) and high output impedance (so the output current goes to the load, not back into the amplifier) — and shunt-series feedback gives you exactly that. Nature is consistent!

</details>

## Benefit 5: Extended Bandwidth

This is a remarkable property: negative feedback increases the bandwidth of the amplifier, at the cost of reduced midband gain. The **gain-bandwidth product** stays approximately constant.

[[visual:bandwidth-extension]]

Here's the key result:

If the open-loop amplifier has:
- Midband gain $A_M$
- Upper cutoff frequency $f_H$
- Lower cutoff frequency $f_L$

Then with feedback:
- Midband gain is reduced to: $A_{Mf} = \frac{A_M}{1 + A_M\beta}$
- Upper cutoff frequency is extended to: $f_{Hf} = f_H \cdot (1 + A_M\beta)$
- Lower cutoff frequency is reduced to: $f_{Lf} = \frac{f_L}{1 + A_M\beta}$

So the bandwidth *opens up* in both directions — the upper cutoff goes higher and the lower cutoff goes lower, both by the factor $D = 1 + A_M\beta$.

The **gain-bandwidth product** is:

$$A_M \cdot f_H = A_{Mf} \cdot f_{Hf}$$

This is constant — you can't get something for nothing! What you lose in gain, you gain in bandwidth.

[[visual:gain-bandwidth-tradeoff]]

## Benefit 6 (The Cost): Reduced Gain

Every single benefit we've discussed comes at the same price: the gain is divided by $D = 1 + A\beta$. This is the fundamental trade-off of negative feedback.

But here's why it's almost always worth it:
- Transistors have *excess* gain — a typical common-emitter stage might have $A_V = 200$, and you might only need $A_V = 20$
- With multi-stage amplifiers, the open-loop gain can be in the thousands or millions
- The extra gain is "wasted" anyway if the amplifier is unstable or distorted

So we're trading something we have in abundance (gain) for things that are hard to achieve any other way (stability, linearity, controlled impedances, bandwidth).

> **The Engineer's Perspective**: Think of negative feedback as a way to "spend" excess gain on buying quality. The more gain you have to spend (larger $A\beta$), the better quality you can buy.

## Summary

| Property | Without Feedback | With Feedback | Change Factor |
|---|---|---|---|
| Gain | $A$ | $\frac{A}{1+A\beta}$ | ÷ $D$ |
| Sensitivity | $\frac{dA}{A}$ | $\frac{1}{D} \cdot \frac{dA}{A}$ | ÷ $D$ |
| Distortion | $D_{dist}$ | $\frac{D_{dist}}{D}$ | ÷ $D$ |
| Internal Noise | $N$ | $\frac{N}{D}$ | ÷ $D$ |
| Upper Bandwidth | $f_H$ | $f_H \cdot D$ | × $D$ |
| Lower Bandwidth | $f_L$ | $\frac{f_L}{D}$ | ÷ $D$ |
| Input Impedance | $R_i$ | $R_i \times D$ or $R_i / D$ | Depends on topology |
| Output Impedance | $R_o$ | $R_o \times D$ or $R_o / D$ | Depends on topology |

Where $D = 1 + A\beta$ throughout.

- Negative feedback reduces gain, sensitivity, distortion, and noise — all by the same factor $D$
- It extends bandwidth by the same factor $D$
- It controls impedances in a way that matches the amplifier type
- The gain-bandwidth product remains approximately constant
- All benefits require the assumption that $\beta$ is stable (which it is, since it's set by passive components)
