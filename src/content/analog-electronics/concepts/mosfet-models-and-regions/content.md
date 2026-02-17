# MOSFET Models and Regions of Operation

> **Why This Matters**: The MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) is the most important electronic device in the world. Every processor, every memory chip, every smartphone — they all run on billions of MOSFETs. Understanding how to model it is non-negotiable for any electronics engineer.

## From BJT to MOSFET — A Different Control Mechanism

The BJT is a **current-controlled** device: base current $I_B$ controls collector current $I_C$. The MOSFET is a **voltage-controlled** device: gate-source voltage $V_{GS}$ controls drain current $I_{DS}$.

[[visual:bjt-vs-mosfet-comparison]]

This is a fundamental difference. The MOSFET gate draws essentially **zero DC current** (it's insulated by a thin oxide layer), so controlling a MOSFET costs almost no power. This is why MOSFETs dominate digital circuits — billions of them can switch without excessive power consumption.

## The NMOS Transistor — Three Terminals

An NMOS transistor has three terminals: **Gate (G)**, **Drain (D)**, and **Source (S)**. The gate voltage controls whether a conductive channel forms between drain and source.

$$\text{Key parameter: } V_T = \text{threshold voltage (typically 1-2V)}$$

When $V_{GS} < V_T$: no channel → transistor OFF (cutoff)
When $V_{GS} > V_T$: channel forms → transistor ON

## Three Models (Progressively More Accurate)

Just as we had three diode models (ideal switch → CVD → PWL), we have three MOSFET models:

### Model 1: The Switch Model

[[visual:switch-model]]

The simplest model treats the MOSFET as a perfect switch:

$$\boxed{V_{GS} < V_T: \quad \text{OFF (open circuit between D and S)}}$$
$$\boxed{V_{GS} \geq V_T: \quad \text{ON (short circuit between D and S)}}$$

**Accuracy**: Very crude. Ignores the fact that the "ON" channel has non-zero resistance and that the current depends on $V_{DS}$.

### Model 2: Switch-Resistor Model (Triode Region)

[[visual:switch-resistor-model]]

When the MOSFET is ON with a small $V_{DS}$, the channel acts like a **resistor**:

$$\boxed{I_{DS} = K\left[(V_{GS} - V_T)V_{DS} - \frac{V_{DS}^2}{2}\right] \quad \text{for } V_{DS} < V_{GS} - V_T}$$

For small $V_{DS}$, this simplifies to:

$$I_{DS} \approx K(V_{GS} - V_T) V_{DS} = \frac{V_{DS}}{R_{on}}$$

where $R_{on} = \frac{1}{K(V_{GS} - V_T)}$ is the ON-resistance. This is the **triode** (or **linear**) region.

> **Key Insight**: In the triode region, the MOSFET behaves like a voltage-controlled resistor. The gate voltage sets the resistance value. This is used in analog switches and variable attenuators.

### Model 3: Switch-Current-Source Model (Saturation Region)

[[visual:switch-current-source-model]]

When $V_{DS}$ is large enough ($V_{DS} \geq V_{GS} - V_T$), the channel "pinches off" and the current becomes independent of $V_{DS}$:

$$\boxed{I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2 \quad \text{for } V_{DS} \geq V_{GS} - V_T}$$

This is the **saturation** region. The MOSFET behaves like a **voltage-controlled current source** (VCCS) — the gate voltage controls the drain current, which is constant regardless of $V_{DS}$.

The quantity $(V_{GS} - V_T)$ is called the **overdrive voltage** $V_{OV}$:

$$V_{OV} = V_{GS} - V_T$$

$$I_{DS} = \frac{K}{2} V_{OV}^2$$

<details>
<summary><strong>Pause & Think</strong>: Why is the saturation region called "saturation" even though it's the region used for amplification?</summary>

The name comes from the fact that the drain current "saturates" — it stops increasing with $V_{DS}$. The current is "full" (saturated) at $\frac{K}{2}V_{OV}^2$ and doesn't grow further as you increase $V_{DS}$. Confusingly, BJT saturation (both junctions forward, switch ON) is a completely different concept from MOSFET saturation (pinch-off, amplifier mode).

</details>

## The Three Regions on a V-I Plot

[[visual:mosfet-vi-family]]

The family of $I_{DS}$ vs $V_{DS}$ curves (each curve at a different $V_{GS}$) shows all three regions:

| Region | Condition | Behaviour |
|--------|-----------|-----------|
| **Cutoff** | $V_{GS} < V_T$ | $I_{DS} = 0$ |
| **Triode** | $V_{GS} > V_T$ and $V_{DS} < V_{OV}$ | $I_{DS}$ increases with $V_{DS}$ (resistor) |
| **Saturation** | $V_{GS} > V_T$ and $V_{DS} \geq V_{OV}$ | $I_{DS}$ constant (current source) |

The boundary between triode and saturation is the **parabola** $V_{DS} = V_{GS} - V_T = V_{OV}$.

## Transfer Characteristic — V_out vs V_in

[[visual:transfer-characteristic]]

For a common-source amplifier (MOSFET with a drain resistor $R_D$ powered by $V_{DD}$), the transfer characteristic shows:

$$V_{out} = V_{DD} - I_{DS} \cdot R_D = V_{DD} - \frac{K}{2}(V_{in} - V_T)^2 \cdot R_D$$

This is an inverted parabola. The output decreases as the input increases — the amplifier **inverts** the signal.

The slope of this curve at the operating point is the **voltage gain**:

$$A_v = -g_m R_D = -K(V_{GS} - V_T) R_D$$

where $g_m = K(V_{GS} - V_T) = K V_{OV}$ is the **transconductance** (VCCS parameter from the dependent sources concept).

## The Saturation Discipline

[[visual:saturation-discipline]]

For the MOSFET to work as an amplifier, it **must stay in saturation** for all input signal values. This means:

$$V_{DS} \geq V_{GS} - V_T \quad \text{at all times}$$

This constraint limits the output voltage swing. If the output swings too far, the MOSFET drops into triode and the amplification relationship breaks down.

Designing an amplifier means choosing $V_{DD}$, $R_D$, and the DC bias point so that the MOSFET stays in saturation for the full range of the input signal. This is analogous to keeping a BJT in active mode.

<details>
<summary><strong>Pause & Think</strong>: What happens to the gain if the MOSFET enters the triode region during a large signal swing?</summary>

In the triode region, the MOSFET acts as a resistor, not a current source. The gain equation $A_v = -g_m R_D$ no longer applies. The output waveform gets "clipped" or distorted because the linear amplification relationship breaks down. This is called clipping distortion.

</details>

## MOSFET vs BJT — Summary Comparison

[[visual:mosfet-bjt-summary]]

| Feature | BJT | MOSFET |
|---------|-----|--------|
| Control | Current ($I_B$) | Voltage ($V_{GS}$) |
| Model type | CCCS ($\beta$) | VCCS ($g_m$) |
| Input impedance | Moderate ($h_{ie}$) | Very high ($\approx \infty$ DC) |
| Amplification region | Active | Saturation |
| Switch-ON region | Saturation | Triode |
| Key equation | $I_C = \beta I_B$ | $I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2$ |

> **Watch Out**: "Saturation" means opposite things for BJTs and MOSFETs! BJT saturation = switch ON. MOSFET saturation = amplifier mode. This naming inconsistency confuses everyone — just accept it and be explicit about which device you're discussing.

[[visual:falstad-mosfet-circuit]]

## Summary

- The MOSFET is a **voltage-controlled device**: $V_{GS}$ controls $I_{DS}$, with zero gate current
- Three models: **switch** (on/off), **switch-resistor** (triode), **switch-current-source** (saturation)
- In **saturation**: $I_{DS} = \frac{K}{2}(V_{GS} - V_T)^2$ — quadratic, not linear
- The transconductance $g_m = K(V_{GS} - V_T)$ connects to the VCCS dependent source model
- The **saturation discipline**: the MOSFET must stay in saturation for proper amplification
- **"Saturation" means opposite things** for BJTs (switch ON) and MOSFETs (amplifier mode)
