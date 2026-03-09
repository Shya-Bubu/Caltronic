# Synthesis — Pulling It All Together

You've just completed the most analytically demanding lesson in the analog electronics course so far. Let's take a step back and see how all six concepts connect into a single, coherent workflow.

## The Complete Analysis Pipeline

Every BJT amplifier analysis follows the same pipeline — and you now own every step of it:

$$\text{Bias (DC)} \xrightarrow{\text{Q-point}} \text{Linearise} \xrightarrow{v_{be} \ll V_T} \text{h-parameters} \xrightarrow{\text{AC model}} \text{Gain, Impedance, Bandwidth}$$

1. **Start with DC** (Lessons 4–5): Find the Q-point. This gives you $I_{CQ}$ and $V_{CEQ}$.

2. **Linearise** (Concept 1): Because $v_{be} < 10$ mV, the exponential becomes linear. The BJT is now a **linear active two-port device**.

3. **Get your h-parameters** (Concepts 2–3): Either derive them from the device equations or extract them graphically from characteristic curves.

4. **Build the AC equivalent** (Concept 4): Replace capacitors with shorts, DC sources with ground, and the BJT with its h-parameter model. Then apply KVL/KCL to find $A_I$, $A_V$, $Z_{in}$, $Z_{out}$.

5. **Check the bandwidth** (Concept 5): The coupling capacitors set the lower cutoff frequency $\omega_L = 1/(R_{in} C_c)$. Parasitic caps set the upper cutoff.

6. **Verify with numbers** (Concept 6): Plug in real values and confirm that your gain and impedance numbers make engineering sense.

## Key Relationships to Remember

| Parameter | What It Is | Typical CE Value |
|-----------|-----------|-----------------|
| $h_{ie}$ | Input resistance (slope of input char.) | ~1 kΩ |
| $h_{re}$ | Reverse voltage gain (≈ 0, often neglected) | ~2.5 × 10⁻⁴ |
| $h_{fe}$ | Forward current gain (= β) | 50–300 |
| $h_{oe}$ | Output conductance (slope of output char.) | ~25 μA/V |

## The Engineer's Shortcut

For quick estimates, remember:

$$A_V \approx -\frac{R_C \| R_L}{R_{E(\text{unbypassed})}}$$

This rough formula — collector-side resistance divided by emitter-side resistance — gives you the voltage gain within 10–20% without any formal h-parameter analysis. Use it as a sanity check.

## Looking Ahead

In the next lesson, you'll apply these same tools to **multistage amplifiers** — cascading CE, CB, and CC stages to achieve higher gain, better impedance matching, and introducing **feedback** to trade gain for stability. The h-parameter analysis you just learned is the engine that drives all of that.

> **You've earned this.** Small-signal analysis is the hardest conceptual leap in this course. If you followed the worked example all the way through, you're ready for anything the exam throws at you.
