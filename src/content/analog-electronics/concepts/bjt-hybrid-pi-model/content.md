## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **DC vs AC analysis**: DC sets the Q-point; AC analyses the signal
- **AC equivalent circuit**: short capacitors, short $V_{CC}$
- **$I_C = \beta I_B$** in the active region
- **What a two-port network is**: input port (base-emitter) and output port (collector-emitter)
- **Dependent sources**: a current source whose value depends on another quantity

</details>

---

## Hook: Making the Nonlinear Linear

You know the BJT is fundamentally a **nonlinear** device — its $I_C$ vs $V_{BE}$ characteristic is an exponential ($I_C = I_S e^{V_{BE}/V_T}$). That's great for switching, but terrible for analysis. How do you calculate the voltage gain of an amplifier if the equations are exponential?

The answer: **linearise around the Q-point**. If the signal is small enough, the exponential curve looks like a straight line near the operating point. This straight-line approximation gives you a **linear equivalent circuit** — the **hybrid-π model** — where the transistor becomes just resistors and dependent sources.

Once you have a linear model, you can use all the tools you already know: KVL, KCL, superposition, Thévenin. That's the power of small-signal analysis.

---

## From h-Parameters to the Hybrid-π Model

### The General h-Parameter Model

The BJT can be modelled as a **two-port network** with four h-parameters:

| Parameter | Symbol | Physical Meaning |
|-----------|--------|-----------------|
| $h_{ie}$ | Input impedance | Resistance looking into the base ($v_{be}/i_b$ with output shorted) |
| $h_{re}$ | Reverse voltage transfer | How much $v_{ce}$ feeds back to the input ($v_{be}/v_{ce}$ with input open) |
| $h_{fe}$ | Forward current gain | $\beta$ ($i_c/i_b$ with output shorted) |
| $h_{oe}$ | Output admittance | $1/R_{out}$ ($i_c/v_{ce}$ with input open) |

[[visual:h-parameter-full-model]]

### Simplification: Dropping Two Parameters

In most practical circuits:
- $h_{re} \approx 10^{-4}$ — the reverse voltage feedback is negligibly small
- $h_{oe} \approx 10^{-6}$ S — the output conductance is tiny (output resistance $R_{out} \approx 1$ MΩ or more)

Setting $h_{re} = 0$ and $h_{oe} = 0$ (equivalently, $R_{out} \rightarrow \infty$) eliminates two components and leaves a simple three-parameter model:

1. **$r_\pi = h_{ie}$** — input resistance between base and emitter
2. **$\beta = h_{fe}$** — forward current gain
3. **$\beta \cdot i_b$** — a current-controlled current source (CCCS)

[[visual:hybrid-pi-circuit]]

This is the **hybrid-π model**. It's called "hybrid" because it uses a mix of impedances and dependent sources, and "π" because of the circuit topology (the two components — $r_\pi$ and the current source — form a π-shaped network between B, C, and E).

> **Key Insight**: The hybrid-π model is a **linear** circuit. You can apply superposition, Thévenin, KVL, KCL — all the tools from circuit analysis. This is what makes amplifier analysis tractable.

---

## The Transconductance $g_m$

The current-controlled current source ($\beta \cdot i_b$) can be converted to a **voltage-controlled** current source by substituting $i_b = v_{be}/r_\pi$:

$$i_c = \beta \cdot i_b = \beta \cdot \frac{v_{be}}{r_\pi} = g_m \cdot v_{be}$$

where the **transconductance** is:

$$\boxed{g_m = \frac{\beta}{r_\pi} = \frac{I_{CQ}}{V_T}}$$

[[visual:vccs-conversion]]

The voltage-controlled form ($g_m \cdot v_{be}$) is often preferred because $g_m$ has a remarkable property: **it depends only on $I_{CQ}$ and $V_T$, not on $\beta$**. This means:
- $g_m$ is the same for any transistor biased at the same $I_{CQ}$
- Amplifier gain expressions using $g_m$ are more "universal" than those using $\beta$

### The Thermal Voltage $V_T$

[[visual:thermal-voltage-note]]

$$V_T = \frac{kT}{q} \approx 26\;\text{mV at room temperature (27°C)}$$

