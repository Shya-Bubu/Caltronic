# MOSFET Switching Characteristics — Delays, Time Constants & Open-Drain Outputs

> **Why This Matters**: Real circuits don't switch instantaneously. The parasitic capacitance at the output must be charged and discharged through the transistors' ON resistances, creating measurable delays. Understanding these delays is essential for designing circuits that meet timing requirements — and understanding open-drain outputs explains how multiple circuits can share a common data bus.

## The Switching Problem

In the previous concept, you saw that the active-load inverter output transitions between approximately $+V_{DD}$ and a low voltage. But those transitions aren't instantaneous — and the reason is the parasitic capacitance $C_o$ at the output node.

Think of $C_o$ as a tiny bucket of charge sitting at the output. To change the output voltage, you must either fill that bucket (charging $C_o$ through the load transistor $T_2$) or drain it (discharging $C_o$ through the driver transistor $T_1$). The speed of each process depends on the resistance of the transistor that's doing the work.

## Input and Output Waveforms

[[visual:switching-input-waveform]]

When a square pulse is applied to the input:

- **Before $t_1$**: $V_i = 0$, so $T_1$ is OFF and $T_2$ is ON. The output is high, near $+V_{DD}$.
- **At $t_1$**: $V_i$ jumps to $+V_{DD}$. Now $T_1$ turns ON (since $V_{GS1} > V_{Th}$). The capacitor $C_o$ discharges through $T_1$ toward ground.
- **$t_1$ to $t_2$**: $T_1$ remains ON. The output has settled to its low value $V_{o1}$.
- **At $t_2$**: $V_i$ drops back to $0$. $T_1$ turns OFF. Now $C_o$ must charge back up through $T_2$ (the load transistor). The output rises exponentially toward $+V_{DD}$.

[[visual:switching-output-waveform]]

The key observation is that the **falling edge is fast** and the **rising edge is slow**. Here's why:

- **Falling edge**: $C_o$ discharges through $T_1$, which is driven hard into the low-resistance triode region by the full gate voltage. The time constant is:

$$\boxed{\tau_1 = C_o \times R_{sat}(T_1)}$$

- **Rising edge**: $C_o$ charges through $T_2$, which has a higher ON resistance because it's a diode-connected load with $V_{GS2} = V_{DS2}$. The time constant is:

$$\boxed{\tau_2 = C_o \times R_{sat}(T_2)}$$

Since $R_{sat}(T_2) > R_{sat}(T_1)$ in a typical design, the rising edge is slower than the falling edge. This asymmetry is a fundamental characteristic of NMOS inverters.

## ON Resistance

The ON resistance of a MOSFET in its low-resistance state is defined as:

$$\boxed{R_{sat} = \frac{V_{DS(\text{ON})}}{I_{DS}}}$$

This is the ratio of the drain-source voltage when the transistor is ON to the drain current flowing through it. A lower $R_{sat}$ means faster switching because the capacitor charges or discharges more quickly.

> **Key Insight**: The ON resistance is not a fixed value — it depends on the operating point. As $V_{DS}$ changes during the switching transient, $R_{sat}$ also changes. That's why the actual waveform is not a pure exponential, but we use the exponential approximation to estimate switching times.

## The Output Low Voltage

When $T_1$ is ON and the circuit has reached steady state, the output voltage doesn't reach exactly 0V. Instead, it settles at:

$$\boxed{V_{o1} = \left(\frac{R_o}{R_o + R_{sat}}\right) V_{DD}}$$

where $R_o$ is the equivalent output resistance seen at the output node (from parasitic effects and the load). The $R_{sat}$ in this formula refers to the ON resistance of $T_2$ (the load transistor), because in steady state, the current through $T_1$ and $T_2$ must balance.

[[visual:output-voltage-divider]]

This is a simple voltage divider between the load resistance and the external resistance. For $R_{sat}$ much larger than $R_o$, the output gets very close to zero. For comparable values, the output remains at a noticeable positive voltage.

<details>
<summary><strong>Pause & Think</strong>: If you wanted to make the output LOW voltage closer to 0V, what would you change?</summary>

You'd make $R_{sat}$ (the load transistor's ON resistance) much larger relative to $R_o$, either by making $T_2$ smaller (smaller $W/L$ ratio) or by making $T_1$ larger (lower ON resistance for the driver). In the voltage divider formula $V_{o1} = \frac{R_o}{R_o + R_{sat}} V_{DD}$, as $R_{sat} \to \infty$, $V_{o1} \to 0$.

</details>

## Open Drain / Open Collector Outputs

[[visual:open-drain-circuit]]

Sometimes you need multiple circuits to share a single output wire — a **common data bus**. With a normal inverter, you can't directly connect two outputs together because if one drives HIGH and the other drives LOW, there's a short circuit.

The solution is the **open-drain output** (for MOSFETs) or **open-collector output** (for BJTs):

- The transistor's drain (or collector) is left unconnected inside the IC
- An external **pull-up resistor** $R_D$ connects from $+V_{DD}$ to the output
- When the transistor is ON, it pulls the output LOW through its low ON resistance
- When the transistor is OFF, the pull-up resistor pulls the output HIGH

[[visual:open-collector-ic]]

This arrangement allows multiple open-drain outputs to share a bus. Each circuit can pull the bus LOW, but when all transistors are OFF, the shared pull-up resistor pulls the bus HIGH. This is the basis of **time division multiplexing** — different circuits take turns placing their data on the common bus.

> **Watch Out**: If you forget the external pull-up resistor on an open-drain output, the output will float when the transistor is OFF. There's no internal pull-up — that's the whole point of an open-drain design. A floating logic input can cause unpredictable behaviour.

The output voltage for an open-drain circuit when the transistor is ON follows the same voltage divider:

$$V_{o1} = \left(\frac{1}{1 + \frac{R_{sat}}{R_o}}\right) V_{DD}$$

[[visual:falstad-open-drain]]

<details>
<summary><strong>Pause & Think</strong>: In a time-division multiplexed bus, what happens if two transistors try to pull the bus LOW at the same time?</summary>

Both transistors conduct, and the bus is still pulled LOW — there's no conflict. The problem only arises with push-pull outputs (where one drives HIGH and another drives LOW). With open-drain outputs, multiple devices can pull LOW simultaneously without damage. This is called a "wired-AND" configuration because the bus is HIGH only when ALL outputs are OFF.

</details>

## Summary

- Switching delays arise from charging/discharging the parasitic capacitance $C_o$
- **Falling edge** (output going LOW): $\tau_1 = C_o \times R_{sat}(T_1)$ — fast, because $T_1$ is driven hard
- **Rising edge** (output going HIGH): $\tau_2 = C_o \times R_{sat}(T_2)$ — slow, because $T_2$ has higher resistance
- ON resistance: $R_{sat} = V_{DS(\text{ON})} / I_{DS}$
- Steady-state output LOW: $V_{o1} = \frac{R_o}{R_o + R_{sat}} V_{DD}$
- **Open-drain outputs** allow bus sharing via an external pull-up resistor
- Multiple open-drain devices can share a bus (time division multiplexing)
