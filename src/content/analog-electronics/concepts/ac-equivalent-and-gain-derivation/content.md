# AC Equivalent Circuit and Gain Derivation

> **Why This Matters**: The AC equivalent is the analytical engine of amplifier design. Every specification — voltage gain, input impedance, output impedance — comes from this analysis. Without it, your design is pure guesswork.

## From the Full Circuit to the AC Equivalent

You've seen the full circuit with VCC, biasing resistors, coupling capacitors, and two transistors. For AC analysis, you need to strip away everything that doesn't affect the signal. The rules are simple:

1. **DC voltage sources become short circuits** (VCC → ground)
2. **Coupling and bypass capacitors become short circuits** (at the signal frequency)
3. **Replace transistors with their h-parameter small-signal model**

[[visual:full-to-ac-transformation]]

After applying these rules, VCC connects to ground, and the coupling capacitors at input ($C_{in}$) and output ($C_o$) vanish. What remains is the small-signal equivalent — the circuit that determines how the amplifier responds to AC signals.

## The H-Parameter Small-Signal Model

Each transistor is replaced by its h-parameter equivalent circuit:

- **$h_{ie}$** — input impedance (base-to-emitter resistance). For BC549: 2.7 kΩ. For BC556: 1.6 kΩ.
- **$h_{fe}$** — forward current gain. For both: ~220.
- **$h_{re}$** — reverse voltage ratio. For both: $1.5 \times 10^{-4}$ (tiny — almost always ignored).
- **$h_{oe}$** — output admittance. For both: 18 μS = 1/56 kΩ (large resistance — usually ignored).

[[visual:h-parameter-model-schematic]]

> **Engineering Approximation**: Since $h_{re} \approx 0$ and $1/h_{oe} \approx 56$ kΩ (much larger than typical load/collector resistors of 1-5 kΩ), we simplify the model to just $h_{ie}$ and the dependent current source $h_{fe} \cdot i_b$. This is the **simplified h-parameter model** — and it's perfectly adequate for this design.

## The Simplified AC Equivalent Circuit

[[visual:simplified-ac-equivalent]]

After substitution and simplification, the AC equivalent has these key features:

**Stage 1 (NPN — Q1):**
- Input: signal comes through $C_{in}$, sees $R_a \| R_b \| h_{ie1}$ in parallel
- The base current $i_{b1}$ flows through $h_{ie1}$
- Collector current: $i_{c1} = h_{fe1} \cdot i_{b1}$
- The collector current flows through $R_1$ and into the base of Q2

**Stage 2 (PNP — Q2):**
- Input: receives $i_{c1}$ from Stage 1's collector
- Base current $i_{b2}$ produces collector current $i_{c2} = h_{fe2} \cdot i_{b2}$
- Output voltage develops across $R_5 \| R_L$

The critical simplifications from the lecture notes come next.

## Engineering Approximations — the "10× Rule"

[[visual:approximation-waterfall]]

The professor emphasised several key approximations. Each one simplifies an expression by dropping a term that is less than 10% of the dominant term:

**Approximation 1**: $R_2 \gg R_3$

