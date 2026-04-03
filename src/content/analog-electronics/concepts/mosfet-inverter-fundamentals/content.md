# MOSFET Inverters — From Resistive Load to Active Load

> **Why This Matters**: The MOSFET inverter is the simplest logic gate — a NOT gate built from a single transistor. But the way you choose the load element (a resistor vs another MOSFET) has enormous consequences for chip area, speed, and power. This concept takes you from the basic circuit to the active-load inverter that dominates integrated circuit design.

## The Simplest NOT Gate

Let's start with something you can build on a breadboard right now. Take an n-channel enhancement-mode MOSFET, connect a resistor $R_D$ from the positive supply $+V_{DD}$ to the drain, tie the source to ground, and feed your input signal $V_i$ into the gate.

[[visual:nmos-symbol-enhancement]]

The n-channel enhancement MOSFET has three terminals you'll work with: **Gate (G)**, **Drain (D)**, and **Source (S)**. There's also a substrate (body) terminal, but in most practical circuits it's connected directly to the source. The key condition for turning this transistor ON is:

$$V_{GS} > +V_{Th}$$

where $V_{Th}$ is the **threshold voltage** — the minimum gate-to-source voltage needed to create a conducting channel between drain and source. Think of $V_{Th}$ as the "unlock" voltage. Below it, the transistor is OFF and no drain current flows. Above it, the channel opens and current flows from drain to source.

[[visual:resistive-load-inverter-schematic]]

The circuit above is the **resistive-load MOSFET inverter**. The output voltage $V_o$ is taken at the drain node — the junction between $R_D$ and the MOSFET's drain. There's also a parasitic capacitance $C_o$ (from the output node to ground) that models the input capacitance of whatever circuit comes next, plus any stray wiring capacitance.

Here's the truth table that makes this an inverter:

| $V_i$ (Input) | Transistor $T$ | $V_o$ (Output) |
|:---:|:---:|:---:|
| High ($\approx V_{DD}$) | **ON** | Low ($\approx 0V$) |
| Low ($\approx 0V$) | **OFF** | High ($\approx V_{DD}$) |

When the input is **high** ($V_{GS} > V_{Th}$), the MOSFET turns ON. It acts like a low-resistance path from the output node to ground. Almost all of $V_{DD}$ drops across $R_D$, and the output falls to approximately zero volts.

When the input is **low** ($V_{GS} < V_{Th}$), the MOSFET is OFF. No drain current flows, so there's no voltage drop across $R_D$. The output rises to $+V_{DD}$.

**High in, low out. Low in, high out.** That's inversion.

[[visual:resistive-inverter-transfer]]

<details>
<summary><strong>Pause & Think</strong>: Why does the output not reach exactly 0V when the transistor is ON?</summary>

Because even when the MOSFET is in saturation or triode region, it still has a non-zero ON resistance. There's a small voltage $V_{DS}$ across the transistor, so the output sits at $V_{DS(ON)}$ rather than exactly 0V. For a well-designed inverter, this voltage is small enough to count as a valid logic LOW.

</details>

## The Problem with Resistors on a Chip

The resistive-load inverter works beautifully on a breadboard, but in integrated circuits there's a major problem: **resistors are huge**.

A $1\,k\Omega$ resistor in standard CMOS technology occupies far more silicon area than a transistor. If you need millions of inverters on a chip, you can't afford to give each one its own resistor. The solution is elegant: **replace the resistor with another MOSFET**.

## The Active-Load Inverter

[[visual:active-load-inverter-schematic]]

The active-load inverter uses two MOSFETs stacked in series between $+V_{DD}$ and ground:

- **$T_2$ (top — load transistor)**: Its gate $G_2$ is connected directly to its drain, which ties to $+V_{DD}$. This forces $V_{GS2} = V_{DS2}$ — the load transistor always operates with its gate-drain shorted.
- **$T_1$ (bottom — driver transistor)**: This is the switching transistor. Its gate $G_1$ is the input, and its source $S_1$ is grounded.

The output is taken at the common node between the two transistors — the source of $T_2$ ($S_2$) connected to the drain of $T_1$ ($D_1$).

> **Key Insight**: Because $T_2$ has its gate tied to its drain ($V_{GS2} = V_{DS2}$), it acts as a **nonlinear resistor**. It's always in the saturation region (since $V_{GS2} = V_{DS2} \ge V_{GS2} - V_{Th}$), which means its resistance depends on the current flowing through it. This is why the load line curve on the $I_D$ vs $V_{DS}$ plot is not a straight line.

## Analysing the Active-Load Inverter

Since the two transistors are in series, the same current flows through both:

**KCL (current balance):**

$$\boxed{I_{D1} = I_{D2}}$$

The supply voltage divides between the two transistors:

**KVL (voltage loop):**

$$V_{DS1} + V_{DS2} = V_{DD}$$

Rearranging:

$$\boxed{V_{DS2} = V_{DD} - V_{DS1}}$$

And the critical constraint on the load transistor:

$$V_{GS2} = V_{DS2}$$

For typical values, the threshold voltage is $V_{Th} = +3V$ to $+4V$, and the supply voltage is $V_{DD} = +15V$ to $+20V$.

[[visual:active-load-iv-curves]]

The graph above shows the $I_{D1}$ vs $V_{DS1}$ output characteristics of the driver transistor $T_1$, with multiple curves for different gate-source voltages ($V_{Th}$, $V_{Th}+1$, $V_{Th}+2$, etc.). The **load line** is not a straight line — it's the curve traced out by $T_2$'s current as $V_{DS1}$ varies.

The operating points are where the driver curves intersect the load curve. As the input voltage $V_i$ increases (sweeping through different $V_{GS1}$ values), the operating point moves along the load curve, and the output voltage $V_{DS1}$ changes.

[[visual:falstad-active-load-inverter]]

<details>
<summary><strong>Pause & Think</strong>: What happens to the load line if you increase $V_{DD}$?</summary>

The load line shifts to the right because $V_{DS2} = V_{DD} - V_{DS1}$. A larger $V_{DD}$ means the load curve intercepts the $V_{DS}$ axis at a higher voltage. The operating point for each input voltage also shifts, giving a larger output voltage swing between logic HIGH and logic LOW.

</details>

## From Input Pulse to Output Waveform

When you apply a square pulse to the input:

- At time $t_1$, $V_i$ goes high → $T_1$ turns ON → output falls toward 0V
- At time $t_2$, $V_i$ goes low → $T_1$ turns OFF → output rises back toward $V_{DD}$

The output doesn't follow the input instantaneously — it shows exponential edges due to the parasitic capacitance $C_o$ being charged and discharged through the ON resistances of $T_1$ and $T_2$. But we'll dive deep into those switching delays in the next concept.

[[visual:input-output-waveform-basic]]

[[visual:active-load-output-decay]]

## Summary

- A MOSFET with $V_{GS} > V_{Th}$ turns ON, creating a low-resistance path → output goes LOW
- A MOSFET with $V_{GS} < V_{Th}$ is OFF → output pulled HIGH by the load
- **Resistive-load inverter**: Uses $R_D$ as load — works but resistors are too large for ICs
- **Active-load inverter**: Uses a second MOSFET ($T_2$) as load with $V_{GS2} = V_{DS2}$
- **KCL**: $I_{D1} = I_{D2}$ (series connection)
- **KVL**: $V_{DS1} + V_{DS2} = V_{DD}$
- The load "line" is actually a **nonlinear curve** because $T_2$ is a MOSFET, not a resistor
- Operating points are found at the intersection of driver characteristics and load curve
