## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **BJT structure**: NPN transistor with base, collector, and emitter terminals
- **Three operating regions**: cutoff (both junctions off), active linear (BE forward-biased, BC reverse-biased), saturation (both forward-biased)
- **The relationship** $I_C = \beta I_B$ in the active region
- **$V_{BE} \approx 0.7$ V** for a silicon transistor in the active region
- **KVL** (Kirchhoff's Voltage Law) around a loop

</details>

---

## Hook: Where Did Half the Signal Go?

Imagine you've just learned about the BJT. You know it can amplify — $I_C = \beta I_B$, so a tiny base current produces a much larger collector current. You're excited. You wire up the simplest possible circuit: a sinusoidal input connected through a resistor to the base, a collector resistor to $V_{CC}$, and you take the output from the collector.

You apply a 1 V peak sinusoid and look at the output.

**More than half the signal is gone.**

The output is $V_{CC}$ for most of the cycle, and only a small portion of the signal appears — distorted and clipped. What happened?

[[visual:unbiased-bjt-circuit]]

---

## The Problem: Signal Clipping

Let's trace through the circuit to understand why. The input signal swings from $+1$ V to $-1$ V. The base-emitter junction of the BJT acts like a diode — it only conducts when $V_{BE} > 0.7$ V.

So what happens cycle by cycle?

**When $v_{in} < 0.7$ V:** The BE junction is off. No base current flows ($I_B = 0$), so no collector current flows ($I_C = 0$). The voltage drop across $R_C$ is zero, and the output is simply:

$$v_{out} = V_{CC} - I_C R_C = V_{CC}$$

The output is stuck at $V_{CC}$ — the transistor is in **cutoff**.

**When $v_{in} > 0.7$ V:** The BE junction turns on. Base current flows:

$$I_B = \frac{v_{in} - 0.7}{R_B}$$

and collector current flows:

$$I_C = \beta I_B = \beta \cdot \frac{v_{in} - 0.7}{R_B}$$

The output voltage drops:

$$v_{out} = V_{CC} - I_C R_C = V_{CC} - \frac{\beta R_C}{R_B}(v_{in} - 0.7)$$

Now the output *does* change with the input — but only for the portion of the cycle where $v_{in} > 0.7$ V. And notice the minus sign: when $v_{in}$ increases, $v_{out}$ decreases. The output is **inverted**.

[[visual:signal-clipping-waveform]]

> **Key Insight**: Without biasing, the transistor spends most of its time in cutoff. Only the peaks of the input signal (above 0.7 V) produce any output. The result is severe distortion — the output is nothing like the input.

[[visual:bjt-regions-map]]

<details>
<summary><strong>Pause & Think</strong>: If the input signal had a peak of 5 V instead of 1 V, would the clipping problem go away?</summary>

Not really. With a 5 V peak, the transistor would be active for a larger fraction of the cycle (when $v_{in} > 0.7$ V), but the negative half of the signal (below 0.7 V) would still be completely lost. You'd see a larger output waveform, but it would still be clipped — the negative half would be flat at $V_{CC}$. The fundamental problem remains: there's no DC bias to keep the transistor active during the negative swing.

</details>

---

## The Solution: Add a DC Bias

The fix is elegant: **add a fixed DC voltage at the base** so that the transistor is always in the active region — even when the input signal goes negative.

If your input can swing to $-1$ V, you need the base voltage to stay above $0.7$ V at all times. So you must add at least $0.7 + 1 = 1.7$ V of DC bias to the base.

With this bias in place:
- When $v_{in} = 0$ (no signal), the transistor is already conducting — it's sitting at a stable **DC operating point** called the **quiescent point** or **Q-point**
- When the signal goes positive, the collector current increases (output decreases)
- When the signal goes negative, the collector current decreases (output increases)
- The full signal is amplified without clipping

[[visual:biasing-solution-diagram]]

[[visual:biased-output-waveform]]

> **Why This Matters**: Biasing is what transforms a BJT from a switch (on/off) into an **amplifier** (proportional output). Without biasing, the BJT is useless for signal processing. Every amplifier circuit you'll ever design starts with biasing.

---

## The Q-Point

The DC conditions when no input signal is present — $V_{CEQ}$, $I_{CQ}$, and $I_{BQ}$ — define the **quiescent point** (Q-point). "Quiescent" means quiet, still, at rest. It's where the transistor sits when nothing is happening.

$$\boxed{\text{Q-point} = (V_{CEQ},\; I_{CQ}) \quad \text{where } I_{CQ} = \beta I_{BQ}}$$

[[visual:qpoint-on-characteristics]]

The Q-point must satisfy two conditions simultaneously:
1. **The transistor's characteristics**: $I_C$ vs $V_{CE}$ curves (depends on $\beta$ and $I_B$)
2. **The external circuit's constraints**: KVL around the collector-emitter loop

The intersection of these two — the transistor characteristics and the circuit constraints — determines the Q-point. We'll formalise this with the **load line** in a later concept.

---

## DC + AC Superposition

With biasing established, the total signal at any point in the circuit is the sum of a **DC component** (set by the bias) and an **AC component** (the signal being amplified):

$$v_{BE}(t) = V_{BEQ} + v_{be}(t) \approx 0.7 + v_{be}(t)$$

$$i_C(t) = I_{CQ} + i_c(t) = \beta I_{BQ} + \beta\,i_b(t)$$

[[visual:dc-ac-superposition]]

The DC part keeps the transistor on. The AC part is what gets amplified. This **superposition** only works because the transistor is operating in the **linear** (active) region — where the output is proportional to the input.

---

## Notation: Keeping DC and AC Straight

In transistor circuits, it's critical to keep track of which quantities are DC, which are AC, and which are the total (DC + AC). The standard notation convention uses the case of the letter and subscript to distinguish them:

[[visual:notation-table]]

| Notation | Meaning | Example |
|----------|---------|---------|
| Capital letter, capital subscript | **DC only** | $I_C = 2$ mA, $V_{CE} = 5$ V |
| Lowercase letter, lowercase subscript | **AC only** (zero average) | $i_c = 0.1 \sin(\omega t)$ mA |
| Lowercase letter, capital subscript | **Total instantaneous** (DC + AC) | $i_C = I_C + i_c$ |
| Capital letter, lowercase subscript | **Phasor / RMS** (steady-state AC) | $I_c = 0.07$ mA (RMS) |

> **Pro Tip**: This notation will appear throughout the rest of the course. Memorise it now and you'll save yourself enormous confusion later. When you see $v_{CE}$, that's AC only. When you see $V_{CE}$, that's DC only. When you see $v_{CE}$ with a capital subscript (like $v_{C}$), that's the total instantaneous value.

<details>
<summary><strong>Pause & Think</strong>: If I_CQ = 2 mA and i_c = 0.5 sin(ωt) mA, what is the total instantaneous collector current at ωt = π/2?</summary>

The total instantaneous current is $i_C = I_{CQ} + i_c = 2 + 0.5\sin(\pi/2) = 2 + 0.5 = 2.5$ mA. At $\omega t = 3\pi/2$, it would be $2 - 0.5 = 1.5$ mA. The current swings symmetrically around the Q-point value of 2 mA.

</details>

---

## The Coupling Capacitor

One practical detail: how do you feed an AC signal into a biased base without disturbing the DC bias?

The answer is a **coupling capacitor** $C_{in}$ placed between the signal source and the base. The key property of a capacitor:

- At **DC** ($\omega = 0$): impedance $X_C = 1/(\omega C) = \infty$ — the capacitor is an **open circuit**. DC bias is completely undisturbed.
- At **signal frequencies** ($\omega \gg 0$): impedance $X_C \approx 0$ — the capacitor is a **short circuit**. The AC signal passes through freely.

[[visual:coupling-capacitor-diagram]]

This means you can connect any signal source — even one with its own DC offset — and only the AC component will reach the base. The bias circuit and the signal source don't interfere with each other.

Similarly, an **output coupling capacitor** $C_{out}$ can be placed at the collector to pass only the AC component of the output, stripping away the DC level $V_{CEQ}$.

---

## Interactive: Explore Bias Levels

[[visual:clipping-explorer-sim]]

Try adjusting the DC bias voltage and the input signal amplitude in the interactive above. Watch how:
- **Too little bias**: the transistor clips in cutoff (negative peaks lost)
- **Too much bias**: the transistor clips in saturation (positive peaks lost)
- **Just right**: the signal swings freely within the active region — clean, undistorted amplification

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Forgetting that $V_{BE}$ must exceed 0.7 V for the BJT to conduct | The BE junction is a diode — it has a turn-on voltage. Without bias, low input signals never turn it on |
| Assuming biasing is optional for amplification | Without biasing, the BJT is a switch, not an amplifier. Biasing is mandatory for linear operation |
| Confusing DC bias with signal amplification | Biasing sets the *operating point*; amplification is what happens to the *small signal* around that point |
| Mixing up notation: $v_{ce}$ vs $V_{CE}$ vs $v_{CE}$ | Lowercase = AC, Capital = DC, mixed = total. Get this wrong and your equations will be inconsistent |

<details>
<summary><strong>Pause & Think</strong>: Why is the output signal inverted relative to the input?</summary>

Look at the output equation: $v_{out} = V_{CC} - I_C R_C$. When $v_{in}$ increases, $I_B$ increases, $I_C = \beta I_B$ increases, and $I_C R_C$ increases. So $v_{out} = V_{CC} - I_C R_C$ *decreases*. The minus sign creates the inversion. This is a fundamental property of the **common-emitter** configuration — it's an inverting amplifier.

</details>

---

## Summary

- Without DC biasing, a BJT **clips** the input signal — the transistor spends most of its time in cutoff, and only peaks above 0.7 V produce output.
- **Biasing** adds a fixed DC voltage at the base to keep the transistor in the **active linear region** at all times, enabling full signal amplification.
- The **Q-point** ($V_{CEQ}$, $I_{CQ}$) is the DC operating point — where the transistor sits with no signal applied.
- The total signal is the **superposition of DC (bias) and AC (signal)**: $v_{BE} = V_{BEQ} + v_{be}$.
- Use the **notation convention** (capital/lowercase letters and subscripts) to distinguish DC, AC, total, and phasor quantities.
- **Coupling capacitors** block DC and pass AC, isolating the bias circuit from the signal source.
