# Small-Signal Analysis — Complete Worked Example

## The Circuit

This example ties together everything from Lesson 06. We'll analyse a complete CE amplifier — the same circuit from the DC analysis example in the previous lessons — but now with a 10 kΩ load and output coupling capacitor added.

[[visual:full-circuit]]

### Given Circuit Parameters
| Component | Value |
|-----------|-------|
| $V_{CC}$ | 10 V |
| $R_A$ | 56 kΩ |
| $R_B$ | 56 kΩ |
| $R_C$ | 10 kΩ |
| $R_{E1}$ | 240 Ω |
| $R_{E2}$ | 20 kΩ (bypassed with $C_E$ = 100 μF) |
| $R_L$ | 10 kΩ |
| $C_{in}$, $C_{out}$ | 100 μF |
| $V_S$ | 12 mV peak |

### Given BJT Parameters
| Parameter | Value |
|-----------|-------|
| $V_{BE(on)}$ | 0.7 V |
| $\beta = h_{fe}$ | 50 |
| $h_{ie}$ | 1 kΩ |
| $h_{re}$ | 2.5 × 10⁻⁴ |
| $h_{oe}$ | 25 μA/V (= 1/40 kΩ) |

### Quantities to Find
1. Input impedance $R_{in}$
2. Output impedance $R_{out}$
3. Voltage gain $A_V$
4. Current gain $A_I$

## Step 1: Recall the DC Q-Point

From the previous DC analysis (Lesson 04):

$$I_{BQ} = 4.1 \text{ μA}, \quad I_{CQ} \approx I_{EQ} = 205 \text{ μA}, \quad V_{CEQ} = 3.85 \text{ V}$$

The Q-point is in the active region — good, our small-signal model is valid.

## Step 2: Draw the AC Equivalent Circuit

To get the AC equivalent circuit:
1. **Short-circuit all capacitors** ($C_{in}$, $C_{out}$, $C_E$)
2. **Replace DC sources with ground** ($V_{CC}$ → short to ground)
3. **Redraw the circuit**

[[visual:ac-equivalent]]

After these steps:
- $R_A$ and $R_B$ both connect from base to ground → **in parallel**: $R_A \| R_B = 56 \text{k} \| 56 \text{k} = 28$ kΩ
- $R_{E2}$ is shorted by $C_E$ → only $R_{E1} = 240$ Ω remains
- $R_C$ and $R_L$ both connect from collector to ground → but we keep them separate (for finding $R_{out}$)

## Step 3: Draw the AC Load Line

The AC load is different from the DC load because $R_L$ is now connected:

$$R_{AC} = R_{E1} + R_C \| R_L = 240 + 10\text{k} \| 10\text{k} = 240 + 5000 = 5240 \text{ Ω} \approx 5 \text{ kΩ}$$

The AC load line passes through the Q-point with slope:

$$\text{slope} = -\frac{1}{R_{AC}} \approx -\frac{1}{5\text{k}}$$

This is steeper than the unloaded AC load line (slope was $-1/10\text{k}$).

[[visual:ac-load-line]]

## Step 4: Build the Small-Signal h-Parameter Model

Replace the BJT with its h-parameter equivalent circuit:

[[visual:h-param-model-circuit]]

Since $h_{re} = 2.5 \times 10^{-4}$ is negligibly small, we set $h_{re} \approx 0$ and remove the feedback voltage source.

Since $1/h_{oe} = 40$ kΩ is much larger than $R_C \| R_L = 5$ kΩ (within ~10%), we can ignore $1/h_{oe}$ as well.

The simplified model has:
- $h_{ie} = 1$ kΩ between base and emitter
- $h_{fe} \cdot i_b = 50 \cdot i_b$ as a current source from collector to emitter
- $R_{E1} = 240$ Ω in the emitter
- $R_A \| R_B = 28$ kΩ from base to ground
- $R_C = 10$ kΩ and $R_L = 10$ kΩ from collector to ground

## Step 5: The R_E Reflection Trick

Here's a powerful simplification: $R_{E1}$ is in the emitter branch, carrying current $i_e \approx i_c \approx (\beta + 1) \cdot i_b$. We can **reflect** it to the base branch by multiplying by $\beta$:

$$R_{E1,\text{reflected}} = \beta \times R_{E1} = 50 \times 240 = 12 \text{ kΩ}$$

This puts it in **series** with $h_{ie}$:

$$R_{base} = h_{ie} + \beta R_{E1} = 1\text{k} + 12\text{k} = 13 \text{ kΩ}$$

> **Why This Works**: Moving $R_{E1}$ to the base doesn't change any voltages or currents in the circuit. The voltage across $R_{E1}$ in the emitter is $i_e \times R_{E1} \approx \beta i_b \times R_{E1}$. If we put $\beta R_{E1}$ in the base branch, the voltage across it is $i_b \times \beta R_{E1}$ — the same! KVL is preserved.

