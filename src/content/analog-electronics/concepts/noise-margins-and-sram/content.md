# Noise Margins & SRAM Cells — Robust Logic and Memory

> **Why This Matters**: Logic gates cascaded together must tolerate noise — voltage disturbances on the interconnecting wires. Noise margins quantify how much noise a circuit can handle before misinterpreting a logic level. And the SRAM cell — built from cross-coupled transistors — is the fundamental building block of static memory.

## Defining Logic Level Voltage Parameters

In the previous concept, you learned that logic LOW must be below $0.4V$ and logic HIGH above $2.4V$. Now let's formalise this with four key parameters:

| Parameter | Meaning | Typical Value |
|:---:|:---:|:---:|
| $V_{OL}$ | Maximum output LOW voltage | $0.4V$ |
| $V_{OH}$ | Minimum output HIGH voltage | $2.4V$ |
| $V_{IL}$ | Maximum input voltage recognised as LOW | $0.8V$ |
| $V_{IH}$ | Minimum input voltage recognised as HIGH | $2.0V$ |

Notice the asymmetry: the **output** specification ($V_{OL} = 0.4V$) is tighter than the **input** specification ($V_{IL} = 0.8V$). This gap is intentional — it's the noise margin.

[[visual:noise-margin-diagram]]

## Noise Margin Calculation

When circuit 1 drives circuit 2, noise can appear on the wire between them. The input to circuit 2 is:

$$V_{I2} = V_{o1} + V_n$$

where $V_n$ is the noise voltage.

[[visual:noise-model-schematic]]

**High-state noise margin** — how much noise can be added to a HIGH output before circuit 2 misinterprets it as LOW:

$$\boxed{NM_H = V_{OH} - V_{IH} = 2.4V - 2.0V = 0.4V}$$

**Low-state noise margin** — how much noise can be added to a LOW output before circuit 2 misinterprets it as HIGH:

$$\boxed{NM_L = V_{IL} - V_{OL} = 0.8V - 0.4V = 0.4V}$$

Both noise margins are $0.4V$. This means the circuit can tolerate up to $400\,\text{mV}$ of noise on the wire between gates before logic errors occur.

[[visual:noise-margin-plotly]]

> **Key Insight**: These noise margins might seem small, and they are. That's one reason why DTL was eventually replaced by TTL (with $0.4V$ margins) and CMOS (with much larger margins). CMOS logic with a $5V$ supply has noise margins of about $2V$ — five times better.

<details>
<summary><strong>Pause & Think</strong>: Why is the output specification (VOH, VOL) tighter than the input specification (VIH, VIL)?</summary>

The gap between output and input specs IS the noise margin. If they were identical (VOH = VIH, VOL = VIL), there would be zero noise margin — any noise at all would cause errors. By making the output cleaner than the input requires, we create a safety buffer against noise.

</details>

## Steady-State Output Voltage with Load

In practice, the output HIGH voltage doesn't reach $V_{cc}$ exactly. When the transistor is OFF and a standard load is connected:

$$\boxed{V_{o(\text{steady state})} = \frac{R_o}{R_o + R_C} \times V_{cc}}$$

where $R_o$ is the equivalent output load resistance and $R_C$ is the collector pull-up resistor.

For the standard load values from the lecture: $R_o = 400\,\Omega$, $C_o = 15\,\text{pF}$, $R_C = 2.2\,k\Omega$, $V_{cc} = 5V$:

$$V_{o(\text{steady state})} = \frac{400}{400 + 2200} \times 5V = \frac{400}{2600} \times 5V \approx 0.77V$$

Wait — that's too low for a valid HIGH! This tells us that the standard load ($R_o = 400\,\Omega$) is quite heavy. In practice, the output load is often much higher (the input impedance of the next gate), so $V_o$ is closer to $V_{cc}$.

[[visual:output-loading-plotly]]

## The Bipolar SRAM Storage Cell

