## From Linear to Nonlinear: Introducing the Ideal Diode

So far, every resistor we have studied — with finite resistance, open circuits, and short circuits — has been **linear**. Their v-i characteristics are straight lines. But many of the most useful circuit elements are nonlinear, and the simplest nonlinear resistor is the **ideal diode**.

> **Why This Matters**: The ideal diode is the gateway to understanding all semiconductor devices. Every rectifier, clipper, clamper, and switch you will encounter in power electronics and signal processing starts here.

The ideal diode is a two-terminal element whose v-i characteristic consists of two line segments joined at the origin. It is a **piecewise-linear** resistor: linear within each segment, but with a sharp corner where the two segments meet. This seemingly simple device is the foundation for understanding rectifiers, clippers, clampers, and many other practical circuits.

Think of the ideal diode like a one-way valve in a water pipe. Water (current) can flow freely in one direction but is completely blocked in the other. There is no "leaking" and no pressure needed to open the valve — it is either fully open or fully shut.

## The V-I Characteristic

The ideal diode's v-i characteristic is defined by two rules:

$$\text{If } v < 0, \text{ then } i = 0 \qquad \text{(reverse biased)}$$

$$\text{If } i > 0, \text{ then } v = 0 \qquad \text{(forward conducting)}$$

At the boundary point, $v = 0$ and $i = 0$ simultaneously.

In set notation, the characteristic is the union of two rays:

$$\mathcal{R}_{ID} = \{(v, i) : v \leq 0, \; i = 0\} \cup \{(v, i) : v = 0, \; i \geq 0\}$$

On the v-i plane, this looks like two line segments meeting at a right angle at the origin:
- The **negative v-axis** (extending from the origin to the left): all points where $v < 0$ and $i = 0$
- The **positive i-axis** (extending from the origin upward): all points where $i > 0$ and $v = 0$

[[visual:ideal-diode-vi]]

Notice how different this is from the straight line of a linear resistor. A linear resistor's v-i curve passes through all four quadrants (or stays in two), but the ideal diode's characteristic is confined entirely to two specific half-axes. This is what makes it fundamentally **nonlinear** — there is no single resistance value that describes the entire device.

## Two Modes of Operation

The ideal diode has exactly two operating modes, and understanding them is the key to analysing any circuit containing ideal diodes.

**Reverse biased** ($v < 0$, $i = 0$): In this mode, the voltage across the diode is negative and no current flows. The diode behaves exactly like an **open circuit**. It blocks current from flowing in the reverse direction. From the v-i plane perspective, the operating point sits on the negative v-axis.

**Forward conducting** ($i > 0$, $v = 0$): In this mode, current flows through the diode in the forward direction and the voltage across it is zero. The diode behaves exactly like a **short circuit**. It allows current to flow freely with no voltage drop. From the v-i plane perspective, the operating point sits on the positive i-axis.

There is also the **boundary point** at the origin ($v = 0$, $i = 0$), which represents the transition between the two modes.

[[visual:ideal-diode-modes]]

Notice the connection to previous concepts:

| Mode | Equivalent | Resistance | v-i Region |
|------|-----------|-----------|------------|
| Reverse biased | Open circuit | $R = \infty$ | Negative v-axis |
| Forward conducting | Short circuit | $R = 0$ | Positive i-axis |
| Boundary | Transition point | Undefined | Origin |

This is why open circuits and short circuits were studied first. The ideal diode is built from them — it simply switches between these two extremes depending on the circuit conditions.

## Circuit Symbol and Terminal Conventions

The ideal diode is drawn as a triangle pointing in the direction of allowed current flow, with a bar at the tip:

- The **anode** (triangle base) is the terminal where current enters during forward conduction
- The **cathode** (bar) is the terminal where current exits

[[visual:ideal-diode-symbol]]

Under the associated reference direction, the voltage $v$ is measured positive at the anode with respect to the cathode, and the current $i$ flows from anode to cathode (into the positive terminal).

The key convention: **current flows in the direction the triangle points**, and is blocked in the opposite direction.

> **Watch Out**: The most common mistake is mixing up anode and cathode. Remember: the triangle points from anode to cathode — current flows with the triangle.

## How to Solve Ideal Diode Circuits

Ideal diode circuits require a specific analysis technique because the diode's behaviour depends on the circuit conditions, but the circuit conditions depend on the diode's behaviour. This circular dependency is resolved by the **assume-and-check** method:

**Step 1: Assume a state for each diode.** For each ideal diode in the circuit, assume it is either forward conducting (replace with a short circuit) or reverse biased (replace with an open circuit).

