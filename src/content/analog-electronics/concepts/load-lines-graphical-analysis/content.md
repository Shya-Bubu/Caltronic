# Load Lines and Graphical Analysis

> **Why This Matters**: Q3 asks you to draw DC and AC load lines on the output characteristics, find x-intercepts, and construct output waveforms from a graphical method. This is a fundamentally visual technique — you overlay straight lines on the transistor's output curves and read off voltages and currents directly from the graph. It's powerful because it handles nonlinearities that algebra can't easily capture.

## The DC Load Line

The DC load line represents the constraint imposed on the transistor by the **external DC circuit**. From KVL around the collector-emitter loop:

$$V_{CC} = I_C R_C + V_{CE} + I_E R_E$$

Since $I_C \approx I_E$ (for large β):

$$V_{CC} = I_C(R_C + R_E) + V_{CE}$$

Rearranging:

$$I_C = \frac{V_{CC} - V_{CE}}{R_C + R_E}$$

This is the equation of a **straight line** on the $I_C$ vs $V_{CE}$ graph.

[[visual:dc-load-line]]

### Two Points Define the Line

| Point | Condition | Coordinates |
|-------|-----------|-------------|
| **x-intercept** | $I_C = 0$ | $(V_{CE} = V_{CC}, 0)$ |
| **y-intercept** | $V_{CE} = 0$ | $(0, V_{CC}/(R_C + R_E))$ |

The Q-point lies **on this line** where it intersects the appropriate $I_B$ curve.

<details>
<summary><strong>Pause & Think</strong>: For Q3, VCC=15V. If the DC load line has x-intercept at 15V and y-intercept at VCC/(RC+RE), how do we find RC and RE?</summary>

From Figure 3(b), we can read the Q-point at approximately (VCE=8V, IC=8mA, IB=80μA). The y-intercept is at IC = VCC/(RC+RE). We need to determine RC and RE from the specifications in Q3.2 — using the Q-point and the output characteristics.

</details>

## The AC Load Line

The AC load line has a **different slope** from the DC load line because:
- The bypass capacitor CE **shorts RE** for AC signals
- The load RL appears in **parallel with RC** through the coupling capacitor

$$R_{AC} = R_C \| R_L$$

The AC load line passes through the **Q-point** with slope:

$$\text{Slope} = -\frac{1}{R_{AC}} = -\frac{1}{R_C \| R_L}$$

[[visual:ac-load-line]]

### AC Load Line x-Intercept

The AC x-intercept (where $i_c = 0$, i.e., at cutoff for AC swing):

$$V_{CE,max} = V_{CEQ} + I_{CQ} \cdot R_{AC}$$

### AC Load Line y-Intercept

$$I_{C,max} = I_{CQ} + \frac{V_{CEQ}}{R_{AC}}$$

[[visual:dc-vs-ac-loadlines]]

> **Key Difference**: The DC load line has slope $-1/(R_C + R_E)$. The AC load line has slope $-1/R_{AC}$ where $R_{AC} = R_C \| R_L$. The AC line is **steeper** because $R_{AC} < R_C + R_E$.

<details>
<summary><strong>Pause & Think</strong>: Q3.3 asks for x-intercepts of both load lines. What voltage values when ic=0?</summary>

**DC load line x-intercept**: VCE = VCC = 15V (when IC = 0, all supply voltage appears across the transistor).

**AC load line x-intercept**: VCE = VCEQ + ICQ × RAC. We need to know VCEQ, ICQ (from the Q-point), and RAC = RC || RL.

</details>

## Constructing Output Waveforms (Q3.4)

Q3.4 asks you to draw the output waveform for $v_s(t) = 0.09 \sin(\omega t)$ V using the graphical method.

[[visual:waveform-construction]]

### Procedure

1. The input signal causes $i_B$ to swing about the Q-point: $i_B = I_{BQ} + i_b$
2. Find $i_b$ from: $i_b = v_s / (h_{ie} + R_{source,total})$ or use $i_b = v_{in}/h_{ie}$ approximately
3. Mark $I_B$ max and min on the output characteristics
4. Read the corresponding $V_{CE}$ values along the **AC load line**
5. Plot $V_{CE}$ vs time as a sinusoid swinging between these limits

### Reading the Graph

- At $I_B = I_{BQ} + i_{b,peak}$: read $V_{CE,min}$ from the AC load line
- At $I_B = I_{BQ} - i_{b,peak}$: read $V_{CE,max}$ from the AC load line
- At $I_B = I_{BQ}$ (no signal): $V_{CE} = V_{CEQ}$ (the Q-point)

The output voltage $v_{out}(t)$ swings between $V_{CE,min}$ and $V_{CE,max}$, centred on $V_{CEQ}$.

[[visual:output-waveform]]

<details>
<summary><strong>Pause & Think</strong>: Q3.4 says Icutoff = 0. What does this assumption simplify?</summary>

$I_{cutoff} = 0$ means we assume the transistor completely cuts off when IB goes to zero (no leakage current). This simplifies the graphical analysis because the minimum IC is exactly 0 (not some small leakage value). The output clips at VCE = VCC if the signal swings large enough to drive IB below zero.

</details>

## Maximum Undistorted Swing

The output can swing without clipping until it hits either:
- **Saturation limit**: $V_{CE} \to V_{CE,sat} \approx 0.2$ V (transistor saturates)
- **Cutoff limit**: $I_C \to 0$ (transistor cuts off)

For maximum symmetric swing, the Q-point should be centred on the AC load line.

[[visual:clipping-limits]]

## Summary

| Quantity | DC Load Line | AC Load Line |
|----------|-------------|-------------|
| **Slope** | $-1/(R_C + R_E)$ | $-1/(R_C \| R_L)$ |
| **x-intercept** ($I_C = 0$) | $V_{CC}$ | $V_{CEQ} + I_{CQ} R_{AC}$ |
| **y-intercept** ($V_{CE} = 0$) | $V_{CC}/(R_C+R_E)$ | $I_{CQ} + V_{CEQ}/R_{AC}$ |
| **Passes through** | Q-point | Q-point |

- **DC load line**: uses $R_C + R_E$, intercepts at $V_{CC}$
- **AC load line**: uses $R_C \| R_L$, steeper, centred on Q-point
- **Waveform construction**: read $V_{CE}$ at $I_B$ extremes along AC load line
- **Clipping**: occurs at saturation ($V_{CE} \approx 0.2$ V) or cutoff ($I_C = 0$)
