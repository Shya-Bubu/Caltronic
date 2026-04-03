# Fan-Out and Power Consumption — How Many Gates Can You Drive?

> **Why This Matters**: A logic gate doesn't exist in isolation — its output drives the inputs of other gates. The maximum number of gates a single output can reliably drive is called the **fan-out**, and it's limited by the transistor's ability to sink current while staying in saturation. Understanding fan-out and power consumption is essential for designing reliable digital circuits.

## What Limits Fan-Out?

In the previous concept, you saw that the DTL NAND gate's output transistor saturates when $I_B > I_C / h_{FE}$. But what happens when the output is connected to multiple load gates?

Each load gate draws current from the driving gate. As you connect more loads, the total current increases, and eventually the transistor can no longer maintain saturation. That's the fan-out limit.

[[visual:fanout-circuit-schematic]]

The diagram shows the driving gate's transistor T in saturation, with its collector connected to multiple load gates ($\text{cct}_1$, $\text{cct}_2$, $\text{cct}_3$, ...). Each load gate's input diode (like $D_{A1}$, $D_{A2}$, $D_{A3}$) draws a current $I_L$ from the collector node.

## Calculating Load Current $I_L$

When the driving transistor is saturated, its collector sits at $V_{CE(\text{sat})} = 0.2V$. Each load gate's input diode conducts (since the input is at the LOW level), and the current path goes from $+V_{cc}$ through the load gate's $5\,k\Omega$ pull-up resistor, through the input diode, and into the driving gate's collector.

The voltage across the load gate's pull-up resistor is:

$$V_{cc} - (V_{CE(\text{sat})} + V_{DA1(\text{ON})}) = 5V - (0.2V + 0.7V) = 4.1V$$

So the load current from each gate is:

$$I_L = \frac{V_{cc} - (V_{CE(\text{sat})} + V_{DA1(\text{ON})})}{R} = \frac{5 - (0.2 + 0.7)}{5\,k\Omega}$$

$$\boxed{I_L = \frac{4.1}{5000} = 0.82\,\text{mA}}$$

[[visual:load-current-calculation]]

## Fan-Out Calculation

With $N$ load gates connected, the total current the collector must sink is:

$$I_C(\text{total}) = I_{C(\text{base circuit})} + N \times I_L = 2.182\,\text{mA} + N \times 0.82\,\text{mA}$$

For the transistor to remain in saturation:

$$I_B > \frac{I_C(\text{total})}{h_{FE}}$$

Substituting $I_B = 0.4\,\text{mA}$ and $h_{FE} = 30$:

$$0.4\,\text{mA} > \frac{2.182 + 0.82N}{30}$$

$$12\,\text{mA} > 2.182 + 0.82N$$

$$0.82N < 9.818$$

$$N < 11.97$$

Since $N$ must be an integer:

$$\boxed{N \le 11}$$

The fan-out is approximately 10–12 gates, depending on component tolerances.

[[visual:fanout-vs-n-plotly]]

> **Key Insight**: The lecture notes say "$N \approx 10$" as a practical figure. The exact value depends on the specific $h_{FE}$ of the transistor and component tolerances. In practice, data sheets specify both the maximum fan-out and the logic level voltage ranges.

<details>
<summary><strong>Pause & Think</strong>: How could you increase the fan-out of a DTL gate?</summary>

You could: (1) Increase $h_{FE}$ by choosing a transistor with higher current gain. (2) Increase $I_B$ by reducing the $5\,k\Omega$ pull-up resistor (increases $I_1$) or reducing $R_B$. (3) Decrease $I_L$ by increasing the load gates' pull-up resistors. Each approach has trade-offs in speed, power consumption, and noise immunity.

</details>

## Logic Level Definitions

Before discussing power consumption, let's formalise the voltage ranges for logic levels:

| Level | Voltage Range | Description |
|:---:|:---:|:---:|
| Logic 0 (LOW) | $< 0.4V$ | Valid LOW output |
| Logic 1 (HIGH) | $> 2.4V$ | Valid HIGH output |

These ranges define what the output of a gate must produce for downstream gates to correctly interpret the logic state. The gap between $0.4V$ and $2.4V$ is the **forbidden zone** — outputs should never sit in this range during steady state.

[[visual:logic-levels-diagram]]

## Static Power Consumption

Logic gates consume power from the supply even when they're not switching. This is called **static power consumption**, and it depends on whether the output is HIGH or LOW.

### Power When Output is HIGH — $P(1)$

[[visual:power-high-circuit]]

When the output is HIGH, the transistor T is OFF:
- $I_C = 0$ (no collector current)
- The only current from $+V_{cc}$ is $I_1$ flowing through the pull-up resistor and the conducting input diode

From the earlier analysis of case (a) — when one input is LOW:

$$I_S = I_2 + I_1 = 0 + 0.82\,\text{mA} = 0.82\,\text{mA}$$

$$\boxed{P(1) = V_{cc} \times I_S = 5V \times 0.82\,\text{mA} = 4.1\,\text{mW}}$$

### Power When Output is LOW — $P(0)$

When the output is LOW, the transistor T is ON (saturated):
- $I_1 = 0.56\,\text{mA}$ flows through the $5\,k\Omega$ resistor to the base circuit
- $I_2 = 2.182\,\text{mA}$ flows through $R_C$ into the collector
- No current flows through the input diodes (all inputs HIGH)

Total supply current:

$$I_S = I_1 + I_2 = 0.56 + 2.182 = 2.742\,\text{mA}$$

$$\boxed{P(0) = V_{cc} \times I_S = 5V \times 2.742\,\text{mA} = 13.71\,\text{mW}}$$

[[visual:power-comparison-chart]]

Notice that the gate consumes **much more power when the output is LOW** than when it's HIGH. This is because the saturated transistor draws significant collector current.

## Average Power Consumption

Assuming the output spends equal time HIGH and LOW:

$$P_{\text{av}} = \frac{P(0) + P(1)}{2} = \frac{13.71 + 4.1}{2}$$

$$\boxed{P_{\text{av}} = \frac{17.81}{2} \approx 9\,\text{mW}}$$

That's approximately 9 milliwatts per gate. For a chip with 1000 gates, that's 9 watts — which generates significant heat. This is one of the key reasons why CMOS technology (with near-zero static power) eventually replaced DTL and TTL.

[[visual:falstad-power-demo]]

<details>
<summary><strong>Pause & Think</strong>: Why does CMOS have near-zero static power consumption while DTL has ~9mW?</summary>

In DTL (and TTL), current flows from $V_{cc}$ through the resistors and transistor in at least one logic state. In CMOS, the PMOS and NMOS transistors are never both ON simultaneously — one is always OFF, blocking the current path. So in steady state, the only current is the tiny leakage through the OFF transistor, making static power consumption essentially zero.

</details>

## Summary

- Each load gate draws $I_L = 0.82\,\text{mA}$ from the driving gate
- **Fan-out** $N \le 11$ (practically $\approx 10$) — limited by the saturation condition $I_B > I_C / h_{FE}$
- Logic levels: LOW $< 0.4V$, HIGH $> 2.4V$
- $P(1) = 4.1\,\text{mW}$ (output HIGH — less power)
- $P(0) = 13.71\,\text{mW}$ (output LOW — more power, due to collector current)
- $P_{\text{av}} \approx 9\,\text{mW}$ per gate
- This high static power is why CMOS eventually replaced DTL/TTL
