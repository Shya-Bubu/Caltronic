# Diode-Transistor Logic (DTL) — The NAND Gate

> **Why This Matters**: The DTL NAND gate is the first logic gate that provides proper signal restoration. By combining diode logic with a BJT inverter, it overcomes the voltage degradation problem of pure diode logic. The complete DC analysis of this gate — calculating currents, checking saturation, and finding voltage thresholds — is a core exam skill.

## The BJT Inverter — A Quick Refresher

Before building the DTL gate, let's review the BJT inverter that forms its output stage.

[[visual:bjt-inverter-schematic]]

An NPN transistor with a base resistor $R_B$ and a collector resistor $R_C$ forms a simple inverter. The input $V_i$ feeds the base through $R_B$, and the output $V_o$ is taken at the collector.

**When $V_i$ is large (HIGH):**
- The transistor receives enough base current to drive it into **saturation**
- $V_{CE(\text{sat})} = 0.2V$ — the collector is nearly at ground
- $V_o = V_{CE(\text{sat})} \approx 0.2V$ → **LOW**

**When $V_i$ is low (LOW):**
- No base current flows → $T$ is **OFF**
- $I_B \approx 0$, $I_C \approx 0$
- No voltage drop across $R_C$ → $V_o = V_{cc}$ → **HIGH**

| Input | Transistor | Output |
|:---:|:---:|:---:|
| LOW | OFF | HIGH ($\approx 5V$) |
| HIGH | ON, saturated | LOW ($\approx 0.2V$) |

This is an inverter — and crucially, it **restores logic levels**. The output is either near $V_{cc}$ (clear HIGH) or near $0V$ (clear LOW), regardless of how degraded the input was.

## The DTL NAND Gate Circuit

[[visual:dtl-nand-gate-schematic]]

The DTL NAND gate combines a diode AND gate (from the previous concept) with a BJT inverter. Here's the circuit:

- Three input diodes (for inputs **A**, **B**, **C**) with cathodes at the inputs and anodes at a common node
- A $5\,k\Omega$ pull-up resistor from $+V_{cc} = 5V$ to the common anode node
- Two series diodes ($D_1$ and $D_2$) between the common node and the transistor base
- A base-emitter resistor $R_B = 5\,k\Omega$ from the transistor base to ground
- An NPN transistor **T** with emitter grounded
- A collector resistor $R_C = 2.2\,k\Omega$ from $+V_{cc}$ to the collector
- Output **Y** taken at the collector

> **Key Insight**: The two series diodes $D_1$ and $D_2$ serve a critical purpose — they provide a **voltage offset** that prevents the transistor from turning ON when any input is LOW. Without them, the diode AND gate's output of $0.8V$ might be enough to bias the transistor into conduction. The extra $2 \times 0.7V = 1.4V$ drop ensures a clean separation between ON and OFF conditions.

## State Analysis

### State 1: All Inputs HIGH

When all inputs (A, B, C) are at $+V_{cc} = 5V$:
- All input diodes are reverse-biased → **OFF** (same as the diode AND gate)
- Current $I_1$ flows from $+V_{cc}$ through the $5\,k\Omega$ resistor and through $D_1$, $D_2$ into the base of **T**
- The transistor receives base current → turns ON → goes into **saturation**
- Output $Y = V_{CE(\text{sat})} \approx 0.2V$ → **LOW**

### State 2: Any Input LOW ($\approx 0V$)

When any input is at $0V$:
- That input diode conducts, clamping the common node to $\approx V_{D(\text{ON})} = 0.7V$
- The voltage at the common node is only $0.9V$ (when one diode is ON at $0.2V$ input + $0.7V$ diode drop)

Now, can this voltage turn ON the transistor? Let's check:

The minimum voltage needed to turn ON the transistor through $D_1$, $D_2$, and the base-emitter junction:

$$V_{\text{min}} = 2V_\gamma + V_{BE(\text{ON})} = 2 \times 0.6V + 0.8V = 2.0V$$

But the voltage at the node is only:

$$V_i = 0.2V + V_{D(\text{ON})} = 0.2V + 0.7V = 0.9V$$

Since $0.9V < 2.0V$:

$$\boxed{V_i = 0.9V < 2V_\gamma + V_{BE(\text{ON})} = 2.0V}$$

**This voltage is not enough to turn ON $T$!** The transistor stays OFF, and the output is pulled HIGH.

[[visual:dtl-voltage-threshold]]

The assumption throughout: $V_{D(\text{ON})} = 0.7V$ (the voltage drop across a conducting diode, where $V_{\gamma} + I_D R_f \approx 0.7V$).