In the lab design, $R_2$ (the emitter resistor of Q1's collector side) is typically 1.8 kΩ, while $R_3$ (the emitter degeneration resistor) is about 82 Ω. Since $R_2 / R_3 \approx 22$, which is much greater than 10, we can approximate:

$$R_2 \| R_3 \approx R_3$$

**Approximation 2**: $R_1 \gg h_{ie2}$

$R_1$ (collector resistor of Q1) is typically 1.8 kΩ, and $h_{ie2}$ for BC556 is 1.6 kΩ. This ratio is only about 1.1 — **this approximation is NOT valid**. The professor explicitly warns that ignoring $h_{ie2}$ will give you higher gain than the actual circuit delivers.

$$R_1 \| h_{ie2} \neq R_1 \quad \text{(cannot ignore } h_{ie2}\text{)}$$

**Approximation 3**: $1/h_{oe} \gg R_5$

$1/h_{oe} = 56$ kΩ while $R_5 = 220$ Ω. The ratio is over 250. This is safely ignored:

$$\frac{1}{h_{oe}} \| R_5 \approx R_5$$

[[visual:ten-x-rule-chart]]

## Deriving the Voltage Gain

Now we derive $A_v$ step by step. Starting from the output and working backwards:

**Output voltage** (across $R_5 \| R_L$):

$$v_o = -i_{c2} \cdot (R_5 \| R_L)$$

The negative sign accounts for the PNP inversion combined with the circuit topology. For the overall AC gain from input to output:

**Stage 2 gain**: The collector current of Q2 is:

$$i_{c2} = h_{fe2} \cdot i_{b2}$$

**Interstage coupling**: The base current of Q2 relates to the collector current of Q1 through the voltage divider formed by $R_1$ and $h_{ie2}$. After applying the simplified model:

$$v_o \approx \frac{h_{fe2} \cdot R_5}{R_3} \cdot v_{in}$$

Therefore, the **simplified voltage gain expression** is:

$$\boxed{A_v = \frac{h_{fe2} \cdot R_5}{R_3}}$$

[[visual:gain-vs-r3-plot]]

With $h_{fe2} = 220$, $R_5 = 220$ Ω:

$$A_v = \frac{220 \times 220}{R_3}$$

For $A_v = 600$: $R_3 = \frac{220 \times 220}{600} = 80.7$ Ω → pick **82 Ω** from E12.

<details>
<summary><strong>Pause & Think</strong>: The professor suggested 68Ω might be a better choice than 82Ω. Why?</summary>

Because the simplified gain formula ignores $h_{ie2}$. The actual gain will be lower than 600. Choosing $R_3 = 68$ Ω gives a theoretical gain of $A_v = 220 \times 220 / 68 = 711$, which provides headroom to compensate for the gain reduction caused by $h_{ie2}$ loading.

</details>

## Input Impedance

[[visual:input-impedance-breakdown]]

The input impedance of the amplifier determines how much current the signal source must supply. Looking into the base of Q1:

$$Z_{in,\text{transistor}} = h_{ie1} + (1 + h_{fe1}) \cdot R_3$$

But the voltage divider ($R_a$, $R_b$) is in parallel:

$$Z_{in} = R_a \| R_b \| [h_{ie1} + (1 + h_{fe1}) \cdot R_3]$$

With $h_{ie1} = 2.7$ kΩ, $h_{fe1} = 220$, and $R_3 = 82$ Ω:

$$Z_{in,\text{transistor}} = 2700 + 221 \times 82 = 20,822 \text{ Ω} \approx 20.8 \text{ kΩ}$$

The total $Z_{in}$ depends heavily on $R_a$ and $R_b$. If $R_a = 22$ kΩ and $R_b = 47$ kΩ, then:

$$Z_{in} = 22 \| 47 \| 20.8 \approx 8.3 \text{ kΩ}$$

## Output Impedance

The output impedance looking back into the amplifier from the output terminal (with the input source turned off):

$$Z_{out} = R_5 \| \frac{1}{h_{oe2}} \approx R_5 = 220 \text{ Ω}$$

Since $1/h_{oe2} = 56$ kΩ $\gg$ $R_5 = 220$ Ω, the output impedance is dominated by $R_5$.

[[visual:falstad-ac-analysis]]

## The Complete Gain Equation (Without Approximations)

For completeness, and for those who want the most accurate prediction before building the circuit:

$$A_v = \frac{h_{fe1} \cdot h_{fe2} \cdot (R_1 \| h_{ie2})}{h_{ie1} + (1 + h_{fe1}) \cdot R_3} \cdot \frac{R_5 \| R_L}{h_{ie2}}$$

This accounts for the loading effect of $h_{ie2}$ and gives a more accurate result, typically 5–15% lower than the simplified formula.

## Summary

- The AC equivalent replaces VCC with ground, capacitors with shorts, and transistors with h-parameter models
- **Simplified gain**: $A_v = h_{fe2} \cdot R_5 / R_3$ — valid when $R_2 \gg R_3$ and if you accept that $h_{ie2}$ introduces some error
- $R_3$ is the gain-setting resistor — smaller $R_3$ gives higher gain
- Input impedance depends on the bias divider ($R_a \| R_b$) in parallel with the transistor's input impedance
- Output impedance is approximately $R_5$ (220 Ω)
- The professor recommends choosing $R_3$ slightly smaller than calculated to compensate for the loading effect of $h_{ie2}$
