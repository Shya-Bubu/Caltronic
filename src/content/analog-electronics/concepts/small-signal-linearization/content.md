# Small-Signal Linearization of the BJT

## The Problem: BJTs Are Nonlinear

Here's the challenge you face as a circuit designer. You've carefully biased your BJT to sit at a nice Q-point in the active region. Now you want to amplify a signal. But the relationship between the base-emitter voltage and the base current is an *exponential*:

$$I_B = \frac{I_S}{\beta} \cdot e^{V_{BE}/V_T}$$

where $V_T \approx 26$ mV is the thermal voltage at room temperature.

This is fundamentally nonlinear — the curve gets steeper and steeper as $V_{BE}$ increases. So how can we use linearcircuit analysis techniques (KVL, KCL, superposition, Thévenin) on a device that doesn't obey linear rules?

[[visual:bjt-exponential-curve]]

The answer lies in a beautiful mathematical trick: if the signal is *small enough*, even an exponential curve looks like a straight line.

> **Why This Matters**: Every amplifier analysis technique you'll learn in this course — h-parameters, hybrid-π, voltage gain formulas — rests on this linearization. If you understand *why* it works, you'll never be confused about *when* it works.

## The Key Insight: Zooming In

Think of it this way. The curve of $I_B$ versus $V_{BE}$ looks wildly nonlinear when you see the full picture. But now imagine zooming into a tiny region around the Q-point — say, a window just 10 mV wide.

At that magnification, even an exponential curve looks almost perfectly straight. The curvature is still there, but it's so slight that you can't see it at this scale.

[[visual:zoom-linearization]]

This is exactly what happens when you apply a small AC signal. The total base-emitter voltage is:

$$v_{BE} = V_{BEQ} + v_{be}$$

where $V_{BEQ}$ is the DC bias value (about 0.7 V) and $v_{be}$ is the tiny AC signal.  If $v_{be}$ is small enough, the operating point just nudges back and forth along what is essentially a straight line.

## The Mathematics: Taylor Series Expansion

Let's make this precise. The total base current is:

$$I_B = \frac{I_S}{\beta} \cdot e^{(V_{BEQ} + v_{be})/V_T}$$

We can split this exponential:

$$I_B = \underbrace{\frac{I_S}{\beta} \cdot e^{V_{BEQ}/V_T}}_{I_{BQ}} \cdot e^{v_{be}/V_T}$$

The first factor is just the DC bias current $I_{BQ}$. So:

$$I_B = I_{BQ} \cdot e^{v_{be}/V_T}$$

Now apply the Taylor series expansion to the exponential:

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

Setting $x = v_{be}/V_T$:

$$I_B = I_{BQ} \left(1 + \frac{v_{be}}{V_T} + \frac{1}{2}\left(\frac{v_{be}}{V_T}\right)^2 + \cdots \right)$$

[[visual:taylor-expansion-terms]]

## The Small-Signal Condition

Here's the critical step. Look at the second-order term: $(v_{be}/V_T)^2 / 2$. For this series to converge *and* for the linear approximation to be valid, we need the higher-order terms to be negligible compared to the first-order term.

This requires:

$$\frac{v_{be}}{V_T} \ll 1$$

Since $V_T = 26$ mV at room temperature, we get the **small-signal condition**:

$$\boxed{v_{be} \ll V_T \approx 26 \text{ mV}}$$

> **Key Insight**: As a practical rule of thumb, we require $v_{be} < 10$ mV. This keeps the error from the dropped higher-order terms below about 10%, which is acceptable for engineering purposes.

If $v_{be} = 10$ mV, then $v_{be}/V_T \approx 0.385$. The second-order term is $(0.385)^2/2 \approx 0.074$, which is about 19% of the first-order term. That's on the edge. If $v_{be} = 2.6$ mV, the error drops to about 5%. The smaller the signal, the better the approximation.

[[visual:linearization-error]]

## The Linear Result

Dropping the higher-order terms, we get:

$$I_B \approx I_{BQ} + I_{BQ} \cdot \frac{v_{be}}{V_T}$$

This separates neatly into DC and AC parts:

$$I_B = \underbrace{I_{BQ}}_{\text{DC}} + \underbrace{\frac{I_{BQ}}{V_T} \cdot v_{be}}_{\text{AC} = i_b}$$