## Complete DC Analysis — All Inputs HIGH

[[visual:dtl-all-high-circuit]]

Let's calculate every current and voltage when all inputs are HIGH:

**Step 1: Node voltage $V_P$**

The voltage at node P (the common anode of the input diodes) must supply $D_1$, $D_2$, and $V_{BE}$:

$$V_P = 2V_{D(\text{ON})} + V_{BE(\text{sat})} = 2 \times 0.7V + 0.8V = 2.2V$$

**Step 2: Current $I_1$ through the $5\,k\Omega$ resistor**

$$I_1 = \frac{V_{cc} - V_P}{R} = \frac{5V - 2.2V}{5\,k\Omega} = \frac{2.8V}{5\,k\Omega}$$

$$\boxed{I_1 = 0.56\,\text{mA}}$$

**Step 3: Collector current $I_C$**

$$I_C = \frac{V_{cc} - V_{CE(\text{sat})}}{R_C} = \frac{5V - 0.2V}{2.2\,k\Omega}$$

$$\boxed{I_C = 2.182\,\text{mA}}$$

**Step 4: Current $I_2$ through $R_B$**

$$I_2 = \frac{V_{BE(\text{sat})}}{R_B} = \frac{0.8V}{5\,k\Omega}$$

$$\boxed{I_2 = 0.16\,\text{mA}}$$

**Step 5: Base current $I_B$ (KCL at the base node)**

$$I_B = I_1 - I_2 = 0.56\,\text{mA} - 0.16\,\text{mA}$$

$$\boxed{I_B = 0.4\,\text{mA}}$$

[[visual:dtl-current-flow-plotly]]

<details>
<summary><strong>Pause & Think</strong>: Why is $I_B = I_1 - I_2$ and not $I_B = I_1$?</summary>

Because at the base node, KCL applies: the current arriving ($I_1$ from the diode chain) splits into two paths — part goes into the transistor base ($I_B$) and part flows down through the base resistor $R_B$ to ground ($I_2$). So $I_1 = I_B + I_2$, giving $I_B = I_1 - I_2 = 0.56 - 0.16 = 0.4$ mA.

</details>

## Checking the Saturation Condition

We assumed the transistor is in saturation. Let's verify:

For saturation, the base current must exceed the minimum required:

$$I_B > \frac{I_C}{h_{FE}}$$

Assuming $h_{FE} = 30$:

$$\frac{I_C}{h_{FE}} = \frac{2.182\,\text{mA}}{30} = 0.0727\,\text{mA}$$

Since $I_B = 0.4\,\text{mA} > 0.0727\,\text{mA}$, the transistor IS in saturation. Our initial assumption was correct.

## Finding Minimum $h_{FE}$

At the threshold of saturation:

$$I_B \ge \frac{I_C}{h_{FE,\min}}$$

$$0.4\,\text{mA} \ge \frac{2.182\,\text{mA}}{h_{FE,\min}}$$

$$h_{FE,\min} \ge \frac{2.182}{0.4}$$

$$\boxed{h_{FE,\min} \ge 5.46 \approx 5}$$

The lecture notes note that "$h_{FE}$ should be at least larger than 5." This is a very modest requirement — most practical BJTs have $h_{FE}$ values of 50–300, so the saturation condition is easily met.

[[visual:falstad-dtl-nand]]

<details>
<summary><strong>Pause & Think</strong>: What would happen if $h_{FE}$ were exactly 5?</summary>

The transistor would be right at the edge of saturation — the operating point sits at the boundary between the active and saturation regions. In practice, we want $h_{FE}$ to be well above the minimum to ensure reliable saturation as temperature and manufacturing variations shift the parameters. That's why the lecture uses $h_{FE} = 30$ in the example.

</details>

## Summary

- The DTL NAND gate combines a diode AND section with a BJT inverter
- Two series diodes ($D_1$, $D_2$) provide a $1.4V$ offset to ensure clean switching
- When **all inputs are HIGH**: T saturates → output LOW ($0.2V$) — this is the NAND function
- When **any input is LOW**: Node voltage $\approx 0.9V < 2.0V$ → T stays OFF → output HIGH ($V_{cc}$)
- Key DC results: $I_1 = 0.56$ mA, $I_C = 2.182$ mA, $I_2 = 0.16$ mA, $I_B = 0.4$ mA
- Minimum $h_{FE} \ge 5$ for saturation
- DTL **restores logic levels** — output is always near $V_{cc}$ or near $0.2V$
