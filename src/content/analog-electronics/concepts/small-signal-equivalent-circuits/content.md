# Drawing AC Small-Signal Equivalent Circuits

> **Why This Matters**: This is the **most critical practical skill** in the tutorial. Questions 2, 4, 5, and 6 explicitly ask you to "draw the AC small signal equivalent circuit." If you can't draw it correctly, you can't calculate gains or impedances. This concept gives you a bulletproof step-by-step procedure.

## The AC Equivalent Circuit Rules

For AC (small-signal) analysis, we apply rules that are the **opposite** of DC analysis:

[[visual:ac-rules]]

| Component | AC Treatment | Why |
|-----------|-------------|-----|
| **Coupling capacitors** ($C_1, C_2, C_o$) | **Short circuit** | At signal frequencies, $X_C = 1/\omega C \approx 0$ |
| **Bypass capacitors** ($C_E$) | **Short circuit** | Same reason — bypasses RE for AC |
| **DC voltage sources** ($V_{CC}$) | **Short circuit** (ground) | Ideal voltage source has zero AC impedance |
| **DC current sources** | **Open circuit** | Ideal current source has infinite AC impedance |
| **BJT** | **h-parameter model** | Replace with the linear equivalent |

> **Key insight**: $V_{CC}$ becomes **AC ground**. This is why the top of $R_C$ connects to ground in the AC model — $V_{CC}$ is a zero-impedance node for AC signals.

<details>
<summary><strong>Pause & Think</strong>: Why does the bypass capacitor CE matter so much for AC gain?</summary>

With CE present (AC short across RE): the emitter goes directly to AC ground, and the full AC signal appears across hie. This gives maximum gain: $A_v = -h_{fe} R_C / h_{ie}$.

Without CE (RE stays in circuit): the emitter has a voltage that follows the input, reducing the effective input signal. The gain drops to $A_v = -h_{fe} R_C / (h_{ie} + (1+h_{fe})R_E)$, which is much smaller but more stable.

Q5 has a split emitter resistor (Re1 bypassed, Re2 not) — this gives a compromise between gain and stability.

</details>

## Step-by-Step Procedure

[[visual:procedure-flowchart]]

### Step 1: Identify AC Ground Points
- $V_{CC}$ terminal → ground
- Bottom of $R_2$ → already ground
- Any node connected to ground through a short-circuited capacitor → ground

### Step 2: Short All Capacitors
Replace every coupling and bypass capacitor with a wire.

### Step 3: Redraw the Circuit
After shorting caps and grounding VCC, redraw the circuit. You'll find:
- $R_1$ connects from base to ground (since VCC is ground)
- $R_2$ connects from base to ground
- So $R_1 \| R_2$ appears between base and ground
- $R_C$ connects from collector to ground (since VCC is ground)
- $R_L$ (if any) appears from collector to ground (coupling cap shorted)

### Step 4: Replace BJT with h-Parameter Model
Substitute the h-parameter equivalent circuit in place of the transistor.

### Step 5: Include Source Impedance
The signal source $v_s$ with series resistance $R_s$ connects to the input.

## Worked Example: Q2 (Common-Base Amplifier)

Let's draw the AC equivalent for Figure 2:

[[visual:q2-full-to-ac]]

**Given**: $R_s = 100$ Ω, $R_{E1} = 200$ Ω, $R_{E2} = 1.5$ kΩ, $R_1 = 180$ kΩ, $R_2 = 30$ kΩ, $R_C = 4.7$ kΩ, $R_L = 10$ kΩ, $V_{CC} = 10$ V, $h_{fe} = 200$, $h_{ie} = 1$ kΩ.

**After applying AC rules**:
- C1 shorts: vs + Rs=100Ω connects to the emitter
- C2 shorts: RL=10kΩ connects to the collector (in parallel with RC)
- C3 shorts: RE2=1.5kΩ is bypassed (shorted out)
- VCC → AC ground: top of RC and R1 go to ground
- R1 \| R2 = 180k \| 30k = 25.71 kΩ connects base to ground

**Result**: Source drives the emitter through Rs. The base is connected to ground through R1||R2. This is a **Common-Base** configuration (base is AC-grounded).

[[visual:q2-ac-equivalent]]

### State Your Assumptions

Q2.3 says "State all assumptions used to simplify your model." For the simplified model:
1. $h_{re} \approx 0$ (negligible reverse feedback)
2. $h_{oe} \approx 0$ (or $1/h_{oe} \gg R_C$)  
3. Coupling and bypass capacitors have negligible impedance at signal frequencies
4. $V_{CC}$ is an ideal DC source (zero AC impedance)

[[visual:assumptions-checklist]]

## Common Configurations After AC Transformation

[[visual:three-configs-ac]]

| What to Look For | Configuration | Input → | Output → |
|-----------------|--------------|---------|----------|
| Base = input, Collector = output, Emitter = ground or RE | **Common-Emitter (CE)** | Base | Collector |
| Base = input, Emitter = output, Collector = ground | **Common-Collector (CC)** | Base | Emitter |
| Emitter = input, Collector = output, Base = ground | **Common-Base (CB)** | Emitter | Collector |

In Q2: the emitter is the input and the base is grounded → **Common-Base**.
In Q4: Q1 is CE and Q2 is CC (as stated in the question).

## The Effect of Bypass Capacitors on AC Equivalent

[[visual:bypass-cap-effect]]

### Fully Bypassed RE (CE across entire RE)
$R_E$ disappears from AC circuit. Full gain, but less stable.

### Partially Bypassed (Q5 split: Re1 bypassed, Re2 stays)
Only $R_{e2}$ remains in the AC circuit. Moderate gain with some stability.

### No Bypass
Full $R_E$ in AC circuit. Lowest gain but most stable (not common in exams).

<details>
<summary><strong>Pause & Think</strong>: In Q5, Re1=1kΩ is bypassed and Re2=220Ω stays. In the AC equivalent, which resistor appears?</summary>

Only Re2=220Ω appears in the AC equivalent circuit. Re1 is shorted by its bypass capacitor C1. The gain will be $A_v = -h_{fe} R_{out} / (h_{ie} + h_{fe} R_{e2})$ where $R_{out} = R_C \| (1/h_{oe})$. 

This partial bypassing is a design choice: you sacrifice some gain (compared to fully bypassed) in exchange for better stability and more predictable gain.

</details>

## Summary

| Step | Action |
|------|--------|
| 1 | $V_{CC}$ → AC ground |
| 2 | All capacitors → short circuits |
| 3 | Redraw: R1, RC connect to ground; RL appears at collector |
| 4 | Replace BJT with h-parameter model |
| 5 | Add source (vs + Rs) |
| 6 | State assumptions: $h_{re}=0$, $h_{oe}=0$ (if simplified), caps negligible |

> Now that you can draw the AC equivalent, the next concept teaches you how to **analyse it** — deriving formulas for voltage gain, current gain, input impedance, and output impedance.
