# How the N-Channel Enhancement MOSFET Works

> **Why This Matters**: The n-channel enhancement MOSFET (NMOS) is the most widely used transistor type in the world. Every logic gate in your smartphone's processor uses NMOS transistors. Understanding how it operates — how a voltage on the gate creates a conductive channel — is the key to understanding all of digital electronics.

## Starting from Zero: No Gate Voltage

Consider an NMOS transistor with **no voltage applied** anywhere — $V_{GS} = 0$ V and $V_{DS} = 0$ V.

Look at the structure: two n⁺ islands (source and drain) sitting in a p-type substrate. Between the source and drain there's just p-type silicon. To get current from drain to source, electrons would have to cross through p-type material — but that means crossing two back-to-back pn junctions (n⁺-p and p-n⁺).

These junctions block current in both directions. So with no gate voltage: **no current flows**. The transistor is OFF.

$$V_{GS} = 0 \implies \text{No channel} \implies I_{DS} = 0 \quad \text{(transistor OFF)}$$

[[visual:nmos-off-state]]

This is why it's called an **enhancement-mode** device — you need to **enhance** the surface with a channel by applying gate voltage. The channel doesn't exist naturally; you have to create it.

## Applying Gate Voltage: Channel Formation

Now apply a **positive voltage** to the gate relative to the source: $V_{GS} > 0$.

The gate-oxide-substrate structure acts as a capacitor. The positive gate voltage creates an electric field that penetrates through the thin oxide into the p-type substrate below:

1. **Holes are repelled** — the positive gate pushes the majority carriers (holes) away from the surface, creating a **depletion region** under the gate
2. **Electrons are attracted** — minority carriers (electrons) in the p-type substrate are pulled toward the surface
3. **Inversion occurs** — when $V_{GS}$ exceeds the **threshold voltage** $V_T$, enough electrons accumulate at the surface to form a continuous conductive layer

This thin layer of electrons at the surface is the **inversion layer** — or simply, the **channel**.

$$\boxed{V_{GS} > V_T \implies \text{Channel forms} \implies \text{Transistor ON}}$$

The threshold voltage $V_T$ is typically 1–2 V for standard NMOS devices. It depends on the oxide thickness, substrate doping, and other fabrication parameters.

[[visual:nmos-biased-diagram]]

## The Biased NMOS — Current Flow

Once the channel exists, apply a positive voltage from drain to source ($V_{DS} > 0$). Now there's a conductive path of electrons from source to drain, and a voltage driving current through it.

[[visual:nmos-channel-current]]

Notice the current directions in the diagram:

- **Electron flow**: from Source → through channel → to Drain (electrons move toward the more positive terminal)
- **Conventional current $I_D$**: from Drain → through channel → to Source (opposite to electron flow, as always)
- **Gate current**: $i_G = 0$ (the gate is insulated — no current flows through the oxide)
- **Source current**: $i_S = i_D$ (all the drain current comes from the source — Kirchhoff's current law)

$$i_G = 0 \qquad i_S = i_D$$

> **Key Insight**: In an NMOS transistor, electrons carry the current. The source is where electrons enter the channel, and the drain is where they leave. Despite this, we follow the conventional current direction: $I_D$ flows from drain to source.

## The Three Operating Regions

The amount of drain current depends on **two voltages**: $V_{GS}$ (which controls the channel) and $V_{DS}$ (which drives current through it). This gives rise to three distinct operating regions:

### Region 1: Cutoff ($V_{GS} < V_T$)

No channel exists. Both pn junctions are reverse-biased. The drain current is essentially zero.

$$I_{DS} = 0$$

### Region 2: Triode / Linear Region ($V_{GS} > V_T$ and $V_{DS} < V_{GS} - V_T$)

The channel exists uniformly from source to drain. The MOSFET behaves like a **voltage-controlled resistor**:

$$\boxed{I_{DS} = K\left[(V_{GS} - V_T)V_{DS} - \frac{V_{DS}^2}{2}\right]}$$

For very small $V_{DS}$, this simplifies to:

$$I_{DS} \approx K(V_{GS} - V_T) \cdot V_{DS}$$

The device acts like a resistor with resistance $R_{on} = \frac{1}{K(V_{GS} - V_T)}$.

### Region 3: Saturation ($V_{GS} > V_T$ and $V_{DS} \geq V_{GS} - V_T$)

The channel **pinches off** near the drain end. The current becomes independent of $V_{DS}$:

$$\boxed{I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2}$$

The quantity $V_{GS} - V_T$ is called the **overdrive voltage** $V_{OV}$. In saturation, the MOSFET acts as a **voltage-controlled current source**.

[[visual:nmos-regions-plotly]]

[[visual:nmos-vi-curves]]

## The Process Transconductance Parameter

The constant $K$ in the current equations is:

$$K = \mu_n C_{ox}' \frac{W}{L} = k_n' \frac{W}{L}$$

where:
- $\mu_n$ = electron mobility in the channel (~600 cm²/V·s for silicon)
- $C_{ox}' = \varepsilon_{ox}/t_{ox}$ = oxide capacitance per unit area
- $k_n' = \mu_n C_{ox}'$ = process transconductance parameter (depends only on fabrication technology)
- $W/L$ = the aspect ratio (the designer's knob)

> **Pro Tip**: When solving problems, you'll usually be given $K$ (or $k_n'$ and $W/L$) directly. You rarely need to calculate it from $\mu_n$ and $C_{ox}'$ unless the question specifically asks about device physics.

## Threshold Voltage and Turn-On Conditions

The threshold voltage $V_T$ for an NMOS device is **positive** (typically +1 to +2 V). The turn-on condition is:

$$V_{GS} > V_T \quad \text{(positive threshold, needs positive gate voltage)}$$

[[visual:threshold-voltage-plotly]]

<details>
<summary><strong>Pause & Think</strong>: Why does an NMOS need a positive VGS to turn on?</summary>

The substrate is p-type (majority carriers are holes). To form an n-type channel, you need to attract electrons to the surface. Since electrons are negative, a positive gate voltage attracts them. The threshold voltage VT is the minimum positive voltage needed to create a strong enough inversion layer for significant current to flow.

</details>

## The NMOS as a Switch vs Amplifier

The same physical device serves two very different purposes depending on the circuit:

| Application | Operating Region | Behaviour |
|------------|-----------------|-----------|
| **Digital switch** | Cutoff ↔ Triode | ON/OFF with low $R_{on}$ |
| **Analog amplifier** | Saturation | $I_{DS} = \frac{K}{2}V_{OV}^2$ (current source) |

In digital circuits, the MOSFET switches rapidly between cutoff (OFF, no current) and triode (ON, low resistance). In analog circuits, it stays in saturation, where the quadratic relationship between $V_{GS}$ and $I_{DS}$ gives controlled amplification.

[[visual:falstad-nmos-operation]]

## Summary

- An NMOS enhancement MOSFET is **normally OFF** — no channel exists at $V_{GS} = 0$
- Positive $V_{GS} > V_T$ creates an **inversion layer** (n-channel) by attracting electrons to the surface
- Gate current is always zero: $i_G = 0$ (oxide insulation)
- Three regions: **cutoff** ($I_{DS} = 0$), **triode** (resistor), **saturation** (current source)
- The **overdrive voltage** $V_{OV} = V_{GS} - V_T$ determines how strongly the channel is formed
- The **process parameter** $K = k_n'(W/L)$ combines technology and geometry into one number
