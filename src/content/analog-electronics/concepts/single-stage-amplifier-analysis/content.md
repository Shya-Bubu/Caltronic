# Single-Stage Amplifier Analysis

> **Why This Matters**: Once you have the AC small-signal equivalent circuit, you need to **extract the four key quantities**: voltage gain ($A_v$), current gain ($A_i$), input impedance ($R_{in}$), and output impedance ($R_{out}$). This concept derives formulas for all three BJT configurations (CE, CB, CC) and shows you how to handle source and load effects. Questions 2, 4, 5, and 6 all ask for these quantities.

## The Four Key Quantities

[[visual:four-quantities]]

| Quantity | Definition | Method |
|----------|-----------|--------|
| **$A_v$** (voltage gain) | $v_{out}/v_{in}$ | Analyse output node voltage in terms of input voltage |
| **$A_i$** (current gain) | $i_{out}/i_{in}$ | Trace current through h-parameter model |
| **$R_{in}$** (input impedance) | $v_{in}/i_{in}$ | "Look into" the input with source removed |
| **$R_{out}$** (output impedance) | $v_{test}/i_{test}$ at output (with input zeroed) | Apply test source at output |

## Common-Emitter (CE) with Emitter Degeneration

This is the most common configuration. Start with the general case where RE is in the circuit (partially or fully unbypassed):

[[visual:ce-with-re-circuit]]

### Voltage Gain

From the AC equivalent, applying KVL at the input and analysing the output:

$$A_v = \frac{v_o}{v_{in}} = -\frac{h_{fe} R_{out}}{h_{ie} + h_{fe} R_E}$$

where $R_{out} = R_C \| (1/h_{oe})$ if hoe included, or $R_{out} = R_C$ if simplified.

**Special cases**:
- **RE fully bypassed** ($R_E = 0$): $A_v = -h_{fe} R_C / h_{ie}$ — large gain
- **RE = Re2 (Q5)**: $A_v = -h_{fe} R_{out} / (h_{ie} + h_{fe} R_{e2})$

The **negative sign** means the CE amplifier **inverts** the signal (180° phase shift).

[[visual:ce-gain-vs-re]]

### Input Impedance

Looking into the base (without the biasing resistors):

$$R_{in,base} = h_{ie} + (1 + h_{fe}) R_E$$

Including the biasing network:

$$R_{in} = R_1 \| R_2 \| R_{in,base}$$

Without RE ($R_E = 0$): $R_{in,base} = h_{ie}$ (typically ~1 kΩ)

With RE: $R_{in,base}$ can be much larger ($(1+h_{fe})R_E$ dominates)

[[visual:rin-derivation]]

### Output Impedance

Looking into the collector (with input zeroed, i.e., $v_s = 0$):

$$R_{out} = R_C \| \frac{1}{h_{oe}}$$

If $h_{oe} = 0$ (simplified): $R_{out} = R_C$

### Current Gain

$$A_i = -h_{fe} \cdot \frac{R_{in,base}}{R_{in,base} + R_S'}$$

where $R_S'$ includes the source and biasing effects.

For the simplified model without source effects: $A_i = -h_{fe}$

<details>
<summary><strong>Pause & Think</strong>: Q2.4(a) asks for "input impedance without the load (looking into C1)." What does this mean?</summary>

"Without the load" means remove RL (it's not connected — we're looking into the coupling cap C1). "Looking into C1" means at the node where vs connects. The input impedance is everything the source sees: the biasing network (R1||R2 for CB they connect to base/ground) in combination with the transistor's input impedance.

For the CB configuration in Q2: $R_{in} = R_{E1} + (h_{ie}/(1+h_{fe})) \| R_{E2(bypassed)}$ — but we'll work this out in the solutions.

</details>

## Common-Collector (CC) — Emitter Follower

Used in Q4 (stage 2). The output is taken from the emitter, and the collector is AC-grounded.

[[visual:cc-emitter-follower]]

### Key Properties

$$A_v \approx 1 \quad (\text{unity gain, no inversion})$$

$$R_{in} = h_{ic} + (1 + |h_{fc}|) R_E$$

$$R_{out} \approx \frac{h_{ie}}{1 + h_{fe}} \quad (\text{very low})$$

$$A_i = -(1 + h_{fe}) = h_{fc}$$

The CC is a **buffer**: high input impedance, low output impedance, unity voltage gain. It's used to match impedances between stages.

<details>
<summary><strong>Pause & Think</strong>: In Q4, Q2 is a CC (emitter follower). Its h-parameters are hic=1100Ω, hfc=−51, hrc=1, hoc=1/(40kΩ). What is Rin looking into Q2's base?</summary>

$R_{in,Q2} = h_{ic} + (1 + |h_{fc}|)R_E$

With RE1=5kΩ and Rload=5kΩ in parallel as the effective emitter load:
$R_E' = R_{E1} \| R_{load} = 5k \| 5k = 2.5$ kΩ

$R_{in,Q2} = 1100 + 52 \times 2500 = 1100 + 130000 = 131.1$ kΩ

Very high input impedance — this is why CC is used as a buffer. It barely loads the first stage.

</details>

## Common-Base (CB)

Used in Q2 (the signal enters at the emitter, base is AC-grounded).

[[visual:cb-configuration]]

### Key Properties

$$A_v = \frac{h_{fe} R_C}{h_{ie}} \quad (\text{positive — no inversion!})$$

$$R_{in} = \frac{h_{ie}}{1 + h_{fe}} \quad (\text{very low, typically ~5-20 Ω})$$

$$R_{out} = R_C$$

$$A_i = -\alpha \approx -1$$

The CB has **low input impedance** (good for current-mode input), no voltage inversion, and approximately unity current gain.

## Including Source and Load Effects

[[visual:source-load-effects]]

### With Source Resistance Rs

The actual voltage at the input is reduced by the voltage divider between Rs and Rin:

$$A_{vs} = A_v \cdot \frac{R_{in}}{R_{in} + R_s}$$

### With Load Resistance RL

RL appears in parallel with the output resistance:

$$R_{out,effective} = R_C \| R_L$$

Replace $R_C$ with $R_C \| R_L$ in the gain formulas.

### Q2.5 Approach

Q2.5 says: "Calculate the output voltage across RL if vs = 100 mV."

You need the **overall voltage gain** including both source and load:

$$v_o = v_s \times \frac{R_{in}}{R_{in} + R_s} \times A_v(R_C \| R_L)$$

[[visual:overall-gain-chain]]

## Summary of All Three Configurations

[[visual:config-comparison]]

| Parameter | CE | CC | CB |
|-----------|----|----|-----|
| **$A_v$** | $-h_{fe}R_C / (h_{ie} + h_{fe}R_E)$ | $\approx 1$ | $h_{fe} R_C / h_{ie}$ |
| **$R_{in}$** | $h_{ie} + (1+h_{fe})R_E$ | $h_{ie} + (1+h_{fe})R_E$ (large) | $h_{ie}/(1+h_{fe})$ (small) |
| **$R_{out}$** | $R_C \| (1/h_{oe})$ | Low ($\approx h_{ie}/(1+h_{fe})$) | $R_C$ |
| **$A_i$** | $-h_{fe}$ | $-(1+h_{fe})$ | $\approx -1$ |
| **Phase** | 180° inversion | 0° (in-phase) | 0° (in-phase) |

> Now you can analyse any single-stage amplifier. The next concept covers **load lines and graphical methods** for Q3, and after that, **multi-stage amplifiers** for Q4 and Q6.