[[visual:re-reflection]]

## Step 6: Find Input Impedance

The input current $I_{in}$ splits between the base path ($R_{base} = 13$ kΩ) and the bias resistors ($R_A \| R_B = 28$ kΩ):

$$I_B = \frac{V_S}{R_{base}} = \frac{12 \text{ mV}}{13 \text{ kΩ}} \approx 0.923 \text{ μA}$$

$$I_1 = \frac{V_S}{R_A \| R_B} = \frac{12 \text{ mV}}{28 \text{ kΩ}} \approx 0.428 \text{ μA}$$

$$I_{in} = I_B + I_1 = 0.923 + 0.428 = 1.35 \text{ μA}$$

$$\boxed{R_{in} = \frac{V_S}{I_{in}} = \frac{12 \text{ mV}}{1.35 \text{ μA}} \approx 8.9 \text{ kΩ} \approx 9 \text{ kΩ}}$$

[[visual:input-impedance-calc]]

## Step 7: Find Output Impedance

Looking into the output (with $R_L$ disconnected and $V_S = 0$):

The current source $h_{fe} \cdot i_b$ has infinite impedance. With $h_{oe}$ neglected, the only element seen from the output is $R_C$.

$$\boxed{R_{out} = R_C = 10 \text{ kΩ}}$$

## Step 8: Find Voltage Gain

The output voltage is:

$$V_L = -I_C \times (R_C \| R_L) = -50 \times 0.923 \text{ μA} \times 5 \text{ kΩ}$$

$$V_L = -50 \times 0.923 \times 10^{-6} \times 5 \times 10^3 = -0.231 \text{ V} \approx -250 \text{ mV}$$

The voltage gain:

$$\boxed{A_V = \frac{V_L}{V_S} = \frac{-250 \text{ mV}}{12 \text{ mV}} \approx -20.8 \approx -21}$$

The negative sign means the output is **180° out of phase** with the input (as expected for CE).

> **Quick Check**: $A_V \approx -(R_C \| R_L) / R_{E1} = -5000/240 \approx -21$. ✓ The shortcut formula matches!

[[visual:voltage-gain-calc]]

## Step 9: Find Current Gain

The load current:

$$I_L = \frac{I_C \times R_C}{R_C + R_L} = \frac{46.15 \times 10}{20} \approx 23 \text{ μA}$$

(Current divides equally because $R_C = R_L$.)

$$\boxed{A_I = \frac{I_L}{I_{in}} = \frac{23}{1.35} \approx 17}$$

> **Why less than $\beta$?** Two reasons: (1) the bias resistors draw some of $I_{in}$, reducing $I_B$, and (2) $I_C$ splits between $R_C$ and $R_L$, so only half reaches the load.

[[visual:current-gain-calc]]

## Step 10: Using CE Parameters in Other Configurations

The lecture also covered an important practical point: what if you have a **common base circuit** but only **CE h-parameters**?

**Answer:** Don't convert the parameters! Instead:
1. Draw the actual CB circuit
2. Identify the three terminals (B, C, E)
3. Insert the **CE h-parameter model** — connecting base to base, collector to collector, emitter to emitter
4. Analyse with KVL/KCL as usual

The circuit topology handles the configuration difference automatically. This is much safer than trying to convert between parameter sets.

## Results Summary

| Quantity | Value | Quick Check |
|----------|-------|------------|
| $R_{in}$ | 8.9 kΩ ≈ 9 kΩ | — |
| $R_{out}$ | 10 kΩ (= $R_C$) | — |
| $A_V$ | ≈ −21 | $-(R_C \| R_L)/R_{E1} = -5\text{k}/240 \approx -21$ ✓ |
| $A_I$ | ≈ 17 | Less than $\beta = 50$ due to bias and load splitting ✓ |

<details>
<summary><strong>Pause & Think</strong>: What would happen to A_V if R_L were removed (open circuit)?</summary>

Without $R_L$: $A_V \approx -R_C/R_{E1} = -10000/240 \approx -42$. The gain *doubles* because the full collector current flows through $R_C$ instead of splitting with $R_L$. This shows why voltage gain depends on the load.

</details>

## Summary

The complete analysis pipeline:
1. **DC analysis** → Q-point ($I_{BQ}$, $I_{CQ}$, $V_{CEQ}$)
2. **AC equivalent circuit** → short caps, ground DC sources
3. **AC load line** → slope = $-1/(R_{E1} + R_C \| R_L)$
4. **h-parameter model** → replace BJT, simplify ($h_{re} \approx 0$, $1/h_{oe}$ often negligible)
5. **$R_E$ reflection trick** → multiply by $\beta$ to move to base branch
6. **Calculate** $R_{in}$, $R_{out}$, $A_V$, $A_I$ using KVL/KCL
7. **Sanity check** with $A_V \approx -(R_C \| R_L)/R_{E,\text{unbypassed}}$