So the AC base current is:

$$\boxed{i_b = \frac{I_{BQ}}{V_T} \cdot v_{be}}$$

This is a **linear relationship** between $v_{be}$ and $i_b$! The ratio $I_{BQ}/V_T$ is a constant (it depends only on the Q-point, which is fixed by the bias circuit).

Similarly, since $i_c = \beta \cdot i_b$ in the active region:

$$i_c = \frac{\beta I_{BQ}}{V_T} \cdot v_{be} = \frac{I_{CQ}}{V_T} \cdot v_{be} = g_m \cdot v_{be}$$

where $g_m = I_{CQ}/V_T$ is the **transconductance** — a key parameter you'll use constantly.

[[visual:linear-ac-model]]

## Separating AC and DC

Once the BJT is linearised, we can separate every voltage and current in the circuit into DC and AC components:

| Quantity | Total (DC + AC) | DC only | AC only |
|----------|----------------|---------|---------|
| Base-emitter voltage | $v_{BE} = V_{BEQ} + v_{be}$ | $V_{BEQ}$ | $v_{be}$ |
| Base current | $i_B = I_{BQ} + i_b$ | $I_{BQ}$ | $i_b$ |
| Collector current | $i_C = I_{CQ} + i_c$ | $I_{CQ}$ | $i_c$ |
| Collector-emitter voltage | $v_{CE} = V_{CEQ} + v_{ce}$ | $V_{CEQ}$ | $v_{ce}$ |

> **Watch Out**: Remember the notation convention from Lesson 4. Lowercase letter + lowercase subscript = pure AC. Uppercase letter + uppercase subscript = DC. Lowercase letter + uppercase subscript = total.

This separation is the foundation of the **superposition principle** applied to BJT circuits: solve the DC problem to find the Q-point, then solve the AC problem separately using the linearised model.

[[visual:ac-dc-separation]]

## The BJT as a Linear Active Two-Port Device

With linearisation complete, the BJT now satisfies all three requirements for a linear active two-port device:

1. **Active** — powered by an external supply $V_{CC}$
2. **Two-port** — input port (base-emitter) and output port (collector-emitter)
3. **Linear** — under the small-signal condition $v_{be} < 10$ mV

This means we can represent the BJT using just **four constant parameters** — the h-parameters — which is exactly what the next concept covers.

[[visual:two-port-block]]

<details>
<summary><strong>Pause & Think</strong>: If the input signal has a peak of 20 mV, is the small-signal model valid?</summary>

Strictly, no — 20 mV exceeds the 10 mV rule of thumb ($20/26 \approx 0.77$, so the second-order term is $(0.77)^2/2 \approx 0.30$, a 30% error). However, many engineers would still use the model and accept the reduced accuracy. The key point is: **the smaller the signal, the better the model**. For precision work, keep $v_{be}$ well below 10 mV.

</details>

## Assumptions for Small-Signal Analysis

Before moving on, let's explicitly list the three assumptions required for the h-parameter model to be valid:

1. **BJT is properly biased** — it must be in the active linear region, not in cutoff or saturation
2. **Signal is small** — $v_{be} \ll V_T$ (practically $v_{be} < 10$ mV) so that the h-parameters remain constant
3. **Frequency is low** — at low frequencies (audio range, < 20 kHz), parasitic capacitances are negligible and h-parameters are real-valued (not complex)

[[visual:assumptions-summary]]

<details>
<summary><strong>Pause & Think</strong>: Why does high frequency violate the small-signal model?</summary>

At high frequencies, the parasitic capacitances between the BJT terminals (base-emitter, base-collector) have low impedance ($X_C = 1/\omega C$ becomes small). These capacitances create additional current paths that the simple h-parameter model doesn't account for. The h-parameters become complex-valued (having both resistive and reactive parts), and the simple real-valued model breaks down.

</details>

## Summary

- The BJT's exponential $I_B$–$V_{BE}$ relationship is **nonlinear**, but a Taylor series expansion around the Q-point linearises it when $v_{be} \ll V_T$.
- The **small-signal condition** requires $v_{be} < 10$ mV (much less than $V_T = 26$ mV).
- Under this condition, every circuit quantity separates into **DC + AC** components that can be analysed independently.
- The linearised BJT is a **linear active two-port device**, ready for h-parameter analysis.
