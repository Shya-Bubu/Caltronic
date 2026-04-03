# Voltage Regulators — From AC Mains to Stable DC Output

> **Why This Matters**: Every electronic circuit needs a clean, stable DC power supply. Whether it's $+5V$ for logic ICs, $\pm 12V$ for op-amps, or $+15V$ for analog circuits — voltage regulators are the circuits that make this possible. This concept takes you from the AC mains through a series voltage regulator to the standard 78xx regulator ICs you'll use in every lab project.

## The Power Supply Chain

[[visual:power-supply-block-diagram]]

Converting AC mains power to a stable DC voltage requires a chain of processing blocks:

1. **AC supply** ($230V$, $50\,\text{Hz}$) connects to a **step-down transformer** (ratio $n:1$)
2. The transformer's secondary voltage feeds a **full bridge rectifier** circuit
3. A **filter capacitor** smooths the rectified waveform
4. A **voltage regulator** takes the unregulated, rippled DC and produces a constant output

The output of the rectifier (before regulation) is not constant — it has ripple. The regulator's job is to maintain $V_o = \text{constant}$ despite variations in input voltage and load current.

## The Series Voltage Regulator Concept

[[visual:series-regulator-basic-schematic]]

The simplest series regulator puts an NPN transistor between the unregulated input and the load:

- **Collector** connected to $V_{\text{in}}$ (unregulated input from the rectifier)
- **Emitter** provides $V_{\text{out}}$ (regulated output)
- **Base** controlled by a reference voltage circuit

The voltage across the transistor ($V_{CE}$) absorbs the difference between input and output:

$$V_{\text{in}} = V_{CE} + V_o \quad \Rightarrow \quad V_{CE} = V_{\text{in}} - V_o$$

Assuming $I_E \approx I_C$ (because $h_{FE}$ is large), the output current equals the load current:

$$I_o = I_C = \frac{V_o}{R_L}$$

The DC load line equation is:

$$\boxed{I_C = -\frac{1}{R_L} V_{CE} + \frac{V_{\text{in}}}{R_L}}$$

This is a straight line on the $I_C$ vs $V_{CE}$ characteristic, with slope $-1/R_L$ and y-intercept $V_{\text{in}}/R_L$.

[[visual:regulator-load-line]]

## Zener Diode Reference

The key to regulation is a **stable voltage reference**. The Zener diode provides exactly this.

[[visual:zener-diode-characteristic]]

When reverse-biased beyond its breakdown voltage $V_Z$, the Zener maintains a nearly constant voltage regardless of the current flowing through it — as long as $I_Z > I_{Z(\text{min})}$.

In the series regulator, the Zener biases the base of the pass transistor. Applying KVL around the output loop:

$$V_Z = V_o + V_{BE(\text{ON})}$$

Solving for the output voltage:

$$\boxed{V_o = V_Z - V_{BE(\text{ON})}}$$

Since both $V_Z$ and $V_{BE(\text{ON})} \approx 0.7V$ are constant, the output voltage is constant:
- $V_Z$ = constant (Zener reference)
- $V_{BE(\text{ON})}$ = constant ($\approx 0.7V$)
- Therefore $V_o$ = constant

[[visual:zener-series-regulator-schematic]]

The Zener regulator circuit:
- Resistor $R$ from $V_{\text{in}}$ to the base node carries current $I$
- Zener diode $V_Z$ from the base node to ground (reverse-biased in breakdown)
- Series-pass NPN transistor: collector at $V_{\text{in}}$, emitter at $V_o$
- Load $R_L$ across the output

> **Key Insight**: Regulation works because the transistor's $V_{CE}$ *automatically adjusts* to absorb changes in $V_{\text{in}}$. If $V_{\text{in}}$ increases, $V_{CE}$ increases by the same amount, keeping $V_o$ constant. The operating point simply moves along the load line.

<details>
<summary><strong>Pause & Think</strong>: What limits the minimum input voltage for this regulator?</summary>

$V_{\text{in}}$ must be larger than $V_o$ by at least $V_{CE(\text{sat})}$ for the transistor to regulate. If $V_{\text{in}}$ drops too low, $V_{CE}$ approaches zero and the transistor comes out of the active region. Also, the Zener needs at least $I_{Z(\text{min})}$ to maintain its reference voltage. These two conditions set the minimum input voltage: $V_{\text{in,min}} > V_o + V_{CE(\text{min})}$.

</details>

## Feedback Series Regulator

The simple Zener regulator has a fixed output voltage ($V_o = V_Z - V_{BE}$). For an **adjustable** output, we add a second transistor for feedback:

[[visual:feedback-regulator-schematic]]

The feedback regulator adds:
- A voltage divider ($R_1$ and $R_2$) across the output, producing a fraction $\beta V_o$
- A second transistor $T_2$ (in the active region) that senses the divider voltage
- $T_2$'s emitter connected to the Zener reference $V_Z$