where $k = 1.38 \times 10^{-23}$ J/K (Boltzmann's constant) and $q = 1.6 \times 10^{-19}$ C (electron charge).

$V_T$ sets the scale for all small-signal parameters. At room temperature, it gives us the incredibly useful shortcut:

$$\boxed{g_m \approx \frac{I_{CQ}\;\text{(in mA)}}{0.026\;\text{V}} = 38.5 \cdot I_{CQ}\;\text{(mA/V)}}$$

[[visual:gm-vs-ic-plot]]

<details>
<summary><strong>Pause & Think</strong>: If I_CQ = 2 mA, what is g_m?</summary>

$g_m = I_{CQ}/V_T = 2\;\text{mA}/26\;\text{mV} = 76.9\;\text{mA/V} \approx 77\;\text{mA/V}$. This means that for every 1 mV change in $v_{be}$, the collector current changes by 0.077 mA. Note: $g_m$ doesn't depend on β at all.

</details>

---

## The Input Resistance $r_\pi$

$$\boxed{r_\pi = \frac{\beta}{g_m} = \frac{\beta V_T}{I_{CQ}}}$$

[[visual:rpi-vs-ic-plot]]

$r_\pi$ is the small-signal resistance looking into the base. It **does** depend on $\beta$. Typical values:

| $I_{CQ}$ | $\beta$ | $r_\pi$ |
|-----------|--------|---------|
| 1 mA | 100 | 2.6 kΩ |
| 1 mA | 200 | 5.2 kΩ |
| 5 mA | 100 | 520 Ω |
| 10 mA | 100 | 260 Ω |

> **Pro Tip**: Higher $I_{CQ}$ → lower $r_\pi$ → transistor "loads" the signal source more. This is why low-power amplifiers (low $I_{CQ}$) tend to have higher input impedance.

---

## The Emitter Resistance $r_e$

There's a third parameter that's extremely useful:

$$\boxed{r_e = \frac{1}{g_m} = \frac{V_T}{I_{CQ}} \approx \frac{26\;\text{mV}}{I_{CQ}}}$$

$r_e$ is the small-signal resistance looking into the emitter (with the base grounded). It's related to $r_\pi$ by:

$$r_\pi = \beta \cdot r_e$$

This makes sense: looking into the base, the emitter resistance $r_e$ appears $\beta$ times larger because the base current is $\beta$ times smaller than the emitter current.

[[visual:parameter-relationships]]

<details>
<summary><strong>Pause & Think</strong>: If I_CQ = 1 mA, what are g_m, r_e, and r_π (with β = 150)?</summary>

$g_m = I_{CQ}/V_T = 1/0.026 = 38.5$ mA/V

$r_e = 1/g_m = 26$ Ω

$r_\pi = \beta \cdot r_e = 150 \times 26 = 3900$ Ω $= 3.9$ kΩ

Check: $r_\pi = \beta V_T / I_{CQ} = 150 \times 0.026 / 1 = 3.9$ kΩ ✓

</details>

---

## The Complete Simplified Model

When $R_{out} = 1/h_{oe} \gg R_L$ (which is true in almost all practical circuits), we drop $R_{out}$ entirely:

[[visual:simplified-hybrid-pi]]

**The model has just two elements:**
1. $r_\pi$ between base and emitter (resistor)
2. $g_m \cdot v_{be}$ from collector to emitter (VCCS)

This is the most commonly used version. It's the starting point for calculating voltage gain, current gain, input impedance, and output impedance of any BJT amplifier configuration.

---

## The $r_e$ Model Alternative

[[visual:re-model-alternative]]

An equivalent way to draw the model uses $r_e$ at the emitter instead of $r_\pi$ at the base:
- Looking into the base: you see $r_\pi = \beta \cdot r_e$
- Looking into the emitter: you see $r_e$
- The current source: $i_c = g_m \cdot v_{be} = \alpha \cdot i_e$

Both models give identical results. The hybrid-π (with $r_\pi$) is most convenient for **common-emitter** analysis. The $r_e$ model is more natural for **common-base** analysis.

---

## Interactive Parameter Calculator

[[visual:parameter-calculator-sim]]

Enter $I_{CQ}$ and $\beta$ in the interactive calculator above. See how all four small-signal parameters ($g_m$, $r_\pi$, $r_e$, and the relationship between them) change as you adjust the operating point.

---

## When to Use What Form

| Analysis Task | Preferred Model Form |
|--------------|---------------------|
| Common-emitter voltage gain | $g_m \cdot v_{be}$ (VCCS) with $r_\pi$ |
| Common-base analysis | $r_e$ model |
| Input impedance calculation | Either (both give $r_\pi$ from the base) |
| Output impedance calculation | $g_m$ model with $R_{out}$ if needed |
| Quick estimation | $r_e \approx 26/I_{CQ}\;\text{(mA)}$ |

<details>
<summary><strong>Pause & Think</strong>: Why is g_m independent of β but r_π is not?</summary>

$g_m = I_{CQ}/V_T$ — it depends only on the DC bias current (set by the circuit) and $V_T$ (a physical constant). It's fundamentally a property of the junction, not the transistor's current gain.

$r_\pi = \beta/g_m$ — it inherits $\beta$ dependence because $r_\pi$ is the base-to-emitter resistance, and the base current is $\beta$ times smaller than the collector current. A higher $\beta$ means less base current for the same $I_C$, so the input appears as a higher resistance.

</details>

---

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Using the hybrid-π model for DC analysis | The model is for **small-signal AC only**. Find the Q-point first with the DC model, then use hybrid-π for AC. |
| Confusing $r_e$ (small-signal) with $R_E$ (physical resistor) | $r_e = V_T/I_{CQ}$ is an intrinsic transistor parameter. $R_E$ is an external resistor. They're completely different. |
| Forgetting that $g_m$ depends on the Q-point | $g_m = I_{CQ}/V_T$ — change the bias and $g_m$ changes. |
| Including $R_{out}$ when it's not needed | If $R_{out} > 10 R_L$, just drop it. This simplification is valid in nearly all practical circuits. |

---

## Summary

- The **hybrid-π model** replaces the nonlinear BJT with a linear equivalent circuit for small-signal (AC) analysis
- Derived from h-parameters by setting $h_{re} = 0$ and $h_{oe} = 0$
- **Three key parameters**: $g_m = I_{CQ}/V_T$ (transconductance), $r_\pi = \beta/g_m$ (input resistance), $r_e = 1/g_m$ (emitter resistance)
- $g_m$ is **β-independent** — it depends only on the bias current and thermal voltage
- $V_T \approx 26$ mV at room temperature → $r_e \approx 26\;\text{mV}/I_{CQ}$
- The simplified model has just $r_\pi$ + $g_m \cdot v_{be}$ — enough to analyse any amplifier