The lecture transitions from logic circuits to a fundamental memory element — the **static RAM (SRAM) cell** built from a cross-coupled BJT flip-flop.

[[visual:sram-cell-schematic]]

The circuit consists of:
- Two NPN transistors $T_1$ and $T_2$
- Both emitters tied to common ground
- The collector of $T_1$ is connected to the base of $T_2$
- The collector of $T_2$ is connected to the base of $T_1$
- Independent pull-up resistors from each collector to $+V_{cc}$
- A main switch connecting the circuit to $+V_{cc}$

This cross-coupling creates **positive feedback** — a self-reinforcing state.

### How It Stores a Bit

Let's say $T_1$ is ON (saturated) and $T_2$ is OFF:
- $T_1$'s collector is at $V_{CE(\text{sat})} \approx 0.2V$ → this is logic 0 (LOW)
- Since $T_1$'s collector drives $T_2$'s base, $T_2$ gets $0.2V$ at its base → insufficient to turn ON $T_2$
- $T_2$ stays OFF, so $T_2$'s collector is at $\approx V_{cc}$ → this is logic 1 (HIGH)
- $T_2$'s collector drives $T_1$'s base with $V_{cc}$, ensuring $T_1$ stays saturated

The circuit is **bistable** — it has two stable states (either $T_1$ ON/$T_2$ OFF, or $T_1$ OFF/$T_2$ ON), and it holds that state indefinitely as long as power is connected.

### Startup and $h_{FE}$ Mismatch

[[visual:sram-startup-analysis]]

When the switch is first closed, both transistors start receiving current. But due to manufacturing variations, they have slightly different current gains:

$$h_{FE1} = h_{FE} + \Delta h_{FE} \quad \text{and} \quad h_{FE2} = h_{FE} - \Delta h_{FE}$$

The transistor with the higher $h_{FE}$ reaches saturation first. If $h_{FE1} > h_{FE2}$, then $T_1$ saturates first, pulling $T_2$'s base LOW and locking the cell into the $T_1$-ON state.

> **Watch Out**: This means the startup state of an uninitialized SRAM cell is **unpredictable** — it depends on which transistor has slightly higher gain. That's why memory must be explicitly written before being read.

[[visual:falstad-sram-cell]]

<details>
<summary><strong>Pause & Think</strong>: What would happen if both transistors had exactly identical hFE?</summary>

In theory, the circuit would be metastable — balanced on a knife edge with neither transistor fully ON or OFF. In practice, thermal noise would eventually tip the balance one way. But this metastable state can persist for an unpredictable duration, which is a real problem in digital design (called "metastability").

</details>

## DC Battery Equivalent Circuit

The lecture also introduces the equivalent circuit for a DC battery — a concept that connects to voltage regulators in the next topic:

A real battery is modelled as an ideal voltage source $V_{BB}$ in series with an internal resistance $R_S$. The terminal voltage $V_S$ drops below $V_{BB}$ as current increases:

$$V_S = V_{BB} - I \cdot R_S$$

This model becomes important when designing voltage regulators that must maintain constant output despite varying load current.

## Summary

- **Noise margins**: $NM_H = V_{OH} - V_{IH}$ and $NM_L = V_{IL} - V_{OL}$, both $\approx 0.4V$ for DTL
- **Four voltage parameters**: $V_{OL} = 0.4V$, $V_{OH} = 2.4V$, $V_{IL} = 0.8V$, $V_{IH} = 2.0V$
- **Noise model**: $V_{I2} = V_{o1} + V_n$ — noise adds to the output before reaching the next input
- **Output loading**: $V_{o(\text{ss})} = \frac{R_o}{R_o + R_C} \times V_{cc}$ — heavy loads reduce the HIGH output
- **SRAM cell**: Cross-coupled BJT flip-flop stores one bit with positive feedback
- **Startup**: The transistor with higher $h_{FE}$ saturates first, determining the initial stored value
- Standard load: $R_o = 400\,\Omega$, $C_o = 15\,\text{pF}$