The voltage divider ratio is:

$$\beta = \frac{R_1}{R_1 + R_2}$$

Applying KVL around the feedback loop (from the divider node through $T_2$'s base-emitter junction to the Zener) :

$$V_Z + V_{BE2(\text{ON})} = \beta V_o$$

Solving for the output:

$$\boxed{V_o = \frac{V_Z + V_{BE2(\text{ON})}}{\beta}}$$

Since $\beta < 1$ (the divider fraction), the output voltage is **larger** than $V_Z + V_{BE2}$. By adjusting $R_1$ and $R_2$, you can set $V_o$ to any desired value — hence the note: "we can control $V_o$ as we wish."

[[visual:feedback-perturbation-analysis]]

### How Feedback Maintains Regulation

When the input voltage increases by $\Delta V_{\text{in}}$:
1. $V_o$ tends to increase by $\Delta v_o$
2. The divider senses $\beta(V_o + \Delta v_o)$ — a higher voltage at $T_2$'s base
3. $T_2$'s base current increases ($I_{B2} \uparrow$), so $I_{C2} \uparrow$
4. More current is shunted away from $T_1$'s base: $I_B = I - I_{C2} \downarrow$
5. $T_1$'s collector current decreases, and $V_{CE}$ increases
6. If $\Delta V_{CE} = \Delta V_{\text{in}}$, the output voltage remains constant

This negative feedback loop continuously adjusts $T_1$'s operating point to maintain constant output.

<details>
<summary><strong>Pause & Think</strong>: What happens if Vin decreases instead?</summary>

The process reverses: Vo tends to drop → $\beta V_o$ drops → T2's base current decreases → IC2 decreases → more current available for T1's base → T1 conducts harder → VCE decreases → Vo is restored. The feedback works in both directions.

</details>

## Standard Voltage Regulator ICs

In practice, you rarely build discrete regulators. The **78xx series** packages everything into a 3-pin TO-220 device:

[[visual:regulator-ic-table]]

| IC | Output Voltage | Negative Version |
|:---:|:---:|:---:|
| **7805** | $+5V$ | 7905 ($-5V$) |
| **7812** | $+12V$ | 7912 ($-12V$) |
| **7815** | $+15V$ | 7915 ($-15V$) |

These ICs handle up to **1A** of output current and require only input/output bypass capacitors:

[[visual:regulator-ic-application]]

- **Input capacitor**: Reduces high-frequency impedance ($Z_C = 1/j\omega C$) at the input — important because the lead from the rectifier adds inductance
- **Output capacitor**: Ceramic capacitor — provides low impedance path at high frequencies, improving transient response. The **ESR** (Equivalent Series Resistance) of this capacitor matters for stability.

> **Watch Out**: These series regulators dissipate the excess input voltage as heat in the pass transistor. The power loss is:

$$\boxed{P_{\text{loss}} \approx I_C \times (V_{\text{in}} - V_o) = I_o \times V_{CE}}$$

This is why voltage regulators need **heat sinks** — especially at high currents. The power efficiency is relatively low, which is why modern designs often use switching regulators for efficiency, sometimes followed by a series regulator for clean output.

[[visual:falstad-series-regulator]]

## Typical Output Voltages

The lecture lists common regulator outputs used in electronics:

| Application | Voltage | Notes |
|:---:|:---:|:---:|
| Digital logic | $+5V$ | TTL, CMOS ICs |
| Op-amps | $\pm 12V$ or $\pm 15V$ | Dual supply |
| General analog | $+18V$ | Higher voltage circuits |

[[visual:hybrid-regulator-block]]

For high efficiency with low noise, a **hybrid topology** combines a switching regulator (for efficient step-down) followed by a series regulator (for clean, ripple-free output).

## Summary

- **Power supply chain**: AC → transformer → rectifier → filter → regulator → stable DC
- **Series regulator**: Pass transistor absorbs $V_{\text{in}} - V_o$ as $V_{CE}$
- **DC load line**: $I_C = -\frac{1}{R_L} V_{CE} + \frac{V_{\text{in}}}{R_L}$
- **Zener reference**: $V_o = V_Z - V_{BE(\text{ON})}$ (fixed output)
- **Feedback regulator**: $V_o = \frac{V_Z + V_{BE2(\text{ON})}}{\beta}$ (adjustable output)
- **Feedback mechanism**: $\Delta V_{\text{in}} \to \Delta v_o \to \beta$ senses change $\to T_2$ adjusts $\to T_1$ compensates
- **Standard ICs**: 7805 ($+5V$), 7812 ($+12V$), 7815 ($+15V$) with 1A capacity
- **Power loss**: $P_{\text{loss}} = I_o \times (V_{\text{in}} - V_o)$ — requires heat sink