**Step 2: Solve the resulting linear circuit.** With every diode replaced by either a short circuit or an open circuit, the circuit becomes purely linear. Solve it using standard techniques (Ohm's law, KVL, KCL, voltage/current divider, etc.).

**Step 3: Check consistency.** For each diode, verify that the solution is consistent with the assumed state:
- If you assumed **forward conducting** (short circuit): check that $i \geq 0$ through the diode. If $i < 0$, the assumption is wrong.
- If you assumed **reverse biased** (open circuit): check that $v \leq 0$ across the diode. If $v > 0$, the assumption is wrong.

**Step 4: If inconsistent, revise and repeat.** Change the assumption for one or more diodes and solve again. With $n$ diodes, there are at most $2^n$ combinations to try, but in practice symmetry and physical reasoning eliminate most of them quickly.

[[visual:assume-check-flowchart]]

### Worked Example: Series Diode Circuit

Consider a circuit with a voltage source $V_s = 5\,\text{V}$ in series with a resistor $R = 1\,\text{k}\Omega$ and an ideal diode (anode connected to the resistor).

[[visual:series-diode-circuit]]

**Assume forward conducting** (diode = short circuit):
- Circuit simplifies to $V_s$ in series with $R$ and a wire
- Current: $i = V_s / R = 5 / 1000 = 5\,\text{mA}$
- Voltage across diode: $v = 0$ (short circuit)

**Check**: $i = 5\,\text{mA} > 0$. ✓ Consistent with forward conducting. The assumption is correct.

Now consider the same circuit but with $V_s = -5\,\text{V}$:

**Assume forward conducting**:
- Current: $i = -5 / 1000 = -5\,\text{mA}$

**Check**: $i = -5\,\text{mA} < 0$. ✗ This violates the forward-conducting condition ($i \geq 0$). The assumption is wrong.

**Assume reverse biased** (diode = open circuit):
- No current flows: $i = 0$
- Voltage across diode: $v = V_s = -5\,\text{V}$

**Check**: $v = -5\,\text{V} < 0$. ✓ Consistent with reverse bias. This is the correct solution.

## The Half-Wave Rectifier

The most fundamental application of the ideal diode is the **half-wave rectifier**. This circuit passes only the positive half of an AC input signal and blocks the negative half.

The circuit consists of a sinusoidal source $v_s(t) = V_m \sin(\omega t)$ in series with a diode and a load resistor $R_L$.

During the **positive half-cycle** ($v_s > 0$): The diode is forward biased. It acts as a short circuit, and the full source voltage appears across $R_L$:

$$v_{out}(t) = v_s(t) = V_m \sin(\omega t), \quad 0 \leq \omega t \leq \pi$$

During the **negative half-cycle** ($v_s < 0$): The diode is reverse biased. It acts as an open circuit, and no current flows. The output voltage is zero:

$$v_{out}(t) = 0, \quad \pi \leq \omega t \leq 2\pi$$

[[visual:half-wave-rectifier-waveform]]

[[visual:falstad-ideal-diode-clipper]]

[[visual:diode-states-comparison]]


This is how AC-to-DC conversion begins. The full-wave rectifier (using four diodes in a bridge configuration) improves on this by using both halves of the input cycle.

## Connecting to Your A-Level Knowledge

You studied diodes at A-Level, where you learned that a silicon diode has a "turn-on voltage" of approximately 0.7V. The ideal diode is the simplification where this turn-on voltage is set to **zero**. In the ideal model:

- There is no 0.7V forward voltage drop
- The transition between blocking and conducting is infinitely sharp
- There is no reverse leakage current

Why use this simplified model? Because it captures the essential **switching behaviour** of a diode (blocking in one direction, conducting in the other) while making circuits much easier to analyse. For many applications — especially when the voltages in the circuit are much larger than 0.7V — the ideal diode model gives results that are perfectly adequate.

<details>
<summary><strong>Pause & Think</strong>: If a circuit has two ideal diodes, how many combinations do you need to check in the worst case?</summary>

With 2 diodes, each can be in one of 2 states (ON or OFF), so the maximum number of combinations is $2^2 = 4$. In practice, physical reasoning (e.g., "both diodes can't conduct simultaneously in this topology") often reduces this to 2 or 3 checks.

</details>

## Passivity of the Ideal Diode

Looking at the ideal diode's v-i characteristic on the v-i plane, the characteristic consists of the negative v-axis and the positive i-axis. On the negative v-axis, $i = 0$ so $p = vi = 0$. On the positive i-axis, $v = 0$ so $p = vi = 0$. The ideal diode absorbs **zero power** at every operating point. Since $p = 0 \geq 0$ everywhere, the ideal diode is **passive**.

This makes physical sense: the ideal diode either blocks current (open circuit, no power) or conducts with zero voltage drop (short circuit, no power). It never generates energy.

<details>
<summary><strong>Pause & Think</strong>: A real silicon diode has a 0.7V forward drop and carries 10mA. How much power does it dissipate? Why doesn't the ideal diode dissipate any?</summary>

The real diode dissipates $P = 0.7 \times 0.010 = 7\,\text{mW}$. The ideal diode has zero voltage drop when conducting ($v = 0$), so $P = 0 \times i = 0$ regardless of the current. The ideal model assumes a "perfect" conductor in the forward direction.

</details>

## Practical Applications

The ideal diode model is used extensively in the analysis of:

- **Half-wave and full-wave rectifiers**: circuits that convert AC to DC. The ideal diode model lets you determine which diodes conduct during each half-cycle without getting bogged down in exponential equations.
- **Clipper circuits**: circuits that "clip" a signal to a maximum or minimum value. The ideal diode switches between open and short to achieve this.
- **Clamper circuits**: circuits that shift the DC level of a signal. Again, the diode's switching behaviour is the key mechanism.
- **Logic gates**: in diode logic, ideal diodes implement AND and OR functions.
- **Envelope detectors**: used in AM radio demodulation.

In all these applications, the assume-and-check method is your primary analysis tool.

## Summary

The ideal diode is a piecewise-linear nonlinear resistor that switches between two modes: reverse biased (open circuit, $v < 0$, $i = 0$) and forward conducting (short circuit, $i > 0$, $v = 0$). Its v-i characteristic is the negative v-axis joined to the positive i-axis. To solve circuits with ideal diodes, use the assume-and-check method: assume a state for each diode, solve the linear circuit, and verify consistency. The ideal diode is the zero-turn-on-voltage simplification of the real diode, useful whenever the switching behaviour is more important than the precise turn-on characteristics.
